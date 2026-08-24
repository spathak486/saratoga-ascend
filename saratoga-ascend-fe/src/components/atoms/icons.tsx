import React from 'react';

/**
 * Icons lifted from the Figma file, redrawn as inline SVG rather than exported
 * assets so they take their colour from the element around them — the same
 * arrow is white on a gradient button and near-black in the navigation.
 *
 * Each keeps its original viewBox, so sizing with a `size-*` utility gives the
 * artboard's proportions at any scale.
 */

export interface IconProps {
  className?: string;
}

/**
 * The trailing arrow on every gradient CTA. The file draws it pointing
 * north-west and flips it in place; this is the mirrored path, which spares
 * every caller a transform.
 */
export const ArrowUpRightIcon: React.FC<IconProps> = ({
  className = 'size-6',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M6.4 18L16 8.4V17H18V5H6V7H14.6L5 16.6L6.4 18Z"
      fill="currentColor"
    />
  </svg>
);

/** Dropdown indicator beside a primary navigation item. */
export const CaretDownIcon: React.FC<IconProps> = ({
  className = 'size-4',
}) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M13.2801 5.96663L8.93339 10.3133C8.42005 10.8266 7.58005 10.8266 7.06672 10.3133L2.72005 5.96663"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Paper plane send icon used in the newsletter subscription input button. */
export const SendIcon: React.FC<IconProps> = ({
  className = 'size-5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      fill="currentColor"
    />
  </svg>
);
