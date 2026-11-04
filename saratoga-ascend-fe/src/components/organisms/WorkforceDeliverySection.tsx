'use client';

import React from 'react';

export interface WorkforceDeliveryCard {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface WorkforceDeliverySectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  cards?: WorkforceDeliveryCard[] | null;
}

// 6 default steps matching exact Figma Frame 2147226538
const DEFAULT_STEPS: WorkforceDeliveryCard[] = [
  {
    number: '01',
    title: 'Credentialing & Verification',
    description: 'Support for qualification review, documentation, and readiness coordination.',
    image: {
      url: '/images/supporting-missions-doctor.png',
      alternativeText: 'Credentialing & Verification',
    },
  },
  {
    number: '02',
    title: 'Compliance Support',
    description: 'Workforce processes aligned with contractual, operational, and organizational requirements.',
    image: {
      url: '/images/healthcare-team.png',
      alternativeText: 'Compliance Support',
    },
  },
  {
    number: '03',
    title: 'Continuity & Communication',
    description: 'Structured coordination to support reliable workforce performance and service continuity.',
    image: {
      url: '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
      alternativeText: 'Continuity & Communication',
    },
  },
  {
    number: '04',
    title: 'Scalable Delivery',
    description: 'Flexible models designed for planned growth, surge demand, and changing program needs.',
    image: {
      url: '/images/confident-healthcare-team.png',
      alternativeText: 'Scalable Delivery',
    },
  },
  {
    number: '05',
    title: 'Performance Visibility',
    description: 'Ongoing communication and reporting to support workforce oversight.',
    image: {
      url: '/images/pharmacist-portrait.png',
      alternativeText: 'Performance Visibility',
    },
  },
  {
    number: '06',
    title: 'Continuous Improvement',
    description: 'Feedback and operational insights inform better workforce delivery over time.',
    image: {
      url: '/images/future-doctor.png',
      alternativeText: 'Continuous Improvement',
    },
  },
];

