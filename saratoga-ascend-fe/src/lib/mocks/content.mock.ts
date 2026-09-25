import type { Page, Article } from '@/lib/schemas';
import type { DynamicZoneSection } from '@/lib/schemas';

const homeSections: DynamicZoneSection[] = [
  {
    __typename: 'ComponentReferencesBannerReference',
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
          target: '_self',
          isExternal: false,
        },
      },
    },
  },
  { __typename: 'MockWhatWeDo' },
  {
    __typename: 'ComponentReferencesServiceReference',
    heading: {
      title: 'Market We Serve',
      description:
        'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.',
    },
    services: [
      {
        documentId: 'cm2svc-federal',
        slug: 'federal-military',
        title: 'Federal & Military',
        summary:
          'Cleared clinicians and program staff for VA, DoD, and federal healthcare missions.',
        image: {
          url: '/images/phase4/market-federal-military.png',
          width: 828,
          height: 480,
          alternativeText: 'Federal and military healthcare',
          formats: null,
        },
        cta: { label: 'Learn More', href: '/who-we-serve', target: '_self', isExternal: false },
      },
      {
        documentId: 'cm2svc-state',
        slug: 'state-local',
        title: 'State & Local',
        summary:
          'Credentialed teams for state, municipal, and community health programs nationwide.',
        image: {
          url: '/images/phase4/market-state-local.png',
          width: 828,
          height: 480,
          alternativeText: 'State and local healthcare',
          formats: null,
        },
        cta: { label: 'Learn More', href: '/who-we-serve', target: '_self', isExternal: false },
      },
    ],
  },
  { __typename: 'MockHealthcare' },
  {
    __typename: 'ComponentReferencesMissionReference',
    missionSection: {
      documentId: 'cm2mission01',
      referenceTitle: 'Mission',
      title: 'Four Decades of Military & Federal Healthcare Solutions',
      description:
        'Founded to serve federal and military healthcare, we grew into a nationwide partner for hospitals, clinics, and public health programs. We combine military-grade precision with responsive, people-first service—matching licensed, background-checked, and fully credentialed professionals to serve every mission.',
      highlights: [
        { text: 'Nationwide Coverage' },
        { text: 'Cleared Personnel' },
        { text: 'Dedicated Compliance' },
        { text: '24/7 Mission Support' },
      ],
      image: {
        url: '/images/about/heart.png',
        width: 750,
        height: 750,
        alternativeText: 'Mission heart',
        formats: null,
      },
      shieldIcon: {
        url: '/images/about/icon-shield.svg',
        width: 80,
        height: 80,
        alternativeText: 'Shield',
        formats: null,
      },
      pulseIcon: {
        url: '/images/about/icon-pulse.svg',
        width: 80,
        height: 80,
        alternativeText: 'Pulse',
        formats: null,
      },
    },
  },
  { __typename: 'MockContractVehicles' },
  {
    __typename: 'ComponentReferencesAchievements',
    ourAchievement: {
      documentId: 'cm2achievements01',
      referenceTitle: 'Our Achievements',
      title: 'Our Achievements',
      bgImage: {
        url: '/images/achievements-bg.jpg',
        width: 1920,
        height: 1080,
        alternativeText: 'Achievements background',
        formats: null,
      },
      counter: [
        { title: 'Specialists', counter: '50+' },
        { title: 'Placements', counter: '1500' },
        { title: 'Locations', counter: '50+' },
        { title: 'Services', counter: '256' },
      ],
      achievementCards: [
        {
          documentId: 'cm2achcard01',
          referenceTitle: 'The Joint Commission',
          card: {
            year: '2026-2027',
            title: 'The Joint Commission',
            description:
              'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web',
            logo: {
              url: '/images/image%206.png',
              width: 250,
              height: 250,
              alternativeText: 'The Joint Commission badge',
              formats: null,
            },
          },
        },
        {
          documentId: 'cm2achcard02',
          referenceTitle: 'WOSB Certified',
          card: {
            year: '2026-2027',
            title: 'WOSB Certified',
            description:
              'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web',
            logo: {
              url: '/images/image%208.png',
              width: 250,
              height: 250,
              alternativeText: 'WOSB Certified badge',
              formats: null,
            },
          },
        },
      ],
    },
  },
  { __typename: 'MockPastPerformance' },
  { __typename: 'MockHappyClients' },
  {
    __typename: 'ComponentReferencesClientLogosReference',
    clientLogosSection: {
      documentId: 'cm2logos01',
      referenceTitle: 'Our Clients',
      title: 'Our Clients',
      description: 'Success is built on consistent effort.',
      logos: [
        {
          url: '/images/image 6.png',
          width: 160,
          height: 80,
          alternativeText: 'Joint Commission',
          formats: null,
        },
        {
          url: '/images/image 8.png',
          width: 160,
          height: 80,
          alternativeText: 'WOSB',
          formats: null,
        },
        {
          url: '/images/image 9.png',
          width: 160,
          height: 80,
          alternativeText: 'Client logo',
          formats: null,
        },
        {
          url: '/images/image 11.png',
          width: 160,
          height: 80,
          alternativeText: 'Client logo',
          formats: null,
        },
      ],
    },
  },
  {
    __typename: 'ComponentReferencesFaQs',
    content: {
      documentId: 'cm2faqcontent123',
      referenceTitle: 'FAQ Content Section',
      ContentSection: {
        title: 'Any Questions?',
        subTitle: 'Proudly Serving Federal, State and Local clients',
        description: null,
        image: null,
        link: {
          label: 'Know More',
          href: '/about',
          target: '_self',
          isExternal: false,
        },
      },
    },
    faqs: [
      {
        documentId: 'cm2faq1',
        referenceTitle: 'FAQ 1',
        faq: {
          title: 'How this work?',
          description:
            'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web development to showcase layouts and visual elements without the distraction of meaningful content.',
        },
      },
      {
        documentId: 'cm2faq2',
        referenceTitle: 'FAQ 2',
        faq: {
          title: 'How this work?',
          description:
            'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web development to showcase layouts and visual elements without the distraction of meaningful content.',
        },
      },
    ],
  },
  {
    __typename: 'ComponentReferencesCta',
    cta: {
      documentId: 'cm2cta01',
      referenceTitle: 'Need Help',
      cta: {
        title: 'Need Help?',
        subTitle: 'Sign up now and get hired easily',
        description: null,
        image: {
          url: '/images/need-help-nurse.png',
          width: 767,
          height: 733,
          alternativeText: 'Nurse',
          formats: null,
        },
        link: { label: 'Get Started', href: '/contact', target: '_self', isExternal: false },
      },
    },
  },
  { __typename: 'MockLatestNews' },
];

