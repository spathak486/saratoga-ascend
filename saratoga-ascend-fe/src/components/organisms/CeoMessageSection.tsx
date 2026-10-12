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
  if (!title) {
    return (
      <h2 className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em]">
        {DEFAULT_TITLE} <span className="text-[#F01424]">{DEFAULT_HIGHLIGHT}</span>
      </h2>
    );
  }

  // If highlight is provided and exists inside title, highlight it in red
  if (highlight && title.includes(highlight)) {
    const parts = title.split(highlight);
    return (
      <h2 className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em]">
        {parts[0]}
        <span className="text-[#F01424]">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </h2>
    );
  }

  // Check if title ends with "Our CEO"
  if (title.toLowerCase().includes('our ceo')) {
    const index = title.toLowerCase().indexOf('our ceo');
    const before = title.slice(0, index);
    const target = title.slice(index, index + 7);
    const after = title.slice(index + 7);
    return (
      <h2 className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em]">
        {before}
        <span className="text-[#F01424]">{target}</span>
        {after}
      </h2>
    );
  }

  return (
    <h2 className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-normal leading-[1.15] text-[#000000] tracking-[-0.01em]">
      {title}
    </h2>
  );
}

export const CeoMessageSection: React.FC<CeoMessageSectionProps> = ({
  title,
  highlightTitle = DEFAULT_HIGHLIGHT,
  description,
  authorName = DEFAULT_AUTHOR_NAME,
  authorRole = DEFAULT_AUTHOR_ROLE,
  imageSrc = DEFAULT_IMAGE_SRC,
  watermarkSrc,
}) => {
  const foregroundImage = imageSrc || DEFAULT_IMAGE_SRC;
  const watermarkImage = watermarkSrc || foregroundImage;

  return (
    <section
      aria-label="CEO Message"
      className="relative w-full overflow-hidden bg-[#E4EBF1] min-h-[700px] xl:min-h-[838px] flex items-center"
      style={{
        backgroundColor: '#E4EBF1',
      }}
    >
      {/* Background dot grid pattern (matching Figma opacity: 0.1 / subtle dot structure) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(#475569 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-6 sm:px-12 md:px-16 lg:px-24 xl:px-[135px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] xl:grid-cols-[minmax(0,960px)_minmax(0,680px)] xl:gap-8">
          
          {/* Left Column: Heading, Paragraphs, Author Sign-off */}
          <div className="flex flex-col justify-center py-12 lg:py-16 xl:py-20 z-10 max-w-[927px]">
            {/* Heading */}
            <div className="mb-8 xl:mb-10">
              {renderHeading(title, highlightTitle)}
            </div>

            {/* Message Body */}
            {description ? (
              <div
                className="prose max-w-none font-sans text-[clamp(1.125rem,0.95rem+0.55vw,1.5rem)] font-normal leading-[160%] text-[#5A5A5A] space-y-6 [&_p]:mb-6 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <div className="space-y-6 xl:space-y-7">
                {DEFAULT_PARAGRAPHS.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-sans text-[clamp(1.125rem,0.95rem+0.55vw,1.5rem)] font-normal leading-[160%] text-[#5A5A5A]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Author Signature Block */}
            <div className="mt-10 xl:mt-12 flex flex-col items-start">
              <span className="font-serif text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] font-normal leading-tight text-[#F01424]">
                {authorName}
              </span>
              <span className="mt-1 font-sans text-[clamp(1rem,0.9rem+0.3vw,1.25rem)] font-normal leading-normal text-[#1E293B]">
                {authorRole}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Stage with Dual Portrait effect */}
          <div className="relative flex justify-center lg:justify-end items-end self-end w-full min-h-[460px] sm:min-h-[580px] lg:min-h-[720px] xl:min-h-[838px] overflow-hidden">
            
            {/* Background Black & White / Watermark Portrait */}
            <div
              className="absolute right-0 bottom-0 pointer-events-none select-none z-[1] w-[320px] sm:w-[460px] md:w-[540px] xl:w-[618px] h-[520px] sm:h-[680px] xl:h-[838px] opacity-40 grayscale contrast-125 translate-x-8 sm:translate-x-12 xl:translate-x-16"
              aria-hidden="true"
            >
              <Image
                src={watermarkImage}
                alt=""
                fill
                sizes="(max-width: 1024px) 460px, 618px"
                className="object-contain object-bottom"
                priority
              />
            </div>

            {/* Foreground Sharp Color Portrait with Background Removed look */}
            <div className="relative z-[2] w-[340px] sm:w-[480px] md:w-[580px] lg:w-[640px] xl:w-[717px] h-[500px] sm:h-[660px] lg:h-[760px] xl:h-[838px] shrink-0">
              <Image
                src={foregroundImage}
                alt={`${authorName} - ${authorRole}`}
                fill
                sizes="(max-width: 768px) 340px, (max-width: 1280px) 580px, 717px"
                className="object-contain object-bottom drop-shadow-sm"
                priority
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
