import React from 'react';
import { Heading, MediaFrame } from '../atoms';

export interface MarketServeCardProps {
  label: React.ReactNode;
  imageSrc?: string;
  pendingLabel?: string;
  href?: string;
}

/**
 * Photo tile for the Market We Serve band — full-bleed image, navy foot
 * scrim, centred 44px serif label (Figma node 1:322 / 828×480).
 */
export const MarketServeCard: React.FC<MarketServeCardProps> = ({
  label,
  imageSrc,
  pendingLabel = 'market-card.png',
  href,
}) => {
  const content = (
    <article className="relative aspect-[828/480] min-h-[14rem] overflow-hidden rounded-card">
      <MediaFrame
        src={imageSrc}
        alt=""
        pendingLabel={pendingLabel}
        tone="navy"
        sizes="(max-width: 1024px) 100vw, 50vw"
        imageClassName="object-cover!"
        className="absolute inset-0 size-full border-0"
      />

      <div
        className="bg-photo-scrim pointer-events-none absolute inset-0 z-[1] rounded-card"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-[2] flex items-end justify-center px-[clamp(1rem,3.125vw,3.75rem)] py-[clamp(1.25rem,3.125vw,3.75rem)]">
        <Heading
          level={3}
          size="subtitle"
          tone="onDark"
          font="serif"
          className="max-w-full text-center text-white lg:whitespace-nowrap"
        >
          {label}
        </Heading>
      </div>
    </article>
  );

  if (href) {
    const labelText = typeof label === 'string' ? label : 'Market segment';
    return (
      <a
        href={href}
        aria-label={labelText}
        className="group block rounded-card focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {content}
      </a>
    );
  }

  return content;
};
