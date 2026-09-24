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
  videoSrc?: string;
  serviceLines?: ServiceLine[];
  ctaLabel?: string;
  ctaHref?: string;
  videoCopy?: string;
}

const DEFAULT_TITLE = 'What We Do';
const DEFAULT_DESCRIPTION =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';
const DEFAULT_VIDEO_COPY =
  'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web development to showcase layouts and visual elements without the distraction of meaningful content.';

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  photoSrc = '/images/what-we-do-doctor.png',
  emblemSrc,
  videoSrc = '/images/butterfly-gif.mp4',
  serviceLines,
  ctaLabel = 'About us',
  ctaHref = '/about',
  videoCopy,
}) => {
  const displayLines = serviceLines && serviceLines.length > 0 ? serviceLines : [];

  return (
    <Section
      aria-labelledby="what-we-do-heading"
      tone="surface"
      spacing="none"
      className="py-10"
    >
      <div className="flex flex-col gap-10">
        <SectionIntro
          id="what-we-do-heading"
          title={title}
          description={description}
          align="center"
          wide
          titleTone="inherit"
          titleClassName="text-brand-cta-from"
          descriptionSize="sectionLead"
          descriptionStyle={{ color: 'var(--color-ink)' }}
          action={{ href: ctaHref, label: ctaLabel }}
        />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 xl:items-stretch">
          {photoSrc ? (
            <div className="relative aspect-[4096/2731] overflow-hidden rounded-frame xl:aspect-auto xl:min-h-[39.625rem]">
              <MediaFrame
                src={photoSrc}
                alt="Healthcare professional in a clinical setting"
                pendingLabel="photo"
                tone="navy"
                sizes="(max-width: 1280px) 100vw, 34vw"
                imageClassName="object-cover!"
                className="size-full border-0 bg-transparent"
              />
            </div>
          ) : null}

          {displayLines.length > 0 ? <ServiceLineCard lines={displayLines} /> : null}

          <EmblemPanel
            emblemSrc={emblemSrc}
            videoSrc={videoSrc}
            paragraphs={videoCopy ? [videoCopy] : undefined}
          />
        </div>
      </div>
    </Section>
  );
};
