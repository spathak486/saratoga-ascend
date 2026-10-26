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

/**
 * Article tile for the navy news band. Image is 544×431 with only the
 * top-right corner rounded to 100px, per Figma node 2243:3792 / Blog Component.
 * Hover (property1=4): title → brand-red, navy wash on image, badge full opacity.
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

  const radiusClass = mobileFeatured
    ? 'rounded-tr-[3.78rem]'
    : mobilePeek
      ? 'rounded-tr-[2.55rem]'
      : compact
        ? 'rounded-tr-[2.55rem]'
        : 'rounded-tr-[6.25rem]';

  return (
    <article
      className={`group relative flex w-full flex-col ${compact ? '' : 'max-w-[34rem]'}`}
    >
      <div className={`relative overflow-hidden ${radiusClass}`}>
        <MediaFrame
          src={imageSrc}
          alt=""
          pendingLabel="news-photo"
          tone="navyCard"
          sizes="(max-width: 1280px) 100vw, 544px"
          imageClassName="object-cover!"
          className={`aspect-[544/431] w-full rounded-none border-0 bg-transparent ${radiusClass}`}
        />
        {/* Figma Blog Component property1=4 — Rectangle wash, opacity 45% */}
        <div
          aria-hidden
          className={`latest-news-card__wash pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-150 group-hover:opacity-45 group-focus-within:opacity-45 motion-reduce:transition-none ${radiusClass}`}
        />
        {badge && (
          <span
            className={`absolute z-10 rounded-full bg-white/10 text-white backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none ${
              mobileFeatured
                ? 'left-[0.45rem] top-[0.45rem] px-[0.378rem] py-[0.227rem] font-serif text-[0.756rem] leading-[1.134rem] opacity-50'
                : mobilePeek
                  ? 'left-[0.306rem] top-[0.306rem] px-[0.255rem] py-[0.153rem] font-serif text-[0.511rem] leading-[0.766rem] opacity-50'
                  : compact
                    ? 'left-2 top-2 px-2 py-0.5 text-[0.75rem] opacity-50'
                    : 'left-3 top-3 px-2.5 py-1.5 font-serif text-[1.25rem] leading-[1.875rem] opacity-50'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <div
        className={`flex flex-col ${
          mobileFeatured
            ? 'mt-[1.134rem] gap-[0.454rem]'
            : mobilePeek
              ? 'mt-[0.766rem] gap-[0.306rem]'
              : compact
                ? 'mt-3 gap-2'
                : 'mt-[1.875rem] gap-3'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <p
            className={`min-w-0 truncate text-brand-on-dark ${
              mobileFeatured
                ? 'text-[0.832rem] leading-[1.5]'
                : mobilePeek
                  ? 'text-[0.562rem] leading-[1.5]'
                  : compact
                    ? 'text-[0.831rem] leading-[1.5]'
                    : 'text-body'
            }`}
          >
            {meta}
          </p>
          <NewsArrowIcon
            className={`shrink-0 text-brand-hairline ${
              mobileFeatured
                ? 'h-5 w-[1.21rem]'
                : mobilePeek || compact
                  ? 'h-[0.843rem] w-[0.817rem]'
                  : 'h-[2.0625rem] w-8'
            }`}
          />
        </div>

        <Heading
          level={3}
          size="subtitle"
          tone="onDark"
          className={
            mobileFeatured
              ? 'text-[1.663rem]! leading-[1.2]!'
              : mobilePeek
                ? 'text-[1.124rem]! leading-[1.2]!'
                : compact
                  ? 'text-[1.663rem]! leading-[1.2]!'
                  : undefined
          }
        >
          <GeneralLink
            href={href}
            variant="unstyled"
            className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-brand-red group-focus-within:text-brand-red motion-reduce:transition-none"
          >
            {title}
          </GeneralLink>
        </Heading>
      </div>
    </article>
  );
};
