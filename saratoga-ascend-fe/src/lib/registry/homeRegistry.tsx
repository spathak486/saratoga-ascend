import React from 'react';
import type {
  DynamicZoneSection,
  BannerReference,
  ClientLogosReference,
  CtaReference,
  FaqsReference,
  ServiceReference,
  MissionReference,
  AchievementsReference,
} from '@/lib/schemas';
import {
  HeroSection,
  NeedHelpSection,
  FaqSection,
  ClientLogosSection,
  MarketWeServeSection,
  MissionSection,
  OurAchievementsSection,
  WhatWeDoSection,
  HealthcareProgramsSection,
  ContractVehiclesSection,
  PastPerformanceSection,
  HappyClientsSection,
  LatestNewsSection,
} from '@/components/organisms';

const MOCK_WHAT_WE_DO_LINES = [
  {
    heading: 'Healthcare',
    blurb:
      'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web development to showcase layouts and visual elements without the distraction of meaningful content.',
    features: [
      'Accredited Certifications',
      'Operational Insights',
      'Regulatory Compliance',
    ],
    href: '/solutions',
  },
  {
    heading: 'Staffing',
    blurb:
      'Cleared, credentialed clinicians placed with federal, military, and community facilities.',
    features: ['Travel and locums coverage', 'Rapid credentialing', '24/7 program support'],
    href: '/solutions',
  },
  {
    heading: 'Consulting',
    blurb: 'Program design and workforce strategy for government healthcare missions.',
    features: ['Compliance-first delivery', 'On-site and remote teams', 'Mission-ready surge'],
    href: '/solutions',
  },
];

const MOCK_HAPPY_CLIENTS = [
  {
    role: 'Chief Medical Officer',
    name: 'Dr. Elena Hart',
    place: 'Naval Hospital, NC',
    quote:
      'Saratoga Ascend filled critical roles in days, not months — and every clinician arrived fully cleared.',
    photos: [
      '/images/healthcare-team.png',
      '/images/pharmacist-portrait.png',
      '/images/future-doctor.png',
    ] as const,
  },
];

function renderFaqSection(faqsRef: FaqsReference, index: number) {
  const promo = faqsRef.content?.ContentSection;
  const items = faqsRef.faqs
    ?.map((f) => {
      const q = f.faq?.title || f.referenceTitle;
      const a = f.faq?.description;
      if (!q) return null;
      const cleanAnswer = a ? a.replace(/<[^>]*>/g, '').trim() : '';
      return {
        question: q,
        answer: cleanAnswer,
      };
    })
    .filter((item): item is { question: string; answer: string } => item !== null);

  return (
    <FaqSection
      key={`faqs-${index}`}
      title={promo?.title ?? undefined}
      subTitle={promo?.subTitle ?? undefined}
      description={promo?.description ?? undefined}
      backdropSrc={promo?.image?.url ?? undefined}
      items={items && items.length > 0 ? items : undefined}
      ctaLabel={promo?.link?.label ?? undefined}
      ctaHref={promo?.link?.href ?? undefined}
    />
  );
}

/**
 * Component Registry Pattern: Maps Strapi GraphQL __typename to component renderers.
 * Scalable architecture — adding a new Strapi component requires registering only 1 handler here.
 */
export const SECTION_REGISTRY: Record<
  string,
  (section: DynamicZoneSection, index: number) => React.ReactNode
