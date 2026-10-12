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
  { href: '/careers', label: 'Careers', hasExternalIcon: true },
  { href: '/investors', label: 'Investor Relations', hasExternalIcon: true },
  { href: '/blogs', label: 'Blog', hasExternalIcon: true },
];

const PRIMARY_LINKS: HeaderNavItem[] = [
  { href: '/who-we-serve', label: 'Who We Serve', hasMenu: true },
  { href: '/government-buyers', label: 'Government Buyers', hasMenu: true },
  { href: '/what-we-do', label: 'Solutions', hasMenu: true },
  { href: '/about', label: 'About us', hasMenu: true },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuId = useId();

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsMenuOpen(false);
  }

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
        className="inline-flex size-[clamp(2.25rem,2.34375vw,2.8125rem)] items-center justify-center rounded-full border border-slate-faint bg-white p-1 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-brand-surface focus:px-4 focus:py-2 focus:text-brand-navy focus:outline-2 focus:outline-brand-navy"
      >
        Skip to main content
      </a>

      {/* Homepage mobile Component 26: floating pill over the hero. Desktop nav starts at xl. */}
      <div
        className={
          isMenuOpen
            ? 'fixed inset-0 z-50 overflow-y-auto bg-white xl:hidden'
            : 'pointer-events-none fixed inset-x-0 top-0 z-50 xl:hidden'
        }
      >
        <div className="pointer-events-auto w-full min-w-0 px-[clamp(0.75rem,4.65vw,1.25rem)] pt-[max(clamp(0.75rem,4.65vw,1.25rem),env(safe-area-inset-top))]">
          <div className="mx-auto flex w-full min-w-0 max-w-full items-center justify-between gap-[clamp(0.5rem,3vw,1rem)] rounded-pill bg-white px-[clamp(0.75rem,4.65vw,1.25rem)] py-[clamp(0.625rem,4.2vw,1.125rem)] shadow-[0_1px_1.5px_rgba(0,0,0,0.25)] sm:max-w-[40rem]">
            <GeneralLink
              href="/"
              variant="unstyled"
              aria-label="Saratoga Ascend home"
              className="inline-flex min-w-0 max-w-[calc(100%-clamp(2.75rem,11vw,3.25rem))] items-center"
            >
              {/* Sized box owns the logo width. BrandLogo fills it, so size-full cannot stretch the pill. */}
              <span className="relative block aspect-[298/72] w-[clamp(5.5rem,27.7vw,7.4375rem)] max-w-full min-w-0">
                <BrandLogo
                  size="sm"
                  className="!absolute !inset-0 !h-full !max-h-full !w-full !max-w-full"
                />
              </span>
            </GeneralLink>

            <button
              type="button"
              className="inline-flex size-[clamp(2.25rem,9.3vw,2.5rem)] shrink-0 items-center justify-center rounded-pill border border-solid border-[#d9e2e8] bg-white p-1 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <span className="relative size-[clamp(1rem,4.65vw,1.25rem)]" aria-hidden="true">
                  <span className="absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              ) : (
                <MenuIcon className="size-[clamp(1rem,4.65vw,1.25rem)]" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen ? <div id={menuId}>{menuPanel}</div> : null}
      </div>

      <UtilityBar items={UTILITY_LINKS} activeHref={pathname} />

      {/* Sibling of <main>, not wrapped in a short header — sticky only works
          inside a tall ancestor. Solid white at rest; frost once pinned. */}
      <header
        className={`sticky top-0 z-50 hidden overflow-visible bg-white transition-[background-color,box-shadow,backdrop-filter] duration-200 motion-reduce:transition-none xl:block ${
          isOverlay ? 'bg-white/80 shadow-button backdrop-blur-[25px]' : ''
        }`}
      >
        <Container className="flex h-nav-h min-w-0 items-center justify-between gap-[clamp(1rem,2vw,2.5rem)]">
          <GeneralLink
            href="/"
            variant="unstyled"
            aria-label="Saratoga Ascend home"
            className="inline-flex h-full shrink-0 items-center"
          >
            <BrandLogo size="md" className="!w-[clamp(8.5rem,12.92vw,15.5rem)]" />
          </GeneralLink>

          <div className="flex h-full min-w-0 flex-1 items-center justify-end gap-[clamp(0.75rem,1.5625vw,1.875rem)]">
            <div className="flex h-full min-w-0 items-center gap-[clamp(0.5rem,1.0417vw,1.25rem)]">
              <HeaderNavList
                ariaLabel="Primary"
                items={PRIMARY_LINKS}
                activeHref={pathname}
                variant="primary"
              />
              <button
                type="button"
                aria-label="Search"
                className="inline-flex size-[clamp(2.25rem,2.34375vw,2.8125rem)] shrink-0 items-center justify-center rounded-full border border-slate-faint bg-white p-1 text-ink transition-colors duration-200 hover:border-brand-navy hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              >
                <SearchIcon className="size-[clamp(1.125rem,1.25vw,1.5rem)]" />
              </button>
            </div>
            <CtaButton href="/contact" className="h-cta">
              Contact us
            </CtaButton>
          </div>
        </Container>
      </header>
    </>
  );
};
