import React from 'react';
import { Heading } from '../atoms/Heading';
import { MediaFrame } from '../atoms/MediaFrame';
import { GeneralLink } from '../atoms/GeneralLink';

export interface BlogCardProps {
  title: string;
  readTime?: string;
  date?: string;
  author?: string;
  imageSrc?: string;
  href: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  readTime,
  date,
  author,
  imageSrc,
  href,
}) => {
  return (
    <article className="group relative flex w-full max-w-[546px] flex-col rounded-[21px] border-[2px] border-[#E4EBF1] bg-white overflow-hidden transition-shadow hover:shadow-md mx-auto">
      {/* Image Container */}
      <div className="relative w-full h-[234px] overflow-hidden">
        <MediaFrame
          src={imageSrc}
          alt={title}
          pendingLabel="blog-image"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="size-full border-0 bg-transparent rounded-none"
          imageClassName="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col px-6 pt-5 pb-4 flex-grow">
        <div className="flex items-center gap-3 text-[14px] text-[#91A6AF] mb-4">
          {readTime && <span>{readTime}</span>}
          {readTime && date && <span className="w-1.5 h-1.5 rounded-full bg-[#91A6AF]" />}
          {date && <span>{date}</span>}
        </div>

        <Heading level={3} size="h3" tone="base" className="mb-6 font-serif text-[28px] leading-[36px] text-black line-clamp-2">
          <GeneralLink
            href={href}
            variant="unstyled"
            className="after:absolute after:inset-0"
          >
            {title}
          </GeneralLink>
        </Heading>

        <div className="flex-grow" />

        <div className="mt-auto flex items-center justify-between border-t-[1.5px] border-[#E4EBF1] pt-4">
          <span className="text-[14px] text-[#91A6AF] font-sans">{author || 'Jane Cooper'}</span>
          <span className="text-[16.7px] font-medium text-[#2B88D9] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            Read article
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[2px]">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
};
