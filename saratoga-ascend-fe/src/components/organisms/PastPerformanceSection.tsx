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

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

/** Four 411px plates and three 12px gaps fill the 1680px row. Mobile: 380px
 *  plates with a 10px peek of the next card (Figma 2105:768). */
const SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} box-border basis-full md:basis-[calc((100%-0.75rem)/2)] xl:basis-[calc((100%-2.25rem)/4)] max-xl:!w-[min(23.75rem,calc(100vw-3.125rem))] max-xl:!basis-[min(23.75rem,calc(100vw-3.125rem))] max-xl:!shrink-0`;

export interface PastPerformanceCaseStudy {
  id?: string;
  documentId?: string;
  title: string;
  slug?: string;
  summary?: string | null;
  body?: string;
  imageSrc?: string;
  image?: { url: string; alternativeText?: string | null } | null;
  href?: string;
}

export interface PastPerformanceSectionProps {
  heading?: string | null;
  subheading?: string | null;
  caseStudies?: PastPerformanceCaseStudy[] | null;
}

/**
 * Past Performance (Figma 2002:1085 / mobile 2105:764).
 * Completely dynamic section driven by Strapi CMS Case Studies.
 */
export const PastPerformanceSection: React.FC<PastPerformanceSectionProps> = ({
  heading,
  subheading,
  caseStudies,
}) => {
  const { viewportRef, scrollPrev, scrollNext } = useCardCarousel({
    loop: true,
  });
  const { isDragging, dragHandlers } = useDragToScroll(viewportRef);
  const [active, setActive] = useState(0);

  const slides = React.useMemo(() => {
    if (!caseStudies || caseStudies.length === 0) return [];
    const formatted = caseStudies.map((cs, idx) => ({
      id: cs.documentId || cs.slug || cs.id || `cs-${idx}`,
      title: cs.title,
      body: cs.summary || cs.body || '',
      imageSrc: normalizeImageSrc(cs.image?.url || cs.imageSrc),
      href: cs.href || (cs.slug ? (cs.slug.startsWith('/') ? cs.slug : `/${cs.slug}`) : undefined),
      key: `cs-${idx}`,
    }));
    if (formatted.length > 0 && formatted.length < 6) {
      return [
        ...formatted.map((f) => ({ ...f, key: `${f.key}-1` })),
        ...formatted.map((f) => ({ ...f, key: `${f.key}-2` })),
      ];
    }
    return formatted;
  }, [caseStudies]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncActive = () => {
      const slideNodes = Array.from(
        viewport.querySelectorAll<HTMLElement>('[data-carousel-slide]'),
      );
      if (slideNodes.length === 0) return;
      const origin = viewport.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      slideNodes.forEach((slide, index) => {
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
  }, [viewportRef, slides]);

  if (!heading && slides.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="past-performance-heading"
      tone="surface"
      spacing="none"
      containerClassName="py-10 max-xl:px-5! max-xl:py-5"
    >
      <div className="flex flex-col gap-10 max-xl:gap-[1.875rem]">
        {(heading || subheading) && (
          <div className="flex flex-col gap-3">
            {heading && (
              <Heading
                id="past-performance-heading"
                level={2}
                size="section"
                tone="inherit"
                className="text-brand-cta-from max-xl:text-[2rem]! max-xl:leading-[2.5rem]! max-xl:font-normal"
              >
                {heading}
              </Heading>
            )}
            {subheading && (
              <Text
                size="sectionLead"
                tone="inherit"
                className="text-ink max-xl:text-base! max-xl:leading-5! max-xl:font-normal"
              >
                {subheading}
              </Text>
            )}
          </div>
        )}

        {slides.length > 0 && (
          <>
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
                {slides.map((slide, index) => (
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
                      href={slide.href}
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
          </>
        )}
      </div>
    </Section>
  );
};
