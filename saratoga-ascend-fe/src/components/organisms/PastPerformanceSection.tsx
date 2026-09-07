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
import { CircleControl } from '../molecules/CircleControl';
import { PastPerformanceCard } from '../molecules/PastPerformanceCard';
import { useCarouselProgress } from '../molecules/useCarouselProgress';

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

/**
 * Past Performance band (Figma node 23:411). Intro and arrows on the left;
 * 402×580 photo cards scroll on the right with a gradient progress bar
 * anchored under the card track. The arrows reuse `CircleControl`'s
 * `iconPlay` tone — the same 60px ring + Polygon 2 play blobs as the
 * What We Do service-line controls (`Previous service line`).
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
            <CircleControl
              label="Previous project"
              direction="prev"
              tone="iconPlay"
              onClick={scrollPrev}
              className="size-12 shrink-0 transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:size-[3.75rem]"
            />
            <CircleControl
              label="Next project"
              direction="next"
              tone="iconPlay"
              onClick={scrollNext}
              className="size-12 shrink-0 transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:size-[3.75rem]"
            />
          </div>
        </div>

        {/* The progress bar is scoped to the carousel column (not the whole
            section), so it tracks the card viewport's own width — including
            its right-edge bleed — instead of stretching under the text
            column too. */}
        <div className="flex min-w-0 flex-col gap-6 xl:-mr-[var(--spacing-gutter)]">
          <div className="relative min-w-0">
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
                      // 426px basis = the 402px card plus the 24px `pl-grid`
                      // gap living inside this box (border-box) — the card
                      // itself still renders at the true 402px Figma width.
                      className={`${CAROUSEL_SLIDE_CLASS} shrink-0 basis-[min(100%,26.625rem)] pl-grid`}
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

          <CarouselProgressBar progress={progress} />
        </div>
      </div>
    </Section>
  );
};
