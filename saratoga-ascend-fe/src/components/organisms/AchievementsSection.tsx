'use client';

import React from 'react';
import { GlobalImage } from '../atoms';
import { AchievementCard, type AchievementCardProps } from '../molecules/AchievementCard';
import { CircleControl } from '../molecules/CircleControl';
import {
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_VIEWPORT_CLASS,
  useCardCarousel,
} from '../molecules/CardCarousel';

const CARD_BODY = (
  <>
    Lorem ipsum is the standard
    <br />
    placeholder text used in graphic
    <br />
    design, publishing, and web
  </>
);

const ACHIEVEMENTS: AchievementCardProps[] = [
  {
    year: '2026–2027',
    badgeSrc: '/images/joint-commission.png',
    badgeAlt: 'The Joint Commission',
    badgeShape: 'square',
    title: (
      <>
        The Joint
        <br />
        Commission
      </>
    ),
    body: CARD_BODY,
  },
  {
    year: '2026–2027',
    badgeSrc: '/images/wosb.png',
    badgeAlt: 'WOSB Certified',
    badgeShape: 'portrait',
    title: (
      <>
        WOSB
        <br />
        Certified
      </>
    ),
    body: CARD_BODY,
  },
];

const STATS = [
  { value: '50+', label: 'Specialists' },
  { value: '1500', label: 'Placements' },
  { value: '50+', label: 'Locations' },
  { value: '256', label: 'Services' },
] as const;

export interface AchievementsSectionProps {
  videoSrc?: string;
  posterSrc?: string;
  cornerLogoSrc?: string;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  videoSrc,
  posterSrc = '/images/achievements-poster.jpg',
  cornerLogoSrc = '/images/company-logo.png',
}) => {
  const { viewportRef, scrollPrev, scrollNext } = useCardCarousel({ loop: true });

  return (
    <section
      aria-labelledby="achievements-heading"
      className="relative isolate w-full overflow-hidden pb-[45px] text-white min-[751px]:min-h-[688px] min-[751px]:pb-0"
    >
      {videoSrc ? (
        <video
          className="absolute inset-0 z-[-3] size-full object-cover"
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <GlobalImage
          src={posterSrc}
          alt=""
          fill
          sizes="100vw"
          containerClassName="absolute inset-0 z-[-3] size-full"
        />
      )}

      <div
        className="absolute inset-0 z-[-2] bg-[linear-gradient(90deg,rgba(185,18,47,0.88)_0%,rgba(157,31,70,0.68)_28%,rgba(25,91,128,0.66)_65%,rgba(4,49,78,0.91)_100%)] mix-blend-multiply"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 z-[-1] bg-[linear-gradient(90deg,rgba(190,24,49,0.38),rgba(22,87,121,0.30))]"
        aria-hidden="true"
      />

      <div className="relative z-3 mx-auto w-[calc(100%_-_70px)] pt-[35px] min-[751px]:w-[min(825px,calc(100%_-_100px))]">
        <h2
          id="achievements-heading"
          className="mb-[30px] text-center text-[24px] font-normal tracking-[0.3px]"
        >
          Our Achievements
        </h2>

        <div
          ref={viewportRef}
          className={CAROUSEL_VIEWPORT_CLASS}
          role="group"
          aria-roledescription="carousel"
          aria-label="Certifications"
          tabIndex={0}
        >
          <div className="-ml-[15px] flex min-[1001px]:-ml-[23px]">
            {ACHIEVEMENTS.map((card) => (
              <div
                key={card.badgeAlt}
                role="group"
                aria-roledescription="slide"
                data-carousel-slide
                className={`${CAROUSEL_SLIDE_CLASS} basis-full pl-[15px] min-[751px]:basis-1/2 min-[1001px]:pl-[23px]`}
              >
                <AchievementCard {...card} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[57px] grid grid-cols-2 gap-y-[35px] text-center min-[751px]:grid-cols-4 min-[751px]:gap-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <strong className="font-serif text-[38px] leading-[0.95] font-normal min-[481px]:text-[48px] min-[751px]:text-[62px]">
                {stat.value}
              </strong>
              <span className="mt-2 text-[13px] min-[481px]:text-[17px]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-3 right-5 z-10 size-[43px] overflow-hidden rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.45)] min-[751px]:right-[65px]">
        <GlobalImage
          src={cornerLogoSrc}
          alt=""
          fill
          sizes="43px"
          className="object-contain!"
          containerClassName="size-full"
        />
      </div>

      <CircleControl
        label="Previous achievement"
        direction="prev"
        tone="achievementArrow"
        onClick={scrollPrev}
        className="absolute top-[40%] left-2 z-10 min-[751px]:left-[47px]"
      />

      <CircleControl
        label="Next achievement"
        direction="next"
        tone="achievementArrow"
        onClick={scrollNext}
        className="absolute top-[40%] right-2 z-10 min-[751px]:right-[28px]"
      />
    </section>
  );
};
