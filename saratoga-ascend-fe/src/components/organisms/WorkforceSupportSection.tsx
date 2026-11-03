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
      className="relative mx-auto w-full max-w-[1920px] bg-[#FAFAFA] overflow-hidden py-16 lg:py-[80px] px-6 sm:px-10 lg:px-[120px]"
    >
      {/* Background Graphic Pattern: Isolation_Mode Vector Geometry (opacity: 0.05) */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full opacity-5 select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1920 853"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -100 200 C 300 100, 700 600, 1100 300 C 1500 50, 1800 500, 2100 350"
            stroke="#999999"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M -50 450 C 400 300, 800 800, 1300 450 C 1700 200, 1950 650, 2150 500"
            stroke="#999999"
            strokeWidth="2"
          />
          <circle cx="250" cy="180" r="160" stroke="#999999" strokeWidth="1.5" />
          <circle cx="1650" cy="650" r="220" stroke="#999999" strokeWidth="1.5" />
          <circle cx="960" cy="426" r="340" stroke="#999999" strokeWidth="1" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="relative z-10 w-full">
        {/* Title: 72px DM Serif Text, line-height 86px (120%), Brand Red (#F01424) */}
        <div className="mb-12 lg:mb-[60px] max-w-[1336px]">
          <h2
            className="font-serif text-[36px] sm:text-[50px] lg:text-[72px] leading-[115%] lg:leading-[86px] font-normal tracking-tight"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {renderTitle()}
          </h2>
        </div>

        {/* 3 Cards Grid: Exact Figma widths 544px, height 568px, border 1px solid #F01424, border-radius 20px */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center w-full">
          {displayCards.map((card, index) => {
            const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
            // In Figma: Card 01 (Left) has Image Top, Card 02 (Middle) has Text Top + Image Bottom, Card 03 (Right) has Image Top.
            // Alternation logic: index % 2 === 1 has inverted layout (Text on top, Image on bottom).
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
                className="w-full max-w-[544px] min-h-[568px] rounded-[20px] border border-[#F01424] bg-white p-6 sm:p-[25px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {isTextTop ? (
                  <>
                    {/* TEXT BLOCK TOP (Card 02 style) */}
                    <div className="flex flex-col w-full">
                      {/* Top Row: Title (Left) + Red Number Circle (Right) */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3
                          className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.2] lg:leading-[52px] font-normal text-[#000000] flex-1"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {card.title}
                        </h3>
                        {/* Red Number Circle: 48px circle, #F01424, text 24px bold white */}
                        <div className="w-12 h-12 rounded-full bg-[#F01424] shrink-0 flex items-center justify-center shadow-sm">
                          <span className="font-sans font-bold text-white text-[20px] sm:text-[24px] leading-none">
                            {stepNum}
                          </span>
                        </div>
                      </div>

                      {/* Description Text */}
                      <p className="font-sans text-[17px] sm:text-[19px] lg:text-[20px] xl:text-[22px] leading-[150%] sm:leading-[160%] font-normal text-[#000000] mb-6">
                        {card.description}
                      </p>
                    </div>

                    {/* IMAGE BOTTOM (Card 02 style: 495px x 290px, border-radius 10px) */}
                    <div className="w-full h-[260px] sm:h-[290px] rounded-[10px] overflow-hidden shrink-0 mt-auto bg-gray-100">
                      <img
                        src={imageSrc}
                        alt={card.image?.alternativeText || card.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* IMAGE TOP (Card 01 & 03 style: 495px x 290px, border-radius 10px) */}
                    <div className="w-full h-[260px] sm:h-[290px] rounded-[10px] overflow-hidden shrink-0 mb-6 bg-gray-100">
                      <img
                        src={imageSrc}
                        alt={card.image?.alternativeText || card.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* TEXT BLOCK BOTTOM (Card 01 & 03 style) */}
                    <div className="flex flex-col w-full mt-auto">
                      {/* Row: Title (Left) + Red Number Circle (Right) */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3
                          className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.2] lg:leading-[52px] font-normal text-[#000000] flex-1"
                          style={{ fontFamily: "'DM Serif Text', serif" }}
                        >
                          {card.title}
                        </h3>
                        {/* Red Number Circle: 48px circle, #F01424, text 24px bold white */}
                        <div className="w-12 h-12 rounded-full bg-[#F01424] shrink-0 flex items-center justify-center shadow-sm">
                          <span className="font-sans font-bold text-white text-[20px] sm:text-[24px] leading-none">
                            {stepNum}
                          </span>
                        </div>
                      </div>

                      {/* Description Text */}
                      <p className="font-sans text-[17px] sm:text-[19px] lg:text-[20px] xl:text-[22px] leading-[150%] sm:leading-[160%] font-normal text-[#000000]">
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

