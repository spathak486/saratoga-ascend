import React from 'react';
import { Heading, Section } from '../atoms';
import { AboutHeartStage } from '../molecules/AboutHeartStage';
import { AboutHighlightList } from '../molecules/AboutHighlightList';

export interface MissionSectionProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  shieldIconSrc?: string;
  pulseIconSrc?: string;
  highlights?: string[];
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
 * About Us band (Figma node 13:355) — 1080px artboard, pink wash, copy
 * column 971px / heart plate 675×981 with a slight column overlap.
 */
export const MissionSection: React.FC<MissionSectionProps> = ({
  title,
  description,
  imageSrc,
  shieldIconSrc,
  pulseIconSrc,
  highlights,
  heartSrc,
}) => {
  const displayHeartSrc = imageSrc || heartSrc;
  const displayHighlights = highlights && highlights.length > 0 ? highlights : HIGHLIGHTS;

  return (
    <Section
      aria-labelledby="about-us-heading"
      tone="surface"
      spacing="none"
      className="bg-about-wash overflow-hidden"
      containerClassName="relative min-h-[clamp(40rem,56.25vw,67.5rem)]"
    >
      <div className="grid grid-cols-1 items-start gap-y-[clamp(2rem,4vw,3rem)] lg:grid-cols-[minmax(0,1.44fr)_minmax(0,1fr)] lg:gap-x-0 xl:grid-cols-[minmax(0,60.6875rem)_42.1875rem] xl:justify-between">
        {/* Copy — top inset 142px on the 1080px artboard */}
        <div className="relative z-[1] flex min-w-0 flex-col pt-[clamp(2.5rem,7.4vw,8.875rem)] pb-[clamp(2rem,4vw,3rem)]">
          <Heading
            id="about-us-heading"
            level={2}
            size="section"
            tone="ink"
            className="max-w-[60.6875rem] leading-[1.2]"
          >
            {title ? (
              <span className="block">{title}</span>
            ) : (
              <span className="block">
                Four Decades of{' '}
                <span className="text-brand-cta-from">Military & Federal</span>
                {' '} Healthcare Solutions
              </span>
            )}
          </Heading>

          {/* Body — 683px measure, 24px medium, 1.6 leading; 48px below heading */}
          <div className="mt-[clamp(1.5rem,2.5vw,3rem)] max-w-[42.6875rem] text-body-lg font-medium leading-[1.6] text-ink">
            {description ? (
              <p className="whitespace-pre-wrap">{description}</p>
            ) : (
              <>
                <p>{BODY_LEAD}</p>
                <p className="mt-[1.6em]">{BODY_CLOSE}</p>
              </>
            )}
          </div>

          {/* Bullets — 40px below body on artboard, 64px row gap */}
          <AboutHighlightList
            items={displayHighlights}
            className="mt-[clamp(1.5rem,2.08vw,2.5rem)]"
          />
        </div>

        {/* Heart plate — top inset 99px; overlaps copy by ~18px at 1920 */}
        <div className="relative z-0 flex justify-center pb-[clamp(1.5rem,3vw,2.5rem)] lg:justify-end lg:pb-0 lg:pt-[clamp(1rem,4vw,4rem)] xl:-ml-[1.125rem] xl:pt-[clamp(1.5rem,5.1vw,6.1875rem)]">
          <AboutHeartStage
            heartSrc={displayHeartSrc}
            shieldSrc={shieldIconSrc}
            pulseSrc={pulseIconSrc}
            className="w-full max-w-[min(100%,42.1875rem)]"
          />
        </div>
      </div>
    </Section>
  );
};
