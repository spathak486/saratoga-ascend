'use client';

import React from 'react';
import { Section } from '../atoms';
import { CardCarousel } from '../molecules/CardCarousel';
import { CircleControl } from '../molecules/CircleControl';
import { StaffInfoCard, StaffPhotoCard } from '../molecules/StaffCard';

const CARD_TITLE = (
  <>
    Travel
    <br />
    Staffing
  </>
);

const PHOTO_BODY = 'Lorem ipsum is the standard placeholder text used in graphic design';

const INFO_BODY = 'Lorem ipsum is the standard placeholder text used in graphic design';

/** Arrows sit vertically centred just inside the page gutter. */
const arrowPosition = 'absolute top-1/2 z-20 -translate-y-1/2';

export interface TravelStaffingSectionProps {
  firstImageSrc?: string;
  secondImageSrc?: string;
}

export const TravelStaffingSection: React.FC<TravelStaffingSectionProps> = ({
  firstImageSrc = '/images/healthcare-team.png',
  secondImageSrc = '/images/Group%2016.png',
}) => (
  <Section aria-label="Travel staffing services" tone="surface" spacing="sm">
    <CardCarousel
      label="Travel staffing services"
      className="px-[clamp(2.75rem,4vw,3.5rem)]"
      trackClassName="-ml-3"
      slideClassName="basis-full pl-3 min-[481px]:basis-1/2 lg:basis-1/4"
      loop
      controls={({ scrollPrev, scrollNext }) => (
        <>
          <CircleControl
            label="Previous"
            direction="prev"
            tone="staffingArrow"
            onClick={scrollPrev}
            className={`${arrowPosition} left-0`}
          />
          <CircleControl
            label="Next"
            direction="next"
            tone="staffingArrow"
            onClick={scrollNext}
            className={`${arrowPosition} right-0`}
          />
        </>
      )}
    >
      <StaffPhotoCard
        imageSrc={firstImageSrc}
        imageAlt="Travel staffing"
        imagePendingLabel="travel-staffing-1.jpg"
        title={CARD_TITLE}
        body={PHOTO_BODY}
        action={{ kind: 'play', label: 'Play travel staffing story' }}
      />

      <StaffPhotoCard
        imageSrc={secondImageSrc}
        imageAlt="Travel staffing"
        imagePendingLabel="travel-staffing-2.jpg"
        title={CARD_TITLE}
        body={PHOTO_BODY}
        overlay="dark"
        action={{ kind: 'link', href: '/what-we-do', label: 'View travel staffing' }}
      />

      <StaffInfoCard
        title={CARD_TITLE}
        body={INFO_BODY}
        playLabel="Play travel staffing overview"
      />

      <StaffInfoCard
        title={CARD_TITLE}
        body={INFO_BODY}
        playLabel="Play travel staffing overview"
        selected
      />
    </CardCarousel>
  </Section>
);
