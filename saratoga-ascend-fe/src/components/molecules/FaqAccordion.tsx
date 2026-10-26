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
 * FAQ accordion — Figma 2243:3605 / 2243:3607.
 * Open: sky wash + rotated chevron. Closed: outline card.
 * Motion: 300ms grid-rows / color (no prototype tracks returned).
 */
export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  className = '',
}) => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className={`flex w-full flex-col gap-10 ${className}`.trim()}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={`${item.question}-${index}`}
            className={`overflow-hidden rounded-[1.25rem] border-2 border-brand-sky transition-colors duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? 'bg-[rgb(42_145_220/0.1)]' : 'bg-transparent'
            }`}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:gap-[3.75rem] md:px-[2.5625rem] md:py-[1.3125rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
              >
                <span className="min-w-0 flex-1 font-sans text-[clamp(1.125rem,1.5vw,1.75rem)] font-medium leading-[1.4] text-ink md:leading-10">
                  {item.question}
                </span>

                <span
                  className={`flex size-[3.1875rem] shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out motion-reduce:transition-none ${
                    isOpen
                      ? 'bg-[#2fa3f4] text-ink'
                      : 'bg-[#b0d8f4] text-ink'
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 14 14"
                    fill="none"
                    className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? 'rotate-180' : ''
                    }`}
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
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 font-sans text-[clamp(1rem,1.25vw,1.5rem)] leading-[1.5] text-slate-body md:px-[2.5625rem] md:pb-5">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
