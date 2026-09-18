import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface ClientLogoCardProps {
  name: string;
  src?: string;
}

/**
 * Frosted logo plate — 470×456, 60px corners, 22% white glass, 24px blur.
 */
export const ClientLogoCard: React.FC<ClientLogoCardProps> = ({
  name,
  src,
}) => (
  <div className="relative h-[clamp(16rem,23.75vw,28.525rem)] w-[clamp(16.5rem,24.5vw,29.39rem)] shrink-0 overflow-hidden rounded-[3.75rem] bg-[rgb(255_255_255/0.22)] shadow-[inset_0_1px_1px_rgb(255_255_255/0.7),0_10px_30px_rgb(0_0_0/0.03)] backdrop-blur-[24px] backdrop-saturate-120">
    <MediaFrame
      src={src}
      alt={name}
      pendingLabel={name}
      tone="tile"
      sizes="(max-width: 768px) 70vw, 470px"
      imageClassName="object-contain! p-[clamp(1.5rem,4vw,4.5rem)]"
      className="size-full border-0 bg-transparent"
    />
  </div>
);
