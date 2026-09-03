'use client';

import React from 'react';
import Image from 'next/image';
import { Container, MediaFrame } from '../atoms';
import {
  AchievementGlassCard,
  type AchievementGlassCardProps,
} from '../molecules/AchievementGlassCard';
import {
  CAROUSEL_BLEED_CLASS,
  CAROUSEL_SLIDE_CLASS,
  CAROUSEL_VIEWPORT_CLASS,
  useCardCarousel,
} from '../molecules/CardCarousel';

const CARD_BODY =
  'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web';

const AWARDS: readonly AchievementGlassCardProps[] = [
  {
    year: '2026-2027',
    title: (
      <>
        The Joint
        <br />
        Commission
      </>
    ),
    body: CARD_BODY,
    badgeSrc: '/images/image%206.png',
    badgeAlt: 'The Joint Commission',
    badgeShape: 'round',
  },
  {
    year: '2026-2027',
    title: (
      <>
        WOSB
        <br />
        Certified
      </>
    ),
    body: CARD_BODY,
    badgeSrc: '/images/image%208.png',
    badgeAlt: 'WOSB Certified',
    badgeShape: 'portrait',
  },
];

/** Repeat the pair so the track can travel past the fold, same pattern as
 *  Past Performance. */
const SLIDES = [
  { ...AWARDS[0], key: 'joint-1' },
  { ...AWARDS[1], key: 'wosb-1' },
  { ...AWARDS[0], key: 'joint-2' },
  { ...AWARDS[1], key: 'wosb-2' },
] as const;

const STATS = [
  { value: '50+', label: 'Specialists', left: 'left-[16.72%]' },
  { value: '1500', label: 'Placements', left: 'left-[38.98%]' },
  { value: '50+', label: 'Locations', left: 'left-[61.09%]' },
  { value: '256', label: 'Services', left: 'left-[83.28%]' },
] as const;

/** Two 828px plates plus the 24px grid gutter, as a fraction of the track. */
const TWO_UP_SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} shrink-0 basis-[calc((100%+1.5rem)/2)] pl-grid`;
const ONE_UP_SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} shrink-0 basis-full pl-grid md:basis-[calc((100%+1.5rem)/2)]`;

/** Same white 60×60 circular control as the Healthcare feature carousel
 *  (`phase5-feature-prev.svg`) — both directions load the one asset, and
 *  "next" is mirrored in CSS since the source file only points one way. */
function BandArrow({
  direction,
  onClick,
  className = '',
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  className?: string;
}) {
  const icon = (
    <Image
      src="/images/phase5/phase5-feature-prev.svg"
      alt=""
      fill
      sizes="60px"
      aria-hidden
      className="size-full"
    />
  );

  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous achievement' : 'Next achievement'}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full transition-transform duration-150 ease-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:scale-100 ${className}`.trim()}
    >
      {direction === 'next' ? (
        <span className="relative flex size-full -scale-y-100 rotate-180">{icon}</span>
      ) : (
        icon
      )}
    </button>
  );
}

function Backdrop() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-13.58%] left-[-3.88%] h-[121.4%] w-[108.73%]">
          <MediaFrame
            src="/images/achievements-bg.jpg"
            alt=""
            pendingLabel="achievements-backdrop"
            tone="navy"
            sizes="100vw"
            imageClassName="animate-bg-drift object-cover! motion-reduce:animate-none"
            className="size-full border-0"
          />
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(246.37deg, rgba(15, 61, 96, 0.8) 29.33%, rgba(240, 20, 36, 0.8) 100%)',
        }}
        aria-hidden="true"
      />
    </>
  );
}

function AwardsTrack({
  viewportRef,
  slideClassName,
  onPrev,
  onNext,
}: {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  slideClassName: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className={CAROUSEL_BLEED_CLASS}>
      <div
        ref={viewportRef}
        className={CAROUSEL_VIEWPORT_CLASS}
        role="group"
        aria-roledescription="carousel"
        aria-label="Achievement awards"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            onPrev();
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            onNext();
          }
        }}
      >
        <div className="-ml-grid flex">
          {SLIDES.map((slide) => (
            <div
              key={slide.key}
              className={slideClassName}
              role="group"
              aria-roledescription="slide"
              data-carousel-slide
            >
              <AchievementGlassCard
                year={slide.year}
                title={slide.title}
                body={slide.body}
                badgeSrc={slide.badgeSrc}
                badgeAlt={slide.badgeAlt}
                badgeShape={slide.badgeShape}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Seventh-last homepage band (Figma node 1:394). Locked 1920×1080 stage:
 * clinical photo, 232° navy-to-red wash, two 828×538 glass plates, 120px
 * numerals, and 60px arrows in the page gutter. Cards slide on the same
 * snap track as Past Performance — no fade.
 */
export const OurAchievementsSection: React.FC = () => {
  const desktop = useCardCarousel({ loop: true });
  const mobile = useCardCarousel({ loop: true });

  return (
    <section
      aria-labelledby="our-achievements-heading"
      className="relative isolate overflow-hidden"
    >
      <h2 id="our-achievements-heading" className="sr-only">
        Our Achievements
      </h2>

      <div className="relative hidden aspect-[1920/1080] w-full xl:block">
        <Backdrop />

        <p
          aria-hidden="true"
          className="absolute top-[7.41%] left-1/2 -translate-x-1/2 font-serif text-section whitespace-nowrap text-white"
        >
          Our Achievements
        </p>

        <div className="absolute top-[20.93%] left-[6.41%] w-[87.34%]">
          <AwardsTrack
            viewportRef={desktop.viewportRef}
            slideClassName={TWO_UP_SLIDE_CLASS}
            onPrev={desktop.scrollPrev}
            onNext={desktop.scrollNext}
          />
        </div>

        <dl>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt
                className={`absolute top-[90.74%] ${stat.left} -translate-x-1/2 -translate-y-1/2 text-stat-label font-medium whitespace-nowrap text-white`}
              >
                {stat.label}
              </dt>
              <dd
                className={`absolute top-[82.31%] ${stat.left} -translate-x-1/2 -translate-y-1/2 font-serif text-numeral leading-none text-white`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <BandArrow
          direction="prev"
          onClick={desktop.scrollPrev}
          className="absolute inset-[43.06%_95.26%_51.39%_1.61%] z-10"
        />
        <BandArrow
          direction="next"
          onClick={desktop.scrollNext}
          className="absolute inset-[43.06%_1.46%_51.39%_95.42%] z-10"
        />
      </div>

      <div className="relative xl:hidden">
        <Backdrop />

        <Container className="relative py-10 sm:py-section">
          <p
            aria-hidden="true"
            className="text-center font-serif text-section text-balance text-white"
          >
            Our Achievements
          </p>

          <div className="mt-block">
            <AwardsTrack
              viewportRef={mobile.viewportRef}
              slideClassName={ONE_UP_SLIDE_CLASS}
              onPrev={mobile.scrollPrev}
              onNext={mobile.scrollNext}
            />
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <BandArrow
              direction="prev"
              onClick={mobile.scrollPrev}
              className="relative size-12 sm:size-[3.75rem]"
            />
            <BandArrow
              direction="next"
              onClick={mobile.scrollNext}
              className="relative size-12 sm:size-[3.75rem]"
            />
          </div>

          <dl className="mt-block grid grid-cols-2 gap-x-4 gap-y-8 text-center text-white">
            {STATS.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-[clamp(2.25rem,12vw,4.5rem)] leading-none">
                  {stat.value}
                </dd>
                <p className="mt-2 text-[clamp(0.875rem,3.2vw,1.5rem)] font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
};
