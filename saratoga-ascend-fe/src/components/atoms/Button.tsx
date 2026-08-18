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
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    xl: 'px-9 py-4 text-lg',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primaryRed: 'bg-[#e11d48] hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30',
    navy: 'bg-[#022e4c] hover:bg-[#011c30] text-white shadow-lg shadow-slate-900/30',
    blue: 'bg-[#29a6e3] hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30',
    outlineNavy: 'bg-transparent border-2 border-[#022e4c] text-[#022e4c] hover:bg-[#022e4c] hover:text-white',
    outlineRed: 'bg-transparent border-2 border-[#e11d48] text-[#e11d48] hover:bg-[#e11d48] hover:text-white',
    outlineWhite: 'bg-transparent border-2 border-white/60 text-white hover:bg-white hover:text-[#022e4c]',
    peachGradient: 'bg-gradient-to-r from-[#e11d48] to-[#f06767] hover:opacity-95 text-white shadow-xl shadow-rose-600/30',
    cyanGradient: 'bg-gradient-to-r from-[#29a6e3] to-[#26e0f5] hover:opacity-95 text-white shadow-xl shadow-sky-500/30',
    ghost: 'bg-transparent text-[#022e4c] hover:bg-slate-100',
  };

  const widthStyle = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
