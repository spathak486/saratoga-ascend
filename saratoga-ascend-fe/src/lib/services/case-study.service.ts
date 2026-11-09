import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { ALL_CASE_STUDIES_QUERY } from '@/lib/graphql/queries/case-study';
import { resolveImages } from '@/lib/content/transformers';
import { type ApiResult, ok } from '@/lib/schemas';

export async function getAllCaseStudies(): Promise<ApiResult<any[]>> {
  if (isMockMode) {
    return ok([]);
  }

  const result = await gql.query<{ caseStudies: any[] }>(ALL_CASE_STUDIES_QUERY);
  if (result.error) return result;

  const caseStudies = (result.data?.caseStudies ?? []).map((cs) => resolveImages(cs));
  return ok(caseStudies);
}

