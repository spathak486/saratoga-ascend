import type { NavigationData } from '@/lib/schemas';

/**
 * Local fallback used when the CMS is unreachable or the Navigation single
 * type has not been filled in yet. Mirrors the current approved header design.
 */
export const defaultNavigationData: NavigationData = {
  logo: {
    url: '/images/Logo.svg',
    alternativeText: 'Saratoga Ascend',
  },
  logoAlt: 'Saratoga Ascend',
  homeHref: '/',
  utilityLinks: [
    { label: 'Careers', href: '/careers', hasExternalIcon: true, hasMenu: false },
    { label: 'Investor Relations', href: '/investors', hasExternalIcon: true, hasMenu: false },
    { label: 'Blog', href: '/blogs', hasExternalIcon: true, hasMenu: false },
  ],
  primaryLinks: [
    {
      label: 'Who We Serve',
      href: '/who-we-serve',
      hasMenu: true,
      hasExternalIcon: false,
      links: [
        { label: 'Federal Government', href: '/federal', target: '_self', isExternal: false },
        {
          label: 'State and Local Government',
          href: '/state-local',
          target: '_self',
          isExternal: false,
        },
        { label: 'Specialized Markets', href: '/specialized', target: '_self', isExternal: false },
      ],
    },
    {
      label: 'Government Buyers',
      href: '/government-buyers',
      hasMenu: true,
      hasExternalIcon: false,
      links: [
        {
          label: 'Contract Vehicles & Procurement',
          href: '/contract-vehicles',
          target: '_self',
          isExternal: false,
        },
        {
          label: 'Capabilities Statement',
          href: '/capabilities',
          target: '_self',
          isExternal: false,
        },
      ],
    },
    {
      label: 'Solutions',
      href: '/what-we-do',
      hasMenu: true,
      hasExternalIcon: false,
      links: [
        { label: 'Digital Transformation', href: '/digital', target: '_self', isExternal: false },
        { label: 'Data & Analytics', href: '/data', target: '_self', isExternal: false },
        { label: 'Cybersecurity', href: '/cyber', target: '_self', isExternal: false },
      ],
    },
    {
      label: 'About us',
      href: '/about-us',
      hasMenu: true,
      hasExternalIcon: false,
      links: [
        { label: 'Our Story', href: '/story', target: '_self', isExternal: false },
        { label: 'Leadership', href: '/leadership', target: '_self', isExternal: false },
        { label: 'Careers', href: '/careers', target: '_self', isExternal: false },
      ],
    },
  ],
  cta: { label: 'Contact us', href: '/contact', target: '_self', isExternal: false },
  searchLabel: 'Search',
};
