'use client';

import React from 'react';
import Image from 'next/image';

export const Banner: React.FC = () => {
  return (
    <section className="relative w-full min-h-[650px] lg:min-h-[1020px] bg-white overflow-hidden flex items-center">
      {/* Background DNA Visual (Figma: Frame 567 - 2162px x 1020px) */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] h-full z-0 pointer-events-none">
        <Image
          src="/images/hero-banner.png"
          alt="DNA Helix Background"
          fill
          priority
          quality={100}
          className="object-cover object-center lg:object-right"
        />
        {/* Figma Rectangle 52 Overlay: linear-gradient(90deg, #FFFFFF 33.31%, rgba(255, 255, 255, 0) 90.91%) */}
        <div 
          style={{
            background: 'linear-gradient(90deg, #FFFFFF 30%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0) 100%)',
          }}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Hero Content Container (Group 82 in Figma: width 991px, left 120px) */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] py-16 lg:py-24">
        <div className="max-w-[991px] space-y-6 lg:space-y-8">
          {/* Main Title (Heading 01 - DM Serif Text, 90px in Figma) */}
          <h1 className="font-serif-dm text-4xl sm:text-7xl lg:text-[90px] font-normal leading-[1.12] text-[#0A0A0A] tracking-tight">
            Federal State <br className="hidden sm:inline" />
            Programs and Solutions
          </h1>

          {/* Subtitle (Body 00 - Google Sans Flex, 24px, #022E4C) */}
          <p className="text-[#022E4C] text-lg sm:text-xl lg:text-[24px] font-medium leading-[1.6] max-w-[599px]">
            Saratoga Ascend connects cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.
          </p>

          {/* Action Button (_Button base in Figma) */}
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-[180px] h-[60px] rounded-[8px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white font-medium text-[20px] gap-3 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span>Get Started</span>
              <svg className="w-6 h-6 fill-current text-white transform rotate-180 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};


