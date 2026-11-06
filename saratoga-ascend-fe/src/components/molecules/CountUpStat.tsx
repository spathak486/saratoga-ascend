'use client';

import React, { useEffect, useRef, useState } from 'react';

/** Figma Numbers1: each column is a 0–9 strip, line box 135px on a 120px face. */
const LINE_EM = 1.125;
/** Slow reel so the count reads clearly when the stats band scrolls into view. */
const SPIN_MS = 2800;

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
  reduceMotion,
  playId,
}: {
  digit: number;
  active: boolean;
  index: number;
  reduceMotion: boolean;
  /** Bumps on each fresh section enter so the reel can restart from 0. */
  playId: number;
}) {
  // Alternating columns travel the long way so the bank doesn't move in lockstep.
  const from = 10;
  const to = index % 2 === 0 ? 20 + digit : 10 + digit;
  const [offset, setOffset] = useState(from);
  const settled = useRef(false);
  const strip = Array.from({ length: 30 }, (_, i) => i % 10);

  useEffect(() => {
    if (reduceMotion) {
      setOffset(to);
      settled.current = true;
      return;
    }

    if (!active) {
      // Hold the final number while scrolling inside/away — never flash 000.
      if (playId > 0) {
        setOffset(to);
        settled.current = true;
      }
      return;
    }

    // Fresh enter (or replay): start at 0, then roll up.
    settled.current = false;
    setOffset(from);
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setOffset(to);
        settled.current = true;
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [active, playId, reduceMotion, from, to]);

  const isRolling = active && offset === to && !reduceMotion;

  return (
    <span className="inline-block h-[1.125em] w-[1ch] overflow-hidden align-top text-center">
      <span
        className="flex flex-col will-change-transform"
        style={{
          transform: `translate3d(0, ${-offset * LINE_EM}em, 0)`,
          transitionProperty: 'transform',
          transitionDuration: isRolling ? `${SPIN_MS}ms` : '0ms',
          transitionTimingFunction: 'ease-in-out',
          transitionDelay: isRolling ? `${index * 80}ms` : '0ms',
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
  /** When true, reels roll from 0 to the CMS value (section scrolled into view). */
  active?: boolean;
  /** Increments each time the section is entered so the count can replay. */
  playId?: number;
}

/**
 * Achievement numeral (Figma Numbers1). Digits count up when the section
 * enters view. Leaving the section keeps the final value (no 000 flash);
 * re-entering from above or below replays the count.
 */
export const CountUpStat: React.FC<CountUpStatProps> = ({
  value,
  className = '',
  active = false,
  playId = 0,
}) => {
  const { digits, suffix } = parseStat(value);
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
    >
      <span aria-hidden="true" className="inline-flex items-start">
        {digits.map((digit, index) => (
          <DigitReel
            key={`${value}-${index}`}
            digit={digit}
            active={active}
            index={index}
            reduceMotion={reduceMotion}
            playId={playId}
          />
        ))}
        {suffix}
      </span>
    </span>
  );
};

/**
 * Tracks section visibility. `playId` bumps only on a true leave→enter so
 * small scrolls inside the section do not restart the counters.
 */
export function useInViewReplay<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [playId, setPlayId] = useState(0);
  const wasInView = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (visible && !wasInView.current) {
          setPlayId((id) => id + 1);
        }
        wasInView.current = visible;
      },
      {
        threshold,
        root: null,
        // Generous margins so peeking the cards while stats are near the
        // fold does not count as leaving the achievements band.
        rootMargin: '20% 0px 20% 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView, playId };
}
