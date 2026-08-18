'use client';

import React from 'react';
import Image from 'next/image';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about-us" className="relative w-full min-h-[900px] lg:min-h-[1303px] bg-white overflow-hidden py-16 lg:py-[120px]">
      
      {/* Background Graphic Visual */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="/images/hero-banner.png"
          alt="Biotechnology Background"
          fill
          className="object-cover transform scale-x-[-1]"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-12">
        
        {/* Title */}
        <div className="space-y-4">
          <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[72px] font-normal leading-[1.2] text-[#F01424]">
            About Us
          </h2>
          
          <h3 className="text-[#0A0A0A] text-2xl sm:text-3xl lg:text-[28px] font-bold leading-[1.4] max-w-[500px]">
            Four Decades of Military & Federal Solutions Expertise
          </h3>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          
          {/* Left Lead Paragraph */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-[#0F3D60] text-xl sm:text-2xl lg:text-[24px] font-medium leading-[1.6] max-w-[683px]">
              Founded to serve federal and military healthcare, we grew into a nationwide partner for hospitals, clinics, and public health programs. We combine military‑grade precision with responsive, people‑first service matching licensed, background‑checked, and fully credentialed professionals to serve every mission.
            </p>
          </div>

          {/* Right Highlights & Value Points */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-[#000000] text-lg sm:text-xl lg:text-[22px] font-normal leading-[1.5] max-w-[728px]">
              Our nationwide coverage reaches across all 50 states, ensuring fast, dependable deployment of cleared healthcare professionals to federal medical centers, VA hospitals, DoD military treatment facilities, and civilian emergency response networks.
            </p>

            <ul className="space-y-4 pt-4 text-lg lg:text-[20px] font-medium text-[#0A0A0A]">
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#F01424]" />
                <span>Nationwide coverage across all 50 states</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#2A91DC]" />
                <span>Cleared personnel for government & military facilities</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#F01424]" />
                <span>Dedicated compliance & credentialing teams</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#2A91DC]" />
                <span>24/7 support for clients and clinical providers</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
