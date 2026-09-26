'use client';

import React from 'react';
import { MediaFrame, Section } from '../atoms';
import { EmblemPanel } from '../molecules/EmblemPanel';
import { SectionIntro } from '../molecules/SectionIntro';
import {
  ServiceLineCard,
  slidePaneClass,
  useServiceLineSlide,
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

function photoFor(line: ServiceLine | undefined, fallback?: string) {
  return line?.imageSrc ?? fallback;
}

function ServicePhotoCard({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <MediaFrame
      src={src}
      alt={alt}
      pendingLabel="photo"
      tone="navy"
      sizes="(max-width: 1280px) 100vw, 34vw"
      imageClassName="object-cover!"
      className="size-full border-0 bg-transparent"
    />
  );
}

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
  const slide = useServiceLineSlide(displayLines.length);
  const { index, fromIndex, dir, moved } = slide;
  const isSliding = fromIndex !== null;

  const currentSrc = photoFor(displayLines[index], photoSrc);
  const outgoingSrc = isSliding ? photoFor(displayLines[fromIndex], photoSrc) : currentSrc;
  const showPhoto = Boolean(currentSrc || outgoingSrc);

  return (
    <Section
      aria-labelledby="what-we-do-heading"
      tone="surface"
      spacing="none"
      className="mt-10 py-10"
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
          className="gap-3 lg:gap-[1.875rem]"
        />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 xl:items-stretch">
          {showPhoto ? (
            <div className="relative aspect-[4096/2731] overflow-hidden rounded-frame bg-white xl:aspect-auto xl:min-h-[39.625rem]">
              <div className={`size-full ${isSliding ? 'invisible' : ''}`}>
                {outgoingSrc ? (
                  <ServicePhotoCard src={outgoingSrc} alt="Healthcare professionals at work" />
                ) : null}
              </div>

              {isSliding && outgoingSrc && currentSrc ? (
                <>
                  <div className={slidePaneClass('outgoing', dir, moved)} aria-hidden="true">
                    <ServicePhotoCard src={outgoingSrc} alt="" />
                  </div>
                  <div className={slidePaneClass('incoming', dir, moved)}>
                    <ServicePhotoCard src={currentSrc} alt="Healthcare professionals at work" />
                  </div>
                </>
              ) : null}
            </div>
          ) : null}

          {displayLines.length > 0 ? <ServiceLineCard lines={displayLines} slide={slide} /> : null}

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
