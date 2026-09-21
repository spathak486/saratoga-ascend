import { z } from 'zod';
import { StrapiImageSchema, GeneralLinkSchema, SEOMetadataSchema } from './common';

/** Editorial content for the 404 experience, sourced from the Strapi single type. */
export const NotFoundDataSchema = z.object({
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  primaryCta: GeneralLinkSchema.nullable().optional(),
  secondaryCta: GeneralLinkSchema.nullable().optional(),
  graphic: StrapiImageSchema.nullable().optional(),
  seo: SEOMetadataSchema.nullable().optional(),
});

export type NotFoundData = z.infer<typeof NotFoundDataSchema>;