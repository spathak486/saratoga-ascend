'use client';

import React from 'react';
import { Section } from '../atoms';
import {
  CAROUSEL_BLEED_CLASS,
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_VIEWPORT_CLASS,
  useCardCarousel,
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

  return (
    <Section
      aria-label="Healthcare programs"
      tone="surface"
      spacing="md"
      className="bg-section-wash"
    >
      <div className="flex flex-col">
        <HealthcareFeatureCard personSrc={personSrc} />

        {/* 40px gap between feature band and carousel cards on the artboard */}
        <div className="mt-10 flex flex-col gap-6">
          <div className={CAROUSEL_BLEED_CLASS}>
            <div
              ref={viewportRef}
              className={CAROUSEL_VIEWPORT_CLASS}
              role="group"
              aria-roledescription="carousel"
              aria-label="Travel staffing services"
              tabIndex={0}
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

          <CarouselProgressBar progress={progress} />
        </div>
      </div>
    </Section>
  );
};
