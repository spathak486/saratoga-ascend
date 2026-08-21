import React from 'react';
import { GlobalImage } from './GlobalImage';

export type MediaFrameTone = 'tile' | 'navy' | 'navyCard' | 'sky' | 'red';

export interface MediaFrameProps {
  /**
   * Path to the artwork. Leave undefined while the asset is still being
   * exported — the frame renders as a tinted block at the correct size and
   * aspect, so the layout can be reviewed before the image lands.
   */
  src?: string;
  alt: string;
  /** Filename shown on the placeholder so it is obvious what to drop in. */
  pendingLabel?: string;
  tone?: MediaFrameTone;
  /** Tailwind classes for the frame itself — size, aspect, radius, position. */
  className?: string;
  /** Applied to the `<img>` only, e.g. `object-contain!`. */
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Low-opacity tints so a pending frame reads as reserved space rather than a
 * solid block, and whatever sits beside it stays legible during review.
 */
const toneStyles: Record<MediaFrameTone, string> = {
  tile: 'bg-brand-navy/8 border-brand-navy/25 text-brand-navy/60',
  navy: 'bg-brand-navy/15 border-brand-navy/30 text-brand-navy/70',
  navyCard: 'bg-brand-on-dark/10 border-brand-on-dark/25 text-brand-on-dark/70',
  sky: 'bg-brand-sky/15 border-brand-sky/35 text-brand-sky',
  red: 'bg-brand-red/12 border-brand-red/30 text-brand-red',
};

export const MediaFrame: React.FC<MediaFrameProps> = ({
  src,
  alt,
  pendingLabel,
  tone = 'tile',
  className = '',
  imageClassName = '',
  sizes,
  priority = false,
}) => {
  if (src) {
    return (
      <GlobalImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imageClassName}
        containerClassName={className}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden border border-dashed ${toneStyles[tone]} ${className}`.trim()}
      /* An empty `alt` means decorative, so expose nothing rather than an
         unlabelled image to assistive tech. */
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      {pendingLabel && (
        <span className="px-3 text-center text-eyebrow tracking-[0.08em] uppercase">
          {pendingLabel}
        </span>
      )}
    </div>
  );
};
