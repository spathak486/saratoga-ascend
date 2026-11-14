import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  ALL_CASE_STUDIES_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  ALL_CASE_STUDY_SLUGS_QUERY,
  type CaseStudyBySlugQueryResult,
  type AllCaseStudiesQueryResult,
} from '@/lib/graphql/queries/case-study';
import { resolveImages, resolvePageNode } from '@/lib/content/transformers';
import { PageSchema, type Page, type ApiResult, ok, fail } from '@/lib/schemas';
import { getDynamicSlugCandidates, normalizeSlug } from './slug-utils';

export async function getAllCaseStudies(): Promise<ApiResult<any[]>> {
  if (isMockMode) {
    return ok([]);
  }

  const result = await gql.query<AllCaseStudiesQueryResult>(ALL_CASE_STUDIES_QUERY);
  if (result.error) return result;

  const caseStudies = (result.data?.caseStudies ?? []).map((cs) => resolveImages(cs));
  return ok(caseStudies);
}

export async function getCaseStudyBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    return fail('NOT_FOUND', 404, `Case study not found: ${slug}`);
  }

  const candidates = getDynamicSlugCandidates(slug, 'case-study');
  let entry: any = undefined;

  for (const candidate of candidates) {
    const result = await gql.query<CaseStudyBySlugQueryResult>(CASE_STUDY_BY_SLUG_QUERY, {
      slug: candidate,
    });
    if (result.error) continue;
    if (result.data?.caseStudies?.[0]) {
      entry = result.data.caseStudies[0];
      break;
    }
  }

  if (!entry) {
    return fail('NOT_FOUND', 404, `Case study not found: ${slug}`);
  }

  const resolved = resolvePageNode(entry);
  const parsed = PageSchema.safeParse(resolved);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', 500, 'Invalid case study data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

export async function getAllCaseStudySlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) return ok([]);

  const result = await gql.query<{ caseStudies: Array<{ slug: string }> }>(ALL_CASE_STUDY_SLUGS_QUERY);
  if (result.error) return result;

  const slugs = (result.data?.caseStudies ?? [])
    .map((item) => item.slug)
    .filter(Boolean)
    .map(normalizeSlug);

  return ok(slugs);
}
