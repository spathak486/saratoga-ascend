import type { FooterData } from '@/lib/schemas';

export const mockFooterData: FooterData = {
  headline: 'Federal State Programs & Solutions',
  newsletterHeading: 'Sign up for Our Newsletter',
  privacyConsentText: 'I agree to the',
  privacyConsentLink: {
    label: 'Privacy Policy',
    href: '/privacy',
    target: '_self',
    isExternal: false,
  },
  linkColumns: [
    {
      heading: 'Social',
      links: [
        { label: 'Facebook', href: 'https://www.facebook.com', target: '_blank', isExternal: true },
        { label: 'Twitter', href: 'https://twitter.com', target: '_blank', isExternal: true },
        { label: 'LinkedIn', href: 'https://www.linkedin.com', target: '_blank', isExternal: true },
        { label: 'Instagram', href: 'https://www.instagram.com', target: '_blank', isExternal: true },
        { label: 'Youtube', href: 'https://www.youtube.com', target: '_blank', isExternal: true },
      ],
    },
    {
      heading: 'Menu',
      links: [
        { label: 'Home', href: '/', target: '_self', isExternal: false },
        { label: 'Services', href: '/what-we-do', target: '_self', isExternal: false },
        { label: 'About Us', href: '/about', target: '_self', isExternal: false },
        { label: 'Job Search', href: '/careers', target: '_self', isExternal: false },
        { label: 'Contact Us', href: '/contact', target: '_self', isExternal: false },
      ],
    },
  ],
  contactHeading: 'Say Hello!',
  contactEmail: 'careers@saratogaascend.com',
  contactPhone: '+1 (212) 213-2520',
  copyrightText: `© ${new Date().getFullYear()} Saratoga Ascend. All rights reserved`,
  logo: {
    url: '/images/Image-1 1.png',
    alternativeText: 'Saratoga Ascend logo',
  },
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy', target: '_self', isExternal: false },
    { label: 'Terms of Service', href: '/terms', target: '_self', isExternal: false },
  ],
};
