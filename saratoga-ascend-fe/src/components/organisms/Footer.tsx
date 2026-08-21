import React from 'react';
import { Container, GeneralLink } from '../atoms';
import { BrandLogo } from '../molecules/BrandLogo';
import { SubscribeForm } from '../molecules/SubscribeForm';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

/** Every destination here is a route the header already navigates to. */
const COLUMNS: FooterColumn[] = [
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/careers', label: 'Careers' },
      { href: '/investors', label: 'Investors' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { href: '/what-we-do', label: 'What we do' },
      { href: '/who-we-serve', label: 'Who we serve' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: '/newsroom', label: 'Newsroom' },
      { href: '/employees', label: 'Employees' },
      { href: '/contact', label: 'Contact us' },
    ],
  },
];

const footerLinkClass =
  'text-body text-brand-on-dark-muted transition-colors duration-150 hover:text-brand-on-dark';

export const Footer: React.FC = () => (
  <footer className="bg-brand-navy-deep text-brand-on-dark-muted">
    <Container className="py-[clamp(2.5rem,5vw,4rem)]">
      <div className="grid gap-block lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-[clamp(3rem,6vw,6rem)]">
        <div>
          <BrandLogo variant="light" size="sm" />

          <p className="mt-4 max-w-[38ch] text-body">
            Credentialed healthcare staffing for federal, state, and private
            facilities across the country.
          </p>

          <SubscribeForm className="mt-[clamp(1.5rem,3vw,2rem)] max-w-[24rem]" />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="text-eyebrow uppercase text-brand-on-dark">
                {column.heading}
              </h2>

              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <GeneralLink
                      href={link.href}
                      variant="unstyled"
                      className={footerLinkClass}
                    >
                      {link.label}
                    </GeneralLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </Container>

    <div className="border-t border-brand-on-dark/15">
      <Container className="flex flex-col items-center justify-between gap-2 py-5 text-caption sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} Saratoga Ascend. All rights
          reserved.
        </p>

        <p>
          Official brand portal:{' '}
          <GeneralLink
            href="https://www.saratogamed.com"
            variant="unstyled"
            className="text-brand-sky underline-offset-4 hover:underline"
          >
            www.saratogamed.com
          </GeneralLink>
        </p>
      </Container>
    </div>
  </footer>
);
