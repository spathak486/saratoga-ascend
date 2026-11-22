import { stripHtml } from '@/lib/utils/text';
import React from 'react';

export interface StatCardItem {
  metric: string;
  badge?: string | null;
  description: string;
}

export interface StatCardsSectionProps {
  id?: string;
  title?: string | null;
  cards?: StatCardItem[] | null;
  className?: string;
}

/**
 * StatCards / FeatureCards component for Blog & Article detail pages.
 * Renders scientific metrics, stats, or highlight comparison cards with:
 * - Section Title (DM Serif / Google Sans Flex)
 * - Grid of rounded cards (#EAF0F6) with large metric (e.g., "415 nm"), badge ("BLUE LIGHT"), and description text.
 */
export const StatCardsSection: React.FC<StatCardsSectionProps> = ({
  id,
  title,
  cards,
  className = '',
}) => {
  if (!cards || cards.length === 0) return null;

  // Only use an explicit id — blog detail wraps sections with the TOC target id.
  return (
    <section
      id={id}
      className={`my-4 w-full max-w-[65.875rem] scroll-mt-28 sm:my-6 xl:my-8 ${className}`}
    >
      {title && (
        <h2 className="mb-4 font-serif text-[1.5rem] font-normal capitalize leading-[1.2] tracking-[-0.02em] text-ink sm:mb-5 sm:text-[2rem] xl:mb-6 xl:text-[2.5rem]">
          {stripHtml(title)}
        </h2>
      )}

      <div
        className={`grid w-full gap-4 sm:gap-5 xl:gap-6 ${
          cards.length === 1
            ? 'grid-cols-1'
            : cards.length === 2
            ? 'grid-cols-1 xl:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
        }`}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-start rounded-[1.25rem] bg-[#EAF0F6] p-5 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:rounded-[1.5rem] sm:p-6 xl:p-8"
          >
            {/* Header: Metric & Badge */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
              <span className="font-sans font-bold text-[2.25rem] sm:text-[2.625rem] leading-[110%] text-[#362A4E] tracking-tight">
                {card.metric}
              </span>
              {card.badge && (
                <span className="font-sans font-semibold text-[0.75rem] sm:text-[0.8125rem] tracking-[0.08em] uppercase text-[#615777]">
                  {card.badge}
                </span>
              )}
            </div>

            {/* Description Text */}
            <p className="line-clamp-4 min-w-0 break-words font-sans font-normal text-[1rem] sm:text-[1.125rem] leading-[150%] text-[#4A4A4A]">
              {stripHtml(card.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
