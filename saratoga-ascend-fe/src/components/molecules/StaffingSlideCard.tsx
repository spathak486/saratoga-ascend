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
  ease: [0.25, 0.1, 0.25, 1] as const,
};

const DEFAULT_BODY =
  'Connecting cleared, credentialed healthcare professionals with government, military.';

/**
 * Travel Staffing tile (Figma Job Card 2002:260 / 2002:266).
 * Rest: photo, 20% wash, title at y=377.
 * Hover: extra navy wash, title rises to y=162, body fades in.
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

  return (
    <a
      href={href}
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group block rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
    >
      <article className="relative aspect-[402/450] w-full overflow-hidden rounded-panel border border-brand-line">
        <MediaFrame
          src={imageSrc}
          alt=""
          pendingLabel="Rectangle 113.png"
          tone="navy"
          sizes="(max-width: 768px) 90vw, 402px"
          imageClassName="object-cover! pointer-events-none"
          className="absolute inset-0 size-full border-0"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy-band/70 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-brand-navy-band"
          initial={false}
          animate={{ opacity: hovered ? 0.72 : 0 }}
          transition={reduce ? { duration: 0 } : HOVER_TRANSITION}
        />

        <motion.div
          className="absolute inset-x-[10.7%] flex flex-col items-center text-center"
          initial={false}
          animate={{ top: hovered ? '36%' : '83.78%' }}
          transition={reduce ? { duration: 0 } : HOVER_TRANSITION}
        >
          <Heading
            level={3}
            size="subtitle"
            font="serif"
            tone="onDark"
            className="text-[2.75rem] leading-[1.2] text-white"
          >
            {title}
          </Heading>
          <motion.p
            className="w-full max-w-[19.75rem] overflow-hidden text-[1.125rem] leading-[1.375rem] font-medium text-white"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              height: hovered ? 66 : 0,
              marginTop: hovered ? 8 : 0,
            }}
            transition={reduce ? { duration: 0 } : HOVER_TRANSITION}
          >
            {body}
          </motion.p>
        </motion.div>
      </article>
    </a>
  );
};
