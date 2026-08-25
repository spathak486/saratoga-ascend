import React from 'react';
import { Heading, Section, Text } from '../atoms';
import { AboutHeartStage } from '../molecules/AboutHeartStage';
import { AboutHighlightList } from '../molecules/AboutHighlightList';

export interface MissionSectionProps {
  heartSrc?: string;
}

const BODY_LEAD =
  'Founded to serve federal and military healthcare, we grew into a nationwide partner for hospitals, clinics, and public health programs.';

const BODY_CLOSE =
  'We combine military-grade precision with responsive, people-first service—matching licensed, background-checked, and fully credentialed professionals to serve every mission.';

const HIGHLIGHTS = [
  'Nationwide coverage across all 50 states',
  'Cleared personnel for government & military facilities',
  'Dedicated compliance & credentialing teams',
  '24/7 support for clients and providers',
] as const;

/**
 * About Us band (Figma node 13:355). Copy on the left, heart plate on the
 * right, pale red wash under the whole band.
 */
export const MissionSection: React.FC<MissionSectionProps> = ({ heartSrc }) => (
  <Section
    aria-labelledby="about-us-heading"
    tone="surface"
    spacing="lg"
    className="bg-about-wash"
  >
    <div className="grid grid-cols-1 items-center gap-block xl:grid-cols-[minmax(0,1fr)_minmax(18rem,42.1875rem)]">
      <div className="flex min-w-0 flex-col">
        <Heading
          id="about-us-heading"
          level={2}
          size="section"
          tone="ink"
          className="max-w-[13.5em]"
        >
          Four Decades of{' '}
          <span className="text-brand-cta-from">Military & Federal</span>{' '}
          Healthcare Solutions
        </Heading>

        <div className="mt-[clamp(1.25rem,2.08vw,2.5rem)] flex max-w-[42.7rem] flex-col gap-[1.6em]">
          <Text size="lead" tone="inherit" className="font-medium text-ink">
            {BODY_LEAD}
          </Text>
          <Text size="lead" tone="inherit" className="font-medium text-ink">
            {BODY_CLOSE}
          </Text>
        </div>

        <AboutHighlightList
          items={HIGHLIGHTS}
          className="mt-[clamp(2.5rem,5.94vw,7.125rem)]"
        />
      </div>

      <AboutHeartStage heartSrc={heartSrc} className="mx-auto xl:mx-0" />
    </div>
  </Section>
);
