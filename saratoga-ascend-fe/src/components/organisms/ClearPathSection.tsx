'use client';

import React from 'react';

export interface ClearPathStepItem {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  icon?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface ClearPathSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  cards?: ClearPathStepItem[] | null;
}

// 4 Default Steps matching exact Figma Frame 2147226555
const DEFAULT_STEPS: ClearPathStepItem[] = [
  {
    number: '01',
    title: 'Understand the Requirement',
    description: 'Clarify mission context, scope, and desired outcomes.',
    image: {
      url: '/images/supporting-missions-doctor.png',
      alternativeText: 'Understand the Requirement',
    },
  },
  {
    number: '02',
    title: 'Align Capabilities',
    description: 'Identify relevant service areas and delivery needs.',
    image: {
      url: '/images/healthcare-team.png',
      alternativeText: 'Align Capabilities',
    },
  },
  {
    number: '03',
    title: 'Define the Approach',
    description: 'Discuss an approach aligned to the requirement.',
    image: {
      url: '/images/confident-healthcare-team.png',
      alternativeText: 'Define the Approach',
    },
  },
  {
    number: '04',
    title: 'Support Delivery',
    description: 'Coordinate around agreed responsibilities and expectations.',
    image: {
      url: '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
      alternativeText: 'Support Delivery',
    },
  },
];

