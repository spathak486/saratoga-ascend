import React from 'react';
import { JobApplicationForm } from '../organisms';

/** Page chrome for the job-application routes. */
export const ApplyPageTemplate: React.FC = () => (
  <div className="min-h-screen bg-white text-brand-navy font-sans antialiased">
    <main id="main">
      <JobApplicationForm />
    </main>
  </div>
);