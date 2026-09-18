'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Scroll-snap container: native touch swiping, no scrollbar chrome.
 *
 * The padding is load-bearing. Setting `overflow-x` also makes `overflow-y`
 * compute to `auto`, so anything a card paints outside its border box — the
 * `shadow-card` drop shadow, a selected card's outline, focus rings — is
 * clipped on all four edges. `CAROUSEL_BLEED_CLASS` pulls the padding back out
 * so it costs no layout space.
 */
export const CAROUSEL_VIEWPORT_CLASS =
  'snap-x snap-mandatory overflow-x-auto p-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-scrollbar]:hidden';

export const CAROUSEL_BLEED_CLASS = '-m-4';

export const CAROUSEL_SLIDE_CLASS = 'min-w-0 shrink-0 grow-0 snap-start';

export interface CardCarouselControls {
  scrollPrev: () => void;
  scrollNext: () => void;
}

export interface UseCardCarouselOptions {
  /** Jump back to the opposite end instead of stopping at the last slide. */
  loop?: boolean;
}

export function useCardCarousel({ loop = false }: UseCardCarouselOptions = {}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const step = useCallback((direction: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const slide = viewport.querySelector<HTMLElement>('[data-carousel-slide]');
    const distance = slide?.offsetWidth ?? viewport.clientWidth;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;

    if (loop && direction === 1 && viewport.scrollLeft >= maxScroll - 1) {
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (loop && direction === -1 && viewport.scrollLeft <= 1) {
      viewport.scrollTo({ left: maxScroll, behavior: 'smooth' });
      return;
    }

    viewport.scrollBy({ left: direction * distance, behavior: 'smooth' });
  }, [loop]);

  const scrollPrev = useCallback(() => step(-1), [step]);
  const scrollNext = useCallback(() => step(1), [step]);

  return { viewportRef, scrollPrev, scrollNext };
}

/** Scroll position of whichever slide sits closest to the current
 *  `scrollLeft` — used to settle a manual drag/scrub back onto a snap
 *  point instead of leaving the track stopped mid-card. */
export function getNearestSlideScrollLeft(viewport: HTMLElement): number {
  const slides = Array.from(viewport.querySelectorAll<HTMLElement>('[data-carousel-slide]'));
  const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  if (slides.length === 0 || maxScroll <= 0) return viewport.scrollLeft;

  const viewportLeft = viewport.getBoundingClientRect().left;
  let closest = viewport.scrollLeft;
  let minDiff = Infinity;

  for (const slide of slides) {
    const slideScrollLeft = slide.getBoundingClientRect().left - viewportLeft + viewport.scrollLeft;
    const diff = Math.abs(slideScrollLeft - viewport.scrollLeft);
    if (diff < minDiff) {
      minDiff = diff;
      closest = slideScrollLeft;
    }
  }

  return Math.min(Math.max(closest, 0), maxScroll);
}

/** Jump the track to a 0–1 position. Snap is disabled first so CSS snap
 *  cannot pull the cards back to the current slide. */
export function seekCarouselToRatio(
  viewport: HTMLElement,
  ratio: number,
  behavior: ScrollBehavior = 'auto'
) {
  const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  if (maxScroll <= 0) return;
  viewport.style.scrollSnapType = 'none';
  viewport.scrollTo({
    left: Math.min(maxScroll, Math.max(0, ratio * maxScroll)),
    behavior,
  });
}

/** Click-and-drag panning for the carousel viewport, so a mouse can slide
 *  the cards the same way a finger swipes on touch. Snap is turned off
 *  mid-drag (raw `scrollLeft` fights the browser's snap otherwise) and
 *  restored once the drag settles onto the nearest card. */
export function useDragToScroll(viewportRef: React.RefObject<HTMLDivElement | null>) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });

  const endDrag = useCallback(() => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    setIsDragging(false);

    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.style.scrollSnapType = '';
    if (drag.moved) {
      viewport.scrollTo({ left: getNearestSlideScrollLeft(viewport), behavior: 'smooth' });
    }
  }, [viewportRef]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      const viewport = viewportRef.current;
      if (!viewport) return;

      dragRef.current = {
        active: true,
        startX: event.clientX,
        startScrollLeft: viewport.scrollLeft,
        moved: false,
      };
      setIsDragging(true);
      viewport.style.scrollSnapType = 'none';
      viewport.setPointerCapture(event.pointerId);
    },
    [viewportRef]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag.active) return;
      const viewport = viewportRef.current;
      if (!viewport) return;

      const delta = event.clientX - drag.startX;
      if (Math.abs(delta) > 3) drag.moved = true;
      viewport.scrollLeft = drag.startScrollLeft - delta;
    },
    [viewportRef]
  );

  const onClickCapture = useCallback((event: React.MouseEvent) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.moved = false;
  }, []);

  return {
    isDragging,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
    },
  };
}

/** Map vertical mouse-wheel / trackpad movement to horizontal scroll while
 *  the pointer is over the track, so laptop screens can pan the cards. */
export function useWheelToScroll(viewportRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const onWheel = (event: WheelEvent) => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      if (maxScroll <= 1) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (delta === 0) return;

      const next = viewport.scrollLeft + delta;
      const canMove =
        (delta > 0 && viewport.scrollLeft < maxScroll - 1) ||
        (delta < 0 && viewport.scrollLeft > 1);

      if (!canMove) return;

      event.preventDefault();
      viewport.scrollLeft = Math.min(maxScroll, Math.max(0, next));
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [viewportRef]);
}

export interface CardCarouselProps extends UseCardCarouselOptions {
  label: string;
  children: React.ReactNode;
  /** Per-breakpoint slide width, e.g. `basis-full min-[751px]:basis-1/4`. */
  slideClassName: string;
  className?: string;
  /** Negative inline margin on the track that pairs with the slide's left padding. */
  trackClassName?: string;
  /** Rendered above the track — for bands whose arrows sit beside the heading. */
  header?: (controls: CardCarouselControls) => React.ReactNode;
  /** Rendered after the track, typically arrows absolutely placed at the sides. */
  controls?: (controls: CardCarouselControls) => React.ReactNode;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  label,
  children,
  slideClassName,
  className = '',
  trackClassName = '',
  loop,
  header,
  controls,
}) => {
  const { viewportRef, scrollPrev, scrollNext } = useCardCarousel({ loop });

  return (
    <div className={`relative ${className}`.trim()}>
      {header?.({ scrollPrev, scrollNext })}

      {/* Wrapper keeps the bleed off the root so the controls stay anchored. */}
      <div className={CAROUSEL_BLEED_CLASS}>
        <div
          ref={viewportRef}
          className={CAROUSEL_VIEWPORT_CLASS}
          role="group"
          aria-roledescription="carousel"
          aria-label={label}
          tabIndex={0}
        >
          <div className={`flex ${trackClassName}`.trim()}>
            {React.Children.map(children, (child) => (
              <div
                className={`${CAROUSEL_SLIDE_CLASS} ${slideClassName}`}
                role="group"
                aria-roledescription="slide"
                data-carousel-slide
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>

      {controls?.({ scrollPrev, scrollNext })}
    </div>
  );
};
