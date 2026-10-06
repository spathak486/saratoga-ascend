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
  variant
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
    supportCta {
      documentId
      referenceTitle
      ContentSection { ${PROMO_FIELDS} }
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
      highlights {
        id
        text
        subtext
      }
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
      cta { ${GENERAL_LINK_FIELDS} }
      highlights {
        id
        text
        subtext
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

export const WHAT_WE_DO_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesWhatWeDoReference {
    whatWeDoSection {
      documentId
      referenceTitle
      title
      description
      cta { ${GENERAL_LINK_FIELDS} }
      photo { ${IMAGE_FIELDS} }
      emblem { ${IMAGE_FIELDS} }
      video { ${IMAGE_FIELDS} }
      videoCopy
      services {
        documentId
        pageTitle
        slug
        title
        summary
        cta { ${GENERAL_LINK_FIELDS} }
        image { ${IMAGE_FIELDS} }
        highlights {
          id
          text
          subtext
        }
      }
      customItems {
        id
        title
        summary
        cta { ${GENERAL_LINK_FIELDS} }
        image { ${IMAGE_FIELDS} }
        highlights {
          id
          text
          subtext
        }
      }
    }
  }
`;

export const HAPPY_CLIENTS_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesHappyClientsReference {
    title
    description
    reviews {
      documentId
      role
      name
      place
      quote
      photos { ${IMAGE_FIELDS} }
    }
  }
`;

export const BLOG_LISTING_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesBlogListing {
    blogHeading: heading
    subheading
  }
`;

// Common dynamic-zone inline fragments shared by articles, blogs, and pages.
export const COMMON_SECTION_FRAGMENTS = [
  BANNER_REFERENCE_FIELDS,
  CTA_REFERENCE_FIELDS,
  FAQS_REFERENCE_FIELDS,
  CLIENT_LOGOS_REFERENCE_FIELDS,
  SERVICE_REFERENCE_FIELDS,
  MISSION_REFERENCE_FIELDS,
  ACHIEVEMENTS_REFERENCE_FIELDS,
  LEGAL_CONTENT_REFERENCE_FIELDS,
  WHAT_WE_DO_REFERENCE_FIELDS,
  HAPPY_CLIENTS_REFERENCE_FIELDS,
].join('\n');

// Page-specific dynamic-zone fragments (includes Blog Listing which is only for Pages)
export const PAGE_SECTION_FRAGMENTS = [
  ...COMMON_SECTION_FRAGMENTS.split('\n'),
  BLOG_LISTING_REFERENCE_FIELDS,
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
    ${PAGE_SECTION_FRAGMENTS}
  }
`;

export const ARTICLE_FIELDS = `
  documentId
  title
  slug
  summary
  articleDate
  readTime
  categoryType
  author
  topic
  description
  image { ${IMAGE_FIELDS} }
  seo { ${SEO_FIELDS} }
  Section {
    ${COMMON_SECTION_FRAGMENTS}
  }
`;

export const BLOG_FIELDS = `
  documentId
  title
  slug
  summary
  articleDate
  readTime
  categoryType
  author
  category {
    name
    slug
  }
  description
  image { ${IMAGE_FIELDS} }
  seo { ${SEO_FIELDS} }
  Section {
    ${COMMON_SECTION_FRAGMENTS}
  }
`;