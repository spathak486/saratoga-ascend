'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

export interface MissionsYouServeCard {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | string | null;
}

export interface MissionsYouServeSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  cards?: MissionsYouServeCard[] | null;
}

// Default 4 cards matching exact Figma Frame 2147226548 specifications
const DEFAULT_CARDS: MissionsYouServeCard[] = [
  {
    title: 'Federal Government',
    description:
      'Integrated healthcare, workforce, technology, contact center, and program administration support for federal environments.',
    image: '/images/phase4/market-federal-military.png',
  },
  {
    title: 'Defense & Military',
    description:
      'Capabilities aligned to prepared teams, coordinated operations, and reliable mission-support services.',
    image: '/images/Federal & Military.png',
  },
  {
    title: 'Veterans Affairs',
    description:
      'Respectful, responsive services supporting veteran communities and the teams responsible for their care.',
    image: '/images/supporting-missions-doctor.png',
  },
  {
    title: 'State & Local Government (SLED)',
    description:
      'Flexible support aligned to evolving public-service demands, workforce needs, and program priorities.',
    image: '/images/phase4/market-state-local.png',
  },
];

export function MissionsYouServeSection({
  title = 'Built Around the Missions You Serve',
  highlightTitle = 'Missions You Serve',
  description = 'Explore the government environments we support and find the information most relevant to your mission.',
  cards,
}: MissionsYouServeSectionProps) {
  const displayCards: MissionsYouServeCard[] = cards && cards.length > 0 ? cards : DEFAULT_CARDS;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [displayCards, updateScrollState]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Card width 575px + gap 16px = ~591px scroll step
    const cardStep = 591;
    el.scrollBy({
      left: direction === 'left' ? -cardStep : cardStep,
      behavior: 'smooth',
    });
  };

  // Title rendering logic: renders highlighted phrase in Brand Red (#F01424)
  const renderTitle = () => {
    const rawTitle = title?.trim() || 'Built Around the Missions You Serve';
    const rawHighlight = highlightTitle?.trim() || 'Missions You Serve';

    if (!rawHighlight) {
      return <span className="text-[#000000]">{rawTitle}</span>;
    }

    const escaped = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) =>
        part.toLowerCase() === rawHighlight.toLowerCase() ? (
          <span key={i} className="text-[#F01424] block mt-1">
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
        <span className="text-[#000000]">{rawTitle} </span>
        <span className="text-[#F01424] block mt-1">{rawHighlight}</span>
      </>
    );
  };

  return (
    <section
      aria-label={title || 'Built Around the Missions You Serve'}
      className="relative w-full max-w-[1920px] mx-auto min-h-[930px] bg-white py-14 xl:py-[103px] px-6 sm:px-10 lg:pl-[120px] lg:pr-0 overflow-hidden flex items-center"
    >
      {/* Decorative Red Outline Box on Right: Rectangle 39868 (width: 795px, height: 629px, border: 1.5px solid #F01424, radius: 42.67px) */}
      <div
        className="hidden xl:block absolute pointer-events-none z-0 border-[1.5px] border-[#F01424] rounded-[42.67px]"
        style={{
          width: '795px',
          height: '629px',
          right: '0px',
          top: '80px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10">
        
        {/* Left Column: Title, Subtitle, Red Accent Line & Navigation Controls (Group 2608667) */}
        <div className="w-full lg:w-[671px] shrink-0 flex flex-col justify-between min-h-[500px] xl:min-h-[620px]">
          <div>
            {/* Main Title: DM Serif Text, 72px, line-height: 99px */}
            <h2
              className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] leading-[1.12] xl:leading-[99px] font-normal tracking-tight max-w-[671px]"
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              {renderTitle()}
            </h2>

            {/* Description: Google Sans Flex, 24px, line-height: 40px (167%) */}
            {description && (
              <p
                className="font-sans text-[clamp(1.1rem,1rem+0.45vw,1.5rem)] leading-[1.55] xl:leading-[40px] text-[#000000] font-normal max-w-[644px] mt-6 xl:mt-8"
                style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              >
                {description}
              </p>
            )}

            {/* Accent Red Line: Line 232 (width: 240px, border: 1.5px solid #F01424) */}
            <div className="w-[240px] h-0 border-t-[1.5px] border-[#F01424] mt-8 xl:mt-12" />
          </div>

          {/* Carousel Navigation Buttons: Group 2085665688 (width: 152px, height: 66px) */}
          <div className="flex items-center gap-[20px] shrink-0 mt-8 xl:mt-auto">
            {/* Left Button */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous mission environment"
              className={`w-[66px] h-[66px] rounded-full border-[1.375px] border-[#022E4C] flex items-center justify-center transition-all duration-300 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                !canScrollLeft
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

            {/* Right Button */}
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next mission environment"
              className={`w-[66px] h-[66px] rounded-full border-[1.375px] border-[#022E4C] flex items-center justify-center transition-all duration-300 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                !canScrollRight
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
        </div>

        {/* Right Column: Cards Carousel Frame (Frame 2147226547) */}
        <div className="w-full lg:flex-1 min-w-0">
          <div
            ref={scrollContainerRef}
            className="flex flex-row overflow-x-auto gap-[16px] xl:gap-[24px] scrollbar-none scroll-smooth pb-4 pt-2 pr-6 sm:pr-10 lg:pr-[60px]"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {displayCards.map((card, idx) => {
              const imgUrl =
                typeof card.image === 'string'
                  ? card.image
                  : card.image?.url || DEFAULT_CARDS[idx % DEFAULT_CARDS.length].image;

              return (
                /* Card: Frame 2147226543 / 2147226544 / 2147226545 / 2147226546 (width: 575px, height: 687px, bg: #F1F8FF, border: 1.5px solid #2B88D9, radius: 32px, padding: 54px) */
                <div
                  key={card.id ?? card.documentId ?? `mission-card-${idx}`}
                  style={{ scrollSnapAlign: 'start' }}
                  className="box-border relative shrink-0 w-[320px] sm:w-[460px] xl:w-[575px] h-[580px] xl:h-[687px] bg-[#F1F8FF] border-[1.5px] border-[#2B88D9] rounded-[32px] p-6 sm:p-8 xl:p-[54px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
                >
                  {/* Top Text Content (Frame 2085664291) */}
                  <div className="flex flex-col gap-3 xl:gap-[21.33px] max-w-[467px]">
                    {/* Card Title: Google Sans Flex, 40px, semi-bold (600), line-height: 50px */}
                    <h3
                      className="font-sans text-[26px] sm:text-[32px] xl:text-[40px] leading-[1.2] xl:leading-[50px] font-semibold text-[#000000]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {card.title}
                    </h3>

                    {/* Card Description: Google Sans Flex, 24px, light (300), line-height: 40px (167%) */}
                    <p
                      className="font-sans text-[16px] sm:text-[19px] xl:text-[24px] leading-[1.5] xl:leading-[40px] font-light text-[#000000] min-h-[90px] xl:min-h-[120px]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Image Container: Group 2085665784 (width: 467px, height: 317.33px, radius: 16px) */}
                  <div className="relative w-full h-[220px] sm:h-[260px] xl:h-[317px] rounded-[16px] overflow-hidden mt-auto">
                    {/* Gradient Background Surface (Rectangle 39867) */}
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        background:
                          'linear-gradient(103.25deg, #9ED2FF 19.68%, rgba(192, 226, 255, 0.3) 65.6%, #F1F8FF 82.94%), #FFFFFF',
                      }}
                    />

                    {/* Blue Accent Circle: Ellipse 2575 (width: 116px, height: 116px, bg: #2B88D9) */}
                    <div className="absolute -left-[49px] -top-[58px] w-[116px] h-[116px] rounded-full bg-[#2B88D9] z-10 pointer-events-none" />

                    {/* Photo Illustration */}
                    {imgUrl && (
                      <img
                        src={typeof imgUrl === 'string' ? imgUrl : ''}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover z-20"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default MissionsYouServeSection;

