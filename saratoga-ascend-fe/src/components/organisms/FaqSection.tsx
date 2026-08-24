import React from 'react';
import Image from 'next/image';
import { Container, GeneralLink, Heading } from '../atoms';
import { FaqAccordion, type FaqItem } from '../molecules/FaqAccordion';

const FAQ_COPY =
  'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web development to showcase layouts and visual elements without the distraction of meaningful content.';

const FAQ_ITEMS: readonly FaqItem[] = [
  { question: 'How this work?', answer: FAQ_COPY },
  { question: 'How this work?', answer: FAQ_COPY },
  { question: 'How this work?', answer: FAQ_COPY },
  { question: 'How this work?', answer: FAQ_COPY },
  { question: 'How this work?', answer: FAQ_COPY },
];

export interface FaqSectionProps {
  title?: string;
  subTitle?: string;
  description?: string;
  items?: readonly FaqItem[];
  backdropSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Third-last homepage band (Figma node 1:576). Gradient field, soft-light
 * medical photo, and a centred FAQ card.
 */
export const FaqSection: React.FC<FaqSectionProps> = ({
  title = 'Any Questions?',
  subTitle,
  description,
  items,
  backdropSrc = '/images/rodrigo-porto-vfy71fExF7g-unsplash%201.png',
  ctaLabel = 'Know More',
  ctaHref = '/about',
}) => {
  const displaySubTitle = subTitle || description || 'Proudly Serving Federal, State and Local clients';
  const displayItems = items && items.length > 0 ? items : FAQ_ITEMS;

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-faq-gradient min-h-[clamp(40rem,66.875vw,80.25rem)] w-full flex items-center justify-center"
    >
      <div
        className="pointer-events-none absolute max-w-none"
        style={{
          width: '2920px',
          height: '1947px',
          left: 'calc(50% - 1460px)',
          top: 'calc(50% - 1054px)',
          mixBlendMode: 'soft-light',
        }}
        aria-hidden="true"
      >
        <Image
          src={backdropSrc}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover size-full"
        />
      </div>

      <Container className="relative py-section">
        <div className="mx-auto w-full max-w-[69.5rem] rounded-media border border-brand-line bg-brand-surface-muted px-[clamp(1.5rem,5.73vw,6.94rem)] py-[clamp(2rem,4.17vw,5rem)]">
          <Heading id="faq-heading" level={2} size="section" tone="red">
            {title}
          </Heading>
          <p className="mt-6 max-w-[36ch] text-body-lg font-medium text-ink">
            {displaySubTitle}
          </p>

          <FaqAccordion items={displayItems} className="mt-block" />

          <GeneralLink
            href={ctaHref}
            variant="unstyled"
            className="mt-block inline-flex min-h-cta min-w-cta-wide items-center justify-center rounded-pill bg-brand-sky px-cta-x py-cta-y text-button font-bold text-brand-surface-muted shadow-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            {ctaLabel}
          </GeneralLink>
        </div>
      </Container>
    </section>
  );
};
