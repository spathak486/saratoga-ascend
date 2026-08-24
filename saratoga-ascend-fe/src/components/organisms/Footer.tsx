import React from 'react';
import { Container, GeneralLink, MediaFrame } from '../atoms';
import { SubscribeForm } from '../molecules/SubscribeForm';

interface FooterLink {
  href: string;
  label: string;
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
            target="_self"
            className={footerLinkClass}
          >
            {link.label}
          </GeneralLink>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Last homepage band. Measured from Figma node — navy background gradient (180deg, #022E4C to #040D1A),
 * logo and thesis headline, newsletter plus link columns with #0066CC underlines,
 * red accent divider line, and legal bar with #0C2B4E jump-to-top button.
 */
export const Footer: React.FC = () => (
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
            src="/images/Image-1 1.png"
            alt=""
            pendingLabel="footer-mark"
            tone="navyCard"
            unoptimized
            sizes="120px"
            imageClassName="object-contain!"
            className="h-[63.81px] w-auto min-w-[64px] border-0 bg-transparent"
          />
        </GeneralLink>

        <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] leading-[120%] text-white text-right font-normal tracking-normal whitespace-nowrap xl:w-[681px]">
          Federal State Programs &amp; Solutions
        </h3>
      </div>

      {/* Top Divider */}
      <div className="my-10 h-[1px] w-full bg-[#1E3A5F] opacity-60" aria-hidden="true" />

      {/* Content Columns: Newsletter (402px), Group 124 [Social + Menu] (367px x 256px), Say Hello (243px) */}
      <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2 xl:flex xl:flex-row xl:justify-between xl:items-start">
        {/* Newsletter (Group 123: 402px wide) */}
        <div className="w-full xl:w-[402px] shrink-0">
          <h3 className="font-serif text-[24px] md:text-[28px] leading-[120%] text-white font-normal mb-6">
            Sign up for Our Newsletter
          </h3>
          <SubscribeForm className="w-full max-w-[402px]" />
        </div>

        {/* Group 124: Social + Menu (367px wide, 256px high, spaced at left:830px and left:1114px) */}
        <div className="flex justify-between w-full sm:gap-12 xl:w-[367px] xl:min-h-[256px] shrink-0">
          <nav aria-label="Social">
            <FooterNavGroup {...SOCIAL} />
          </nav>

          <nav aria-label="Footer">
            <FooterNavGroup {...MENU} />
          </nav>
        </div>

        {/* Group 125: Say Hello! (243px wide, 140px high) */}
        <div className="w-full xl:w-[243px] xl:min-h-[140px] shrink-0">
          <h2 className="text-[24px] font-medium leading-[160%] text-white font-sans">Say Hello!</h2>
          <div className="mt-2 h-[2px] w-[40px] bg-[#0066CC]" aria-hidden="true" />
          <p className="mt-6">
            <GeneralLink
              href="mailto:careers@saratogaascend.com"
              variant="unstyled"
              className="break-all font-sans text-[16px] font-bold leading-[150%] text-white transition-colors duration-150 hover:text-[#26E0F5] sm:break-normal"
            >
              careers@saratogaascend.com
            </GeneralLink>
          </p>
          <p className="mt-3">
            <GeneralLink
              href="tel:+12122132520"
              variant="unstyled"
              className={footerLinkClass}
            >
              +1 (212) 213-2520
            </GeneralLink>
          </p>
        </div>
      </div>

      {/* Red Accent Line Divider */}
      <div className="my-10 h-px w-full bg-footer-red-line" aria-hidden="true" />

      {/* Copyright Bar */}
      <div className="flex flex-col items-center gap-4 sm:relative sm:flex-row sm:justify-center">
        <p className="text-center font-sans text-[14px] leading-[150%] text-[#94A3B8]">
          <span>
            &copy; {new Date().getFullYear()} Saratoga Ascend. All rights reserved
          </span>
          <span>{' | '}</span>
          <GeneralLink
            href="/privacy"
            variant="unstyled"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </GeneralLink>
          <span>{' | '}</span>
          <GeneralLink
            href="/terms"
            variant="unstyled"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </GeneralLink>
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
