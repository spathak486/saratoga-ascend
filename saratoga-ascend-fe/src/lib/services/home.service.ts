import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  HOME_PAGE_QUERY,
  ABOUT_US_PAGE_QUERY,
  type HomePageQueryResult,
  type AboutUsPageQueryResult,
} from '@/lib/graphql';
import { resolveMetaPageNode } from '@/lib/content/transformers';
import {
  HomePageSchema,
  AboutPageSchema,
  type HomePage,
  type AboutPage,
  type ApiResult,
  ok,
  fail,
} from '@/lib/schemas';
import { getMockHomePage, getMockAboutUsPage } from '@/lib/mocks';

/** Used by the main / (HomePage) route. */
export async function getHomePage(): Promise<ApiResult<HomePage>> {
  if (isMockMode) return ok(getMockHomePage());

  const result = await gql.query<HomePageQueryResult>(HOME_PAGE_QUERY, {
    status: defaultPublicationStatus,
  });
  if (result.error) return result;

  const rawHome = result.data?.home;
  if (!rawHome) return fail('NOT_FOUND', 404, 'HomePage data not found');

  const parsed = HomePageSchema.safeParse(resolveMetaPageNode(rawHome));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[HomeService] HomePage validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid HomePage data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/** Used by the /about (AboutUs) route. */
export async function getAboutUsPage(): Promise<ApiResult<AboutPage>> {
  if (isMockMode) return ok(getMockAboutUsPage());

  const result = await gql.query<AboutUsPageQueryResult>(ABOUT_US_PAGE_QUERY, {
    status: defaultPublicationStatus,
  });
  if (result.error) return result;

  const rawAbout = result.data?.aboutUs;
  if (!rawAbout) return fail('NOT_FOUND', 404, 'AboutUs page data not found');

  const parsed = AboutPageSchema.safeParse(resolveMetaPageNode(rawAbout));
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[HomeService] AboutUs validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid AboutUs page data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}