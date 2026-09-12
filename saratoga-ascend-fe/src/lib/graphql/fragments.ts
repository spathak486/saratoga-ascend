// GraphQL field fragments — the shared building blocks for every query
// document. Pure string composition; no logic, no loading. Reuse these
// fragments instead of duplicating field selections across query files.

export const IMAGE_FIELDS = `
  url
  width
  height
  alternativeText
  mime
  ext
  formats
`;

export const GENERAL_LINK_FIELDS = `
  label
  href
  target
  isExternal
  description
  icon { ${IMAGE_FIELDS} }
`;

export const SEO_FIELDS = `
  metaTitle
  metaDescription
  ogTitle
  ogDescription
  ogImage { ${IMAGE_FIELDS} }
  metaRobots
  twitterCardTitle
  canonicalURL
  structuredData
  languageTag
`;

export const PAGE_FIELDS = `
  documentId
  title
  slug
  content
  createdAt
  updatedAt
  featuredImage { ${IMAGE_FIELDS} }
  seo { ${SEO_FIELDS} }
`;

export const ARTICLE_FIELDS = `
  documentId
  title
  slug
  content
  excerpt
  author
  category
  publishedAt
  createdAt
  updatedAt
  featuredImage { ${IMAGE_FIELDS} }
  seo { ${SEO_FIELDS} }
`;

export const BANNER_FIELDS = `
  bannerTitle
  bannerSubTitle
  bannerDescription
  bannerImage { ${IMAGE_FIELDS} }
  buttonCTA { ${GENERAL_LINK_FIELDS} }
`;

export const PROMO_FIELDS = `
  title
  subTitle
  description
  image { ${IMAGE_FIELDS} }
  link { ${GENERAL_LINK_FIELDS} }
`;

export const HEADING_FIELDS = `
  title
  description
`;

export const BANNER_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesBannerReference {
    heroBanner {
      documentId
      referenceTitle
      banner { ${BANNER_FIELDS} }
    }
  }
`;

export const CTA_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesCta {
    cta {
      documentId
      referenceTitle
      cta { ${PROMO_FIELDS} }
    }
  }
`;

export const FAQS_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesFaQs {
    content {
      documentId
      referenceTitle
      ContentSection { ${PROMO_FIELDS} }
    }
    faqs {
      documentId
      referenceTitle
      faq { ${HEADING_FIELDS} }
    }
  }
`;

export const CLIENT_LOGOS_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesClientLogosReference {
    clientLogosSection {
      documentId
      referenceTitle
      title
      description
      logos { ${IMAGE_FIELDS} }
    }
  }
`;

export const SERVICE_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesServiceReference {
    heading {
      title
      description
    }
    services {
      documentId
      pageTitle
      slug
      title
      summary
      cta { ${GENERAL_LINK_FIELDS} }
      image { ${IMAGE_FIELDS} }
    }
  }
`;

export const MISSION_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesMissionReference {
    missionSection {
      documentId
      title
      description
      image { ${IMAGE_FIELDS} }
      shieldIcon { ${IMAGE_FIELDS} }
      pulseIcon { ${IMAGE_FIELDS} }
      highlights {
        id
        text
      }
    }
  }
`;

// Every dynamic-zone inline fragment, joined with newlines. Used by any query
// that selects a Strapi dynamic zone (home, about, and future content types).
export const DYNAMIC_SECTION_FRAGMENTS = [
  BANNER_REFERENCE_FIELDS,
  CTA_REFERENCE_FIELDS,
  FAQS_REFERENCE_FIELDS,
  CLIENT_LOGOS_REFERENCE_FIELDS,
  SERVICE_REFERENCE_FIELDS,
  MISSION_REFERENCE_FIELDS,
].join('\n');