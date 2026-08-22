import { z } from 'zod';
import { StrapiImageSchema, SEOMetadataSchema, GeneralLinkSchema } from './common';

export const BannerComponentSchema = z.object({
  bannerTitle: z.string(),
  bannerSubTitle: z.string().nullable().optional(),
  bannerDescription: z.string().nullable().optional(),
  bannerImage: StrapiImageSchema.nullable().optional(),
  buttonCTA: GeneralLinkSchema.nullable().optional(),
});

export type BannerComponent = z.infer<typeof BannerComponentSchema>;

export const BannerReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesBannerReference'),
  heroBanner: z
    .object({
      documentId: z.string().optional(),
      referenceTitle: z.string().optional(),
      banner: BannerComponentSchema.nullable().optional(),
    })
    .nullable()
    .optional(),
});

export type BannerReference = z.infer<typeof BannerReferenceSchema>;

export const HomeDynamicZoneSectionSchema = z.union([
  BannerReferenceSchema,
  z.object({ __typename: z.string() }).passthrough(),
]);

export type HomeDynamicZoneSection = z.infer<typeof HomeDynamicZoneSectionSchema>;

export const HomePageSchema = z.object({
  documentId: z.string().optional(),
  pageTitle: z.string(),
  slug: z.string(),
  seo: SEOMetadataSchema.nullable().optional(),
  Section: z.array(HomeDynamicZoneSectionSchema).nullable().optional(),
});

export type HomePage = z.infer<typeof HomePageSchema>;
