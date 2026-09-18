import React from 'react';
import { ArrowUpRightIcon, Heading } from '../atoms';
import { MediaFrame } from '../atoms/MediaFrame';

export interface StaffingSlideCardProps {
  title?: React.ReactNode;
  body?: string;
  imageSrc?: string;
  href?: string;
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

const arrowEase =
  'transition-opacity duration-300 ease-in motion-reduce:transition-none';

/**
 * Travel Staffing tile (Figma node 13:254) — 402×450 photo, navy foot wash,
 * white type. Hover: northeast arrow fades in beside the title.
 */
export const StaffingSlideCard: React.FC<StaffingSlideCardProps> = ({
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  imageSrc = '/images/Rectangle%20113.png',
  href = '/what-we-do',
}) => (
  <a
    href={href}
    draggable={false}
    onDragStart={(event) => event.preventDefault()}
    className="group block rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
  >
    <article className="relative aspect-[402/450] w-full overflow-hidden rounded-panel border border-brand-line">
      <MediaFrame
        src={imageSrc}
        alt=""
        pendingLabel="Rectangle 113.png"
        tone="navy"
        sizes="(max-width: 768px) 90vw, 402px"
        imageClassName="object-cover! pointer-events-none"
        className="absolute inset-0 size-full border-0"
      />
      <div className="bg-staffing-scrim pointer-events-none absolute inset-0" />
      <div className="absolute inset-x-[clamp(1.25rem,9.95%,2.5rem)] bottom-[clamp(1.5rem,8.5%,2.25rem)] flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Heading
            level={3}
            size="subtitle"
            font="serif"
            tone="onDark"
            className="max-w-[8em] text-[clamp(1.5rem,4.2vw,2.25rem)] leading-[1.15] text-brand-on-dark"
          >
            {title}
          </Heading>
          <ArrowUpRightIcon
            className={`mt-[0.15em] size-[clamp(1.5rem,2.08vw,2rem)] shrink-0 text-brand-on-dark opacity-0 ${arrowEase} group-hover:opacity-100 group-focus-visible:opacity-100`}
          />
        </div>
        <p className="text-button font-medium leading-[1.4] text-brand-on-dark">
          {body}
        </p>
      </div>
    </article>
  </a>
);
