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
  const activeSteps = steps.slice(0, 4);

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
      {/* HEADER SECTION (Group 2608667: max-w 1290px) */}
      <div className="flex flex-col max-w-[1290px] mb-12 xl:mb-[72px]">
        {/* Title: 72px Google Sans Flex, weight 600, line-height 90px */}
        <h2 className="font-sans font-semibold text-[clamp(2.25rem,1.4rem+2.6vw,4.5rem)] leading-[1.15] xl:leading-[90px] tracking-tight text-[#000000]">
          {renderTitle()}
        </h2>

        {/* Description: 24px Google Sans Flex, line-height 40px (167%) */}
        {description ? (
          <p className="font-sans font-normal text-[clamp(1.125rem,0.95rem+0.4vw,1.5rem)] leading-[1.5] xl:leading-[40px] text-[#000000] mt-4 xl:mt-[12px] max-w-[1290px]">
            {description}
          </p>
        ) : null}
      </div>

      {/* --- DESKTOP FLUID TIMELINE (>= 1280px) --- */}
      {/* 
        NO fixed horizontal scroll! Uses fluid flex layout with flex-1 cards
        and flexible connecting bridges so it fits 100%, 125%, and 150% scales 
        without scrollbars or clipping.
      */}
      <div className="hidden xl:flex items-start justify-between w-full max-w-[1680px] mx-auto min-h-[430px]">
        {activeSteps.map((step, idx) => {
          const stepNum = step.number || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);
          const isFirst = idx === 0;
          const isLast = idx === activeSteps.length - 1;
          const defaultImg =
            idx === 0
              ? '/images/supporting-missions-doctor.png'
              : idx === 1
              ? '/images/healthcare-team.png'
              : idx === 2
              ? '/images/confident-healthcare-team.png'
              : '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png';

          const imageSrc = step.image?.url || defaultImg;

          return (
            <React.Fragment key={step.id ?? step.documentId ?? `step-${idx}`}>
              {/* STEP CARD COLUMN: Width scales gracefully between xl and 2xl */}
              <div className="flex flex-col w-[226px] 2xl:w-[240px] shrink-0">
                {/* TOP ROW: Badge (77px) + Photo (206px x 206px) + Arc (226px x 113px) */}
                <div className="relative w-[226px] h-[236px]">
                  {/* Semicircle Arc: 226px x 113px, border: 1.5px solid #000000 (Figma Ellipse 12761) */}
                  <svg
                    className="absolute left-0 top-[20px] w-[226px] h-[113px] pointer-events-none z-10 overflow-visible"
                    viewBox="0 0 226 113"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* First Step Left Red Dot (Ellipse 12772: #D21F2E) */}
                    {isFirst && <circle cx="0" cy="113" r="4" fill="#D21F2E" />}

                    {/* Semicircle Arc with 1.5px solid #000000 border */}
                    <path
                      d="M 0.75 113 A 112.25 112.25 0 0 1 225.25 113"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    {/* Last Step Right Blue Dot (Ellipse 12773: #2F8ED7) */}
                    {isLast && <circle cx="226" cy="113" r="4" fill="#2F8ED7" />}
                  </svg>

                  {/* Floating Number Badge: Ellipse 12768/12769 (77px x 77px, border: 4.05px #FFFFFF, bg #E4EBF1) */}
                  <div className="absolute left-0 top-0 w-[77px] h-[77px] rounded-full bg-[#E4EBF1] border-[4px] border-white shadow-sm flex items-center justify-center z-30">
                    <span
                      className="font-serif text-[34px] 2xl:text-[38px] leading-[52px] text-[#000000] font-normal"
                      style={{ fontFamily: "'DM Serif Text', serif" }}
                    >
                      {stepNum}
                    </span>
                  </div>

                  {/* Circular Photo: Ellipse 12757 (206px x 206px, centered under arc) */}
                  <div className="absolute left-[10px] top-[30px] w-[206px] h-[206px] rounded-full overflow-hidden shadow-md bg-gray-100 z-20 border-[1.5px] border-white">
                    <img
                      src={imageSrc}
                      alt={step.image?.alternativeText || step.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* BOTTOM CONTENT: Title + 90px Divider Bar + Description */}
                <div className="flex flex-col mt-[16px] pl-[10px] w-full">
                  {/* Step Title: 28px DM Serif Text, line-height 28px, color #2F2F2F */}
                  <h3
                    className="font-serif text-[22px] 2xl:text-[28px] leading-[1.15] font-normal text-[#2F2F2F] min-h-[56px] flex items-center"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {step.title}
                  </h3>

                  {/* Vector 7218-7221: 90px width black hairline divider (border: 1px solid #000000) */}
                  <div className="w-[90px] h-[1px] bg-black my-[16px] shrink-0" aria-hidden="true" />

                  {/* Step Description: 20px Google Sans Flex, line-height 28px (140%), color #212121, weight 300 */}
                  <p className="font-sans font-light text-[16px] 2xl:text-[20px] leading-[24px] 2xl:leading-[28px] text-[#212121]">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* INTERMEDIATE FLUID CONNECTOR + ARROW (Only between active cards) */}
              {!isLast && (
                <div className="flex items-center justify-center h-[236px] flex-1 min-w-[60px] max-w-[215px] px-1 shrink">
                  <div className="relative flex items-center justify-center w-full">
                    {/* Connecting line: border: 1.5px solid #000000 (Vector 7215/7216/7217) */}
                    <div
                      className="absolute left-0 right-0 h-[1.5px] bg-[#000000] top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />

                    {/* Circular White Arrow Button (Ellipse 12769/12770/12771: 54px x 54px, shadow 15px) */}
                    <div className="relative z-20 w-[48px] 2xl:w-[54px] h-[48px] 2xl:h-[54px] rounded-full bg-white shadow-[0_0_15px_rgba(0,0,0,0.25)] flex items-center justify-center border border-slate-100 shrink-0">
                      <svg
                        className="w-5 h-5 text-[#141B34]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* --- TABLET VIEW (768px - 1279px) --- */}
      <div className="hidden md:grid xl:hidden grid-cols-2 gap-10 w-full max-w-[900px] mx-auto">
        {activeSteps.map((step, idx) => {
          const stepNum = step.number || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);
          const defaultImg =
            idx === 0
              ? '/images/supporting-missions-doctor.png'
              : idx === 1
              ? '/images/healthcare-team.png'
              : idx === 2
              ? '/images/confident-healthcare-team.png'
              : '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png';

          const imageSrc = step.image?.url || defaultImg;

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
        {activeSteps.map((step, idx) => {
          const stepNum = step.number || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);
          const defaultImg =
            idx === 0
              ? '/images/supporting-missions-doctor.png'
              : idx === 1
              ? '/images/healthcare-team.png'
              : idx === 2
              ? '/images/confident-healthcare-team.png'
              : '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png';

          const imageSrc = step.image?.url || defaultImg;

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
