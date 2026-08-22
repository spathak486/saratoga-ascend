import React from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Visual steps from the `--text-*` scale in `globals.css`. `display`, `award`
 * and `bandTitle` belong to sections not yet rebuilt against the current
 * design and go away with them.
 */
export type HeadingSize =
  | 'hero'
  | 'section'
  | 'feature'
  | 'subtitle'
  | 'statLabel'
  | 'display'
  | 'award'
  | 'bandTitle';

export type HeadingFont = 'serif' | 'sans';

/** Headings are near-black in this design; navy is for body copy. */
export type HeadingTone = 'ink' | 'navy' | 'red' | 'onDark' | 'inherit';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Document outline position. Choose for semantics, not for size. */
  level?: HeadingLevel;
  /** Visual step. Defaults to the natural size for `level`. */
  size?: HeadingSize;
  font?: HeadingFont;
  tone?: HeadingTone;
  children: React.ReactNode;
  className?: string;
}

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: 'hero',
  2: 'section',
  3: 'subtitle',
  4: 'subtitle',
  5: 'subtitle',
  6: 'subtitle',
};

const sizeStyles: Record<HeadingSize, string> = {
  hero: 'text-hero',
  section: 'text-section',
  feature: 'text-feature',
  subtitle: 'text-subtitle',
  statLabel: 'text-stat-label',
  display: 'text-display',
  award: 'text-award',
  bandTitle: 'text-band-title',
};

const toneStyles: Record<HeadingTone, string> = {
  ink: 'text-ink',
  navy: 'text-brand-navy',
  red: 'text-brand-red',
  onDark: 'text-brand-on-dark',
  inherit: '',
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  size,
  font = 'serif',
  tone = 'ink',
  children,
  className = '',
  ...props
}) => {
  const Tag = `h${level}` as const;
  const fontClass = font === 'serif' ? 'font-serif' : 'font-sans';

  return (
    <Tag
      className={`${fontClass} ${sizeStyles[size ?? defaultSizeForLevel[level]]} ${toneStyles[tone]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
};
