'use client';

import React, { useMemo } from 'react';
import { BlogCard } from '../molecules/BlogCard';
import Link from 'next/link';

export interface InsightsListingSectionProps {
  mainHeading?: string;
  mainSubheading?: string;
  showBlog?: boolean;
  blogTitle?: string;
  blogDescription?: string;
  blogButtonText?: string;
  blogButtonUrl?: string;

  showNews?: boolean;
  newsTitle?: string;
  newsDescription?: string;
  newsButtonText?: string;
  newsButtonUrl?: string;

  showPastPerformance?: boolean;
  pastPerformanceTitle?: string;
  pastPerformanceDescription?: string;
  pastPerformanceButtonText?: string;
  pastPerformanceButtonUrl?: string;

  blogs?: any[];
  news?: any[];
  pastPerformance?: any[];
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

const CTA_BUTTON_CLASSES =
  'inline-flex items-center justify-center border font-sans font-medium transition-opacity duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-cta min-w-cta-wide gap-3 px-cta-x py-cta-y text-button shadow-button rounded-button bg-cta-gradient border-transparent text-brand-on-dark hover:opacity-90 focus-visible:outline-brand-navy w-auto whitespace-nowrap h-cta';

export const InsightsListingSection: React.FC<InsightsListingSectionProps> = ({
  mainHeading = 'Insights',
  mainSubheading = 'Explore insights, news, and proven past performance shaping federal healthcare and defense.',
  showBlog = true,
  blogTitle = 'Latest Blogs',
  blogDescription = 'Explore insights and thought leadership shaping the future of federal healthcare.',
  blogButtonText = 'View More',
  blogButtonUrl = '/blogs',

  showNews = true,
  newsTitle = 'Latest News',
  newsDescription = 'Stay updated with recent press releases, industry announcements, and agency developments.',
  newsButtonText = 'View More',
  newsButtonUrl = '/news',

  showPastPerformance = true,
  pastPerformanceTitle = 'Past Performance',
  pastPerformanceDescription = 'Discover how we deliver rapid, compliant, and critical staffing and healthcare solutions.',
  pastPerformanceButtonText = 'View More',
  pastPerformanceButtonUrl = '/case-studies',

  blogs = [],
  news = [],
  pastPerformance = [],
}) => {
  // Format Items (Top 3 for each)
  const formattedBlogs = useMemo(() => {
    return blogs.slice(0, 3).map((b: any, idx: number) => ({
      id: b.documentId || b.id || `blog-${idx}`,
      title: b.title || 'Untitled',
      readTime: b.readTime ? `${b.readTime}` : undefined,
      date: b.articleDate
        ? new Date(b.articleDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : undefined,
      author: b.author || 'Saratoga Team',
      imageSrc: normalizeImageSrc(b.image?.url || (typeof b.image === 'string' ? b.image : undefined)),
      href: b.slug ? (b.slug.startsWith('/') ? b.slug : `/${b.slug}`) : '#',
    }));
  }, [blogs]);

  const formattedNews = useMemo(() => {
    return news.slice(0, 3).map((n: any, idx: number) => ({
      id: n.documentId || n.id || `news-${idx}`,
      title: n.title || 'Untitled',
      readTime: n.readTime ? `${n.readTime}` : undefined,
      date: n.articleDate
        ? new Date(n.articleDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : n.publishedAt
        ? new Date(n.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : undefined,
      author: n.author || 'Saratoga Team',
      imageSrc: normalizeImageSrc(n.image?.url || (typeof n.image === 'string' ? n.image : undefined)),
      href: n.slug ? (n.slug.startsWith('/') ? n.slug : `/${n.slug}`) : '#',
    }));
  }, [news]);

  const formattedPastPerformance = useMemo(() => {
    return pastPerformance.slice(0, 3).map((cs: any, idx: number) => ({
      id: cs.documentId || cs.id || `cs-${idx}`,
      title: cs.title || 'Untitled',
      readTime: cs.readTime ? `${cs.readTime}` : undefined,
      date: cs.articleDate
        ? new Date(cs.articleDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : undefined,
      author: cs.client || cs.author || 'Saratoga Team',
      imageSrc: normalizeImageSrc(cs.image?.url || (typeof cs.image === 'string' ? cs.image : undefined)),
      href: cs.slug ? (cs.slug.startsWith('/') ? cs.slug : `/${cs.slug}`) : '#',
    }));
  }, [pastPerformance]);

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1680px]">
        {/* Main Section Header */}
        {(mainHeading || mainSubheading) && (
          <div className="flex flex-col items-start gap-4 mb-16 md:mb-20 max-w-4xl">
            {mainHeading && (
              <h1 className="text-[clamp(36px,4vw,64px)] leading-[1.2] font-serif font-normal text-[#D31E2D]">
                {mainHeading}
              </h1>
            )}
            {mainSubheading && (
              <p className="text-[clamp(18px,1.6vw,26px)] leading-[1.4] text-[#0A0A0A] font-sans font-normal">
                {mainSubheading}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-24 md:gap-32 w-full">
          {/* 1. BLOGS SECTION */}
          {showBlog && (
            <div className="flex flex-col w-full">
              {/* Blog Header with Right-Aligned View More Button */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 w-full">
                <div className="flex flex-col items-start gap-3 max-w-3xl">
                  {blogTitle && (
                    <h2 className="text-[clamp(28px,2.5vw,44px)] leading-[1.25] font-serif font-normal text-[#0A0A0A]">
                      {blogTitle}
                    </h2>
                  )}
                  {blogDescription && (
                    <p className="text-[clamp(16px,1.2vw,20px)] leading-[1.5] text-[#555555] font-sans font-normal">
                      {blogDescription}
                    </p>
                  )}
                </div>

                {blogButtonText && (
                  <div className="shrink-0">
                    <Link
                      href={blogButtonUrl || '/blogs'}
                      className={CTA_BUTTON_CLASSES}
                    >
                      <span>{blogButtonText}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>

              {/* Blog 3 Cards */}
              {formattedBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px] w-full">
                  {formattedBlogs.map((item) => (
                    <BlogCard
                      key={item.id}
                      title={item.title}
                      readTime={item.readTime}
                      date={item.date}
                      author={item.author}
                      imageSrc={item.imageSrc}
                      href={item.href}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-[#717171] text-base font-sans">
                  No blogs available at the moment.
                </div>
              )}
            </div>
          )}

          {/* 2. NEWS SECTION */}
          {showNews && (
            <div className="flex flex-col w-full">
              {/* News Header with Right-Aligned View More Button */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 w-full">
                <div className="flex flex-col items-start gap-3 max-w-3xl">
                  {newsTitle && (
                    <h2 className="text-[clamp(28px,2.5vw,44px)] leading-[1.25] font-serif font-normal text-[#0A0A0A]">
                      {newsTitle}
                    </h2>
                  )}
                  {newsDescription && (
                    <p className="text-[clamp(16px,1.2vw,20px)] leading-[1.5] text-[#555555] font-sans font-normal">
                      {newsDescription}
                    </p>
                  )}
                </div>

                {newsButtonText && (
                  <div className="shrink-0">
                    <Link
                      href={newsButtonUrl || '/news'}
                      className={CTA_BUTTON_CLASSES}
                    >
                      <span>{newsButtonText}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>

              {/* News 3 Cards */}
              {formattedNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px] w-full">
                  {formattedNews.map((item) => (
                    <BlogCard
                      key={item.id}
                      title={item.title}
                      readTime={item.readTime}
                      date={item.date}
                      author={item.author}
                      imageSrc={item.imageSrc}
                      href={item.href}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-[#717171] text-base font-sans">
                  No news articles available at the moment.
                </div>
              )}
            </div>
          )}

          {/* 3. PAST PERFORMANCE SECTION */}
          {showPastPerformance && (
            <div className="flex flex-col w-full">
              {/* Past Performance Header with Right-Aligned View More Button */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 w-full">
                <div className="flex flex-col items-start gap-3 max-w-3xl">
                  {pastPerformanceTitle && (
                    <h2 className="text-[clamp(28px,2.5vw,44px)] leading-[1.25] font-serif font-normal text-[#0A0A0A]">
                      {pastPerformanceTitle}
                    </h2>
                  )}
                  {pastPerformanceDescription && (
                    <p className="text-[clamp(16px,1.2vw,20px)] leading-[1.5] text-[#555555] font-sans font-normal">
                      {pastPerformanceDescription}
                    </p>
                  )}
                </div>

                {pastPerformanceButtonText && (
                  <div className="shrink-0">
                    <Link
                      href={pastPerformanceButtonUrl || '/case-studies'}
                      className={CTA_BUTTON_CLASSES}
                    >
                      <span>{pastPerformanceButtonText}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>

              {/* Past Performance 3 Cards (Same BlogCard Style) */}
              {formattedPastPerformance.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px] w-full">
                  {formattedPastPerformance.map((item) => (
                    <BlogCard
                      key={item.id}
                      title={item.title}
                      readTime={item.readTime}
                      date={item.date}
                      author={item.author}
                      imageSrc={item.imageSrc}
                      href={item.href}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-[#717171] text-base font-sans">
                  No past performance case studies available at the moment.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
