import React from 'react';
import Link from 'next/link';

export type GeneralLinkVariant =
  | 'default'
  | 'subtle'
  | 'nav'
  | 'footer'
  | 'arrow'
  | 'button'
  | 'unstyled';

export type ButtonStyleVariant =
  | 'primaryRed'
  | 'navy'
  | 'blue'
  | 'outlineNavy'
  | 'outlineRed'
  | 'outlineWhite'
  | 'peachGradient'
  | 'cyanGradient'
  | 'ghost';

export type GeneralLinkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GeneralLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: GeneralLinkVariant;
  buttonVariant?: ButtonStyleVariant;
  size?: GeneralLinkSize;
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Force external treatment. Auto-detected from `http(s):` and protocol-relative URLs. */
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<GeneralLinkSize, string> = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
  xl: 'px-9 py-4 text-lg',
};

const buttonVariantStyles: Record<ButtonStyleVariant, string> = {
  primaryRed: 'bg-brand-red hover:bg-brand-red/90 text-brand-surface shadow-lg shadow-brand-red/30',
  navy: 'bg-brand-navy hover:bg-brand-navy-dark text-brand-surface shadow-lg shadow-brand-navy/30',
  blue: 'bg-brand-sky hover:bg-brand-sky/90 text-brand-surface shadow-lg shadow-brand-sky/30',
  outlineNavy:
    'bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-surface',
  outlineRed:
    'bg-transparent border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-surface',
  outlineWhite:
    'bg-transparent border-2 border-white/60 text-white hover:bg-brand-surface hover:text-brand-navy',
  peachGradient: 'bg-gradient-brand text-brand-surface shadow-xl shadow-brand-red/30 hover:opacity-95',
  cyanGradient:
    'bg-gradient-blue-cyan text-brand-surface shadow-xl shadow-brand-sky/30 hover:opacity-95',
  ghost: 'bg-transparent text-brand-navy hover:bg-slate-100',
};

function isHttpUrl(href: string): boolean {
  return /^(https?:)?\/\//i.test(href);
}

function isSpecialUrl(href: string): boolean {
  return href.startsWith('mailto:') || href.startsWith('tel:');
}

function getVariantClass(
  variant: GeneralLinkVariant,
  buttonVariant: ButtonStyleVariant,
  size: GeneralLinkSize,
  isActive: boolean
): string {
  switch (variant) {
    case 'button':
      return `inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-98 ${sizeStyles[size]} ${buttonVariantStyles[buttonVariant]}`;
    case 'nav':
      return `inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150 ${
        isActive ? 'text-brand-red' : 'text-brand-navy hover:text-brand-red'
      }`;
    case 'footer':
      return 'inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-all duration-150 hover:translate-x-1';
    case 'arrow':
      return 'group inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:text-brand-red/80 transition-colors duration-150';
    case 'subtle':
      return 'text-sm text-slate-600 hover:text-brand-navy transition-colors duration-150 underline-offset-4 hover:underline';
    case 'unstyled':
      return '';
    case 'default':
    default:
      return 'inline-flex items-center gap-1 text-brand-navy hover:text-brand-red font-medium transition-colors duration-150 underline-offset-4 hover:underline';
  }
}

export const GeneralLink: React.FC<GeneralLinkProps> = ({
  href,
  variant = 'default',
  buttonVariant = 'primaryRed',
  size = 'md',
  isActive = false,
  leftIcon,
  rightIcon,
  external,
  children,
  className = '',
  target,
  rel,
  ...props
}) => {
  const isExternal = external ?? isHttpUrl(href);
  const opensInNewTab = isExternal && target !== '_self';
  const classNames = `${getVariantClass(variant, buttonVariant, size, isActive)} ${className}`.trim();

  const content = (
    <>
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
      {variant === 'arrow' && !rightIcon && (
        <span
          className="inline-block text-base leading-none transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          &rarr;
        </span>
      )}
      {opensInNewTab && variant !== 'button' && (
        <>
          <svg
            className="ml-0.5 h-3.5 w-3.5 opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </>
  );

  if (isExternal || isSpecialUrl(href)) {
    return (
      <a
        href={href}
        className={classNames}
        target={opensInNewTab ? target ?? '_blank' : target}
        rel={opensInNewTab ? rel ?? 'noopener noreferrer' : rel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames} target={target} rel={rel} {...props}>
      {content}
    </Link>
  );
};
