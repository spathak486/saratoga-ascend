import { PAGE_FIELDS } from '../fragments';
import type { RawPageNode } from '../types';

export interface ServiceBySlugQueryVariables {
  slug: string;
  altSlug?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface ServiceBySlugQueryResult {
  services: RawPageNode[];
}

export const SERVICE_BY_SLUG_QUERY = `
  query GetServiceBySlug($slug: String!, $altSlug: String, $status: PublicationStatus!) {
    services(
      filters: { or: [{ slug: { eq: $slug } }, { slug: { eq: $altSlug } }] }
      status: $status
    ) { ${PAGE_FIELDS} }
  }
`;

export interface AllServiceSlugsQueryResult {
  services: Array<{ slug: string }>;
}

export const ALL_SERVICE_SLUGS_QUERY = `
  query GetAllServiceSlugs {
    services { slug }
  }
`;

