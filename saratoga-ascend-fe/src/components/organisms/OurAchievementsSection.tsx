'use client';

import React, { useState } from 'react';
import { Container, MediaFrame } from '../atoms';
import {
  AchievementGlassCard,
  type AchievementGlassCardProps,
} from '../molecules/AchievementGlassCard';

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

const STATS = [
  { value: '50+', label: 'Specialists', left: 'left-[16.72%]' },
  { value: '1500', label: 'Placements', left: 'left-[38.98%]' },
  { value: '50+', label: 'Locations', left: 'left-[61.09%]' },
  { value: '256', label: 'Services', left: 'left-[83.28%]' },
] as const;

function BandArrow({
  direction,
  onClick,
  className = '',
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous awards' : 'Next awards'}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full border border-brand-line bg-[rgb(240_20_36/0.02)] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`.trim()}
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-[42%] ${direction === 'next' ? 'rotate-180' : ''}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M15.5 4.2 6.8 12l8.7 7.8V4.2Z" />
      </svg>
    </button>
  );
}

function Backdrop() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-13.58%] left-[-3.88%] h-[121.4%] w-[108.73%]">
          <MediaFrame
            src="/images/rendering-anime-doctors-work%201.png"
            alt=""
            pendingLabel="achievements-backdrop"
            tone="navy"
            sizes="100vw"
            imageClassName="object-cover!"
            className="size-full border-0"
          />
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(232.12deg, rgb(15 61 96 / 0.8) 29.327%, rgb(240 20 36 / 0.8) 100%)',
        }}
        aria-hidden="true"
      />
    </>
  );
}

/**
 * Seventh-last homepage band (Figma node 1:394). Locked 1920×1080 stage:
 * clinical photo, 232° navy-to-red wash, two 828×538 glass plates, 120px
 * numerals, and 60px arrows in the page gutter.
 */
export const OurAchievementsSection: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const first = AWARDS[offset % AWARDS.length];
  const second = AWARDS[(offset + 1) % AWARDS.length];
  const goPrev = () => setOffset((n) => n + AWARDS.length - 1);
  const goNext = () => setOffset((n) => n + 1);

  if (!first || !second) return null;

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

        <div className="absolute top-[20.93%] left-[6.41%] w-[43.125%]">
          <AchievementGlassCard key={`${first.badgeAlt}-a-${offset}`} {...first} />
        </div>
        <div className="absolute top-[20.93%] left-[50.625%] w-[43.125%]">
          <AchievementGlassCard key={`${second.badgeAlt}-b-${offset}`} {...second} />
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
          onClick={goPrev}
          className="absolute inset-[43.06%_95.26%_51.39%_1.61%] z-10"
        />
        <BandArrow
          direction="next"
          onClick={goNext}
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
            <div className="md:hidden">
              <AchievementGlassCard key={`${first.badgeAlt}-m-${offset}`} {...first} />
            </div>
            <div className="hidden flex-col gap-grid md:flex">
              <AchievementGlassCard
                key={`${first.badgeAlt}-t-${offset}`}
                {...first}
              />
              <AchievementGlassCard
                key={`${second.badgeAlt}-t2-${offset}`}
                {...second}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <BandArrow direction="prev" onClick={goPrev} className="size-12 sm:size-[3.75rem]" />
            <BandArrow direction="next" onClick={goNext} className="size-12 sm:size-[3.75rem]" />
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
