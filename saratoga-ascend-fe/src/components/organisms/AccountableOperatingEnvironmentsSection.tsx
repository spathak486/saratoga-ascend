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

/* Icon 1: Quality Mindset - Profile head with medal/ribbon badge inside */
function PersonalityMedalIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
      {/* Head profile */}
      <path
        d="M32 78V72C32 64 36 60 40 58C36 54 34 48 34 40C34 26 44 18 56 18C68 18 78 26 78 40C78 48 76 54 72 58C76 60 80 64 80 72V78"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Medal badge inside head */}
      <circle cx="56" cy="38" r="9" strokeWidth="2.5" />
      <path d="M52 38L55 41L61 35" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      {/* Ribbon tails underneath medal */}
      <path d="M51 46L48 54L53 52L56 54L54 47" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M61 46L64 54L59 52L56 54" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Icon 2: Operational Readiness - Gear with checkmark badge inside circle */
function GearCheckIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
      {/* Outer Gear */}
      <path
        d="M45 18H55L57 24L64 27L70 23L77 30L73 36L76 43L82 45V55L76 57L73 64L77 70L70 77L64 73L57 76L55 82H45L43 76L36 73L30 77L23 70L27 64L24 57L18 55V45L24 43L27 36L23 30L30 23L36 27L43 24L45 18Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner checkmark circle */}
      <circle cx="50" cy="50" r="16" strokeWidth="2.5" />
      <path d="M43 50L48 55L58 44" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
    </svg>
  );
}

/* Icon 3: Information Discipline - Person silhouette with clock / gear above head */
function ClockDisciplineIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
      {/* Clock / Speedometer on top */}
      <circle cx="50" cy="30" r="14" strokeWidth="2.5" />
      <path d="M50 22V30L55 33" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      {/* Small gear teeth on clock perimeter */}
      <path d="M50 12V16M50 44V48M32 30H36M64 30H68" strokeLinecap="round" />
      {/* Person shoulders underneath */}
      <path
        d="M26 80V70C26 62 34 56 42 54M74 80V70C74 62 66 56 58 54"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center collar */}
      <path d="M44 54L50 62L56 54" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Icon 4: Contract Alignment - Project plan / checklist with node flow */
function ProjectPlanIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
      {/* Document border */}
      <rect x="24" y="16" width="52" height="68" rx="6" strokeLinecap="round" />
      {/* Horizontal document lines */}
      <path d="M34 28H66" strokeLinecap="round" />
      <path d="M34 36H66" strokeLinecap="round" />
      {/* Milestone / node flow line in middle */}
      <line x1="34" y1="48" x2="66" y2="48" strokeWidth="2" strokeLinecap="round" />
      <circle cx="38" cy="48" r="3.5" fill="currentColor" />
      <circle cx="50" cy="48" r="3.5" fill="currentColor" />
      <circle cx="62" cy="48" r="3.5" fill="currentColor" />
      {/* Lower document lines */}
      <path d="M34 60H66" strokeLinecap="round" />
      <path d="M34 68H54" strokeLinecap="round" />
    </svg>
  );
}

/* Icon 5: Workforce Accountability - Personnel support / shield & users */
function WorkforceSupportIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
      {/* Center leader head & body */}
      <circle cx="50" cy="32" r="10" strokeWidth="2.5" />
      <path d="M34 66C34 54 41 48 50 48C59 48 66 54 66 66" strokeLinecap="round" />
      {/* Left colleague */}
      <circle cx="28" cy="40" r="7" strokeWidth="2.2" />
      <path d="M18 68C18 60 23 54 29 53" strokeLinecap="round" />
      {/* Right colleague */}
      <circle cx="72" cy="40" r="7" strokeWidth="2.2" />
      <path d="M82 68C82 60 77 54 71 53" strokeLinecap="round" />
      {/* Base platform */}
      <path d="M22 76H78" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

/* Icon 6: Continuous Improvement - Circular recycling / process improvement cycle */
function ContinuousImprovementIcon({ className = 'w-[100px] h-[100px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
      {/* Continuous circular cycle arrows */}
      <path
        d="M50 20C66.5685 20 80 33.4315 80 50C80 57.5 77.2 64.4 72.5 69.7"
        strokeLinecap="round"
      />
      <path d="M78 18L82 26L74 27" strokeLinecap="round" strokeLinejoin="round" />

      <path
        d="M50 80C33.4315 80 20 66.5685 20 50C20 42.5 22.8 35.6 27.5 30.3"
        strokeLinecap="round"
      />
      <path d="M22 82L18 74L26 73" strokeLinecap="round" strokeLinejoin="round" />

      {/* Center growth trending spark / chart */}
      <path d="M38 54L46 44L53 50L62 38" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M56 38H62V44" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
    </svg>
  );
}

const FALLBACK_CARDS: OperatingEnvironmentCardItem[] = [
  {
    id: 1,
    title: 'Quality mindset',
    description: 'Review, measurement, corrective action, and continuous improvement.',
    isHighlighted: true,
  },
  {
    id: 2,
    title: 'Operational readiness',
    description: 'Prepared teams, documented processes, clear ownership, and transition readiness.',
    isHighlighted: false,
  },
  {
    id: 3,
    title: 'Information discipline',
    description:
      'Controlled documentation, reporting, and responsible information practices appropriate to the engagement.',
    isHighlighted: false,
  },
  {
    id: 4,
    title: 'Contract alignment',
    description:
      'Delivery around defined requirements, deliverables, performance expectations, and governance.',
    isHighlighted: false,
  },
  {
    id: 5,
    title: 'Workforce accountability',
    description: 'Clear roles, communication, training, and performance visibility.',
    isHighlighted: false,
  },
  {
    id: 6,
    title: 'Continuous improvement',
    description: 'Lessons learned and stakeholder feedback to strengthen processes and outcomes.',
    isHighlighted: false,
  },
];

