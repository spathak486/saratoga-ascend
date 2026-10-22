'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export interface CapabilityCardItem {
  id?: string | number | null;
  title: string;
  description: string;
  icon?: { url: string; alternativeText?: string | null } | string | null;
  isHighlighted?: boolean | null;
}

export interface OurCapabilitiesSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  bgImage?: { url: string } | string | null;
  cards?: CapabilityCardItem[] | null;
}

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

/* Icon 1: wellness_15189616 1 (Healthcare Workforce - Hands cradling medical cross) */
function HealthcareWorkforceIcon({ className = 'w-9 h-9 text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.4">
      {/* Supporting Hands */}
      <path
        d="M10 32C13 36 18 38 24 38C30 38 35 36 38 32"
        strokeLinecap="round"
      />
      <path
        d="M8 26L14 31M40 26L34 31"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Medical Cross */}
      <path
        d="M21 12H27V18H33V24H27V30H21V24H15V18H21V12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

/* Icon 2: school_12767537 (1) 1 (Healthcare & Public Health - Clinic building with columns and cross) */
function PublicHealthClinicIcon({ className = 'w-9 h-9 text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.4">
      {/* Roof Pediment */}
      <path d="M8 18L24 8L40 18H8Z" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clinic Cross in pediment */}
      <path d="M24 11V15M22 13H26" strokeLinecap="round" strokeWidth="2" />
      {/* Columns */}
      <path d="M12 22V36M20 22V36M28 22V36M36 22V36" strokeLinecap="round" strokeWidth="2.6" />
      {/* Base platform */}
      <path d="M6 40H42" strokeLinecap="round" strokeWidth="2.6" />
    </svg>
  );
}

/* Icon 3: support_17138618 1 (Behavioral & Mental Health - Head profile with brain/care emblem) */
function MentalHealthCareIcon({ className = 'w-9 h-9 text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.4">
      {/* Head outline */}
      <path
        d="M14 38V34C14 28 17 25 21 24C19 21 19 16 22 13C25 10 31 10 34 13C37 16 37 21 35 24C38 25 40 28 40 32C40 34 39 36 38 38"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Heart / Mind caring symbol inside */}
      <path
        d="M28 18C28 16 30 15 31.5 16.5C33 15 35 16 35 18C35 21 31.5 23 31.5 23C31.5 23 28 21 28 18Z"
        fill="currentColor"
        stroke="none"
      />
      {/* Hand beneath supporting */}
      <path d="M10 40H26" strokeLinecap="round" />
    </svg>
  );
}

/* Icon 4: monitor_8601937 1 (IT & Digital - Desktop monitor with code/circuit) */
function DigitalSolutionsIcon({ className = 'w-9 h-9 text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.4">
      {/* Monitor frame */}
      <rect x="8" y="10" width="32" height="22" rx="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Screen code elements */}
      <path d="M16 18L13 21L16 24M22 18L25 21L22 24M28 23H34" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stand */}
      <path d="M24 32V38M16 38H32" strokeLinecap="round" strokeWidth="2.6" />
    </svg>
  );
}

