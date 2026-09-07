'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GeneralLink, Heading, MediaFrame, Text } from '../atoms';

export interface HealthcareRoleSlide {
  category: string;
  role: string;
  blurb: string;
  personSrc?: string;
}

const DEFAULT_SLIDES: readonly HealthcareRoleSlide[] = [
  {
    category: 'Healthcare',
    role: 'Medical Pharmacist',
    blurb:
      'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.',
  },
];

const INSET = 'clamp(1.25rem, 3.125vw, 3.75rem)';
/* `display` is deliberately left out — Tailwind can't guarantee an unprefixed
   `inline-flex` here loses to an unprefixed `hidden` at the call site (same
   specificity, order depends on generation, not the className string), so
   each responsive pill sets its own `hidden`/`inline-flex` pair explicitly. */
const PILL =
  'h-cta w-[11.25rem] min-w-[11.25rem] items-center justify-center gap-3 rounded-pill px-6 text-button font-medium text-brand-on-dark shadow-button';

/** Horizontal drag past this many px counts as a swipe, not a scroll tap. */
const SWIPE_THRESHOLD_PX = 40;

export interface HealthcareFeatureCardProps {
  personSrc?: string;
  location?: string;
  /** Selectable cities for the location pill. Defaults to just the current
   *  `location` — the menu still opens and behaves like a real listbox, it
   *  just has one option until a real location list exists. */
  locations?: readonly string[];
  /** Role cards the prev/next controls step through. Defaults to a single
   *  slide, so the band renders exactly as before until more roles land. */
  slides?: readonly HealthcareRoleSlide[];
}

interface LocationPickerProps {
  location: string;
  options: readonly string[];
  wrapperClassName: string;
  buttonClassName: string;
}

/** Accessible single-select listbox behind the "Chicago ⌄" pill — same
 *  markup for the desktop-absolute and mobile-inline placements. */
const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  options,
  wrapperClassName,
  buttonClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(location);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${wrapperClassName}`.trim()}>
      <button
        type="button"
        className={buttonClassName}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Location: ${selected}`}
        onClick={() => setOpen((current) => !current)}
      >
        {selected}
        <Image
          src="/images/phase5/phase5-chevron-white.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden
          className={`size-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Choose a location"
          className="absolute top-[calc(100%+0.5rem)] left-0 z-10 min-w-[11.25rem] overflow-hidden rounded-[0.75rem] border border-brand-on-dark/25 bg-brand-navy-card py-1 text-button shadow-button"
        >
          {options.map((option) => (
            <li key={option} role="option" aria-selected={option === selected}>
              <button
                type="button"
                className={`flex w-full items-center px-4 py-2 text-left transition-colors duration-150 hover:bg-brand-on-dark/10 motion-reduce:transition-none ${
                  option === selected ? 'text-brand-blue-soft' : 'text-brand-on-dark'
                }`}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * Navy healthcare feature band (Figma node 13:224). Chicago and Explore Jobs
 * share the 60px inset and 180×60 pill size; the portrait is clipped to the
 * 700px stage rather than scaled to fit.
 */
export const HealthcareFeatureCard: React.FC<HealthcareFeatureCardProps> = ({
  personSrc,
  location = 'Chicago',
  locations,
  slides = DEFAULT_SLIDES,
}) => {
  const locationOptions = locations ?? [location];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const slide = slides[index];
  const resolvedPersonSrc = slide.personSrc ?? personSrc ?? '/images/phase5/phase5-nurse.png';

  const step = (delta: number) => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setIndex((current) => (current + delta + slides.length) % slides.length);
      return;
    }

    setVisible(false);
    window.setTimeout(() => {
      setIndex((current) => (current + delta + slides.length) % slides.length);
      setVisible(true);
    }, 180);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    /* A mostly-vertical drag is a page scroll, not a slide swipe. */
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;

    step(dx < 0 ? 1 : -1);
  };

  return (
    <article
      className="relative overflow-hidden rounded-card bg-brand-navy-band text-brand-on-dark xl:aspect-[1680/700]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`transition-opacity duration-200 motion-reduce:transition-none ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        role="group"
        aria-roledescription="carousel"
        aria-label="Healthcare roles"
        aria-live="polite"
      >
        {/* Spiral-line background band from Figma — sits under everything
            else, so it stays out of the tab order and never affects layout
            (absolute + no size on the parent). A slow drift keeps it premium
            rather than distracting. */}
        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden rounded-card xl:block"
          aria-hidden="true"
        >
          <img
            src="/images/Mask group-healthcare.png"
            alt=""
            className="animate-bg-drift absolute inset-0 size-full object-cover motion-reduce:animate-none"
          />
        </div>

        <p
          className="pointer-events-none absolute top-[-1.625rem] left-1/2 hidden -translate-x-[12rem] font-serif text-[13.4rem] leading-[1.15] text-[#fffefe] opacity-10 select-none whitespace-nowrap xl:block"
          aria-hidden="true"
        >
          {slide.category}
        </p>

        {/* Portrait — 700×1068, clipped by the 700px stage */}
        <div className="relative mx-auto mt-6 h-[min(22rem,70vw)] w-[min(16rem,55vw)] xl:absolute xl:top-[-10px] xl:right-[9.52%] xl:mx-0 xl:mt-0 xl:h-[152.57%] xl:w-[41.67%]">
          <MediaFrame
            src={resolvedPersonSrc}
            alt=""
            pendingLabel="healthcare-portrait.png"
            tone="navyCard"
            sizes="(max-width: 1280px) 55vw, 700px"
            imageClassName="object-contain! object-bottom!"
            className="size-full border-0 bg-transparent"
          />
        </div>

        <div className="absolute z-[2] hidden xl:block" style={{ top: INSET, left: INSET }}>
          <LocationPicker
            location={location}
            options={locationOptions}
            wrapperClassName=""
            buttonClassName={`${PILL} inline-flex border border-brand-on-dark bg-transparent`}
          />
        </div>

        <div className="relative z-[2] flex flex-col px-[clamp(1.25rem,3.125vw,3.75rem)] pt-6 pb-8 xl:absolute xl:top-1/2 xl:left-[clamp(1.25rem,3.125vw,3.75rem)] xl:w-[min(36%,32rem)] xl:-translate-y-1/2 xl:p-0">
          <LocationPicker
            location={location}
            options={locationOptions}
            wrapperClassName="mb-8 xl:hidden"
            buttonClassName={`${PILL} inline-flex border border-brand-on-dark bg-transparent`}
          />

          <Heading level={2} size="hero" tone="onDark" font="serif" className="text-[#fffefe]">
            {slide.category}
          </Heading>

          <p className="mt-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(1.125rem,1.46vw,1.75rem)] font-bold leading-[1.2] text-brand-blue-soft">
            {slide.role}
          </p>

          <Text size="body" tone="onDark" className="mt-[clamp(0.75rem,1.25vw,1rem)] max-w-[36ch]">
            {slide.blurb}
          </Text>

          <GeneralLink
            href="/careers"
            variant="unstyled"
            className={`${PILL} inline-flex mt-8 bg-brand-cta-to hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-on-dark xl:hidden`}
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
      </div>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous healthcare role"
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
        aria-label="Next healthcare role"
        className="absolute top-1/2 right-[clamp(1.25rem,3.125vw,3.75rem)] z-[3] hidden size-[3.75rem] -translate-y-1/2 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 xl:block"
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
};
