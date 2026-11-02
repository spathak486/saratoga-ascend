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
  // Alternate tones naturally: Left side (01 Blue, 04 Red), Right side (02 Red, 03 Blue)
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
    // 01 / Stethoscope / Clinical assessment icon
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.4A2.4 2.4 0 0 0 2.4 4.8v4.8a7.2 7.2 0 0 0 14.4 0V4.8a2.4 2.4 0 0 0-2.4-2.4" />
        <path d="M9.6 16.8v1.2a4.8 4.8 0 0 0 9.6 0v-2.4" />
        <circle cx="19.2" cy="13.2" r="2.4" />
      </svg>
    );
  }

  if (numInt % 4 === 2) {
    // 02 / Database / Planning icon
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    );
  }

  if (numInt % 4 === 3) {
    // 03 / Team / Deploy icon
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  // 04 / Communication / Support icon
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function WorkforcePlanningSection({
  title = 'From Workforce Planning to Ongoing Support',
  variant = 'orbital',
  centerImage,
  cards,
}: WorkforcePlanningSectionProps) {
  const displayCards: WorkflowCardItem[] =
    cards && cards.length > 0 ? cards : DEFAULT_STEPS;

  const [activeIndex, setActiveIndex] = useState(0);
  const displayTitle = title?.trim() || 'From Workforce Planning to Ongoing Support';

  const resolvedCenterImage =
    centerImage?.url || '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png';

  // --- 1. ACCORDION VARIANT ---
  if (variant === 'accordion') {
    return (
      <section className="relative mx-auto flex w-full max-w-[1920px] flex-col justify-between overflow-hidden bg-[#FFFFFF] px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:min-h-[690px] lg:px-[120px] lg:pb-[90px] lg:pt-[80px]">
        <div className="w-full">
          <div className="mb-14 sm:mb-16 lg:mb-20 max-w-[878px]">
            <h2
              className="font-serif text-[38px] sm:text-[54px] lg:text-[72px] leading-[115%] lg:leading-[86px] tracking-normal font-normal text-[#F01424]"
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              {displayTitle}
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

  // --- 2. DYNAMIC ORBITAL VARIANT ---
  // Any number of cards (3, 4, 5, 6, 8, etc.):
  // Left Column takes first half, Right Column takes second half
  const total = displayCards.length;
  const leftCount = Math.ceil(total / 2);
  const leftCards = displayCards.slice(0, leftCount);
  const rightCards = displayCards.slice(leftCount);

  return (
    <section
      aria-label={displayTitle}
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-white py-16 lg:py-[80px] px-4 sm:px-8 xl:px-[120px]"
    >
      {/* Title */}
      <div className="w-full text-center mb-12 lg:mb-[70px]">
        <h2
          className="font-serif text-[36px] sm:text-[48px] md:text-[56px] lg:text-[72px] leading-[1.15] text-[#F01424] max-w-[1442px] mx-auto"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {displayTitle}
        </h2>
      </div>

      {/* --- DESKTOP DYNAMIC ORBITAL VIEW (>= 1280px) --- */}
      <div className="relative mx-auto hidden xl:flex items-center justify-between w-full max-w-[1680px] min-h-[580px] py-6">
        
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

        {/* CENTER ELEMENT: Portrait Circle & Orbital SVG Rings */}
        <div className="relative w-[440px] h-[440px] flex items-center justify-center shrink-0 mx-4">
          
          {/* Orbital Orbit Ring SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-[spin_60s_linear_infinite]"
            viewBox="0 0 440 440"
            fill="none"
          >
            {/* Blue Top Arc */}
            <path
              d="M 60 140 A 180 180 0 0 1 380 140"
              stroke="#2B88D9"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Red Bottom Arc */}
            <path
              d="M 60 300 A 180 180 0 0 0 380 300"
              stroke="#F01424"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Satellite Dots */}
            <circle cx="50" cy="150" r="12" fill="#2B88D9" />
            <circle cx="390" cy="150" r="12" fill="#F01424" />
            <circle cx="50" cy="290" r="12" fill="#F01424" />
            <circle cx="390" cy="290" r="12" fill="#2B88D9" />
          </svg>

          {/* Central Portrait (400px x 400px) */}
          <div className="w-[390px] h-[390px] rounded-full overflow-hidden shadow-lg z-20 border-4 border-white">
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
      <div className="xl:hidden flex flex-col gap-6 items-center w-full max-w-[650px] mx-auto">
        {/* Center portrait */}
        <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-md my-4 border-4 border-white">
          <img
            src={resolvedCenterImage}
            alt={centerImage?.alternativeText || 'Healthcare Team'}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Dynamic Cards Stack */}
        {displayCards.map((card, i) => {
          const stepNum = card.number || (i < 9 ? `0${i + 1}` : `${i + 1}`);
          const tone = i % 2 === 0 ? 'sky' : 'red';
          const isRed = tone === 'red';

          return (
            <div
              key={card.id ?? card.documentId ?? `mobile-card-${i}`}
              className={`w-full rounded-[40px] border p-6 sm:p-8 flex items-center gap-5 sm:gap-6 shadow-sm ${
                isRed
                  ? 'border-[#F01424] bg-[#FFF5F6]'
                  : 'border-[#2B88D9] bg-[#EEF7FE]'
              }`}
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full shrink-0 flex items-center justify-center ${
                  isRed ? 'bg-[#FFD8DB]' : 'bg-[#C8E7FB]'
                }`}
              >
                <StepIcon number={stepNum} tone={tone} iconUrl={card.icon?.url} title={card.title} />
              </div>
              <div>
                <span
                  className={`font-sans font-bold text-[18px] block ${
                    isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'
                  }`}
                >
                  {stepNum}
                </span>
                <h3
                  className={`font-sans font-bold text-[22px] sm:text-[26px] my-1 ${
                    isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'
                  }`}
                >
                  {card.title}
                </h3>
                <p className="font-sans text-[15px] sm:text-[16px] leading-[22px] text-[#212121]">
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
