'use client';

import React from 'react';
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

const PHOTO_BODY = (
  <>
    Lorem ipsum is the
    <br />
    standard placeholder text
    <br />
    used in graphic design,
    <br />
    publishing, and web
  </>
);

const INFO_BODY = (
  <>
    Lorem ipsum is the standard
    <br />
    placeholder text used in graphic
    <br />
    design, publishing, and web
  </>
);

const arrowPosition = 'absolute top-1/2 z-20 -translate-y-1/2';

export interface TravelStaffingSectionProps {
  firstImageSrc?: string;
  secondImageSrc?: string;
}

export const TravelStaffingSection: React.FC<TravelStaffingSectionProps> = ({
  firstImageSrc = '/images/travel-staffing-1.jpg',
  secondImageSrc = '/images/travel-staffing-2.jpg',
}) => {
  return (
    <section
      aria-label="Travel staffing services"
      className="w-full bg-white px-[25px] py-[30px] min-[751px]:px-[60px] min-[751px]:py-[45px] min-[1001px]:px-10"
    >
      <CardCarousel
        label="Travel staffing services"
        className="mx-auto w-[min(920px,100%)]"
        trackClassName="-ml-3"
        slideClassName="basis-full pl-3 min-[481px]:basis-1/2 min-[751px]:basis-1/4"
        loop
        controls={({ scrollPrev, scrollNext }) => (
          <>
            <CircleControl
              label="Previous"
              direction="prev"
              tone="staffingArrow"
              onClick={scrollPrev}
              className={`${arrowPosition} -left-[18px] min-[481px]:-left-[25px] min-[751px]:-left-[50px] min-[1001px]:-left-[46px]`}
            />
            <CircleControl
              label="Next"
              direction="next"
              tone="staffingArrow"
              onClick={scrollNext}
              className={`${arrowPosition} -right-[18px] min-[481px]:-right-[25px] min-[751px]:-right-[50px] min-[1001px]:-right-[46px]`}
            />
          </>
        )}
      >
        <StaffPhotoCard
          imageSrc={firstImageSrc}
          imageAlt="Travel staffing"
          title={CARD_TITLE}
          body={PHOTO_BODY}
          action={{ kind: 'play', label: 'Play travel staffing story' }}
        />

        <StaffPhotoCard
          imageSrc={secondImageSrc}
          imageAlt="Travel staffing"
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
    </section>
  );
};
