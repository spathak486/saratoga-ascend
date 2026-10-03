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
    <div className="w-full max-w-[1689px] lg:h-[452px] bg-white rounded-[40px] p-[18px] flex flex-col lg:flex-row items-center gap-[40px] lg:gap-[46px] shadow-sm relative mb-[40px] mx-auto">
      {/* Image */}
      <div className="w-full lg:w-[45%] h-[300px] lg:h-[415px] relative shrink-0 rounded-[24px] overflow-hidden bg-gray-100">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-start w-full lg:w-[55%] pr-0 lg:pr-[40px]">
        {/* Read Time / Date */}
        {(readTime || date) && (
          <p className="font-sans font-normal text-[22px] leading-[150%] text-black mb-[16px]">
            {[readTime, date].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Title */}
        <h3 className="font-serif font-normal text-[32px] lg:text-[40px] leading-[1.2] lg:leading-[60px] tracking-[-1px] text-[#00162D] mb-[24px] line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="font-sans font-normal text-[18px] lg:text-[24px] leading-[160%] text-[#5A5A5A] mb-[40px] line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Button */}
        <Link href={href}>
          <div className="flex flex-row justify-center items-center px-[24px] py-[16px] gap-[12px] w-[180px] h-[60px] rounded-[8px] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]" style={{ background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)' }}>
            <span className="font-sans font-medium text-[20px] leading-[150%] text-white">
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
