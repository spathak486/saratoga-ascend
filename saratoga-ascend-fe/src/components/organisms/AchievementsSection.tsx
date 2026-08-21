'use client';

import React from 'react';
import { Heading, MediaFrame, Section } from '../atoms';
import {
  AchievementCard,
  type AchievementCardProps,
} from '../molecules/AchievementCard';
import {
  CAROUSEL_BLEED_CLASS,
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_VIEWPORT_CLASS,
  useCardCarousel,
} from '../molecules/CardCarousel';
import { CircleControl } from '../molecules/CircleControl';

const CARD_BODY =
  'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web';

const ACHIEVEMENTS: AchievementCardProps[] = [
  {
    year: '2026–2027',
    badgeSrc: '/images/image%206.png',
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
    badgeSrc: '/images/image%208.png',
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
  posterSrc = '/images/rendering-anime-doctors-work%201.png',
  cornerLogoSrc,
}) => {
  /* The hook rather than <CardCarousel>: the arrows belong at the band's outer
     edges, well outside the 825px content column, so they cannot live inside
     the carousel's own positioning context. */
  const { viewportRef, scrollPrev, scrollNext } = useCardCarousel({
    loop: true,
  });

  return (
    <Section
      aria-labelledby="achievements-heading"
      tone="navy"
      spacing="none"
      bleed
      className="isolate overflow-hidden pb-[clamp(2.5rem,4vw,3.5rem)] md:min-h-[688px]"
    >
      {/* Footage, colour wash, then a lighter pass — stacked below the content
          so the band reads as one image rather than three layers. */}
      <div className="absolute inset-0 -z-30">
        {videoSrc ? (
          <video
            className="size-full object-cover"
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
          <MediaFrame
            src={posterSrc}
            alt=""
            tone="navy"
            sizes="100vw"
            className="size-full border-0"
          />
        )}
      </div>

      <div
        className="bg-brand-band absolute inset-0 -z-20 mix-blend-multiply"
        aria-hidden="true"
      />
      <div className="bg-band-glass absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative mx-auto w-[min(825px,100%_-_3rem)] pt-[clamp(1.25rem,1.0224rem+0.9709vw,2.1875rem)] md:w-[min(825px,100%_-_100px)]">
        <Heading
          id="achievements-heading"
          level={2}
          size="bandTitle"
          font="sans"
          tone="onDark"
          className="mb-[clamp(1rem,0.7876rem+0.9061vw,1.875rem)] text-center"
        >
          Our Achievements
        </Heading>

        <div className={CAROUSEL_BLEED_CLASS}>
          <div
            ref={viewportRef}
            className={CAROUSEL_VIEWPORT_CLASS}
            role="group"
            aria-roledescription="carousel"
            aria-label="Certifications"
            tabIndex={0}
          >
            <div className="-ml-[23px] flex">
              {ACHIEVEMENTS.map((card) => (
                <div
                  key={card.badgeAlt}
                  className={`${CAROUSEL_SLIDE_CLASS} basis-full pl-[23px] min-[751px]:basis-1/2`}
                  role="group"
                  aria-roledescription="slide"
                  data-carousel-slide
                >
                  <AchievementCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <dl className="mt-[clamp(2rem,1.6207rem+1.6181vw,3.5625rem)] grid grid-cols-2 gap-y-10 text-center min-[751px]:grid-cols-4">
          {/* Reversed so the numeral reads first while `dt` still precedes `dd`. */}
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center">
              <dt className="mt-2 text-body text-brand-on-dark">{stat.label}</dt>
              <dd className="font-serif text-stat text-brand-on-dark">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <CircleControl
        label="Previous achievement"
        direction="prev"
        tone="achievementArrow"
        onClick={scrollPrev}
        className="absolute top-[40%] left-[clamp(0.5rem,2.45vw,2.9375rem)] z-10"
      />
      <CircleControl
        label="Next achievement"
        direction="next"
        tone="achievementArrow"
        onClick={scrollNext}
        className="absolute top-[40%] right-[clamp(0.5rem,1.46vw,1.75rem)] z-10"
      />

      {cornerLogoSrc && (
        <div className="absolute top-3 right-[clamp(1rem,3.4vw,4.0625rem)] z-10 size-[43px] overflow-hidden rounded-full bg-brand-surface shadow-[0_2px_8px_rgb(0_0_0/0.45)]">
          <MediaFrame
            src={cornerLogoSrc}
            alt=""
            tone="tile"
            sizes="43px"
            imageClassName="object-contain!"
            className="size-full rounded-full border-0"
          />
        </div>
      )}
    </Section>
  );
};
