'use client';
import React, { useState } from 'react';
import { Heading } from '../atoms/Heading';
import { BlogCard } from '../molecules/BlogCard';
import { FeaturedBlogCard } from '../molecules/FeaturedBlogCard';
import { HeroSection } from './HeroSection';

export interface BlogListingSectionProps {
  title?: string;
  subTitle?: string;
  blogs?: any[];
}

export const BlogListingSection: React.FC<BlogListingSectionProps> = ({
  title = 'Blogs',
  subTitle = 'Explore Insights Shaping the Future of Federal Healthcare',
  blogs = [],
}) => {
  const [activeCategory, setActiveCategory] = useState('All Topics');

  const formattedBlogs = blogs.map((b: any) => ({
    id: b.documentId || b.id || Math.random().toString(),
    title: b.title || 'Untitled',
    readTime: b.readTime ? `${b.readTime} min` : undefined,
    date: b.articleDate
      ? new Date(b.articleDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : undefined,
    author: b.author || 'Saratoga Team',
    category: b.category?.name || b.category || 'Uncategorized',
    imageSrc: b.image?.url || undefined,
    href: b.slug ? `/${b.slug}` : '#',
    excerpt: b.excerpt || undefined,
  }));

  const categories = [
    'All Topics',
    ...Array.from(new Set(formattedBlogs.map(b => b.category).filter(c => c && c !== 'Uncategorized')))
  ];

  const displayBlogs = formattedBlogs.filter((blog) => {
    const matchCategory = activeCategory === 'All Topics' || blog.category === activeCategory;
    return matchCategory;
  });

  return (
    <>
      {/* Main Content */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-[1680px]">

          {/* Filters Top Bar */}
          <div className="flex flex-col items-center justify-center gap-[40px] mb-16">


            {/* Separator / Categories Filter */}
            {categories.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-5">
                {categories.map((cat) => (
                  <button
                    key={cat as string}
                    onClick={() => setActiveCategory(cat as string)}
                    className={`px-5 py-2 rounded-full text-[20px] font-sans font-medium transition-colors border ${activeCategory === cat
                      ? 'bg-[#B81C31] text-white border-transparent shadow-sm'
                      : 'bg-white text-[#717171] border-[#E3E3E3] hover:bg-gray-50'
                      }`}
                  >
                    {cat as string}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid Container */}
          <div className="flex flex-col items-center gap-[40px] w-full mx-auto">

            {/* Featured Blog Card */}
            {displayBlogs.length > 0 && (
              <FeaturedBlogCard
                title={displayBlogs[0].title}
                excerpt={displayBlogs[0].excerpt}
                readTime={displayBlogs[0].readTime}
                date={displayBlogs[0].date}
                author={displayBlogs[0].author}
                imageSrc={displayBlogs[0].imageSrc}
                href={displayBlogs[0].href}
              />
            )}

            {/* List Heading (Below Featured) */}
            {(title || subTitle) && displayBlogs.length > 1 && (
              <div className="w-full flex flex-col items-start gap-[12px] mt-[64px] mb-[32px]">
                {title && (
                  <h2 className="text-[40px] md:text-[72px] leading-[1.2] font-serif font-normal text-[#D31E2D]">
                    {title}
                  </h2>
                )}
                {subTitle && (
                  <p className="text-[20px] md:text-[30px] leading-[1.33] text-[#0A0A0A] font-sans font-normal max-w-[1041px]">
                    {subTitle}
                  </p>
                )}
              </div>
            )}

            {/* Blog Grid */}
            {displayBlogs.length > 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px] w-full">
                {displayBlogs.slice(1).map((blog, idx) => (
                  <BlogCard
                    key={`${blog.id}-${idx}`}
                    title={blog.title}
                    readTime={blog.readTime}
                    date={blog.date}
                    author={blog.author}
                    imageSrc={blog.imageSrc}
                    href={blog.href}
                  />
                ))}
              </div>
            ) : displayBlogs.length === 0 ? (
              <div className="text-center py-12 text-brand-neutral w-full">
                No blogs found matching the selected filters.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};
