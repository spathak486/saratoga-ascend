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

export const CEO_MESSAGE_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesCeoMessageReference {
    ceoMessageSection {
      documentId
      title
      highlightTitle
      description
      authorName
      authorRole
      image { ${IMAGE_FIELDS} }
      bgWatermarkImage { ${IMAGE_FIELDS} }
    }
  }
`;

export const SUPPORTING_MISSION_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesSupportingMissionReference {
    supportingMissionSection {
      documentId
      title
      description
      image { ${IMAGE_FIELDS} }
      cta { ${GENERAL_LINK_FIELDS} }
    }
  }
`;

export const PAST_PERFORMANCE_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesPastPerformanceReference {
    pastPerformanceHeading: heading
    subheading
    caseStudies {
      documentId
      title
      slug
      summary
      client
      author
      articleDate
      readTime
      image { ${IMAGE_FIELDS} }
    }
  }
`;

export const MISSION_VISION_PROMISE_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesMissionVisionPromiseReference {
    missionVisionPromiseSection {
      documentId
      title
      highlightTitle
      description
      bgWatermarkImage { ${IMAGE_FIELDS} }
      cards {
        documentId
        title
        description
        number
        isHighlighted
        icon { ${IMAGE_FIELDS} }
      }
    }
  }
`;

export const BUILT_AROUND_MISSIONS_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesBuiltAroundMissionsReference {
    builtAroundMissionsSection {
      documentId
      title
      highlightTitle
      description
      calloutHighlight
      calloutText
      cards {
        id
        number
        title
        description
        isHighlighted
      }
    }
  }
`;

export const TAKE_MISSION_SERIOUSLY_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesTakeMissionSeriouslyReference {
    takeMissionSeriouslySection {
      documentId
      title
      highlightTitle
      cards {
        documentId
        title
        description
        number
        isHighlighted
        icon { ${IMAGE_FIELDS} }
      }
    }
  }
`;

export const ACCOUNTABLE_OPERATING_ENVIRONMENTS_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesAccountableOperatingEnvironmentsReference {
    accountableOperatingEnvironmentsSection {
      documentId
      title
      highlightTitle
      cards {
        documentId
        title
        description
        number
        isHighlighted
        icon { ${IMAGE_FIELDS} }
      }
    }
  }
`;

export const OUR_CAPABILITIES_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesOurCapabilitiesReference {
    ourCapabilitiesSection {
      documentId
      title
      highlightTitle
      description
      bgImage { ${IMAGE_FIELDS} }
      cards {
        documentId
        title
        description
        number
        isHighlighted
        icon { ${IMAGE_FIELDS} }
      }
    }
  }
`;

export const WORKFORCE_PLANNING_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesWorkforcePlanningReference {
    workforcePlanningSection {
      documentId
      title
      highlightTitle
      cards {
        documentId
        title
        description
        number
        isHighlighted
        icon { ${IMAGE_FIELDS} }
      }
    }
  }
`;

// Common dynamic-zone inline fragments supported by Blog.Section in Strapi
export const BLOG_SECTION_FRAGMENTS = [
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
  CEO_MESSAGE_REFERENCE_FIELDS,
  SUPPORTING_MISSION_REFERENCE_FIELDS,
  PAST_PERFORMANCE_REFERENCE_FIELDS,
].join('\n');

export const CONTACT_INQUIRY_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesContactInquiryReference {
    contactInquirySection {
      documentId
      referenceTitle
      titleLead
      titleAccent
      titleClose
      description
      address
      email
      phone
      statementLabel
      statementFile { ${IMAGE_FIELDS} }
    }
  }
`;

export const CONTACT_PATHWAYS_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesContactPathwaysReference {
    contactPathwaysSection {
      documentId
      referenceTitle
      titleLead
      titleClose
      description
      cards {
        documentId
        title
        description
        number
        isHighlighted
        actionLabel
        href
        actionTone
        icon { ${IMAGE_FIELDS} }
        swooshImage { ${IMAGE_FIELDS} }
      }
    }
  }
`;

export const CONTACT_LEARN_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesContactLearnReference {
    contactLearnSection {
      documentId
      referenceTitle
      titleLead
      titleClose
      description
      defaultImage { ${IMAGE_FIELDS} }
      cards {
        documentId
        title
        description
        number
        isHighlighted
        actionLabel
        href
        icon { ${IMAGE_FIELDS} }
      }
    }
  }
`;

export const CONTACT_OFFICES_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesContactOfficesReference {
    contactOfficesSection {
      documentId
      referenceTitle
      markerLabel
      mapImage { ${IMAGE_FIELDS} }
      cards {
        documentId
        title
        description
        address
        phone
        fax
      }
    }
  }
`;

// Dynamic-zone inline fragments supported by Page.Section
export const COMMON_SECTION_FRAGMENTS = [
  BLOG_SECTION_FRAGMENTS,
  MISSION_VISION_PROMISE_REFERENCE_FIELDS,
  BUILT_AROUND_MISSIONS_REFERENCE_FIELDS,
  TAKE_MISSION_SERIOUSLY_REFERENCE_FIELDS,
  ACCOUNTABLE_OPERATING_ENVIRONMENTS_REFERENCE_FIELDS,
  OUR_CAPABILITIES_REFERENCE_FIELDS,
  WORKFORCE_PLANNING_REFERENCE_FIELDS,
  CONTACT_INQUIRY_REFERENCE_FIELDS,
  CONTACT_PATHWAYS_REFERENCE_FIELDS,
  CONTACT_LEARN_REFERENCE_FIELDS,
  CONTACT_OFFICES_REFERENCE_FIELDS,
].join('\n');

// Page dynamic zone includes blog listing and any page-specific fragments.
export const PAGE_SECTION_FRAGMENTS = [
  COMMON_SECTION_FRAGMENTS,
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
  description
  image { ${IMAGE_FIELDS} }
  seo { ${SEO_FIELDS} }
  Section {
    ${BLOG_SECTION_FRAGMENTS}
  }
`;

export const BLOG_ITEM_FIELDS = `
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
  socialLinks {
    platform
    title
    url
    icon { ${IMAGE_FIELDS} }
  }
`;

export const BLOG_FIELDS = `
  ${BLOG_ITEM_FIELDS}
  seo { ${SEO_FIELDS} }
  Section {
    ${BLOG_SECTION_FRAGMENTS}
  }
`;