import React from 'react';
import type { HomePage } from '@/lib/schemas';
import { renderRegisteredSection } from '@/lib/registry/homeRegistry';
import {
  HeroSection,
  WhatWeDoSection,
  MarketWeServeSection,
  HealthcareProgramsSection,
  MissionSection,
  OurAchievementsSection,
  ClientLogosSection,
  LatestNewsSection,
  HappyClientsSection,
  FaqSection,
  NeedHelpSection,
} from '../organisms';

export interface HomeTemplateProps {
  homeData?: HomePage;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ homeData }) => {
  const hasDynamicBanner = homeData?.Section?.some(
    (sec) => sec.__typename === 'ComponentReferencesBannerReference'
  );
  const hasDynamicCta = homeData?.Section?.some(
    (sec) => sec.__typename === 'ComponentReferencesCta'
  );

  return (
    <main id="main">
      {!hasDynamicBanner && <HeroSection />}

      {homeData?.Section?.map((sec, idx) => renderRegisteredSection(sec, idx))}

      <WhatWeDoSection />
      <MarketWeServeSection />
      <HealthcareProgramsSection />
      <MissionSection />
      <OurAchievementsSection />
      <ClientLogosSection />
      <LatestNewsSection />
      <HappyClientsSection />
      <FaqSection />

      {!hasDynamicCta && <NeedHelpSection />}
    </main>
  );
};
