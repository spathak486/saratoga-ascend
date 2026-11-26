'use client';

import React from 'react';
import Image from 'next/image';

export interface BenefitCardItem {
  title?: string | null;
  icon?: {
    url?: string | null;
    alternativeText?: string | null;
  } | string | null;
}

export interface DirectAccessSectionProps {
  referenceTitle?: string | null;
  title?: string | null;
  description?: string | null;
  callout?: string | null;
  cards?: BenefitCardItem[] | null;
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

// Built-in SVG fallbacks for the 4 standard card icons from Figma if none uploaded in CMS
function DefaultBenefitIcon({ index }: { index: number }) {
  if (index === 0) {
    // reduce procurement timelines (clock / timer)
    return (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (index === 1) {
    // ensure regulatory compliance (clipboard check)
    return (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <polyline points="9 14 11 16 15 11" />
      </svg>
    );
  }
  if (index === 2) {
    // control costs (dollar / settings)
    return (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }
  // simplify vendor selection (user check / list)
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

export function DirectAccessSection({
  title,
  description,
  callout,
  cards,
}: DirectAccessSectionProps) {
  const rawTitle = title?.trim() || '';
  const cleanTitle = rawTitle ? cleanHeadingHtml(rawTitle) : '';
  const cleanDesc = description?.trim() || '';
  const cleanCallout = callout?.trim() || '';

  const cardList = cards && cards.length > 0 ? cards : [];

  // Zero-fallback: if no content provided at all, render nothing
  if (!cleanTitle && !cleanDesc && cardList.length === 0 && !cleanCallout) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#FAFAFA] py-12 sm:py-16 xl:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-[7.5rem]">
        
        {/* Header Block: Group 2085665802 (Title + Description CKEditor) */}
        <div className="w-full max-w-[94.5rem] flex flex-col">
          {cleanTitle ? (
            <h2
              className="font-serif text-section font-normal leading-[1.2] text-[#F01424] tracking-tight [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit [&_span[style*='color']]:font-semibold"
              style={{ fontFamily: "'DM Serif Text', serif" }}
              dangerouslySetInnerHTML={{ __html: cleanTitle }}
            />
          ) : null}

          {cleanDesc ? (
            <div
              className="mt-6 sm:mt-8 2xl:mt-[2.375rem] font-sans font-normal text-[1rem] sm:text-[1.1875rem] md:text-[1.3125rem] xl:text-[1.375rem] 2xl:text-[1.5rem] leading-[1.5] sm:leading-[1.6] 2xl:leading-[2.5rem] text-[#000000] max-w-[84rem] [&_p]:mb-4 sm:[&_p]:mb-5 2xl:[&_p]:mb-6 last:[&_p]:mb-0 [&_span[style*='color']]:font-semibold"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: cleanDesc }}
            />
          ) : null}
        </div>

        {/* 4 Cards Row: Group 2085664502 (410px width each, 241px height with top floating 116px circular badge) */}
        {cardList.length > 0 ? (
          <div className="mt-12 sm:mt-16 xl:mt-20 2xl:mt-[4.75rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 xl:gap-6 2xl:gap-[1.25rem] max-w-[105rem]">
            {cardList.map((card, idx) => {
              const cardTitle = card.title?.trim() || '';
              const iconUrl = typeof card.icon === 'string' ? card.icon : card.icon?.url;
              const fullIconUrl = normalizeImageSrc(iconUrl);

              return (
                <div
                  key={`direct-access-card-${idx}`}
                  className="relative w-full pt-[3.625rem] flex flex-col items-center"
                >
                  {/* Floating Top Circular Badge (Ellipse 2579: 116px x 116px, bg: #2B88D9) */}
                  <div className="absolute top-0 z-20 w-[6.25rem] h-[6.25rem] 2xl:w-[7.25rem] 2xl:h-[7.25rem] rounded-full bg-[#2B88D9] flex items-center justify-center shadow-sm">
                    {fullIconUrl ? (
                      <div className="relative w-[3rem] h-[3rem] 2xl:w-[3.25rem] 2xl:h-[3.25rem]">
                        <Image
                          src={fullIconUrl}
                          alt={card.title || 'Benefit icon'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <DefaultBenefitIcon index={idx} />
                    )}
                  </div>

                  {/* White Card Box (Frame 2085664342: bg #FFFFFF, border 1.27px solid #2B88D9, border-radius 15.3px) */}
                  <div className="box-border w-full min-h-[10rem] 2xl:min-h-[11.3125rem] bg-[#FFFFFF] border-[1.27px] border-[#2B88D9] rounded-[0.9563rem] pt-[3.625rem] pb-6 px-4 sm:px-6 flex items-center justify-center text-center shadow-xs">
                    {cardTitle ? (
                      <h3
                        className="font-serif text-[1.375rem] sm:text-[1.5rem] 2xl:text-[1.75rem] font-normal leading-[1.3] 2xl:leading-[2.375rem] text-[#000000] max-w-[20.625rem]"
                        style={{ fontFamily: "'DM Serif Text', serif" }}
                      >
                        {cardTitle}
                      </h3>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Bottom Callout Banner: Frame 2147226561 (Gradient 10% red to 10% blue, rounded 10px) */}
        {cleanCallout ? (
          <div className="mt-12 sm:mt-16 2xl:mt-[3.75rem] w-full max-w-[95.5625rem] mx-auto min-h-[4.5rem] 2xl:h-[5.5rem] px-6 sm:px-8 2xl:px-[1.875rem] py-4 2xl:py-[1.4375rem] rounded-[0.625rem] bg-gradient-to-r from-[rgba(211,30,45,0.1)] to-[rgba(42,145,220,0.1)] flex items-center justify-center text-center">
            <div
              className="font-sans font-normal text-[1rem] sm:text-[1.25rem] 2xl:text-[1.5rem] leading-[1.5] 2xl:leading-[2.5rem] text-[#000000] max-w-[91.6875rem] [&_p]:m-0 [&_span[style*='color']]:font-semibold"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: cleanCallout }}
            />
          </div>
        ) : null}

      </div>
    </section>
  );
}

