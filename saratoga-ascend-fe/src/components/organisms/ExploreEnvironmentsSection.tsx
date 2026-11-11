'use client';

import { stripHtml } from '@/lib/utils/text';
import React from 'react';

export interface EnvironmentCardItem {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  actionLabel?: string | null;
  href?: string | null;
}

export interface ExploreEnvironmentsSectionProps {
  title?: string | null;
  description?: string | null;
  cards?: EnvironmentCardItem[] | null;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

/**
 * Cleanly unwrap block wrapper tags (<p>, <h2>, <div>) output by CKEditor so they can
 * be placed inside an actual native heading tag (<h2>) without invalid HTML nesting or hydration mismatch.
 */
function cleanHeadingHtml(html: string): string {
  if (!html) return '';
  return html
    .trim()
    .replace(/<\/\s*p\s*>\s*<\s*p(\s+[^>]*)?>/gi, '<br/>')
    .replace(/^<\s*(p|div|h[1-6])(\s+[^>]*)?>/i, '')
    .replace(/<\/\s*(p|div|h[1-6])\s*>$/i, '')
    .trim();
}

export function ExploreEnvironmentsSection({
  title,
  description,
  cards,
  as: HeadingTag = 'h2',
}: ExploreEnvironmentsSectionProps) {
  // STRICT RULE: If no cards from CMS, render nothing
  if (!cards || cards.length === 0) {
    return null;
  }

  const rawTitle = title?.trim() || '';
  const cleanTitle = rawTitle ? cleanHeadingHtml(rawTitle) : '';
  const desc = description?.trim() || '';

  return (
    <section
      aria-label={cleanTitle ? cleanTitle.replace(/<[^>]*>/g, '') : 'Explore Environments'}
      className="relative w-full max-w-[1920px] mx-auto min-h-[500px] xl:min-h-[775px] bg-white py-16 xl:py-[80px] px-6 sm:px-10 xl:px-[120px] overflow-hidden flex flex-col justify-between"
    >
      {/* Top Header Block (ONLY if title or description is present) */}
      {(cleanTitle || desc) && (
        <div className="w-full max-w-[1290px] mb-10 xl:mb-[60px]">
          {cleanTitle && (
            <HeadingTag
              className="font-sans text-[clamp(2.5rem,1.8rem+2.8vw,4.5rem)] font-semibold leading-[1.15] xl:leading-[90px] text-[#000000] tracking-[-0.01em] mb-4 xl:mb-6 [&_span[style*='color']]:font-semibold"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: cleanTitle }}
            />
          )}

          {desc && (
            <p
              className="font-sans text-[clamp(1.1rem,1rem+0.45vw,1.5rem)] leading-[1.55] xl:leading-[40px] font-normal text-[#000000] max-w-[1290px]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              {desc}
            </p>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-[24px] w-full">
        {cards.map((card, idx) => {
          const stepNumber = card.number || `0${idx + 1}`;
          const actionText = card.actionLabel?.trim() || '';
          const targetHref = card.href?.trim() || '#';

          return (
            <div
              key={card.id ?? card.documentId ?? `env-card-${idx}`}
              className="box-border relative w-full min-h-[260px] xl:min-h-[283px] bg-[#F2F7FA] border-[1.75px] border-[#D7E2EB] rounded-[28px] p-6 sm:p-8 xl:p-[34px] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#95C3EC]"
            >
              {/* Giant Watermark Step Number */}
              <span
                className="pointer-events-none select-none absolute right-4 xl:right-8 top-[-10px] xl:top-[-12px] font-serif text-[90px] sm:text-[110px] xl:text-[117px] font-normal leading-none text-[#2B88D9] opacity-10 z-0"
                style={{ fontFamily: "'DM Serif Text', serif" }}
                aria-hidden="true"
              >
                {stepNumber}
              </span>

              {/* Top Row: Diamond Star Icon + Title */}
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 bg-[#006CAF] rotate-45 rounded-[3px] shrink-0 inline-block shadow-xs" />
                  {card.title && (
                    <h3
                      className="font-serif text-[24px] sm:text-[32px] xl:text-[38px] leading-[1.25] xl:leading-[52px] font-normal text-[#000000]"
                      style={{ fontFamily: "'DM Serif Text', serif" }}
                      dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.title) }}
                    />
                  )}
                </div>

                {card.description && (
                  <p
                    className="font-sans text-[16px] sm:text-[20px] xl:text-[24px] leading-[1.45] xl:leading-[36px] font-normal text-[#000000] pl-6 sm:pl-7 max-w-[700px]"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
                    {stripHtml(card.description)}
                  </p>
                )}
              </div>

              {/* Bottom Action Link (ONLY if actionText is present) */}
              {actionText && (
                <div className="relative z-10 pt-4 pl-6 sm:pl-7 mt-auto">
                  <a
                    href={targetHref}
                    className="group inline-flex items-center gap-2.5 text-[#2B88D9] hover:text-[#022E4C] transition-colors duration-200"
                  >
                    <span
                      className="font-sans font-semibold text-[18px] sm:text-[22px] xl:text-[24px] leading-[40px]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {actionText}
                    </span>

                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      className="transform transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      <path
                        d="M6 14H22M22 14L15 7M22 14L15 21"
                        stroke="#2B88D9"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExploreEnvironmentsSection;
