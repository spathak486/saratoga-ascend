'use client';

import React from 'react';
import { FaqAccordion, type FaqItem } from '../molecules/FaqAccordion';
import { CtaButton } from '../molecules/CtaButton';

export interface FaqSectionProps {
  title?: string;
  subTitle?: string;
  description?: string;
  imageSrc?: string;
  items?: readonly FaqItem[];
  supportCta?: any;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  title,
  subTitle,
  description,
  items = [],
  supportCta,
}) => {
  const lead =
    subTitle ?? (description ? description.replace(/<[^>]*>?/gm, '').trim() : null);
  const ctaHref = supportCta?.link?.href as string | undefined;
  const ctaLabel = supportCta?.link?.label as string | undefined;

  return (
    <section aria-labelledby="faq-heading" className="faq-section">
      <div className="faq-section__inner">
        <div className="faq-section__left">
          <div className="faq-section__intro">
            <h2 id="faq-heading" className="faq-section__title">
              {title ?? 'Any Questions?'}
            </h2>
            {lead ? <p className="faq-section__subtitle">{lead}</p> : null}
          </div>

          {supportCta ? (
            <aside className="faq-section__cta">
              <h3 className="faq-section__cta-title">
                {supportCta.title || 'Still have questions?'}
              </h3>
              {supportCta.subTitle ? (
                <p className="faq-section__cta-copy">{supportCta.subTitle}</p>
              ) : null}
              {ctaHref ? (
                <CtaButton href={ctaHref} className="faq-section__cta-btn max-xl:whitespace-normal">
                  {ctaLabel || 'Contact Us'}
                </CtaButton>
              ) : null}
            </aside>
          ) : null}
        </div>

        <div className="faq-section__accordion">
          {items.length > 0 ? (
            <FaqAccordion items={items} />
          ) : (
            <p className="text-gray-500">No FAQs available.</p>
          )}
        </div>
      </div>
    </section>
  );
};
