import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { stripHtml } from '@/lib/utils/text';

export interface TrendingItem {
  id?: string | number;
  title: string;
  slug?: string | null;
  href?: string | null;
  image?: { url?: string | null; alternativeText?: string | null } | string | null;
  readTime?: number | string | null;
  articleDate?: string | null;
  publishedAt?: string | null;
}

export interface TrendingSidebarSectionProps {
  title?: string;
  items: TrendingItem[];
  type?: 'blog' | 'case-study' | 'news';
  className?: string;
}

/**
 * Trending Posts Sidebar Component (Figma Group 2085665620)
 * - Heading: "Trending Blog" / "Trending Case Studies" / "Trending News" in 'DM Serif Text', 40px, line-height 40px, color #F01424
 * - Divider line under heading: Rectangle 18017 (541.77px, 1.09px, background #2B88D9)
 * - Post Card (Blog component 4 & 6):
 *   - Container: 471px width, rounded-tr-[86.6px]
 *   - Image: height 373px, rounded-tr-[86.6px], object-cover
 *   - Meta row: Google Sans Flex, 19px, line-height 29px (e.g. "5 min read · August 12, 2026") + Arrow icon
 *   - Title: DM Serif Text, 38px, line-height 46px (120%), color #000000
 *   - Divider line between cards: Rectangle 18018 (558px, 1px, background #2B88D9)
 */
export const TrendingSidebarSection: React.FC<TrendingSidebarSectionProps> = ({
  title,
  items,
  type = 'blog',
  className = '',
}) => {
  if (!items || items.length === 0) return null;

  const defaultHeading =
    title ||
    (type === 'news'
      ? 'Trending News'
      : type === 'case-study'
        ? 'Trending Case Studies'
        : 'Trending Blog');

  // Format date helper
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section
      aria-label={defaultHeading}
      className={`box-border flex w-full max-w-[558px] flex-col gap-6 ${className}`.trim()}
    >
      {/* Title */}
      <div className="flex flex-col gap-5">
        <h2
          className="font-serif text-[32px] font-normal leading-tight text-[#F01424] sm:text-[36px] xl:text-[40px] xl:leading-[40px]"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {defaultHeading}
        </h2>

        {/* Divider line 1 (Rectangle 18017) */}
        <div
          className="h-[1.5px] w-full bg-[#2B88D9]"
          style={{ backgroundColor: '#2B88D9' }}
          aria-hidden="true"
        />
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-8">
        {items.map((item, idx) => {
          const itemTitle = stripHtml(item.title || '');
          const itemHref =
            item.href ||
            (item.slug
              ? item.slug.startsWith('/')
                ? item.slug
                : type === 'news'
                  ? `/news/${item.slug}`
                  : type === 'case-study'
                    ? `/case-studies/${item.slug}`
                    : `/blogs/${item.slug}`
              : '#');

          const imgSrc =
            typeof item.image === 'string'
              ? item.image
              : item.image?.url || '/images/card_img.png';

          const readTimeStr = item.readTime ? `${item.readTime} min read` : '5 min read';
          const dateStr = formatDate(item.articleDate || item.publishedAt);
          const metaText = dateStr ? `${readTimeStr} · ${dateStr}` : readTimeStr;

          return (
            <React.Fragment key={`trending-${item.id || idx}-${item.slug || idx}`}>
              {idx > 0 && (
                /* Divider line between items (Rectangle 18018) */
                <div
                  className="h-[1px] w-full bg-[#2B88D9]"
                  style={{ backgroundColor: '#2B88D9' }}
                  aria-hidden="true"
                />
              )}

              <article className="group relative flex w-full max-w-[471px] flex-col gap-[26px]">
                {/* Image Frame with rounded-tr-[86.6px] */}
                <div className="relative aspect-[471/373] w-full overflow-hidden rounded-tr-[86.6px] bg-[#E2E8F0]">
                  <Link href={itemHref} tabIndex={-1} aria-hidden="true" className="block size-full">
                    <Image
                      src={imgSrc}
                      alt={itemTitle}
                      fill
                      sizes="(max-width: 640px) 100vw, 471px"
                      className="rounded-tr-[86.6px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Content Block */}
                <div className="flex flex-col gap-2.5">
                  {/* Meta row + animated arrow */}
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="font-sans text-[16px] font-normal leading-[150%] text-[#000000] sm:text-[18px] xl:text-[19px] xl:leading-[29px]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {metaText}
                    </span>

                    <span className="inline-flex size-7 shrink-0 items-center justify-center text-black transition-transform duration-300 ease-out group-hover:translate-x-1">
                      <svg
                        className="size-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif text-[26px] font-normal leading-[1.2] text-[#000000] transition-colors duration-200 group-hover:text-[#2B88D9] sm:text-[32px] xl:text-[38px] xl:leading-[46px]"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    <Link href={itemHref} className="focus:outline-none focus-visible:underline">
                      {itemTitle}
                    </Link>
                  </h3>
                </div>
              </article>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingSidebarSection;

