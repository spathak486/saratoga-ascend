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
  LegalPolicySection,
} from '@/components/organisms';

function renderFaqSection(faqsRef: FaqsReference, index: number) {
  const promo = faqsRef.content?.ContentSection;
  
  const items: { question: string; answer: string; categories: { name: string }[] }[] = [];
  const itemsMap = new Map<string, { question: string; answer: string; categories: Set<string> }>();

  if (faqsRef.categories) {
    for (const cat of faqsRef.categories) {
      if (!cat.faqs) continue;
      for (const f of cat.faqs) {
        const q = f.faq?.title || f.referenceTitle;
        const a = f.faq?.description;
        if (!q) continue;
        const cleanAnswer = a ? a.replace(/<[^>]*>/g, '').trim() : '';
        
        if (itemsMap.has(q)) {
          itemsMap.get(q)!.categories.add(cat.name);
        } else {
          itemsMap.set(q, {
            question: q,
            answer: cleanAnswer,
            categories: new Set([cat.name])
          });
        }
      }
    }
  }

  itemsMap.forEach((val) => {
    items.push({
      question: val.question,
      answer: val.answer,
      categories: Array.from(val.categories).map(name => ({ name }))
    });
  });

  return (
    <FaqSection
      key={`faqs-${index}`}
      title={promo?.title ?? undefined}
      subTitle={promo?.subTitle ?? undefined}
      description={promo?.description ?? undefined}
      imageSrc={promo?.image?.url ?? undefined}
      items={items && items.length > 0 ? items : undefined}
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
