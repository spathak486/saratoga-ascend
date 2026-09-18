import React from 'react';
import { Container, Heading } from '../atoms';
import { LatestNewsCard, type LatestNewsCardProps } from '../molecules/LatestNewsCard';

const ARTICLES: readonly LatestNewsCardProps[] = [
  {
    title: 'How we support state and local agencies',
    meta: '5 min read · August 12, 2026',
    href: '/newsroom',
    imageSrc:
      '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
  },
  {
    title: 'Simple Ways to Improve Your Mental Wellness',
    meta: '4 min read · August 8, 2026',
    href: '/newsroom',
    imageSrc: '/images/phase-last-img2.png',
  },
  {
    title: 'Healthcare Builds Stronger communities',
    meta: '6 min read · August 3, 2026',
    href: '/newsroom',
    imageSrc: '/images/phase-last-img3.png',
  },
];

/**
 * Homepage insights band (Figma node 13:491). Solid navy field, centred
 * heading, three 544px cards with a 24px gutter.
 */
export const LatestNewsSection: React.FC = () => (
  <section
    aria-labelledby="latest-news-heading"
    className="relative overflow-hidden bg-brand-navy"
  >
    <Container className="py-section">
      <Heading
        id="latest-news-heading"
        level={2}
        size="section"
        tone="onDark"
        className="text-center"
      >
        Latest news and insights
      </Heading>

      <div className="mt-block grid grid-cols-1 justify-items-center gap-grid md:grid-cols-2 xl:grid-cols-3 xl:justify-items-stretch">
        {ARTICLES.map((article) => (
          <LatestNewsCard key={article.title} {...article} />
        ))}
      </div>
    </Container>
  </section>
);
