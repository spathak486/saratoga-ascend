'use client';

import React, { useCallback } from 'react';
import { Section } from '../atoms';
import {
  CAROUSEL_BLEED_CLASS,
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_VIEWPORT_CLASS,
  getNearestSlideScrollLeft,
  useCardCarousel,
  useDragToScroll,
} from '../molecules/CardCarousel';
import { CarouselProgressBar } from '../molecules/CarouselProgressBar';
import { HealthcareFeatureCard } from '../molecules/HealthcareFeatureCard';
import { StaffingSlideCard } from '../molecules/StaffingSlideCard';
import { useCarouselProgress } from '../molecules/useCarouselProgress';

const STAFFING_SLIDES = [
  { id: 'travel-1' },
  { id: 'travel-2' },
  { id: 'travel-3' },
  { id: 'travel-4' },
] as const;

export interface HealthcareProgramsSectionProps {
  personSrc?: string;
}

/**
 * Phase 5 — navy healthcare feature card, four travel-staffing photo
 * tiles, and the gradient progress bar (Figma node 13:222).
 */
export const HealthcareProgramsSection: React.FC<HealthcareProgramsSectionProps> = ({
  personSrc,
}) => {
  const { viewportRef } = useCardCarousel({ loop: true });
  const progress = useCarouselProgress(viewportRef);
  const { isDragging, dragHandlers } = useDragToScroll(viewportRef);

  const seekTo = useCallback(
    (ratio: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      viewport.scrollLeft = ratio * maxScroll;
    },
    [viewportRef]
  );

  const settleToNearestSlide = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({ left: getNearestSlideScrollLeft(viewport), behavior: 'smooth' });
  }, [viewportRef]);

  return (
    <Section
      aria-label="Healthcare programs"
      tone="surface"
      spacing="md"
      className="bg-section-wash"
    >
      <div className="flex flex-col">
        <HealthcareFeatureCard personSrc={personSrc} />

        {/* 40px gap between feature band and carousel cards on the artboard.
            No arrows here — the cards drag with the mouse (or a finger) like
            the touch swipe already did, and the progress bar below doubles
            as a scrubber for anyone who'd rather click/drag a fixed point. */}
        <div className="mt-10 flex flex-col gap-6">
          <div className="relative">
            <div className={CAROUSEL_BLEED_CLASS}>
              <div
                ref={viewportRef}
                className={`${CAROUSEL_VIEWPORT_CLASS} ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
                role="group"
                aria-roledescription="carousel"
                aria-label="Travel staffing services"
                tabIndex={0}
                onDragStart={(event) => event.preventDefault()}
                {...dragHandlers}
              >
                <div className="-ml-grid flex">
                  {STAFFING_SLIDES.map((slide) => (
                    <div
                      key={slide.id}
                      className={`${CAROUSEL_SLIDE_CLASS} shrink-0 basis-[min(100%,25.125rem)] pl-grid sm:basis-[min(85%,25.125rem)] lg:basis-[25.125rem]`}
                      role="group"
                      aria-roledescription="slide"
                      data-carousel-slide
                    >
                      <StaffingSlideCard />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <CarouselProgressBar progress={progress} onScrub={seekTo} onScrubEnd={settleToNearestSlide} />
        </div>
      </div>
    </Section>
  );
};
