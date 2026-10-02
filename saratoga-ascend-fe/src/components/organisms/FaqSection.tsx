'use client';

import React from 'react';
import { FaqAccordion, type FaqItem } from '../molecules/FaqAccordion';
import { GeneralLink } from '../atoms/GeneralLink';

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
  return (
    <section aria-labelledby="faq-heading" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1920px]">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-20">
          
          {/* Left Column (Content & CTA) */}
          <div className="w-full lg:w-[680px] flex-shrink-0 flex flex-col gap-10">
            <div className="flex flex-col gap-10">
              <h2 id="faq-heading" className="font-serif text-[72px] leading-[1.2] text-[#D31E2D]">
                {title ?? 'Any Questions?'}
              </h2>
              {(subTitle || description) && (
                <p className="font-sans text-[24px] leading-[40px] text-[#0A0A0A]">
                  {subTitle ?? (description ? description.replace(/<[^>]*>?/gm, '').trim() : null)}
                </p>
              )}
            </div>

            {supportCta && (
              <div className="bg-[#2A91DC]/20 border-2 border-[#2B88D9] rounded-[20px] pt-[40px] pr-[39px] pb-[40px] pl-[32px] flex flex-col items-start gap-[10px] backdrop-blur-[18px]">
                <h3 className="font-serif text-[38px] leading-[40px] text-black">
                  {supportCta.title || 'Still have questions?'}
                </h3>
                {supportCta.subTitle && (
                  <p className="font-sans font-medium text-[24px] leading-[36px] text-[#475569] mt-2 mb-6">
                    {supportCta.subTitle}
                  </p>
                )}
                {supportCta.link && (
                  <GeneralLink
                    {...supportCta.link}
                    variant="primary"
                  />
                )}
              </div>
            )}
          </div>

          {/* Right Column (Accordion) */}
          <div className="w-full lg:w-[954px] flex-shrink-0">
            {items.length > 0 ? (
              <FaqAccordion items={items} />
            ) : (
              <p className="text-gray-500">No FAQs available.</p>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};
