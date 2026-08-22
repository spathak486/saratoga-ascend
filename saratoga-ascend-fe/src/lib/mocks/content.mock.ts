import type { Page, Article } from '@/lib/schemas';

export const mockPages: Page[] = [
  {
    documentId: 'cm2a8h4j10001qk3f2n7x9wb',
    title: 'About Us',
    slug: 'about',
    content: `
      <h2>Who We Are</h2>
      <p>Saratoga Ascend is a healthcare staffing and consulting firm serving federal, state, and military facilities across the United States.</p>
      <h2>Our Mission</h2>
      <p>Advancing Healthcare. Accelerating Science. Empowering Possibility.</p>
    `,
    featuredImage: {
      url: '/images/hero-banner.png',
      width: 1200,
      height: 800,
      alternativeText: 'Saratoga Ascend team',
      formats: null,
    },
    seo: {
      metaTitle: 'About Us | Saratoga Ascend',
      metaDescription:
        'Learn about Saratoga Ascend — healthcare staffing and consulting for federal, state, and military facilities.',
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      metaRobots: 'index',
      twitterCardTitle: null,
      canonicalURL: null,
      structuredData: null,
      languageTag: 'en',
    },
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-15T00:00:00.000Z',
  },
  {
    documentId: 'cm2a8h4j10002qk3fh83k1pz',
    title: 'Contact Us',
    slug: 'contact',
    content: `
      <h2>Get In Touch</h2>
      <p>Ready to work with us? We'd love to hear from you.</p>
      <p><strong>Email:</strong> info@saratogaascend.com</p>
    `,
    featuredImage: null,
    seo: {
      metaTitle: 'Contact Us | Saratoga Ascend',
      metaDescription: 'Contact Saratoga Ascend for healthcare staffing solutions and consulting services.',
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      metaRobots: 'index',
      twitterCardTitle: null,
      canonicalURL: null,
      structuredData: null,
      languageTag: 'en',
    },
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z',
  },
  {
    documentId: 'cm2a8h4j10003qk3f9m2v6rt',
    title: 'Terms of Service',
    slug: 'terms',
    content: `
      <h2>Terms of Service</h2>
      <p>Last updated: August 10, 2026</p>
      <p>By accessing this website, you agree to be bound by these Terms of Service.</p>
    `,
    featuredImage: null,
    seo: {
      metaTitle: 'Terms of Service | Saratoga Ascend',
      metaDescription: 'Terms of Service for the Saratoga Ascend website.',
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      metaRobots: 'noindex',
      twitterCardTitle: null,
      canonicalURL: null,
      structuredData: null,
      languageTag: 'en',
    },
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z',
  },
];

export const mockArticles: Article[] = [
  {
    documentId: 'cm2a8h9k20001qk3f4d8w2xa',
    title: 'Saratoga Ascend Expands Healthcare Staffing to SLED Markets',
    slug: 'sled-market-expansion',
    content: `
      <p>We are excited to announce the expansion of our healthcare staffing services to State, Local, and Education (SLED) markets.</p>
      <h3>What This Means</h3>
      <p>SLED organizations can now access the same quality of staffing and consulting services trusted by federal and military healthcare facilities.</p>
    `,
    excerpt: 'Saratoga Ascend brings its healthcare staffing expertise to State, Local, and Education markets.',
    featuredImage: {
      url: '/images/healthcare-team.png',
      width: 800,
      height: 600,
      alternativeText: 'Healthcare team collaborating',
      formats: null,
    },
    author: 'Saratoga Ascend Team',
    category: 'news',
    publishedAt: '2026-08-12T10:00:00.000Z',
    seo: {
      metaTitle: 'SLED Market Expansion | Saratoga Ascend',
      metaDescription: 'Saratoga Ascend expands healthcare staffing to State, Local, and Education markets.',
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      metaRobots: 'index',
      twitterCardTitle: null,
      canonicalURL: null,
      structuredData: null,
      languageTag: 'en',
    },
    createdAt: '2026-08-11T00:00:00.000Z',
    updatedAt: '2026-08-12T10:00:00.000Z',
  },
  {
    documentId: 'cm2a8h9k20002qk3f7j1n4be',
    title: 'The Future of Federal Healthcare Staffing in 2026',
    slug: 'future-federal-healthcare-2026',
    content: `
      <p>As we move through 2026, the landscape of federal healthcare staffing continues to evolve.</p>
      <h3>Key Trends</h3>
      <ul>
        <li>Increased demand for telehealth-capable professionals</li>
        <li>Growing emphasis on mental health staffing</li>
        <li>Expansion of laboratory and scientific staffing needs</li>
      </ul>
    `,
    excerpt: 'Key trends shaping federal healthcare staffing in 2026 and how Saratoga Ascend is adapting.',
    featuredImage: null,
    author: 'Saratoga Ascend Team',
    category: 'saratoga-services',
    publishedAt: '2026-08-05T14:00:00.000Z',
    seo: null,
    createdAt: '2026-08-04T00:00:00.000Z',
    updatedAt: '2026-08-05T14:00:00.000Z',
  },
];

export const mockHomePage = {
  documentId: 'cm2a8h9k20003qk3f9m2v999',
  pageTitle: 'Home',
  slug: 'home',
  seo: {
    metaTitle: 'Saratoga Ascend | Healthcare Staffing & Solutions',
    metaDescription:
      'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.',
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    metaRobots: 'index' as const,
    twitterCardTitle: null,
    canonicalURL: null,
    structuredData: null,
    languageTag: 'en' as const,
  },
  Section: [
    {
      __typename: 'ComponentReferencesBannerReference' as const,
      heroBanner: {
        documentId: 'cm2banner12345',
        referenceTitle: 'Hero Banner Section',
        banner: {
          bannerTitle: 'Federal State Programs and Solutions',
          bannerSubTitle: 'Healthcare Staffing & Consulting',
          bannerDescription:
            'Saratoga Ascend connects cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.',
          bannerImage: {
            url: '/images/DNA-v1.png',
            width: 1200,
            height: 800,
            alternativeText: 'DNA double helix illustration',
            formats: null,
          },
          buttonCTA: {
            label: 'Contact us',
            href: '/contact',
            target: '_self' as const,
            isExternal: false,
          },
        },
      },
    },
  ],
};

