'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../atoms';
import { stripHtml } from '@/lib/utils/text';

export interface RelatedPostItem {
  id?: string | number;
  title: string;
  slug?: string | null;
  href?: string | null;
  image?: { url?: string | null; alternativeText?: string | null } | string | null;
  readTime?: number | string | null;
  articleDate?: string | null;
  publishedAt?: string | null;
}

export interface RelatedPostsSectionProps {
  title?: string;
  items: RelatedPostItem[];
  type?: 'blog' | 'case-study' | 'news';
  className?: string;
}

/**
 * Related Posts Section (Figma Group 2085665619 / Frame 2147226388)
 * - Container: max-w-[1680px], top divider #D9D9D9 (2px)
 * - Header Row:
 *   - Heading: "Related Blog" / "Related News" / "Related Case Studies" in 'DM Serif Text', 72px, line-height 86px (120%), color #D31E2D
 *   - Slider Controls (Group 2085665586):
 *     - Prev / Next circular buttons (66px x 66px, border 1.38px solid #000000, rounded-full)
 *     - Resting state: white with black stroke, hover state: subtle shadow / accent
 * - Cards Carousel Row (Frame 2147226385):
 *   - 3 columns visible on desktop (544px card width, gap 24px)
 *   - Card Frame: rounded-tr-[100px]
 *   - Image: 544px x 431px, rounded-tr-[100px], object-cover
 *   - Meta row: Google Sans Flex, 22px, line-height 33px (150%), e.g. "5 min read · August 12, 2026" + Arrow icon
 *   - Title: DM Serif Text, 44px, line-height 53px (120%), color #000000
 */
export const RelatedPostsSection: React.FC<RelatedPostsSectionProps> = ({
  title,
  items,
  type = 'blog',
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const defaultTitle =
    title ||
    (type === 'news'
      ? 'Related News'
      : type === 'case-study'
        ? 'Related Case Studies'
        : 'Related Blog');

  if (!items || items.length === 0) return null;

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

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [items]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 544 + 24; // card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(updateScrollButtons, 350);
  };

  return (
    <section
      aria-label={defaultTitle}
      className={`relative w-full overflow-hidden bg-white py-12 sm:py-16 xl:py-24 ${className}`.trim()}
    >
      {/* Top Divider (Rectangle 40098: 1680px, 2px, #D9D9D9) */}
      <Container className="mb-10 sm:mb-14 xl:mb-16">
        <div className="h-[2px] w-full bg-[#D9D9D9]" aria-hidden="true" />
      </Container>

      <Container>
        {/* Header Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="font-serif text-[40px] font-normal leading-[1.2] text-[#D31E2D] sm:text-[54px] xl:text-[72px] xl:leading-[86px]"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {defaultTitle}
          </h2>

          {/* Slider Prev/Next Controls (Group 2085665586) */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous slide"
              className={`flex size-[54px] items-center justify-center rounded-full border border-black transition-all duration-300 sm:size-[66px] ${
                canScrollLeft
                  ? 'cursor-pointer hover:bg-black hover:text-white'
                  : 'cursor-not-allowed opacity-40'
              }`}
            >
              <svg
                className="size-6 -rotate-180 sm:size-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next slide"
              className={`flex size-[54px] items-center justify-center rounded-full border border-black transition-all duration-300 sm:size-[66px] ${
                canScrollRight
                  ? 'cursor-pointer hover:bg-black hover:text-white'
                  : 'cursor-not-allowed opacity-40'
              }`}
            >
              <svg
                className="size-6 sm:size-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel / Cards Track */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="no-scrollbar mt-10 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 sm:mt-12 xl:mt-[42px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => {
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

            let rawImg =
              typeof item.image === 'string'
                ? item.image
                : item.image?.url;
            if (rawImg && rawImg.startsWith('/') && !rawImg.startsWith('/images/')) {
              const strapiBase = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
              rawImg = `${strapiBase}${rawImg}`;
            }
            const imgSrc = rawImg || '/images/card_img.png';

            const readTimeStr = item.readTime ? `${item.readTime} min read` : '5 min read';
            const dateStr = formatDate(item.articleDate || item.publishedAt);
            const metaText = dateStr ? `${readTimeStr} · ${dateStr}` : readTimeStr;

            return (
              <article
                key={`related-post-${item.id || index}-${item.slug || index}`}
                className="group relative flex w-[300px] shrink-0 snap-start flex-col gap-6 sm:w-[420px] sm:gap-[30px] xl:w-[544px]"
              >
                {/* Image Frame with rounded-tr-[100px] */}
                <div className="relative aspect-[544/431] w-full overflow-hidden rounded-tr-[70px] bg-[#E2E8F0] sm:rounded-tr-[100px]">
                  <Link href={itemHref} tabIndex={-1} aria-hidden="true" className="block size-full">
                    <Image
                      src={imgSrc}
                      alt={itemTitle}
                      fill
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 544px"
                      className="rounded-tr-[70px] object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:rounded-tr-[100px]"
                    />
                  </Link>
                </div>

                {/* Content Block */}
                <div className="flex flex-col gap-3">
                  {/* Meta row + animated arrow */}
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="font-sans text-[18px] font-normal leading-[150%] text-[#000000] sm:text-[20px] xl:text-[22px] xl:leading-[33px]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {metaText}
                    </span>

                    <span className="inline-flex size-8 shrink-0 items-center justify-center text-black transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                      <svg
                        className="size-7"
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

                  {/* Title (Heading 03: DM Serif Text, 44px, line-height 53px) */}
                  <h3
                    className="font-serif text-[28px] font-normal leading-[1.2] text-[#000000] transition-colors duration-200 group-hover:text-[#D31E2D] sm:text-[36px] xl:text-[44px] xl:leading-[53px]"
                    style={{ fontFamily: "'DM Serif Text', serif" }}
                  >
                    <Link href={itemHref} className="focus:outline-none focus-visible:underline">
                      {itemTitle}
                    </Link>
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default RelatedPostsSection;

