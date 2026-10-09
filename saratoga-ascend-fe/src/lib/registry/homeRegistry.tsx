import React from 'react';
import type {
  DynamicZoneSection,
  BannerReference,
  ClientLogosReference,
  CtaReference,
  FaqsReference,
  ServiceReference,
  WhatWeDoReference,
  MissionReference,
  AchievementsReference,
  LegalContentReference,
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
  LegalPolicySection,
  BlogListingSection,
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
    imageSrc: '/images/what-we-do-doctor.png',
  },
  {
    heading: 'Staffing',
    blurb:
      'Cleared, credentialed clinicians placed with federal, military, and community facilities.',
    features: ['Travel and locums coverage', 'Rapid credentialing', '24/7 program support'],
    href: '/solutions',
    imageSrc: '/images/healthcare-team.png',
  },
  {
    heading: 'Consulting',
    blurb: 'Program design and workforce strategy for government healthcare missions.',
    features: ['Compliance-first delivery', 'On-site and remote teams', 'Mission-ready surge'],
    href: '/solutions',
    imageSrc: '/images/pharmacist-portrait.png',
  },
];

const HAPPY_CLIENT_PHOTOS = [
  '/images/healthcare-team.png',
  '/images/pharmacist-portrait.png',
  '/images/future-doctor.png',
] as const;

const MOCK_HAPPY_CLIENTS = [
  {
    role: 'Certified Nursing Assistant',
    name: 'Izabella-Naval Hospital,',
    place: 'Lejeune- Family Medicine',
    quote:
      '“After 20+ years in pharmacy, this is the best place I’ve ever worked! I’m proud to serve our military community, enjoy competitive pay, flexible time off, and a true sense of purpose.”',
    photos: HAPPY_CLIENT_PHOTOS,
  },
  {
    role: 'Medical Assistant',
    name: 'Camp Lejeune',
    place: 'Primary Care',
    quote:
      '“Every day brings something new, and I love being part of a team that truly cares. The people, the mission, and the opportunity to grow make this a rewarding place to build my career.”',
    photos: HAPPY_CLIENT_PHOTOS,
  },
  {
    role: 'Pharmacy Technician',
    name: 'Naval Hospital',
    place: 'Pharmacy Services',
    quote:
      '“I’ve found more than just a job here—I’ve found a team that values what I bring to the table. The supportive environment and meaningful work make coming to work every day something I’m proud of.”',
    photos: HAPPY_CLIENT_PHOTOS,
  },
];

