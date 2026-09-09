'use client';

import React, { useCallback, useRef, useState } from 'react';

export interface CarouselProgressBarProps {
  /** 0–1, driven by `useCarouselProgress`. */
  progress: number;
  className?: string;
  /** Live drag along the track. */
  onScrub?: (ratio: number) => void;
  /** Click (or keyboard) to a point on the bar — cards should slide there. */
  onSeek?: (ratio: number) => void;
  /** Called once a scrub gesture ends, so the caller can settle the
   *  carousel onto the nearest card. */
  onScrubEnd?: () => void;
}

/**
 * Track and fill beneath the staffing carousel. The fill is taller than the
 * track so it reads as a pill sliding over a hairline — 12px over 4px in the
 * file. Click either end (or anywhere on the bar) to slide the cards there;
 * drag to scrub.
 */
export const CarouselProgressBar: React.FC<CarouselProgressBarProps> = ({
  progress,
  className = '',
  onScrub,
  onSeek,
  onScrubEnd,
}) => {
  const clamped = Math.min(1, Math.max(0, progress));
  const trackRef = useRef<HTMLDivElement | null>(null);
  const gesture = useRef({ active: false, startX: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const interactive = Boolean(onScrub || onSeek);

  const ratioFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = { active: true, startX: event.clientX, moved: false };
    setDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!gesture.current.active) return;
    if (Math.abs(event.clientX - gesture.current.startX) > 4) {
      gesture.current.moved = true;
    }
    if (gesture.current.moved) {
      onScrub?.(ratioFromClientX(event.clientX));
    }
  };

  const endScrub = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!gesture.current.active) return;
    const ratio = ratioFromClientX(event.clientX);
    const wasDrag = gesture.current.moved;
    gesture.current.active = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (wasDrag) {
      onScrubEnd?.();
      return;
    }

    (onSeek ?? onScrub)?.(ratio);
    window.setTimeout(() => onScrubEnd?.(), 400);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const step = 0.15;
    if (event.key === 'Home') {
      event.preventDefault();
      (onSeek ?? onScrub)?.(0);
      window.setTimeout(() => onScrubEnd?.(), 400);
    } else if (event.key === 'End') {
      event.preventDefault();
      (onSeek ?? onScrub)?.(1);
      window.setTimeout(() => onScrubEnd?.(), 400);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      (onSeek ?? onScrub)?.(Math.max(0, clamped - step));
      window.setTimeout(() => onScrubEnd?.(), 400);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      (onSeek ?? onScrub)?.(Math.min(1, clamped + step));
      window.setTimeout(() => onScrubEnd?.(), 400);
    }
  };

  return (
    <div
      ref={trackRef}
      className={`relative h-8 w-full touch-none ${interactive ? 'cursor-pointer' : ''} ${className}`.trim()}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      aria-label="Carousel position"
      tabIndex={interactive ? 0 : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endScrub}
      onPointerCancel={endScrub}
      onKeyDown={handleKeyDown}
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-pill bg-brand-hairline" />
      <div
        className={`bg-cta-gradient pointer-events-none absolute top-1/2 left-0 h-3 max-w-full -translate-y-1/2 rounded-pill shadow-button ease-out ${
          dragging ? '' : 'transition-[width] duration-200'
        }`}
        style={{ width: `${Math.max(clamped * 100, clamped > 0 ? 8 : 0)}%` }}
      />
    </div>
  );
};
