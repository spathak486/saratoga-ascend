import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface PastPerformanceCardProps {
  title: string;
  body: string;
  imageSrc: string;
}

/**
 * 402×580 past-performance tile — photo, foot scrim, 36px serif title
 * (Figma node 13:441).
 */
export const PastPerformanceCard: React.FC<PastPerformanceCardProps> = ({
  title,
  body,
  imageSrc,
}) => (
  <article className="relative aspect-[402/580] w-full overflow-hidden rounded-tile border border-brand-line">
    <MediaFrame
      src={imageSrc}
      alt=""
      pendingLabel={title}
      tone="navy"
      sizes="(max-width: 768px) 90vw, 402px"
      imageClassName="object-cover!"
      className="absolute inset-0 size-full border-0"
    />
    <div className="bg-performance-scrim pointer-events-none absolute inset-0" />
    {/* Figma: 24px side inset (5.97% of 402), 68px below the body copy
        (11.72% of 580), 20px between title and body. */}
    <div className="absolute inset-x-[6%] bottom-[11.72%] flex flex-col gap-5">
      <h3 className="font-serif text-card text-brand-on-dark">{title}</h3>
      <p className="text-nav text-brand-on-dark">{body}</p>
    </div>
  </article>
);
