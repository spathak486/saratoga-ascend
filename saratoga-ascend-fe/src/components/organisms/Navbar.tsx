'use client';

import React, { useEffect, useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Container, GeneralLink } from '../atoms';
import { BrandLogo } from '../molecules/BrandLogo';
import { HeaderNavList, type HeaderNavItem } from '../molecules/HeaderNavList';

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

/** The homepage shows "What we do" as the active item in the design. */
function getActiveHref(pathname: string): string | undefined {
  const match = [...PRIMARY_LINKS, ...UTILITY_LINKS].find((item) => item.href === pathname);
  if (match) return match.href;
  return pathname === '/' ? '/what-we-do' : undefined;
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
    <header className="sticky top-0 z-50 border-b-2 border-brand-navy bg-brand-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-surface focus:px-4 focus:py-2 focus:text-brand-navy focus:outline-2 focus:outline-brand-navy"
      >
        Skip to main content
      </a>

      <Container className="pt-[clamp(1rem,2.6vw,2.5rem)] pb-[clamp(0.75rem,1.6vw,1.5rem)]">
        <div className="hidden justify-end lg:flex">
          <HeaderNavList
            ariaLabel="Utility"
            items={UTILITY_LINKS}
            activeHref={activeHref}
            variant="utility"
          />
        </div>

        <div className="flex items-end justify-between gap-6 lg:mt-[clamp(1rem,2vw,2.5rem)]">
          <GeneralLink
            href="/"
            variant="unstyled"
            aria-label="Saratoga Ascend home"
            className="inline-block shrink-0"
          >
            <BrandLogo size="md" />
          </GeneralLink>

          <div className="hidden lg:block">
            <HeaderNavList
              ariaLabel="Primary"
              items={PRIMARY_LINKS}
              activeHref={activeHref}
              variant="primary"
            />
          </div>

          <button
            type="button"
            className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy lg:hidden"
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
        </div>
      </Container>

      <div
        id={menuId}
        className={`border-t border-brand-line bg-brand-surface lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <Container className="flex flex-col gap-8 py-8">
          <HeaderNavList
            ariaLabel="Primary"
            items={PRIMARY_LINKS}
            activeHref={activeHref}
            variant="primary"
            orientation="vertical"
          />
          <HeaderNavList
            ariaLabel="Utility"
            items={UTILITY_LINKS}
            activeHref={activeHref}
            variant="utility"
            orientation="vertical"
          />
        </Container>
      </div>
    </header>
  );
};
