import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import Link from 'next/link';

export interface FeaturedBlogCardProps {
  title: string;
  excerpt?: string;
  readTime?: string;
  date?: string;
  author?: string;
  imageSrc?: string;
  href?: string;
}

export const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({
  title,
  excerpt = 'The transition from fragmented branch credentialing to unified DHA commercial surge contracting represents the most critical modernization of military trauma readiness in three decades...',
  readTime,
  date,
  author,
  imageSrc,
  href = '#',
}) => {
  return (
    <div className="w-full max-w-[105.5625rem] h-auto lg:min-h-[28.25rem] bg-white rounded-[2.5rem] p-[1.125rem] flex flex-col lg:flex-row items-center gap-[2.5rem] lg:gap-[2.875rem] shadow-sm relative mb-[2.5rem] mx-auto">
      {/* Image */}
      <div className="w-full lg:w-[45%] aspect-[16/9] lg:aspect-auto lg:min-h-[25.9375rem] relative shrink-0 rounded-[1.5rem] overflow-hidden bg-gray-100">
        {imageSrc ? (
          <img src={imageSrc} alt={stripHtml(title)} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-start w-full lg:w-[55%] pr-0 lg:pr-[2.5rem]">
        {/* Read Time / Date */}
        {(readTime || date) && (
          <p className="font-sans font-normal text-[1.375rem] leading-[150%] text-black mb-[1rem]">
            {[readTime, date].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Title */}
        <h3 className="font-serif font-normal text-[clamp(32px,2.5vw,40px)] leading-[1.2] lg:leading-[3.75rem] tracking-[-1px] text-[#00162D] mb-[1.5rem] line-clamp-2">
          {stripHtml(title)}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="font-sans font-normal text-[clamp(18px,1.5vw,24px)] leading-[160%] text-[#5A5A5A] mb-[2.5rem] line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Button */}
        <Link href={href}>
          <div className="flex flex-row justify-center items-center px-[1.5rem] py-[1rem] gap-[0.75rem] w-[11.25rem] h-[3.75rem] rounded-[0.5rem] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]" style={{ background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)' }}>
            <span className="font-sans font-medium text-[1.25rem] leading-[150%] text-white">
              Read
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};