> = {
  ComponentReferencesBannerReference: (section, index) => {
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
  },

  ComponentReferencesCta: (section, index) => {
    const ctaRef = section as CtaReference;
    const promo = ctaRef.cta?.cta;
    return (
      <NeedHelpSection
        key={`cta-${index}`}
        title={promo?.title ?? undefined}
        subTitle={promo?.subTitle ?? undefined}
        description={promo?.description ?? undefined}
        personSrc={promo?.image?.url ?? undefined}
        mediaAlt={promo?.image?.alternativeText ?? undefined}
        ctaLabel={promo?.link?.label ?? undefined}
        ctaHref={promo?.link?.href ?? undefined}
      />
    );
  },

  ComponentReferencesFaQs: (section, index) =>
    renderFaqSection(section as FaqsReference, index),

  ComponentReferencesFaqs: (section, index) =>
    renderFaqSection(section as FaqsReference, index),

  ComponentReferencesClientLogosReference: (section, index) => {
    const clRef = section as ClientLogosReference;
    const cls = clRef.clientLogosSection;
    return (
      <ClientLogosSection
        key={`client-logos-${index}`}
        title={cls?.title ?? undefined}
        description={cls?.description ?? undefined}
        logos={cls?.logos ?? undefined}
      />
    );
  },

  ComponentReferencesServiceReference: (section, index) => {
    const sRef = section as ServiceReference;
    const heading = sRef.heading;
    const services = sRef.services
      ?.map((svc) => {
        if (!svc) return null;
        return {
          id: svc.slug || svc.documentId || svc.title || 'service',
          label: svc.title || svc.pageTitle || '',
          description: svc.summary || '',
          imageSrc: svc.image?.url ?? undefined,
          href: svc.cta?.href || (svc.slug ? `/${svc.slug}` : '/who-we-serve'),
        };
      })
      .filter((s): s is NonNullable<typeof s> => s !== null && !!s.label);

    const cleanDescription = heading?.description
      ? heading.description.replace(/<[^>]*>/g, '').trim()
      : undefined;

    return (
      <MarketWeServeSection
        key={`services-${index}`}
        title={heading?.title ?? undefined}
        description={cleanDescription}
        services={services && services.length > 0 ? services : undefined}
      />
    );
  },

  ComponentReferencesMissionReference: (section, index) => {
    const mRef = section as MissionReference;
    const ms = mRef.missionSection;
    return (
      <MissionSection
        key={`mission-${index}`}
        title={ms?.title ?? undefined}
        description={ms?.description ?? undefined}
        imageSrc={ms?.image?.url ?? undefined}
        shieldIconSrc={ms?.shieldIcon?.url ?? undefined}
        pulseIconSrc={ms?.pulseIcon?.url ?? undefined}
        highlights={ms?.highlights?.map((h) => h.text) ?? undefined}
      />
    );
  },

  ComponentReferencesAchievements: (section, index) => {
    const achRef = section as AchievementsReference;
    const ach = achRef.ourAchievement;
    return (
      <OurAchievementsSection
        key={`achievements-${index}`}
        title={ach?.title ?? undefined}
        bgImage={ach?.bgImage?.url ?? undefined}
        counters={ach?.counter ?? undefined}
        cards={ach?.achievementCards ?? undefined}
      />
    );
  },

  // Frontend-only Figma bands — used by local mocks until Strapi types exist.
  MockWhatWeDo: (_section, index) => (
    <WhatWeDoSection
      key={`what-we-do-${index}`}
      title="What We Do"
      description="Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide."
      photoSrc="/images/what-we-do-doctor.png"
      videoSrc="/images/butterfly-gif.mp4"
      serviceLines={MOCK_WHAT_WE_DO_LINES}
    />
  ),
  MockHealthcare: (_section, index) => (
    <HealthcareProgramsSection key={`healthcare-${index}`} personSrc="/images/phase5/phase5-nurse.png" />
  ),
  MockContractVehicles: (_section, index) => (
    <ContractVehiclesSection key={`contract-vehicles-${index}`} />
  ),
  MockPastPerformance: (_section, index) => (
    <PastPerformanceSection key={`past-performance-${index}`} />
  ),
  MockHappyClients: (_section, index) => (
    <HappyClientsSection
      key={`happy-clients-${index}`}
      title="Our Happy Clients"
      reviews={MOCK_HAPPY_CLIENTS}
    />
  ),
  MockLatestNews: (_section, index) => <LatestNewsSection key={`latest-news-${index}`} />,
};

/**
 * Resolves a dynamic zone section from the Component Registry.
 */
export function renderRegisteredSection(
  section: DynamicZoneSection,
  index: number
): React.ReactNode {
  const renderer = SECTION_REGISTRY[section.__typename];
  if (!renderer) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[Component Registry] No renderer registered for section typename: "${section.__typename}"`
      );
    }
    return null;
  }
  return renderer(section, index);
}
