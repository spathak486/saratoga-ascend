'use client';

import React, { useState } from 'react';

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

// Default 6 capabilities matching exact Figma Frame 2085664245 specifications
const DEFAULT_CAPABILITIES: CapabilityCard[] = [
  {
    number: '01',
    title: 'Healthcare & Public Health',
    description: 'Support services for healthcare delivery and public health programs.',
    actionTone: 'sky',
  },
  {
    number: '02',
    title: 'Behavioral & Mental Health',
    description: 'Support for behavioral and mental health service environments.',
    actionTone: 'blue',
  },
  {
    number: '03',
    title: 'IT & Digital',
    description: 'Technology and digital enablement.',
    actionTone: 'sky',
  },
  {
    number: '04',
    title: 'Program & Administrative Support',
    description: 'Program coordination, documentation, and administration.',
    actionTone: 'blue',
  },
  {
    number: '05',
    title: 'Healthcare Workforce',
    description: 'Workforce capacity and operational support.',
    actionTone: 'sky',
  },
  {
    number: '06',
    title: 'Clinical & Non-Clinical Contact Center',
    description: 'Contact center operations and service support.',
    actionTone: 'blue',
  },
];

// Vector icons matching exact Figma iconography
function CapabilityIcon({ index, isDark }: { index: number; isDark: boolean }) {
  const strokeColor = isDark ? '#FFFFFF' : '#000000';

  switch (index % 6) {
    case 0:
      // public-health_16839796: Hands supporting group of healthcare people & cross
      return (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 xl:w-[96px] xl:h-[96px] 2xl:w-[120px] 2xl:h-[120px]" viewBox="0 0 120 120" fill="none">
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
      // support_17138618: Caring hand holding brain / mental health gear
      return (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 xl:w-[96px] xl:h-[96px] 2xl:w-[120px] 2xl:h-[120px]" viewBox="0 0 120 120" fill="none">
          <path d="M24 74L46 66C52 64 58 66 62 70L78 86C82 90 88 90 92 86L102 76" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 52C40 52 36 46 36 40C36 34 40 28 46 28C48 22 54 18 62 18C70 18 76 22 78 28C84 28 88 34 88 40C88 46 84 52 78 52" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M54 28C54 36 60 42 68 42M62 18V50" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 24V18M35 21H41" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 2:
    case 4:
      // idea_9103690: Laptop screen displaying glowing lightbulb / digital innovation / workforce capacity
      return (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 xl:w-[96px] xl:h-[96px] 2xl:w-[120px] 2xl:h-[120px]" viewBox="0 0 120 120" fill="none">
          <rect x="28" y="28" width="64" height="46" rx="4" stroke={strokeColor} strokeWidth="3" />
          <path d="M20 78H100L94 88H26L20 78Z" stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" />
          <path d="M54 48C54 44.7 56.7 42 60 42C63.3 42 66 44.7 66 48C66 50.5 64.5 52.5 63 54V58H57V54C55.5 52.5 54 50.5 54 48Z" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M57 62H63" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M60 34V37M48 39L50 41M72 39L70 41" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 3:
    case 5:
    default:
      // developer_12607991: User behind screen / administrative delivery & contact center gear
      return (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 xl:w-[96px] xl:h-[96px] 2xl:w-[120px] 2xl:h-[120px]" viewBox="0 0 120 120" fill="none">
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
  highlightTitle,
  cards,
}: ExploreCapabilitiesSectionProps) {
  const displayCards: CapabilityCard[] = cards && cards.length > 0 ? cards : DEFAULT_CAPABILITIES;
  const isCarousel = displayCards.length > 4;
  const [startIndex, setStartIndex] = useState(0);

  // Maximum scroll index: so 4 items are always visible in view
  const maxIndex = Math.max(0, displayCards.length - 4);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Title rendering logic: supports highlighted text in Brand Red (#F01424)
  const renderTitle = () => {
    const rawTitle = title?.trim() || 'Explore more Saratoga Ascend capabilities.';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawHighlight) {
      return <span className="text-[#F01424]">{rawTitle}</span>;
    }

    const escaped = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) =>
        part.toLowerCase() === rawHighlight.toLowerCase() ? (
          <span key={i} className="text-[#F01424]">
            {part}
          </span>
        ) : (
          <span key={i} className="text-[#000000]">
            {part}
          </span>
        )
      );
    }

    return (
      <>
        <span className="text-[#F01424]">{rawHighlight} </span>
        <span className="text-[#000000]">{rawTitle}</span>
      </>
    );
  };

  return (
    <section
      aria-label={title || 'Explore more Saratoga Ascend capabilities.'}
      className="relative mx-auto w-full max-w-[1920px] bg-[#FAFAFA] py-14 xl:py-[80px] px-page overflow-hidden"
    >
      {/* Title & Carousel Buttons Header (Group 2085665688) */}
      <div className="flex items-end justify-between mb-10 xl:mb-[60px] max-w-[1680px] mx-auto">
        <div className="max-w-[1371px]">
          <h2
            className="font-serif text-[clamp(2.25rem,1.5rem+2.6vw,4.5rem)] leading-[1.15] xl:leading-[86px] font-normal tracking-tight"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {renderTitle()}
          </h2>
        </div>

        {/* Carousel Navigation Buttons: Rendered only when > 4 cards (Group 2085665688: width: 152px, height: 66px) */}
        {isCarousel && (
          <div className="hidden lg:flex items-center gap-[20px] shrink-0 mb-2">
            {/* Prev Button: 66px x 66px, border 1.375px #022E4C, radius 1373px, gradient on hover */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={startIndex === 0}
              aria-label="Previous capabilities"
              className={`w-[66px] h-[66px] rounded-full border-[1.375px] border-[#022E4C] flex items-center justify-center transition-all duration-300 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                startIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-transparent text-[#022E4C]'
                  : 'bg-transparent text-[#022E4C] hover:text-white hover:border-transparent hover:bg-[linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] cursor-pointer active:scale-95'
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
                <path d="M20 24.5L12 16.5L20 8.5" />
              </svg>
            </button>

            {/* Next Button: 66px x 66px, border 1.375px #022E4C, radius 1373px, gradient on hover */}
            <button
              type="button"
              onClick={handleNext}
              disabled={startIndex >= maxIndex}
              aria-label="Next capabilities"
              className={`w-[66px] h-[66px] rounded-full border-[1.375px] border-[#022E4C] flex items-center justify-center transition-all duration-300 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                startIndex >= maxIndex
                  ? 'opacity-40 cursor-not-allowed bg-transparent text-[#022E4C]'
                  : 'bg-transparent text-[#022E4C] hover:text-white hover:border-transparent hover:bg-[linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] cursor-pointer active:scale-95'
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
                <path d="M13 24.5L21 16.5L13 8.5" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Frame 2085664245: Connected Blocks Carousel View (width: 1800px max, height: 516px, drop-shadow 25.6px) */}
      <div className="w-full max-w-[1800px] mx-auto rounded-[16px] overflow-hidden shadow-[0px_0px_25.6px_rgba(0,0,0,0.25)]">
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{
            transform: `translateX(-${startIndex * 25}%)`,
          }}
        >
          {displayCards.map((card, index) => {
            // Alternating block colors:
            // Even index (0, 2, 4...): light blue (#EBF6FF), text #000000, divider #000000
            // Odd index (1, 3, 5...): royal blue (#2B88D9), text #FFFFFF, divider #FFFFFF
            const isDark = index % 2 === 1;

            return (
              <div
                key={card.id ?? card.documentId ?? `capability-${index}`}
                className={`flex flex-col items-center justify-between text-center p-6 sm:p-7 2xl:p-[30px] h-[516px] shrink-0 w-full sm:w-1/2 lg:w-1/4 transition-colors duration-300 ${
                  isDark ? 'bg-[#2B88D9] text-white' : 'bg-[#EBF6FF] text-[#000000]'
                }`}
              >
                {/* Icon Container: 120px x 120px */}
                <div className="flex items-center justify-center w-[120px] h-[120px] shrink-0 mt-2 mb-auto">
                  {card.icon?.url ? (
                    <img
                      src={card.icon.url}
                      alt={card.icon.alternativeText || card.title}
                      className="w-16 h-16 2xl:w-24 2xl:h-24 object-contain"
                    />
                  ) : (
                    <CapabilityIcon index={index} isDark={isDark} />
                  )}
                </div>

                {/* Content Container (Title + Line + Description) */}
                <div className="flex flex-col items-center gap-[40.98px] w-full mb-2">
                  {/* Title: 28px DM Serif Text, line-height 38px */}
                  <h3
                    className="font-serif text-[28px] leading-[38px] font-normal min-h-[38px] flex items-center justify-center max-w-[358px] px-2"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {card.title}
                  </h3>

                  {/* Horizontal Divider Line: Rectangle 39856 - 169.02px width, 2.56px height */}
                  <div
                    className={`w-[169.02px] h-[2.56px] shrink-0 ${
                      isDark ? 'bg-white' : 'bg-[#000000]'
                    }`}
                  />

                  {/* Description: Google Sans Flex, 24px, line-height 40px (167%) */}
                  <p
                    className="font-sans text-[20px] 2xl:text-[24px] leading-[32px] 2xl:leading-[40px] font-normal max-w-[300px] min-h-[80px] 2xl:min-h-[120px] flex items-center justify-center"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
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
