import type { Metadata } from 'next';
import { getAboutUsPage } from '@/lib/services';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

export async function generateMetadata(): Promise<Metadata> {
  const result = await getAboutUsPage();
  const seo = result.data?.seo;
  if (!seo) {
    return {
      title: 'About Us',
      description: 'Learn about Saratoga Ascend - healthcare consulting and workforce solutions.',
    };
  }

  return {
    title: seo.metaTitle ?? 'About Us',
    description: seo.metaDescription ?? undefined,
    openGraph: {
      title: seo.ogTitle ?? seo.metaTitle ?? undefined,
      description: seo.ogDescription ?? seo.metaDescription ?? undefined,
      images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : undefined,
    },
    robots: seo.metaRobots ?? undefined,
  };
}

export default async function AboutPage() {
  const result = await getAboutUsPage();
  const aboutData = result.data ?? undefined;

  return <AboutTemplate aboutData={aboutData} />;
}
