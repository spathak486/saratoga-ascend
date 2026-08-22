import React from 'react';
import { Section } from '../atoms';
import { MarketServeCard } from '../molecules/MarketServeCard';
import { SectionIntro } from '../molecules/SectionIntro';

const INTRO_COPY =
  'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.';

const MARKETS = [
  {
    id: 'federal-military',
    label: 'Federal & Military',
    imageSrc: '/images/Federal%20%26%20Military.png',
    pendingLabel: 'Federal & Military.png',
    href: '/who-we-serve',
  },
  {
    id: 'state-local',
    label: 'State & Local',
    imageSrc: '/images/State%20%26%20Local.png',
    pendingLabel: 'State & Local.png',
    href: '/who-we-serve',
  },
] as const;

/**
 * Phase 4 — Market We Serve: section intro plus two photo overlay cards.
 */
export const MarketWeServeSection: React.FC = () => (
  <Section
    aria-labelledby="market-we-serve-heading"
    tone="surface"
    spacing="md"
  >
    <div className="flex flex-col gap-[clamp(2.5rem,3.125vw,3.75rem)]">
      <SectionIntro
        id="market-we-serve-heading"
        title="Market We Serve"
        description={INTRO_COPY}
      />

      <div className="grid grid-cols-1 gap-grid lg:grid-cols-2">
        {MARKETS.map((market) => (
          <MarketServeCard
            key={market.id}
            label={market.label}
            imageSrc={market.imageSrc}
            pendingLabel={market.pendingLabel}
            href={market.href}
          />
        ))}
      </div>
    </div>
  </Section>
);
