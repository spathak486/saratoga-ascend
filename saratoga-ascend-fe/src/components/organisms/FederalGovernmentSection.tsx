'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface FederalMissionCardItem {
  id?: string | number | null;
  documentId?: string | null;
  stepNumber?: string | null;
  title: string;
  subheading?: string | null;
  description: string;
  image?: { url: string; alternativeText?: string | null } | string | null;
  tags?: Array<{ text?: string | null; title?: string | null } | string> | null;
  cta?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
    isExternal?: boolean | null;
  } | null;
}

export interface FederalGovernmentSectionProps {
  referenceTitle?: string | null;
  title?: string | null;
  cards?: FederalMissionCardItem[] | null;
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

function cleanHeadingHtml(html: string): string {
  if (!html) return '';
  return html
    .trim()
    .replace(/<\/\s*p\s*>\s*<\s*p(\s+[^>]*)?>/gi, '<br/>')
    .replace(/^<\s*(p|div|h[1-6])(\s+[^>]*)?>/i, '')
    .replace(/<\/\s*(p|div|h[1-6])\s*>$/i, '')
    .trim();
}

interface StackedFederalCardProps {
  card: FederalMissionCardItem;
  index: number;
  total: number;
}

function StackedFederalCard({ card, index, total }: StackedFederalCardProps) {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Progressive sticky top stacking offset
  const stickyTop = 80 + index * 24;

  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.75, 0.95, 1]);

  const rawImageUrl = typeof card.image === 'string' ? card.image : card.image?.url;
  const imageUrl = normalizeImageSrc(rawImageUrl);

  // Normalise tags
  const tagsList: string[] = Array.isArray(card.tags)
    ? card.tags
        .map((tag) => {
          if (typeof tag === 'string') return tag;
          return tag?.text || tag?.title || '';
        })
        .filter(Boolean)
    : [];

  const displayStepNumber =
    card.stepNumber ||
    `${String(index + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`;

  const cleanTitle = card.title ? cleanHeadingHtml(card.title) : '';

  return (
    <div
      ref={cardContainerRef}
      className="sticky w-full flex justify-center mb-12 sm:mb-16"
      style={{
        top: `${stickyTop}px`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="box-border relative w-full max-w-[1494px] min-h-[500px] xl:min-h-[640px] bg-white border border-[#E2E8F0] rounded-[36px] sm:rounded-[48px] p-6 sm:p-10 xl:p-[60px] shadow-[0px_20px_50px_rgba(0,0,0,0.06)] flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Background Pattern (Why Depoter graphic) */}
        <div
          className="pointer-events-none select-none absolute inset-0 opacity-[0.03] z-0"
          style={{
            backgroundImage: `radial-gradient(#2B88D9 1.5px, transparent 1.5px), radial-gradient(#000000 1.5px, transparent 1.5px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px',
          }}
          aria-hidden="true"
        />

        {/* Top Header Row: Step Pill (01/07) + Main Title */}
        <div className="flex flex-col items-start gap-4 mb-6 z-10">
          <div className="inline-flex items-center justify-center px-5 py-2 min-w-[110px] h-[48px] sm:h-[51px] bg-[#212121] border-[1.33px] border-[#FFF7E4] rounded-[66.67px] shadow-sm">
            <span
              className="font-medium text-[22px] sm:text-[28px] leading-[35px] text-white text-center tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {displayStepNumber}
            </span>
          </div>

          {cleanTitle && (
            <h2
              className="font-serif text-[32px] sm:text-[40px] xl:text-[44px] leading-[1.25] xl:leading-[60px] font-normal text-[#212121] [&_span[style*='color']]:font-semibold"
              style={{ fontFamily: "'DM Serif Text', serif" }}
              dangerouslySetInnerHTML={{ __html: cleanTitle }}
            />
          )}
        </div>

        {/* Center / Body Section */}
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-8 xl:gap-[60px] z-10 flex-1">
          {/* Left Column */}
          <div className={`w-full ${imageUrl ? 'lg:w-[52%]' : 'w-full'} flex flex-col justify-between`}>
            <div>
              {card.subheading && (
                <h3
                  className="font-sans text-[24px] sm:text-[30px] xl:text-[38px] leading-[1.26] xl:leading-[48px] font-semibold text-[#212121] mb-5 sm:mb-6"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {card.subheading}
                </h3>
              )}

              {card.description && (
                <p
                  className="font-sans text-[16px] sm:text-[20px] xl:text-[24px] leading-[26px] sm:leading-[32px] xl:leading-[40px] font-normal text-[#000000] mb-8"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {card.description}
                </p>
              )}
            </div>

            {/* Bottom Row: Tags or Link CTA (ONLY if entered) */}
            <div className="mt-auto pt-4">
              {tagsList.length > 0 ? (
                <div className="flex flex-wrap items-center gap-3 sm:gap-3.5">
                  {tagsList.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="inline-flex items-center justify-center px-5 py-2 sm:py-2.5 rounded-[60px] border border-[#2B88D9] bg-[rgba(43,136,217,0.04)] hover:bg-[#2B88D9] text-[#000000] hover:text-white text-[15px] sm:text-[18px] font-medium leading-[26px] sm:leading-[30px] transition-colors duration-200 cursor-default"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : card.cta?.label || card.cta?.href ? (
                <a
                  href={card.cta.href || '/solutions'}
                  target={card.cta.target || '_self'}
                  rel={card.cta.isExternal ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center gap-3 text-[#2B88D9] hover:text-[#022E4C] transition-colors duration-200"
                >
                  <span
                    className="font-sans font-bold text-[20px] sm:text-[24px] leading-[40px]"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
                    {card.cta.label || 'Explore Relevant Capabilities'}
                  </span>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    className="transform transition-transform duration-300 group-hover:translate-x-2"
                  >
                    <path
                      d="M5 15H25M25 15L17.5 7.5M25 15L17.5 22.5"
                      stroke="#2B88D9"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          {/* Right Column: Photo Box (ONLY if image is present) */}
          {imageUrl ? (
            <div className="w-full lg:w-[46%] min-h-[320px] sm:min-h-[420px] xl:min-h-[499px] relative rounded-[32px] sm:rounded-[40px] border-[1.33px] border-[#2B88D9] overflow-hidden shadow-lg self-center">
              <img
                src={imageUrl}
                alt={card.title || 'Federal Mission'}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

export function FederalGovernmentSection({
  title,
  cards,
}: FederalGovernmentSectionProps) {
  // STRICT RULE: If no cards from CMS, render nothing
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Federal Government Mission Overview"
      className="relative w-full max-w-[1920px] mx-auto py-16 sm:py-24 px-4 sm:px-8 xl:px-[110px] bg-transparent overflow-visible"
    >
      {/* Optional Top Title if configured */}
      {title && (
        <div className="max-w-[1494px] mx-auto mb-12 text-center lg:text-left">
          <h2
            className="font-serif text-[36px] sm:text-[48px] font-normal text-[#212121]"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {title}
          </h2>
        </div>
      )}

      {/* Stacked Cards Container */}
      <div className="relative w-full flex flex-col items-center">
        {cards.map((card, idx) => (
          <StackedFederalCard
            key={card.id ?? card.documentId ?? `fed-card-${idx}`}
            card={card}
            index={idx}
            total={cards.length}
          />
        ))}
      </div>
    </section>
  );
}

export default FederalGovernmentSection;
