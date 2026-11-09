'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cleanHeadingHtml } from '@/lib/utils/text';

export interface FederalEnvironmentCard {
  id?: string | number | null;
  documentId?: string | null;
  title?: string | null;
  description?: string | null;
  actionLabel?: string | null;
  href?: string | null;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface FederalEnvironmentsSectionProps {
  id?: string;
  sectionTitle?: string | null;
  description?: string | null;
  cards?: FederalEnvironmentCard[] | null;
  className?: string;
}

/**
 * Explore the Federal Environments We Support Section
 * Figma Specs:
 * - Frame 2147226325: width 1920px, bg #FAFAFA, py 80px
 * - Heading: Google Sans Flex 600, 72px, line-height 90px, #000000
 * - Description: Google Sans Flex 400, 24px, line-height 40px, #000000
 * - Cards: 827px x 826px, border-radius 44px
 * - Overlay Drawer:
 *   - Expanded: width 792px, height 237px, bg rgba(255, 255, 255, 0.9), backdrop-blur 5px, border-radius 30px
 *     - Description: Google Sans Flex 400, 18px, line-height 40px, #000000
 *     - CTA Link: Google Sans Flex 700, 18px, #2B88D9, with arrow
 *     - Title: Google Sans Flex 600, 24px, #000000, with minus icon
 *   - Collapsed: width 792px, height 80px, bg rgba(255, 255, 255, 0.9), border-radius 30px
 *     - Title: Google Sans Flex 600, 24px, #000000, with plus icon
 */
export const FederalEnvironmentsSection: React.FC<FederalEnvironmentsSectionProps> = ({
  id,
  sectionTitle = 'Explore the Federal Environments We Support',
  description = 'Different agencies and mission communities have distinct operating contexts. Explore the pathways most relevant to your requirement.',
  cards,
  className = '',
}) => {
  // STRICT RULE: If no cards from CMS, render nothing
  if (!cards || cards.length === 0) return null;

  // Track expanded state for each card (default first card open if 2 cards)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id={id}
      aria-label="Explore the Federal Environments We Support"
      className={`relative w-full max-w-[1920px] mx-auto bg-[#FAFAFA] py-16 lg:py-20 xl:py-[80px] px-6 sm:px-10 lg:px-16 xl:px-[120px] overflow-hidden ${className}`.trim()}
    >
      {/* Header Container */}
      {(sectionTitle || description) && (
        <div className="w-full max-w-[1109px] mb-10 lg:mb-14 xl:mb-[60px]">
          {sectionTitle && (
            <h2
              className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.15] xl:leading-[90px] text-[#000000] tracking-tight [&_span[style*='color']]:font-semibold"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(sectionTitle) }}
            />
          )}
          {description && (
            <p
              className="mt-4 sm:mt-6 font-sans font-normal text-base sm:text-lg lg:text-xl xl:text-[24px] leading-relaxed xl:leading-[40px] text-[#000000] max-w-[927px]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Cards Layout: 2 Cards (827px x 826px in Figma) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-[25px] w-full max-w-[1679px] mx-auto items-center">
        {cards.map((card, idx) => {
          const isExpanded = expandedIndex === idx;
          const imageUrl = card.image?.url;
          const actionText = card.actionLabel || (card.title ? `Explore ${card.title}` : 'Explore');
          const href = card.href || '#';

          return (
            <div
              key={card.id ?? card.documentId ?? `fed-env-${idx}`}
              className="relative w-full aspect-square max-h-[826px] rounded-[32px] sm:rounded-[44px] overflow-hidden shadow-lg bg-[#EAEFF4]"
            >
              {/* Background Full Cover Image */}
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={card.image?.alternativeText || card.title || 'Federal Environment'}
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 827px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center">
                  <span className="text-slate-500 font-sans text-xl">{card.title}</span>
                </div>
              )}

              {/* Bottom Glassmorphic Drawer */}
              <div
                className={`absolute left-3 right-3 sm:left-[17px] sm:right-[17px] bottom-[17px] rounded-[24px] sm:rounded-[30px] p-5 sm:p-6 transition-all duration-300 ease-in-out ${
                  isExpanded ? 'bg-white/95 backdrop-blur-[5px]' : 'bg-white/90 backdrop-blur-[5px]'
                }`}
                style={{
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Expanded Content: Description + Explore CTA Link */}
                {isExpanded && (
                  <div className="flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-6 animate-fadeIn">
                    {card.description && (
                      <p
                        className="font-sans font-normal text-sm sm:text-base lg:text-[18px] leading-relaxed sm:leading-[32px] lg:leading-[40px] text-[#000000]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {card.description}
                      </p>
                    )}

                    <div>
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-2 font-sans font-bold text-base sm:text-[18px] leading-[40px] text-[#2B88D9] hover:text-[#005a9e] transition-colors"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        <span>{actionText}</span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="transform transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="#2B88D9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Bottom Bar: Title + Toggle Icon Button */}
                <div
                  onClick={() => toggleExpand(idx)}
                  className="flex items-center justify-between cursor-pointer select-none pt-1"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(idx);
                    }
                  }}
                  aria-expanded={isExpanded}
                >
                  <h3
                    className="font-sans font-semibold text-lg sm:text-xl lg:text-[24px] leading-snug lg:leading-[40px] text-[#000000]"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
                    {card.title}
                  </h3>

                  {/* Plus / Minus Action Button */}
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-black/5"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? (
                      /* Minus Icon */
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19"
                          stroke="#141B34"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      /* Plus Icon */
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FederalEnvironmentsSection;

