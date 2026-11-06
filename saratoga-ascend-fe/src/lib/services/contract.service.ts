import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  CONTRACT_BY_SLUG_QUERY,
  ALL_CONTRACT_SLUGS_QUERY,
  type ContractBySlugQueryVariables,
  type ContractBySlugQueryResult,
  type AllContractSlugsQueryResult,
} from '@/lib/graphql';
import { resolvePageNode } from '@/lib/content/transformers';
import { PageSchema, type Page, type ApiResult, ok, fail } from '@/lib/schemas';
import { getDynamicSlugCandidates, buildSlugQueryVariables, normalizeSlug } from './slug-utils';

async function queryContractBySlug(slug: string): Promise<ApiResult<ContractBySlugQueryResult>> {
  const { slug: primary, altSlug } = buildSlugQueryVariables(slug);

  const probingDraft = defaultPublicationStatus === 'DRAFT';
  let result = await gql.query<ContractBySlugQueryResult>(
    CONTRACT_BY_SLUG_QUERY,
    {
      slug: primary,
      altSlug,
      status: defaultPublicationStatus,
    },
    { quiet: probingDraft },
  );

  const draftBlocked =
    probingDraft && (Boolean(result.error) || result.data?.contracts.length === 0);
  if (draftBlocked) {
    result = await gql.query<ContractBySlugQueryResult>(CONTRACT_BY_SLUG_QUERY, {
      slug: primary,
      altSlug,
      status: 'PUBLISHED',
    });
  }
  return result;
}

/**
 * Fetch a contract page from the `contracts` collection by slug dynamically.
 */
export async function getContractBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    return fail('NOT_FOUND', 404, `Contract not found: ${slug}`);
  }

  const candidates = getDynamicSlugCandidates(slug, 'contract');

  let entry: ContractBySlugQueryResult['contracts'][number] | undefined;
  for (const candidate of candidates) {
    const result = await queryContractBySlug(candidate);
    if (result.error) continue;
    if (result.data?.contracts?.[0]) {
      entry = result.data.contracts[0];
      break;
    }
  }

  if (!entry) {
    return fail('NOT_FOUND', 404, `Contract not found: ${slug}`);
  }

  const parsed = PageSchema.safeParse(resolvePageNode(entry));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ContractService] Contract validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid contract data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/**
 * Slugs for SSG generation of contract detail pages.
 */
export async function getAllContractSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) return ok([]);

  const result = await gql.query<AllContractSlugsQueryResult>(ALL_CONTRACT_SLUGS_QUERY);
  if (result.error) return result;

  const slugs = (result.data?.contracts ?? [])
    .map((item) => item.slug)
    .filter(Boolean)
    .map(normalizeSlug);

  return ok(slugs);
}
