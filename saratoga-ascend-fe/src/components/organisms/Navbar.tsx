'use client';

import React, { useEffect, useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Container, GeneralLink } from '../atoms';
import { BrandLogo } from '../molecules/BrandLogo';
import { MenuIcon, SearchIcon } from '../atoms/icons';
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

  const menuPanel = (
    <Container className="flex flex-col items-start gap-8 py-8">
      <HeaderNavList
        ariaLabel="Primary"
        items={PRIMARY_LINKS}
        activeHref={pathname}
        variant="primary"
        orientation="vertical"
      />

      <div className="w-full border-t border-brand-hairline pt-6">
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
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-surface focus:px-4 focus:py-2 focus:text-brand-navy focus:outline-2 focus:outline-brand-navy"
      >
        Skip to main content
      </a>

      {/* Figma Homepage mobile Component 26 — 390×76 pill over the hero. */}
      <div
        className={`z-50 min-[90rem]:hidden ${
          isMenuOpen
            ? 'fixed inset-0 overflow-y-auto bg-brand-surface'
            : 'pointer-events-none fixed inset-x-0 top-0'
        }`}
      >
        <div className="pointer-events-auto mx-5 mt-5 flex h-[4.75rem] items-center justify-between rounded-pill bg-brand-surface px-5 py-[1.125rem] shadow-[0_1px_3px_rgba(0,0,0,0.25)]">
          <GeneralLink
            href="/"
            variant="unstyled"
            aria-label="Saratoga Ascend home"
            className="inline-flex h-7 shrink-0 items-center"
          >
            <BrandLogo size="md" className="!h-[1.803rem] !w-[7.4375rem]" />
          </GeneralLink>

          <button
            type="button"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill border border-solid border-[#D9E2E8] bg-brand-surface p-1 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <span className="relative size-5" aria-hidden="true">
                <span className="absolute top-1/2 left-0 block h-0.5 w-5 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 block h-0.5 w-5 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>

        {isMenuOpen ? <div id={menuId}>{menuPanel}</div> : null}
      </div>

      <UtilityBar items={UTILITY_LINKS} activeHref={pathname} />

      {/* Sibling of <main>, not wrapped in a short header — sticky only works
          inside a tall ancestor. Solid white at rest; frost once pinned. */}
      <header
        className={`sticky relative top-0 z-50 hidden overflow-visible border-b border-brand-hairline transition-[background-color,backdrop-filter] duration-200 min-[90rem]:block ${
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

          <div className="flex h-full min-w-0 items-center gap-[1.875rem]">
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
        </Container>
      </header>
    </>
  );
};
