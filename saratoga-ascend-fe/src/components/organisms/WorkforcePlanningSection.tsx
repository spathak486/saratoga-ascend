'use client';

import React, { useState } from 'react';

export interface WorkflowCardItem {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
  actionTone?: 'sky' | 'red' | string | null;
  icon?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface WorkforcePlanningSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  variant?: 'orbital' | 'accordion' | null;
  centerImage?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  cards?: WorkflowCardItem[] | null;
}

// Fallback Default Data if CMS cards aren't fully configured yet
const DEFAULT_STEPS: WorkflowCardItem[] = [
  {
    number: '01',
    title: 'Understand',
    description: 'Assess workforce demand, clinical requirements, locations, timelines, and mission priorities.',
    actionTone: 'sky',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Develop a staffing and engagement model aligned with role requirements and operational needs.',
    actionTone: 'red',
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'Coordinate qualified professionals, readiness activities, onboarding, scheduling, and placement.',
    actionTone: 'sky',
  },
  {
    number: '04',
    title: 'Support',
    description: 'Maintain communication, performance visibility, continuity, and workforce improvement.',
    actionTone: 'red',
  },
];

// Helper to determine theme for any index
function getStepTone(card: WorkflowCardItem, index: number, isRightSide: boolean): 'sky' | 'red' {
  if (card.actionTone === 'red' || card.actionTone === 'sky') {
    return card.actionTone;
  }
  if (isRightSide) {
    return index % 2 === 0 ? 'red' : 'sky';
  }
  return index % 2 === 0 ? 'sky' : 'red';
}

