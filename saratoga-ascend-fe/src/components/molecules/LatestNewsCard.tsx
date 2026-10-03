import React from 'react';
import { GeneralLink } from '../atoms/GeneralLink';
import { Heading } from '../atoms/Heading';
import { MediaFrame } from '../atoms/MediaFrame';
import { NewsArrowIcon } from '../atoms/icons';

export interface LatestNewsCardProps {
  title: string;
  meta: string;
  href?: string;
  imageSrc?: string;
  badge?: string;
  compact?: boolean;
  /** Mobile coverflow: the snapped slide is larger than the peeks. */
  featured?: boolean;
}

/** Figma Blog Component ON_HOVER → Property 1=4, Smart Animate, Ease Out, 300ms. */
const CARD_EASE = 'transition-[opacity,color] duration-300 ease-out motion-reduce:transition-none';

/**
 * Article tile for the navy news band. Image is 544×431 with only the
 * top-right corner rounded to 100px, per Figma node 13:496.
 */
export const LatestNewsCard: React.FC<LatestNewsCardProps> = ({
  title,
  meta,
  href = '/newsroom',
  imageSrc,
  badge,
  compact = false,
  featured = false,
}) => {
  const mobileFeatured = compact && featured;
  const mobilePeek = compact && !featured;
  const imageRadius = mobileFeatured
    ? 'rounded-tr-[3.78rem]'
    : mobilePeek
      ? 'rounded-tr-[2.55rem]'
      : compact
        ? 'rounded-tr-[2.55rem]'
        : 'rounded-tr-[6.25rem]';

  return (
  <article className={`group relative flex w-full flex-col ${compact ? '' : 'max-w-[34rem]'}`}>
    <div className={`relative overflow-hidden ${imageRadius}`}>
      <MediaFrame
        src={imageSrc}
        alt=""
      pendingLabel="news-photo"
      tone="navyCard"
      sizes="(max-width: 1280px) 100vw, 544px"
      imageClassName="object-cover!"
      className={`aspect-[544/431] w-full rounded-none border-0 bg-transparent ${imageRadius}`}
    />
      <div
        className={`latest-news-card__wash pointer-events-none absolute inset-0 opacity-0 ${CARD_EASE} group-hover:opacity-[0.45] group-focus-within:opacity-[0.45]`}
        aria-hidden="true"
      />
      {badge && (
        <span className={`absolute z-10 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md opacity-50 ${CARD_EASE} group-hover:opacity-100 group-focus-within:opacity-100 ${
          mobileFeatured
            ? 'left-[0.45rem] top-[0.45rem] px-[0.378rem] py-[0.227rem] font-serif text-[0.756rem] leading-[1.134rem]'
            : mobilePeek
              ? 'left-[0.306rem] top-[0.306rem] px-[0.255rem] py-[0.153rem] font-serif text-[0.511rem] leading-[0.766rem]'
              : compact
                ? 'left-2 top-2 px-2 py-0.5 text-[0.75rem]'
                : 'left-6 top-6 px-4 py-1.5 text-xs'
        }`}>
          {badge}
        </span>
      )}
    </div>

    <div className={`flex items-center justify-between gap-4 ${
      mobileFeatured ? 'mt-[1.134rem]' : mobilePeek ? 'mt-[0.766rem]' : compact ? 'mt-3' : 'mt-7'
    }`}>
      <p className={`min-w-0 truncate text-brand-on-dark ${
        mobileFeatured
          ? 'text-[0.832rem] leading-[1.5]'
          : mobilePeek
            ? 'text-[0.562rem] leading-[1.5]'
            : compact
              ? 'text-[0.831rem] leading-[1.5]'
              : 'text-body'
      }`}>{meta}</p>
      {compact ? (
        <NewsArrowIcon
          className={`shrink-0 text-[#e3e3e3] ${
            mobileFeatured ? 'h-5 w-[1.21rem]' : 'h-[0.843rem] w-[0.817rem]'
          }`}
        />
      ) : (
        <span className="relative h-[2.0625rem] w-8 shrink-0" aria-hidden="true">
          <MediaFrame
            src="/images/news-arrow.svg"
            alt=""
            pendingLabel="arrow"
            unoptimized
            sizes="32px"
            imageClassName="object-contain!"
            className="size-full border-0 bg-transparent"
          />
        </span>
      )}
    </div>

    <Heading
      level={3}
      size="subtitle"
      tone="onDark"
      className={`${CARD_EASE} group-hover:text-brand-red group-focus-within:text-brand-red ${
        mobileFeatured
          ? 'mt-[0.454rem] text-[1.663rem]! leading-[1.2]!'
          : mobilePeek
            ? 'mt-[0.306rem] text-[1.124rem]! leading-[1.2]!'
            : compact
              ? 'mt-2 text-[1.663rem]! leading-[1.2]!'
              : 'mt-3'
      }`}
    >
      <GeneralLink
        href={href}
        variant="unstyled"
        className="after:absolute after:inset-0"
      >
        {title}
      </GeneralLink>
    </Heading>
  </article>
  );
};
