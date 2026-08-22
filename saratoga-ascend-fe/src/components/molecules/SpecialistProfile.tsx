import React from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface SpecialistProfileProps {
  /** The role headline, shown in red — e.g. "Registered Nurse". */
  role: string;
  body: React.ReactNode;
  portraitSrc?: string;
  portraitAlt?: string;
  /** Filename shown on the placeholder until `portraitSrc` is supplied. */
  portraitPendingLabel?: string;
}

export const SpecialistProfile: React.FC<SpecialistProfileProps> = ({
  role,
  body,
  portraitSrc,
  portraitAlt,
  portraitPendingLabel,
}) => (
  <article className="grid items-center gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
    {/*
      Near-black mount that sits proud of the grey plate behind it — the
      vertical padding here is what makes the card break out top and bottom.
    */}
    <div className="rounded-media bg-brand-navy-deep p-[clamp(0.5rem,0.9vw,0.875rem)]">
      <MediaFrame
        src={portraitSrc}
        alt={portraitAlt ?? role}
        pendingLabel={portraitPendingLabel}
        tone="navyCard"
        sizes="(max-width: 1024px) 100vw, 17rem"
        className="aspect-square w-full rounded-[calc(var(--radius-media)-0.375rem)]"
      />
    </div>

    <div className="max-w-[38ch]">
      <h3 className="font-serif text-subtitle leading-tight text-brand-red">{role}</h3>

      <div className="mt-4 flex flex-col gap-3 text-body text-brand-red">{body}</div>
    </div>
  </article>
);
