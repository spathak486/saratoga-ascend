import React from 'react';
import Image, { ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  containerClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fill = true,
  priority = false,
  quality = 90,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={`object-cover transition-all duration-700 ${className}`}
        {...props}
      />
    </div>
  );
};
