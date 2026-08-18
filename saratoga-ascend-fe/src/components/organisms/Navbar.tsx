import React from 'react';
import { BrandLogo } from '../molecules/BrandLogo';
import { GeneralLink } from '../atoms/GeneralLink';
import { Container } from '../atoms/Container';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <Container className="h-20 flex items-center justify-between">
        <GeneralLink href="/" variant="unstyled" className="transition hover:opacity-90">
          <BrandLogo size="md" />
        </GeneralLink>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#022e4c]">
          <GeneralLink href="#overview" variant="nav">
            Overview
          </GeneralLink>
          <GeneralLink href="#primary-colors" variant="nav">
            Brand Colors
          </GeneralLink>
          <GeneralLink href="#core-components" variant="nav">
            Core Components
          </GeneralLink>
        </nav>

        <GeneralLink
          href="#core-components"
          variant="button"
          buttonVariant="primaryRed"
          size="md"
        >
          Get Started
        </GeneralLink>
      </Container>
    </header>
  );
};
