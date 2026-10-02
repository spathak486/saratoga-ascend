import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface ClientLogoCardProps {
  name: string;
  src?: string;
}

/**
 * Figma Our Clients plate (2002:448). The inspect panel reports a
 * transparent fill plus a Glass shader (blur 78). On this flat page that
 * shader paints as the pale frosted plate in the prototype.
 */
export const ClientLogoCard: React.FC<ClientLogoCardProps> = ({
  name,
  src,
}) => (
  <div
    className="relative aspect-[470/456] w-[min(calc(100vw-2rem),29.390625rem)] shrink-0 overflow-hidden rounded-[3.75rem] max-xl:aspect-[268/260] max-xl:w-[16.75rem] max-xl:rounded-[2.1375rem]!"
    style={{
      background: 'rgba(255, 255, 255, 0.72)',
      backdropFilter: 'blur(78px)',
      WebkitBackdropFilter: 'blur(78px)',
      border: '1px solid rgb(208, 208, 208)',
      boxSizing: 'border-box',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    }}
  >
    <MediaFrame
      src={src}
      alt={name}
      pendingLabel={name}
      tone="tile"
      sizes="(max-width: 768px) 90vw, 470px"
      imageClassName="object-contain! p-[17%]"
      className="size-full border-0 bg-transparent!"
    />
  </div>
);
