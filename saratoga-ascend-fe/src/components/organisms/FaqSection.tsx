'use client';

import React, { useMemo, useState } from 'react';
import { FaqAccordion, type FaqItem } from '../molecules/FaqAccordion';

export interface FaqSectionProps {
  title?: string;
  subTitle?: string;
  description?: string;
  /** Decorative image — Figma: 263×263, right side of header */
  imageSrc?: string;
  items?: readonly FaqItem[];
}

const ALL_KEY = '__all__';

/**
 * FAQ Section — Figma "Main FAQ Section"
 * Layout: Header row (left: title+subtitle+pills | right: 263×263 image)
 *         Below: full-width accordion.
 */
export const FaqSection: React.FC<FaqSectionProps> = ({
  title,
  subTitle,
  description,
  imageSrc,
  items = [],
}) => {
  const [activeKey, setActiveKey] = useState(ALL_KEY);

  /* Collect unique categories */
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [];
    for (const item of items) {
      for (const c of item.categories ?? []) {
        if (!seen.has(c.name)) {
          seen.add(c.name);
          cats.push(c.name);
        }
      }
    }
    return cats;
  }, [items]);

  /* Filter items by active category */
  const filtered = useMemo(
    () =>
      activeKey === ALL_KEY
        ? items
        : items.filter((item) =>
            item.categories?.some((c) => c.name === activeKey),
          ),
    [items, activeKey],
  );

  const hasPills = categories.length > 0;

  return (
    <section aria-labelledby="faq-heading" className="faq-section">
      <div className="faq-section__inner">

        {/* ── Header row: [left] title + subtitle + pills | [right] image ── */}
        <div className="faq-section__header-row">

          {/* Left column */}
          <div className="faq-section__header-left">
            <h2 id="faq-heading" className="faq-section__title">
              {title ?? 'Any Questions?'}
            </h2>

            {(subTitle || description) && (
              <p className="faq-section__subtitle">
                {subTitle ??
                  (description
                    ? description.replace(/<[^>]*>?/gm, '').trim()
                    : null)}
              </p>
            )}

            {/* ── Category Filter Pills — in header per Figma ── */}
            {hasPills && (
              <div className="faq-pills-row" role="tablist" aria-label="Filter FAQs by category">
                {/* "All Inquiries" pill */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeKey === ALL_KEY}
                  onClick={() => setActiveKey(ALL_KEY)}
                  className={`faq-pill${activeKey === ALL_KEY ? '' : ' faq-pill--outline'}`}
                >
                  All Inquiries ({items.length})
                </button>

                {categories.map((name) => {
                  const count = items.filter((i) =>
                    i.categories?.some((c) => c.name === name),
                  ).length;
                  const isActive = activeKey === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveKey(name)}
                      className={`faq-pill faq-pill--outline${isActive ? ' faq-pill--outline-active' : ''}`}
                    >
                      {name} ({count})
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column: decorative 263×263 image */}
          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              width={263}
              height={263}
              className="faq-section__deco-img"
            />
          )}
        </div>

        {/* ── Accordion (filtered items) ── */}
        {filtered.length > 0 && (
          <FaqAccordion items={filtered} className="faq-section__accordion" />
        )}

      </div>
    </section>
  );
};
