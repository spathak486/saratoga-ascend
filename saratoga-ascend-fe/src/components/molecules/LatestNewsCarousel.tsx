'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });
  const ignoreScrollRef = useRef(false);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
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
    if (!viewport || dragRef.current.active) return;
    ignoreScrollRef.current = true;
    scrollSlideToCenter(viewport, active, 'auto');
    window.setTimeout(() => {
      ignoreScrollRef.current = false;
    }, 120);
  }, [active]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let settleTimer = 0;
    const settle = () => {
      if (dragRef.current.active || ignoreScrollRef.current) return;
      const next = nearestCenteredIndex(viewport);
      setActive((current) => {
        if (current === next) {
          scrollSlideToCenter(viewport, next, 'smooth');
          return current;
        }
        return next;
      });
    };

    const onScroll = () => {
      if (dragRef.current.active || ignoreScrollRef.current) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 80);
    };

    viewport.addEventListener('scroll', onScroll, { passive: true });
    viewport.addEventListener('scrollend', settle);
    return () => {
      window.clearTimeout(settleTimer);
      viewport.removeEventListener('scroll', onScroll);
      viewport.removeEventListener('scrollend', settle);
    };
  }, []);

  const endDrag = useCallback(() => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    setIsDragging(false);

    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.style.scrollSnapType = '';

    const next = nearestCenteredIndex(viewport);
    if (next === active) {
      scrollSlideToCenter(viewport, next, 'smooth');
      return;
    }
    setActive(next);
  }, [active]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('button')) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
    viewport.style.scrollSnapType = 'none';
    viewport.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 3) drag.moved = true;
    viewport.scrollLeft = drag.startScrollLeft - delta;
  }, []);

  const onClickCapture = useCallback((event: React.MouseEvent) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.moved = false;
  }, []);

  if (articles.length === 0) return null;

  return (
    <div className="relative mt-[2.3125rem] -mx-5 xl:hidden">
      <div
        ref={viewportRef}
        className={`snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-scrollbar]:hidden ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        role="group"
        aria-roledescription="carousel"
        aria-label="Latest news"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(active - 1);
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(active + 1);
          }
        }}
      >
        <div className="inline-flex items-center">
          <div
            aria-hidden="true"
            className="shrink-0"
            style={{
              flex: '0 0 max(1.25rem, calc((100vw - min(20.566rem, calc(100vw - 6.3125rem))) / 2))',
              width: 'max(1.25rem, calc((100vw - min(20.566rem, calc(100vw - 6.3125rem))) / 2))',
              minWidth: 'max(1.25rem, calc((100vw - min(20.566rem, calc(100vw - 6.3125rem))) / 2))',
            }}
          />
          {articles.map((article, idx) => {
            const featured = idx === active;
            return (
              <div
                key={`${article.title}-${idx}`}
                className={`min-w-0 shrink-0 grow-0 snap-center ${idx < count - 1 ? 'mr-3' : ''}`}
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
          <div
            aria-hidden="true"
            className="shrink-0"
            style={{
              flex: '0 0 max(1.25rem, calc((100vw - min(20.566rem, calc(100vw - 6.3125rem))) / 2))',
              width: 'max(1.25rem, calc((100vw - min(20.566rem, calc(100vw - 6.3125rem))) / 2))',
              minWidth: 'max(1.25rem, calc((100vw - min(20.566rem, calc(100vw - 6.3125rem))) / 2))',
            }}
          />
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
