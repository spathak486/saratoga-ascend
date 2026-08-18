import React from 'react';

export type TextVariant =
  | 'body'
  | 'muted'
  | 'subtle'
  | 'lead'
  | 'whiteLead'
  | 'whiteMuted'
  | 'caption'
  | 'overline';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: TextVariant;
  as?: 'p' | 'span' | 'div';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  as: Component = 'p',
  className = '',
  ...props
}) => {
  const variantStyles: Record<TextVariant, string> = {
    body: 'text-slate-700 text-base leading-relaxed',
    muted: 'text-slate-600 text-base leading-relaxed',
    subtle: 'text-slate-500 text-sm leading-relaxed',
    lead: 'text-slate-700 text-lg sm:text-xl font-normal leading-relaxed',
    whiteLead: 'text-slate-200 text-lg sm:text-xl font-light leading-relaxed',
    whiteMuted: 'text-slate-300 text-base leading-relaxed',
    caption: 'text-slate-500 text-xs leading-normal',
    overline: 'text-xs font-bold uppercase tracking-widest text-[#e11d48]',
  };

  return (
    <Component className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};
