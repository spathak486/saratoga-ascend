'use client';

import React, { useCallback, useRef, useState } from 'react';

export interface CarouselProgressBarProps {
  /** 0–1, driven by `useCarouselProgress`. */
  progress: number;
  className?: string;
  /** When provided, the bar becomes draggable/clickable — called with the
   *  0–1 position under the pointer as the user drags across the track. */
  onScrub?: (ratio: number) => void;
  /** Called once a scrub gesture ends, so the caller can settle the
   *  carousel onto the nearest card. */
  onScrubEnd?: () => void;
}

/**
 * Track and fill beneath the staffing carousel. The fill is taller than the
 * track so it reads as a pill sliding over a hairline — 12px over 4px in the
 * file. When `onScrub` is supplied, clicking or dragging anywhere on the
 * track seeks the carousel — the primary way to navigate now that the
 * arrows are gone.
 */
export const CarouselProgressBar: React.FC<CarouselProgressBarProps> = ({
  progress,
  className = '',
  onScrub,
  onScrubEnd,
}) => {
  const clamped = Math.min(1, Math.max(0, progress));
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const interactive = Boolean(onScrub);

  const ratioFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!onScrub) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    onScrub(ratioFromClientX(event.clientX));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !onScrub) return;
    onScrub(ratioFromClientX(event.clientX));
  };

  const endScrub = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    onScrubEnd?.();
  };

  return (
    <div
      ref={trackRef}
      className={`relative h-3 w-full touch-none ${interactive ? 'cursor-pointer' : ''} ${className}`.trim()}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      aria-label="Carousel progress"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endScrub}
      onPointerCancel={endScrub}
    >
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-pill bg-brand-hairline" />
      <div
        className={`bg-cta-gradient absolute top-0 left-0 h-3 max-w-full rounded-pill shadow-button ease-out ${
          dragging ? '' : 'transition-[width] duration-200'
        }`}
        style={{ width: `${Math.max(clamped * 100, clamped > 0 ? 8 : 0)}%` }}
      />
    </div>
  );
};
