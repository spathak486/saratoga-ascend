import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';
import { GeneralLink } from '../atoms/GeneralLink';
import { CtaButton } from './CtaButton';

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
  excerpt,
  readTime,
  date,
  imageSrc,
  href = '#',
}) => {
  const meta = [readTime, date].filter(Boolean).join(' · ');

  return (
    <article
      className="relative mx-auto flex w-full flex-col gap-6 rounded-[1.5rem] border bg-white p-[18px] max-xl:max-w-none xl:min-h-[28.25rem] xl:flex-row xl:items-center xl:gap-[46px] xl:rounded-[40px]"
      style={{ borderWidth: 1.333, borderColor: '#D31E2D' }}
    >
      <div className="relative h-[13.75rem] w-full shrink-0 overflow-hidden rounded-2xl xl:h-[415px] xl:w-[45%] xl:rounded-[24px]">
        <MediaFrame
          src={imageSrc}
          alt={title}
          pendingLabel="blog-image"
          sizes="(max-width: 1280px) 100vw, 737px"
          className="size-full border-0 bg-transparent rounded-2xl xl:rounded-[24px]"
          imageClassName="object-cover rounded-2xl xl:rounded-[24px]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start pr-0 xl:w-[55%] xl:pr-10">
        {meta ? (
          <p className="mb-4 font-sans text-[clamp(0.875rem,0.7rem+0.5vw,1.375rem)] leading-[1.5] text-black">
            {meta}
          </p>
        ) : null}

        <h3 className="mb-6 font-serif text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-[1.2] tracking-[-1px] text-[#00162D] xl:leading-[60px]">
          <GeneralLink href={href} variant="unstyled" className="after:absolute after:inset-0">
            {title}
          </GeneralLink>
        </h3>

        {excerpt ? (
          <p className="mb-10 font-sans text-[clamp(1rem,0.85rem+0.5vw,1.5rem)] leading-[1.6] text-[#5A5A5A] line-clamp-3">
            {excerpt}
          </p>
        ) : null}

        <CtaButton href={href} className="relative z-10 w-[180px] justify-center">
          Read More
        </CtaButton>
      </div>
    </article>
  );
};
