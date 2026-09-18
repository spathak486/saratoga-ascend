import { z } from 'zod';
import { StrapiImageSchema, SEOMetadataSchema } from './common';
import { DynamicZoneSectionSchema } from './dynamic-zone';

// Content reads go exclusively through GraphQL, and Strapi v5's native
// GraphQL API identifies entries by documentId only (no numeric id).

// Layout enums from the Strapi `page` collectionType. `catch` keeps forward
// compatibility — a new value added on the BE degrades to the default instead
// of failing the whole page through Zod.
export const PageTypeSchema = z.enum(['Standard', 'Dark', 'Light', 'LegalPolicy', 'FullWidth']).catch('Standard');
export type PageType = z.infer<typeof PageTypeSchema>;

export const PageVariantSchema = z.enum(['default', 'dark', 'light', 'legal_policy']).catch('default');
export type PageVariant = z.infer<typeof PageVariantSchema>;

/** Universal slug-driven page backed by the Strapi `pages` collection. */
export const PageSchema = z.object({
  documentId: z.string(),
  internalName: z.string().nullable().optional(),
  pageTitle: z.string(),
  slug: z.string(),
  pageType: PageTypeSchema,
  variant: PageVariantSchema,
  seo: SEOMetadataSchema.nullable().optional(),
  Section: z.array(DynamicZoneSectionSchema).nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
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
