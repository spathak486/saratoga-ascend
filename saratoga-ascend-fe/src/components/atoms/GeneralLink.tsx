import React from 'react';
import Link from 'next/link';
import { actionClass, type ActionSize, type ActionVariant } from './actionStyles';

export type GeneralLinkVariant =
  /** Inline link in running copy. */
  | 'default'
  /** Header and footer navigation. */
  | 'nav'
  /** Text link with a trailing arrow that slides on hover. */
  | 'arrow'
  /** Renders with the shared button treatment — pass `buttonVariant`. */
  | 'button'
  /** No styling; the caller owns the appearance. */
  | 'unstyled';

export interface GeneralLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: GeneralLinkVariant;
  buttonVariant?: ActionVariant;
  size?: ActionSize;
  isActive?: boolean;
  /** Invert colours for placement on navy bands. */
  onDark?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Force external treatment. Auto-detected for `http(s):` and `//` URLs. */
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current';

function isHttpUrl(href: string): boolean {
  return /^(https?:)?\/\//i.test(href);
}

function isSpecialUrl(href: string): boolean {
  return href.startsWith('mailto:') || href.startsWith('tel:');
}

function getVariantClass(
  variant: GeneralLinkVariant,
  buttonVariant: ActionVariant,
  size: ActionSize,
  isActive: boolean,
  onDark: boolean
): string {
  switch (variant) {
    case 'button':
      return actionClass(buttonVariant, size);

    case 'nav': {
      const rest = onDark ? 'text-brand-on-dark/85' : 'text-brand-navy';
      const active = onDark ? 'text-brand-on-dark' : 'text-brand-red';
      return `inline-flex items-center gap-1.5 text-nav transition-colors duration-150 hover:text-brand-red ${focusRing} ${
        isActive ? `${active} font-semibold` : rest
      }`;
    }

    case 'arrow':
      return `group inline-flex items-center gap-1.5 text-nav font-semibold text-brand-red transition-colors duration-150 hover:opacity-80 ${focusRing}`;

    case 'unstyled':
      return `${focusRing}`;

    case 'default':
    default:
      return `inline-flex items-center gap-1 text-body font-medium underline-offset-4 transition-colors duration-150 hover:underline ${focusRing} ${
        onDark ? 'text-brand-on-dark' : 'text-brand-navy hover:text-brand-red'
      }`;
  }
}

export const GeneralLink: React.FC<GeneralLinkProps> = ({
  href,
  variant = 'default',
  buttonVariant = 'cta',
  size = 'md',
  isActive = false,
  onDark = false,
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
  const classNames =
    `${getVariantClass(variant, buttonVariant, size, isActive, onDark)} ${className}`.trim();

  const content = (
    <>
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}

      {variant === 'arrow' && !rightIcon && (
        <span
          className="inline-block leading-none transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          aria-hidden="true"
        >
          &rarr;
        </span>
      )}

      {opensInNewTab && variant !== 'button' && (
        <>
          <svg
            className="ml-0.5 size-3.5 opacity-60"
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
        target={opensInNewTab ? (target ?? '_blank') : target}
        rel={opensInNewTab ? (rel ?? 'noopener noreferrer') : rel}
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
