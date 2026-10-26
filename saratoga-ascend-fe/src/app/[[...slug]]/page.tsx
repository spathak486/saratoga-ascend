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

  // Known pages. Skip the news and blog probes so a missing CMS
  // page does not run those queries.
  const isReservedPage = slugPath === '' || slugPath === 'contact' || slugPath === 'about-us';
  if (!pageData && !isReservedPage) {
    const { getArticleBySlug } = await import('@/lib/services');
    const newsResult = await getArticleBySlug(slugPath);
    if (newsResult.data) pageData = newsResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getBlogBySlug } = await import('@/lib/services');
    const blogResult = await getBlogBySlug(slugPath);
    if (blogResult.data) pageData = blogResult.data;
  }

  if (!pageData && (slugPath === '' || slugPath === 'about-us')) {
    const { getMockPageBySlug } = await import('@/lib/mocks');
    pageData = getMockPageBySlug(slugPath);
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

  // Known pages. Skip the news and blog probes so a missing CMS
  // page does not run those queries.
  const isReservedPage = slugPath === '' || slugPath === 'contact' || slugPath === 'about-us';
  if (!pageData && !isReservedPage) {
    const { getArticleBySlug } = await import('@/lib/services');
    const newsResult = await getArticleBySlug(slugPath);
    if (newsResult.data) {
      pageData = newsResult.data;
    }
  }

  if (!pageData && !isReservedPage) {
    const { getBlogBySlug } = await import('@/lib/services');
    const blogResult = await getBlogBySlug(slugPath);
    if (blogResult.data) pageData = blogResult.data;
  }

  if (!pageData && (slugPath === '' || slugPath === 'about-us')) {
    const { getMockPageBySlug } = await import('@/lib/mocks');
    pageData = getMockPageBySlug(slugPath);
  }

  if (!pageData) {
    notFound();
  }

  // Live CMS mode: only render Strapi-wired sections (keep Mock* code, hide it).
  let sections = (pageData.Section ?? []).filter((sec: { __typename?: string }) => {
    if (process.env.USE_MOCKS === 'true') return true;
    return !String(sec.__typename ?? '').startsWith('Mock');
  });
  const isContactPage = slugPath === 'contact';

  const hasBlogListing = sections.some(
    (sec: any) => sec.__typename === 'ComponentReferencesBlogListing'
  );

  if (hasBlogListing) {
    const { getAllBlogs } = await import('@/lib/services');
    const blogsResult = await getAllBlogs();
    if (blogsResult.data) {
      sections = sections.map((sec: any) => {
        if (sec.__typename === 'ComponentReferencesBlogListing') {
          return { ...sec, blogs: blogsResult.data };
        }
        return sec;
      });
    }
  }

  const isDark = pageData.pageType === 'Dark' || pageData.variant === 'dark';
  const isLight = pageData.pageType === 'Light' || pageData.variant === 'light';
  const isBlogDetail = !hasBlogListing && Boolean(pageData.readTime || pageData.author || pageData.categoryType || (slugPath.startsWith('blog') && slugPath !== 'blogs' && slugPath !== 'blog'));
  const toneClass = isDark ? 'bg-brand-navy text-white' : isLight ? 'bg-brand-surface' : isBlogDetail ? 'bg-white text-ink' : '';

  const hasLegalContent = sections.some((sec: any) => sec.__typename === 'ComponentReferencesLegalContent');
  if (isBlogDetail && !hasLegalContent && pageData.description) {
    sections.push({
      __typename: 'ComponentReferencesLegalContent',
      body: pageData.description,
      showToc: true,
    });
  }

  // For Blog Detail pages, separate hero banner from content sections to render
  // the exact Figma 2-column layout: Left column = Table of Contents, Right column = Article components & body
  if (isBlogDetail) {
    const bannerSection = sections.find(
      (sec: any) => sec.__typename === 'ComponentReferencesBannerReference'
    );
    const contentSections = sections.filter(
      (sec: any) => sec.__typename !== 'ComponentReferencesBannerReference'
    );

    const bannerNode = bannerSection
      ? renderRegisteredSection(bannerSection, 0, { contextData: pageData })
      : null;

    // Collect headings from all content sections (LegalContent body, KeyTakeaways titles, etc.)
    const { scanLegalHeadings } = await import('@/lib/legalToc');
    const { LegalToc } = await import('@/components/molecules');
    const { Container } = await import('@/components/atoms');

    const allHeadings: Array<{ id: string; text: string; level: 2 | 3 }> = [];
    const usedIds = new Set<string>();

    const slugify = (text: string) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    contentSections.forEach((sec: any) => {
      if (sec.__typename === 'ComponentReferencesLegalContent' && sec.body) {
        const scan = scanLegalHeadings(sec.body);
        scan.headings.forEach((h) => {
          if (!usedIds.has(h.id)) {
            usedIds.add(h.id);
            allHeadings.push(h);
          }
        });
      } else {
        const typename = String(sec.__typename || '');
        const isMatch =
          typename === 'ComponentReferencesKeyTakeawaysReference' ||
          typename === 'ComponentReferencesStatCardsReference' ||
          typename.toLowerCase().includes('statcard') ||
          typename.toLowerCase().includes('keytakeaway');
        const titleText = sec.title || sec.referenceTitle;

        if (isMatch && titleText) {
          const id = slugify(titleText);
          if (id && !usedIds.has(id)) {
            usedIds.add(id);
            allHeadings.push({ id, text: titleText, level: 2 });
          }
        }
      }
    });

    const renderedContent = contentSections.map((sec: any, idx: number) => {
      // If legal content, don't show internal duplicate sidebar because we provide unified sidebar
      if (sec.__typename === 'ComponentReferencesLegalContent') {
        const scan = scanLegalHeadings(sec.body || '');
        return (
          <div
            key={`legal-body-${idx}`}
            className="legal-body min-w-0 w-full"
            dangerouslySetInnerHTML={{ __html: scan.html }}
          />
        );
      }
      return renderRegisteredSection(sec, idx + 1, { contextData: pageData });
    });

    return (
      <main id="main" className={`min-h-screen ${toneClass}`.trim()}>
        {bannerNode}
        <Container className="mx-auto max-w-[1720px] px-4 sm:px-8 xl:px-12 py-10 xl:py-16">
          {allHeadings.length > 0 ? (
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(16rem,578px)_minmax(0,1054px)] lg:gap-14 xl:gap-20">
              <aside className="lg:sticky lg:top-[calc(var(--spacing-utility-h)+var(--spacing-nav-h)+1.5rem)]">
                <LegalToc headings={allHeadings} />
              </aside>
              <article className="min-w-0 w-full flex flex-col gap-8">
                {renderedContent}
              </article>
            </div>
          ) : (
            <article className="mx-auto max-w-[1054px] min-w-0 w-full flex flex-col gap-8">
              {renderedContent}
            </article>
          )}
        </Container>
      </main>
    );
  }

  const rendered = sections.map((sec: any, idx: number) =>
    renderRegisteredSection(
      sec,
      idx,
      {
        heroLayout: isContactPage ? 'contact' : undefined,
        contextData: pageData,
      },
    ),
  );

  return (
    <main id="main" className={`min-h-screen ${toneClass}`.trim()}>
      {rendered}
    </main>
  );
}
