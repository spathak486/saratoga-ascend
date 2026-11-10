import React from 'react';
import { JobApplicationForm } from '../organisms';
import { renderRegisteredSection } from '@/lib/registry/homeRegistry';
import type { JobApplyPageData } from '@/lib/schemas';

export interface ApplyPageTemplateProps {
  pageData?: JobApplyPageData;
  jobTitle?: string;
}

/** Page chrome for the job-application routes with dynamic zone support. */
export const ApplyPageTemplate: React.FC<ApplyPageTemplateProps> = ({
  pageData,
  jobTitle,
}) => {
  const dynamicSections = pageData?.Section || [];

  return (
    <div className="min-h-screen bg-white text-brand-navy font-sans antialiased">
      <main id="main">
        {/* 1. Job Form Hero & Frame 661 */}
        <JobApplicationForm
          pageData={pageData}
          initialJobTitle={jobTitle || 'Registered Nurse – Emergency Department'}
        />

        {/* 2. Purely Dynamic Zone Sections from CMS (no static CTA) */}
        {dynamicSections.length > 0 && (
          <div className="flex flex-col">
            {dynamicSections.map((section, idx) => (
              <React.Fragment key={idx}>
                {renderRegisteredSection(section as any, idx)}
              </React.Fragment>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
