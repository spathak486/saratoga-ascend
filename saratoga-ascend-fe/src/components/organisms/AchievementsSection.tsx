'use client';

import React from 'react';
import Image from 'next/image';

export const AchievementsSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 lg:py-[120px] bg-[#0F3D60] text-white overflow-hidden">
      {/* Dark Overlay Gradient (Rectangle 10) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(246.37deg, rgba(15, 61, 96, 0.95) 29.33%, rgba(240, 20, 36, 0.85) 100%)',
        }}
      />

      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] relative z-10 space-y-16">
        {/* Title */}
        <div className="text-center max-w-[800px] mx-auto space-y-4">
          <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[72px] font-normal leading-[1.2] text-white">
            Our Achievements
          </h2>
          <p className="text-white/80 text-lg lg:text-[22px]">
            Recognized excellence in federal, military, and civilian healthcare staffing.
          </p>
        </div>

        {/* 2 Glassmorphism Accreditation Cards (Group 118 & Group 119) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: The Joint Commission */}
          <div className="glass-card w-full min-h-[450px] lg:h-[538px] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest block mb-2">
                  2026-2027
                </span>
                <h3 className="font-serif-dm text-4xl sm:text-5xl lg:text-[60px] font-normal leading-[1.2] text-white">
                  The Joint Commission
                </h3>
              </div>

              {/* Badge Graphic */}
              <div className="relative w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] rounded-full overflow-hidden shadow-2xl border-2 border-white/30 shrink-0">
                <Image
                  src="/images/pharmacist-portrait.png"
                  alt="The Joint Commission Accreditation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-white/90 text-lg lg:text-[24px] font-medium leading-[1.6] max-w-[500px]">
                Gold Seal of Approval demonstrating commitment to continuous compliance and patient safety standards.
              </p>
            </div>
          </div>

          {/* Card 2: WOSB Certified */}
          <div className="glass-card w-full min-h-[450px] lg:h-[538px] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest block mb-2">
                  2026-2027
                </span>
                <h3 className="font-serif-dm text-4xl sm:text-5xl lg:text-[60px] font-normal leading-[1.2] text-white">
                  WOSB Certified
                </h3>
              </div>

              {/* Badge Graphic */}
              <div className="relative w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] rounded-full overflow-hidden shadow-2xl border-2 border-white/30 shrink-0">
                <Image
                  src="/images/client-portrait.jpg"
                  alt="WOSB Certified Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-white/90 text-lg lg:text-[24px] font-medium leading-[1.6] max-w-[500px]">
                Certified Women-Owned Small Business providing agile healthcare staffing solutions for federal contracting.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Counter Metrics (Group 117) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/20 text-center">
          {/* Metric 1 */}
          <div className="space-y-2">
            <div className="font-serif-dm text-5xl sm:text-7xl lg:text-[120px] font-normal text-white leading-none">
              50+
            </div>
            <div className="text-xl sm:text-2xl lg:text-[32px] font-medium text-white/90">
              Specialists
            </div>
          </div>

          {/* Metric 2 */}
          <div className="space-y-2">
            <div className="font-serif-dm text-5xl sm:text-7xl lg:text-[120px] font-normal text-white leading-none">
              1500
            </div>
            <div className="text-xl sm:text-2xl lg:text-[32px] font-medium text-white/90">
              Placements
            </div>
          </div>

          {/* Metric 3 */}
          <div className="space-y-2">
            <div className="font-serif-dm text-5xl sm:text-7xl lg:text-[120px] font-normal text-white leading-none">
              50+
            </div>
            <div className="text-xl sm:text-2xl lg:text-[32px] font-medium text-white/90">
              Locations
            </div>
          </div>

          {/* Metric 4 */}
          <div className="space-y-2">
            <div className="font-serif-dm text-5xl sm:text-7xl lg:text-[120px] font-normal text-white leading-none">
              256
            </div>
            <div className="text-xl sm:text-2xl lg:text-[32px] font-medium text-white/90">
              Services
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
