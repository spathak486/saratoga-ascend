'use client';

import React from 'react';
import Image from 'next/image';

export interface MissionVisionPromiseCard {
  id?: string;
  title: string;
  description: string;
  icon?: { url: string; alternativeText?: string | null } | string | null;
}

export interface MissionVisionPromiseSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  bgWatermarkImage?: string | null;
  cards?: MissionVisionPromiseCard[] | null;
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

const DEFAULT_TITLE = 'Our Mission, Vision & Promise';
const DEFAULT_HIGHLIGHT = 'Mission, Vision & Promise';
const DEFAULT_DESCRIPTION =
  'What drives us, where we’re going, and how we deliver lasting impact for the communications we serve.';

const DEFAULT_CARDS: MissionVisionPromiseCard[] = [
  {
    id: 'mission',
    title: 'Our Mission',
    description:
      'To support healthcare and government organizations with capable people, connected services, and dependable execution—helping essential programs serve their communities with care and consistency.',
  },
  {
    id: 'vision',
    title: 'Our Vision',
    description:
      'To be a trusted partner known for bringing people and practical expertise together, adapting to evolving needs, and contributing to stronger, more responsive public and healthcare services.',
  },
  {
    id: 'promise',
    title: 'Our Promise',
    description:
      'We approach each responsibility with respect, transparency, and ownership. We listen, communicate clearly, and stay focused on the outcomes agreed with the organizations and people we support.',
  },
];

/* Figma Card 1 Icon: Mission Target / Bullseye (mission_1628579 1) in #2B88D9 */
function TargetIcon({ className = 'size-[clamp(44px,3.2vw,62px)] text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
      {/* Outer target ring */}
      <circle cx="24" cy="24" r="19" strokeLinecap="round" strokeWidth="2.2" opacity="0.6" />
      {/* Intermediate ring */}
      <circle cx="24" cy="24" r="13" strokeLinecap="round" strokeWidth="2.4" />
      {/* Bullseye inner ring */}
      <circle cx="24" cy="24" r="7" strokeLinecap="round" strokeWidth="2.4" />
      {/* Center point */}
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
      {/* Upper-right arrow notch */}
      <path d="M33 15L41 7M41 7H33M41 7V15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
    </svg>
  );
}

/* Figma Card 2 Icon: Eye (eye_65000 1) in #2B88D9 */
function EyeIcon({ className = 'size-[clamp(44px,3.2vw,62px)] text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
      {/* Eye shape outline */}
      <path
        d="M5 24C10 14 16.5 9 24 9C31.5 9 38 14 43 24C38 34 31.5 39 24 39C16.5 39 10 34 5 24Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      {/* Iris */}
      <circle cx="24" cy="24" r="7.5" strokeLinecap="round" strokeWidth="2.5" />
      {/* Pupil */}
      <circle cx="24" cy="24" r="3.5" fill="currentColor" />
    </svg>
  );
}

/* Figma Card 3 Icon: Handshake (hand-shake_9139529 1) in #2B88D9 */
function HandshakeIcon({ className = 'size-[clamp(44px,3.2vw,62px)] text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.4">
      {/* Left arm */}
      <path d="M7 21L14.5 15.5L22.5 21.5L18.5 25.5L13 21" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right arm */}
      <path d="M41 21L33.5 15.5L25.5 21.5L29.5 25.5L35 21" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clasped palms */}
      <path
        d="M18.5 25.5L23.5 30.5C24.3 31.3 25.7 31.3 26.5 30.5L31 26"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 21.5L25.5 26" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.5 18L29 22.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Trust verification badge at top */}
      <circle cx="24" cy="10" r="5.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.12" strokeWidth="2.2" />
      <path d="M21.5 10L23.5 12L26.5 8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  );
}

function FallbackCardIcon({ index }: { index: number }) {
  if (index === 0) return <TargetIcon />;
  if (index === 1) return <EyeIcon />;
  return <HandshakeIcon />;
}

// Background colors from Figma Rectangle 40122:
const BADGE_BG_COLORS = ['#F8F4F7', '#E5F0FB', '#F8F4F7'];

