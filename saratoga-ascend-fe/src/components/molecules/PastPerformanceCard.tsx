import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface PastPerformanceCardProps {
  title: string;
  body: string;
  imageSrc: string;
}

const PANEL_EASE =
  'transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none';

/**
 * Past Performance tile (Figma 2002:304 / hover 2002:308). Rest shows the
 * photo, a 20% black film, and a 44px serif title. Hover smart-animates a
 * navy wash, 40px title, sky rule, body, and Learn More in 600ms.
 */
export const PastPerformanceCard: React.FC<PastPerformanceCardProps> = ({
  title,
  body,
  imageSrc,
}) => (
  <article
    tabIndex={0}
    className="group relative aspect-[411/650] w-full overflow-hidden rounded-[1.875rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
  >
    <MediaFrame
      src={imageSrc}
      alt=""
      pendingLabel={title}
      tone="navy"
      sizes="(max-width: 768px) 90vw, 411px"
      imageClassName="object-cover!"
      className="absolute inset-0 size-full border-0"
    />

    <div
      className={`pointer-events-none absolute inset-0 bg-black/20 ${PANEL_EASE} group-hover:opacity-0 group-focus-visible:opacity-0`}
      aria-hidden="true"
    />
    <div
      className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_40_69/0.5),var(--color-brand-navy-band))] opacity-0 ${PANEL_EASE} group-hover:opacity-100 group-focus-visible:opacity-100`}
      aria-hidden="true"
    />

    <p
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-[7%] top-[81%] text-center font-serif text-subtitle leading-[1.2] text-white transition-all duration-[600ms] ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-0 group-focus-visible:-translate-y-1/2 group-focus-visible:opacity-0 motion-reduce:transition-none`}
    >
      {title}
    </p>

    <div
      className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[7%] text-center text-white opacity-0 ${PANEL_EASE} group-hover:opacity-100 group-focus-visible:opacity-100`}
    >
      <h3 className="font-serif text-[clamp(1.5rem,1.15rem+1.125vw,2.5rem)] leading-[1.2]">
        {title}
      </h3>
      <span
        className="mt-[0.9375rem] block h-1 w-[4.9375rem] rounded-full bg-brand-blue-soft"
        aria-hidden="true"
      />
      <p className="mt-3 font-sans text-button font-medium">{body}</p>
      <span className="mt-3 inline-flex h-[3.75rem] w-[11.25rem] items-center justify-center rounded-pill bg-brand-cta-to font-sans text-button font-medium">
        Learn More
      </span>
    </div>
  </article>
);
