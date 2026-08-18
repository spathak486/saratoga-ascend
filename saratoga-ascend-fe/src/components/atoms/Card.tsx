import React from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'flat' | 'navy' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type CardAccent = 'none' | 'red' | 'blue' | 'gradient';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  rounded?: CardRounded;
  accent?: CardAccent;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'lg',
  rounded = '2xl',
  accent = 'none',
  className = '',
  ...props
}) => {
  const baseStyles = 'relative overflow-hidden transition-all duration-300';

  const variantStyles: Record<CardVariant, string> = {
    elevated: 'bg-white border border-slate-200/80 shadow-md shadow-slate-900/5',
    outlined: 'bg-white border border-slate-200 hover:border-slate-300',
    flat: 'bg-[#f4f4f4] border border-slate-200/60',
    navy: 'bg-[#011c30] border border-white/10 text-white shadow-xl',
    interactive:
      'bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#e11d48]/40 hover:-translate-y-1 cursor-pointer',
  };

  const paddingStyles: Record<CardPadding, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const roundedStyles: Record<CardRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${roundedStyles[rounded]} ${className}`}
      {...props}
    >
      {/* Optional Left Accent Indicator */}
      {accent !== 'none' && (
        <span
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            accent === 'red'
              ? 'bg-[#e11d48]'
              : accent === 'blue'
              ? 'bg-[#29a6e3]'
              : 'bg-gradient-to-b from-[#2367d1] to-[#e11d48]'
          }`}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};
