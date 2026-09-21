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
  const displayHighlights = highlights && highlights.length > 0 ? highlights : null;

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
            ) : null}
          </Heading>

          {/* Body — 683px measure, 24px medium, 1.6 leading; 48px below heading */}
          {description ? (
            <div className="mt-[clamp(1.5rem,2.5vw,3rem)] max-w-[42.6875rem] text-body-lg font-medium leading-[1.6] text-ink">
              <div 
                className="whitespace-pre-wrap [&>p]:mb-[1.6em] last:[&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          ) : null}

          {/* Bullets — 40px below body on artboard, 64px row gap */}
          {displayHighlights ? (
            <AboutHighlightList
              items={displayHighlights}
              className="mt-[clamp(1.5rem,2.08vw,2.5rem)]"
            />
          ) : null}
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
