// Raw shape of every Strapi GraphQL response this app consumes — before any
// media resolution or Zod validation. Keep these mirroring the field
// selections in `./queries/*` so a rename in one place can't silently drift
// from the other. Services + transformers + schema layer all import from here.

import type { Pagination } from '@/lib/schemas/common';
import type { RawStrapiMedia } from '@/lib/api/strapi';

export type PublicationStatus = 'DRAFT' | 'PUBLISHED';

export interface RawGeneralLink {
  label: string;
  href: string;
  target?: string | null;
  isExternal?: boolean | null;
  description?: string | null;
  icon?: RawStrapiMedia | null;
}

export interface RawSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: RawStrapiMedia | null;
  metaRobots?: string | null;
  twitterCardTitle?: string | null;
  canonicalURL?: string | null;
  structuredData?: unknown;
  languageTag?: string | null;
}

/** An article-style content node (Strapi `articles` collection). */
export interface RawContentNode {
  documentId: string;
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  excerpt?: string | null;
  author?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  featuredImage?: RawStrapiMedia | null;
  seo?: RawSeo | null;
}

export interface RawHeroBanner {
  bannerTitle: string;
  bannerSubTitle?: string | null;
  bannerDescription?: string | null;
  bannerImage?: RawStrapiMedia | null;
  buttonCTA?: RawGeneralLink | null;
}

export interface RawPromo {
  title?: string | null;
  subTitle?: string | null;
  description?: string | null;
  image?: RawStrapiMedia | null;
  link?: RawGeneralLink | null;
}

// ---------------------------------------------------------------------------
// Dynamic-zone section raw shapes, keyed by __typename.
// ---------------------------------------------------------------------------

export interface RawBannerReference {
  __typename: 'ComponentReferencesBannerReference';
  heroBanner?: {
    documentId?: string;
    referenceTitle?: string | null;
    banner?: RawHeroBanner | null;
  } | null;
}

export interface RawCtaReference {
  __typename: 'ComponentReferencesCta';
  cta?: {
    documentId?: string;
    referenceTitle?: string | null;
    cta?: RawPromo | null;
  } | null;
}

export interface RawFaqItem {
  title?: string | null;
  description?: string | null;
}

export interface RawFaqEntity {
  documentId?: string;
  referenceTitle?: string | null;
  faq?: RawFaqItem | null;
}

export interface RawFaqsReference {
  __typename: 'ComponentReferencesFaQs' | 'ComponentReferencesFaqs';
  content?: {
    documentId?: string;
    referenceTitle?: string | null;
    ContentSection?: RawPromo | null;
  } | null;
  faqs?: RawFaqEntity[] | null;
}

export interface RawClientLogosReference {
  __typename: 'ComponentReferencesClientLogosReference';
  clientLogosSection?: {
    documentId?: string;
    referenceTitle?: string | null;
    title?: string | null;
    description?: string | null;
    logos?: RawStrapiMedia[] | null;
  } | null;
}

export interface RawServiceEntity {
  documentId?: string;
  pageTitle?: string | null;
  slug?: string | null;
  title?: string | null;
  summary?: string | null;
  cta?: RawGeneralLink | null;
  image?: RawStrapiMedia | null;
}

export interface RawServiceReference {
  __typename: 'ComponentReferencesServiceReference';
  heading?: {
    title?: string | null;
    description?: string | null;
  } | null;
  services?: RawServiceEntity[] | null;
}

export interface RawMissionHighlight {
  id?: string;
  text: string;
}

export interface RawMissionReference {
  __typename: 'ComponentReferencesMissionReference';
  missionSection?: {
    documentId?: string;
    title?: string | null;
    description?: string | null;
    image?: RawStrapiMedia | null;
    shieldIcon?: RawStrapiMedia | null;
    pulseIcon?: RawStrapiMedia | null;
    highlights?: RawMissionHighlight[] | null;
  } | null;
}

export interface RawCounter {
  title?: string | null;
  counter?: string | null;
}

export interface RawAchievementCardItem {
  year?: string | null;
  title?: string | null;
  description?: string | null;
  logo?: RawStrapiMedia | null;
}

export interface RawAchievementCard {
  documentId?: string;
  referenceTitle?: string | null;
  card?: RawAchievementCardItem | null;
}

export interface RawOurAchievement {
  documentId?: string;
  referenceTitle?: string | null;
  title?: string | null;
  bgImage?: RawStrapiMedia | null;
  counter?: RawCounter[] | null;
  achievementCards?: RawAchievementCard[] | null;
}

export interface RawAchievementsReference {
  __typename: 'ComponentReferencesAchievements';
  ourAchievement?: RawOurAchievement | null;
}

/**
 * Anything a Strapi dynamic zone can return. The catch-all member keeps
 * forward compatibility: components not yet registered resolve through Zod
 * and the registry instead of breaking the type.
 */
export type RawDynamicZoneSection =
  | RawBannerReference
  | RawCtaReference
  | RawFaqsReference
  | RawClientLogosReference
  | RawServiceReference
  | RawMissionReference
  | RawAchievementsReference
  | ({ __typename: string } & Record<string, unknown>);

/** Universal slug-driven page (Strapi `pages` collection). */
export interface RawPageNode {
  documentId: string;
  internalName?: string | null;
  pageTitle: string;
  slug: string;
  pageType?: string | null;
  variant?: string | null;
  seo?: RawSeo | null;
  Section?: RawDynamicZoneSection[] | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface RawFooterLinkColumn {
  heading: string;
  links?: RawGeneralLink[] | null;
}

export interface RawFooter {
  documentId: string;
  headline?: string | null;
  newsletterHeading?: string | null;
  privacyConsentText?: string | null;
  privacyConsentLink?: RawGeneralLink | null;
  linkColumns?: RawFooterLinkColumn[] | null;
  contactHeading?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  copyrightText?: string | null;
  logo?: RawStrapiMedia | null;
  legalLinks?: RawGeneralLink[] | null;
}

/** `articles_connection` pagination payload as returned by GraphQL. */
export interface RawPaginationConnection<T> {
  nodes: T[];
  pageInfo: Pagination;
}