import React from 'react';
import { Heading, Section } from '../atoms';
import {
  HappyClientsCarousel,
  type ClientReview,
} from '../molecules/HappyClientsCarousel';

export interface HappyClientsSectionProps {
  title?: string;
  reviews?: ClientReview[];
}

/**
 * Fourth-last homepage band (Figma nodes 1:613 / 1:197). Centred section
 * heading over the fanned-portrait testimonial stage.
 * All content is dynamic — renders null if no data is provided.
 */
export const HappyClientsSection: React.FC<HappyClientsSectionProps> = ({
  title,
  reviews,
}) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <Section
      aria-labelledby="happy-clients-heading"
      tone="surface"
      spacing="lg"
    >
      <div className="flex flex-col items-center gap-[clamp(2.5rem,4.17vw,5rem)]">
        {title ? (
          <Heading
            id="happy-clients-heading"
            level={2}
            size="section"
            tone="ink"
            className="text-center"
          >
            {title}
          </Heading>
        ) : null}

        <HappyClientsCarousel reviews={reviews} />
      </div>
    </Section>
  );
};
