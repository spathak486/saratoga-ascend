'use client';

import { cleanHeadingHtml, stripHtml } from '@/lib/utils/text';

import React, { useLayoutEffect, useRef, useState } from 'react';

export interface CapabilityCard {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
  actionTone?: string | null;
  icon?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface ExploreCapabilitiesSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  cards?: CapabilityCard[] | null;
}

/** Fallback cards matching Service_page Frame 2147226539 (Figma 2633:9318). */
const DEFAULT_CAPABILITIES: CapabilityCard[] = [
  {
    number: '01',
    title: 'Healthcare & Public Health Solutions',
    description: 'Clinical, public health, and healthcare operations support.',
    actionTone: 'sky',
  },
  {
    number: '02',
    title: 'Behavioral & Mental Health Solutions',
    description: 'Behavioral health workforce and program support.',
    actionTone: 'blue',
  },
  {
    number: '03',
    title: 'IT & Digital Solutions',
    description: 'Technology-enabled healthcare and operational support.',
    actionTone: 'sky',
  },
  {
    number: '04',
    title: 'Program & Administrative Support',
    description: 'Administrative and program delivery capabilities.',
    actionTone: 'blue',
  },
];

function CapabilityIcon({ index, isDark }: { index: number; isDark: boolean }) {
  const strokeColor = isDark ? '#FFFFFF' : '#000000';

  switch (index % 4) {
    case 0:
      return (
        <svg className="size-full" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <circle cx="60" cy="36" r="8" stroke={strokeColor} strokeWidth="3" />
          <path d="M50 56C50 50.5 54.5 46 60 46C65.5 46 70 50.5 70 56" stroke={strokeColor} strokeWidth="3" />
          <circle cx="42" cy="40" r="6" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M34 56C34 52 37.5 49 42 49" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="78" cy="40" r="6" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M86 56C86 52 82.5 49 78 49" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M48 58H72V72C72 82 60 90 60 90C60 90 48 82 48 72V58Z" stroke={strokeColor} strokeWidth="3" />
          <path d="M60 64V76M54 70H66" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M26 78C30 90 44 98 60 98C76 98 90 90 94 78" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg className="size-full" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <path d="M24 74L46 66C52 64 58 66 62 70L78 86C82 90 88 90 92 86L102 76" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 52C40 52 36 46 36 40C36 34 40 28 46 28C48 22 54 18 62 18C70 18 76 22 78 28C84 28 88 34 88 40C88 46 84 52 78 52" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M54 28C54 36 60 42 68 42M62 18V50" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 24V18M35 21H41" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 2:
      return (
        <svg className="size-full" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <rect x="28" y="28" width="64" height="46" rx="4" stroke={strokeColor} strokeWidth="3" />
          <path d="M20 78H100L94 88H26L20 78Z" stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" />
          <path d="M54 48C54 44.7 56.7 42 60 42C63.3 42 66 44.7 66 48C66 50.5 64.5 52.5 63 54V58H57V54C55.5 52.5 54 50.5 54 48Z" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M57 62H63" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M60 34V37M48 39L50 41M72 39L70 41" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 3:
    default:
      return (
        <svg className="size-full" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <circle cx="60" cy="30" r="10" stroke={strokeColor} strokeWidth="3" />
          <path d="M44 54C44 46 51 44 60 44C69 44 76 46 76 54" stroke={strokeColor} strokeWidth="3" />
          <rect x="26" y="52" width="68" height="46" rx="5" stroke={strokeColor} strokeWidth="3" />
          <circle cx="60" cy="75" r="7" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M60 64V67M60 83V86M49 75H52M68 75H71M52 67L54 69M66 81L68 83M52 83L54 81M66 69L68 67" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ExploreCapabilitiesSection({
  title = 'Explore more Saratoga Ascend capabilities.',
  highlightTitle = 'Explore more',
  cards,
}: ExploreCapabilitiesSectionProps) {
  const displayCards: CapabilityCard[] = cards && cards.length > 0 ? cards : DEFAULT_CAPABILITIES;
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [cardStride, setCardStride] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  // Figma 2731:11948 — 420px cards in an 1800px strip, so the next card peeks past the right edge.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => {
      const card = viewport.querySelector<HTMLElement>('[data-capability-card]');
      const stride = card?.offsetWidth ?? viewport.clientWidth;
      const next = Math.max(1, Math.floor((viewport.clientWidth + 1) / Math.max(stride, 1)));
      setCardStride(stride);
      setVisibleCount(next);
      setStartIndex((index) => Math.min(index, Math.max(0, displayCards.length - next)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [displayCards.length]);

  const maxIndex = Math.max(0, displayCards.length - visibleCount);
  const showControls = displayCards.length > visibleCount ? 'flex' : 'hidden';

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    swipeStart.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (swipeStart.current == null) return;
    const delta = event.changedTouches[0].clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) handleNext();
    else handlePrev();
  };

  const renderTitle = () => {
    const rawTitle = title?.trim() || 'Explore more Saratoga Ascend capabilities.';
    const rawHighlight = highlightTitle?.trim() || 'Explore more';

    const escaped = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === rawHighlight.toLowerCase()) {
          return (
            <span key={i} className="text-brand-red">
              {part}
            </span>
          );
        }

        // Figma 2731:11947 is two lines: "Explore more Saratoga" / "Ascend capabilities."
        const lineBreak = part.match(/^(.*?\bSaratoga)(\s+)(.*)$/i);
        if (lineBreak) {
          return (
            <span key={i} className="text-ink">
              {lineBreak[1]}
              <br />
              {lineBreak[3]}
            </span>
          );
        }

        return (
          <span key={i} className="text-ink">
            {part}
          </span>
        );
      });
    }

    return (
      <>
        <span className="text-brand-red">{rawHighlight} </span>
        <span className="text-ink">{rawTitle}</span>
      </>
    );
  };

  return (
    <section
      aria-label={title || 'Explore more Saratoga Ascend capabilities.'}
      className="relative mx-auto w-full max-w-[120rem] overflow-hidden bg-[#FAFAFA] px-page py-12 max-sm:px-6! max-xl:py-10! xl:py-20"
    >
      {/* Title + carousel controls — Figma title y=80, cards y=226 → 60px gap after 86px title */}
      <div className="mx-auto mb-10 flex max-w-[105rem] flex-col gap-6 xl:mb-[3.75rem] lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[85.6875rem] min-w-0">
          <h2 className="font-serif text-section font-normal leading-[1.2] tracking-tight">
            {renderTitle()}
          </h2>
        </div>

        <div className={`${showControls} shrink-0 items-center gap-3 self-end lg:mb-2 lg:gap-5`}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Previous capabilities"
            className={`flex size-12 items-center justify-center rounded-full border-[1.375px] border-[#022E4C] shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] transition-all duration-300 sm:size-[60px] xl:size-[4.125rem] ${
              startIndex === 0
                ? 'cursor-not-allowed bg-transparent text-[#022E4C] opacity-40'
                : 'cursor-pointer bg-transparent text-[#022E4C] hover:border-transparent hover:bg-[linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] hover:text-white active:scale-95'
            }`}
          >
            <svg
              className="size-6 xl:size-[2.0625rem]"
              viewBox="0 0 33 33"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 24.5L12 16.5L20 8.5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
            aria-label="Next capabilities"
            className={`flex size-12 items-center justify-center rounded-full border-[1.375px] border-[#022E4C] shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] transition-all duration-300 sm:size-[60px] xl:size-[4.125rem] ${
              startIndex >= maxIndex
                ? 'cursor-not-allowed bg-transparent text-[#022E4C] opacity-40'
                : 'cursor-pointer bg-transparent text-[#022E4C] hover:border-transparent hover:bg-[linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] hover:text-white active:scale-95'
            }`}
          >
            <svg
              className="size-6 xl:size-[2.0625rem]"
              viewBox="0 0 33 33"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 24.5L21 16.5L13 8.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Figma 2731:11948 — 420×516 cards, left radius only, strip runs to the right edge. */}
      <div
        ref={viewportRef}
        className="-mr-[var(--spacing-gutter)] w-max max-w-[calc(100%+var(--spacing-gutter))] overflow-hidden rounded-l-[1rem] shadow-[0px_0px_12.8px_rgba(0,0,0,0.25)]"
        aria-roledescription="carousel"
      >
        <div
          className="flex w-max items-stretch transition-transform duration-500 ease-in-out motion-reduce:transition-none"
          style={{
            transform: cardStride ? `translateX(-${startIndex * cardStride}px)` : undefined,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {displayCards.map((card, index) => {
            const isDark = index % 2 === 1;

            return (
              <div
                key={card.id ?? card.documentId ?? `capability-${index}`}
                data-capability-card
                className={`flex w-[clamp(17.5rem,15.376rem+9.061vw,26.25rem)] min-h-[217px] shrink-0 flex-col items-center justify-center self-stretch overflow-hidden p-[clamp(1.25rem,1.098rem+0.647vw,1.875rem)] text-center sm:min-h-[clamp(24rem,22rem+8.544vw,32.25rem)] ${
                  isDark ? 'bg-[#2B88D9] text-white' : 'bg-[#EBF6FF] text-ink'
                }`}
              >
                <div className="flex w-full min-w-0 max-w-[21.53rem] flex-col items-center gap-[25px]">
                  <div className="size-[clamp(4rem,3.1506rem+3.625vw,7.5rem)] shrink-0 xl:size-[120px]">
                    {card.icon?.url ? (
                      <img
                        src={card.icon.url}
                        alt={card.icon.alternativeText || stripHtml(card.title)}
                        className="size-full object-contain"
                      />
                    ) : (
                      <CapabilityIcon index={index} isDark={isDark} />
                    )}
                  </div>

                  <div className="flex w-full min-w-0 flex-col items-center gap-[clamp(1.5rem,1.242rem+1.099vw,2.561rem)]">
                    {/* 24px below desktop. 20px at 375 → 28px at 1920 on xl. Figma leading is 38/28. */}
                    <h3 className="w-full min-w-0 break-words text-center font-serif text-[24px] font-normal not-italic leading-[1.36] xl:text-[clamp(1.25rem,1.1287rem+0.518vw,1.75rem)]">
                      <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.title) }} />
                    </h3>

                    <div
                      className={`h-[0.16rem] w-[min(10.56rem,49%)] shrink-0 ${
                        isDark ? 'bg-white' : 'bg-ink'
                      }`}
                      aria-hidden="true"
                    />

                    {/* 16px/1.667 at 375 → 24px/40px at 1920. */}
                    <p className="line-clamp-3 w-full min-w-0 max-w-[17.5rem] break-words text-center font-sans text-[clamp(1rem,0.8786rem+0.518vw,1.5rem)] font-normal not-italic leading-[1.667]">
                      {stripHtml(card.description)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
