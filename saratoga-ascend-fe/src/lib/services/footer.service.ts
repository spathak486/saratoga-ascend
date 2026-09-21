import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { FOOTER_QUERY, type FooterQueryResult } from '@/lib/graphql';
import { unwrapImage } from '@/lib/api/strapi';
import { FooterDataSchema, type FooterData, type ApiResult, ok, fail } from '@/lib/schemas';
import { getMockFooterData } from '@/lib/mocks';

/** Used by RootLayout / Footer component. */
export async function getFooterData(): Promise<ApiResult<FooterData>> {
  if (isMockMode) return ok(getMockFooterData());

  const result = await gql.query<FooterQueryResult>(FOOTER_QUERY, {
    status: defaultPublicationStatus,
  });
  if (result.error) return result;

  const rawFooter = result.data?.footer;
  if (!rawFooter) return fail('NOT_FOUND', 404, 'Footer data not found');

  const resolvedFooter = {
    ...rawFooter,
    logo: unwrapImage(rawFooter.logo),
  };

  const parsed = FooterDataSchema.safeParse(resolvedFooter);
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[FooterService] Footer validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid Footer data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}