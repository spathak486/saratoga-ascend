import React from 'react';
import { Heading } from '../atoms/Heading';
import { MediaFrame } from '../atoms/MediaFrame';

export interface AchievementCardProps {
  year: string;
  /** Omit while the seal artwork is still pending. */
  badgeSrc?: string;
  badgeAlt: string;
  /** Filename shown on the placeholder until `badgeSrc` is supplied. */
  badgePendingLabel?: string;
  /** `portrait` is the taller WOSB seal, `square` the Joint Commission mark. */
  badgeShape?: 'square' | 'portrait';
  title: React.ReactNode;
  body: React.ReactNode;
}

/* Both seals are 145px wide on the artboard; the WOSB one is taller and sits
   a few pixels further into the corner to keep its optical margin even. */
const badgeShapeStyles: Record<
  NonNullable<AchievementCardProps['badgeShape']>,
  string
> = {
  square: 'aspect-square right-[clamp(0.75rem,0.5687rem+0.7767vw,1.5625rem)]',
  portrait:
    'aspect-[145/175] right-[clamp(0.625rem,0.4664rem+0.6796vw,1.375rem)]',
};

export const AchievementCard: React.FC<AchievementCardProps> = ({
  year,
  badgeSrc,
  badgeAlt,
  badgePendingLabel,
  badgeShape = 'square',
  title,
  body,
}) => (
  <article className="bg-award-card rounded-award relative flex min-h-[clamp(17.5rem,15.831rem+7.1198vw,24.375rem)] flex-col justify-between overflow-hidden border-2 border-brand-on-dark/95 px-[clamp(1.25rem,0.9921rem+1.1003vw,2.3125rem)] pt-[clamp(1.75rem,1.3707rem+1.6181vw,3.3125rem)] pb-[clamp(1.25rem,0.977rem+1.165vw,2.375rem)] backdrop-blur-[5px]">
    <p className="font-serif text-body text-brand-on-dark">{year}</p>

    {/* Positioned rather than laid out: the seal overhangs the card's top
        padding on the artboard and is clipped by the rounded corner. The
        wrapper carries the positioning because `MediaFrame` sets `relative`
        on its own box. */}
    <div
      className={`absolute top-[clamp(1rem,0.7573rem+1.0356vw,2.5rem)] w-[clamp(5rem,4.0139rem+4.2071vw,9.0625rem)] ${badgeShapeStyles[badgeShape]}`}
    >
      <MediaFrame
        src={badgeSrc}
        alt={badgeAlt}
        pendingLabel={badgePendingLabel}
        tone="navyCard"
        sizes="145px"
        imageClassName="object-contain!"
        className="size-full border-0 bg-transparent"
      />
    </div>

    <div className="max-w-[26ch]">
      <Heading level={3} size="award" font="serif" tone="onDark">
        {title}
      </Heading>
      <p className="mt-[clamp(0.625rem,0.5188rem+0.4531vw,1.0625rem)] text-body leading-[1.18] tracking-[0.2px] text-brand-on-dark">
        {body}
      </p>
    </div>
  </article>
);
