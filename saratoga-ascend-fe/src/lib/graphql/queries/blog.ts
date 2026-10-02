import { BLOG_FIELDS } from '../fragments';
import type { RawContentNode } from '../types';

export interface BlogBySlugQueryVariables {
  slug: string;
}

export interface BlogBySlugQueryResult {
  blogs: RawContentNode[];
}

export const BLOG_BY_SLUG_QUERY = `
  query GetBlogBySlug($slug: String!) {
    blogs(filters: { slug: { eq: $slug } }) { ${BLOG_FIELDS} }
  }
`;

export interface AllBlogsQueryResult {
  blogs: RawContentNode[];
}

export const ALL_BLOGS_QUERY = `
  query GetAllBlogs {
    blogs(sort: "articleDate:desc") { ${BLOG_FIELDS} }
  }
`;
