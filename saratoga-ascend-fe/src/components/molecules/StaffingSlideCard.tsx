'use client';

import { stripHtml } from '@/lib/utils/text';
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';

export interface StaffingSlideCardProps {
  title?: React.ReactNode;
  body?: string;
  imageSrc?: string;
  href?: string;
}

/** Figma Job Card ON_HOVER → Property 1=2, Smart Animate, Quick, 744ms. */
const HOVER_TRANSITION = {
  duration: 0.744,
  ease: [0.2, 0, 0, 1] as const,
};

const DEFAULT_BODY =
  'Connecting cleared, credentialed healthcare professionals with government, military.';

const NAVY_WASH =
  'linear-gradient(180deg, rgb(0 40 69 / 0) 0%, var(--color-brand-navy-band) 100%)';

/**
 * Travel Staffing tile (Figma Node 1899:2263 / 1351:4684).
 * Desktop rest: 402×450px, border-radius: 32px, border: 1px solid #c6c6c6
 * Dark overlay: 20% black + navy foot wash
 * Title rest: DM Serif Text, 44px (2.75rem), line-height: 1.2, color: white, y = 377px
 * Title hover: top = 162px, body fades in at y = 223px
 */
export const StaffingSlideCard: React.FC<StaffingSlideCardProps> = ({
  title = 'Travel Staffing',
  body = DEFAULT_BODY,
  imageSrc = '/images/Rectangle 113.png',
  href = '/what-we-do',
}) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const hovered = Boolean(active && !reduce);
  const motionTime = reduce ? { duration: 0 } : HOVER_TRANSITION;

  return (
    <a
      href={href}
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky select-none"
    >
      <article
        className="relative aspect-[402/450] w-full overflow-hidden rounded-[2rem] border border-[#c6c6c6] bg-white shadow-sm"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Background Photo */}
        <div className="absolute inset-0 size-full pointer-events-none">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 1279px) 300px, 402px"
            className="object-cover pointer-events-none select-none"
            priority
          />
        </div>

        {/* 20% Black Overlay (Figma Node 1351:4665) */}
        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden="true" />
        
        {/* Navy foot wash overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: NAVY_WASH }}
          aria-hidden="true"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: NAVY_WASH }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={motionTime}
        />

        {/* Desktop Title & Hover Body (Figma Node 1351:4667: y: 377px, font-size: 44px, line-height: 1.2) */}
        <motion.div
          className="pointer-events-none absolute hidden xl:flex flex-col items-center justify-center text-center inset-x-0"
          initial={false}
          animate={{
            top: hovered ? '9rem' : '20.5rem',
          }}
          transition={motionTime}
        >
          <h4 className="w-full text-center font-serif text-[1.85rem] sm:text-[2.15rem] xl:text-[2.35rem] leading-[1.2] text-white px-4 tracking-normal drop-shadow-sm line-clamp-2 break-words">
            {stripHtml(title)}
          </h4>
          <motion.p
            className="w-full max-w-[19.75rem] text-center font-sans text-[1.125rem] leading-[1.375rem] font-medium text-white px-2"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              height: hovered ? 'auto' : 0,
              marginTop: hovered ? '0.5rem' : 0,
            }}
            transition={motionTime}
          >
            {body}
          </motion.p>
        </motion.div>

        {/* Mobile / Tablet fallback view */}
        <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center gap-2 px-3.5 xl:hidden">
          <h4 className="w-full text-center font-serif text-[1.75rem] sm:text-[2.25rem] leading-[1.2] text-white">
            {stripHtml(title)}
          </h4>
          <p className="line-clamp-3 w-full min-w-0 break-words text-center font-sans text-[0.875rem] leading-[1.25rem] font-medium text-white">
            {body}
          </p>
        </div>
      </article>
    </a>
  );
};

export default StaffingSlideCard;
