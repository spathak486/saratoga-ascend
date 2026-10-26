'use client';

import React from 'react';

export interface NumberedCardItem {
  id?: string;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
}

export interface BuiltAroundMissionsSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  calloutHighlight?: string | null;
  calloutText?: string | null;
  cards?: NumberedCardItem[] | null;
}

const DEFAULT_TITLE = 'Built around the missions that matter';
const DEFAULT_HIGHLIGHT = 'missions that matter';
const DEFAULT_DESCRIPTION =
  'Saratoga Ascend is positioned as a mission-focused partner for organizations operating where healthcare, workforce, technology, program management, and public-sector service delivery intersect. Our approach combines specialized capabilities with practical operational coordination.';
const DEFAULT_CALLOUT_HIGHLIGHT = '“Built to rise” represents an operating mindset:';
const DEFAULT_CALLOUT_TEXT =
  'build capability, strengthen execution, learn continuously, and help mission-critical organizations move forward.';

const DEFAULT_CARDS: NumberedCardItem[] = [
  {
    id: 'c1',
    number: '01',
    title: 'Mission-focused',
    description: 'Organize capabilities around operational realities and objectives.',
    isHighlighted: false,
  },
  {
    id: 'c2',
    number: '02',
    title: 'People-centered',
    description: 'Effective mission delivery depends on prepared people, collaboration, and accountability.',
    isHighlighted: true,
  },
  {
    id: 'c3',
    number: '03',
    title: 'Delivery-minded',
    description:
      'Connect strategy with execution through structured processes, workforce coordination, technology, and performance.',
    isHighlighted: false,
  },
];

