import React from 'react';

/**
 * `home` is the page column every homepage section shares: capped at the
 * 1920px artboard width and centred, with the gutter insetting it to the
 * 1680px content column the Figma card grids are measured against. Below the
 * cap it is the viewport minus the gutter, and the gutter itself scales from
 * 24px on a phone to 120px on the artboard (see `.px-page`), so the column
 * narrows proportionally rather than in steps.
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
