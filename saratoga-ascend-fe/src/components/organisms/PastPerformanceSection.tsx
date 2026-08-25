'use client';

import React from 'react';
import { Heading, Section, Text } from '../atoms';
import {
  CAROUSEL_BLEED_CLASS,
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_VIEWPORT_CLASS,
  useCardCarousel,
} from '../molecules/CardCarousel';
import { CarouselProgressBar } from '../molecules/CarouselProgressBar';
import { PastPerformanceCard } from '../molecules/PastPerformanceCard';
import { useCarouselProgress } from '../molecules/useCarouselProgress';
import { MediaFrame } from '../atoms/MediaFrame';

const INTRO_COPY =
  'Real-world impact. Discover how we deliver rapid, compliant, and critical staffing solutions across the nation.';

const PROJECTS = [
  {
    id: 'naval-hospital',
    title: 'Naval Hospital, NC',
    body: 'Deployed 50+ cleared clinical professionals in under 14 days to support critical surge requirements.',
    imageSrc: '/images/performance/naval-hospital.png',
  },
  {
    id: 'texas-public-health',
    title: 'Texas Public Health',
    body: 'Scaled a statewide network of Allied Health professionals to ensure continuous, compliant patient care.',
    imageSrc: '/images/performance/texas-public-health.png',
  },
  {
    id: 'walter-reed',
    title: 'Walter Reed MMC',
    body: 'Secured highly specialized medical laboratory technicians while maintaining 100% audit readiness.',
    imageSrc: '/images/performance/walter-reed.png',
  },
] as const;

/** Figma repeats the three cards so the track can travel past the fold. */
const SLIDES = [
  { ...PROJECTS[0], key: 'naval-1' },
  { ...PROJECTS[1], key: 'texas-1' },
  { ...PROJECTS[2], key: 'walter-1' },
  { ...PROJECTS[0], key: 'naval-2' },
  { ...PROJECTS[1], key: 'texas-2' },
  { ...PROJECTS[2], key: 'walter-2' },
] as const;

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
}) {
  const isNext = direction === 'next';

  return (
    <button
      type="button"
      aria-label={isNext ? 'Next project' : 'Previous project'}
      className="relative size-[3.75rem] shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
      onClick={onClick}
    >
      <span className={`absolute inset-0 ${isNext ? 'rotate-180' : ''}`}>
        <MediaFrame
          src={
            isNext
              ? '/images/performance/arrow-next.svg'
              : '/images/performance/arrow-prev.svg'
          }
          alt=""
          pendingLabel={direction}
          unoptimized
          sizes="60px"
          imageClassName="object-contain!"
          className="size-full border-0 bg-transparent"
        />
      </span>
    </button>
  );
}

/**
 * Past Performance band (Figma node 13:427). Intro and 60px arrows on the
 * left; 402×580 photo cards scroll on the right with a gradient progress bar.
 */
export const PastPerformanceSection: React.FC = () => {
  const { viewportRef, scrollPrev, scrollNext } = useCardCarousel({
    loop: true,
  });
  const progress = useCarouselProgress(viewportRef);

  return (
    <Section
      aria-labelledby="past-performance-heading"
      tone="surface"
      spacing="lg"
      className="bg-past-wash overflow-hidden"
    >
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 items-start gap-block xl:grid-cols-[minmax(16rem,37rem)_minmax(0,1fr)]">
          <div className="flex flex-col">
            <Heading
              id="past-performance-heading"
              level={2}
              size="section"
              tone="ink"
            >
              Past Performance
            </Heading>
            <Text size="body" tone="ink" className="mt-2.5 max-w-[29.3rem]">
              {INTRO_COPY}
            </Text>
            <div className="mt-[clamp(2rem,4vw,5rem)] flex gap-6">
              <ArrowButton direction="prev" onClick={scrollPrev} />
              <ArrowButton direction="next" onClick={scrollNext} />
            </div>
          </div>

          <div className="relative min-w-0 xl:-mr-[var(--spacing-gutter)]">
            <div className={CAROUSEL_BLEED_CLASS}>
              <div
                ref={viewportRef}
                className={CAROUSEL_VIEWPORT_CLASS}
                role="group"
                aria-roledescription="carousel"
                aria-label="Past performance projects"
                tabIndex={0}
              >
                <div className="-ml-grid flex">
                  {SLIDES.map((slide) => (
                    <div
                      key={slide.key}
                      className={`${CAROUSEL_SLIDE_CLASS} w-[min(100%,25.125rem)] shrink-0 basis-[min(100%,25.125rem)] pl-grid`}
                      role="group"
                      aria-roledescription="slide"
                      data-carousel-slide
                    >
                      <PastPerformanceCard
                        title={slide.title}
                        body={slide.body}
                        imageSrc={slide.imageSrc}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(32.5rem,40%)] bg-gradient-to-r from-transparent from-[65%] to-brand-surface to-100% xl:block"
              aria-hidden="true"
            />
          </div>
        </div>

        <CarouselProgressBar progress={progress} />
      </div>
    </Section>
  );
};
