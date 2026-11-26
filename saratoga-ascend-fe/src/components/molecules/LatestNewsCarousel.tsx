'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LatestNewsCard, type LatestNewsCardProps } from './LatestNewsCard';

/**
 * One full card per view on mobile; two equal cards fill the tablet row (`md:gap-4` = 1rem).
 */
const FEATURED_WIDTH_CLASS = 'w-full min-w-full basis-full';
const TABLET_SLIDE_CLASS = 'md:w-[calc((100%-1rem)/2)] md:min-w-0 md:basis-[calc((100%-1rem)/2)]';

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
  `absolute top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/80 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-12`;

/**
 * Figma 1452:8156 / 1452:11211:
 * Circular glass button (size 44px on mobile, 48px on tablet) with soft border #C6C6C6,
 * backdrop blur, and smooth active/hover states.
 */
function ArrowGlyph({ direction, tone = 'default' }: { direction: 'prev' | 'next'; tone?: 'blue' | 'red' | 'default' }) {
  const fillColor = tone === 'red' ? '#F01424' : tone === 'blue' ? '#2A91DC' : 'currentColor';
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${direction === 'prev' ? '-rotate-90' : 'rotate-90'}`}
    >
      <path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        fill={fillColor}
      />
    </svg>
  );
}

function nearestSlideIndex(viewport: HTMLElement, tablet: boolean) {
  const slides = Array.from(viewport.querySelectorAll<HTMLElement>('[data-carousel-slide]'));
  if (slides.length === 0) return 0;
  const viewportRect = viewport.getBoundingClientRect();
  const target = tablet ? viewportRect.left : viewportRect.left + viewport.clientWidth / 2;
  let best = 0;
  let bestDist = Infinity;
  slides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    const point = tablet ? rect.left : rect.left + rect.width / 2;
    const dist = Math.abs(point - target);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  });
  return best;
}

/** Phone centers the featured slide. Tablet aligns it to the left so two cards stay in view. */
function alignSlideNow(viewport: HTMLElement, index: number, tablet: boolean) {
  const slide = viewport.querySelectorAll<HTMLElement>('[data-carousel-slide]')[index];
  if (!slide) return;
  const vRect = viewport.getBoundingClientRect();
  const sRect = slide.getBoundingClientRect();
  const delta = tablet
    ? sRect.left - vRect.left
    : sRect.left + sRect.width / 2 - (vRect.left + vRect.width / 2);
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
  const tabletRef = useRef(false);
  const [active, setActive] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const count = articles.length;

  tabletRef.current = isTablet;

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsTablet(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

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
      alignSlideNow(viewport, active, tabletRef.current);
      if (now - start < duration) {
        raf = requestAnimationFrame(tick);
        return;
      }
      alignSlideNow(viewport, active, tabletRef.current);
      viewport.style.scrollSnapType = previousSnap;
      programmaticRef.current = false;
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      viewport.style.scrollSnapType = previousSnap;
    };
  }, [active, isTablet]);

  /* Sync active from finger / trackpad after the gesture settles. */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncFromScroll = () => {
      if (programmaticRef.current) return;
      const next = nearestSlideIndex(viewport, tabletRef.current);
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
    alignSlideNow(viewport, 0, tabletRef.current);
    programmaticRef.current = false;
  }, []);

  if (articles.length === 0) return null;

  return (
    <div className="relative mt-8 overflow-visible md:mt-10 xl:hidden">
      <div
        ref={viewportRef}
        className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-x [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Latest news"
        tabIndex={0}
      >
        <div className="flex items-stretch gap-4 md:w-full">
          {articles.map((article, idx) => {
            const featured = idx === active;
            return (
              <div
                key={`${article.title}-${idx}`}
                className={`shrink-0 grow-0 snap-center md:snap-start ${FEATURED_WIDTH_CLASS} ${TABLET_SLIDE_CLASS}`}
                role="group"
                aria-roledescription="slide"
                aria-current={featured ? 'true' : undefined}
                data-carousel-slide
              >
                <LatestNewsCard {...article} compact featured />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows: Hidden on mobile (< md), shown on tablet (md to xl) */}
      <div
        className={`pointer-events-none absolute top-0 z-10 hidden aspect-[544/431] md:inset-x-0 md:flex md:aspect-auto md:h-full md:w-auto md:translate-x-0 ${FEATURED_WIDTH_CLASS} left-1/2 -translate-x-1/2 md:left-0`}
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

      {/* Pagination dots for mobile (< md): Clean clickable indicator dots */}
      <div className="mt-5 flex items-center justify-center gap-2 md:hidden" aria-label="Carousel pagination">
        {articles.map((_, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={`dot-${idx}`}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 rounded-full focus:outline-none ${
                isActive
                  ? 'h-2 w-6 bg-[#F01424]'
                  : 'h-2 w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
