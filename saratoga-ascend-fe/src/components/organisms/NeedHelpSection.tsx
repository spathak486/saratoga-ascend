import React from 'react';
import { Heading, MediaFrame, Section } from '../atoms';
import { NeedHelpForm } from '../molecules/NeedHelpForm';

export interface NeedHelpSectionProps {
  personSrc?: string;
}

/**
 * Need Help Section (Figma Frame 613, Node 1:617).
 * Continuous Red-to-Blue sweep gradient card with left form & right nurse image.
 */
export const NeedHelpSection: React.FC<NeedHelpSectionProps> = ({
  personSrc = '/images/need-help-nurse.png',
}) => (
  <Section id="need-help" aria-labelledby="need-help-heading" tone="surface" spacing="lg">
    <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#a01222] via-[#652d58] to-[#0088ce] border border-white/40 shadow-tile max-w-[1680px] w-full mx-auto md:h-[733px]">
      <div className="grid min-h-[clamp(28rem,38vw,42rem)] md:h-[733px] lg:grid-cols-2">
        {/* Left Side: Form Panel */}
        <div className="z-10 flex flex-col justify-center px-[clamp(2rem,5vw,5rem)] py-[clamp(2.5rem,5vw,4.5rem)] text-white">
          <Heading
            id="need-help-heading"
            level={2}
            size="section"
            tone="onDark"
            className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-white"
          >
            Need Help?
          </Heading>
          <p className="mt-3 text-[clamp(1rem,1.3vw,1.25rem)] font-medium text-white/90">
            Sign up now and get hired easily
          </p>

          <NeedHelpForm className="mt-10" />
        </div>

        {/* Right Side: Nurse Image (width: 767px, height: 733px, top: 0, left: 819px inside 1680px card / 939px on 1920px artboard) */}
        <div className="relative min-h-[clamp(18rem,28vw,42rem)] bg-transparent lg:min-h-0 xl:absolute xl:left-[819px] xl:top-0 xl:bottom-0 xl:w-[767px] xl:h-[733px] xl:max-w-none">
          <MediaFrame
            src={personSrc}
            alt="Healthcare worker offering help"
            pendingLabel="need-help-nurse"
            tone="tile"
            unoptimized={true}
            sizes="(max-width: 1280px) 100vw, 767px"
            imageClassName="object-contain object-bottom xl:object-left-bottom!"
            className="absolute inset-0 size-full border-0 bg-transparent"
          />
        </div>
      </div>
    </div>
  </Section>
);
