'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

export interface MegaMenuProps {
  type: string;
}

const MENU_CONTENT: Record<string, { label: string; href: string }[]> = {
  '/who-we-serve': [
    { label: 'Federal Government', href: '/federal' },
    { label: 'State and Local Government', href: '/state-local' },
    { label: 'Specialized Markets', href: '/specialized' },
  ],
  '/government-buyers': [
    { label: 'Contract Vehicles & Procurement', href: '/contract-vehicles' },
    { label: 'Capabilities Statement', href: '/capabilities' },
  ],
  '/what-we-do': [
    { label: 'Healthcare & Public Health Solutions', href: '/healthcare-public-health' },
    { label: 'Behavioral & Mental Health Solutions', href: '/behavioral-mental-health' },
    { label: 'Healthcare Workforce Solutions', href: '/healthcare-workforce' },
    { label: 'IT & Digital Solutions', href: '/it-digital' },
    { label: 'Program & Administrative Support Solutions', href: '/program-administrative-support' },
  ],
  '/about': [
    { label: 'Our Story', href: '/story' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Careers', href: '/careers' },
  ],
};

/**
 * Blog listing header prototype: Smart Animate, ease out, 300ms.
 * get_motion_context returned no keyframe nodes, so only this timing is applied.
 */
const MENU_MOTION = 'duration-300 ease-out motion-reduce:transition-none';

function MenuArrow() {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      className="size-[22px] shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 11h12M12 6l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type }) => {
  const links = MENU_CONTENT[type];
  const reduceMotion = useReducedMotion();
  if (!links) return null;

  return (
    <motion.div
      className="absolute top-full left-1/2 z-50 w-[min(32.875rem,calc(100vw-2*var(--spacing-gutter)))] -translate-x-1/2 pt-0"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-10 rounded-[20px] border border-brand-hairline bg-brand-tile/95 p-[39px] backdrop-blur-[25px]">
        {links.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            className={`group/link relative flex items-center justify-between gap-6 text-ink transition-colors ${MENU_MOTION} hover:text-brand-red focus-visible:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red ${
              index > 0
                ? 'before:absolute before:inset-x-0 before:-top-5 before:h-px before:bg-black/15'
                : ''
            }`}
          >
            <span className="font-sans text-[18px] font-medium leading-[1.5]">
              {link.label}
            </span>
            <span
              className={`inline-flex text-inherit transition-transform ${MENU_MOTION} group-hover/link:[transform:translate(3px,-3px)_rotate(-45deg)] group-focus-visible/link:[transform:translate(3px,-3px)_rotate(-45deg)]`}
            >
              <MenuArrow />
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
