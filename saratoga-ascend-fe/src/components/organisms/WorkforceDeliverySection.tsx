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
      className="relative mx-auto w-full max-w-[1920px] bg-white py-16 lg:py-[80px] px-6 sm:px-10 lg:px-[120px] overflow-hidden"
    >
      {/* Header Container (Group 2085665728: 1354px width, 72px DM Serif Text, Brand Red #F01424) */}
      <div className="w-full mb-14 lg:mb-[90px] max-w-[1354px]">
        <h2
          className="font-serif text-[36px] sm:text-[50px] lg:text-[72px] leading-[115%] lg:leading-[86px] font-normal tracking-tight"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {renderTitle()}
        </h2>
      </div>

      {/* --- DESKTOP ZIGZAG TIMELINE VIEW (>= 1024px) --- */}
      <div className="relative hidden lg:flex flex-col gap-[75px] w-full max-w-[1530px] mx-auto py-2">
        {displayCards.map((card, index) => {
          const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
          // Alternating side:
          // Odd steps (01, 03, 05 -> index 0, 2, 4): Text on LEFT, Image on RIGHT
          // Even steps (02, 04, 06 -> index 1, 3, 5): Image on LEFT, Text on RIGHT
          const isLeftText = index % 2 === 0;

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
              key={card.id ?? card.documentId ?? `delivery-step-${index}`}
              className="relative w-full flex items-center justify-between min-h-[505px]"
            >
              {isLeftText ? (
                <>
                  {/* LEFT: Text Content with Dashed Border Capsule & Blue Pill */}
                  <div className="relative z-10 w-[770px] xl:w-[780px] shrink-0">
                    {/* Background Dashed Capsule (Component 174 / 175) */}
                    <div
                      className="absolute -top-[32px] -left-[20px] w-[675px] h-[316px] pointer-events-none rounded-[48px] border-[1.32px] border-dashed border-[#022E4C] opacity-80"
                      aria-hidden="true"
                    />

                    {/* Content Group (Frame 2085663937): Blue Number Capsule + Title/Description */}
                    <div className="relative z-10 flex items-start gap-6">
                      {/* Frame 2085663938: Vertical Blue Capsule for Number (84.6px x 250px) */}
                      <div className="w-[85px] h-[250px] shrink-0 rounded-[42px] bg-[#2B88D9] border-[1.32px] border-[#212121] flex items-center justify-center shadow-sm">
                        <span
                          className="font-serif text-[44px] leading-[60px] text-white font-normal"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {stepNum}
                        </span>
                      </div>

                      {/* Title & Description Capsule (Frame 2085663934) */}
                      <div className="flex flex-col gap-6 flex-1 max-w-[670px]">
                        {/* Title: 44px DM Serif Text */}
                        <h3
                          className="font-serif text-[38px] xl:text-[44px] leading-[54px] xl:leading-[60px] font-normal text-[#212121]"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {card.title}
                        </h3>

                        {/* Description Box (Frame 2085663948/2085663950: bg #E4EBF1, border #2B88D9, radius 42px) */}
                        <div className="w-full min-h-[166px] rounded-[42px] bg-[#E4EBF1] border border-[#2B88D9] px-8 py-5 flex items-center">
                          <p className="font-sans text-[22px] xl:text-[24px] leading-[36px] xl:leading-[42px] text-black font-normal">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Circular Image (505px x 505px Ellipse 2167) */}
                  <div className="relative z-10 w-[460px] xl:w-[505px] h-[460px] xl:h-[505px] shrink-0 rounded-full border border-[#022E4C] overflow-hidden shadow-xl bg-gray-100">
                    <img
                      src={imageSrc}
                      alt={card.image?.alternativeText || card.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* LEFT: Circular Image (505px x 505px Ellipse 2167) */}
                  <div className="relative z-10 w-[460px] xl:w-[505px] h-[460px] xl:h-[505px] shrink-0 rounded-full border border-[#022E4C] overflow-hidden shadow-xl bg-gray-100">
                    <img
                      src={imageSrc}
                      alt={card.image?.alternativeText || card.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* RIGHT: Text Content with Dashed Border Capsule & Blue Pill */}
                  <div className="relative z-10 w-[770px] xl:w-[780px] shrink-0">
                    {/* Background Dashed Capsule (Component 171 / 172 / 173) */}
                    <div
                      className="absolute -top-[32px] -right-[20px] w-[675px] h-[316px] pointer-events-none rounded-[48px] border-[1.32px] border-dashed border-[#022E4C] opacity-80"
                      aria-hidden="true"
                    />

                    {/* Content Group (Frame 2085663936): Blue Number Capsule + Title/Description */}
                    <div className="relative z-10 flex items-start gap-6">
                      {/* Frame 2085663938: Vertical Blue Capsule for Number (84.6px x 250px) */}
                      <div className="w-[85px] h-[250px] shrink-0 rounded-[42px] bg-[#2B88D9] border-[1.32px] border-[#212121] flex items-center justify-center shadow-sm">
                        <span
                          className="font-serif text-[44px] leading-[60px] text-white font-normal"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {stepNum}
                        </span>
                      </div>

                      {/* Title & Description Capsule (Frame 2085663934) */}
                      <div className="flex flex-col gap-6 flex-1 max-w-[670px]">
                        {/* Title: 44px DM Serif Text */}
                        <h3
                          className="font-serif text-[38px] xl:text-[44px] leading-[54px] xl:leading-[60px] font-normal text-[#212121]"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {card.title}
                        </h3>

                        {/* Description Box (Frame 2085663949: bg #E4EBF1, border #2B88D9, radius 42px) */}
                        <div className="w-full min-h-[166px] rounded-[42px] bg-[#E4EBF1] border border-[#2B88D9] px-8 py-5 flex items-center">
                          <p className="font-sans text-[22px] xl:text-[24px] leading-[36px] xl:leading-[42px] text-black font-normal">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* --- MOBILE / TABLET VIEW (< 1024px) --- */}
      <div className="lg:hidden flex flex-col gap-14 w-full max-w-[600px] mx-auto">
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
              <div className="w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-[#022E4C] overflow-hidden shadow-lg bg-gray-100">
                <img
                  src={imageSrc}
                  alt={card.image?.alternativeText || card.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Step Number + Title */}
              <div className="flex items-center gap-4 w-full">
                <div className="w-14 h-14 rounded-full bg-[#2B88D9] border border-[#212121] flex items-center justify-center shrink-0">
                  <span
                    className="font-serif text-[26px] text-white font-normal"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {stepNum}
                  </span>
                </div>
                <h3
                  className="font-serif text-[26px] sm:text-[30px] leading-[1.2] font-normal text-[#212121]"
                  style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Description Capsule */}
              <div className="w-full rounded-[28px] bg-[#E4EBF1] border border-[#2B88D9] p-6">
                <p className="font-sans text-[18px] sm:text-[20px] leading-[28px] sm:leading-[32px] text-black font-normal">
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

