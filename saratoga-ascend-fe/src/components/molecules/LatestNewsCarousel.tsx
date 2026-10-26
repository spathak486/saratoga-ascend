'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LatestNewsCard, type LatestNewsCardProps } from './LatestNewsCard';

/**
 * Figma 2105:865 coverflow — center 329 / peek 222 on mobile.
 * Tablet grows so iPad is not stuck on phone sizes.
 */
const FEATURED_WIDTH_CLASS =
  'w-[min(20.566rem,calc(100vw-6.3125rem))] md:w-[min(28rem,calc(100vw-8rem))] lg:w-[min(34rem,calc(100vw-10rem))]';
const PEEK_WIDTH_CLASS =
  'w-[min(13.896rem,calc((100vw-6.3125rem)*0.675))] md:w-[min(18.9rem,calc((100vw-8rem)*0.675))] lg:w-[min(23rem,calc((100vw-10rem)*0.675))]';
const FEATURED_PAD =
  'px-[max(1.5rem,calc((100%-min(20.566rem,calc(100vw-6.3125rem)))/2))] md:px-[max(2rem,calc((100%-min(28rem,calc(100vw-8rem)))/2))] lg:px-[max(2.5rem,calc((100%-min(34rem,calc(100vw-10rem)))/2))]';

/** Gentle coverflow — width + scroll stay locked together via rAF. */
const WIDTH_EASE_MS = 480;
const SCROLL_SETTLE_MS = 80;
const GENTLE = 'cubic-bezier(0.47, 0, 0.23, 1)';

/**
 * Same chrome as Happy Clients / desktop news controls — stroke chevron,
 * ink ring, CTA gradient hover. Old mobile play-blob arrows are not used.
 */
const ARROW_HOVER =
  'hover:border-transparent hover:text-white hover:[background-image:linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] focus-visible:border-transparent focus-visible:text-white focus-visible:[background-image:linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)]';

const ARROW_BUTTON =
  `absolute top-1/2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ink bg-white text-ink shadow-button transition-colors duration-300 ease-out md:size-14 ${ARROW_HOVER} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none`;

function ArrowGlyph({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      width="14"
      height="8"
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

/** Instant recenter — call every frame while widths ease so scroll never lags layout. */
function centerSlideNow(viewport: HTMLElement, index: number) {
  const slide = viewport.querySelectorAll<HTMLElement>('[data-carousel-slide]')[index];
  if (!slide) return;
  const vRect = viewport.getBoundingClientRect();
  const sRect = slide.getBoundingClientRect();
  const delta = sRect.left + sRect.width / 2 - (vRect.left + vRect.width / 2);
  if (Math.abs(delta) < 0.5) return;
  viewport.scrollLeft += delta;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function LatestNewsCarousel({
  articles,
}: {
  articles: LatestNewsCardProps[];
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const programmaticRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(0);
  const count = articles.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      const target = (next + count) % count;
      if (target === active) return;
      programmaticRef.current = true;
      setActive(target);
    },
    [active, count],
  );

  /*
   * Keep the featured slide centered for the whole width ease.
   * Avoids the old two-step jank: wait 320ms → then smooth-scroll.
   */
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let raf = 0;
    let cancelled = false;
    programmaticRef.current = true;
    const previousSnap = viewport.style.scrollSnapType;
    viewport.style.scrollSnapType = 'none';

    const reduced = prefersReducedMotion();
    const duration = reduced ? 0 : WIDTH_EASE_MS;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      centerSlideNow(viewport, active);
      if (now - start < duration) {
        raf = requestAnimationFrame(tick);
        return;
      }
      centerSlideNow(viewport, active);
      viewport.style.scrollSnapType = previousSnap;
      programmaticRef.current = false;
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      viewport.style.scrollSnapType = previousSnap;
    };
  }, [active]);

  /* Sync active from finger / trackpad after the gesture settles. */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncFromScroll = () => {
      if (programmaticRef.current) return;
      const next = nearestCenteredIndex(viewport);
      setActive((prev) => {
        if (prev === next) return prev;
        programmaticRef.current = true;
        return next;
      });
    };

    const onScroll = () => {
      if (programmaticRef.current) return;
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        scrollTimerRef.current = null;
        syncFromScroll();
      }, SCROLL_SETTLE_MS);
    };

    const onScrollEnd = () => {
      if (programmaticRef.current) return;
      syncFromScroll();
    };

    viewport.addEventListener('scroll', onScroll, { passive: true });
    viewport.addEventListener('scrollend', onScrollEnd);
    return () => {
      viewport.removeEventListener('scroll', onScroll);
      viewport.removeEventListener('scrollend', onScrollEnd);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  /* Center the first slide once after mount (no animation flash). */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    programmaticRef.current = true;
    centerSlideNow(viewport, 0);
    programmaticRef.current = false;
  }, []);

  if (articles.length === 0) return null;

  return (
    <div className="relative mt-[2.3125rem] -mx-5 overflow-visible md:mt-10 xl:hidden">
      <div
        ref={viewportRef}
        className={`snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-x [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-scrollbar]:hidden ${FEATURED_PAD}`}
        role="group"
        aria-roledescription="carousel"
        aria-label="Latest news"
        tabIndex={0}
      >
        <div className="flex items-center gap-3 md:gap-4">
          {articles.map((article, idx) => {
            const featured = idx === active;
            return (
              <div
                key={`${article.title}-${idx}`}
                className={`min-w-0 shrink-0 grow-0 snap-center transition-[width] duration-[480ms] motion-reduce:transition-none ${
                  featured ? FEATURED_WIDTH_CLASS : PEEK_WIDTH_CLASS
                }`}
                style={{ transitionTimingFunction: GENTLE }}
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

      {/* Overlay matches featured image box so arrows sit on the photo midline. */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 z-10 aspect-[544/431] -translate-x-1/2 ${FEATURED_WIDTH_CLASS}`}
      >
        <button
          type="button"
          aria-label="Previous article"
          onClick={() => goTo(active - 1)}
          className={`${ARROW_BUTTON} pointer-events-auto left-0 -translate-x-1/2`}
        >
          <ArrowGlyph direction="prev" />
        </button>
        <button
          type="button"
          aria-label="Next article"
          onClick={() => goTo(active + 1)}
          className={`${ARROW_BUTTON} pointer-events-auto right-0 translate-x-1/2`}
        >
          <ArrowGlyph direction="next" />
        </button>
      </div>
    </div>
  );
}
