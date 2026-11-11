import React from 'react';
import { ArrowUpRightIcon } from '../atoms/icons';
import { GeneralLink } from '../atoms/GeneralLink';
import type { ActionVariant } from '../atoms/actionStyles';

/**
 * The page's one call to action: a red-to-blue gradient button with a trailing
 * arrow. It appears in the header, the hero and most sections, so it lives
 * here rather than being reassembled from `GeneralLink` each time.
 *
 * `square` is the 8px corner used wherever the button sits on the page ground.
 * `pill` is the fully rounded shape the file uses when the button sits inside
 * a card, where a square corner would echo the card's own.
 */
export type CtaShape = 'square' | 'pill';

export interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  shape?: CtaShape;
  /** Drop the arrow — the file omits it on the in-card "Learn More". */
  showArrow?: boolean;
  buttonVariant?: ActionVariant;
  className?: string;
}

/**
 * Primary CTA Button Arrow:
 * Resting state: pointing straight horizontally (&rarr;)
 * Hover state: rotates 45° up-right (cross / diagonal arrow) smoothly
 */
function PrimaryHorizontalToCrossArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="size-[1.2em] shrink-0 origin-center rotate-0 transition-transform duration-300 ease-out group-hover:-rotate-45 group-focus-visible:-rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-focus-visible:rotate-0"
    >
      <path
        d="M4.5 12H19.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13.5 6L19.5 12L13.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Secondary button keeps the fixed cross arrow (Figma default) */
const fixedCrossArrow = <ArrowUpRightIcon className="size-[1.2em]" />;

export const CtaButton: React.FC<CtaButtonProps> = ({
  href,
  children,
  shape = 'square',
  showArrow = true,
  buttonVariant = 'cta',
  className = '',
}) => {
  const isSecondary =
    buttonVariant === 'outlineNavy' ||
    buttonVariant === 'outlineLight' ||
    buttonVariant === 'ghost';

  const renderArrow = () => {
    if (!showArrow) return undefined;
    if (isSecondary) return fixedCrossArrow;
    // Primary gradient CTA: horizontal arrow that animates to cross (-45deg) on hover
    return <PrimaryHorizontalToCrossArrow />;
  };

  return (
    <GeneralLink
      href={href}
      variant="button"
      buttonVariant={buttonVariant}
      size={shape === 'pill' ? 'ctaPill' : 'cta'}
      rightIcon={renderArrow()}
      className={`group whitespace-nowrap ${isSecondary ? '' : 'transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]'} ${className}`.trim()}
    >
      {children}
    </GeneralLink>
  );
};
