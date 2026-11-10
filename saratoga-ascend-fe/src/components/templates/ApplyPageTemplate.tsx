import React from 'react';
import { JobApplicationForm, NeedHelpSection } from '../organisms';
import type { JobApplyPageData } from '@/lib/schemas';

export interface ApplyPageTemplateProps {
  pageData?: JobApplyPageData;
  jobTitle?: string;
}

/** Page chrome for the job-application routes. */
export const ApplyPageTemplate: React.FC<ApplyPageTemplateProps> = ({
  pageData,
  jobTitle,
}) => (
  <div className="min-h-screen bg-white text-brand-navy font-sans antialiased">
    <main id="main">
      {/* 1. Job Form Hero & Frame 661 */}
      <JobApplicationForm
        pageData={pageData}
        initialJobTitle={jobTitle || 'Registered Nurse – Emergency Department'}
      />

      {/* 2. Need Help Section (Frame 613 from Figma spec) */}
      <div className="pt-24 pb-12">
        <NeedHelpSection
          title={pageData?.needHelpTitle || 'Need Help?'}
          subTitle={pageData?.needHelpSubtitle || 'Sign up now and get hired easily'}
          ctaLabel={pageData?.needHelpButtonLabel || 'Get Started'}
        />
      </div>
    </main>
  </div>
);
