/**
 * Shared visual language for every clickable action on the page.
 *
 * `Button` (real buttons) and `GeneralLink` (navigation that looks like a
 * button) both compose from here so a CTA is identical whichever element it
 * renders as. All values resolve to tokens in `globals.css`.
 */

export type ActionVariant =
  /** Red-to-blue gradient pill — the page's primary call to action. */
  | 'cta'
  | 'solidRed'
  | 'solidNavy'
  | 'outlineNavy'
  /** Hairline outline for use on navy cards and dark bands. */
  | 'outlineLight'
  | 'ghost';

/**
 * `cta` is the button from the artboard: 180x60 with a 8px radius, 24/16
 * padding and a 12px gap to its trailing arrow. `ctaPill` is the same button
 * with a fully rounded end — the file uses that shape only where the button
 * sits inside a card rather than on the page ground.
 *
 * `sm`/`md`/`lg` are the older fixed-height utility buttons, kept until the
 * sections still using them are rebuilt.
 */
export type ActionSize = 'sm' | 'md' | 'lg' | 'cta' | 'ctaPill';

/* Radius lives in the size map rather than here because `cta` and `ctaPill`
   differ by nothing else. */
export const actionBase =
  'inline-flex items-center justify-center border font-sans font-medium ' +
  'transition-opacity duration-200 cursor-pointer ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const ctaBox =
  'min-h-cta min-w-cta-wide gap-3 px-cta-x py-cta-y text-button shadow-button';

export const actionSizeStyles: Record<ActionSize, string> = {
  sm: 'h-9 gap-2 rounded-full px-4 text-caption',
  md: 'h-11 gap-2 rounded-full px-6 text-button',
  lg: 'h-[3.25rem] gap-2 rounded-full px-8 text-button',
  cta: `${ctaBox} rounded-button`,
  ctaPill: `${ctaBox} rounded-pill`,
};

export const actionVariantStyles: Record<ActionVariant, string> = {
  cta: 'bg-cta-gradient border-transparent text-brand-on-dark hover:opacity-90 focus-visible:outline-brand-navy',
  solidRed:
    'bg-brand-red border-transparent text-brand-on-dark hover:opacity-90 focus-visible:outline-brand-navy',
  solidNavy:
    'bg-brand-navy border-transparent text-brand-on-dark hover:opacity-90 focus-visible:outline-brand-navy',
  outlineNavy:
    'bg-transparent border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-on-dark focus-visible:outline-brand-navy',
  outlineLight:
    'bg-transparent border-brand-on-dark/40 text-brand-on-dark hover:bg-brand-on-dark/10 focus-visible:outline-brand-on-dark',
  ghost:
    'bg-transparent border-transparent text-brand-navy hover:bg-brand-navy/5 focus-visible:outline-brand-navy',
};

export function actionClass(
  variant: ActionVariant,
  size: ActionSize,
  fullWidth = false
): string {
  return `${actionBase} ${actionSizeStyles[size]} ${actionVariantStyles[variant]} ${
    fullWidth ? 'w-full' : 'w-auto'
  }`;
}
