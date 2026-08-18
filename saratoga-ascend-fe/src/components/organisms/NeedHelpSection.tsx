'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const NeedHelpSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${form.name || 'Applicant'}! Our team will contact you shortly.`);
    setForm({ name: '', email: '' });
  };

  return (
    <section id="contact" className="w-full py-8 sm:py-12 md:py-16 lg:py-[120px] bg-white overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[120px]">
        
        {/* Banner Card (Rectangle 14 in Figma: 1680px x 733px, border-radius: 52px) */}
        <div 
          style={{
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(87.03deg, #FF0013 -15.22%, #00BBFF 104.41%)',
          }}
          className="relative w-full max-w-[1680px] mx-auto min-h-[460px] md:min-h-[560px] lg:h-[733px] rounded-[24px] sm:rounded-[36px] lg:rounded-[52px] p-6 sm:p-10 md:p-14 lg:p-20 shadow-2xl overflow-hidden text-white flex flex-col justify-between"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 h-full">
            
            {/* Left Column: Title, Description & Form */}
            <div className="md:col-span-7 lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3">
                <h2 className="font-serif-dm text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal leading-[1.15] text-white tracking-tight">
                  Need Help?
                </h2>
                <p className="text-white text-base sm:text-xl lg:text-[24px] font-medium leading-[1.5] opacity-95">
                  Sign up now and get hired easily
                </p>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 max-w-[540px]">
                <div className="space-y-1.5 border-b border-white/40 pb-2">
                  <label htmlFor="name-input" className="sr-only">Name</label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent text-white placeholder-white/50 text-base sm:text-lg lg:text-xl font-normal focus:outline-none focus:placeholder-white/70 transition-colors"
                  />
                </div>

                <div className="space-y-1.5 border-b border-white/40 pb-2">
                  <label htmlFor="email-input" className="sr-only">Email</label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent text-white placeholder-white/50 text-base sm:text-lg lg:text-xl font-normal focus:outline-none focus:placeholder-white/70 transition-colors"
                  />
                </div>

                <div className="pt-4 sm:pt-6">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 sm:px-10 h-[52px] sm:h-[60px] rounded-full bg-white text-[#2B88D9] font-bold text-lg sm:text-[20px] shadow-xl hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Know More</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Doctor / Nurse Image Visual */}
            <div className="md:col-span-5 lg:col-span-6 relative h-[260px] sm:h-[380px] md:h-[480px] lg:h-[650px] flex justify-center md:justify-end items-end">
              <div className="relative w-full h-full max-w-[340px] sm:max-w-[440px] lg:max-w-[580px] flex items-end justify-end">
                <Image
                  src="/images/client-portrait.jpg"
                  alt="Cheerful Healthcare Specialist"
                  fill
                  priority
                  className="object-cover object-top rounded-[20px] sm:rounded-[28px] lg:rounded-[36px] shadow-2xl"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


