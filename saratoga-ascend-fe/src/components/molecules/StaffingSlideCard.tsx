import React from 'react';
import { Heading } from '../atoms';
import { MediaFrame } from '../atoms/MediaFrame';

export interface StaffingSlideCardProps {
  title?: React.ReactNode;
  body?: string;
  imageSrc?: string;
}

const DEFAULT_TITLE = (
  <>
    Travel
    <br />
    Staffing
  </>
);

const DEFAULT_BODY =
  'Connecting cleared, credentialed healthcare professionals with government, military.';

/**
 * Travel Staffing tile (Figma node 13:254) — 402×450 photo, navy foot wash,
 * white type. No arrow.
 */
export const StaffingSlideCard: React.FC<StaffingSlideCardProps> = ({
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  imageSrc = '/images/Rectangle%20113.png',
}) => (
  <article className="group relative aspect-[402/450] w-full overflow-hidden rounded-panel border border-brand-line">
    <MediaFrame
      src={imageSrc}
      alt=""
      pendingLabel="Rectangle 113.png"
      tone="navy"
      sizes="(max-width: 768px) 90vw, 402px"
      imageClassName="object-cover!"
      className="absolute inset-0 size-full border-0"
    />
    <div className="bg-staffing-scrim pointer-events-none absolute inset-0" />
    {/* Hover wash — a touch of grey deepens the tile without ever lightening
        the navy scrim behind the type, so contrast only ever improves. */}
    <div className="pointer-events-none absolute inset-0 bg-slate-950/40 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none" />
    <div className="absolute inset-x-[9.95%] top-[45.8%] bottom-[7.11%] flex flex-col">
      <Heading
        level={3}
        size="subtitle"
        font="serif"
        tone="onDark"
        className="max-w-[7em] text-brand-on-dark"
      >
        {title}
      </Heading>
      <p className="mt-auto text-button font-medium leading-[1.5] text-brand-on-dark">
        {body}
      </p>
    </div>
  </article>
);
