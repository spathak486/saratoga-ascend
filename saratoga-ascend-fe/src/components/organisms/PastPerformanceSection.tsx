'use client';

import React, { useEffect, useState } from 'react';
import { Heading, Section, Text } from '../atoms';
import {
  CAROUSEL_SLIDE_CLASS,
  useCardCarousel,
  useDragToScroll,
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

/** Four 411px plates and three 12px gaps fill the 1680px row. Mobile: 380px
 *  plates with a 10px peek of the next card (Figma 2105:768). */
const SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} box-border basis-full md:basis-[calc((100%-0.75rem)/2)] xl:basis-[calc((100%-2.25rem)/4)] max-xl:!w-[min(23.75rem,calc(100vw-3.125rem))] max-xl:!basis-[min(23.75rem,calc(100vw-3.125rem))] max-xl:!shrink-0`;

/**
 * Past Performance (Figma 2002:1085 / mobile 2105:764). White band, red
 * title, lead, photo cards, and play controls. Images and copy stay on the
 * existing project list.
 */
export const PastPerformanceSection: React.FC = () => {
  const { viewportRef, scrollPrev, scrollNext } = useCardCarousel({
    loop: true,
  });
  const { isDragging, dragHandlers } = useDragToScroll(viewportRef);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncActive = () => {
      const slides = Array.from(
        viewport.querySelectorAll<HTMLElement>('[data-carousel-slide]'),
      );
      if (slides.length === 0) return;
      const origin = viewport.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((slide, index) => {
        const dist = Math.abs(slide.getBoundingClientRect().left - origin);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      setActive(best);
    };

    syncActive();
    viewport.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', syncActive);
    return () => {
      viewport.removeEventListener('scroll', syncActive);
      window.removeEventListener('resize', syncActive);
    };
  }, [viewportRef]);

  return (
    <Section
      aria-labelledby="past-performance-heading"
      tone="surface"
      spacing="none"
      containerClassName="py-10 max-xl:px-5! max-xl:py-5"
    >
      <div className="flex flex-col gap-10 max-xl:gap-[1.875rem]">
        <div className="flex flex-col gap-3">
          <Heading
            id="past-performance-heading"
            level={2}
            size="section"
            tone="inherit"
            className="text-brand-cta-from max-xl:text-[2rem]! max-xl:leading-[2.5rem]! max-xl:font-normal"
          >
            Past Performance
          </Heading>
          <Text
            size="sectionLead"
            tone="inherit"
            className="text-ink max-xl:text-base! max-xl:leading-5! max-xl:font-normal"
          >
            {INTRO_COPY}
          </Text>
        </div>

        <div
          ref={viewportRef}
          className={`snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy [&::-webkit-scrollbar]:hidden max-xl:-mr-5 ${
            isDragging ? 'cursor-grabbing select-none' : 'max-xl:cursor-grab'
          }`}
          role="group"
          aria-roledescription="carousel"
          aria-label="Past performance projects"
          tabIndex={0}
          onDragStart={(event) => event.preventDefault()}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              scrollPrev();
            } else if (event.key === 'ArrowRight') {
              event.preventDefault();
              scrollNext();
            }
          }}
          {...dragHandlers}
        >
          <div className="flex gap-3 max-xl:gap-[1.125rem]">
            {SLIDES.map((slide, index) => (
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
                  expanded={index === active}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 max-xl:gap-[1.875rem]">
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
