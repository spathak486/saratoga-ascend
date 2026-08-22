'use client';

import { useCallback, useEffect, useState, type RefObject } from 'react';

/**
 * Maps horizontal scroll position to a 0–1 value for the gradient progress
 * bar beneath the staffing carousel.
 */
export function useCarouselProgress(
  viewportRef: RefObject<HTMLElement | null>
): number {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    setProgress(maxScroll <= 0 ? 1 : viewport.scrollLeft / maxScroll);
  }, [viewportRef]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    update();
    viewport.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      viewport.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [viewportRef, update]);

  return progress;
}
