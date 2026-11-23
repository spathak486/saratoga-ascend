'use client';

import { cleanHeadingHtml, stripHtml } from '@/lib/utils/text';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export interface OperatingEnvironmentCardItem {
  id?: string | number | null;
  title: string;
  description: string;
  icon?: { url: string; alternativeText?: string | null } | string | null;
  isHighlighted?: boolean | null;
}

export interface AccountableOperatingEnvironmentsSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  cards?: OperatingEnvironmentCardItem[] | null;
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

const DEFAULT_TITLE = 'Built for accountable operating environments';
const DEFAULT_HIGHLIGHT = 'operating environments';

/* Icon 1: personality_18814885 1 (Quality mindset - Head profile with medal badge) */
function PersonalityMedalIcon({ className = 'w-[6.25rem] h-[6.25rem]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Head profile */}
      <path
        d="M32 78V72C32 64 36 60 40 58C36 54 34 48 34 40C34 26 44 18 56 18C68 18 78 26 78 40C78 48 76 54 72 58C76 60 80 64 80 72V78"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Medal badge inside head */}
      <circle cx="56" cy="38" r="9" strokeWidth="2.8" />
      <path d="M52 38L55 41L61 35" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      {/* Ribbon tails underneath medal */}
      <path d="M51 46L48 54L53 52L56 54L54 47" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M61 46L64 54L59 52L56 54" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Icon 2: default_18233982 1 (Operational readiness - Gear with checkmark) */
function GearCheckIcon({ className = 'w-[6.25rem] h-[6.25rem]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Outer Gear */}
      <path
        d="M45 18H55L57 24L64 27L70 23L77 30L73 36L76 43L82 45V55L76 57L73 64L77 70L70 77L64 73L57 76L55 82H45L43 76L36 73L30 77L23 70L27 64L24 57L18 55V45L24 43L27 36L23 30L30 23L36 27L43 24L45 18Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner checkmark circle */}
      <circle cx="50" cy="50" r="16" strokeWidth="2.8" />
      <path d="M43 50L48 55L58 44" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

/* Icon 3: speed_14829023 1 (Information discipline - Speedometer / Gauge) */
function SpeedometerGaugeIcon({ className = 'w-[6.25rem] h-[6.25rem]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Outer speedometer arc */}
      <path
        d="M22 72C16 63 15 51 19 41C25 27 39 18 55 18C71 18 85 27 91 41C95 51 94 63 88 72"
        strokeLinecap="round"
      />
      {/* Dial calibration ticks */}
      <path d="M28 64L33 60M25 46H31M35 32L39 37M55 24V30M75 32L71 37M85 46H79M82 64L77 60" strokeLinecap="round" strokeWidth="2.5" />
      {/* Center pivot hub */}
      <circle cx="55" cy="62" r="6" fill="currentColor" />
      {/* Active gauge needle */}
      <path d="M55 62L73 38" strokeLinecap="round" strokeWidth="3.5" />
      {/* Base platform */}
      <path d="M38 78H72" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

/* Icon 4: project-plan_16821542 1 (Contract alignment - Project plan / milestone checklist) */
function ProjectPlanIcon({ className = 'w-[6.25rem] h-[6.25rem]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Document border */}
      <rect x="24" y="16" width="52" height="68" rx="6" strokeLinecap="round" />
      {/* Upper document lines */}
      <path d="M34 28H66" strokeLinecap="round" />
      <path d="M34 36H66" strokeLinecap="round" />
      {/* Milestone roadmap / node timeline */}
      <line x1="34" y1="48" x2="66" y2="48" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="38" cy="48" r="3.5" fill="currentColor" />
      <circle cx="50" cy="48" r="3.5" fill="currentColor" />
      <circle cx="62" cy="48" r="3.5" fill="currentColor" />
      {/* Lower document lines */}
      <path d="M34 60H66" strokeLinecap="round" />
      <path d="M34 68H54" strokeLinecap="round" />
    </svg>
  );
}

/* Icon 5: support_18152968 1 (Workforce accountability - Agent with headset support) */
function WorkforceSupportIcon({ className = 'w-[6.25rem] h-[6.25rem]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Center head */}
      <circle cx="50" cy="36" r="14" strokeLinecap="round" />
      {/* Headset arc & earpads */}
      <path d="M36 36C36 28.3 42.3 22 50 22C57.7 22 64 28.3 64 36" strokeLinecap="round" strokeWidth="2.5" />
      <rect x="33" y="32" width="6" height="10" rx="3" fill="currentColor" />
      <rect x="61" y="32" width="6" height="10" rx="3" fill="currentColor" />
      {/* Microphone boom */}
      <path d="M64 38L64 45C64 47 62 49 59 49H54" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      {/* Shoulders & torso */}
      <path
        d="M26 78C26 65 37 58 50 58C63 58 74 65 74 78"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base platform */}
      <path d="M20 84H80" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

/* Icon 6: continuous-improvement_11343192 1 (Continuous improvement - Circular cycle arrows with chart) */
function ContinuousImprovementIcon({ className = 'w-[6.25rem] h-[6.25rem]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Top circular cycle arrow */}
      <path
        d="M50 20C66.5685 20 80 33.4315 80 50C80 57.5 77.2 64.4 72.5 69.7"
        strokeLinecap="round"
      />
      <path d="M78 18L82 26L74 27" strokeLinecap="round" strokeLinejoin="round" />

      {/* Bottom circular cycle arrow */}
      <path
        d="M50 80C33.4315 80 20 66.5685 20 50C20 42.5 22.8 35.6 27.5 30.3"
        strokeLinecap="round"
      />
      <path d="M22 82L18 74L26 73" strokeLinecap="round" strokeLinejoin="round" />

      {/* Center upward growth chart */}
      <path d="M38 54L46 44L53 50L62 38" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M56 38H62V44" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

const DEFAULT_ICONS = [
  PersonalityMedalIcon,
  GearCheckIcon,
  SpeedometerGaugeIcon,
  ProjectPlanIcon,
  WorkforceSupportIcon,
  ContinuousImprovementIcon,
];

function getCardIcon(title: string, index: number) {
  const t = (title || '').toLowerCase();
  if (t.includes('quality') || t.includes('personality') || t.includes('mindset')) return PersonalityMedalIcon;
  if (t.includes('readiness') || t.includes('operational') || t.includes('gear')) return GearCheckIcon;
  if (t.includes('discipline') || t.includes('information') || t.includes('speed')) return SpeedometerGaugeIcon;
  if (t.includes('contract') || t.includes('alignment') || t.includes('project') || t.includes('plan')) return ProjectPlanIcon;
  if (t.includes('workforce') || t.includes('accountability') || t.includes('support')) return WorkforceSupportIcon;
  if (t.includes('improvement') || t.includes('continuous')) return ContinuousImprovementIcon;
  return DEFAULT_ICONS[index % DEFAULT_ICONS.length];
}

export function AccountableOperatingEnvironmentsSection({
  title,
  highlightTitle,
  cards,
}: AccountableOperatingEnvironmentsSectionProps) {
  if (!cards || cards.length === 0) {
    return null;
  }

  const headingText = title?.trim() || '';
  const highlight = highlightTitle?.trim() || '';

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  /** Figma artboard shows Group 49 as hover/active; no card stays gradient by default. */
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const checkScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [cards]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardStep = 476; // Card width 456px + gap 20px
    el.scrollBy({
      left: direction === 'left' ? -cardStep : cardStep,
      behavior: 'smooth',
    });
  };

  // Render title with highlight (case-insensitive match, or append if separate field in CMS)
  const renderTitle = () => {
    const rawTitle = title?.trim() || '';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawTitle && !rawHighlight) return null;

    if (!rawHighlight) {
      return rawTitle;
    }

    if (!rawTitle) {
      return <span className="text-[#F01424] block sm:inline">{rawHighlight}</span>;
    }

    const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === rawHighlight.toLowerCase()) {
          return (
            <span key={i} className="text-[#F01424] block sm:inline">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      });
    }

    // If highlightTitle is separate from title (e.g. title: "Built for accountable", highlightTitle: "operating environments")
    return (
      <>
        <span>{rawTitle} </span>
        <span className="text-[#F01424] block sm:inline">{rawHighlight}</span>
      </>
    );
  };

  return (
    <section
      aria-label={title || highlightTitle || 'Built for accountable operating environments'}
      /*
        Figma 2310:5826 — left gutter ~123px on 1920. Use the shared page
        gutter (px-page → --spacing-gutter, up to 120px) so the inset always
        renders; title and first card share the same left edge as the nav.
      */
      className="relative mx-auto flex min-h-[61rem] w-full max-w-home flex-col justify-between overflow-x-clip bg-white px-page py-[5rem] max-sm:px-6!"
    >
      <div className="w-full">
        <div className="flex w-full flex-col justify-between gap-8 pb-[5rem] lg:flex-row lg:items-end">
          <div className="max-w-[60rem]">
            {/* Title: DM Serif Text, 72px, line-height: 1.2, #0A0A0A */}
            <h2 className="font-serif text-[2.25rem] leading-[1.15] font-normal tracking-normal text-ink sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] lg:leading-[1.2]">
              {renderTitle()}
            </h2>
          </div>

          {/* Carousel Arrows (Figma Group 2085665688) */}
          <div className="flex shrink-0 items-center gap-[1.25rem] self-start lg:self-end">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous card"
              className={`flex h-[4.125rem] w-[4.125rem] items-center justify-center rounded-full border-[1.375px] border-black shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] transition-all duration-200 ${
                canScrollLeft
                  ? 'cursor-pointer bg-white text-black hover:bg-[#F3F4F6] active:scale-95'
                  : 'cursor-not-allowed bg-white/60 text-black opacity-40'
              }`}
            >
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 24L12 16.5L20 9" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next card"
              className={`flex h-[4.125rem] w-[4.125rem] items-center justify-center rounded-full border-[1.375px] border-black shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] transition-all duration-200 ${
                canScrollRight
                  ? 'cursor-pointer bg-white text-black hover:bg-[#F3F4F6] active:scale-95'
                  : 'cursor-not-allowed bg-white/60 text-black opacity-40'
              }`}
            >
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 24L21 16.5L13 9" />
              </svg>
            </button>
          </div>
        </div>

        {/*
          Cards inherit section px-page on the left. Track extends into the
          right gutter so the row can scroll past the edge (Figma 1796 band).
        */}
        <div
          ref={scrollContainerRef}
          className="flex w-full max-w-none flex-row gap-[1.125rem] overflow-x-auto scroll-smooth scrollbar-none xl:w-[calc(100%+var(--spacing-gutter))] xl:pr-[var(--spacing-gutter)]"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cards.map((card, index) => {
            const isActive = hoveredIndex === index;
            const iconUrl = typeof card.icon === 'string' ? card.icon : card.icon?.url;
            const CardIcon = getCardIcon(card.title, index);

            return (
              /*
                Figma Group 49 (hover) vs Group 50 (default).
                Transition ~400ms ease-out. Icon strokes stay near-black
                (#000 default / #070707 hover per exported SVGs).
              */
              <div
                key={card.id ?? `env-card-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                tabIndex={0}
                style={{ scrollSnapAlign: 'start' }}
                className={`relative isolate flex h-[32.5rem] w-[18.75rem] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[1.875rem] border border-[#FAFAFA] p-[1.346rem] transition-[box-shadow] duration-[400ms] ease-out motion-reduce:transition-none sm:w-[22rem] md:h-[35.25rem] md:w-[28.5rem] ${
                  isActive
                    ? 'shadow-xl'
                    : 'bg-[#FCFCFC] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                }`}
              >
                {/* Default fill + hover gradient (z-0 inside isolate so it stays visible) */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 z-0 bg-[#FCFCFC] transition-opacity duration-[400ms] ease-out motion-reduce:transition-none ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-[400ms] ease-out motion-reduce:transition-none ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(87.03deg, #FF0013 -15.22%, #00BBFF 104.41%)',
                  }}
                />

                {/* Icon 100×100 — Figma: black at rest, #070707 on hover */}
                <div className="relative z-10 pt-[0.3063rem] pl-[1.9587rem]">
                  {iconUrl ? (
                    <div className="relative size-20 md:size-[6.25rem]">
                      <Image
                        src={normalizeImageSrc(iconUrl)}
                        alt={stripHtml(card.title)}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex size-20 items-center justify-center transition-colors duration-[400ms] ease-out motion-reduce:transition-none md:size-[6.25rem] ${
                        isActive ? 'text-[#070707]' : 'text-black'
                      }`}
                    >
                      <CardIcon className="size-full" />
                    </div>
                  )}
                </div>

                {/* Rectangle 13/11 — white when active, rgba(217,217,217,0.2) default */}
                <div
                  className={`relative z-10 flex w-full min-h-[13.75rem] flex-col justify-center rounded-[1.875rem] px-[1.9587rem] py-7 transition-colors duration-[400ms] ease-out motion-reduce:transition-none md:min-h-[14.7487rem] md:py-[1.875rem] ${
                    isActive
                      ? 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
                      : 'bg-[rgba(217,217,217,0.2)]'
                  }`}
                >
                  {/* Title: DM Serif Text 32 / Primary-Blue #022E4C */}
                  <h3 className="mb-3 font-['DM_Serif_Text'] text-2xl leading-9 font-normal text-[#022E4C] sm:text-[1.75rem] md:mb-4 md:text-[2rem] md:leading-[normal]">
                    <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.title) }} />
                  </h3>

                  {/* Body: Google Sans Flex 20 / lh 35 / #000 */}
                  <p className="line-clamp-4 min-w-0 break-words font-['Google_Sans_Flex'] text-base leading-7 font-normal text-black sm:text-lg md:text-[1.25rem] md:leading-[2.1875rem]">
                    {stripHtml(card.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
