import { ARTICLE_FIELDS } from '../fragments';
import type { RawContentNode, RawPaginationConnection } from '../types';

export interface ArticlesQueryVariables {
  page: number;
  pageSize: number;
}

export interface ArticlesQueryResult {
  newsArticles_connection: RawPaginationConnection<RawContentNode>;
}

// Uses the *_connection form because it's the only one that returns
// pagination metadata (page/pageSize/pageCount/total) alongside the list.
export const ARTICLES_QUERY = `
  query GetArticles($page: Int!, $pageSize: Int!) {
    newsArticles_connection(
      pagination: { page: $page, pageSize: $pageSize }
      sort: "publishedAt:desc"
      filters: { publishedAt: { notNull: true } }
    ) {
      nodes { ${ARTICLE_FIELDS} }
      pageInfo { page pageSize pageCount total }
    }
  }
`;

export interface ArticleBySlugQueryVariables {
  slug: string;
}

export interface ArticleBySlugQueryResult {
  newsArticles: RawContentNode[];
}

export const ARTICLE_BY_SLUG_QUERY = `
  query GetArticleBySlug($slug: String!) {
    newsArticles(filters: { slug: { eq: $slug } }) { ${ARTICLE_FIELDS} }
  }
`;

export interface AllArticleSlugsQueryResult {
  newsArticles: Array<{ slug: string }>;
}

export const ALL_ARTICLE_SLUGS_QUERY = `
  query GetAllArticleSlugs {
    newsArticles(filters: { publishedAt: { notNull: true } }) { slug }
  }
`;