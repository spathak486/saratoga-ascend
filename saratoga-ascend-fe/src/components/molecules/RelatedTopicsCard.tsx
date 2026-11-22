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
      className={`box-border flex w-full max-w-[525px] flex-col gap-5 ${className}`.trim()}
    >
      {/* Title */}
      <h2
        className="font-serif text-[32px] font-normal uppercase leading-tight tracking-tight text-[#F01424] sm:text-[36px] xl:text-[40px] xl:leading-[40px]"
        style={{ fontFamily: "'DM Serif Text', serif" }}
      >
        {title}
      </h2>

      {/* Blue Divider Line (#2B88D9, 1.09px) */}
      <div
        className="h-[1.5px] w-full bg-[#2B88D9]"
        style={{ backgroundColor: '#2B88D9' }}
        aria-hidden="true"
      />

      {/* Tags / Pills Layout */}
      <div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
        {normalizedTopics.map((topic, index) => (
          <Link
            key={`topic-${index}-${topic.label}`}
            href={topic.href}
            className="group inline-flex items-center justify-center rounded-[19.65px] border border-black/15 bg-white px-5 py-3.5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#2B88D9] hover:bg-[#F1F8FE] hover:shadow-sm"
          >
            <span
              className="font-sans text-[18px] font-semibold leading-[22px] text-[#000000] transition-colors duration-200 group-hover:text-[#2B88D9] xl:text-[20px]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              {topic.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedTopicsCard;

