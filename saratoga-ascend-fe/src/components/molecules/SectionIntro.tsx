import React from 'react';
import { Heading, Text, type HeadingTone, type TextSize } from '../atoms';
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
  align = 'end',
  descriptionClassName = '',
  descriptionStyle,
  titleTone = 'ink',
  titleClassName = '',
  descriptionSize = 'body',
  wide = false,
}) => (
  <div
    className={`flex min-w-0 flex-col gap-block lg:flex-row lg:justify-between ${
      align === 'center' ? 'lg:items-center' : 'lg:items-end'
    }`}
  >
    <div className={`flex min-w-0 flex-col gap-3 ${wide ? 'flex-1' : 'max-w-[44rem]'}`}>
      <Heading
        id={id}
        level={2}
        size="section"
        tone={titleTone}
        className={`text-balance ${titleClassName}`.trim()}
      >
        {title}
      </Heading>
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
      <CtaButton href={action.href} className="shrink-0 self-start lg:self-auto">
        {action.label}
      </CtaButton>
    )}
  </div>
);
