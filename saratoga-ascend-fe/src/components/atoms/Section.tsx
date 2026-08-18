import React from 'react';
import { Container, ContainerSize } from './Container';

export type SectionBackground =
  | 'white'
  | 'offwhite'
  | 'navy'
  | 'darkNavy'
  | 'gradientHero'
  | 'gradientNavy'
  | 'slate';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  containerSize?: ContainerSize;
  withContainer?: boolean;
  borderBottom?: boolean;
  borderTop?: boolean;
  className?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  background = 'white',
  spacing = 'lg',
  containerSize = 'xl',
  withContainer = true,
  borderBottom = false,
  borderTop = false,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const bgStyles: Record<SectionBackground, string> = {
    white: 'bg-white text-[#022e4c]',
    offwhite: 'bg-[#f4f4f4] text-[#022e4c]',
    navy: 'bg-[#022e4c] text-white',
    darkNavy: 'bg-[#011c30] text-white',
    gradientHero: 'bg-gradient-to-br from-[#022e4c] via-[#011c30] to-[#e11d48] text-white',
    gradientNavy: 'bg-gradient-to-b from-[#022e4c] to-[#011c30] text-white',
    slate: 'bg-slate-50 text-[#022e4c]',
  };

  const spacingStyles: Record<SectionSpacing, string> = {
    none: 'py-0',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-24',
    xl: 'py-20 sm:py-28',
    '2xl': 'py-24 sm:py-36',
  };

  const borderTopStyle = borderTop ? 'border-t border-slate-200' : '';
  const borderBottomStyle = borderBottom ? 'border-b border-slate-200' : '';

  return (
    <section
      className={`relative ${bgStyles[background]} ${spacingStyles[spacing]} ${borderTopStyle} ${borderBottomStyle} ${className}`}
      {...props}
    >
      {withContainer ? (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
};
