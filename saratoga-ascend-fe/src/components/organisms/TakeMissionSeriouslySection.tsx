'use client';

import { cleanHeadingHtml, stripHtml } from '@/lib/utils/text';

import React, { useState } from 'react';
import Image from 'next/image';

export interface ValueCardItem {
  id?: string | number | null;
  title: string;
  description: string;
  icon?: { url: string; alternativeText?: string | null } | string | null;
}

export type PurposeCardItem = ValueCardItem;

export interface TakeMissionSeriouslySectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  cards?: PurposeCardItem[] | null;
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

/* 1. objective_18853420 1: Target / Bullseye (Serve with purpose) */
function ObjectiveTargetIcon({ className = 'w-[73px] h-[73px] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 73 73" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Concentric target rings */}
      <circle cx="36.5" cy="36.5" r="28" strokeLinecap="round" />
      <circle cx="36.5" cy="36.5" r="18" strokeLinecap="round" />
      <circle cx="36.5" cy="36.5" r="8" strokeLinecap="round" />
      <circle cx="36.5" cy="36.5" r="3" fill="currentColor" />
      {/* Precision reticle crosshairs */}
      <path d="M36.5 4.5V12.5M36.5 60.5V68.5M4.5 36.5H12.5M60.5 36.5H68.5" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

/* 2. book_17351118 1: Open Book (Keep learning) */
function OpenBookIcon({ className = 'w-[73px] h-[73px] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 73 73" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Book pages spine and curves */}
      <path
        d="M36.5 22C30.5 17 20 17 13 19.5V56C20 53.5 30.5 53.5 36.5 58C42.5 53.5 53 53.5 60 56V19.5C53 17 42.5 17 36.5 22Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M36.5 22V58" strokeLinecap="round" />
      {/* Left page text lines */}
      <path d="M20 29C24 28 28.5 28 31 30" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M20 37C24 36 28.5 36 31 38" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M20 45C24 44 28.5 44 31 46" strokeLinecap="round" strokeWidth="2.2" />
      {/* Right page text lines */}
      <path d="M42 30C44.5 28 49 28 53 29" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M42 38C44.5 36 49 36 53 37" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M42 46C44.5 44 49 44 53 45" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

/* 3. clipboard_793891 1: Clipboard with checklist (Own the outcome) */
function ClipboardCheckIcon({ className = 'w-[73px] h-[73px] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 73 73" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Board frame */}
      <rect x="15" y="16" width="43" height="49" rx="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clip top */}
      <path d="M26 16V11C26 9.3 27.3 8 29 8H44C45.7 8 47 9.3 47 11V16" strokeLinecap="round" />
      <circle cx="36.5" cy="12" r="2" fill="currentColor" />
      {/* Checklist item 1 */}
      <path d="M24 28L29 33L39 23" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M44 28H49" strokeLinecap="round" strokeWidth="2.5" />
      {/* Checklist item 2 */}
      <path d="M24 42L29 47L39 37" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M44 42H49" strokeLinecap="round" strokeWidth="2.5" />
      {/* Checklist item 3 */}
      <path d="M24 55H49" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

/* 4. shake_16469907 1: Handshake (Respect every voice) */
function HandshakeIcon({ className = 'w-[73px] h-[73px] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 73 73" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Left wrist sleeve */}
      <path d="M8 44L20 32L24 36L12 48L8 44Z" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right wrist sleeve */}
      <path d="M65 44L53 32L49 36L61 48L65 44Z" strokeLinecap="round" strokeLinejoin="round" />
      {/* Left hand & thumb */}
      <path d="M20 32L31 21C33 19 36 19 38 21L40 23" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right hand & thumb */}
      <path d="M53 32L42 21C40 19 37 19 35 21L33 23" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clasping fingers */}
      <path d="M30 40L36.5 46.5L43 40" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 44L36.5 48L40 44" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 35L36.5 25L48 35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* 5. collaboration_7080843 1: Multi-person collaboration (Work as one team) */
function CollaborationIcon({ className = 'w-[73px] h-[73px] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 73 73" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Center member */}
      <circle cx="36.5" cy="22" r="7" strokeLinecap="round" />
      <path d="M25 46C25 39 30 35 36.5 35C43 35 48 39 48 46" strokeLinecap="round" />
      {/* Left member */}
      <circle cx="19" cy="28" r="5.5" strokeLinecap="round" />
      <path d="M10 51C10 46 14 42 19 42C21.5 42 23.5 43 25 44.5" strokeLinecap="round" />
      {/* Right member */}
      <circle cx="54" cy="28" r="5.5" strokeLinecap="round" />
      <path d="M48 44.5C49.5 43 51.5 42 54 42C59 42 63 46 63 51" strokeLinecap="round" />
      {/* Collaborative unity link */}
      <path d="M21 51L29 55L36.5 51L44 55L52 51" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

/* 6. increase_2275286 1: Growth / Upward Trend Graph (Rise together) */
function IncreaseChartIcon({ className = 'w-[73px] h-[73px] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 73 73" fill="none" className={className} stroke="currentColor" strokeWidth="2.8">
      {/* Ascending Trend Line */}
      <path d="M14 48L30 32L42 42L58 18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
      {/* Arrowhead */}
      <path d="M46 18H58V30" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
      {/* Rising Bar Columns */}
      <rect x="13" y="52" width="7" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="27" y="42" width="7" height="19" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="41" y="48" width="7" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="55" y="28" width="7" height="33" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FallbackPurposeIcon({ index, title }: { index: number; title?: string }) {
  const iconClass = 'size-[70%] max-h-[73px] max-w-[73px] text-black';
  const t = (title || '').toLowerCase();
  if (t.includes('purpose') || t.includes('serve') || t.includes('objective')) {
    return <ObjectiveTargetIcon className={iconClass} />;
  }
  if (t.includes('outcome') || t.includes('own') || t.includes('clipboard')) {
    return <ClipboardCheckIcon className={iconClass} />;
  }
  if (t.includes('team') || t.includes('collaborat') || t.includes('one team')) {
    return <CollaborationIcon className={iconClass} />;
  }
  if (t.includes('learn') || t.includes('book')) {
    return <OpenBookIcon className={iconClass} />;
  }
  if (t.includes('voice') || t.includes('respect') || t.includes('shake')) {
    return <HandshakeIcon className={iconClass} />;
  }
  if (t.includes('rise') || t.includes('together') || t.includes('increase') || t.includes('growth')) {
    return <IncreaseChartIcon className={iconClass} />;
  }

  // Fallback by index matching the 6 Figma cards
  switch (index % 6) {
    case 0:
      return <ObjectiveTargetIcon className={iconClass} />;
    case 1:
      return <OpenBookIcon className={iconClass} />;
    case 2:
      return <ClipboardCheckIcon className={iconClass} />;
    case 3:
      return <HandshakeIcon className={iconClass} />;
    case 4:
      return <CollaborationIcon className={iconClass} />;
    case 5:
    default:
      return <IncreaseChartIcon className={iconClass} />;
  }
}

function CardIconRenderer({
  iconUrl,
  altText,
  title,
  index,
}: {
  iconUrl: string;
  altText?: string | null;
  title: string;
  index: number;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const imgError = Boolean(iconUrl) && failedUrl === iconUrl;

  if (!iconUrl || imgError) {
    return <FallbackPurposeIcon index={index} title={title} />;
  }

  return (
    <div className="relative size-[70%] max-h-[73px] max-w-[73px]">
      <Image
        src={iconUrl}
        alt={altText || ''}
        fill
        unoptimized
        className="object-contain"
        onError={() => setFailedUrl(iconUrl)}
      />
    </div>
  );
}

/** Figma Frame 2147226448 heading — used when CMS title is a card-title leak. */
const FIGMA_SECTION_TITLE = 'People who take the';
const FIGMA_SECTION_HIGHLIGHT = 'mission seriously';

function resolveSectionHeading(
  title: string | null | undefined,
  highlightTitle: string | null | undefined,
  cards: PurposeCardItem[],
): { title: string; highlight: string } {
  const rawTitle = title?.trim() || '';
  const rawHighlight = highlightTitle?.trim() || '';

  // Narrow guard: only when section title equals or begins with a full card title
  // (e.g. CMS "Serve with purposest" leaking from "Serve with purpose").
  const titleLooksLikeCard = cards.some((card) => {
    const cardTitle = card.title?.trim().toLowerCase() || '';
    if (!cardTitle || !rawTitle) return false;
    const sectionTitle = rawTitle.toLowerCase();
    return sectionTitle === cardTitle || sectionTitle.startsWith(cardTitle);
  });

  if (titleLooksLikeCard) {
    return { title: FIGMA_SECTION_TITLE, highlight: rawHighlight || FIGMA_SECTION_HIGHLIGHT };
  }

  return { title: rawTitle, highlight: rawHighlight };
}

export const TakeMissionSeriouslySection: React.FC<TakeMissionSeriouslySectionProps> = ({
  title,
  highlightTitle,
  cards,
}) => {
  // STRICT RULE: If CMS data is missing or empty, render nothing (no static dummy fallback)
  if (!cards || cards.length === 0) {
    return null;
  }

  const heading = resolveSectionHeading(title, highlightTitle, cards);

  // Render title with highlight (case-insensitive match, or append if separate field in CMS)
  const renderTitle = () => {
    const rawTitle = heading.title;
    const rawHighlight = heading.highlight;

    if (!rawTitle && !rawHighlight) return null;

    if (!rawHighlight) {
      return rawTitle;
    }

    if (!rawTitle) {
      return <span className="font-normal text-brand-cta-from">{rawHighlight}</span>;
    }

    const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === rawHighlight.toLowerCase()) {
          return (
            <span key={i} className="font-normal text-brand-cta-from">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      });
    }

    return (
      <>
        <span>{rawTitle} </span>
        <span className="font-normal text-brand-cta-from">{rawHighlight}</span>
      </>
    );
  };

  const hasHeading = Boolean(heading.title || heading.highlight);
  const ariaLabel =
    [heading.title, heading.highlight].filter(Boolean).join(' ') ||
    'People who take the mission seriously';

  return (
    <section
      aria-label={ariaLabel}
      /* Figma Frame 613: pad 80 top/bottom, 120 sides; hug height. */
      className="isolate relative mx-auto w-full max-w-[1920px] bg-white px-page pt-10 pb-20 sm:pt-12 xl:pt-20"
    >
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 sm:gap-10 xl:gap-[60px]">
        {hasHeading ? (
          <h2 className="max-w-[1402px] font-serif text-section font-normal tracking-normal text-black">
            {renderTitle()}
          </h2>
        ) : null}

        {/* Single column through tablet; 3×2 from xl. Desktop card gap 40px. */}
        <div className="grid w-full grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-3 xl:gap-10">
          {cards.map((card, index) => {
            const iconUrl =
              typeof card.icon === 'string'
                ? normalizeImageSrc(card.icon)
                : card.icon?.url
                  ? normalizeImageSrc(card.icon.url)
                  : '';

            return (
              /* Figma purpose card: #F4F9FD, border #95C3EC, radius 20, icon left + copy right */
              <article
                key={card.id || `card-${index}`}
                className="box-border flex w-full items-start gap-4 overflow-visible rounded-media border border-[#95C3EC] bg-[#F4F9FD] p-5 sm:gap-5 sm:p-6 xl:min-h-[184px] xl:items-center xl:gap-[23px] xl:py-10 xl:pl-10 xl:pr-5"
              >
                <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-black bg-[#95C3EC] sm:size-20 xl:size-[104px]" aria-hidden={iconUrl ? undefined : true}>
                  <CardIconRenderer
                    iconUrl={iconUrl}
                    altText={
                      typeof card.icon !== 'string'
                        ? card.icon?.alternativeText
                        : stripHtml(card.title)
                    }
                    title={stripHtml(card.title)}
                    index={index}
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 xl:max-w-[357px] xl:gap-2.5">
                  <h3 className="font-serif text-[clamp(1.25rem,1.1rem+0.6vw,1.75rem)] font-normal leading-[1.3] text-black">
                    <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.title) }} />
                  </h3>
                  <p className="min-w-0 break-words font-sans text-[clamp(0.95rem,0.9rem+0.25vw,1.25rem)] font-normal leading-[1.5] text-[#212121] [overflow-wrap:anywhere]">
                    {stripHtml(card.description)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TakeMissionSeriouslySection;

