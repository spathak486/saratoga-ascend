'use client';

import React from 'react';
import Image from 'next/image';

const CLIENT_LOGOS = [
  { id: 1, name: 'U.S. Department of Veterans Affairs', image: '/images/hero-banner.png' },
  { id: 2, name: 'Defense Health Agency', image: '/images/pharmacist-portrait.png' },
  { id: 3, name: 'Naval Medical Center Lejeune', image: '/images/client-portrait.jpg' },
  { id: 4, name: 'Federal Emergency Management', image: '/images/hero-banner.png' },
  { id: 5, name: 'State Department of Health', image: '/images/pharmacist-portrait.png' },
  { id: 6, name: 'National Institutes of Health', image: '/images/client-portrait.jpg' },
];

export const ClientLogosSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 lg:py-[120px] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto space-y-12">
        {/* Header Block (Group 108) */}
        <div className="text-center space-y-4 px-6">
          <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[72px] font-normal leading-[1.2] text-[#F01424]">
            Our Clients
          </h2>
          <p className="text-xl sm:text-2xl lg:text-[24px] font-medium leading-[1.6] text-black">
            Proudly Serving Federal, State and Local clients
          </p>
        </div>

        {/* Marquee Ticker Container with Gradient Fades (Group 77 & 78) */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left Fade Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-[120px] sm:w-[182px] bg-gradient-to-r from-[#F8FAFC] to-transparent z-20 pointer-events-none" />

          {/* Right Fade Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-[120px] sm:w-[182px] bg-gradient-to-l from-[#F8FAFC] to-transparent z-20 pointer-events-none" />

          {/* Infinite Marquee Track */}
          <div className="animate-marquee flex gap-8">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                className="w-[320px] sm:w-[470px] h-[320px] sm:h-[456px] bg-black/[0.004] border border-[#D0D0D0] rounded-[40px] sm:rounded-[60px] p-8 flex items-center justify-center shrink-0 shadow-xs hover:border-[#F01424] transition-colors"
              >
                <div className="relative w-[200px] sm:w-[304px] h-[200px] sm:h-[304px] rounded-3xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
