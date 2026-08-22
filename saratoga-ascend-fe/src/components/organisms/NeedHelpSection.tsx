import React from 'react';
import { Heading, MediaFrame, Section } from '../atoms';
import { NeedHelpForm } from '../molecules/NeedHelpForm';

export interface NeedHelpSectionProps {
  personSrc?: string;
}

/**
 * Second-last homepage band (Figma node 1:617). Gradient card with the
 * signup prompt on the left and the nurse cut-out on the right.
 */
export const NeedHelpSection: React.FC<NeedHelpSectionProps> = ({
  personSrc = '/images/medical-workers-healthcare-covid-vaccination-concept-friendly-upbeat-female-nurse-doctor-b%201.png',
}) => (
  <Section aria-labelledby="need-help-heading" tone="surface" spacing="lg">
    <div className="relative isolate overflow-hidden rounded-sweep bg-cta-gradient">
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative grid min-h-[clamp(28rem,38.18vw,45.8125rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-block px-[clamp(1.5rem,5.21vw,6.25rem)] py-[clamp(2rem,5.21vw,6.25rem)]">
          <div>
            <Heading
              id="need-help-heading"
              level={2}
              size="section"
              tone="onDark"
            >
              Need Help?
            </Heading>
            <p className="mt-[clamp(1.25rem,5.73vw,6.875rem)] max-w-[28ch] text-body-lg font-medium text-brand-on-dark">
              Sign up now and get hired easily
            </p>
          </div>

          <NeedHelpForm />
        </div>

        <div className="relative min-h-[clamp(16rem,28vw,45.8125rem)] lg:min-h-0">
          <MediaFrame
            src={personSrc}
            alt="Healthcare worker offering help"
            pendingLabel="need-help-nurse"
            tone="navyCard"
            sizes="(max-width: 1024px) 100vw, 48vw"
            imageClassName="object-cover object-[center_20%]!"
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </div>
  </Section>
);
