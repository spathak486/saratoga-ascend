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
  useDragToScroll,
  useWheelToScroll,
} from '../molecules/CardCarousel';
import { CountUpStat } from '../molecules/CountUpStat';
import type { StrapiImage } from '@/lib/schemas';

/** Exactly two plates fill the desktop viewport (one gutter between them).
 *  2px inset on each slide keeps the white stroke inside the overflow clip. */
/** 828 + 27 + 828 inside the 1683px track (Figma Homepage 2243:3498 / 2243:3505). */
const CARD_GAP = '1.6875rem';
const TWO_UP_SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} box-border shrink-0 basis-[calc((100%-1.6875rem)/2)] p-[2px]`;
/** One full card per view on mobile/tablet — no next-card peek. */
const MOBILE_SLIDE_CLASS = `${CAROUSEL_SLIDE_CLASS} box-border w-full min-w-full shrink-0 grow-0 basis-full`;
const ACHIEVEMENT_BG = '/images/bg-achievements.gif';
const INTRO_COPY =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';
const DESKTOP_OVERLAY =
  'linear-gradient(237.8deg, rgba(15, 61, 96, 0.8) 29.327%, rgba(240, 20, 36, 0.8) 100%)';
const MOBILE_OVERLAY =
  'linear-gradient(264.65deg, rgba(15, 61, 96, 0.8) 29.327%, rgba(240, 20, 36, 0.8) 100%)';

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
      onPointerDown={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
      className={`flex cursor-pointer items-center justify-center rounded-full transition-transform duration-100 ease-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:scale-100 ${className}`.trim()}
    >
      {direction === 'next' ? (
        <span className="relative flex size-full -scale-y-100 rotate-180">{icon}</span>
      ) : (
        icon
      )}
    </button>
  );
}

function Backdrop({ overlay }: { overlay: string }) {
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
        style={{ background: overlay }}
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
  gap = CARD_GAP,
  dragHandlers,
  isDragging,
  /** When true, slides are direct flex children of the viewport so `min-w-full` = one card. */
  singleSlide = false,
}: {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  slideClassName: string;
  slides: Array<AchievementGlassCardProps & { key: string }>;
  onPrev: () => void;
  onNext: () => void;
  gap?: string;
  dragHandlers?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
  singleSlide?: boolean;
}) {
  const slideNodes = slides.map((slide) => (
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
  ));

  return (
    <div
      ref={viewportRef}
      className={`${singleSlide ? 'flex' : ''} snap-x snap-mandatory scroll-smooth overflow-x-auto py-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden ${
        isDragging ? 'cursor-grabbing select-none' : dragHandlers ? 'cursor-grab' : ''
      }`.trim()}
      style={singleSlide ? { gap: 0 } : undefined}
      role="group"
      aria-roledescription="carousel"
      aria-label="Achievement awards"
      tabIndex={0}
      onDragStart={(event) => event.preventDefault()}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          onPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          onNext();
        }
      }}
      {...dragHandlers}
    >
      {singleSlide ? (
        slideNodes
      ) : (
        <div className="flex" style={{ gap }}>
          {slideNodes}
        </div>
      )}
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
 * Achievements band — desktop Homepage 2243:3478 (1920×973), mobile
 * 2105:725 (430×710). Older artboard 2002:1028 was 1920×1334. CMS title,
 * counters, and cards stay as delivered. Backdrop is the local GIF; `bgImage`
 * stays on the props so the registry query is unchanged. Placements uses the
 * Numbers1 hover reel (1s ease-in-out).
 */
export const OurAchievementsSection: React.FC<OurAchievementsSectionProps> = ({
  title,
  counters,
  cards,
}) => {
  const desktop = useCardCarousel({ loop: true });
  const mobile = useCardCarousel({ loop: true });
  const { isDragging, dragHandlers } = useDragToScroll(mobile.viewportRef);
  useWheelToScroll(mobile.viewportRef);

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

      <div className="relative hidden w-full xl:flex xl:justify-center">
        <div className="absolute inset-0 w-full h-full">
          <Backdrop overlay={DESKTOP_OVERLAY} />
        </div>

        <div className="relative aspect-[1920/973] w-full max-w-[1920px]">
          <p
            aria-hidden="true"
            className="absolute top-[8.22%] left-1/2 -translate-x-1/2 font-serif text-section leading-[1.2] whitespace-nowrap text-white"
          >
            {headingText}
          </p>

        <div className="absolute top-[23.43%] left-[6.406%] w-[87.656%] overflow-visible">
          <AwardsTrack
            viewportRef={desktop.viewportRef}
            slideClassName={TWO_UP_SLIDE_CLASS}
            slides={slides}
            onPrev={desktop.scrollPrev}
            onNext={desktop.scrollNext}
          />
        </div>

        <div className="absolute top-[73.69%] left-[6.25%] w-[87.5%]">
          <dl className="flex h-[183px] items-center justify-between">
            {resolvedStats.map((stat, idx) => (
              <React.Fragment key={`${stat.label}-${idx}`}>
                <div className="flex flex-col items-center text-center">
                  <dd className="font-serif text-[clamp(4rem,6.25vw,120px)] leading-[1.12] tracking-normal text-white">
                    {isPlacementStat(stat.label) ? (
                      <CountUpStat value={stat.value} />
                    ) : (
                      stat.value
                    )}
                  </dd>
                  <dt className="mt-4 font-sans text-[clamp(1.5rem,1.66vw,32px)] leading-tight font-medium whitespace-nowrap text-white">
                    {stat.label}
                  </dt>
                </div>
                {idx < resolvedStats.length - 1 && (
                  <div className="h-[183px] w-[3px] bg-white opacity-50" />
                )}
              </React.Fragment>
            ))}
          </dl>
        </div>

          <BandArrow
            direction="prev"
            onClick={desktop.scrollPrev}
            className="absolute top-[41.93%] left-[19px] z-10 size-[66px] border-[1.375px] border-white"
          />
          <BandArrow
            direction="next"
            onClick={desktop.scrollNext}
            className="absolute top-[41.93%] right-[19px] z-10 size-[66px] border-[1.375px] border-white"
          />
        </div>
      </div>

      {/* Mobile / tablet — Figma 2105:725: pad 20, title↔copy 12, title block→cards 40 */}
      <div className="relative scroll-mt-24 xl:hidden">
        <Backdrop overlay={MOBILE_OVERLAY} />

        <Container className="relative px-5! pt-5 pb-5">
          <div className="flex flex-col gap-3">
            <p
              aria-hidden="true"
              className="font-serif text-[2rem] leading-[2.5rem] text-white"
            >
              {headingText}
            </p>
            <p className="font-sans text-base leading-5 text-[#ebebeb]">{INTRO_COPY}</p>
          </div>

          <div className="relative mt-10">
            <AwardsTrack
              viewportRef={mobile.viewportRef}
              slideClassName={MOBILE_SLIDE_CLASS}
              slides={slides}
              onPrev={mobile.scrollPrev}
              onNext={mobile.scrollNext}
              gap="0px"
              singleSlide
              dragHandlers={dragHandlers}
              isDragging={isDragging}
            />
            {slides.length > 1 ? (
              <>
                <BandArrow
                  direction="prev"
                  onClick={mobile.scrollPrev}
                  className="absolute top-1/2 left-0 z-50 size-12 -translate-y-1/2 border-[1.375px] border-white bg-black/25 shadow-md backdrop-blur-[2px] md:left-1 md:size-[66px]"
                />
                <BandArrow
                  direction="next"
                  onClick={mobile.scrollNext}
                  className="absolute top-1/2 right-0 z-50 size-12 -translate-y-1/2 border-[1.375px] border-white bg-black/25 shadow-md backdrop-blur-[2px] md:right-1 md:size-[66px]"
                />
              </>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  );
};
