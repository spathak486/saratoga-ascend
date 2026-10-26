'use client';

import React, { useState } from 'react';

export interface WorkflowStepItem {
  id?: string | number | null;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
}

export interface WorkforcePlanningSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  cards?: WorkflowStepItem[] | null;
}

export function WorkforcePlanningSection({
  title,
  highlightTitle,
  cards,
}: WorkforcePlanningSectionProps) {
  // STRICT RULE: If CMS data is missing or empty, render nothing (no static dummy fallback)
  if (!cards || cards.length === 0) {
    return null;
  }

  // Active step index: click on any step number toggles it
  const [activeIndex, setActiveIndex] = useState(0);

  // Render title with highlight (e.g. "From Workforce Planning" in #F01424, rest in #000000)
  const renderTitle = () => {
    const rawTitle = title?.trim() || '';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawTitle && !rawHighlight) return null;

    // If highlightTitle is provided explicitly
    if (rawHighlight) {
      if (!rawTitle) {
        return <span className="text-[#F01424] font-normal block">{rawHighlight}</span>;
      }

      const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedHighlight})`, 'i');

      if (regex.test(rawTitle)) {
        const parts = rawTitle.split(regex);
        return parts.map((part, i) => {
          if (part.toLowerCase() === rawHighlight.toLowerCase()) {
            return (
              <span key={i} className="text-[#F01424] font-normal block">
                {part}
              </span>
            );
          }
          return <span key={i} className="text-[#000000] font-normal block">{part}</span>;
        });
      }

      return (
        <>
          <span className="text-[#F01424] font-normal block">{rawHighlight}</span>
          <span className="text-[#000000] font-normal block">{rawTitle}</span>
        </>
      );
    }

    // Default smart splitting: if title matches "From Workforce Planning to Ongoing Support"
    const lower = rawTitle.toLowerCase();
    if (lower.includes('from workforce planning')) {
      const matchIndex = lower.indexOf('from workforce planning');
      const prefix = rawTitle.slice(0, matchIndex);
      const highlighted = rawTitle.slice(matchIndex, matchIndex + 'from workforce planning'.length);
      const suffix = rawTitle.slice(matchIndex + 'from workforce planning'.length);

      return (
        <>
          {prefix && <span className="text-[#000000] font-normal block">{prefix}</span>}
          <span className="text-[#F01424] font-normal block">{highlighted}</span>
          {suffix && <span className="text-[#000000] font-normal block">{suffix.trim()}</span>}
        </>
      );
    }

    return <span className="text-[#F01424] font-normal block">{rawTitle}</span>;
  };

  const hasHeading = Boolean(title?.trim() || highlightTitle?.trim());

  return (
    <section
      aria-label={title || highlightTitle || 'From Workforce Planning to Ongoing Support'}
      /* Figma: Frame 2147226449 -> width: 1920px; height: 690px; top: 6127px; left: 0px; */
      className="relative w-full max-w-[1920px] mx-auto min-h-[690px] bg-[#FFFFFF] pt-[80px] pb-[90px] px-6 sm:px-10 lg:px-[120px] overflow-hidden flex flex-col justify-between"
    >
      <div className="w-full">
        {/* Heading: Group 2608667 (width: 878px, height: 172px, left: 120px, top: 80px) */}
        {hasHeading && (
          <div className="mb-14 sm:mb-16 lg:mb-20 max-w-[878px]">
            {/* Title: DM Serif Text, 72px, line-height: 86px (120%) */}
            <h2
              className="font-serif text-[38px] sm:text-[54px] lg:text-[72px] leading-[115%] lg:leading-[86px] tracking-normal font-normal"
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              {renderTitle()}
            </h2>
          </div>
        )}

        {/* 4 Steps Interactive Layout (Figma Frame 2147226476: width: 1499px, height: 278px, gap: 94px) */}
        <div className="w-full flex flex-col lg:flex-row items-start gap-10 lg:gap-[94px] overflow-x-auto scrollbar-none pb-4 pt-2">
          {cards.map((card, index) => {
            const isActive = activeIndex === index;
            const stepNum = card.number || `${index + 1}`;

            return (
              <div
                key={card.id ?? `step-${index}`}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                aria-selected={isActive}
                aria-label={`Step ${stepNum}: ${card.title}`}
                className={`group cursor-pointer flex flex-col pt-0 transition-all duration-500 ease-in-out shrink-0 focus:outline-none ${
                  isActive
                    ? 'w-full lg:w-[602px]'
                    : 'w-full lg:w-[205px]'
                }`}
              >
                {/* Top Divider Line (Figma Vector 7212: border: 2px solid #BBBBBB) */}
                <div
                  className={`w-full h-[2px] mb-6 sm:mb-8 transition-colors duration-300 ${
                    isActive ? 'bg-[#BBBBBB]' : 'bg-[#BBBBBB] group-hover:bg-[#999999]'
                  }`}
                />

                {/* Step Body: Big Number + Text Content (Figma Frame 2147226472/3: fixed height 278px) */}
                <div className="flex flex-row items-center gap-6 sm:gap-8 lg:gap-[43px] overflow-hidden h-[278px]">
                  
                  {/* Big Number: DM Serif Text, 358px, #F01424 (active) / #CCCCCC (inactive) with click event */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(index);
                    }}
                    title={`Click to view Step ${stepNum}`}
                    aria-label={`Step number ${stepNum}`}
                    className={`h-[278px] flex items-center font-serif text-[140px] sm:text-[220px] lg:text-[358px] leading-none select-none transition-colors duration-300 shrink-0 text-left p-0 bg-transparent border-none cursor-pointer focus:outline-none ${
                      isActive
                        ? 'text-[#F01424]'
                        : 'text-[#CCCCCC] hover:text-[#F01424]/70'
                    }`}
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {stepNum}
                  </button>

                  {/* Text Content (Figma Frame 2147226471: UNDERSTAND / ALIGN / DELIVER / IMPROVE + description) */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden shrink-0 self-center ${
                      isActive
                        ? 'w-full lg:w-[398px] opacity-100 translate-x-0'
                        : 'w-0 opacity-0 -translate-x-4 pointer-events-none'
                    }`}
                  >
                    <div className="w-[398px] flex flex-col justify-center">
                      {/* Step Title: DM Serif Text, 38px, line-height: 52px, color: #000000 */}
                      <h3
                        className="font-serif text-[22px] sm:text-[28px] lg:text-[38px] leading-[30px] sm:leading-[38px] lg:leading-[52px] text-[#000000] font-normal uppercase mb-2 sm:mb-3"
                        style={{ fontFamily: "'DM Serif Text', serif" }}
                      >
                        {card.title}
                      </h3>

                      {/* Step Description: Google Sans Flex, 24px, line-height: 35px, color: #000000 */}
                      <p
                        className="font-sans text-[15px] sm:text-[18px] lg:text-[24px] leading-[22px] sm:leading-[27px] lg:leading-[35px] text-[#000000] font-medium max-w-[398px]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {card.description}
                      </p>
                    </div>
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

export default WorkforcePlanningSection;
