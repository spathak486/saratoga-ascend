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
  const pageSlugs = result.error ? [] : result.data;

  // Include solution & service (who-we-serve) slugs for static generation
  const { getAllSolutionSlugs, getAllServiceSlugs, getAllContractSlugs, getAllBlogSlugs, getAllArticleSlugs, getAllCaseStudySlugs } = await import('@/lib/services');
  const [solutionResult, serviceResult, contractResult, blogResult, articleResult, caseStudyResult] = await Promise.all([
    getAllSolutionSlugs(),
    getAllServiceSlugs(),
    getAllContractSlugs(),
    getAllBlogSlugs(),
    getAllArticleSlugs(),
    getAllCaseStudySlugs(),
  ]);

  const solutionSlugs = solutionResult.error ? [] : solutionResult.data;
  const serviceSlugs = serviceResult.error ? [] : serviceResult.data;
  const contractSlugs = contractResult.error ? [] : contractResult.data;
  const blogSlugs = blogResult.error ? [] : blogResult.data;
  const articleSlugs = articleResult.error ? [] : articleResult.data;
  const caseStudySlugs = caseStudyResult.error ? [] : caseStudyResult.data;

  const allSlugs = Array.from(new Set([...pageSlugs, ...solutionSlugs, ...serviceSlugs, ...contractSlugs, ...blogSlugs, ...articleSlugs, ...caseStudySlugs]));
  return allSlugs.map((slug) => ({ slug: slug.split('/') }));
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
  const isReservedPage =
    slugPath === '' ||
    slugPath === 'contact' ||
    slugPath === 'about-us' ||
    slugPath === 'solutions';
  if (!pageData && !isReservedPage) {
    const { getArticleBySlug } = await import('@/lib/services');
    const newsResult = await getArticleBySlug(slugPath);
    if (newsResult.data) pageData = newsResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getCaseStudyBySlug } = await import('@/lib/services');
    const csResult = await getCaseStudyBySlug(slugPath);
    if (csResult.data) pageData = csResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getBlogBySlug } = await import('@/lib/services');
    const blogResult = await getBlogBySlug(slugPath);
    if (blogResult.data) pageData = blogResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getSolutionBySlug } = await import('@/lib/services');
    const solutionResult = await getSolutionBySlug(slugPath);
    if (solutionResult.data) pageData = solutionResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getServiceBySlug } = await import('@/lib/services');
    const serviceResult = await getServiceBySlug(slugPath);
    if (serviceResult.data) pageData = serviceResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getContractBySlug } = await import('@/lib/services');
    const cvResult = await getContractBySlug(slugPath);
    if (cvResult.data) pageData = cvResult.data;
  }

  if (
    !pageData &&
    (slugPath === '' ||
      slugPath === 'about-us' ||
      slugPath === 'contact' ||
      slugPath === 'solutions')
  ) {
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
  if (pageResult.error && pageResult.error.code !== 'NOT_FOUND') {
    console.warn(
      `[Page] CMS query failed for "/${slugPath}": ${pageResult.error.message}`,
    );
  } else if (pageResult.data) {
    pageData = pageResult.data;
  }

  // Known pages. Skip the news and blog probes so a missing CMS
  // page does not run those queries.
  const isReservedPage =
    slugPath === '' ||
    slugPath === 'contact' ||
    slugPath === 'about-us' ||
    slugPath === 'solutions';
  if (!pageData && !isReservedPage) {
    const { getArticleBySlug } = await import('@/lib/services');
    const newsResult = await getArticleBySlug(slugPath);
    if (newsResult.data) {
      pageData = newsResult.data;
    }
  }

  if (!pageData && !isReservedPage) {
    const { getCaseStudyBySlug } = await import('@/lib/services');
    const csResult = await getCaseStudyBySlug(slugPath);
    if (csResult.data) pageData = csResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getBlogBySlug } = await import('@/lib/services');
    const blogResult = await getBlogBySlug(slugPath);
    if (blogResult.data) pageData = blogResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getSolutionBySlug } = await import('@/lib/services');
    const solutionResult = await getSolutionBySlug(slugPath);
    if (solutionResult.data) pageData = solutionResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getServiceBySlug } = await import('@/lib/services');
    const serviceResult = await getServiceBySlug(slugPath);
    if (serviceResult.data) pageData = serviceResult.data;
  }

  if (!pageData && !isReservedPage) {
    const { getContractBySlug } = await import('@/lib/services');
    const cvResult = await getContractBySlug(slugPath);
    if (cvResult.data) pageData = cvResult.data;
  }

  if (
    !pageData &&
    (slugPath === '' ||
      slugPath === 'about-us' ||
      slugPath === 'contact' ||
      slugPath === 'solutions')
  ) {
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
  const isWhoWeServePage = slugPath === 'who-we-serve';
  const isSolutionsPage = slugPath === 'solutions';

  const hasBlogListing = sections.some(
    (sec: any) => sec.__typename === 'ComponentReferencesBlogListing'
  );

  if (hasBlogListing) {
    const { getAllBlogs, getAllArticles, getAllCaseStudies } = await import('@/lib/services');
    const [blogsResult, articlesResult, caseStudiesResult] = await Promise.all([
      getAllBlogs(),
      getAllArticles(),
      getAllCaseStudies(),
    ]);

    // Detect content type from:
    // 1. Explicit contentType field if present
    // 2. Or the current URL slug (e.g. /news -> 'news', /case-studies or /past-performance -> 'case-studies')
    // 3. Or the section heading
    const isNewsSlug = slugPath === 'news' || slugPath.startsWith('news/');
    const isCaseStudySlug =
      slugPath === 'case-studies' ||
      slugPath.startsWith('case-studies/') ||
      slugPath === 'past-performance' ||
      slugPath.startsWith('past-performance/');

    sections = sections.map((sec: any) => {
      if (sec.__typename === 'ComponentReferencesBlogListing') {
        const headingLower = (sec.blogHeading || sec.heading || '').toLowerCase();
        let type: 'blogs' | 'news' | 'case-studies' = sec.contentType || 'blogs';

        if (!sec.contentType) {
          if (isNewsSlug || headingLower.includes('news')) {
            type = 'news';
          } else if (
            isCaseStudySlug ||
            headingLower.includes('case stud') ||
            headingLower.includes('past performance')
          ) {
            type = 'case-studies';
          }
        }

        let items: any[] = [];
        if (type === 'news') items = articlesResult.data ?? [];
        else if (type === 'case-studies') items = caseStudiesResult.data ?? [];
        else items = blogsResult.data ?? [];

        return { ...sec, contentType: type, items, blogs: items };
      }
      return sec;
    });
  }

  const isInsightsPage = slugPath === 'insights';
  if (isInsightsPage && !sections.some((sec: any) => sec.__typename === 'ComponentReferencesInsightsListing')) {
    sections.push({
      __typename: 'ComponentReferencesInsightsListing',
      mainHeading: pageData?.pageTitle || pageData?.title || 'Insights',
      mainSubheading: pageData?.seo?.metaDescription || 'Explore insights, news, and proven past performance shaping federal healthcare and defense.',
      showBlog: true,
      showNews: true,
      showPastPerformance: true,
    });
  }

  const hasInsightsListing = sections.some(
    (sec: any) => sec.__typename === 'ComponentReferencesInsightsListing'
  );

  if (hasInsightsListing) {
    const { getAllBlogs, getAllArticles, getAllCaseStudies } = await import('@/lib/services');
    const [blogsResult, articlesResult, caseStudiesResult] = await Promise.all([
      getAllBlogs(),
      getAllArticles(),
      getAllCaseStudies(),
    ]);

    sections = sections.map((sec: any) => {
      if (sec.__typename === 'ComponentReferencesInsightsListing') {
        return {
          ...sec,
          blogs: blogsResult.data ?? [],
          news: articlesResult.data ?? [],
          pastPerformance: caseStudiesResult.data ?? [],
        };
      }
      return sec;
    });
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
    const authorCardSection = sections.find(
      (sec: any) => sec.__typename === 'ComponentReferencesAuthorCard'
    );
    const resolvedAuthorName =
      authorCardSection?.author?.name ||
      pageData.authorRelation?.name ||
      pageData.authorName ||
      pageData.author;

    const blogContext = {
      ...pageData,
      author: resolvedAuthorName,
      authorName: resolvedAuthorName,
    };

    const bannerSection = sections.find(
      (sec: any) => sec.__typename === 'ComponentReferencesBannerReference'
    );
    const ctaSection = sections.find(
      (sec: any) => sec.__typename === 'ComponentReferencesBlogCtaCard'
    );
    const topicsSection = sections.find(
      (sec: any) => sec.__typename === 'ComponentReferencesRelatedTopics'
    );
    const trendingSection = sections.find(
      (sec: any) => sec.__typename === 'ComponentReferencesTrendingPosts'
    );
    const relatedCarouselSection = sections.find(
      (sec: any) => sec.__typename === 'ComponentReferencesRelatedPostsCarousel'
    );
    const contentSections = sections.filter(
      (sec: any) =>
        sec.__typename !== 'ComponentReferencesBannerReference' &&
        sec.__typename !== 'ComponentReferencesBlogCtaCard' &&
        sec.__typename !== 'ComponentReferencesRelatedTopics' &&
        sec.__typename !== 'ComponentReferencesTrendingPosts' &&
        sec.__typename !== 'ComponentReferencesRelatedPostsCarousel'
    );

    const bannerNode = bannerSection
      ? renderRegisteredSection(bannerSection, 0, { contextData: blogContext })
      : null;

    // Collect headings from all content sections (LegalContent body, KeyTakeaways titles, etc.)
    const { scanLegalHeadings } = await import('@/lib/legalToc');
    const { LegalToc, BlogCtaCard, RelatedTopicsCard, TrendingSidebarSection } = await import('@/components/molecules');
    const { RelatedPostsSection } = await import('@/components/organisms');
    const { Container } = await import('@/components/atoms');

    
    // Resolve dynamic topics from category, topic, or categories in CMS
    const currentCategoryName =
      pageData.category?.name ||
      pageData.topic ||
      (Array.isArray(pageData.categories) ? pageData.categories[0]?.name : null);

    const relatedTopicsList: Array<{ label: string; href?: string }> = [];
    if (currentCategoryName) {
      relatedTopicsList.push({
        label: currentCategoryName,
        href: `/insights?category=${encodeURIComponent(currentCategoryName)}`,
      });
    }

    // Include standard agency & healthcare topics matching Figma
    const defaultFallbackTopics = [
      'Federal Healthcare',
      'Clinical Staffing',
      'Health IT & Modernization',
      'Agency Direct Solicitations',
      'Veterans Health',
      'Compliance & Quality',
    ];

    defaultFallbackTopics.forEach((t) => {
      if (!relatedTopicsList.some((existing) => existing.label.toLowerCase() === t.toLowerCase())) {
        relatedTopicsList.push({
          label: t,
          href: `/insights?topic=${encodeURIComponent(t)}`,
        });
      }
    });

    
    const { getAllBlogs, getAllArticles, getAllCaseStudies } = await import('@/lib/services');
    const [allBlogsRes, allArticlesRes, allCaseStudiesRes] = await Promise.all([
      getAllBlogs(),
      getAllArticles(),
      getAllCaseStudies(),
    ]);

    const isNewsDetail = Boolean(slugPath.startsWith('news') || pageData.topic || pageData.categoryType === 'Newspaper');
    const isCaseStudyDetail = Boolean(slugPath.startsWith('case-stud') || pageData.client || pageData.categoryType === 'Case Study');
    const detailType: 'blog' | 'case-study' | 'news' = isNewsDetail
      ? 'news'
      : isCaseStudyDetail
        ? 'case-study'
        : 'blog';

    const currentDocId = pageData.documentId || pageData.id;
    const currentSlug = pageData.slug;

    // Filter out the current item and get the top 2
    let trendingItems: any[] = [];
    if (detailType === 'news') {
      trendingItems = (allArticlesRes.data ?? [])
        .filter((item: any) => item.documentId !== currentDocId && item.slug !== currentSlug)
        .slice(0, 2);
    } else if (detailType === 'case-study') {
      trendingItems = (allCaseStudiesRes.data ?? [])
        .filter((item: any) => item.documentId !== currentDocId && item.slug !== currentSlug)
        .slice(0, 2);
    } else {
      trendingItems = (allBlogsRes.data ?? [])
        .filter((item: any) => item.documentId !== currentDocId && item.slug !== currentSlug)
        .slice(0, 2);
    }

    const allHeadings: Array<{ id: string; text: string; level: 2 | 3 }> = [];
    const usedIds = new Set<string>();

    const slugify = (text: string) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const sectionIdMap = new Map<any, string>();
    const usedIdsForSections = new Map<string, number>();

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
        const titleText = sec.title || sec.referenceTitle || sec.sectionTitle;
        if (titleText && typeof titleText === 'string') {
          const baseId = slugify(titleText) || 'section';
          const count = (usedIdsForSections.get(baseId) ?? 0) + 1;
          usedIdsForSections.set(baseId, count);
          const uniqueId = count === 1 ? baseId : `${baseId}-${count}`;

          sectionIdMap.set(sec, uniqueId);
          allHeadings.push({ id: uniqueId, text: titleText, level: 2 });
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
      const rendered = renderRegisteredSection(sec, idx + 1, { contextData: pageData });
      const sectionId = sectionIdMap.get(sec);

      return (
        <div key={`section-wrapper-${idx}`} id={sectionId} className="w-full scroll-mt-32">
          {rendered}
        </div>
      );
    });

    const hasSidebar = allHeadings.length > 0 || Boolean(topicsSection) || Boolean(trendingSection) || Boolean(ctaSection);

    return (
      <main id="main" className={`min-h-screen ${toneClass}`.trim()}>
        {bannerNode}
        {/* Figma 563:1296: 120px gutters (px-page), ~80px band above content, TOC 578 + ~48 gap + article 1054. Stack through tablet; 2-col from xl. */}
        <Container className="py-8 sm:py-10 xl:py-20">
          {hasSidebar ? (
            <div className="grid items-start gap-8 sm:gap-10 xl:grid-cols-[minmax(16rem,36.125rem)_minmax(0,65.875rem)] xl:gap-12">
              <aside className="flex flex-col gap-10 xl:sticky xl:top-[calc(var(--spacing-utility-h)+var(--spacing-nav-h)+1.5rem)]">
                {allHeadings.length > 0 && <LegalToc headings={allHeadings} />}
                {topicsSection && (
                  <RelatedTopicsCard
                    title={topicsSection.title || 'RELATED TOPICS'}
                    topics={topicsSection.topics && topicsSection.topics.length > 0 ? topicsSection.topics : relatedTopicsList}
                  />
                )}
                {trendingSection && (
                  <TrendingSidebarSection
                    title={trendingSection.title}
                    items={trendingSection.blogs?.length || trendingSection.newsArticles?.length || trendingSection.caseStudies?.length ? (trendingSection.blogs || trendingSection.newsArticles || trendingSection.caseStudies) : trendingItems}
                    type={detailType}
                  />
                )}
                {ctaSection && (
                  <BlogCtaCard
                    variant="left"
                    title={ctaSection.blogCta?.title || ctaSection.title}
                    description={ctaSection.blogCta?.description || ctaSection.description}
                    link={ctaSection.blogCta?.link || ctaSection.link}
                    buttonText={ctaSection.blogCta?.buttonText || ctaSection.buttonText}
                    buttonUrl={ctaSection.blogCta?.buttonUrl || ctaSection.buttonUrl}
                  />
                )}
              </aside>
              <article className="flex w-full min-w-0 flex-col gap-6 sm:gap-7 xl:gap-8">
                {renderedContent}
              </article>
            </div>
          ) : (
            <article className="mx-auto flex w-full min-w-0 max-w-[1054px] flex-col gap-6 sm:gap-7 xl:gap-8">
              {renderedContent}
            </article>
          )}
        </Container>
        {relatedCarouselSection && (
          <RelatedPostsSection
            title={relatedCarouselSection.title}
            items={
              relatedCarouselSection.blogs?.length > 0
                ? relatedCarouselSection.blogs
                : relatedCarouselSection.newsArticles?.length > 0
                  ? relatedCarouselSection.newsArticles
                  : relatedCarouselSection.caseStudies?.length > 0
                    ? relatedCarouselSection.caseStudies
                    : (detailType === 'news'
                        ? (allArticlesRes.data ?? []).filter((item: any) => item.documentId !== currentDocId && item.slug !== currentSlug)
                        : detailType === 'case-study'
                          ? (allCaseStudiesRes.data ?? []).filter((item: any) => item.documentId !== currentDocId && item.slug !== currentSlug)
                          : (allBlogsRes.data ?? []).filter((item: any) => item.documentId !== currentDocId && item.slug !== currentSlug)
                      )
            }
            type={detailType}
          />
        )}
      </main>
    );
  }

  const firstBannerIndex = sections.findIndex(
    (sec: { __typename?: string }) => sec.__typename === 'ComponentReferencesBannerReference',
  );
  const rendered = sections.map((sec: any, idx: number) =>
    renderRegisteredSection(
      sec,
      idx,
      {
        heroLayout:
          isWhoWeServePage && idx === firstBannerIndex
            ? 'who-we-serve'
            : isSolutionsPage && idx === firstBannerIndex
              ? 'solutions'
            : isContactPage
              ? 'contact'
              : undefined,
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
