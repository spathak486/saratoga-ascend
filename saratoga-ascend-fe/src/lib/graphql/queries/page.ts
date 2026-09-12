import { PAGE_FIELDS } from '../fragments';
import type { RawContentNode } from '../types';

export interface PageBySlugQueryVariables {
  slug: string;
}

export interface PageBySlugQueryResult {
  pages: RawContentNode[];
}

export const PAGE_BY_SLUG_QUERY = `
  query GetPageBySlug($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) { ${PAGE_FIELDS} }
  }
`;

export interface AllPageSlugsQueryResult {
  pages: Array<{ slug: string }>;
}

export const ALL_PAGE_SLUGS_QUERY = `
  query GetAllPageSlugs {
    pages { slug }
  }
`;