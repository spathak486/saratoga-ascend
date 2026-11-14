import { NextRequest, NextResponse } from 'next/server';

/**
 * Dynamic /robots.txt Route
 * Fetches settings dynamically from Strapi `api::site-setting.site-setting`:
 * - If custom robotsTxt is provided in CMS, serves it directly.
 * - Otherwise computes rules based on allowRobotsIndex, disallowedPaths and sitemap URL.
 */
export async function GET(request: NextRequest) {
  const strapiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
  const fallbackSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saratoga-ascend.com';

  // Extract host dynamically from request headers
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const currentOrigin = host ? `${protocol}://${host}` : fallbackSiteUrl;

  try {
    const res = await fetch(`${strapiUrl}/api/site-setting`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const json = await res.json();
      const settings = json.data?.attributes || json.data || {};

      // 1. If admin wrote raw custom robots.txt in Strapi, use it
      if (settings.robotsTxtCustom && settings.robotsTxtCustom.trim()) {
        let customContent = settings.robotsTxtCustom.trim();
        if (!customContent.toLowerCase().includes('sitemap:')) {
          customContent += `\n\nSitemap: ${currentOrigin}/sitemap.xml`;
        }
        return new NextResponse(customContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        });
      }

      // 2. If allowRobotsIndex is turned off in Strapi
      if (settings.allowRobotsIndex === false) {
        const disallowAll = `User-agent: *\nDisallow: /\n\nSitemap: ${currentOrigin}/sitemap.xml`;
        return new NextResponse(disallowAll, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        });
      }

      // 3. Build dynamic rules from Strapi disallowedPaths
      const disallowedList: string[] = (settings.disallowedPaths || '/api/\n/_next/')
        .split('\n')
        .map((p: string) => p.trim())
        .filter(Boolean);

      const lines = [
        'User-agent: *',
        'Allow: /',
        ...disallowedList.map((p: string) => `Disallow: ${p}`),
        '',
        `Sitemap: ${currentOrigin}/sitemap.xml`,
      ];

      return new NextResponse(lines.join('\n'), {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }
  } catch (err) {
    // Strapi not reachable fallback
  }

  // Fallback if Strapi is not reachable
  const fallback = `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /_next/\n\nSitemap: ${currentOrigin}/sitemap.xml`;

  return new NextResponse(fallback, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

