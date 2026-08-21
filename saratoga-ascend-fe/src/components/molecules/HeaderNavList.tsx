import React from 'react';
import { GeneralLink } from '../atoms/GeneralLink';

export interface HeaderNavItem {
  href: string;
  label: string;
}

/**
 * `utility` is the small row above the logo line (Duru Sans 20px).
 * `primary` is the main navigation (Duru Sans 25px), where the active item
 * turns red and carries a 6px red bar along its full width.
 */
export type HeaderNavVariant = 'utility' | 'primary';
export type HeaderNavOrientation = 'horizontal' | 'vertical';

export interface HeaderNavListProps {
  ariaLabel: string;
  items: HeaderNavItem[];
  activeHref?: string;
  variant: HeaderNavVariant;
  orientation?: HeaderNavOrientation;
  id?: string;
}

const sizeClass: Record<HeaderNavVariant, string> = {
  utility: 'text-nav',
  primary: 'text-nav-lg',
};

const gapClass: Record<HeaderNavVariant, Record<HeaderNavOrientation, string>> = {
  utility: {
    horizontal: 'gap-[clamp(1.5rem,3.2vw,3.5rem)]',
    vertical: 'gap-4',
  },
  primary: {
    horizontal: 'gap-[clamp(1.25rem,2.4vw,2.5rem)]',
    vertical: 'gap-3',
  },
};

const layoutClass: Record<HeaderNavOrientation, string> = {
  horizontal: 'flex flex-row flex-wrap items-center',
  vertical: 'flex flex-col items-stretch',
};

export const HeaderNavList: React.FC<HeaderNavListProps> = ({
  ariaLabel,
  items,
  activeHref,
  variant,
  orientation = 'horizontal',
  id,
}) => (
  <nav
    id={id}
    aria-label={ariaLabel}
    className={`${layoutClass[orientation]} ${gapClass[variant][orientation]}`}
  >
    {items.map((item) => {
      const isActive = activeHref === item.href;
      const showBar = isActive && variant === 'primary';

      return (
        <GeneralLink
          key={item.href}
          href={item.href}
          variant="unstyled"
          aria-current={isActive ? 'page' : undefined}
          className={`relative whitespace-nowrap font-sans ${sizeClass[variant]} transition-colors duration-150 hover:text-brand-red ${
            isActive ? 'text-brand-red' : 'text-brand-navy'
          } ${
            showBar
              ? "after:absolute after:inset-x-0 after:-bottom-1 after:h-1.5 after:bg-brand-red after:content-['']"
              : ''
          }`}
        >
          {item.label}
        </GeneralLink>
      );
    })}
  </nav>
);
