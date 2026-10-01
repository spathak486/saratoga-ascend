import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface PastPerformanceCardProps {
  title: string;
  body: string;
  imageSrc: string;
  /**
   * Mobile only: the snapped card shows the navy overlay + Learn More.
   * Peek cards stay in rest (photo + title). Desktop still uses hover.
   */
  expanded?: boolean;
}

const PANEL_EASE =
  'transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none';

/**
 * Past Performance tile (Figma 2002:304 / hover 2002:308, mobile 2105:769).
 * Rest shows the photo, a 20% black film, and a serif title. Hover (desktop)
 * or the snapped slide (mobile) smart-animates a navy wash, rule, body, and
 * Learn More in 600ms.
 */
export const PastPerformanceCard: React.FC<PastPerformanceCardProps> = ({
  title,
  body,
  imageSrc,
  expanded = false,
}) => (
  <article
    tabIndex={0}
    className="group relative aspect-[411/650] w-full overflow-hidden rounded-[1.875rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky max-xl:aspect-auto max-xl:h-[33.5rem] max-xl:rounded-xl"
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
      className={`pointer-events-none absolute inset-0 bg-black/20 ${PANEL_EASE} group-hover:opacity-0 group-focus-visible:opacity-0 ${
        expanded ? 'max-xl:opacity-0' : 'max-xl:opacity-100'
      }`}
      aria-hidden="true"
    />
    <div
      className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_40_69/0.5)_21%,#002845_100%)] opacity-0 ${PANEL_EASE} group-hover:opacity-100 group-focus-visible:opacity-100 ${
        expanded ? 'max-xl:opacity-100' : 'max-xl:opacity-0'
      }`}
      aria-hidden="true"
    />

    <p
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-[7%] top-[81%] text-center font-serif text-subtitle leading-[1.2] text-white transition-all duration-[600ms] ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-0 group-focus-visible:-translate-y-1/2 group-focus-visible:opacity-0 motion-reduce:transition-none ${
        expanded ? 'max-xl:hidden' : 'max-xl:top-[85%] max-xl:block max-xl:text-[2.25rem] max-xl:opacity-100'
      }`}
    >
      {title}
    </p>

    <div
      className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[7%] text-center text-white opacity-0 ${PANEL_EASE} group-hover:opacity-100 group-focus-visible:opacity-100 max-xl:gap-2.5 ${
        expanded ? 'max-xl:opacity-100' : 'max-xl:opacity-0'
      }`}
    >
      <h3 className="font-serif text-[clamp(1.5rem,1.15rem+1.125vw,2.5rem)] leading-[1.2] max-xl:text-[2rem]! max-xl:leading-[1.2]!">
        {title}
      </h3>
      <span
        className="mt-[0.9375rem] block h-1 w-[4.9375rem] rounded-full bg-brand-blue-soft max-xl:mt-1 max-xl:h-[3px] max-xl:w-16"
        aria-hidden="true"
      />
      <p className="mt-3 font-sans text-button font-medium max-xl:mt-0 max-xl:max-w-[19.4rem] max-xl:text-base max-xl:leading-[1.5]">
        {body}
      </p>
      <span className="mt-3 inline-flex h-[3.75rem] w-[11.25rem] items-center justify-center rounded-pill bg-brand-cta-to font-sans text-button font-medium shadow-[0px_1px_2px_rgba(16,24,40,0.05)] max-xl:mt-0 max-xl:h-[3.0625rem] max-xl:w-[9.25rem] max-xl:text-base max-xl:leading-[1.5]">
        Learn More
      </span>
    </div>
  </article>
);
