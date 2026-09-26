'use client';

import React, { useState } from 'react';
import { Section } from '../atoms';
import { SectionIntro } from '../molecules/SectionIntro';
import {
  VehicleDetailPanel,
  type VehicleDetail,
} from '../molecules/VehicleDetailPanel';
import { VehicleNavList } from '../molecules/VehicleNavList';
import {
  VehicleScopeToggle,
  type VehicleScope,
} from '../molecules/VehicleScopeToggle';

const INTRO_COPY =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';

const VEHICLES = [
  { id: 'gsa', label: 'GSA Awards' },
  { id: 'cio-sp3', label: 'CIO-SP3' },
  { id: 'agency', label: 'Agency Vehicles' },
  { id: 'ota', label: 'OTA Agreements' },
] as const;

const GSA_DETAIL: VehicleDetail = {
  title: 'General Services Administration (GSA) Awards Contracts',
  body: 'Providing streamlined procurement access for federal agencies seeking specialized staffing and comprehensive healthcare management solutions. Our GSA schedules ensure rapid deployment of credentialed personnel with pre-negotiated, competitive pricing.',
  primary: { href: '/contract-vehicles', label: 'View GSA Details' },
  secondary: { href: '/contact', label: 'Contact Contracts' },
};

/**
 * Contract Vehicles (Figma 2002:1262). List clicks move the sky chip only.
 * State recolors the card behind the GSA title; that copy stays put.
 */
export const ContractVehiclesSection: React.FC = () => {
  const [scope, setScope] = useState<VehicleScope>('federal');
  const [activeId, setActiveId] = useState<string>(VEHICLES[0].id);

  return (
    <Section
      aria-labelledby="contract-vehicles-heading"
      tone="surface"
      spacing="lg"
    >
      <div className="flex flex-col gap-[clamp(2.5rem,3.125vw,3.75rem)]">
        <SectionIntro
          id="contract-vehicles-heading"
          title="Contract Vehicles"
          description={INTRO_COPY}
        />

        <div className="rounded-[2.5rem] border-2 border-slate-line bg-brand-surface p-[clamp(1.5rem,2.08vw,2.5rem)]">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[25.125rem_1px_minmax(0,1fr)] xl:items-start">
            <div className="flex flex-col gap-10">
              <VehicleScopeToggle value={scope} onChange={setScope} />
              <VehicleNavList
                items={VEHICLES}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </div>

            <div
              className="hidden bg-slate-line xl:block"
              aria-hidden="true"
            />

            <VehicleDetailPanel detail={GSA_DETAIL} scope={scope} />
          </div>
        </div>
      </div>
    </Section>
  );
};
