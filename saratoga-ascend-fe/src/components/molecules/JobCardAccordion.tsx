'use client';

import React, { useState } from 'react';
import { Job } from '@/lib/types/job';

interface JobCardAccordionProps {
  job: Job;
  defaultExpanded?: boolean;
}

export const JobCardAccordion: React.FC<JobCardAccordionProps> = ({
  job,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  // Helper to render HTML or bullet points safely
  const renderList = (content?: string | null) => {
    if (!content) return null;
    if (content.includes('<li') || content.includes('<ul')) {
      // Remove standard bullets and wrap in custom list items with red vector markers
      return (
        <div
          className="prose prose-slate max-w-none [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-2 [&_li]:relative [&_li]:pl-6 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[9px] [&_li]:before:w-2.5 [&_li]:before:h-2.5 [&_li]:before:rounded-full [&_li]:before:bg-[#F01424] text-[18px] text-[#1C1C1C] leading-[160%] font-sans"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    // Plain text fallback lines
    const lines = content.split('\n').filter(Boolean);
    return (
      <ul className="space-y-2 text-[18px] text-[#1C1C1C] leading-[160%] font-sans">
        {lines.map((line, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F01424] mt-2 flex-shrink-0" />
            <span>{line.replace(/^[-*•]\s*/, '')}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={`w-full bg-[#FBFBFB] border-[1.5px] border-[#C6C6C6] rounded-[24px] lg:rounded-[32px] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
        isExpanded ? 'bg-gradient-to-br from-[#FFF5F5]/40 via-white to-[#F0F7FD]/40' : ''
      }`}
    >
      {/* Accordion Header */}
      <div
        onClick={toggleAccordion}
        className="w-full p-6 lg:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 select-none"
      >
        {/* Left Side: Title & Subtitle + Details */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 flex-grow">
          {/* Title */}
          <div className="flex items-center gap-4">
            <h3 className="font-serif text-[28px] lg:text-[37px] leading-[120%] tracking-[1px] text-[#101828]">
              {job.title}
            </h3>
            {/* Vertical Separator for large screens */}
            <div className="hidden lg:block w-[1.5px] h-[36px] bg-[#D0D5DD]" />
          </div>

          {/* Subtitle / Tagline & Metadata */}
          <div className="flex flex-col gap-2">
            {/* Tagline row with Speciality pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              {job.speciality?.name && (
                <span className="px-3.5 py-1 rounded-full text-[14px] lg:text-[16px] font-semibold text-[#2B88D9] bg-[#2A91DC]/10">
                  {job.speciality.name}
                </span>
              )}
              {job.tagline && (
                <span className="font-sans text-[18px] lg:text-[22px] font-normal text-[#475467] leading-[140%]">
                  {job.tagline}
                </span>
              )}
            </div>

            {/* Meta info bar: Location • Job Type • Salary • Experience */}
            <div className="flex flex-wrap items-center gap-2 text-[14px] lg:text-[16px] text-[#64748B] font-sans">
              {job.location?.name && <span>{job.location.name}</span>}
              {job.location?.name && job.jobType?.name && <span>•</span>}
              {job.jobType?.name && <span>{job.jobType.name}</span>}
              {job.salaryRange && (
                <>
                  <span>•</span>
                  <span>{job.salaryRange}</span>
                </>
              )}
              {job.experience && (
                <>
                  <span>•</span>
                  <span>{job.experience}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Expand Button */}
        <div className="flex-shrink-0 self-end md:self-center">
          <button
            type="button"
            aria-label={isExpanded ? 'Collapse role' : 'Expand role'}
            className="w-[50px] h-[50px] lg:w-[66px] lg:h-[66px] rounded-full bg-[#E4EBF1]/50 hover:bg-[#E4EBF1] flex items-center justify-center transition-colors shadow-xs"
          >
            <svg
              className={`w-6 h-6 text-[#101828] transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div className="px-6 lg:px-12 pb-10 pt-2 animate-fadeIn">
          {/* Red Divider Line from Figma Frame 2085663754 */}
          <div className="w-full h-[1.5px] bg-[#F01424] mb-8 lg:mb-10" />

          {/* Job Overview */}
          {job.overview && (
            <div className="mb-10">
              <h4 className="font-serif text-[32px] lg:text-[44px] text-[#0A0A0A] mb-4">
                Job Overview
              </h4>
              <p className="font-sans text-[18px] lg:text-[22px] text-[#344054] leading-[160%] whitespace-pre-line">
                {job.overview}
              </p>
            </div>
          )}

          {/* 2-Column Grid: Responsibilities & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-10">
            {job.responsibilities && (
              <div>
                <h4 className="font-serif text-[32px] lg:text-[44px] text-[#0A0A0A] mb-4">
                  Responsibilities
                </h4>
                {renderList(job.responsibilities)}
              </div>
            )}

            {job.requirements && (
              <div>
                <h4 className="font-serif text-[32px] lg:text-[44px] text-[#0A0A0A] mb-4">
                  Requirements
                </h4>
                {renderList(job.requirements)}
              </div>
            )}
          </div>

          {/* Benefits */}
          {job.benefits && (
            <div className="mb-10">
              <h4 className="font-serif text-[32px] lg:text-[44px] text-[#0A0A0A] mb-4">
                Benefits
              </h4>
              {renderList(job.benefits)}
            </div>
          )}

          {/* Apply Button */}
          <div className="pt-4">
            <a
              href={`#apply-${job.slug}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-[50px] text-white font-medium text-[18px] transition-all duration-300 shadow-md hover:shadow-lg hover:brightness-105"
              style={{
                background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
              }}
            >
              <span>Apply</span>
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