/* Icon 5: pharmacy_18241307 1 (Contact Center - Headset and communication dialog) */
function ContactCenterIcon({ className = 'w-9 h-9 text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.4">
      {/* Headset Arc */}
      <path d="M12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24" strokeLinecap="round" />
      {/* Earpads */}
      <rect x="10" y="22" width="5" height="9" rx="2.5" fill="currentColor" />
      <rect x="33" y="22" width="5" height="9" rx="2.5" fill="currentColor" />
      {/* Microphone Boom */}
      <path d="M35 29V32C35 34.2 33.2 36 31 36H25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23" cy="36" r="2" fill="currentColor" />
      {/* Dialog lines */}
      <path d="M18 20H24M18 24H28" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

/* Icon 6: management_17226357 1 (Program & Administrative - Clipboard & gears) */
function AdminManagementIcon({ className = 'w-9 h-9 text-[#2B88D9]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="2.4">
      {/* Clipboard */}
      <rect x="10" y="12" width="28" height="30" rx="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clip at top */}
      <path d="M18 12V9C18 7.9 18.9 7 20 7H28C29.1 7 30 7.9 30 9V12" strokeLinecap="round" />
      {/* Checkmarks & lines */}
      <path d="M16 20L19 23L26 16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
      <path d="M16 28H30M16 34H26" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

const DEFAULT_CAPABILITY_ICONS = [
  HealthcareWorkforceIcon,
  PublicHealthClinicIcon,
  MentalHealthCareIcon,
  DigitalSolutionsIcon,
  ContactCenterIcon,
  AdminManagementIcon,
];

function getCapabilityIcon(title: string, index: number) {
  const t = (title || '').toLowerCase();
  if (t.includes('workforce') || t.includes('wellness')) return HealthcareWorkforceIcon;
  if (t.includes('public health') || t.includes('clinic') || t.includes('school')) return PublicHealthClinicIcon;
  if (t.includes('mental') || t.includes('behavioral') || t.includes('psych')) return MentalHealthCareIcon;
  if (t.includes('it') || t.includes('digital') || t.includes('tech') || t.includes('monitor')) return DigitalSolutionsIcon;
  if (t.includes('contact') || t.includes('center') || t.includes('pharmacy')) return ContactCenterIcon;
  if (t.includes('admin') || t.includes('management') || t.includes('program')) return AdminManagementIcon;
  return DEFAULT_CAPABILITY_ICONS[index % DEFAULT_CAPABILITY_ICONS.length];
}

export function OurCapabilitiesSection({
  title,
  highlightTitle,
  description,
  bgImage,
  cards,
}: OurCapabilitiesSectionProps) {
  // STRICT RULE: If CMS data is missing or empty, render nothing (no static dummy fallback)
  if (!cards || cards.length === 0) {
    return null;
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      const progress = Math.min(1, Math.max(0, scrollLeft / maxScroll));
      setScrollProgress(progress);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    } else {
      setScrollProgress(0);
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
  }, [cards, updateScrollState]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardStep = 474; // Card 454px + gap 20px
    el.scrollBy({
      left: direction === 'left' ? -cardStep : cardStep,
      behavior: 'smooth',
    });
  };

  // Render title with highlight (case-insensitive substring match or appended if separate field in CMS)
  const renderTitle = () => {
    const rawTitle = title?.trim() || '';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawTitle && !rawHighlight) return null;
    if (!rawHighlight) return rawTitle;
    if (!rawTitle) return <span className="text-[#D31E2D] font-normal">{rawHighlight}</span>;

    const escapedHighlight = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === rawHighlight.toLowerCase()) {
          return (
            <span key={i} className="text-[#D31E2D] font-normal block">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      });
    }

    // If highlightTitle is separate in CMS (e.g. title: "One organization.", highlightTitle: "Connected solution areas.")
    return (
      <>
        <span className="block">{rawTitle}</span>
        <span className="text-[#D31E2D] font-normal block">{rawHighlight}</span>
      </>
    );
  };

  const bgUrl = typeof bgImage === 'string' ? bgImage : bgImage?.url;

  return (
    <section
      aria-label={title || highlightTitle || 'Our Capabilities'}
      /* Figma: width: 1920px; height: 722px; background: #F9F9F9; */
      className="relative w-full max-w-[1920px] mx-auto min-h-[722px] bg-[#F9F9F9] py-[60px] lg:py-[80px] overflow-hidden flex flex-col justify-center"
    >
      {/* Background Graphic Blueprint / Grid Overlay (Figma Group 2085665682) */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-10 z-0"
        style={{
          backgroundImage: bgUrl
            ? `url(${normalizeImageSrc(bgUrl)})`
            : `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: bgUrl ? 'cover' : '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
        
        {/* Left Column: Title & Description (Figma Group 2085665668: width: 872px, left: 120px, top: 135px) */}
        <div className="w-full lg:w-[45%] xl:w-[872px] shrink-0 px-6 sm:px-10 lg:pl-[120px] lg:pr-6 flex flex-col justify-center">
          {/* Main Title: DM Serif Text, 72px, line-height: 86px (120%), color: #0A0A0A */}
          <h2 className="font-['DM_Serif_Text'] text-[36px] sm:text-[50px] lg:text-[72px] leading-[115%] lg:leading-[86px] text-[#0A0A0A] font-normal mb-6 lg:mb-8">
            {renderTitle()}
          </h2>

          {/* Subtitle Description: Google Sans Flex, 26px, line-height: 36px (138%), color: #475569 */}
          {description && (
            <p className="font-['Google_Sans_Flex'] text-[18px] sm:text-[22px] lg:text-[26px] leading-[28px] sm:leading-[32px] lg:leading-[36px] text-[#475569] font-normal max-w-[711px]">
              {description}
            </p>
          )}
        </div>

        {/* Right Column: Carousel Frame (Figma Frame 2147226442: width: 1032px, height: 474px) */}
        <div className="w-full lg:w-[55%] xl:flex-1 min-w-0 flex flex-col">
          <div
            ref={scrollContainerRef}
            className="flex flex-row overflow-x-auto gap-[20px] scrollbar-none scroll-smooth px-6 sm:px-10 lg:pl-0 lg:pr-[120px] pb-6 pt-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {cards.map((card, index) => {
              const iconUrl = typeof card.icon === 'string' ? card.icon : card.icon?.url;
              const CardIcon = getCapabilityIcon(card.title, index);

              return (
                /* Card: width: 434px / 454px, height: 436px / 456px, border-radius: 0px 66.5985px 0px 0px */
                <div
                  key={card.id ?? `capability-card-${index}`}
                  style={{ scrollSnapAlign: 'start' }}
                  className="box-border relative shrink-0 w-[300px] sm:w-[380px] md:w-[434px] min-h-[420px] md:h-[436px] bg-[#FFFFFF] border-[1.11px] border-[#CFCFCF] hover:border-[#2B88D9] rounded-tr-[66.6px] rounded-tl-none rounded-bl-none rounded-br-none shadow-[0px_0px_16.65px_rgba(0,0,0,0.09)] transition-all duration-300 p-8 md:p-10 flex flex-col items-center text-center justify-between group"
                >
                  {/* Top Icon Box: Rectangle 40094 (background: #E4EBF1, border-radius: 15px, 64px x 64px) */}
                  <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-[15px] bg-[#E4EBF1] group-hover:bg-[#D5E7F7] flex items-center justify-center transition-colors mb-6 shrink-0">
                    {iconUrl ? (
                      <div className="relative w-9 h-9 md:w-10 md:h-10">
                        <Image
                          src={normalizeImageSrc(iconUrl)}
                          alt={card.title}
                          fill
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <CardIcon className="w-8 h-8 md:w-9 md:h-9 text-[#2B88D9]" />
                    )}
                  </div>

                  {/* Card Content Block */}
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Card Title: DM Serif Text, 28px, line-height: 38px, color: #2B2B2B */}
                    <h3 className="font-['DM_Serif_Text'] text-[22px] sm:text-[25px] md:text-[28px] leading-[30px] md:leading-[38px] text-[#2B2B2B] font-normal mb-3 md:mb-4">
                      {card.title}
                    </h3>

                    {/* Card Description: Google Sans Flex / DM Sans, 20px, line-height: 28px, color: #212121 */}
                    <p className="font-['Google_Sans_Flex'] text-[15px] sm:text-[17px] md:text-[20px] leading-[22px] sm:leading-[25px] md:leading-[28px] text-[#212121] font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Carousel Controls: Progress Track (Group 2085665683) & Navigation Buttons (Group 2085665688) */}
          <div className="mt-8 px-6 sm:px-10 lg:pl-0 lg:pr-[120px] flex items-center justify-between gap-6">
            
            {/* Scroll Progress Bar (Figma: width: 659px, height: 6px, background: #D9D9D9) */}
            <div className="flex-1 max-w-[659px] h-[6px] bg-[#D9D9D9] rounded-full overflow-hidden relative">
              {/* Active Progress Bar (Figma Rectangle 40135: width: 176px, background: #2B88D9) */}
              <div
                className="h-full bg-[#2B88D9] rounded-full transition-all duration-200"
                style={{
                  width: '26.7%', // 176px / 659px = 26.7%
                  transform: `translateX(${scrollProgress * (659 - 176) * (100 / 176)}%)`,
                }}
              />
            </div>

            {/* Circular Navigation Buttons: Group 2085665688 (width: 152px, height: 66px) */}
            <div className="flex items-center gap-[20px] shrink-0">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous capability"
                className={`flex items-center justify-center w-[54px] h-[54px] md:w-[66px] md:h-[66px] rounded-full border-[1.375px] border-[#000000] transition-all duration-200 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                  canScrollLeft
                    ? 'bg-white hover:bg-[#F3F4F6] active:scale-95 text-[#000000] cursor-pointer'
                    : 'bg-white/60 opacity-40 cursor-not-allowed text-[#000000]'
                }`}
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
                >
                  <path d="M20 24L12 16.5L20 9" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next capability"
                className={`flex items-center justify-center w-[54px] h-[54px] md:w-[66px] md:h-[66px] rounded-full border-[1.375px] border-[#000000] transition-all duration-200 shadow-[0px_1.375px_2.75px_rgba(16,24,40,0.05)] ${
                  canScrollRight
                    ? 'bg-white hover:bg-[#F3F4F6] active:scale-95 text-[#000000] cursor-pointer'
                    : 'bg-white/60 opacity-40 cursor-not-allowed text-[#000000]'
                }`}
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
                >
                  <path d="M13 24L21 16.5L13 9" />
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default OurCapabilitiesSection;
