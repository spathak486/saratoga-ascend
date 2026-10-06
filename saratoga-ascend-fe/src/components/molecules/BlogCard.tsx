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
    <article className="group relative flex w-full max-w-[544px] flex-col gap-[30px] rounded-tr-[100px] mx-auto">
      {/* Image Container */}
      <div className="relative w-full aspect-[544/431] rounded-tr-[100px] overflow-hidden">
        <MediaFrame
          src={imageSrc}
          alt={title}
          pendingLabel="blog-image"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="size-full border-0 bg-transparent rounded-tr-[100px]"
          imageClassName="object-cover rounded-tr-[100px] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[22px] leading-[1.5] text-black font-sans">
            {readTime && <span>{readTime} min read</span>}
            {readTime && date && <span>&middot;</span>}
            {date && <span>{date}</span>}
          </div>
          
          <div className="flex items-center justify-center w-8 h-8 text-black group-hover:translate-x-1 transition-transform duration-300">
            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8.5H21M21 8.5L13.5 1M21 8.5L13.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <Heading level={3} className="font-serif text-[clamp(32px,2.7vw,44px)] leading-[1.2] text-black">
          <GeneralLink
            href={href}
            variant="unstyled"
            className="after:absolute after:inset-0"
          >
            {title}
          </GeneralLink>
        </Heading>
      </div>
    </article>
  );
};
