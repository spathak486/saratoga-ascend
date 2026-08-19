'use client';

import React, { useEffect, useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '../molecules/BrandLogo';
import { HeaderNavList, type HeaderNavItem } from '../molecules/HeaderNavList';
import { GeneralLink } from '../atoms/GeneralLink';
import { Container } from '../atoms/Container';

const UTILITY_LINKS: HeaderNavItem[] = [
  { href: '/careers', label: 'Careers' },
  { href: '/employees', label: 'Employees' },
  { href: '/investors', label: 'Investor' },
  { href: '/contact', label: 'Contact us' },
];

const PRIMARY_LINKS: HeaderNavItem[] = [
  { href: '/who-we-serve', label: 'Who we serve' },
  { href: '/what-we-do', label: 'What we do' },
  { href: '/newsroom', label: 'Newsroom' },
  { href: '/about', label: 'About' },
];

function getActiveHref(pathname: string): string | undefined {
  const match = [...PRIMARY_LINKS, ...UTILITY_LINKS].find((item) => item.href === pathname);
  if (match) return match.href;
  if (pathname === '/') return '/what-we-do';
  return undefined;
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const activeHref = getActiveHref(pathname);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-brand-surface text-brand-navy">
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brand-surface focus:px-4 focus:py-2 focus:text-brand-navy focus:outline-2 focus:outline-brand-navy"
      >
        Skip to main content
      </a>

      <Container size="home" className="pt-4 lg:pt-[64px]">
        <div className="hidden lg:flex justify-end h-8">
          <HeaderNavList ariaLabel="Utility" items={UTILITY_LINKS} activeHref={activeHref} variant="utility" />
        </div>

        <div className="mt-4 lg:mt-[40px] flex items-end justify-between gap-6">
          <div className="lg:mb-[22px]">
            <GeneralLink
              href="/"
              variant="unstyled"
              aria-label="Saratoga Ascend home"
              className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
            >
              <BrandLogo size="md" />
            </GeneralLink>
          </div>

          <div className="hidden lg:block h-[52px]">
            <HeaderNavList
              ariaLabel="Primary"
              items={PRIMARY_LINKS}
              activeHref={activeHref}
              variant="primary"
            />
          </div>

          <button
            type="button"
            className="lg:hidden ml-auto inline-flex h-11 w-11 items-center justify-center text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className={`block h-0.5 w-6 bg-current transition ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </Container>

      <div className="h-[2px] bg-brand-navy" aria-hidden="true" />

      <div
        id={menuId}
        className={`lg:hidden border-b border-brand-navy/20 bg-brand-surface ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <Container size="home" className="flex flex-col gap-8 py-8">
          <HeaderNavList
            ariaLabel="Utility"
            items={UTILITY_LINKS}
            activeHref={activeHref}
            variant="utility"
            orientation="vertical"
          />
          <HeaderNavList
            ariaLabel="Primary"
            items={PRIMARY_LINKS}
            activeHref={activeHref}
            variant="primary"
            orientation="vertical"
          />
        </Container>
      </div>
    </header>
  );
};