function renderFaqSection(faqsRef: FaqsReference, index: number) {
  const promo = faqsRef.content?.ContentSection;
  const supportCta = faqsRef.supportCta?.ContentSection;
  
  const items: { question: string; answer: string }[] = [];

  if (faqsRef.faqs) {
    for (const f of faqsRef.faqs) {
      const q = f.faq?.title || f.referenceTitle;
      const a = f.faq?.description;
      if (!q) continue;
      const cleanAnswer = a ? a.replace(/<[^>]*>/g, '').trim() : '';
      
      items.push({
        question: q,
        answer: cleanAnswer,
      });
    }
  }

  return (
    <FaqSection
      key={`faqs-${index}`}
      title={promo?.title ?? undefined}
      subTitle={promo?.subTitle ?? undefined}
      description={promo?.description ?? undefined}
      imageSrc={promo?.image?.url ?? undefined}
      items={items && items.length > 0 ? items : undefined}
      supportCta={supportCta}
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
        variant={banner?.variant as any}
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

  ComponentReferencesWhatWeDoReference: (section, index) => {
    const wRef = section as WhatWeDoReference;
    const wwd = wRef.whatWeDoSection;
    
    const serviceLines = wwd?.services?.map(svc => ({
      heading: svc?.title || svc?.pageTitle || '',
      blurb: svc?.summary || '',
      features: svc?.highlights?.map(h => h.text).filter(Boolean) || [],
      href: svc?.cta?.href || (svc?.slug ? `/${svc.slug}` : '/'),
      imageSrc: svc?.image?.url || undefined,
    })) || [];

    const customLines = wwd?.customItems?.map(item => ({
      heading: item?.title || '',
      blurb: item?.summary || '',
      features: item?.highlights?.map(h => h.text).filter(Boolean) || [],
      href: item?.cta?.href || '/',
      imageSrc: item?.image?.url || undefined,
    })) || [];

    const mergedLines = [...serviceLines, ...customLines];

    return (
      <WhatWeDoSection
        key={`what-we-do-${index}`}
        title={wwd?.title ?? undefined}
        description={wwd?.description ?? undefined}
        photoSrc={wwd?.photo?.url ?? undefined}
        ctaLabel={wwd?.cta?.label ?? undefined}
        ctaHref={wwd?.cta?.href ?? undefined}
        serviceLines={mergedLines}
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
        cta={ms?.cta ? {
          label: ms.cta.label,
          href: ms.cta.href,
          target: ms.cta.target,
          isExternal: ms.cta.isExternal ?? undefined,
        } : undefined}
        highlights={ms?.highlights?.map((h) => ({ text: h.text, subtext: h.subtext })) ?? undefined}
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

  ComponentReferencesLegalContent: (section, index) => {
    const legalRef = section as LegalContentReference;
    return (
      <LegalPolicySection
        key={`legal-${index}`}
        title={legalRef.title ?? undefined}
        content={legalRef.body ?? undefined}
        showToc={legalRef.showToc ?? true}
        titleColor={legalRef.titleColor ?? undefined}
        bodyColor={legalRef.bodyColor ?? undefined}
      />
    );
  },

  ComponentReferencesLatestInsights: (section, index) => {
    const insightsRef = section as any;
    return (
      <LatestNewsSection
        key={`latest-insights-${index}`}
        title={insightsRef.heading}
        subTitle={insightsRef.subheading}
        blogs={insightsRef.blogs}
        news={insightsRef.news}
      />
    );
  },

  ComponentReferencesBlogListing: (section, index) => {
    const listingRef = section as any;
    return (
      <BlogListingSection
        key={`blog-listing-${index}`}
        title={listingRef.blogHeading}
        subTitle={listingRef.subheading}
        blogs={listingRef.blogs}
      />
    );
  },

  ComponentReferencesHappyClientsReference: (section, index) => {
    // Requires an `any` cast until types.ts and schemas are fully regenerated
    // or if `HappyClientsReference` isn't fully narrowed in DynamicZoneSection type
    const hcRef = section as any;
    const reviews = hcRef.reviews?.map((r: any) => ({
      role: r.role ?? undefined,
      name: r.name,
      place: r.place,
      quote: r.quote,
      photos: [r.photos?.[0]?.url, r.photos?.[1]?.url, r.photos?.[2]?.url],
    })) || [];

    return (
      <HappyClientsSection
        key={`happy-clients-${index}`}
        title={hcRef.title ?? undefined}
        description={hcRef.description ?? undefined}
        reviews={reviews}
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
      serviceLines={MOCK_WHAT_WE_DO_LINES}
    />
  ),
  MockHealthcare: (_section, index) => (
    <HealthcareProgramsSection
      key={`healthcare-${index}`}
      title="Lorem epsum"
      description="Simple ideas can have profound impacts. Understanding users leads to better solutions. Each project teaches valuable lessons."
      personSrc="/images/phase5/phase5-nurse.png"
    />
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
      description="Success is built on consistent effort."
      reviews={MOCK_HAPPY_CLIENTS}
    />
  ),
  MockLatestNews: (_section, index) => (
    <LatestNewsSection
      key={`latest-news-${index}`}
      title="Latest news and insights"
      subTitle="Success is built on consistent effort."
    />
  ),
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
