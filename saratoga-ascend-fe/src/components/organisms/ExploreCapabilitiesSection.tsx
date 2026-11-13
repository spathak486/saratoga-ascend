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
  const [isDesktop1920, setIsDesktop1920] = useState(false);
  const swipeStart = useRef<number | null>(null);

  // One card on phones, two from sm, three from lg (tablet), four from xl — same steps the card widths use.
  useLayoutEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1920px)');
    const xlQuery = window.matchMedia('(min-width: 1280px)');
    const lgQuery = window.matchMedia('(min-width: 1024px)');
    const smQuery = window.matchMedia('(min-width: 640px)');
    const update = () => {
      const next = xlQuery.matches ? 4 : lgQuery.matches ? 3 : smQuery.matches ? 2 : 1;
      setVisibleCount(next);
      setIsDesktop1920(desktopQuery.matches);
      setStartIndex((index) => Math.min(index, Math.max(0, displayCards.length - next)));
    };
    update();
    desktopQuery.addEventListener('change', update);
    xlQuery.addEventListener('change', update);
    lgQuery.addEventListener('change', update);
    smQuery.addEventListener('change', update);
    return () => {
      desktopQuery.removeEventListener('change', update);
      xlQuery.removeEventListener('change', update);
      lgQuery.removeEventListener('change', update);
      smQuery.removeEventListener('change', update);
    };
  }, [displayCards.length]);

  const maxIndex = Math.max(0, displayCards.length - visibleCount);
  // Arrows only below 1920 — desktop artboard shows the 4-up row with no controls.
  const showControls = isDesktop1920
    ? 'hidden'
    : displayCards.length <= 1
      ? 'hidden'
      : displayCards.length <= 2
        ? 'flex sm:hidden'
        : displayCards.length <= 3
          ? 'flex lg:hidden'
          : displayCards.length <= 4
            ? 'flex xl:hidden'
            : 'flex';

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
      return parts.map((part, i) =>
        part.toLowerCase() === rawHighlight.toLowerCase() ? (
          <span key={i} className="text-brand-red">
            {part}
          </span>
        ) : (
          <span key={i} className="text-ink">
            {part}
          </span>
        )
      );
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
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#FAFAFA] px-page py-12 max-sm:px-6! xl:py-20"
    >
      {/* Title + carousel controls — Figma title y=80, cards y=226 → 60px gap after 86px title */}
      <div className="mx-auto mb-10 flex max-w-[1680px] flex-col gap-6 xl:mb-[60px] lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[1371px] min-w-0">
          <h2 className="font-serif text-[clamp(2.25rem,1.5rem+2.6vw,4.5rem)] font-normal leading-[1.2] tracking-tight">
            {renderTitle()}
          </h2>
        </div>

        <div className={`${showControls} shrink-0 items-center gap-3 self-end lg:mb-2 lg:gap-5`}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Previous capabilities"
            className={`flex size-12 items-center justify-center rounded-full border-[1.375px] border-[#022E4C] shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] transition-all duration-300 lg:size-[66px] ${
              startIndex === 0
                ? 'cursor-not-allowed bg-transparent text-[#022E4C] opacity-40'
                : 'cursor-pointer bg-transparent text-[#022E4C] hover:border-transparent hover:bg-[linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] hover:text-white active:scale-95'
            }`}
          >
            <svg
              className="size-6 lg:size-[33px]"
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
            className={`flex size-12 items-center justify-center rounded-full border-[1.375px] border-[#022E4C] shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] transition-all duration-300 lg:size-[66px] ${
              startIndex >= maxIndex
                ? 'cursor-not-allowed bg-transparent text-[#022E4C] opacity-40'
                : 'cursor-pointer bg-transparent text-[#022E4C] hover:border-transparent hover:bg-[linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] hover:text-white active:scale-95'
            }`}
          >
            <svg
              className="size-6 lg:size-[33px]"
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

      {/* Frame 2085664242: connected blocks — height from content, stretch across the row */}
      <div
        className="mx-auto w-full max-w-[1680px] overflow-hidden rounded-[16px] shadow-[0px_0px_12.8px_rgba(0,0,0,0.25)]"
        aria-roledescription="carousel"
      >
        <div
          className="flex w-full items-stretch transition-transform duration-500 ease-in-out motion-reduce:transition-none [--cap-visible:1] sm:[--cap-visible:2] lg:[--cap-visible:3] xl:[--cap-visible:4]"
          style={{
            transform: `translateX(calc(${startIndex} * -100% / var(--cap-visible)))`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {displayCards.map((card, index) => {
            const isDark = index % 2 === 1;

            return (
              <div
                key={card.id ?? card.documentId ?? `capability-${index}`}
                className={`flex w-full shrink-0 flex-col items-center justify-start self-stretch overflow-hidden p-5 text-center sm:w-1/2 sm:p-[30px] lg:w-1/3 xl:w-1/4 ${
                  isDark ? 'bg-[#2B88D9] text-white' : 'bg-[#EBF6FF] text-ink'
                }`}
              >
                <div className="flex w-full min-w-0 max-w-[358px] flex-col items-center gap-6 sm:gap-[41px]">
                  <div className="size-16 shrink-0 sm:size-20 xl:size-[120px]">
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

                  <div className="flex w-full min-w-0 flex-col items-center gap-6 sm:gap-[41px]">
                    {/* Figma 1920: 28px / normal / 400 */}
                    <h3 className="min-w-0 w-full break-words text-center font-serif text-[22px] font-normal not-italic leading-normal sm:text-[24px] xl:text-[26px] min-[120rem]:text-[28px]">
                      <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.title) }} />
                    </h3>

                    <div
                      className={`h-[2.56px] w-[min(10.56rem,70%)] shrink-0 ${
                        isDark ? 'bg-white' : 'bg-ink'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Figma 1920: 24px / 400 / 40px — clamp to 3 lines */}
                    <p className="line-clamp-3 min-w-0 w-full max-w-[280px] break-words text-center font-sans text-[16px] font-normal not-italic leading-6 sm:text-[18px] sm:leading-7 xl:text-[20px] xl:leading-8 min-[120rem]:text-[24px] min-[120rem]:leading-[40px]">
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
