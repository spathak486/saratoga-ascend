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

/** Outline icons from the 430px footer (Figma 2166:1250), in that order. */
const MOBILE_SOCIAL = [
  { pattern: /facebook/i, src: '/images/footer/social-facebook.svg', width: 40, height: 40, ring: false },
  { pattern: /instagram/i, src: '/images/footer/social-instagram.svg', width: 40, height: 40, ring: false },
  { pattern: /youtube/i, src: '/images/footer/social-youtube.svg', width: 19.2, height: 19.2, ring: true },
  { pattern: /linkedin/i, src: '/images/footer/social-linkedin.svg', width: 40, height: 40, ring: false },
  { pattern: /twitter|^x$/i, src: '/images/footer/social-x.svg', width: 15.3, height: 13.825, ring: true },
] as const;

const mobileSocialIcons = (links: FooterLink[]) =>
  MOBILE_SOCIAL.flatMap((icon) => {
    const link = links.find((item) => icon.pattern.test(item.label.trim()));
    return link ? [{ ...icon, link }] : [];
  });

const footerLinkClass =
  'text-[clamp(1rem,0.636rem+1.818vw,1.125rem)] leading-7 text-brand-on-dark transition-colors duration-150 hover:text-brand-sky focus-visible:outline-brand-sky motion-reduce:transition-none xl:text-caption xl:leading-normal xl:text-slate-faint [&_svg]:hidden';

const columnHeadingClass =
  'font-serif text-[clamp(1.5rem,0.857rem+2.857vw,1.625rem)] leading-[2.125rem] font-normal text-brand-on-dark xl:font-sans xl:text-body-lg xl:leading-[1.6] xl:font-medium';

const ColumnRule: React.FC = () => (
  <img
    src="/images/footer/underline.svg"
    alt=""
    width={40}
    height={2}
    className="mt-3 hidden h-0.5 w-10 xl:block"
    aria-hidden="true"
  />
);

