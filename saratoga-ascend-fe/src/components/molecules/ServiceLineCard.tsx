'use client';

import React, { useState } from 'react';
import { CtaButton } from './CtaButton';
import { CircleControl } from './CircleControl';
import { Heading, Text } from '../atoms';
import { ServiceFeatureRow } from './ServiceFeatureRow';

export interface ServiceLine {
  heading: string;
  blurb: string;
  features: string[];
  href: string;
}

export interface ServiceLineCardProps {
  lines: ServiceLine[];
}

/**
 * The centre card on the What We Do band. Service lines rotate in place —
 * same pattern as the healthcare carousel, without a scroll track that would
 * clip the card's border or shift the three-column grid.
 */
export const ServiceLineCard: React.FC<ServiceLineCardProps> = ({ lines }) => {
  const [index, setIndex] = useState(0);
  const line = lines[index];

  const step = (delta: number) =>
    setIndex((current) => (current + delta + lines.length) % lines.length);

  return (
    <article className="flex min-h-0 flex-col rounded-card border border-brand-line bg-brand-surface p-[clamp(1.25rem,2.08vw,2.5rem)] xl:min-h-[clamp(28rem,34.58vw,41.5rem)]">
      <div
        className="flex flex-1 flex-col"
        role="group"
        aria-roledescription="carousel"
        aria-label="Service lines"
        aria-live="polite"
      >
        <Heading level={3} size="feature" tone="ink" className="mt-[clamp(1rem,2vw,2.5rem)]">
          {line.heading}
        </Heading>

        <Text size="body" tone="navy" className="mt-[clamp(1rem,1.5vw,1.5rem)] max-w-[29rem]">
          {line.blurb}
        </Text>

        <ul className="mt-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-[clamp(0.75rem,1.5vw,1.5rem)]">
          {line.features.map((feature) => (
            <ServiceFeatureRow key={feature} label={feature} />
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-[clamp(1.5rem,2.5vw,2.5rem)] sm:justify-center sm:gap-[clamp(1rem,2vw,1.375rem)]">
        <CircleControl
          label="Previous service line"
          direction="prev"
          tone="light"
          onClick={() => step(-1)}
          className="size-12 shrink-0 sm:size-[3.75rem]"
        />

        <CtaButton
          href={line.href}
          shape="pill"
          showArrow={false}
          className="h-12 min-w-0 flex-1 justify-center px-4 sm:h-[3.75rem] sm:w-[11.25rem] sm:max-w-[11.25rem] sm:min-w-[11.25rem] sm:flex-none sm:px-6 sm:py-4"
        >
          Learn More
        </CtaButton>

        <CircleControl
          label="Next service line"
          direction="next"
          tone="light"
          onClick={() => step(1)}
          className="size-12 shrink-0 sm:size-[3.75rem]"
        />
      </div>
    </article>
  );
};
