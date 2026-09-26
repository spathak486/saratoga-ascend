import React from 'react';
import { ClientLogosSection } from './ClientLogosSection';

export interface Client {
  name: string;
  src?: string;
  pendingLabel?: string;
}

export interface OurClientsSectionProps {
  clients?: Client[];
}

/** Same Figma 2002:1105 band as `ClientLogosSection`. */
export const OurClientsSection: React.FC<OurClientsSectionProps> = ({
  clients,
}) => (
  <ClientLogosSection
    title="Our Clients"
    description="Success is built on consistent effort."
    logos={clients
      ?.filter((client) => client.src)
      .map((client) => ({
        url: client.src as string,
        alternativeText: client.name,
      }))}
  />
);
