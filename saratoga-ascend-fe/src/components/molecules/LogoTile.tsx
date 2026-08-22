import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface LogoTileProps {
  /** Organisation name — the accessible label for the mark. */
  name: string;
  src?: string;
  /** Filename shown on the placeholder until `src` is supplied. */
  pendingLabel?: string;
}

/**
 * White plate holding a client or partner mark. The logos are unrelated
 * shapes — circular seals next to wordmarks — so the tile fixes the plate size
 * and lets each mark scale inside it, keeping the row visually even.
 */
export const LogoTile: React.FC<LogoTileProps> = ({
  name,
  src,
  pendingLabel,
}) => (
  <div className="flex aspect-[8/5] items-center justify-center rounded-tile bg-brand-surface p-[clamp(1rem,2vw,1.75rem)] shadow-tile">
    <MediaFrame
      src={src}
      alt={name}
      pendingLabel={pendingLabel}
      tone="tile"
      sizes="(max-width: 640px) 80vw, 22vw"
      imageClassName="object-contain!"
      className="size-full bg-transparent"
    />
  </div>
);
