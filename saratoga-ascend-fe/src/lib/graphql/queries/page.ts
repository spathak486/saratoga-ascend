import { PAGE_FIELDS } from '../fragments';
import type { RawPageNode } from '../types';

export interface PageBySlugQueryVariables {
  slug: string;
  altSlug?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface PageBySlugQueryResult {
  pages: RawPageNode[];
}

export const PAGE_BY_SLUG_QUERY = `
  query GetPageBySlug($slug: String!, $altSlug: String, $status: PublicationStatus!) {
    pages(
      filters: { or: [{ slug: { eq: $slug } }, { slug: { eq: $altSlug } }] }
      status: $status
    ) { ${PAGE_FIELDS} }
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