import React from 'react';
import { ArrowUpRightIcon } from '../atoms/icons';
import { GeneralLink } from '../atoms/GeneralLink';
import { Heading } from '../atoms/Heading';
import { MediaFrame } from '../atoms/MediaFrame';

export interface LatestNewsCardProps {
  title: string;
  meta: string;
  href?: string;
  imageSrc?: string;
}

/**
 * Article tile for the gradient news band. Image is 544×431 with only the
 * top-right corner rounded to 100px, per Figma node 1:446.
 */
export const LatestNewsCard: React.FC<LatestNewsCardProps> = ({
  title,
  meta,
  href = '/newsroom',
  imageSrc,
}) => (
  <article className="group relative flex w-full max-w-[34rem] flex-col">
    <MediaFrame
      src={imageSrc}
      alt=""
      pendingLabel="news-photo"
      tone="navyCard"
      sizes="(max-width: 1280px) 100vw, 544px"
      imageClassName="object-cover!"
      className="aspect-[544/431] w-full rounded-none rounded-tr-[6.25rem] border-0"
    />

    <div className="mt-7 flex items-center justify-between gap-4">
      <p className="text-body text-white">{meta}</p>
      <ArrowUpRightIcon className="size-8 shrink-0 text-white" />
    </div>

    <Heading level={3} size="subtitle" tone="onDark" className="mt-3 text-white">
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
