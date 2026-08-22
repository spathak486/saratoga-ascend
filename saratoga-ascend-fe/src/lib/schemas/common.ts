import { z } from 'zod';

export const ImageFormatSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const StrapiImageSchema = z.object({
  url: z.string(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  alternativeText: z.string().nullable().optional(),
  mime: z.string().nullable().optional(),
  ext: z.string().nullable().optional(),
  formats: z.record(z.string(), ImageFormatSchema).nullable().optional(),
});

export type StrapiImage = z.infer<typeof StrapiImageSchema>;

// Mirrors Strapi's shared.general-link component.
export const GeneralLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  target: z.enum(['_self', '_blank']),
  isExternal: z.boolean(),
  description: z.string().nullable().optional(),
  icon: StrapiImageSchema.nullable().optional(),
});

export type GeneralLink = z.infer<typeof GeneralLinkSchema>;

// Mirrors Strapi's shared.seo component — field names/casing match
// the real component (e.g. canonicalURL, metaRobots), not a generic shape.
export const SEOMetadataSchema = z.object({
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  ogTitle: z.string().nullable().optional(),
  ogDescription: z.string().nullable().optional(),
  ogImage: StrapiImageSchema.nullable().optional(),
  metaRobots: z.enum(['index', 'follow', 'noindex', 'nofollow']).nullable().optional(),
  twitterCardTitle: z.string().nullable().optional(),
  canonicalURL: z.string().nullable().optional(),
  structuredData: z.unknown().nullable().optional(),
  languageTag: z.enum(['en']).nullable().optional(),
});

export type SEOMetadata = z.infer<typeof SEOMetadataSchema>;

export const PaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const API_ERROR_CODES = ['NOT_FOUND', 'VALIDATION_ERROR', 'NETWORK_ERROR', 'UNKNOWN'] as const;
export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export const ApiErrorSchema = z.object({
  code: z.enum(API_ERROR_CODES),
  status: z.number(),
  message: z.string(),
  details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

// Every client method and service function returns this. Callers branch
// on `error.code` instead of try/catch — e.g. call notFound() on
// NOT_FOUND, render an error state for everything else.
export type ApiResult<T> = { data: T; error: null } | { data: null; error: ApiError };

export function ok<T>(data: T): ApiResult<T> {
  return { data, error: null };
}

export function fail<T = never>(
  code: ApiErrorCode,
  status: number,
  message: string,
  details?: unknown
): ApiResult<T> {
  return { data: null, error: { code, status, message, details } };
}
