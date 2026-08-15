import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'navy' | 'blue' | 'whiteOutline';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'red',
  dot = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit';

  const variantStyles = {
    red: 'bg-rose-50 text-[#e11d48] border border-rose-200',
    navy: 'bg-slate-200 text-[#022e4c]',
    blue: 'bg-sky-100 text-[#29a6e3]',
    whiteOutline: 'bg-white/10 backdrop-blur-md border border-white/20 text-[#29a6e3]',
  }[variant];

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {dot && <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse" />}
      {children}
    </span>
  );
};
