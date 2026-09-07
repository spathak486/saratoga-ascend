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

interface VehicleEntry {
  id: string;
  label: string;
  detail: VehicleDetail;
}

const FEDERAL_VEHICLES: readonly VehicleEntry[] = [
  {
    id: 'gsa',
    label: 'GSA Awards',
    detail: {
      title: 'General Services Administration (GSA) Awards Contracts',
      body: 'Providing streamlined procurement access for federal agencies seeking specialized staffing and comprehensive healthcare management solutions. Our GSA schedules ensure rapid deployment of credentialed personnel with pre-negotiated, competitive pricing.',
      primary: { href: '/contract-vehicles', label: 'View GSA Details' },
      secondary: { href: '/contact', label: 'Contact Contracts' },
    },
  },
  {
    id: 'cio-sp3',
    label: 'CIO-SP3',
    detail: {
      title: 'CIO-SP3 Government-Wide Acquisition Contract',
      body: 'A NITAAC vehicle for IT and health-IT professional services, used to stand up credentialed clinical and technical teams under a pre-competed, task-order structure with federal-wide reach.',
      primary: { href: '/contract-vehicles', label: 'View CIO-SP3 Details' },
      secondary: { href: '/contact', label: 'Contact Contracts' },
    },
  },
  {
    id: 'agency',
    label: 'Agency Vehicles',
    detail: {
      title: 'Agency-Specific Contract Vehicles',
      body: 'Direct awards and agency BPAs that match licensed, background-checked professionals to a single department’s mission — from military treatment facilities to civilian health systems.',
      primary: { href: '/contract-vehicles', label: 'View Agency Details' },
      secondary: { href: '/contact', label: 'Contact Contracts' },
    },
  },
  {
    id: 'ota',
    label: 'OTA Agreements',
    detail: {
      title: 'Other Transaction Authority Agreements',
      body: 'Flexible OTAs for prototyping and production when a traditional FAR vehicle cannot move fast enough — used to field cleared clinicians and program staff on compressed federal timelines.',
      primary: { href: '/contract-vehicles', label: 'View OTA Details' },
      secondary: { href: '/contact', label: 'Contact Contracts' },
    },
  },
];

const STATE_VEHICLES: readonly VehicleEntry[] = [
  {
    id: 'naspo',
    label: 'NASPO ValuePoint',
    detail: {
      title: 'NASPO ValuePoint Cooperative Contracts',
      body: 'Multi-state cooperative schedules that let state and local agencies order credentialed healthcare staff without running a new solicitation — pre-negotiated rates, one set of terms.',
      primary: { href: '/contract-vehicles', label: 'View NASPO Details' },
      secondary: { href: '/contact', label: 'Contact Contracts' },
    },
  },
  {
    id: 'statewide',
    label: 'Statewide Contracts',
    detail: {
      title: 'Statewide Healthcare Staffing Contracts',
      body: 'Master agreements awarded by a state’s procurement office so every agency, campus, and public health district can call off cleared clinicians under one vehicle.',
      primary: { href: '/contract-vehicles', label: 'View Statewide Details' },
      secondary: { href: '/contact', label: 'Contact Contracts' },
    },
  },
  {
    id: 'local',
    label: 'Local Agency',
    detail: {
      title: 'Local Agency Contract Vehicles',
      body: 'County, city, and hospital-district agreements built for surge, vacancy, and specialty coverage — licensed professionals placed against the locality’s own credentialing rules.',
      primary: { href: '/contract-vehicles', label: 'View Local Details' },
      secondary: { href: '/contact', label: 'Contact Contracts' },
    },
  },
  {
    id: 'coop',
    label: 'Cooperative Agreements',
    detail: {
      title: 'Regional Cooperative Agreements',
      body: 'Shared purchasing among neighboring jurisdictions so smaller agencies can access the same cleared talent pool and pricing as a statewide buyer.',
      primary: { href: '/contract-vehicles', label: 'View Cooperative Details' },
      secondary: { href: '/contact', label: 'Contact Contracts' },
    },
  },
];

/**
 * Contract Vehicles band (Figma node 13:392). Scope toggle, vehicle list,
 * and a navy detail pane. State copy is structured to match the Federal pane
 * so the toggle is usable; only Federal is specified in the file.
 */
export const ContractVehiclesSection: React.FC = () => {
  const [scope, setScope] = useState<VehicleScope>('federal');
  const [activeId, setActiveId] = useState(FEDERAL_VEHICLES[0].id);

  const catalog = scope === 'federal' ? FEDERAL_VEHICLES : STATE_VEHICLES;
  const active = catalog.find((item) => item.id === activeId) ?? catalog[0];

  const handleScope = (next: VehicleScope) => {
    setScope(next);
    const nextCatalog = next === 'federal' ? FEDERAL_VEHICLES : STATE_VEHICLES;
    setActiveId(nextCatalog[0].id);
  };

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
              <VehicleScopeToggle value={scope} onChange={handleScope} />
              <VehicleNavList
                items={catalog}
                activeId={active.id}
                onSelect={setActiveId}
              />
            </div>

            <div
              className="hidden bg-slate-line xl:block"
              aria-hidden="true"
            />

            <VehicleDetailPanel detail={active.detail} />
          </div>
        </div>
      </div>
    </Section>
  );
};
