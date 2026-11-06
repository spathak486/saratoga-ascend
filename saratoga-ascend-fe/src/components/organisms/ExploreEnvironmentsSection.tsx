'use client';

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

// Default 2 cards matching exact Figma Frame 2147226557 specifications
const DEFAULT_CARDS: EnvironmentCardItem[] = [
  {
    number: '01',
    title: 'State & Local Government (SLED)',
    description: 'Explore support aligned to state, local, and educational public-sector needs.',
    actionLabel: 'Explore SLED',
    href: '/who-we-serve/state-local-government',
  },
  {
    number: '02',
    title: 'What We Do',
    description: 'Review the six approved Saratoga Ascend solution areas.',
    actionLabel: 'Explore Solutions',
    href: '/solutions',
  },
];

const DEFAULT_TITLE_HTML = 'Explore Other <span style="color: #F01424;">Government</span><br/><span style="color: #F01424;">Environments</span>';
const DEFAULT_DESCRIPTION =
  'If your requirement sits outside a Federal agency context, explore our State & Local Government pathway or review our solution areas directly.';

/**
 * Cleanly unwrap block wrapper tags (<p>, <h2>, <div>) output by CKEditor so they can
 * be placed inside an actual native heading tag (<h2>) without invalid HTML nesting or hydration mismatch.
 */
function cleanHeadingHtml(html: string): string {
  if (!html) return '';
  return html
    .trim()
    // Replace multiple paragraphs with <br/>
    .replace(/<\/\s*p\s*>\s*<\s*p(\s+[^>]*)?>/gi, '<br/>')
    // Strip leading block wrappers (<p>, <div>, <h1>-<h6>)
    .replace(/^<\s*(p|div|h[1-6])(\s+[^>]*)?>/i, '')
    // Strip trailing block wrappers (</p>, </div>, </h1>-</h6>)
    .replace(/<\/\s*(p|div|h[1-6])\s*>$/i, '')
    .trim();
}

export function ExploreEnvironmentsSection({
  title,
  description = DEFAULT_DESCRIPTION,
  cards,
  as: HeadingTag = 'h2',
}: ExploreEnvironmentsSectionProps) {
  const displayCards: EnvironmentCardItem[] =
    cards && cards.length > 0 ? cards : DEFAULT_CARDS;

  const rawTitle = title?.trim() || DEFAULT_TITLE_HTML;
  const cleanTitle = cleanHeadingHtml(rawTitle);

  return (
    <section
      aria-label="Explore Other Government Environments"
      className="relative w-full max-w-[1920px] mx-auto min-h-[775px] bg-white py-16 xl:py-[80px] px-6 sm:px-10 xl:px-[120px] overflow-hidden flex flex-col justify-between"
    >
      {/* Top Header Block: Group 2608667 (1290px x 272px) */}
      <div className="w-full max-w-[1290px] mb-10 xl:mb-[60px]">
        {/* Native Heading Element (h2 by default, fully dynamic, with CKEditor color/styling preserved) */}
        <HeadingTag
          className="font-sans text-[clamp(2.5rem,1.8rem+2.8vw,4.5rem)] font-semibold leading-[1.15] xl:leading-[90px] text-[#000000] tracking-[-0.01em] mb-4 xl:mb-6 [&_span[style*='color']]:font-semibold"
          style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
          dangerouslySetInnerHTML={{ __html: cleanTitle }}
        />

        {/* Description: Google Sans Flex 24px, line-height 40px (167%) */}
        {description && (
          <p
            className="font-sans text-[clamp(1.1rem,1rem+0.45vw,1.5rem)] leading-[1.55] xl:leading-[40px] font-normal text-[#000000] max-w-[1290px]"
            style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Cards 2-Column Grid: Frames 2147226436 & 2147226437 (828px x 283px each) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-[24px] w-full">
        {displayCards.map((card, idx) => {
          const stepNumber = card.number || `0${idx + 1}`;
          const actionText = card.actionLabel || (idx === 0 ? 'Explore SLED' : 'Explore Solutions');
          const targetHref = card.href || (idx === 0 ? '/who-we-serve/state-local-government' : '/solutions');

          return (
            <div
              key={card.id ?? card.documentId ?? `env-card-${idx}`}
              className="box-border relative w-full min-h-[260px] xl:min-h-[283px] bg-[#F2F7FA] border-[1.75px] border-[#D7E2EB] rounded-[28px] p-6 sm:p-8 xl:p-[34px] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#95C3EC]"
            >
              {/* Giant Watermark Step Number: 01 / 02 (DM Serif Text, 117px, color #2B88D9, opacity 0.1) */}
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
                  {/* Star 1 Diamond Icon: 16px, background #006CAF, rounded */}
                  <span className="w-3.5 h-3.5 bg-[#006CAF] rotate-45 rounded-[3px] shrink-0 inline-block shadow-xs" />

                  {/* Title: DM Serif Text, 38px, line-height 52px, color #000000 */}
                  <h3
                    className="font-serif text-[24px] sm:text-[32px] xl:text-[38px] leading-[1.25] xl:leading-[52px] font-normal text-[#000000]"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Description: Google Sans Flex, 28px/24px/20px, color #000000 */}
                <p
                  className="font-sans text-[16px] sm:text-[20px] xl:text-[24px] leading-[1.45] xl:leading-[36px] font-normal text-[#000000] pl-6 sm:pl-7 max-w-[700px]"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {card.description}
                </p>
              </div>

              {/* Bottom Action Link: Group 2085665786 (Explore SLED -> / Explore Solutions ->) */}
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

                  {/* Animated Arrow Chevron */}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExploreEnvironmentsSection;
