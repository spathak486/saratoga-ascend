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
  /** Optional left-card photo for this slide. Falls back to the section photo. */
  imageSrc?: string;
}

export interface ServiceLineSlide {
  index: number;
  fromIndex: number | null;
  dir: 1 | -1;
  moved: boolean;
  step: (delta: 1 | -1) => void;
}

export interface ServiceLineCardProps {
  lines: ServiceLine[];
  slide: ServiceLineSlide;
}

/** Figma dissolve — opacity only, no slide. */
export const SLIDE_MS = 800;
export const SLIDE_EASE = 'ease-[cubic-bezier(0.4,0,0.2,1)]';

export function slidePaneClass(kind: 'outgoing' | 'incoming', _dir: 1 | -1, moved: boolean) {
  const base = `absolute inset-0 transition-opacity duration-[800ms] ${SLIDE_EASE} motion-reduce:transition-none`;
  if (kind === 'outgoing') {
    return `${base} ${moved ? 'opacity-0' : 'opacity-100'}`;
  }
  return `${base} z-10 ${moved ? 'opacity-100' : 'opacity-0'}`;
}

/**
 * Shared What We Do carousel so the left photo and middle copy stay in lockstep.
 */
export function useServiceLineSlide(length: number): ServiceLineSlide {
  const [index, setIndex] = useState(0);
  const [fromIndex, setFromIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [moved, setMoved] = useState(false);

  const isSliding = fromIndex !== null;

  const step = (delta: 1 | -1) => {
    if (length < 2 || isSliding) return;

    const next = (index + delta + length) % length;
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

  useEffect(() => {
    if (length === 0) {
      setIndex(0);
      return;
    }
    if (index >= length) setIndex(0);
  }, [index, length]);

  return { index, fromIndex, dir, moved, step };
}

function SlideBody({ line }: { line: ServiceLine }) {
  return (
    <div className="flex flex-col gap-[1.875rem]">
      <Heading level={3} size="feature" tone="ink" className="text-ink">
        {line.heading}
      </Heading>

      <div className="flex flex-col gap-5">
        <Text size="cardCopy" tone="navy">
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
 * Centre card on the What We Do band. Slide state is owned by the section
 * so the left photo can move on the same beat.
 */
export const ServiceLineCard: React.FC<ServiceLineCardProps> = ({ lines, slide }) => {
  const { index, fromIndex, dir, moved, step } = slide;
  const line = lines[index];
  const isSliding = fromIndex !== null;

  if (!line) return null;

  return (
    <article className="flex h-full min-h-0 flex-col gap-[1.875rem] rounded-frame border border-brand-line bg-white p-5 xl:min-h-[39.625rem]">
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
            <div className={`${slidePaneClass('outgoing', dir, moved)} flex flex-col`} aria-hidden="true">
              <SlideBody line={lines[fromIndex]} />
            </div>
            <div className={`${slidePaneClass('incoming', dir, moved)} flex flex-col`}>
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
          className="h-auto min-h-0 min-w-0 flex-1 justify-center px-6 py-3 font-bold sm:flex-none sm:px-6 sm:py-3"
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
