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
    <article className="border-cta-gradient group relative mx-auto flex w-full min-w-0 flex-col gap-6 rounded-card p-[1.125rem] xl:min-h-[28.25rem] xl:flex-row xl:items-center xl:gap-[2.875rem]">
      <div className="relative aspect-[737/415] w-full shrink-0 overflow-hidden rounded-2xl xl:w-[45%] xl:rounded-3xl">
        <MediaFrame
          src={imageSrc}
          alt={title}
          pendingLabel="blog-image"
          sizes="(max-width: 1280px) 100vw, 737px"
          className="size-full rounded-2xl border-0 bg-transparent xl:rounded-3xl"
          imageClassName="rounded-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-within:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100 xl:rounded-3xl"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start xl:w-[55%] xl:pr-10">
        {meta ? (
          <p className="mb-4 text-body text-ink">{meta}</p>
        ) : null}

        <h3 className="mb-6 font-serif text-legal-section tracking-[-1px] break-words text-brand-navy-legal transition-colors duration-300 ease-out group-hover:text-brand-cta-from group-focus-within:text-brand-cta-from motion-reduce:transition-none">
          <GeneralLink href={href} variant="unstyled" className="after:absolute after:inset-0">
            {title}
          </GeneralLink>
        </h3>

        {excerpt ? (
          <p className="mb-10 line-clamp-4 text-body-lg text-[color:var(--color-legal-body)]">
            {excerpt}
          </p>
        ) : null}

        <CtaButton href={href} className="relative z-10 w-full max-w-[11.25rem] justify-center">
          Read More
        </CtaButton>
      </div>
    </article>
  );
};
