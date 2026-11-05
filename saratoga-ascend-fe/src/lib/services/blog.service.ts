import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { BLOG_BY_SLUG_QUERY, ALL_BLOGS_QUERY, type BlogBySlugQueryResult } from '@/lib/graphql';
import { resolveImages } from '@/lib/content/transformers';
import { type ApiResult, ok, fail } from '@/lib/schemas';
import { getMockBlogBySlug, getMockBlogs } from '@/lib/mocks';

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

function blogSlugCandidates(slug: string): string[] {
  const normalized = normalizeSlug(slug);
  const withoutBlogs = normalized.startsWith('blogs/')
    ? normalized.replace(/^blogs\//, '')
    : normalized.startsWith('blog/')
      ? normalized.replace(/^blog\//, '')
      : normalized;

  return Array.from(
    new Set([
      normalized,
      withoutBlogs,
      `blogs/${withoutBlogs}`,
      `blog/${withoutBlogs}`,
    ])
  );
}

export async function getBlogBySlug(slug: string): Promise<ApiResult<any>> {
  if (isMockMode) {
    const blog = getMockBlogBySlug(slug);
    if (!blog) return fail('NOT_FOUND', 404, `Blog not found: ${slug}`);
    return ok(blog);
  }

  const candidates = blogSlugCandidates(slug);
  let entry: any = null;

  for (const candidate of candidates) {
    const result = await gql.query<BlogBySlugQueryResult>(BLOG_BY_SLUG_QUERY, {
      slug: candidate,
      altSlug: candidate === '' ? '/' : `/${candidate}`,
    });
    if (result.error) continue;
    if (result.data?.blogs?.[0]) {
      entry = result.data.blogs[0];
      break;
    }
  }

  if (!entry) return fail('NOT_FOUND', 404, `Blog not found: ${slug}`);

  // Resolve images and seo for content node
  const resolved = resolveImages(entry);

  return ok(resolved);
}

export async function getAllBlogs(): Promise<ApiResult<any[]>> {
  if (isMockMode) return ok(getMockBlogs());

  const result = await gql.query<any>(ALL_BLOGS_QUERY);
  if (result.error) return result;

  const blogs = result.data.blogs || [];
  const resolved = blogs.map((b: any) => resolveImages(b));
  
  return ok(resolved);
}

export async function getAllBlogSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) {
    const slugs = getMockBlogs().map((b) => b.slug).filter(Boolean);
    return ok(slugs);
  }

  const result = await gql.query<any>(ALL_BLOGS_QUERY);
  if (result.error) return result;

  const blogs = result.data.blogs || [];
  const slugs = blogs.map((b: any) => b.slug).filter(Boolean);
  return ok(slugs);
}
