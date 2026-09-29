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

/**
 * Figma Group 66 click: Smart animate, Gentle, 1022ms.
 * Copy rest sits at y=110 (20.45%); the next block is parked at y=430 (79.93%).
 */
const SLIDE_MS = 1022;
const GENTLE = 'cubic-bezier(0.47, 0, 0.23, 1)';
const COPY_REST = '20.45%';
const COPY_PARK = '79.93%';

const FAN_EASE =
  'transition-[top,right,bottom,left] duration-[1022ms] ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none';
const PHOTO_OPACITY_EASE =
  'transition-opacity duration-[1022ms] ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none';
const COPY_EASE =
  'transition-[opacity,transform] duration-[1022ms] ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none motion-reduce:transform-none';

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

function QuoteCopy({
  review,
  active = true,
}: {
  review: ClientReview;
  active?: boolean;
}) {
  return (
    <>
      {review.role ? (
        <Heading level={3} size="subtitle" tone="onDark" className="text-white">
          {review.role}
        </Heading>
      ) : null}
      <p
        className={`font-sans text-white ${
          review.role ? 'mt-[1.875rem]' : ''
        } ${
          active
            ? 'text-body-lg font-bold leading-[1.6]'
            : 'text-body font-normal leading-[1.5]'
        }`}
      >
        {review.name}
        <br />
        {review.place}
      </p>
      <p className="mt-[1.875rem] max-w-[37.625rem] font-sans text-button font-medium leading-[1.5] text-white">
        {review.quote}
      </p>
    </>
  );
}

function copyStyle(
  slideIndex: number,
  index: number,
  from: number,
  dir: number,
) {
  const active = slideIndex === index;
  const outgoing = slideIndex === from && from !== index;
  const snapTop =
    (active && dir < 0 && from !== index) || (outgoing && dir > 0);

  let top = COPY_PARK;
  let opacity = 0;
  if (active) {
    top = COPY_REST;
    opacity = 1;
  } else if (outgoing && dir > 0) {
    top = COPY_REST;
  } else if (outgoing && dir < 0) {
    top = COPY_PARK;
  }

  return {
    top,
    opacity,
    zIndex: active ? 10 : 0,
    transitionProperty: 'top, opacity',
    transitionDuration: snapTop ? `0ms, ${SLIDE_MS}ms` : `${SLIDE_MS}ms`,
    transitionTimingFunction: GENTLE,
  } as const;
}

/**
 * Our Happy Clients fan (Figma 2002:1099 / Group 66). Photos stay on the
 * review props. Arrow click smart-animates copy 320px on the 538px stage.
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

  const slideMotion = (slideIndex: number) => {
    const active = slideIndex === index;
    const outgoing = slideIndex === from && from !== index;
    const position = active ? 'relative' : 'absolute inset-x-0 top-0';

    let shift = 'translate-y-[40%]';
    if (active) shift = 'translate-y-0';
    else if (outgoing && dir > 0) shift = 'translate-y-0';
    else if (outgoing && dir < 0) shift = 'translate-y-[40%]';

    return `${position} ${COPY_EASE} ${
      active
        ? `z-10 ${shift} opacity-100`
        : `z-0 ${shift} pointer-events-none opacity-0`
    }`;
  };

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      data-happy-slide={index}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative hidden aspect-[1680/538] min-h-[20rem] xl:block">
        <div className="absolute inset-y-0 left-[34.46%] right-[8.45%] overflow-hidden rounded-[3.125rem] bg-brand-red" />

        {deck
          ? deck.map((src, photoIndex) => {
              const slot = FAN_SLOTS[(photoIndex + (index % FAN_SLOTS.length)) % FAN_SLOTS.length];
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
                    className={`relative size-full ${PHOTO_OPACITY_EASE}`}
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
            })
          : null}

        <div className="pointer-events-none absolute inset-y-0 left-[49.29%] right-[14.85%] z-10 overflow-hidden">
          {reviews.map((item, slideIndex) => (
            <div
              key={`${item.role}-${item.name}-${slideIndex}`}
              className="absolute inset-x-0 flex flex-col motion-reduce:!transition-none"
              style={copyStyle(slideIndex, index, from, dir)}
              aria-hidden={slideIndex !== index}
            >
              <QuoteCopy review={item} active={slideIndex === index} />
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
        <div className="relative overflow-hidden">
          {reviews.map((item, slideIndex) => (
            <div
              key={`${item.name}-m-${slideIndex}`}
              className={`${slideMotion(slideIndex)} flex flex-col gap-6`}
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

              <div className="overflow-hidden rounded-[3.125rem] bg-brand-red px-8 py-10">
                <div className="flex flex-col">
                  <QuoteCopy review={item} active={slideIndex === index} />
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
