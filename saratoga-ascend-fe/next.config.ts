import type { NextConfig } from "next";

// Derived from STRAPI_API_URL so dev (http://localhost:1337) and
// production point next/image at whichever host actually serves media,
// without hardcoding either.
const strapiUrl = new URL(process.env.STRAPI_API_URL ?? "http://localhost:1337");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: strapiUrl.hostname,
        ...(strapiUrl.port ? { port: strapiUrl.port } : {}),
        pathname: '/uploads/**',
      },
    ],
    // Strapi in local dev resolves to a private IP (localhost), which
    // Next's SSRF guard blocks by default. Production Strapi is a real
    // domain, so this stays off outside development.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