function StepIcon({ number, tone, iconUrl, title }: { number: string; tone: 'sky' | 'red'; iconUrl?: string | null; title?: string }) {
  if (iconUrl) {
    return <img src={iconUrl} alt={title || 'Icon'} className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] object-contain" />;
  }

  const color = tone === 'red' ? '#F01424' : '#2B88D9';
  const numInt = parseInt(number.replace(/\D/g, '') || '1', 10);

  if (numInt % 4 === 1) {
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.4A2.4 2.4 0 0 0 2.4 4.8v4.8a7.2 7.2 0 0 0 14.4 0V4.8a2.4 2.4 0 0 0-2.4-2.4" />
        <path d="M9.6 16.8v1.2a4.8 4.8 0 0 0 9.6 0v-2.4" />
        <circle cx="19.2" cy="13.2" r="2.4" />
      </svg>
    );
  }

  if (numInt % 4 === 2) {
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    );
  }

  if (numInt % 4 === 3) {
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function WorkforcePlanningSection({
  title = 'From Workforce Planning to Ongoing Support',
  highlightTitle = 'From Workforce Planning',
  variant = 'orbital',
  centerImage,
  cards,
}: WorkforcePlanningSectionProps) {
  const displayCards: WorkflowCardItem[] =
    cards && cards.length > 0 ? cards : DEFAULT_STEPS;

  const [activeIndex, setActiveIndex] = useState(0);

  // Render title with highlight (highlight in #F01424 Red, non-highlighted in #000000 Black)
  const renderTitle = () => {
    const rawTitle = title?.trim() || 'From Workforce Planning to Ongoing Support';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawTitle && !rawHighlight) return null;

    if (!rawHighlight) {
      return <span className="text-[#F01424] font-normal">{rawTitle}</span>;
    }

    if (!rawTitle) {
      return <span className="text-[#F01424] font-normal">{rawHighlight}</span>;
    }

    // Check if rawHighlight is contained in rawTitle (case-insensitive)
    const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === rawHighlight.toLowerCase()) {
          return (
            <span key={i} className="text-[#F01424] font-normal">
              {part}
            </span>
          );
        }
        return (
          <span key={i} className="text-[#000000] font-normal">
            {part}
          </span>
        );
      });
    }

    // If highlightTitle is separate in CMS
    return (
      <>
        <span className="text-[#F01424] font-normal">{rawHighlight} </span>
        <span className="text-[#000000] font-normal">{rawTitle}</span>
      </>
    );
  };

  const resolvedCenterImage =
    centerImage?.url || '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png';

  // --- 1. ACCORDION VARIANT ---
  if (variant === 'accordion') {
    return (
      <section className="relative mx-auto flex w-full max-w-[1920px] flex-col justify-between overflow-hidden bg-[#FFFFFF] px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:min-h-[690px] lg:px-[120px] lg:pb-[90px] lg:pt-[80px]">
        <div className="w-full">
          <div className="mb-14 sm:mb-16 lg:mb-20 max-w-[878px]">
            <h2
              className="font-serif text-[38px] sm:text-[54px] lg:text-[72px] leading-[115%] lg:leading-[86px] tracking-normal font-normal"
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              {renderTitle()}
            </h2>
          </div>
          <div className="flex w-full flex-col items-start gap-8 overflow-x-auto pb-4 pt-2 scrollbar-none sm:gap-10 lg:flex-row lg:gap-[94px]">
            {displayCards.map((card, index) => {
              const isActive = activeIndex === index;
              const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
              return (
                <div
                  key={card.id ?? card.documentId ?? `step-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex shrink-0 cursor-pointer flex-col pt-0 transition-all duration-500 ease-in-out ${
                    isActive ? 'w-full lg:w-[602px]' : 'w-full lg:w-[205px]'
                  }`}
                >
                  <div className="mb-5 h-[2px] w-full bg-[#BBBBBB]" />
                  <div className="flex h-auto flex-row items-center gap-4 overflow-hidden sm:gap-6 lg:h-[278px] lg:gap-[43px]">
                    <span
                      className={`font-serif text-[5.5rem] leading-none transition-colors duration-300 lg:text-[358px] ${
                        isActive ? 'text-[#F01424]' : 'text-[#CCCCCC] hover:text-[#F01424]/70'
                      }`}
                      style={{ fontFamily: "'DM Serif Text', serif" }}
                    >
                      {stepNum}
                    </span>
                    {isActive && (
                      <div className="flex flex-col justify-center max-w-[398px]">
                        <h3 className="mb-2 font-serif text-[28px] leading-[36px] font-normal text-[#000000]">
                          {card.title}
                        </h3>
                        <p className="font-sans text-[20px] leading-[28px] text-[#212121]">
                          {card.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // --- 2. DYNAMIC ORBITAL VARIANT (Frame 2147226331) ---
  const total = displayCards.length;
  const leftCount = Math.ceil(total / 2);
  const leftCards = displayCards.slice(0, leftCount);
  const rightCards = displayCards.slice(leftCount);

  return (
    <section
      aria-label={title || highlightTitle || 'From Workforce Planning to Ongoing Support'}
      /* Figma 567:2062: 1920×910, title ~80 from top, 120px gutters */
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-white px-page py-10 sm:py-12 xl:py-[80px]"
    >
      {/* Title */}
      <div className="mb-8 w-full text-left sm:mb-10 sm:text-center xl:mb-[70px]">
        <h2 className="mx-auto max-w-[1442px] font-serif text-[clamp(2rem,1.35rem+2.6vw,4.5rem)] font-normal leading-[1.15]">
          {renderTitle()}
        </h2>
      </div>

      {/* --- DESKTOP ORBITAL VIEW (>= 1280px) --- */}
      <div className="relative mx-auto hidden xl:flex items-center justify-between w-full max-w-[1680px] min-h-[580px] py-4">
        
        {/* LEFT COLUMN PILLS: Icon on Left, Text on Right */}
        <div className="flex flex-col justify-between gap-12 z-20 w-[608px] shrink-0">
          {leftCards.map((card, i) => {
            const stepNum = card.number || (i < 9 ? `0${i + 1}` : `${i + 1}`);
            const tone = getStepTone(card, i, false);
            const isRed = tone === 'red';

            return (
              <div
                key={card.id ?? card.documentId ?? `left-card-${i}`}
                className={`w-full min-h-[241px] rounded-[120.5px] border flex items-center px-10 gap-7 shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
                  isRed
                    ? 'border-[#F01424] bg-[#FFF5F6]'
                    : 'border-[#2B88D9] bg-[#EEF7FE]'
                }`}
              >
                {/* Left Icon Circle */}
                <div
                  className={`w-[150px] h-[150px] rounded-full shrink-0 flex items-center justify-center ${
                    isRed ? 'bg-[#FFD8DB]' : 'bg-[#C8E7FB]'
                  }`}
                >
                  <StepIcon number={stepNum} tone={tone} iconUrl={card.icon?.url} title={card.title} />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center flex-1 pr-4">
                  <span
                    className={`font-sans font-bold text-[24px] leading-[28px] ${
                      isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'
                    }`}
                  >
                    {stepNum}
                  </span>
                  <h3
                    className={`font-sans font-bold text-[28px] leading-[32px] my-1 ${
                      isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className="font-sans text-[17px] leading-[25px] text-[#212121]">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CENTER ELEMENT: Portrait (422px x 422px) + Exact Figma Orbital Arcs & Accent Dots */}
        <div className="relative w-[460px] h-[570px] flex items-center justify-center shrink-0">
          
          {/* EXACT FIGMA ORBITAL SVG LAYER (Centered at 230, 285) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 460 570"
            fill="none"
          >
            {/* Ellipse 12747: Top-center arc (#2B88D9, 5px border) */}
            <path
              d="M 68 85 Q 230 18 392 85"
              stroke="#2B88D9"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Ellipse 12744: Bottom-center arc (#F01424, 5px border) */}
            <path
              d="M 85 485 Q 230 550 375 485"
              stroke="#F01424"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Ellipse 12746: Top-left arc (#2B88D9, 5px border) */}
            <path
              d="M 35 155 Q 12 215 15 275"
              stroke="#2B88D9"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Ellipse 12745: Bottom-left arc (#F01424, 5px border) */}
            <path
              d="M 15 295 Q 15 355 45 415"
              stroke="#F01424"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Ellipse 12742: Top-right arc (#F01424, 5px border) */}
            <path
              d="M 425 150 Q 448 215 445 275"
              stroke="#F01424"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Ellipse 12743: Bottom-right arc (#2B88D9, 5px border) */}
            <path
              d="M 445 295 Q 445 355 415 415"
              stroke="#2B88D9"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* SATELLITE DOTS (24px x 24px) */}
            {/* Ellipse 12748: Top-left dot (#2B88D9) */}
            <circle cx="50" cy="140" r="12" fill="#2B88D9" />

            {/* Ellipse 12749: Bottom-left dot (#F01424) */}
            <circle cx="65" cy="462" r="12" fill="#F01424" />

            {/* Ellipse 12751: Top-right dot (#F01424) */}
            <circle cx="410" cy="140" r="12" fill="#F01424" />

            {/* Ellipse 12750: Bottom-right dot (#2B88D9) */}
            <circle cx="395" cy="462" r="12" fill="#2B88D9" />
          </svg>

          {/* Ellipse 12741: Confident Healthcare Team Portrait (422px x 422px) */}
          <div className="w-[422px] h-[422px] rounded-full overflow-hidden shadow-lg z-20 border-[6px] border-white">
            <img
              src={resolvedCenterImage}
              alt={centerImage?.alternativeText || 'Healthcare Team'}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* RIGHT COLUMN PILLS: Text on Left, Icon on Right */}
        <div className="flex flex-col justify-between gap-12 z-20 w-[608px] shrink-0">
          {rightCards.map((card, i) => {
            const actualIndex = leftCount + i;
            const stepNum = card.number || (actualIndex < 9 ? `0${actualIndex + 1}` : `${actualIndex + 1}`);
            const tone = getStepTone(card, i, true);
            const isRed = tone === 'red';

            return (
              <div
                key={card.id ?? card.documentId ?? `right-card-${i}`}
                className={`w-full min-h-[241px] rounded-[120.5px] border flex items-center px-10 gap-7 shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
                  isRed
                    ? 'border-[#F01424] bg-[#FFF5F6]'
                    : 'border-[#2B88D9] bg-[#EEF7FE]'
                }`}
              >
                {/* Text Content */}
                <div className="flex flex-col justify-center flex-1 pl-4">
                  <span
                    className={`font-sans font-bold text-[24px] leading-[28px] ${
                      isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'
                    }`}
                  >
                    {stepNum}
                  </span>
                  <h3
                    className={`font-sans font-bold text-[28px] leading-[32px] my-1 ${
                      isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className="font-sans text-[17px] leading-[25px] text-[#212121]">
                    {card.description}
                  </p>
                </div>

                {/* Right Icon Circle */}
                <div
                  className={`w-[150px] h-[150px] rounded-full shrink-0 flex items-center justify-center ${
                    isRed ? 'bg-[#FFD8DB]' : 'bg-[#C8E7FB]'
                  }`}
                >
                  <StepIcon number={stepNum} tone={tone} iconUrl={card.icon?.url} title={card.title} />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* --- RESPONSIVE TABLET / MOBILE VIEW (< 1280px) --- */}
      <div className="mx-auto flex w-full max-w-[650px] flex-col items-stretch gap-4 sm:gap-5 xl:hidden">
        <div className="mx-auto my-2 size-44 overflow-hidden rounded-full border-4 border-white shadow-md sm:my-3 sm:size-64">
          <img
            src={resolvedCenterImage}
            alt={centerImage?.alternativeText || 'Healthcare Team'}
            className="size-full object-cover object-center"
          />
        </div>

        {displayCards.map((card, i) => {
          const stepNum = card.number || (i < 9 ? `0${i + 1}` : `${i + 1}`);
          const tone = i % 2 === 0 ? 'sky' : 'red';
          const isRed = tone === 'red';

          return (
            <div
              key={card.id ?? card.documentId ?? `mobile-card-${i}`}
              className={`flex w-full items-center gap-4 rounded-[28px] border p-5 shadow-sm sm:gap-5 sm:rounded-[40px] sm:p-7 ${
                isRed
                  ? 'border-[#F01424] bg-[#FFF5F6]'
                  : 'border-[#2B88D9] bg-[#EEF7FE]'
              }`}
            >
              <div
                className={`flex size-16 shrink-0 items-center justify-center rounded-full sm:size-24 ${
                  isRed ? 'bg-[#FFD8DB]' : 'bg-[#C8E7FB]'
                }`}
              >
                <StepIcon number={stepNum} tone={tone} iconUrl={card.icon?.url} title={card.title} />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className={`block font-sans text-[16px] font-bold sm:text-[18px] ${
                    isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'
                  }`}
                >
                  {stepNum}
                </span>
                <h3
                  className={`my-0.5 font-sans text-[clamp(1.15rem,1rem+0.6vw,1.625rem)] font-bold ${
                    isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'
                  }`}
                >
                  {card.title}
                </h3>
                <p className="font-sans text-[clamp(0.9rem,0.85rem+0.25vw,1rem)] leading-[1.4] text-[#212121]">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WorkforcePlanningSection;
