'use client';

import React, { useRef, useState } from 'react';
import { Heading, MediaFrame } from '../atoms';

/** Horizontal drag past this many px counts as a swipe, not a scroll tap. */
const SWIPE_THRESHOLD_PX = 40;

export interface ClientReview {
  /** Role headline shown above the name — optional since Strapi content may omit it. */
  role?: string;
  name: string;
  place: string;
  quote: string;
  photos: readonly [string | undefined, string | undefined, string | undefined];
}

export interface HappyClientsCarouselProps {
  reviews: readonly ClientReview[];
  className?: string;
}

const FAN = [
  {
    inset: 'inset-[15.24%_73.69%_15.43%_8.27%]',
    imageOpacity: 'opacity-30',
    label: 'Previous client',
  },
  {
    inset: 'inset-[10.22%_64.17%_10.41%_15.18%]',
    imageOpacity: 'opacity-70',
    label: 'Nearby client',
  },
  {
    inset: 'inset-[6.32%_53.39%_6.32%_23.93%]',
    imageOpacity: 'opacity-100',
    label: 'Featured client',
  },
] as const;

function ArrowGlyph({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-[67%] ${direction === 'next' ? 'rotate-180' : ''}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M15.5 4.2 6.8 12l8.7 7.8V4.2Z" />
    </svg>
  );
}

function QuoteCopy({ review }: { review: ClientReview }) {
  return (
    <>
      {review.role ? (
        <Heading level={3} size="subtitle" tone="onDark" className="text-white">
          {review.role}
        </Heading>
      ) : null}
      <p
        className={`text-body-lg font-bold leading-[1.6] text-white ${review.role ? 'mt-[clamp(0.75rem,1.8vw,1.35rem)]' : ''}`}
      >
        {review.name}
        <br />
        {review.place}
      </p>
      <p className="mt-auto max-w-[40ch] text-button font-medium leading-[1.5] text-white">
        {review.quote}
      </p>
    </>
  );
}

function DesktopSlide({ review }: { review: ClientReview }) {
  return (
    <div className="relative aspect-[1680/538] min-h-[20rem] w-full">
      {/* Figma fill is prime-r / #f01424 — same token as the brand red. */}
      <div className="absolute inset-y-0 left-[34.46%] right-[8.45%] rounded-[3.125rem] bg-[#f01424]" />

      {FAN.map((card, cardIndex) => (
        <div
          key={card.inset}
          className={`absolute overflow-hidden rounded-media bg-white ${card.inset}`}
        >
          <MediaFrame
            src={review.photos[cardIndex]}
            alt={card.label}
            pendingLabel="client-portrait"
            tone="tile"
            sizes="(max-width: 1280px) 30vw, 381px"
            imageClassName={`object-cover! ${card.imageOpacity}`}
            className="size-full border-0 bg-white"
          />
        </div>
      ))}

      {/* Figma's text block is inset-[20.45%_14.85%_27.7%_49.29%] on the
          1680×538 stage — the shorter box (vs. the full column height) is
          what keeps the quote's `mt-auto` landing at the same baseline as
          the file instead of drifting toward the bottom edge. */}
      <div className="absolute inset-[20.45%_14.85%_27.7%_49.29%] z-10 flex flex-col">
        <QuoteCopy review={review} />
      </div>
    </div>
  );
}

/**
 * Figma node 1:197. White portrait frames with faded photos (not faded
 * frames), a literal #f01424 quote card, and a sliding track so the fan
 * and copy travel together.
 */
export const HappyClientsCarousel: React.FC<HappyClientsCarouselProps> = ({
  reviews,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = reviews.length;
  const review = reviews[index];
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = (delta: number) => {
    setDir(delta);
    setIndex((current) => (current + delta + count) % count);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    /* A mostly-vertical drag is a page scroll, not a slide swipe. */
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;

    go(dx < 0 ? 1 : -1);
  };

  if (!review) return null;

  const slideMotion = (slideIndex: number, layout: 'stage' | 'stack' = 'stage') => {
    const active = slideIndex === index;
    const exit = dir > 0 ? '-translate-x-[3.5%]' : 'translate-x-[3.5%]';
    const position =
      layout === 'stack'
        ? active
          ? 'relative'
          : 'absolute inset-x-0 top-0'
        : 'absolute inset-0';
    return `${position} transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none ${
      active
        ? 'z-10 translate-x-0 opacity-100'
        : `z-0 ${exit} pointer-events-none opacity-0`
    }`;
  };

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* The Figma stage is fixed-percentage geometry against a 1680px
          frame — below `xl` the quote column gets too narrow for its own
          type scale and starts overflowing the panel, so the stacked
          layout takes over earlier than the rest of the site's `lg` cutoff. */}
      <div className="relative hidden aspect-[1680/538] min-h-[20rem] xl:block">
        {reviews.map((item, slideIndex) => (
          <div
            key={`${item.name}-${slideIndex}`}
            className={slideMotion(slideIndex)}
            aria-hidden={slideIndex !== index}
          >
            <DesktopSlide review={item} />
          </div>
        ))}

        <button
          type="button"
          aria-label="Previous client story"
          onClick={() => go(-1)}
          className="absolute inset-[40.71%_94.05%_40.71%_0] z-20 flex cursor-pointer items-center justify-center rounded-full bg-[rgb(43_136_217/0.03)] text-[#2b88d9] transition-colors duration-300 hover:bg-[rgb(43_136_217/0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
        >
          <ArrowGlyph direction="prev" />
        </button>

        <button
          type="button"
          aria-label="Next client story"
          onClick={() => go(1)}
          className="absolute inset-[40.71%_0_40.71%_94.05%] z-20 flex cursor-pointer items-center justify-center rounded-full bg-[rgb(240_20_36/0.02)] text-[#f01424] transition-colors duration-300 hover:bg-[rgb(240_20_36/0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          <ArrowGlyph direction="next" />
        </button>
      </div>

      <div className="xl:hidden">
        <div className="relative">
          {reviews.map((item, slideIndex) => (
            <div
              key={`${item.name}-m-${slideIndex}`}
              className={`${slideMotion(slideIndex, 'stack')} flex flex-col gap-6`}
              aria-hidden={slideIndex !== index}
            >
              <div className="relative mx-auto aspect-[381/470] w-[min(100%,20rem)] shrink-0 overflow-hidden rounded-media bg-white">
                <MediaFrame
                  src={item.photos[2]}
                  alt=""
                  pendingLabel="client-portrait"
                  tone="tile"
                  sizes="20rem"
                  imageClassName="object-cover object-[center_12%]!"
                  className="size-full border-0 bg-white"
                />
              </div>

              <div className="rounded-[3.125rem] bg-[#f01424] px-8 py-10">
                <div className="flex flex-col">
                  <QuoteCopy review={item} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            aria-label="Previous client story"
            onClick={() => go(-1)}
            className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-[rgb(43_136_217/0.03)] text-[#2b88d9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
          >
            <ArrowGlyph direction="prev" />
          </button>
          <button
            type="button"
            aria-label="Next client story"
            onClick={() => go(1)}
            className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-[rgb(240_20_36/0.02)] text-[#f01424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            <ArrowGlyph direction="next" />
          </button>
        </div>
      </div>
    </div>
  );
};
