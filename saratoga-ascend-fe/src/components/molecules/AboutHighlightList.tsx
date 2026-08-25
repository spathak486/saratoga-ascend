import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface AboutHighlightListProps {
  items: readonly string[];
  className?: string;
}

/**
 * About Us checklist — 40px pale-red badge with a brand-red check
 * (Figma node 13:360).
 */
export const AboutHighlightList: React.FC<AboutHighlightListProps> = ({
  items,
  className = '',
}) => (
  <ul className={`flex flex-col gap-6 ${className}`.trim()}>
    {items.map((item) => (
      <li key={item} className="flex items-center gap-4">
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
        <span className="text-body-lg font-medium text-ink">{item}</span>
      </li>
    ))}
  </ul>
);
