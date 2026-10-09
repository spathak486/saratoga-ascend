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
    <article className="group relative flex h-full w-full min-w-0 flex-col gap-[1.125rem] xl:gap-[1.875rem]">
      <div className="relative aspect-[781/619] w-full overflow-hidden rounded-tr-[clamp(3rem,5.2vw,6.25rem)]">
        <MediaFrame
          src={imageSrc}
          alt={title}
          pendingLabel="blog-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="size-full rounded-tr-[clamp(3rem,5.2vw,6.25rem)] border-0 bg-transparent"
          imageClassName="rounded-tr-[clamp(3rem,5.2vw,6.25rem)] object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-within:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          {meta ? (
            <p className="min-w-0 text-body text-ink">{meta}</p>
          ) : (
            <span />
          )}

          <div className="flex size-8 shrink-0 items-center justify-center text-ink transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-within:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-within:translate-x-0">
            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M4 16.5H28M28 16.5L18 6.5M28 16.5L18 26.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <Heading
          level={3}
          size="subtitle"
          tone="ink"
          className="break-words transition-colors duration-300 ease-out group-hover:text-brand-cta-from group-focus-within:text-brand-cta-from motion-reduce:transition-none"
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
