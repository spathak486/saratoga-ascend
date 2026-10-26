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
  variant: z.string().nullable().optional(),
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

export const FaqCategorySchema = z.object({
  documentId: z.string().optional(),
  name: z.string(),
  faqs: z.array(FaqEntitySchema).nullable().optional(),
});

export type FaqCategory = z.infer<typeof FaqCategorySchema>;

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
  supportCta: z.object({
    documentId: z.string().optional(),
    referenceTitle: z.string().nullable().optional(),
    ContentSection: PromoComponentSchema.nullable().optional()
  }).nullable().optional(),
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

export const MissionHighlightSchema = z.object({
  text: z.string(),
  subtext: z.string().nullable().optional(),
});

export type MissionHighlight = z.infer<typeof MissionHighlightSchema>;

export const ServiceEntitySchema = z.object({
  documentId: z.string().optional(),
  pageTitle: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  cta: GeneralLinkSchema.nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
  highlights: z.array(MissionHighlightSchema).nullable().optional(),
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

export const CustomItemSchema = z.object({
  id: z.any().optional(),
  title: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
  cta: GeneralLinkSchema.nullable().optional(),
  highlights: z.array(MissionHighlightSchema).nullable().optional(),
});

export type CustomItem = z.infer<typeof CustomItemSchema>;

export const WhatWeDoSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  cta: GeneralLinkSchema.nullable().optional(),
  photo: StrapiImageSchema.nullable().optional(),

  services: z.array(ServiceEntitySchema).nullable().optional(),
  customItems: z.array(CustomItemSchema).nullable().optional(),
});

export type WhatWeDoSectionEntity = z.infer<typeof WhatWeDoSectionEntitySchema>;

export const WhatWeDoReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesWhatWeDoReference'),
  whatWeDoSection: WhatWeDoSectionEntitySchema.nullable().optional(),
});

export type WhatWeDoReference = z.infer<typeof WhatWeDoReferenceSchema>;


export const MissionSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  highlights: z.array(MissionHighlightSchema).nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
  shieldIcon: StrapiImageSchema.nullable().optional(),
  pulseIcon: StrapiImageSchema.nullable().optional(),
  cta: GeneralLinkSchema.nullable().optional(),
});

export type MissionSectionEntity = z.infer<typeof MissionSectionEntitySchema>;

export const MissionReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesMissionReference'),
  missionSection: MissionSectionEntitySchema.nullable().optional(),
});

export type MissionReference = z.infer<typeof MissionReferenceSchema>;

export const CounterComponentSchema = z.object({
  title: z.string().nullable().optional(),
  counter: z.string().nullable().optional(),
});

export type CounterComponent = z.infer<typeof CounterComponentSchema>;

export const AchievementCardItemSchema = z.object({
  year: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  logo: StrapiImageSchema.nullable().optional(),
});

export type AchievementCardItem = z.infer<typeof AchievementCardItemSchema>;

export const AchievementCardEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  card: AchievementCardItemSchema.nullable().optional(),
});

export type AchievementCardEntity = z.infer<typeof AchievementCardEntitySchema>;

export const OurAchievementEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  bgImage: StrapiImageSchema.nullable().optional(),
  counter: z.array(CounterComponentSchema).nullable().optional(),
  achievementCards: z.array(AchievementCardEntitySchema).nullable().optional(),
});

export type OurAchievementEntity = z.infer<typeof OurAchievementEntitySchema>;

export const AchievementsReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesAchievements'),
  ourAchievement: OurAchievementEntitySchema.nullable().optional(),
});

export type AchievementsReference = z.infer<typeof AchievementsReferenceSchema>;

export const LegalContentReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesLegalContent'),
  title: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  showToc: z.boolean().nullable().optional(),
  titleColor: z.string().nullable().optional(),
  bodyColor: z.string().nullable().optional(),
});

export type LegalContentReference = z.infer<typeof LegalContentReferenceSchema>;

export const KeyTakeawaysReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesKeyTakeawaysReference'),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  variant: z.string().nullable().optional(),
});

export type KeyTakeawaysReference = z.infer<typeof KeyTakeawaysReferenceSchema>;

export const StatCardItemSchema = z.object({
  metric: z.string(),
  badge: z.string().nullable().optional(),
  description: z.string(),
});

export type StatCardItem = z.infer<typeof StatCardItemSchema>;

export const StatCardsReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesStatCardsReference'),
  title: z.string().nullable().optional(),
  cards: z.array(StatCardItemSchema).nullable().optional(),
});

export type StatCardsReference = z.infer<typeof StatCardsReferenceSchema>;

export const BlogListingReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesBlogListing'),
  blogHeading: z.string().nullable().optional(),
  subheading: z.string().nullable().optional(),
});

export type BlogListingReference = z.infer<typeof BlogListingReferenceSchema>;

export const CeoMessageSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  highlightTitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  authorName: z.string().nullable().optional(),
  authorRole: z.string().nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
  bgWatermarkImage: StrapiImageSchema.nullable().optional(),
});

