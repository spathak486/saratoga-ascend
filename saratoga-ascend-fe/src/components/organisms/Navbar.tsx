'use client';

import React, { useEffect, useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Container, GeneralLink } from '../atoms';
import { BrandLogo } from '../molecules/BrandLogo';
import { SearchIcon } from '../atoms/icons';
import { CtaButton } from '../molecules/CtaButton';
import { HeaderNavList, type HeaderNavItem } from '../molecules/HeaderNavList';
import { UtilityBar } from '../molecules/UtilityBar';

const UTILITY_LINKS: HeaderNavItem[] = [
  { href: '/careers', label: 'Careers' },
  { href: '/employees', label: 'Employees' },
  { href: '/investors', label: 'Investor Relations' },
];

const PRIMARY_LINKS: HeaderNavItem[] = [
  { href: '/who-we-serve', label: 'Who we serve', hasMenu: true },
  { href: '/government-buyers', label: 'Government Buyers', hasMenu: true },
  { href: '/what-we-do', label: 'Solutions', hasMenu: true },
  { href: '/about', label: 'About us', hasMenu: true },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const isOverlay = isScrolled && !isMenuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-surface focus:px-4 focus:py-2 focus:text-brand-navy focus:outline-2 focus:outline-brand-navy"
      >
        Skip to main content
      </a>

      <UtilityBar items={UTILITY_LINKS} activeHref={pathname} />

      {/* Sibling of <main>, not wrapped in a short header — sticky only works
          inside a tall ancestor. Solid white at rest; frost once pinned. */}
      <header
        className={`sticky relative top-0 z-50 overflow-visible border-b border-brand-hairline transition-[background-color,backdrop-filter] duration-200 ${
          isOverlay
            ? 'bg-brand-surface/75 backdrop-blur-[25px]'
            : 'bg-brand-surface'
        }`}
      >
        <Container className="flex h-nav-h items-center justify-between gap-6">
          <GeneralLink
            href="/"
            variant="unstyled"
            aria-label="Saratoga Ascend home"
            className="inline-flex h-full shrink-0 items-center"
          >
            <BrandLogo size="md" className="!w-[clamp(10rem,12.92vw,15.5rem)]" />
          </GeneralLink>

          <div className="hidden h-full min-w-0 items-center gap-[1.875rem] min-[90rem]:flex">
            <div className="flex h-full items-center gap-5">
              <HeaderNavList
                ariaLabel="Primary"
                items={PRIMARY_LINKS}
                activeHref={pathname}
                variant="primary"
              />
              <button
                type="button"
                aria-label="Search"
                className="inline-flex size-[2.8125rem] shrink-0 items-center justify-center rounded-full border border-slate-300 bg-brand-surface text-slate-500 transition-colors duration-200 hover:border-brand-sky hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              >
                <SearchIcon className="size-6" />
              </button>
            </div>
            <CtaButton href="/contact" className="h-cta min-w-cta-wide shrink-0">
              Contact us
            </CtaButton>
          </div>

          <button
            type="button"
            className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy min-[90rem]:hidden"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span
                className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </span>
          </button>
        </Container>

        <div
          id={menuId}
          className={`border-t border-brand-hairline bg-brand-surface min-[90rem]:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <Container className="flex flex-col items-start gap-8 py-8">
            <HeaderNavList
              ariaLabel="Primary"
              items={PRIMARY_LINKS}
              activeHref={pathname}
              variant="primary"
              orientation="vertical"
            />

            <div className="w-full border-t border-brand-hairline pt-6 md:hidden">
              <HeaderNavList
                ariaLabel="Utility"
                items={UTILITY_LINKS}
                activeHref={pathname}
                variant="utilityPlain"
                orientation="vertical"
              />
            </div>

            <button
              type="button"
              aria-label="Search"
              className="inline-flex size-[2.8125rem] items-center justify-center rounded-full border border-slate-300 bg-brand-surface text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            >
              <SearchIcon className="size-6" />
            </button>

            <CtaButton href="/contact">Contact us</CtaButton>
          </Container>
        </div>
      </header>
    </>
  );
};
