import React from 'react';
import { GlobalImage } from '../atoms/GlobalImage';

export interface AchievementCardProps {
  year: string;
  badgeSrc: string;
  badgeAlt: string;
  /** `portrait` is the taller WOSB seal, `square` the Joint Commission mark. */
  badgeShape?: 'square' | 'portrait';
  title: React.ReactNode;
  body: React.ReactNode;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  year,
  badgeSrc,
  badgeAlt,
  badgeShape = 'square',
  title,
  body,
}) => {
  return (
    <article className="relative h-[320px] overflow-hidden rounded-[25px] border-2 border-white/95 bg-[linear-gradient(135deg,rgba(180,30,57,0.45),rgba(24,75,102,0.38))] backdrop-blur-[5px] min-[481px]:h-[340px] min-[481px]:rounded-[36px] min-[751px]:h-[390px]">
      <p className="absolute top-[52px] left-[28px] font-serif text-[18px] min-[1001px]:left-[37px]">
        {year}
      </p>

      <div
        className={`absolute top-10 flex h-[120px] w-[100px] items-center justify-center ${
          badgeShape === 'portrait'
            ? 'right-[22px] min-[481px]:h-[175px] min-[481px]:w-[145px]'
            : 'right-[25px] min-[481px]:size-[145px]'
        }`}
      >
        <GlobalImage
          src={badgeSrc}
          alt={badgeAlt}
          fill
          sizes="145px"
          className="object-contain!"
          containerClassName="size-full"
        />
      </div>

      <div className="absolute bottom-[38px] left-[28px] min-[1001px]:left-[37px]">
        <h3 className="mb-[17px] font-serif text-[26px] leading-[1.03] font-normal min-[481px]:text-[30px] min-[1001px]:text-[35px]">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.18] tracking-[0.2px] min-[481px]:text-[17px]">
          {body}
        </p>
      </div>
    </article>
  );
};
