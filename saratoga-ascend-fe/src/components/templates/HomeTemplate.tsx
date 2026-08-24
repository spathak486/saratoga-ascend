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
  const bannerSec = homeData?.Section?.find(
    (sec) => sec.__typename === 'ComponentReferencesBannerReference'
  );
  const ctaSec = homeData?.Section?.find(
    (sec) => sec.__typename === 'ComponentReferencesCta'
  );
  const faqSec = homeData?.Section?.find(
    (sec) =>
      sec.__typename === 'ComponentReferencesFaQs' ||
      sec.__typename === 'ComponentReferencesFaqs'
  );

  const otherSections = homeData?.Section?.filter(
    (sec) =>
      sec.__typename !== 'ComponentReferencesBannerReference' &&
      sec.__typename !== 'ComponentReferencesCta' &&
      sec.__typename !== 'ComponentReferencesFaQs' &&
      sec.__typename !== 'ComponentReferencesFaqs'
  );

  return (
    <main id="main">
      {bannerSec ? renderRegisteredSection(bannerSec, 0) : <HeroSection />}

      {otherSections?.map((sec, idx) => renderRegisteredSection(sec, idx))}

      <WhatWeDoSection />
      <MarketWeServeSection />
      <HealthcareProgramsSection />
      <MissionSection />
      <OurAchievementsSection />
      <ClientLogosSection />
      <LatestNewsSection />
      <HappyClientsSection />

      {faqSec ? renderRegisteredSection(faqSec, 99) : <FaqSection />}

      {ctaSec ? renderRegisteredSection(ctaSec, 100) : <NeedHelpSection />}
    </main>
  );
};
