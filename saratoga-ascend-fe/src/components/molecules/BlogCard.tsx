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
  imageSrc,
  href,
}) => {
  const meta = [readTime, date].filter(Boolean).join(' · ');

  return (
    <article className="group relative flex w-full flex-col gap-[1.125rem] rounded-tr-[3rem] xl:gap-[1.875rem] xl:rounded-tr-[6.25rem]">
      <div className="relative aspect-[781/619] w-full overflow-hidden rounded-tr-[3rem] xl:aspect-auto xl:h-[26.9375rem] xl:rounded-tr-[6.25rem]">
        <MediaFrame
          src={imageSrc}
          alt={title}
          pendingLabel="blog-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="size-full border-0 bg-transparent rounded-tr-[3rem] xl:rounded-tr-[6.25rem]"
          imageClassName="object-cover rounded-tr-[3rem] transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 xl:rounded-tr-[6.25rem]"
        />
      </div>

      <div className="flex flex-col gap-2 xl:gap-3">
        <div className="flex items-center justify-between gap-3">
          {meta ? (
            <p className="font-sans text-[clamp(0.875rem,0.7rem+0.5vw,1.375rem)] leading-[1.5] text-black">
              {meta}
            </p>
          ) : (
            <span />
          )}

          <div className="flex size-8 shrink-0 items-center justify-center text-black transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M4 16.5H28M28 16.5L18 6.5M28 16.5L18 26.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <Heading
          level={3}
          className="font-serif text-[clamp(1.5rem,1.1rem+1.6vw,2.75rem)] leading-[1.2] text-black"
        >
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
