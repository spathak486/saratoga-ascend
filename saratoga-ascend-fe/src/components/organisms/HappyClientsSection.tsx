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
 * Our Happy Clients — desktop Figma 2243:3543.
 * Mobile/tablet use the same fan pattern with desktop arrow chrome.
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
      containerClassName="overflow-visible py-10 max-xl:overflow-x-visible max-xl:px-5! max-xl:py-5 md:px-8 md:py-8"
    >
      <div className="flex flex-col items-start gap-20 max-xl:gap-10 md:gap-12">
        {title || description ? (
          <div className="flex w-full flex-col items-start gap-3">
            {title ? (
              <Heading
                id="happy-clients-heading"
                level={2}
                size="section"
                tone="inherit"
                className="text-brand-cta-from max-md:text-[2rem]! max-md:leading-[2.5rem]! max-md:font-normal"
              >
                {title}
              </Heading>
            ) : (
              <h2 id="happy-clients-heading" className="sr-only">
                Our Happy Clients
              </h2>
            )}
            {description ? (
              <Text
                size="sectionLead"
                tone="inherit"
                className="text-ink max-md:text-base! max-md:leading-5! max-md:font-normal"
              >
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
