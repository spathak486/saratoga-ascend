import React from 'react';

export type BadgeVariant =
  | 'red'
  | 'navy'
  | 'blue'
  | 'emerald'
  | 'amber'
  | 'whiteOutline'
  | 'grayOutline'
  | 'gradient';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  dotColor?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'red',
  size = 'md',
  dot = false,
  dotColor,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-wider w-fit select-none';

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-3 py-1 text-[11px]',
    md: 'px-4 py-1.5 text-xs',
  };

  const variantStyles: Record<BadgeVariant, string> = {
    red: 'bg-rose-50 text-[#e11d48] border border-rose-200',
    navy: 'bg-slate-100 text-[#022e4c] border border-slate-300',
    blue: 'bg-sky-50 text-[#29a6e3] border border-sky-200',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200',
    whiteOutline: 'bg-white/10 backdrop-blur-md border border-white/30 text-white shadow-sm',
    grayOutline: 'bg-white/80 border border-slate-200 text-slate-700',
    gradient: 'bg-gradient-to-r from-[#e11d48] to-[#f06767] text-white shadow-sm',
  };

  const dotDefaultColor: Record<BadgeVariant, string> = {
    red: 'bg-[#e11d48]',
    navy: 'bg-[#022e4c]',
    blue: 'bg-[#29a6e3]',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500',
    whiteOutline: 'bg-[#29a6e3]',
    grayOutline: 'bg-slate-500',
    gradient: 'bg-white',
  };

  const activeDotBg = dotColor || dotDefaultColor[variant];

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeDotBg}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${activeDotBg}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
