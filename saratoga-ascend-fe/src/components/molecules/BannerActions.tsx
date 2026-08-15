import React from 'react';
import { Button } from '../atoms/Button';

export interface BannerActionsProps {
  primaryText?: string;
  secondaryText?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export const BannerActions: React.FC<BannerActionsProps> = ({
  primaryText = 'Connect Now',
  secondaryText = 'Explore Brand Story',
  primaryHref = '#primary-colors',
  secondaryHref = '#brand-values',
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-4">
      <a href={primaryHref}>
        <Button variant="primaryRed" size="lg" className="inline-flex items-center gap-3">
          <span>{primaryText}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </a>
      <a href={secondaryHref}>
        <Button variant="outlineNavy" size="lg" className="border-white/30 text-white hover:bg-white/20">
          {secondaryText}
        </Button>
      </a>
    </div>
  );
};
