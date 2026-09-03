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

export const PromoComponentSchema = z.object({
  title: z.string().nullable().optional(),
  subTitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
  link: GeneralLinkSchema.nullable().optional(),
});

export type PromoComponent = z.infer<typeof PromoComponentSchema>;

export const CtaReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesCta'),
  cta: z
    .object({
      documentId: z.string().optional(),
      referenceTitle: z.string().nullable().optional(),
      cta: PromoComponentSchema.nullable().optional(),
    })
    .nullable()
    .optional(),
});

export type CtaReference = z.infer<typeof CtaReferenceSchema>;

export const FaqItemComponentSchema = z.object({
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export type FaqItemComponent = z.infer<typeof FaqItemComponentSchema>;

export const FaqEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  faq: FaqItemComponentSchema.nullable().optional(),
});

export type FaqEntity = z.infer<typeof FaqEntitySchema>;

export const FaqsReferenceSchema = z.object({
  __typename: z.union([
    z.literal('ComponentReferencesFaQs'),
    z.literal('ComponentReferencesFaqs'),
  ]),
  content: z
    .object({
      documentId: z.string().optional(),
      referenceTitle: z.string().nullable().optional(),
      ContentSection: PromoComponentSchema.nullable().optional(),
    })
    .nullable()
    .optional(),
  faqs: z.array(FaqEntitySchema).nullable().optional(),
});

export type FaqsReference = z.infer<typeof FaqsReferenceSchema>;

export const HomeDynamicZoneSectionSchema = z.union([
  BannerReferenceSchema,
  CtaReferenceSchema,
  FaqsReferenceSchema,
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

