'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const HealthcareFocusSection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Chicago');
  
  const staffingCards = [
    {
      title: 'Travel Staffing',
      desc: 'Connecting cleared, credentialed healthcare professionals with government, military.',
    },
    {
      title: 'Travel Staffing',
      desc: 'Connecting cleared, credentialed healthcare professionals with government, military.',
    },
    {
      title: 'Travel Staffing',
      desc: 'Connecting cleared, credentialed healthcare professionals with government, military.',
    },
    {
      title: 'Travel Staffing',
      desc: 'Connecting cleared, credentialed healthcare professionals with government, military.',
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-12">
        
        {/* Top Hero Card (Figma: Dark Navy Card, Ellipse 3 Red Radial Glow, Doctor Visual, Navigation Controls) */}
        <div className="relative w-full min-h-[550px] lg:h-[620px] bg-[#022E4C] rounded-[44px] lg:rounded-[52px] overflow-hidden p-8 lg:p-14 flex flex-col justify-between text-white shadow-2xl">
          
          {/* Ellipse 3: Red Accent Radial Glow (Figma: 353px x 384px, left: -99px, top: 258px, opacity: 70%) */}
          <div 
            style={{
              background: 'radial-gradient(circle, rgba(240, 20, 36, 0.75) 0%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 100%)',
            }}
            className="absolute -left-[100px] bottom-[-50px] w-[353px] h-[384px] pointer-events-none z-0 blur-2xl opacity-70"
          />

          {/* Giant Background Watermark Text "Healthcare" */}
          <div className="absolute right-6 lg:right-16 top-6 text-[#04406B]/40 font-serif-dm text-[90px] sm:text-[140px] lg:text-[210px] leading-none pointer-events-none select-none z-0">
            Healthcare
          </div>

          {/* Concentric Orbit Lines Graphic behind Doctor */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%] pointer-events-none z-0 opacity-25">
            <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
              <circle cx="600" cy="300" r="280" stroke="white" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="600" cy="300" r="420" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Top Row: Location Pill Dropdown */}
          <div className="relative z-10 flex items-center justify-between">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium text-base sm:text-lg hover:bg-white/10 transition-all">
              <span>{selectedCity}</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Card Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[84px] font-normal leading-[1.1] text-white">
                Healthcare
              </h2>

              <p className="text-[#2B88D9] text-xl sm:text-2xl lg:text-[26px] font-bold tracking-wide">
                Medical Pharmacist
              </p>

              <p className="text-white/80 text-base sm:text-lg lg:text-[20px] font-normal leading-[1.6] max-w-[480px]">
                Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.
              </p>

              <div className="pt-2">
                <a
                  href="#jobs"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#2B88D9] hover:bg-[#2272b8] text-white font-medium text-lg shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Explore Jobs
                </a>
              </div>
            </div>

            {/* Right Doctor Image with Left & Right Arrow Controls */}
            <div className="lg:col-span-6 relative h-[320px] sm:h-[420px] lg:h-[500px] flex items-center justify-center">
              {/* Left Carousel Arrow Button */}
              <button 
                aria-label="Previous healthcare focus"
                className="absolute left-0 lg:left-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Center Doctor Portrait Image */}
              <div className="relative w-full h-full max-w-[460px]">
                <Image
                  src="/images/pharmacist-portrait.png"
                  alt="Medical Pharmacist"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>

              {/* Right Carousel Arrow Button */}
              <button 
                aria-label="Next healthcare focus"
                className="absolute right-0 lg:right-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom 4 Service Cards Grid (Travel Staffing Cards with Red Arrow ↗ & Pulse Badge) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffingCards.map((card, idx) => (
            <div
              key={idx}
              className="relative min-h-[380px] lg:h-[420px] rounded-[32px] bg-white border border-[#E3E3E3] p-8 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Soft Gradient Overlay Blur */}
              <div className="absolute -left-12 -top-12 w-32 h-32 rounded-full bg-[#2B88D9]/10 blur-xl pointer-events-none" />
              <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-[#F01424]/10 blur-xl pointer-events-none" />

              {/* Card Header Row: Title + Red Diagonal Top-Right Arrow ↗ */}
              <div className="relative z-10 flex items-start justify-between">
                <h3 className="font-serif-dm text-3xl lg:text-[40px] leading-[1.15] text-[#0A0A0A] max-w-[200px]">
                  {card.title}
                </h3>

                {/* Red Arrow Icon ↗ */}
                <div className="text-[#F01424] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              {/* Card Description */}
              <p className="relative z-10 text-[#022E4C] text-base lg:text-[18px] font-normal leading-[1.6]">
                {card.desc}
              </p>

              {/* Card Bottom Row: Light Blue Pulse Icon Badge */}
              <div className="relative z-10 flex justify-end pt-4">
                <div className="w-16 h-16 rounded-full bg-[#A3D9FF] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

