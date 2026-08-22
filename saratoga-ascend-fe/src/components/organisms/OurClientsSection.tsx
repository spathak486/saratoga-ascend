'use client';

import React from 'react';
import { Heading, Section, Text } from '../atoms';
import { CardCarousel } from '../molecules/CardCarousel';
import { CircleControl } from '../molecules/CircleControl';
import { LogoTile } from '../molecules/LogoTile';

/** Arrows sit vertically centred just inside the page gutter. */
const arrowPosition = 'absolute top-1/2 z-20 -translate-y-1/2';

export interface Client {
  name: string;
  src?: string;
  pendingLabel?: string;
}

/**
 * Three tiles are visible at a time; the rest scroll in. Replace with the real
 * roster — the marks below are placeholders for the ones shown in the design.
 */
const CLIENTS: Client[] = [
  {
    name: 'United States Department of the Air Force',
    src: '/images/image%2011.png',
  },
  {
    name: 'National Institutes of Health',
    src: '/images/image%209.png',
  },
  { name: 'Third client', pendingLabel: 'client-3.png' },
];

export interface OurClientsSectionProps {
  clients?: Client[];
}

export const OurClientsSection: React.FC<OurClientsSectionProps> = ({
  clients = CLIENTS,
}) => (
  <Section aria-labelledby="our-clients-heading" tone="surface" spacing="md">
    <Heading
      id="our-clients-heading"
      level={2}
      size="section"
      font="serif"
      tone="red"
      className="text-center"
    >
      Our Clients
    </Heading>

    <Text size="body" tone="navy" className="mx-auto mt-3 max-w-[52ch] text-center">
      Trusted by federal and state health agencies to place credentialed staff
      where they are needed most.
    </Text>

    <CardCarousel
      label="Our clients"
      className="mt-block px-[clamp(2.75rem,4vw,3.5rem)]"
      trackClassName="-ml-3"
      slideClassName="basis-full pl-3 min-[481px]:basis-1/2 lg:basis-1/3"
      loop
      controls={({ scrollPrev, scrollNext }) => (
        <>
          <CircleControl
            label="Previous clients"
            direction="prev"
            tone="staffingArrow"
            onClick={scrollPrev}
            className={`${arrowPosition} left-0`}
          />
          <CircleControl
            label="Next clients"
            direction="next"
            tone="staffingArrow"
            onClick={scrollNext}
            className={`${arrowPosition} right-0`}
          />
        </>
      )}
    >
      {clients.map((client) => (
        <LogoTile key={client.name} {...client} />
      ))}
    </CardCarousel>
  </Section>
);
