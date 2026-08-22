import React from 'react';
import { GeneralLink, Heading, MediaFrame, Section, Text } from '../atoms';
import { CircleControl } from '../molecules/CircleControl';

export interface FeaturedSpecialistSectionProps {
  personSrc?: string;
  location?: string;
  role?: React.ReactNode;
}

const DEFAULT_ROLE = (
  <>
    Medical
    <br />
    Pharmacist
  </>
);

export const FeaturedSpecialistSection: React.FC<FeaturedSpecialistSectionProps> = ({
  personSrc = '/images/image-removebg-preview%201.png',
  location = 'Chicago',
  role = DEFAULT_ROLE,
}) => (
  <Section aria-labelledby="featured-specialist-heading" tone="surface" spacing="sm">
    <div className="overflow-hidden rounded-card bg-brand-navy-card text-brand-on-dark">
      <div className="flex flex-col gap-[clamp(1.5rem,2.5vw,2.5rem)] p-[clamp(1.25rem,2.6vw,3.25rem)]">
        <div className="flex items-center justify-between gap-4">
          {/* Static until the location list exists — becomes a real filter then. */}
          <p className="inline-flex items-center gap-3 rounded-full border border-brand-on-dark/35 px-5 py-2 text-caption text-brand-on-dark-muted">
            <span>{location}</span>
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
              <path
                d="M5.5 7.5L10 12l4.5-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>

          <div className="flex shrink-0 gap-2">
            <CircleControl label="Previous specialist" direction="prev" tone="dark" />
            <CircleControl label="Next specialist" direction="next" tone="dark" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Heading
            id="featured-specialist-heading"
            level={2}
            size="display"
            font="serif"
            tone="onDark"
            className="text-center tracking-[-0.03em] uppercase"
          >
            Healthcare
          </Heading>

          <div className="relative mt-[clamp(1.5rem,3vw,2.5rem)] flex w-full justify-center lg:-mt-[clamp(1rem,3vw,3rem)]">
            <MediaFrame
              src={personSrc}
              alt="Medical pharmacist"
              pendingLabel="pharmacist.png"
              tone="navyCard"
              sizes="(max-width: 1024px) 60vw, 310px"
              imageClassName="object-contain! object-bottom"
              className="aspect-[310/420] w-[min(19.375rem,60%)] rounded-media"
            />

            <p className="mt-4 text-subtitle leading-tight text-brand-red lg:absolute lg:top-[38%] lg:right-0 lg:mt-0 lg:w-[min(30%,14rem)] lg:text-left">
              {role}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <Text size="caption" tone="onDarkMuted" className="max-w-[38ch]">
            Lorem ipsum is the standard placeholder text used in graphic design,
            publishing, and web
          </Text>

          <div className="flex shrink-0 items-center gap-3">
            <GeneralLink
              href="/careers"
              variant="button"
              buttonVariant="cta"
              size="cta"
            >
              Explore Jobs
            </GeneralLink>

            <CircleControl label="More roles" direction="next" tone="dark" />
          </div>
        </div>
      </div>
    </div>
  </Section>
);
