import React from 'react';
import { Container, GeneralLink, MediaFrame } from '../atoms';
import { SubscribeForm } from '../molecules/SubscribeForm';
import type { FooterData } from '@/lib/schemas';

interface FooterLink {
  href: string;
  label: string;
  target?: string;
  isExternal?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const DEFAULT_SOCIAL: FooterColumn = {
  heading: 'Social',
  links: [
    { href: 'https://www.facebook.com', label: 'Facebook' },
    { href: 'https://twitter.com', label: 'Twitter' },
    { href: 'https://www.linkedin.com', label: 'LinkedIn' },
    { href: 'https://www.instagram.com', label: 'Instagram' },
    { href: 'https://www.youtube.com', label: 'Youtube' },
  ],
};

const DEFAULT_MENU: FooterColumn = {
  heading: 'Menu',
  links: [
    { href: '/', label: 'Home' },
    { href: '/what-we-do', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Job Search' },
    { href: '/contact', label: 'Contact Us' },
  ],
};

const DEFAULT_LEGAL: FooterLink[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

const footerLinkClass =
  'text-[16px] leading-[150%] text-[#CBD5E1] font-sans transition-colors duration-150 hover:text-white';

const FooterNavGroup: React.FC<FooterColumn> = ({ heading, links }) => (
  <div>
    <h2 className="text-[24px] font-medium leading-[160%] text-white font-sans">{heading}</h2>
    <div className="mt-2 h-[2px] w-[40px] bg-[#0066CC]" aria-hidden="true" />
    <ul className="mt-6 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.label}>
          <GeneralLink
            href={link.href}
            variant="unstyled"
            target={(link.target as '_self' | '_blank') || '_self'}
            className={footerLinkClass}
          >
            {link.label}
          </GeneralLink>
        </li>
      ))}
    </ul>
  </div>
);

export interface FooterProps {
  data?: FooterData | null;
}

/**
 * Last homepage band. Measured from Figma node — navy background gradient (180deg, #022E4C to #040D1A),
 * logo and thesis headline, newsletter plus link columns with #0066CC underlines,
 * red accent divider line, and legal bar with #0C2B4E jump-to-top button.
 */
