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
        secondaryButtonCTA: {
          label: 'Explore Solutions',
          href: '/services',
          target: '_self',
          isExternal: false,
        },
        variant: 'homebanner_two_buttons',
      },
    },
  },
  {
    __typename: 'ComponentReferencesSupportingMissionReference',
    supportingMissionSection: {
      documentId: 'cm2supportingmission01',
      referenceTitle: 'Supporting Missions Section',
      title: 'Supporting the missions that move communities forward.',
      description:
        '<p>Saratoga Ascend brings people, expertise, technology, and disciplined delivery together to support complex healthcare and government missions.</p><p>We are positioned as a mission-focused partner for organizations operating where healthcare, workforce, technology, program management, and public-sector service delivery intersect.</p>',
      image: {
        url: '/images/supporting-missions.png',
        width: 689,
        height: 852,
        alternativeText: 'Healthcare team supporting missions',
        formats: null,
      },
      cta: null,
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
    __typename: 'ComponentReferencesBannerReference',
    heroBanner: {
      documentId: 'cm2experiencebanner01',
      referenceTitle: 'Experience That Supports the Mission',
      banner: {
        bannerTitle: 'Experience That Supports the Mission',
        bannerSubTitle: null,
        bannerDescription:
          'Government missions depend on people, processes, and partnerships that work together. Saratoga Ascend brings these elements into focus through responsive service delivery, qualified talent, and a commitment to dependable execution. Whether supporting healthcare facilities, public programs, or technology initiatives, we work to help our partners meet critical needs and move their missions forward.',
        bannerImage: {
          url: 'https://cms.saratogaascend.com/uploads/Create_some_animation_for_this_1_1_c7118e5705.png',
          width: 1920,
          height: 1080,
          alternativeText: 'Healthcare professionals supporting the mission',
          formats: null,
        },
        buttonCTA: null,
        secondaryButtonCTA: null,
        variant: 'gradient',
      },
    },
  },
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
        url: '/images/four-decades.gif',
        width: 750,
        height: 750,
        alternativeText: 'Mission animation',
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
  // Non-Mock typename so local home fallback still renders when USE_MOCKS=false.
  { __typename: 'FrontendContractVehicles' },
  { __typename: 'MockCeoMessage' },
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
  {
    __typename: 'ComponentReferencesPastPerformanceReference',
    heading: 'Past Performance',
    pastPerformanceHeading: 'Past Performance',
    subheading:
      'Real-world impact. Discover how we deliver rapid, compliant, and critical staffing solutions across the nation.',
    caseStudies: [
      {
        documentId: 'cs-01',
        title: 'Naval Hospital, NC',
        slug: 'naval-hospital-nc',
        summary:
          'Deployed 50+ cleared clinical professionals in under 14 days to support critical surge requirements.',
        image: {
          url: '/images/performance/naval-hospital.png',
          width: 411,
          height: 650,
          alternativeText: 'Naval Hospital, NC',
          formats: null,
        },
      },
      {
        documentId: 'cs-02',
        title: 'Texas Public Health',
        slug: 'texas-public-health',
        summary:
          'Scaled a statewide network of Allied Health professionals to ensure continuous, compliant patient care.',
        image: {
          url: '/images/performance/texas-public-health.png',
          width: 411,
          height: 650,
          alternativeText: 'Texas Public Health',
          formats: null,
        },
      },
      {
        documentId: 'cs-03',
        title: 'Walter Reed MMC',
        slug: 'walter-reed-mmc',
        summary:
          'Secured highly specialized medical laboratory technicians while maintaining 100% audit readiness.',
        image: {
          url: '/images/performance/walter-reed.png',
          width: 411,
          height: 650,
          alternativeText: 'Walter Reed MMC',
          formats: null,
        },
      },
    ],
  },
  {
    __typename: 'ComponentReferencesHappyClientsReference',
    title: 'TESTIMONIALS',
    description: 'Hear From Our Placements',
    reviews: [
      {
        documentId: 'hc-cna-izabella',
        role: 'Certified Nursing Assistant (CNA)',
        name: 'Izabella',
        place: 'Naval Hospital, Lejeune – Family Medicine',
        quote:
          'After nearly 10 years in an ER, Saratoga gave me the chance to join an incredible company that truly values its team. I love my job, my work family, and caring for our patients.',
        photos: [
          {
            url: '/images/healthcare-team.png',
            width: 800,
            height: 1000,
            alternativeText: 'Certified Nursing Assistant',
            formats: null,
          },
          {
            url: '/images/pharmacist-portrait.png',
            width: 800,
            height: 1000,
            alternativeText: 'Healthcare professional',
            formats: null,
          },
          {
            url: '/images/future-doctor.png',
            width: 800,
            height: 1000,
            alternativeText: 'Healthcare professional',
            formats: null,
          },
        ],
      },
      {
        documentId: 'hc-mlt',
        role: 'Medical Laboratory Technician',
        name: 'MLT',
        place: 'Camp Lejeune',
        quote:
          'I’ve been with Saratoga for over a year, and they’ve always treated me as a priority. When I faced a lifelong illness, they supported me with options so I could keep working and providing for my family.',
        photos: [
          {
            url: '/images/pharmacist-portrait.png',
            width: 800,
            height: 1000,
            alternativeText: 'Medical Laboratory Technician',
            formats: null,
          },
          {
            url: '/images/healthcare-team.png',
            width: 800,
            height: 1000,
            alternativeText: 'Healthcare professional',
            formats: null,
          },
          {
            url: '/images/future-doctor.png',
            width: 800,
            height: 1000,
            alternativeText: 'Healthcare professional',
            formats: null,
          },
        ],
      },
      {
        documentId: 'hc-cna-karen',
        role: 'CNA',
        name: 'Karen Flowers',
        place: 'NMCCL Mental Health',
        quote:
          'From HR to payroll, every interaction has been positive. 2024 was amazing, and I can’t wait for 2025 with Saratoga!',
        photos: [
          {
            url: '/images/future-doctor.png',
            width: 800,
            height: 1000,
            alternativeText: 'CNA',
            formats: null,
          },
          {
            url: '/images/healthcare-team.png',
            width: 800,
            height: 1000,
            alternativeText: 'Healthcare professional',
            formats: null,
          },
          {
            url: '/images/pharmacist-portrait.png',
            width: 800,
            height: 1000,
            alternativeText: 'Healthcare professional',
            formats: null,
          },
        ],
      },
      {
        documentId: 'hc-msw',
        role: 'MSW, LCSW',
        name: '—',
        place: '—',
        quote:
          'Saratoga is a wonderful place to work! I’m so grateful to be in my favorite social work position of my career.',
        photos: [
          {
            url: '/images/healthcare-team.png',
            width: 800,
            height: 1000,
            alternativeText: 'Social worker',
            formats: null,
          },
          {
            url: '/images/future-doctor.png',
            width: 800,
            height: 1000,
            alternativeText: 'Healthcare professional',
            formats: null,
          },
          {
            url: '/images/pharmacist-portrait.png',
            width: 800,
            height: 1000,
            alternativeText: 'Healthcare professional',
            formats: null,
          },
        ],
      },
    ],
  },
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
          href: '/about-us',
          target: '_self',
          isExternal: false,
        },
      },
    },
    supportCta: {
      documentId: 'cm2faqsupportcta',
      referenceTitle: 'FAQ Support CTA',
      ContentSection: {
        title: 'Still have questions?',
        subTitle:
          'Need clarity before moving forward? Speak with our operations team to get clear, direct answers tailored to your business challenges.',
        description: null,
        image: null,
        link: {
          label: 'Book a Consultation',
          href: '/contact',
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

/** Shared value cards mirroring live CMS solutions page content. */
const solutionsValueCards = [
  {
    documentId: 'suy8slot3021zf7e82acrdh8',
    title: 'UNDERSTAND',
    description:
      'Clarify objectives, requirements, stakeholders, operating conditions, risks, and desired outcomes.',
    number: '1',
    isHighlighted: false,
    icon: null,
    actionTone: null,
  },
  {
    documentId: 'ydq8oe1zmh0ogor4e56unqaj',
    title: 't1',
    description: 't2',
    number: '2',
    isHighlighted: false,
    icon: null,
    actionTone: null,
  },
  {
    documentId: 't8sn9vb06yixfv5cubekum4w',
    title: 'Serve with purpose',
    description: 'Understand who depends on the work and why the outcome matters.',
    number: '03',
    isHighlighted: true,
    icon: null,
    actionTone: null,
  },
  {
    documentId: 'nnuuvo5ivbhs8kgj9bmk9drr',
    title: 'Our Mission',
    description:
      'To support healthcare and government organizations with capable people, connected services, and dependable execution—helping essential programs serve their communities with care and consistency.',
    number: '04',
    isHighlighted: true,
    icon: null,
    actionTone: null,
  },
];

/**
 * Local fallback for /solutions when CMS GraphQL is unreachable.
 * Section order + copy mirror https://saratoga-ascend.vercel.app/solutions (live CMS).
 */
const solutionsSections: DynamicZoneSection[] = [
  {
    __typename: 'ComponentReferencesBannerReference',
    heroBanner: {
      documentId: 'cm2solutionsbanner01',
      referenceTitle: 'Solutions Banner',
      banner: {
        bannerTitle: 'Building Missiontest -Ready Healthcare Workforces',
        bannerSubTitle: 'test',
        bannerDescription:
          'Saratoga Ascend helps government agencies, healthcare organizations, and public-sector programs access qualified healthcare professionals, flexible staffing models, and dependable workforce delivery services.',
        bannerImage: {
          url: '/images/DNA-v1.png',
          width: 1200,
          height: 800,
          alternativeText: 'Saratoga Ascend solutions hero',
          formats: null,
        },
        buttonCTA: {
          label: 'Explore Our Capabilities',
          href: '/solutions',
          target: '_self',
          isExternal: false,
        },
        secondaryButtonCTA: {
          label: 'Discuss Your Requirements test',
          href: '/contact',
          target: '_self',
          isExternal: false,
        },
        variant: 'default',
      },
    },
  },
  {
    __typename: 'ComponentReferencesCriticalMissionsReference',
    criticalMissionsSection: {
      documentId: 'cm2solutionscm01',
      referenceTitle: 'Critical Missions',
      title: 'Supporting the people behind critical healthcare missions.',
      highlightTitle: 'critical healthcare missions',
      description:
        'Healthcare organizations need more than access to candidates. They need dependable workforce planning, qualified professionals, operational readiness, and delivery models that can adapt to changing mission requirements.',
      cards: solutionsValueCards,
    },
  },
  {
    __typename: 'ComponentReferencesServiceLifecycleReference',
    title: 'Healthcare Workforce Solutions',
    subtitle: 'Across the Service Lifecycle',
    description:
      'From physicians and nurses to allied health, behavioral health, laboratory, and scientific professionals, Saratoga Ascend supports workforce needs through flexible engagement and delivery models.',
    tabs: [
      {
        documentId: 'yhcgje43ooarfqwdiy5684qg',
        tabId: 'Physician-Staffing',
        label: 'Physician Staffing',
        heading: 'Physician Staffing',
        subheading:
          'Saratoga Ascend supports healthcare and public-sector organizations with qualified physicians for planned staffing needs, specialized programs, temporary coverage, and mission-critical healthcare delivery.',
        categoriesLabel: 'Workforce categories test',
        supportAreasLabel: ' Support areas test',
        cta: { label: 'Discuss this workforce requirement', href: '/', target: '_self', isExternal: false },
        image: { url: '/uploads/Frame_2147226432_424e20f10b.png' },
        supportAreas: Array.from({ length: 7 }, () => ({ text: 'Support areas' })),
        categories: [
          { documentId: 'ydq8oe1zmh0ogor4e56unqaj', number: '2', title: 't1', description: 't2' },
          solutionsValueCards[0],
          {
            documentId: 'zstqkipqmo6ogmu3k1zs21j1',
            number: '01',
            title: 'Understand the Requirement',
            description: 'Clarify mission context, scope, and desired outcomes.',
          },
        ],
      },
      {
        documentId: 'pn5xeaw5ijl8wvx8ge67wte8',
        tabId: 'Physician-Staffing-test',
        label: 'Physician Staffing Test',
        heading: 'Physician Staffing Test',
        subheading:
          'Test Saratoga Ascend supports healthcare and public-sector organizations with qualified physicians for planned staffing needs, specialized programs, temporary coverage, and mission-critical healthcare delivery.',
        categoriesLabel: 'Workforce categories test',
        supportAreasLabel: ' Support areas test',
        cta: { label: 'Discuss this workforce requirement', href: '/', target: '_self', isExternal: false },
        image: { url: '/uploads/Create_some_animation_for_this_1_1_c7118e5705.png' },
        supportAreas: Array.from({ length: 7 }, () => ({ text: 'Support areas' })),
        categories: [
          { documentId: 'ydq8oe1zmh0ogor4e56unqaj', number: '2', title: 't1', description: 't2' },
          solutionsValueCards[0],
          {
            documentId: 'zstqkipqmo6ogmu3k1zs21j1',
            number: '01',
            title: 'Understand the Requirement',
            description: 'Clarify mission context, scope, and desired outcomes.',
          },
        ],
      },
    ],
  },
  {
    __typename: 'ComponentReferencesWorkforcePlanningReference',
    workforcePlanningSection: {
      documentId: 'cm2solutionswp01',
      referenceTitle: 'Workforce Planning',
      title: 'From Workforce Planning to Ongoing Support',
      highlightTitle: 'From Workforce Planning',
      variant: 'orbital',
      centerImage: {
        url: 'https://cms.saratogaascend.com/uploads/Modern_Healthcare_Team_Banner_1_974c29dd05.png',
        width: 800,
        height: 800,
        alternativeText: 'Healthcare Team',
        formats: null,
      },
      cards: [
        solutionsValueCards[3],
        solutionsValueCards[2],
        solutionsValueCards[0],
        solutionsValueCards[1],
      ],
    },
  },
  {
    __typename: 'ComponentReferencesWorkforceSupportReference',
    workforceSupportSection: {
      documentId: 'cm2solutionsws01',
      referenceTitle: 'Workforce Support',
      title: 'Workforce support where it matters most.',
      highlightTitle: 'Workforce support',
      cards: [
        solutionsValueCards[0],
        solutionsValueCards[2],
        solutionsValueCards[1],
      ],
    },
  },
  {
    __typename: 'ComponentReferencesWorkforceDeliveryReference',
    workforceDeliverySection: {
      documentId: 'cm2solutionswd01',
      referenceTitle: 'Workforce Delivery',
      title: 'Workforce delivery built on accountability.',
      highlightTitle: 'Workforce delivery',
      cards: [
        solutionsValueCards[2],
        solutionsValueCards[1],
        solutionsValueCards[0],
        solutionsValueCards[3],
      ],
    },
  },
  {
    __typename: 'ComponentReferencesExploreCapabilitiesReference',
    exploreCapabilitiesSection: {
      documentId: 'cm2solutionsec01',
      referenceTitle: 'Explore Capabilities',
      title: 'Explore more Saratoga Ascend capabilities.',
      highlightTitle: 'Explore more',
      cards: [
        solutionsValueCards[3],
        solutionsValueCards[2],
        solutionsValueCards[0],
        solutionsValueCards[1],
        {
          documentId: 'zstqkipqmo6ogmu3k1zs21j1',
          title: 'Understand the Requirement',
          description: 'Clarify mission context, scope, and desired outcomes.',
          number: '01',
          isHighlighted: false,
          icon: null,
          actionTone: 'sky',
        },
      ],
    },
  },
  {
    __typename: 'ComponentReferencesBannerReference',
    heroBanner: {
      documentId: 'cm2solutionsbannercta01',
      referenceTitle: 'Solutions CTA Banner',
      banner: {
        bannerTitle: 'test',
        bannerSubTitle: 'test',
        bannerDescription: 'test',
        bannerImage: {
          url: 'https://cms.saratogaascend.com/uploads/Modern_Healthcare_Team_Banner_1_974c29dd05.png',
          width: 1920,
          height: 640,
          alternativeText: 'test',
          formats: null,
        },
        buttonCTA: {
          label: 'test1',
          href: '/',
          target: '_self',
          isExternal: false,
        },
        secondaryButtonCTA: {
          label: 'test2',
          href: '/',
          target: '_self',
          isExternal: false,
        },
        variant: 'banner_cta',
      },
    },
  },
  {
    __typename: 'ComponentReferencesFaQs',
    content: {
      documentId: 'cm2solutionsfaqcontent',
      referenceTitle: 'FAQ Content Section',
      ContentSection: {
        title: 'Any Questions?',
        subTitle:
          'Proudly serving Federal, State, and Municipal government agencies with compliant, mission-critical infrastructure and transparent contracting.',
        description: null,
        image: {
          url: 'https://cms.saratogaascend.com/uploads/question_1_4c3667577b.png',
          width: 600,
          height: 600,
          alternativeText: 'Any Questions?',
          formats: null,
        },
        link: null,
      },
    },
    supportCta: {
      documentId: 'cm2solutionsfaqsupport',
      referenceTitle: 'FAQ Support CTA',
      ContentSection: {
        title: 'Still have questions? ',
        subTitle:
          'Need clarity before moving forward? Speak with our operations team to get clear, direct answers tailored to your business challenges.',
        description: null,
        image: null,
        link: {
          label: 'Book a Consultation ',
          href: '/',
          target: '_self',
          isExternal: false,
        },
      },
    },
    faqs: [
      {
        documentId: 'cm2solutionsfaq1',
        referenceTitle: 'FAQ 1',
        faq: {
          title: 'What are your operating hours?',
          description: 'Monday- Friday: 9 AM – 5 PM EST | Saturday-Sunday: CLOSED',
        },
      },
      {
        documentId: 'cm2solutionsfaq2',
        referenceTitle: 'FAQ 2',
        faq: {
          title: ' How do I schedule appointments?',
          description:
            'You can schedule an appointment with our recruiters by reaching out us at careers@saratogamed.com.',
        },
      },
      {
        documentId: 'cm2solutionsfaq3',
        referenceTitle: 'FAQ 3',
        faq: {
          title: ' Do you support multi‑state licensing?',
          description:
            'Yes. We help with compact licensure (NLC) and state‑specific requirements for nurses and allied clinicians.',
        },
      },
    ],
  },
];

/** Local fallback when CMS `pages` is unavailable — section components supply default copy. */
const contactSections: DynamicZoneSection[] = [
  {
    __typename: 'ComponentReferencesBannerReference',
    heroBanner: {
      documentId: 'cm2contactbanner01',
      referenceTitle: 'Contact Banner',
      banner: {
        bannerTitle: "Let's Start a Conversation",
        bannerSubTitle: null,
        bannerDescription:
          'Reach the Saratoga Ascend team for staffing, contracts, careers, and partnership inquiries.',
        bannerImage: {
          url: '/images/DNA-v1.png',
          width: 1200,
          height: 800,
          alternativeText: 'Saratoga Ascend contact hero',
          formats: null,
        },
        buttonCTA: null,
      },
    },
  },
  {
    __typename: 'ComponentReferencesContactInquiryReference',
    contactInquirySection: {
      documentId: 'cm2contactinquiry01',
      referenceTitle: 'Contact Inquiry',
    },
  },
  {
    __typename: 'ComponentReferencesContactPathwaysReference',
    contactPathwaysSection: {
      documentId: 'cm2contactpathways01',
      referenceTitle: 'Contact Pathways',
    },
  },
  {
    __typename: 'ComponentReferencesContactLearnReference',
    contactLearnSection: {
      documentId: 'cm2contactlearn01',
      referenceTitle: 'Contact Learn',
    },
  },
  {
    __typename: 'ComponentReferencesContactOfficesReference',
    contactOfficesSection: {
      documentId: 'cm2contactoffices01',
      referenceTitle: 'Contact Offices',
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
    title: 'Terms of Service',
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
    slug: 'about-us',
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
    Section: contactSections,
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z',
  },
  {
    documentId: 'cm2a8h4j10006qk3fsolutions1',
    internalName: 'Solutions',
    pageTitle: 'Solutions',
    slug: 'solutions',
    pageType: 'Standard',
    variant: 'default',
    seo: {
      metaTitle: 'Solutions | Saratoga Ascend',
      metaDescription:
        'Saratoga Ascend helps government agencies, healthcare organizations, and public-sector programs access qualified healthcare professionals, flexible staffing models, and dependable workforce delivery services.',
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      metaRobots: 'index',
      twitterCardTitle: null,
      canonicalURL: null,
      structuredData: null,
      languageTag: 'en',
    },
    Section: solutionsSections,
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z',
  },
  {
    documentId: 'cm2a8h4j10003qk3f9m2v6rt',
    internalName: 'Terms of Service',
    pageTitle: 'Terms of Service',
    slug: 'terms-of-service',
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
  {
    documentId: 'cm2a8h4j10005qk3fblogs001',
    internalName: 'Blogs',
    pageTitle: 'Blogs',
    slug: 'blogs',
    pageType: 'Standard',
    variant: 'default',
    seo: {
      metaTitle: 'Blogs | Saratoga Ascend',
      metaDescription: 'Explore insights shaping the future of federal healthcare.',
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      metaRobots: 'index',
      twitterCardTitle: null,
      canonicalURL: null,
      structuredData: null,
      languageTag: 'en',
    },
    Section: [
      {
        __typename: 'ComponentReferencesBlogListing',
        blogHeading: 'Blogs',
        subheading: 'Explore Insights Shaping the Future of Federal Healthcare',
      },
    ],
    createdAt: '2026-08-10T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z',
  },
];

export const mockArticles: Article[] = [
  {
    documentId: 'cm2a8h9k20001qk3f4d8w2xa',
    title: 'Saratoga Ascend Expands Healthcare Staffing to SLED Markets',
    slug: 'sled-market-expansion',
    summary: 'Saratoga Ascend brings its healthcare staffing expertise to State, Local, and Education markets.',
    articleDate: '2026-08-12T10:00:00.000Z',
    readTime: 5,
    categoryType: 'Newspaper',
    description: `
      <p>We are excited to announce the expansion of our healthcare staffing services to State, Local, and Education (SLED) markets.</p>
      <h3>What This Means</h3>
      <p>SLED organizations can now access the same quality of staffing and consulting services trusted by federal and military healthcare facilities.</p>
    `,
    image: {
      url: '/images/healthcare-team.png',
      width: 800,
      height: 600,
      alternativeText: 'Healthcare team collaborating',
      formats: null,
    },
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
    summary: 'Key trends shaping federal healthcare staffing in 2026 and how Saratoga Ascend is adapting.',
    articleDate: '2026-08-05T14:00:00.000Z',
    readTime: 4,
    categoryType: 'Blog',
    description: `
      <p>As we move through 2026, the landscape of federal healthcare staffing continues to evolve.</p>
      <h3>Key Trends</h3>
      <ul>
        <li>Increased demand for telehealth-capable professionals</li>
        <li>Growing emphasis on mental health staffing</li>
        <li>Expansion of laboratory and scientific staffing needs</li>
      </ul>
    `,
    image: null,
    seo: null,
    createdAt: '2026-08-04T00:00:00.000Z',
    updatedAt: '2026-08-05T14:00:00.000Z',
  },
];

export const mockBlogs: Article[] = [
  {
    documentId: 'cm2blog001federal',
    title: 'The Future of Federal Healthcare Staffing in 2026',
    slug: 'future-federal-healthcare-2026',
    summary: 'Key trends shaping federal healthcare staffing in 2026 and how Saratoga Ascend is adapting.',
    articleDate: '2026-08-05T14:00:00.000Z',
    readTime: 4,
    categoryType: 'Blog',
    author: 'Jane Cooper',
    category: { name: 'Federal Staffing', slug: 'federal-staffing' },
    description: '<p>As we move through 2026, the landscape of federal healthcare staffing continues to evolve.</p>',
    image: {
      url: '/images/healthcare-team.png',
      width: 800,
      height: 600,
      alternativeText: 'Healthcare team collaborating',
      formats: null,
    },
    seo: null,
    createdAt: '2026-08-04T00:00:00.000Z',
    updatedAt: '2026-08-05T14:00:00.000Z',
  },
  {
    documentId: 'cm2blog002military',
    title: 'Military Medicine Readiness Starts With Credentialed Staff',
    slug: 'military-medicine-readiness',
    summary: 'How credentialed clinicians keep military treatment facilities mission-ready.',
    articleDate: '2026-07-22T09:00:00.000Z',
    readTime: 6,
    categoryType: 'Blog',
    author: 'Jane Cooper',
    category: { name: 'Military Medicine', slug: 'military-medicine' },
    description: '<p>Credentialed clinicians keep military treatment facilities mission-ready.</p>',
    image: {
      url: '/images/healthcare-team.png',
      width: 800,
      height: 600,
      alternativeText: 'Military healthcare professionals',
      formats: null,
    },
    seo: null,
    createdAt: '2026-07-21T00:00:00.000Z',
    updatedAt: '2026-07-22T09:00:00.000Z',
  },
  {
    documentId: 'cm2blog003joint',
    title: 'Joint Commission Standards Without the Guesswork',
    slug: 'joint-commission-standards',
    summary: 'A practical look at Joint Commission staffing expectations for federal programs.',
    articleDate: '2026-06-18T11:00:00.000Z',
    readTime: 5,
    categoryType: 'Blog',
    author: 'Jane Cooper',
    category: { name: 'Joint Commission Standards', slug: 'joint-commission-standards' },
    description: '<p>Joint Commission staffing expectations for federal programs.</p>',
    image: {
      url: '/images/healthcare-team.png',
      width: 800,
      height: 600,
      alternativeText: 'Clinical compliance review',
      formats: null,
    },
    seo: null,
    createdAt: '2026-06-17T00:00:00.000Z',
    updatedAt: '2026-06-18T11:00:00.000Z',
  },
];

