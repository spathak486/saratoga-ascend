import React from 'react';
import type {
  BannerReference,
  ClientLogosReference,
  CtaReference,
  FaqsReference,
  FooterData,
  HomePage,
} from '@/lib/schemas';
import {
  Navbar,
  HeroSection,
  WhatWeDoSection,
  MarketWeServeSection,
  HealthcareProgramsSection,
  MissionSection,
  ContractVehiclesSection,
  OurAchievementsSection,
  PastPerformanceSection,
  ClientLogosSection,
  LatestNewsSection,
  HappyClientsSection,
  FaqSection,
  NeedHelpSection,
  Footer,
} from '../organisms';

export interface HomeTemplateProps {
  homeData?: HomePage;
  footerData?: FooterData | null;
}

function isVideoMedia(mime?: string | null, ext?: string | null) {
  return Boolean(
    mime?.startsWith('video/') || ext === '.mp4' || ext === '.webm' || ext === '.mov'
  );
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({
  homeData,
  footerData,
}) => {
  const bannerSec = homeData?.Section?.find(
    (sec): sec is BannerReference =>
      sec.__typename === 'ComponentReferencesBannerReference'
  );
  const banner = bannerSec?.heroBanner?.banner;
  const bannerMedia = banner?.bannerImage;
  const bannerIsVideo = isVideoMedia(bannerMedia?.mime, bannerMedia?.ext);

  const faqSec = homeData?.Section?.find(
    (sec): sec is FaqsReference =>
      sec.__typename === 'ComponentReferencesFaQs' ||
      sec.__typename === 'ComponentReferencesFaqs'
  );
  const faqPromo = faqSec?.content?.ContentSection;
  const faqItems = faqSec?.faqs
    ?.map((item) => {
      const question = item.faq?.title || item.referenceTitle;
      const answer = item.faq?.description
        ? item.faq.description.replace(/<[^>]*>/g, '').trim()
        : '';
      if (!question) return null;
      return { question, answer };
    })
    .filter((item): item is { question: string; answer: string } => item !== null);

  const ctaSec = homeData?.Section?.find(
    (sec): sec is CtaReference => sec.__typename === 'ComponentReferencesCta'
  );
  const promo = ctaSec?.cta?.cta;

  const clientLogosSec = homeData?.Section?.find(
    (sec): sec is ClientLogosReference =>
      sec.__typename === 'ComponentReferencesClientLogosReference'
  );
  const clientLogos = clientLogosSec?.clientLogosSection;

  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy font-sans antialiased">
      <Navbar />

      <main id="main">
        <HeroSection
          title={banner?.bannerTitle}
          description={banner?.bannerDescription ?? undefined}
          helixSrc={bannerIsVideo ? undefined : bannerMedia?.url}
          videoSrc={bannerIsVideo ? bannerMedia?.url : undefined}
          mediaMime={bannerMedia?.mime ?? undefined}
          mediaExt={bannerMedia?.ext ?? undefined}
          mediaAlt={bannerMedia?.alternativeText ?? undefined}
          ctaLabel={banner?.buttonCTA?.label}
          ctaHref={banner?.buttonCTA?.href}
        />
        <WhatWeDoSection />
        <MarketWeServeSection />
        <HealthcareProgramsSection />
        <MissionSection />
        <ContractVehiclesSection />
        <OurAchievementsSection />
        <PastPerformanceSection />
        <HappyClientsSection />
        <ClientLogosSection
          title={clientLogos?.title ?? undefined}
          description={clientLogos?.description ?? undefined}
          logos={clientLogos?.logos ?? undefined}
        />
        <FaqSection
          title={faqPromo?.title ?? undefined}
          description={faqPromo?.description ?? undefined}
          backdropSrc={faqPromo?.image?.url ?? undefined}
          items={faqItems && faqItems.length > 0 ? faqItems : undefined}
          ctaLabel={faqPromo?.link?.label ?? undefined}
          ctaHref={faqPromo?.link?.href ?? undefined}
        />
        <NeedHelpSection
          title={promo?.title ?? undefined}
          description={promo?.description ?? promo?.subTitle ?? undefined}
          personSrc={promo?.image?.url ?? undefined}
          mediaAlt={promo?.image?.alternativeText ?? undefined}
          ctaLabel={promo?.link?.label ?? undefined}
          ctaHref={promo?.link?.href ?? undefined}
        />
        <LatestNewsSection />
      </main>

      <Footer data={footerData} />
    </div>
  );
};
