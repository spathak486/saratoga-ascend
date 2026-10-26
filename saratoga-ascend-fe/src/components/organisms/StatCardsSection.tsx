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

  const sectionId =
    id ||
    (title
      ? title
          .toLowerCase()
          .trim()
          .replace(/[^\p{L}\p{N}\s-]/gu, '')
          .replace(/[\s-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : undefined);

  return (
    <section
      id={sectionId}
      className={`w-full max-w-[1054px] my-6 md:my-8 scroll-mt-28 ${className}`}
    >
      {title && (
        <h2 className="font-outfit font-semibold text-[28px] sm:text-[34px] md:text-[40px] leading-[110%] md:leading-[34px] tracking-[0.03em] capitalize text-[#000000] mb-6">
          {title}
        </h2>
      )}

      <div
        className={`grid gap-4 sm:gap-6 w-full ${
          cards.length === 1
            ? 'grid-cols-1'
            : cards.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#EAF0F6] rounded-[24px] p-6 sm:p-8 flex flex-col justify-start transition-transform duration-200 hover:-translate-y-0.5"
          >
            {/* Header: Metric & Badge */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
              <span className="font-sans font-bold text-[36px] sm:text-[42px] leading-[110%] text-[#362A4E] tracking-tight">
                {card.metric}
              </span>
              {card.badge && (
                <span className="font-sans font-semibold text-[12px] sm:text-[13px] tracking-[0.08em] uppercase text-[#615777]">
                  {card.badge}
                </span>
              )}
            </div>

            {/* Description Text */}
            <p className="font-sans font-normal text-[16px] sm:text-[18px] leading-[150%] text-[#4A4A4A]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
