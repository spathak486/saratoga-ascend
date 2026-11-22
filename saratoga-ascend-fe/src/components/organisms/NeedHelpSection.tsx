import { stripHtml } from '@/lib/utils/text';
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
  /** Crop override. The contact frame's photo is wider than the cut-out. */
  imageClassName?: string;
}

/**
 * Need Help Banner (Figma node 1899:2560).
 * Card dimensions: 1680px x 519px, border-radius 52px.
 * Background: Red-to-Cyan gradient with 20% black film + organic vector swoosh circles.
 * Left: 70px padding, Heading ("Need Help?"), Subtitle ("Sign up now and get hired easily"), Name/Email underline inputs (width 540px), "Know More" white pill button (180x60px).
 * Right: Healthcare worker/nurse thumbs-up cutout (582px x 557px) positioned over background swoosh graphics.
 */
export const NeedHelpSection: React.FC<NeedHelpSectionProps> = ({
  personSrc = '/images/female-nurse-thumbsup.png',
  title = 'Need Help?',
  subTitle = 'Sign up now and get hired easily',
  description,
  mediaAlt = 'Healthcare nurse giving thumbs up',
  ctaLabel = 'Know More',
  ctaHref,
  imageClassName,
}) => (
  <Section
    aria-labelledby="need-help-heading"
    tone="surface"
    spacing="none"
    bleed
    className="relative py-[clamp(2rem,4vw,3.75rem)] overflow-hidden"
  >
    <div className="relative mx-auto max-w-home px-page">
      {/* Card: fluid rem bounds */}
      <div className="relative isolate overflow-hidden rounded-[clamp(1.5rem,2.7vw,3.25rem)] bg-need-help-gradient min-h-[28.75rem] md:min-h-[32.4375rem]">
        {/* Background Decorative Swooshes from Figma 1899:2560 */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-0 hidden lg:block w-[50%] max-w-[46.875rem] overflow-hidden">
          <img
            src="/images/need-help-bg-graphic.png"
            alt=""
            className="h-full w-full object-contain object-right"
            aria-hidden="true"
          />
        </div>

        {/* Left Column Content: fluid rem layout */}
        <div className="relative z-10 flex min-w-0 max-w-full lg:max-w-[55%] xl:max-w-[50%] flex-col justify-start px-[clamp(1.5rem,3.64vw,4.375rem)] pt-[clamp(2rem,3.64vw,4.375rem)] pb-[clamp(2rem,3.64vw,3.8125rem)] min-h-[28.75rem] md:min-h-[32.4375rem]">
          <div className="flex flex-col">
            <Heading
              id="need-help-heading"
              level={2}
              tone="onDark"
              className="font-serif text-[clamp(2.5rem,3.75vw,3.75rem)] leading-[120%] font-normal text-white"
            >
              {stripHtml(title)}
            </Heading>

            {/* Subtitle / Prompt */}
            {(subTitle || description) ? (
              <p className="mt-3 font-sans text-[clamp(1rem,1.25vw,1.125rem)] leading-[150%] font-normal text-white max-w-[33.75rem]">
                {subTitle ||
                  (description
                    ? description.replace(/<[^>]*>?/gm, '').trim()
                    : null)}
              </p>
            ) : null}
          </div>

          {/* Form & Action Button: fluid width */}
          <div className="mt-6 sm:mt-7 w-full">
            <NeedHelpForm buttonLabel={ctaLabel} buttonHref={ctaHref} />
          </div>
        </div>

        {/* Right Nurse Cutout Image: fluid bounds */}
        {personSrc ? (
          <div className="pointer-events-none absolute top-[2.4375rem] left-[53.93%] z-10 hidden md:flex h-[34.8125rem] w-[36.375rem] max-w-[34.64vw] items-end justify-center">
            <img
              src={personSrc}
              alt={mediaAlt}
              className={
                imageClassName ??
                'h-full w-full object-contain object-bottom'
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  </Section>
);
