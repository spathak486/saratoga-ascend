import React from 'react';
import { GeneralLink } from '../atoms/GeneralLink';

export interface HeaderNavItem {
  href: string;
  label: string;
}

export interface HeaderNavListProps {
  ariaLabel: string;
  items: HeaderNavItem[];
  activeHref?: string;
  variant: 'utility' | 'primary';
  orientation?: 'horizontal' | 'vertical';
  id?: string;
}

const variantClass: Record<HeaderNavListProps['variant'], string> = {
  utility: 'font-sans text-[20px] leading-[32px] font-normal text-brand-navy hover:text-brand-red',
  primary:
    'relative font-sans text-[32px] leading-[52px] font-normal text-brand-navy hover:text-brand-red',
};

const layoutClass: Record<NonNullable<HeaderNavListProps['orientation']>, string> = {
  horizontal: 'flex flex-row items-center',
  vertical: 'flex flex-col items-stretch',
};

const gapClass: Record<
  HeaderNavListProps['variant'],
  Record<NonNullable<HeaderNavListProps['orientation']>, string>
> = {
  utility: {
    horizontal: 'gap-[80px]',
    vertical: 'gap-4',
  },
  primary: {
    horizontal: 'gap-[41px]',
    vertical: 'gap-2',
  },
};

export const HeaderNavList: React.FC<HeaderNavListProps> = ({
  ariaLabel,
  items,
  activeHref,
  variant,
  orientation = 'horizontal',
  id,
}) => {
  return (
    <nav id={id} aria-label={ariaLabel} className={`${layoutClass[orientation]} ${gapClass[variant][orientation]}`}>
      {items.map((item) => {
        const isActive = activeHref === item.href;

        return (
          <GeneralLink
            key={item.href}
            href={item.href}
            variant="unstyled"
            aria-current={isActive ? 'page' : undefined}
            className={`${variantClass[variant]} whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy ${
              isActive && variant === 'primary' && orientation === 'horizontal'
                ? "after:absolute after:left-[11px] after:right-[11px] after:bottom-[-2px] after:h-[6px] after:bg-brand-navy after:content-['']"
                : ''
            }`}
          >
            {item.label}
          </GeneralLink>
        );
      })}
    </nav>
  );
};
