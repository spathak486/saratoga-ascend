'use client';

import React, { useState } from 'react';
import { GeneralLink, Heading, MediaFrame, Section, Text } from '../atoms';
import { IconTextRow } from '../molecules/IconTextRow';

interface ServiceLine {
  heading: string;
  blurb: string;
  href: string;
}

const SERVICE_LINES: ServiceLine[] = [
  {
    heading: 'Healthcare',
    blurb:
      'Supporting text that will be placed here for better understanding.',
    href: '/what-we-do',
  },
  {
    heading: 'Technology',
    blurb:
      'Supporting text that will be placed here for better understanding.',
    href: '/what-we-do',
  },
  {
    heading: 'Logistics',
    blurb:
      'Supporting text that will be placed here for better understanding.',
    href: '/what-we-do',
  },
];

const LIST_ITEMS = ['Certificates', 'Information', 'Other'] as const;

const StarIcon = (
  <svg viewBox="0 0 32 32" className="size-full" aria-hidden="true">
    <path
      d="M16 1.8 L19.6 11.5 L29.8 11.9 L21.8 18.3 L24.6 28.2 L16 22.5 L7.4 28.2 L10.2 18.3 L2.2 11.9 L12.4 11.5 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * The artboard supplies these arrows as finished SVGs, so they render as
 * images rather than being rebuilt with `CircleControl`. A plain `<img>` is
 * deliberate: next/image refuses SVG unless the app opts into
 * `dangerouslyAllowSVG`, and these are trusted local assets.
 */
const ArrowButton: React.FC<{
  src: string;
  label: string;
  onClick: () => void;
}> = ({ src, label, onClick }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="w-[clamp(2.75rem,3.75vw,4.5rem)] shrink-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt="" className="block w-full" />
  </button>
);

export interface HealthcareIntroSectionProps {
  imageSrc?: string;
  logoSrc?: string;
}

export const HealthcareIntroSection: React.FC<HealthcareIntroSectionProps> = ({
  imageSrc = '/images/Mask%20group%20(3).png',
  logoSrc = '/images/Image-1%201.png',
}) => {
  const [index, setIndex] = useState(0);
  const line = SERVICE_LINES[index];

  /* Swapping the copy in place rather than scrolling a track: this column has
     to line up with the artboard exactly, and a scroll container would need
     padding of its own to keep focus rings off the clip edge. */
  const step = (delta: number) =>
    setIndex(
      (current) =>
        (current + delta + SERVICE_LINES.length) % SERVICE_LINES.length
    );

  return (
    <Section
      aria-labelledby="healthcare-intro-heading"
      tone="surface"
      spacing="md"
    >
      <div className="grid gap-block lg:grid-cols-[0.9fr_1.6fr_0.85fr] lg:items-start lg:gap-[clamp(2rem,3.5vw,3.5rem)]">
        <MediaFrame
          src={imageSrc}
          alt="Healthcare technology"
          pendingLabel="healthcare-image.jpg"
          tone="navy"
          sizes="(max-width: 1024px) 100vw, 30vw"
          className="aspect-[335/397] w-full rounded-media"
        />

        <div className="flex flex-col items-start">
          <div
            className="flex flex-col items-start"
            role="group"
            aria-roledescription="carousel"
            aria-label="What we do"
            aria-live="polite"
          >
            <Heading
              id="healthcare-intro-heading"
              level={2}
              size="display"
              tone="red"
              font="serif"
            >
              {line.heading}
            </Heading>

            <Text size="lead" tone="navy" className="mt-4 max-w-[34ch]">
              {line.blurb}
            </Text>

            <GeneralLink
              href={line.href}
              variant="button"
              buttonVariant="cta"
              size="cta"
              className="mt-6"
            >
              Learn More
            </GeneralLink>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <ArrowButton
              src="/images/ht-svg1.svg"
              label="Previous service line"
              onClick={() => step(-1)}
            />
            <ArrowButton
              src="/images/ht-svg2.svg"
              label="Next service line"
              onClick={() => step(1)}
            />
          </div>

          <ul className="mt-[clamp(2.5rem,1.875rem+3.125vw,5.625rem)] flex flex-col gap-4">
            {LIST_ITEMS.map((label) => (
              <IconTextRow key={label} icon={StarIcon} label={label} />
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-6">
          {/* Plate and its inset both scale, so the emblem keeps its proportion
              to the frame as the column narrows. */}
          <div className="aspect-square w-full max-w-[316px] rounded-tile-lg bg-brand-tile p-[clamp(1rem,0.6359rem+1.5534vw,2.5rem)]">
            <MediaFrame
              src={logoSrc}
              alt="Saratoga emblem"
              pendingLabel="butterfly-logo.png"
              tone="sky"
              sizes="316px"
              imageClassName="object-contain!"
              className="size-full"
            />
          </div>

          <div className="flex flex-col gap-4 text-body text-brand-navy">
            <p>
              Lorem ipsum is the standard placeholder text used in graphic
              design, publishing, and web
            </p>
            <p>
              development to showcase layouts and visual elements without the
              distraction of meaningful content.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
};
