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
  FaqsReferenceSchema,
  type FaqsReference,
  ClientLogosReferenceSchema,
  type ClientLogosReference,
  ServiceEntitySchema,
  type ServiceEntity,
  ServiceReferenceSchema,
  type ServiceReference,
  HomeDynamicZoneSectionSchema,
  type HomeDynamicZoneSection,
  HomePageSchema,
  type HomePage,
} from './home';
export { AboutPageSchema, type AboutPage } from './about';
export { FooterDataSchema, type FooterData, LinkColumnSchema, type LinkColumn } from './footer';


// Phase 2 → export * from './job'
// Phase 3 → export * from './scheduling'
// Phase 4 → export * from './application'
