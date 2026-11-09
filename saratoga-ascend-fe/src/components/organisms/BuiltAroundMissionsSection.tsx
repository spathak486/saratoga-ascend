'use client';

import React from 'react';
import { cleanHeadingHtml } from '@/lib/utils/text';

export interface NumberedCardItem {
  id?: string;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
}

export interface BuiltAroundMissionsSectionProps {
  layout?: 'side-by-side' | 'grid' | string | null;
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  calloutHighlight?: string | null;
  calloutText?: string | null;
  cards?: NumberedCardItem[] | null;
}

export const BuiltAroundMissionsSection: React.FC<BuiltAroundMissionsSectionProps> = ({
  layout = 'side-by-side',
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

  // Render title with highlight or HTML
  const renderTitle = () => {
    const rawTitle = title?.trim() || '';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawTitle && !rawHighlight) return null;

    // If title contains rich text HTML tags (e.g., from CKEditor)
    if (/<[a-z][\s\S]*>/i.test(rawTitle)) {
      return <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(rawTitle) }} />;
    }

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

  const isGridVariant = layout === 'grid';

  /* ------------------------------------------------------------- */
  /* VARIANT 1: GRID (Figma Frame 2147226562 - Why Contract Style) */
  /* ------------------------------------------------------------- */
  if (isGridVariant) {
    return (
      <section
        aria-label={finalTitle || 'Why Contract'}
        className="relative mx-auto my-0 flex w-full max-w-[1920px] flex-col justify-center overflow-hidden bg-white py-12 sm:py-16 lg:py-20 xl:py-[clamp(5rem,5.2vw,6.25rem)]"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-[clamp(3.5rem,6.25vw,7.5rem)]">
          {/* Top Title */}
          <div className="mb-10 sm:mb-12 lg:mb-14 xl:mb-16 max-w-[1440px]">
            <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.15] text-[#000000] tracking-tight">
              {renderTitle()}
            </h2>
            {finalDescription && (
              <p className="mt-4 font-sans font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-[#212121] leading-relaxed max-w-[1200px]">
                {finalDescription}
              </p>
            )}
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 xl:gap-[30px] w-full">
            {cards.map((card, idx) => {
              const cardNumber = card.number || `0${idx + 1}`;
              // In the 2x2 Figma design, cards alternate in a checkerboard:
              // Index 0: Light, Index 1: Blue, Index 2: Blue, Index 3: Light
              // Or explicit isHighlighted if set in CMS
              const isBlue =
                typeof card.isHighlighted === 'boolean'
                  ? card.isHighlighted
                  : idx === 1 || idx === 2;

              return (
                <div
                  key={card.id || `card-${idx}`}
                  className={`box-border relative flex items-center gap-5 sm:gap-6 lg:gap-8 p-6 sm:p-8 lg:p-9 xl:py-[34px] xl:px-[30px] w-full min-h-[180px] sm:min-h-[210px] xl:min-h-[232px] rounded-[20px] border border-[#2B88D9] transition-all duration-300 hover:shadow-xl ${
                    isBlue
                      ? 'bg-[#2B88D9] text-white shadow-[0_8px_30px_rgba(43,136,217,0.25)]'
                      : 'bg-[#F3F9FF] text-[#212121] shadow-[0_4px_20px_rgba(43,136,217,0.06)]'
                  }`}
                >
                  {/* Left Number: Outfit 700 36px */}
                  <div className="shrink-0 flex items-center justify-center min-w-[42px] sm:min-w-[50px]">
                    <span
                      className={`font-['Outfit',sans-serif] font-bold text-2xl sm:text-3xl lg:text-4xl leading-none ${
                        isBlue ? 'text-white' : 'text-[#212121]'
                      }`}
                    >
                      {cardNumber}
                    </span>
                  </div>

                  {/* Vertical Divider: Vector 7171 */}
                  <div
                    className={`h-[90px] sm:h-[120px] lg:h-[148px] w-0 border-l-2 shrink-0 ${
                      isBlue ? 'border-white' : 'border-[#000000]'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Content Area */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3
                      className={`font-sans font-bold text-lg sm:text-xl lg:text-2xl xl:text-[28px] leading-tight mb-2 sm:mb-2.5 ${
                        isBlue ? 'text-white' : 'text-[#212121]'
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`font-sans font-normal text-sm sm:text-base lg:text-lg xl:text-[20px] leading-snug sm:leading-relaxed ${
                        isBlue ? 'text-white/95' : 'text-[#212121]'
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
      </section>
    );
  }

  /* ------------------------------------------------------------- */
  /* VARIANT 2: SIDE-BY-SIDE (About Page Original Layout)          */
  /* ------------------------------------------------------------- */
  return (
    <section
      aria-label={finalTitle}
      className="relative mx-auto my-0 flex w-full max-w-[1920px] flex-col justify-center overflow-hidden bg-white py-12 sm:py-14 lg:min-h-[clamp(720px,41.6vw,799px)] lg:py-[clamp(3.5rem,4.16vw,5rem)]"
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-[clamp(2.5rem,6.25vw,7.5rem)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14 xl:gap-[clamp(3rem,6.3vw,7.56rem)]">
          {/* Left Column: Title, Description, Callout */}
          <div className="w-full lg:w-[clamp(520px,49.47vw,950px)] flex flex-col justify-center">
            <h2 className="font-serif font-normal text-[clamp(2.25rem,3.75vw,4.5rem)] leading-[1.2] text-[#000000] tracking-tight mb-5 lg:mb-[clamp(1.5rem,1.8vw,2.25rem)] max-w-[878px]">
              {renderTitle()}
            </h2>

            {finalDescription && (
              <p className="font-sans font-normal text-[clamp(1.05rem,1.56vw,1.875rem)] leading-[clamp(1.6rem,2.08vw,2.5rem)] text-[#0A0A0A] mb-8 lg:mb-[clamp(2rem,2.6vw,3.125rem)] max-w-[917px]">
                {finalDescription}
              </p>
            )}

            {(finalCalloutHighlight || finalCalloutText) && (
              <div className="relative w-full max-w-[950px] min-h-[clamp(120px,9.375vw,180px)] rounded-[20px] bg-[#F01424] p-0 flex items-stretch overflow-hidden shadow-[0_6px_24px_rgba(240,20,36,0.08)]">
                <div
                  style={{
                    background: 'linear-gradient(90.52deg, #F2E2E5 0.45%, #E8F2F9 99.6%)',
                  }}
                  className="ml-[7px] w-[calc(100%-7px)] rounded-r-[20px] rounded-l-[4px] p-6 sm:p-7 lg:py-[clamp(1.5rem,1.7vw,2rem)] lg:px-[clamp(1.5rem,2.1vw,2.5rem)] flex items-center"
                >
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
            )}
          </div>

          {/* Right Column: Stacked Cards */}
          <div className="w-full lg:w-[clamp(380px,27.24vw,523px)] flex flex-col gap-[clamp(1rem,1.56vw,1.875rem)] shrink-0">
            {cards.map((card, idx) => {
              const cardNumber = card.number || `0${idx + 1}`;
              const isHighlighted = Boolean(card.isHighlighted);

              return (
                <div
                  key={card.id || `card-${idx}`}
                  className={`box-border relative flex items-center gap-4 sm:gap-6 p-6 sm:py-[clamp(1.5rem,1.77vw,2.125rem)] sm:px-[clamp(1.25rem,1.56vw,1.875rem)] w-full lg:w-[clamp(380px,26.82vw,515px)] min-h-[clamp(150px,10.05vw,193px)] rounded-[20px] border border-[#2B88D9] transition-all duration-300 hover:shadow-lg ${
                    isHighlighted
                      ? 'bg-[#2B88D9] text-white shadow-[0_8px_30px_rgba(43,136,217,0.28)]'
                      : 'bg-[#F3F9FF] text-[#212121] shadow-[0_4px_20px_rgba(43,136,217,0.06)]'
                  }`}
                >
                  <div className="shrink-0 flex items-center justify-center min-w-[48px] sm:min-w-[56px]">
                    <span
                      className={`font-['Outfit',sans-serif] font-bold text-[clamp(1.75rem,1.875vw,2.25rem)] leading-[clamp(2rem,2.34vw,2.8125rem)] ${
                        isHighlighted ? 'text-white' : 'text-[#212121]'
                      }`}
                    >
                      {cardNumber}
                    </span>
                  </div>

                  <div
                    className={`h-[clamp(70px,6.35vw,122px)] w-0 border-l-2 shrink-0 ${
                      isHighlighted ? 'border-white' : 'border-[#000000]'
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex-1 flex flex-col justify-center">
                    <h3
                      className={`font-sans font-bold text-[clamp(1.125rem,1.25vw,1.5rem)] leading-[clamp(1.4rem,1.45vw,1.75rem)] mb-1 sm:mb-2 ${
                        isHighlighted ? 'text-white' : 'text-[#212121]'
                      }`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`line-clamp-4 min-w-0 break-words font-sans font-light text-[clamp(0.95rem,1.04vw,1.25rem)] leading-[clamp(1.35rem,1.45vw,1.75rem)] ${
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
