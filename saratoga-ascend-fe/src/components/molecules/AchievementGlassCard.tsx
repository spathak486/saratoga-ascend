import React from 'react';
import { Heading, MediaFrame } from '../atoms';

export interface AchievementGlassCardProps {
  year: string;
  title: React.ReactNode;
  body: string;
  badgeSrc?: string;
  badgeAlt: string;
  badgeShape?: 'round' | 'portrait';
}

function Badge({
  src,
  alt,
  shape,
  className,
}: {
  src?: string;
  alt: string;
  shape: 'round' | 'portrait';
  className: string;
}) {
  return (
    <div className={className}>
      <MediaFrame
        src={src}
        alt={alt}
        pendingLabel={alt}
        tone="navyCard"
        sizes="250px"
        imageClassName="object-cover!"
        className="size-full border-0 bg-transparent"
      />
    </div>
  );
}

/**
 * Figma node 1:414 — 828×538 frosted plate on desktop. Below `xl` the same
 * content stacks so the year, seal and 60px title stay readable.
 */
export const AchievementGlassCard: React.FC<AchievementGlassCardProps> = ({
  year,
  title,
  body,
  badgeSrc,
  badgeAlt,
  badgeShape = 'round',
}) => (
  <article className="relative w-full rounded-panel border-2 border-white bg-ink/10 backdrop-blur-[12px] xl:aspect-[828/538]">
    <div className="size-full overflow-hidden rounded-[inherit]">
    <div className="flex flex-col gap-4 p-5 sm:p-6 xl:hidden">
      <div className="flex items-start justify-between gap-4">
        <p className="pt-1 font-bold leading-[1.2] text-[clamp(1.125rem,4vw,1.5rem)] text-white">
          {year}
        </p>
        <Badge
          src={badgeSrc}
          alt={badgeAlt}
          shape={badgeShape}
          className={
            badgeShape === 'round'
              ? 'size-20 shrink-0 overflow-hidden rounded-full shadow-[5.37px_4.6px_11.5px_3.83px_rgb(0_0_0/0.25)] sm:size-24'
              : 'h-24 w-[4.75rem] shrink-0 shadow-[0_2.89px_2.89px_rgb(0_0_0/0.25)] sm:h-28 sm:w-[5.5rem]'
          }
        />
      </div>

      <Heading level={3} size="feature" tone="onDark" className="text-white">
        {title}
      </Heading>

      <p className="text-body font-medium text-white">{body}</p>
    </div>

    <p className="absolute top-[11.15%] left-[7.25%] hidden font-bold leading-[1.2] text-[clamp(1.125rem,0.974rem+0.647vw,1.75rem)] text-white xl:block">
      {year}
    </p>

    <Badge
      src={badgeSrc}
      alt={badgeAlt}
      shape={badgeShape}
      className={
        badgeShape === 'round'
          ? 'absolute top-[11.15%] right-[7.25%] hidden aspect-square h-[46.47%] overflow-hidden rounded-full shadow-[5.37px_4.6px_11.5px_3.83px_rgb(0_0_0/0.25)] xl:block'
          : 'absolute top-[11.15%] right-[7.25%] hidden h-[46.47%] w-[24.05%] shadow-[0_2.89px_2.89px_rgb(0_0_0/0.25)] xl:block'
      }
    />

    <Heading
      level={3}
      size="feature"
      tone="onDark"
      className="absolute top-[34.94%] left-[7.25%] hidden h-[29%] w-[53.5%] text-white xl:block"
    >
      {title}
    </Heading>

    <p className="absolute top-[67.66%] left-[7.25%] hidden w-[54%] text-body-lg font-medium text-white xl:block">
      {body}
    </p>
    </div>
  </article>
);
