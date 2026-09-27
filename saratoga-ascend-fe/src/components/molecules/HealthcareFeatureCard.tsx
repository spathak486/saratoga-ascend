'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { GeneralLink, Heading, MediaFrame, Text } from '../atoms';

export interface HealthcareRoleSlide {
  category: string;
  role: string;
  blurb: string;
  personSrc?: string;
}

const ROLE_BLURB =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';

/** Figma Healthcare variants — copy only. Portraits come from backend props. */
const DEFAULT_SLIDES: readonly HealthcareRoleSlide[] = [
  { category: 'Healthcare', role: 'Medical Pharmacist', blurb: ROLE_BLURB },
  { category: 'Travel Staffing', role: 'Medical Pharmacist', blurb: ROLE_BLURB },
  { category: 'Medicine', role: 'Medical Pharmacist', blurb: ROLE_BLURB },
];

const EXIT_MS = 780;
const FADE_MS = 0.8;
const AUTO_MS = 5500;
const CIRCULAR_BG = '/images/circular-bg.gif';
const FALLBACK_PERSON = '/images/phase5/phase5-nurse.png';
const PILL =
  'inline-flex h-[3.75rem] w-[11.25rem] items-center justify-center rounded-pill bg-brand-cta-to px-6 text-button font-medium text-white shadow-button hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-on-dark';
const PORTRAIT_BOX =
  'absolute top-4 left-1/2 h-[min(22rem,70vw)] w-[min(16rem,55vw)] -translate-x-1/2 xl:top-[-10px] xl:right-[9.52%] xl:left-auto xl:h-[152.57%] xl:w-[41.67%] xl:translate-x-0';
const SWIPE_THRESHOLD_PX = 40;
const EASE_ENTER = [0.16, 1, 0.3, 1] as const;
const EASE_EXIT = [0.4, 0, 0.2, 1] as const;
const EASE_FADE = [0.4, 0, 0.2, 1] as const;
const REST = { x: 0, y: 0, scale: 1, opacity: 1 };
const ENTER_FROM = { x: '28%', y: '-36%', scale: 0.92, opacity: 0 };
const EXIT_LEFT = { x: '-46%', y: '8%', scale: 0.96, opacity: 0 };
const EXIT_TOP_RIGHT = { x: '28%', y: '-36%', scale: 0.92, opacity: 0 };

type NavDir = 1 | -1;

export interface HealthcareFeatureCardProps {
  personSrc?: string;
  heartSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
  slides?: readonly HealthcareRoleSlide[];
}

function buildFrames(
  slides: readonly HealthcareRoleSlide[] | undefined,
  personSrc?: string
): HealthcareRoleSlide[] {
  const copySlides = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;

  return copySlides.map((slide) => ({
    ...slide,
    personSrc: slide.personSrc || personSrc,
  }));
}

function Portrait({ src }: { src: string }) {
  return (
    <MediaFrame
      src={src}
      alt=""
      pendingLabel="healthcare-portrait.png"
      tone="navyCard"
      sizes="(max-width: 1280px) 55vw, 700px"
      imageClassName="object-contain! object-bottom!"
      className="size-full border-0 bg-transparent"
    />
  );
}

