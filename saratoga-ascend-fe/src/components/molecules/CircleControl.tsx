import React from 'react';

export type CircleControlDirection = 'prev' | 'next';

/** Each tone is one circular control in the homepage design. */
export type CircleControlTone =
  | 'light'
  | 'dark'
  | 'staffingArrow'
  | 'cardPlayPhoto'
  | 'cardPlayInfo'
  | 'achievementArrow';

export interface CircleControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  direction: CircleControlDirection;
  tone?: CircleControlTone;
}

interface ToneConfig {
  size: string;
  viewBox: string;
  circle: React.SVGProps<SVGCircleElement>;
  paths: Record<CircleControlDirection, string>;
  fills: Record<CircleControlDirection, string>;
  focus: string;
}

const SHARP_TRIANGLES: Record<CircleControlDirection, string> = {
  prev: 'M25.5 14.5L16 22l9.5 7.5V14.5Z',
  next: 'M18.5 14.5L28 22l-9.5 7.5V14.5Z',
};

const WIDE_TRIANGLES: Record<CircleControlDirection, string> = {
  prev: 'M26 14.5L15 22L26 29.5V14.5Z',
  next: 'M18 14.5L29 22L18 29.5V14.5Z',
};

/* Every colour resolves to a token in `globals.css`. */
const NAVY = 'var(--color-brand-navy)';
const NAVY_CARD = 'var(--color-brand-navy-card)';
const RED = 'var(--color-brand-red)';
const SKY = 'var(--color-brand-sky)';
const SURFACE = 'var(--color-brand-surface)';
const LINE = 'var(--color-brand-line)';

const tones: Record<CircleControlTone, ToneConfig> = {
  light: {
    size: 'size-9',
    viewBox: '0 0 40 40',
    circle: {
      cx: 20,
      cy: 18,
      r: 16,
      fill: SURFACE,
      stroke: LINE,
      strokeWidth: 1,
    },
    paths: {
      prev: 'M23.5 10.8 C24.7 10.1 26.2 11 26.2 12.4 V23.6 C26.2 25 24.7 25.9 23.5 25.2 L14.3 19.6 C13.1 18.9 13.1 17.1 14.3 16.4 Z',
      next: 'M16.5 10.8 C15.3 10.1 13.8 11 13.8 12.4 V23.6 C13.8 25 15.3 25.9 16.5 25.2 L25.7 19.6 C26.9 18.9 26.9 17.1 25.7 16.4 Z',
    },
    fills: { prev: NAVY, next: RED },
    focus: 'focus-visible:outline-brand-navy',
  },
  dark: {
    size: 'size-[42px]',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 19, fill: NAVY_CARD, stroke: SKY, strokeWidth: 1 },
    paths: SHARP_TRIANGLES,
    fills: { prev: SKY, next: RED },
    focus: 'focus-visible:outline-brand-on-dark',
  },
  staffingArrow: {
    size: 'size-[43px]',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 19, fill: SURFACE, stroke: LINE, strokeWidth: 1 },
    paths: SHARP_TRIANGLES,
    fills: { prev: NAVY, next: RED },
    focus: 'focus-visible:outline-brand-navy',
  },
  cardPlayPhoto: {
    size: 'size-10',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 18, fill: SURFACE, stroke: LINE },
    paths: WIDE_TRIANGLES,
    fills: { prev: SKY, next: SKY },
    focus: 'focus-visible:outline-brand-on-dark',
  },
  cardPlayInfo: {
    size: 'size-10',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 18, fill: SURFACE, stroke: LINE },
    paths: WIDE_TRIANGLES,
    fills: { prev: RED, next: RED },
    focus: 'focus-visible:outline-brand-red',
  },
  achievementArrow: {
    size: 'size-11',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 19, fill: NAVY_CARD, stroke: SKY, strokeWidth: 1 },
    paths: SHARP_TRIANGLES,
    fills: { prev: SKY, next: RED },
    focus: 'focus-visible:outline-brand-on-dark',
  },
};

export const CircleControl: React.FC<CircleControlProps> = ({
  label,
  direction,
  tone = 'light',
  className = '',
  type = 'button',
  ...props
}) => {
  const config = tones[tone];

  return (
    <button
      type={type}
      aria-label={label}
      className={`${config.size} flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${config.focus} ${className}`.trim()}
      {...props}
    >
      <svg viewBox={config.viewBox} className="block size-full" aria-hidden="true">
        <circle {...config.circle} />
        <path d={config.paths[direction]} fill={config.fills[direction]} />
      </svg>
    </button>
  );
};
