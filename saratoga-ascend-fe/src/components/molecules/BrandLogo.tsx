import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export type BrandLogoSize = 'sm' | 'md';

export interface BrandLogoProps {
  size?: BrandLogoSize;
  /** Reserved for a light logo export on dark bands — footer still passes this. */
  variant?: 'dark' | 'light';
}

const widthStyles: Record<BrandLogoSize, string> = {
  sm: 'w-[clamp(9rem,14vw,10.375rem)]',
  md: 'w-[clamp(10rem,15.52vw,18.625rem)]',
};

/** Figma logo (node 1:515) is 298×72. */
const ASPECT = 'aspect-[298/72]';

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md' }) => (
  <MediaFrame
    src="/images/Logo.svg"
    alt="Saratoga Ascend"
    pendingLabel="Logo.svg"
    tone="tile"
    sizes="(max-width: 640px) 10rem, 18.625rem"
    priority
    unoptimized
    imageClassName="object-contain!"
    className={`shrink-0 border-0 bg-transparent ${ASPECT} ${widthStyles[size]}`}
  />
);
