'use client';

import React, { useState } from 'react';
import { BrandIcon } from './BrandIcon';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  badge?: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#022e4c]/30 shadow-md ring-1 ring-[#022e4c]/5'
                : 'bg-white/90 border-slate-200 hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#022e4c]"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-base sm:text-lg font-bold transition-colors ${
                    isOpen ? 'text-[#e11d48]' : 'text-[#022e4c]'
                  }`}
                >
                  {item.title}
                </span>
                {item.badge && (
                  <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-rose-50 text-[#e11d48] border border-rose-200">
                    {item.badge}
                  </span>
                )}
              </div>

              <div
                className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                  isOpen
                    ? 'rotate-180 bg-rose-50 text-[#e11d48]'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <BrandIcon name="chevronDown" size="sm" />
              </div>
            </button>

            <div
              id={`accordion-content-${item.id}`}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
