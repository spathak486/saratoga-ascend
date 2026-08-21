'use client';

import React from 'react';
import { Section } from '../atoms';
import { CardCarousel } from '../molecules/CardCarousel';
import { CircleControl } from '../molecules/CircleControl';
import { SpecialistProfile, type SpecialistProfileProps } from '../molecules/SpecialistProfile';

const PROFILE_BODY = (
  <>
    <p>
      Lorem ipsum is the standard placeholder text used in graphic design,
      publishing, and web development to showcase layouts.
    </p>
    <p>
      Without the distraction of meaningful content, the reader can judge the
      shape of the page rather than the words on it.
    </p>
  </>
);

/** Replace with real specialists once the profiles and portraits are supplied. */
const PROFILES: SpecialistProfileProps[] = [
  {
    role: 'Certified Nursing Assistant',
    body: PROFILE_BODY,
    portraitSrc: '/images/image%2015.png',
  },
  {
    role: 'Registered Nurse',
    body: PROFILE_BODY,
    portraitSrc: '/images/image%2015.png',
  },
  {
    role: 'Clinical Laboratory Scientist',
    body: PROFILE_BODY,
    portraitSrc: '/images/image%2015.png',
  },
];

export interface SpotlightSectionProps {
  profiles?: SpecialistProfileProps[];
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  profiles = PROFILES,
}) => (
  <Section aria-label="Featured specialists" tone="surface" spacing="md">
    <div className="relative">
      {/*
        Backing plate is inset vertically so the portrait card overlaps it at
        the top and bottom, and starts left of the card so grey shows through.
      */}
      <div
        className="absolute inset-x-0 inset-y-[clamp(1.25rem,3vw,2.75rem)] rounded-card bg-brand-surface-muted"
        aria-hidden="true"
      />

      <div className="relative pr-[clamp(1.5rem,4vw,4rem)] pl-[clamp(1.25rem,4vw,4rem)]">
        <CardCarousel
          label="Featured specialists"
          slideClassName="basis-full"
          loop
          controls={({ scrollPrev, scrollNext }) => (
            <div className="mt-[clamp(1rem,2vw,1.75rem)] flex gap-3 lg:pl-[calc(17rem+clamp(1.5rem,3vw,3rem))]">
              <CircleControl
                label="Previous specialist"
                direction="prev"
                onClick={scrollPrev}
              />
              <CircleControl
                label="Next specialist"
                direction="next"
                onClick={scrollNext}
              />
            </div>
          )}
        >
          {profiles.map((profile) => (
            <SpecialistProfile key={profile.role} {...profile} />
          ))}
        </CardCarousel>
      </div>

      {/* Red rule anchoring the right edge of the plate. */}
      <span
        className="absolute inset-y-[clamp(2.5rem,6vw,5.5rem)] right-0 w-[6px] rounded-l-sm bg-brand-red"
        aria-hidden="true"
      />
    </div>
  </Section>
);
