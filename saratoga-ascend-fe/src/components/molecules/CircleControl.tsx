import React from 'react';

export type CircleControlDirection = 'prev' | 'next';

/** Each tone is one circular control in the homepage design. */
export type CircleControlTone =
  | 'light'
  | 'dark'
  | 'staffingArrow'
  | 'cardPlayPhoto'
  | 'cardPlayInfo'
  | 'achievementArrow'
  | 'iconPlay'
  | 'jobCardArrow';

export interface CircleControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  direction: CircleControlDirection;
  tone?: CircleControlTone;
}

interface ToneConfig {
  size: string;
  viewBox: string;
  circle?: React.SVGProps<SVGCircleElement>;
  paths: Record<CircleControlDirection, string>;
  fills: Record<CircleControlDirection, string>;
  /** Icon sizing when there is no SVG circle to size against (e.g. `iconPlay`,
   *  whose ring is a plain bordered `<button>`, not part of the viewBox). */
  iconClassName?: string;
  /** Inline styles for tones whose outer ring is a plain bordered circle
   *  rather than a filled SVG disc (exact CSS from the design handoff). */
  outerStyle?: React.CSSProperties;
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

/** Rounded "play blob" artwork (the `Polygon 2.svg` / `Polygon 2 (1).svg`
 *  shapes from the design handoff), inlined so no `<img>` request is needed. */
const PLAY_BLOBS: Record<CircleControlDirection, string> = {
  prev: 'M3.56461 18.4528C-1.1882 15.7757 -1.18821 8.93185 3.56461 6.25474L13.0513 0.911175C17.7176 -1.71719 23.4867 1.65461 23.4867 7.0102L23.4867 17.6973C23.4867 23.0529 17.7176 26.4247 13.0513 23.7963L3.56461 18.4528Z',
  next: 'M19.9221 18.4528C24.6749 15.7757 24.6749 8.93185 19.9221 6.25474L10.4354 0.911175C5.76911 -1.71719 -5.91073e-07 1.65461 -4.87958e-07 7.0102L-2.82191e-07 17.6973C-1.79076e-07 23.0529 5.76912 26.4247 10.4354 23.7963L19.9221 18.4528Z',
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
  /** What We Do carousel controls — a plain bordered ring around the
   *  pre-coloured play-blob artwork (blue prev, red next). */
  iconPlay: {
    size: 'size-[3.75rem]',
    viewBox: '0 0 24 25',
    paths: PLAY_BLOBS,
    fills: { prev: '#2B88D9', next: '#F01424' },
    iconClassName: 'block h-[40%] w-auto',
    outerStyle: {
      border: '1px solid rgb(198, 198, 198)',
      background: 'rgba(240, 20, 36, 0.02)',
    },
    focus: 'focus-visible:outline-brand-navy',
  },
  /** Healthcare job-card next control — Figma Frame 5, 60×60 glass ring. */
  jobCardArrow: {
    size: 'size-[3.75rem]',
    viewBox: '0 0 24 25',
    paths: PLAY_BLOBS,
    fills: { prev: '#ffffff', next: '#ffffff' },
    iconClassName: 'block h-[40%] w-auto',
    outerStyle: {
      border: '1px solid rgb(198, 198, 198)',
      background: 'rgba(240, 20, 36, 0.02)',
    },
    focus: 'focus-visible:outline-brand-navy',
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
      style={config.outerStyle}
      className={`${config.size} flex shrink-0 cursor-pointer items-center justify-center p-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${config.focus} ${
        config.outerStyle ? 'rounded-full' : 'border-0 bg-transparent'
      } ${className}`.trim()}
      {...props}
    >
      <svg viewBox={config.viewBox} className={config.iconClassName ?? 'block size-full'} aria-hidden="true">
        {config.circle && <circle {...config.circle} />}
        <path d={config.paths[direction]} fill={config.fills[direction]} />
      </svg>
    </button>
  );
};
