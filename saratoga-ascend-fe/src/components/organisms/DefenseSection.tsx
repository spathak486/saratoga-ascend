'use client';

import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface DefenseCardItem {
  id?: string | number | null;
  documentId?: string | null;
  title?: string | null;
  subheading?: string | null;
  description?: string | null;
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

export interface DefenseSectionProps {
  referenceTitle?: string | null;
  variant?: 'left' | 'right' | null;
  card?: DefenseCardItem | null;
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

function isVideoUrl(url?: string | null, mime?: string | null, ext?: string | null): boolean {
  if (mime && mime.toLowerCase().startsWith('video/')) return true;
  if (ext && (ext.toLowerCase() === '.mp4' || ext.toLowerCase() === '.webm' || ext.toLowerCase() === '.ogg')) return true;
  if (!url) return false;
  const lower = url.toLowerCase();
  return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg');
}

/**
 * Cleanly unwrap block wrapper tags (<p>, <h2>, <div>) output by CKEditor so they can
 * be placed inside an actual native heading tag (<h2>) without invalid HTML nesting or hydration mismatch.
 */
function cleanHeadingHtml(html: string): string {
  if (!html) return '';
  return html
    .trim()
    .replace(/<\/\s*p\s*>\s*<\s*p(\s+[^>]*)?>/gi, '<br/>')
    .replace(/^<\s*(p|div|h[1-6])(\s+[^>]*)?>/i, '')
    .replace(/<\/\s*(p|div|h[1-6])\s*>$/i, '')
    .trim();
}

export function DefenseSection({
  variant = 'left',
  card,
}: DefenseSectionProps) {
  // STRICT RULE: If card data is missing from CMS, render nothing
  if (!card) {
    return null;
  }

  const isRight = variant === 'right';

  const rawTitle = card.title?.trim() || '';
  const cleanTitle = rawTitle ? cleanHeadingHtml(rawTitle) : '';

  const description = card.description?.trim() || '';

  // Tags resolution: ONLY render tags if entered in CMS
  const tagList: string[] =
    card.tags && card.tags.length > 0
      ? card.tags.map((t) => (t.text || t.title || '').trim()).filter(Boolean)
      : [];

  const actionText = card.cta?.title?.trim() || card.cta?.label?.trim() || card.actionLabel?.trim() || '';
  const targetHref = card.cta?.href?.trim() || card.href?.trim() || '';

  // Images & Media
  const imageUrl = typeof card.image === 'string' ? card.image : card.image?.url;
  const imageAlt =
    (typeof card.image === 'object' && card.image?.alternativeText) ||
    cleanTitle.replace(/<[^>]*>/g, '') ||
    'Defense & Mission Environment';

  const bgUrl = typeof card.bgImage === 'string' ? card.bgImage : card.bgImage?.url;
  const bgMime = typeof card.bgImage === 'object' ? card.bgImage?.mime : null;
  const bgExt = typeof card.bgImage === 'object' ? card.bgImage?.ext : null;
  const hasBgVideo = isVideoUrl(bgUrl, bgMime, bgExt);

  // If there's no title, description, or image at all, do not render empty card
  if (!cleanTitle && !description && !imageUrl) {
    return null;
  }

  return (
    <section
      aria-label={cleanTitle ? cleanTitle.replace(/<[^>]*>/g, '') : 'Defense Section'}
      className="relative w-full max-w-[120rem] mx-auto py-8 sm:py-12 xl:py-14 2xl:py-[3.75rem] px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-[7.5rem] overflow-hidden"
    >
      {/* Inner Card Container: Responsive flex/grid container across 100% and 125% scales */}
      <div className="box-border relative w-full max-w-[105rem] mx-auto bg-[#EEEEEE] rounded-[1.5rem] sm:rounded-[1.875rem] overflow-hidden p-6 sm:p-8 xl:p-10 2xl:p-14 min-h-[31.25rem] xl:min-h-[45rem] 2xl:min-h-[53.125rem] flex flex-col justify-center">
        
        {/* Background Graphic Blueprint / Media (Figma copy_of_untitled_project (1) 1) */}
        <div
          className={`pointer-events-none select-none absolute z-0 overflow-hidden opacity-100 ${
            isRight
              ? 'xl:left-0 2xl:left-[3.75rem] xl:top-[3.125rem] 2xl:top-[5.1219rem] xl:w-[60rem] 2xl:w-[74.5563rem] xl:h-[37.5rem] 2xl:h-[46.5975rem] scale-x-[-1]'
              : 'xl:right-0 2xl:left-[25.93rem] xl:top-[3.125rem] 2xl:top-[5.1219rem] xl:w-[60rem] 2xl:w-[74.5563rem] xl:h-[37.5rem] 2xl:h-[46.5975rem]'
          } max-xl:inset-0 max-xl:w-full max-xl:h-full`}
        >
          {bgUrl ? (
            hasBgVideo ? (
              <video
                src={normalizeImageSrc(bgUrl)}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={normalizeImageSrc(bgUrl)}
                alt=""
                fill
                unoptimized
                className="object-cover"
              />
            )
          ) : (
            /* Figma Blueprint / Circuit Grid Accent Pattern */
            <div
              className="w-full h-full opacity-25"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #2A91DC 1.5px, transparent 1.5px), linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
                backgroundSize: '32px 32px, 64px 64px, 64px 64px',
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Foreground Cutout Portrait Image: ONLY if uploaded in CMS */}
        {imageUrl && (
          <div
            className={`pointer-events-none select-none z-10 ${
              isRight
                ? 'xl:absolute xl:left-[1.25rem] 2xl:left-[16.3125rem] xl:bottom-0 xl:w-[26.25rem] 2xl:w-[35rem] xl:h-[40rem] 2xl:h-[52.5rem]'
                : 'xl:absolute xl:right-[1.25rem] 2xl:right-[2.5rem] 2xl:left-[58.5rem] xl:bottom-0 xl:w-[27.5rem] 2xl:w-[35.6875rem] xl:h-[40rem] 2xl:h-[52.5rem]'
            } max-xl:relative max-xl:w-full max-xl:h-[21.25rem] sm:max-xl:h-[28.75rem] max-xl:mt-6 max-xl:flex max-xl:items-end max-xl:justify-center`}
          >
            <div className="relative w-full h-full">
              <Image
                src={normalizeImageSrc(imageUrl)}
                alt={imageAlt}
                fill
                unoptimized
                priority
                className="object-contain object-bottom scale-x-[-1]"
              />
            </div>
          </div>
        )}

        {/* Text Content Column: Fluidly scaled and positioned */}
        <div
          className={`relative z-20 flex flex-col justify-between opacity-100 ${
            isRight
              ? 'xl:ml-auto xl:w-[52%] 2xl:w-[45.375rem]'
              : 'xl:mr-auto xl:w-[52%] 2xl:w-[45.375rem]'
          } max-xl:w-full`}
        >
          <div>
            {/* Title: DM Serif Text */}
            {cleanTitle && (
              <h2
                className="font-serif text-[1.75rem] sm:text-[2.25rem] xl:text-[2.625rem] 2xl:text-[3.3331rem] leading-[1.2] xl:leading-[1.25] 2xl:leading-[4.5625rem] font-normal text-[#212121] tracking-[-0.01em] [&_span[style*='color']]:font-semibold"
                style={{ fontFamily: "'DM Serif Text', serif" }}
                dangerouslySetInnerHTML={{ __html: cleanTitle }}
              />
            )}

            {/* Description: Google Sans Flex */}
            {description && (
              <p
                className="mt-4 sm:mt-6 xl:mt-7 2xl:mt-[2.5rem] font-sans text-[0.9375rem] sm:text-[1.125rem] xl:text-[1.25rem] 2xl:text-[1.5rem] leading-[1.5] xl:leading-[1.6] 2xl:leading-[2.5rem] font-normal text-[#000000] max-w-full xl:max-w-[40rem] 2xl:max-w-[44.5rem]"
                style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              >
                {stripHtml(description)}
              </p>
            )}

            {/* Tags / Pills: Responsive flex-wrap */}
            {tagList.length > 0 && (
              <div className="mt-5 sm:mt-6 xl:mt-7 2xl:mt-[1.875rem] flex flex-wrap gap-2 sm:gap-3 xl:gap-3.5 2xl:gap-[1.25rem] max-w-[40.25rem]">
                {tagList.map((tag, idx) => (
                  <div
                    key={`defense-tag-${idx}`}
                    className="box-border inline-flex items-center justify-center px-4 sm:px-6 xl:px-7 2xl:px-[2.5rem] py-1.5 sm:py-2 xl:h-[3.25rem] 2xl:h-[3.875rem] bg-[rgba(240,20,36,0.02)] border border-[#F01424] rounded-[3.75rem] text-center transition-transform duration-200 hover:scale-105"
                  >
                    <span
                      className="font-sans font-medium text-[0.875rem] sm:text-[1.0625rem] xl:text-[1.1875rem] 2xl:text-[1.5rem] leading-[1.625rem] sm:leading-[1.875rem] xl:leading-[2.125rem] 2xl:leading-[2.5rem] text-[#000000]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          {actionText && (
            <div className="mt-6 sm:mt-8 xl:mt-8 2xl:mt-[2.5rem]">
              <Link
                href={targetHref || '#'}
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-[20rem] 2xl:w-[22rem] h-[3.125rem] sm:h-[3.5rem] 2xl:h-[3.75rem] px-6 py-3.5 rounded-[0.5rem] text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105 active:scale-98"
                style={{
                  background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
                }}
              >
                <span
                  className="font-sans font-medium text-[1rem] sm:text-[1.125rem] 2xl:text-[1.25rem] leading-[150%] text-white"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {actionText}
                </span>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
