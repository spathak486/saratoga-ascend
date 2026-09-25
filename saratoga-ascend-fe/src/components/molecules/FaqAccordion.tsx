'use client';

import React, { useId, useState } from 'react';

export interface FaqCategory {
  name: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  categories?: FaqCategory[];
}

export interface FaqAccordionProps {
  /** Already-filtered items — no category logic here */
  items: readonly FaqItem[];
  className?: string;
}

/**
 * Pure accordion — renders items with border-bottom dividers and +/- icons.
 * Category filtering is handled by the parent FaqSection.
 */
export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  className = '',
}) => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className={className}>
      <div className="faq-accordion-list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div
              key={`${item.question}-${index}`}
              className="faq-accordion-item"
            >
              <h3 className="faq-accordion-heading">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="faq-accordion-trigger"
                >
                  <span className={`faq-accordion-question${isOpen ? ' faq-accordion-question--open' : ''}`}>
                    {item.question}
                  </span>

                  {/* Circular +/- icon */}
                  <span className="faq-accordion-icon-wrap" aria-hidden="true">
                    <span className={`faq-accordion-icon${isOpen ? ' faq-accordion-icon--minus' : ''}`}>
                      {isOpen ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 8H12" stroke="#475569" strokeWidth="1.667" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 4V12M4 8H12" stroke="#475569" strokeWidth="1.667" strokeLinecap="round"/>
                        </svg>
                      )}
                    </span>
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`faq-accordion-panel${isOpen ? ' faq-accordion-panel--open' : ''}`}
              >
                <p className="faq-accordion-answer">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
