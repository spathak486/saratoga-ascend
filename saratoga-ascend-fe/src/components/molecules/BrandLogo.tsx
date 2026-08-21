import React from 'react';
import { GlobalImage } from '../atoms/GlobalImage';

export type BrandLogoSize = 'sm' | 'md';

export interface BrandLogoProps {
  size?: BrandLogoSize;
  /**
   * Light treatment for placement on navy bands. Needs a light logo export —
   * until one exists this renders the standard mark.
   */
  variant?: 'dark' | 'light';
}

/** Figma logo (node 5:1095) is 298x72. */
const ASPECT = 'aspect-[298/72]';

const widthStyles: Record<BrandLogoSize, string> = {
  sm: 'w-[clamp(9rem,14vw,10.375rem)]',
  md: 'w-[clamp(10rem,17vw,18.625rem)]',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md' }) => (
  <GlobalImage
    src="/images/Logo.svg"
    alt="Saratoga Ascend"
    fill
    sizes="(max-width: 640px) 10rem, 18.625rem"
    priority
    unoptimized
    className="object-contain!"
    containerClassName={`shrink-0 bg-transparent ${ASPECT} ${widthStyles[size]}`}
  />
);
