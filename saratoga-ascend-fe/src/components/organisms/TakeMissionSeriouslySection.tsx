'use client';

import React, { useState, useEffect } from 'react';
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
  const t = (title || '').toLowerCase();
  if (t.includes('purpose') || t.includes('serve') || t.includes('objective')) {
    return <ObjectiveTargetIcon />;
  }
  if (t.includes('outcome') || t.includes('own') || t.includes('clipboard')) {
    return <ClipboardCheckIcon />;
  }
  if (t.includes('team') || t.includes('collaborat') || t.includes('one team')) {
    return <CollaborationIcon />;
  }
  if (t.includes('learn') || t.includes('book')) {
    return <OpenBookIcon />;
  }
  if (t.includes('voice') || t.includes('respect') || t.includes('shake')) {
    return <HandshakeIcon />;
  }
  if (t.includes('rise') || t.includes('together') || t.includes('increase') || t.includes('growth')) {
    return <IncreaseChartIcon />;
  }

  // Fallback by index matching the 6 Figma cards
  switch (index % 6) {
    case 0:
      return <ObjectiveTargetIcon />;
    case 1:
      return <OpenBookIcon />;
    case 2:
      return <ClipboardCheckIcon />;
    case 3:
      return <HandshakeIcon />;
    case 4:
      return <CollaborationIcon />;
    case 5:
    default:
      return <IncreaseChartIcon />;
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
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [iconUrl]);

  if (!iconUrl || imgError) {
    return <FallbackPurposeIcon index={index} title={title} />;
  }

  return (
    <div className="relative w-[73px] h-[73px]">
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
  // STRICT RULE: If CMS data is missing or empty, render nothing (no static dummy fallback)
  if (!cards || cards.length === 0) {
    return null;
  }

  // Render title with highlight (case-insensitive match, or append if separate field in CMS)
  const renderTitle = () => {
    const rawTitle = title?.trim() || '';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawTitle && !rawHighlight) return null;

    if (!rawHighlight) {
      return rawTitle;
    }

    if (!rawTitle) {
      return <span className="text-[#D31E2D] font-normal">{rawHighlight}</span>;
    }

    // Check if rawHighlight is contained in rawTitle (case-insensitive)
    const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === rawHighlight.toLowerCase()) {
          return (
            <span key={i} className="text-[#D31E2D] font-normal">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      });
    }

    // If highlightTitle is separate from title (e.g. title: "People who take the", highlightTitle: "mission seriously")
    return (
      <>
        <span>{rawTitle} </span>
        <span className="text-[#D31E2D] font-normal">{rawHighlight}</span>
      </>
    );
  };

  const hasHeading = Boolean(title?.trim() || highlightTitle?.trim());

  return (
    <section
      aria-label={title || highlightTitle || 'People who take the mission seriously'}
      /* Figma: Frame 2147226448 -> width: 1919px; height: 714px; top: 9614px; left: 0px; */
      className="relative w-full max-w-[1919px] mx-auto min-h-[714px] bg-white flex flex-col justify-center py-[80px] px-6 sm:px-10 lg:px-[120px] my-0"
    >
      <div className="w-full max-w-[1679px] mx-auto">
        {/* Header: Group 2085665675 (width: 1402px, height: 86px, left: 120px, top: 80px) */}
        {hasHeading && (
          <div className="mb-[60px] max-w-[1402px]">
            <h2 className="font-['DM_Serif_Text'] text-[36px] sm:text-[52px] lg:text-[72px] leading-[115%] lg:leading-[86px] text-[#000000] font-normal tracking-normal">
              {renderTitle()}
            </h2>
          </div>
        )}

        {/* 6 Cards Grid: Group 2085665696 (width: 1679px, height: 408px, left: 120px, top: 226px, gap: 40px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] w-full max-w-[1679px]">
          {cards.map((card, index) => {
            const iconUrl =
              typeof card.icon === 'string'
                ? normalizeImageSrc(card.icon)
                : card.icon?.url
                ? normalizeImageSrc(card.icon.url)
                : '';

            return (
              /* Figma Card: width: 533px, height: 184px, background: #F4F9FD, border: 1px solid #95C3EC, border-radius: 20px */
              <div
                key={card.id || `card-${index}`}
                className="box-border relative flex items-center gap-[23px] pl-[40px] pr-[20px] py-[34px] w-full max-w-[533px] min-h-[184px] h-auto lg:h-[184px] rounded-[20px] bg-[#F4F9FD] border border-[#95C3EC] shadow-[0_4px_20px_rgba(149,195,236,0.12)] hover:border-[#2B88D9] hover:shadow-[0_8px_25px_rgba(149,195,236,0.22)] transition-all duration-300"
              >
                {/* Left Icon Container: Rectangle 40068 (width: 104px, height: 104px, background: #95C3EC, border: 1px solid #000000, border-radius: 13px) */}
                <div className="w-[104px] h-[104px] rounded-[13px] bg-[#95C3EC] border border-black flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
                  <CardIconRenderer
                    iconUrl={iconUrl}
                    altText={typeof card.icon !== 'string' ? card.icon?.alternativeText : card.title}
                    title={card.title}
                    index={index}
                  />
                </div>

                {/* Right Text Block: Group 2085664883 (width: 357px, height: 116px, left: 167px, top: 34px) */}
                <div className="flex-1 flex flex-col justify-center max-w-[357px]">
                  {/* Title: DM Serif Text, 28px, line-height: 46px, color: #000000 */}
                  <h3 className="font-['DM_Serif_Text'] text-[24px] lg:text-[28px] leading-[36px] lg:leading-[46px] text-black font-normal mb-[10px]">
                    {card.title}
                  </h3>

                  {/* Description: Google Sans Flex, 20px, line-height: 30px, color: #212121 */}
                  <p className="font-['Google_Sans_Flex'] text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] text-[#212121] font-normal">
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

