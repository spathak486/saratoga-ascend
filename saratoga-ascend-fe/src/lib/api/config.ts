import 'server-only';

// Server-only — no NEXT_PUBLIC_ prefix, so these never reach the client bundle.
export const strapiUrl = process.env.STRAPI_API_URL ?? 'http://localhost:1337';
export const strapiToken = process.env.STRAPI_API_TOKEN ?? '';
export const graphqlUrl = `${strapiUrl}/graphql`;

// Mock mode is decided inside service functions, never read by client code.
export const isMockMode = process.env.USE_MOCKS === 'true';

export const revalidationSecret = process.env.REVALIDATION_SECRET ?? '';

// recaptchaSiteKey lives in ./public-config, not here — it's NEXT_PUBLIC_
// and needs to be importable from Client Components, which this
// server-only module can never be.
