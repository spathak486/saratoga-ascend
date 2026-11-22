'use client';

import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import Image from 'next/image';
import { Heading } from '../atoms';

export interface StaffingSlideCardProps {
  title?: React.ReactNode;
  body?: string;
  imageSrc?: string;
  href?: string;
}

/**
 * Figma Job Card 1351:4684 → 1351:4683 ON_HOVER:
 * Smart Animate 744ms Quick. Title y≈377→162; body + navy wash fade in.
 * CMS image comes through `imageSrc` (parent resolves Strapi URLs).
 */
const HOVER_EASE = 'cubic-bezier(0.2, 0, 0, 1)';
const HOVER_MS = 744;

const DEFAULT_BODY =
  'Connecting cleared, credentialed healthcare professionals with government, military.';

const NAVY_WASH =
  'linear-gradient(180deg, rgb(0 40 69 / 0) 0%, var(--color-brand-navy-band) 100%)';

/** 44px @ 402px artboard → scales with card via cqi. */
const TITLE_SIZE = 'clamp(1.125rem, 10.95cqi, 2.75rem)';

export const StaffingSlideCard: React.FC<StaffingSlideCardProps> = ({
  title = 'Travel Staffing',
  body = DEFAULT_BODY,
  imageSrc = '/images/Rectangle 113.png',
  href = '/what-we-do',
}) => {
  const titleText = stripHtml(title);
  const titleWords = titleText.trim().split(/\s+/).filter(Boolean);
  /** Rest state: max 2 words + ellipsis; full title on hover with body. */
  const restTitle =
    titleWords.length > 2 ? `${titleWords.slice(0, 2).join(' ')}\u2026` : titleText;

  return (
    <a
      href={href}
      aria-label={titleText}
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      className="group block select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
    >
      <article
        className="@container relative aspect-[402/450] w-full overflow-hidden rounded-[1.25rem] border border-[#c6c6c6] bg-white shadow-sm lg:rounded-panel"
        style={{ boxSizing: 'border-box' }}
      >
        {/* CMS / prop photo — do not hardcode; parent passes resolved URL */}
        <div className="pointer-events-none absolute inset-0 size-full">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 1279px) 300px, 402px"
            className="pointer-events-none object-cover select-none"
            priority
          />
        </div>

        {/* Rest overlays (Figma 20% black + navy foot wash) */}
        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: NAVY_WASH }}
          aria-hidden="true"
        />

        {/* Hover navy wash (Figma Rectangle 115) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity motion-reduce:transition-none group-hover:opacity-100 group-focus-within:opacity-100"
          style={{
            backgroundImage: NAVY_WASH,
            transitionDuration: `${HOVER_MS}ms`,
            transitionTimingFunction: HOVER_EASE,
          }}
        />

        {/*
          Desktop text — CSS group-hover Smart Animate (744ms Quick).
          Rest top 68% (was 78%): leaves room for 2-line CMS titles + ~1.25rem
          foot clearance so the heading is not clipped. Hover → 36% (Figma y=162).
        */}
        <div
          className="pointer-events-none absolute top-[68%] left-[10.7%] hidden w-[78.61%] flex-col items-center transition-[top] motion-reduce:transition-none group-hover:top-[36%] group-focus-within:top-[36%] lg:flex"
          style={{
            transitionDuration: `${HOVER_MS}ms`,
            transitionTimingFunction: HOVER_EASE,
          }}
        >
          <Heading
            level={3}
            font="serif"
            tone="onDark"
            className="m-0 w-full max-w-full text-center text-balance break-words font-normal leading-[1.2] text-white"
            style={{ fontSize: TITLE_SIZE }}
          >
            <span className="block group-hover:hidden group-focus-within:hidden">
              {restTitle}
            </span>
            <span className="hidden group-hover:block group-focus-within:block">
              {titleText}
            </span>
          </Heading>
          <p
            className="absolute top-full left-0 m-0 mt-2 line-clamp-3 w-full text-center font-sans font-medium text-white opacity-0 transition-opacity motion-reduce:transition-none group-hover:opacity-100 group-focus-within:opacity-100"
            style={{
              fontSize: 'clamp(0.8125rem, 4.48cqi, 1.125rem)',
              lineHeight: '1.375rem',
              transitionDuration: `${HOVER_MS}ms`,
              transitionTimingFunction: HOVER_EASE,
            }}
          >
            {body}
          </p>
        </div>

        {/* Mobile / tablet */}
        <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center gap-2 px-3.5 lg:hidden">
          <Heading
            level={3}
            font="serif"
            tone="onDark"
            className="m-0 w-full max-w-full text-center text-balance break-words font-normal leading-[1.2] text-white"
            style={{ fontSize: '1.375rem' }}
          >
            {titleText}
          </Heading>
          <p className="m-0 line-clamp-4 w-full min-w-0 break-words text-center font-sans text-[0.8125rem] leading-[1.125rem] font-medium text-white">
            {body}
          </p>
        </div>
      </article>
    </a>
  );
};

export default StaffingSlideCard;
