import type { Page, Article, Pagination, HomePage, AboutPage } from '@/lib/schemas';
import { mockPages, mockArticles, mockHomePage } from './content.mock';

export function getMockHomePage(): HomePage {
  return mockHomePage;
}

export function getMockAboutUsPage(): AboutPage {
  return {
    pageTitle: 'About Us',
    slug: 'about-us',
    Section: [
      {
        __typename: 'ComponentReferencesBannerReference',
        heroBanner: {
          referenceTitle: 'About Banner',
          banner: {
            bannerTitle: 'About Saratoga Ascend',
            bannerSubTitle: 'Empowering Possibility',
            bannerDescription:
              'Mission-critical healthcare consulting, workforce solutions, and technology for government and military.',
            bannerImage: {
              url: '/images/DNA-v1.png',
              alternativeText: 'DNA illustration',
            },
            buttonCTA: {
              label: 'Contact us',
              href: '/contact',
            },
          },
        },
      },
    ],
  };
}

export function getMockPageBySlug(slug: string): Page | null {
  return mockPages.find((p) => p.slug === slug) ?? null;
}

export function getMockArticles(page = 1, pageSize = 10): { articles: Article[]; pagination: Pagination } {
  const sorted = [...mockArticles].sort(
    (a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime()
  );
  const start = (page - 1) * pageSize;
  const articles = sorted.slice(start, start + pageSize);

  return {
    articles,
    pagination: { page, pageSize, pageCount: Math.ceil(sorted.length / pageSize), total: sorted.length },
  };
}

export function getMockArticleBySlug(slug: string): Article | null {
  return mockArticles.find((a) => a.slug === slug) ?? null;
}

export function getMockAllPageSlugs(): string[] {
  return mockPages.map((p) => p.slug);
}

export function getMockAllArticleSlugs(): string[] {
  return mockArticles.map((a) => a.slug);
}
