'use client';

import { stripHtml } from '@/lib/utils/text';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cleanHeadingHtml } from '@/lib/utils/text';

export interface AccordionItemData {
  id?: string | number | null;
  title?: string | null;
  description?: string | null;
  actionLabel?: string | null;
  href?: string | null;
}

export interface EnvironmentCardData {
  id?: string | number | null;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  accordions?: AccordionItemData[] | null;
}

export interface FederalEnvironmentsSectionProps {
  id?: string;
  sectionTitle?: string | null;
  description?: string | null;
  cards?: EnvironmentCardData[] | null;
  className?: string;
}

/**
 * Explore the Federal Environments We Support Section
 * Supports multiple cards, each with its own background image and multiple accordion items.
 *
 * Figma Specs:
 * - Frame 2147226325: width 1920px, bg #FAFAFA, py 80px
 * - Heading: Google Sans Flex 600, 72px, line-height 90px, #000000
 * - Subtitle: Google Sans Flex 400, 24px, line-height 40px, #000000
 * - Cards: 827px x 826px, border-radius 44px
 * - Bottom Glassmorphic Drawer:
 *   - Background: rgba(255, 255, 255, 0.9), backdrop-blur 5px, border-radius 30px
 *   - Accordion Titles: Google Sans Flex 600, 24px
 *   - Accordion Body: Google Sans Flex 400, 18px, line-height 40px
 *   - CTA Button: Google Sans Flex 700, 18px, #2B88D9, with arrow
 */
export const FederalEnvironmentsSection: React.FC<FederalEnvironmentsSectionProps> = ({
  id,
  sectionTitle = 'Explore the Federal Environments We Support',
  description = 'Different agencies and mission communities have distinct operating contexts. Explore the pathways most relevant to your requirement.',
  cards,
  className = '',
}) => {
  if (!cards || cards.length === 0) return null;

  // Track active open accordion for EACH card independently: { [cardIndex]: activeAccordionIndex | null }
  // Default: first accordion (index 0) of the first card is open
  const [activeAccordions, setActiveAccordions] = useState<{ [cardIdx: number]: number | null }>({
    0: 0,
  });

  const toggleAccordion = (cardIdx: number, accordionIdx: number) => {
    setActiveAccordions((prev) => ({
      ...prev,
      [cardIdx]: prev[cardIdx] === accordionIdx ? null : accordionIdx,
    }));
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
              {stripHtml(description)}
            </p>
          )}
        </div>
      )}

      {/* Cards Layout: 2 Cards Side-by-Side (827px x 826px) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-[25px] w-full max-w-[1679px] mx-auto items-start">
        {cards.map((card, cardIdx) => {
          const imageUrl = card.image?.url;
          const accordions = card.accordions || [];
          const currentActiveIdx = activeAccordions[cardIdx] ?? null;

          return (
            <div
              key={card.id ?? `fed-card-${cardIdx}`}
              className="relative w-full aspect-square max-h-[826px] rounded-[32px] sm:rounded-[44px] overflow-hidden shadow-lg bg-[#EAEFF4]"
            >
              {/* Card Background Full Cover Image */}
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={card.image?.alternativeText || 'Federal Environment'}
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 827px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center">
                  <span className="text-slate-500 font-sans text-xl">Environment Image</span>
                </div>
              )}

              {/* Bottom Glassmorphic Drawer containing Accordions */}
              {accordions.length > 0 && (
                <div
                  className="absolute left-3 right-3 sm:left-[17px] sm:right-[17px] bottom-[17px] rounded-[24px] sm:rounded-[30px] p-4 sm:p-6 bg-white/95 backdrop-blur-[5px] max-h-[85%] overflow-y-auto transition-all duration-300 ease-in-out scrollbar-thin scrollbar-thumb-gray-300"
                  style={{
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="flex flex-col divide-y divide-gray-100">
                    {accordions.map((acc, accIdx) => {
                      const isOpen = currentActiveIdx === accIdx;
                      const actionText =
                        acc.actionLabel ||
                        (acc.title ? `Explore ${cleanHeadingHtml(acc.title)}` : 'Explore');
                      const href = acc.href || '#';

                      return (
                        <div
                          key={acc.id ?? `acc-${cardIdx}-${accIdx}`}
                          className={`transition-all duration-200 ${
                            accIdx > 0 ? 'pt-4 mt-2' : ''
                          }`}
                        >
                          {/* Expanded Content (when open): Description + Explore CTA */}
                          {isOpen && (
                            <div className="flex flex-col gap-3 sm:gap-4 mb-4 animate-fadeIn">
                              {acc.description && (
                                <p
                                  className="font-sans font-normal text-sm sm:text-base lg:text-[18px] leading-relaxed sm:leading-[32px] lg:leading-[40px] text-[#000000]"
                                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                                >
                                  {acc.description}
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

                          {/* Accordion Title Header & Toggle Button */}
                          <div
                            onClick={() => toggleAccordion(cardIdx, accIdx)}
                            className="flex items-center justify-between cursor-pointer select-none py-1"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleAccordion(cardIdx, accIdx);
                              }
                            }}
                            aria-expanded={isOpen}
                          >
                            <h3
                              className="font-sans font-semibold text-lg sm:text-xl lg:text-[24px] leading-snug lg:leading-[40px] text-[#000000]"
                              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                              dangerouslySetInnerHTML={{
                                __html: cleanHeadingHtml(acc.title || ''),
                              }}
                            />

                            {/* Plus / Minus Action Button */}
                            <div
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 hover:bg-black/5"
                              aria-label={isOpen ? 'Collapse' : 'Expand'}
                            >
                              {isOpen ? (
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
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FederalEnvironmentsSection;
