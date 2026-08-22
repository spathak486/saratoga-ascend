'use client';

import React, { useCallback, useRef } from 'react';

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
