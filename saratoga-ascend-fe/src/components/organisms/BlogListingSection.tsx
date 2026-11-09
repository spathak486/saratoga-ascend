'use client';
import React, { useState } from 'react';
import { Heading } from '../atoms/Heading';
import { BlogCard } from '../molecules/BlogCard';
import { FeaturedBlogCard } from '../molecules/FeaturedBlogCard';

export interface BlogListingSectionProps {
  title?: string;
  subTitle?: string;
  blogs?: any[];
  items?: any[];
  contentType?: 'blogs' | 'news' | 'case-studies';
}

export const BlogListingSection: React.FC<BlogListingSectionProps> = ({
  title,
  subTitle,
  blogs = [],
  items,
  contentType = 'blogs',
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const normalizeImageSrc = (url?: string | null): string | undefined => {
    if (!url) return undefined;
    if (url.startsWith('/uploads/')) {
      const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
      return `${base.replace(/\/+$/, '')}${url}`;
    }
    return url;
  };

  const rawList = items && items.length > 0 ? items : blogs;

  const defaultTitle =
    contentType === 'news'
      ? 'Latest News'
      : contentType === 'case-studies'
      ? 'Past Performance'
      : 'Blogs';

  const defaultSubTitle =
    contentType === 'news'
      ? 'Stay updated with critical healthcare, policy, and federal announcements'
      : contentType === 'case-studies'
      ? 'Proven solutions and staffing impact across federal defense and healthcare'
      : 'Explore Insights Shaping the Future of Federal Healthcare';

  const finalTitle = title || defaultTitle;
  const finalSubTitle = subTitle || defaultSubTitle;

  const formattedItems = rawList.map((item: any, idx: number) => {
    // Exact category name from CMS Category relation or fallback fields
    // ONLY consider actual Category collection relation, ignore categoryType
    const rawCategory =
      item.category?.name ||
      (typeof item.category === 'string' ? item.category : '') ||
      '';

    const authorOrClient = item.client || item.author || 'Saratoga Team';

    return {
      id: item.documentId || item.id || `item-${idx}`,
      title: item.title || 'Untitled',
      readTime: item.readTime ? `${item.readTime} min` : undefined,
      date: item.articleDate
        ? new Date(item.articleDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : undefined,
      author: authorOrClient,
      category: rawCategory,
      imageSrc: normalizeImageSrc(item.image?.url || (typeof item.image === 'string' ? item.image : undefined)),
      href: item.slug ? (item.slug.startsWith('/') ? item.slug : `/${item.slug}`) : '#',
      excerpt: item.summary || item.excerpt || undefined,
    };
  });

  // Unique categories from items that have a category
  const categories = [
    'All',
    ...Array.from(new Set(formattedItems.map((b) => b.category).filter((c) => c && c.trim() !== ''))),
  ];

  const displayItems = formattedItems.filter((item) => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchCategory;
  });

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1680px]">
        {/* Category Pills (Dynamic from CMS categories) */}
        {categories.length > 1 && (
          <div className="flex flex-col items-center justify-center gap-[40px] mb-16">
            <div className="flex flex-wrap items-center justify-center gap-5">
              {categories.map((cat) => (
                <button
                  key={cat as string}
                  onClick={() => setActiveCategory(cat as string)}
                  className={`px-5 py-2 rounded-full text-[20px] font-sans font-medium transition-colors border ${
                    activeCategory === cat
                      ? 'bg-[#B81C31] text-white border-transparent shadow-sm'
                      : 'bg-white text-[#717171] border-[#E3E3E3] hover:bg-gray-50'
                  }`}
                >
                  {cat as string}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid Container */}
        <div className="flex flex-col items-center gap-[40px] w-full mx-auto">
          {/* Featured Card */}
          {displayItems.length > 0 && (
            <FeaturedBlogCard
              title={displayItems[0].title}
              excerpt={displayItems[0].excerpt}
              readTime={displayItems[0].readTime}
              date={displayItems[0].date}
              author={displayItems[0].author}
              imageSrc={displayItems[0].imageSrc}
              href={displayItems[0].href}
            />
          )}

          {/* List Heading (Below Featured) */}
          {(finalTitle || finalSubTitle) && displayItems.length > 1 && (
            <div className="w-full flex flex-col items-start gap-[12px] mt-[64px] mb-[32px]">
              {finalTitle && (
                <h2 className="text-[clamp(40px,4vw,72px)] leading-[1.2] font-serif font-normal text-[#D31E2D]">
                  {finalTitle}
                </h2>
              )}
              {finalSubTitle && (
                <p className="text-[clamp(20px,1.8vw,30px)] leading-[1.33] text-[#0A0A0A] font-sans font-normal max-w-[1041px]">
                  {finalSubTitle}
                </p>
              )}
            </div>
          )}

          {/* Grid */}
          {displayItems.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px] w-full">
              {displayItems.slice(1).map((item, idx) => (
                <BlogCard
                  key={`${item.id}-${idx}`}
                  title={item.title}
                  readTime={item.readTime}
                  date={item.date}
                  author={item.author}
                  imageSrc={item.imageSrc}
                  href={item.href}
                />
              ))}
            </div>
          ) : displayItems.length === 0 ? (
            <div className="text-center py-12 text-brand-neutral w-full">
              No items found matching the selected filter.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
