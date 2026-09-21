import React from 'react';
import { Container, Heading } from '../atoms';
import { ClientLogoCard } from '../molecules/ClientLogoCard';
import '../molecules/clientLogosMarquee.css';
import type { StrapiImage } from '@/lib/schemas';

interface ClientLogosectionProps {
  title?: string;
  description?: string;
  logos?: StrapiImage[];
}

/**
 * Sixth-last homepage band (Figma node 1:429). Section wash, red heading,
 * and an edge-faded infinite logo strip.
 *
 * All content is dynamic — nothing renders if Strapi data is absent.
 */
export const ClientLogosSection: React.FC<ClientLogosectionProps> = ({
  title,
  description,
  logos,
}) => {
  const hasData = logos && logos.length > 0;
  if (!hasData && !title && !description) return null;

  const items = hasData
    ? logos!.map((logo) => ({
        name: logo.alternativeText || 'Client logo',
        src: logo.url,
      }))
    : [];

  // Duplicate items for seamless marquee looping
  const LOOP = [...items, ...items, ...items, ...items];

  return (
    <section
      aria-labelledby="client-logos-heading"
      className="relative overflow-hidden bg-section-wash"
    >
      <Container className="py-section">
        {title ? (
          <Heading
            id="client-logos-heading"
            level={2}
            size="section"
            tone="red"
            className="text-center"
          >
            {title}
          </Heading>
        ) : null}
        {description ? (
          <p className="mx-auto mt-6 max-w-[40ch] text-center text-body-lg font-medium text-ink">
            {description}
          </p>
        ) : null}
      </Container>

      {items.length > 0 && (
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="client-logos-track flex w-max gap-[clamp(1.25rem,3.9vw,4.7rem)] pr-[clamp(1.25rem,3.9vw,4.7rem)]"
              aria-label="Client organisations"
            >
              {LOOP.map((logo, index) => (
                <ClientLogoCard
                  key={`${logo.name}-${index}`}
                  name={logo.name}
                  src={logo.src}
                />
              ))}
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[clamp(3rem,9.5vw,11.375rem)] bg-gradient-to-r from-brand-surface-muted to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[clamp(3rem,9.5vw,11.375rem)] bg-gradient-to-l from-brand-surface-muted to-transparent"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="h-[clamp(2rem,4vw,5rem)]" />
    </section>
  );
};
