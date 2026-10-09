'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CAROUSEL_SLIDE_CLASS } from './CardCarousel';
import { LatestNewsCard, type LatestNewsCardProps } from './LatestNewsCard';

/** Figma 2105:865 — center card 329px, peek cards 222px. */
const FEATURED_WIDTH = 'min(20.566rem,calc(100vw - 6.3125rem))';
const PEEK_WIDTH = 'min(13.896rem,calc((100vw - 6.3125rem) * 0.675))';

const ARROW_PATH =
  'M23.1683 18.0465 C27.6301 10.1252 39.0365 10.1252 43.4984 18.0465 L52.4043 33.8577 C56.7849 41.6348 51.1653 51.25 42.2393 51.25 L24.4274 51.25 C15.5014 51.25 9.88176 41.6348 14.2624 33.8577 L23.1683 18.0465 Z';

function ArrowGlyph({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      viewBox="0 0 66.667 68.333"
      className={`h-[36.73px] w-[38px] ${direction === 'prev' ? '-rotate-90' : 'rotate-90'}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={ARROW_PATH} fill="currentColor" />
    </svg>
  );
}

function nearestCenteredIndex(viewport: HTMLElement) {
  const slides = Array.from(viewport.querySelectorAll<HTMLElement>('[data-carousel-slide]'));
  if (slides.length === 0) return 0;
  const mid = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
  let best = 0;
  let bestDist = Infinity;
  slides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    const dist = Math.abs(rect.left + rect.width / 2 - mid);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  });
  return best;
}

function scrollSlideToCenter(viewport: HTMLElement, index: number, behavior: ScrollBehavior) {
  const slide = viewport.querySelectorAll<HTMLElement>('[data-carousel-slide]')[index];
  if (!slide) return;
  const vRect = viewport.getBoundingClientRect();
  const sRect = slide.getBoundingClientRect();
  const delta = sRect.left + sRect.width / 2 - (vRect.left + vRect.width / 2);
  if (Math.abs(delta) < 1) return;
  viewport.scrollBy({ left: delta, behavior });
}

export function LatestNewsCarousel({
  articles,
}: {
  articles: LatestNewsCardProps[];
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const count = articles.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setActive((next + count) % count);
    },
    [count],
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    scrollSlideToCenter(viewport, active, 'smooth');
  }, [active]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScrollEnd = () => {
      setActive(nearestCenteredIndex(viewport));
    };

    viewport.addEventListener('scrollend', onScrollEnd);
    return () => viewport.removeEventListener('scrollend', onScrollEnd);
  }, []);

  if (articles.length === 0) return null;

  return (
    <div className="relative mt-[2.3125rem] -mx-5 xl:hidden">
      <div
        ref={viewportRef}
        className="snap-x snap-mandatory overflow-x-auto px-[max(1.25rem,calc((100%-20.566rem)/2))] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Latest news"
        tabIndex={0}
      >
        <div className="flex items-center gap-3">
          {articles.map((article, idx) => {
            const featured = idx === active;
            return (
              <div
                key={`${article.title}-${idx}`}
                className={`${CAROUSEL_SLIDE_CLASS} snap-center shrink-0 transition-[width] duration-300 ease-[cubic-bezier(0.47,0,0.23,1)] motion-reduce:transition-none`}
                style={{ width: featured ? FEATURED_WIDTH : PEEK_WIDTH }}
                role="group"
                aria-roledescription="slide"
                aria-current={featured ? 'true' : undefined}
                data-carousel-slide
              >
                <LatestNewsCard {...article} compact featured={featured} />
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous article"
        onClick={() => goTo(active - 1)}
        className="absolute top-[10.1875rem] left-0 z-10 flex size-11 items-center justify-center rounded-full border border-[#c6c6c6] bg-[rgb(240_20_36/0.02)] text-[#2b88d9]"
      >
        <ArrowGlyph direction="prev" />
      </button>
      <button
        type="button"
        aria-label="Next article"
        onClick={() => goTo(active + 1)}
        className="absolute top-[10.1875rem] right-0 z-10 flex size-11 items-center justify-center rounded-full bg-[rgb(240_20_36/0.02)] text-[#f01424]"
      >
        <ArrowGlyph direction="next" />
      </button>
    </div>
  );
}
