'use client';

import React from 'react';

export interface WorkforceSupportCard {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
  actionTone?: string | null;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  icon?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface WorkforceSupportSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  cards?: WorkforceSupportCard[] | null;
}

// Default 3 cards matching exact Figma Frame 2147226469 specifications
const DEFAULT_CARDS: WorkforceSupportCard[] = [
  {
    number: '01',
    title: 'Federal Government',
    description:
      'Healthcare staffing and workforce delivery support for federal agencies, defense-related programs, veterans’ services, and national healthcare missions.',
    image: {
      url: '/images/Federal & Military.png',
      alternativeText: 'Federal Government Healthcare Staffing',
    },
  },
  {
    number: '02',
    title: 'State & Local Government',
    description:
      'Flexible workforce solutions for state, county, municipal, and community healthcare programs.',
    image: {
      url: '/images/State & Local.png',
      alternativeText: 'State & Local Healthcare Workforce',
    },
  },
  {
    number: '03',
    title: 'Healthcare Organizations',
    description:
      'Clinical and operational workforce support for hospitals, clinics, healthcare networks, laboratories, and specialty programs.',
    image: {
      url: '/images/confident-healthcare-team.png',
      alternativeText: 'Healthcare Organizations Workforce',
    },
  },
];

export function WorkforceSupportSection({
  title = 'Workforce support where it matters most.',
  highlightTitle,
  cards,
}: WorkforceSupportSectionProps) {
  const displayCards: WorkforceSupportCard[] = cards && cards.length > 0 ? cards : DEFAULT_CARDS;

  // Title rendering logic: renders highlighted phrase if provided, or defaults to Brand Red (#F01424) as per Figma
  const renderTitle = () => {
    const rawTitle = title?.trim() || 'Workforce support where it matters most.';
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
      aria-label={title || 'Workforce support where it matters most.'}
      className="relative mx-auto w-full max-w-[1920px] bg-[#FAFAFA] overflow-hidden py-12 xl:py-[80px] px-page"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/images/isolation-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1680px] mx-auto">
        {/* Title: 72px DM Serif Text, fluid clamp for 100% and 125% OS zoom */}
        <div className="mb-10 xl:mb-[60px] max-w-[1336px]">
          <h2
            className="font-serif text-[clamp(2.25rem,1.5rem+2.6vw,4.5rem)] leading-[1.15] xl:leading-[86px] font-normal tracking-tight"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {renderTitle()}
          </h2>
        </div>

        {/* 3 Cards Grid: Responsive across 100% & 125% zoom (1200px - 1920px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 xl:gap-8 justify-items-center w-full">
          {displayCards.map((card, index) => {
            const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
            const isTextTop = index % 2 === 1;

            const imageSrc =
              card.image?.url ||
              (index === 0
                ? '/images/Federal & Military.png'
                : index === 1
                ? '/images/State & Local.png'
                : '/images/confident-healthcare-team.png');

            return (
              <div
                key={card.id ?? card.documentId ?? `support-card-${index}`}
                className="flex w-full min-w-0 max-w-[544px] flex-col justify-start overflow-hidden rounded-[20px] border border-[#F01424] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 md:min-h-[520px] md:justify-between xl:min-h-[568px] xl:p-[25px]"
              >
                {isTextTop ? (
                  <>
                    {/* TEXT BLOCK TOP (Card 02 style) */}
                    <div className="flex flex-col w-full">
                      {/* Top Row: Title (Left) + Red Number Circle (Right) */}
                      <div className="flex items-start justify-between gap-3 mb-3 xl:mb-4">
                        <h3
                          className="font-serif text-[clamp(1.5rem,1.3rem+0.8vw,2.375rem)] leading-[1.2] font-normal text-[#000000] flex-1"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {card.title}
                        </h3>
                        {/* Red Number Circle: 44px - 48px */}
                        <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#F01424] shrink-0 flex items-center justify-center shadow-sm">
                          <span className="font-sans font-bold text-white text-[18px] xl:text-[24px] leading-none">
                            {stepNum}
                          </span>
                        </div>
                      </div>

                      {/* Description Text */}
                      <p className="mb-5 line-clamp-4 min-w-0 break-words font-sans text-[clamp(1rem,0.92rem+0.3vw,1.375rem)] font-normal leading-[1.5] text-[#000000] xl:leading-[1.6]">
                        {card.description}
                      </p>
                    </div>

                    {/* IMAGE BOTTOM (Card 02 style: radius 10px) */}
                    <div className="w-full h-[240px] sm:h-[270px] xl:h-[290px] rounded-[10px] overflow-hidden shrink-0 mt-auto bg-gray-100">
                      <img
                        src={imageSrc}
                        alt={card.image?.alternativeText || card.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* IMAGE TOP (Card 01 & 03 style: radius 10px) */}
                    <div className="w-full h-[240px] sm:h-[270px] xl:h-[290px] rounded-[10px] overflow-hidden shrink-0 mb-5 bg-gray-100">
                      <img
                        src={imageSrc}
                        alt={card.image?.alternativeText || card.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* TEXT BLOCK BOTTOM (Card 01 & 03 style) */}
                    <div className="flex flex-col w-full mt-auto">
                      {/* Row: Title (Left) + Red Number Circle (Right) */}
                      <div className="flex items-start justify-between gap-3 mb-3 xl:mb-4">
                        <h3
                          className="font-serif text-[clamp(1.5rem,1.3rem+0.8vw,2.375rem)] leading-[1.2] font-normal text-[#000000] flex-1"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {card.title}
                        </h3>
                        {/* Red Number Circle */}
                        <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#F01424] shrink-0 flex items-center justify-center shadow-sm">
                          <span className="font-sans font-bold text-white text-[18px] xl:text-[24px] leading-none">
                            {stepNum}
                          </span>
                        </div>
                      </div>

                      {/* Description Text */}
                      <p className="line-clamp-4 min-w-0 break-words font-sans text-[clamp(1rem,0.92rem+0.3vw,1.375rem)] font-normal leading-[1.5] text-[#000000] xl:leading-[1.6]">
                        {card.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
