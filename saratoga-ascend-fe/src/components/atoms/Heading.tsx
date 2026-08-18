import React from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingFontStyle = 'serif' | 'sans';
export type HeadingGradient = 'none' | 'red' | 'blue' | 'navy';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  children: React.ReactNode;
  fontStyle?: HeadingFontStyle;
  gradient?: HeadingGradient;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  fontStyle = 'serif',
  gradient = 'none',
  className = '',
  ...props
}) => {
  const fontFamily = fontStyle === 'serif' ? 'font-serif' : 'font-sans';

  const sizeClass: Record<HeadingLevel, string> = {
    1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]',
    2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2]',
    3: 'text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug',
    4: 'text-lg sm:text-xl md:text-2xl font-bold leading-snug',
    5: 'text-base sm:text-lg font-bold leading-normal',
    6: 'text-sm sm:text-base font-bold uppercase tracking-wider',
  };

  const gradientClass: Record<HeadingGradient, string> = {
    none: 'text-[#022e4c]',
    red: 'text-transparent bg-clip-text bg-gradient-to-r from-[#e11d48] to-[#f06767]',
    blue: 'text-transparent bg-clip-text bg-gradient-to-r from-[#29a6e3] to-[#26e0f5]',
    navy: 'text-transparent bg-clip-text bg-gradient-to-r from-[#022e4c] to-[#2367d1]',
  };

  const Tag = `h${level}` as const;

  return (
    <Tag
      className={`${fontFamily} ${sizeClass[level]} ${gradientClass[gradient]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};
