'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Heading } from '../atoms';
import { MediaFrame } from '../atoms/MediaFrame';

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
 * Travel Staffing tile (Figma Job Card 2002:261 / 2002:266).
 * Desktop rest: 402×450, 32px corners, 1px #C6C6C6, 20% black + navy foot wash,
 * title at y=377. Hover (744ms Quick): second navy wash, title to y=162,
 * 18/22 body at y=223.
 * Mobile instance 2105:646 is 246×276 — title + body stay centered at rest.
 */
export const StaffingSlideCard: React.FC<StaffingSlideCardProps> = ({
  title = 'Travel Staffing',
  body = DEFAULT_BODY,
  imageSrc = '/images/Rectangle%20113.png',
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
      className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
    >
      <article
        className="relative aspect-[402/450] w-full overflow-hidden rounded-[1.25rem] xl:rounded-panel"
        style={{ border: '1px solid #c6c6c6', boxSizing: 'border-box' }}
      >
        <MediaFrame
          src={imageSrc}
          alt=""
          pendingLabel="Rectangle 113.png"
          tone="navy"
          sizes="(max-width: 1279px) 246px, 402px"
          imageClassName="object-cover! pointer-events-none"
          className="absolute inset-0 size-full border-0"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden="true" />
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

        <motion.div
          className="pointer-events-none absolute hidden xl:block"
          initial={false}
          animate={{
            top: hovered ? 162 : 377,
            left: hovered ? 43 : 58,
            width: hovered ? 316 : 285,
          }}
          transition={motionTime}
        >
          <Heading
            level={3}
            size="subtitle"
            font="serif"
            tone="onDark"
            className="w-[285px] text-[2.75rem] leading-[1.2] text-white xl:mx-auto"
          >
            {title}
          </Heading>
          <motion.p
            className="w-full text-center font-sans text-[1.125rem] leading-[1.375rem] font-medium text-white"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              height: hovered ? 66 : 0,
              marginTop: hovered ? 8 : 0,
            }}
            transition={motionTime}
          >
            {body}
          </motion.p>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center gap-2 px-3.5 xl:hidden">
          <Heading
            level={3}
            size="subtitle"
            font="serif"
            tone="onDark"
            className="w-full text-center text-[1.375rem] leading-[1.2] text-white"
          >
            {title}
          </Heading>
          <p className="w-full text-center font-sans text-[0.8125rem] leading-[1.125rem] font-medium text-white">
            {body}
          </p>
        </div>
      </article>
    </a>
  );
};
