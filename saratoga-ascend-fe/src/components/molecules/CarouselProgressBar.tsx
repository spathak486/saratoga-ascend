'use client';

import React from 'react';

export interface CarouselProgressBarProps {
  /** 0–1, driven by `useCarouselProgress`. */
  progress: number;
  className?: string;
}

/**
 * Track and fill beneath the staffing carousel. The fill is taller than the
 * track so it reads as a pill sliding over a hairline — 12px over 4px in the
 * file.
 */
export const CarouselProgressBar: React.FC<CarouselProgressBarProps> = ({
  progress,
  className = '',
}) => {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <div
      className={`relative h-3 w-full ${className}`.trim()}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      aria-label="Carousel progress"
    >
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-pill bg-brand-hairline" />
      <div
        className="bg-cta-gradient absolute top-0 left-0 h-3 max-w-full rounded-pill shadow-button transition-[width] duration-200 ease-out"
        style={{ width: `${Math.max(clamped * 100, clamped > 0 ? 8 : 0)}%` }}
      />
    </div>
  );
};
