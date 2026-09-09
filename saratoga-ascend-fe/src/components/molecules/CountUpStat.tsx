'use client';

import React, { useEffect, useRef, useState } from 'react';

const BASE_MS = 1600;
const STEP_MS = 280;
const STAGGER_MS = 140;

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return {
    digits: (match?.[1] ?? '0').split('').map(Number),
    suffix: match?.[2] ?? '',
  };
}

function DigitReel({
  digit,
  active,
  index,
}: {
  digit: number;
  active: boolean;
  index: number;
}) {
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(false);
  const cycles = 1 + Math.min(index, 2);

  useEffect(() => {
    if (!active) {
      setAnimate(false);
      setOffset(0);
      return undefined;
    }

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setAnimate(false);
      setOffset(digit);
      return undefined;
    }

    const start = window.setTimeout(() => {
      setAnimate(true);
      setOffset(cycles * 10 + digit);
    }, 40 + index * STAGGER_MS);

    return () => window.clearTimeout(start);
  }, [active, cycles, digit, index]);

  const strip = Array.from({ length: cycles * 10 + 10 }, (_, i) => i % 10);

  return (
    <span className="inline-block h-[1em] w-[1ch] overflow-hidden align-top text-center leading-none">
      <span
        className="flex flex-col will-change-transform motion-reduce:transition-none"
        style={{
          transform: `translate3d(0, ${-offset}em, 0)`,
          transitionProperty: 'transform',
          transitionDuration: animate ? `${BASE_MS + index * STEP_MS}ms` : '0ms',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        {strip.map((n, i) => (
          <span key={`${n}-${i}`} className="block h-[1em] leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export interface CountUpStatProps {
  value: string;
  className?: string;
  /** When true, each digit reel rolls to its target. */
  active: boolean;
}

/**
 * Odometer / slot-machine numerals (Figma Numbers1): each digit rolls on its
 * own reel, later places spinning longer. Triggered on scroll-into-view.
 */
export const CountUpStat: React.FC<CountUpStatProps> = ({
  value,
  className = '',
  active,
}) => {
  const { digits, suffix } = parseStat(value);

  return (
    <span className={`inline-flex items-start leading-none ${className}`.trim()}>
      {digits.map((digit, index) => (
        <DigitReel
          key={`${value}-${index}`}
          digit={digit}
          active={active}
          index={index}
        />
      ))}
      {suffix}
    </span>
  );
};

/** True while the watched node is on screen — used to start the digit roll
 *  when the stats band scrolls into view, not on first paint of the page. */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.45) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold,
        root: null,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
