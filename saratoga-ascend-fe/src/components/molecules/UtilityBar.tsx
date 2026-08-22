import React from 'react';
import { Container } from '../atoms/Container';
import { HeaderNavList, type HeaderNavItem } from './HeaderNavList';

export interface UtilityBarProps {
  items: HeaderNavItem[];
  activeHref?: string;
}

/**
 * The 60px band above the sticky navigation. It scrolls away with the page.
 *
 * The blue only covers the right half of the artboard, fading in from nothing
 * so it has no left edge — it reads as a wash off the corner rather than a
 * bar. Painted at 52% width so it keeps that proportion on any screen instead
 * of the fade landing mid-logo on a narrow one.
 */
export const UtilityBar: React.FC<UtilityBarProps> = ({ items, activeHref }) => (
  <div className="relative hidden h-utility-h overflow-hidden md:block">
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 w-[52%] bg-utility-band"
    />

    <Container className="relative flex h-full items-center justify-end">
      <HeaderNavList
        ariaLabel="Utility"
        items={items}
        activeHref={activeHref}
        variant="utility"
      />
    </Container>
  </div>
);
