import React from 'react';
import { Heading, Section } from '../atoms';
import { NeedHelpForm } from '../molecules/NeedHelpForm';

export interface NeedHelpSectionProps {
  personSrc?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  mediaAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Second-last homepage band (Figma node 1:617). Gradient card with the
 * signup prompt on the left and the nurse cut-out on the right.
 * Exact Figma image specs:
 * position: absolute; width: 767px; height: 733px; left: 939px; top: 120px;
 * background: url(medical-workers-healthcare-covid-vaccination-concept-friendly-upbeat-female-nurse-doctor-b.png);
 */
export const NeedHelpSection: React.FC<NeedHelpSectionProps> = ({
  personSrc,
  title,
  subTitle,
  description,
  mediaAlt,
  ctaLabel,
  ctaHref,
}) => (
  <Section
    aria-labelledby="need-help-heading"
    tone="surface"
    spacing="none"
    bleed
    className="relative py-section overflow-hidden max-xl:py-5"
  >
    <div className="relative mx-auto max-w-home px-page max-xl:px-5">
      {/* Rectangle 14: 1680x519px, radius 52px, Red Blue gradient with 20% black film */}
      <div className="relative isolate overflow-hidden rounded-[clamp(24px,2.7vw,52px)] bg-need-help-gradient min-h-[clamp(28rem,38.18vw,519px)] lg:h-[519px] max-xl:min-h-[46.625rem] max-xl:rounded-xl">
        {/* Left Column: 70px padding */}
        <div className="relative z-10 flex min-w-0 max-w-full lg:max-w-[50%] flex-col justify-between p-[clamp(1.5rem,5.21vw,70px)] h-full max-xl:max-w-none max-xl:gap-[1.875rem] max-xl:px-5 max-xl:py-10">
          <div>
            {title ? (
              <Heading
                id="need-help-heading"
                level={2}
                tone="onDark"
                className="font-serif text-[clamp(2rem,3.75vw,72px)] leading-[120%] font-normal text-white max-w-[353px] max-xl:max-w-none max-xl:text-[2rem]! max-xl:leading-[2.5rem]!"
              >
                {title}
              </Heading>
            ) : null}

            {/* Sign up now and get hired easily */}
            {(subTitle || description) ? (
              <p className="mt-2 max-w-[356px] text-[clamp(1.125rem,1.25vw,24px)] leading-[160%] font-medium text-white max-xl:mt-5 max-xl:max-w-none max-xl:text-base max-xl:leading-5 max-xl:font-normal">
                {subTitle ||
                  (description
                    ? description.replace(/<[^>]*>?/gm, '').trim()
                    : null)}
              </p>
            ) : null}
          </div>

          {/* Inputs & CTA Button */}
          <div className="mt-6 max-xl:mt-0">
            <NeedHelpForm buttonLabel={ctaLabel} buttonHref={ctaHref} />
          </div>
        </div>

        {personSrc ? (
          <div
            className="pointer-events-none absolute bottom-0 right-0 z-0 flex h-full w-full items-end justify-center lg:right-0 lg:h-[519px] lg:w-[45%] lg:max-w-[767px] lg:justify-end max-xl:left-0 max-xl:h-[24.5rem] max-xl:w-full max-xl:max-w-none!"
          >
            <img
              src={personSrc}
              alt={mediaAlt || 'Healthcare worker offering help'}
              className="h-full w-full object-contain object-bottom max-xl:object-cover max-xl:object-[center_20%]"
            />
          </div>
        ) : null}
      </div>
    </div>
  </Section>
);