// Reusable SVG Dashed Capsule Container with fluid responsive sizing for 100% and 125% scales
function DashedCapsuleBox({
  title,
  description,
  isFlipped = false,
}: {
  title: string;
  description: string;
  isFlipped?: boolean;
}) {
  return (
    <div
      className="relative flex flex-col justify-between w-full max-w-[674px] min-h-[290px] xl:min-h-[316px] p-5 xl:p-[26px]"
    >
      {/* Exact SVG border with strokeDasharray="13.22 13.22", opacity 0.8 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 674.22 315.96"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: isFlipped ? 'matrix(-1, 0, 0, 1, 0, 0)' : 'none',
        }}
      >
        <rect
          x="0.66"
          y="0.66"
          width="672.9"
          height="314.64"
          rx="47.59"
          stroke="#022E4C"
          strokeWidth="1.32"
          strokeDasharray="13.22 13.22"
          opacity="0.8"
        />
      </svg>

      {/* Top Header: t1 (Title: fluid font scale) */}
      <div className="relative z-10 w-full pt-1">
        <h3
          className="font-serif text-[clamp(1.75rem,1.4rem+1vw,2.75rem)] leading-[1.2] font-normal text-[#212121]"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {title}
        </h3>
      </div>

      {/* Bottom Inner Capsule: t2 (Description Box: bg #E4EBF1, border #2B88D9, radius 42.3px) */}
      <div
        className="relative z-10 w-full flex items-center bg-[#E4EBF1] rounded-[36px] xl:rounded-[42.3px] border border-[#2B88D9] px-6 xl:px-8 py-4 xl:py-5 min-h-[140px] xl:min-h-[166px]"
      >
        <p className="font-sans text-[clamp(1rem,0.9rem+0.35vw,1.375rem)] leading-[1.45] xl:leading-[1.6] text-black font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

export function WorkforceDeliverySection({
  title = 'Workforce delivery built on accountability.',
  highlightTitle,
  cards,
}: WorkforceDeliverySectionProps) {
  const displayCards: WorkforceDeliveryCard[] = cards && cards.length > 0 ? cards : DEFAULT_STEPS;

  // Title rendering logic: supports highlighted text in Brand Red (#F01424)
  const renderTitle = () => {
    const rawTitle = title?.trim() || 'Workforce delivery built on accountability.';
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
      aria-label={title || 'Workforce delivery built on accountability.'}
      className="relative mx-auto w-full max-w-[1920px] bg-white py-12 xl:py-[80px] px-page overflow-hidden"
    >
      {/* Header Container (Group 2085665728: fluid clamp matching standard design system) */}
      <div className="w-full mb-10 xl:mb-[80px] max-w-[1354px]">
        <h2
          className="font-serif text-[clamp(2.25rem,1.5rem+2.6vw,4.5rem)] leading-[1.15] font-normal tracking-tight"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {renderTitle()}
        </h2>
      </div>

      {/* --- DESKTOP ZIGZAG TIMELINE VIEW (>= 1280px) --- */}
      <div className="relative hidden xl:flex flex-col w-full max-w-[1411px] mx-auto py-2">
        {displayCards.map((card, index) => {
          const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
          const isLeftText = index % 2 === 0;
          const isNotLast = index < displayCards.length - 1;

          const defaultImg =
            index === 0
              ? '/images/supporting-missions-doctor.png'
              : index === 1
              ? '/images/healthcare-team.png'
              : index === 2
              ? '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png'
              : index === 3
              ? '/images/confident-healthcare-team.png'
              : index === 4
              ? '/images/pharmacist-portrait.png'
              : '/images/future-doctor.png';

          const imageSrc = card.image?.url || defaultImg;

          return (
            <div key={card.id ?? card.documentId ?? `delivery-step-${index}`} className="relative w-full">
              {/* MAIN STEP ROW */}
              <div className="relative w-full flex items-center justify-between min-h-[460px] xl:min-h-[505px] py-4">
                {isLeftText ? (
                  <>
                    {/* LEFT CONTENT: Vertical Blue Capsule + Dashed Box */}
                    <div className="relative z-10 flex items-center shrink-0 gap-4 xl:gap-6 w-[62%] max-w-[780px]">
                      {/* Vertical Blue Capsule */}
                      <div
                        className="relative z-20 shrink-0 bg-[#2B88D9] flex flex-col items-center justify-center shadow-sm w-[74px] xl:w-[85px] h-[220px] xl:h-[250px] rounded-[36px] xl:rounded-[42.3px] border border-[#212121]"
                      >
                        <span
                          className="font-serif text-[34px] xl:text-[44px] leading-none text-white font-normal"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {stepNum}
                        </span>
                      </div>

                      {/* Dashed Capsule Box (Flipped for left-side) */}
                      <DashedCapsuleBox
                        title={card.title}
                        description={card.description}
                        isFlipped={true}
                      />
                    </div>

                    {/* RIGHT: Circular Image */}
                    <div
                      className="relative z-10 shrink-0 rounded-full overflow-hidden shadow-xl bg-gray-100 w-[420px] xl:w-[505px] h-[420px] xl:h-[505px] border border-[#022E4C]"
                    >
                      <img
                        src={imageSrc}
                        alt={card.image?.alternativeText || card.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* LEFT: Circular Image */}
                    <div
                      className="relative z-10 shrink-0 rounded-full overflow-hidden shadow-xl bg-gray-100 w-[420px] xl:w-[505px] h-[420px] xl:h-[505px] border border-[#022E4C]"
                    >
                      <img
                        src={imageSrc}
                        alt={card.image?.alternativeText || card.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* RIGHT CONTENT: Vertical Blue Capsule + Dashed Box */}
                    <div className="relative z-10 flex items-center shrink-0 gap-4 xl:gap-6 w-[62%] max-w-[780px]">
                      {/* Vertical Blue Capsule */}
                      <div
                        className="relative z-20 shrink-0 bg-[#2B88D9] flex flex-col items-center justify-center shadow-sm w-[74px] xl:w-[85px] h-[220px] xl:h-[250px] rounded-[36px] xl:rounded-[42.3px] border border-[#212121]"
                      >
                        <span
                          className="font-serif text-[34px] xl:text-[44px] leading-none text-white font-normal"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {stepNum}
                        </span>
                      </div>

                      {/* Dashed Capsule Box (Normal orientation) */}
                      <DashedCapsuleBox
                        title={card.title}
                        description={card.description}
                        isFlipped={false}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* CONNECTING DASHED S-CURVE PIPELINE (Between Steps) */}
              {isNotLast && (
                <div className="relative w-full h-[120px] xl:h-[140px] pointer-events-none select-none my-[-15px]">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 1411 140"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isLeftText ? (
                      <path
                        d="M 1158 0 C 1158 75, 252 65, 252 140"
                        stroke="#022E4C"
                        strokeWidth="1.32"
                        strokeDasharray="13.22 13.22"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    ) : (
                      <path
                        d="M 252 0 C 252 75, 1158 65, 1158 140"
                        stroke="#022E4C"
                        strokeWidth="1.32"
                        strokeDasharray="13.22 13.22"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    )}
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- TABLET VIEW (768px - 1279px) --- */}
      <div className="hidden md:flex xl:hidden flex-col gap-16 w-full max-w-[850px] mx-auto py-4">
        {displayCards.map((card, index) => {
          const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
          const isLeft = index % 2 === 0;
          const defaultImg =
            index === 0
              ? '/images/supporting-missions-doctor.png'
              : index === 1
              ? '/images/healthcare-team.png'
              : index === 2
              ? '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png'
              : index === 3
              ? '/images/confident-healthcare-team.png'
              : index === 4
              ? '/images/pharmacist-portrait.png'
              : '/images/future-doctor.png';

          const imageSrc = card.image?.url || defaultImg;

          return (
            <div
              key={card.id ?? card.documentId ?? `tablet-step-${index}`}
              className={`flex items-center gap-8 w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Circular Image */}
              <div className="w-[300px] h-[300px] shrink-0 rounded-full border border-[#022E4C] overflow-hidden shadow-lg bg-gray-100">
                <img
                  src={imageSrc}
                  alt={card.image?.alternativeText || card.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content Pill Stack */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#2B88D9] border border-[#212121] flex items-center justify-center shrink-0">
                    <span
                      className="font-serif text-[22px] text-white font-normal"
                      style={{ fontFamily: "'DM Serif Text', serif" }}
                    >
                      {stepNum}
                    </span>
                  </div>
                  <h3
                    className="font-serif text-[28px] leading-[1.2] font-normal text-[#212121]"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {card.title}
                  </h3>
                </div>

                <div className="w-full rounded-[28px] bg-[#E4EBF1] border border-[#2B88D9] p-6">
                  <p className="font-sans text-[18px] leading-[28px] text-black font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MOBILE VIEW (< 768px) --- */}
      <div className="md:hidden flex flex-col gap-12 w-full max-w-[500px] mx-auto">
        {displayCards.map((card, index) => {
          const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
          const defaultImg =
            index === 0
              ? '/images/supporting-missions-doctor.png'
              : index === 1
              ? '/images/healthcare-team.png'
              : index === 2
              ? '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png'
              : index === 3
              ? '/images/confident-healthcare-team.png'
              : index === 4
              ? '/images/pharmacist-portrait.png'
              : '/images/future-doctor.png';

          const imageSrc = card.image?.url || defaultImg;

          return (
            <div
              key={card.id ?? card.documentId ?? `mobile-step-${index}`}
              className="flex flex-col items-center gap-6 w-full"
            >
              {/* Circular Image */}
              <div className="w-[260px] h-[260px] rounded-full border border-[#022E4C] overflow-hidden shadow-lg bg-gray-100">
                <img
                  src={imageSrc}
                  alt={card.image?.alternativeText || card.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Step Number + Title */}
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 rounded-full bg-[#2B88D9] border border-[#212121] flex items-center justify-center shrink-0">
                  <span
                    className="font-serif text-[22px] text-white font-normal"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {stepNum}
                  </span>
                </div>
                <h3
                  className="font-serif text-[24px] leading-[1.2] font-normal text-[#212121]"
                  style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Description Capsule */}
              <div className="w-full rounded-[24px] bg-[#E4EBF1] border border-[#2B88D9] p-5">
                <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-black font-normal">
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
