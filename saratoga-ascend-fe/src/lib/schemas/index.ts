export {
  StrapiImageSchema,
  type StrapiImage,
  ImageFormatSchema,
  GeneralLinkSchema,
  type GeneralLink,
  SEOMetadataSchema,
  type SEOMetadata,
  PaginationSchema,
  type Pagination,
  ApiErrorSchema,
  type ApiError,
  type ApiErrorCode,
  type ApiResult,
  ok,
  fail,
} from './common';

// Phase 1
export { PageSchema, type Page, ArticleSchema, type Article } from './content';
export {
  BannerComponentSchema,
  type BannerComponent,
  BannerReferenceSchema,
  type BannerReference,
  PromoComponentSchema,
  type PromoComponent,
  CtaReferenceSchema,
  type CtaReference,
  FaqItemComponentSchema,
  type FaqItemComponent,
  FaqEntitySchema,
  type FaqEntity,
  FaqsReferenceSchema,
  type FaqsReference,
  ClientLogosReferenceSchema,
  type ClientLogosReference,
  ServiceEntitySchema,
  type ServiceEntity,
  ServiceReferenceSchema,
  type ServiceReference,
  MissionHighlightSchema,
  type MissionHighlight,
  MissionSectionEntitySchema,
  type MissionSectionEntity,
  MissionReferenceSchema,
  type MissionReference,
  CounterComponentSchema,
  type CounterComponent,
  AchievementCardItemSchema,
  type AchievementCardItem,
  AchievementCardEntitySchema,
  type AchievementCardEntity,
  OurAchievementEntitySchema,
  type OurAchievementEntity,
  AchievementsReferenceSchema,
  type AchievementsReference,
  DynamicZoneSectionSchema,
  type DynamicZoneSection,
} from './dynamic-zone';
export { FooterDataSchema, type FooterData, LinkColumnSchema, type LinkColumn } from './footer';
export {
  NotFoundDataSchema,
  type NotFoundData,
} from './not-found';


// Phase 2 → export * from './job'
// Phase 3 → export * from './scheduling'
// Phase 4 → export * from './application'
