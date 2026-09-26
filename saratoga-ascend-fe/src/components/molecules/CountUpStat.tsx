'use client';

import React, { useEffect, useRef, useState } from 'react';

/** Figma Numbers1: each column is a 0–9 strip, line box 135px on a 120px face. */
const LINE_EM = 1.125;
const SPIN_MS = 1000;

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return {
    digits: (match?.[1] ?? '0').split('').map(Number),
    suffix: match?.[2] ?? '',
  };
}

function DigitReel({
  digit,
  hovered,
  index,
  reduceMotion,
}: {
  digit: number;
  hovered: boolean;
  index: number;
  reduceMotion: boolean;
}) {
  const rest = 10 + digit;
  const spun = index % 2 === 0 ? 20 + digit : digit;
  const offset = reduceMotion || !hovered ? rest : spun;
  const strip = Array.from({ length: 30 }, (_, i) => i % 10);

  return (
    <span className="inline-block h-[1.125em] w-[1ch] overflow-hidden align-top text-center">
      <span
        className="flex flex-col will-change-transform"
        style={{
          transform: `translate3d(0, ${-offset * LINE_EM}em, 0)`,
          transitionProperty: 'transform',
          transitionDuration: reduceMotion ? '0ms' : `${SPIN_MS}ms`,
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        {strip.map((n, i) => (
          <span key={`${n}-${i}`} className="block h-[1.125em] leading-none">
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
}

/**
 * Placements numeral (Figma Numbers1). The resting frame already reads the
 * CMS value. Hover smart-animates each reel one full cycle in 1s ease-in-out
 * and lands on the same digits; pointer leave plays that spin in reverse.
 */
export const CountUpStat: React.FC<CountUpStatProps> = ({
  value,
  className = '',
}) => {
  const { digits, suffix } = parseStat(value);
  const [hovered, setHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <span
      className={`inline-flex items-start leading-none ${className}`.trim()}
      aria-label={value}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <span aria-hidden="true" className="inline-flex items-start">
        {digits.map((digit, index) => (
          <DigitReel
            key={`${value}-${index}`}
            digit={digit}
            hovered={hovered}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
        {suffix}
      </span>
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
