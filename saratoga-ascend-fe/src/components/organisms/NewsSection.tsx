'use client';

import React from 'react';
import { Container, GeneralLink, Heading, Section, Text } from '../atoms';
import { CardCarousel } from '../molecules/CardCarousel';
import { CircleControl } from '../molecules/CircleControl';
import { NewsCard, type NewsCardProps } from '../molecules/NewsCard';

const NEWS_IMAGE =
  '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic%201.png';

/** Replace with real posts once the newsroom content is available. */
const ARTICLES: NewsCardProps[] = [
  {
    title: 'How credentialing keeps travel placements moving',
    meta: 'Insights',
    href: '/newsroom',
    imageSrc: NEWS_IMAGE,
  },
  {
    title: 'What clinical teams look for in a staffing partner',
    meta: 'Insights',
    href: '/newsroom',
    imageSrc: NEWS_IMAGE,
  },
  {
    title: 'Building a nursing pipeline that lasts',
    meta: 'News',
    href: '/newsroom',
    imageSrc: NEWS_IMAGE,
  },
  {
    title: 'Inside a Joint Commission certification review',
    meta: 'News',
    href: '/newsroom',
    imageSrc: NEWS_IMAGE,
  },
];

export interface NewsSectionProps {
  articles?: NewsCardProps[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles = ARTICLES,
}) => (
  <Section aria-labelledby="news-heading" tone="navy" spacing="lg" bleed>
    <Container>
      <CardCarousel
        label="Latest news and insights"
        trackClassName="-ml-[clamp(1rem,2.5vw,2rem)]"
        slideClassName="basis-full pl-[clamp(1rem,2.5vw,2rem)] md:basis-1/2"
        loop
        header={() => (
          <div className="mb-block flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
            <div>
              <Heading
                id="news-heading"
                level={2}
                size="section"
                font="serif"
                tone="onDark"
              >
                Latest news and insights
              </Heading>

              <Text size="body" tone="onDarkMuted" className="mt-2 max-w-[52ch]">
                Hiring trends, credentialing guidance, and stories from the
                clinicians we place.
              </Text>
            </div>

            <GeneralLink
              href="/newsroom"
              variant="button"
              buttonVariant="cta"
              size="cta"
              className="shrink-0"
            >
              Explore More
            </GeneralLink>
          </div>
        )}
        controls={({ scrollPrev, scrollNext }) => (
          <div className="mt-[clamp(1.25rem,2.5vw,2rem)] flex justify-end gap-3">
            <CircleControl
              label="Previous articles"
              direction="prev"
              tone="dark"
              onClick={scrollPrev}
            />
            <CircleControl
              label="Next articles"
              direction="next"
              tone="dark"
              onClick={scrollNext}
            />
          </div>
        )}
      >
        {articles.map((article) => (
          <NewsCard key={article.title} {...article} />
        ))}
      </CardCarousel>
    </Container>
  </Section>
);
