'use client';

import React, { useEffect, useState } from 'react';
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

const SLIDE_MS = 400;
const SLIDE_EASE = 'ease-[cubic-bezier(0.25,0.1,0.25,1)]';

function SlideBody({ line }: { line: ServiceLine }) {
  return (
    <div className="flex flex-col gap-[1.875rem]">
      <Heading level={3} size="feature" tone="ink">
        {line.heading}
      </Heading>

      <div className="flex flex-col gap-5">
        <Text size="body" tone="navy" className="text-card-copy">
          {line.blurb}
        </Text>

        <ul className="flex flex-col gap-4">
          {line.features.map((feature) => (
            <ServiceFeatureRow key={feature} label={feature} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Centre card on the What We Do band. Arrows slide service lines sideways
 * inside the card so the three-column grid never shifts.
 */
export const ServiceLineCard: React.FC<ServiceLineCardProps> = ({ lines }) => {
  const [index, setIndex] = useState(0);
  const [fromIndex, setFromIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [moved, setMoved] = useState(false);

  const line = lines[index];
  const isSliding = fromIndex !== null;

  const step = (delta: 1 | -1) => {
    if (isSliding) return;

    const next = (index + delta + lines.length) % lines.length;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setIndex(next);
      return;
    }

    setDir(delta);
    setFromIndex(index);
    setIndex(next);
    setMoved(false);
  };

  useEffect(() => {
    if (fromIndex === null) return undefined;

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setMoved(true));
    });
    return () => window.cancelAnimationFrame(id);
  }, [fromIndex]);

  useEffect(() => {
    if (fromIndex === null || !moved) return undefined;

    const timer = window.setTimeout(() => setFromIndex(null), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [fromIndex, moved]);

  const slideClass = `absolute inset-0 flex flex-col transition-transform duration-[400ms] ${SLIDE_EASE} motion-reduce:transition-none`;

  return (
    <article className="flex h-full min-h-0 flex-col gap-[1.875rem] rounded-frame border border-brand-line bg-brand-surface p-5 xl:min-h-[39.625rem]">
      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Service lines"
        aria-live="polite"
      >
        <div className={`flex h-full flex-col ${isSliding ? 'invisible' : ''}`}>
          <SlideBody line={isSliding ? lines[fromIndex] : line} />
        </div>

        {isSliding && (
          <>
            <div
              className={`${slideClass} ${
                moved
                  ? dir === 1
                    ? '-translate-x-full'
                    : 'translate-x-full'
                  : 'translate-x-0'
              }`}
              aria-hidden="true"
            >
              <SlideBody line={lines[fromIndex]} />
            </div>
            <div
              className={`${slideClass} ${
                moved
                  ? 'translate-x-0'
                  : dir === 1
                    ? 'translate-x-full'
                    : '-translate-x-full'
              }`}
            >
              <SlideBody line={line} />
            </div>
          </>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <CircleControl
          label="Previous service line"
          direction="prev"
          tone="iconPlay"
          onClick={() => step(-1)}
          className="size-12 shrink-0 transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:size-[3.75rem]"
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
          tone="iconPlay"
          onClick={() => step(1)}
          className="size-12 shrink-0 transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:size-[3.75rem]"
        />
      </div>
    </article>
  );
};
