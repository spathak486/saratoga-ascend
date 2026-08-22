import React from 'react';

export interface AboutHighlightListProps {
  items: readonly string[];
  className?: string;
}

/**
 * Red disc list from Figma node 1:611 — 22px Google Sans, prime-r markers.
 */
export const AboutHighlightList: React.FC<AboutHighlightListProps> = ({
  items,
  className = '',
}) => (
  <ul
    className={`list-disc space-y-[1.375em] pl-[1.5em] text-body text-brand-red marker:text-brand-red ${className}`.trim()}
  >
    {items.map((item) => (
      <li key={item} className="pl-1">
        {item}
      </li>
    ))}
  </ul>
);
