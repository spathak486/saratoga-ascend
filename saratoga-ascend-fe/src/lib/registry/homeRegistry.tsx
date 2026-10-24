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
  CeoMessageReference,
  SupportingMissionReference,
  PastPerformanceReference,
  MissionVisionPromiseReference,
  BuiltAroundMissionsReference,
  TakeMissionSeriouslyReference,
  AccountableOperatingEnvironmentsReference,
  OurCapabilitiesReference,
  WorkforcePlanningReference,
  ContactInquiryReference,
  ContactPathwaysReference,
  ContactLearnReference,
  ContactOfficesReference,
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
  CeoMessageSection,
  SupportingMissionSection,
  MissionVisionPromiseSection,
  BuiltAroundMissionsSection,
  TakeMissionSeriouslySection,
  AccountableOperatingEnvironmentsSection,
  OurCapabilitiesSection,
  WorkforcePlanningSection,
  ContactInquirySection,
  ContactPathwaysSection,
  ContactLearnSection,
  ContactOfficesSection,
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
export type SectionRenderOptions = {
  /** Contact page uses the contact hero composition of the shared banner. */
  heroLayout?: 'contact';
};

export const SECTION_REGISTRY: Record<
  string,
  (
    section: DynamicZoneSection,
    index: number,
    options?: SectionRenderOptions,
  ) => React.ReactNode
