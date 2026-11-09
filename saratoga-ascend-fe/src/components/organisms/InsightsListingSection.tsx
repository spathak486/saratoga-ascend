'use client';

import React, { useState, useMemo } from 'react';
import { BlogCard } from '../molecules/BlogCard';
import { PastPerformanceCard } from '../molecules/PastPerformanceCard';
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

export const InsightsListingSection: React.FC<InsightsListingSectionProps> = ({
  mainHeading = 'Insights',
  mainSubheading = 'Explore insights, news, and proven past performance shaping federal healthcare and defense.',
  showBlog = true,
  blogTitle = 'Latest Blogs',
  blogDescription = 'Explore insights and thought leadership shaping the future of federal healthcare.',
  blogButtonText = 'View More',
  blogButtonUrl,

  showNews = true,
  newsTitle = 'Latest News',
  newsDescription = 'Stay updated with recent press releases, industry announcements, and agency developments.',
  newsButtonText = 'View More',
  newsButtonUrl,

  showPastPerformance = true,
  pastPerformanceTitle = 'Past Performance',
  pastPerformanceDescription = 'Discover how we deliver rapid, compliant, and critical staffing and healthcare solutions.',
  pastPerformanceButtonText = 'View More',
  pastPerformanceButtonUrl,

  blogs = [],
  news = [],
  pastPerformance = [],
}) => {
  // Determine available tabs based on Strapi toggles
  const availableTabs = useMemo(() => {
    const tabs: Array<{ id: 'blog' | 'news' | 'pastPerformance'; label: string }> = [];
    if (showBlog) tabs.push({ id: 'blog', label: 'Blog' });
    if (showNews) tabs.push({ id: 'news', label: 'News' });
    if (showPastPerformance) tabs.push({ id: 'pastPerformance', label: 'Past Performance' });
    return tabs;
  }, [showBlog, showNews, showPastPerformance]);

  const defaultTab = availableTabs[0]?.id || 'blog';
  const [activeTab, setActiveTab] = useState<'blog' | 'news' | 'pastPerformance'>(defaultTab);

  // Number of visible cards (initial 3, increases by 3 on "View More" if no URL provided)
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const handleTabChange = (tabId: 'blog' | 'news' | 'pastPerformance') => {
    setActiveTab(tabId);
    setVisibleCount(3);
  };

  // Format Items
  const formattedBlogs = useMemo(() => {
    return blogs.map((b: any, idx: number) => ({
      id: b.documentId || b.id || `blog-${idx}`,
      title: b.title || 'Untitled',
      readTime: b.readTime ? `${b.readTime}` : undefined,
      date: b.articleDate
        ? new Date(b.articleDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : undefined,
      author: b.author || 'Saratoga Team',
      imageSrc: normalizeImageSrc(b.image?.url || (typeof b.image === 'string' ? b.image : undefined)),
      href: b.slug ? (b.slug.startsWith('/') ? b.slug : `/${b.slug}`) : '#',
      category: b.category?.name || b.category || 'Blog',
    }));
  }, [blogs]);

  const formattedNews = useMemo(() => {
    return news.map((n: any, idx: number) => ({
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
      category: n.topic || n.categoryType || 'News',
    }));
  }, [news]);

  const formattedPastPerformance = useMemo(() => {
    return pastPerformance.map((cs: any, idx: number) => ({
      id: cs.documentId || cs.id || `cs-${idx}`,
      title: cs.title || 'Untitled',
      body: cs.summary || cs.body || '',
      imageSrc: normalizeImageSrc(cs.image?.url || (typeof cs.image === 'string' ? cs.image : undefined)),
      href: cs.slug ? (cs.slug.startsWith('/') ? cs.slug : `/${cs.slug}`) : undefined,
    }));
  }, [pastPerformance]);

  // Current tab info (Title, Description, Button Text, Button URL)
  const currentTabMeta = useMemo(() => {
    if (activeTab === 'blog') {
      return {
        title: blogTitle,
        description: blogDescription,
        buttonText: blogButtonText || 'View More',
        buttonUrl: blogButtonUrl,
      };
    }
    if (activeTab === 'news') {
      return {
        title: newsTitle,
        description: newsDescription,
        buttonText: newsButtonText || 'View More',
        buttonUrl: newsButtonUrl,
      };
    }
    return {
      title: pastPerformanceTitle,
      description: pastPerformanceDescription,
      buttonText: pastPerformanceButtonText || 'View More',
      buttonUrl: pastPerformanceButtonUrl,
    };
  }, [
    activeTab,
    blogTitle,
    blogDescription,
    blogButtonText,
    blogButtonUrl,
    newsTitle,
    newsDescription,
    newsButtonText,
    newsButtonUrl,
    pastPerformanceTitle,
    pastPerformanceDescription,
    pastPerformanceButtonText,
    pastPerformanceButtonUrl,
  ]);

  // Current active list
  const currentItems = useMemo(() => {
    if (activeTab === 'blog') return formattedBlogs;
    if (activeTab === 'news') return formattedNews;
    if (activeTab === 'pastPerformance') return formattedPastPerformance;
    return [];
  }, [activeTab, formattedBlogs, formattedNews, formattedPastPerformance]);

  const displayedItems = currentItems.slice(0, visibleCount);
  const hasMore = visibleCount < currentItems.length || Boolean(currentTabMeta.buttonUrl);

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1680px]">
        {/* Main Section Header */}
        {(mainHeading || mainSubheading) && (
          <div className="flex flex-col items-start gap-4 mb-10 max-w-4xl">
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

        {/* Toggle Buttons (Tabs) */}
        {availableTabs.length > 1 && (
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {availableTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-7 py-3 rounded-full text-[18px] md:text-[20px] font-sans font-medium transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#B81C31] text-white border-transparent shadow-md'
                      : 'bg-white text-[#717171] border-[#E3E3E3] hover:border-[#B81C31] hover:text-[#B81C31]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Tab Heading & Description (Dynamic from CMS) */}
        {(currentTabMeta.title || currentTabMeta.description) && (
          <div className="flex flex-col items-start gap-3 mb-10 max-w-4xl">
            {currentTabMeta.title && (
              <h2 className="text-[clamp(28px,2.5vw,44px)] leading-[1.25] font-serif font-normal text-[#0A0A0A]">
                {currentTabMeta.title}
              </h2>
            )}
            {currentTabMeta.description && (
              <p className="text-[clamp(16px,1.2vw,20px)] leading-[1.5] text-[#555555] font-sans font-normal">
                {currentTabMeta.description}
              </p>
            )}
          </div>
        )}

        {/* 3 Card Grid */}
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px] w-full">
            {activeTab === 'pastPerformance'
              ? displayedItems.map((item: any) => (
                  <div key={item.id} className="w-full h-full min-h-[450px]">
                    <PastPerformanceCard
                      title={item.title}
                      body={item.body}
                      imageSrc={item.imageSrc}
                      href={item.href}
                    />
                  </div>
                ))
              : displayedItems.map((item: any) => (
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
          <div className="text-center py-16 text-[#717171] text-lg font-sans">
            No entries found for {availableTabs.find((t) => t.id === activeTab)?.label || 'this section'}.
          </div>
        )}

        {/* View More Button */}
        {hasMore && (
          <div className="mt-14 flex justify-center">
            {currentTabMeta.buttonUrl ? (
              <Link
                href={currentTabMeta.buttonUrl}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#B81C31] text-[#B81C31] font-sans text-base font-semibold transition-all duration-300 hover:bg-[#B81C31] hover:text-white group"
              >
                <span>{currentTabMeta.buttonText}</span>
                <svg
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            ) : (
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#B81C31] text-[#B81C31] font-sans text-base font-semibold transition-all duration-300 hover:bg-[#B81C31] hover:text-white group"
              >
                <span>{currentTabMeta.buttonText}</span>
                <svg
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
