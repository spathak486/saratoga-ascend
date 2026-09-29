import React from 'react';
import { Heading, MediaFrame } from '../atoms';

export interface MarketServeCardProps {
  label: string;
  description: string;
  imageSrc?: string;
  pendingLabel?: string;
  href?: string;
}

/** Figma We serve → Variant2: Smart animate dissolve, ease-in, 300ms. */
const overlayEase =
  'transition-opacity duration-300 ease-in motion-reduce:transition-none';

/** Mobile instance of We serve is scaled from 828×480 → 390×226 (radius 18.841). */
const mobileRadius = 'max-[89.99rem]:rounded-[1.1776rem]';

/**
 * Photo tile for the Market We Serve band (Figma 828×480). Rest: title on the
 * foot scrim. Hover: fade to navy wash, sky rule, blurb, and a sky Learn More
 * pill — no slide, no ring. Below 1440px, type and radius follow mobile
 * Frame 609 (2105:636); desktop stays the original 44px / 40px treatment.
 */
export const MarketServeCard: React.FC<MarketServeCardProps> = ({
  label,
  description,
  imageSrc,
  pendingLabel = 'market-card.png',
  href,
}) => {
  const content = (
    <article
      className={`relative aspect-[828/480] min-h-[14rem] overflow-hidden rounded-card max-[89.99rem]:min-h-[14.1306rem] ${mobileRadius}`}
    >
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
        className={`bg-photo-scrim pointer-events-none absolute inset-0 z-[1] rounded-card ${mobileRadius} ${overlayEase} group-hover:opacity-0 group-focus-visible:opacity-0`}
        aria-hidden="true"
      />

      <div
        className={`absolute inset-0 z-[2] flex flex-col items-center justify-end px-6 py-[3.75rem] text-center max-[89.99rem]:py-[1.7663rem] ${overlayEase} group-hover:opacity-0 group-focus-visible:opacity-0`}
      >
        <Heading
          level={3}
          size="subtitle"
          tone="onDark"
          font="serif"
          className="max-w-full text-center text-white lg:whitespace-nowrap max-[89.99rem]:text-[1.295rem] max-[89.99rem]:leading-[1.2] max-[89.99rem]:whitespace-nowrap"
        >
          {label}
        </Heading>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center bg-[linear-gradient(180deg,rgb(20_76_121/0.45)_0%,rgb(20_76_121/0.92)_100%)] px-6 py-[3.75rem] text-center opacity-0 max-[89.99rem]:py-[1.7663rem] ${overlayEase} group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <p
          className="font-serif text-subtitle text-white lg:whitespace-nowrap max-[89.99rem]:text-[1.295rem] max-[89.99rem]:leading-[1.2]"
          aria-hidden="true"
        >
          {label}
        </p>
        <span
          className="mx-auto mt-3 block h-1 w-[130px] rounded bg-brand-sky"
          aria-hidden="true"
        />
        <p className="mx-auto mt-4 max-w-[36ch] text-body-lg font-medium text-white">
          {description}
        </p>
        <span className="mt-6 inline-flex items-center justify-center rounded-pill bg-brand-sky px-8 py-3.5 text-button font-medium text-white">
          Learn More
        </span>
      </div>
    </article>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`group block rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky ${mobileRadius}`}
      >
        {content}
      </a>
    );
  }

  return <div className="group">{content}</div>;
};
