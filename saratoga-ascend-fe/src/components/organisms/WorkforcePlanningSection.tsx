'use client';

import { cleanHeadingHtml, stripHtml } from '@/lib/utils/text';

import React, { useState } from 'react';

export interface WorkflowCardItem {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
  actionTone?: 'sky' | 'red' | string | null;
  icon?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface WorkforcePlanningSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  variant?: 'orbital' | 'accordion' | null;
  centerImage?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  cards?: WorkflowCardItem[] | null;
}

// Fallback Default Data if CMS cards aren't fully configured yet
const DEFAULT_STEPS: WorkflowCardItem[] = [
  {
    number: '01',
    title: 'Understand',
    description: 'Assess workforce demand, clinical requirements, locations, timelines, and mission priorities.',
    actionTone: 'sky',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Develop a staffing and engagement model aligned with role requirements and operational needs.',
    actionTone: 'red',
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'Coordinate qualified professionals, readiness activities, onboarding, scheduling, and placement.',
    actionTone: 'sky',
  },
  {
    number: '04',
    title: 'Support',
    description: 'Maintain communication, performance visibility, continuity, and workforce improvement.',
    actionTone: 'red',
  },
];

/** 01 and 03 are blue, 02 and 04 are red, unless the card sets a tone. */
function toneFor(card: WorkflowCardItem, index: number): 'sky' | 'red' {
  if (card.actionTone === 'red' || card.actionTone === 'sky') {
    return card.actionTone;
  }
  return index % 2 === 0 ? 'sky' : 'red';
}

/**
 * Four steps read clockwise: top-left, top-right, bottom-right, bottom-left.
 * Other counts keep the first half on the left and the rest on the right.
 */
function orbitalColumns(cards: WorkflowCardItem[]) {
  if (cards.length === 4) {
    return {
      left: [cards[0], cards[3]],
      right: [cards[1], cards[2]],
    };
  }
  const leftCount = Math.ceil(cards.length / 2);
  return {
    left: cards.slice(0, leftCount),
    right: cards.slice(leftCount),
  };
}

function StepIcon({ number, tone, iconUrl, title }: { number: string; tone: 'sky' | 'red'; iconUrl?: string | null; title?: string }) {
  if (iconUrl) {
    return <img src={iconUrl} alt={title || 'Icon'} className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-[70px] 2xl:h-[70px] object-contain" />;
  }

  const color = tone === 'red' ? '#F01424' : '#2B88D9';
  const numInt = parseInt(number.replace(/\D/g, '') || '1', 10);
  const iconClass = 'size-8 sm:size-10 xl:size-11';
  const stroke = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (numInt % 4 === 1) {
    return (
      <svg className={iconClass} viewBox="0 0 48 48" aria-hidden="true">
        <rect x="13" y="10" width="22" height="28" rx="3" {...stroke} />
        <path d="M19 10.5h10a2 2 0 0 1 2 2V16H17v-3.5a2 2 0 0 1 2-2z" {...stroke} />
        <path d="M19 23h10M19 28h10M19 33h7" {...stroke} />
      </svg>
    );
  }

  if (numInt % 4 === 2) {
    return (
      <svg className={iconClass} viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="11" r="3.2" {...stroke} />
        <circle cx="12" cy="31" r="3.2" {...stroke} />
        <circle cx="36" cy="31" r="3.2" {...stroke} />
        <path d="M24 14.2v5.2M15.2 29.2 21.2 20.4M32.8 29.2 26.8 20.4M15.2 31h17.6" {...stroke} />
      </svg>
    );
  }

  if (numInt % 4 === 3) {
    return (
      <svg className={iconClass} viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="17" cy="16" r="3" {...stroke} />
        <circle cx="31" cy="16" r="3" {...stroke} />
        <circle cx="24" cy="13" r="3.4" {...stroke} />
        <path d="M8 34c.6-4 4-6.5 9-6.5 2.2 0 4 .6 5.4 1.6" {...stroke} />
        <path d="M40 34c-.6-4-4-6.5-9-6.5-2.2 0-4 .6-5.4 1.6" {...stroke} />
        <path d="M14.5 34.5c.8-4.2 4-7 9.5-7s8.7 2.8 9.5 7" {...stroke} />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14 28c1.2 5 6 8 10 8s8.8-3 10-8" {...stroke} />
      <path d="M12 26c-3 2-4 6-2.2 8.2M36 26c3 2 4 6 2.2 8.2" {...stroke} />
      <rect x="16" y="10" width="16" height="12" rx="3" {...stroke} />
      <path d="M20 16h8M20 19h5" {...stroke} />
    </svg>
  );
}

function OrbitRing() {
  const cx = 200;
  const cy = 200;
  const radius = 176;
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + radius * Math.sin(rad),
      y: cy - radius * Math.cos(rad),
    };
  };
  const arcPath = (from: number, to: number) => {
    const start = point(from);
    const end = point(to);
    const large = ((to - from + 360) % 360) > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
  };
  /*
   * Strokes are 5px. Dots do not join the open top and bottom arcs.
   * Top: left blue ends in a dot, open blue arc, right red starts at a dot.
   * Bottom: lower-right blue ends in a dot, open red arc, lower-left red ends in a dot.
   */
  const arcs: { from: number; to: number; color: string; dot?: number }[] = [
    { from: 252, to: 312, color: '#2B88D9', dot: 312 },
    { from: 336, to: 24, color: '#2B88D9' },
    { from: 48, to: 108, color: '#F01424', dot: 48 },
    { from: 128, to: 164, color: '#2B88D9', dot: 164 },
    { from: 172, to: 210, color: '#F01424' },
    { from: 224, to: 248, color: '#F01424', dot: 224 },
  ];

  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden="true">
      {arcs.map((arc) => {
        const dot = arc.dot === undefined ? null : point(arc.dot);
        return (
          <g key={`${arc.color}-${arc.from}`}>
            <path d={arcPath(arc.from, arc.to)} stroke={arc.color} strokeWidth="5" strokeLinecap="round" fill="none" />
            {dot ? <circle cx={dot.x} cy={dot.y} r="10" fill={arc.color} /> : null}
          </g>
        );
      })}
    </svg>
  );
}

