import React from 'react';

/** Visual steps from the `--text-*` scale in `globals.css`. */
export type TextSize = 'lead' | 'body' | 'caption' | 'eyebrow';

export type TextTone = 'navy' | 'muted' | 'red' | 'onDark' | 'onDarkMuted' | 'inherit';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: TextSize;
  tone?: TextTone;
  as?: 'p' | 'span' | 'div';
  className?: string;
}

const sizeStyles: Record<TextSize, string> = {
  lead: 'text-body-lg',
  body: 'text-body',
  caption: 'text-caption',
  eyebrow: 'text-eyebrow uppercase font-semibold',
};

const toneStyles: Record<TextTone, string> = {
  navy: 'text-brand-navy',
  muted: 'text-brand-muted',
  red: 'text-brand-red',
  onDark: 'text-brand-on-dark',
  onDarkMuted: 'text-brand-on-dark-muted',
  inherit: '',
};

export const Text: React.FC<TextProps> = ({
  children,
  size = 'body',
  tone = 'navy',
  as: Component = 'p',
  className = '',
  ...props
}) => (
  <Component
    className={`${sizeStyles[size]} ${toneStyles[tone]} ${className}`.trim()}
    {...props}
  >
    {children}
  </Component>
);
