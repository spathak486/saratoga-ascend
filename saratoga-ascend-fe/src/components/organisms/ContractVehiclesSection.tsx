'use client';

import React, { useState, useMemo } from 'react';
import { Section } from '../atoms';
import { SectionIntro } from '../molecules/SectionIntro';
import {
  VehicleDetailPanel,
  type VehicleDetail,
} from '../molecules/VehicleDetailPanel';
import { VehicleNavList, type VehicleNavItem } from '../molecules/VehicleNavList';
import {
  VehicleScopeToggle,
  type VehicleScope,
} from '../molecules/VehicleScopeToggle';

export interface ContractVehicleItemData {
  id?: string;
  documentId?: string;
  scope?: 'federal' | 'state' | null;
  navLabel: string;
  bannerTitle: string;
  description: string;
  primaryCta?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
    isExternal?: boolean | null;
  } | null;
  secondaryCta?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
    isExternal?: boolean | null;
  } | null;
}

export interface ContractVehiclesSectionProps {
  title?: string | null;
  description?: string | null;
  vehicles?: ContractVehicleItemData[] | null;
}

const DEFAULT_INTRO_TITLE = 'Contract Vehicles';
const DEFAULT_INTRO_COPY =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';

// Fallback defaults matching Figma Frame 622
const DEFAULT_VEHICLES: ContractVehicleItemData[] = [
  {
    id: 'gsa',
    scope: 'federal',
    navLabel: 'GSA Awards',
    bannerTitle: 'General Services Administration (GSA) Awards Contracts',
    description:
      'Providing streamlined procurement access for federal agencies seeking specialized staffing and comprehensive healthcare management solutions. Our GSA schedules ensure rapid deployment of credentialed personnel with pre-negotiated, competitive pricing.',
    primaryCta: { href: '/contract-vehicles', label: 'View GSA Details' },
    secondaryCta: { href: '/contact', label: 'Contact Contracts' },
  },
  {
    id: 'cio-sp3',
    scope: 'federal',
    navLabel: 'CIO-SP3',
    bannerTitle: 'Chief Information Officer-Solutions and Partners 3 (CIO-SP3)',
    description:
      'Providing IT and digital healthcare solutions, scientific support, and specialized technical health services across federal departments.',
    primaryCta: { href: '/contract-vehicles', label: 'View Vehicle' },
    secondaryCta: { href: '/contact', label: 'Contact Contracts' },
  },
  {
    id: 'agency',
    scope: 'federal',
    navLabel: 'Agency Vehicles',
    bannerTitle: 'Targeted Agency-Specific Task Orders & BPAs',
    description:
      'Direct-award and blanket purchase agreements tailored to specific healthcare missions across DoD, VA, and HHS facilities nationwide.',
    primaryCta: { href: '/contract-vehicles', label: 'View Details' },
    secondaryCta: { href: '/contact', label: 'Contact Contracts' },
  },
  {
    id: 'ota',
    scope: 'federal',
    navLabel: 'OTA Agreements',
    bannerTitle: 'Other Transaction Authority (OTA) Consortia',
    description:
      'Agile innovation and rapid prototype deployment for cutting-edge medical technologies and healthcare workforce readiness.',
    primaryCta: { href: '/contract-vehicles', label: 'Explore OTA' },
    secondaryCta: { href: '/contact', label: 'Contact Contracts' },
  },
  {
    id: 'state-gsa',
    scope: 'state',
    navLabel: 'State Master Contracts',
    bannerTitle: 'State & Regional Public-Sector Master Agreements',
    description:
      'Multi-county and state-level healthcare support vehicles allowing expedited regional procurement for departments of health.',
    primaryCta: { href: '/contract-vehicles', label: 'View State Schedules' },
    secondaryCta: { href: '/contact', label: 'Contact Contracts' },
  },
];

export const ContractVehiclesSection: React.FC<ContractVehiclesSectionProps> = ({
  title = DEFAULT_INTRO_TITLE,
  description = DEFAULT_INTRO_COPY,
  vehicles,
}) => {
  const [scope, setScope] = useState<VehicleScope>('federal');

  const allVehicles: ContractVehicleItemData[] =
    vehicles && vehicles.length > 0 ? vehicles : DEFAULT_VEHICLES;

  // Filter vehicles according to selected scope (Federal vs State)
  const scopedVehicles = useMemo(() => {
    const list = allVehicles.filter(
      (v) => (v.scope || 'federal').toLowerCase() === scope.toLowerCase()
    );
    return list.length > 0 ? list : allVehicles;
  }, [allVehicles, scope]);

  const navItems: VehicleNavItem[] = useMemo(() => {
    return scopedVehicles.map((v, idx) => ({
      id: v.id || v.documentId || `v-${scope}-${idx}`,
      label: v.navLabel,
    }));
  }, [scopedVehicles, scope]);

  const [activeId, setActiveId] = useState<string>(navItems[0]?.id || 'gsa');

  // Keep activeId valid when switching scope
  const activeVehicle = useMemo(() => {
    return (
      scopedVehicles.find(
        (v, idx) => (v.id || v.documentId || `v-${scope}-${idx}`) === activeId
      ) || scopedVehicles[0]
    );
  }, [scopedVehicles, activeId, scope]);

  const currentDetail: VehicleDetail = {
    title: activeVehicle?.bannerTitle || DEFAULT_VEHICLES[0].bannerTitle,
    body: activeVehicle?.description || DEFAULT_VEHICLES[0].description,
    primary: {
      href: activeVehicle?.primaryCta?.href || '/contract-vehicles',
      label: activeVehicle?.primaryCta?.label || 'View GSA Details',
    },
    secondary: {
      href: activeVehicle?.secondaryCta?.href || '/contact',
      label: activeVehicle?.secondaryCta?.label || 'Contact Contracts',
    },
  };

  return (
    <Section
      aria-labelledby="contract-vehicles-heading"
      tone="surface"
      spacing="lg"
      className="max-xl:mt-10 max-xl:py-5!"
    >
      <div className="flex flex-col gap-[clamp(2.5rem,3.125vw,3.75rem)] max-xl:gap-5">
        <SectionIntro
          id="contract-vehicles-heading"
          title={title || DEFAULT_INTRO_TITLE}
          description={description || DEFAULT_INTRO_COPY}
          wide
          titleClassName="max-xl:text-[2rem]! max-xl:leading-[2.5rem]! max-xl:text-brand-cta-from"
          descriptionClassName="max-xl:text-base max-xl:leading-5"
          className="gap-3"
        />

        <div className="rounded-[2.5rem] border-2 border-slate-line bg-brand-surface p-[clamp(1.5rem,2.08vw,2.5rem)] max-xl:rounded-none max-xl:border-0 max-xl:bg-transparent max-xl:p-0">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[25.125rem_1px_minmax(0,1fr)] xl:items-start max-xl:gap-5">
            <div className="flex flex-col gap-10 max-xl:gap-5">
              <VehicleScopeToggle
                value={scope}
                onChange={(newScope) => {
                  setScope(newScope);
                  // pick first item of new scope
                  const nextFiltered = allVehicles.filter(
                    (v) => (v.scope || 'federal').toLowerCase() === newScope.toLowerCase()
                  );
                  const first = nextFiltered[0] || allVehicles[0];
                  if (first) {
                    setActiveId(first.id || first.documentId || `v-${newScope}-0`);
                  }
                }}
              />
              <VehicleNavList
                items={navItems}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </div>

            <div
              className="hidden bg-slate-line xl:block"
              aria-hidden="true"
            />

            <VehicleDetailPanel detail={currentDetail} scope={scope} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContractVehiclesSection;
