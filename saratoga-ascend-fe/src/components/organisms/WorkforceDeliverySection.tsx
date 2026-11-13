'use client';

import { cleanHeadingHtml, stripHtml } from '@/lib/utils/text';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface WorkforceDeliveryCard {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface WorkforceDeliverySectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  cards?: WorkforceDeliveryCard[] | null;
}

// 6 default steps matching exact Figma Frame 2147226538
const DEFAULT_STEPS: WorkforceDeliveryCard[] = [
  {
    number: '01',
    title: 'Credentialing & Verification',
    description: 'Support for qualification review, documentation, and readiness coordination.',
    image: {
      url: '/images/supporting-missions-doctor.png',
      alternativeText: 'Credentialing & Verification',
    },
  },
  {
    number: '02',
    title: 'Compliance Support',
    description: 'Workforce processes aligned with contractual, operational, and organizational requirements.',
    image: {
      url: '/images/healthcare-team.png',
      alternativeText: 'Compliance Support',
    },
  },
  {
    number: '03',
    title: 'Continuity & Communication',
    description: 'Structured coordination to support reliable workforce performance and service continuity.',
    image: {
      url: '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
      alternativeText: 'Continuity & Communication',
    },
  },
  {
    number: '04',
    title: 'Scalable Delivery',
    description: 'Flexible models designed for planned growth, surge demand, and changing program needs.',
    image: {
      url: '/images/confident-healthcare-team.png',
      alternativeText: 'Scalable Delivery',
    },
  },
  {
    number: '05',
    title: 'Performance Visibility',
    description: 'Ongoing communication and reporting to support workforce oversight.',
    image: {
      url: '/images/pharmacist-portrait.png',
      alternativeText: 'Performance Visibility',
    },
  },
  {
    number: '06',
    title: 'Continuous Improvement',
    description: 'Feedback and operational insights inform better workforce delivery over time.',
    image: {
      url: '/images/future-doctor.png',
      alternativeText: 'Continuous Improvement',
    },
  },
];

const CONNECTOR_DASH = 12.92;
const CONNECTOR_CYCLE = CONNECTOR_DASH * 2;
/** This file exported no motion. The earlier prototype was 400ms delay, linear, 300ms. */
const CONNECTOR_DELAY_S = 0.4;
const CONNECTOR_DURATION_S = 0.3;
const CONNECTOR_PATH =
  'M 0 315.96 H 40.61 A 47.6 47.6 0 0 0 88.2 268.36 V 98.13 A 47.6 47.6 0 0 1 135.8 50.53 H 626.63 A 47.6 47.6 0 0 0 674.22 2.93 V 0';

function useConnectorMotion() {
  const reduceMotion = useReducedMotion();
  return {
    initial: { strokeDashoffset: 0 },
    animate: { strokeDashoffset: reduceMotion ? 0 : -CONNECTOR_CYCLE },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: CONNECTOR_DURATION_S,
          delay: CONNECTOR_DELAY_S,
          ease: 'linear' as const,
          repeat: Infinity,
        },
  };
}

function ConnectorLine({ fromRightPhoto }: { fromRightPhoto: boolean }) {
  const motionProps = useConnectorMotion();
  const shared: React.CSSProperties = {
    top: '100%',
    width: 'calc(100% - 1.5 * var(--delivery-photo))',
    height: 'calc(var(--delivery-photo) / 2 + 0.75rem)',
  };
  const place: React.CSSProperties = fromRightPhoto
    ? { ...shared, right: 'calc(var(--delivery-photo) / 2)' }
    : {
        ...shared,
        right: 'calc(100% - var(--delivery-photo) / 2)',
        transform: 'scaleX(-1)',
        transformOrigin: 'top right',
      };

  return (
    <svg
      viewBox="0 0 674.885 316.621"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute z-0 hidden xl:block"
      style={place}
    >
      <motion.path
        d={CONNECTOR_PATH}
        stroke="#022E4C"
        strokeWidth="1.322"
        strokeDasharray={`${CONNECTOR_DASH} ${CONNECTOR_DASH}`}
        strokeLinecap="round"
        opacity="0.8"
        {...motionProps}
      />
    </svg>
  );
}

const FALLBACK_IMAGES = [
  '/images/supporting-missions-doctor.png',
  '/images/healthcare-team.png',
  '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
  '/images/confident-healthcare-team.png',
  '/images/pharmacist-portrait.png',
  '/images/future-doctor.png',
];

