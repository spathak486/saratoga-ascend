'use client';

import React from 'react';
import Image from 'next/image';

const NEWS_ITEMS = [
  {
    id: '1',
    title: 'How we support state and local agencies',
    readTime: '5 min read · August 12, 2026',
    image: '/images/hero-banner.png',
  },
  {
    id: '2',
    title: 'Simple Ways to Improve Your Mental Wellness',
    readTime: '4 min read · August 8, 2026',
    image: '/images/pharmacist-portrait.png',
  },
  {
    id: '3',
    title: 'Healthcare Builds Stronger communities',
    readTime: '6 min read · August 3, 2026',
    image: '/images/client-portrait.jpg',
  },
];

export const NewsroomSection: React.FC = () => {
  return (
    <section id="newsroom" className="w-full py-20 lg:py-[120px] bg-brand-red-gradient text-white overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[120px] space-y-16">
        {/* Title (Group 86) */}
        <div className="text-center max-w-[800px] mx-auto">
          <h2 className="font-serif-dm text-5xl sm:text-7xl lg:text-[72px] font-normal leading-[1.2] text-white">
            Latest news and insights
          </h2>
        </div>

        {/* 3 News Cards (Frame 582) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((news) => (
            <div
              key={news.id}
              className="w-full flex flex-col space-y-6 group cursor-pointer"
            >
              {/* Image Container with Top-Right Rounded Corner (0px 100px 0px 0px) */}
              <div 
                className="relative w-full h-[320px] sm:h-[431px] overflow-hidden shadow-xl"
                style={{ borderRadius: '0px 100px 0px 0px' }}
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>

              {/* Read time / date tag */}
              <div className="flex items-center justify-between text-white/90 text-lg lg:text-[22px] font-normal">
                <span>{news.readTime}</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#D31E2D] transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                  </svg>
                </div>
              </div>

              {/* Headline Title */}
              <h3 className="font-serif-dm text-3xl lg:text-[44px] font-normal leading-[1.2] text-white group-hover:underline">
                {news.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
