import React from 'react';
import { Container } from '../atoms/Container';
import { HeaderNavList, type HeaderNavItem } from './HeaderNavList';

export interface UtilityBarProps {
  items: HeaderNavItem[];
  activeHref?: string;
}

/**
 * The 60px band above the sticky navigation. It scrolls away with the page.
 */
export const UtilityBar: React.FC<UtilityBarProps> = ({ items, activeHref }) => (
  <div className="relative hidden h-utility-h overflow-hidden bg-brand-surface md:block">
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
