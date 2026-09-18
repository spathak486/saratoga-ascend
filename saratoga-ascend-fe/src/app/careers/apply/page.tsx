import type { Metadata } from 'next';
import { ApplyPageTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Job Application',
  description:
    'Submit your information and resume for healthcare and mission-critical government opportunities with Saratoga Ascend.',
};

export default function JobsApplyPage() {
  return <ApplyPageTemplate />;
}