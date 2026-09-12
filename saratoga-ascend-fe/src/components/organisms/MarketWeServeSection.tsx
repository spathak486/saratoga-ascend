import React from 'react';
import { Section } from '../atoms';
import { MarketServeCard } from '../molecules/MarketServeCard';
import { SectionIntro } from '../molecules/SectionIntro';

export interface MarketItem {
  id: string;
  label: string;
  description: string;
  imageSrc?: string;
  pendingLabel?: string;
  href?: string;
}

export interface MarketWeServeSectionProps {
  title?: string;
  description?: string;
  services?: MarketItem[];
}

const INTRO_COPY =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';

const MARKETS: MarketItem[] = [
  {
    id: 'federal-military',
    label: 'Federal & Military',
    description:
      'Supplying cleared, credentialed healthcare professionals to DoD, VA, and military treatment facilities worldwide.',
    imageSrc: '/images/Federal%20%26%20Military.png',
    pendingLabel: 'Federal & Military.png',
    href: '/who-we-serve',
  },
  {
    id: 'state-local',
    label: 'State & Local',
    description:
      'Supplying credentialed healthcare professionals to state, county, and municipal facilities nationwide.',
    imageSrc: '/images/State%20%26%20Local.png',
    pendingLabel: 'State & Local.png',
    href: '/who-we-serve',
  },
];

/**
 * Phase 4 — Market We Serve: section intro plus photo overlay cards.
 * Accepts optional dynamic data from Strapi or falls back to static content.
 */
export const MarketWeServeSection: React.FC<MarketWeServeSectionProps> = ({
  title,
  description,
  services,
}) => {
  const displayTitle = title || 'Market We Serve';
  const displayDescription = description || INTRO_COPY;
  const displayMarkets = services && services.length > 0 ? services : MARKETS;

  return (
    <Section
      aria-labelledby="market-we-serve-heading"
      tone="surface"
      spacing="lg"
    >
      <div className="flex flex-col gap-[clamp(2.5rem,3.125vw,3.75rem)]">
        <SectionIntro
          id="market-we-serve-heading"
          title={displayTitle}
          description={displayDescription}
        />

        <div className="grid grid-cols-1 gap-grid lg:grid-cols-2">
          {displayMarkets.map((market) => (
            <MarketServeCard
              key={market.id}
              label={market.label}
              description={market.description}
              imageSrc={market.imageSrc}
              pendingLabel={market.pendingLabel || market.label}
              href={market.href}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
