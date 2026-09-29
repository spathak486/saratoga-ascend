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
      spacing="none"
      className="mt-10 py-10 max-[89.99rem]:mt-0 max-[89.99rem]:py-[1.875rem]"
    >
      <div className="flex flex-col gap-10">
        {(title || description) ? (
          <SectionIntro
            id="market-we-serve-heading"
            title={title ?? ''}
            description={description ?? ''}
            wide
            titleTone="inherit"
            titleClassName="text-brand-cta-from max-[89.99rem]:text-[2rem] max-[89.99rem]:leading-[2.5rem]"
            descriptionSize="sectionLead"
            descriptionStyle={{ color: 'var(--color-ink)' }}
            descriptionClassName="max-[89.99rem]:text-base max-[89.99rem]:leading-5"
            className="gap-3"
          />
        ) : null}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