function OrbitPill({
  card,
  index,
  iconSide,
}: {
  card: WorkflowCardItem;
  index: number;
  iconSide: 'left' | 'right';
}) {
  const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
  const tone = toneFor(card, index);
  const isRed = tone === 'red';
  const icon = (
    <div
      className={`flex size-16 shrink-0 items-center justify-center rounded-full sm:size-20 xl:size-[5.5rem] 2xl:size-28 ${
        isRed ? 'bg-[#FFD8DB]' : 'bg-[#C8E7FB]'
      }`}
    >
      <StepIcon number={stepNum} tone={tone} iconUrl={card.icon?.url} title={stripHtml(card.title)} />
    </div>
  );

  return (
    <div
      className={`flex w-full min-w-0 items-center gap-3 rounded-pill border px-3 py-3 shadow-sm transition-shadow duration-300 ease-out hover:shadow-md motion-reduce:transition-none sm:gap-4 sm:px-4 xl:min-h-[9.25rem] xl:py-4 2xl:min-h-[11.5rem] ${
        isRed ? 'border-[#F01424] bg-[#FFF5F6]' : 'border-[#2B88D9] bg-[#EEF7FE]'
      }`}
    >
      {iconSide === 'left' ? icon : null}
      <div className={`min-w-0 flex-1 ${iconSide === 'left' ? 'pr-2 sm:pr-4' : 'pl-2 sm:pl-4'}`}>
        <span className={`block font-sans text-[15px] font-bold leading-tight sm:text-lg xl:text-xl ${isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'}`}>
          {stepNum}
        </span>
        <h3 className={`my-0.5 font-sans text-[clamp(1.15rem,1rem+0.45vw,1.75rem)] font-bold leading-tight ${isRed ? 'text-[#F01424]' : 'text-[#2B88D9]'}`}>
          <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.title) }} />
        </h3>
        <p className="line-clamp-4 min-w-0 break-words font-sans text-[14px] leading-snug text-[#212121] sm:text-[15px] xl:text-[16px] xl:leading-6">
          {stripHtml(card.description)}
        </p>
      </div>
      {iconSide === 'right' ? icon : null}
    </div>
  );
}

