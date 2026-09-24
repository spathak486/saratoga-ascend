import React from 'react';
import { ArrowUpRightIcon, CaretDownIcon } from '../atoms/icons';
import { GeneralLink } from '../atoms/GeneralLink';

export interface HeaderNavItem {
  href: string;
  label: string;
  /** Shows the dropdown caret. Every primary item carries one in the design. */
  hasMenu?: boolean;
  /** Utility-bar ↗ used for Careers, Investor Relations, and Blog. */
  hasExternalIcon?: boolean;
}

/**
 * `primary` is the main row inside the sticky bar — 22px near-black, each item
 * followed by a caret. `utility` is the 18px row in the 60px band above it.
 * `utilityPlain` is the same links on a white ground, used in the mobile drawer.
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

/** Rest ink. Hover is Primary-Red; current page is prime-r/400-m plus the dash. */
const NAV_HOVER = 'hover:text-brand-red';
const NAV_ACTIVE = 'text-brand-cta-from';
/** Figma hover: label, caret, and dash share this timing. */
const NAV_MOTION =
  'duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none';

const variantStyles: Record<
  HeaderNavVariant,
  { size: string; rest: string; active: string }
> = {
  primary: {
    size: 'text-body',
    rest: `text-ink ${NAV_HOVER}`,
    active: NAV_ACTIVE,
  },
  utility: {
    size: 'text-body',
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
    horizontal: 'gap-5',
    vertical: 'gap-4',
  },
  utility: {
    horizontal: 'gap-5',
    vertical: 'gap-3',
  },
  utilityPlain: {
    horizontal: 'gap-[clamp(1.5rem,2.08vw,2.5rem)]',
    vertical: 'gap-3',
  },
};

const layoutStyles: Record<HeaderNavOrientation, string> = {
  horizontal: 'flex flex-row flex-wrap items-center',
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

  return (
    <nav
      id={id}
      aria-label={ariaLabel}
      className={`${layoutStyles[orientation]} ${gapClass[variant][orientation]} ${isPrimaryBar ? 'h-full flex-nowrap items-stretch' : ''}`}
    >
      {items.map((item) => {
        const isActive = isItemActive(activeHref, item.href);

        const caret = item.hasMenu ? (
          <span
            className={`inline-flex origin-center transform-gpu transition-transform ${NAV_MOTION} group-hover:rotate-180 group-focus-within:rotate-180`}
          >
            <CaretDownIcon className="size-3" />
          </span>
        ) : item.hasExternalIcon ? (
          <ArrowUpRightIcon className="size-3" />
        ) : undefined;

        const link = (
          <GeneralLink
            href={item.href}
            variant="unstyled"
            aria-current={isActive ? 'page' : undefined}
            aria-haspopup={item.hasMenu ? 'true' : undefined}
            rightIcon={caret}
            className={`inline-flex items-center gap-2.5 rounded-lg px-3 py-2 font-sans font-medium leading-[1.5] whitespace-nowrap transition-colors ${NAV_MOTION} ${isPrimaryBar ? 'h-full' : ''} ${styles.size} ${isActive ? styles.active : styles.rest} ${isPrimaryBar ? 'group-hover:text-brand-red group-focus-within:text-brand-red' : ''}`}
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
            {link}
            <span
              className={`bg-cta-gradient pointer-events-none absolute bottom-0 left-1/2 z-10 block h-1.5 w-[3.75rem] -translate-x-1/2 rounded-full transition-opacity ${NAV_MOTION} ${
                isActive
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
              }`}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </nav>
  );
};
