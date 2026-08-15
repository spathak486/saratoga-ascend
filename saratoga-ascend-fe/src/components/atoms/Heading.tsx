import React from 'react';

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  fontStyle?: 'serif' | 'sans';
  gradient?: boolean;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  fontStyle = 'serif',
  gradient = false,
  className = '',
}) => {
  const fontFamily = fontStyle === 'serif' ? 'font-serif' : 'font-sans';

  const sizeClass = {
    1: 'text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight',
    2: 'text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight',
    3: 'text-2xl sm:text-3xl font-bold leading-snug',
    4: 'text-xl font-bold',
  }[level];

  const colorClass = gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#e11d48] to-[#f06767]' : 'text-[#022e4c]';

  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';

  return (
    <Tag className={`${fontFamily} ${sizeClass} ${colorClass} ${className}`}>
      {children}
    </Tag>
  );
};