export function WorkforcePlanningSection({
  title = 'From Workforce Planning to Ongoing Support',
  highlightTitle = 'From Workforce Planning',
  variant = 'orbital',
  centerImage,
  cards,
}: WorkforcePlanningSectionProps) {
  const displayCards: WorkflowCardItem[] =
    cards && cards.length > 0 ? cards : DEFAULT_STEPS;

  const [activeIndex, setActiveIndex] = useState(0);

  // Render title with highlight (highlight in #F01424 Red, non-highlighted in #000000 Black)
  const renderTitle = () => {
    const rawTitle = title?.trim() || 'From Workforce Planning to Ongoing Support';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawHighlight) {
      return <span className="text-[#F01424] font-normal">{rawTitle}</span>;
    }

    if (!rawTitle) {
      return <span className="text-[#F01424] font-normal">{rawHighlight}</span>;
    }

    const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === rawHighlight.toLowerCase()) {
          return (
            <span key={i} className="text-[#F01424] font-normal">
              {part}
            </span>
          );
        }
        return (
          <span key={i} className="text-[#000000] font-normal">
            {part}
          </span>
        );
      });
    }

    return (
      <>
        <span className="text-[#F01424] font-normal">{rawHighlight} </span>
        <span className="text-[#000000] font-normal">{rawTitle}</span>
      </>
    );
  };

  const resolvedCenterImage =
    centerImage?.url || '/images/confident-healthcare-team.png';

  // --- 1. ACCORDION VARIANT ---
  if (variant === 'accordion') {
    return (
      <section className="relative mx-auto flex w-full max-w-[1920px] flex-col justify-between overflow-hidden bg-[#FFFFFF] px-6 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:min-h-[690px] lg:px-[120px] lg:pb-[90px] lg:pt-[80px]">
        <div className="w-full">
          <div className="mb-14 sm:mb-16 lg:mb-20 max-w-[878px]">
            <h2
              className="font-serif text-[38px] sm:text-[54px] lg:text-[72px] leading-[115%] lg:leading-[86px] tracking-normal font-normal"
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              {renderTitle()}
            </h2>
          </div>
          <div className="flex w-full flex-col items-start gap-8 overflow-x-auto pb-4 pt-2 scrollbar-none sm:gap-10 lg:flex-row lg:gap-[94px]">
            {displayCards.map((card, index) => {
              const isActive = activeIndex === index;
              const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
              return (
                <div
                  key={card.id ?? card.documentId ?? `step-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex shrink-0 cursor-pointer flex-col pt-0 transition-all duration-500 ease-in-out ${
                    isActive ? 'w-full lg:w-[602px]' : 'w-full lg:w-[205px]'
                  }`}
                >
                  <div className="mb-5 h-[2px] w-full bg-[#BBBBBB]" />
                  <div className="flex h-auto flex-row items-center gap-4 overflow-hidden sm:gap-6 lg:h-[278px] lg:gap-[43px]">
                    <span
                      className={`font-serif text-[5.5rem] leading-none transition-colors duration-300 lg:text-[358px] ${
                        isActive ? 'text-[#F01424]' : 'text-[#CCCCCC] hover:text-[#F01424]/70'
                      }`}
                      style={{ fontFamily: "'DM Serif Text', serif" }}
                    >
                      {stepNum}
                    </span>
                    {isActive && (
                      <div className="flex flex-col justify-center max-w-[398px]">
                        <h3 className="mb-2 font-serif text-[28px] leading-[36px] font-normal text-[#000000]">
                          <span dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.title) }} />
                        </h3>
                        <p className="line-clamp-4 min-w-0 break-words font-sans text-[20px] leading-[28px] text-[#212121]">
                          {stripHtml(card.description)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Clockwise around the portrait: 01 top-left, 02 top-right, 03 bottom-right, 04 bottom-left.
  const { left: leftCards, right: rightCards } = orbitalColumns(displayCards);
  const cardIndex = (card: WorkflowCardItem) => {
    const index = displayCards.indexOf(card);
    return index < 0 ? 0 : index;
  };

  return (
    <section
      aria-label={title || highlightTitle || 'From Workforce Planning to Ongoing Support'}
      className="relative mx-auto w-full max-w-[1920px] overflow-x-clip bg-white px-6 py-10 sm:px-6 sm:py-12 lg:px-10 xl:py-[80px] 2xl:px-[120px]"
    >
      {/* Title */}
      <div className="mb-8 w-full text-center sm:mb-10 xl:mb-[60px]">
        <h2 className="mx-auto max-w-[1442px] font-serif text-[clamp(2rem,1.35rem+2.6vw,4.5rem)] font-normal leading-[1.15]">
          {renderTitle()}
        </h2>
      </div>

      {/* Negative column gap equals the ring inset, so each oval meets the circle. */}
      <div
        className="relative mx-auto hidden w-full min-w-0 max-w-[1680px] items-center xl:grid xl:grid-cols-[minmax(0,1fr)_clamp(16rem,22vw,26.5rem)_minmax(0,1fr)] xl:[column-gap:calc(var(--orbit-ring-inset)*-1)]"
        style={{ '--orbit-ring-inset': 'clamp(0.96rem, 1.32vw, 1.59rem)' } as React.CSSProperties}
      >
        
        <div className="relative z-10 flex min-w-0 flex-col justify-center gap-8">
          {leftCards.map((card) => (
            <OrbitPill
              key={card.id ?? card.documentId ?? card.title}
              card={card}
              index={cardIndex(card)}
              iconSide="left"
            />
          ))}
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[clamp(16rem,22vw,26.5rem)]">
          <OrbitRing />
          <div className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[6px] border-white shadow-md">
            <img
              src={resolvedCenterImage}
              alt={centerImage?.alternativeText || 'Healthcare Team'}
              className="size-full object-cover object-center"
            />
          </div>
        </div>

        <div className="relative z-10 flex min-w-0 flex-col justify-center gap-8">
          {rightCards.map((card) => (
            <OrbitPill
              key={card.id ?? card.documentId ?? card.title}
              card={card}
              index={cardIndex(card)}
              iconSide="right"
            />
          ))}
        </div>

      </div>

      <div className="mx-auto flex w-full min-w-0 max-w-[720px] flex-col gap-4 sm:gap-5 xl:hidden">
        <div className="mx-auto my-2 size-40 overflow-hidden rounded-full border-4 border-white shadow-md sm:my-3 sm:size-56 md:size-64">
          <img
            src={resolvedCenterImage}
            alt={centerImage?.alternativeText || 'Healthcare Team'}
            className="size-full object-cover object-center"
          />
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {displayCards.map((card, index) => (
            <OrbitPill
              key={card.id ?? card.documentId ?? `step-${index}`}
              card={card}
              index={index}
              iconSide="left"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
