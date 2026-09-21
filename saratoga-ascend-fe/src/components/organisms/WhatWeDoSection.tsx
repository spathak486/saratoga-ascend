import React from 'react';
import { MediaFrame, Section } from '../atoms';
import { EmblemPanel } from '../molecules/EmblemPanel';
import { SectionIntro } from '../molecules/SectionIntro';
import {
  ServiceLineCard,
  type ServiceLine,
} from '../molecules/ServiceLineCard';

export interface WhatWeDoSectionProps {
  title?: string;
  description?: string;
  photoSrc?: string;
  emblemSrc?: string;
  serviceLines?: ServiceLine[];
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({
  title,
  description,
  photoSrc,
  emblemSrc,
  serviceLines,
}) => {
  const displayLines = serviceLines && serviceLines.length > 0 ? serviceLines : [];
  return (
    <Section
      aria-labelledby="what-we-do-heading"
      tone="surface"
      spacing="lg"
    >
      <div className="flex flex-col gap-block">
        {(title || description) ? (
          <SectionIntro
            id="what-we-do-heading"
            title={title ?? ''}
            description={description ?? ''}
            align="center"
            descriptionStyle={{ color: 'var(--color-ink)' }}
          />
        ) : null}

        <div className="grid grid-cols-1 gap-grid xl:grid-cols-3">
          {/* Left — medical photo fills its column edge-to-edge, matching the
              Figma crop (no bleed past the grid track). */}
          {photoSrc ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-brand-line xl:aspect-auto xl:min-h-[clamp(28rem,34.58vw,41.5rem)]">
              <MediaFrame
                src={photoSrc}
                alt="Healthcare professionals at work"
                pendingLabel="photo"
                tone="navy"
                sizes="(max-width: 1280px) 100vw, 34vw"
                imageClassName="object-cover! !inset-auto max-w-none left-[-33.75%] top-[-6.24%] h-[110.68%] w-[202.62%]"
                className="size-full border-0 bg-transparent xl:absolute xl:inset-0"
              />
            </div>
          ) : null}

          {displayLines.length > 0 ? <ServiceLineCard lines={displayLines} /> : null}

          <EmblemPanel emblemSrc={emblemSrc} />
        </div>
      </div>
    </Section>
  );
};
