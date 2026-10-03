import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  PAGE_BY_SLUG_QUERY,
  ALL_PAGE_SLUGS_QUERY,
  type PageBySlugQueryVariables,
  type PageBySlugQueryResult,
  type AllPageSlugsQueryResult,
} from '@/lib/graphql';
import { resolvePageNode } from '@/lib/content/transformers';
import { PageSchema, type Page, type ApiResult, ok, fail } from '@/lib/schemas';
import { getMockPageBySlug, getMockAllPageSlugs } from '@/lib/mocks';

/** Alternate CMS slugs that should resolve to the same legal pages. */
const PAGE_SLUG_ALIASES: Record<string, string[]> = {
  'terms-of-service': ['terms', 'terms-and-conditions'],
  terms: ['terms-of-service'],
  'privacy-policy': ['privacy'],
  privacy: ['privacy-policy'],
};

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

function slugCandidates(slug: string): string[] {
  const normalized = normalizeSlug(slug);
  const aliases = PAGE_SLUG_ALIASES[normalized] ?? [];
  return [normalized, ...aliases];
}

/** Normalized from the route segment so admin slugs may start with a `/`. */
function slugQueryVariables(slug: string): Pick<PageBySlugQueryVariables, 'slug' | 'altSlug'> {
  const normalized = normalizeSlug(slug);
  return {
    slug: normalized,
    altSlug: normalized === '' ? '/' : `/${normalized}`,
  };
}

async function queryPageBySlug(slug: string): Promise<ApiResult<PageBySlugQueryResult>> {
  const { slug: primary, altSlug } = slugQueryVariables(slug);

  let result = await gql.query<PageBySlugQueryResult>(PAGE_BY_SLUG_QUERY, {
    slug: primary,
    altSlug,
    status: defaultPublicationStatus,
  });
  if (result.error) return result;

  if (result.data.pages.length === 0 && defaultPublicationStatus === 'DRAFT') {
    result = await gql.query<PageBySlugQueryResult>(PAGE_BY_SLUG_QUERY, {
      slug: primary,
      altSlug,
      status: 'PUBLISHED',
    });
  }
  return result;
}

/** Used by [slug]. */
export async function getPageBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    for (const candidate of slugCandidates(slug)) {
      const page = getMockPageBySlug(candidate);
      if (page) return ok(page);
    }
    return fail('NOT_FOUND', 404, `Page not found: ${slug}`);
  }

  let entry: PageBySlugQueryResult['pages'][number] | undefined;
  for (const candidate of slugCandidates(slug)) {
    const result = await queryPageBySlug(candidate);
    if (result.error) return result;
    if (result.data.pages[0]) {
      entry = result.data.pages[0];
      break;
    }
  }

  if (!entry) return fail('NOT_FOUND', 404, `Page not found: ${slug}`);

  const parsed = PageSchema.safeParse(resolvePageNode(entry));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[PageService] Page validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid page data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/** Used by generateStaticParams() for SSG page routes. */
export async function getAllPageSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) return ok(getMockAllPageSlugs());

  const result = await gql.query<AllPageSlugsQueryResult>(ALL_PAGE_SLUGS_QUERY);
  if (result.error) return result;

  // The home page (slug "") is handled as the root of the optional catch-all,
  // so it must not be emitted again as a dynamic route through
  // generateStaticParams. Stored slugs may carry leading/trailing slashes —
  // strip them so they map cleanly to URL segments.
  return ok(
    result.data.pages
      .map((p) => p.slug)
      .map((slug) => slug.replace(/^\/+|\/+$/g, ''))
      .filter((slug) => slug)
  );
}