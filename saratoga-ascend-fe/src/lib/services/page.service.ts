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

/** Normalized from the route segment so admin slugs may start with a `/`. */
function slugQueryVariables(slug: string): Pick<PageBySlugQueryVariables, 'slug' | 'altSlug'> {
  const normalized = slug.replace(/^\/+|\/+$/g, '');
  return {
    slug: normalized,
    altSlug: normalized === '' ? '/' : `/${normalized}`,
  };
}

/** Used by [slug]. */
export async function getPageBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    const page = getMockPageBySlug(slug.replace(/^\/+|\/+$/g, ''));
    return page ? ok(page) : fail('NOT_FOUND', 404, `Page not found: ${slug}`);
  }

  const { slug: primary, altSlug } = slugQueryVariables(slug);

  let result = await gql.query<PageBySlugQueryResult>(PAGE_BY_SLUG_QUERY, {
    slug: primary,
    altSlug,
    status: defaultPublicationStatus,
  });
  if (result.error) return result;

  // Nothing matched on the primary status in development — the entry may have
  // been published; fall back to PUBLISHED before giving up.
  if (result.data.pages.length === 0 && defaultPublicationStatus === 'DRAFT') {
    result = await gql.query<PageBySlugQueryResult>(PAGE_BY_SLUG_QUERY, {
      slug: primary,
      altSlug,
      status: 'PUBLISHED',
    });
    if (result.error) return result;
  }

  const [entry] = result.data.pages;
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