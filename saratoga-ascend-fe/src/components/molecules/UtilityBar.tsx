import React from 'react';
import { Container } from '../atoms/Container';
import { HeaderNavList, type HeaderNavItem } from './HeaderNavList';

export interface UtilityBarProps {
  items: HeaderNavItem[];
  activeHref?: string;
}

/**
 * Band above the sticky navigation. Uses the 60px utility token (Figma frame is 61px).
 * It scrolls away with the page.
 */
export const UtilityBar: React.FC<UtilityBarProps> = ({ items, activeHref }) => (
  <div className="relative hidden h-utility-h overflow-hidden bg-brand-surface xl:block">
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
