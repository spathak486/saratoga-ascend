import React from 'react';
import { Heading, MediaFrame } from '../atoms';

export interface AchievementGlassCardProps {
  year?: string | null;
  title?: React.ReactNode;
  body?: string | null;
  badgeSrc?: string | null;
  badgeAlt?: string;
  badgeShape?: 'round' | 'portrait';
}

function Badge({
  src,
  alt = '',
  className,
}: {
  src?: string | null;
  alt?: string;
  shape?: 'round' | 'portrait';
  className: string;
}) {
  return (
    <div className={className}>
      <MediaFrame
        src={src ?? undefined}
        alt={alt}
        pendingLabel={alt}
        tone="navyCard"
        sizes="250px"
        imageClassName="object-cover! max-xl:object-contain!"
        className="size-full border-0 bg-transparent"
      />
    </div>
  );
}

/**
 * Figma 2002:1047 — 828×713 frosted plate on desktop. Mobile (2105:733)
 * stacks the 250px seal above year, title, and body.
 */
export const AchievementGlassCard: React.FC<AchievementGlassCardProps> = ({
  year,
  title,
  body,
  badgeSrc,
  badgeAlt,
  badgeShape = 'round',
}) => {
  const cleanBody = typeof body === 'string' ? body.replace(/<[^>]*>/g, '').trim() : body;

  return (
    <article className="relative w-full rounded-panel border-2 border-white bg-ink/10 backdrop-blur-[12px] xl:aspect-[828/713] max-xl:bg-white/16">
      <div className="size-full overflow-hidden rounded-[inherit]">
        <div className="flex flex-col items-center justify-center gap-[1.875rem] p-5 xl:hidden">
          <Badge
            src={badgeSrc}
            alt={badgeAlt}
            shape={badgeShape}
            className={
              badgeShape === 'round'
                ? 'size-[15.625rem] shrink-0 overflow-hidden rounded-full shadow-[5.37px_4.6px_11.5px_3.83px_rgb(0_0_0/0.25)]'
                : 'h-[15.625rem] w-[12.448rem] shrink-0 shadow-[0_2.89px_2.89px_rgb(0_0_0/0.25)]'
            }
          />
          <div className="flex w-full flex-col gap-[1.875rem]">
            <p className="font-sans text-[1.75rem] font-bold leading-[1.2] text-white">
              {year}
            </p>
            <Heading
              level={3}
              size="section"
              tone="onDark"
              className="text-[2rem]! leading-[2.5rem]! text-white"
            >
              {title}
            </Heading>
            <p className="font-sans text-base font-normal leading-5 text-white">
              {cleanBody}
            </p>
          </div>
        </div>

        <p className="absolute top-[8.415%] left-[7.246%] hidden font-sans text-[clamp(1.125rem,0.974rem+0.647vw,1.75rem)] font-bold leading-[1.2] text-white xl:block">
          {year}
        </p>

        <Badge
          src={badgeSrc}
          alt={badgeAlt}
          shape={badgeShape}
          className={
            badgeShape === 'round'
              ? 'absolute top-[8.415%] right-[7.246%] hidden aspect-square w-[38.768%] overflow-hidden rounded-full shadow-[5.37px_4.6px_11.5px_3.83px_rgb(0_0_0/0.25)] xl:block'
              : 'absolute top-[8.415%] right-[7.246%] hidden h-[46.704%] w-[32.005%] shadow-[0_2.89px_2.89px_rgb(0_0_0/0.25)] xl:block'
          }
        />

        <Heading
          level={3}
          size="feature"
          tone="onDark"
          className="absolute top-[45.44%] left-[7.246%] hidden h-[21.88%] w-[53.5%] text-white xl:block"
        >
          {title}
        </Heading>

        <p className="absolute top-[70.13%] left-[7.246%] hidden w-[53.5%] font-sans text-body-lg font-medium leading-[1.6] text-white xl:block">
          {cleanBody}
        </p>
      </div>
    </article>
  );
};
