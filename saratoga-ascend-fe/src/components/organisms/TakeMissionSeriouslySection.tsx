'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export interface ValueCardItem {
  id?: string;
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

const DEFAULT_TITLE = 'People who take the mission seriously';
const DEFAULT_HIGHLIGHT = 'mission seriously';

/* Icon 1: Serve with purpose (Hand holding a bullseye / target) */
function PurposeTargetIcon({ className = 'size-[clamp(44px,3.8vw,68px)] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.2">
      {/* Target concentric rings */}
      <circle cx="26" cy="18" r="11" strokeLinecap="round" />
      <circle cx="26" cy="18" r="6" strokeLinecap="round" />
      <circle cx="26" cy="18" r="2" fill="currentColor" />
      {/* Hand supporting from underneath */}
      <path
        d="M8 32C11 31 16 31 20 34L26 38C28 39.5 32 39 34 37L39 32C40.5 30.5 40 28 38 27L32 25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 28L21 28" strokeLinecap="round" />
    </svg>
  );
}

/* Icon 2: Own the outcome (Clipboard with arrow / checklist) */
function ClipboardOutcomeIcon({ className = 'size-[clamp(44px,3.8vw,68px)] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.2">
      {/* Clipboard frame */}
      <rect x="10" y="10" width="28" height="32" rx="4" strokeLinecap="round" />
      {/* Clip top */}
      <path d="M19 10V7C19 5.89543 19.8954 5 21 5H27C28.1046 5 29 5.89543 29 7V10" strokeLinecap="round" />
      {/* Circular arrow / completion badge */}
      <circle cx="24" cy="26" r="8" strokeLinecap="round" />
      <path d="M21 26H27M24 23L27 26L24 29" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Icon 3: Work as one team (Collaborative team with gear) */
function TeamCollabIcon({ className = 'size-[clamp(44px,3.8vw,68px)] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.2">
      {/* Person 1 (Center) */}
      <circle cx="24" cy="16" r="4" strokeLinecap="round" />
      <path d="M17 31C17 26.5 20.1 23 24 23C27.9 23 31 26.5 31 31" strokeLinecap="round" />
      {/* Person 2 (Left) */}
      <circle cx="13" cy="20" r="3" strokeLinecap="round" />
      <path d="M7 33C7 29.5 9.5 27 13 27C14.5 27 15.8 27.5 16.8 28.5" strokeLinecap="round" />
      {/* Person 3 (Right) */}
      <circle cx="35" cy="20" r="3" strokeLinecap="round" />
      <path d="M31.2 28.5C32.2 27.5 33.5 27 35 27C38.5 27 41 29.5 41 33" strokeLinecap="round" />
      {/* Top gear accent */}
      <path d="M22 6H26M24 4V8" strokeLinecap="round" />
    </svg>
  );
}

/* Icon 4: Keep learning (Hand holding open book) */
function LearningBookIcon({ className = 'size-[clamp(44px,3.8vw,68px)] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.2">
      {/* Open book pages */}
      <path
        d="M24 16C21 13 15 13 10 14V28C15 27 21 27 24 30C27 27 33 27 38 28V14C33 13 27 13 24 16Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 16V30" strokeLinecap="round" />
      {/* Hand beneath book */}
      <path
        d="M7 36C10 35 15 35 19 38L24 41C25.5 42 28 41.5 29.5 40L36 34"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Icon 5: Respect every voice (Partnering / holding shoulders) */
function RespectVoiceIcon({ className = 'size-[clamp(44px,3.8vw,68px)] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.2">
      {/* Left person */}
      <circle cx="17" cy="15" r="4.5" strokeLinecap="round" />
      <path d="M10 34V30C10 26 13 23 17 23C19 23 21 24 22 25.5" strokeLinecap="round" />
      {/* Right person */}
      <circle cx="31" cy="15" r="4.5" strokeLinecap="round" />
      <path d="M38 34V30C38 26 35 23 31 23C29 23 27 24 26 25.5" strokeLinecap="round" />
      {/* Connecting arm / shoulder embrace */}
      <path d="M17 23C22 21 26 21 31 23" strokeLinecap="round" />
      <path d="M21 28C24 30 27 28 27 28" strokeLinecap="round" />
    </svg>
  );
}

/* Icon 6: Rise together (People with upward growth arrow) */
function RiseTogetherIcon({ className = 'size-[clamp(44px,3.8vw,68px)] text-black' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.2">
      {/* People group */}
      <circle cx="16" cy="17" r="4" strokeLinecap="round" />
      <path d="M9 33C9 28 12 25 16 25C18.5 25 20.7 26.2 22 28" strokeLinecap="round" />
      <circle cx="26" cy="22" r="3.5" strokeLinecap="round" />
      <path d="M22 34C22 30.5 24 28.5 26 28.5C28.5 28.5 31 30.5 31 34" strokeLinecap="round" />
      {/* Upward trend growth arrow */}
      <path d="M27 17L38 6M38 6H31M38 6V13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
    </svg>
  );
}

function FallbackPurposeIcon({ index }: { index: number }) {
  switch (index % 6) {
    case 0:
      return <PurposeTargetIcon />;
    case 1:
      return <ClipboardOutcomeIcon />;
    case 2:
      return <TeamCollabIcon />;
    case 3:
      return <LearningBookIcon />;
    case 4:
      return <RespectVoiceIcon />;
    case 5:
    default:
      return <RiseTogetherIcon />;
  }
}

const DEFAULT_CARDS: PurposeCardItem[] = [
  {
    id: 'p1',
    title: 'Serve with purpose',
    description: 'Understand who depends on the work and why the outcome matters.',
  },
  {
    id: 'p2',
    title: 'Own the outcome',
    description: 'Take responsibility for commitments, communication, and quality.',
  },
  {
    id: 'p3',
    title: 'Work as one team',
    description: 'Share information, support colleagues, and coordinate across disciplines.',
  },
  {
    id: 'p4',
    title: 'Keep learning',
    description: 'Use feedback, evidence, and experience to improve.',
  },
  {
    id: 'p5',
    title: 'Respect every voice',
    description: 'Create an environment where people can contribute, collaborate, and grow.',
  },
  {
    id: 'p6',
    title: 'Rise together',
    description: 'Build capability and opportunity while delivering meaningful mission support.',
  },
];

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
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [iconUrl]);

  if (!iconUrl || imgError) {
    return <FallbackPurposeIcon index={index} />;
  }

  return (
    <div className="relative size-[clamp(44px,3.8vw,68px)]">
      <Image
        src={iconUrl}
        alt={altText || title}
        fill
        unoptimized
        className="object-contain"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export const TakeMissionSeriouslySection: React.FC<TakeMissionSeriouslySectionProps> = ({
  title,
  highlightTitle,
  cards,
}) => {
  const finalTitle = title || DEFAULT_TITLE;
  const finalHighlight = highlightTitle || DEFAULT_HIGHLIGHT;
  const finalCards = cards && cards.length > 0 ? cards : DEFAULT_CARDS;

  // Split title to highlight specific part in Figma #D31E2D / #F01424 red
  const renderTitle = () => {
    if (!finalHighlight || !finalTitle.includes(finalHighlight)) {
      return finalTitle;
    }
    const parts = finalTitle.split(finalHighlight);
    return (
      <>
        {parts[0]}
        <span className="text-[#D31E2D] font-normal">{finalHighlight}</span>
        {parts.slice(1).join(finalHighlight)}
      </>
    );
  };

  return (
    <section
      aria-label={finalTitle}
      /* Figma: width: 1919px; height: 714px; top: 9614px; */
      className="relative w-full max-w-[1920px] mx-auto min-h-[clamp(640px,37.2vw,714px)] bg-white flex flex-col justify-center py-16 lg:py-[clamp(3.5rem,4.16vw,5rem)] my-0"
    >
      {/* 1920px canvas with 120px side margins: (1920 - 1680) / 2 = 120px */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-[clamp(2.5rem,6.25vw,7.5rem)]">
        
        {/* Header: Figma DM Serif Text, 72px, line-height: 120% (86px), color: #000000 */}
        <div className="mb-8 lg:mb-[clamp(2rem,3.125vw,3.75rem)] max-w-[1402px]">
          <h2 className="font-serif font-normal text-[clamp(2.25rem,3.75vw,4.5rem)] leading-[1.2] text-[#000000] tracking-tight">
            {renderTitle()}
          </h2>
        </div>

        {/* 6 Cards Grid: Figma Group 2085665696 (3 columns x 2 rows, 40px gaps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[clamp(1.25rem,2.08vw,2.5rem)] w-full">
          {finalCards.map((card, index) => {
            const iconUrl =
              typeof card.icon === 'string'
                ? normalizeImageSrc(card.icon)
                : card.icon?.url
                ? normalizeImageSrc(card.icon.url)
                : '';

            return (
              /* Figma Card: 533px x 184px, background: #F4F9FD, border: 1px solid #95C3EC, border-radius: 20px */
              <div
                key={card.id || `card-${index}`}
                className="box-border relative flex items-center gap-4 sm:gap-6 p-5 sm:p-6 lg:py-[clamp(1.5rem,1.77vw,2.125rem)] lg:px-[clamp(1.5rem,2.08vw,2.5rem)] min-h-[clamp(150px,9.58vw,184px)] rounded-[20px] bg-[#F4F9FD] border border-[#95C3EC] shadow-[0_4px_20px_rgba(149,195,236,0.12)] hover:border-[#2B88D9] hover:shadow-[0_8px_25px_rgba(149,195,236,0.22)] transition-all duration-300"
              >
                {/* Left Icon Container: Figma Rectangle 40068 (104px x 104px, background: #95C3EC, border: 1px solid #000000, border-radius: 13px) */}
                <div className="size-[clamp(76px,5.4vw,104px)] rounded-[13px] bg-[#95C3EC] border border-black flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                  <CardIconRenderer
                    iconUrl={iconUrl}
                    altText={typeof card.icon !== 'string' ? card.icon?.alternativeText : card.title}
                    title={card.title}
                    index={index}
                  />
                </div>

                {/* Right Text Content Area */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Title: Figma DM Serif Text, 28px, line-height: 46px (164%), color: #000000 */}
                  <h3 className="font-serif font-normal text-[clamp(1.25rem,1.45vw,1.75rem)] leading-[clamp(1.65rem,2.4vw,2.875rem)] text-black mb-1">
                    {card.title}
                  </h3>

                  {/* Description: Figma Google Sans Flex, 20px, line-height: 30px (150%), color: #212121 */}
                  <p className="font-sans font-normal text-[clamp(0.95rem,1.04vw,1.25rem)] leading-[clamp(1.35rem,1.56vw,1.875rem)] text-[#212121]">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TakeMissionSeriouslySection;
