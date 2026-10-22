'use client';

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

const ARROW_BUTTON =
  'flex size-[4.125rem] items-center justify-center rounded-full border-[1.375px] border-ink bg-white text-ink shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] transition-colors duration-300 ease-out hover:bg-[rgb(43_192_234/0.8)] focus-visible:bg-[rgb(43_192_234/0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy motion-reduce:transition-none';

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
      className="overflow-hidden py-10"
    >
      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-col items-start gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full max-w-[65.0625rem] flex-col gap-3">
            <h2
              id="what-we-do-heading"
              className="font-serif text-section text-brand-cta-from"
            >
              {title}
            </h2>
            <p className="text-section-lead text-ink">{description}</p>
          </div>
          <CtaButton href={ctaHref} className="shrink-0" showArrow>
            {ctaLabel}
          </CtaButton>
        </div>

        <div
          ref={scrollRef}
          className="-mx-5 -my-5 flex snap-x snap-mandatory gap-[1.875rem] overflow-x-auto scroll-px-5 px-5 py-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayLines.map((line, idx) => {
            const currentSrc = line.imageSrc || photoSrc;

            return (
              <div
                key={`${line.href || 'line'}-${idx}`}
                data-what-we-do-card
                className="flex w-full shrink-0 snap-start flex-col gap-5 rounded-media border-[1.5px] border-[#BDE4FF] bg-white p-6 shadow-[0px_0px_20px_rgba(0,0,0,0.08)] md:p-8 xl:min-h-[39.8125rem] xl:w-[min(69.9375rem,100%)] xl:flex-row xl:items-start xl:gap-[4.9375rem] xl:px-[2.4375rem] xl:pt-[2.1875rem] xl:pb-7"
              >
                <div className="flex w-full shrink-0 flex-col gap-[0.875rem] xl:w-[27.6875rem]">
                  <div className="h-72 w-full overflow-hidden rounded-xl border border-[#BDE4FF] md:h-96 xl:h-[31.625rem]">
                    <img
                      src={currentSrc}
                      alt={line.heading}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CtaButton
                    href={line.href}
                    showArrow={false}
                    className="!h-[3.375rem] !min-h-[3.375rem] !border-0 !py-3 !leading-[1.875rem] w-full justify-center rounded-[0.625rem] font-bold"
                  >
                    Learn More
                  </CtaButton>
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="mb-5 font-serif text-feature text-ink">
                    {line.heading}
                  </h3>
                  <p className="mb-5 text-body-lg leading-8 text-brand-navy">
                    {line.blurb}
                  </p>
                  <div className="flex flex-col gap-4">
                    {line.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-sky-wash">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-brand-cta-to"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-tick text-slate-ink">{feature}</span>
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
