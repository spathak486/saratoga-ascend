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

// Fallback tags matching Figma Frames 2147226549-2147226553
const DEFAULT_TAGS = [
  'Healthcare',
  'Workforce',
  'IT & Digital',
  'Contact Center',
  'Program Support',
];

const DEFAULT_LEFT_TITLE = 'Support for Defense and Military Mission Environments';
const DEFAULT_LEFT_DESC =
  'Defense and military programs can require coordinated healthcare services, workforce readiness, technology enablement, contact center operations, and program support. Saratoga Ascend can align relevant capabilities to the defined scope and operating requirements of an opportunity.';

const DEFAULT_RIGHT_TITLE = 'Support for Programs Serving Veterans';
const DEFAULT_RIGHT_DESC =
  'Programs serving veterans depend on respectful service experiences, capable teams, coordinated operations, and dependable support. Saratoga Ascend’s healthcare, workforce, IT, contact center, and administrative capabilities may align to requirements supporting veteran communities and the teams that serve them.';

export function DefenseSection({
  variant = 'left',
  card,
}: DefenseSectionProps) {
  const isRight = variant === 'right';

  const rawTitle = card?.title?.trim() || (isRight ? DEFAULT_RIGHT_TITLE : DEFAULT_LEFT_TITLE);
  const cleanTitle = cleanHeadingHtml(rawTitle);

  const description =
    card?.description?.trim() || (isRight ? DEFAULT_RIGHT_DESC : DEFAULT_LEFT_DESC);

  // Tags resolution
  const tagList: string[] =
    card?.tags && card.tags.length > 0
      ? card.tags.map((t) => (t.title || t.text || '').trim()).filter(Boolean)
      : DEFAULT_TAGS;

  const actionText = card?.cta?.title?.trim() || card?.actionLabel?.trim() || 'Explore Capabilities';
  const targetHref = card?.cta?.href?.trim() || card?.href?.trim() || '/solutions';

  // Images & Media
  const imageUrl = typeof card?.image === 'string' ? card?.image : card?.image?.url;
  const imageAlt =
    (typeof card?.image === 'object' && card?.image?.alternativeText) ||
    cleanTitle.replace(/<[^>]*>/g, '') ||
    'Mission Environment';

  const bgUrl = typeof card?.bgImage === 'string' ? card?.bgImage : card?.bgImage?.url;
  const bgMime = typeof card?.bgImage === 'object' ? card?.bgImage?.mime : null;
  const bgExt = typeof card?.bgImage === 'object' ? card?.bgImage?.ext : null;
  const hasBgVideo = isVideoUrl(bgUrl, bgMime, bgExt);

  return (
    <section
      aria-label={cleanTitle.replace(/<[^>]*>/g, '')}
      className="relative w-full max-w-[1920px] mx-auto py-8 sm:py-12 xl:py-[60px] px-4 sm:px-8 xl:px-[120px] overflow-hidden"
    >
      {/* Inner Card Container: Figma "Calculator" width: 1680px, height: 892.5px, background: #EEEEEE, border-radius: 30px */}
      <div
        className={`box-border relative w-full max-w-[1680px] mx-auto min-h-[640px] xl:min-h-[893px] bg-[#EEEEEE] rounded-[24px] sm:rounded-[30px] overflow-hidden flex flex-col justify-between ${
          isRight ? 'xl:flex-row-reverse' : 'xl:flex-row'
        } items-stretch`}
      >
        {/* Background Media / Video or Image */}
        {bgUrl ? (
          hasBgVideo ? (
            <video
              src={normalizeImageSrc(bgUrl)}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
            />
          ) : (
            <Image
              src={normalizeImageSrc(bgUrl)}
              alt=""
              fill
              unoptimized
              className="object-cover opacity-20 pointer-events-none z-0"
            />
          )
        ) : (
          /* Subtle Figma Decorative Blueprint / Grid Background Overlay */
          <div
            className={`pointer-events-none select-none absolute inset-0 z-0 opacity-15 ${
              isRight ? 'scale-x-[-1]' : ''
            }`}
            style={{
              backgroundImage:
                'radial-gradient(circle, #2A91DC 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '32px 32px, 64px 64px, 64px 64px',
            }}
            aria-hidden="true"
          />
        )}

        {/* Text Content Column: Figma Group 2085665791 (width: 726px, height: 700px) */}
        <div className="relative z-10 w-full xl:w-[726px] p-6 sm:p-10 xl:p-[74px] flex flex-col justify-between flex-shrink-0">
          <div>
            {/* Title: DM Serif Text, 53.33px, line-height 73px, color #212121 */}
            <h2
              className="font-serif text-[28px] sm:text-[38px] xl:text-[53.33px] leading-[1.2] xl:leading-[73px] font-normal text-[#212121] tracking-[-0.01em] [&_span[style*='color']]:font-semibold"
              style={{ fontFamily: "'DM Serif Text', serif" }}
              dangerouslySetInnerHTML={{ __html: cleanTitle }}
            />

            {/* Description: Google Sans Flex, 24px, line-height 40px (167%), color #000000 */}
            <p
              className="mt-5 sm:mt-6 xl:mt-8 font-sans text-[16px] sm:text-[20px] xl:text-[24px] leading-[1.5] xl:leading-[40px] font-normal text-[#000000] max-w-[644px]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              {description}
            </p>

            {/* Tags / Pills: Figma Group 2085665790 */}
            <div className="mt-8 xl:mt-[48px] flex flex-wrap gap-2.5 sm:gap-3.5 xl:gap-[15px] max-w-[660px]">
              {tagList.map((tag, idx) => (
                <div
                  key={`defense-tag-${idx}`}
                  className="box-border inline-flex items-center justify-center px-6 sm:px-8 xl:px-[40px] py-2 sm:py-2.5 xl:py-[10px] bg-[rgba(240,20,36,0.02)] border border-[#F01424] rounded-[60px] text-center transition-transform duration-200 hover:scale-105"
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
          </div>

          {/* CTA Button: Figma _Button base width: 352px, height: 60px, gradient */}
          {actionText && (
            <div className="mt-8 xl:mt-[40px] pt-2">
              <Link
                href={targetHref}
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

        {/* Foreground Cutout Image Column: Figma Soldier (571x840) or Doctor (560x840) */}
        <div className="relative z-10 w-full xl:flex-1 min-h-[360px] sm:min-h-[480px] xl:min-h-full flex items-end justify-center xl:justify-end overflow-hidden">
          {imageUrl ? (
            <div className="relative w-full max-w-[571px] h-[360px] sm:h-[520px] xl:h-[840px] mt-auto">
              <Image
                src={normalizeImageSrc(imageUrl)}
                alt={imageAlt}
                fill
                unoptimized
                priority
                className={`object-contain object-bottom select-none pointer-events-none ${
                  isRight ? 'scale-x-[-1]' : ''
                }`}
              />
            </div>
          ) : (
            /* Elegant SVG Silhouette Placeholder matching theme when no image uploaded yet */
            <div className="relative w-full max-w-[560px] h-[360px] sm:h-[500px] xl:h-[780px] flex items-end justify-center opacity-85 px-6">
              <div className="w-full h-full bg-gradient-to-t from-[#B0CEDB]/50 via-[#CBD5E1]/30 to-transparent rounded-t-[40px] flex flex-col items-center justify-center p-8 text-center border-t border-x border-[#CBD5E1]">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2A91DC"
                  strokeWidth="1.5"
                  className="mb-4"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="font-serif text-[24px] text-[#212121] font-normal mb-2">
                  {isRight ? 'Programs Serving Veterans' : 'Defense & Military Missions'}
                </span>
                <span className="font-sans text-[14px] text-[#64748B]">
                  Upload Card Cutout Portrait in Strapi Admin
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DefenseSection;

