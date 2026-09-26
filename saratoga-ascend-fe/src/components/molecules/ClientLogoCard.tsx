import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface ClientLogoCardProps {
  name: string;
  src?: string;
}

/**
 * Figma Our Clients plate (2002:448) — 470×456, 60px corners, #d0d0d0
 * hairline, transparent fill, Glass blur ~78px.
 */
export const ClientLogoCard: React.FC<ClientLogoCardProps> = ({
  name,
  src,
}) => (
  <div className="relative aspect-[470/456] w-[min(calc(100vw-2rem),29.390625rem)] shrink-0 overflow-hidden rounded-[3.75rem] border border-[#d0d0d0] bg-[rgb(43_136_217/0)] shadow-[inset_0_1px_1px_rgb(255_255_255/0.55)] backdrop-blur-[78px] backdrop-saturate-150">
    <MediaFrame
      src={src}
      alt={name}
      pendingLabel={name}
      tone="tile"
      sizes="(max-width: 768px) 90vw, 470px"
      imageClassName="object-contain! p-[17%]"
      className="size-full border-0 bg-transparent"
    />
  </div>
);
