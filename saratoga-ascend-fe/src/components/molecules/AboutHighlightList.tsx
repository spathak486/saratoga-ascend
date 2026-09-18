import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface AboutHighlightListProps {
  items: readonly string[];
  className?: string;
}

/**
 * About Us checklist — 40px pale-red badge; 24px row gap at 1920, fluid below.
 */
export const AboutHighlightList: React.FC<AboutHighlightListProps> = ({
  items,
  className = '',
}) => (
  <ul
    className={`flex flex-col gap-[clamp(1rem,0.909rem+0.3883vw,1.5rem)] ${className}`.trim()}
  >
    {items.map((item, index) => (
      <li key={`${index}-${item}`} className="flex items-center gap-4">
        <span className="relative size-10 shrink-0" aria-hidden="true">
          <MediaFrame
            src="/images/about/check-badge.svg"
            alt=""
            pendingLabel="check"
            unoptimized
            sizes="40px"
            imageClassName="object-contain!"
            className="size-full border-0 bg-transparent"
          />
        </span>
        <span className="text-body-lg font-medium leading-[1.6] text-ink">{item}</span>
      </li>
    ))}
  </ul>
);
