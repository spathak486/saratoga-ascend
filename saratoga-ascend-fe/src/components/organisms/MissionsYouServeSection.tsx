'use client';

import { cleanHeadingHtml, stripHtml } from '@/lib/utils/text';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Heading, Section, Text } from '../atoms';

export interface MissionsYouServeCard {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | string | null;
}

export interface MissionsYouServeSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  cards?: MissionsYouServeCard[] | null;
}

const DEFAULT_CARDS: MissionsYouServeCard[] = [
  {
    title: 'Federal Government',
    description:
      'Integrated healthcare, workforce, technology, contact center, and program administration support for federal environments.',
    image: '/images/phase4/market-federal-military.png',
  },
  {
    title: 'Defense & Military',
    description:
      'Capabilities aligned to prepared teams, coordinated operations, and reliable mission-support services.',
    image: '/images/Federal & Military.png',
  },
  {
    title: 'Veterans Affairs',
    description:
      'Respectful, responsive services supporting veteran communities and the teams responsible for their care.',
    image: '/images/supporting-missions-doctor.png',
  },
  {
    title: 'State & Local Government (SLED)',
    description:
      'Flexible support aligned to evolving public-service demands, workforce needs, and program priorities.',
    image: '/images/phase4/market-state-local.png',
  },
];

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

function cardImage(card: MissionsYouServeCard, index: number): { src: string; alt: string } | null {
  const fromCard =
    typeof card.image === 'string'
      ? card.image
      : card.image && typeof card.image === 'object'
        ? card.image.url
        : null;
  const fallback = DEFAULT_CARDS[index % DEFAULT_CARDS.length]?.image;
  const fromFallback = typeof fallback === 'string' ? fallback : fallback?.url;
  // Live site pairs each CMS card with these photos. Use a CMS file when that card has no paired photo.
  const src = normalizeImageSrc(fromFallback || fromCard || '');
  if (!src) return null;
  const alt =
    typeof card.image === 'object' && card.image?.alternativeText
      ? card.image.alternativeText
      : card.title;
  return { src, alt };
}

/**
 * Built Around the Missions You Serve — Figma JzRl5kAw1Yx0qUj9MTvjkm 2:1128.
 * Desktop frame is 1920×930. The file has no tablet or mobile frame for this
 * section, and get_motion_context returned no tracks.
 */
