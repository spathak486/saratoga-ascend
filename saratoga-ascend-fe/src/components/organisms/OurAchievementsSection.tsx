'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '../atoms';
import {
  AchievementGlassCard,
  type AchievementGlassCardProps,
} from '../molecules/AchievementGlassCard';
import {
  CAROUSEL_SLIDE_CLASS,
  useCardCarousel,
} from '../molecules/CardCarousel';
import { CountUpStat } from '../molecules/CountUpStat';
import type { StrapiImage } from '@/lib/schemas';

/** Exactly two plates fill the desktop viewport (one gutter between them).
 *  2px inset on each slide keeps the white stroke inside the overflow clip. */
/** 828 + 21 + 828 inside the 1677px track (Figma 2002:1047 / 2002:1053). */
const CARD_GAP = '1.3125rem';
const TWO_UP_SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} box-border shrink-0 basis-[calc((100%-1.3125rem)/2)] p-[2px]`;
const ONE_UP_SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} box-border shrink-0 basis-full p-[2px] md:basis-[calc((100%-1.3125rem)/2)]`;
const ACHIEVEMENT_BG = '/images/bg-achievements.gif';

function isPlacementStat(label: string) {
  return /placement/i.test(label);
}

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
      <img
        src={ACHIEVEMENT_BG}
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(237.8deg, rgba(15, 61, 96, 0.8) 29.327%, rgba(240, 20, 36, 0.8) 100%)',
        }}
        aria-hidden="true"
      />
    </>
  );
}

