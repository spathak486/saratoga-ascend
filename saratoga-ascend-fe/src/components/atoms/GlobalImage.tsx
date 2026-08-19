import React from 'react';
import Image, { type ImageProps } from 'next/image';

export type ImageAspectRatio = 'square' | 'video' | 'portrait' | 'tall' | 'wide' | 'banner' | 'auto';
export type ImageOverlay = 'none' | 'dark' | 'brand' | 'blue' | 'vignette';
export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface GlobalImageProps extends Omit<ImageProps, 'alt'> {
  /** Accessible description. Use `""` only for decorative images. */
  alt: string;
  aspectRatio?: ImageAspectRatio;
  overlay?: ImageOverlay;
  rounded?: ImageRounded;
  hoverEffect?: boolean;
  containerClassName?: string;
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
  dark: 'bg-gradient-to-t from-brand-navy-dark/90 via-brand-navy-dark/40 to-transparent',
  brand: 'bg-gradient-to-tr from-brand-navy/85 via-brand-navy-dark/50 to-brand-red/40',
  blue: 'bg-gradient-to-t from-brand-navy/80 via-brand-sky/20 to-transparent',
  vignette:
    'bg-[radial-gradient(ellipse_at_center,_transparent_40%,_color-mix(in_srgb,var(--brand-navy-dark)_85%,transparent)_100%)]',
};

const DEFAULT_FILL_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

export const GlobalImage: React.FC<GlobalImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  overlay = 'none',
  rounded = 'none',
  hoverEffect = false,
  fill,
  width,
  height,
  priority = false,
  preload,
  loading,
  fetchPriority,
  quality = 90,
  sizes,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const hasIntrinsicSize = width != null && height != null;
  const shouldFill = fill ?? !hasIntrinsicSize;
  const isAboveTheFold = Boolean(priority || preload);

  return (
    <div
      className={`relative overflow-hidden ${aspectRatioStyles[aspectRatio]} ${roundedStyles[rounded]} ${
        shouldFill && aspectRatio === 'auto' ? 'size-full' : ''
      } ${containerClassName}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        fill={shouldFill}
        width={shouldFill ? undefined : width}
        height={shouldFill ? undefined : height}
        quality={quality}
        sizes={sizes ?? (shouldFill ? DEFAULT_FILL_SIZES : undefined)}
        loading={loading ?? (isAboveTheFold ? 'eager' : undefined)}
        fetchPriority={fetchPriority ?? (isAboveTheFold ? 'high' : undefined)}
        className={`object-cover ${hoverEffect ? 'transition-transform duration-700 ease-out hover:scale-105' : ''} ${className}`.trim()}
        {...props}
      />

      {overlay !== 'none' && (
        <div
          className={`pointer-events-none absolute inset-0 ${overlayStyles[overlay]}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
