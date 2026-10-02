import React from 'react';
import { GeneralLink, Heading, Text, type HeadingTone, type TextSize } from '../atoms';
import { ArrowUpRightIcon } from '../atoms/icons';
import { CtaButton } from './CtaButton';

export interface SectionIntroProps {
  id?: string;
  title: string;
  description: React.ReactNode;
  /** Optional trailing CTA — "About us" on the What We Do band. */
  action?: {
    href: string;
    label: string;
  };
  /**
   * `inlineLink` is the mobile What We Do treatment (Figma 2002:1979):
   * title and text link share a row; the gradient CTA stays on desktop.
   */
  actionVariant?: 'cta' | 'inlineLink';
  /**
   * Cross-axis alignment of the heading block against the CTA on wide
   * screens. Defaults to `end` (current sections' baseline-aligned look);
   * What We Do's row centres the CTA against the two-line heading instead.
   */
  align?: 'end' | 'center';
  /** Extra classes for the description — What We Do's copy is ink, not navy. */
  descriptionClassName?: string;
  /**
   * Inline style for the description. Used to pin the exact ink hex where a
   * band's Figma copy departs from the shared `Text` "ink" tone (an inline
   * style beats the tone class regardless of Tailwind's generated rule
   * order).
   */
  descriptionStyle?: React.CSSProperties;
  titleTone?: HeadingTone;
  titleClassName?: string;
  descriptionSize?: TextSize;
  /** Drop the 44rem heading cap so the title/lede can span the row. */
  wide?: boolean;
  className?: string;
}

/**
 * Section heading block: serif title, body subtitle, and an optional gradient
 * button aligned to the opposite end on wide screens.
 */
export const SectionIntro: React.FC<SectionIntroProps> = ({
  id,
  title,
  description,
  action,
  actionVariant = 'cta',
  align = 'end',
  descriptionClassName = '',
  descriptionStyle,
  titleTone = 'ink',
  titleClassName = '',
  descriptionSize = 'body',
  wide = false,
  className = 'gap-block',
}) => (
  <div
    className={`flex min-w-0 flex-col lg:flex-row lg:justify-between ${
      align === 'center' ? 'lg:items-center' : 'lg:items-end'
    } ${className}`}
  >
    <div className={`flex min-w-0 flex-col gap-3 ${wide ? 'flex-1' : 'max-w-[44rem]'}`}>
      <div className="flex w-full items-start gap-3">
        <Heading
          id={id}
          level={2}
          size="section"
          tone={titleTone}
          className={`min-w-0 flex-1 text-balance ${titleClassName}`.trim()}
        >
          {title}
        </Heading>
        {action && actionVariant === 'inlineLink' ? (
          <GeneralLink
            href={action.href}
            variant="unstyled"
            className="hidden shrink-0 items-center gap-3 pt-1 text-[1.125rem] leading-[1.625rem] text-[#3688ce] transition-opacity duration-150 hover:opacity-80 max-[89.99rem]:inline-flex"
            contentClassName="flex items-center justify-center gap-2.5"
          >
            {action.label}
            <ArrowUpRightIcon className="size-6" />
          </GeneralLink>
        ) : null}
      </div>
      <Text
        size={descriptionSize}
        tone="ink"
        className={descriptionClassName.trim()}
        style={descriptionStyle}
      >
        {description}
      </Text>
    </div>

    {action && (
      <CtaButton
        href={action.href}
        className={`shrink-0 self-start lg:self-auto ${
          actionVariant === 'inlineLink' ? 'max-[89.99rem]:hidden' : ''
        }`}
      >
        {action.label}
      </CtaButton>
    )}
  </div>
);
