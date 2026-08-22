'use client';

import React from 'react';
import Image from 'next/image';
import { GeneralLink, Heading, MediaFrame, Text } from '../atoms';

const FEATURE_COPY = {
  category: 'Healthcare',
  role: 'Medical Pharmacist',
  blurb:
    'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.',
} as const;

export interface HealthcareFeatureCardProps {
  personSrc?: string;
  location?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Navy healthcare feature band — copy left, scaled portrait right, fully
 * contained inside the card (no bleed into the section below).
 */
export const HealthcareFeatureCard: React.FC<HealthcareFeatureCardProps> = ({
  personSrc = '/images/phase5/phase5-nurse.png',
  location = 'Chicago',
  onPrev,
  onNext,
}) => (
  <article className="relative overflow-hidden rounded-card bg-brand-navy-band text-brand-on-dark">
    {/* Watermark */}
    <p
      className="pointer-events-none absolute top-[-1.625rem] left-[clamp(1rem,3.125vw,3.75rem)] font-serif text-[clamp(4rem,11.17vw,13.4rem)] leading-[1.15] text-[#fffefe] opacity-10 select-none whitespace-nowrap xl:left-1/2 xl:-translate-x-[12rem]"
      aria-hidden="true"
    >
      {FEATURE_COPY.category}
    </p>

    <div className="relative z-[1] grid min-h-[clamp(28rem,36.46vw,43.75rem)] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      {/* Copy column */}
      <div className="relative z-[2] flex flex-col p-[clamp(1.25rem,3.125vw,3.75rem)]">
        <button
          type="button"
          className="inline-flex h-[clamp(2.75rem,3.125vw,3.75rem)] w-fit min-w-[clamp(9rem,9.375vw,11.25rem)] items-center justify-center gap-3 rounded-pill border border-brand-on-dark px-6 text-button font-medium text-brand-on-dark shadow-button"
          aria-haspopup="listbox"
          aria-label={`Location: ${location}`}
        >
          {location}
          <Image
            src="/images/phase5/phase5-chevron-white.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden
            className="size-4 shrink-0"
          />
        </button>

        <Heading
          level={2}
          tone="onDark"
          font="serif"
          className="mt-[clamp(2rem,5vw,5.5rem)] text-[clamp(2.25rem,4.69vw,5.625rem)] leading-[1.15] text-[#fffefe]"
        >
          {FEATURE_COPY.category}
        </Heading>

        <p className="mt-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(1.125rem,1.46vw,1.75rem)] font-bold leading-[1.2] text-brand-blue-soft">
          {FEATURE_COPY.role}
        </p>

        <Text size="body" tone="onDark" className="mt-[clamp(0.75rem,1.25vw,1rem)] max-w-[36ch]">
          {FEATURE_COPY.blurb}
        </Text>

        <GeneralLink
          href="/careers"
          variant="button"
          buttonVariant="solidNavy"
          size="ctaPill"
          className="mt-[clamp(1.5rem,2.5vw,2.5rem)] w-fit min-w-[clamp(9rem,9.375vw,11.25rem)] justify-center border-0 bg-brand-cta-to hover:opacity-90 lg:mt-auto"
        >
          Explore Jobs
        </GeneralLink>
      </div>

      {/* Portrait — scaled to fit inside the card, feet aligned to bottom */}
      <div className="flex justify-center px-[clamp(1.25rem,3.125vw,3.75rem)] pb-[clamp(1.25rem,3.125vw,3.75rem)] lg:justify-end lg:px-[clamp(1rem,3.125vw,3.75rem)] lg:pb-0">
        <div className="relative h-[clamp(13rem,28vw,32rem)] w-[clamp(9rem,18vw,22rem)] shrink-0">
          <MediaFrame
            src={personSrc}
            alt=""
            pendingLabel="healthcare-portrait.png"
            tone="navyCard"
            sizes="(max-width: 1024px) 40vw, 22rem"
            imageClassName="object-contain! object-bottom!"
            className="size-full border-0 bg-transparent"
          />
        </div>
      </div>
    </div>

    {/* Carousel arrows — xl+ only */}
    <button
      type="button"
      onClick={onPrev}
      aria-label="Previous healthcare role"
      className="absolute top-1/2 left-[calc(50%-5.625rem)] z-[3] hidden size-[3.75rem] -translate-y-1/2 xl:block"
    >
      <Image
        src="/images/phase5/phase5-feature-prev.svg"
        alt=""
        width={60}
        height={60}
        aria-hidden
        className="size-full"
      />
    </button>
    <button
      type="button"
      onClick={onNext}
      aria-label="Next healthcare role"
      className="absolute top-1/2 right-[clamp(1.25rem,3.125vw,3.75rem)] z-[3] hidden size-[3.75rem] -translate-y-1/2 xl:block"
    >
      <span className="flex size-full -scale-y-100 rotate-180">
        <Image
          src="/images/phase5/phase5-feature-next.svg"
          alt=""
          width={60}
          height={60}
          aria-hidden
          className="size-full"
        />
      </span>
    </button>
  </article>
);
