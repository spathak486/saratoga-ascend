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

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  className = '',
}) => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={`faq-accordion-list ${className}`.trim()}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={`${item.question}-${index}`}
            className={`faq-accordion-item${isOpen ? ' faq-accordion-item--open' : ''}`}
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
                <span className="faq-accordion-question">{item.question}</span>
                <span className="faq-accordion-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="faq-accordion-chevron"
                  >
                    <path
                      d="M3.5 5.25L7 8.75L10.5 5.25"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`faq-accordion-panel${isOpen ? ' faq-accordion-panel--open' : ''}`}
            >
              <div className="faq-accordion-panel-inner">
                <p className="faq-accordion-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
