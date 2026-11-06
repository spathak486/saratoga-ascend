import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { BLOG_BY_SLUG_QUERY, ALL_BLOGS_QUERY, type BlogBySlugQueryResult } from '@/lib/graphql';
import { resolveImages } from '@/lib/content/transformers';
import { type ApiResult, ok, fail } from '@/lib/schemas';
import { getMockBlogBySlug, getMockBlogs } from '@/lib/mocks';
import { getDynamicSlugCandidates, buildSlugQueryVariables, normalizeSlug } from './slug-utils';

export async function getBlogBySlug(slug: string): Promise<ApiResult<any>> {
  if (isMockMode) {
    const blog = getMockBlogBySlug(slug);
    if (!blog) return fail('NOT_FOUND', 404, `Blog not found: ${slug}`);
    return ok(blog);
  }

  const candidates = getDynamicSlugCandidates(slug, 'blog');
  let entry: any = null;

  for (const candidate of candidates) {
    const { slug: primary, altSlug } = buildSlugQueryVariables(candidate);
    const result = await gql.query<BlogBySlugQueryResult>(BLOG_BY_SLUG_QUERY, {
      slug: primary,
      altSlug,
    });
    if (result.error) continue;
    if (result.data?.blogs?.[0]) {
      entry = result.data.blogs[0];
      break;
    }
  }

  if (!entry) {
    return fail('NOT_FOUND', 404, `Blog not found: ${slug}`);
  }

  return ok(resolveImages(entry));
}

export async function getAllBlogs(): Promise<ApiResult<any[]>> {
  if (isMockMode) {
    return ok(getMockBlogs());
  }

  const result = await gql.query<{ blogs: any[] }>(ALL_BLOGS_QUERY);
  if (result.error) return result;

  const blogs = (result.data?.blogs ?? []).map((blog) => resolveImages(blog));
  return ok(blogs);
}

export async function getAllBlogSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) {
    const mockBlogs = getMockBlogs();
    return ok(mockBlogs.map((b) => b.slug));
  }

  const result = await gql.query<{ blogs: Array<{ slug: string }> }>(ALL_BLOGS_QUERY);
  if (result.error) return result;

  const slugs = (result.data?.blogs ?? [])
    .map((b) => b.slug)
    .filter(Boolean)
    .map(normalizeSlug);

  return ok(slugs);
}
