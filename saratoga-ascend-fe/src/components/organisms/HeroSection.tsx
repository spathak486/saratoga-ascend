import React from 'react';
import { GlobalImage } from '../atoms';

export interface HeroSectionProps {
  /** Figma hero is a video. Until the clip is supplied, the poster image renders. */
  videoSrc?: string;
  posterSrc?: string;
  mediaAlt?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  videoSrc,
  posterSrc = '/images/DNA-v1.png',
  mediaAlt = 'DNA double helix',
}) => {
  return (
    <section id="overview" className="bg-brand-surface">
      <div className="relative mx-auto w-full max-w-[1916px]">
        <div className="relative aspect-[1916/1036] w-full overflow-hidden lg:aspect-auto lg:h-[1036px]">
          {videoSrc ? (
            <video
              className="size-full object-cover"
              poster={posterSrc}
              aria-label={mediaAlt}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <GlobalImage
              src={posterSrc}
              alt={mediaAlt}
              fill
              priority
              sizes="100vw"
              containerClassName="size-full"
            />
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[47%] bg-gradient-to-b from-transparent to-brand-surface lg:h-[521px]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
