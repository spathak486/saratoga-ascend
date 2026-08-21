import React from 'react';
import { MediaFrame, Section } from '../atoms';

export interface HeroSectionProps {
  /** Figma uses a motion clip here. Falls back to the still while it is absent. */
  videoSrc?: string;
  posterSrc?: string;
  mediaAlt?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  videoSrc,
  posterSrc = '/images/DNA-v1.png',
  mediaAlt = 'DNA double helix',
}) => (
  <Section id="overview" tone="surface" spacing="none">
    <div className="fade-to-surface relative aspect-[1916/1036] w-full overflow-hidden">
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
        <MediaFrame
          src={posterSrc}
          alt={mediaAlt}
          pendingLabel="DNA-v1.png"
          priority
          sizes="(max-width: 1700px) 100vw, 1700px"
          className="size-full"
        />
      )}
    </div>
  </Section>
);
