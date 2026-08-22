import React from 'react';
import type { HomeDynamicZoneSection, BannerReference, CtaReference } from '@/lib/schemas';
import { HeroSection, NeedHelpSection } from '@/components/organisms';

/**
 * Component Registry Pattern: Maps Strapi GraphQL __typename to component renderers.
 * Scalable architecture — adding a new Strapi component requires registering only 1 handler here.
 */
export const SECTION_REGISTRY: Record<
  string,
  (section: HomeDynamicZoneSection, index: number) => React.ReactNode
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
        ctaLabel={promo?.link?.label ?? undefined}
        ctaHref={promo?.link?.href ?? undefined}
      />
    );
  },
};

/**
 * Resolves a dynamic zone section from the Component Registry.
 */
export function renderRegisteredSection(
  section: HomeDynamicZoneSection,
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
