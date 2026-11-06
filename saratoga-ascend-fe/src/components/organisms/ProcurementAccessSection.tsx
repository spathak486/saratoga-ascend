'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface ProcurementAccessSectionProps {
  referenceTitle?: string | null;
  description?: string | null;
  subdescription?: string | null;
  pills?: Array<{ text?: string | null } | string> | null;
  cta?: {
    label?: string | null;
    title?: string | null;
    href?: string | null;
    isExternal?: boolean | null;
  } | null;
  bgMedia?: {
    url?: string | null;
    mime?: string | null;
    ext?: string | null;
    alternativeText?: string | null;
  } | string | null;
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
  if (ext && (ext.toLowerCase() === '.mp4' || ext.toLowerCase() === '.webm' || ext.toLowerCase() === '.ogg' || ext.toLowerCase() === '.mov')) return true;
  if (!url) return false;
  const lower = url.toLowerCase();
  return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg') || lower.endsWith('.mov');
}

export function ProcurementAccessSection({
  description,
  subdescription,
  pills,
  cta,
  bgMedia,
}: ProcurementAccessSectionProps) {
  // STRICT RULE: If no content provided from CMS, render nothing
  const cleanDesc = description?.trim() || '';
  const cleanSubdesc = subdescription?.trim() || '';

  const pillList: string[] = Array.isArray(pills)
    ? pills
        .map((p) => (typeof p === 'string' ? p : p?.text || '').trim())
        .filter(Boolean)
    : [];

  const ctaLabel = cta?.label?.trim() || cta?.title?.trim() || '';
  const ctaHref = cta?.href?.trim() || '#';

  const rawBgUrl = typeof bgMedia === 'string' ? bgMedia : bgMedia?.url;
  const bgUrl = normalizeImageSrc(rawBgUrl);
  const bgMime = typeof bgMedia === 'object' ? bgMedia?.mime : null;
  const bgExt = typeof bgMedia === 'object' ? bgMedia?.ext : null;
  const isVideo = isVideoUrl(rawBgUrl, bgMime, bgExt);

  if (!cleanDesc && !cleanSubdesc && pillList.length === 0 && !ctaLabel) {
    return null;
  }

  return (
    <section className="relative w-full max-w-[1920px] mx-auto py-8 sm:py-12 xl:py-16 px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-[120px] overflow-hidden">
      {/* Outer Banner Card: Figma Group 2085665798 & Rectangle 40171 (1680px x 654px, bg #F1F8FF, border-radius 50px) */}
      <div className="box-border relative w-full max-w-[1680px] mx-auto min-h-[480px] xl:min-h-[600px] 2xl:min-h-[654px] bg-[#F1F8FF] rounded-[32px] sm:rounded-[40px] 2xl:rounded-[50px] overflow-hidden p-6 sm:p-10 md:p-12 xl:p-14 2xl:py-[60px] 2xl:px-[74px] flex flex-col justify-center items-center">
        
        {/* Background Media / Video / Pattern: Rectangle 40174 (opacity: 0.4, border-radius: 50px, matrix transform) */}
        {bgUrl ? (
          <div className="pointer-events-none select-none absolute inset-0 w-full h-full opacity-40 overflow-hidden z-0">
            {isVideo ? (
              <video
                src={bgUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-y-[-1]"
              />
            ) : (
              <Image
                src={bgUrl}
                alt=""
                fill
                unoptimized
                className="object-cover scale-y-[-1]"
              />
            )}
          </div>
        ) : (
          /* Subtle grid pattern when no background media uploaded */
          <div
            className="pointer-events-none select-none absolute inset-0 opacity-[0.12] z-0"
            style={{
              backgroundImage:
                'radial-gradient(#2B88D9 1.5px, transparent 1.5px), linear-gradient(to right, rgba(43,136,217,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,136,217,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
        )}

        {/* Content Container: Figma Frame 2147226559 (width 1533px, max-w-full) */}
        <div className="relative z-10 w-full max-w-[1533px] flex flex-col items-center text-center">
          
          {/* Paragraph 1 */}
          {cleanDesc ? (
            <p
              className="font-sans font-normal text-[16px] sm:text-[19px] md:text-[21px] xl:text-[22px] 2xl:text-[24px] leading-[1.5] sm:leading-[1.6] 2xl:leading-[40px] text-[#000000] max-w-[1500px]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              {cleanDesc}
            </p>
          ) : null}

          {/* Paragraph 2 */}
          {cleanSubdesc ? (
            <p
              className="mt-6 sm:mt-8 2xl:mt-[40px] font-sans font-normal text-[16px] sm:text-[19px] md:text-[21px] xl:text-[22px] 2xl:text-[24px] leading-[1.5] sm:leading-[1.6] 2xl:leading-[40px] text-[#000000] max-w-[1528px]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              {cleanSubdesc}
            </p>
          ) : null}

          {/* Feature Badges / Pills: Frame 2147226558 */}
          {pillList.length > 0 ? (
            <div className="mt-8 sm:mt-10 2xl:mt-[40px] flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 2xl:gap-[35px]">
              {pillList.map((pill, idx) => (
                <div
                  key={`procurement-pill-${idx}`}
                  className="box-border inline-flex items-center justify-center gap-2.5 h-[48px] sm:h-[52px] 2xl:h-[54px] px-4 sm:px-5 2xl:px-[20px] py-[6px] bg-[#F1F8FE] border border-[#2B88D9] rounded-[60px] shadow-xs"
                >
                  {/* Circular check icon (Ellipse 1334 & Vector 6662) */}
                  <span className="w-5 h-5 shrink-0 relative flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8.5" stroke="#2B88D9" strokeWidth="1.5" />
                      <path
                        d="M6.5 10.2L8.8 12.5L13.5 7.8"
                        stroke="#2B88D9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span
                    className="font-sans font-medium text-[15px] sm:text-[17px] 2xl:text-[18px] leading-none text-[#000000] whitespace-nowrap"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
                    {pill}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {/* Download / CTA Button: Figma _Button base width 468px, height 60px */}
          {ctaLabel ? (
            <div className="mt-8 sm:mt-10 2xl:mt-[42px] flex justify-center w-full">
              <Link
                href={ctaHref}
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-[420px] 2xl:w-[468px] min-h-[52px] sm:h-[58px] 2xl:h-[60px] px-6 py-4 rounded-[8px] text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105 active:scale-98"
                style={{
                  background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
                }}
              >
                {/* File download icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>

                <span
                  className="font-sans font-medium text-[16px] sm:text-[18px] 2xl:text-[20px] leading-[150%] text-white text-center"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {ctaLabel}
                </span>
              </Link>
            </div>
          ) : null}

        </div>

      </div>
    </section>
  );
}
