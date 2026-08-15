import React from 'react';
import { BrandLogo } from '../molecules/BrandLogo';
import { Button } from '../atoms/Button';
import { Container } from '../atoms/Container';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <Container className="h-20 flex items-center justify-between">
        <a href="#" className="transition hover:opacity-90">
          <BrandLogo size="md" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#022e4c]">
          <a href="#overview" className="hover:text-[#e11d48] transition">Overview</a>
          <a href="#primary-colors" className="hover:text-[#e11d48] transition">Primary Color Palette</a>
        </nav>

        <a href="#primary-colors">
          <Button variant="primaryRed" size="md">Get Started</Button>
        </a>
      </Container>
    </header>
  );
};
