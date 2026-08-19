import React from 'react';
import { GlobalImage } from '../atoms/GlobalImage';

export interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

/** Figma Logo 5:1095 is 298×72. */
const sizeStyles = {
  sm: { width: 166, height: 40 },
  md: { width: 298, height: 72 },
  lg: { width: 298, height: 72 },
} as const;

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md' }) => {
  const { width, height } = sizeStyles[size];

  return (
    <GlobalImage
      src="/images/Logo.svg"
      alt="Saratoga Ascend"
      width={width}
      height={height}
      sizes={`${width}px`}
      priority
      unoptimized
      containerClassName="shrink-0"
    />
  );
};
