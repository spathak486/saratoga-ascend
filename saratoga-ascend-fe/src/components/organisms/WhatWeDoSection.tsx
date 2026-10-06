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
    if (scrollRef.current) {
      // Card width (1119) + Gap (30) = 1149
      const scrollAmount = 1149;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      tone="surface"
      spacing="none"
      className="py-16 overflow-hidden"
    >
      <div className="w-full max-w-[1680px] mx-auto flex flex-col gap-[60px] px-4 md:px-0">
        {/* Header Row */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center w-full gap-8">
          <div className="flex flex-col gap-3 w-full xl:w-[60%] max-w-[1041px]">
            <h2
              id="what-we-do-heading"
              className="text-[#D31E2D] font-serif font-normal text-[clamp(48px,4vw,72px)] leading-[1.2]"
            >
              {title}
            </h2>
            <p className="text-[#0A0A0A] font-sans font-normal text-[clamp(20px,1.8vw,30px)] leading-[1.33]">
              {description}
            </p>
          </div>
          <CtaButton
            href={ctaHref}
            className="shrink-0 min-w-[180px] h-[60px] flex items-center justify-center bg-[linear-gradient(90.55deg,#D31E2D_0.47%,#2A91DC_102.45%)] text-white font-sans font-medium text-[20px] rounded-lg shadow-sm border-none"
            showArrow={true}
          >
            {ctaLabel}
          </CtaButton>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex flex-row gap-[30px] overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
        >
          {displayLines.map((line, idx) => {
            const currentSrc = line.imageSrc || photoSrc;

            return (
              <div
                key={line.heading || idx}
                className="shrink-0 w-[90vw] md:w-[600px] xl:w-[85vw] max-w-[1119px] h-auto xl:h-[637px] rounded-[20px] border-[1.5px] border-[#BDE4FF] shadow-[0px_0px_20px_rgba(0,0,0,0.08)] bg-white p-6 md:p-8 xl:p-[35px] flex flex-col xl:flex-row gap-6 xl:gap-8 snap-start"
              >
                {/* Left side: Image and Button */}
                <div className="flex flex-col gap-5 w-full xl:w-[40%] max-w-[443px] shrink-0">
                  <div className="w-full h-[300px] xl:h-[506px] rounded-xl overflow-hidden border border-[#BDE4FF]">
                    <img
                      src={currentSrc}
                      alt={line.heading}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CtaButton
                    href={line.href}
                    showArrow={false}
                    className="w-full justify-center text-[20px] h-[54px] rounded-[10px] bg-[linear-gradient(90.55deg,#D31E2D_0.47%,#2A91DC_102.45%)] font-bold text-white border-none shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
                  >
                    Learn More
                  </CtaButton>
                </div>

                {/* Right side: Content */}
                <div className="flex flex-col flex-1 pt-0">
                  <h3 className="text-[clamp(40px,3.5vw,60px)] leading-[1.2] font-serif text-[#0A0A0A] mb-5">
                    {line.heading}
                  </h3>
                  <p className="text-[clamp(20px,1.5vw,24px)] leading-[1.33] text-[#022E4C] font-sans mb-8">
                    {line.blurb}
                  </p>

                  <div className="flex flex-col gap-5 mt-auto pb-4 md:pb-0">
                    {line.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0 relative">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#2A91DC"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[clamp(20px,1.5vw,26px)] leading-[1.23] text-[#0F172A] font-sans">
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

        {/* Carousel Controls */}
        <div className="flex justify-center items-center gap-[30px] mt-4">
          <button
            onClick={() => scroll('left')}
            aria-label="Previous"
            className="w-[66px] h-[66px] rounded-full border-[1.375px] border-black flex justify-center items-center shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next"
            className="w-[66px] h-[66px] rounded-full border-[1.375px] border-black flex justify-center items-center shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </Section>
  );
};
