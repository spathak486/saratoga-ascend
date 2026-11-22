'use client';

import { cleanHeadingHtml, stripHtml } from '@/lib/utils/text';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heading, Section, Text } from '../atoms';

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
  // First accordion of the first card starts open. State stays above the empty return.
  const [activeAccordions, setActiveAccordions] = useState<{ [cardIdx: number]: number | null }>({
    0: 0,
  });

  if (!cards || cards.length === 0) return null;

  const toggleAccordion = (cardIdx: number, accordionIdx: number) => {
    setActiveAccordions((prev) => ({
      ...prev,
      [cardIdx]: prev[cardIdx] === accordionIdx ? null : accordionIdx,
    }));
  };

  const headingId = id ? `${id}-heading` : 'federal-environments-heading';

  return (
    <Section
      id={id}
      tone="surface"
      spacing="none"
      aria-labelledby={sectionTitle ? headingId : undefined}
      className={`overflow-hidden bg-[#fafafa] py-[clamp(2.5rem,1.893rem+2.589vw,5rem)] ${className}`.trim()}
    >
      {/*
        Figma 2712:11003 is 1920×1318. Title is sans semibold 72, body 24/40,
        then a 60px gap to 827px cards with a 25px split. Vertical inset is
        80px. get_motion_context returned no tracks for this node.
      */}
      {(sectionTitle || description) && (
        <div className="mb-block w-full max-w-[min(100%,69.3125rem)]">
          {sectionTitle ? (
            <Heading
              id={headingId}
              level={2}
              size="section"
              font="sans"
              tone="inherit"
              className="font-semibold tracking-normal text-black [&_p]:m-0 [&_p]:font-[inherit] [&_p]:leading-[inherit] [&_p]:text-inherit"
            >
              <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(sectionTitle) }} />
            </Heading>
          ) : null}
          {description ? (
            <Text
              size="lead"
              tone="inherit"
              className="mt-5 max-w-[min(100%,57.9375rem)] font-normal text-black"
              style={{ lineHeight: 1.6667 }}
            >
              {stripHtml(description)}
            </Text>
          ) : null}
        </div>
      )}

      <div className="grid w-full grid-cols-1 items-start gap-6 xl:grid-cols-2 xl:gap-[25px]">
        {cards.map((card, cardIdx) => {
          const imageUrl = card.image?.url;
          const accordions = card.accordions || [];
          const currentActiveIdx = activeAccordions[cardIdx] ?? null;

          return (
            <div
              key={card.id ?? `fed-card-${cardIdx}`}
              className="relative aspect-square w-full overflow-hidden rounded-[clamp(1.5rem,2vw,2.75rem)] bg-[#EAEFF4]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={card.image?.alternativeText || 'Federal Environment'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1279px) 100vw, 827px"
                />
              ) : (
                <div className="absolute inset-0 bg-[#EAEFF4]" />
              )}

              {accordions.length > 0 && (
                <div className="absolute inset-x-3 bottom-3 max-h-[85%] overflow-y-auto rounded-[30px] bg-white/90 px-6 py-5 backdrop-blur-[5px] sm:inset-x-[17px] sm:bottom-[17px]">
                  <div className="flex flex-col gap-4">
                    {accordions.map((acc, accIdx) => {
                      const isOpen = currentActiveIdx === accIdx;
                      const actionText =
                        acc.actionLabel ||
                        (acc.title ? `Explore ${cleanHeadingHtml(acc.title)}` : 'Explore');
                      const href = acc.href || '#';

                      return (
                        <div key={acc.id ?? `acc-${cardIdx}-${accIdx}`}>
                          {isOpen && (
                            <div className="mb-[clamp(1rem,1.2vw,1.6875rem)] flex flex-col gap-2.5">
                              {acc.description ? (
                                <p
                                  className="font-sans text-[clamp(1rem,0.94rem+0.26vw,1.125rem)] font-normal text-black"
                                  style={{ lineHeight: 2.222 }}
                                >
                                  {acc.description}
                                </p>
                              ) : null}

                              <Link
                                href={href}
                                className="inline-flex items-center gap-2 font-sans text-[clamp(1rem,0.94rem+0.26vw,1.125rem)] font-bold text-brand-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                                style={{ lineHeight: 2.222 }}
                              >
                                <span>{actionText}</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <path
                                    d="M5 12H19M19 12L12 5M19 12L12 19"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Link>
                            </div>
                          )}

                          <div
                            onClick={() => toggleAccordion(cardIdx, accIdx)}
                            className="flex cursor-pointer select-none items-center justify-between gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
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
                              className="min-w-0 font-sans text-[clamp(1.125rem,1rem+0.5vw,1.5rem)] font-semibold text-black"
                              style={{ lineHeight: 1.6667 }}
                              dangerouslySetInnerHTML={{
                                __html: cleanHeadingHtml(acc.title || ''),
                              }}
                            />

                            <span className="inline-flex size-6 shrink-0 items-center justify-center" aria-hidden="true">
                              {isOpen ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12H19" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 5V19M5 12H19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              )}
                            </span>
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
    </Section>
  );
};

export default FederalEnvironmentsSection;