const DEFAULT_ICONS = [
  PersonalityMedalIcon,
  GearCheckIcon,
  ClockDisciplineIcon,
  ProjectPlanIcon,
  WorkforceSupportIcon,
  ContinuousImprovementIcon,
];

export function AccountableOperatingEnvironmentsSection({
  title = DEFAULT_TITLE,
  highlightTitle = DEFAULT_HIGHLIGHT,
  cards,
}: AccountableOperatingEnvironmentsSectionProps) {
  const displayCards = cards && cards.length > 0 ? cards : FALLBACK_CARDS;
  const headingText = title?.trim() || DEFAULT_TITLE;
  const highlight = highlightTitle?.trim() || DEFAULT_HIGHLIGHT;

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
  }, [displayCards]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardStep = 476; // Card width 456px + gap 20px
    el.scrollBy({
      left: direction === 'left' ? -cardStep : cardStep,
      behavior: 'smooth',
    });
  };

  // Split title for red highlight
  const renderTitle = () => {
    if (!highlight || !headingText.toLowerCase().includes(highlight.toLowerCase())) {
      return headingText;
    }

    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i');
    const parts = headingText.split(regex);

    return parts.map((part, i) => {
      if (part.toLowerCase() === highlight.toLowerCase()) {
        return (
          <span key={i} className="text-[#D31E2D] block sm:inline">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section className="relative w-full bg-[#FFFFFF] py-[60px] md:py-[80px] lg:pt-[80px] lg:pb-[100px] overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[123px]">
        {/* Header Row: Title & Top-Right Carousel Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 md:pb-14">
          <div className="max-w-[960px]">
            <h2 className="font-['DM_Serif_Text'] text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[115%] lg:leading-[120%] tracking-tight text-[#0A0A0A]">
              {renderTitle()}
            </h2>
          </div>

          {/* Carousel Arrows (Figma Group 2085665688) */}
          <div className="flex items-center gap-[18px] self-start lg:self-end shrink-0">
            {/* Left Button */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous card"
              className={`flex items-center justify-center w-[54px] h-[54px] md:w-[66px] md:h-[66px] rounded-full border-[1.375px] border-[#000000] transition-all duration-200 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                canScrollLeft
                  ? 'bg-white hover:bg-[#F3F4F6] active:scale-95 text-[#000000] cursor-pointer'
                  : 'bg-white/60 opacity-40 cursor-not-allowed text-[#000000]'
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>

            {/* Right Button */}
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next card"
              className={`flex items-center justify-center w-[54px] h-[54px] md:w-[66px] md:h-[66px] rounded-full border-[1.375px] border-[#000000] transition-all duration-200 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                canScrollRight
                  ? 'bg-white hover:bg-[#F3F4F6] active:scale-95 text-[#000000] cursor-pointer'
                  : 'bg-white/60 opacity-40 cursor-not-allowed text-[#000000]'
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M9 18L15 12L9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container (Frame 2147226446) */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row overflow-x-auto gap-[18px] md:gap-[20px] scrollbar-none scroll-smooth pb-6 pt-2 -mx-6 px-6 sm:-mx-10 sm:px-10 md:-mx-16 md:px-16 lg:mx-0 lg:px-0"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {displayCards.map((card, index) => {
            const isHighlighted = card.isHighlighted ?? (index === 0);
            const iconUrl = typeof card.icon === 'string' ? card.icon : card.icon?.url;
            const FallbackIcon = DEFAULT_ICONS[index % DEFAULT_ICONS.length];

            return (
              <div
                key={card.id ?? `env-card-${index}`}
                style={{ scrollSnapAlign: 'start' }}
                className={`relative shrink-0 flex flex-col justify-between w-[340px] sm:w-[400px] md:w-[456px] h-[520px] md:h-[564px] rounded-[30px] p-[20px] md:p-[21.5px] transition-transform duration-300 hover:-translate-y-1 ${
                  isHighlighted
                    ? 'border border-[#FAFAFA] text-white shadow-xl'
                    : 'bg-[#FCFCFC] border border-[#FAFAFA] text-[#000000] shadow-sm hover:shadow-md'
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

                {/* Top Icon Area (Figma personality_18814885 / default_18233982 etc.) */}
                <div className="pt-2 pl-4 sm:pt-4 sm:pl-6 md:pt-[6px] md:pl-[31px]">
                  {iconUrl ? (
                    <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                      <Image
                        src={normalizeImageSrc(iconUrl)}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center ${
                        isHighlighted ? 'text-[#D7E8FF]' : 'text-[#000000]'
                      }`}
                    >
                      <FallbackIcon className="w-full h-full" />
                    </div>
                  )}
                </div>

                {/* Bottom Content Card (Figma Rectangle 13 / 11) */}
                <div
                  className={`w-full min-h-[220px] md:min-h-[236px] rounded-[30px] px-6 py-6 md:px-8 md:py-8 flex flex-col justify-center gap-3 transition-colors ${
                    isHighlighted
                      ? 'bg-[#FFFFFF] shadow-lg'
                      : 'bg-[#D9D9D9]/20'
                  }`}
                >
                  <h3 className="font-['DM_Serif_Text'] text-[26px] sm:text-[28px] md:text-[32px] leading-[125%] md:leading-[44px] text-[#022E4C]">
                    {card.title}
                  </h3>
                  <p className="font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] md:text-[20px] leading-[150%] md:leading-[35px] text-[#000000]">
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
