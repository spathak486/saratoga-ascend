import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  PAGE_BY_SLUG_QUERY,
  ALL_PAGE_SLUGS_QUERY,
  type PageBySlugQueryResult,
  type AllPageSlugsQueryResult,
} from '@/lib/graphql';
import { resolveImages } from '@/lib/content/transformers';
import { PageSchema, type Page, type ApiResult, ok, fail } from '@/lib/schemas';
import { getMockPageBySlug, getMockAllPageSlugs } from '@/lib/mocks';

/** Used by /about, /contact, /terms, /[slug]. */
export async function getPageBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    const page = getMockPageBySlug(slug);
    return page ? ok(page) : fail('NOT_FOUND', 404, `Page not found: ${slug}`);
  }

  const result = await gql.query<PageBySlugQueryResult>(PAGE_BY_SLUG_QUERY, { slug });
  if (result.error) return result;

  const [entry] = result.data.pages;
  if (!entry) return fail('NOT_FOUND', 404, `Page not found: ${slug}`);

  const parsed = PageSchema.safeParse(resolveImages(entry));
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

  return ok(result.data.pages.map((p) => p.slug));
}