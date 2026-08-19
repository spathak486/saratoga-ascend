import React from 'react';
import { GlobalImage } from '../atoms/GlobalImage';
import { GeneralLink } from '../atoms/GeneralLink';
import { CircleControl } from './CircleControl';

const cardShell =
  'relative h-[300px] overflow-hidden rounded-[13px] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.20)] min-[481px]:h-[230px]';

export interface StaffPhotoCardProps {
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  body: React.ReactNode;
  /** `dark` is the flatter, heavier scrim used on the second card. */
  overlay?: 'default' | 'dark';
  /** A play control opens the story video, a link jumps to the service page. */
  action: { kind: 'play'; label: string } | { kind: 'link'; href: string; label: string };
}

export const StaffPhotoCard: React.FC<StaffPhotoCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  body,
  overlay = 'default',
  action,
}) => {
  return (
    <article className={`${cardShell} text-white`}>
      <GlobalImage
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 480px) 100vw, (max-width: 750px) 50vw, 230px"
        containerClassName="absolute inset-0 size-full"
      />

      <div
        className={`absolute inset-0 ${
          overlay === 'dark'
            ? 'bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,51,79,0.90))]'
            : 'bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_20%,rgba(0,46,73,0.20)_42%,rgba(0,44,69,0.95)_100%)]'
        }`}
        aria-hidden="true"
      />

      <div className="absolute right-3 bottom-[17px] left-[18px] z-2">
        <h3 className="mb-[5px] text-[25px] leading-[1.08] font-normal">{title}</h3>
        <p className="text-[11px] leading-[1.15]">{body}</p>
      </div>

      {action.kind === 'play' ? (
        <CircleControl
          label={action.label}
          direction="next"
          tone="cardPlayPhoto"
          className="absolute right-2 bottom-[14px] z-5"
        />
      ) : (
        <GeneralLink
          href={action.href}
          variant="unstyled"
          aria-label={action.label}
          className="absolute right-[17px] bottom-[18px] z-5 block size-[30px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 40 40" className="block size-full" aria-hidden="true">
            <path
              d="M12 28L28 12M17 12H28V23"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </GeneralLink>
      )}
    </article>
  );
};

export interface StaffInfoCardProps {
  title: React.ReactNode;
  body: React.ReactNode;
  playLabel: string;
  /** The active slide carries a blue outline in the design. */
  selected?: boolean;
}

export const StaffInfoCard: React.FC<StaffInfoCardProps> = ({
  title,
  body,
  playLabel,
  selected = false,
}) => {
  return (
    <article
      className={`${cardShell} bg-[image:radial-gradient(circle_at_85%_90%,rgba(242,30,55,0.25),transparent_35%),radial-gradient(circle_at_60%_25%,rgba(100,190,235,0.18),transparent_35%)] ${
        selected ? 'border-2 border-[#1597e6]' : ''
      }`}
    >
      <div className="absolute top-5 left-[25px] z-3">
        <h3 className="text-[26px] leading-[1.05] font-normal text-[#050505]">{title}</h3>
        <p className="mt-[7px] text-[10px] leading-[1.05] text-[#f21b31]">{body}</p>
      </div>

      <div className="absolute right-[17px] bottom-[15px] z-2 size-[92px]" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="block size-full">
          <circle cx="50" cy="50" r="39" fill="#8bd9f6" />
          <path
            d="M30 50C30 39 44 35 50 44C56 35 70 39 70 50C70 62 50 73 50 73C50 73 30 62 30 50Z"
            fill="none"
            stroke="#fff"
            strokeWidth="5"
          />
          <path
            d="M38 51H45L48 45L53 58L56 51H63"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-[-25px] left-[-20px] h-[65px] w-[115px] bg-[#f42a3c] opacity-[0.22] blur-[25px]"
        aria-hidden="true"
      />

      <CircleControl
        label={playLabel}
        direction="next"
        tone="cardPlayInfo"
        className="absolute bottom-[15px] left-[10px] z-5"
      />
    </article>
  );
};
