'use client';

import React from 'react';
import { Container, Heading, Text } from '../atoms';
import { GeneralLink } from '../atoms/GeneralLink';
import { FaqAccordion, type FaqItem } from '../molecules/FaqAccordion';

export interface FaqSectionProps {
  title?: string;
  subTitle?: string;
  description?: string;
  imageSrc?: string;
  items?: readonly FaqItem[];
  supportCta?: any;
}

/**
 * Any Questions? — Figma 2243:3605.
 * Desktop: 680 left / 954 accordion, ~40px column gap, CTA low on the left.
 */
export const FaqSection: React.FC<FaqSectionProps> = ({
  title,
  subTitle,
  description,
  items = [],
  supportCta,
}) => {
  const lead =
    subTitle ??
    (description ? description.replace(/<[^>]*>?/gm, '').trim() : undefined);

  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full bg-brand-surface py-10 md:py-16 xl:py-[7.75rem]"
    >
      <Container size="home" className="max-xl:px-5!">
        <div className="flex flex-col items-stretch gap-10 xl:flex-row xl:items-stretch xl:gap-10">
          {/* Left — title + support CTA (Figma left 680 / CTA 597) */}
          <div className="flex w-full max-w-[42.5rem] flex-col gap-10 xl:w-[40.476%] xl:max-w-[42.5rem] xl:justify-between xl:gap-16">
            <div className="flex flex-col gap-6 xl:gap-10">
              <Heading
                id="faq-heading"
                level={2}
                size="section"
                tone="inherit"
                className="text-brand-cta-from max-xl:text-[2rem]! max-xl:leading-[2.5rem]!"
              >
                {title ?? 'Any Questions?'}
              </Heading>
              {lead ? (
                <Text
                  size="lead"
                  tone="inherit"
                  className="max-w-[41.0625rem] text-ink max-xl:text-base! max-xl:leading-5! xl:text-2xl! xl:leading-[2.5rem]!"
                >
                  {lead}
                </Text>
              ) : null}
            </div>

            {supportCta ? (
              <div className="flex w-full max-w-[37.3125rem] flex-col items-start gap-5 rounded-[1.25rem] border-2 border-brand-sky bg-[rgb(42_145_220/0.2)] px-8 py-10 backdrop-blur-[18px] md:pr-[2.4375rem] md:pl-8">
                <Heading
                  level={3}
                  size="statLabel"
                  tone="inherit"
                  className="text-[clamp(1.75rem,2.5vw,2.375rem)]! leading-10! text-ink"
                >
                  {supportCta.title || 'Still have questions?'}
                </Heading>
                {supportCta.subTitle ? (
                  <Text
                    size="lead"
                    tone="inherit"
                    className="font-medium text-slate-body max-xl:text-base! max-xl:leading-6! xl:text-2xl! xl:leading-[1.5]!"
                  >
                    {supportCta.subTitle}
                  </Text>
                ) : null}
                {supportCta.link ? (
                  <GeneralLink
                    href={supportCta.link.href || '#'}
                    isExternal={supportCta.link.isExternal}
                    variant="button"
                    buttonVariant="cta"
                    size="cta"
                    className="mt-2"
                  >
                    {supportCta.link.label || 'Contact Us'}
                  </GeneralLink>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Right — accordion (Figma 954) */}
          <div className="w-full min-w-0 flex-1 xl:max-w-[59.625rem]">
            {items.length > 0 ? (
              <FaqAccordion items={items} />
            ) : (
              <p className="font-sans text-slate-body">No FAQs available.</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
