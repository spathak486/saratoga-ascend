'use client';

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
    'Mission Environment';

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
      className="relative w-full max-w-[1920px] mx-auto py-8 sm:py-12 xl:py-[60px] px-4 sm:px-8 xl:px-[120px] overflow-hidden"
    >
      {/* Inner Card Container: Figma "Calculator" width: 1680px, height: 892.5px, background: #EEEEEE, border-radius: 30px */}
      <div className="box-border relative w-full max-w-[1680px] mx-auto min-h-[560px] xl:h-[892.5px] bg-[#EEEEEE] rounded-[24px] sm:rounded-[30px] overflow-hidden">
        
        {/* Background Graphic Blueprint / Media (Figma copy_of_untitled_project (1) 1) */}
        {/* Left Variant: left: 414.88px, top: 81.95px, width: 1192.9px, height: 745.56px, angle: 0deg, opacity: 1 */}
        {/* Right Variant: left: 60px, top: 81.95px, width: 1192.9px, height: 745.56px, angle: -180deg (scale-x-[-1]), opacity: 1 */}
        <div
          className={`pointer-events-none select-none absolute z-0 overflow-hidden opacity-100 ${
            isRight
              ? 'xl:left-[60px] xl:top-[81.95px] xl:w-[1192.9px] xl:h-[745.56px] scale-x-[-1]'
              : 'xl:left-[414.88px] xl:top-[81.95px] xl:w-[1192.9px] xl:h-[745.56px]'
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
        {/* Left Variant (Soldier): left: 936px, top: 53px, width: 571px, height: 840px, angle: -180deg (scale-x-[-1]) */}
        {/* Right Variant (Doctor): left: 261px, top: 53px, bottom: 0px, width: 560px, height: 840px, angle: -180deg (scale-x-[-1]) */}
        {imageUrl && (
          <div
            className={`pointer-events-none select-none z-10 ${
              isRight
                ? 'xl:absolute xl:left-[261px] xl:top-[53px] xl:w-[560px] xl:h-[840px]'
                : 'xl:absolute xl:left-[936px] xl:top-[53px] xl:w-[571px] xl:h-[840px]'
            } max-xl:relative max-xl:w-full max-xl:h-[360px] sm:max-xl:h-[480px] max-xl:mt-6 max-xl:flex max-xl:items-end max-xl:justify-center`}
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

        {/* Text Content Column: Figma Group 2085665791 (width: 726px, height: 700px, top: 96px, angle: 0deg, opacity: 1) */}
        {/* Left Variant: left: 74px, top: 96px */}
        {/* Right Variant: left: 983px, top: 96px */}
        <div
          className={`z-20 flex flex-col justify-between opacity-100 ${
            isRight
              ? 'xl:absolute xl:left-[983px] xl:top-[96px] xl:w-[726px] xl:h-[700px]'
              : 'xl:absolute xl:left-[74px] xl:top-[96px] xl:w-[726px] xl:h-[700px]'
          } max-xl:relative max-xl:w-full max-xl:p-6 sm:max-xl:p-10`}
        >
          <div>
            {/* Title: DM Serif Text, 53.33px, line-height 73px, color #212121, height 146px */}
            {cleanTitle && (
              <h2
                className="font-serif text-[28px] sm:text-[38px] xl:text-[53.33px] leading-[1.2] xl:leading-[73px] font-normal text-[#212121] tracking-[-0.01em] [&_span[style*='color']]:font-semibold"
                style={{ fontFamily: "'DM Serif Text', serif" }}
                dangerouslySetInnerHTML={{ __html: cleanTitle }}
              />
            )}

            {/* Description: Google Sans Flex, 24px, line-height 40px (167%), color #000000, height 240px */}
            {description && (
              <p
                className="mt-6 xl:mt-[40px] font-sans text-[16px] sm:text-[20px] xl:text-[24px] leading-[1.5] xl:leading-[40px] font-normal text-[#000000] max-w-[644px] xl:max-w-[712px]"
                style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              >
                {description}
              </p>
            )}

            {/* Tags / Pills: Figma Group 2085665790 (width: 644px, height: 144px, gap: 20px) */}
            {tagList.length > 0 && (
              <div className="mt-6 xl:mt-[30px] flex flex-wrap gap-2.5 sm:gap-3.5 xl:gap-[20px] max-w-[644px]">
                {tagList.map((tag, idx) => (
                  <div
                    key={`defense-tag-${idx}`}
                    className="box-border inline-flex items-center justify-center px-6 sm:px-8 xl:px-[40px] py-2 sm:py-2.5 xl:h-[62px] bg-[rgba(240,20,36,0.02)] border border-[#F01424] rounded-[60px] text-center transition-transform duration-200 hover:scale-105"
                  >
                    <span
                      className="font-sans font-medium text-[16px] sm:text-[20px] xl:text-[24px] leading-[32px] sm:leading-[36px] xl:leading-[40px] text-[#000000]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button: Figma _Button base width: 352px, height: 60px, top: 736px, gradient */}
          {actionText && (
            <div className="mt-8 xl:mt-[40px]">
              <Link
                href={targetHref || '#'}
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-[352px] h-[54px] sm:h-[60px] px-6 py-4 rounded-[8px] text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105 active:scale-98"
                style={{
                  background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
                }}
              >
                <span
                  className="font-sans font-medium text-[18px] sm:text-[20px] leading-[30px] text-white"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {actionText}
                </span>

                {/* Arrow Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="#FFFFFF"
                    strokeWidth="2.125"
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

export default DefenseSection;
