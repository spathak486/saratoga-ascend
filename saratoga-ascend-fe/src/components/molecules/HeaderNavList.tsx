'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRightIcon, CaretDownIcon } from '../atoms/icons';
import { GeneralLink } from '../atoms/GeneralLink';
import { MegaMenu } from '../organisms/MegaMenu';

export interface HeaderNavItem {
  href: string;
  label: string;
  /** Shows the dropdown caret. Every primary item carries one in the design. */
  hasMenu?: boolean;
  /** Utility-bar ↗ used for Careers, Investor Relations, and Blog. */
  hasExternalIcon?: boolean;
}

/**
 * `primary` is the main row inside the sticky bar — 22px near-black at 1920,
 * each item followed by a caret. `utility` is the 22px row in the band above it.
 * `utilityPlain` is the same links on a white ground, used in the compact menu.
 */
export type HeaderNavVariant = 'primary' | 'utility' | 'utilityPlain';
export type HeaderNavOrientation = 'horizontal' | 'vertical';

export interface HeaderNavListProps {
  ariaLabel: string;
  items: HeaderNavItem[];
  activeHref?: string;
  variant: HeaderNavVariant;
  orientation?: HeaderNavOrientation;
  id?: string;
}

/** Rest ink. Hover and the open item are Primary-Red. */
const NAV_HOVER = 'hover:text-brand-red';
const NAV_ACTIVE = 'text-brand-cta-from';
/**
 * Blog listing header prototype: on click, Smart Animate, ease out, 300ms.
 * get_motion_context for the nav row returned no keyframe nodes.
 */
const NAV_MOTION = 'duration-300 ease-out motion-reduce:transition-none';

const variantStyles: Record<
  HeaderNavVariant,
  { size: string; rest: string; active: string }
> = {
  primary: {
    size: 'text-[clamp(1rem,0.25rem+0.9375vw,1.375rem)] leading-[normal]',
    rest: 'text-black',
    active: NAV_ACTIVE,
  },
  utility: {
    size: 'text-[clamp(1rem,0.25rem+0.9375vw,1.375rem)] leading-[1.5]',
    rest: `text-ink ${NAV_HOVER}`,
    active: NAV_ACTIVE,
  },
  utilityPlain: {
    size: 'text-nav',
    rest: 'text-brand-navy hover:text-brand-red',
    active: 'text-brand-red',
  },
};

function isItemActive(pathname: string | undefined, href: string): boolean {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

const gapClass: Record<HeaderNavVariant, Record<HeaderNavOrientation, string>> = {
  primary: {
    horizontal: 'gap-[clamp(0.75rem,1.5625vw,1.875rem)]',
    vertical: 'gap-4',
  },
  utility: {
    horizontal: 'gap-[clamp(0.75rem,1.0417vw,1.25rem)]',
    vertical: 'gap-3',
  },
  utilityPlain: {
    horizontal: 'gap-[clamp(1.5rem,2.08vw,2.5rem)]',
    vertical: 'gap-3',
  },
};

const layoutStyles: Record<HeaderNavOrientation, string> = {
  horizontal: 'flex flex-row flex-nowrap items-center',
  vertical: 'flex flex-col items-start',
};

export const HeaderNavList: React.FC<HeaderNavListProps> = ({
  ariaLabel,
  items,
  activeHref,
  variant,
  orientation = 'horizontal',
  id,
}) => {
  const styles = variantStyles[variant];
  const isPrimaryBar = variant === 'primary' && orientation === 'horizontal';
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<{ href: string; path: string | undefined } | null>(null);
  const openHref = open !== null && open.path === activeHref ? open.href : null;
  const fallbackId = useId();

  useEffect(() => {
    if (!openHref) return undefined;

    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openHref]);

  return (
    <nav
      ref={navRef}
      id={id ?? fallbackId}
      aria-label={ariaLabel}
      className={
        isPrimaryBar
          ? `flex h-full flex-row flex-nowrap items-stretch ${gapClass.primary.horizontal}`
          : `${layoutStyles[orientation]} ${gapClass[variant][orientation]}`
      }
    >
      {items.map((item) => {
        const isActive = isItemActive(activeHref, item.href);
        const showMenu = Boolean(item.hasMenu && isPrimaryBar);
        const isOpen = showMenu && openHref === item.href;

        const caret = showMenu ? (
          <span
            className={`inline-flex origin-center transform-gpu text-current transition-transform ${NAV_MOTION} ${isOpen ? 'rotate-180' : ''}`}
          >
            <CaretDownIcon className="size-[clamp(0.75rem,1.0417vw,1.25rem)]" />
          </span>
        ) : item.hasExternalIcon ? (
          <ArrowUpRightIcon className="size-3" />
        ) : undefined;

        const link = (
          <GeneralLink
            href={item.href}
            variant="unstyled"
            aria-current={isActive ? 'page' : undefined}
            aria-haspopup={showMenu ? 'true' : undefined}
            aria-expanded={showMenu ? isOpen : undefined}
            rightIcon={caret}
            onClick={
              showMenu
                ? (event) => {
                    event.preventDefault();
                    setOpen((current) =>
                      current !== null && current.path === activeHref && current.href === item.href
                        ? null
                        : { href: item.href, path: activeHref },
                    );
                  }
                : undefined
            }
            className={`inline-flex items-center rounded-button font-sans font-medium whitespace-nowrap transition-colors ${NAV_MOTION} ${isPrimaryBar ? `h-full gap-1.5 px-0 ${NAV_HOVER} focus-visible:text-brand-red` : 'gap-2.5 px-3 py-2'} ${styles.size} ${isActive || isOpen ? styles.active : styles.rest} ${!isPrimaryBar && variant === 'primary' ? NAV_HOVER : ''}`}
          >
            {item.label}
          </GeneralLink>
        );

        if (!isPrimaryBar) {
          return (
            <div key={item.href} className="group">
              {link}
            </div>
          );
        }

        return (
          <div
            key={item.href}
            className="group relative flex h-full items-center"
          >
            <div className="relative flex h-full items-center">
              {link}
              <span
                className={`bg-cta-gradient pointer-events-none absolute bottom-0 left-1/2 z-10 block h-1.5 w-[clamp(2.25rem,3.125vw,3.75rem)] -translate-x-1/2 rounded-full transition-opacity ${NAV_MOTION} ${
                isOpen
                  ? 'opacity-0'
                  : isActive
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
              }`}
              aria-hidden="true"
            />
            </div>
            {isOpen ? <MegaMenu type={item.href} /> : null}
          </div>
        );
      })}
    </nav>
  );
};