export const MissionVisionPromiseSection: React.FC<MissionVisionPromiseSectionProps> = ({
  title,
  highlightTitle,
  description,
  bgWatermarkImage,
  cards,
}) => {
  const finalTitle = title || DEFAULT_TITLE;
  const finalHighlight = highlightTitle || DEFAULT_HIGHLIGHT;
  const finalDescription = description || DEFAULT_DESCRIPTION;
  const finalCards = cards && cards.length > 0 ? cards : DEFAULT_CARDS;
  const watermarkUrl = normalizeImageSrc(bgWatermarkImage);

  // Render title with highlight: "Our " in #000000, "Mission, Vision & Promise" in #D31E2D
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
      /* Figma: width: 1920px; height: 990px; background: #F6F6F6; */
      className="relative w-full max-w-[1920px] mx-auto min-h-[clamp(850px,51.56vw,990px)] overflow-hidden bg-[#F6F6F6] flex flex-col justify-center py-16 lg:py-0 my-0"
    >
      {/* Background Graphic: Figma ChatGPT Image Oct 5, 2026, 10_17_40 PM 1 */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <Image
          src={watermarkUrl || '/images/mission-vision-promise-bg.png'}
          alt="Mission Vision & Promise background decoration"
          fill
          priority={false}
          className="object-cover object-top lg:object-center opacity-85"
        />
      </div>

      {/* Main Content Layout (1920px canvas, 120px side margins = 1680px width) */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-[clamp(2.5rem,6.25vw,7.5rem)]">
        
        {/* Frame 2147226356 / Frame 610: Header Section */}
        <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-[1680px] mb-8 lg:mb-[clamp(2rem,3.125vw,3.75rem)]">
          {/* Heading: Figma DM Serif Text, 72px, line-height: 120% (86px), color: #000000 */}
          <h2 className="font-serif font-normal text-[clamp(2.25rem,3.75vw,4.5rem)] leading-[1.2] text-black tracking-tight">
            {renderTitle()}
          </h2>

          {/* Subheading: Figma Google Sans Flex, 30px, line-height: 40px (133%), color: #000000, max-w: 917px */}
          {finalDescription && (
            <p className="font-sans font-normal text-[clamp(1.125rem,1.56vw,1.875rem)] leading-[clamp(1.65rem,2.08vw,2.5rem)] text-black max-w-[917px]">
              {finalDescription}
            </p>
          )}
        </div>

        {/* Group 2085665691: The 3 Cards Container (1684px total width, 26px gap between 544px cards) */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-[clamp(1rem,1.35vw,1.625rem)] w-full max-w-[1684px]">
          {finalCards.map((card, index) => {
            const iconUrl =
              typeof card.icon === 'string'
                ? normalizeImageSrc(card.icon)
                : card.icon?.url
                ? normalizeImageSrc(card.icon.url)
                : '';

            const badgeBg = BADGE_BG_COLORS[index % BADGE_BG_COLORS.length];

            return (
              /* Figma Rectangle 74 / 71 / 73: 544px x 592px, background: rgba(249, 251, 254, 0.7), border: 2px solid #2B88D9, backdrop-filter: blur(15.5px), border-radius: 35px */
              <div
                key={card.id || `card-${index}`}
                style={{
                  background: 'rgba(249, 251, 254, 0.7)',
                  backdropFilter: 'blur(15.5px)',
                  WebkitBackdropFilter: 'blur(15.5px)',
                }}
                className="group relative flex flex-col items-center justify-between text-center w-full lg:w-[clamp(440px,28.33vw,544px)] lg:h-[clamp(520px,30.83vw,592px)] py-[clamp(2rem,3.2vw,3.75rem)] px-[clamp(1.25rem,2.5vw,3.06rem)] border-2 border-[#2B88D9] rounded-[35px] shadow-[0_10px_35px_rgba(43,136,217,0.08)] hover:shadow-[0_18px_50px_rgba(43,136,217,0.18)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Section: Circular Badge + Title + Underline */}
                <div className="flex flex-col items-center w-full">
                  {/* Figma Rectangle 40122: Circular Icon Badge (~121px x 121px, border: 2.2411px solid #2B88D9, border-radius: 102.41px) */}
                  <div
                    style={{ backgroundColor: badgeBg }}
                    className="size-[clamp(90px,6.3vw,121px)] rounded-full border-[2.24px] border-[#2B88D9] flex items-center justify-center p-2 mb-4 lg:mb-6 transition-transform duration-300 group-hover:scale-105"
                  >
                    {iconUrl ? (
                      <div className="relative size-[clamp(44px,3.2vw,62px)]">
                        <Image
                          src={iconUrl}
                          alt={
                            typeof card.icon !== 'string' && card.icon?.alternativeText
                              ? card.icon.alternativeText
                              : card.title
                          }
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <FallbackCardIcon index={index} />
                    )}
                  </div>

                  {/* Card Title: Figma DM Serif Text, 52px, line-height: 71px, letter-spacing: -1px, color: #2B88D9 */}
                  <h3 className="font-serif font-normal text-[clamp(2rem,2.7vw,3.25rem)] leading-[clamp(2.75rem,3.7vw,4.4375rem)] tracking-[-1px] text-[#2B88D9] text-center">
                    {card.title}
                  </h3>

                  {/* Rectangle 40131: Accent Underline Bar (~146px width, background: #2B88D9, border-radius: 10px) */}
                  <div className="w-[clamp(90px,7.6vw,146px)] h-[clamp(4px,0.3vw,6px)] bg-[#2B88D9] rounded-[10px] my-3 sm:my-4 transition-all duration-300 group-hover:w-[clamp(110px,8.5vw,164px)]" />
                </div>

                {/* Card Body: Figma Google Sans Flex, 24px, line-height: 160% (38px), text-align: center, color: #000000 */}
                <p className="font-sans font-normal text-[clamp(0.95rem,1.25vw,1.5rem)] leading-[160%] text-black text-center mt-2 lg:mt-4">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionVisionPromiseSection;
