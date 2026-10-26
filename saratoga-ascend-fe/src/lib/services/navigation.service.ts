import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { NAVIGATION_QUERY, type NavigationQueryResult } from '@/lib/graphql';
import { unwrapImage } from '@/lib/api/strapi';
import { NavigationDataSchema, type NavigationData, type ApiResult, ok, fail } from '@/lib/schemas';
import { getMockNavigationData } from '@/lib/mocks';

/** Used by RootLayout / Navbar component. */
export async function getNavigationData(): Promise<ApiResult<NavigationData>> {
  if (isMockMode) return ok(getMockNavigationData());

  let result = await gql.query<NavigationQueryResult>(
    NAVIGATION_QUERY,
    { status: defaultPublicationStatus },
    { quiet: defaultPublicationStatus === 'DRAFT' },
  );
  if (result.error && defaultPublicationStatus === 'DRAFT') {
    result = await gql.query<NavigationQueryResult>(NAVIGATION_QUERY, {
      status: 'PUBLISHED',
    });
  }
  if (result.error) return result;

  const rawNavigation = result.data?.navigation;
  if (!rawNavigation) return fail('NOT_FOUND', 404, 'Navigation data not found');

  const resolvedNavigation = {
    ...rawNavigation,
    logo: unwrapImage(rawNavigation.logo),
  };

  const parsed = NavigationDataSchema.safeParse(resolvedNavigation);
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[NavigationService] Navigation validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid Navigation data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}
