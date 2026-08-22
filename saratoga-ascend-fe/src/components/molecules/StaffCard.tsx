import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';
import { GeneralLink } from '../atoms/GeneralLink';
import { CircleControl } from './CircleControl';

/** Both card variants share this footprint so a mixed row stays aligned. */
const cardShell =
  'relative aspect-[4/3] overflow-hidden rounded-card-sm shadow-card';

export interface StaffPhotoCardProps {
  /** Omit while the photo is still pending. */
  imageSrc?: string;
  imageAlt: string;
  /** Filename shown on the placeholder until `imageSrc` is supplied. */
  imagePendingLabel?: string;
  title: React.ReactNode;
  body: React.ReactNode;
  /** `dark` is the heavier scrim used on the second card in the design. */
  overlay?: 'default' | 'dark';
  /** A play control opens the story video, a link jumps to the service page. */
  action: { kind: 'play'; label: string } | { kind: 'link'; href: string; label: string };
}

const overlayStyles: Record<NonNullable<StaffPhotoCardProps['overlay']>, string> = {
  default: 'bg-gradient-to-t from-brand-navy via-brand-navy/25 to-transparent',
  dark: 'bg-gradient-to-t from-brand-navy-card/95 via-brand-navy-card/55 to-brand-navy-card/10',
};

export const StaffPhotoCard: React.FC<StaffPhotoCardProps> = ({
  imageSrc,
  imageAlt,
  imagePendingLabel,
  title,
  body,
  overlay = 'default',
  action,
}) => (
  <article className={`${cardShell} bg-brand-navy text-brand-on-dark`}>
    <MediaFrame
      src={imageSrc}
      alt={imageAlt}
      pendingLabel={imagePendingLabel}
      tone="navy"
      sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="absolute inset-0 size-full border-0"
    />

    <div className={`absolute inset-0 ${overlayStyles[overlay]}`} aria-hidden="true" />

    <div className="absolute inset-x-0 bottom-0 z-2 flex items-end justify-between gap-3 p-4">
      <div className="min-w-0">
        <h3 className="font-serif text-subtitle leading-tight">{title}</h3>
        <p className="mt-1 text-caption text-brand-on-dark-muted">{body}</p>
      </div>

      {action.kind === 'play' ? (
        <CircleControl
          label={action.label}
          direction="next"
          tone="cardPlayPhoto"
          className="shrink-0"
        />
      ) : (
        <GeneralLink
          href={action.href}
          variant="unstyled"
          aria-label={action.label}
          className="block size-8 shrink-0 text-brand-on-dark"
        >
          <svg viewBox="0 0 40 40" className="block size-full" aria-hidden="true">
            <path
              d="M12 28L28 12M17 12H28V23"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </GeneralLink>
      )}
    </div>
  </article>
);

export interface StaffInfoCardProps {
  title: React.ReactNode;
  body: React.ReactNode;
  playLabel: string;
  /** The active slide carries a sky outline in the design. */
  selected?: boolean;
}

export const StaffInfoCard: React.FC<StaffInfoCardProps> = ({
  title,
  body,
  playLabel,
  selected = false,
}) => (
  <article
    className={`${cardShell} bg-card-tint ${selected ? 'outline-2 outline-brand-sky' : ''}`}
  >
    <div className="absolute inset-x-0 top-0 z-3 p-4">
      <h3 className="font-serif text-subtitle leading-tight text-brand-navy">{title}</h3>
      <p className="mt-1.5 text-caption text-brand-red">{body}</p>
    </div>

    <div
      className="absolute right-4 bottom-4 z-2 size-[38%] text-brand-sky"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="block size-full">
        <circle cx="50" cy="50" r="39" fill="currentColor" />
        <path
          d="M30 50C30 39 44 35 50 44C56 35 70 39 70 50C70 62 50 73 50 73C50 73 30 62 30 50Z"
          fill="none"
          stroke="var(--color-brand-surface)"
          strokeWidth="5"
        />
        <path
          d="M38 51H45L48 45L53 58L56 51H63"
          fill="none"
          stroke="var(--color-brand-surface)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    <CircleControl
      label={playLabel}
      direction="next"
      tone="cardPlayInfo"
      className="absolute bottom-4 left-4 z-5"
    />
  </article>
);
