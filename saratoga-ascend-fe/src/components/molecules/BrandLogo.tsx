import React from 'react';

export interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', size = 'md' }) => {
  const isLight = variant === 'light';

  return (
    <div className="inline-flex items-center gap-3 select-none">
      <div className="relative flex items-center justify-center">
        <svg width={size === 'lg' ? '48' : size === 'sm' ? '32' : '40'} height={size === 'lg' ? '48' : size === 'sm' ? '32' : '40'} viewBox="0 0 100 100" fill="none">
          <path d="M50 15 C35 15, 25 28, 25 42 C25 55, 38 60, 50 60 C62 60, 75 55, 75 42 C75 28, 65 15, 50 15 Z" fill="#E11D48" />
          <path d="M50 85 C35 85, 25 72, 25 58 C25 45, 38 40, 50 40 C62 40, 75 45, 75 58 C75 72, 65 85, 50 85 Z" fill="#29A6E3" opacity="0.9" />
          <path d="M20 55 Q 45 45, 80 30" stroke={isLight ? "#FFFFFF" : "#022E4C"} strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M74 26 L82 29 L77 37" fill={isLight ? "#FFFFFF" : "#022E4C"} />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif font-extrabold tracking-tight leading-none ${size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-xl' : 'text-2xl'} ${isLight ? 'text-white' : 'text-[#e11d48]'}`}>
          Saratoga
        </span>
        <span className={`font-sans font-semibold tracking-wide text-right leading-none ${size === 'lg' ? 'text-sm' : size === 'sm' ? 'text-xs' : 'text-xs'} ${isLight ? 'text-slate-300' : 'text-[#022e4c]'}`}>
          Ascend
        </span>
      </div>
    </div>
  );
};
