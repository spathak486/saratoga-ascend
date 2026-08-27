import React from 'react';
import { MediaFrame, Section } from '../atoms';
import { EmblemPanel } from '../molecules/EmblemPanel';
import { SectionIntro } from '../molecules/SectionIntro';
import {
  ServiceLineCard,
  type ServiceLine,
} from '../molecules/ServiceLineCard';

const INTRO_COPY =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';

const CARD_BODY =
  'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web development to showcase layouts and visual elements without the distraction of meaningful content.';

const SERVICE_LINES: ServiceLine[] = [
  {
    heading: 'Healthcare',
    blurb: CARD_BODY,
    features: [
      'Accredited Certifications',
      'Operational Insights',
      'Regulatory Compliance',
    ],
    href: '/what-we-do',
  },
  {
    heading: 'Technology',
    blurb: CARD_BODY,
    features: [
      'Secure Infrastructure',
      'Data Integration',
      'Mission-Ready Systems',
    ],
    href: '/what-we-do',
  },
  {
    heading: 'Construction',
    blurb: CARD_BODY,
    features: [
      'Federal Facilities',
      'Program Management',
      'Quality Assurance',
    ],
    href: '/what-we-do',
  },
];

export interface WhatWeDoSectionProps {
  photoSrc?: string;
  emblemSrc?: string;
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({
  photoSrc = '/images/future-doctor.png',
  emblemSrc,
}) => (
  <Section
    aria-labelledby="what-we-do-heading"
    tone="surface"
    spacing="md"
  >
    <div className="flex flex-col gap-block">
      <SectionIntro
        id="what-we-do-heading"
        title="What We Do"
        description={INTRO_COPY}
        action={{ href: '/about', label: 'About us' }}
        align="center"
        descriptionStyle={{ color: 'var(--color-ink)' }}
      />

      <div className="grid grid-cols-1 gap-grid xl:grid-cols-3">
        {/* Left — medical photo fills its column edge-to-edge, matching the
            Figma crop (no bleed past the grid track). */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-card xl:aspect-auto xl:min-h-[clamp(28rem,34.58vw,41.5rem)]">
          <MediaFrame
            src={photoSrc}
            alt="Healthcare professionals at work"
            pendingLabel="future-doctor.png"
            tone="navy"
            sizes="(max-width: 1280px) 100vw, 34vw"
            imageClassName="object-cover!"
            className="size-full border-0 xl:absolute xl:inset-0"
          />
        </div>

        <ServiceLineCard lines={SERVICE_LINES} />

        <EmblemPanel emblemSrc={emblemSrc} />
      </div>
    </div>
  </Section>
);
