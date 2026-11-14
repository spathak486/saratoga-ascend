import { NextResponse } from 'next/server';

/**
 * Serves /sitemap.xml 100% dynamically from Strapi's strapi-5-sitemap-plugin:
 * GET /api/strapi-5-sitemap-plugin/sitemap.xml
 *
 * No static URLs hardcoded. Everything is configured and served from Strapi CMS.
 */
export async function GET() {
  const strapiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';

  try {
    const strapiRes = await fetch(`${strapiUrl}/api/strapi-5-sitemap-plugin/sitemap.xml`, {
      cache: 'no-store',
    });

    if (strapiRes.ok) {
      const xml = await strapiRes.text();
      return new NextResponse(xml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`,
      {
        status: strapiRes.status || 500,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      }
    );
  } catch (err: any) {
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`,
      {
        status: 502,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      }
    );
  }
}
