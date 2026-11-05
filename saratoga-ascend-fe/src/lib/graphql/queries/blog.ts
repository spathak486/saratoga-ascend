import { BLOG_FIELDS, BLOG_ITEM_FIELDS } from '../fragments';
import type { RawContentNode } from '../types';

export interface BlogBySlugQueryVariables {
  slug: string;
  altSlug?: string | null;
}

export interface BlogBySlugQueryResult {
  blogs: RawContentNode[];
}

export const BLOG_BY_SLUG_QUERY = `
  query GetBlogBySlug($slug: String!, $altSlug: String) {
    blogs(filters: { or: [{ slug: { eq: $slug } }, { slug: { eq: $altSlug } }] }) { ${BLOG_FIELDS} }
  }
`;

export interface AllBlogsQueryResult {
  blogs: RawContentNode[];
}

export const ALL_BLOGS_QUERY = `
  query GetAllBlogs {
    blogs(sort: "articleDate:desc") { ${BLOG_ITEM_FIELDS} }
  }
`;
