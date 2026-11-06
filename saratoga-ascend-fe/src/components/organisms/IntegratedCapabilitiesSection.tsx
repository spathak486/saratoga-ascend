'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

  // Image - Right Photo Box (Rectangle 39989: 723.38px x 993.38px)
  const imageUrl = typeof card.image === 'string' ? card.image : card.image?.url;
  const imageAlt =
    (typeof card.image === 'object' && card.image?.alternativeText) ||
    cleanTitle.replace(/<[^>]*>/g, '') ||
    'Integrated capabilities';

  const fullImageUrl = normalizeImageSrc(imageUrl);

  return (
    <section className="relative w-full bg-[#FFFFFF] py-12 md:py-16 xl:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1920px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-[120px]">
        
        {/* Desktop Absolute Canvas (>=1440px / 1920px container matching Figma layout) */}
        <div className="hidden xl:block relative w-full h-[1153px]">
          
          {/* Left Column Content */}
          <div className="absolute left-0 top-0 w-[933px] flex flex-col z-10">
            {/* Title (DM Serif Text, 72px, line-height 99px, color: #000000) */}
            {cleanTitle ? (
              <h2
                className="w-[906px] font-['DM_Serif_Text'] text-[72px] font-normal leading-[99px] text-[#000000] tracking-[-0.01em] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit [&_span[style*='color']]:font-semibold"
                dangerouslySetInnerHTML={{ __html: cleanTitle }}
              />
            ) : null}

            {/* Description (Google Sans Flex, 24px, line-height 40px, top: 389px) */}
            {description ? (
              <p className="mt-[12px] w-[872px] font-sans text-[24px] font-normal leading-[40px] text-[#000000]">
                {description}
              </p>
            ) : null}

            {/* Subheading (Capabilities aligned to the work - Google Sans Flex, 38px, font-weight 600, line-height 48px, #212121) */}
            {subheading ? (
              <h3 className="mt-[60px] w-[679px] font-sans text-[38px] font-semibold leading-[48px] text-[#212121]">
                {subheading}
              </h3>
            ) : null}

            {/* Subdescription (Start with the mission... - Google Sans Flex, 24px, line-height 40px, top: 717px) */}
            {subdescription ? (
              <p className="mt-[20px] w-[933px] font-sans text-[24px] font-normal leading-[40px] text-[#000000]">
                {subdescription}
              </p>
            ) : null}

            {/* Tags Pills (Figma Frame 2147226549 & 2147226550) */}
            {tagList.length > 0 ? (
              <div className="mt-[28px] w-[895px] flex flex-wrap gap-x-[16px] gap-y-[16px]">
                {tagList.map((tag, idx) => (
                  <div
                    key={`tag-${idx}`}
                    className="inline-flex items-center justify-center h-[62px] px-[24px] py-[16px] rounded-[100px] border border-[#F01424] bg-[rgba(240,20,36,0.03)]"
                  >
                    <span className="font-sans text-[20px] font-semibold leading-[30px] text-[#212121] tracking-[-0.01em] whitespace-nowrap">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {/* CTA Button (if present) */}
            {actionText ? (
              <div className="mt-[32px]">
                <Link
                  href={targetHref || '#'}
                  className="inline-flex items-center gap-[12px] h-[56px] px-[28px] rounded-[8px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white font-sans text-[18px] font-medium leading-[150%] shadow-sm hover:opacity-95 transition-opacity"
                >
                  <span>{actionText}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Line 232 (border: 1.33241px solid #000000, width: 371.74px, top: 1073px - 80px = 993px from container top) */}
          <div
            className="absolute left-0 bottom-0 w-[371.74px] h-0 border-b-[1.33px] border-[#000000]"
            aria-hidden="true"
          />

          {/* Right Column Photo (Rectangle 39989: 723.38px x 993.38px, border: 1.5px solid #F01424, border-radius: 31.9778px) */}
          {fullImageUrl ? (
            <div
              className="absolute left-[957px] 2xl:left-[1077px] top-0 w-[723.38px] h-[993.38px] rounded-[31.98px] border-[1.5px] border-[#F01424] overflow-hidden shadow-sm"
              style={{
                boxSizing: 'border-box',
              }}
            >
              <Image
                src={fullImageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1920px) 724px, 724px"
                className="object-cover object-center"
              />
            </div>
          ) : null}
        </div>

        {/* Responsive Mobile / Tablet / Laptop View (<1280px) */}
        <div className="xl:hidden flex flex-col gap-10">
          {/* Text Content */}
          <div className="flex flex-col">
            {cleanTitle ? (
              <h2
                className="font-['DM_Serif_Text'] text-[36px] sm:text-[48px] md:text-[56px] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit [&_span[style*='color']]:font-semibold"
                dangerouslySetInnerHTML={{ __html: cleanTitle }}
              />
            ) : null}

            {description ? (
              <p className="mt-4 font-sans text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[1.6] text-[#000000]">
                {description}
              </p>
            ) : null}

            {subheading ? (
              <h3 className="mt-8 font-sans text-[24px] sm:text-[28px] md:text-[32px] font-semibold leading-[1.3] text-[#212121]">
                {subheading}
              </h3>
            ) : null}

            {subdescription ? (
              <p className="mt-3 font-sans text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[1.6] text-[#000000]">
                {subdescription}
              </p>
            ) : null}

            {/* Tags */}
            {tagList.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                {tagList.map((tag, idx) => (
                  <div
                    key={`mob-tag-${idx}`}
                    className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-full border border-[#F01424] bg-[rgba(240,20,36,0.03)]"
                  >
                    <span className="font-sans text-[14px] sm:text-[16px] font-semibold leading-normal text-[#212121]">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {/* CTA */}
            {actionText ? (
              <div className="mt-6">
                <Link
                  href={targetHref || '#'}
                  className="inline-flex items-center gap-2 h-[48px] px-6 rounded-[8px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white font-sans text-[16px] font-medium leading-normal shadow-sm hover:opacity-95 transition-opacity"
                >
                  <span>{actionText}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Photo on Mobile */}
          {fullImageUrl ? (
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[700px] rounded-[24px] sm:rounded-[32px] border-[1.5px] border-[#F01424] overflow-hidden shadow-sm">
              <Image
                src={fullImageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1280px) 100vw, 724px"
                className="object-cover object-center"
              />
            </div>
          ) : null}

          {/* Decorative line */}
          <div className="w-[200px] sm:w-[300px] h-0 border-b-[1.33px] border-[#000000]" aria-hidden="true" />
        </div>

      </div>
    </section>
  );
}

