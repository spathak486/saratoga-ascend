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

const tones: Record<CircleControlTone, ToneConfig> = {
  light: {
    size: 'size-9',
    viewBox: '0 0 40 40',
    circle: {
      cx: 20,
      cy: 18,
      r: 16,
      fill: '#fff',
      className: 'drop-shadow-[0_2px_3px_rgba(0,0,0,0.17)]',
    },
    paths: {
      prev: 'M23.5 10.8 C24.7 10.1 26.2 11 26.2 12.4 V23.6 C26.2 25 24.7 25.9 23.5 25.2 L14.3 19.6 C13.1 18.9 13.1 17.1 14.3 16.4 Z',
      next: 'M16.5 10.8 C15.3 10.1 13.8 11 13.8 12.4 V23.6 C13.8 25 15.3 25.9 16.5 25.2 L25.7 19.6 C26.9 18.9 26.9 17.1 25.7 16.4 Z',
    },
    fills: { prev: '#0c476b', next: '#f20b2c' },
    focus: 'focus-visible:outline-[#0c476b]',
  },
  dark: {
    size: 'size-[42px]',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 19, fill: '#234d69', stroke: '#52738a', strokeWidth: 1 },
    paths: SHARP_TRIANGLES,
    fills: { prev: '#2997dc', next: '#f20b2d' },
    focus: 'focus-visible:outline-white',
  },
  staffingArrow: {
    size: 'size-[43px]',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 19, fill: '#fff', stroke: '#e3e3e3', strokeWidth: 1 },
    paths: SHARP_TRIANGLES,
    fills: { prev: '#063c5d', next: '#f20d2e' },
    focus: 'focus-visible:outline-[#063c5d]',
  },
  cardPlayPhoto: {
    size: 'size-10',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 18, fill: '#fff', stroke: '#ddd' },
    paths: WIDE_TRIANGLES,
    fills: { prev: '#188dcc', next: '#188dcc' },
    focus: 'focus-visible:outline-white',
  },
  cardPlayInfo: {
    size: 'size-10',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 18, fill: '#fff', stroke: '#ddd' },
    paths: WIDE_TRIANGLES,
    fills: { prev: '#f20d2e', next: '#f20d2e' },
    focus: 'focus-visible:outline-[#f20d2e]',
  },
  achievementArrow: {
    size: 'size-11',
    viewBox: '0 0 44 44',
    circle: { cx: 22, cy: 22, r: 19, fill: '#155779', stroke: '#43819d', strokeWidth: 1 },
    paths: SHARP_TRIANGLES,
    fills: { prev: '#1595dc', next: '#f20d2e' },
    focus: 'focus-visible:outline-white',
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
