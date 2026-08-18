'use client';

import React from 'react';

export const AchievementsSection: React.FC = () => {
  const metrics = [
    { value: '50+', label: 'Specialists' },
    { value: '1500+', label: 'Placements' },
    { value: '50+', label: 'Locations' },
    { value: '256', label: 'Services' },
  ];

  return (
    <section className="relative w-full min-h-[900px] lg:min-h-[1080px] overflow-hidden py-16 lg:py-[120px]">
      
      {/* Background Graphic & Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-[#0F3D60]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D60]/90 via-[#144C79]/85 to-[#F01424]/80 z-10" />
      </div>

      <div className="relative z-20 w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-12 lg:space-y-16">
        
        {/* Title */}
        <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[72px] font-normal leading-[1.2] text-white text-center">
          Our Achievements
        </h2>

        {/* 2 Glassmorphism Cards Grid (Group 118, Group 119 in Figma) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Glass Card 1: The Joint Commission */}
          <div className="relative min-h-[420px] lg:h-[538px] rounded-[32px] border-2 border-white/40 bg-black/10 backdrop-blur-md p-8 lg:p-14 flex flex-col justify-between text-white shadow-2xl">
            <span className="text-[#A2D8FE] text-2xl lg:text-[28px] font-bold">
              2026-2027
            </span>

            <div className="space-y-4">
              <h3 className="font-serif-dm text-4xl sm:text-5xl lg:text-[60px] font-normal leading-[1.2]">
                The Joint Commission
              </h3>
              <p className="text-white/90 text-lg lg:text-[24px] font-medium leading-[1.6] max-w-[443px]">
                Gold Seal of Approval® for Healthcare Staffing Services Accreditation nationwide.
              </p>
            </div>
          </div>

          {/* Glass Card 2: WOSB Certified */}
          <div className="relative min-h-[420px] lg:h-[538px] rounded-[32px] border-2 border-white/40 bg-black/10 backdrop-blur-md p-8 lg:p-14 flex flex-col justify-between text-white shadow-2xl">
            <span className="text-[#A2D8FE] text-2xl lg:text-[28px] font-bold">
              2026-2027
            </span>

            <div className="space-y-4">
              <h3 className="font-serif-dm text-4xl sm:text-5xl lg:text-[60px] font-normal leading-[1.2]">
                WOSB Certified
              </h3>
              <p className="text-white/90 text-lg lg:text-[24px] font-medium leading-[1.6] max-w-[443px]">
                Certified Women-Owned Small Business driving federal health innovation and operational excellence.
              </p>
            </div>
          </div>

        </div>

        {/* Metric Counters Grid (Group 117 in Figma) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/20">
          {metrics.map((item, idx) => (
            <div key={idx} className="text-center text-white space-y-2">
              <div className="font-serif-dm text-5xl sm:text-7xl lg:text-[120px] font-normal leading-[1.1]">
                {item.value}
              </div>
              <div className="text-xl sm:text-2xl lg:text-[32px] font-medium text-white/90">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
