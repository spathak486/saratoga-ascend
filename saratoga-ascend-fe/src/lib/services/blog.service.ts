import 'server-only';
import { isMockMode } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { BLOG_BY_SLUG_QUERY, ALL_BLOGS_QUERY, type BlogBySlugQueryResult } from '@/lib/graphql';
import { resolveImages } from '@/lib/content/transformers';
import { type ApiResult, ok, fail } from '@/lib/schemas';
import { getMockBlogBySlug, getMockBlogs } from '@/lib/mocks';

export async function getBlogBySlug(slug: string): Promise<ApiResult<any>> {
  if (isMockMode) {
    const blog = getMockBlogBySlug(slug);
    if (!blog) return fail('NOT_FOUND', 404, `Blog not found: ${slug}`);
    return ok(blog);
  }

  const result = await gql.query<BlogBySlugQueryResult>(BLOG_BY_SLUG_QUERY, { slug });
  if (result.error) return result;

  const [entry] = result.data.blogs;
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
