import { stripHtml } from '@/lib/utils/text';
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
  const cleanBody =
    typeof body === 'string'
      ? body
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/gi, ' ')
          .replace(/\s+/g, ' ')
          .trim()
      : body;

  return (
    <article className="relative w-full rounded-panel border-[2px] border-white bg-[rgba(10,10,10,0.1)] backdrop-blur-[12px] xl:aspect-[828/427] max-xl:bg-white/16">
      <div className="size-full overflow-hidden rounded-[inherit]">
        <div className="flex flex-col items-center justify-start gap-3 p-4 xl:hidden">
          <Badge
            src={badgeSrc}
            alt={badgeAlt}
            shape={badgeShape}
            className={
              badgeShape === 'round'
                ? 'size-[11.25rem] shrink-0 overflow-hidden rounded-full shadow-[5.37px_4.6px_11.5px_3.83px_rgb(0_0_0/0.25)]'
                : 'h-[11.25rem] w-[8.96rem] shrink-0 shadow-[0_2.89px_2.89px_rgb(0_0_0/0.25)]'
            }
          />
          <div className="flex w-full min-w-0 flex-col gap-3">
            <p className="font-sans text-[1.5rem] font-bold leading-[1.2] text-white">
              {year}
            </p>
            <Heading
              level={3}
              size="section"
              tone="onDark"
              className="line-clamp-2 min-w-0 text-[1.75rem]! leading-[1.25]! text-white"
            >
              {stripHtml(title)}
            </Heading>
            <p className="line-clamp-3 min-w-0 break-words font-sans text-base font-normal leading-6 text-white">
              {cleanBody}
            </p>
          </div>
        </div>

        <p className="absolute top-[14%] left-[7.246%] hidden font-sans text-[clamp(1.125rem,0.974rem+0.647vw,1.75rem)] font-bold leading-[1.2] text-white xl:block">
          {year}
        </p>

        <Badge
          src={badgeSrc}
          alt={badgeAlt}
          shape={badgeShape}
          className={
            badgeShape === 'round'
              ? 'absolute top-[20.84%] right-[6.52%] hidden aspect-square w-[30.67%] overflow-hidden rounded-full shadow-[5.37px_4.6px_11.5px_3.83px_rgb(0_0_0/0.25)] xl:block'
              : 'absolute top-[20.84%] right-[6.52%] hidden h-[58.45%] w-[24.01%] shadow-[0_2.89px_2.89px_rgb(0_0_0/0.25)] xl:block'
          }
        />

        {/* Avoid max-h + overflow-hidden — they clip serif descenders (g, y, f). */}
        <Heading
          level={3}
          size="feature"
          tone="onDark"
          className="absolute top-[20.84%] left-[7.246%] hidden w-[53.5%] min-w-0 text-white xl:block! xl:line-clamp-2 xl:leading-[1.25] xl:pb-[0.15em]"
        >
          {stripHtml(title)}
        </Heading>

        {/* Cap at 3 lines + bottom inset so body never spills the plate at 100%. */}
        <p className="absolute top-[59.25%] bottom-[6.5%] left-[7.246%] hidden w-[53.5%] min-w-0 break-words font-sans text-body-lg font-medium leading-[1.45] text-white xl:line-clamp-3 xl:block">
          {cleanBody}
        </p>
      </div>
    </article>
  );
};
