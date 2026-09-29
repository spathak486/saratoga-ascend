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

/** Mobile header hamburger — Figma Component 26, 20×20. */
export const MenuIcon: React.FC<IconProps> = ({ className = 'size-5' }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33333 4.16667C2.8731 4.16667 2.5 4.53977 2.5 5C2.5 5.46023 2.8731 5.83333 3.33333 5.83333H16.6667C17.1269 5.83333 17.5 5.46023 17.5 5C17.5 4.53977 17.1269 4.16667 16.6667 4.16667H3.33333ZM2.5 10C2.5 9.53975 2.8731 9.16667 3.33333 9.16667H16.6667C17.1269 9.16667 17.5 9.53975 17.5 10C17.5 10.4603 17.1269 10.8333 16.6667 10.8333H3.33333C2.8731 10.8333 2.5 10.4603 2.5 10ZM2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4603 17.1269 15.8333 16.6667 15.8333H3.33333C2.8731 15.8333 2.5 15.4603 2.5 15Z"
      fill="currentColor"
    />
  </svg>
);

/** Magnifying glass in the header search control (Figma node 525:1686). */
export const SearchIcon: React.FC<IconProps> = ({
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
      d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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

/** News card arrow — Figma 2002:722, 32×33, fill #E3E3E3. */
export const NewsArrowIcon: React.FC<IconProps> = ({
  className = 'h-[33px] w-8',
}) => (
  <svg
    viewBox="0 0 32 33"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M18.6693 24.75L16.8026 22.7563L21.5359 17.875H5.33594V15.125H21.5359L16.8026 10.2438L18.6693 8.25L26.6693 16.5L18.6693 24.75Z"
      fill="currentColor"
    />
  </svg>
);
