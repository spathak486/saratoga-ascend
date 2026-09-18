import React from 'react';
import { Container, GeneralLink } from '../atoms';
import { SubscribeForm } from '../molecules/SubscribeForm';
import type { FooterData } from '@/lib/schemas';

interface FooterLink {
  href: string;
  label: string;
  target?: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const SOCIAL: FooterColumn = {
  heading: 'Social',
  links: [
    { href: 'https://www.facebook.com', label: 'Facebook' },
    { href: 'https://twitter.com', label: 'Twitter' },
    { href: 'https://www.linkedin.com', label: 'LinkedIn' },
    { href: 'https://www.instagram.com', label: 'Instagram' },
    { href: 'https://www.youtube.com', label: 'Youtube' },
  ],
};

const MENU: FooterColumn = {
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
  'text-caption text-slate-faint transition-colors duration-150 hover:text-brand-on-dark';

const ColumnRule: React.FC = () => (
  <img
    src="/images/footer/underline.svg"
    alt=""
    width={40}
    height={2}
    className="mt-3 h-0.5 w-10"
    aria-hidden="true"
  />
);

const FooterNavGroup: React.FC<FooterColumn> = ({ heading, links }) => (
  <div>
    <h2 className="text-body-lg font-medium text-brand-on-dark">{heading}</h2>
    <ColumnRule />
    <ul className="mt-5 flex flex-col gap-4">
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
 * Last homepage band (Figma node 13:308). Navy-to-abyss ground, emblem and
 * brand line on the first row, newsletter plus three link columns, legal bar
 * with a jump-to-top control.
 */
export const Footer: React.FC<FooterProps> = ({ data }) => {
  const social = data?.linkColumns?.[0]
    ? {
        heading: data.linkColumns[0].heading,
        links:
          data.linkColumns[0].links?.map((link) => ({
            href: link.href,
            label: link.label,
            target: link.target || '_self',
          })) ?? [],
      }
    : SOCIAL;

  const menu = data?.linkColumns?.[1]
    ? {
        heading: data.linkColumns[1].heading,
        links:
          data.linkColumns[1].links?.map((link) => ({
            href: link.href,
            label: link.label,
            target: link.target || '_self',
          })) ?? [],
      }
    : MENU;

  const legalLinks =
    data?.legalLinks && data.legalLinks.length > 0
      ? data.legalLinks.map((link) => ({
          href: link.href,
          label: link.label,
          target: link.target || '_self',
        }))
      : DEFAULT_LEGAL;

  const contactEmail = data?.contactEmail || 'careers@saratogaascend.com';
  const contactPhone = data?.contactPhone || '+1 (212) 213-2520';
  const logoSrc = data?.logo?.url || '/images/Group.png';

  return (
    <footer className="relative bg-footer text-brand-on-dark-muted">
      <Container className="pt-[clamp(3.5rem,4.17vw,5rem)] pb-block">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <GeneralLink
            href="/"
            variant="unstyled"
            aria-label="Saratoga Ascend home"
            className="inline-flex shrink-0 items-center"
          >
            <img
              src={logoSrc}
              alt=""
              width={64}
              height={64}
              className="size-16 object-contain"
            />
          </GeneralLink>

          <p className="max-w-[22ch] font-serif text-subtitle leading-[1.2] text-brand-on-dark sm:max-w-none sm:text-right">
            {data?.headline || 'Federal State Programs & Solutions'}
          </p>
        </div>

        <img
          src="/images/footer/rule.svg"
          alt=""
          className="mt-block h-px w-full"
          aria-hidden="true"
        />

        <div className="mt-block grid grid-cols-1 gap-block sm:grid-cols-2 xl:grid-cols-[25.125rem_1fr_1fr_1fr] xl:gap-x-[clamp(2rem,5vw,6rem)]">
          <div>
            <p className="font-serif text-stat-label text-brand-on-dark">
              {data?.newsletterHeading || 'Sign up for Our Newsletter'}
            </p>
            <SubscribeForm
              className="mt-6 max-w-[25.125rem]"
              privacyConsentText={data?.privacyConsentText}
              privacyConsentLink={data?.privacyConsentLink}
            />
          </div>

          <nav aria-label={social.heading}>
            <FooterNavGroup {...social} />
          </nav>

          <nav aria-label={menu.heading}>
            <FooterNavGroup {...menu} />
          </nav>

          <div>
            <h2 className="text-body-lg font-medium text-brand-on-dark">
              {data?.contactHeading || 'Say Hello!'}
            </h2>
            <ColumnRule />
            <p className="mt-5">
              <GeneralLink
                href={`mailto:${contactEmail}`}
                variant="unstyled"
                className="break-all text-caption font-bold text-brand-on-dark transition-colors duration-150 hover:text-brand-sky sm:break-normal"
              >
                {contactEmail}
              </GeneralLink>
            </p>
            <p className="mt-4">
              <GeneralLink
                href={`tel:${contactPhone.replace(/[^\d+]/g, '')}`}
                variant="unstyled"
                className={footerLinkClass}
              >
                {contactPhone}
              </GeneralLink>
            </p>
          </div>
        </div>
      </Container>

      <div>
        <Container>
          <img
            src="/images/footer/legal-rule.svg"
            alt=""
            className="h-0.5 w-full"
            aria-hidden="true"
          />
        </Container>
        <Container className="flex flex-col items-center gap-4 py-6 sm:relative sm:flex-row sm:justify-center sm:gap-0">
          <p className="flex flex-col items-center gap-2 text-center text-eyebrow text-slate-muted sm:block sm:max-w-[46rem] sm:px-14">
            <span>
              {data?.copyrightText ||
                `© ${new Date().getFullYear()} Saratoga Ascend. All rights reserved`}
            </span>
            {legalLinks.map((link) => (
              <React.Fragment key={link.label}>
                <span className="hidden sm:inline">{' | '}</span>
                <GeneralLink
                  href={link.href}
                  variant="unstyled"
                  target={(link.target as '_self' | '_blank') || '_self'}
                  className="hover:text-brand-on-dark"
                >
                  {link.label}
                </GeneralLink>
              </React.Fragment>
            ))}
          </p>

          <a
            href="#"
            aria-label="Back to top"
            className="relative flex size-[3.0625rem] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky sm:absolute sm:top-1/2 sm:right-0 sm:-translate-y-1/2"
          >
            <img
              src="/images/footer/back-top.svg"
              alt=""
              width={49}
              height={49}
              className="absolute inset-0 size-full"
              aria-hidden="true"
            />
            <img
              src="/images/footer/back-chevron.svg"
              alt=""
              width={18}
              height={12}
              className="relative h-3 w-[1.125rem]"
              aria-hidden="true"
            />
          </a>
        </Container>
      </div>
    </footer>
  );
};
