import React from 'react';
import { Heading, Section, Text } from '../atoms';
import {
  HappyClientsCarousel,
  type ClientReview,
} from '../molecules/HappyClientsCarousel';

export interface HappyClientsSectionProps {
  title?: string;
  description?: string;
  reviews?: ClientReview[];
}

/**
 * Our Happy Clients (Figma 2002:1099). 72px red title, 30px lead, then the
 * 1680×538 fan. Reviews and their photos stay on the existing props.
 */
export const HappyClientsSection: React.FC<HappyClientsSectionProps> = ({
  title,
  description,
  reviews,
}) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <Section
      aria-labelledby="happy-clients-heading"
      tone="surface"
      spacing="none"
      containerClassName="py-10"
    >
      <div className="flex flex-col items-start gap-20">
        {title || description ? (
          <div className="flex w-full flex-col items-start gap-3">
            {title ? (
              <Heading
                id="happy-clients-heading"
                level={2}
                size="section"
                tone="inherit"
                className="text-brand-cta-from"
              >
                {title}
              </Heading>
            ) : (
              <h2 id="happy-clients-heading" className="sr-only">
                Our Happy Clients
              </h2>
            )}
            {description ? (
              <Text size="sectionLead" tone="inherit" className="text-ink">
                {description}
              </Text>
            ) : null}
          </div>
        ) : (
          <h2 id="happy-clients-heading" className="sr-only">
            Our Happy Clients
          </h2>
        )}

        <HappyClientsCarousel reviews={reviews} />
      </div>
    </Section>
  );
};