export type CeoMessageSectionEntity = z.infer<typeof CeoMessageSectionEntitySchema>;

export const CeoMessageReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesCeoMessageReference'),
  ceoMessageSection: CeoMessageSectionEntitySchema.nullable().optional(),
});

export type CeoMessageReference = z.infer<typeof CeoMessageReferenceSchema>;

export const SupportingMissionSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
  cta: GeneralLinkSchema.nullable().optional(),
});

export type SupportingMissionSectionEntity = z.infer<typeof SupportingMissionSectionEntitySchema>;

export const SupportingMissionReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesSupportingMissionReference'),
  supportingMissionSection: SupportingMissionSectionEntitySchema.nullable().optional(),
});

export type SupportingMissionReference = z.infer<typeof SupportingMissionReferenceSchema>;

export const CaseStudyCardSchema = z.object({
  documentId: z.string().optional(),
  title: z.string(),
  slug: z.string().optional(),
  summary: z.string().nullable().optional(),
  client: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
  articleDate: z.string().nullable().optional(),
  readTime: z.number().nullable().optional(),
  image: StrapiImageSchema.nullable().optional(),
});

export type CaseStudyCard = z.infer<typeof CaseStudyCardSchema>;

export const PastPerformanceReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesPastPerformanceReference'),
  pastPerformanceHeading: z.string().nullable().optional(),
  heading: z.string().nullable().optional(),
  subheading: z.string().nullable().optional(),
  caseStudies: z.array(CaseStudyCardSchema).nullable().optional(),
});

export type PastPerformanceReference = z.infer<typeof PastPerformanceReferenceSchema>;

export const CardSchema = z.object({
  documentId: z.string().optional(),
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string(),
  description: z.string(),
  number: z.string().nullable().optional(),
  isHighlighted: z.boolean().nullable().optional(),
  category: z.string().nullable().optional(),
  icon: StrapiImageSchema.nullable().optional(),
  actionLabel: z.string().nullable().optional(),
  href: z.string().nullable().optional(),
  actionTone: z.enum(['sky', 'red']).nullable().optional(),
  swooshImage: StrapiImageSchema.nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  fax: z.string().nullable().optional(),
});

export type CardEntity = z.infer<typeof CardSchema>;
export const ValueCardSchema = CardSchema;
export type ValueCardEntity = CardEntity;
export const MissionVisionPromiseCardSchema = CardSchema;
export type MissionVisionPromiseCardEntity = CardEntity;

export const MissionVisionPromiseSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  highlightTitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  bgWatermarkImage: StrapiImageSchema.nullable().optional(),
  cards: z.array(ValueCardSchema).nullable().optional(),
});

export type MissionVisionPromiseSectionEntity = z.infer<typeof MissionVisionPromiseSectionEntitySchema>;

export const MissionVisionPromiseReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesMissionVisionPromiseReference'),
  missionVisionPromiseSection: MissionVisionPromiseSectionEntitySchema.nullable().optional(),
});

export type MissionVisionPromiseReference = z.infer<typeof MissionVisionPromiseReferenceSchema>;

export const NumberedCardSchema = z.object({
  id: z.string().optional(),
  number: z.string().nullable().optional(),
  title: z.string(),
  description: z.string(),
  isHighlighted: z.boolean().nullable().optional(),
});

export type NumberedCardEntity = z.infer<typeof NumberedCardSchema>;

export const BuiltAroundMissionsSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  highlightTitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  calloutHighlight: z.string().nullable().optional(),
  calloutText: z.string().nullable().optional(),
  cards: z.array(NumberedCardSchema).nullable().optional(),
});

export type BuiltAroundMissionsSectionEntity = z.infer<typeof BuiltAroundMissionsSectionEntitySchema>;

export const BuiltAroundMissionsReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesBuiltAroundMissionsReference'),
  builtAroundMissionsSection: BuiltAroundMissionsSectionEntitySchema.nullable().optional(),
});

export type BuiltAroundMissionsReference = z.infer<typeof BuiltAroundMissionsReferenceSchema>;

export const PurposeCardSchema = ValueCardSchema;
export type PurposeCardEntity = ValueCardEntity;

export const TakeMissionSeriouslySectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  highlightTitle: z.string().nullable().optional(),
  cards: z.array(ValueCardSchema).nullable().optional(),
});

export type TakeMissionSeriouslySectionEntity = z.infer<typeof TakeMissionSeriouslySectionEntitySchema>;

export const TakeMissionSeriouslyReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesTakeMissionSeriouslyReference'),
  takeMissionSeriouslySection: TakeMissionSeriouslySectionEntitySchema.nullable().optional(),
});

export type TakeMissionSeriouslyReference = z.infer<typeof TakeMissionSeriouslyReferenceSchema>;

export const AccountableOperatingEnvironmentsSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  highlightTitle: z.string().nullable().optional(),
  cards: z.array(ValueCardSchema).nullable().optional(),
});

export type AccountableOperatingEnvironmentsSectionEntity = z.infer<typeof AccountableOperatingEnvironmentsSectionEntitySchema>;

export const AccountableOperatingEnvironmentsReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesAccountableOperatingEnvironmentsReference'),
  accountableOperatingEnvironmentsSection: AccountableOperatingEnvironmentsSectionEntitySchema.nullable().optional(),
});

export type AccountableOperatingEnvironmentsReference = z.infer<typeof AccountableOperatingEnvironmentsReferenceSchema>;

export const OurCapabilitiesSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  highlightTitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  bgImage: StrapiImageSchema.nullable().optional(),
  cards: z.array(ValueCardSchema).nullable().optional(),
});

export type OurCapabilitiesSectionEntity = z.infer<typeof OurCapabilitiesSectionEntitySchema>;

export const OurCapabilitiesReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesOurCapabilitiesReference'),
  ourCapabilitiesSection: OurCapabilitiesSectionEntitySchema.nullable().optional(),
});

export type OurCapabilitiesReference = z.infer<typeof OurCapabilitiesReferenceSchema>;

export const WorkforcePlanningSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  highlightTitle: z.string().nullable().optional(),
  cards: z.array(ValueCardSchema).nullable().optional(),
});

export type WorkforcePlanningSectionEntity = z.infer<typeof WorkforcePlanningSectionEntitySchema>;

export const WorkforcePlanningReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesWorkforcePlanningReference'),
  workforcePlanningSection: WorkforcePlanningSectionEntitySchema.nullable().optional(),
});

export type WorkforcePlanningReference = z.infer<typeof WorkforcePlanningReferenceSchema>;

export const ContactInquirySectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  titleLead: z.string().nullable().optional(),
  titleAccent: z.string().nullable().optional(),
  titleClose: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  statementLabel: z.string().nullable().optional(),
  statementFile: StrapiImageSchema.nullable().optional(),
});

export type ContactInquirySectionEntity = z.infer<typeof ContactInquirySectionEntitySchema>;

export const ContactInquiryReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesContactInquiryReference'),
  contactInquirySection: ContactInquirySectionEntitySchema.nullable().optional(),
});

export type ContactInquiryReference = z.infer<typeof ContactInquiryReferenceSchema>;

export const ContactPathwaysSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  titleLead: z.string().nullable().optional(),
  titleClose: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  cards: z.array(CardSchema).nullable().optional(),
});

export type ContactPathwaysSectionEntity = z.infer<typeof ContactPathwaysSectionEntitySchema>;

export const ContactPathwaysReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesContactPathwaysReference'),
  contactPathwaysSection: ContactPathwaysSectionEntitySchema.nullable().optional(),
});

export type ContactPathwaysReference = z.infer<typeof ContactPathwaysReferenceSchema>;

export const ContactLearnSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  titleLead: z.string().nullable().optional(),
  titleClose: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  defaultImage: StrapiImageSchema.nullable().optional(),
  cards: z.array(CardSchema).nullable().optional(),
});

export type ContactLearnSectionEntity = z.infer<typeof ContactLearnSectionEntitySchema>;

export const ContactLearnReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesContactLearnReference'),
  contactLearnSection: ContactLearnSectionEntitySchema.nullable().optional(),
});

export type ContactLearnReference = z.infer<typeof ContactLearnReferenceSchema>;

export const ContactOfficesSectionEntitySchema = z.object({
  documentId: z.string().optional(),
  referenceTitle: z.string().nullable().optional(),
  markerLabel: z.string().nullable().optional(),
  mapImage: StrapiImageSchema.nullable().optional(),
  cards: z.array(CardSchema).nullable().optional(),
});

export type ContactOfficesSectionEntity = z.infer<typeof ContactOfficesSectionEntitySchema>;

export const ContactOfficesReferenceSchema = z.object({
  __typename: z.literal('ComponentReferencesContactOfficesReference'),
  contactOfficesSection: ContactOfficesSectionEntitySchema.nullable().optional(),
});

export type ContactOfficesReference = z.infer<typeof ContactOfficesReferenceSchema>;

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
  WhatWeDoReferenceSchema,
  MissionReferenceSchema,
  AchievementsReferenceSchema,
  LegalContentReferenceSchema,
  KeyTakeawaysReferenceSchema,
  StatCardsReferenceSchema,
  BlogListingReferenceSchema,
  CeoMessageReferenceSchema,
  SupportingMissionReferenceSchema,
  PastPerformanceReferenceSchema,
  MissionVisionPromiseReferenceSchema,
  BuiltAroundMissionsReferenceSchema,
  TakeMissionSeriouslyReferenceSchema,
  AccountableOperatingEnvironmentsReferenceSchema,
  OurCapabilitiesReferenceSchema,
  WorkforcePlanningReferenceSchema,
  ContactInquiryReferenceSchema,
  ContactPathwaysReferenceSchema,
  ContactLearnReferenceSchema,
  ContactOfficesReferenceSchema,
  z.object({ __typename: z.string() }).passthrough(),
]);

export type DynamicZoneSection = z.infer<typeof DynamicZoneSectionSchema>;