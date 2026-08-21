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
 * `sm`/`md`/`lg` are fixed-height utility buttons. `cta` is the gradient pill
 * from the artboard: it has no set height, so the 20/35 padding and the button
 * type scale decide how tall it is.
 */
export type ActionSize = 'sm' | 'md' | 'lg' | 'cta';

export const actionBase =
  'inline-flex items-center justify-center gap-2 rounded-full border font-sans font-medium ' +
  'transition-opacity duration-200 cursor-pointer ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export const actionSizeStyles: Record<ActionSize, string> = {
  sm: 'h-9 px-4 text-caption',
  md: 'h-11 px-6 text-button',
  lg: 'h-[3.25rem] px-8 text-button',
  cta: 'px-cta-x py-cta-y text-button',
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
