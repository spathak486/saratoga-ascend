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
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={`${item.question}-${index}`}
            className={`border-2 border-[#2B88D9] rounded-[20px] overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#2A91DC]/10' : 'bg-transparent'}`}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between px-[40px] py-[20px] text-left gap-10"
            >
              <span className="font-sans text-[28px] leading-[40px] font-medium text-black pr-4">
                {item.question}
              </span>

              <span 
                className={`flex-shrink-0 flex items-center justify-center w-[52px] h-[51px] rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#2FA3F4] text-black' : 'bg-[#B0D8F4] text-black'}`}
                aria-hidden="true"
              >
                <svg 
                  width="18" height="18" viewBox="0 0 14 14" fill="none" 
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <div className="px-[40px] pb-[20px] font-sans text-[24px] leading-[36px] text-[#475569]">
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
