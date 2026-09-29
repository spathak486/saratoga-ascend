import React from 'react';
import { Heading, Section, Text } from '../atoms';
import { LatestNewsCard, type LatestNewsCardProps } from '../molecules/LatestNewsCard';

const DEFAULT_TITLE = 'Latest news and insights';
const DEFAULT_DESCRIPTION = 'Success is built on consistent effort.';

/**
 * Fallback tiles for the mock homepage. Images stay on these paths (or on
 * whatever `imageSrc` the registry later passes from Strapi) — Figma photos
 * are not substituted.
 */
const FALLBACK_ARTICLES: readonly LatestNewsCardProps[] = [
  {
    title: 'How we support state and local agencies',
    meta: '5 min read · August 12, 2026',
    href: '/newsroom',
    category: 'Blog',
    imageSrc:
      '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
  },
  {
    title: 'Simple Ways to Improve Your Mental Wellness',
    meta: '4 min read · August 8, 2026',
    href: '/newsroom',
    category: 'Newspaper',
    imageSrc: '/images/phase-last-img2.png',
  },
  {
    title: 'Healthcare Builds Stronger communities',
    meta: '6 min read · August 3, 2026',
    href: '/newsroom',
    category: 'Blog',
    imageSrc: '/images/phase-last-img3.png',
  },
];

export interface LatestNewsSectionProps {
  title?: string;
  description?: string;
  articles?: LatestNewsCardProps[];
}

/**
 * Homepage insights band (Figma 2002:1138). Red→navy wash, left-aligned 72px
 * title and 30px lead, then three 544px cards with a 24px gutter.
 */
export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  articles,
}) => {
  const cards = articles && articles.length > 0 ? articles : FALLBACK_ARTICLES;

  return (
    <Section
      aria-labelledby="latest-news-heading"
      tone="navy"
      spacing="none"
      className="bg-latest-news"
      containerClassName="pt-10 pb-20"
    >
      <div className="flex flex-col items-start gap-3">
        <Heading
          id="latest-news-heading"
          level={2}
          size="section"
          tone="onDark"
        >
          {title}
        </Heading>
        {description ? (
          <Text size="sectionLead" tone="onDark">
            {description}
          </Text>
        ) : null}
      </div>

      <div className="mt-10 grid grid-cols-1 justify-items-center gap-grid md:grid-cols-2 xl:grid-cols-3 xl:justify-items-stretch">
        {cards.map((article) => (
          <LatestNewsCard key={`${article.href}-${article.title}`} {...article} />
        ))}
      </div>
    </Section>
  );
};
