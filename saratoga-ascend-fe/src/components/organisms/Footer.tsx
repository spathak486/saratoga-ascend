'use client';

import React, { useState } from 'react';
import { BrandLogo } from '../molecules/BrandLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer id="contact" className="relative w-full bg-brand-dark-gradient text-white py-16 lg:py-20 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-16">
        {/* Top Header Row (Group 121) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-[#1E3A5F]/60">
          <a href="#" className="hover:opacity-90 transition">
            <BrandLogo size="lg" />
          </a>

          <h3 className="font-serif-dm text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.2] text-white">
            Federal State Programs & Solutions
          </h3>
        </div>

        {/* Main Content Grid: Newsletter + Links + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pt-4">
          {/* Newsletter Column (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="font-serif-dm text-2xl lg:text-[28px] font-normal text-white">
              Sign up for Our Newsletter
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative w-full max-w-[402px] flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-[56px] pl-6 pr-14 bg-white text-[#0A0A0A] placeholder-[#64748B] text-base rounded-full focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
                <button
                  type="submit"
                  aria-label="Submit email"
                  className="absolute right-1.5 w-[44px] h-[44px] rounded-full bg-[#0066CC] flex items-center justify-center hover:bg-[#0052a3] transition"
                >
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                  </svg>
                </button>
              </div>

              {/* Privacy Policy Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer text-sm text-[#94A3B8] hover:text-white transition">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 rounded border-[#94A3B8] text-[#0066CC] focus:ring-0 cursor-pointer"
                />
                <span>I agree to the Privacy Policy.</span>
              </label>
            </form>
          </div>

          {/* Social Column */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xl lg:text-[24px] font-medium text-white mb-2">Social</h5>
            <div className="w-8 h-1 bg-[#0066CC] rounded-full mb-4" />
            <ul className="space-y-3 text-base text-[#CBD5E1]">
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">Youtube</a></li>
            </ul>
          </div>

          {/* Menu Column */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xl lg:text-[24px] font-medium text-white mb-2">Menu</h5>
            <div className="w-8 h-1 bg-[#0066CC] rounded-full mb-4" />
            <ul className="space-y-3 text-base text-[#CBD5E1]">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#what-we-do" className="hover:text-white transition">Services</a></li>
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition">Job Search</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Say Hello! Column */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xl lg:text-[24px] font-medium text-white mb-2">Say Hello!</h5>
            <div className="w-8 h-1 bg-[#0066CC] rounded-full mb-4" />
            <div className="space-y-3">
              <a
                href="mailto:careers@saratogaascend.com"
                className="block text-base lg:text-[16px] font-bold text-white hover:text-[#2A91DC] transition"
              >
                careers@saratogaascend.com
              </a>
              <a
                href="tel:+12122132520"
                className="block text-base lg:text-[16px] font-normal text-[#CBD5E1] hover:text-white transition"
              >
                +1 (212) 213-2520
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Red Accent Divider Line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-[#7F1D1D] via-[#DC2626] to-[#7F1D1D] my-8" />

        {/* Copyright Notice */}
        <div className="text-center text-sm text-[#94A3B8]">
          © 2026 Saratoga Ascend. All rights reserved | Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  );
};
