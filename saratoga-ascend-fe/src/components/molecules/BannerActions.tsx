import React from 'react';
import { GeneralLink } from '../atoms/GeneralLink';
import { BrandIcon } from '../atoms/BrandIcon';

export interface BannerActionsProps {
  primaryText?: string;
  secondaryText?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export const BannerActions: React.FC<BannerActionsProps> = ({
  primaryText = 'Discuss Your Mission',
  secondaryText = 'Explore Solutions',
  primaryHref = '#core-components',
  secondaryHref = '#primary-colors',
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-4">
      <GeneralLink
        href={primaryHref}
        variant="button"
        buttonVariant="primaryRed"
        size="lg"
        rightIcon={<BrandIcon name="arrowRight" size="sm" />}
      >
        {primaryText}
      </GeneralLink>

      <GeneralLink
        href={secondaryHref}
        variant="button"
        buttonVariant="outlineWhite"
        size="lg"
      >
        {secondaryText}
      </GeneralLink>
    </div>
  );
};
