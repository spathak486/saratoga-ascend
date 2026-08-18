'use client';

import React from 'react';
import Image from 'next/image';

export const NewsroomSection: React.FC = () => {
  const news = [
    {
      title: 'How we support state and local agencies',
      meta: '5 min read · August 12, 2026',
      image: '/images/hero-banner.png',
    },
    {
      title: 'Simple Ways to Improve Your Mental Wellness',
      meta: '4 min read · August 8, 2026',
      image: '/images/healthcare-team.png',
    },
    {
      title: 'Healthcare Builds Stronger communities',
      meta: '6 min read · August 3, 2026',
      image: '/images/pharmacist-portrait.png',
    },
  ];

  return (
    <section id="newsroom" className="w-full py-16 lg:py-[120px] bg-gradient-to-r from-[#D31E2D] to-[#2A91DC] text-white overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[72px] font-normal leading-[1.2] text-white">
            Latest news and insights
          </h2>
        </div>

        {/* 3 Insight Cards Grid (Frame 582 in Figma) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-6 lg:p-8 flex flex-col justify-between shadow-2xl hover:scale-[1.02] transition-transform duration-300 group cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative w-full h-[260px] lg:h-[320px] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="space-y-4">
                <div className="text-white/80 text-base lg:text-[22px] font-normal">
                  {item.meta}
                </div>

                <h3 className="font-serif-dm text-2xl lg:text-[44px] font-normal leading-[1.2] text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
