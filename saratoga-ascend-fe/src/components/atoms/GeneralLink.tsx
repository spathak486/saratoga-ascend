import React from 'react';
import Link, { LinkProps } from 'next/link';

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
  primaryRed: 'bg-[#e11d48] hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30',
  navy: 'bg-[#022e4c] hover:bg-[#011c30] text-white shadow-lg shadow-slate-900/30',
  blue: 'bg-[#29a6e3] hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30',
  outlineNavy: 'bg-transparent border-2 border-[#022e4c] text-[#022e4c] hover:bg-[#022e4c] hover:text-white',
  outlineRed: 'bg-transparent border-2 border-[#e11d48] text-[#e11d48] hover:bg-[#e11d48] hover:text-white',
  outlineWhite: 'bg-transparent border-2 border-white/60 text-white hover:bg-white hover:text-[#022e4c]',
  peachGradient: 'bg-gradient-to-r from-[#e11d48] to-[#f06767] hover:opacity-95 text-white shadow-xl shadow-rose-600/30',
  cyanGradient: 'bg-gradient-to-r from-[#29a6e3] to-[#26e0f5] hover:opacity-95 text-white shadow-xl shadow-sky-500/30',
  ghost: 'bg-transparent text-[#022e4c] hover:bg-slate-100',
};

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
  ...props
}) => {
  const isExternal =
    external !== undefined
      ? external
      : href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');

  const isAnchorOrSpecial =
    href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:');

  // Variant Styling Resolution
  let variantClass = '';

  switch (variant) {
    case 'button':
      variantClass = `inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-98 ${sizeStyles[size]} ${buttonVariantStyles[buttonVariant]}`;
      break;
    case 'nav':
      variantClass = `inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150 ${
        isActive
          ? 'text-[#e11d48]'
          : 'text-[#022e4c] hover:text-[#e11d48]'
      }`;
      break;
    case 'footer':
      variantClass =
        'inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-all duration-150 hover:translate-x-1';
      break;
    case 'arrow':
      variantClass =
        'group inline-flex items-center gap-1.5 text-sm font-bold text-[#e11d48] hover:text-rose-700 transition-colors duration-150';
      break;
    case 'subtle':
      variantClass =
        'text-sm text-slate-600 hover:text-[#022e4c] transition-colors duration-150 underline-offset-4 hover:underline';
      break;
    case 'unstyled':
      variantClass = '';
      break;
    case 'default':
    default:
      variantClass =
        'inline-flex items-center gap-1 text-[#022e4c] hover:text-[#e11d48] font-medium transition-colors duration-150 underline-offset-4 hover:underline';
      break;
  }

  const combinedClasses = `${variantClass} ${className}`.trim();

  const content = (
    <>
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
      {variant === 'arrow' && !rightIcon && (
        <span
          className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-base leading-none"
          aria-hidden="true"
        >
          &rarr;
        </span>
      )}
      {isExternal && variant !== 'button' && (
        <svg
          className="w-3.5 h-3.5 opacity-60 ml-0.5"
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
      )}
    </>
  );

  // If external link or mailto/tel, use standard <a>
  if (isExternal || isAnchorOrSpecial) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  // Internal link with Next.js Link
  return (
    <Link href={href} className={combinedClasses} {...(props as Omit<LinkProps, 'href'>)}>
      {content}
    </Link>
  );
};
