import React from 'react';
import { Container, type ContainerSize } from './Container';

/** Background treatments available to a homepage band. */
export type SectionTone = 'surface' | 'muted' | 'navy' | 'navyDeep' | 'band';

/** Vertical rhythm, derived from the `--spacing-section` token. */
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  tone?: SectionTone;
  spacing?: SectionSpacing;
  /**
   * Render children outside the page column. Use when a band paints its own
   * full-bleed media and places `<Container>` internally.
   */
  bleed?: boolean;
  containerSize?: ContainerSize;
  className?: string;
  containerClassName?: string;
}

const toneStyles: Record<SectionTone, string> = {
  surface: 'bg-brand-surface text-brand-navy',
  muted: 'bg-brand-surface-muted text-brand-navy',
  navy: 'bg-brand-navy text-brand-on-dark',
  navyDeep: 'bg-brand-navy-deep text-brand-on-dark',
  band: 'bg-brand-band text-brand-on-dark',
};

const spacingStyles: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-[calc(var(--spacing-section)*0.5)]',
  md: 'py-[calc(var(--spacing-section)*0.75)]',
  lg: 'py-section',
};

export const Section: React.FC<SectionProps> = ({
  children,
  tone = 'surface',
  spacing = 'lg',
  bleed = false,
  containerSize = 'home',
  className = '',
  containerClassName = '',
  ...props
}) => (
  <section
    className={`relative ${toneStyles[tone]} ${spacingStyles[spacing]} ${className}`.trim()}
    {...props}
  >
    {bleed ? (
      children
    ) : (
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    )}
  </section>
);
