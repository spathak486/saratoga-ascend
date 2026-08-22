import React from 'react';
import { ArrowUpRightIcon } from '../atoms/icons';
import { GeneralLink } from '../atoms/GeneralLink';

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
  className?: string;
}

/* Sized in `em` so the arrow rides the button's fluid type scale rather than
   needing a clamp of its own: 1.2em of the 20px label is the file's 24px. */
const arrow = <ArrowUpRightIcon className="size-[1.2em]" />;

export const CtaButton: React.FC<CtaButtonProps> = ({
  href,
  children,
  shape = 'square',
  showArrow = true,
  className = '',
}) => (
  <GeneralLink
    href={href}
    variant="button"
    buttonVariant="cta"
    size={shape === 'pill' ? 'ctaPill' : 'cta'}
    rightIcon={showArrow ? arrow : undefined}
    className={`whitespace-nowrap ${className}`.trim()}
  >
    {children}
  </GeneralLink>
);
