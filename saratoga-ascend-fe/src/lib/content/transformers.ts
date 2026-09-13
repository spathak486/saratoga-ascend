import 'server-only';
import { unwrapImage } from '@/lib/api/strapi';
import type {
  RawBannerReference,
  RawClientLogosReference,
  RawContentNode,
  RawCtaReference,
  RawDynamicZoneSection,
  RawFaqsReference,
  RawGeneralLink,
  RawMissionReference,
  RawPageNode,
  RawSeo,
  RawServiceReference,
} from '@/lib/graphql';

// Pure transforms: turn raw Strapi GraphQL shapes into the resolved shapes
// the Zod schemas validate against. Media URLs are the only thing that
// changes — every helper here is reusable across services.

function resolveLink(link: RawGeneralLink | null | undefined) {
  return link ? { ...link, icon: unwrapImage(link.icon) } : link;
}

export function resolveSeo(
  seo: RawSeo | null | undefined
): RawSeo | null | undefined {
  return seo ? { ...seo, ogImage: unwrapImage(seo.ogImage) } : (seo ?? null);
}

/** Resolves the media URL fields on a page/article content node. */
export function resolveImages(node: RawContentNode): RawContentNode {
  return {
    ...node,
    featuredImage: unwrapImage(node.featuredImage),
    seo: resolveSeo(node.seo),
  };
}

/**
 * Resolves every media URL nested inside a dynamic-zone section, dispatching
 * on `__typename`. Sections without media pass through untouched. The
 * wildcard member of `RawDynamicZoneSection` defeats automatic narrowing, so
 * each case narrows with an explicit cast to its raw reference type.
 */
export function resolveSectionImages(
  section: RawDynamicZoneSection
): RawDynamicZoneSection {
  switch (section.__typename) {
    case 'ComponentReferencesBannerReference': {
      const heroBanner = (section as RawBannerReference).heroBanner;
      if (!heroBanner?.banner) return section;
      return {
        ...section,
        heroBanner: {
          ...heroBanner,
          banner: {
            ...heroBanner.banner,
            bannerImage: unwrapImage(heroBanner.banner.bannerImage),
            buttonCTA: resolveLink(heroBanner.banner.buttonCTA),
          },
        },
      };
    }

    case 'ComponentReferencesFaQs':
    case 'ComponentReferencesFaqs': {
      const content = (section as RawFaqsReference).content;
      if (!content?.ContentSection) return section;
      return {
        ...section,
        content: {
          ...content,
          ContentSection: {
            ...content.ContentSection,
            image: unwrapImage(content.ContentSection.image),
          },
        },
      };
    }

    case 'ComponentReferencesCta': {
      const ctaRef = (section as RawCtaReference).cta;
      if (!ctaRef?.cta) return section;
      return {
        ...section,
        cta: {
          ...ctaRef,
          cta: {
            ...ctaRef.cta,
            image: unwrapImage(ctaRef.cta.image),
          },
        },
      };
    }

    case 'ComponentReferencesClientLogosReference': {
      const cls = (section as RawClientLogosReference).clientLogosSection;
      if (!cls) return section;
      const rawLogos = cls.logos;
      return {
        ...section,
        clientLogosSection: {
          ...cls,
          logos: rawLogos ? rawLogos.map((logo) => unwrapImage(logo)).filter(Boolean) : null,
        },
      };
    }

    case 'ComponentReferencesServiceReference': {
      const svcRef = section as RawServiceReference;
      return {
        ...section,
        services: svcRef.services
          ? svcRef.services.map((svc) => ({
              ...svc,
              image: unwrapImage(svc.image),
              cta: resolveLink(svc.cta),
            }))
          : null,
      };
    }

    case 'ComponentReferencesMissionReference': {
      const ms = (section as RawMissionReference).missionSection;
      if (!ms) return section;
      return {
        ...section,
        missionSection: {
          ...ms,
          image: unwrapImage(ms.image),
          shieldIcon: unwrapImage(ms.shieldIcon),
          pulseIcon: unwrapImage(ms.pulseIcon),
        },
      };
    }

    default:
      return section;
  }
}

/** Resolves the seo + every dynamic section on a universal page entry. */
export function resolvePageNode(raw: RawPageNode): RawPageNode {
  return {
    ...raw,
    seo: resolveSeo(raw.seo),
    Section: raw.Section ? raw.Section.map((sec) => resolveSectionImages(sec)) : raw.Section,
  };
}