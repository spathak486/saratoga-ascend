'use client';

import React from 'react';

export const ClientLogosSection: React.FC = () => {
  const clients = [
    { name: 'U.S. Department of Veterans Affairs', code: 'VA Health' },
    { name: 'Department of Defense', font: 'DoD Medicine' },
    { name: 'Naval Hospital Lejeune', font: 'Naval Hospital' },
    { name: 'Federal Emergency Management', font: 'FEMA Health' },
    { name: 'National Institutes of Health', font: 'NIH Research' },
    { name: 'State Public Health Agencies', font: 'Public Health' },
  ];

  return (
    <section className="w-full py-16 lg:py-[120px] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-12">
        
        {/* Title Block (Group 108 in Figma) */}
        <div className="text-center space-y-4 max-w-[700px] mx-auto">
          <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[72px] font-normal leading-[1.2] text-[#F01424]">
            Our Clients
          </h2>
          <p className="text-[#000000] text-xl lg:text-[24px] font-medium leading-[1.6]">
            Proudly Serving Federal, State and Local clients
          </p>
        </div>

        {/* Client Marquee Cards Grid (Group 80 in Figma) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-6">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="h-[200px] lg:h-[260px] rounded-[32px] border border-[#D0D0D0] bg-white/80 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:border-[#2A91DC] transition-all duration-300 group cursor-pointer"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-[#2A91DC] mb-2">Government Partner</span>
              <h3 className="font-serif-dm text-2xl lg:text-3xl font-normal text-[#0A0A0A] group-hover:text-[#F01424] transition-colors">
                {client.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
