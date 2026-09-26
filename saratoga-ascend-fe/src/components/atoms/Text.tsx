import React from 'react';

/** Visual steps from the `--text-*` scale in `globals.css`. */
export type TextSize = 'sectionLead' | 'cardCopy' | 'lead' | 'body' | 'nav' | 'caption' | 'eyebrow';

export type TextTone =
  | 'ink'
  | 'navy'
  | 'slate'
  | 'muted'
  | 'faint'
  | 'red'
  | 'onDark'
  | 'onDarkMuted'
  | 'inherit';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: TextSize;
  tone?: TextTone;
  as?: 'p' | 'span' | 'div';
  className?: string;
}

const sizeStyles: Record<TextSize, string> = {
  sectionLead: 'text-section-lead',
  cardCopy: 'text-card-copy',
  lead: 'text-body-lg',
  body: 'text-body',
  nav: 'text-nav',
  caption: 'text-caption',
  eyebrow: 'text-eyebrow uppercase font-semibold',
};

const toneStyles: Record<TextTone, string> = {
  ink: 'text-slate-ink',
  navy: 'text-brand-navy',
  slate: 'text-slate-body',
  muted: 'text-slate-muted',
  faint: 'text-slate-faint',
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