const aboutSections: DynamicZoneSection[] = [
  {
    __typename: 'ComponentReferencesBannerReference',
    heroBanner: {
      documentId: 'cm2aboutbanner01',
      referenceTitle: 'About Banner',
      banner: {
        bannerTitle: 'About Saratoga Ascend',
        bannerSubTitle: 'Empowering Possibility',
        bannerDescription:
          'Mission-critical healthcare consulting, workforce solutions, and technology for government and military.',
        bannerImage: {
          url: '/images/DNA-v1.png',
          width: 1200,
          height: 800,
          alternativeText: 'DNA illustration',
          formats: null,
        },
        buttonCTA: {
          label: 'Contact us',
          href: '/contact',
          target: '_self',
          isExternal: false,
        },
      },
    },
  },
];

const privacyPolicySections: DynamicZoneSection[] = [
  {
    __typename: 'ComponentReferencesLegalContent',
    title: 'PRIVACY POLICY',
    showToc: true,
    body: `
      <p>At Saratoga Medical Center, Inc., we respect and protect your privacy. By visiting our website, you are accepting the practices described in this Privacy Policy. We value the trust you place in us and are committed to handling your information with care, transparency, and sensitivity.</p>
      <h3>Information We Collect</h3>
      <p>The information we collect from visitors helps us improve both our website and the healthcare staffing services we provide. Information may include:</p>
      <ul>
        <li>Details you voluntarily provide (such as forms you complete on our site)</li>
        <li>Technical data collected through cookies, including IP address, browser type, operating system, platform, and visit date/time.</li>
      </ul>
      <h3>Cookies and Tracking</h3>
      <p>Like most websites, we use cookies — small alphanumeric identifiers stored on your device — to enhance your browsing experience. Cookies allow us to:</p>
      <ul>
        <li>Personalize your experience on our site</li>
        <li>Analyze web traffic and user behavior</li>
        <li>Provide tailored advertising through trusted third parties</li>
      </ul>
      <p>You can manage cookie settings through your browser's Help menu to block or disable cookies if you prefer.</p>
      <h3>Contact Us</h3>
      <p>If you have any questions or concerns regarding this Privacy Policy or how your information is used, please reach out to us at <a href="mailto:marketing@saratogamed.com">marketing@saratogamed.com</a>. We will make every effort to address your inquiry quickly and thoroughly.</p>
    `,
  },
];

