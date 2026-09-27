'use client';

import React from 'react';
import { Section } from '../atoms';
import {
  CAROUSEL_BLEED_CLASS,
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_VIEWPORT_CLASS,
  useCardCarousel,
  useDragToScroll,
  useWheelToScroll,
} from '../molecules/CardCarousel';
import { CircleControl } from '../molecules/CircleControl';
import {
  HealthcareFeatureCard,
  type HealthcareRoleSlide,
} from '../molecules/HealthcareFeatureCard';
import { SectionIntro } from '../molecules/SectionIntro';
import { StaffingSlideCard } from '../molecules/StaffingSlideCard';

export interface HealthcareJobCard {
  id: string;
  title?: React.ReactNode;
  body?: string;
  imageSrc?: string;
  href?: string;
}

const DEFAULT_JOBS: HealthcareJobCard[] = [
  { id: 'travel-1' },
  { id: 'travel-2' },
  { id: 'travel-3' },
  { id: 'travel-4' },
];

export interface HealthcareProgramsSectionProps {
  title?: string;
  description?: string;
  personSrc?: string;
  heartSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
  slides?: readonly HealthcareRoleSlide[];
  jobs?: HealthcareJobCard[];
}

/**
 * Healthcare Programs — Figma 2002:1014. CMS fields are optional; missing
 * values fall back locally so GraphQL / registry mapping never has to change.
 */
export const HealthcareProgramsSection: React.FC<HealthcareProgramsSectionProps> = ({
  title,
  description,
  personSrc,
  heartSrc,
  ctaLabel,
  ctaHref,
  slides,
  jobs,
}) => {
  const displayJobs = jobs && jobs.length > 0 ? jobs : DEFAULT_JOBS;
  const { viewportRef, scrollNext } = useCardCarousel({ loop: true });
  const { isDragging, dragHandlers } = useDragToScroll(viewportRef);
  useWheelToScroll(viewportRef);

  return (
    <Section
      aria-labelledby={title ? 'healthcare-programs-heading' : undefined}
      aria-label={title ? undefined : 'Healthcare programs'}
      tone="surface"
      spacing="none"
      className="bg-section-wash mt-10 py-10"
    >
      <div className="flex flex-col gap-10">
        {title || description ? (
          <SectionIntro
            id="healthcare-programs-heading"
            title={title ?? ''}
            description={description ?? ''}
            wide
            titleTone="inherit"
            titleClassName="text-brand-cta-from"
            descriptionSize="sectionLead"
            descriptionStyle={{ color: 'var(--color-ink)' }}
            className="gap-3"
          />
        ) : null}

        <div className="flex flex-col gap-10">
          <HealthcareFeatureCard
            personSrc={personSrc}
            heartSrc={heartSrc}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            slides={slides}
          />

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
                <div className="-ml-6 flex">
                  {displayJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`${CAROUSEL_SLIDE_CLASS} shrink-0 basis-[min(100%,25.125rem)] pl-6 sm:basis-[min(70%,25.125rem)] lg:basis-[min(42%,25.125rem)] xl:basis-[25.125rem]`}
                      role="group"
                      aria-roledescription="slide"
                      data-carousel-slide
                    >
                      <StaffingSlideCard
                        title={job.title}
                        body={job.body}
                        imageSrc={job.imageSrc}
                        href={job.href}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Figma Frame 5: 60×60 on the last visible card, y=125, 12px from its right. */}
            <div className="pointer-events-none absolute inset-4 z-20">
              <CircleControl
                label="Next travel staffing card"
                direction="next"
                tone="jobCardArrow"
                onClick={scrollNext}
                className="pointer-events-auto absolute top-[27.78%] right-3"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
