import React from 'react';
import { Heading, Section } from '../atoms';
import {
  HappyClientsCarousel,
  type ClientReview,
} from '../molecules/HappyClientsCarousel';

const REVIEWS: readonly ClientReview[] = [
  {
    name: 'Izabella-Naval Hospital,',
    place: 'Lejeune- Family Medicine',
    quote:
      '“After 20+ years in pharmacy, this is the best place I’ve ever worked! I’m proud to serve our military community, enjoy competitive pay, flexible time off, and a true sense of purpose.”',
    photos: [
      '/images/healthcare-team.png',
      '/images/pharmacist-portrait.png',
      '/images/phase5/phase5-nurse.png',
    ],
  },
  {
    role: 'Medical Assistant',
    name: 'Camp Lejeune',
    place: 'Primary Care',
    quote:
      '“Every day brings something new, and I love being part of a team that truly cares. The people, the mission, and the opportunity to grow make this a rewarding place to build my career.”',
    photos: [
      '/images/pharmacist-portrait.png',
      '/images/healthcare-team.png',
      '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
    ],
  },
];

/**
 * Fourth-last homepage band (Figma nodes 1:613 / 1:197). Centred section
 * heading over the fanned-portrait testimonial stage.
 */
export const HappyClientsSection: React.FC = () => (
  <Section
    aria-labelledby="happy-clients-heading"
    tone="surface"
    spacing="lg"
  >
    <div className="flex flex-col items-center gap-[clamp(2.5rem,4.17vw,5rem)]">
      <Heading
        id="happy-clients-heading"
        level={2}
        size="section"
        tone="ink"
        className="text-center"
      >
        Our Happy Clients
      </Heading>

      <HappyClientsCarousel reviews={REVIEWS} />
    </div>
  </Section>
);
