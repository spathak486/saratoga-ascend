'use client';

import React from 'react';

const HEALTHCARE_SERVICES = [
  {
    id: '1',
    title: 'Travel Staffing',
    subtitle: 'Medical Pharmacist',
    description: 'Connecting cleared, credentialed healthcare professionals with government, military.',
    accentColor: '#D31E2D',
  },
  {
    id: '2',
    title: 'Clinical Placement',
    subtitle: 'Primary Care Nurses',
    description: 'Rapid deployment of certified clinical talent across state and federal facilities nationwide.',
    accentColor: '#2B88D9',
  },
  {
    id: '3',
    title: 'Federal Solutions',
    subtitle: 'Defense Health Agency',
    description: 'Specialized healthcare staffing tailored for military hospitals and veterans affairs centers.',
    accentColor: '#D31E2D',
  },
  {
    id: '4',
    title: 'Emergency Care',
    subtitle: 'Critical Care Units',
    description: '24/7 rapid response medical staffing for urgent public health missions and crisis recovery.',
    accentColor: '#2B88D9',
  },
];

export const HealthcareFocusSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 lg:py-[120px] bg-[#002845] text-white overflow-hidden">
      {/* Background Watermark Text "Healthcare" */}
      <div className="absolute top-10 right-[-100px] pointer-events-none select-none font-serif-dm text-[140px] sm:text-[214px] leading-none text-white/10 whitespace-nowrap">
        Healthcare
      </div>

      {/* Concentric Circle Vectors (Ellipse 12-16) */}
      <div className="absolute right-[-200px] top-[-100px] w-[900px] h-[900px] rounded-full border border-white/20 bg-[#2A91DC]/10 pointer-events-none" />
      <div className="absolute right-[-350px] top-[-250px] w-[1200px] h-[1200px] rounded-full border border-white/10 bg-[#2A91DC]/5 pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] relative z-10 space-y-16">
        {/* Header Block (Group 105) */}
        <div className="max-w-[700px] space-y-6">
          <div className="inline-block px-6 py-2 rounded-full border border-white/30 text-white text-sm font-medium">
            Services & Solutions
          </div>

          <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[90px] font-normal leading-[1.15] text-[#FFFEFE]">
            Healthcare
          </h2>

          <p className="text-[#A2D8FE] text-xl lg:text-[28px] font-bold leading-tight">
            Medical Staffing & Solutions
          </p>

          <p className="text-white text-lg sm:text-xl lg:text-[22px] font-normal leading-[1.5]">
            Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.
          </p>

          <div>
            <a
              href="#view-all"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#2A91DC] text-white text-[20px] font-medium rounded-full shadow-lg hover:bg-[#207bbd] transition"
            >
              View All Services
            </a>
          </div>
        </div>

        {/* 4 Feature Cards (Frame 584 - 587) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {HEALTHCARE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="relative w-full h-[450px] bg-gradient-to-br from-white to-[#F8FAFC] border border-[#C6C6C6] rounded-[32px] p-8 flex flex-col justify-between shadow-lg group hover:-translate-y-2 transition-all duration-300"
            >
              {/* Radial ambient glow effect behind icon */}
              <div className="absolute top-4 right-4 w-[120px] h-[120px] rounded-full bg-red-500/10 blur-xl pointer-events-none" />

              {/* Top Row: Title & Arrow Icon */}
              <div className="flex items-start justify-between">
                <h3 className="font-serif-dm text-3xl lg:text-[44px] font-normal text-black leading-[1.2] max-w-[240px]">
                  {service.title}
                </h3>
                <div className="w-[60px] h-[60px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#D31E2D] transition-colors shrink-0">
                  <svg className="w-6 h-6 text-[#D31E2D] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                  </svg>
                </div>
              </div>

              {/* Middle Body Content */}
              <div className="space-y-3">
                <p className="text-[#0A0A0A] text-base lg:text-[20px] font-medium leading-[1.5]">
                  {service.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs uppercase font-bold text-slate-500">
                <span>{service.subtitle}</span>
                <span className="w-2 h-2 rounded-full bg-[#D31E2D]" />
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar Line (Group 112 / Rectangle 57 & 58) */}
        <div className="relative w-full h-[12px] pt-8">
          <div className="w-full h-[4px] bg-[#E3E3E3] rounded-full" />
          <div className="absolute top-8 left-0 w-[45%] h-[12px] bg-brand-red-gradient rounded-full" />
        </div>
      </div>
    </section>
  );
};
