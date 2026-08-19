import type { NextConfig } from "next";

// Derived from STRAPI_API_URL so dev (http://localhost:1337) and
// production point next/image at whichever host actually serves media,
// without hardcoding either.
const strapiUrl = process.env.STRAPI_API_URL ?? "http://localhost:1337";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [new URL(`${strapiUrl}/uploads/**`)],
    // Strapi in local dev resolves to a private IP (localhost), which
    // Next's SSRF guard blocks by default. Production Strapi is a real
    // domain, so this stays off outside development.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
