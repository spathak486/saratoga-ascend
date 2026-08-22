'use client';

import React, { useId, useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: readonly FaqItem[];
  className?: string;
}

/**
 * Single-open accordion for the Any Questions card. The open row uses the
 * sky label and a minus; closed rows stay ink with a plus — same treatment
 * as Figma node 1:584.
 */
export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  className = '',
}) => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={`${item.question}-${index}`} className="border-b border-brand-line">
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
              >
                <span
                  className={`text-body-lg ${
                    isOpen ? 'font-bold text-brand-sky' : 'font-medium text-ink'
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`font-serif text-stat-label leading-none ${
                    isOpen ? 'text-brand-sky' : 'text-ink'
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <p className="max-w-[54rem] text-body-lg font-medium text-ink">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
