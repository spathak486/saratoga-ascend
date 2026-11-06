import { PAGE_FIELDS } from '../fragments';
import type { RawPageNode } from '../types';

export interface ContractBySlugQueryVariables {
  slug: string;
  altSlug?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface ContractBySlugQueryResult {
  contracts: RawPageNode[];
}

export const CONTRACT_BY_SLUG_QUERY = `
  query GetContractBySlug($slug: String!, $altSlug: String, $status: PublicationStatus!) {
    contracts(
      filters: { or: [{ slug: { eq: $slug } }, { slug: { eq: $altSlug } }] }
      status: $status
    ) { ${PAGE_FIELDS} }
  }
`;

export interface AllContractSlugsQueryResult {
  contracts: Array<{ slug: string }>;
}

export const ALL_CONTRACT_SLUGS_QUERY = `
  query GetAllContractSlugs {
    contracts { slug }
  }
`;

