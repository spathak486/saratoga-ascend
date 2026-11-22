'use client';

import { stripHtml } from '@/lib/utils/text';
import React, { useRef } from 'react';
import { Section } from '../atoms';
import type { ServiceLine } from '../molecules/ServiceLineCard';
import { CtaButton } from '../molecules/CtaButton';

export interface WhatWeDoSectionProps {
  title?: string;
  description?: string;
  photoSrc?: string;
  serviceLines?: ServiceLine[];
  ctaLabel?: string;
  ctaHref?: string;
}

/** Hover fill is blue #29a6e3; the ink chevron and ring stay. */
const ARROW_HOVER =
  'hover:bg-[#29a6e3] focus-visible:bg-[#29a6e3]';

const ARROW_BUTTON =
  `flex size-[4.125rem] items-center justify-center rounded-full border-[1.375px] border-ink bg-white text-ink shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] transition-colors duration-300 ease-out ${ARROW_HOVER} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy motion-reduce:transition-none`;

/** Figma chevron, drawn pointing down and rotated onto the button. */
function ArrowGlyph({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="15.307"
      height="8.747"
      viewBox="0 0 19.2502 11.0001"
      fill="none"
      aria-hidden="true"
      className={direction === 'left' ? 'rotate-90' : '-rotate-90'}
    >
      <path
        d="M17.8751 1.37515C17.8751 1.37515 11.7991 9.62507 9.62503 9.62509C7.45099 9.62511 1.37509 1.37509 1.37509 1.37509"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DEFAULT_TITLE = 'What We Do';
const DEFAULT_DESCRIPTION =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  photoSrc = '/images/what-we-do-doctor.png',
  serviceLines,
  ctaLabel = 'About us',
  ctaHref = '/about',
}) => {
  const displayLines = serviceLines && serviceLines.length > 0 ? serviceLines : [];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const card = scroller.querySelector<HTMLElement>('[data-what-we-do-card]');
    const styles = window.getComputedStyle(scroller);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const amount = (card?.offsetWidth ?? scroller.clientWidth) + gap;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    scroller.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <Section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      tone="surface"
      spacing="none"
      className="py-10"
      containerClassName="overflow-x-visible"
    >
      <div className="flex w-full flex-col gap-8 sm:gap-10">
        <div className="flex w-full flex-col items-start gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full max-w-[91.875rem] flex-col gap-3">
            <h2
              id="what-we-do-heading"
              className="font-serif text-[clamp(2.25rem,1.5rem+2.6vw,4.5rem)] leading-[1.2] text-brand-cta-from"
            >
              {stripHtml(title)}
            </h2>
            <p className="max-w-[65.0625rem] font-sans text-[clamp(1.25rem,0.95rem+1vw,1.875rem)] leading-[1.33] text-ink">
              {stripHtml(description)}
            </p>
          </div>
          <CtaButton href={ctaHref} className="shrink-0" showArrow>
            {ctaLabel}
          </CtaButton>
        </div>

        {/*
          Figma 1899:2175 — cards are 1119px in a 1680 content column and
          overflow the right gutter so ~1.5 cards show (image + title peek).
          Track width = content + right gutter; card = min(1119, 62.17% of that).
        */}
        <div
          ref={scrollRef}
          className="-my-5 flex w-full max-w-none snap-x snap-mandatory gap-[1.875rem] overflow-x-auto scroll-smooth py-5 motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:w-[calc(100%+var(--spacing-gutter))] xl:pr-[var(--spacing-gutter)]"
        >
          {displayLines.map((line, idx) => {
            const currentSrc = line.imageSrc || photoSrc;

            return (
              <div
                key={`${line.href || 'line'}-${idx}`}
                data-what-we-do-card
                className="flex w-full shrink-0 snap-start flex-col gap-6 rounded-[1.25rem] border-[1.5px] border-[#BDE4FF] bg-white p-6 shadow-[0px_0px_20px_rgba(0,0,0,0.08)] sm:p-8 xl:grid xl:w-[min(69.9375rem,62.17%)] xl:grid-cols-[min(27.6875rem,39.6%)_minmax(0,1fr)] xl:items-stretch xl:gap-[clamp(3rem,4.2vw,4.9375rem)] xl:px-[clamp(1.5rem,2.2vw,2.4375rem)] xl:py-[clamp(1.5rem,2vw,2.1875rem)]"
              >
                {/*
                  Figma 1899:2186 — image (443×506) + Learn More. When CMS text is
                  taller, the image flex-grows so the button stays on the card
                  bottom (no empty gap) and copy is not clipped.
                */}
                <div className="flex w-full flex-col gap-[0.875rem] xl:h-full">
                  <div className="relative aspect-[443/506] w-full overflow-hidden rounded-xl border border-[#BDE4FF] xl:min-h-0 xl:flex-1">
                    <img
                      src={currentSrc}
                      alt={line.heading}
                      className="absolute inset-0 size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CtaButton
                    href={line.href}
                    showArrow={false}
                    className="!h-[3.375rem] !min-h-[3.375rem] !border-0 !py-3 !leading-[1.875rem] w-full shrink-0 justify-center rounded-[0.625rem] font-bold text-[1.25rem]"
                  >
                    Learn More
                  </CtaButton>
                </div>

                <div className="flex min-w-0 flex-col gap-5 xl:gap-[clamp(1.25rem,1.65vw,1.875rem)]">
                  <h3 className="min-w-0 break-words font-serif text-[clamp(1.75rem,1.25rem+1.8vw,3.75rem)] leading-[1.2] text-ink">
                    {line.heading}
                  </h3>
                  <p className="min-w-0 break-words font-sans text-[clamp(1.125rem,0.95rem+0.6vw,1.5rem)] leading-[1.33] text-brand-navy">
                    {line.blurb}
                  </p>
                  <div className="flex flex-col gap-4">
                    {line.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3.5 sm:gap-4">
                        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E0F2FE] sm:size-10">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="shrink-0"
                            aria-hidden="true"
                          >
                            <path
                              d="M14.5 1.5L5.5 10.5L1.5 6.5"
                              stroke="#2A91DC"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="min-w-0 break-words font-sans text-[clamp(1.125rem,0.95rem+0.6vw,1.625rem)] leading-[1.23] text-[#0F172A]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {displayLines.length > 1 ? (
          <div className="flex items-center justify-center gap-[1.875rem]">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous"
              className={ARROW_BUTTON}
            >
              <ArrowGlyph direction="left" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next"
              className={ARROW_BUTTON}
            >
              <ArrowGlyph direction="right" />
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
};
