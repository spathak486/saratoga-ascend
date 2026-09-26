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

/** Back, middle, front. Next click walks each photo one slot forward. */
const FAN_SLOTS = [
  { top: '15.24%', right: '73.69%', bottom: '15.43%', left: '8.27%', opacity: 0.3, z: 1 },
  { top: '10.22%', right: '64.17%', bottom: '10.41%', left: '15.18%', opacity: 0.7, z: 2 },
  { top: '6.32%', right: '53.39%', bottom: '6.32%', left: '23.93%', opacity: 1, z: 3 },
] as const;

/** Figma click: Smart animate, Gentle, 800ms. Photos and copy share it. */
const FAN_EASE =
  'transition-[top,right,bottom,left] duration-[800ms] ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none';
const COPY_EASE =
  'transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none motion-reduce:transform-none';

/** Figma Polygon 2, 67×68 inside the 100px circle, rotated to point outward. */
const ARROW_PATH =
  'M23.1683 18.0465 C27.6301 10.1252 39.0365 10.1252 43.4984 18.0465 L52.4043 33.8577 C56.7849 41.6348 51.1653 51.25 42.2393 51.25 L24.4274 51.25 C15.5014 51.25 9.88176 41.6348 14.2624 33.8577 L23.1683 18.0465 Z';

function ArrowGlyph({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      viewBox="0 0 66.667 68.333"
      className={`h-[68.33%] w-[66.67%] ${direction === 'prev' ? '-rotate-90' : 'rotate-90'}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={ARROW_PATH} fill="currentColor" />
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
        className={`font-sans text-body-lg font-bold leading-[1.6] text-white ${review.role ? 'mt-[1.875rem]' : ''}`}
      >
        {review.name}
        <br />
        {review.place}
      </p>
      <p className="mt-[1.875rem] max-w-[42rem] font-sans text-button font-medium leading-[1.5] text-white">
        {review.quote}
      </p>
    </>
  );
}

function DesktopSlide({
  photos,
  rotation,
}: {
  photos: ClientReview['photos'];
  rotation: number;
}) {
  return (
    <div className="relative aspect-[1680/538] min-h-[20rem] w-full">
      <div className="absolute inset-y-0 left-[34.46%] right-[8.45%] rounded-[3.125rem] bg-brand-red" />

      {photos.map((src, photoIndex) => {
        const slot = FAN_SLOTS[(photoIndex + rotation) % FAN_SLOTS.length];
        return (
          <div
            key={photoIndex}
            className={`absolute overflow-hidden rounded-media bg-white ${FAN_EASE}`}
            style={{
              top: slot.top,
              right: slot.right,
              bottom: slot.bottom,
              left: slot.left,
              zIndex: slot.z,
            }}
          >
            <div
              className="size-full transition-opacity duration-[800ms] ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none"
              style={{ opacity: slot.opacity }}
            >
              <MediaFrame
                src={src}
                alt=""
                pendingLabel="client-portrait"
                tone="tile"
                sizes="(max-width: 1280px) 30vw, 381px"
                imageClassName="object-cover!"
                className="size-full border-0 bg-white"
              />
            </div>
          </div>
        );
      })}
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
  const [from, setFrom] = useState(0);
  const [dir, setDir] = useState(1);
  const count = reviews.length;
  const review = reviews[index];
  const deck = reviews[0]?.photos;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = (delta: number) => {
    setDir(delta);
    setFrom(index);
    setIndex((current) => (current + delta + count) % count);
  };

  const copyMotion = (slideIndex: number) => {
    if (slideIndex === index) return 'z-10 translate-y-0 opacity-100';
    if (slideIndex === from) {
      return dir > 0
        ? 'z-0 -translate-y-8 opacity-0'
        : 'z-0 translate-y-8 opacity-0';
    }
    return dir > 0
      ? 'z-0 translate-y-8 opacity-0'
      : 'z-0 -translate-y-8 opacity-0';
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
    return `${position} ${COPY_EASE} ${
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
        {deck ? <DesktopSlide photos={deck} rotation={index % FAN_SLOTS.length} /> : null}

        <div className="pointer-events-none absolute inset-[20.45%_14.85%_27.7%_49.29%] z-10 overflow-hidden">
          {reviews.map((item, slideIndex) => (
            <div
              key={`${item.role}-${slideIndex}`}
              className={`absolute inset-0 flex flex-col ${COPY_EASE} ${copyMotion(slideIndex)}`}
              aria-hidden={slideIndex !== index}
            >
              <QuoteCopy review={item} />
            </div>
          ))}
        </div>

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
                  src={(deck ?? item.photos)[(2 - (index % 3) + 3) % 3]}
                  alt=""
                  pendingLabel="client-portrait"
                  tone="tile"
                  sizes="20rem"
                  imageClassName="object-cover object-[center_12%]!"
                  className="size-full border-0 bg-white"
                />
              </div>

              <div className="rounded-[3.125rem] bg-brand-red px-8 py-10">
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
