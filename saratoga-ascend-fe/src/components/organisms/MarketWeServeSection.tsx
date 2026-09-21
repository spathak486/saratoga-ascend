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

/**
 * Phase 4 — Market We Serve: section intro plus photo overlay cards.
 * Accepts optional dynamic data from Strapi or falls back to static content.
 */
export const MarketWeServeSection: React.FC<MarketWeServeSectionProps> = ({
  title,
  description,
  services,
}) => {
  const displayMarkets = services && services.length > 0 ? services : [];

  if (!title && !description && displayMarkets.length === 0) return null;

  return (
    <Section
      aria-labelledby="market-we-serve-heading"
      tone="surface"
      spacing="lg"
    >
      <div className="flex flex-col gap-[clamp(2.5rem,3.125vw,3.75rem)]">
        {(title || description) ? (
          <SectionIntro
            id="market-we-serve-heading"
            title={title ?? ''}
            description={description ?? ''}
          />
        ) : null}

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