const termsSections: DynamicZoneSection[] = [
  {
    __typename: 'ComponentReferencesLegalContent',
    title: 'Terms & Condition',
    showToc: false,
    body: `
      <p>Saratoga Medical Center, Inc. may contact you via SMS text messages to provide important updates about jobs you have applied for, other relevant job opportunities, or to communicate with you regarding your application. These messages are designed to keep you informed and connected throughout the hiring process.</p>
      <h2>How to opt out?</h2>
      <p>You can cancel SMS communications at any time. Simply text &ldquo;STOP&rdquo; to the number you received messages from. Once we receive your request, you will get a confirmation message letting you know you have been unsubscribed. After this, you will no longer receive SMS messages from Saratoga Medical Center, Inc.</p>
      <p>If you decide to opt back in, simply sign up again as you did originally, and we will resume sending SMS updates.</p>
      <h2>Getting Help</h2>
      <p>If you experience issues with our messaging service, reply with the keyword &ldquo;HELP&rdquo; for assistance. You may also contact us directly at:</p>
      <ul>
        <li>Email: <a href="mailto:marketing@saratogamed.com">marketing@saratogamed.com</a></li>
        <li>Phone: +1 (212) 213-2520</li>
      </ul>
      <h2>Message Delivery &amp; Rates</h2>
      <ul>
        <li>Carriers are not liable for delayed or undelivered messages.</li>
        <li>Standard message and data rates may apply depending on your mobile plan.</li>
        <li>Message frequency may vary based on the opportunities you apply for and communication with our recruiters.</li>
        <li>For details on your personal text or data plan, please contact your wireless provider.</li>
      </ul>
    `,
  },
];

export const mockHomePage: Page = {
  documentId: 'cm2a8h9k20003qk3f9m2v999',
  internalName: 'Home',
  pageTitle: 'Home',
  slug: '',
  pageType: 'Standard',
  variant: 'default',
  seo: {
    metaTitle: 'Saratoga Ascend | Healthcare Staffing & Solutions',
    metaDescription:
      'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.',
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    metaRobots: 'index',
    twitterCardTitle: null,
    canonicalURL: null,
    structuredData: null,
    languageTag: 'en',
  },
  Section: homeSections,
  createdAt: '2026-08-11T00:00:00.000Z',
  updatedAt: '2026-08-12T10:00:00.000Z',
};

export const mockPages: Page[] = [
  mockHomePage,
  {
    documentId: 'cm2a8h4j10001qk3f2n7x9wb',
    internalName: 'About Us',
    pageTitle: 'About Us',
    slug: 'about',
    pageType: 'Standard',
    variant: 'default',
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
    Section: aboutSections,
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-15T00:00:00.000Z',
  },
  {
    documentId: 'cm2a8h4j10002qk3fh83k1pz',
    internalName: 'Contact Us',
    pageTitle: 'Contact Us',
    slug: 'contact',
    pageType: 'Standard',
    variant: 'default',
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
    Section: null,
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z',
  },
  {
    documentId: 'cm2a8h4j10003qk3f9m2v6rt',
    internalName: 'Terms of Service',
    pageTitle: 'Terms of Service',
    slug: 'terms',
    pageType: 'LegalPolicy',
    variant: 'legal_policy',
    seo: {
      metaTitle: 'Terms of Service | Saratoga Ascend',
      metaDescription: 'Terms of Service for the Saratoga Ascend website.',
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      metaRobots: 'index',
      twitterCardTitle: null,
      canonicalURL: null,
      structuredData: null,
      languageTag: 'en',
    },
    Section: termsSections,
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z',
  },
  {
    documentId: 'cm2a8h4j10004qk3f5d2m8xq',
    internalName: 'Privacy Policy',
    pageTitle: 'Privacy Policy',
    slug: 'privacy-policy',
    pageType: 'LegalPolicy',
    variant: 'legal_policy',
    seo: {
      metaTitle: 'Privacy Policy | Saratoga Ascend',
      metaDescription: 'Privacy Policy for the Saratoga Medical Center website.',
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      metaRobots: 'index',
      twitterCardTitle: null,
      canonicalURL: null,
      structuredData: null,
      languageTag: 'en',
    },
    Section: privacyPolicySections,
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

