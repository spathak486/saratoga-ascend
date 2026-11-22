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
    if (content.includes('<li') || content.includes('<ul') || content.includes('<p')) {
      return (
        <div
          className="prose prose-slate max-w-none [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-2 [&_li]:relative [&_li]:pl-6 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.5625rem] [&_li]:before:w-2.5 [&_li]:before:h-2.5 [&_li]:before:rounded-full [&_li]:before:bg-[#F01424] text-[1.125rem] text-[#1C1C1C] leading-[160%] font-sans"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    // Plain text fallback lines
    const lines = content.split('\n').filter(Boolean);
    return (
      <ul className="space-y-2 text-[1.125rem] text-[#1C1C1C] leading-[160%] font-sans">
        {lines.map((line, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F01424] mt-2 flex-shrink-0" />
            <span>{line.replace(/^[-*•]\s*/, '')}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Dynamic headings with graceful fallbacks
  const overviewHeading = job.overviewTitle || 'Job Overview';
  const responsibilitiesHeading = job.responsibilitiesTitle || 'Responsibilities';
  const requirementsHeading = job.requirementsTitle || 'Requirements';
  const benefitsHeading = job.benefitsTitle || 'Benefits';
  const additionalDetailsHeading = job.additionalDetailsTitle || 'Additional Information';

  // Dynamic apply button with fallback
  const applyLabel = job.applyButton?.label || 'Apply';
  const applyHref = job.applyButton?.href || `/careers/apply?job=${encodeURIComponent(job.slug)}`;
  const isExternal = job.applyButton?.isExternal || false;
  const target = job.applyButton?.target || (isExternal ? '_blank' : '_self');

  return (
    <div
      className={`w-full bg-[#FBFBFB] border-[1.5px] border-[#C6C6C6] rounded-[1.5rem] xl:rounded-[2rem] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
        isExpanded ? 'bg-gradient-to-br from-[#FFF5F5]/40 via-white to-[#F0F7FD]/40' : ''
      }`}
    >
      {/* Accordion Header */}
      <div
        onClick={toggleAccordion}
        className="w-full p-6 lg:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 select-none"
      >
        {/* Left Side: Title & Subtitle + Details */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-8 flex-grow min-w-0">
          {/* Title */}
          <div className="flex items-center gap-4 shrink-0">
            <h3 className="font-serif text-[1.75rem] xl:text-[2.3125rem] leading-[120%] tracking-[1px] text-[#101828]">
              {job.title}
            </h3>
            {/* Vertical Separator for large screens */}
            <div className="hidden xl:block w-[1.5px] h-[2.25rem] bg-[#D0D5DD] shrink-0" />
          </div>

          {/* Subtitle / Tagline & Metadata */}
          <div className="flex flex-col gap-2">
            {/* Tagline row with Speciality pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              {job.speciality?.name && (
                <span className="px-3.5 py-1 rounded-full text-[0.875rem] xl:text-[1rem] font-semibold text-[#2B88D9] bg-[#2A91DC]/10">
                  {job.speciality.name}
                </span>
              )}
              {job.tagline && (
                <span className="font-sans text-[1.125rem] xl:text-[1.375rem] font-normal text-[#475467] leading-[140%]">
                  {job.tagline}
                </span>
              )}
            </div>

            {/* Meta info bar: Location • Job Type • Salary • Experience */}
            <div className="flex flex-wrap items-center gap-2 text-[0.875rem] xl:text-[1rem] text-[#64748B] font-sans">
              {job.locations && job.locations.length > 0 ? (
                <span>{job.locations.map((l) => l.name).join(', ')}</span>
              ) : job.location?.name ? (
                <span>{job.location.name}</span>
              ) : null}
              {(job.locations?.length || job.location?.name) && job.jobType?.name && <span>•</span>}
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
            className="w-[3.125rem] h-[3.125rem] xl:w-[4.125rem] xl:h-[4.125rem] rounded-full bg-[#E4EBF1]/50 hover:bg-[#E4EBF1] flex items-center justify-center transition-colors shadow-xs"
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
              <h4 className="font-serif text-[2rem] xl:text-[2.75rem] text-[#0A0A0A] mb-4">
                {overviewHeading}
              </h4>
              <p className="font-sans text-[1.125rem] xl:text-[1.375rem] text-[#344054] leading-[160%] whitespace-pre-line">
                {job.overview}
              </p>
            </div>
          )}

          {/* 2-Column Grid: Responsibilities & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-10">
            {job.responsibilities && (
              <div>
                <h4 className="font-serif text-[2rem] xl:text-[2.75rem] text-[#0A0A0A] mb-4">
                  {responsibilitiesHeading}
                </h4>
                {renderList(job.responsibilities)}
              </div>
            )}

            {job.requirements && (
              <div>
                <h4 className="font-serif text-[2rem] xl:text-[2.75rem] text-[#0A0A0A] mb-4">
                  {requirementsHeading}
                </h4>
                {renderList(job.requirements)}
              </div>
            )}
          </div>

          {/* Benefits */}
          {job.benefits && (
            <div className="mb-10">
              <h4 className="font-serif text-[2rem] xl:text-[2.75rem] text-[#0A0A0A] mb-4">
                {benefitsHeading}
              </h4>
              {renderList(job.benefits)}
            </div>
          )}

          {/* Extra Rich Text / Additional Details Section */}
          {job.additionalDetails && (
            <div className="mb-10">
              <h4 className="font-serif text-[2rem] xl:text-[2.75rem] text-[#0A0A0A] mb-4">
                {additionalDetailsHeading}
              </h4>
              {renderList(job.additionalDetails)}
            </div>
          )}

          {/* Dynamic Apply Button */}
          <div className="pt-4">
            <a
              href={applyHref}
              target={target}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-[3.125rem] text-white font-medium text-[1.125rem] transition-all duration-300 shadow-md hover:shadow-lg hover:brightness-105"
              style={{
                background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
              }}
            >
              <span>{applyLabel}</span>
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
