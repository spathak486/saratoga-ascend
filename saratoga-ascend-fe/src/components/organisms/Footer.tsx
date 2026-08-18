'use client';

import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the Privacy Policy');
      return;
    }
    alert(`Subscribed ${newsletterEmail} to newsletter!`);
    setNewsletterEmail('');
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#081A30] to-[#040D1A] text-white overflow-hidden pt-16 lg:pt-[80px] pb-12">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-12 lg:space-y-16">
        
        {/* Top Branding Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[#1E3A5F]">
          <h2 className="font-serif-dm text-3xl sm:text-4xl lg:text-[44px] font-normal text-white">
            Federal State Programs & Solutions
          </h2>

          <div className="text-white/60 text-sm font-medium">
            Saratoga Ascend Healthcare & Federal Services
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pt-4">
          
          {/* Column 1: Newsletter Signup */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif-dm text-2xl lg:text-[28px] font-normal text-white">
              Sign up for Our Newsletter
            </h3>

            <form onSubmit={handleSubscribe} className="space-y-4 max-w-[402px]">
              <div className="flex items-center bg-white rounded-lg p-1.5 shadow-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-transparent px-4 text-[#0A0A0A] placeholder-[#64748B] text-base focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-11 h-11 bg-[#0066CC] rounded-md flex items-center justify-center text-white flex-shrink-0 hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 fill-current transform rotate-180" viewBox="0 0 24 24">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                  </svg>
                </button>
              </div>

              <label className="flex items-center gap-3 cursor-pointer text-sm text-[#94A3B8]">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 text-[#0066CC] focus:ring-0"
                />
                <span>I agree to the Privacy Policy.</span>
              </label>
            </form>
          </div>

          {/* Column 2: Social Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[#FFFFFF] text-xl lg:text-[24px] font-medium border-b border-[#0066CC] pb-2 inline-block">
              Social
            </h4>
            <ul className="space-y-2 text-[#CBD5E1] text-base">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Youtube</a></li>
            </ul>
          </div>

          {/* Column 3: Menu Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[#FFFFFF] text-xl lg:text-[24px] font-medium border-b border-[#0066CC] pb-2 inline-block">
              Menu
            </h4>
            <ul className="space-y-2 text-[#CBD5E1] text-base">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#what-we-do" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about-us" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Job Search</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Say Hello!) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#FFFFFF] text-xl lg:text-[24px] font-medium border-b border-[#0066CC] pb-2 inline-block">
              Say Hello!
            </h4>
            <div className="space-y-2">
              <a href="mailto:careers@saratogaascend.com" className="block text-white text-base lg:text-[16px] font-bold hover:underline">
                careers@saratogaascend.com
              </a>
              <a href="tel:+12122132520" className="block text-[#CBD5E1] text-base lg:text-[16px]">
                +1 (212) 213-2520
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[#7F1D1D] text-center text-[#94A3B8] text-sm space-y-2">
          <p>© 2026 Saratoga Ascend. All rights reserved | Privacy Policy | Terms of Service</p>
        </div>

      </div>
    </footer>
  );
};
