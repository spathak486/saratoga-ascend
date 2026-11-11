import { SOLUTION_FIELDS } from '../fragments';
import type { RawPageNode } from '../types';

export interface SolutionBySlugQueryVariables {
  slug: string;
  altSlug?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface SolutionBySlugQueryResult {
  solutions: RawPageNode[];
}

export const SOLUTION_BY_SLUG_QUERY = `
  query GetSolutionBySlug($slug: String!, $altSlug: String, $status: PublicationStatus!) {
    solutions(
      filters: { or: [{ slug: { eq: $slug } }, { slug: { eq: $altSlug } }] }
      status: $status
    ) { ${SOLUTION_FIELDS} }
  }
`;

export interface AllSolutionSlugsQueryResult {
  solutions: Array<{ slug: string }>;
}

export const ALL_SOLUTION_SLUGS_QUERY = `
  query GetAllSolutionSlugs {
    solutions { slug }
  }
`;

