'use client';

import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
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

function OverviewCard({
  card,
  index,
  total,
}: {
  card: FederalGovernmentCard;
  index: number;
  total: number;
}) {
  const reduce = useReducedMotion();
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

  return (
    <div
      style={{ top: `${80 + 24 * index}px`, zIndex: index + 10 }}
      className="sticky mx-auto mb-16 w-full max-w-[93.375rem] lg:mb-24"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        className="relative box-border flex w-full flex-col overflow-hidden rounded-panel border border-brand-sky p-6 sm:rounded-[2.625rem] sm:p-10 xl:min-h-[51.4375rem] xl:pt-[3.9375rem] xl:pr-[3.75rem] xl:pb-[3.4375rem] xl:pl-[4.9375rem]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), #91CCFF',
        }}
      >
        <div className="inline-flex w-fit items-center justify-center rounded-[4.1667rem] border-[1.333px] border-[#fff7e4] bg-[#212121] px-[1.333rem] py-2">
          <span className="font-sans text-[clamp(1.375rem,1.15rem+0.5vw,1.75rem)] leading-[1.2] font-medium text-white">
            {displayCurrent}
          </span>
          <span className="font-sans text-[clamp(1.375rem,1.15rem+0.5vw,1.75rem)] leading-[1.2] text-white">
            /
          </span>
          <span className="font-sans text-[clamp(1.375rem,1.15rem+0.5vw,1.75rem)] leading-[1.2] text-[#767676]">
            {displayTotal}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 xl:mt-[1.625rem] xl:grid-cols-[minmax(26rem,1fr)_minmax(0,40.8125rem)] xl:grid-rows-[auto_auto] xl:gap-x-6 xl:gap-y-[4.1875rem]">
          {cleanTitle ? (
            <Heading
              level={2}
              size="subtitle"
              tone="inherit"
              className="min-w-0 text-[#212121] xl:col-start-1 xl:row-start-1 xl:self-center [&_span[style*='color']]:font-semibold"
            >
              <span dangerouslySetInnerHTML={{ __html: cleanTitle }} />
            </Heading>
          ) : (
            <div className="xl:col-start-1 xl:row-start-1" />
          )}

          <div className="hidden min-w-0 items-center xl:col-start-2 xl:row-start-1 xl:-mr-[3.75rem] xl:flex" aria-hidden="true">
            <span className="size-[0.889rem] shrink-0 rounded-full bg-brand-sky" />
            <span className="h-[2.67px] min-w-0 flex-1 bg-brand-sky" />
          </div>

          <div className="flex min-w-0 flex-col xl:col-start-1 xl:row-start-2">
            {card.subheading ? (
              <h3 className="max-w-[42.4375rem] font-sans text-[clamp(1.5rem,1.05rem+1.15vw,2.375rem)] leading-[1.2] font-semibold text-[#212121]">
                {card.subheading}
              </h3>
            ) : null}
            {card.description ? (
              <Text
                size="lead"
                tone="inherit"
                className="mt-6 max-w-[40.25rem] text-black"
                style={{ lineHeight: 1.6667 }}
              >
                {stripHtml(card.description)}
              </Text>
            ) : null}
            {tags.length > 0 ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-3.5 gap-y-5 xl:mt-auto xl:pt-8">
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
                className="group mt-8 inline-flex items-center gap-3 text-brand-sky transition-colors duration-200 hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy xl:mt-auto"
              >
                <span className="font-sans text-[20px] leading-[40px] font-bold sm:text-[24px]">
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

          <div className="relative aspect-[653/499] w-full min-w-0 overflow-hidden rounded-card border-[1.333px] border-brand-sky xl:col-start-2 xl:row-start-2">
            {src ? (
              <img
                src={src}
                alt={card.image && typeof card.image === 'object' ? card.image.alternativeText || card.title || '' : card.title || ''}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
              />
            ) : null}
          </div>
        </div>
      </motion.div>
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
      className="relative mx-auto w-full max-w-home overflow-visible bg-transparent px-4 py-16 sm:px-8 sm:py-24 xl:px-[110px] xl:pt-[7.333rem]"
    >
      {title ? (
        <div className="mx-auto mb-12 max-w-[1494px] text-center lg:text-left">
          <h2 className="font-serif text-[36px] font-normal text-[#212121] sm:text-[48px]">{stripHtml(title)}</h2>
        </div>
      ) : null}
      <div className="relative flex w-full flex-col items-center">
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
