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

// Fallback static logos when no data from Strapi
const FALLBACK_LOGOS = [
  { name: 'United States Department of the Air Force', src: '/images/image 11.png' },
  { name: 'National Institutes of Health', src: '/images/image 9.png' },
  { name: 'Federal health partner', src: '/images/image 8.png' },
];

/**
 * Sixth-last homepage band (Figma node 1:429). Section wash, red heading,
 * and an edge-faded infinite logo strip.
 *
 * When `logos` is provided from Strapi, renders dynamically;
 * otherwise falls back to static placeholder logos.
 */
export const ClientLogosSection: React.FC<ClientLogosectionProps> = ({
  title,
  description,
  logos,
}) => {
  const hasData = logos && logos.length > 0;
  const items = hasData
    ? logos.map((logo) => ({
        name: logo.alternativeText || 'Client logo',
        src: logo.url,
      }))
    : FALLBACK_LOGOS;

  // Duplicate items for seamless marquee looping
  const LOOP = [...items, ...items, ...items, ...items];

  return (
    <section
      aria-labelledby="client-logos-heading"
      className="relative overflow-hidden bg-section-wash"
    >
      <Container className="py-section">
        <Heading
          id="client-logos-heading"
          level={2}
          size="section"
          tone="red"
          className="text-center"
        >
          {title || 'Our Clients'}
        </Heading>
        <p className="mx-auto mt-6 max-w-[40ch] text-center text-body-lg font-medium text-ink">
          {description || 'Proudly Serving Federal, State and Local clients'}
        </p>
      </Container>

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

      <div className="h-[clamp(2rem,4vw,5rem)]" />
    </section>
  );
};
