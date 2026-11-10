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

export const ContractVehiclesSection: React.FC<ContractVehiclesSectionProps> = ({
  title,
  description,
  vehicles,
}) => {
  const [scope, setScope] = useState<VehicleScope>('federal');

  // STRICT RULE: If no vehicles in CMS, render nothing
  if (!vehicles || vehicles.length === 0) {
    return null;
  }

  // Filter vehicles according to selected scope (Federal vs State)
  const scopedVehicles = useMemo(() => {
    const list = vehicles.filter(
      (v) => (v.scope || 'federal').toLowerCase() === scope.toLowerCase()
    );
    return list.length > 0 ? list : vehicles;
  }, [vehicles, scope]);

  const navItems: VehicleNavItem[] = useMemo(() => {
    return scopedVehicles.map((v, idx) => ({
      id: v.id || v.documentId || `v-${scope}-${idx}`,
      label: v.navLabel,
    }));
  }, [scopedVehicles, scope]);

  const [activeId, setActiveId] = useState<string>(navItems[0]?.id || '');

  // Keep activeId valid when switching scope
  const activeVehicle = useMemo(() => {
    return (
      scopedVehicles.find(
        (v, idx) => (v.id || v.documentId || `v-${scope}-${idx}`) === activeId
      ) || scopedVehicles[0]
    );
  }, [scopedVehicles, activeId, scope]);

  const currentDetail: VehicleDetail = {
    title: activeVehicle?.bannerTitle || '',
    body: activeVehicle?.description || '',
    primary: activeVehicle?.primaryCta?.label
      ? {
          href: activeVehicle.primaryCta.href || '/contract-vehicles',
          label: activeVehicle.primaryCta.label,
          target: activeVehicle.primaryCta.target || undefined,
          isExternal: activeVehicle.primaryCta.isExternal ?? undefined,
        }
      : undefined,
    secondary: activeVehicle?.secondaryCta?.label
      ? {
          href: activeVehicle.secondaryCta.href || '/contact',
          label: activeVehicle.secondaryCta.label,
          target: activeVehicle.secondaryCta.target || undefined,
          isExternal: activeVehicle.secondaryCta.isExternal ?? undefined,
        }
      : undefined,
  };

  return (
    <Section
      id="contract-vehicles"
      aria-labelledby="contract-vehicles-heading"
      tone="surface"
      spacing="none"
      className="py-10 xl:py-16"
    >
      <div className="flex flex-col gap-[clamp(2.5rem,3.125vw,3.75rem)] max-xl:gap-5">
        {(title || description) && (
          <SectionIntro
            id="contract-vehicles-heading"
            title={title || ''}
            description={description || ''}
            wide
            titleClassName="max-xl:text-[2rem]! max-xl:leading-[2.5rem]! max-xl:text-brand-cta-from"
            descriptionClassName="max-xl:text-base max-xl:leading-6"
            className="gap-3"
          />
        )}

        <div className="rounded-[2.5rem] border-2 border-slate-line bg-brand-surface p-[clamp(1.5rem,2.08vw,2.5rem)] max-xl:rounded-none max-xl:border-0 max-xl:bg-transparent max-xl:p-0">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[25.125rem_1px_minmax(0,1fr)] xl:items-start max-xl:gap-5">
            <div className="flex flex-col gap-10 max-xl:gap-5">
              <VehicleScopeToggle
                value={scope}
                onChange={(newScope) => {
                  setScope(newScope);
                  // pick first item of new scope
                  const nextFiltered = vehicles.filter(
                    (v) => (v.scope || 'federal').toLowerCase() === newScope.toLowerCase()
                  );
                  const first = nextFiltered[0] || vehicles[0];
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
