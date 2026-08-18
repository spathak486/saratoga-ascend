'use client';

import React from 'react';
import Image from 'next/image';

export const ServicesSection: React.FC = () => {
  return (
    <section id="what-we-do" className="w-full py-16 lg:py-[120px] bg-white overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-12 lg:space-y-[60px]">
        {/* Header Block (Frame 607 in Figma) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-[1490px]">
            <h2 className="font-serif-dm text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[1.2] text-[#0A0A0A]">
              What We Do
            </h2>
            <p className="text-[#0A0A0A] text-lg sm:text-xl lg:text-[22px] font-normal leading-[1.5] max-w-[705px]">
              Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.
            </p>
          </div>

          <a
            href="#services"
            className="inline-flex items-center justify-center w-[180px] h-[60px] rounded-[8px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white font-medium text-[20px] gap-3 shadow-md hover:shadow-xl hover:scale-105 transition-all flex-shrink-0"
          >
            <span>Learn More</span>
            <svg className="w-6 h-6 fill-current text-white transform rotate-180" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
          </a>
        </div>

        {/* 3 Cards Grid (Group 103 in Figma) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[664px]">
          
          {/* Card 1: Doctor Visual Card */}
          <div className="relative min-h-[480px] lg:h-[664px] rounded-[40px] overflow-hidden bg-[#D9D9D9] shadow-xl group">
            <Image
              src="/images/healthcare-team.png"
              alt="Healthcare Solutions Visual"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <span className="text-sm font-bold uppercase tracking-widest text-[#2A91DC]">Innovation</span>
              <h3 className="font-serif-dm text-3xl lg:text-4xl font-normal text-white">Next-Gen Care</h3>
            </div>
          </div>

          {/* Card 2: Healthcare Features Card (Group 97 in Figma) */}
          <div className="relative min-h-[480px] lg:h-[664px] rounded-[40px] border border-[#C6C6C6] bg-white p-8 lg:p-12 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <h3 className="font-serif-dm text-4xl lg:text-[60px] font-normal leading-[1.2] text-[#0A0A0A]">
                Healthcare
              </h3>
              <p className="text-[#022E4C] text-base lg:text-[22px] font-normal leading-[1.5]">
                Delivering high-caliber, credentialed clinical talent to support military, federal, and civilian health missions seamlessly.
              </p>

              {/* Feature Pills */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] border-2 border-[#2A91DC] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2A91DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#0F172A] text-lg lg:text-[22px] font-medium border border-[#2A91DC]/30 px-4 py-1.5 rounded-xl bg-slate-50">
                    Accredited Certifications
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] border-2 border-[#2A91DC] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2A91DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#0F172A] text-lg lg:text-[22px] font-medium border border-[#2A91DC]/30 px-4 py-1.5 rounded-xl bg-slate-50">
                    Operational Insights
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] border-2 border-[#2A91DC] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2A91DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#0F172A] text-lg lg:text-[22px] font-medium border border-[#2A91DC]/30 px-4 py-1.5 rounded-xl bg-slate-50">
                    Regulatory Compliance
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="#contact"
                className="w-full h-[60px] rounded-full bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white font-medium text-[20px] flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all"
              >
                <span>Explore Solutions</span>
              </a>
            </div>
          </div>

          {/* Card 3: Gradient Feature Card (Group 102 in Figma) */}
          <div className="relative min-h-[480px] lg:h-[664px] rounded-[40px] border border-[#C6C6C6] bg-gradient-to-br from-white via-slate-50 to-[#D2EDFE] p-8 lg:p-12 flex flex-col justify-between shadow-xl overflow-hidden">
            <div className="relative w-full h-[280px] lg:h-[359px] flex items-center justify-center">
              <div className="relative w-[280px] lg:w-[359px] h-[280px] lg:h-[359px] rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/images/pharmacist-portrait.png"
                  alt="Clinical Excellence Illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <p className="text-[#022E4C] text-base lg:text-[22px] font-normal leading-[1.5]">
                Delivering verified healthcare specialists nationwide with round-the-clock compliance and administrative support.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
