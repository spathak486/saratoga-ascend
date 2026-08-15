import React from 'react';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'muted' | 'subtle' | 'lead';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  className = '',
}) => {
  const variantStyles = {
    body: 'text-slate-700 text-base leading-relaxed',
    muted: 'text-slate-600 text-base leading-relaxed',
    subtle: 'text-slate-500 text-sm leading-relaxed',
    lead: 'text-slate-300 text-lg sm:text-xl font-light leading-relaxed',
  }[variant];

  return <p className={`${variantStyles} ${className}`}>{children}</p>;
};
