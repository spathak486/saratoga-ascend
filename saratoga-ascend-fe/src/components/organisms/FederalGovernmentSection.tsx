'use client';

import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import { Heading, Text } from '../atoms';

export interface FederalGovernmentTag {
  text?: string | null;
  title?: string | null;
}

export interface FederalGovernmentCta {
  label?: string | null;
  href?: string | null;
  target?: string | null;
  isExternal?: boolean | null;
}

export interface FederalGovernmentCard {
  id?: string | number | null;
  documentId?: string | null;
  stepNumber?: string | null;
  title?: string | null;
  subheading?: string | null;
  description?: string | null;
  image?: { url?: string | null; alternativeText?: string | null } | string | null;
  tags?: Array<FederalGovernmentTag | string> | null;
  cta?: FederalGovernmentCta | null;
}

export interface FederalGovernmentSectionProps {
  referenceTitle?: string | null;
  title?: string | null;
  cards?: FederalGovernmentCard[] | null;
}

function mediaUrl(image: FederalGovernmentCard['image']): string {
  const raw = typeof image === 'string' ? image : image?.url || '';
  if (!raw) return '';
  if (raw.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${raw}`;
  }
  return raw;
}

function tagLabel(tag: FederalGovernmentTag | string): string {
  return typeof tag === 'string' ? tag : tag.text || tag.title || '';
}

/** Incoming CMS titles may wrap content in p/div tags. */
function cleanHeadingHtml(html: string): string {
  if (!html) return '';
  return html
    .trim()
    .replace(/<\/\s*p\s*>\s*<\s*p(\s+[^>]*)?>/gi, '<br/>')
    .replace(/^<\s*(p|div|h[1-6])(\s+[^>]*)?>/i, '')
    .replace(/<\/\s*(p|div|h[1-6])\s*>$/i, '')
    .trim();
}

/**
 * Outer L/R always use shared `px-page` (same gutter as other sections).
 * Sticky cascade (top 100 + 37.33·i, left step 37.33·i) is desktop-only.
 * Sticky from `lg` so 125% zoom still stacks; cascade insets start at `xl`.
 * iPad/mobile: equal section py-10 and even card padding (no cascade offsets).
 */
const STACK_LEFT_BASE_PX = 0;
const STACK_TOP_BASE_PX = 100;
const STACK_STEP_PX = 37.333;
const STACK_BOTTOM_PX = 0;
const SECTION_EXIT_BOTTOM_PX = 80;

function OverviewCard({
  card,
  index,
  total,
}: {
  card: FederalGovernmentCard;
  index: number;
  total: number;
}) {
  const src = mediaUrl(card.image);
  const tags = (card.tags || []).map(tagLabel).filter(Boolean);
  const cta = card.cta;

  const stepCurrent = String(index + 1).padStart(2, '0');
  const stepTotal = String(total).padStart(2, '0');
  const stepParts = card.stepNumber?.includes('/')
    ? card.stepNumber.split('/')
    : null;
  const displayCurrent = stepParts?.[0]?.trim() || stepCurrent;
  const displayTotal = stepParts?.[1]?.trim() || stepTotal;
  const cleanTitle = card.title ? cleanHeadingHtml(card.title) : '';

  const stackLeft = STACK_LEFT_BASE_PX + STACK_STEP_PX * index;
  const stackTop = STACK_TOP_BASE_PX + STACK_STEP_PX * index;

  return (
    <div
      className={`relative w-full lg:sticky lg:top-0 xl:mb-0 ${
        index === total - 1 ? 'sm:max-xl:mb-8' : 'max-xl:mb-8'
      }`}
      style={{ zIndex: index + 1 }}
    >
      <div
        className="box-border w-full xl:pt-[var(--stack-top)] xl:pb-[var(--stack-bottom)] xl:pl-[var(--stack-left)]"
        style={
          {
            ['--stack-left' as string]: `${stackLeft}px`,
            ['--stack-top' as string]: `${stackTop}px`,
            ['--stack-bottom' as string]: `${STACK_BOTTOM_PX}px`,
          } as React.CSSProperties
        }
      >
        {/*
          Figma 2731:11653 — card 1494×823.
          Desktop inset: top 64, left 80, right 59, bottom 64.
          iPad/mobile: even padding on all sides.
        */}
        <article
          className="relative box-border flex w-full max-w-[min(93.375rem,100%)] flex-col overflow-hidden rounded-[1.625rem] border border-brand-sky sm:rounded-[2.625rem]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), #91CCFF',
          }}
        >
          <div className="flex w-full flex-col gap-6 p-6 sm:gap-8 sm:p-8 xl:gap-0 xl:px-0 xl:pt-16 xl:pr-[3.6875rem] xl:pb-16 xl:pl-20">
            <div className="inline-flex h-10 w-fit items-center justify-center rounded-[4.1667rem] border-[1.333px] border-[#fff7e4] bg-[#212121] px-4 py-1.5 sm:h-[3.1875rem] sm:px-[1.333rem] sm:py-2">
              <span className="font-sans text-xl leading-7 font-medium text-white sm:text-[1.75rem] sm:leading-[2.1875rem]">
                {displayCurrent}
              </span>
              <span className="font-sans text-xl leading-7 text-white sm:text-[1.75rem] sm:leading-[2.1875rem]">
                /
              </span>
              <span className="font-sans text-xl leading-7 text-[#767676] sm:text-[1.75rem] sm:leading-[2.1875rem]">
                {displayTotal}
              </span>
            </div>

            {/* Badge→title ≈ 24.7px; title→media/subhead ≈ 60px; media 653×499 */}
            <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 xl:mt-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,min(40.8125rem,48%))] xl:items-start xl:gap-x-6 xl:gap-y-0">
              {cleanTitle ? (
                <Heading
                  level={2}
                  size="subtitle"
                  tone="inherit"
                  className="min-w-0 text-[#212121] max-sm:text-[24px]! max-sm:leading-[1.2] sm:max-xl:text-[30px]! sm:max-xl:leading-[1.2] xl:col-start-1 xl:row-start-1 xl:self-center [&_span[style*='color']]:font-semibold"
                >
                  <span dangerouslySetInnerHTML={{ __html: cleanTitle }} />
                </Heading>
              ) : (
                <div className="xl:col-start-1 xl:row-start-1" />
              )}

              <div
                className="hidden min-w-0 items-center xl:col-start-2 xl:row-start-1 xl:flex xl:self-center"
                aria-hidden="true"
              >
                <span className="size-[0.889rem] shrink-0 rounded-full bg-brand-sky" />
                <span className="h-[0.1669rem] min-w-0 flex-1 bg-brand-sky" />
              </div>

              <div className="flex min-w-0 flex-col xl:col-start-1 xl:row-start-2 xl:mt-[3.75rem]">
                {card.subheading ? (
                  <h3 className="max-w-[42.4375rem] font-sans text-[20px] leading-[1.2] font-semibold text-[#212121] sm:text-[28px] xl:text-[clamp(1.5rem,1.1rem+1.1vw,2.375rem)]">
                    {card.subheading}
                  </h3>
                ) : null}
                {card.description ? (
                  <Text
                    size="lead"
                    tone="inherit"
                    className="mt-5 line-clamp-5 max-w-[40.25rem] text-black xl:line-clamp-none"
                    style={{ lineHeight: 1.6667 }}
                  >
                    {stripHtml(card.description)}
                  </Text>
                ) : null}
                {tags.length > 0 ? (
                  <div className="mt-8 flex flex-wrap items-center gap-x-3.5 gap-y-4 xl:mt-auto xl:pt-8">
                    {tags.map((tag, tagIndex) => (
                      <span
                        key={`${tag}-${tagIndex}`}
                        className="inline-flex items-center justify-center rounded-[3.75rem] border border-brand-sky bg-[rgba(43,136,217,0.03)] px-5 py-1.5 font-sans text-nav leading-[2.222] font-medium text-black transition-colors duration-200 hover:bg-brand-sky hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : cta?.label || cta?.href ? (
                  <a
                    href={cta.href || '/solutions'}
                    target={cta.target || '_self'}
                    rel={cta.isExternal ? 'noopener noreferrer' : undefined}
                    className="group mt-8 inline-flex items-center gap-3 text-brand-sky transition-colors duration-200 hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy xl:mt-auto xl:pt-8"
                  >
                    <span className="font-sans text-[1.25rem] leading-[2.5rem] font-bold sm:text-[1.5rem]">
                      {cta.label || 'Explore Relevant Capabilities'}
                    </span>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    >
                      <path
                        d="M5 15H25M25 15L17.5 7.5M25 15L17.5 22.5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ) : null}
              </div>

              {src ? (
                <div className="relative aspect-[3/2] w-full min-w-0 overflow-hidden rounded-[1.5rem] border-[1.333px] border-brand-sky sm:aspect-[653/499] sm:rounded-[2.5rem] lg:aspect-[3/2] xl:aspect-[653/499] xl:col-start-2 xl:row-start-2 xl:mt-[3.75rem]">
                  <img
                    src={src}
                    alt={
                      card.image && typeof card.image === 'object'
                        ? card.image.alternativeText || card.title || ''
                        : card.title || ''
                    }
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="hidden aspect-[653/499] w-full xl:col-start-2 xl:row-start-2 xl:mt-[3.75rem] xl:block"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export function FederalGovernmentSection({
  title,
  cards,
}: FederalGovernmentSectionProps) {
  const slides = (cards || []).filter((card) => card.title || card.description);
  if (slides.length === 0) return null;

  return (
    <section
      aria-label={title || 'Federal Government Mission Overview'}
      className="relative mx-auto w-full max-w-home overflow-visible bg-transparent px-page py-10 xl:pt-0 xl:pb-[var(--section-exit-bottom)]"
      style={
        {
          ['--section-exit-bottom' as string]: `${SECTION_EXIT_BOTTOM_PX}px`,
        } as React.CSSProperties
      }
    >
      {title ? (
        <div className="mb-8 max-w-[93.375rem] text-center sm:mb-10 xl:mb-12 xl:pt-[7.333rem] xl:text-left">
          <h2 className="font-serif text-section font-normal leading-[1.2] text-[#212121]">
            {stripHtml(title)}
          </h2>
        </div>
      ) : null}
      <div className="relative flex w-full flex-col">
        {slides.map((card, index) => (
          <OverviewCard
            key={card.documentId || card.id || `${stripHtml(card.title)}-${index}`}
            card={card}
            index={index}
            total={slides.length}
          />
        ))}
      </div>
    </section>
  );
}

export default FederalGovernmentSection;