export function ClearPathSection({
  title = 'A Clear Path from Need to Delivery',
  highlightTitle = 'Need to Delivery',
  description = 'We begin by understanding the mission, operating context, scope, and desired outcomes—then identify the capabilities and delivery approach that best fit the requirement.',
  cards,
}: ClearPathSectionProps) {
  const steps = cards && cards.length > 0 ? cards : DEFAULT_STEPS;

  // Title highlighter helper: Highlights designated text (default "Need to Delivery") in Brand Red (#F01424)
  const renderTitle = () => {
    const rawTitle = title || 'A Clear Path from Need to Delivery';
    const highlight = highlightTitle?.trim() || 'Need to Delivery';

    if (!highlight) {
      return <span className="text-[#000000]">{rawTitle}</span>;
    }

    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
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
        <span className="text-[#000000]">{rawTitle} </span>
        <span className="text-[#F01424]">{highlight}</span>
      </>
    );
  };

  return (
    <section
      aria-label={title || 'A Clear Path from Need to Delivery'}
      className="relative mx-auto w-full max-w-[1920px] bg-white py-12 xl:py-[80px] px-6 sm:px-10 lg:px-16 2xl:px-[120px] overflow-hidden"
    >
      {/* HEADER SECTION (Group 2608667) */}
      <div className="flex flex-col max-w-[1290px] mb-12 xl:mb-[72px]">
        {/* Title: 72px Google Sans Flex (fluid scale clamp) */}
        <h2
          className="font-sans font-semibold text-[clamp(2.25rem,1.4rem+2.6vw,4.5rem)] leading-[1.15] xl:leading-[90px] tracking-tight"
        >
          {renderTitle()}
        </h2>

        {/* Description: 24px Google Sans Flex, line-height 40px (167%) */}
        {description ? (
          <p className="font-sans font-normal text-[clamp(1.125rem,0.95rem+0.4vw,1.5rem)] leading-[1.5] xl:leading-[40px] text-[#000000] mt-4 xl:mt-[12px] max-w-[1290px]">
            {description}
          </p>
        ) : null}
      </div>

      {/* --- DESKTOP 4-STEP TIMELINE TRACK (>= 1280px) --- */}
      <div className="hidden xl:block relative w-full max-w-[1616px] mx-auto min-h-[430px]">
        
        {/* CONTINUOUS PIPELINE SVG (Gradient Track + Semicircle Arcs + Arrows + Connecting Lines) */}
        <svg
          className="absolute inset-0 w-full h-[430px] pointer-events-none select-none z-0"
          viewBox="0 0 1616 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Linear Brand Gradient */}
            <linearGradient id="clearPathBrandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0.47%" stopColor="#D31E2D" />
              <stop offset="100%" stopColor="#2A91DC" />
            </linearGradient>

            {/* Drop Shadow filter for circular arrow nodes */}
            <filter id="arrowDropShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="7.5" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Left starting red anchor dot (Ellipse 12772: 8px) */}
          <circle cx="8" cy="132" r="4" fill="#D21F2E" />

          {/* Right terminating blue anchor dot (Ellipse 12773: 8px) */}
          <circle cx="1550" cy="132" r="4" fill="#2F8ED7" />

          {/* Semicircle Upper Arc Step 1 (around Step 1 circle) */}
          <path
            d="M 12 132 A 113 113 0 0 1 238 132"
            stroke="url(#clearPathBrandGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Vector 7215: Horizontal connecting line 1 -> 2 */}
          <line
            x1="238"
            y1="132"
            x2="452"
            y2="132"
            stroke="url(#clearPathBrandGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Semicircle Upper Arc Step 2 */}
          <path
            d="M 452 132 A 113 113 0 0 1 678 132"
            stroke="url(#clearPathBrandGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Vector 7216: Horizontal connecting line 2 -> 3 */}
          <line
            x1="678"
            y1="132"
            x2="892"
            y2="132"
            stroke="url(#clearPathBrandGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Semicircle Upper Arc Step 3 */}
          <path
            d="M 892 132 A 113 113 0 0 1 1118 132"
            stroke="url(#clearPathBrandGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Vector 7217: Horizontal connecting line 3 -> 4 */}
          <line
            x1="1118"
            y1="132"
            x2="1324"
            y2="132"
            stroke="url(#clearPathBrandGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Semicircle Upper Arc Step 4 */}
          <path
            d="M 1324 132 A 113 113 0 0 1 1550 132"
            stroke="url(#clearPathBrandGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* 4 STEP COLUMNS */}
        <div className="relative z-10 grid grid-cols-4 w-full gap-4 2xl:gap-8">
          {steps.slice(0, 4).map((step, idx) => {
            const stepNum = step.number || `0${idx + 1}`;
            const imageSrc =
              step.image?.url ||
              (idx === 0
                ? '/images/supporting-missions-doctor.png'
                : idx === 1
                ? '/images/healthcare-team.png'
                : idx === 2
                ? '/images/confident-healthcare-team.png'
                : '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png');

            return (
              <div key={step.id ?? step.documentId ?? `step-${idx}`} className="relative flex flex-col">
                {/* TOP ROW: Circular Photo (206px) + Floating Number Badge (77px) + Intermediate Arrow Node */}
                <div className="relative w-full h-[236px]">
                  {/* Floating Number Badge: Ellipse 12768/12769 (77px x 77px, bg #E4EBF1, border 4px white) */}
                  <div
                    className="absolute left-0 top-0 w-[77px] h-[77px] rounded-full bg-[#E4EBF1] border-[4px] border-white shadow-sm flex items-center justify-center z-30"
                  >
                    <span
                      className="font-serif text-[34px] xl:text-[38px] leading-none text-[#000000] font-normal"
                      style={{ fontFamily: "'DM Serif Text', serif" }}
                    >
                      {stepNum}
                    </span>
                  </div>

                  {/* Circular Image Container: Ellipse 12757 (206px x 206px, top: 30px) */}
                  <div
                    className="absolute left-[10px] top-[30px] w-[206px] h-[206px] rounded-full overflow-hidden shadow-md bg-gray-100 z-20 border-[2px] border-white/60"
                  >
                    <img
                      src={imageSrc}
                      alt={step.image?.alternativeText || step.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Intermediate Arrow Node (between Step 1-2, 2-3, 3-4): Ellipse 54px with white bg + shadow */}
                  {idx < 3 && (
                    <div
                      className="absolute right-[-15px] 2xl:right-[-20px] top-[105px] w-[54px] h-[54px] rounded-full bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] flex items-center justify-center z-30 border border-slate-100 pointer-events-none"
                    >
                      {/* Arrow Right icon */}
                      <svg
                        className="w-5 h-5 text-[#141B34]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* BOTTOM CONTENT: Title + 90px Divider Bar + Description */}
                <div className="flex flex-col mt-6 pl-[10px] max-w-[340px]">
                  {/* Step Title: 28px DM Serif Text, color #2F2F2F */}
                  <h3
                    className="font-serif text-[24px] xl:text-[28px] leading-[1.15] font-normal text-[#2F2F2F] min-h-[56px] flex items-center"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {step.title}
                  </h3>

                  {/* Vector 7218/7219/7220/7221: 90px width black hairline divider */}
                  <div className="w-[90px] h-[1px] bg-black my-4 shrink-0" aria-hidden="true" />

                  {/* Step Description: 20px Google Sans Flex (Off Black #212121, weight 300) */}
                  <p className="font-sans font-light text-[17px] xl:text-[20px] leading-[26px] xl:leading-[28px] text-[#212121]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- TABLET VIEW (768px - 1279px) --- */}
      <div className="hidden md:grid xl:hidden grid-cols-2 gap-10 w-full max-w-[900px] mx-auto">
        {steps.map((step, idx) => {
          const stepNum = step.number || `0${idx + 1}`;
          const imageSrc =
            step.image?.url ||
            (idx === 0
              ? '/images/supporting-missions-doctor.png'
              : idx === 1
              ? '/images/healthcare-team.png'
              : idx === 2
              ? '/images/confident-healthcare-team.png'
              : '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png');

          return (
            <div
              key={step.id ?? step.documentId ?? `tablet-step-${idx}`}
              className="flex flex-col bg-slate-50/70 p-6 rounded-[24px] border border-slate-200/80 shadow-sm"
            >
              <div className="relative w-full flex items-center justify-between mb-4">
                <div className="w-[64px] h-[64px] rounded-full bg-[#E4EBF1] border-2 border-white shadow-sm flex items-center justify-center">
                  <span
                    className="font-serif text-[28px] text-[#000000] font-normal"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {stepNum}
                  </span>
                </div>
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden shadow-md">
                  <img
                    src={imageSrc}
                    alt={step.image?.alternativeText || step.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <h3
                className="font-serif text-[22px] leading-[1.2] font-normal text-[#2F2F2F] mt-2 mb-3"
                style={{ fontFamily: "'DM Serif Text', serif" }}
              >
                {step.title}
              </h3>
              <div className="w-[70px] h-[1px] bg-black mb-3 shrink-0" aria-hidden="true" />
              <p className="font-sans font-light text-[16px] leading-[24px] text-[#212121]">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* --- MOBILE VIEW (< 768px) --- */}
      <div className="md:hidden flex flex-col gap-8 w-full max-w-[480px] mx-auto">
        {steps.map((step, idx) => {
          const stepNum = step.number || `0${idx + 1}`;
          const imageSrc =
            step.image?.url ||
            (idx === 0
              ? '/images/supporting-missions-doctor.png'
              : idx === 1
              ? '/images/healthcare-team.png'
              : idx === 2
              ? '/images/confident-healthcare-team.png'
              : '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png');

          return (
            <div
              key={step.id ?? step.documentId ?? `mobile-step-${idx}`}
              className="flex flex-col bg-white p-5 rounded-[20px] border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-[56px] h-[56px] rounded-full bg-[#E4EBF1] border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                  <span
                    className="font-serif text-[24px] text-[#000000] font-normal"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {stepNum}
                  </span>
                </div>
                <div className="w-[84px] h-[84px] rounded-full overflow-hidden shadow-md shrink-0">
                  <img
                    src={imageSrc}
                    alt={step.image?.alternativeText || step.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <h3
                className="font-serif text-[20px] leading-[1.2] font-normal text-[#2F2F2F] mb-2"
                style={{ fontFamily: "'DM Serif Text', serif" }}
              >
                {step.title}
              </h3>
              <div className="w-[60px] h-[1px] bg-black mb-3 shrink-0" aria-hidden="true" />
              <p className="font-sans font-light text-[15px] leading-[22px] text-[#212121]">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

