import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { unwrapImage, type RawStrapiMedia } from '@/lib/api/strapi';
import {
  PageSchema,
  ArticleSchema,
  HomePageSchema,
  AboutPageSchema,
  FooterDataSchema,
  type Page,
  type Article,
  type HomePage,
  type AboutPage,
  type FooterData,
  type Pagination,
  type ApiResult,
  ok,
  fail,
} from '@/lib/schemas';
import {
  getMockPageBySlug,
  getMockArticles,
  getMockArticleBySlug,
  getMockAllPageSlugs,
  getMockAllArticleSlugs,
  getMockHomePage,
  getMockAboutUsPage,
  getMockFooterData,
} from '@/lib/mocks';


// Pages and articles never import the REST or GraphQL client directly —
// this is the only file that fetches content data.

const IMAGE_FIELDS = `
  url
  width
  height
  alternativeText
  mime
  ext
  formats
`;

const GENERAL_LINK_FIELDS = `
  label
  href
  target
  isExternal
  description
  icon { ${IMAGE_FIELDS} }
`;

const SEO_FIELDS = `
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

const PAGE_FIELDS = `
  documentId
  title
  slug
  content
  createdAt
  updatedAt
  featuredImage { ${IMAGE_FIELDS} }
  seo { ${SEO_FIELDS} }
`;

const ARTICLE_FIELDS = `
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

const BANNER_FIELDS = `
  bannerTitle
  bannerSubTitle
  bannerDescription
  bannerImage { ${IMAGE_FIELDS} }
  buttonCTA { ${GENERAL_LINK_FIELDS} }
`;

const BANNER_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesBannerReference {
    heroBanner {
      documentId
      referenceTitle
      banner { ${BANNER_FIELDS} }
    }
  }
`;

const PROMO_FIELDS = `
  title
  subTitle
  description
  image { ${IMAGE_FIELDS} }
  link { ${GENERAL_LINK_FIELDS} }
`;

const CTA_REFERENCE_FIELDS = `
  __typename
  ... on ComponentReferencesCta {
    cta {
      documentId
      referenceTitle
      cta { ${PROMO_FIELDS} }
    }
  }
`;

const HEADING_FIELDS = `
  title
  description
`;

const FAQS_REFERENCE_FIELDS = `
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

const CLIENT_LOGOS_REFERENCE_FIELDS = `
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

const SERVICE_REFERENCE_FIELDS = `
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

const MISSION_REFERENCE_FIELDS = `
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

const DYNAMIC_SECTION_FRAGMENTS = [
  BANNER_REFERENCE_FIELDS,
  CTA_REFERENCE_FIELDS,
  FAQS_REFERENCE_FIELDS,
  CLIENT_LOGOS_REFERENCE_FIELDS,
  SERVICE_REFERENCE_FIELDS,
  MISSION_REFERENCE_FIELDS,
].join('\n');

const PAGE_BY_SLUG_QUERY = `
  query GetPageBySlug($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) { ${PAGE_FIELDS} }
  }
`;

// Uses the *_connection form because it's the only one that returns
// pagination metadata (page/pageSize/pageCount/total) alongside the list.
const ARTICLES_QUERY = `
  query GetArticles($page: Int!, $pageSize: Int!) {
    articles_connection(
      pagination: { page: $page, pageSize: $pageSize }
      sort: "publishedAt:desc"
      filters: { publishedAt: { notNull: true } }
    ) {
      nodes { ${ARTICLE_FIELDS} }
      pageInfo { page pageSize pageCount total }
    }
  }
`;

const ARTICLE_BY_SLUG_QUERY = `
  query GetArticleBySlug($slug: String!) {
    articles(filters: { slug: { eq: $slug } }) { ${ARTICLE_FIELDS} }
  }
`;

const ALL_PAGE_SLUGS_QUERY = `
  query GetAllPageSlugs {
    pages { slug }
  }
`;

const ALL_ARTICLE_SLUGS_QUERY = `
  query GetAllArticleSlugs {
    articles(filters: { publishedAt: { notNull: true } }) { slug }
  }
`;

const HOME_PAGE_QUERY = `
  query GetHomePage($status: PublicationStatus) {
    home(status: $status) {
      documentId
      pageTitle
      slug
      seo { ${SEO_FIELDS} }
      Section {
        ${DYNAMIC_SECTION_FRAGMENTS}
      }
    }
  }
`;

const ABOUT_US_PAGE_QUERY = `
  query GetAboutUsPage($status: PublicationStatus) {
    aboutUs(status: $status) {
      documentId
      pageTitle
      slug
      seo { ${SEO_FIELDS} }
      Section {
        ${DYNAMIC_SECTION_FRAGMENTS}
      }
    }
  }
