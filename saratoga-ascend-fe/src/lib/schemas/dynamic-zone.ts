import { z } from 'zod';
import { StrapiImageSchema, GeneralLinkSchema } from './common';

// Strapi fragment components used inside the page-level dynamic zone. Each
// `*ReferenceSchema` mirrors a `ComponentReferences*` component from Strapi,
// keyed by its `__typename`. These modules get reused by home, about, and any
// future content type with the same dynamic zone.

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

export const ClientLogosReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesClientLogosReference'),
  clientLogosSection: z
    .object({
      documentId: z.string().optional(),
      referenceTitle: z.string().nullable().optional(),
      title: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      logos: z.array(StrapiImageSchema).nullable().optional(),
    })
    .nullable()
    .optional(),
});

export type ClientLogosReference = z.infer<typeof ClientLogosReferenceSchema>;

export const ServiceEntitySchema = z.object({
  documentId: z.string().optional(),
  pageTitle: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  cta: GeneralLinkSchema.nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
});

export type ServiceEntity = z.infer<typeof ServiceEntitySchema>;

export const ServiceReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesServiceReference'),
  heading: z
    .object({
      title: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  services: z.array(ServiceEntitySchema).nullable().optional(),
});

export type ServiceReference = z.infer<typeof ServiceReferenceSchema>;

export const MissionHighlightSchema = z.object({
  text: z.string(),
});

export type MissionHighlight = z.infer<typeof MissionHighlightSchema>;

export const MissionSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  highlights: z.array(MissionHighlightSchema).nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
  shieldIcon: StrapiImageSchema.nullable().optional(),
  pulseIcon: StrapiImageSchema.nullable().optional(),
});

export type MissionSectionEntity = z.infer<typeof MissionSectionEntitySchema>;

export const MissionReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesMissionReference'),
  missionSection: MissionSectionEntitySchema.nullable().optional(),
});

export type MissionReference = z.infer<typeof MissionReferenceSchema>;

/**
 * Union of every section the Strapi dynamic zone can emit. The pass-through
 * catch-all keeps forward compatibility — components that aren't registered
 * yet still validate instead of failing the whole page.
 */
export const DynamicZoneSectionSchema = z.union([
  BannerReferenceSchema,
  CtaReferenceSchema,
  FaqsReferenceSchema,
  ClientLogosReferenceSchema,
  ServiceReferenceSchema,
  MissionReferenceSchema,
  z.object({ __typename: z.string() }).passthrough(),
]);

export type DynamicZoneSection = z.infer<typeof DynamicZoneSectionSchema>;