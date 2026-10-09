'use client';
import React, { useMemo, useState } from 'react';
import { GeneralLink } from '../atoms/GeneralLink';
import { Heading } from '../atoms/Heading';
import { Text } from '../atoms/Text';
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
      ? 'border-transparent bg-brand-navy-legal font-semibold text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
      : 'border-transparent bg-[#B81C31] font-semibold text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]';
  const padding = tone === 'navy' ? 'px-3 py-1' : 'px-4 py-1.5';

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border font-sans text-button tracking-[0.012em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy-legal motion-reduce:transition-none ${padding} ${
        active
          ? selected
          : 'border-brand-hairline bg-white font-medium text-[#717171] hover:border-brand-navy-legal hover:text-brand-navy-legal'
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
          className="mx-auto max-w-home px-page pt-4 pb-2"
        >
          <ol className="flex flex-wrap items-center gap-2 font-sans text-eyebrow font-medium text-ink">
            <li>
              <GeneralLink href="/" variant="unstyled" className="hover:text-brand-cta-from">
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
        <div className="relative overflow-hidden bg-[#E4EBF1]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(92deg,#E4EBF1_0.4%,rgba(228,235,241,0.2)_69%)]"
          />
          <div className="relative mx-auto flex min-h-[clamp(16rem,28.2vw,33.8125rem)] w-full max-w-home flex-col items-start justify-center gap-6 px-page py-10 xl:gap-[1.875rem]">
            {heading ? (
              <h1 className="max-w-[46.5rem] font-serif text-hero break-words text-ink">
                {heading}
              </h1>
            ) : null}
            {lede ? (
              <p className="max-w-[47.2rem] text-body-lg font-medium break-words text-ink">
                {lede}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-home flex-col px-page py-8 xl:py-10">
        {readModes.length > 0 ? (
          <div
            role="group"
            aria-label="Reading mode"
            className={`flex flex-wrap items-center justify-center gap-3 xl:gap-5 ${
              categories.length > 0 ? 'mb-6 xl:mb-[1.875rem]' : 'mb-8 xl:mb-[3.75rem]'
            }`}
          >
            <p className="font-serif text-nav tracking-[0.6px] text-[#43474D] uppercase">
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
            className="mb-8 flex flex-wrap items-center justify-center gap-3 xl:mb-[3.75rem] xl:gap-5"
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
          <p className="text-center text-body text-[color:var(--color-legal-body)]">
            {formattedBlogs.length === 0
              ? 'No articles have been published yet.'
              : 'No articles match this filter.'}
          </p>
        )}

        {((sectionTitle && sectionTitle !== heading) ||
          (sectionLede && sectionLede !== lede)) &&
        rest.length > 0 ? (
          <div className="mt-10 flex w-full min-w-0 flex-col items-start gap-3 xl:mt-20">
            {sectionTitle && sectionTitle !== heading ? (
              <Heading level={2} size="section" tone="inherit" className="text-brand-cta-from">
                {sectionTitle}
              </Heading>
            ) : null}
            {sectionLede && sectionLede !== lede ? (
              <Text
                size="sectionLead"
                tone="inherit"
                className="max-w-[65.0625rem] text-ink"
              >
                {sectionLede}
              </Text>
            ) : null}
          </div>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-8 grid w-full grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 md:gap-y-12 xl:mt-10 xl:grid-cols-3 xl:gap-y-16">
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
