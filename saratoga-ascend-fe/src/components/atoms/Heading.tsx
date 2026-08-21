import React from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Visual steps from the `--text-*` scale in `globals.css`. */
export type HeadingSize =
  | 'display'
  | 'hero'
  | 'section'
  | 'award'
  | 'subtitle'
  | 'bandTitle';

export type HeadingFont = 'serif' | 'sans';
export type HeadingTone = 'navy' | 'red' | 'onDark' | 'inherit';

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
  display: 'text-display',
  hero: 'text-hero',
  section: 'text-section',
  award: 'text-award',
  subtitle: 'text-subtitle',
  bandTitle: 'text-band-title',
};

const toneStyles: Record<HeadingTone, string> = {
  navy: 'text-brand-navy',
  red: 'text-brand-red',
  onDark: 'text-brand-on-dark',
  inherit: '',
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  size,
  font = 'serif',
  tone = 'navy',
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
