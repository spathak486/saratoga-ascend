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

  // Image - Right Photo Box (Rectangle 39989)
  const imageUrl = typeof card.image === 'string' ? card.image : card.image?.url;
  const imageAlt =
    (typeof card.image === 'object' && card.image?.alternativeText) ||
    cleanTitle.replace(/<[^>]*>/g, '') ||
    'Integrated capabilities';

  const fullImageUrl = normalizeImageSrc(imageUrl);

  return (
    <section className="relative w-full bg-[#FFFFFF] py-10 sm:py-14 xl:py-16 2xl:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 md:px-10 xl:px-12 2xl:px-[120px]">
        
        {/* Two-column layout that naturally scales between 100% and 125% zoom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 2xl:gap-14 items-start">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 2xl:col-span-7 flex flex-col justify-between">
            {/* Title (DM Serif Text, responsive font sizing) */}
            {cleanTitle ? (
              <h2
                className="font-['DM_Serif_Text'] text-[34px] sm:text-[44px] md:text-[52px] xl:text-[58px] 2xl:text-[72px] font-normal leading-[1.15] 2xl:leading-[99px] text-[#000000] tracking-[-0.01em] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit [&_span[style*='color']]:font-semibold max-w-[906px]"
                dangerouslySetInnerHTML={{ __html: cleanTitle }}
              />
            ) : null}

            {/* Description */}
            {description ? (
              <p className="mt-4 sm:mt-5 xl:mt-6 2xl:mt-[24px] font-sans text-[16px] sm:text-[18px] xl:text-[20px] 2xl:text-[24px] font-normal leading-[1.5] 2xl:leading-[40px] text-[#000000] max-w-[872px]">
                {description}
              </p>
            ) : null}

            {/* Subheading (Capabilities aligned to the work) */}
            {subheading ? (
              <h3 className="mt-8 sm:mt-10 xl:mt-11 2xl:mt-[56px] font-sans text-[26px] sm:text-[30px] xl:text-[32px] 2xl:text-[38px] font-semibold leading-[1.25] 2xl:leading-[48px] text-[#212121] max-w-[679px]">
                {subheading}
              </h3>
            ) : null}

            {/* Subdescription */}
            {subdescription ? (
              <p className="mt-3 sm:mt-4 xl:mt-4 2xl:mt-[18px] font-sans text-[16px] sm:text-[18px] xl:text-[20px] 2xl:text-[24px] font-normal leading-[1.5] 2xl:leading-[40px] text-[#000000] max-w-[933px]">
                {subdescription}
              </p>
            ) : null}

            {/* Tags Pills */}
            {tagList.length > 0 ? (
              <div className="mt-6 sm:mt-7 xl:mt-8 2xl:mt-[28px] flex flex-wrap gap-2.5 sm:gap-3 xl:gap-3.5 2xl:gap-[16px] max-w-[895px]">
                {tagList.map((tag, idx) => (
                  <div
                    key={`tag-${idx}`}
                    className="inline-flex items-center justify-center min-h-[46px] xl:min-h-[52px] 2xl:h-[62px] px-4 sm:px-5 xl:px-6 2xl:px-[24px] py-2 rounded-[100px] border border-[#F01424] bg-[rgba(240,20,36,0.03)]"
                  >
                    <span className="font-sans text-[15px] sm:text-[17px] xl:text-[18px] 2xl:text-[20px] font-semibold leading-normal text-[#212121] tracking-[-0.01em] whitespace-nowrap">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {/* CTA Button (if present) */}
            {actionText ? (
              <div className="mt-6 sm:mt-8 xl:mt-8 2xl:mt-[32px]">
                <Link
                  href={targetHref || '#'}
                  className="inline-flex items-center gap-[12px] h-[50px] sm:h-[54px] 2xl:h-[56px] px-6 sm:px-7 2xl:px-[28px] rounded-[8px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white font-sans text-[16px] sm:text-[17px] 2xl:text-[18px] font-medium leading-[150%] shadow-sm hover:opacity-95 transition-opacity"
                >
                  <span>{actionText}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            ) : null}

            {/* Decorative Line (Line 232) */}
            <div
              className="mt-10 sm:mt-12 xl:mt-14 2xl:mt-16 w-[240px] sm:w-[320px] 2xl:w-[371.74px] h-0 border-b-[1.33px] border-[#000000]"
              aria-hidden="true"
            />
          </div>

          {/* Right Column Photo (Rectangle 39989) */}
          {fullImageUrl ? (
            <div className="lg:col-span-5 2xl:col-span-5 flex lg:justify-end">
              <div
                className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:w-full lg:max-w-[560px] 2xl:max-w-[723.38px] lg:h-[680px] xl:h-[780px] 2xl:h-[993.38px] rounded-[24px] sm:rounded-[31.98px] border-[1.5px] border-[#F01424] overflow-hidden shadow-sm"
              >
                <Image
                  src={fullImageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 560px, 724px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ) : null}

        </div>

      </div>
    </section>
  );
}