function MotionPortrait({
  src,
  variant,
  dir,
  floating,
  onComplete,
}: {
  src: string;
  variant: 'enter' | 'exit';
  dir: NavDir;
  floating?: boolean;
  onComplete?: () => void;
}) {
  const reduce = useReducedMotion();
  const exitTarget = dir === 1 ? EXIT_LEFT : EXIT_TOP_RIGHT;

  return (
    <div className={PORTRAIT_BOX}>
      <motion.div
        className="size-full"
        initial={reduce ? REST : variant === 'enter' ? ENTER_FROM : REST}
        animate={reduce ? REST : variant === 'exit' ? exitTarget : REST}
        transition={
          reduce
            ? { duration: 0 }
            : {
                duration: variant === 'exit' ? 0.78 : 1.2,
                ease: variant === 'exit' ? EASE_EXIT : EASE_ENTER,
              }
        }
        onAnimationComplete={() => onComplete?.()}
      >
        <motion.div
          className="size-full"
          animate={reduce || !floating || variant === 'exit' ? { y: 0 } : { y: [0, -12, 0] }}
          transition={
            reduce || !floating || variant === 'exit'
              ? { duration: 0 }
              : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <Portrait src={src} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function FadeCopy({
  slide,
  fadingIn,
}: {
  slide: HealthcareRoleSlide;
  fadingIn: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-[1.875rem]"
      initial={reduce || !fadingIn ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : { duration: FADE_MS, ease: EASE_FADE }}
    >
      <div className="flex flex-col gap-[1.875rem]">
        <Heading level={2} size="hero" tone="onDark" font="serif" className="text-[#fffefe]">
          {slide.category}
        </Heading>
        <p className="text-card-copy font-bold leading-[1.2] text-brand-blue-soft">{slide.role}</p>
      </div>
      <Text size="cardCopy" tone="onDark">
        {slide.blurb}
      </Text>
    </motion.div>
  );
}

/**
 * Hero carousel: backend portraits only. Content fades; images use the
 * directional Motion enter/exit. CMS mapping stays in the parent.
 */
export const HealthcareFeatureCard: React.FC<HealthcareFeatureCardProps> = ({
  personSrc,
  heartSrc = '/images/phase5/phase5-heart.png',
  ctaLabel = 'Explore Jobs',
  ctaHref = '/careers',
  slides,
}) => {
  const frames = useMemo(() => buildFrames(slides, personSrc), [slides, personSrc]);
  const canRotate = frames.length > 1;

  const [index, setIndex] = useState(0);
  const [fromIndex, setFromIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<NavDir>(1);
  const [settled, setSettled] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const safeIndex = frames.length === 0 ? 0 : index % frames.length;
  const isSliding = fromIndex !== null;
  const incoming = frames[safeIndex];
  const outgoing = fromIndex !== null ? frames[fromIndex] : undefined;
  const incomingSrc = incoming?.personSrc ?? (frames.length === 0 ? FALLBACK_PERSON : undefined);
  const outgoingSrc = outgoing?.personSrc;

  const step = (delta: NavDir) => {
    if (!canRotate || isSliding) return;

    const next = (safeIndex + delta + frames.length) % frames.length;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setDir(delta);

    if (reduceMotion) {
      setIndex(next);
      setSettled(true);
      return;
    }

    setFromIndex(safeIndex);
    setIndex(next);
    setSettled(false);
  };

  useEffect(() => {
    if (fromIndex === null) return undefined;

    const timer = window.setTimeout(() => setFromIndex(null), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [fromIndex]);

  useEffect(() => {
    if (!canRotate || isSliding || !settled) return undefined;

    const timer = window.setTimeout(() => step(1), AUTO_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeIndex, isSliding, canRotate, settled, frames.length]);

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !canRotate) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;

    step(dx < 0 ? 1 : -1);
  };

  if (!incoming || !incomingSrc) return null;

  return (
    <article
      className="relative overflow-hidden rounded-frame border border-brand-line xl:aspect-[1680/700]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-brand-navy-band" aria-hidden="true">
        <img
          src={CIRCULAR_BG}
          alt=""
          className="absolute inset-0 size-full object-cover motion-reduce:invisible"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {outgoingSrc ? (
          <MotionPortrait key={`out-${fromIndex}`} src={outgoingSrc} variant="exit" dir={dir} />
        ) : null}
        <MotionPortrait
          key={`in-${safeIndex}`}
          src={incomingSrc}
          variant="enter"
          dir={dir}
          floating={settled && !isSliding}
          onComplete={() => setSettled(true)}
        />
      </div>

      <div
        className="pointer-events-none absolute top-[calc(50%-26.47rem)] right-[1.5rem] z-[2] hidden h-[6.8125rem] w-[4.8125rem] xl:block"
        aria-hidden="true"
      >
        <Image
          src={heartSrc}
          alt=""
          width={77}
          height={109}
          className="animate-heart-float size-full object-contain motion-reduce:animate-none"
        />
      </div>

      <div className="relative z-[2] min-h-[28rem] xl:absolute xl:inset-0 xl:min-h-0">
        <p
          className="pointer-events-none absolute top-0 left-[38.5%] hidden h-[1em] font-serif text-[13.375rem] leading-[1.15] text-[#fffefe] opacity-10 select-none whitespace-nowrap xl:block"
          aria-hidden="true"
        >
          {outgoing ? (
            <motion.span
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: FADE_MS, ease: EASE_FADE }}
            >
              {outgoing.category}
            </motion.span>
          ) : null}
          <motion.span
            key={`wm-${safeIndex}`}
            className="absolute inset-0"
            initial={isSliding ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: FADE_MS, ease: EASE_FADE }}
          >
            {incoming.category}
          </motion.span>
        </p>
        <div className="relative z-[2] flex h-full max-w-[44.875rem] flex-col justify-center gap-[1.875rem] px-6 py-8 xl:px-10 xl:py-5">
          <div className="relative">
            {outgoing ? (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: FADE_MS, ease: EASE_FADE }}
              >
                <FadeCopy slide={outgoing} fadingIn={false} />
              </motion.div>
            ) : null}
            <FadeCopy slide={incoming} fadingIn={isSliding} />
          </div>
          <GeneralLink href={ctaHref} variant="unstyled" className={PILL}>
            {ctaLabel}
          </GeneralLink>
        </div>
      </div>

      {canRotate ? (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous healthcare slide"
            className="absolute top-1/2 left-[calc(50%-5.625rem)] z-[3] hidden size-[3.75rem] -translate-y-1/2 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 xl:block"
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
            onClick={() => step(1)}
            aria-label="Next healthcare slide"
            className="absolute top-1/2 right-10 z-[3] hidden size-[3.75rem] -translate-y-1/2 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 xl:block"
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
        </>
      ) : null}
    </article>
  );
};