> = {
  ComponentReferencesBannerReference: (section, index, options) => {
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
        layout={options?.heroLayout}
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

  ComponentReferencesCeoMessageReference: (section, index) => {
    const ceoRef = section as CeoMessageReference;
    const ceo = ceoRef.ceoMessageSection;
    if (!ceo) return null;
    return (
      <CeoMessageSection
        key={`ceo-message-${index}`}
        title={ceo.title ?? undefined}
        highlightTitle={ceo.highlightTitle ?? undefined}
        description={ceo.description ?? undefined}
        authorName={ceo.authorName ?? undefined}
        authorRole={ceo.authorRole ?? undefined}
        imageSrc={ceo.image?.url ?? undefined}
        watermarkSrc={ceo.bgWatermarkImage?.url ?? undefined}
      />
    );
  },

  ComponentReferencesSupportingMissionReference: (section, index) => {
    const smRef = section as SupportingMissionReference;
    const sm = smRef.supportingMissionSection;
    if (!sm) return null;
    return (
      <SupportingMissionSection
        key={`supporting-mission-${index}`}
        title={sm.title ?? undefined}
        description={sm.description ?? undefined}
        imageSrc={sm.image?.url ?? undefined}
        cta={
          sm.cta
            ? {
                label: sm.cta.label,
                href: sm.cta.href,
                target: sm.cta.target,
              }
            : undefined
        }
      />
    );
  },

  ComponentReferencesPastPerformanceReference: (section, index) => {
    const ppRef = section as PastPerformanceReference;
    if (!ppRef.caseStudies || ppRef.caseStudies.length === 0) return null;
    return (
      <PastPerformanceSection
        key={`past-performance-${index}`}
        heading={ppRef.pastPerformanceHeading ?? ppRef.heading ?? undefined}
        subheading={ppRef.subheading ?? undefined}
        caseStudies={ppRef.caseStudies as any}
      />
    );
  },

  ComponentReferencesMissionVisionPromiseReference: (section, index) => {
    const mvpRef = section as MissionVisionPromiseReference;
    const mvp = mvpRef.missionVisionPromiseSection;
    if (!mvp || !mvp.cards || mvp.cards.length === 0) return null;
    return (
      <MissionVisionPromiseSection
        key={`mission-vision-promise-${index}`}
        title={mvp.title ?? undefined}
        highlightTitle={mvp.highlightTitle ?? undefined}
        description={mvp.description ?? undefined}
        bgWatermarkImage={mvp.bgWatermarkImage?.url ?? undefined}
        cards={mvp.cards as any}
      />
    );
  },

  ComponentReferencesBuiltAroundMissionsReference: (section, index) => {
    const bamRef = section as BuiltAroundMissionsReference;
    const bam = bamRef.builtAroundMissionsSection;
    if (!bam || !bam.cards || bam.cards.length === 0) return null;
    return (
      <BuiltAroundMissionsSection
        key={`built-around-missions-${index}`}
        title={bam.title ?? undefined}
        highlightTitle={bam.highlightTitle ?? undefined}
        description={bam.description ?? undefined}
        calloutHighlight={bam.calloutHighlight ?? undefined}
        calloutText={bam.calloutText ?? undefined}
        cards={bam.cards as any}
      />
    );
  },

  ComponentReferencesTakeMissionSeriouslyReference: (section, index) => {
    const tmsRef = section as TakeMissionSeriouslyReference;
    const tms = tmsRef.takeMissionSeriouslySection;
    if (!tms || !tms.cards || tms.cards.length === 0) return null;
    return (
      <TakeMissionSeriouslySection
        key={`take-mission-seriously-${index}`}
        title={tms.title ?? undefined}
        highlightTitle={tms.highlightTitle ?? undefined}
        cards={tms.cards as any}
      />
    );
  },

  ComponentReferencesAccountableOperatingEnvironmentsReference: (section, index) => {
    const aoeRef = section as AccountableOperatingEnvironmentsReference;
    const aoe = aoeRef.accountableOperatingEnvironmentsSection;
    if (!aoe || !aoe.cards || aoe.cards.length === 0) return null;
    return (
      <AccountableOperatingEnvironmentsSection
        key={`accountable-operating-environments-${index}`}
        title={aoe.title ?? undefined}
        highlightTitle={aoe.highlightTitle ?? undefined}
        cards={aoe.cards as any}
      />
    );
  },

  ComponentReferencesOurCapabilitiesReference: (section, index) => {
    const ocRef = section as OurCapabilitiesReference;
    const oc = ocRef.ourCapabilitiesSection;
    if (!oc || !oc.cards || oc.cards.length === 0) return null;
    return (
      <OurCapabilitiesSection
        key={`our-capabilities-${index}`}
        title={oc.title ?? undefined}
        highlightTitle={oc.highlightTitle ?? undefined}
        description={oc.description ?? undefined}
        bgImage={oc.bgImage as any}
        cards={oc.cards as any}
      />
    );
  },

  ComponentReferencesWorkforcePlanningReference: (section, index) => {
    const wpRef = section as WorkforcePlanningReference;
    const wp = wpRef.workforcePlanningSection;
    if (!wp || !wp.cards || wp.cards.length === 0) return null;
    return (
      <WorkforcePlanningSection
        key={`workforce-planning-${index}`}
        title={wp.title ?? undefined}
        highlightTitle={wp.highlightTitle ?? undefined}
        cards={wp.cards as any}
      />
    );
  },

  ComponentReferencesContactInquiryReference: (section, index) => {
    const ciRef = section as ContactInquiryReference;
    const ci = ciRef.contactInquirySection;
    if (!ci) return null;

    const details = [
      ci.address
        ? {
            icon: 'location' as const,
            label: 'Address',
            value: ci.address,
          }
        : null,
      ci.email
        ? {
            icon: 'mail' as const,
            label: 'Email',
            value: ci.email,
            href: `mailto:${ci.email}`,
          }
        : null,
      ci.phone
        ? {
            icon: 'phone' as const,
            label: 'Contact',
            value: ci.phone,
            href: `tel:${ci.phone.replace(/[^+\d]/g, '')}`,
          }
        : null,
    ].filter(Boolean) as any[];

    return (
      <ContactInquirySection
        key={`contact-inquiry-${index}`}
        titleLead={ci.titleLead ?? undefined}
        titleAccent={ci.titleAccent ?? undefined}
        titleClose={ci.titleClose ?? undefined}
        description={ci.description ?? undefined}
        details={details.length > 0 ? details : undefined}
        statementLabel={ci.statementLabel ?? undefined}
        statementHref={ci.statementFile?.url ?? undefined}
      />
    );
  },

  ComponentReferencesContactPathwaysReference: (section, index) => {
    const cpRef = section as ContactPathwaysReference;
    const cp = cpRef.contactPathwaysSection;
    if (!cp) return null;

    const pathways = cp.cards?.map((card, idx) => {
      // Alternate tone: 0 -> sky, 1 -> red, 2 -> sky (odd/even alternating pattern)
      const alternatingTone: 'sky' | 'red' = idx % 2 === 1 ? 'red' : 'sky';
      const tone: 'sky' | 'red' =
        card.actionTone === 'red' || card.actionTone === 'sky'
          ? card.actionTone
          : alternatingTone;

      const defaultSwoosh =
        tone === 'red'
          ? '/images/contact/pathways/swoosh-pink.svg'
          : '/images/contact/pathways/swoosh-blue.svg';

      return {
        title: card.title,
        description: card.description,
        actionLabel: card.actionLabel || 'Learn More',
        href: card.href || '#',
        actionTone: tone,
        iconSrc: card.icon?.url || (tone === 'red' ? '/images/contact/pathways/solutions.svg' : '/images/contact/pathways/buyers.svg'),
        swooshSrc: card.swooshImage?.url || defaultSwoosh,
      };
    });

    return (
      <ContactPathwaysSection
        key={`contact-pathways-${index}`}
        titleLead={cp.titleLead ?? undefined}
        titleClose={cp.titleClose ?? undefined}
        description={cp.description ?? undefined}
        pathways={pathways && pathways.length > 0 ? pathways : undefined}
      />
    );
  },

  ComponentReferencesContactLearnReference: (section, index) => {
    const clRef = section as ContactLearnReference;
    const cl = clRef.contactLearnSection;
    if (!cl) return null;

    const cards = cl.cards?.map((card, idx) => ({
      number: card.number || String(idx + 1).padStart(2, '0'),
      title: card.title,
      description: card.description,
      actionLabel: card.actionLabel || 'Learn More',
      href: card.href || '#',
      featured: card.isHighlighted ?? (idx === 1),
      imageSrc: card.icon?.url || undefined,
    }));

    return (
      <ContactLearnSection
        key={`contact-learn-${index}`}
        titleLead={cl.titleLead ?? undefined}
        titleClose={cl.titleClose ?? undefined}
        description={cl.description ?? undefined}
        imageSrc={cl.defaultImage?.url ?? undefined}
        cards={cards && cards.length > 0 ? cards : undefined}
      />
    );
  },

  ComponentReferencesContactOfficesReference: (section, index) => {
    const coRef = section as ContactOfficesReference;
    const co = coRef.contactOfficesSection;
    if (!co) return null;

    const offices = co.cards?.map((card) => {
      const details = [];
      if (card.phone) {
        details.push({
          label: 'Phone',
          parts: [{ text: card.phone, href: `tel:${card.phone.replace(/[^+\d]/g, '')}` }],
        });
      }
      if (card.fax) {
        details.push({
          label: 'Fax',
          parts: [{ text: card.fax }],
        });
      }

      return {
        name: card.title,
        address: card.address || card.description,
        details,
      };
    });

    return (
      <ContactOfficesSection
        key={`contact-offices-${index}`}
        markerLabel={co.markerLabel ?? undefined}
        mapSrc={co.mapImage?.url ?? undefined}
        offices={offices && offices.length > 0 ? offices : undefined}
      />
    );
  },

  // Frontend-only Figma bands — used by local mocks until Strapi types exist.
  MockWorkforcePlanning: (_section, index) => (
    <WorkforcePlanningSection key={`workforce-planning-${index}`} />
  ),
  MockOurCapabilities: (_section, index) => (
    <OurCapabilitiesSection key={`our-capabilities-${index}`} />
  ),
  MockAccountableOperatingEnvironments: (_section, index) => (
    <AccountableOperatingEnvironmentsSection key={`accountable-operating-environments-${index}`} />
  ),
  MockTakeMissionSeriously: (_section, index) => (
    <TakeMissionSeriouslySection key={`take-mission-seriously-${index}`} />
  ),
  MockCeoMessage: (_section, index) => (
    <CeoMessageSection key={`ceo-message-${index}`} />
  ),
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
  index: number,
  options?: SectionRenderOptions,
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
  return renderer(section, index, options);
}
