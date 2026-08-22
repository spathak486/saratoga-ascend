import React from 'react';
import { CaretDownIcon } from '../atoms/icons';
import { GeneralLink } from '../atoms/GeneralLink';

export interface HeaderNavItem {
  href: string;
  label: string;
  /** Shows the dropdown caret. Every primary item carries one in the design. */
  hasMenu?: boolean;
}

/**
 * `primary` is the main row inside the sticky bar — 22px near-black, each item
 * followed by a caret. `utility` is the smaller row in the band above it,
 * white on the blue gradient. `utilityPlain` is the same links on a white
 * ground, used in the mobile drawer.
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

const variantStyles: Record<
  HeaderNavVariant,
  { size: string; rest: string; active: string }
> = {
  primary: {
    size: 'text-body',
    rest: 'text-ink hover:text-brand-red',
    active: 'text-brand-red',
  },
  utility: {
    size: 'text-nav',
    rest: 'text-brand-on-dark hover:text-brand-on-dark/75',
    active: 'text-brand-on-dark underline underline-offset-4',
  },
  utilityPlain: {
    size: 'text-nav',
    rest: 'text-brand-navy hover:text-brand-red',
    active: 'text-brand-red',
  },
};

const gapClass: Record<HeaderNavVariant, Record<HeaderNavOrientation, string>> = {
  primary: {
    /* Items are positioned loosely on the artboard; this gap tracks the
       average spacing as the row narrows. */
    horizontal: 'gap-[clamp(1.25rem,2.5vw,2.75rem)]',
    vertical: 'gap-4',
  },
  utility: {
    horizontal: 'gap-[clamp(1.5rem,2.08vw,2.5rem)]',
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

  return (
    <nav
      id={id}
      aria-label={ariaLabel}
      className={`${layoutStyles[orientation]} ${gapClass[variant][orientation]}`}
    >
      {items.map((item) => {
        const isActive = activeHref === item.href;

        return (
          <GeneralLink
            key={item.href}
            href={item.href}
            variant="unstyled"
            aria-current={isActive ? 'page' : undefined}
            aria-haspopup={item.hasMenu ? 'true' : undefined}
            rightIcon={
              item.hasMenu ? <CaretDownIcon className="size-[0.73em]" /> : undefined
            }
            className={`inline-flex items-center gap-1.5 font-sans font-medium leading-[1.5] whitespace-nowrap transition-colors duration-150 ${styles.size} ${isActive ? styles.active : styles.rest}`}
          >
            {item.label}
          </GeneralLink>
        );
      })}
    </nav>
  );
};
