'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

export interface FederalTag {
  id?: string;
  text: string;
}

export interface FederalMissionCardItem {
  id?: string;
  documentId?: string;
  stepNumber?: string | null;
  title: string;
  subheading: string;
  description: string;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | string | null;
  tags?: (FederalTag | string)[] | null;
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

// Default 4 cards matching exact Figma specifications (Why Depoter: Frame 2085663703 / 01 to 04 of 07)
const DEFAULT_CARDS: FederalMissionCardItem[] = [
  {
    stepNumber: '01/07',
    title: 'Federal Government Overview',
    subheading: 'Supporting Federal Missions with Purpose',
    description:
      'Federal agencies operate in complex environments where service continuity, workforce readiness, secure technology, and accountable execution matter. Saratoga Ascend brings integrated capabilities across healthcare, workforce support, IT and digital services, contact center operations, and program administration.',
    image: '/images/federal-mission-photo.jpg',
    tags: [
      'Healthcare',
      'Workforce',
      'IT & Digital',
      'Contact Center',
      'Program Support',
    ],
  },
  {
    stepNumber: '02/07',
    title: 'Defense & Military',
    subheading: 'Supporting the People Behind the Mission',
    description:
      'Defense and military environments depend on prepared teams, coordinated operations, and reliable support services. Saratoga Ascend’s capabilities can align to mission-support requirements across healthcare delivery, workforce operations, technology enablement, contact center support, and program administration, subject to the specific scope and requirements of each opportunity.',
    image: '/images/defense-military-photo.jpg',
    cta: {
      label: 'Explore Relevant Capabilities',
      href: '/solutions',
    },
  },
  {
    stepNumber: '03/07',
    title: 'Veterans Affairs',
    subheading: 'Care and Support That Honor Veterans',
    description:
      'Veterans deserve responsive, respectful services throughout their care and support journey. Saratoga Ascend’s healthcare, workforce, contact center, technology, and administrative capabilities can support requirements serving veteran communities and the teams responsible for their care.',
    image: '/images/veterans-affairs-photo.jpg',
    cta: {
      label: 'Explore Relevant Capabilities',
      href: '/solutions',
    },
  },
  {
    stepNumber: '04/07',
    title: 'State & Local Government (SLED)',
    subheading: 'Helping State and Local Teams Deliver Essential Services',
    description:
      'State, local, and educational public-sector organizations face evolving service demands, workforce needs, and operational priorities. Saratoga Ascend can align its integrated service capabilities to defined SLED requirements, helping teams plan, coordinate, and deliver essential programs.',
    image: '/images/phase4/market-state-local.png',
    cta: {
      label: 'Explore Relevant Capabilities',
      href: '/solutions',
    },
  },
];

interface StackedCardProps {
  card: FederalMissionCardItem;
  index: number;
  total: number;
}

function StackedFederalCard({ card, index, total }: StackedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Each card will stick near the top as the user scrolls, creating the stacked deck effect
  // Top offset increases slightly (e.g. 80px + index * 24px) for layered card visibility
  const stickyTop = 80 + index * 24;

  const rawImg =
    typeof card.image === 'string'
      ? card.image
      : card.image?.url || DEFAULT_CARDS[index % DEFAULT_CARDS.length].image;
  const imageUrl = normalizeImageSrc(typeof rawImg === 'string' ? rawImg : rawImg?.url);

  const tagsList: string[] = (card.tags || []).map((t) => (typeof t === 'string' ? t : t.text));

  // Step number formatted dynamically from list length (e.g. 01/07, 02/07)
  const currentStep = String(index + 1).padStart(2, '0');
  const totalSteps = String(total).padStart(2, '0');
  const displayStepNumber = `${currentStep}/${totalSteps}`;

  return (
    <div
      ref={cardRef}
      style={{
        top: `${stickyTop}px`,
        zIndex: index + 10,
      }}
      className="sticky w-full max-w-[1494px] mx-auto mb-16 lg:mb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="box-border relative w-full min-h-[720px] xl:min-h-[823px] rounded-[32px] sm:rounded-[42px] border border-[#2B88D9] p-6 sm:p-12 xl:p-[64px] flex flex-col justify-between overflow-hidden shadow-[0px_20px_50px_rgba(43,136,217,0.12)] transition-shadow duration-300"
        style={{
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #91CCFF',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Horizontal Dividing Blue Line from Figma: Line 217 */}
        <div className="hidden lg:block absolute right-[64px] top-[173px] w-[calc(45%+40px)] max-w-[712px] h-0 border-t-[2.67px] border-[#2B88D9] pointer-events-none z-0" />

        {/* Top Header Row: Step Pill (01/07) + Main Title (DM Serif Text, 44px) */}
        <div className="flex flex-col items-start gap-4 mb-6 z-10">
          {/* Step Number Pill: Frame 2085663833 (width: 114.67px, height: 51px, bg: #212121, border: 1.33px #FFF7E4, radius: 66.67px) */}
          <div className="inline-flex items-center justify-center px-5 py-2 min-w-[110px] h-[48px] sm:h-[51px] bg-[#212121] border-[1.33px] border-[#FFF7E4] rounded-[66.67px] shadow-sm">
            <span
              className="font-medium text-[22px] sm:text-[28px] leading-[35px] text-white text-center tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {displayStepNumber}
            </span>
          </div>

          {/* Title: DM Serif Text, 44px/53.3px, color #212121 */}
          <h2
            className="font-serif text-[32px] sm:text-[40px] xl:text-[44px] leading-[1.25] xl:leading-[60px] font-normal text-[#212121]"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {card.title}
          </h2>
        </div>

        {/* Center / Body Section: 2 Columns (Left: Subheading, Desc, Tags/CTA - Right: Photo Box) */}
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-8 xl:gap-[60px] z-10 flex-1">
          {/* Left Column (Width ~ 679px) */}
          <div className="w-full lg:w-[52%] flex flex-col justify-between">
            <div>
              {/* Subheading: Google Sans Flex, 38px, font-weight 600, color #212121 */}
              <h3
                className="font-sans text-[24px] sm:text-[30px] xl:text-[38px] leading-[1.26] xl:leading-[48px] font-semibold text-[#212121] mb-5 sm:mb-6"
                style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              >
                {card.subheading}
              </h3>

              {/* Description: Google Sans Flex, 24px, line-height 40px, color #000000 */}
              <p
                className="font-sans text-[16px] sm:text-[20px] xl:text-[24px] leading-[26px] sm:leading-[32px] xl:leading-[40px] font-normal text-[#000000] mb-8"
                style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              >
                {card.description}
              </p>
            </div>

            {/* Bottom Row: Tags or Link CTA */}
            <div className="mt-auto pt-4">
              {tagsList.length > 0 ? (
                /* Interactive Tag Chips (Frames 2147226549 - 2147226553) */
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
                /* Link CTA with Arrow (Group 2085665786 / Group 2085665787) */
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
                  {/* Arrow Icon */}
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

          {/* Right Column: Photo Box (Rectangle 39800: width: 653px, height: 499px, border: 1.33px #2B88D9, radius: 40px) */}
          <div className="w-full lg:w-[46%] min-h-[320px] sm:min-h-[420px] xl:min-h-[499px] relative rounded-[32px] sm:rounded-[40px] border-[1.33px] border-[#2B88D9] overflow-hidden shadow-lg self-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-[#EBF6FF] flex items-center justify-center">
                <span className="text-[#2B88D9] font-medium">Mission Photo</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FederalGovernmentSection({
  referenceTitle,
  title,
  cards,
}: FederalGovernmentSectionProps) {
  const displayCards: FederalMissionCardItem[] =
    cards && cards.length > 0 ? cards : DEFAULT_CARDS;

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
        {displayCards.map((card, idx) => (
          <StackedFederalCard
            key={card.id ?? card.documentId ?? `fed-card-${idx}`}
            card={card}
            index={idx}
            total={displayCards.length}
          />
        ))}
      </div>
    </section>
  );
}
export default FederalGovernmentSection;
