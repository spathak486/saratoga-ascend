import React, { Fragment } from 'react';
import type { HomePage } from '@/lib/schemas';
import { renderRegisteredSection } from '@/lib/registry/homeRegistry';
import {
  WhatWeDoSection,
  MarketWeServeSection,
  HealthcareProgramsSection,
  MissionSection,
  ContractVehiclesSection,
  OurAchievementsSection,
  PastPerformanceSection,
  HappyClientsSection,
  LatestNewsSection,
} from '../organisms';

export interface HomeTemplateProps {
  homeData?: HomePage;
}

/**
 * Canonical slot for each backend dynamic-zone section. Static sections sit in
 * a fixed scaffold around them; the dynamic ones are placed at their own slot,
 * so reordering them in Strapi (drag-and-drop) changes their relative order on
 * the page while the static skeleton stays put.
 */
const DYNAMIC_SLOT: Record<string, number> = {
  ComponentReferencesBannerReference: 0,
  ComponentReferencesServiceReference: 2,
  ComponentReferencesMissionReference: 4,
  ComponentReferencesClientLogosReference: 9,
  ComponentReferencesFaQs: 10,
  ComponentReferencesFaqs: 10,
  ComponentReferencesCta: 11,
};

const SLOT_COUNT = 13;
const STATIC_SLOTS: Record<number, React.ReactNode> = {
  1: <WhatWeDoSection key="what-we-do" />,
  2: <MarketWeServeSection key="market" />,
  3: <HealthcareProgramsSection key="programs" />,
  4: <MissionSection key="mission" />,
  5: <ContractVehiclesSection key="contract-vehicles" />,
  6: <OurAchievementsSection key="achievements" />,
  7: <PastPerformanceSection key="past-performance" />,
  8: <HappyClientsSection key="happy-clients" />,
  12: <LatestNewsSection key="news" />,
};

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ homeData }) => {
  const slots: (React.ReactNode | null)[] = Array.from({ length: SLOT_COUNT }, () => null);

  for (const [slot, node] of Object.entries(STATIC_SLOTS)) {
    slots[Number(slot)] = node;
  }

  homeData?.Section?.forEach((section, index) => {
    const slot = DYNAMIC_SLOT[section.__typename];
    if (slot === undefined) return;
    slots[slot] = renderRegisteredSection(section, index);
  });

  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy font-sans antialiased">
      <main id="main">
        {slots.map((node, index) => (
          <Fragment key={index}>{node}</Fragment>
        ))}
      </main>
    </div>
  );
};