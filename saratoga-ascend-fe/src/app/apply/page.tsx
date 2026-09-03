import type { Metadata } from 'next';
import { JobApplicationForm } from '@/components/organisms';

export const metadata: Metadata = {
  title: 'Job Application',
  description:
    'Submit your information and resume for healthcare and mission-critical government opportunities with Saratoga Ascend.',
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] py-10 md:py-16">
      <JobApplicationForm />
    </main>
  );
}
