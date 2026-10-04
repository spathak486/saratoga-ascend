'use client';
import React, { useMemo, useState } from 'react';
import { GeneralLink } from '../atoms/GeneralLink';
import { BlogCard } from '../molecules/BlogCard';
import { FeaturedBlogCard } from '../molecules/FeaturedBlogCard';

export interface BlogListingSectionProps {
  /** Page title from the CMS page or its banner. */
  heroTitle?: string;
  /** Page lede from the banner description or SEO description. */
  heroSubtitle?: string;
  /** Blog-listing component heading. */
  title?: string;
  /** Blog-listing component subheading. */
  subTitle?: string;
  blogs?: any[];
}

const ALL_TOPICS = 'All Topics';
const ALL_ARTICLES = 'All Articles';

function plainText(value?: string | null): string | undefined {
  if (!value) return undefined;
  const stripped = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return stripped || undefined;
}

function formatReadTime(value: unknown): string | undefined {
  if (value == null || value === '') return undefined;
  const raw = typeof value === 'number' && Number.isFinite(value) ? String(value) : String(value).trim();
  const minutes = raw.replace(/\s*min(?:\s*read)?/gi, '').trim();
  if (!minutes) return undefined;
  return `${minutes} min read`;
}

function formatDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function FilterPill({
  active,
  tone,
  onClick,
  children,
}: {
  active: boolean;
  tone: 'navy' | 'red';
  onClick: () => void;
  children: React.ReactNode;
}) {
  const selected =
    tone === 'navy'
      ? 'border-transparent bg-[#00162D] font-semibold text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
      : 'border-transparent bg-[#B81C31] font-semibold text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]';

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 font-sans text-[clamp(0.875rem,0.75rem+0.3vw,1.25rem)] leading-[1.5] tracking-[0.015em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00162D] xl:px-4 xl:py-1.5 ${
        active
          ? selected
          : 'border-[#E3E3E3] bg-white font-medium text-[#717171] hover:border-[#00162D] hover:text-[#00162D]'
      }`}
    >
      {children}
    </button>
  );
}

export const BlogListingSection: React.FC<BlogListingSectionProps> = ({
  heroTitle,
  heroSubtitle,
  title,
  subTitle,
  blogs = [],
}) => {
  const [activeCategory, setActiveCategory] = useState(ALL_TOPICS);
  const [activeReadMode, setActiveReadMode] = useState(ALL_ARTICLES);

  const heading = plainText(heroTitle);
  const lede = plainText(heroSubtitle);
  const sectionTitle = plainText(title);
  const sectionLede = plainText(subTitle);

  const formattedBlogs = useMemo(
    () =>
      blogs.map((b: any, index: number) => ({
        id: b.documentId || b.id || b.slug || `blog-${index}`,
        title: b.title || 'Untitled',
        readTime: formatReadTime(b.readTime),
        date: formatDate(b.articleDate),
        category: (typeof b.category === 'string' ? b.category : b.category?.name) || undefined,
        imageSrc: b.image?.url,
        href: b.slug ? `/${b.slug}` : '#',
        excerpt: plainText(b.summary || b.excerpt),
      })),
    [blogs],
  );

  const categories = useMemo(() => {
    const fromCms = Array.from(
      new Set(formattedBlogs.map((b) => b.category).filter((c): c is string => Boolean(c))),
    );
    return fromCms;
  }, [formattedBlogs]);

  const readModes = useMemo(() => {
    const fromCms = Array.from(
      new Set(formattedBlogs.map((b) => b.readTime).filter((c): c is string => Boolean(c))),
    );
    return fromCms;
  }, [formattedBlogs]);

  const displayBlogs = formattedBlogs.filter((blog) => {
    const topicMatch = activeCategory === ALL_TOPICS || blog.category === activeCategory;
    const readMatch = activeReadMode === ALL_ARTICLES || blog.readTime === activeReadMode;
    return topicMatch && readMatch;
  });

  const featured = displayBlogs[0];
  const rest = displayBlogs.slice(1);

  return (
    <section className="w-full bg-white">
      {heading ? (
        <nav
          aria-label="Breadcrumb"
          className="mx-auto hidden max-w-home px-page pt-4 pb-2 min-[90rem]:block"
        >
          <ol className="flex flex-wrap items-center gap-2 font-sans text-sm leading-normal font-medium text-black">
            <li>
              <GeneralLink href="/" variant="unstyled" className="hover:text-[#B81C31]">
                Home
              </GeneralLink>
            </li>
            <li className="flex items-center gap-2" aria-current="page">
              <span aria-hidden="true">/</span>
              <span>{heading}</span>
            </li>
          </ol>
        </nav>
      ) : null}

      {heading || lede ? (
        <div className="bg-cta-gradient px-page pt-[7.25rem] pb-10 text-center min-[90rem]:py-20">
          <div className="mx-auto flex w-full max-w-[110rem] flex-col items-center justify-center gap-[1.125rem] xl:gap-[1.875rem]">
            {heading ? (
              <h1 className="max-w-[74.125rem] font-serif text-[clamp(2rem,1.1rem+3.6vw,5.625rem)] leading-[1.15] font-normal text-white">
                {heading}
              </h1>
            ) : null}
            {lede ? (
              <p className="max-w-[71.125rem] font-sans text-[clamp(1rem,0.85rem+0.7vw,1.5rem)] leading-[1.6] font-medium text-white">
                {lede}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-home flex-col gap-8 px-page py-8 xl:gap-10 xl:py-10">
        {readModes.length > 0 ? (
          <div
            role="group"
            aria-label="Reading mode"
            className="flex flex-wrap items-center justify-center gap-3 xl:gap-5"
          >
            <p className="font-serif text-[clamp(0.875rem,0.8rem+0.2vw,1.125rem)] leading-[1.45] tracking-[0.6px] text-[#43474D] uppercase">
              Reading mode:
            </p>
            <FilterPill
              tone="navy"
              active={activeReadMode === ALL_ARTICLES}
              onClick={() => setActiveReadMode(ALL_ARTICLES)}
            >
              {ALL_ARTICLES}
            </FilterPill>
            {readModes.map((mode) => (
              <FilterPill
                key={mode}
                tone="navy"
                active={activeReadMode === mode}
                onClick={() => setActiveReadMode(mode)}
              >
                {mode}
              </FilterPill>
            ))}
          </div>
        ) : null}

        {categories.length > 0 ? (
          <div
            role="group"
            aria-label="Topics"
            className="flex flex-wrap items-center justify-center gap-3 xl:gap-5"
          >
            <FilterPill
              tone="red"
              active={activeCategory === ALL_TOPICS}
              onClick={() => setActiveCategory(ALL_TOPICS)}
            >
              {ALL_TOPICS}
            </FilterPill>
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                tone="red"
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </FilterPill>
            ))}
          </div>
        ) : null}

        {featured ? (
          <FeaturedBlogCard
            title={featured.title}
            excerpt={featured.excerpt}
            readTime={featured.readTime}
            date={featured.date}
            imageSrc={featured.imageSrc}
            href={featured.href}
          />
        ) : (
          <p className="text-center font-sans text-[clamp(1rem,0.9rem+0.3vw,1.25rem)] leading-[1.5] text-[#5A5A5A]">
            {formattedBlogs.length === 0
              ? 'No articles have been published yet.'
              : 'No articles match this filter.'}
          </p>
        )}

        {((sectionTitle && sectionTitle !== heading) ||
          (sectionLede && sectionLede !== lede)) &&
        rest.length > 0 ? (
          <div className="flex w-full flex-col items-start gap-3 pt-2 xl:pt-6">
            {sectionTitle && sectionTitle !== heading ? (
              <h2 className="font-serif text-[clamp(2rem,1.2rem+3.2vw,4.5rem)] leading-[1.2] font-normal text-[#D31E2D]">
                {sectionTitle}
              </h2>
            ) : null}
            {sectionLede && sectionLede !== lede ? (
              <p className="max-w-[65.0625rem] font-sans text-[clamp(1.125rem,0.9rem+0.8vw,1.875rem)] leading-[1.33] text-[#0A0A0A]">
                {sectionLede}
              </p>
            ) : null}
          </div>
        ) : null}

        {rest.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-16">
            {rest.map((blog, idx) => (
              <BlogCard
                key={`${blog.id}-${idx}`}
                title={blog.title}
                readTime={blog.readTime}
                date={blog.date}
                imageSrc={blog.imageSrc}
                href={blog.href}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
