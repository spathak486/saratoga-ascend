import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactInquirySection } from '@/components/organisms/ContactInquirySection';
import { ContactPathwaysSection } from '@/components/organisms/ContactPathwaysSection';
import { ContactLearnSection } from '@/components/organisms/ContactLearnSection';
import { ContactOfficesSection } from '@/components/organisms/ContactOfficesSection';
import { NeedHelpSection } from '@/components/organisms/NeedHelpSection';
import { renderRegisteredSection } from '@/lib/registry/homeRegistry';
import { getPageBySlug, getAllPageSlugs } from '@/lib/services';
import type { BannerReference } from '@/lib/schemas';

/**
 * Shown on /contact until the CMS page includes a banner reference.
 * Title, subtitle, and description use the same fields the banner already has.
 * The subtitle is the phrase rendered in red inside the title.
 */
const CONTACT_HERO_FALLBACK: BannerReference = {
  __typename: 'ComponentReferencesBannerReference',
  heroBanner: {
    referenceTitle: 'Contact hero',
    banner: {
      bannerTitle: 'Let’s Start a\nConversation About\nYour Mission.',
      bannerSubTitle: 'About\nYour Mission.',
      bannerDescription:
        'Whether you are exploring a new requirement, discussing a contract opportunity, seeking a qualified delivery partner, or looking for career information, our team is ready to connect.',
      bannerImage: {
        url: '/images/contact/hero.png',
        width: 1920,
        height: 723,
        alternativeText:
          'Colleagues meeting beside a window with the U.S. Capitol in view',
        formats: null,
      },
      variant: 'default',
    },
  },
};

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
    if (slugPath === 'contact') {
      return {
        title: 'Contact Us',
        description:
          CONTACT_HERO_FALLBACK.heroBanner?.banner?.bannerDescription ?? undefined,
      };
    }
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
    if (slugPath === 'contact') {
      return (
        <main id="main" className="min-h-screen">
          {renderRegisteredSection(CONTACT_HERO_FALLBACK, 0, { heroLayout: 'contact' })}
          <ContactInquirySection />
          <ContactPathwaysSection />
          <ContactLearnSection />
          <ContactOfficesSection />
          <NeedHelpSection
            title="Need Help?"
            subTitle="Sign up now and get hired easily"
            personSrc="/images/need-help-nurse.png"
            mediaAlt="Nurse in blue scrubs giving a thumbs up"
            ctaLabel="Know More"
            imageClassName="h-full w-full object-cover object-left max-xl:object-[center_20%]"
          />
        </main>
      );
    }
    notFound();
  }

  let sections = pageData.Section ?? [];
  const isContactPage = slugPath === 'contact';

  if (
    isContactPage &&
    !sections.some(
      (sec: { __typename?: string }) =>
        sec.__typename === 'ComponentReferencesBannerReference',
    )
  ) {
    sections = [CONTACT_HERO_FALLBACK, ...sections];
  }

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
  const toneClass = isDark ? 'bg-brand-navy text-white' : isLight ? 'bg-brand-surface' : '';

  const rendered = sections.map((sec: any, idx: number) =>
    renderRegisteredSection(
      sec,
      idx,
      isContactPage ? { heroLayout: 'contact' } : undefined,
    ),
  );

  if (isContactPage) {
    const hasContactInquiry = sections.some(
      (sec: { __typename?: string }) =>
        sec.__typename === 'ComponentReferencesContactInquiryReference',
    );
    const hasContactPathways = sections.some(
      (sec: { __typename?: string }) =>
        sec.__typename === 'ComponentReferencesContactPathwaysReference',
    );
    const hasContactLearn = sections.some(
      (sec: { __typename?: string }) =>
        sec.__typename === 'ComponentReferencesContactLearnReference',
    );
    const hasContactOffices = sections.some(
      (sec: { __typename?: string }) =>
        sec.__typename === 'ComponentReferencesContactOfficesReference',
    );
    const bannerAt = sections.findIndex(
      (sec: { __typename?: string }) =>
        sec.__typename === 'ComponentReferencesBannerReference',
    );
    const injectIndex = bannerAt >= 0 ? bannerAt + 1 : 0;
    const additionalSections: React.ReactNode[] = [];

    if (!hasContactInquiry) {
      additionalSections.push(<ContactInquirySection key="contact-inquiry" />);
    }
    if (!hasContactPathways) {
      additionalSections.push(<ContactPathwaysSection key="contact-pathways" />);
    }
    if (!hasContactLearn) {
      additionalSections.push(<ContactLearnSection key="contact-learn" />);
    }
    if (!hasContactOffices) {
      additionalSections.push(<ContactOfficesSection key="contact-offices" />);
    }

    rendered.splice(injectIndex, 0, ...additionalSections);
    if (
      !sections.some(
        (sec: { __typename?: string }) => sec.__typename === 'ComponentReferencesCta',
      )
    ) {
      rendered.splice(
        (bannerAt >= 0 ? bannerAt + 1 : 0) + 4,
        0,
        <NeedHelpSection
          key="contact-need-help"
          title="Need Help?"
          subTitle="Sign up now and get hired easily"
          personSrc="/images/need-help-nurse.png"
          mediaAlt="Nurse in blue scrubs giving a thumbs up"
          ctaLabel="Know More"
          imageClassName="h-full w-full object-cover object-left max-xl:object-[center_20%]"
        />,
      );
    }
  }

  return (
    <main id="main" className={`min-h-screen ${toneClass}`.trim()}>
      {rendered}
    </main>
  );
}