function StepCopy({
  stepNum,
  title,
  description,
}: {
  stepNum: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-3 md:flex-row md:gap-4 xl:w-auto xl:gap-[23.8px]">
      <div className="flex w-full items-center justify-center rounded-full border border-[#212121] bg-[#2B88D9] p-[10px] md:w-16 md:shrink-0 md:self-stretch md:p-0 xl:w-[clamp(3.5rem,4.4vw,5.288rem)] xl:rounded-[42.3px] xl:border-[1.322px]">
        <span className="font-serif text-[1.75rem] font-normal leading-none text-white xl:text-[clamp(1.75rem,2.3vw,2.75rem)]">
          {stepNum}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 xl:w-[min(42.94rem,42vw)] xl:flex-none xl:gap-[23.8px]">
        <h3 className="font-serif text-[clamp(1.5rem,1.1rem+1vw,2.75rem)] font-normal leading-tight text-[#212121] xl:text-[clamp(1.75rem,2.3vw,2.75rem)] xl:leading-[1.36]">
          {stripHtml(title)}
        </h3>
        <div className="flex min-h-[7.5rem] min-w-0 items-center overflow-hidden rounded-[1.75rem] border border-[#2B88D9] bg-[#E4EBF1] px-5 py-4 xl:min-h-[clamp(7.5rem,8.7vw,10.41rem)] xl:rounded-[42.3px] xl:border-[1.058px] xl:px-[clamp(1.25rem,1.65vw,1.983rem)] xl:py-[clamp(0.75rem,0.83vw,0.99rem)]">
          <p className="line-clamp-4 min-w-0 break-words font-sans text-base font-normal leading-snug text-black xl:text-[clamp(1.05rem,1.46vw,1.75rem)] xl:leading-[1.6]">
            {stripHtml(description)}
          </p>
        </div>
      </div>
    </div>
  );
}

function StepPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="size-52 shrink-0 overflow-hidden rounded-full bg-neutral-100 sm:size-64 md:size-72 xl:size-[var(--delivery-photo)]">
      <img src={src} alt={alt} className="size-full object-cover object-center" />
    </div>
  );
}

function VerticalConnector() {
  const motionProps = useConnectorMotion();

  return (
    <div className="flex h-12 w-full justify-center xl:hidden" aria-hidden="true">
      <svg className="h-full w-4" viewBox="0 0 4 48" fill="none">
        <motion.path
          d="M 2 0 V 48"
          stroke="#022E4C"
          strokeWidth="1.322"
          strokeDasharray={`${CONNECTOR_DASH} ${CONNECTOR_DASH}`}
          strokeLinecap="round"
          opacity="0.8"
          {...motionProps}
        />
      </svg>
    </div>
  );
}

export function WorkforceDeliverySection({
  title = 'Workforce delivery built on accountability.',
  highlightTitle,
  cards,
}: WorkforceDeliverySectionProps) {
  const displayCards: WorkforceDeliveryCard[] = cards && cards.length > 0 ? cards : DEFAULT_STEPS;

  // Title rendering logic: supports highlighted text in Brand Red (#F01424)
  const renderTitle = () => {
    const rawTitle = title?.trim() || 'Workforce delivery built on accountability.';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawHighlight) {
      return <span className="text-[#F01424]">{rawTitle}</span>;
    }

    const escaped = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) =>
        part.toLowerCase() === rawHighlight.toLowerCase() ? (
          <span key={i} className="text-[#F01424]">
            {part}
          </span>
        ) : (
          <span key={i} className="text-[#000000]">
            {part}
          </span>
        )
      );
    }

    return (
      <>
        <span className="text-[#F01424]">{rawHighlight} </span>
        <span className="text-[#000000]">{rawTitle}</span>
      </>
    );
  };

  return (
    <section
      aria-label={title || 'Workforce delivery built on accountability.'}
      className="relative mx-auto w-full max-w-[1920px] bg-white py-12 xl:py-[80px] px-page overflow-hidden max-sm:px-6!"
    >
      {/* Header Container (Group 2085665728: fluid clamp matching standard design system) */}
      <div className="mb-10 w-full max-w-[1354px] xl:mb-[60px]">
        <h2
          className="font-serif text-[clamp(2.25rem,1.5rem+2.6vw,4.5rem)] leading-[1.15] font-normal tracking-tight"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {renderTitle()}
        </h2>
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[1528px] flex-col gap-8 xl:gap-3"
        style={{ '--delivery-photo': 'clamp(16rem, 26.3vw, 31.563rem)' } as React.CSSProperties}
      >
        {displayCards.map((card, index) => {
          const stepNum = card.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);
          const isLeftText = index % 2 === 0;
          const isNotLast = index < displayCards.length - 1;
          const imageSrc = card.image?.url || FALLBACK_IMAGES[index] || FALLBACK_IMAGES[FALLBACK_IMAGES.length - 1];

          return (
            <div key={card.id ?? card.documentId ?? `delivery-step-${index}`} className="relative w-full">
              <div className="relative z-10 flex w-full flex-col items-center gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
                <StepPhoto src={imageSrc} alt={card.image?.alternativeText || stripHtml(card.title)} />
                <div className={`w-full min-w-0 md:max-w-[46%] xl:max-w-none xl:w-auto ${isLeftText ? 'md:order-first' : ''}`}>
                  <StepCopy stepNum={stepNum} title={cleanHeadingHtml(card.title)} description={stripHtml(card.description)} />
                </div>
              </div>
              {isNotLast ? (
                <>
                  <VerticalConnector />
                  <ConnectorLine fromRightPhoto={isLeftText} />
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
