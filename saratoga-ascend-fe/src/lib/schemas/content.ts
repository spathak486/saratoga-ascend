import { z } from 'zod';
import { StrapiImageSchema, SEOMetadataSchema } from './common';

// Content reads go exclusively through GraphQL, and Strapi v5's native
// GraphQL API identifies entries by documentId only (no numeric id).
export const PageSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string().nullable(),
  featuredImage: StrapiImageSchema.nullable().optional(),
  seo: SEOMetadataSchema.nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Page = z.infer<typeof PageSchema>;

export const ArticleSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable().optional(),
  featuredImage: StrapiImageSchema.nullable().optional(),
  author: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  publishedAt: z.string().nullable(),
  seo: SEOMetadataSchema.nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;