export const Footer: React.FC<FooterProps> = ({ data }) => {
  const headline = data?.headline || 'Federal State Programs & Solutions';
  const newsletterHeading = data?.newsletterHeading || 'Sign up for Our Newsletter';
  const contactHeading = data?.contactHeading || 'Say Hello!';
  const contactEmail = data?.contactEmail || 'careers@saratogaascend.com';
  const contactPhone = data?.contactPhone || '+1 (212) 213-2520';
  const copyrightText = data?.copyrightText || `© ${new Date().getFullYear()} Saratoga Ascend. All rights reserved`;
  const logoUrl = data?.logo?.url || '/images/Image-1 1.png';

  const defaultColumns: FooterColumn[] = [DEFAULT_SOCIAL, DEFAULT_MENU];

  const columnsToRender: FooterColumn[] =
    data?.linkColumns && data.linkColumns.length > 0
      ? data.linkColumns.map((col) => ({
          heading: col.heading,
          links:
            col.links?.map((l) => ({
              label: l.label,
              href: l.href,
              target: l.target || '_self',
              isExternal: l.isExternal ?? false,
            })) || [],
        }))
      : defaultColumns;

  const legalLinks: FooterLink[] =
    data?.legalLinks && data.legalLinks.length > 0
      ? data.legalLinks.map((l) => ({
          label: l.label,
          href: l.href,
          target: l.target || '_self',
          isExternal: l.isExternal ?? false,
        }))
      : DEFAULT_LEGAL;

  return (
    <footer className="relative bg-footer-gradient text-[#CBD5E1]">
      <Container className="pt-[80px] pb-12">
        {/* Top Bar: Logo & Headline (Group 121: height 63.81px, top 80px) */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between min-h-[63.81px]">
          <GeneralLink
            href="/"
            variant="unstyled"
            aria-label="Saratoga Ascend home"
            className="inline-block shrink-0"
          >
            <MediaFrame
              src={logoUrl}
              alt={data?.logo?.alternativeText || ''}
              pendingLabel="footer-mark"
              tone="navyCard"
              unoptimized
              sizes="120px"
              imageClassName="object-contain!"
              className="h-[63.81px] w-auto min-w-[64px] border-0 bg-transparent"
            />
          </GeneralLink>

          <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] leading-[120%] text-white text-right font-normal tracking-normal whitespace-nowrap xl:w-[681px]">
            {headline}
          </h3>
        </div>

        {/* Top Divider */}
        <div className="my-10 h-[1px] w-full bg-[#1E3A5F] opacity-60" aria-hidden="true" />

        {/* Content Columns: Newsletter (402px), Group 124 [Dynamic Link Columns], Say Hello (243px) */}
        <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2 xl:flex xl:flex-row xl:justify-between xl:items-start">
          {/* Newsletter (Group 123: 402px wide) */}
          <div className="w-full xl:w-[402px] shrink-0">
            <h3 className="font-serif text-[24px] md:text-[28px] leading-[120%] text-white font-normal mb-6">
              {newsletterHeading}
            </h3>
            <SubscribeForm
              className="w-full max-w-[402px]"
              privacyConsentText={data?.privacyConsentText}
              privacyConsentLink={data?.privacyConsentLink}
            />
          </div>

          {/* Group 124: Dynamic Link Columns */}
          <div className="flex flex-wrap justify-between w-full sm:gap-12 xl:w-[367px] xl:min-h-[256px] shrink-0 gap-8">
            {columnsToRender.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <FooterNavGroup {...col} />
              </nav>
            ))}
          </div>

          {/* Group 125: Say Hello! (243px wide, 140px high) */}
          <div className="w-full xl:w-[243px] xl:min-h-[140px] shrink-0">
            <h2 className="text-[24px] font-medium leading-[160%] text-white font-sans">{contactHeading}</h2>
            <div className="mt-2 h-[2px] w-[40px] bg-[#0066CC]" aria-hidden="true" />
            <p className="mt-6">
              <GeneralLink
                href={`mailto:${contactEmail}`}
                variant="unstyled"
                className="break-all font-sans text-[16px] font-bold leading-[150%] text-white transition-colors duration-150 hover:text-[#26E0F5] sm:break-normal"
              >
                {contactEmail}
              </GeneralLink>
            </p>
            <p className="mt-3">
              <GeneralLink
                href={`tel:${contactPhone.replace(/[^+\d]/g, '')}`}
                variant="unstyled"
                className={footerLinkClass}
              >
                {contactPhone}
              </GeneralLink>
            </p>
          </div>
        </div>

        {/* Red Accent Line Divider */}
        <div className="my-10 h-px w-full bg-footer-red-line" aria-hidden="true" />

        {/* Copyright Bar */}
        <div className="flex flex-col items-center gap-4 sm:relative sm:flex-row sm:justify-center">
          <p className="text-center font-sans text-[14px] leading-[150%] text-[#94A3B8]">
            <span>{copyrightText}</span>
            {legalLinks.map((link) => (
              <React.Fragment key={link.label}>
                <span>{' | '}</span>
                <GeneralLink
                  href={link.href}
                  variant="unstyled"
                  target={(link.target as '_self' | '_blank') || '_self'}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </GeneralLink>
              </React.Fragment>
            ))}
          </p>

          <a
            href="#"
            aria-label="Back to top"
            className="flex size-11 items-center justify-center rounded-lg bg-[#0C2B4E] border border-[#1E3A5F] text-white hover:bg-[#103864] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066CC] sm:absolute sm:top-1/2 sm:right-0 sm:-translate-y-1/2"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M6 14.5L12 8.5L18 14.5"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </Container>
    </footer>
  );
};

