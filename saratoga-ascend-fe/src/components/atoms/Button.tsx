import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primaryRed' | 'navy' | 'blue' | 'outlineNavy' | 'outlineRed' | 'peachGradient' | 'cyanGradient';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primaryRed',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }[size];

  const variantStyles = {
    primaryRed: 'bg-[#e11d48] hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30',
    navy: 'bg-[#022e4c] hover:bg-[#011c30] text-white shadow-lg shadow-slate-900/30',
    blue: 'bg-[#29a6e3] hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30',
    outlineNavy: 'bg-transparent border-2 border-[#022e4c] text-[#022e4c] hover:bg-[#022e4c] hover:text-white',
    outlineRed: 'bg-transparent border-2 border-[#e11d48] text-[#e11d48] hover:bg-[#e11d48] hover:text-white',
    peachGradient: 'bg-gradient-to-r from-[#e11d48] to-[#f06767] hover:opacity-95 text-white shadow-xl shadow-rose-600/30',
    cyanGradient: 'bg-gradient-to-r from-[#29a6e3] to-[#26e0f5] hover:opacity-95 text-white shadow-xl shadow-sky-500/30',
  }[variant];

  return (
    <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};
