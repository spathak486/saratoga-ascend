'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full relative z-50">
      {/* 1. Upper Nav (60px height, full width dark navy with right gradient) */}
      <div className="w-full h-[60px] bg-[#0A2E4B] relative overflow-hidden flex items-center justify-end">
        {/* Right side linear gradient background bar (Rectangle 49: 998px x 60px) */}
        <div 
          style={{
            background: 'linear-gradient(90deg, rgba(40, 192, 234, 0) 9.57%, #144C79 59.32%)',
          }}
          className="absolute right-0 top-0 bottom-0 w-full sm:w-[998px] h-[60px] pointer-events-none z-0" 
        />

        {/* Links Frame (Frame 75: gap 40px, font-size 18px, #FFFFFF) */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] flex items-center justify-end">
          <div className="flex items-center gap-6 sm:gap-[40px] text-white font-medium text-[16px] sm:text-[18px] leading-[150%]">
            <a href="#careers" className="hover:opacity-80 transition-opacity">Careers</a>
            <a href="#employees" className="hover:opacity-80 transition-opacity">Employees</a>
            <a href="#investor" className="hover:opacity-80 transition-opacity">Investor</a>
          </div>
        </div>
      </div>

      {/* Placeholder spacer when main nav is fixed */}
      {isScrolled && <div className="w-full h-[80px] lg:h-[120px]" />}

      {/* 2. Main Nav bar (Fixed at top-0 when scrolled past 60px) */}
      <nav 
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
        }}
        className={`w-full h-[80px] lg:h-[120px] backdrop-blur-2xl border-b border-[#E3E3E3] transition-all duration-300 ${
          isScrolled 
            ? 'fixed top-0 left-0 right-0 z-50 shadow-md animate-fadeIn' 
            : 'relative z-40 shadow-sm'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto h-full px-6 lg:px-[120px] flex items-center justify-between">
          {/* Brand Logo (298px x 72px in Figma) */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-[180px] sm:w-[240px] lg:w-[298px] h-[44px] lg:h-[72px]">
              <Image
                src="/images/logo.png"
                alt="Saratoga Ascend Logo"
                fill
                priority
                className="object-contain object-left"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="font-serif-dm text-2xl lg:text-3xl font-bold text-[#F01424]">Saratoga<span class="text-[#022E4C]">Ascend</span></span>`;
                  }
                }}
              />
            </div>
          </a>

          {/* Desktop Nav Links (Google Sans Flex, 22px, #0A0A0A) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-[40px] text-[20px] lg:text-[22px] font-medium text-[#0A0A0A]">
            <a href="#who-we-serve" className="flex items-center gap-2 hover:text-[#F01424] transition-colors">
              <span>Who we serve</span>
              <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#what-we-do" className="flex items-center gap-2 hover:text-[#F01424] transition-colors">
              <span>What we do</span>
              <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#newsroom" className="flex items-center gap-2 hover:text-[#F01424] transition-colors">
              <span>Newsroom</span>
              <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#about-us" className="flex items-center gap-2 hover:text-[#F01424] transition-colors">
              <span>About us</span>
              <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Primary Action Button (Figma: 180px x 60px, rounded 8px, Contact us ↗) */}
          <div className="hidden sm:flex items-center">
            <a
              href="#contact"
              className="w-[160px] lg:w-[180px] h-[50px] lg:h-[60px] rounded-[8px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white font-medium text-[18px] lg:text-[20px] flex items-center justify-center gap-2.5 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all group"
            >
              <span>Contact us</span>
              <svg className="w-5 h-5 fill-current text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24">
                <path d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19 5 17.59z" />
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0A0A0A] hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <a href="#who-we-serve" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-[#0A0A0A] hover:text-[#F01424]">Who we serve</a>
          <a href="#what-we-do" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-[#0A0A0A] hover:text-[#F01424]">What we do</a>
          <a href="#newsroom" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-[#0A0A0A] hover:text-[#F01424]">Newsroom</a>
          <a href="#about-us" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-[#0A0A0A] hover:text-[#F01424]">About us</a>
          <div className="pt-4 border-t border-slate-100">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-[52px] rounded-[8px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white font-medium text-lg flex items-center justify-center gap-2 shadow"
            >
              Contact us ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

