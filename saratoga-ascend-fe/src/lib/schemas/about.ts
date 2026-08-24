import { z } from 'zod';
import { SEOMetadataSchema } from './common';
import { HomeDynamicZoneSectionSchema } from './home';

export const AboutPageSchema = z.object({
  documentId: z.string().optional(),
  pageTitle: z.string(),
  slug: z.string(),
  seo: SEOMetadataSchema.nullable().optional(),
  Section: z.array(HomeDynamicZoneSectionSchema).nullable().optional(),
});

export type AboutPage = z.infer<typeof AboutPageSchema>;
