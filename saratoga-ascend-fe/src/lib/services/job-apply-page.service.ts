import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import { JOB_APPLY_PAGE_QUERY } from '@/lib/graphql/queries/job-apply-page';
import { unwrapImage, type RawStrapiMedia } from '@/lib/api/strapi';
import {
  JobApplyPageDataSchema,
  type JobApplyPageData,
  type ApiResult,
  ok,
} from '@/lib/schemas';

export interface JobApplyPageQueryResult {
  jobApplyPage: (Record<string, unknown> & {
    heroBackgroundImage?: RawStrapiMedia | null;
    Section?: unknown[];
  }) | null;
}

export const defaultJobApplyPageData: JobApplyPageData = {
  heroTitle: 'Apply for the position',
  heroSubtitleTemplate: 'Complete the form below to apply for {jobTitle}.',
  heroBackgroundImage: null,
  breadcrumbRoot: 'Home',
  breadcrumbCareers: 'Careers',
  breadcrumbJobSearch: 'Job Search',
  breadcrumbCurrent: 'Apply',
  cardTitle: 'Your Information',
  personalInfoTitle: 'Personal Information',
  personalInfoSubtitle: 'Tell us how we can contact you.',
  firstNameLabel: 'First Name *',
  firstNamePlaceholder: 'Enter First Name',
  lastNameLabel: 'Last Name *',
  lastNamePlaceholder: 'Enter Last Name',
  emailLabel: 'Email Address *',
  emailPlaceholder: 'Enter Email Address',
  phoneLabel: 'Phone Number *',
  phonePlaceholder: 'Enter Phone Number',
  careerPreferencesTitle: 'Career Preferences',
  careerPreferencesSubtitle: 'Help us understand what opportunities interest you.',
  careerAreaLabel: 'Primary Career Area *',
  careerAreaPlaceholder: 'Enter Primary Career Area',
  preferredLocationLabel: 'Preferred Location *',
  preferredLocationPlaceholder: 'Enter Preferred Location',
  employmentPreferenceLabel: 'Employment Preference *',
  employmentPreferencePlaceholder: 'Enter Employment Preference',
  resumeTitle: 'Resume',
  resumeSubtitle: 'Upload your most recent resume. PDF, DOC or DOCX up to 10 MB.',
  dropzoneText: 'Drop file here',
  uploadButtonText: 'Upload PDF',
  resetButtonLabel: 'Cancel',
  submitButtonLabel: 'Submit',
  modalTitle: 'Application Submitted',
  modalDescription:
    'Thank you for applying. We’ve received your application and our team will review your profile.',
  modalHomeButtonLabel: 'Home',
  modalExploreJobsButtonLabel: 'Explore More Jobs',
  modalSupportText: 'Need help? Contact our careers support team',
  modalSupportEmail: 'careers@company.com',
  Section: [],
  seo: {
    metaTitle: 'Apply for the position | Saratoga Ascend Careers',
    metaDescription:
      'Complete the form below to apply for open healthcare and government positions at Saratoga Ascend.',
  },
};

/**
 * Editorial content for the Job Application page single type.
 * Always resolves to either CMS data or standard fallback defaults.
 */
export async function getJobApplyPageData(): Promise<ApiResult<JobApplyPageData>> {
  if (isMockMode) return ok(defaultJobApplyPageData);

  try {
    let result = await gql.query<JobApplyPageQueryResult>(
      JOB_APPLY_PAGE_QUERY,
      { status: defaultPublicationStatus },
      { quiet: true }
    );

    if (result.error && defaultPublicationStatus === 'DRAFT') {
      result = await gql.query<JobApplyPageQueryResult>(
        JOB_APPLY_PAGE_QUERY,
        { status: 'PUBLISHED' },
        { quiet: true }
      );
    }

    const rawPatch = result.data?.jobApplyPage;
    if (!rawPatch) {
      return ok(defaultJobApplyPageData);
    }

    const resolvedPatch = {
      ...defaultJobApplyPageData,
      ...rawPatch,
      heroBackgroundImage:
        unwrapImage(rawPatch.heroBackgroundImage) || defaultJobApplyPageData.heroBackgroundImage,
      Section: Array.isArray(rawPatch.Section) ? rawPatch.Section : [],
    };

    const parsed = JobApplyPageDataSchema.safeParse(resolvedPatch);
    if (!parsed.success) {
      return ok(defaultJobApplyPageData);
    }

    return ok(parsed.data);
  } catch {
    return ok(defaultJobApplyPageData);
  }
}
