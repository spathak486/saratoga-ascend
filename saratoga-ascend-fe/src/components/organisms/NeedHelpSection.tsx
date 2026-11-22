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
      {/* Card: 1680x519px in desktop artboard, radius 52px */}
      <div className="relative isolate overflow-hidden rounded-[clamp(24px,2.7vw,52px)] bg-need-help-gradient min-h-[460px] md:min-h-[519px]">
        {/* Background Decorative Swooshes from Figma 1899:2560 */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-0 hidden lg:block w-[50%] max-w-[750px] overflow-hidden">
          <img
            src="/images/need-help-bg-graphic.png"
            alt=""
            className="h-full w-full object-contain object-right"
            aria-hidden="true"
          />
        </div>

        {/* Left Column Content: exact Figma layout (x=70, y=70 to 458) */}
        <div className="relative z-10 flex min-w-0 max-w-full lg:max-w-[55%] xl:max-w-[50%] flex-col justify-start px-[clamp(1.5rem,3.64vw,70px)] pt-[clamp(2rem,3.64vw,70px)] pb-[clamp(2rem,3.64vw,61px)] min-h-[460px] md:min-h-[519px]">
          <div className="flex flex-col">
            <Heading
              id="need-help-heading"
              level={2}
              tone="onDark"
              className="font-serif text-[clamp(2.5rem,3.75vw,60px)] leading-[120%] font-normal text-white"
            >
              {stripHtml(title)}
            </Heading>

            {/* Subtitle / Prompt */}
            {(subTitle || description) ? (
              <p className="mt-3 font-sans text-[clamp(1rem,1.25vw,18px)] leading-[150%] font-normal text-white max-w-[540px]">
                {subTitle ||
                  (description
                    ? description.replace(/<[^>]*>?/gm, '').trim()
                    : null)}
              </p>
            ) : null}
          </div>

          {/* Form & Action Button: Name/Email 540px width, 180x60px Pill Button */}
          <div className="mt-6 sm:mt-7 w-full">
            <NeedHelpForm buttonLabel={ctaLabel} buttonHref={ctaHref} />
          </div>
        </div>

        {/* Right Nurse Cutout Image: exact Figma node 1899:2583 (w=582, h=557, top=39, left=906 relative to 1680x519 card) */}
        {personSrc ? (
          <div className="pointer-events-none absolute top-[39px] left-[53.93%] z-10 hidden md:flex h-[557px] w-[582px] max-w-[34.64vw] items-end justify-center">
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
