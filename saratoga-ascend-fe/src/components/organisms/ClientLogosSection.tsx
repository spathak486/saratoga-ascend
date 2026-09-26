'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Heading, Text } from '../atoms';
import { ClientLogoCard } from '../molecules/ClientLogoCard';
import type { StrapiImage } from '@/lib/schemas';

const DWELL_MS = 800;
const SLIDE_MS = 1022;
const GENTLE = 'cubic-bezier(0.42, 0, 0.58, 1)';
const CARD_GAP_PX = 75;
const DRAG_THRESHOLD_PX = 40;

const FALLBACK_LOGOS = [
  { name: 'United States Air Force', src: '/images/image%2011.png' },
  { name: 'National Institutes of Health', src: '/images/image%209.png' },
  {
    name: 'United States Coast Guard',
    src: '/images/Screenshot%202026-07-21%20at%2011.23.40%E2%80%AFPM%201.png',
  },
] as const;

interface ClientLogosectionProps {
  title?: string;
  description?: string;
  logos?: StrapiImage[];
}

/**
 * Our Clients — Figma 2002:1105. CMS logos win; local Figma marks fill in
 * when Strapi has not sent a list yet.
 */
export const ClientLogosSection: React.FC<ClientLogosectionProps> = ({
  title,
  description,
  logos,
}) => {
  const cmsItems =
    logos && logos.length > 0
      ? logos.map((logo) => ({
          name: logo.alternativeText || 'Client logo',
          src: logo.url,
        }))
      : [];
  const items = cmsItems.length > 0 ? cmsItems : [...FALLBACK_LOGOS];
  const heading = title ?? (cmsItems.length === 0 ? 'Our Clients' : undefined);
  const lede =
    description ??
    (cmsItems.length === 0 ? 'Success is built on consistent effort.' : undefined);
  const loop = items.length > 1 ? [...items, ...items] : items;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [snap, setSnap] = useState(false);
  const [stepPx, setStepPx] = useState(545);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number } | null>(null);

  const measure = useCallback(() => {
    const first = trackRef.current?.querySelector<HTMLElement>('[data-client-logo]');
    if (!first) return;
    setStepPx(first.offsetWidth + CARD_GAP_PX);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, items.length]);

  const step = useCallback(
    (delta: 1 | -1) => {
      if (items.length < 2) return;
      setIndex((current) => current + delta);
    },
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timer = window.setTimeout(() => step(1), DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, items.length, step]);

  const finishSlide = () => {
    if (items.length < 2 || index < items.length) return;
    setSnap(true);
    setIndex(index % items.length);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setSnap(false));
    });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    drag.current = { x: event.clientX };
    setPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    setPaused(false);
    if (!start) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
    step(dx < 0 ? 1 : -1);
  };

  if (!title && !description && items.length === 0) return null;

  const active = items.length < 2 ? 0 : ((index % items.length) + items.length) % items.length;

  return (
    <section
      aria-labelledby={heading ? 'client-logos-heading' : undefined}
      aria-label={heading ? undefined : 'Our clients'}
      className="mt-10 overflow-hidden py-10"
      style={{
        backgroundImage:
          'linear-gradient(159.05deg, var(--color-brand-surface-muted) 0%, var(--color-brand-surface-sunk) 100%)',
      }}
    >
      <div className="flex flex-col gap-[3.75rem]">
        {heading || lede ? (
          <Container>
            <div className="flex w-full flex-col items-start gap-3">
              {heading ? (
                <Heading
                  id="client-logos-heading"
                  level={2}
                  size="section"
                  tone="inherit"
                  className="text-brand-cta-from"
                >
                  {heading}
                </Heading>
              ) : null}
              {lede ? (
                <Text size="sectionLead" tone="inherit" className="text-ink">
                  {lede}
                </Text>
              ) : null}
            </div>
          </Container>
        ) : null}

        <div
          className={`relative overflow-hidden ${paused ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
            setPaused(false);
          }}
        >
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{
              gap: `${CARD_GAP_PX}px`,
              transform: `translate3d(${-index * stepPx}px, 0, 0)`,
              transition: snap ? 'none' : `transform ${SLIDE_MS}ms ${GENTLE}`,
            }}
            aria-label="Client organisations"
            role="group"
            aria-roledescription="carousel"
            onTransitionEnd={finishSlide}
          >
            {loop.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                data-client-logo
                className="shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-hidden={i % items.length !== active}
              >
                <ClientLogoCard name={logo.name} src={logo.src} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
