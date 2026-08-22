// Deliberately NOT server-only — NEXT_PUBLIC_ values are safe in the
// browser by definition, and need to be importable from Client Components.
export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';
