'use client';

import React from 'react';
import Image from 'next/image';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-20 lg:py-[120px] bg-white text-black overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="/images/hero-banner.png"
          alt="Biotechnology background remix"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Mission Narrative & Bullet Points */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-sm uppercase font-bold tracking-widest text-[#0F3D60] block mb-2">Our Heritage</span>
            <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[72px] font-normal leading-[1.2] text-[#F01424]">
              About Us
            </h2>
          </div>

          <h3 className="text-2xl lg:text-[28px] font-medium leading-[1.4] text-[#0F3D60]">
            Four Decades of Military & Federal Healthcare Solutions Expertise
          </h3>

          <p className="text-lg lg:text-[22px] font-normal leading-[1.6] text-[#0A0A0A]">
            Founded to serve federal and military healthcare, we grew into a nationwide partner for hospitals, clinics, and public health programs. We combine military‑grade precision with responsive, people‑first service matching licensed, background‑checked, and fully credentialed professionals to serve every mission.
          </p>

          {/* Core Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#F01424]/10 text-[#F01424] flex items-center justify-center font-bold">01</div>
              <h4 className="font-bold text-lg text-[#0F3D60]">Nationwide Coverage</h4>
              <p className="text-slate-600 text-sm">Active coverage across all 50 states and U.S. territories.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#2B88D9]/10 text-[#2B88D9] flex items-center justify-center font-bold">02</div>
              <h4 className="font-bold text-lg text-[#0F3D60]">Cleared Personnel</h4>
              <p className="text-slate-600 text-sm">Security-cleared professionals for government & military facilities.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#2B88D9]/10 text-[#2B88D9] flex items-center justify-center font-bold">03</div>
              <h4 className="font-bold text-lg text-[#0F3D60]">Dedicated Compliance</h4>
              <p className="text-slate-600 text-sm">In-house compliance & Joint Commission credentialing teams.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#F01424]/10 text-[#F01424] flex items-center justify-center font-bold">04</div>
              <h4 className="font-bold text-lg text-[#0F3D60]">24/7 Support</h4>
              <p className="text-slate-600 text-sm">Continuous 24/7 dedicated support for clients and healthcare providers.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Feature Box */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-[500px] h-[550px] lg:h-[650px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-slate-100">
            <Image
              src="/images/pharmacist-portrait.png"
              alt="Four Decades of Healthcare Expertise"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D60] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#2A91DC]">Military Grade Quality</span>
              <h3 className="font-serif-dm text-3xl font-normal">Trusted Federal Partner</h3>
              <p className="text-sm text-white/80">Delivering excellence in staffing since 1986.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
