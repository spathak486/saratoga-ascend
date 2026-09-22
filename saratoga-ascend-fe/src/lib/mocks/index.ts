import type { Page, Article, Pagination, FooterData, NotFoundData } from '@/lib/schemas';
import { mockPages, mockArticles } from './content.mock';
import { mockFooterData } from './footer.mock';
import { mockNotFoundData } from './not-found.mock';

export function getMockFooterData(): FooterData {
  return mockFooterData;
}

export function getMockNotFoundData(): NotFoundData {
  return mockNotFoundData;
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
  return mockPages.map((p) => p.slug).filter((slug) => slug);
}

export function getMockAllArticleSlugs(): string[] {
  return mockArticles.map((a) => a.slug);
}