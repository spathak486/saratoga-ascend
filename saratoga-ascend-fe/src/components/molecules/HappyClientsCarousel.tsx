'use client';

import React, { useRef, useState } from 'react';
import { Heading, MediaFrame } from '../atoms';

/** Horizontal drag past this many px counts as a swipe, not a scroll tap. */
const SWIPE_THRESHOLD_PX = 40;

/**
 * Mobile stays near the 430 artboard; tablet grows so iPad doesn’t look tiny.
 * Side padding reserves room for half-off edge arrows.
 */
const MOBILE_STAGE =
  'mx-auto w-full max-w-[26.875rem] px-6 md:max-w-[48rem] md:px-10 lg:max-w-[56rem]';

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
  'transition-[top,right,bottom,left,width,height,opacity,transform] duration-[1022ms] ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none';
const PHOTO_OPACITY_EASE =
  'transition-opacity duration-[1022ms] ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none';

function reviewDeck(review: ClientReview) {
  const first = review.photos[0];
  return [review.photos[0], review.photos[1] ?? first, review.photos[2] ?? first] as const;
}

function fanDeck(reviews: readonly ClientReview[], index: number) {
  const current = reviewDeck(reviews[index]);
  const distinct = new Set(current.filter(Boolean)).size;
  if (distinct >= 2 || reviews.length < 2) return current;

  const count = reviews.length;
  const portrait = (i: number) => {
    const item = reviews[(i + count) % count];
    return item.photos[2] ?? item.photos[0] ?? item.photos[1];
  };
  return [portrait(index - 1), portrait(index), portrait(index + 1)] as const;
}

const MOBILE_MAIN_SLOTS = [
  {
    top: '6%',
    left: '16%',
    right: 'auto',
    width: '33.6%',
    height: '80.5%',
    opacity: 0.7,
    zIndex: 2,
    transform: 'none',
  },
  {
    top: '0%',
    left: '50%',
    right: 'auto',
    width: '42%',
    height: '100%',
    opacity: 1,
    zIndex: 5,
    transform: 'translateX(-50%)',
  },
  {
    top: '13.3%',
    left: 'auto',
    right: '16%',
    width: '33.4%',
    height: '80%',
    opacity: 0.7,
    zIndex: 2,
    transform: 'none',
  },
] as const;

const MOBILE_FAR_SLOTS = [
  {
    top: '16.5%',
    left: '6%',
    right: 'auto',
    width: '29.4%',
    height: '70%',
    opacity: 0.3,
    zIndex: 1,
    transform: 'none',
  },
  {
    top: '0%',
    left: '50%',
    right: 'auto',
    width: '42%',
    height: '100%',
    opacity: 0,
    zIndex: 0,
    transform: 'translateX(-50%)',
  },
  {
    top: '23%',
    left: 'auto',
    right: '6%',
    width: '29.4%',
    height: '70%',
    opacity: 0.3,
    zIndex: 1,
    transform: 'none',
  },
] as const;

/**
 * Figma 2243:3550 / 2243:3551 — stroke chevron (points down; rotate onto the button).
 * Desktop control is 83px with a 1.729px ink ring and button shadow.
 * Hover (from design screenshot): CTA gradient fill, white chevron, border off.
 */
const ARROW_HOVER =
  'hover:border-transparent hover:text-white hover:[background-image:linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] focus-visible:border-transparent focus-visible:text-white focus-visible:[background-image:linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)]';

const ARROW_BUTTON_DESKTOP =
  `absolute top-1/2 z-20 flex size-[5.1875rem] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[1.729px] border-ink bg-white text-ink shadow-[0px_1.729px_1.729px_rgba(16,24,40,0.05)] transition-colors duration-300 ease-out ${ARROW_HOVER} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy motion-reduce:transition-none`;

/** Same stroke-chevron language as desktop; smaller, vertically centered on the red card. */
const ARROW_BUTTON_MOBILE =
  `absolute top-1/2 z-20 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ink bg-white text-ink shadow-button transition-colors duration-300 ease-out md:size-14 ${ARROW_HOVER} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy motion-reduce:transition-none`;

