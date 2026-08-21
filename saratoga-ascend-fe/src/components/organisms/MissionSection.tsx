import React from 'react';
import { Container, MediaFrame, Section } from '../atoms';

export interface MissionSectionProps {
  imageSrc?: string;
}

/**
 * The supplied artwork has its copy baked in, so the band renders as a single
 * flat image and the same words are repeated for assistive tech and crawlers.
 * Swap to real markup once a text-free export of the hands is available — the
 * copy below is already the wording from the artwork.
 */
export const MissionSection: React.FC<MissionSectionProps> = ({
  imageSrc = '/images/About%20us.png',
}) => (
  <Section aria-labelledby="mission-heading" tone="surface" spacing="md">
    <Container flush>
      <MediaFrame
        src={imageSrc}
        alt=""
        pendingLabel="About us.png"
        tone="sky"
        sizes="100vw"
        imageClassName="object-contain!"
        className="aspect-[819/543] w-full bg-transparent"
      />

      <div className="sr-only">
        <p>About Us</p>
        <h2 id="mission-heading">
          Four Decades of Military &amp; Federal Healthcare Solutions Expertise
        </h2>
        <p>
          Founded to serve federal and military healthcare, we grew into a
          nationwide partner for hospitals, clinics, and public health
          programs. We combine military-grade precision with responsive,
          people-first service — matching licensed, background-checked, and
          fully credentialed professionals to serve every mission.
        </p>
        <ul>
          <li>Nationwide coverage across all 50 states</li>
          <li>Cleared personnel for government &amp; military facilities</li>
          <li>Dedicated compliance &amp; credentialing teams</li>
          <li>24/7 support for clients and providers</li>
        </ul>
      </div>
    </Container>
  </Section>
);
