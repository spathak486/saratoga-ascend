'use client';

import React, { useState } from 'react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How this work?',
      a: 'We match background-checked, cleared, and licensed healthcare professionals with federal, military, and civilian health facilities nationwide through an accelerated compliance and onboarding process.',
    },
    {
      q: 'What credentials are required for placement?',
      a: 'All clinical professionals undergo rigorous primary source verification, active state licensure checks, background clearances, and facility-specific credentialing prior to placement.',
    },
    {
      q: 'How fast can clinical staff be deployed?',
      a: 'Depending on facility requirements and security clearance levels, emergency and rapid-response placements can occur within 24 to 72 hours.',
    },
    {
      q: 'What government contract vehicles do you support?',
      a: 'Saratoga Ascend supports federal GSA schedules, DoD prime contracts, VA IDIQ contracts, state agency BPAs, and local emergency staffing agreements.',
    },
    {
      q: 'How do I request healthcare staffing?',
      a: 'Submit your facility staffing requirement through our online portal or contact our dedicated 24/7 client relations team directly at careers@saratogaascend.com.',
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-[120px] bg-gradient-to-r from-[#FF0013] via-[#0088DD] to-[#00BBFF] overflow-hidden flex items-center justify-center">
      <div className="relative z-10 w-full max-w-[1112px] mx-auto px-4 sm:px-6">
        
        {/* Glass Container (Rectangle 68 in Figma) */}
        <div className="bg-[#F8F9FA]/95 backdrop-blur-xl border border-[#C6C6C6] rounded-[20px] lg:rounded-[32px] p-8 sm:p-12 lg:p-16 shadow-2xl space-y-8">
          
          {/* Header Block */}
          <div className="space-y-3">
            <h2 className="font-serif-dm text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[1.2] text-[#F01424]">
              Any Questions?
            </h2>
            <p className="text-[#000000] text-lg sm:text-xl lg:text-[24px] font-medium leading-[1.6]">
              Proudly Serving Federal, State and Local clients
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="border-b border-[#000000]/20 pb-4 transition-all">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-2 group"
                  >
                    <span className={`text-xl sm:text-2xl lg:text-[24px] font-bold ${isOpen ? 'text-[#2B88D9]' : 'text-[#000000] group-hover:text-[#2B88D9]'} transition-colors`}>
                      {faq.q}
                    </span>
                    <span className={`text-3xl lg:text-4xl font-sans ${isOpen ? 'text-[#2B88D9]' : 'text-[#000000]'}`}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="text-[#000000] text-base lg:text-[24px] font-medium leading-[1.6] pt-3 animate-fadeIn">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-[180px] h-[60px] rounded-full bg-[#2B88D9] text-[#F8F9FA] font-bold text-[20px] shadow-lg hover:bg-[#2377c0] hover:scale-105 transition-all"
            >
              Contact Us
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
