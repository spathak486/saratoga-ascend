import React from 'react';
import type { HomePage } from '@/lib/schemas';
import { renderRegisteredSection } from '@/lib/registry/homeRegistry';
import {
  Navbar,
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
  Footer,
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
    <div className="min-h-screen bg-brand-surface text-brand-navy font-sans antialiased">
      <Navbar />

      <main id="main">
        {/* Render static fallback HeroSection if Strapi has no dynamic banner */}
        {!hasDynamicBanner && <HeroSection />}

        {/* Dynamic Zone Sections mapping via Component Registry in exact Strapi array order */}
        {homeData?.Section?.map((sec, idx) => renderRegisteredSection(sec, idx))}

        {/* Static homepage sections */}
        <WhatWeDoSection />
        <MarketWeServeSection />
        <HealthcareProgramsSection />
        <MissionSection />
        <OurAchievementsSection />
        <ClientLogosSection />
        <LatestNewsSection />
        <HappyClientsSection />
        <FaqSection />

        {/* Render static fallback NeedHelpSection if Strapi has no dynamic CTA */}
        {!hasDynamicCta && <NeedHelpSection />}
      </main>

      <Footer />
    </div>
  );
};
