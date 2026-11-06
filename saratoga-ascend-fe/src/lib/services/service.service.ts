import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  SERVICE_BY_SLUG_QUERY,
  ALL_SERVICE_SLUGS_QUERY,
  type ServiceBySlugQueryVariables,
  type ServiceBySlugQueryResult,
  type AllServiceSlugsQueryResult,
} from '@/lib/graphql';
import { resolvePageNode } from '@/lib/content/transformers';
import { PageSchema, type Page, type ApiResult, ok, fail } from '@/lib/schemas';

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

/**
 * Handles service / who-we-serve detail slugs:
 * Supports exact relative paths entered in CMS (e.g. "who-we-serve/federal-government",
 * "markets/federal-government", "services/federal-government", or just "federal-government").
 */
function serviceSlugCandidates(slug: string): string[] {
  const normalized = normalizeSlug(slug);
  const withoutPrefix = normalized
    .replace(/^who-we-serve\//, '')
    .replace(/^who_we_serve\//, '')
    .replace(/^services\//, '')
    .replace(/^service\//, '')
    .replace(/^markets\//, '')
    .replace(/^capabilities\//, '');

  return Array.from(
    new Set([
      normalized,
      withoutPrefix,
      `who-we-serve/${withoutPrefix}`,
      `services/${withoutPrefix}`,
      `service/${withoutPrefix}`,
      `markets/${withoutPrefix}`,
    ])
  );
}

function slugQueryVariables(slug: string): Pick<ServiceBySlugQueryVariables, 'slug' | 'altSlug'> {
  const normalized = normalizeSlug(slug);
  return {
    slug: normalized,
    altSlug: normalized === '' ? '/' : `/${normalized}`,
  };
}

async function queryServiceBySlug(slug: string): Promise<ApiResult<ServiceBySlugQueryResult>> {
  const { slug: primary, altSlug } = slugQueryVariables(slug);

  const probingDraft = defaultPublicationStatus === 'DRAFT';
  let result = await gql.query<ServiceBySlugQueryResult>(
    SERVICE_BY_SLUG_QUERY,
    {
      slug: primary,
      altSlug,
      status: defaultPublicationStatus,
    },
    { quiet: probingDraft },
  );

  const draftBlocked =
    probingDraft && (Boolean(result.error) || result.data?.services?.length === 0);
  if (draftBlocked) {
    result = await gql.query<ServiceBySlugQueryResult>(SERVICE_BY_SLUG_QUERY, {
      slug: primary,
      altSlug,
      status: 'PUBLISHED',
    });
  }
  return result;
}

/**
 * Fetch a service / who-we-serve page from the `services` collection by slug.
 */
export async function getServiceBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    return fail('NOT_FOUND', 404, `Service not found: ${slug}`);
  }

  let entry: ServiceBySlugQueryResult['services'][number] | undefined;
  for (const candidate of serviceSlugCandidates(slug)) {
    const result = await queryServiceBySlug(candidate);
    if (result.error) continue;
    if (result.data?.services?.[0]) {
      entry = result.data.services[0];
      break;
    }
  }

  if (!entry) {
    return fail('NOT_FOUND', 404, `Service not found: ${slug}`);
  }

  const parsed = PageSchema.safeParse(resolvePageNode(entry));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ServiceService] Service validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid service data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/**
 * Slugs for SSG generation of service / who-we-serve detail pages.
 */
export async function getAllServiceSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) {
    return ok([]);
  }

  const result = await gql.query<AllServiceSlugsQueryResult>(ALL_SERVICE_SLUGS_QUERY, {
    status: defaultPublicationStatus,
  });

  if (result.error || !result.data?.services) {
    return ok([]);
  }

  const slugs = result.data.services
    .map((item) => normalizeSlug(item.slug))
    .filter((slug) => slug.length > 0);

  return ok(slugs);
}

