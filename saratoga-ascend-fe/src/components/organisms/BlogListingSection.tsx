'use client';
import React, { useState } from 'react';
import { Heading } from '../atoms/Heading';
import { BlogCard } from '../molecules/BlogCard';

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
  const [activeMode, setActiveMode] = useState('All Articles');
  const [activeTopic, setActiveTopic] = useState('All Topics');

  const formattedBlogs = blogs.map((b: any) => ({
    id: b.documentId || b.id || Math.random().toString(),
    title: b.title || 'Untitled',
    readTime: b.readTime ? `${b.readTime} min` : undefined,
    date: b.articleDate 
      ? new Date(b.articleDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : undefined,
    author: b.author || 'Saratoga Team',
    topic: b.topic || 'Uncategorized',
    readingMode: b.categoryType || 'Article',
    imageSrc: b.image?.url || undefined,
    href: b.slug ? `/${b.slug}` : '#',
  }));

  const topics = ['All Topics', ...Array.from(new Set(formattedBlogs.map(b => b.topic).filter(Boolean)))];
  const readingModes = ['All Articles', ...Array.from(new Set(formattedBlogs.map(b => b.readingMode).filter(Boolean)))];

  const displayBlogs = formattedBlogs.filter((blog) => {
    const matchMode = activeMode === 'All Articles' || blog.readingMode === activeMode;
    const matchTopic = activeTopic === 'All Topics' || blog.topic === activeTopic;
    return matchMode && matchTopic;
  });

  return (
    <section className="w-full bg-brand-surface py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Filters Top Bar */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
          {/* Reading Mode Filter */}
          {readingModes.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-neutral mr-2">
                Reading Mode:
              </span>
              {readingModes.map((mode) => (
                <button
                  key={mode as string}
                  onClick={() => setActiveMode(mode as string)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeMode === mode
                      ? 'bg-brand-navy text-white'
                      : 'bg-white text-brand-neutral border border-brand-neutral/20 hover:border-brand-navy hover:text-brand-navy'
                  }`}
                >
                  {mode as string}
                </button>
              ))}
            </div>
          )}

          {/* Separator / Topics Filter */}
          {topics.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {topics.map((topic) => (
                <button
                  key={topic as string}
                  onClick={() => setActiveTopic(topic as string)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                    activeTopic === topic
                      ? 'bg-brand-red text-white'
                      : 'bg-white text-brand-neutral border border-brand-neutral/20 hover:border-brand-red hover:text-brand-red'
                  }`}
                >
                  {topic as string}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Header & Grid Container */}
        <div className="flex flex-col items-start gap-[40px] w-full max-w-[1680px] mx-auto">
          {/* Header */}
          <div className="flex flex-col items-start gap-[12px] w-full max-w-[1470px]">
            <Heading level={2} className="font-serif font-normal text-[72px] leading-[1.2] text-[#D31E2D]">
              {title}
            </Heading>
            {subTitle && (
              <p className="font-sans font-normal text-[30px] leading-[40px] text-[#0A0A0A]">
                {subTitle}
              </p>
            )}
          </div>

          {/* Blog Grid */}
          {displayBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full max-w-[1680px]">
              {displayBlogs.map((blog, idx) => (
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
          ) : (
          <div className="text-center py-12 text-brand-neutral w-full">
            No blogs found matching the selected filters.
          </div>
        )}
        </div>
      </div>
    </section>
  );
};
