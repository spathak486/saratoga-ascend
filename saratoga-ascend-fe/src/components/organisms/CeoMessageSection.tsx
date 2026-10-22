'use client';

import React from 'react';
import Image from 'next/image';
import { Section } from '../atoms';

export interface CeoMessageSectionProps {
  title?: string;
  highlightTitle?: string;
  description?: string;
  authorName?: string;
  authorRole?: string;
  imageSrc?: string;
  watermarkSrc?: string;
}

const DEFAULT_TITLE = 'A Message from';
const DEFAULT_HIGHLIGHT = 'Our CEO';
const DEFAULT_AUTHOR_NAME = 'Jenny Wilson';
const DEFAULT_AUTHOR_ROLE = 'CEO of Saratoga Ascend';
const DEFAULT_IMAGE_SRC = '/images/ceo-portrait.jpg';

const DEFAULT_PARAGRAPHS = [
  'For more than 40 years, Saratoga has been defined by trust- built through consistency, integrity, and delivery in environments where precision and accountability matter.',
  'Carrying this legacy forward has been both a responsibility and a privilege. Over the years, Saratoga has evolved alongside the missions we support, adapting to rising complexity while remaining anchored in the values that shaped us from the beginning.',
  'Saratoga Ascend represents that evolution. Not a reinvention, but a purposeful expansion – strengthening our ability to deliver integrated, mission-ready healthcare and operational solutions without compromising the standards that define us.',
];

