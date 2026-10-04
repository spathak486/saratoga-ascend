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

  // 3. Try Blog (skip listing slugs so /blogs is never treated as a post)
  if (!pageData && slugPath !== 'blogs' && slugPath !== 'blog') {
    const { getBlogBySlug } = await import('@/lib/services');
    const blogResult = await getBlogBySlug(slugPath);
    if (blogResult.data) pageData = blogResult.data;
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

  // 3. Try to fetch as a Blog (skip listing slugs so /blogs is never treated as a post)
  if (!pageData && slugPath !== 'blogs' && slugPath !== 'blog') {
    const { getBlogBySlug } = await import('@/lib/services');
    const blogResult = await getBlogBySlug(slugPath);
    if (blogResult.data) pageData = blogResult.data;
  }

  if (!pageData) {
    notFound();
  }

  let sections = pageData.Section ?? [];
  const isBlogListingRoute = slugPath === 'blogs' || slugPath === 'blog';

  const hasBlogListing = sections.some(
    (sec: any) => sec.__typename === 'ComponentReferencesBlogListing'
  );

  if (!hasBlogListing && isBlogListingRoute) {
    sections = [...sections, { __typename: 'ComponentReferencesBlogListing' }];
  }

  if (hasBlogListing || isBlogListingRoute) {
    const { getAllBlogs } = await import('@/lib/services');
    const blogsResult = await getAllBlogs();

    // The listing route draws the Figma gradient hero itself. Fold the page
    // banner's copy into that hero so the title is not rendered twice.
    const banner = isBlogListingRoute
      ? sections.find((sec: any) => sec.__typename === 'ComponentReferencesBannerReference')
          ?.heroBanner?.banner
      : undefined;
    const heroTitle = isBlogListingRoute
      ? banner?.bannerTitle || pageData.pageTitle || undefined
      : undefined;
    const heroSubtitle = isBlogListingRoute
      ? banner?.bannerDescription ||
        banner?.bannerSubTitle ||
        pageData.seo?.metaDescription ||
        pageData.seo?.ogDescription ||
        undefined
      : undefined;

    if (isBlogListingRoute && (heroTitle || heroSubtitle)) {
      sections = sections.filter(
        (sec: any) => sec.__typename !== 'ComponentReferencesBannerReference',
      );
    }

    sections = sections.map((sec: any) => {
      if (sec.__typename !== 'ComponentReferencesBlogListing') return sec;
      return {
        ...sec,
        blogs: blogsResult.data ?? sec.blogs,
        heroTitle,
        heroSubtitle,
      };
    });

    const hasCta = sections.some((sec: any) => sec.__typename === 'ComponentReferencesCta');
    if (!hasCta) {
      const homeResult = await getPageBySlug('');
      const homeCta = homeResult.data?.Section?.find(
        (sec: any) => sec.__typename === 'ComponentReferencesCta'
      );
      if (homeCta) sections = [...sections, { ...homeCta, compact: true }];
    } else {
      sections = sections.map((sec: any) =>
        sec.__typename === 'ComponentReferencesCta' ? { ...sec, compact: true } : sec
      );
    }
  }

  const isDark = pageData.pageType === 'Dark' || pageData.variant === 'dark';
  const isLight = pageData.pageType === 'Light' || pageData.variant === 'light';
  const toneClass = isDark ? 'bg-brand-navy text-white' : isLight ? 'bg-brand-surface' : '';

  return (
    <main id="main" className={`min-h-screen ${toneClass}`.trim()}>
      {sections.map((sec: any, idx: number) => renderRegisteredSection(sec, idx))}
    </main>
  );
}