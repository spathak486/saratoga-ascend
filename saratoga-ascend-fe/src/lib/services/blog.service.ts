import 'server-only';
import { gql } from '@/lib/api/graphql';
import { BLOG_BY_SLUG_QUERY, type BlogBySlugQueryResult } from '@/lib/graphql';
import { resolveImages } from '@/lib/content/transformers';
import { type ApiResult, ok, fail } from '@/lib/schemas';

export async function getBlogBySlug(slug: string): Promise<ApiResult<any>> {
  const result = await gql.query<BlogBySlugQueryResult>(BLOG_BY_SLUG_QUERY, { slug });
  if (result.error) return result;

  const [entry] = result.data.blogs;
  if (!entry) return fail('NOT_FOUND', 404, `Blog not found: ${slug}`);

  // Resolve images and seo for content node
  const resolved = resolveImages(entry);

  return ok(resolved);
}