export function MissionsYouServeSection({
  title = 'Built Around the Missions You Serve',
  highlightTitle = 'Missions You Serve',
  description = 'Explore the government environments we support and find the information most relevant to your mission.',
  cards,
}: MissionsYouServeSectionProps) {
  const displayCards: MissionsYouServeCard[] = cards && cards.length > 0 ? cards : DEFAULT_CARDS;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 1) {
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < maxScroll - 1);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [displayCards, updateScrollState]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-mission-card]');
    const track = el.firstElementChild instanceof HTMLElement ? el.firstElementChild : el;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '16') || 16;
    const step = (card?.offsetWidth ?? el.clientWidth) + gap;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  const renderTitle = () => {
    const rawTitle = title?.trim() || '';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawTitle) return null;

    if (!rawHighlight) {
      return rawTitle;
    }

    const escaped = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        const text = part.trim();
        if (!text) return null;
        return text.toLowerCase() === rawHighlight.toLowerCase() ? (
          <span key={i} className="block text-brand-red">
            {text}
          </span>
        ) : (
          <span key={i} className="block text-black">
            {text}
          </span>
        );
      });
    }

    return (
      <>
        <span className="block text-black">{rawTitle}</span>
        <span className="block text-brand-red">{rawHighlight}</span>
      </>
    );
  };

  const titleNode = renderTitle();

  return (
    <Section
      aria-labelledby={titleNode ? 'missions-you-serve-heading' : undefined}
      tone="surface"
      spacing="none"
      bleed
      className="overflow-x-clip bg-white"
    >
      {/*
        Frame 2:1128. Top inset 80px, bottom inset 80px. Title starts 103px
        down (80 + 23). Cards start 163px down (80 + 83). Buttons sit 60px
        above the card bottoms. No tablet/mobile frame exists in the file.
      */}
      <div className="relative mx-auto w-full max-w-home overflow-hidden py-10 xl:py-20">
        <div
          className="pointer-events-none absolute top-20 right-[-8.1875rem] hidden h-[39.3125rem] w-[49.6875rem] rounded-[42.667px] border-[1.5px] border-brand-red xl:block"
          aria-hidden="true"
        />

        <div className="relative z-10 xl:ps-[var(--spacing-gutter)]">
          <div className="flex flex-col gap-10 xl:grid xl:grid-cols-[minmax(0,clamp(16rem,41.06%,46.1875rem))_minmax(0,1fr)] xl:items-stretch xl:gap-x-[3.75rem]">
            <div className="flex min-w-0 flex-col ps-[var(--spacing-gutter)] pe-[var(--spacing-gutter)] xl:h-full xl:ps-0 xl:pe-0 xl:pt-[1.4375rem]">
              {titleNode ? (
                <Heading
                  id="missions-you-serve-heading"
                  level={2}
                  size="section"
                  tone="inherit"
                  className="max-w-[41.9375rem] text-black"
                  style={{ lineHeight: 1.375 }}
                >
                  {titleNode}
                </Heading>
              ) : null}

              {description ? (
                <Text
                  as="p"
                  size="lead"
                  tone="inherit"
                  className="mt-3 max-w-[40.25rem] font-normal text-black"
                  style={{ lineHeight: 1.6667 }}
                >
                  {stripHtml(description)}
                </Text>
              ) : null}

              <div className="mt-[3.75rem] h-[1.5px] w-60 bg-brand-red" aria-hidden="true" />

              <div className="mt-8 flex items-center gap-5 xl:mt-auto xl:mb-[3.75rem] xl:self-end">
                <CarouselButton
                  direction="left"
                  label="Previous mission environment"
                  disabled={!canScrollLeft}
                  onClick={() => handleScroll('left')}
                />
                <CarouselButton
                  direction="right"
                  label="Next mission environment"
                  disabled={!canScrollRight}
                  onClick={() => handleScroll('right')}
                />
              </div>
            </div>

            <div className="min-w-0 xl:pt-[5.1875rem]">
              <div
                ref={scrollContainerRef}
                className="w-full min-w-0 overflow-x-auto scroll-smooth motion-reduce:scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                tabIndex={0}
                aria-label="Government environments"
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    handleScroll('right');
                  } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    handleScroll('left');
                  }
                }}
              >
                <div className="flex w-max min-w-full snap-x snap-mandatory gap-4 ps-[var(--spacing-gutter)] pe-[var(--spacing-gutter)] xl:ps-0">
                {displayCards.map((card, idx) => {
                  const photo = cardImage(card, idx);
                  return (
                    <article
                      key={card.id ?? card.documentId ?? `mission-card-${idx}`}
                      data-mission-card
                      className="flex w-[min(85vw,20rem)] shrink-0 snap-start flex-col justify-between gap-8 rounded-panel border-[1.5px] border-brand-sky bg-[#f1f8ff] p-6 sm:w-[min(72vw,28rem)] sm:p-8 xl:min-h-[42.9375rem] xl:w-[35.9375rem] xl:p-[3.375rem]"
                    >
                      <div className="flex min-w-0 flex-col gap-[1.3333rem]">
                        {/* 40px semibold has no Heading step. The section token caps at 72. */}
                        <h3 className="min-w-0 font-sans text-[clamp(1.625rem,1.15rem+1.15vw,2.5rem)] font-semibold leading-[1.25] break-words text-black">
                          <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.title) }} />
                        </h3>
                        <p
                          className="min-w-0 font-sans text-[clamp(1rem,0.9rem+0.4vw,1.5rem)] font-light break-words text-black"
                          style={{ lineHeight: 1.6667 }}
                        >
                          {stripHtml(card.description)}
                        </p>
                      </div>

                      <div className="relative mt-auto aspect-[467/317.333] w-full overflow-hidden rounded-2xl">
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(109.1deg, #9ED2FF 19.68%, rgba(192, 226, 255, 0.3) 65.6%, #F1F8FF 82.94%), #FFFFFF',
                          }}
                          aria-hidden="true"
                        />
                        <div
                          className="pointer-events-none absolute rounded-full bg-brand-sky"
                          style={{
                            width: '24.857%',
                            aspectRatio: '1',
                            left: '-10.572%',
                            top: '-18.487%',
                          }}
                          aria-hidden="true"
                        />
                        {photo ? (
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="absolute inset-x-0 bottom-0 w-full rounded-b-2xl object-cover"
                            style={{ height: '82.275%' }}
                          />
                        ) : null}
                      </div>
                    </article>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CarouselButton({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: 'left' | 'right';
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex size-[4.125rem] shrink-0 items-center justify-center rounded-full border-[1.375px] border-black bg-white text-black shadow-[0_1.375px_1.375px_rgba(16,24,40,0.05)] transition-[color,border-color,background-image] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy enabled:hover:border-transparent enabled:hover:bg-[linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] enabled:hover:text-white enabled:focus-visible:border-transparent enabled:focus-visible:bg-[linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] enabled:focus-visible:text-white disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
    >
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === 'left' ? (
          <path d="M20 24.5L12 16.5L20 8.5" />
        ) : (
          <path d="M13 24.5L21 16.5L13 8.5" />
        )}
      </svg>
    </button>
  );
}

export default MissionsYouServeSection;
