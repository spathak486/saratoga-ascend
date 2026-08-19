import React from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'home' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'xl',
  children,
  className = '',
  ...props
}) => {
  const sizeStyles: Record<ContainerSize, string> = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-[1440px]',
    home: 'max-w-home',
    full: 'max-w-full',
  };

  const paddingStyles = size === 'home' ? 'px-8' : 'px-4 sm:px-6 lg:px-8';

  return (
    <div
      className={`mx-auto w-full ${paddingStyles} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
