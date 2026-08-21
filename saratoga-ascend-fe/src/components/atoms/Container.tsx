import React from 'react';

/**
 * `home` is the page column every homepage section shares: capped at 1700px
 * inclusive of the gutter, centred. Below that cap it is the viewport minus
 * the gutter, so it narrows proportionally with the screen. The gutter itself
 * is 48px until the 1920px artboard width, then 24px (see `.px-page`).
 *
 * `narrow` is for measure-limited prose inside that column. `full` opts out
 * of the cap for full-bleed media while keeping the gutter.
 */
export type ContainerSize = 'home' | 'narrow' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  /** Drop the horizontal gutter — for media that must reach the viewport edge. */
  flush?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<ContainerSize, string> = {
  home: 'max-w-home',
  narrow: 'max-w-[46rem]',
  full: 'max-w-none',
};

export const Container: React.FC<ContainerProps> = ({
  size = 'home',
  flush = false,
  children,
  className = '',
  ...props
}) => (
  <div
    className={`mx-auto w-full ${sizeStyles[size]} ${flush ? '' : 'px-page'} ${className}`.trim()}
    {...props}
  >
    {children}
  </div>
);
