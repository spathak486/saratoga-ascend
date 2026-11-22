'use client';

import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heading, Section, Text } from '../atoms';

export interface IntegratedCapabilitiesCardItem {
  id?: string | number | null;
  documentId?: string | null;
  title?: string | null;
  subheading?: string | null;
  description?: string | null;
  subdescription?: string | null;
  actionLabel?: string | null;
  href?: string | null;
  cta?: {
    label?: string | null;
    title?: string | null;
    href?: string | null;
    isExternal?: boolean | null;
  } | null;
  image?: {
    url: string;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
  } | string | null;
  bgImage?: {
    url: string;
    mime?: string | null;
    ext?: string | null;
    alternativeText?: string | null;
  } | string | null;
  tags?: Array<{
    title?: string | null;
    text?: string | null;
  }> | null;
}

export interface IntegratedCapabilitiesSectionProps {
  referenceTitle?: string | null;
  card?: IntegratedCapabilitiesCardItem | null;
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

function cleanHeadingHtml(html: string): string {
  if (!html) return '';
  return html
    .trim()
    .replace(/<\/\s*p\s*>\s*<\s*p(\s+[^>]*)?>/gi, '<br/>')
    .replace(/^<\s*(p|div|h[1-6])(\s+[^>]*)?>/i, '')
    .replace(/<\/\s*(p|div|h[1-6])\s*>$/i, '')
    .trim();
}

export function IntegratedCapabilitiesSection({
  card,
}: IntegratedCapabilitiesSectionProps) {
  // STRICT RULE: If card data is missing from CMS, render nothing
  if (!card) {
    return null;
  }

  const rawTitle = card.title?.trim() || '';
  const cleanTitle = rawTitle ? cleanHeadingHtml(rawTitle) : '';
  const description = card.description?.trim() || '';
  const subheading = card.subheading?.trim() || '';
  const subdescription = card.subdescription?.trim() || '';

  // Tags resolution: ONLY render tags if present in CMS
  const tagList: string[] =
    card.tags && card.tags.length > 0
      ? card.tags.map((t) => (t.text || t.title || '').trim()).filter(Boolean)
      : [];

  const actionText = card.cta?.title?.trim() || card.cta?.label?.trim() || card.actionLabel?.trim() || '';
  const targetHref = card.cta?.href?.trim() || card.href?.trim() || '';

  // Image - Right Photo Box (Rectangle 39989)
  const imageUrl = typeof card.image === 'string' ? card.image : card.image?.url;
  const imageAlt =
    (typeof card.image === 'object' && card.image?.alternativeText) ||
    cleanTitle.replace(/<[^>]*>/g, '') ||
    'Integrated capabilities';

  const fullImageUrl = normalizeImageSrc(imageUrl);

  return (
    <Section
      tone="surface"
      spacing="none"
      aria-labelledby={cleanTitle ? 'integrated-capabilities-heading' : undefined}
      className="py-[clamp(2.5rem,1.893rem+2.589vw,5rem)]"
    >
      {/*
        Figma 2712:10986 is 1920×1153. Copy column is 933px, then a 24px gap,
        then a 723×993 photo. Vertical inset is 80px (below the 120px section
        token). get_motion_context returned no tracks for this node.
      */}
      <div className="grid items-stretch gap-8 xl:grid-cols-[minmax(0,933fr)_minmax(0,723fr)] xl:gap-6">
        <div className="flex min-w-0 flex-col">
          {cleanTitle ? (
            <Heading
              id="integrated-capabilities-heading"
              level={2}
              size="section"
              tone="inherit"
              className="max-w-[min(100%,56.625rem)] font-normal tracking-normal text-black [&_p]:m-0 [&_p]:font-[inherit] [&_p]:leading-[inherit] [&_p]:text-inherit [&_span]:font-normal"
            >
              <span dangerouslySetInnerHTML={{ __html: cleanTitle }} />
            </Heading>
          ) : null}

          {description ? (
            <Text
              size="lead"
              tone="inherit"
              className="mt-[clamp(1.25rem,0.795rem+1.942vw,3.125rem)] max-w-[min(100%,54.5rem)] font-normal text-black"
              style={{ lineHeight: 1.6667 }}
            >
              {stripHtml(description)}
            </Text>
          ) : null}

          {subheading ? (
            <h3 className="mt-block max-w-[min(100%,42.4375rem)] font-sans text-[clamp(1.5rem,1.2875rem+0.9061vw,2.375rem)] font-semibold leading-normal text-[#212121]">
              {subheading}
            </h3>
          ) : null}

          {subdescription ? (
            <Text
              size="lead"
              tone="inherit"
              className="mt-[clamp(0.75rem,0.598rem+0.647vw,1.375rem)] max-w-[min(100%,58.3125rem)] font-normal text-black"
              style={{ lineHeight: 1.6667 }}
            >
              {stripHtml(subdescription)}
            </Text>
          ) : null}

          {tagList.length > 0 ? (
            <ul className="mt-[clamp(1rem,0.772rem+0.971vw,1.9375rem)] flex list-none flex-wrap gap-x-3 gap-y-3 p-0 xl:gap-x-5 xl:gap-y-[1.375rem]">
              {tagList.map((tag, idx) => (
                <li
                  key={`${tag}-${idx}`}
                  className="inline-flex max-w-full items-center justify-center rounded-pill border border-brand-red bg-brand-red/3 px-[clamp(1.25rem,0.947rem+1.294vw,2.5rem)] py-2.5"
                >
                  <span
                    className="font-sans text-body-lg font-medium text-black"
                    style={{ lineHeight: 1.6667 }}
                  >
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {actionText ? (
            <div className="mt-[clamp(1rem,0.772rem+0.971vw,1.9375rem)]">
              <Link
                href={targetHref || '#'}
                className="inline-flex h-[clamp(3rem,2.8rem+0.5vw,3.5rem)] items-center gap-3 rounded-button bg-cta-gradient px-[clamp(1.5rem,1.3rem+0.6vw,1.75rem)] font-sans text-button font-medium leading-[1.5] text-white shadow-button transition-opacity duration-300 ease-out hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy motion-reduce:transition-none"
              >
                <span>{actionText}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          ) : null}

          <div
            className="mt-[clamp(2rem,1.53rem+2.006vw,3.9375rem)] h-[1.33px] w-[min(100%,23.234rem)] bg-black"
            aria-hidden="true"
          />
        </div>

        {fullImageUrl ? (
          <div className="relative w-full self-stretch overflow-hidden rounded-panel border-[1.5px] border-brand-red max-xl:aspect-[723/993]">
            <Image
              src={fullImageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 1279px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
