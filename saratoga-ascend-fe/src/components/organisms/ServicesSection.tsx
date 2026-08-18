'use client';

import React from 'react';
import Image from 'next/image';

export const ServicesSection: React.FC = () => {
  return (
    <section id="what-we-do" className="w-full py-16 lg:py-[120px] bg-white overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-center">
          {/* Card 1: Doctor Visual (Mask group / Rectangle 4) */}
          <div className="relative w-full h-[550px] lg:h-[664px] bg-[#D9D9D9] rounded-[40px] overflow-hidden shadow-lg group">
            <Image
              src="/images/client-portrait.jpg"
              alt="Doctor from future concept"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#022E4C]/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="text-xs uppercase tracking-widest font-bold text-[#2A91DC]">Medical Expertise</span>
              <h3 className="font-serif-dm text-3xl font-normal mt-2">Cleared & Credentialed Staff</h3>
            </div>
          </div>

          {/* Card 2: Healthcare Solutions Checklist (Rectangle 53) */}
          <div className="relative w-full min-h-[550px] lg:h-[664px] bg-white border border-[#C6C6C6] rounded-[40px] p-8 lg:p-12 flex flex-col justify-between shadow-xs">
            <div>
              {/* Heading */}
              <h2 className="font-serif-dm text-5xl lg:text-[72px] font-normal leading-[1.2] text-[#0A0A0A] mb-4">
                Healthcare
              </h2>

              {/* Description Body */}
              <p className="text-[#022E4C] text-lg lg:text-[22px] font-normal leading-[1.5] mb-8">
                Empowering healthcare institutions nationwide with certified professionals, compliant operations, and seamless staffing workflows.
              </p>

              {/* Checklist Group */}
              <div className="space-y-4 mb-8">
                {/* Item 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] border-[3px] border-[#2A91DC] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#2A91DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#0F172A] text-lg lg:text-[22px] font-normal">
                    Accredited Certifications
                  </span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] border-[3px] border-[#2A91DC] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#2A91DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#0F172A] text-lg lg:text-[22px] font-normal">
                    Operational Insights
                  </span>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] border-[3px] border-[#2A91DC] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#2A91DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#0F172A] text-lg lg:text-[22px] font-normal">
                    Regulatory Compliance
                  </span>
                </div>
              </div>
            </div>

            {/* Controls & Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                {/* Arrow Left (Sky Blue) */}
                <button className="w-12 h-12 rounded-full bg-[#F01424]/5 border border-[#C6C6C6] flex items-center justify-center hover:bg-[#2B88D9] hover:text-white transition group">
                  <svg className="w-5 h-5 text-[#2B88D9] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>
                {/* Arrow Right (Red) */}
                <button className="w-12 h-12 rounded-full bg-[#F01424]/5 border border-[#C6C6C6] flex items-center justify-center hover:bg-[#F01424] hover:text-white transition group">
                  <svg className="w-5 h-5 text-[#F01424] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                  </svg>
                </button>
              </div>

              {/* Pill Button */}
              <a
                href="#learn-more"
                className="px-6 py-3 bg-brand-red-gradient text-white text-[20px] font-medium rounded-full shadow-xs hover:opacity-90 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Card 3: Gradient Illustration Card (Rectangle 54) */}
          <div className="relative w-full h-[550px] lg:h-[664px] bg-gradient-to-br from-white via-white to-[#D2EDFE] border border-[#C6C6C6] rounded-[40px] p-8 lg:p-12 flex flex-col justify-between shadow-xs">
            <div className="relative w-full flex justify-center pt-6">
              <div className="relative w-[280px] h-[280px] lg:w-[359px] lg:h-[359px] rounded-full overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/pharmacist-portrait.png"
                  alt="Healthcare Specialist Illustration"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Ellipse Shadow under image */}
              <div className="absolute bottom-[-10px] w-[241px] h-[7px] bg-black/60 blur-[19.5px]" />
            </div>

            <div>
              <p className="text-[#022E4C] text-lg lg:text-[22px] font-normal leading-[1.5]">
                Delivering standard-setting workforce solutions across federal, state, and local clinical operational settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
