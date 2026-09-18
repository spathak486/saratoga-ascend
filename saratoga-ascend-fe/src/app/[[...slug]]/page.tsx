import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/organisms';
import { renderRegisteredSection } from '@/lib/registry/homeRegistry';
import { getPageBySlug, getAllPageSlugs } from '@/lib/services';

interface DynamicPageProps {
  params: Promise<{ slug?: string[] }>;
}

/**
 * Prerenders every known page at build time from the Strapi `pages`
 * collection. Unknown slugs still render on demand (dynamicParams defaults
 * to true) and 404 through `notFound()` when the query returns nothing.
 */
export async function generateStaticParams() {
  const result = await getAllPageSlugs();
  if (result.error) return [];
  return result.data.map((slug) => ({ slug: slug.split('/') }));
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug && slug.length > 0 ? slug.join('/') : '';
  const result = await getPageBySlug(slugPath);
  const page = result.data;

  if (!page) {
    return { title: 'Page Not Found' };
  }

  const seo = page.seo;
  return {
    title: seo?.metaTitle ?? page.pageTitle ?? undefined,
    description: seo?.metaDescription ?? seo?.ogDescription ?? undefined,
    openGraph: {
      title: seo?.ogTitle ?? seo?.metaTitle ?? undefined,
      description: seo?.ogDescription ?? seo?.metaDescription ?? undefined,
      images: seo?.ogImage?.url ? [{ url: seo.ogImage.url }] : undefined,
    },
    robots: seo?.metaRobots ?? undefined,
  };
}

/**
 * The single dynamic page route — an optional catch-all so `/` (home, slug "")
 * and every other URL (/about, /contact, /services/...) all render from the
 * Strapi `pages` collection through the section registry. Layout treatment
 * (dark/light/policy) is driven by the `pageType` / `variant` CMS fields.
 */
export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const slugPath = slug && slug.length > 0 ? slug.join('/') : '';
  const result = await getPageBySlug(slugPath);
  const page = result.data;

  if (!page) {
    notFound();
  }

  const sections = page.Section ?? [];
  const hasDynamicBanner = sections.some(
    (sec) => sec.__typename === 'ComponentReferencesBannerReference'
  );

  const isDark = page.pageType === 'Dark' || page.variant === 'dark';
  const isLight = page.pageType === 'Light' || page.variant === 'light';
  const toneClass = isDark ? 'bg-brand-navy text-white' : isLight ? 'bg-brand-surface' : '';

  return (
    <main id="main" className={`min-h-screen ${toneClass}`.trim()}>
      {!hasDynamicBanner && <HeroSection title={page.pageTitle} />}

      {sections.map((sec, idx) => renderRegisteredSection(sec, idx))}
    </main>
  );
}