'use client';

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
function PersonalityMedalIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
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
function GearCheckIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
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
function SpeedometerGaugeIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
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
function ProjectPlanIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
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
function WorkforceSupportIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
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
function ContinuousImprovementIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
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
      return <span className="text-[#D31E2D] block sm:inline">{rawHighlight}</span>;
    }

    const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === rawHighlight.toLowerCase()) {
          return (
            <span key={i} className="text-[#D31E2D] block sm:inline">
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
        <span className="text-[#D31E2D] block sm:inline">{rawHighlight}</span>
      </>
    );
  };

  return (
    <section
      aria-label={title || highlightTitle || 'Built for accountable operating environments'}
      /* Figma: Frame 2147226447 -> width: 1919px; height: 976px; top: 7820px; left: 0px; */
      className="relative w-full max-w-[1919px] mx-auto min-h-[976px] bg-[#FFFFFF] py-[80px] overflow-hidden flex flex-col justify-between"
    >
      <div className="w-full">
        {/* Header Row: Title (Group 2085665669, left: 123px, top: 80px) & Navigation (Group 2085665688, left: 1648px, top: 186px) */}
        <div className="w-full px-6 sm:px-10 lg:pl-[123px] lg:pr-[120px] flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-[80px]">
          <div className="max-w-[960px]">
            {/* Title: DM Serif Text, 72px, line-height: 86px (120%), color: #0A0A0A */}
            <h2 className="font-['DM_Serif_Text'] text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[115%] lg:leading-[86px] tracking-normal text-[#0A0A0A] font-normal">
              {renderTitle()}
            </h2>
          </div>

          {/* Carousel Arrows (Figma Group 2085665688: width: 152px, height: 66px, left: 1648px, top: 186px) */}
          <div className="flex items-center gap-[20px] self-start lg:self-end shrink-0">
            {/* Left Button (width: 66px, height: 66px, border: 1.375px solid #000000, border-radius: 1373.62px) */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous card"
              className={`flex items-center justify-center w-[66px] h-[66px] rounded-full border-[1.375px] border-[#000000] transition-all duration-200 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                canScrollLeft
                  ? 'bg-white hover:bg-[#F3F4F6] active:scale-95 text-[#000000] cursor-pointer'
                  : 'bg-white/60 opacity-40 cursor-not-allowed text-[#000000]'
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

            {/* Right Button (width: 66px, height: 66px, border: 1.375px solid #000000, border-radius: 1373.62px) */}
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next card"
              className={`flex items-center justify-center w-[66px] h-[66px] rounded-full border-[1.375px] border-[#000000] transition-all duration-200 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                canScrollRight
                  ? 'bg-white hover:bg-[#F3F4F6] active:scale-95 text-[#000000] cursor-pointer'
                  : 'bg-white/60 opacity-40 cursor-not-allowed text-[#000000]'
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

        {/* Carousel Frame: Frame 2147226446 (width: 1796px, height: 564px, left: 123px, top: 332px, overflow-x: scroll) */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row overflow-x-auto gap-[18px] scrollbar-none scroll-smooth pl-6 sm:pl-10 lg:pl-[123px] pr-6 sm:pr-10 lg:pr-[120px]"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cards.map((card, index) => {
            const isHighlighted = card.isHighlighted ?? (index === 0);
            const iconUrl = typeof card.icon === 'string' ? card.icon : card.icon?.url;
            const CardIcon = getCardIcon(card.title, index);

            return (
              /* Outer Card: width: 456.29px, height: 564px, border-radius: 30px, border: 1px solid #FAFAFA */
              <div
                key={card.id ?? `env-card-${index}`}
                style={{ scrollSnapAlign: 'start' }}
                className={`relative shrink-0 flex flex-col justify-between w-[320px] sm:w-[400px] md:w-[456.29px] h-[520px] md:h-[564px] rounded-[30px] p-[21.54px] transition-all duration-300 hover:-translate-y-1 ${
                  isHighlighted
                    ? 'border border-[#FAFAFA] text-white shadow-xl'
                    : 'bg-[#FCFCFC] border border-[#FAFAFA] text-[#000000] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md'
                }`}
              >
                {/* Highlight gradient background layer (Figma Rectangle 12) */}
                {isHighlighted && (
                  <div
                    className="absolute inset-0 rounded-[30px] pointer-events-none -z-10"
                    style={{
                      background:
                        'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(87.03deg, #FF0013 -15.22%, #00BBFF 104.41%)',
                    }}
                  />
                )}

                {/* Top Icon Area: 100px x 100px, left: 52.88px, top: 26.44px (inside card: padding-left: 31.34px, padding-top: 4.9px) */}
                <div className="pt-[4.9px] pl-[31.34px]">
                  {iconUrl ? (
                    <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                      <Image
                        src={normalizeImageSrc(iconUrl)}
                        alt={card.title}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center ${
                        isHighlighted ? 'text-[#D7E8FF]' : 'text-[#000000]'
                      }`}
                    >
                      <CardIcon className="w-full h-full" />
                    </div>
                  )}
                </div>

                {/* Inner Content Card (Figma Rectangle 13 / 11: width: 413.21px, height: 235.98px, border-radius: 30px) */}
                <div
                  className={`w-full min-h-[220px] md:min-h-[235.98px] rounded-[30px] px-[31.34px] py-[28px] md:py-[30px] flex flex-col justify-center transition-colors ${
                    isHighlighted
                      ? 'bg-[#FFFFFF] shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
                      : 'bg-[rgba(217,217,217,0.2)]'
                  }`}
                >
                  {/* Title: DM Serif Text, 32px, line-height: 44px, Primary-Blue #022E4C */}
                  <h3 className="font-['DM_Serif_Text'] text-[24px] sm:text-[28px] md:text-[32px] leading-[36px] md:leading-[44px] text-[#022E4C] font-normal mb-[12px] md:mb-[16px]">
                    {card.title}
                  </h3>

                  {/* Description: Google Sans Flex, 20px, line-height: 35px (175%), color: #000000 */}
                  <p className="font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] md:text-[20px] leading-[28px] md:leading-[35px] text-[#000000] font-normal">
                    {card.description}
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
