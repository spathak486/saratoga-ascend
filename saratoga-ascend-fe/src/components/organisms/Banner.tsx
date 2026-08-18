'use client';

import React from 'react';
import Image from 'next/image';

export const Banner: React.FC = () => {
  return (
    <section className="relative w-full min-h-[900px] pt-[180px] bg-white flex items-center overflow-hidden">
      {/* Background Graphic DNA Pattern & Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10 pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] py-12 lg:py-24 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Hero Main Text & Button (Group 82) */}
        <div className="lg:col-span-8 space-y-8 max-w-[991px]">
          {/* Main Title */}
          <h1 className="font-serif-dm text-5xl sm:text-7xl lg:text-[90px] font-normal leading-[1.15] text-[#0A0A0A] tracking-tight">
            Federal State Programs and Solutions
          </h1>

          {/* Subtitle Body */}
          <p className="text-xl sm:text-2xl lg:text-[24px] font-medium leading-[1.6] text-[#022E4C] max-w-[680px]">
            Saratoga Ascend connects cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.
          </p>

          {/* Gradient Action Button (_Button base) */}
          <div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 w-[180px] h-[60px] bg-brand-red-gradient text-white text-[20px] font-medium rounded-lg shadow-xs hover:opacity-95 transition-all transform active:scale-95"
            >
              <span>Explore</span>
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Decorative Graphic */}
        <div className="lg:col-span-4 relative hidden lg:flex justify-end items-center">
          <div className="relative w-[450px] h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
            <Image
              src="/images/hero-banner.png"
              alt="Federal State Healthcare Solutions"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#022E4C]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white">
              <div className="text-xs uppercase font-bold tracking-widest text-[#2A91DC]">Nationwide Healthcare</div>
              <div className="text-lg font-serif-dm font-normal mt-1">Connecting Cleared Professionals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

