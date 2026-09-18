import React from 'react';
import { Container, GeneralLink, Heading, MediaFrame } from '../atoms';
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
  backdropSrc?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  items?: readonly FaqItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Third-last homepage band (Figma node 1:576). Gradient field, soft-light
 * medical photo, and a centred FAQ card.
 */
export const FaqSection: React.FC<FaqSectionProps> = ({
  backdropSrc = '/images/rodrigo-porto-vfy71fExF7g-unsplash%201.png',
  title,
  subTitle,
  description,
  items,
  ctaLabel,
  ctaHref,
}) => (
  <section
    aria-labelledby="faq-heading"
    className="relative overflow-hidden bg-cta-gradient"
  >
    <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

    <div className="absolute inset-[-20%] mix-blend-soft-light" aria-hidden="true">
      <MediaFrame
        src={backdropSrc}
        alt=""
        pendingLabel="faq-backdrop"
        tone="navyCard"
        sizes="100vw"
        imageClassName="object-cover!"
        className="size-full min-h-[clamp(40rem,66.88vw,80.25rem)] border-0"
      />
    </div>

    <Container className="relative py-section">
      <div className="mx-auto w-full max-w-[69.5rem] rounded-media border border-brand-line bg-brand-surface-muted px-[clamp(1.5rem,5.73vw,6.94rem)] py-[clamp(2rem,4.17vw,5rem)]">
        <Heading id="faq-heading" level={2} size="section" tone="red">
          {title || 'Any Questions?'}
        </Heading>
        <p className="mt-6 max-w-[36ch] text-body-lg font-medium text-ink">
          {subTitle ||
            (description
              ? description.replace(/<[^>]*>?/gm, '').trim()
              : 'Proudly Serving Federal, State and Local clients')}
        </p>

        <FaqAccordion items={items && items.length > 0 ? items : FAQ_ITEMS} className="mt-block" />

        <GeneralLink
          href={ctaHref || '/about'}
          variant="unstyled"
          className="mt-block inline-flex min-h-cta min-w-cta-wide items-center justify-center rounded-pill bg-brand-sky px-cta-x py-cta-y text-button font-bold text-brand-surface-muted shadow-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        >
          {ctaLabel || 'Know More'}
        </GeneralLink>
      </div>
    </Container>
  </section>
);
