import React from 'react';
import Link from 'next/link';

export interface RelatedTopicsCardProps {
  title?: string | null;
  topics?: Array<{ label: string; href?: string }> | string[] | null;
  className?: string;
}

/**
 * Related Topics Component (Figma Group 2085665613)
 * - Placement: Left-hand sticky sidebar for Blog, Case Study, and News detail pages
 * - Header: 'RELATED TOPICS' in 'DM Serif Text', 40px, line-height 40px, color #F01424
 * - Divider: 524px width, 1.09px height, background #2B88D9
 * - Pills: auto layout flex items, padding 16px 20px, border-radius 19.65px, border border-black/10 or subtle bg
 * - Pill text: 'Google Sans Flex', 20px, font-weight 600, line-height 22px, color #000000
 */
export const RelatedTopicsCard: React.FC<RelatedTopicsCardProps> = ({
  title = 'RELATED TOPICS',
  topics,
  className = '',
}) => {
  // Normalize topics into array of objects with label & href
  const normalizedTopics: Array<{ label: string; href: string }> = React.useMemo(() => {
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return [];
    }
    return topics
      .map((item) => {
        if (typeof item === 'string') {
          const trimmed = item.trim();
          if (!trimmed) return null;
          return {
            label: trimmed,
            href: `/insights?topic=${encodeURIComponent(trimmed)}`,
          };
        }
        if (item && typeof item === 'object' && item.label) {
          const trimmed = item.label.trim();
          if (!trimmed) return null;
          return {
            label: trimmed,
            href: item.href || `/insights?topic=${encodeURIComponent(trimmed)}`,
          };
        }
        return null;
      })
      .filter((t): t is { label: string; href: string } => Boolean(t));
  }, [topics]);

  if (normalizedTopics.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Related Topics"
      className={`box-border flex w-full max-w-[32.8125rem] flex-col gap-5 ${className}`.trim()}
    >
      {/* Title */}
      <h2
        className="font-serif text-[2rem] font-normal uppercase leading-tight tracking-tight text-[#F01424] sm:text-[2.25rem] xl:text-[2.5rem] xl:leading-[2.5rem]"
        style={{ fontFamily: "'DM Serif Text', serif" }}
      >
        {title}
      </h2>

      {/* Blue Divider Line (#2B88D9, 1.09px) */}
      <div
        className="h-[1.092px] w-full bg-[#2B88D9]"
        style={{ backgroundColor: '#2B88D9' }}
        aria-hidden="true"
      />

      {/* Tags / Pills Layout (Figma Node 2209:4609: gradient border #D31E2D to #2A91DC, rounded-[19.65px], px-[20px] py-[16px]) */}
      <div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
        {normalizedTopics.map((topic, index) => (
          <Link
            key={`topic-${index}-${topic.label}`}
            href={topic.href}
            className="group relative inline-flex items-center justify-center p-[1.637px] rounded-[19.65px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] transition-all duration-300 ease-out hover:shadow-[0_4px_16px_rgba(42,145,220,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            style={{
              fontFamily: "'Google Sans Flex', sans-serif",
            }}
          >
            {/* Inner background capsule that reveals full gradient on hover */}
            <div className="w-full h-full rounded-[18px] bg-white px-5 py-3.5 transition-colors duration-300 ease-out group-hover:bg-transparent flex items-center justify-center">
              <span className="font-sans text-[1.125rem] font-semibold leading-[1.365rem] text-[#000000] transition-colors duration-300 ease-out group-hover:text-white xl:text-[1.25rem]">
                {topic.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedTopicsCard;

