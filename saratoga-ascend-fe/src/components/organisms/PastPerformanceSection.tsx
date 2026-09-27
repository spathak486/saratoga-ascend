'use client';

import React from 'react';
import { Heading, Section, Text } from '../atoms';
import {
  CAROUSEL_SLIDE_CLASS,
  useCardCarousel,
} from '../molecules/CardCarousel';
import { CircleControl } from '../molecules/CircleControl';
import { PastPerformanceCard } from '../molecules/PastPerformanceCard';

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

/** Four 411px plates and three 12px gaps fill the 1680px row. */
const SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} box-border basis-full md:basis-[calc((100%-0.75rem)/2)] xl:basis-[calc((100%-2.25rem)/4)]`;

/**
 * Past Performance (Figma 2002:1085). White band, 72px red title, 30px lead,
 * four photo cards, and the play controls centered underneath. Images and
 * copy stay on the existing project list.
 */
export const PastPerformanceSection: React.FC = () => {
  const { viewportRef, scrollPrev, scrollNext } = useCardCarousel({
    loop: true,
  });

  return (
    <Section
      aria-labelledby="past-performance-heading"
      tone="surface"
      spacing="none"
      containerClassName="py-10"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Heading
            id="past-performance-heading"
            level={2}
            size="section"
            tone="inherit"
            className="text-brand-cta-from"
          >
            Past Performance
          </Heading>
          <Text size="sectionLead" tone="inherit" className="text-ink">
            {INTRO_COPY}
          </Text>
        </div>

        <div
          ref={viewportRef}
          className="snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="Past performance projects"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              scrollPrev();
            } else if (event.key === 'ArrowRight') {
              event.preventDefault();
              scrollNext();
            }
          }}
        >
          <div className="flex gap-3">
            {SLIDES.map((slide) => (
              <div
                key={slide.key}
                className={SLIDE_CLASS}
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

        <div className="flex justify-center gap-6">
          <CircleControl
            label="Previous project"
            direction="prev"
            tone="iconPlay"
            onClick={scrollPrev}
            className="transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100"
          />
          <CircleControl
            label="Next project"
            direction="next"
            tone="iconPlay"
            onClick={scrollNext}
            className="transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100"
          />
        </div>
      </div>
    </Section>
  );
};
