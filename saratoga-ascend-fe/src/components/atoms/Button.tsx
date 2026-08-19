import React from 'react';

export type ButtonVariant =
  | 'primaryRed'
  | 'navy'
  | 'blue'
  | 'outlineNavy'
  | 'outlineRed'
  | 'outlineWhite'
  | 'peachGradient'
  | 'cyanGradient'
  | 'ghost';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-sans font-normal rounded-full border border-transparent transition-opacity duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-8 px-3 text-xs',
  sm: 'h-[45px] px-5 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-[60px] px-8 text-xl',
  xl: 'h-16 px-9 text-xl',
};

const variantStyles: Record<ButtonVariant, string> = {
  primaryRed: 'bg-brand-red text-brand-surface hover:opacity-90',
  navy: 'bg-brand-navy text-brand-surface border-brand-surface hover:opacity-90',
  blue: 'bg-brand-sky text-brand-surface hover:opacity-90',
  outlineNavy:
    'bg-transparent border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-surface',
  outlineRed:
    'bg-transparent border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-surface',
  outlineWhite:
    'bg-transparent border-brand-surface/80 text-brand-surface hover:bg-brand-surface hover:text-brand-navy',
  peachGradient: 'bg-gradient-brand text-brand-surface border-brand-surface hover:opacity-90',
  cyanGradient: 'bg-gradient-blue-cyan text-brand-surface hover:opacity-90',
  ghost: 'bg-transparent text-brand-navy hover:bg-brand-navy/5',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primaryRed',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <svg
          className="-ml-1 h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}

      <span>{children}</span>

      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