function AwardsTrack({
  viewportRef,
  slideClassName,
  slides,
  onPrev,
  onNext,
}: {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  slideClassName: string;
  slides: Array<AchievementGlassCardProps & { key: string }>;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      ref={viewportRef}
      className="snap-x snap-mandatory overflow-x-auto py-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-scrollbar]:hidden"
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
      <div className="flex" style={{ gap: CARD_GAP }}>
        {slides.map((slide) => (
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
  );
}

export interface AchievementCardData {
  documentId?: string;
  referenceTitle?: string | null;
  card?: {
    year?: string | null;
    title?: string | null;
    description?: string | null;
    logo?: StrapiImage | null;
  } | null;
}

export interface AchievementCounterData {
  title?: string | null;
  counter?: string | null;
}

export interface OurAchievementsSectionProps {
  title?: string | null;
  bgImage?: string | null;
  counters?: AchievementCounterData[] | null;
  cards?: AchievementCardData[] | null;
}

/**
 * Achievements band (Figma 2002:1028), 1920×1334. The CMS still supplies
 * title, counters, and cards. The backdrop is the local GIF; `bgImage` stays
 * on the props so the registry query is unchanged. Only a Placements counter
 * uses the Numbers1 hover reel.
 */
export const OurAchievementsSection: React.FC<OurAchievementsSectionProps> = ({
  title,
  counters,
  cards,
}) => {
  const desktop = useCardCarousel({ loop: true });
  const mobile = useCardCarousel({ loop: true });

  const headingText = title?.trim() ? title : 'Our Achievements';

  const resolvedCards = React.useMemo<AchievementGlassCardProps[]>(() => {
    if (cards && cards.length > 0) {
      const mapped: AchievementGlassCardProps[] = [];
      for (let idx = 0; idx < cards.length; idx++) {
        const item = cards[idx];
        const c = item.card;
        if (!c && !item.referenceTitle) continue;
        const cleanDesc = c?.description
          ? c.description.replace(/<[^>]*>/g, '').trim()
          : null;
        if (!c?.title?.trim() && !item.referenceTitle) continue;
        mapped.push({
          year: c?.year?.trim() || null,
          title: c?.title?.trim() || item.referenceTitle || null,
          body: cleanDesc || null,
          badgeSrc: c?.logo?.url || null,
          badgeAlt: c?.logo?.alternativeText || c?.title || item.referenceTitle || 'Achievement badge',
          badgeShape: idx % 2 === 0 ? 'round' : 'portrait',
        });
      }
      return mapped;
    }
    return [];
  }, [cards]);

  const slides = React.useMemo(() => {
    if (resolvedCards.length === 1) {
      return [
        { ...resolvedCards[0], key: 'slide-0' },
        { ...resolvedCards[0], key: 'slide-0-dup' },
      ];
    }
    if (resolvedCards.length === 2) {
      return [
        { ...resolvedCards[0], key: 'slide-0' },
        { ...resolvedCards[1], key: 'slide-1' },
        { ...resolvedCards[0], key: 'slide-0-dup' },
        { ...resolvedCards[1], key: 'slide-1-dup' },
      ];
    }
    return resolvedCards.map((c, i) => ({ ...c, key: `slide-${i}` }));
  }, [resolvedCards]);

  const resolvedStats = React.useMemo(() => {
    if (counters && counters.length > 0) {
      return counters
        .filter((c) => Boolean(c.counter || c.title))
        .map((c) => ({
          value: c.counter || '0',
          label: c.title || '',
        }));
    }
    return [];
  }, [counters]);

  return (
    <section
      aria-labelledby="our-achievements-heading"
      className="relative isolate"
    >
      <h2 id="our-achievements-heading" className="sr-only">
        {headingText}
      </h2>

      <div className="relative hidden aspect-[1920/1334] w-full xl:block">
        <Backdrop />

        <p
          aria-hidden="true"
          className="absolute top-[5.997%] left-1/2 -translate-x-1/2 font-serif text-section leading-[1.2] whitespace-nowrap text-white"
        >
          {headingText}
        </p>

        <div className="absolute top-[16.942%] left-[6.406%] w-[87.344%] overflow-visible">
          <AwardsTrack
            viewportRef={desktop.viewportRef}
            slideClassName={TWO_UP_SLIDE_CLASS}
            slides={slides}
            onPrev={desktop.scrollPrev}
            onNext={desktop.scrollNext}
          />
        </div>

        <div className="absolute top-[75.112%] left-[6.25%] w-[87.5%]">
          <dl className="flex items-start justify-between">
            {resolvedStats.map((stat, idx) => (
              <div
                key={`${stat.label}-${idx}`}
                className="flex flex-col items-center text-center"
              >
                <dd className="font-serif text-numeral text-white">
                  {isPlacementStat(stat.label) ? (
                    <CountUpStat value={stat.value} />
                  ) : (
                    stat.value
                  )}
                </dd>
                <dt className="mt-1.5 font-sans text-stat-label font-medium whitespace-nowrap text-white">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <BandArrow
          direction="prev"
          onClick={desktop.scrollPrev}
          className="absolute inset-[34.86%_95.26%_60.64%_1.61%] z-10"
        />
        <BandArrow
          direction="next"
          onClick={desktop.scrollNext}
          className="absolute inset-[34.86%_1.458%_60.64%_95.417%] z-10"
        />
      </div>

      <div className="relative xl:hidden">
        <Backdrop />

        <Container className="relative py-10 sm:py-section">
          <p
            aria-hidden="true"
            className="text-center font-serif text-section leading-[1.2] text-balance text-white"
          >
            {headingText}
          </p>

          <div className="mt-block">
            <AwardsTrack
              viewportRef={mobile.viewportRef}
              slideClassName={ONE_UP_SLIDE_CLASS}
              slides={slides}
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
            {resolvedStats.map((stat, idx) => (
              <div key={`${stat.label}-${idx}`} className="min-w-0">
                <dd className="font-serif text-[clamp(2.25rem,12vw,7.5rem)] leading-[1.125]">
                  {isPlacementStat(stat.label) ? (
                    <CountUpStat value={stat.value} />
                  ) : (
                    stat.value
                  )}
                </dd>
                <dt className="mt-1.5 font-sans text-[clamp(0.875rem,3.2vw,2rem)] font-medium">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
};