const FooterNavGroup: React.FC<FooterColumn> = ({ heading, links }) => (
  <div className="min-w-0">
    <h2 className={columnHeadingClass}>{heading}</h2>
    <ColumnRule />
    <ul className="mt-2.5 flex flex-col gap-2.5 xl:mt-5 xl:gap-4">
      {links.map((link) => (
        <li key={link.label} className="min-w-0">
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

const BackToTop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a
    href="#top"
    aria-label="Back to top"
    className={`relative flex size-12 shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky ${className}`}
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
);

export interface FooterProps {
  data?: FooterData | null;
}

/**
 * Site footer. Desktop measurements are the blog-listing band (Figma 2158:2502).
 * The phone layout is the 430px footer (Figma 2166:1209). Sizes interpolate
 * with clamp so intermediate widths do not lock to either artboard.
 */
export const Footer: React.FC<FooterProps> = ({ data }) => {
  const columns = (data?.linkColumns ?? [])
    .filter((column) => column.heading)
    .map((column) => ({
      heading: column.heading,
      links:
        column.links?.map((link) => ({
          href: link.href,
          label: link.label,
          target: link.target || '_self',
        })) ?? [],
    }));
  const socialSource =
    columns.find((column) => /social/i.test(column.heading)) ?? columns[0];
  const menuSource =
    columns.find((column) => column !== socialSource && /menu/i.test(column.heading)) ??
    columns.find((column) => column !== socialSource);
  const social = socialSource ?? SOCIAL;
  const menu = menuSource ?? MENU;

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
  const matchedSocial = mobileSocialIcons(social.links);
  const mobileIcons = matchedSocial.length > 0 ? matchedSocial : mobileSocialIcons(SOCIAL.links);

  return (
    <footer className="relative bg-footer text-brand-on-dark-muted">
      <Container
        className="pt-[clamp(1.875rem,0.973rem+3.356vw,5rem)] pb-[clamp(1.25rem,2vw,1.5rem)]"
      >
        <div className="flex min-w-0 flex-col items-start gap-[1.875rem] xl:flex-row xl:items-center xl:justify-between xl:gap-[clamp(1rem,2vw,2.5rem)]">
          <GeneralLink
            href="/"
            variant="unstyled"
            aria-label="Saratoga Ascend home"
            className="inline-flex shrink-0 items-center"
          >
            <img
              src="/images/footer/logo-wordmark.svg"
              alt=""
              width={293}
              height={72}
              className="h-auto w-[clamp(12rem,68vw,18.3125rem)] max-w-full xl:hidden"
            />
            <img
              src="/images/footer/emblem.svg"
              alt=""
              width={64}
              height={64}
              className="hidden size-[clamp(3rem,3.333vw,4rem)] object-contain xl:block"
            />
          </GeneralLink>

          <p className="min-w-0 font-serif text-[clamp(1.625rem,1.301rem+1.208vw,2.75rem)] leading-[1.3] text-brand-on-dark xl:text-right xl:leading-[1.2]">
            {data?.headline || 'Federal State Programs & Solutions'}
          </p>
        </div>

        <img
          src="/images/footer/rule.svg"
          alt=""
          className="mt-[clamp(1.875rem,0.973rem+3.356vw,3.75rem)] hidden h-px w-full xl:block"
          aria-hidden="true"
        />

        <div className="mt-[clamp(1.875rem,0.973rem+3.356vw,3.75rem)] flex min-w-0 flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-[clamp(1.5rem,4vw,6rem)]">
          <div className="w-full min-w-0 xl:w-[min(100%,25.125rem)]">
            <p className="font-sans text-[clamp(1.25rem,1.106rem+0.537vw,1.75rem)] leading-[1.4] font-semibold text-brand-on-dark xl:font-serif xl:leading-[1.2] xl:font-normal">
              {data?.newsletterHeading || 'Sign up for Our Newsletter'}
            </p>
            <SubscribeForm
              className="mt-[clamp(1.5rem,2vw,1.875rem)] w-full max-w-full"
              privacyConsentText={data?.privacyConsentText}
              privacyConsentLink={data?.privacyConsentLink}
            />
            <div className="mt-[clamp(1.25rem,2.5vw,1.875rem)] flex flex-wrap items-center justify-between gap-3 xl:hidden">
              <div className="flex flex-wrap gap-[clamp(0.5rem,2.8vw,0.75rem)]">
                {mobileIcons.map((icon) => (
                  <GeneralLink
                    key={icon.link.label}
                    href={icon.link.href}
                    variant="unstyled"
                    target={(icon.link.target as '_self' | '_blank') || '_blank'}
                    aria-label={icon.link.label}
                    className={
                      icon.ring
                        ? 'flex size-[clamp(2rem,10vw,2.5rem)] shrink-0 items-center justify-center overflow-hidden rounded-full border-[0.8px] border-slate-faint [&_svg]:hidden'
                        : 'inline-flex size-[clamp(2rem,10vw,2.5rem)] shrink-0 items-center justify-center overflow-hidden [&_svg]:hidden'
                    }
                  >
                    <img
                      src={icon.src}
                      alt=""
                      width={icon.width}
                      height={icon.height}
                      className={icon.ring ? 'h-auto max-h-[55%] w-auto max-w-[55%]' : 'size-full'}
                    />
                  </GeneralLink>
                ))}
              </div>
              <BackToTop />
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-[max-content_minmax(0,1fr)] items-start gap-x-[clamp(0.75rem,3vw,2rem)] gap-y-8 xl:flex-1 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(8.5rem,1.15fr)] xl:gap-x-[clamp(1rem,2vw,2.5rem)]">
            <nav aria-label={social.heading} className="hidden xl:block">
              <FooterNavGroup {...social} />
            </nav>

            <nav aria-label={menu.heading}>
              <FooterNavGroup {...menu} />
            </nav>

            <div className="min-w-0">
              <h2 className={columnHeadingClass}>{data?.contactHeading || 'Say Hello!'}</h2>
              <ColumnRule />
              <p className="mt-2.5 xl:mt-5">
                <GeneralLink
                  href={`mailto:${contactEmail}`}
                  variant="unstyled"
                  className="text-[clamp(1rem,0.636rem+1.818vw,1.125rem)] leading-7 font-normal break-words text-brand-on-dark transition-colors duration-150 hover:text-brand-sky motion-reduce:transition-none xl:text-caption xl:leading-normal xl:font-bold [&_svg]:hidden"
                >
                  {contactEmail.split(/([@.])/).map((part, index) =>
                    part === '@' || part === '.' ? (
                      <React.Fragment key={`${part}-${index}`}>
                        {part}
                        <wbr />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
                    ),
                  )}
                </GeneralLink>
              </p>
              <p className="mt-2.5 xl:mt-4">
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
        </div>
      </Container>

      <div className="mt-[clamp(1.25rem,2vw,1.875rem)]">
        <Container>
          <img
            src="/images/footer/legal-rule.svg"
            alt=""
            className="h-0.5 w-full"
            aria-hidden="true"
          />
        </Container>
        <Container className="relative flex flex-col items-center gap-4 pt-5 pb-[clamp(1.875rem,2vw,2.75rem)] xl:flex-row xl:justify-center xl:gap-0 xl:py-6">
          <p className="text-center text-[clamp(1rem,0.636rem+1.818vw,1.125rem)] leading-7 text-brand-surface-muted xl:max-w-[min(100%,46rem)] xl:px-[clamp(3rem,4vw,4rem)] xl:text-eyebrow xl:leading-normal xl:text-slate-muted">
            <span>
              {data?.copyrightText ||
                `© ${new Date().getFullYear()} Saratoga Ascend. All rights reserved`}
            </span>
            {legalLinks.map((link) => (
              <React.Fragment key={link.label}>
                <span>{' | '}</span>
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

          <BackToTop className="max-xl:hidden xl:absolute xl:top-1/2 xl:right-[var(--spacing-gutter)] xl:-translate-y-1/2" />
        </Container>
      </div>
    </footer>
  );
};
