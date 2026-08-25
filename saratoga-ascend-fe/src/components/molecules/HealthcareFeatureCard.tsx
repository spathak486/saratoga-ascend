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

const INSET = 'clamp(1.25rem, 3.125vw, 3.75rem)';
const PILL =
  'inline-flex h-cta w-[11.25rem] min-w-[11.25rem] items-center justify-center gap-3 rounded-pill px-6 text-button font-medium text-brand-on-dark shadow-button';

export interface HealthcareFeatureCardProps {
  personSrc?: string;
  location?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Navy healthcare feature band (Figma node 13:224). Chicago and Explore Jobs
 * share the 60px inset and 180×60 pill size; the portrait is clipped to the
 * 700px stage rather than scaled to fit.
 */
export const HealthcareFeatureCard: React.FC<HealthcareFeatureCardProps> = ({
  personSrc = '/images/phase5/phase5-nurse.png',
  location = 'Chicago',
  onPrev,
  onNext,
}) => (
  <article className="relative overflow-hidden rounded-card bg-brand-navy-band text-brand-on-dark xl:aspect-[1680/700]">
    <p
      className="pointer-events-none absolute top-[-1.625rem] left-1/2 hidden -translate-x-[12rem] font-serif text-[13.4rem] leading-[1.15] text-[#fffefe] opacity-10 select-none whitespace-nowrap xl:block"
      aria-hidden="true"
    >
      {FEATURE_COPY.category}
    </p>

    {/* Portrait — 700×1068, clipped by the 700px stage */}
    <div
      className="relative mx-auto mt-6 h-[min(22rem,70vw)] w-[min(16rem,55vw)] xl:absolute xl:top-[-10px] xl:right-[9.52%] xl:mx-0 xl:mt-0 xl:h-[152.57%] xl:w-[41.67%]"
    >
      <MediaFrame
        src={personSrc}
        alt=""
        pendingLabel="healthcare-portrait.png"
        tone="navyCard"
        sizes="(max-width: 1280px) 55vw, 700px"
        imageClassName="object-contain! object-bottom!"
        className="size-full border-0 bg-transparent"
      />
    </div>

    <button
      type="button"
      className={`${PILL} absolute z-[2] hidden border border-brand-on-dark bg-transparent xl:inline-flex`}
      style={{ top: INSET, left: INSET }}
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

    <div className="relative z-[2] flex flex-col px-[clamp(1.25rem,3.125vw,3.75rem)] pt-6 pb-8 xl:absolute xl:top-1/2 xl:left-[clamp(1.25rem,3.125vw,3.75rem)] xl:w-[min(36%,32rem)] xl:-translate-y-1/2 xl:p-0">
      <button
        type="button"
        className={`${PILL} mb-8 border border-brand-on-dark bg-transparent xl:hidden`}
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
        size="hero"
        tone="onDark"
        font="serif"
        className="text-[#fffefe]"
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
        variant="unstyled"
        className={`${PILL} mt-8 bg-brand-cta-to hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-on-dark xl:hidden`}
      >
        Explore Jobs
      </GeneralLink>
    </div>

    <GeneralLink
      href="/careers"
      variant="unstyled"
      className={`${PILL} absolute z-[2] hidden bg-brand-cta-to hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-on-dark xl:inline-flex`}
      style={{ bottom: INSET, left: INSET }}
    >
      Explore Jobs
    </GeneralLink>

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