export const BuiltAroundMissionsSection: React.FC<BuiltAroundMissionsSectionProps> = ({
  title,
  highlightTitle,
  description,
  calloutHighlight,
  calloutText,
  cards,
}) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  const finalTitle = title || '';
  const finalHighlight = highlightTitle || '';
  const finalDescription = description || '';
  const finalCalloutHighlight = calloutHighlight || '';
  const finalCalloutText = calloutText || '';

  // Render title with highlight (case-insensitive match, or append if separate field in CMS)
  const renderTitle = () => {
    const rawTitle = title?.trim() || '';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawTitle && !rawHighlight) return null;

    if (!rawHighlight) {
      return rawTitle;
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
        return <span key={i}>{part}</span>;
      });
    }

    // If highlightTitle is separate from title
    return (
      <>
        <span>{rawTitle} </span>
        <span className="text-[#F01424] font-normal">{rawHighlight}</span>
      </>
    );
  };

  return (
    <section
      aria-label={finalTitle}
      /* Figma: width: 1920px; height: 799px; background: #FFFFFF; */
      className="relative w-full max-w-[1920px] mx-auto min-h-[clamp(720px,41.6vw,799px)] overflow-hidden bg-white flex flex-col justify-center py-16 lg:py-[clamp(3.5rem,4.16vw,5rem)] my-0"
    >
      {/* 1920px canvas with 120px side margins: (1920 - 1680) / 2 = 120px */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-[clamp(2.5rem,6.25vw,7.5rem)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14 xl:gap-[clamp(3rem,6.3vw,7.56rem)]">
          
          {/* Left Column: Figma Group 2085665641 (width: 950px, height: 612px) */}
          <div className="w-full lg:w-[clamp(520px,49.47vw,950px)] flex flex-col justify-center">
            
            {/* Main Heading: Figma DM Serif Text, 72px, line-height: 120% (86px), color: #000000 */}
            <h2 className="font-serif font-normal text-[clamp(2.25rem,3.75vw,4.5rem)] leading-[1.2] text-[#000000] tracking-tight mb-5 lg:mb-[clamp(1.5rem,1.8vw,2.25rem)] max-w-[878px]">
              {renderTitle()}
            </h2>

            {/* Description Paragraph: Figma Google Sans Flex, 30px, line-height: 40px (133%), color: #0A0A0A */}
            {finalDescription && (
              <p className="font-sans font-normal text-[clamp(1.05rem,1.56vw,1.875rem)] leading-[clamp(1.6rem,2.08vw,2.5rem)] text-[#0A0A0A] mb-8 lg:mb-[clamp(2rem,2.6vw,3.125rem)] max-w-[917px]">
                {finalDescription}
              </p>
            )}

            {/* Callout Box: Figma Group 2085665636 (Rectangle 40125: #F01424 backing + Rectangle 40126: gradient with 7px reveal) */}
            <div className="relative w-full max-w-[950px] min-h-[clamp(120px,9.375vw,180px)] rounded-[20px] bg-[#F01424] p-0 flex items-stretch overflow-hidden shadow-[0_6px_24px_rgba(240,20,36,0.08)]">
              {/* Inner Gradient Surface offset by 7px to reveal 7px red on the left edge */}
              <div
                style={{
                  background: 'linear-gradient(90.52deg, #F2E2E5 0.45%, #E8F2F9 99.6%)',
                }}
                className="ml-[7px] w-[calc(100%-7px)] rounded-r-[20px] rounded-l-[4px] p-6 sm:p-7 lg:py-[clamp(1.5rem,1.7vw,2rem)] lg:px-[clamp(1.5rem,2.1vw,2.5rem)] flex items-center"
              >
                {/* Callout Text: Figma Google Sans Flex, 30px, line-height: 40px (133%), font-weight: 500, color: #0A0A0A */}
                <p className="font-sans font-medium text-[clamp(1rem,1.56vw,1.875rem)] leading-[clamp(1.55rem,2.08vw,2.5rem)] text-[#0A0A0A] max-w-[884px]">
                  {finalCalloutHighlight && (
                    <span className="font-semibold text-[#0A0A0A] mr-1.5">
                      {finalCalloutHighlight}
                    </span>
                  )}
                  {finalCalloutText}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Figma Group 2085665642 (width: 523px, height: 639px, 3 cards with 30px gap) */}
          <div className="w-full lg:w-[clamp(380px,27.24vw,523px)] flex flex-col gap-[clamp(1rem,1.56vw,1.875rem)] shrink-0">
            {cards.map((card, idx) => {
              const cardNumber = card.number || `0${idx + 1}`;
              const isHighlighted = Boolean(card.isHighlighted);

              return (
                /* Figma Frame 2147226435 / 2147226433 / 2147226434: 515px x 193px, border-radius: 20px, border: 1px solid #2B88D9 */
                <div
                  key={card.id || `card-${idx}`}
                  className={`box-border relative flex items-center gap-4 sm:gap-6 p-6 sm:py-[clamp(1.5rem,1.77vw,2.125rem)] sm:px-[clamp(1.25rem,1.56vw,1.875rem)] w-full lg:w-[clamp(380px,26.82vw,515px)] min-h-[clamp(150px,10.05vw,193px)] rounded-[20px] border border-[#2B88D9] transition-all duration-300 hover:shadow-lg ${
                    isHighlighted
                      ? 'bg-[#2B88D9] text-white shadow-[0_8px_30px_rgba(43,136,217,0.28)]'
                      : 'bg-[#F3F9FF] text-[#212121] shadow-[0_4px_20px_rgba(43,136,217,0.06)]'
                  }`}
                >
                  {/* Left Number: Figma Outfit, 700, 36px, line-height: 45px */}
                  <div className="shrink-0 flex items-center justify-center min-w-[48px] sm:min-w-[56px]">
                    <span
                      className={`font-['Outfit',sans-serif] font-bold text-[clamp(1.75rem,1.875vw,2.25rem)] leading-[clamp(2rem,2.34vw,2.8125rem)] ${
                        isHighlighted ? 'text-white' : 'text-[#212121]'
                      }`}
                    >
                      {cardNumber}
                    </span>
                  </div>

                  {/* Vertical Divider: Figma Vector 7171, height: 122px, border: 2px solid */}
                  <div
                    className={`h-[clamp(70px,6.35vw,122px)] w-0 border-l-2 shrink-0 ${
                      isHighlighted ? 'border-white' : 'border-[#000000]'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Card Content Area: Group 2085664883 */}
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Title: Figma Google Sans Flex, 700, 24px, line-height: 28px */}
                    <h3
                      className={`font-sans font-bold text-[clamp(1.125rem,1.25vw,1.5rem)] leading-[clamp(1.4rem,1.45vw,1.75rem)] mb-1 sm:mb-2 ${
                        isHighlighted ? 'text-white' : 'text-[#212121]'
                      }`}
                    >
                      {card.title}
                    </h3>

                    {/* Description: Figma DM Sans, 300, 20px, line-height: 28px (140%) */}
                    <p
                      className={`font-sans font-light text-[clamp(0.95rem,1.04vw,1.25rem)] leading-[clamp(1.35rem,1.45vw,1.75rem)] ${
                        isHighlighted ? 'text-white' : 'text-[#212121]'
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BuiltAroundMissionsSection;
