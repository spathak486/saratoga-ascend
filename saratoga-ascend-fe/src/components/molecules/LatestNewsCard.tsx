import React from 'react';
import { GeneralLink } from '../atoms/GeneralLink';
import { Heading } from '../atoms/Heading';
import { MediaFrame } from '../atoms/MediaFrame';
import { NewsArrowIcon } from '../atoms/icons';

export interface LatestNewsCardProps {
  title: string;
  meta: string;
  href?: string;
  /** CMS `featuredImage.url` — render as-is, do not replace. */
  imageSrc?: string;
  /** CMS `category` label shown in the photo pill. */
  category?: string;
}

/** Figma Blog Component: Smart animate, ease-out, 300ms. */
const CARD_EASE =
  'transition-[opacity,color] duration-300 ease-out motion-reduce:transition-none';

/**
 * Article tile for Latest news (Figma 2002:1140). Image is 544×431 with only
 * the top-right corner at 100px. Hover smart-animates a navy wash, the title
 * to brand red, and the category pill to full opacity.
 */
export const LatestNewsCard: React.FC<LatestNewsCardProps> = ({
  title,
  meta,
  href = '/newsroom',
  imageSrc,
  category,
}) => (
  <article className="group relative flex w-full flex-col gap-[1.875rem]">
    <div className="relative aspect-[544/431] w-full shrink-0 overflow-hidden rounded-tr-[6.25rem]">
      <MediaFrame
        src={imageSrc}
        alt=""
        pendingLabel="news-photo"
        tone="navyCard"
        sizes="(max-width: 1280px) 100vw, 544px"
        imageClassName="object-cover!"
        className="size-full rounded-none rounded-tr-[6.25rem] border-0 bg-transparent!"
      />

      <div
        className={`latest-news-card__wash pointer-events-none absolute inset-0 rounded-tr-[6.25rem] opacity-0 ${CARD_EASE} group-hover:opacity-[0.45] group-focus-within:opacity-[0.45]`}
        aria-hidden="true"
      />

      {category ? (
        <span
          className={`absolute top-3 left-3 inline-flex items-center justify-center rounded-pill bg-white/10 px-2.5 py-1.5 font-serif text-[1.25rem] leading-[1.875rem] text-white opacity-50 backdrop-blur-[4px] ${CARD_EASE} group-hover:opacity-100 group-focus-within:opacity-100`}
        >
          {category}
        </span>
      ) : null}
    </div>

    <div className="flex flex-col items-start gap-3">
      <div className="flex w-full items-center justify-between gap-4">
        <p className="text-body text-white">{meta}</p>
        <NewsArrowIcon className="h-[33px] w-8 shrink-0 text-brand-hairline" />
      </div>

      <Heading
        level={3}
        size="subtitle"
        tone="onDark"
        className={`${CARD_EASE} group-hover:text-brand-red group-focus-within:text-brand-red`}
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
