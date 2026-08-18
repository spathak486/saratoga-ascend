'use client';

import React from 'react';
import { BrandLogo } from '../molecules/BrandLogo';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E3E3E3] shadow-xs">
      {/* Top Utility Bar (Rectangle 49) */}
      <div className="w-full h-[50px] sm:h-[60px] bg-brand-red-gradient text-white flex items-center justify-end px-6 lg:px-[120px] text-sm sm:text-[18px] lg:text-[20px] font-medium gap-6 sm:gap-10">
        <a href="#careers" className="hover:opacity-90 transition">Careers</a>
        <a href="#employees" className="hover:opacity-90 transition">Employees</a>
        <a href="#investor" className="hover:opacity-90 transition">Investor</a>
        <a href="#contact" className="flex items-center gap-2 hover:opacity-90 transition font-semibold">
          <span>Contact us</span>
          <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="w-full h-[90px] sm:h-[120px] bg-white flex items-center justify-between px-6 lg:px-[120px]">
        {/* Logo */}
        <a href="#" className="transition hover:opacity-90 shrink-0">
          <BrandLogo size="lg" />
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 font-medium text-[18px] lg:text-[22px] text-[#D31E2D]">
          <a href="#who-we-serve" className="flex items-center gap-2 hover:text-[#F01424] transition group">
            <span>Who we serve</span>
            <svg className="w-4 h-4 text-[#D31E2D] group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a href="#what-we-do" className="flex items-center gap-2 hover:text-[#F01424] transition group">
            <span>What we do</span>
            <svg className="w-4 h-4 text-[#D31E2D] group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a href="#newsroom" className="flex items-center gap-2 hover:text-[#F01424] transition group">
            <span>Newsroom</span>
            <svg className="w-4 h-4 text-[#D31E2D] group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a href="#about" className="flex items-center gap-2 hover:text-[#F01424] transition group">
            <span>About us</span>
            <svg className="w-4 h-4 text-[#D31E2D] group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
};

