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
    categories {
      documentId
      name
      faqs {
        documentId
        referenceTitle
        faq { ${HEADING_FIELDS} }
      }
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

export const LEGAL_CONTENT_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesLegalContent {
    title
    body
    showToc
    titleColor
    bodyColor
  }
`;

export const ACHIEVEMENTS_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesAchievements {
    ourAchievement {
      documentId
      referenceTitle
      title
      bgImage { ${IMAGE_FIELDS} }
      counter {
        title
        counter
      }
      achievementCards {
        documentId
        referenceTitle
        card {
          year
          title
          description
          logo { ${IMAGE_FIELDS} }
        }
      }
    }
  }
`;

// Every dynamic-zone inline fragment, joined with newlines. Used by any query
// that selects a Strapi dynamic zone (pages, home, about, and future content
// types). Declared above PAGE_FIELDS because that fragment interpolates it.
export const DYNAMIC_SECTION_FRAGMENTS = [
  BANNER_REFERENCE_FIELDS,
  CTA_REFERENCE_FIELDS,
  FAQS_REFERENCE_FIELDS,
  CLIENT_LOGOS_REFERENCE_FIELDS,
  SERVICE_REFERENCE_FIELDS,
  MISSION_REFERENCE_FIELDS,
  ACHIEVEMENTS_REFERENCE_FIELDS,
  LEGAL_CONTENT_REFERENCE_FIELDS,
].join('\n');

export const PAGE_FIELDS = `
  documentId
  internalName
  pageTitle
  slug
  pageType
  variant
  seo { ${SEO_FIELDS} }
  Section {
    ${DYNAMIC_SECTION_FRAGMENTS}
  }
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