'use client';

import React from 'react';
import Image from 'next/image';

export const MarketWeServeSection: React.FC = () => {
  return (
    <section id="who-we-serve" className="w-full py-16 lg:py-[120px] bg-white overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-12">
        {/* Header (Frame 607 in Figma) */}
        <div className="space-y-4 max-w-[1680px]">
          <h2 className="font-serif-dm text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[1.2] text-[#0A0A0A]">
            Market We Serve
          </h2>
          <p className="text-[#0A0A0A] text-lg sm:text-xl lg:text-[22px] font-normal leading-[1.5] max-w-[705px]">
            Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.
          </p>
        </div>

        {/* 2 Big Cards Grid (Frame 103: 828px x 480px each in Figma) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Federal & Military */}
          <div className="relative h-[380px] lg:h-[480px] rounded-[40px] overflow-hidden shadow-xl group cursor-pointer">
            <Image
              src="/images/hero-banner.png"
              alt="Federal and Military Healthcare Facilities"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay (Figma: linear-gradient(180deg, rgba(20, 76, 121, 0) 53.65%, #144C79 100%)) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#144C79] via-[#144C79]/30 to-transparent" />
            
            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-center">
              <h3 className="font-serif-dm text-3xl sm:text-4xl lg:text-[44px] font-normal text-white text-center">
                Federal & Military
              </h3>
            </div>
          </div>

          {/* Card 2: Commercial & Local */}
          <div className="relative h-[380px] lg:h-[480px] rounded-[40px] overflow-hidden shadow-xl group cursor-pointer">
            <Image
              src="/images/client-portrait.jpg"
              alt="Commercial and Local Healthcare Facilities"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#144C79] via-[#144C79]/30 to-transparent" />
            
            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-center">
              <h3 className="font-serif-dm text-3xl sm:text-4xl lg:text-[44px] font-normal text-white text-center">
                Commercial & Local
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
