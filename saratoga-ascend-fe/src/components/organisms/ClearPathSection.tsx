'use client';

import React from 'react';
import { Heading, Text } from '../atoms';

export interface ClearPathStepItem {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  icon?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface ClearPathSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  cards?: ClearPathStepItem[] | null;
}

const DEFAULT_STEPS: ClearPathStepItem[] = [
  {
    number: '01',
    title: 'Understand the Requirement',
    description: 'Clarify mission context, scope, and desired outcomes.',
    image: {
      url: '/images/supporting-missions-doctor.png',
      alternativeText: 'Understand the Requirement',
    },
  },
  {
    number: '02',
    title: 'Align Capabilities',
    description: 'Identify relevant service areas and delivery needs.',
    image: {
      url: '/images/healthcare-team.png',
      alternativeText: 'Align Capabilities',
    },
  },
  {
    number: '03',
    title: 'Define the Approach',
    description: 'Discuss an approach aligned to the requirement.',
    image: {
      url: '/images/confident-healthcare-team.png',
      alternativeText: 'Define the Approach',
    },
  },
  {
    number: '04',
    title: 'Support Delivery',
    description: 'Coordinate around agreed responsibilities and expectations.',
    image: {
      url: '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
      alternativeText: 'Support Delivery',
    },
  },
];

const ARC_RADIUS = 113.75;
const ARC_PITCH = 440;
const PHOTO = 206;
const GAP = 234;
const SIDE = 10.75;

function mediaUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

function stepNumber(step: ClearPathStepItem, index: number): string {
  return step.number || String(index + 1).padStart(2, '0');
}

function timelineUnits(count: number): number {
  return SIDE * 2 + count * PHOTO + Math.max(0, count - 1) * GAP;
}

function arcPath(count: number): string {
  const parts: string[] = [];
  for (let index = 0; index < count; index += 1) {
    const center = ARC_RADIUS + index * ARC_PITCH;
    parts.push(index === 0 ? `M ${center - ARC_RADIUS} ${ARC_RADIUS}` : `L ${center - ARC_RADIUS} ${ARC_RADIUS}`);
    parts.push(`A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${center + ARC_RADIUS} ${ARC_RADIUS}`);
  }
  return parts.join(' ');
}

