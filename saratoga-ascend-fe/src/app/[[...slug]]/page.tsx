import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { renderRegisteredSection } from '@/lib/registry/homeRegistry';
import { getPageBySlug, getAllPageSlugs } from '@/lib/services';

interface DynamicPageProps {
  params: Promise<{ slug?: string[] }>;
}

// ISR — pages revalidate in the background at most once per interval, so
// newly created or published CMS pages show up without redeploying.
export const revalidate = 60;

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
  
  let pageData: any = null;

  // 1. Try Page
  const pageResult = await getPageBySlug(slugPath);
  if (pageResult.data) pageData = pageResult.data;

  // 2. Try News
  if (!pageData) {
    const { getArticleBySlug } = await import('@/lib/services');
    const newsResult = await getArticleBySlug(slugPath);
    if (newsResult.data) pageData = newsResult.data;
  }

  if (!pageData) {
    return { title: 'Page Not Found' };
  }

  const seo = pageData.seo;
  return {
    title: seo?.metaTitle ?? pageData.pageTitle ?? pageData.title ?? undefined,
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
  
  let pageData: any = null;

  // 1. First, try to fetch as a Page
  const pageResult = await getPageBySlug(slugPath);
  if (pageResult.data) {
    pageData = pageResult.data;
  }

  // 2. Next, try to fetch as an Article/News
  if (!pageData) {
    // We import getArticleBySlug dynamically or we can just import it at the top
    // For now we will use the dynamic import to prevent any circular deps
    const { getArticleBySlug } = await import('@/lib/services');
    const newsResult = await getArticleBySlug(slugPath);
    if (newsResult.data) {
      pageData = newsResult.data;
    }
  }

  // 3. (Optional) Try to fetch as a Blog (If you add getBlogBySlug later)
  // if (!pageData) {
  //   const blogResult = await getBlogBySlug(slugPath);
  //   if (blogResult.data) pageData = blogResult.data;
  // }

  if (!pageData) {
    notFound();
  }

  const sections = pageData.Section ?? [];

  const isDark = pageData.pageType === 'Dark' || pageData.variant === 'dark';
  const isLight = pageData.pageType === 'Light' || pageData.variant === 'light';
  const toneClass = isDark ? 'bg-brand-navy text-white' : isLight ? 'bg-brand-surface' : '';

  return (
    <main id="main" className={`min-h-screen ${toneClass}`.trim()}>
      {sections.map((sec: any, idx: number) => renderRegisteredSection(sec, idx))}
    </main>
  );
}