function renderHeading(title?: string, highlight?: string) {
  const rawTitle = title?.trim() || '';
  const rawHighlight = highlight?.trim() || '';

  if (!rawTitle && !rawHighlight) {
    return null;
  }

  if (!rawHighlight) {
    return (
      <h2 className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em]">
        {rawTitle}
      </h2>
    );
  }

  if (!rawTitle) {
    return (
      <h2 className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em]">
        <span className="text-[#F01424]">{rawHighlight}</span>
      </h2>
    );
  }

  const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'i');

  if (regex.test(rawTitle)) {
    const parts = rawTitle.split(regex);
    return (
      <h2 className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em]">
        {parts.map((part, i) =>
          part.toLowerCase() === rawHighlight.toLowerCase() ? (
            <span key={i} className="text-[#F01424]">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </h2>
    );
  }

  // If highlight is separate from title (e.g. title: "Message from", highlight: "Our CEO")
  return (
    <h2 className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em]">
      <span>{rawTitle} </span>
      <span className="text-[#F01424]">{rawHighlight}</span>
    </h2>
  );
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return DEFAULT_IMAGE_SRC;
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

export const CeoMessageSection: React.FC<CeoMessageSectionProps> = ({
  title,
  highlightTitle,
  description,
  authorName,
  authorRole,
  imageSrc,
  watermarkSrc,
}) => {
  if (!title && !description && !authorName) {
    return null;
  }

  const [imgSrc, setImgSrc] = React.useState<string>(() => normalizeImageSrc(imageSrc));
  const [wmSrc, setWmSrc] = React.useState<string>(() => normalizeImageSrc(watermarkSrc || imageSrc));

  React.useEffect(() => {
    setImgSrc(normalizeImageSrc(imageSrc));
  }, [imageSrc]);

  React.useEffect(() => {
    setWmSrc(normalizeImageSrc(watermarkSrc || imageSrc));
  }, [watermarkSrc, imageSrc]);

  return (
    <section
      aria-label="CEO Message"
      className="relative w-full overflow-hidden bg-[#E4EBF1] flex items-center min-h-[700px] 2xl:min-h-[838px]"
      style={{
        backgroundColor: '#E4EBF1',
      }}
    >
      {/* Background dot grid pattern from Figma (1243x838 at opacity 0.1) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none opacity-10 mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/ceo-dots-pattern.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '1243px 838px',
          backgroundPosition: 'left top',
        }}
        aria-hidden="true"
      />

      {/* Main Container 1920px Frame */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] h-[720px] xl:h-[780px] 2xl:h-[838px] flex items-center overflow-hidden">
        
        {/* Left Content Area (Figma Group 2085665634: width: 927px, height: 546px, top: 87px, left: 135px) */}
        <div className="relative z-10 w-full lg:max-w-[50vw] 2xl:max-w-[927px] pl-6 sm:pl-12 md:pl-16 lg:pl-[6vw] 2xl:pl-[135px] pr-4 pt-10 lg:pt-14 2xl:pt-[87px] pb-10 flex flex-col justify-start min-h-[546px]">
          {/* Heading (Figma: width: 831px, height: 86px) */}
          {title && (
            <div className="mb-6 2xl:mb-8 max-w-[831px]">
              {renderHeading(title, highlightTitle)}
            </div>
          )}

          {/* Message Body */}
          {description && (
            <div
              className="prose max-w-[927px] font-sans text-[clamp(1rem,0.85rem+0.45vw,1.5rem)] font-normal leading-[160%] text-[#5A5A5A] space-y-4 xl:space-y-6 [&_p]:mb-4 xl:[&_p]:mb-6 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Author Signature Block */}
          {(authorName || authorRole) && (
            <div className="mt-8 2xl:mt-10 flex flex-col items-start">
              {authorName && (
                <span className="font-serif text-[clamp(1.5rem,1.25rem+0.75vw,2.25rem)] font-normal leading-tight text-[#F01424]">
                  {authorName}
                </span>
              )}
              {authorRole && (
                <span className="mt-1 font-sans text-[clamp(0.9375rem,0.85rem+0.25vw,1.25rem)] font-normal leading-normal text-[#1E293B]">
                  {authorRole}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Visual Stage: Figma exact placement (Left: 1015px, Watermark Left: 1302px) */}
        {/* Desktop View (lg and up) */}
        <div className="hidden lg:block pointer-events-none select-none absolute inset-0 z-0 overflow-visible">
          {/* Watermark Portrait (Figma: width 618px, height 838px, left: 1302px, top: 0px, opacity: 0.4) */}
          <div
            className="absolute top-0 bottom-0 right-0 h-full aspect-[618/838] opacity-40 grayscale contrast-125 z-[1] 2xl:right-auto 2xl:left-[1302px] 2xl:w-[618px]"
            aria-hidden="true"
          >
            <Image
              src={wmSrc}
              alt=""
              fill
              sizes="(max-width: 1536px) 560px, 618px"
              className="object-cover object-bottom"
              priority
              unoptimized
              onError={() => setWmSrc(DEFAULT_IMAGE_SRC)}
            />
          </div>

          {/* Foreground Portrait (Figma: width 717px, height 838px, left: 1015px, top: 0px, opacity: 1) */}
          <div
            className="absolute top-0 bottom-0 h-full aspect-[717/838] z-[2] right-[10vw] xl:right-[12vw] 2xl:right-auto 2xl:left-[1015px] 2xl:w-[717px]"
          >
            <Image
              src={imgSrc}
              alt={`${authorName} - ${authorRole}`}
              fill
              sizes="(max-width: 1536px) 640px, 717px"
              className="object-cover object-bottom drop-shadow-sm"
              priority
              unoptimized
              onError={() => setImgSrc(DEFAULT_IMAGE_SRC)}
            />
          </div>
        </div>

        {/* Mobile / Tablet Responsive Fallback Container */}
        <div className="lg:hidden relative w-full flex justify-center items-end min-h-[460px] sm:min-h-[560px] mt-6 overflow-hidden pointer-events-none select-none">
          <div
            className="absolute right-0 bottom-0 w-[280px] sm:w-[380px] h-[440px] sm:h-[540px] opacity-40 grayscale contrast-125 z-[1] translate-x-6"
            aria-hidden="true"
          >
            <Image
              src={wmSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 280px, 380px"
              className="object-cover object-bottom"
              priority
              unoptimized
              onError={() => setWmSrc(DEFAULT_IMAGE_SRC)}
            />
          </div>
          <div className="relative z-[2] w-[300px] sm:w-[420px] h-[460px] sm:h-[560px] shrink-0">
            <Image
              src={imgSrc}
              alt={`${authorName} - ${authorRole}`}
              fill
              sizes="(max-width: 768px) 300px, 420px"
              className="object-cover object-bottom drop-shadow-sm"
              priority
              unoptimized
              onError={() => setImgSrc(DEFAULT_IMAGE_SRC)}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
