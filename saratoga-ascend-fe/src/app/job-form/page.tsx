import type { Metadata } from 'next';
import { ApplyPageTemplate } from '@/components/templates';
import { getJobApplyPageData } from '@/lib/services';

interface SearchParamsProps {
  searchParams?: Promise<{
    job?: string;
    title?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const pageResult = await getJobApplyPageData();
  const pageData = pageResult.data;

  return {
    title: pageData?.seo?.metaTitle || pageData?.heroTitle || 'Apply for the position',
    description:
      pageData?.seo?.metaDescription ||
      'Complete the form below to apply for healthcare and mission-critical government opportunities with Saratoga Ascend.',
  };
}

export default async function JobFormPage({ searchParams }: SearchParamsProps) {
  const [params, pageResult] = await Promise.all([
    searchParams ? searchParams : Promise.resolve({ job: '', title: '' }),
    getJobApplyPageData(),
  ]);

  const jobTitle = params?.title || (params?.job ? decodeURIComponent(params.job).replace(/-/g, ' ') : undefined);
  const pageData = pageResult.data;

  return <ApplyPageTemplate pageData={pageData ?? undefined} jobTitle={jobTitle} />;
}