function ArrowGlyph({
  direction,
  compact = false,
}: {
  direction: 'prev' | 'next';
  compact?: boolean;
}) {
  return (
    <svg
      width={compact ? '14' : '19.25'}
      height={compact ? '8' : '11'}
      viewBox="0 0 24.2086 13.8334"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={direction === 'prev' ? 'rotate-90' : '-rotate-90'}
    >
      <path
        d="M22.4793 1.72936C22.4793 1.72936 14.8382 12.1043 12.1042 12.1043C9.37019 12.1043 1.72928 1.72928 1.72928 1.72928"
        stroke="currentColor"
        strokeWidth="3.45833"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteCopy({
  review,
  active = true,
  compact = false,
}: {
  review: ClientReview;
  active?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <>
        {review.role ? (
          <p className="font-serif text-[1.25rem] leading-[1.875rem] text-white md:text-[1.75rem] md:leading-9">
            {review.role}
          </p>
        ) : null}
        <p
          className={`font-sans text-sm leading-[1.125rem] font-bold text-white md:text-base md:leading-6 ${
            review.role ? 'mt-[0.6875rem] md:mt-4' : ''
          }`}
        >
          {review.name}
          {review.place ? (
            <>
              <br />
              {review.place}
            </>
          ) : null}
        </p>
        <p className="mt-3 break-words font-sans text-[1.25rem] leading-[1.5] font-medium text-white md:mt-5 md:text-[1.375rem] md:leading-[1.55]">
          {review.quote}
        </p>
      </>
    );
  }

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

/** Mobile quote slide — same Gentle 1022ms as desktop, parked below the card. */
function mobileCopyStyle(
  slideIndex: number,
  index: number,
  from: number,
  dir: number,
) {
  const active = slideIndex === index;
  const outgoing = slideIndex === from && from !== index;
  const snapY =
    (active && dir < 0 && from !== index) || (outgoing && dir > 0);

  let y = '100%';
  let opacity = 0;
  if (active) {
    y = '0%';
    opacity = 1;
  } else if (outgoing && dir > 0) {
    y = '0%';
  } else if (outgoing && dir < 0) {
    y = '100%';
  }

  return {
    transform: `translateY(${y})`,
    opacity,
    zIndex: active ? 10 : 0,
    transitionProperty: 'transform, opacity',
    transitionDuration: snapY ? `0ms, ${SLIDE_MS}ms` : `${SLIDE_MS}ms`,
    transitionTimingFunction: GENTLE,
  } as const;
}

/**
 * Our Happy Clients fan (Figma 2243:3543 / Group 66). Photos stay on the
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
  /** Pointer covers touch + tablet mouse drag (touch-only missed mouse swipes). */
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null);

  const go = (delta: number) => {
    setDir(delta);
    setFrom(index);
    setIndex((current) => (current + delta + count) % count);
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      id: event.pointerId,
    };
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    /* A mostly-vertical drag is a page scroll, not a slide swipe. */
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;

    go(dx < 0 ? 1 : -1);
  };

  const handlePointerCancel = () => {
    pointerStart.current = null;
  };

  if (!review) return null;

  const deck = fanDeck(reviews, index);

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      data-happy-slide={index}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div className="relative hidden aspect-[1680/538] min-h-[20rem] xl:block">
        <div className="absolute inset-y-0 left-[34.46%] right-[8.45%] overflow-hidden rounded-[3.125rem] bg-brand-red" />

        {deck.map((src, photoIndex) => {
          const slot = FAN_SLOTS[(photoIndex + index) % FAN_SLOTS.length];
          return (
            <div
              key={`desk-photo-${photoIndex}`}
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
        })}

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
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          className={`${ARROW_BUTTON_DESKTOP} left-[0.51%]`}
        >
          <ArrowGlyph direction="prev" />
        </button>

        <button
          type="button"
          aria-label="Next client story"
          onClick={() => go(1)}
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          className={`${ARROW_BUTTON_DESKTOP} right-[0.71%]`}
        >
          <ArrowGlyph direction="next" />
        </button>
      </div>

      {/* Mobile + tablet fan. Placement from 2105:778; arrow chrome matches desktop. */}
      <div className={`xl:hidden ${MOBILE_STAGE}`}>
        <div className="relative h-[12.625rem] w-full touch-pan-y md:h-[16.5rem] lg:h-[18.5rem]">
          {deck.map((src, photoIndex) => {
            const slot = (photoIndex + index) % MOBILE_MAIN_SLOTS.length;
            return (
              <React.Fragment key={`m-photo-${photoIndex}`}>
                <div
                  className={`absolute overflow-hidden rounded-[1.25rem] bg-white ${FAN_EASE}`}
                  style={MOBILE_MAIN_SLOTS[slot]}
                >
                  <MediaFrame
                    src={src}
                    alt=""
                    pendingLabel="client-portrait"
                    tone="tile"
                    sizes="(max-width: 768px) 164px, 220px"
                    imageClassName="object-cover object-[center_12%]!"
                    className="size-full border-0 bg-white"
                  />
                </div>
                <div
                  className={`absolute overflow-hidden rounded-[1.25rem] bg-white ${FAN_EASE}`}
                  style={MOBILE_FAR_SLOTS[slot]}
                >
                  <MediaFrame
                    src={src}
                    alt=""
                    pendingLabel="client-portrait"
                    tone="tile"
                    sizes="(max-width: 768px) 115px, 160px"
                    imageClassName="object-cover!"
                    className="size-full border-0 bg-white"
                  />
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="relative z-[4] -mt-[3.75rem] overflow-visible rounded-[3.125rem] bg-brand-red px-8 pb-10 pt-[3.75rem] md:-mt-16 md:px-10 md:pb-12 md:pt-16 lg:px-12">
          <div className="relative overflow-hidden px-1 md:px-2">
            {/* Spacer keeps card height for the active quote while slides animate. */}
            <div className="invisible" aria-hidden="true">
              <QuoteCopy review={review} compact />
            </div>
            {reviews.map((item, slideIndex) => (
              <div
                key={`${item.role}-${item.name}-m-${slideIndex}`}
                className="absolute inset-x-0 top-0 min-w-0 px-1 motion-reduce:!transition-none md:px-2"
                style={mobileCopyStyle(slideIndex, index, from, dir)}
                aria-hidden={slideIndex !== index}
              >
                <QuoteCopy review={item} compact active={slideIndex === index} />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous client story"
            onClick={() => go(-1)}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            className={`${ARROW_BUTTON_MOBILE} left-0 -translate-x-1/2`}
          >
            <ArrowGlyph direction="prev" compact />
          </button>
          <button
            type="button"
            aria-label="Next client story"
            onClick={() => go(1)}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            className={`${ARROW_BUTTON_MOBILE} right-0 translate-x-1/2`}
          >
            <ArrowGlyph direction="next" compact />
          </button>
        </div>
      </div>
    </div>
  );
};
