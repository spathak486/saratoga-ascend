import 'server-only';
import type { Pagination, StrapiImage } from '@/lib/schemas/common';
import { strapiUrl } from './config';

// Strapi v5 REST still wraps single/list responses in { data, meta } —
// unlike GraphQL, which drops that envelope for flat queries. These
// helpers keep that REST-specific shape out of the client and service layers.

interface StrapiSingleResponse<T> {
  data: T | null;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination?: Pagination };
}

export function unwrapOne<T>(response: StrapiSingleResponse<T>): T | null {
  return response.data;
}

export function unwrapMany<T>(response: StrapiListResponse<T>): { items: T[]; pagination: Pagination } {
  return {
    items: response.data,
    pagination: response.meta.pagination ?? {
      page: 1,
      pageSize: response.data.length,
      pageCount: 1,
      total: response.data.length,
    },
  };
}

export interface RawStrapiMedia {
  url: string;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  formats?: Record<string, { url: string; width: number; height: number }> | null;
}

// Strapi returns media URLs relative to its own host. The browser never
// talks to Strapi directly, so these need the base URL prepended.
export function unwrapImage(media: RawStrapiMedia | null | undefined): StrapiImage | null {
  if (!media) return null;

  return {
    ...media,
    url: resolveUrl(media.url),
    formats: media.formats
      ? Object.fromEntries(
          Object.entries(media.formats).map(([key, format]) => [
            key,
            { ...format, url: resolveUrl(format.url) },
          ])
        )
      : null,
  };
}

function resolveUrl(url: string): string {
  return url.startsWith('/') ? `${strapiUrl}${url}` : url;
}