`;

const FOOTER_QUERY = `
  query GetFooter($status: PublicationStatus) {
    footer(status: $status) {
      documentId
      headline
      newsletterHeading
      privacyConsentText
      privacyConsentLink { ${GENERAL_LINK_FIELDS} }
      linkColumns {
        heading
        links { ${GENERAL_LINK_FIELDS} }
      }
      contactHeading
      contactEmail
      contactPhone
      copyrightText
      logo { ${IMAGE_FIELDS} }
      legalLinks { ${GENERAL_LINK_FIELDS} }
    }
  }
`;


// The raw GraphQL node only matters long enough to resolve media URLs —
// Zod is the actual contract once that's done.
type RawContentNode = Record<string, unknown> & {
  featuredImage?: RawStrapiMedia | null;
  seo?: (Record<string, unknown> & { ogImage?: RawStrapiMedia | null }) | null;
};

function resolveImages(node: RawContentNode) {
  return {
    ...node,
    featuredImage: unwrapImage(node.featuredImage),
    seo: node.seo ? { ...node.seo, ogImage: unwrapImage(node.seo.ogImage) } : node.seo,
  };
}

function resolveSectionImages(section: Record<string, unknown>) {
  if (section.__typename === 'ComponentReferencesBannerReference' && section.heroBanner) {
    const heroBanner = section.heroBanner as Record<string, unknown>;
    if (heroBanner.banner) {
      const banner = heroBanner.banner as Record<string, unknown>;
      return {
        ...section,
        heroBanner: {
          ...heroBanner,
          banner: {
            ...banner,
            bannerImage: unwrapImage(banner.bannerImage as RawStrapiMedia | null),
            buttonCTA: banner.buttonCTA
              ? {
                  ...(banner.buttonCTA as Record<string, unknown>),
                  icon: unwrapImage(
                    (banner.buttonCTA as Record<string, unknown>).icon as RawStrapiMedia | null
                  ),
                }
              : null,
          },
        },
      };
    }
  }

  if (
    (section.__typename === 'ComponentReferencesFaQs' ||
      section.__typename === 'ComponentReferencesFaqs') &&
    section.content
  ) {
    const content = section.content as Record<string, unknown>;
    if (content.ContentSection) {
      const cs = content.ContentSection as Record<string, unknown>;
      return {
        ...section,
        content: {
          ...content,
          ContentSection: {
            ...cs,
            image: unwrapImage(cs.image as RawStrapiMedia | null),
          },
        },
      };
    }
  }

  if (section.__typename === 'ComponentReferencesCta' && section.cta) {
    const ctaRef = section.cta as Record<string, unknown>;
    if (ctaRef.cta) {
      const cta = ctaRef.cta as Record<string, unknown>;
      return {
        ...section,
        cta: {
          ...ctaRef,
          cta: {
            ...cta,
            image: unwrapImage(cta.image as RawStrapiMedia | null),
          },
        },
      };
    }
  }

  if (section.__typename === 'ComponentReferencesClientLogosReference' && section.clientLogosSection) {
    const cls = section.clientLogosSection as Record<string, unknown>;
    const rawLogos = cls.logos as RawStrapiMedia[] | null | undefined;
    return {
      ...section,
      clientLogosSection: {
        ...cls,
        logos: rawLogos ? rawLogos.map((logo) => unwrapImage(logo)).filter(Boolean) : null,
      },
    };
  }

  if (section.__typename === 'ComponentReferencesServiceReference') {
    const rawServices = section.services as Array<Record<string, unknown>> | null | undefined;
    return {
      ...section,
      services: rawServices
        ? rawServices.map((svc) => ({
            ...svc,
            image: unwrapImage(svc.image as RawStrapiMedia | null),
            cta: svc.cta
              ? {
                  ...(svc.cta as Record<string, unknown>),
                  icon: unwrapImage(
                    (svc.cta as Record<string, unknown>).icon as RawStrapiMedia | null
                  ),
                }
              : null,
          }))
        : null,
    };
  }

  if (section.__typename === 'ComponentReferencesMissionReference' && section.missionSection) {
    const ms = section.missionSection as Record<string, unknown>;
    return {
      ...section,
      missionSection: {
        ...ms,
        image: unwrapImage(ms.image as RawStrapiMedia | null),
        shieldIcon: unwrapImage(ms.shieldIcon as RawStrapiMedia | null),
        pulseIcon: unwrapImage(ms.pulseIcon as RawStrapiMedia | null),
      },
    };
  }

  return section;
}


/** Used by /about, /contact, /terms, /[slug]. */
export async function getPageBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    const page = getMockPageBySlug(slug);
    return page ? ok(page) : fail('NOT_FOUND', 404, `Page not found: ${slug}`);
  }

  const result = await gql.query<{ pages: RawContentNode[] }>(PAGE_BY_SLUG_QUERY, { slug });
  if (result.error) return result;

  const [entry] = result.data.pages;
  if (!entry) return fail('NOT_FOUND', 404, `Page not found: ${slug}`);

  const parsed = PageSchema.safeParse(resolveImages(entry));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ContentService] Page validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid page data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/** Used by the /news listing page. */
export async function getArticles(
  page = 1,
  pageSize = 10
): Promise<ApiResult<{ articles: Article[]; pagination: Pagination }>> {
  if (isMockMode) return ok(getMockArticles(page, pageSize));

  const result = await gql.query<{
    articles_connection: { nodes: RawContentNode[]; pageInfo: Pagination };
  }>(ARTICLES_QUERY, { page, pageSize });
  if (result.error) return result;

  const { nodes, pageInfo } = result.data.articles_connection;
  const articles: Article[] = [];

  for (const node of nodes) {
    const parsed = ArticleSchema.safeParse(resolveImages(node));
    if (parsed.success) {
      articles.push(parsed.data);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[ContentService] Skipping invalid article:', parsed.error.issues);
    }
  }

  return ok({ articles, pagination: pageInfo });
}

/** Used by /news/[slug]. */
export async function getArticleBySlug(slug: string): Promise<ApiResult<Article>> {
  if (isMockMode) {
    const article = getMockArticleBySlug(slug);
    return article ? ok(article) : fail('NOT_FOUND', 404, `Article not found: ${slug}`);
  }

  const result = await gql.query<{ articles: RawContentNode[] }>(ARTICLE_BY_SLUG_QUERY, { slug });
  if (result.error) return result;

  const [entry] = result.data.articles;
  if (!entry) return fail('NOT_FOUND', 404, `Article not found: ${slug}`);

  const parsed = ArticleSchema.safeParse(resolveImages(entry));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ContentService] Article validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid article data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/** Used by generateStaticParams() for SSG page routes. */
export async function getAllPageSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) return ok(getMockAllPageSlugs());

  const result = await gql.query<{ pages: { slug: string }[] }>(ALL_PAGE_SLUGS_QUERY);
  if (result.error) return result;

  return ok(result.data.pages.map((p) => p.slug));
}

/** Used by generateStaticParams() for SSG article routes. */
export async function getAllArticleSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) return ok(getMockAllArticleSlugs());

  const result = await gql.query<{ articles: { slug: string }[] }>(ALL_ARTICLE_SLUGS_QUERY);
  if (result.error) return result;

  return ok(result.data.articles.map((a) => a.slug));
}

/** Used by the main / (HomePage) route. */
export async function getHomePage(): Promise<ApiResult<HomePage>> {
  if (isMockMode) return ok(getMockHomePage());

  const status = process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED';
  const result = await gql.query<{ home: Record<string, unknown> }>(HOME_PAGE_QUERY, { status });
  if (result.error) return result;

  const rawHome = result.data?.home;
  if (!rawHome) return fail('NOT_FOUND', 404, 'HomePage data not found');

  const rawSections = Array.isArray(rawHome.Section) ? rawHome.Section : [];
  const processedSections = rawSections.map((sec: any) => resolveSectionImages(sec));

  const resolvedHome = {
    ...rawHome,
    seo: rawHome.seo
      ? { ...(rawHome.seo as any), ogImage: unwrapImage((rawHome.seo as any).ogImage) }
      : rawHome.seo,
    Section: processedSections,
  };

  const parsed = HomePageSchema.safeParse(resolvedHome);
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ContentService] HomePage validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid HomePage data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/** Used by the /about (AboutUs) route. */
export async function getAboutUsPage(): Promise<ApiResult<AboutPage>> {
  if (isMockMode) return ok(getMockAboutUsPage());

  const status = process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED';
  const result = await gql.query<{ aboutUs: Record<string, unknown> }>(ABOUT_US_PAGE_QUERY, {
    status,
  });
  if (result.error) return result;

  const rawAbout = result.data?.aboutUs;
  if (!rawAbout) return fail('NOT_FOUND', 404, 'AboutUs page data not found');

  const rawSections = Array.isArray(rawAbout.Section) ? rawAbout.Section : [];
  const processedSections = rawSections.map((sec: any) => resolveSectionImages(sec));

  const resolvedAbout = {
    ...rawAbout,
    seo: rawAbout.seo
      ? { ...(rawAbout.seo as any), ogImage: unwrapImage((rawAbout.seo as any).ogImage) }
      : rawAbout.seo,
    Section: processedSections,
  };

  const parsed = AboutPageSchema.safeParse(resolvedAbout);
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ContentService] AboutUs validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid AboutUs page data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/** Used by RootLayout / Footer component. */
export async function getFooterData(): Promise<ApiResult<FooterData>> {
  if (isMockMode) return ok(getMockFooterData());

  const status = process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED';
  const result = await gql.query<{ footer: Record<string, unknown> }>(FOOTER_QUERY, { status });
  if (result.error) return result;

  const rawFooter = result.data?.footer;
  if (!rawFooter) return fail('NOT_FOUND', 404, 'Footer data not found');

  const resolvedFooter = {
    ...rawFooter,
    logo: unwrapImage(rawFooter.logo as RawStrapiMedia | null),
  };

  const parsed = FooterDataSchema.safeParse(resolvedFooter);
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ContentService] Footer validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid Footer data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