function renderTitle(title: string, highlightTitle?: string | null) {
  const highlight = highlightTitle?.trim() || '';
  if (!highlight) return title;
  const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = title.split(new RegExp(`(${escaped})`, 'i'));
  if (parts.length === 1) {
    return (
      <>
        <span>{title}</span>{' '}
        <span className="text-brand-red whitespace-nowrap">{highlight}</span>
      </>
    );
  }
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={`${part}-${index}`} className="text-brand-red whitespace-nowrap">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function StepCopy({ step }: { step: ClearPathStepItem }) {
  return (
    <div className="min-w-0">
      <h3 className="font-serif text-[clamp(1.125rem,1rem+0.6vw,1.75rem)] leading-none font-normal text-[#2f2f2f]">
        {step.title}
      </h3>
      <div className="mt-5 h-px w-[4.5rem] bg-black" aria-hidden="true" />
      <p className="mt-5 font-sans text-[clamp(0.9375rem,0.85rem+0.3vw,1.25rem)] leading-[1.4] font-light text-[#212121]">
        {step.description}
      </p>
    </div>
  );
}

function portraitSrc(step: ClearPathStepItem, index: number): string {
  return mediaUrl(step.image?.url) || mediaUrl(DEFAULT_STEPS[index % DEFAULT_STEPS.length]?.image?.url);
}

function StepPortrait({
  step,
  index,
  className,
}: {
  step: ClearPathStepItem;
  index: number;
  className?: string;
}) {
  const src = portraitSrc(step, index);
  return (
    <div className={`relative aspect-square ${className ?? ''}`}>
      <div className="size-full overflow-hidden rounded-full bg-[#E4EBF1]">
        {src ? (
          <img
            src={src}
            alt={step.image?.alternativeText || step.title}
            className="size-full object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
          />
        ) : null}
      </div>
      <div
        className={`absolute -top-[14.56%] z-20 flex size-[37.38%] items-center justify-center rounded-full border-white bg-[#E4EBF1] ${
          index === 0 ? '-left-[4.85%]' : 'left-0'
        }`}
        style={{ borderWidth: 'clamp(2px, 0.26cqw, 4px)' }}
      >
        <span className="font-serif text-[clamp(1.25rem,2.45cqw,2.375rem)] leading-none text-black">
          {stepNumber(step, index)}
        </span>
      </div>
    </div>
  );
}

export function ClearPathSection({
  title = 'A Clear Path from Need to Delivery',
  highlightTitle = 'Need to Delivery',
  description = 'We begin by understanding the mission, operating context, scope, and desired outcomes—then identify the capabilities and delivery approach that best fit the requirement.',
  cards,
}: ClearPathSectionProps) {
  const steps = (cards && cards.length > 0 ? cards : DEFAULT_STEPS).slice(0, 4);
  const count = steps.length;
  const units = timelineUnits(count);
  const arcWidth = Math.max(0, count - 1) * ARC_PITCH + ARC_RADIUS * 2;
  const photoFraction = PHOTO / units;
  const arcTop = `${(photoFraction / 2 - ARC_RADIUS / units) * 100}cqw`;
  const columns = [
    `${SIDE}fr`,
    ...steps.flatMap((_, index) => (index < count - 1 ? [`${PHOTO}fr`, `${GAP}fr`] : [`${PHOTO}fr`])),
    `${SIDE}fr`,
  ].join(' ');

  return (
    <section
      aria-label={title || 'A Clear Path from Need to Delivery'}
      className="relative mx-auto w-full max-w-home overflow-visible bg-white px-[var(--spacing-gutter)] py-12 xl:pt-20 xl:pb-20"
    >
      <div>
        <Heading level={2} size="section" font="sans" tone="inherit" className="font-semibold text-black">
          {renderTitle(title || 'A Clear Path from Need to Delivery', highlightTitle)}
        </Heading>
        {description ? (
          <Text size="lead" tone="inherit" className="mt-4 max-w-[80.625rem] text-black" style={{ lineHeight: 1.6667 }}>
            {description}
          </Text>
        ) : null}
      </div>

      <div className="@container relative mt-10 hidden w-full max-w-[96.71875rem] xl:mt-[5.625rem] xl:ml-[2.25rem] xl:w-[calc(100%-2.25rem)] xl:block">
        <svg
          className="pointer-events-none absolute left-0 z-0 w-full"
          style={{ top: arcTop }}
          viewBox={`0 0 ${arcWidth} ${ARC_RADIUS}`}
          fill="none"
          aria-hidden="true"
        >
          <path d={arcPath(count)} stroke="url(#clear-path-arc)" strokeWidth="1.5" />
          <defs>
            <linearGradient id="clear-path-arc" x1="0" y1={ARC_RADIUS / 2} x2={arcWidth} y2={ARC_RADIUS} gradientUnits="userSpaceOnUse">
              <stop stopColor="#D31E2D" />
              <stop offset="1" stopColor="#2A91DC" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 grid items-start" style={{ gridTemplateColumns: columns }}>
          <div className="relative row-start-1 self-stretch" style={{ gridColumn: 1 }}>
            <span className="absolute top-1/2 left-0 size-[0.517cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cta-from" />
          </div>
          {steps.map((step, index) => {
            const photoColumn = 2 + index * 2;
            return (
              <React.Fragment key={step.id ?? step.documentId ?? `clear-path-${index}`}>
                <div className="row-start-1" style={{ gridColumn: photoColumn }}>
                  <StepPortrait step={step} index={index} className="w-full" />
                </div>
                {index < count - 1 ? (
                  <div className="relative row-start-1 self-stretch" style={{ gridColumn: photoColumn + 1 }}>
                    <div className="absolute top-1/2 left-1/2 z-10 flex aspect-square w-[23.08%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_0_15px_rgba(0,0,0,0.25)]">
                      <svg viewBox="0 0 24 24" className="w-[44%] text-[#141B34]" fill="none" aria-hidden="true">
                        <path d="M9 5.5l6.5 6.5L9 18.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ) : null}
                <div className="row-start-2 mt-3.5 w-[127%]" style={{ gridColumn: photoColumn }}>
                  <h3 className="font-serif text-[clamp(1rem,1.81cqw,1.75rem)] leading-none font-normal text-[#2f2f2f]">
                    {step.title}
                  </h3>
                  <div className="mt-5 h-px w-[5.625rem] bg-black" aria-hidden="true" />
                  <p className="mt-5 font-sans text-[clamp(0.875rem,1.29cqw,1.25rem)] leading-[1.4] font-light text-[#212121]">
                    {step.description}
                  </p>
                </div>
              </React.Fragment>
            );
          })}
          <div className="relative row-start-1 self-stretch" style={{ gridColumn: count * 2 + 1 }}>
            <span className="absolute top-1/2 right-0 size-[0.517cqw] translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cta-to" />
          </div>
        </div>
      </div>

      <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:hidden">
        {steps.map((step, index) => (
          <li key={step.id ?? step.documentId ?? `clear-path-stack-${index}`} className="min-w-0">
            <StepPortrait step={step} index={index} className="w-[min(100%,12.875rem)]" />
            <div className="mt-4 max-w-[20rem]">
              <StepCopy step={step} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
