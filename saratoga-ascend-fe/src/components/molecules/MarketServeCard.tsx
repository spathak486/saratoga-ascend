import React from 'react';
import { Heading, MediaFrame } from '../atoms';

export interface MarketServeCardProps {
  label: string;
  description: string;
  imageSrc?: string;
  pendingLabel?: string;
  href?: string;
}

/**
 * Photo tile for the Market We Serve band (Figma 828×480). Rest: title on the
 * foot scrim. Hover: navy wash, sky rule, blurb, and a sky Learn More pill.
 */
export const MarketServeCard: React.FC<MarketServeCardProps> = ({
  label,
  description,
  imageSrc,
  pendingLabel = 'market-card.png',
  href,
}) => {
  const content = (
    <article className="relative aspect-[828/480] min-h-[14rem] overflow-hidden rounded-card ring-1 ring-inset ring-transparent transition-[box-shadow,ring-color] duration-300 group-hover:ring-brand-sky group-focus-visible:ring-brand-sky">
      <MediaFrame
        src={imageSrc}
        alt=""
        pendingLabel={pendingLabel}
        tone="navy"
        sizes="(max-width: 1024px) 100vw, 50vw"
        imageClassName="object-cover!"
        className="absolute inset-0 size-full border-0 bg-transparent"
      />

      <div
        className="bg-photo-scrim pointer-events-none absolute inset-0 z-[1] rounded-card transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] rounded-card bg-[linear-gradient(180deg,rgb(2_46_76/0.28)_0%,rgb(2_46_76/0.92)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-end px-[clamp(1rem,3.125vw,3.75rem)] py-[clamp(1.25rem,3.125vw,3.75rem)] text-center transition-[justify-content] duration-300 group-hover:justify-center group-focus-visible:justify-center">
        <Heading
          level={3}
          size="subtitle"
          tone="onDark"
          font="serif"
          className="max-w-full text-center text-white lg:whitespace-nowrap"
        >
          {label}
        </Heading>

        <div className="grid w-full grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
          <div className="min-h-0 overflow-hidden">
            <span
              className="mx-auto mt-3 block h-px w-10 bg-brand-sky"
              aria-hidden="true"
            />
            <p className="mx-auto mt-4 max-w-[36ch] text-body font-medium text-white">
              {description}
            </p>
            <span className="mt-6 inline-flex min-h-cta min-w-cta-wide items-center justify-center rounded-pill bg-brand-sky px-cta-x py-cta-y text-button font-medium text-white shadow-button">
              Learn More
            </span>
          </div>
        </div>
      </div>
    </article>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group block rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
      >
        {content}
      </a>
    );
  }

  return <div className="group">{content}</div>;
};
