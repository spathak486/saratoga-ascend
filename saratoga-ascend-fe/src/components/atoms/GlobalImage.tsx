'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export type ImageAspectRatio = 'square' | 'video' | 'portrait' | 'tall' | 'wide' | 'banner' | 'auto';
export type ImageOverlay = 'none' | 'dark' | 'brand' | 'blue' | 'vignette';
export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface GlobalImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  aspectRatio?: ImageAspectRatio;
  overlay?: ImageOverlay;
  rounded?: ImageRounded;
  hoverEffect?: boolean;
  containerClassName?: string;
  fallbackSrc?: string;
}

const aspectRatioStyles: Record<ImageAspectRatio, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[4/5]',
  tall: 'aspect-[3/4]',
  wide: 'aspect-[21/9]',
  banner: 'aspect-[3/1]',
  auto: '',
};

const roundedStyles: Record<ImageRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

const overlayStyles: Record<ImageOverlay, string> = {
  none: '',
  dark: 'bg-gradient-to-t from-[#011c30]/90 via-[#011c30]/40 to-transparent',
  brand: 'bg-gradient-to-tr from-[#022e4c]/85 via-[#011c30]/50 to-[#e11d48]/40',
  blue: 'bg-gradient-to-t from-[#022e4c]/80 via-[#29a6e3]/20 to-transparent',
  vignette: 'bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(1,28,48,0.85)_100%)]',
};

export const GlobalImage: React.FC<GlobalImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  overlay = 'none',
  rounded = 'none',
  hoverEffect = false,
  fill = true,
  priority = false,
  quality = 90,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  containerClassName = '',
  fallbackSrc = '/images/hero-banner.png',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectClass = aspectRatioStyles[aspectRatio];
  const roundedClass = roundedStyles[rounded];
  const overlayClass = overlayStyles[overlay];

  const handleImageError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${roundedClass} ${containerClassName} ${
        isLoading ? 'bg-slate-200 animate-pulse' : ''
      }`}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
        className={`object-cover transition-all duration-700 ease-out ${
          hoverEffect ? 'hover:scale-105' : ''
        } ${isLoading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'} ${className}`}
        {...props}
      />

      {/* Optional Gradient Overlay */}
      {overlay !== 'none' && (
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${overlayClass}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
