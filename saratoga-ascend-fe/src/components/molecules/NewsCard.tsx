import React from 'react';
import { GeneralLink } from '../atoms/GeneralLink';
import { MediaFrame } from '../atoms/MediaFrame';

export interface NewsCardProps {
  title: string;
  /** Article destination. Omit to render the card as static placeholder. */
  href?: string;
  /** Date, category, or read time shown above the headline. */
  meta?: string;
  imageSrc?: string;
  imagePendingLabel?: string;
}

/**
 * Article teaser for the news band. The image is decorative — the headline is
 * the link, and it stretches over the whole card so the photo is clickable
 * without adding a second tab stop or a duplicate accessible name.
 */
export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  href,
  meta,
  imageSrc,
  imagePendingLabel,
}) => (
  <article className="group relative flex h-full flex-col">
    <MediaFrame
      src={imageSrc}
      alt=""
      pendingLabel={imagePendingLabel}
      tone="navyCard"
      sizes="(max-width: 768px) 100vw, 45vw"
      className="aspect-[16/10] w-full rounded-l-card-sm rounded-r-sweep"
    />

    <div className="mt-[clamp(0.875rem,1.5vw,1.25rem)]">
      {meta && <p className="text-caption text-brand-on-dark-muted">{meta}</p>}

      <h3 className="mt-1 text-body-lg text-brand-on-dark">
        {href ? (
          <GeneralLink
            href={href}
            variant="unstyled"
            className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-brand-red"
          >
            {title}
          </GeneralLink>
        ) : (
          title
        )}
      </h3>
    </div>
  </article>
);
