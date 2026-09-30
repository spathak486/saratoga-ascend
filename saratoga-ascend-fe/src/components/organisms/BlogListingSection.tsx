'use client';
import React, { useState } from 'react';
import { Heading } from '../atoms/Heading';
import { BlogCard } from '../molecules/BlogCard';

export interface BlogListingSectionProps {
  title?: string;
  subTitle?: string;
  blogs?: any[]; // We will pass blogs from server later, for now we mock it
}

// Temporary Mock Data for UI presentation
const MOCK_BLOGS = [
  {
    id: 1,
    title: 'How we support state and local agencies',
    readTime: '5 min',
    date: 'August 12, 2026',
    author: 'Jane Cooper',
    topic: 'Military Medicine',
    readingMode: '3-Min Executive Brief',
    imageSrc: '/images/healthcare-team.png',
    href: '/blog/support-agencies',
  },
  {
    id: 2,
    title: 'Advancing Federal Healthcare with Technology',
    readTime: '7 min',
    date: 'August 15, 2026',
    author: 'Jane Cooper',
    topic: 'Federal Staffing',
    readingMode: '7-Min Analysis',
    imageSrc: '/images/pharmacist-portrait.png',
    href: '/blog/advancing-healthcare',
  },
  {
    id: 3,
    title: 'The Future of Regulatory Compliance in 2026',
    readTime: '15 min',
    date: 'August 20, 2026',
    author: 'Saratoga Team',
    topic: 'Regulatory Compliance',
    readingMode: 'Deep Dive Whitepaper',
    imageSrc: '/images/what-we-do-doctor.png',
    href: '/blog/regulatory-compliance',
  }
];

const READING_MODES = [
  'All Articles',
  '3-Min Executive Brief',
  '7-Min Analysis',
  'Deep Dive Whitepaper'
];

const TOPICS = [
  'All Topics',
  'Military Medicine',
  'Federal Staffing',
  'Joint Commission Standards',
  'Veterans Affairs',
  'Regulatory Compliance'
];

export const BlogListingSection: React.FC<BlogListingSectionProps> = ({
  title = 'Blogs',
  subTitle = 'Explore Insights Shaping the Future of Federal Healthcare',
}) => {
  const [activeMode, setActiveMode] = useState('All Articles');
  const [activeTopic, setActiveTopic] = useState('All Topics');

  // We duplicate mock blogs to fill out a grid for demo purposes
  const displayBlogs = [...MOCK_BLOGS, ...MOCK_BLOGS].filter((blog) => {
    const matchMode = activeMode === 'All Articles' || blog.readingMode === activeMode || (activeMode === 'Deep Dive Whitepaper' && blog.readingMode.includes('Deep Dive'));
    const matchTopic = activeTopic === 'All Topics' || blog.topic === activeTopic;
    return matchMode && matchTopic;
  });

  return (
    <section className="w-full bg-brand-surface py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Filters Top Bar */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
          {/* Reading Mode Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-neutral mr-2">
              Reading Mode:
            </span>
            {READING_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeMode === mode
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-brand-neutral border border-brand-neutral/20 hover:border-brand-navy hover:text-brand-navy'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Separator / Topics Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  activeTopic === topic
                    ? 'bg-brand-red text-white'
                    : 'bg-white text-brand-neutral border border-brand-neutral/20 hover:border-brand-red hover:text-brand-red'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Header & Grid Container (Frame 2147226388 equivalent) */}
        <div className="flex flex-col items-start gap-[40px] w-full max-w-[1680px] mx-auto">
          {/* Header (Frame 610 equivalent) */}
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

          {/* Blog Grid (Frame 2147226394 equivalent) */}
          {displayBlogs.length > 0 ? (
            <div className="flex flex-wrap items-start content-start gap-[20px] w-full max-w-[1678px]">
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
          <div className="text-center py-12 text-brand-neutral">
            No blogs found matching the selected filters.
          </div>
        )}
      </div>
    </section>
  );
};
