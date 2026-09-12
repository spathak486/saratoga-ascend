import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  ARTICLES_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  ALL_ARTICLE_SLUGS_QUERY,
  type ArticlesQueryResult,
  type ArticleBySlugQueryResult,
  type AllArticleSlugsQueryResult,
} from '@/lib/graphql';
import { resolveImages } from '@/lib/content/transformers';
import {
  ArticleSchema,
  type Article,
  type Pagination,
  type ApiResult,
  ok,
  fail,
} from '@/lib/schemas';
import { getMockArticles, getMockArticleBySlug, getMockAllArticleSlugs } from '@/lib/mocks';

/** Used by the /news listing page. */
export async function getArticles(
  page = 1,
  pageSize = 10
): Promise<ApiResult<{ articles: Article[]; pagination: Pagination }>> {
  if (isMockMode) return ok(getMockArticles(page, pageSize));

  const result = await gql.query<ArticlesQueryResult>(ARTICLES_QUERY, { page, pageSize });
  if (result.error) return result;

  const { nodes, pageInfo } = result.data.articles_connection;
  const articles: Article[] = [];

  for (const node of nodes) {
    const parsed = ArticleSchema.safeParse(resolveImages(node));
    if (parsed.success) {
      articles.push(parsed.data);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[NewsService] Skipping invalid article:', parsed.error.issues);
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

  const result = await gql.query<ArticleBySlugQueryResult>(ARTICLE_BY_SLUG_QUERY, { slug });
  if (result.error) return result;

  const [entry] = result.data.articles;
  if (!entry) return fail('NOT_FOUND', 404, `Article not found: ${slug}`);

  const parsed = ArticleSchema.safeParse(resolveImages(entry));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[NewsService] Article validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid article data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/** Used by generateStaticParams() for SSG article routes. */
export async function getAllArticleSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) return ok(getMockAllArticleSlugs());

  const result = await gql.query<AllArticleSlugsQueryResult>(ALL_ARTICLE_SLUGS_QUERY);
  if (result.error) return result;

  return ok(result.data.articles.map((a) => a.slug));
}