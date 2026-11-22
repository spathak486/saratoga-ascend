'use client';

import { stripHtml } from '@/lib/utils/text';
import React from 'react';

export interface TimelineStepItem {
  id?: string;
  stepNumber?: string | null;
  timeframe: string;
  title: string;
  description: string;
}

export interface TimelineSectionProps {
  id?: string;
  sectionTitle?: string | null;
  steps: TimelineStepItem[];
  className?: string;
}

/**
 * Vertical Step Timeline / Treatment Milestone Roadmap Component
 * Matches Figma container specifications:
 * - Left continuous track line: #F6EFEC (width: 2px)
 * - Circular milestone badge: 39.44px x 39.44px, background #2B88D9, text White Inter 700 16px
 * - Timeframe label: DM Serif Text, 18px, letter-spacing: 2.69px, uppercase, color: #919191
 * - Title: DM Serif Text, 30px, line-height: 46px, color: #00162D
 * - Description: Google Sans Flex, 24px, line-height: 160% (38px), color: #5A5A5A
 */
export const TimelineSection: React.FC<TimelineSectionProps> = ({
  id,
  sectionTitle,
  steps,
  className = '',
}) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div
      id={id}
      className={`my-6 sm:my-8 xl:my-10 w-full max-w-[65.875rem] scroll-mt-28 ${className}`.trim()}
    >
      {sectionTitle && (
        <h2 className="mb-8 font-serif text-3xl sm:text-4xl text-[#00162D] tracking-tight">
          {stripHtml(sectionTitle)}
        </h2>
      )}

      {/* Main Timeline Container with isolated stacking */}
      <div className="relative flex flex-col items-start w-full isolate pl-12 sm:pl-16 xl:pl-[4.5rem]">
        {/* Continuous Background Vertical Line: 2px solid #F6EFEC */}
        {/* Positioned at left: 20px (centered with the ~40px circle) */}
        <div
          className="absolute left-[1.1875rem] top-[1.25rem] bottom-[1.25rem] w-[2px] bg-[#F6EFEC] -z-10"
          aria-hidden="true"
        />

        {/* Timeline Steps List */}
        <div className="flex flex-col w-full gap-8 sm:gap-10 xl:gap-[2.5rem]">
          {steps.map((step, idx) => {
            const stepNum = step.stepNumber || `${idx + 1}`;

            return (
              <div
                key={step.id || `timeline-step-${idx}`}
                className="relative flex flex-col items-start w-full group"
              >
                {/* Step Circle Marker: 39.44px x 39.44px, #2B88D9, white number */}
                <div
                  className="absolute -left-[3rem] sm:-left-[4rem] xl:-left-[4.4819rem] top-0 flex items-center justify-center w-[2.465rem] h-[2.465rem] rounded-full bg-[#2B88D9] shadow-sm z-10 transition-transform duration-200 group-hover:scale-105"
                  aria-hidden="true"
                >
                  <span className="font-['Inter',sans-serif] font-bold text-[1rem] leading-[1.5rem] text-white">
                    {stepNum}
                  </span>
                </div>

                {/* Content Block */}
                <div className="flex flex-col items-start w-full">
                  {/* Timeframe Tag: DM Serif Text, 18px uppercase */}
                  <span className="font-serif font-normal text-sm sm:text-base xl:text-[1.125rem] leading-[1.75rem] tracking-[0.1681rem] uppercase text-[#919191] mb-1 sm:mb-2">
                    {step.timeframe}
                  </span>

                  {/* Heading 3: DM Serif Text, 30px */}
                  <h3 className="font-serif font-normal text-2xl sm:text-[1.75rem] xl:text-[1.875rem] leading-[1.3] xl:leading-[2.875rem] text-[#00162D] mb-2 sm:mb-2.5">
                    {stripHtml(step.title)}
                  </h3>

                  {/* Description: Google Sans Flex, 24px (160% line height) */}
                  <p className="font-sans font-normal text-base sm:text-lg xl:text-[1.5rem] leading-relaxed xl:leading-[2.375rem] text-[#5A5A5A] max-w-[61.125rem]">
                    {stripHtml(step.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;

