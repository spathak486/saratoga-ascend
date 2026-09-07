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
    <div className="relative isolate overflow-hidden rounded-sweep bg-need-help-gradient">
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative grid min-h-[clamp(28rem,38.18vw,45.8125rem)] lg:grid-cols-[48.75%_51.25%]">
        <div className="flex min-w-0 flex-col justify-between gap-[clamp(2rem,1.2719rem+3.1068vw,5rem)] px-[clamp(1.5rem,5.21vw,6.25rem)] py-[clamp(2rem,5.21vw,6.25rem)]">
          <div>
            <Heading
              id="need-help-heading"
              level={2}
              size="section"
              tone="onDark"
            >
              Need Help?
            </Heading>
            <p className="mt-[clamp(1rem,0.8788rem+0.5178vw,1.5rem)] max-w-[28ch] text-body-lg font-medium text-brand-on-dark">
              Sign up now and get hired easily
            </p>
          </div>

          <NeedHelpForm />
        </div>

        <div className="relative min-h-[clamp(16rem,28vw,45.8125rem)] lg:min-h-0">
          <div className="absolute inset-y-0 left-0 w-full lg:w-[89.08%]">
            <MediaFrame
              src={personSrc}
              alt="Healthcare worker offering help"
              pendingLabel="need-help-nurse"
              tone="navyCard"
              sizes="(max-width: 1024px) 100vw, 44vw"
              imageClassName="object-cover object-[center_20%]!"
              className="size-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  </Section>
);
