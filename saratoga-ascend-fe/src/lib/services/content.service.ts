import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { unwrapImage, type RawStrapiMedia } from '@/lib/api/strapi';
import {
  PageSchema,
  ArticleSchema,
  type Page,
  type Article,
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
} from '@/lib/mocks';

// Pages and articles never import the REST or GraphQL client directly —
// this is the only file that fetches content data.

const SEO_FIELDS = `
  metaTitle
  metaDescription
  ogTitle
  ogDescription
  ogImage { url width height alternativeText formats }
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
  featuredImage { url width height alternativeText formats }
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
  featuredImage { url width height alternativeText formats }
  seo { ${SEO_FIELDS} }
`;

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

// Future functions, added when the backend is ready:
//   getHomepage() — single type
//   getSiteSettings() — footer, nav, social links
