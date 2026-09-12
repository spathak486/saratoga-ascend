import React from 'react';
import type {
  DynamicZoneSection,
  BannerReference,
  ClientLogosReference,
  CtaReference,
  FaqsReference,
  ServiceReference,
  MissionReference,
} from '@/lib/schemas';
import {
  HeroSection,
  NeedHelpSection,
  FaqSection,
  ClientLogosSection,
  MarketWeServeSection,
  MissionSection,
} from '@/components/organisms';

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
