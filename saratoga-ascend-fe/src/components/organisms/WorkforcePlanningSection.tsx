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
      className="relative mx-auto flex w-full max-w-[1920px] flex-col justify-between overflow-hidden bg-[#FFFFFF] px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:min-h-[690px] lg:px-[120px] lg:pb-[90px] lg:pt-[80px]"
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
        <div className="flex w-full flex-col items-start gap-8 overflow-x-auto pb-4 pt-2 scrollbar-none sm:gap-10 lg:flex-row lg:gap-[94px]">
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
                className={`group flex shrink-0 cursor-pointer flex-col pt-0 transition-all duration-500 ease-in-out focus:outline-none ${
                  isActive ? 'w-full lg:w-[602px]' : 'w-full lg:w-[205px]'
                }`}
              >
                <div
                  className={`mb-5 h-[2px] w-full transition-colors duration-300 sm:mb-8 ${
                    isActive ? 'bg-[#BBBBBB]' : 'bg-[#BBBBBB] group-hover:bg-[#999999]'
                  }`}
                />

                <div className="flex h-auto flex-row items-center gap-4 overflow-hidden sm:gap-6 lg:h-[278px] lg:gap-[43px]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(index);
                    }}
                    title={`Click to view Step ${stepNum}`}
                    aria-label={`Step number ${stepNum}`}
                    className={`flex h-auto shrink-0 cursor-pointer items-center border-none bg-transparent p-0 text-left font-serif text-[5.5rem] leading-none transition-colors duration-300 select-none focus:outline-none sm:text-[8rem] lg:h-[278px] lg:text-[358px] ${
                      isActive
                        ? 'text-[#F01424]'
                        : 'text-[#CCCCCC] hover:text-[#F01424]/70'
                    }`}
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {stepNum}
                  </button>

                  <div
                    className={`shrink-0 self-center overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive
                        ? 'w-full max-w-[398px] translate-x-0 opacity-100 lg:w-[398px]'
                        : 'pointer-events-none w-0 -translate-x-4 opacity-0'
                    }`}
                  >
                    <div className="flex w-full max-w-[398px] flex-col justify-center">
                      <h3
                        className="mb-2 font-serif text-[1.375rem] leading-8 font-normal text-[#000000] uppercase sm:mb-3 sm:text-[1.75rem] sm:leading-[2.375rem] lg:text-[38px] lg:leading-[52px]"
                        style={{ fontFamily: "'DM Serif Text', serif" }}
                      >
                        {card.title}
                      </h3>

                      <p
                        className="max-w-[398px] font-sans text-[0.9375rem] leading-[1.375rem] font-medium text-[#000000] sm:text-[1.125rem] sm:leading-[1.6875rem] lg:text-[24px] lg:leading-[35px]"
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
