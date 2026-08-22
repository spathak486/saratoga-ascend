import React from 'react';
import type { HomePage, HomeDynamicZoneSection, BannerReference } from '@/lib/schemas';
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
  const hasDynamicSections = Boolean(homeData?.Section && homeData.Section.length > 0);

  const renderDynamicSection = (section: HomeDynamicZoneSection, index: number) => {
    switch (section.__typename) {
      case 'ComponentReferencesBannerReference': {
        const bannerRef = section as BannerReference;
        const banner = bannerRef.heroBanner?.banner;
        return (
          <HeroSection
            key={`banner-${index}`}
            title={banner?.bannerTitle}
            subTitle={banner?.bannerSubTitle ?? undefined}
            description={banner?.bannerDescription ?? undefined}
            helixSrc={banner?.bannerImage?.url}
            mediaMime={banner?.bannerImage?.mime ?? undefined}
            mediaExt={banner?.bannerImage?.ext ?? undefined}
            mediaAlt={banner?.bannerImage?.alternativeText ?? undefined}
            ctaLabel={banner?.buttonCTA?.label}
            ctaHref={banner?.buttonCTA?.href}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy font-sans antialiased">
      <Navbar />

      <main id="main">
        {hasDynamicSections ? (
          homeData!.Section!.map((sec, idx) => renderDynamicSection(sec, idx))
        ) : (
          <HeroSection />
        )}
        <WhatWeDoSection />
        <MarketWeServeSection />
        <HealthcareProgramsSection />
        <MissionSection />
        <OurAchievementsSection />
        <ClientLogosSection />
        <LatestNewsSection />
        <HappyClientsSection />
        <FaqSection />
        <NeedHelpSection />
      </main>

      <Footer />
    </div>
  );
};
