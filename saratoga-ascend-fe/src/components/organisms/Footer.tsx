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
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
];

const pickFooterSocialIcons = (links: FooterLink[]) => {
  const by = (pattern: RegExp) => links.find((link) => pattern.test(link.label));
  const picked = [by(/twitter|^x$/i), by(/instagram/i), by(/discord|youtube/i)].filter(
    (link): link is FooterLink => Boolean(link),
  );
  return picked.length === 3 ? picked : links.slice(0, 3);
};

const footerLinkClass =
  'text-caption text-slate-faint transition-colors duration-150 hover:text-brand-on-dark max-xl:text-[1.125rem] max-xl:leading-7 max-xl:text-white';

const ColumnRule: React.FC = () => (
  <img
    src="/images/footer/underline.svg"
    alt=""
    width={40}
    height={2}
    className="mt-3 h-0.5 w-10 max-xl:hidden"
    aria-hidden="true"
  />
);

const FooterNavGroup: React.FC<FooterColumn> = ({ heading, links }) => (
  <div>
    <h2 className="text-body-lg font-medium text-brand-on-dark max-xl:font-serif max-xl:text-[1.625rem] max-xl:leading-[2.125rem] max-xl:font-normal">{heading}</h2>
    <ColumnRule />
    <ul className="mt-5 flex flex-col gap-4 max-xl:mt-2.5 max-xl:gap-3">
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
      <Container className="pt-[clamp(3.5rem,4.17vw,5rem)] pb-block max-xl:px-5! max-xl:pt-[1.875rem] max-xl:pb-0">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between max-xl:gap-[1.875rem]">
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
              className="size-16 object-contain max-xl:h-[4.4375rem] max-xl:w-[18.3125rem] max-xl:max-w-full"
            />
          </GeneralLink>

          <p className="max-w-[22ch] font-serif text-subtitle leading-[1.2] text-brand-on-dark sm:max-w-none sm:text-right max-xl:max-w-none max-xl:text-[1.625rem] max-xl:leading-[2.125rem] max-xl:text-left">
            {data?.headline || 'Federal State Programs & Solutions'}
          </p>
        </div>

        <img
          src="/images/footer/rule.svg"
          alt=""
          className="mt-block h-px w-full"
          aria-hidden="true"
        />

        <div className="mt-block grid grid-cols-1 gap-block xl:grid-cols-[25.125rem_1fr_1fr_1fr] xl:gap-x-[clamp(2rem,5vw,6rem)] max-xl:mt-10 max-xl:grid-cols-3 max-xl:gap-5">
          <div className="max-xl:col-span-3">
            <p className="font-serif text-stat-label text-brand-on-dark max-xl:font-sans max-xl:text-[1.25rem] max-xl:leading-7 max-xl:font-semibold">
              {data?.newsletterHeading || 'Sign up for Our Newsletter'}
            </p>
            <SubscribeForm
              className="mt-6 max-w-[25.125rem] max-xl:mt-[1.875rem] max-xl:max-w-none"
              privacyConsentText={data?.privacyConsentText}
              privacyConsentLink={data?.privacyConsentLink}
            />
            <div className="mt-[1.875rem] hidden items-center justify-between max-xl:flex">
              <div className="flex gap-2">
                {pickFooterSocialIcons(social.links).map((link, index) => (
                <GeneralLink
                  key={link.label}
                  href={link.href}
                  variant="unstyled"
                  target={(link.target as '_self' | '_blank') || '_blank'}
                  aria-label={link.label}
                  className="size-10 shrink-0 overflow-hidden rounded-full"
                >
                  <img
                    src={`/images/footer/social-${index + 1}.svg`}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10"
                  />
                </GeneralLink>
                ))}
              </div>
              <a
                href="#"
                aria-label="Back to top"
                className="relative flex size-12 shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
              >
                <img
                  src="/images/footer/back-top.svg"
                  alt=""
                  width={48}
                  height={48}
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
            </div>
          </div>

          <nav aria-label={social.heading}>
            <FooterNavGroup {...social} />
          </nav>

          <nav aria-label={menu.heading}>
            <FooterNavGroup {...menu} />
          </nav>

          <div>
            <h2 className="text-body-lg font-medium text-brand-on-dark max-xl:font-serif max-xl:text-[1.625rem] max-xl:leading-[2.125rem] max-xl:font-normal">
              {data?.contactHeading || 'Say Hello!'}
            </h2>
            <ColumnRule />
            <p className="mt-5 max-xl:mt-2.5">
              <GeneralLink
                href={`mailto:${contactEmail}`}
                variant="unstyled"
                className="break-all text-caption font-bold text-brand-on-dark transition-colors duration-150 hover:text-brand-sky sm:break-normal max-xl:text-[1.125rem] max-xl:leading-7 max-xl:font-normal max-xl:text-white"
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
        <Container className="flex flex-col items-center gap-4 py-6 sm:relative sm:flex-row sm:justify-center sm:gap-0 max-xl:px-5!">
          <p className="flex flex-col items-center gap-2 text-center text-eyebrow text-slate-muted sm:block sm:max-w-[46rem] sm:px-14 max-xl:block max-xl:text-[1.125rem] max-xl:leading-7 max-xl:text-[#f5f8fa]">
            <span>
              {data?.copyrightText ||
                `© ${new Date().getFullYear()} Saratoga Ascend. All rights reserved`}
            </span>
            {legalLinks.map((link) => (
              <React.Fragment key={link.label}>
                <span className="hidden sm:inline max-xl:inline">{' | '}</span>
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
            className="relative flex size-[3.0625rem] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky sm:absolute sm:top-1/2 sm:right-0 sm:-translate-y-1/2 max-xl:hidden"
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
