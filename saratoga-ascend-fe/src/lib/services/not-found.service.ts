import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { NOT_FOUND_QUERY, type NotFoundQueryResult } from '@/lib/graphql';
import { unwrapImage } from '@/lib/api/strapi';
import { NotFoundDataSchema, type NotFoundData, type ApiResult, ok, fail } from '@/lib/schemas';
import { getMockNotFoundData } from '@/lib/mocks';

/**
 * Editorial content for the 404 experience. Callers render the returned data
 * but must keep local defaults as a fallback: this page has to work even when
 * the CMS is unavailable, since a broken 404 page compounds the roadblock.
 */
export async function getNotFoundData(): Promise<ApiResult<NotFoundData>> {
  if (isMockMode) return ok(getMockNotFoundData());

  const result = await gql.query<NotFoundQueryResult>(NOT_FOUND_QUERY, {
    status: defaultPublicationStatus,
  });
  if (result.error) return result;

  const rawPatch = result.data?.notFound;
  if (!rawPatch) return fail('NOT_FOUND', 404, '404 content not found');

  const resolvedPatch = {
    ...rawPatch,
    graphic: unwrapImage(rawPatch.graphic),
  };

  const parsed = NotFoundDataSchema.safeParse(resolvedPatch);
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[NotFoundService] 404 content validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid 404 data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}