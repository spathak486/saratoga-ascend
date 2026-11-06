import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  SOLUTION_BY_SLUG_QUERY,
  ALL_SOLUTION_SLUGS_QUERY,
  type SolutionBySlugQueryVariables,
  type SolutionBySlugQueryResult,
  type AllSolutionSlugsQueryResult,
} from '@/lib/graphql';
import { resolvePageNode } from '@/lib/content/transformers';
import { PageSchema, type Page, type ApiResult, ok, fail } from '@/lib/schemas';
import { getDynamicSlugCandidates, buildSlugQueryVariables, normalizeSlug } from './slug-utils';

async function querySolutionBySlug(slug: string): Promise<ApiResult<SolutionBySlugQueryResult>> {
  const { slug: primary, altSlug } = buildSlugQueryVariables(slug);

  const probingDraft = defaultPublicationStatus === 'DRAFT';
  let result = await gql.query<SolutionBySlugQueryResult>(
    SOLUTION_BY_SLUG_QUERY,
    {
      slug: primary,
      altSlug,
      status: defaultPublicationStatus,
    },
    { quiet: probingDraft },
  );

  const draftBlocked =
    probingDraft && (Boolean(result.error) || result.data?.solutions.length === 0);
  if (draftBlocked) {
    result = await gql.query<SolutionBySlugQueryResult>(SOLUTION_BY_SLUG_QUERY, {
      slug: primary,
      altSlug,
      status: 'PUBLISHED',
    });
  }
  return result;
}

/**
 * Fetch a solution page from the `solutions` collection by slug dynamically.
 */
export async function getSolutionBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    return fail('NOT_FOUND', 404, `Solution not found: ${slug}`);
  }

  let entry: SolutionBySlugQueryResult['solutions'][number] | undefined;
  for (const candidate of getDynamicSlugCandidates(slug, 'solution')) {
    const result = await querySolutionBySlug(candidate);
    if (result.error) continue;
    if (result.data?.solutions?.[0]) {
      entry = result.data.solutions[0];
      break;
    }
  }

  if (!entry) {
    return fail('NOT_FOUND', 404, `Solution not found: ${slug}`);
  }

  const parsed = PageSchema.safeParse(resolvePageNode(entry));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[SolutionService] Solution validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid solution data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/**
 * Slugs for SSG generation of solution detail pages.
 */
export async function getAllSolutionSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) return ok([]);

  const result = await gql.query<AllSolutionSlugsQueryResult>(ALL_SOLUTION_SLUGS_QUERY);
  if (result.error) return result;

  const slugs = (result.data?.solutions ?? [])
    .map((item) => item.slug)
    .filter(Boolean)
    .map(normalizeSlug);

  return ok(slugs);
}
