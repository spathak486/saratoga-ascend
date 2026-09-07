import type { Metadata } from 'next';
import { HomeTemplate } from '@/components/templates';
import { getHomePage } from '@/lib/services';

export async function generateMetadata(): Promise<Metadata> {
  const result = await getHomePage();
  const seo = result.data?.seo;
  if (!seo) {
    return {};
  }

  return {
    title: seo.metaTitle ?? undefined,
    description: seo.metaDescription ?? undefined,
    openGraph: {
      title: seo.ogTitle ?? seo.metaTitle ?? undefined,
      description: seo.ogDescription ?? seo.metaDescription ?? undefined,
      images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : undefined,
    },
    robots: seo.metaRobots ?? undefined,
  };
}

export default async function Home() {
  const homeResult = await getHomePage();

  return <HomeTemplate homeData={homeResult.data ?? undefined} />;
}
