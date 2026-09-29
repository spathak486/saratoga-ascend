'use client';

import React from 'react';
import { Section } from '../atoms';
import {
  CAROUSEL_SLIDE_CLASS,
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
      className="bg-section-wash mt-10 py-10 max-xl:mt-0 max-xl:py-[1.875rem]"
      containerClassName="max-xl:!px-[7px]"
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
            className="gap-3 max-xl:hidden"
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
              <div
                ref={viewportRef}
                className={`snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
                role="group"
                aria-roledescription="carousel"
                aria-label="Travel staffing services"
                tabIndex={0}
                onDragStart={(event) => event.preventDefault()}
                {...dragHandlers}
              >
                <div className="-ml-6 flex xl:ml-0 xl:gap-6">
                  {displayJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`${CAROUSEL_SLIDE_CLASS} w-[min(100%,25.125rem)] shrink-0 pl-6 sm:w-[min(70%,25.125rem)] lg:w-[min(42%,25.125rem)] xl:w-[25.125rem] xl:pl-0`}
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

            {/* Figma Frame 5: 60×60, top 125px, 12px in from the last card. */}
            <CircleControl
              label="Next travel staffing card"
              direction="next"
              tone="jobCardArrow"
              onClick={scrollNext}
              className="absolute top-[125px] -right-12 z-20"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
