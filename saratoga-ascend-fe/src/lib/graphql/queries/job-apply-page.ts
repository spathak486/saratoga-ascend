import { IMAGE_FIELDS, SEO_FIELDS, PAGE_BASE_SECTION_FRAGMENTS } from '../fragments';

export const JOB_APPLY_PAGE_QUERY = `
  query GetJobApplyPage($status: PublicationStatus = PUBLISHED) {
    jobApplyPage(status: $status) {
      documentId
      heroTitle
      heroSubtitleTemplate
      heroBackgroundImage {
        ${IMAGE_FIELDS}
      }
      breadcrumbRoot
      breadcrumbCareers
      breadcrumbJobSearch
      breadcrumbCurrent
      cardTitle
      personalInfoTitle
      personalInfoSubtitle
      firstNameLabel
      firstNamePlaceholder
      lastNameLabel
      lastNamePlaceholder
      emailLabel
      emailPlaceholder
      phoneLabel
      phonePlaceholder
      careerPreferencesTitle
      careerPreferencesSubtitle
      careerAreaLabel
      careerAreaPlaceholder
      preferredLocationLabel
      preferredLocationPlaceholder
      employmentPreferenceLabel
      employmentPreferencePlaceholder
      resumeTitle
      resumeSubtitle
      dropzoneText
      uploadButtonText
      resetButtonLabel
      submitButtonLabel
      modalTitle
      modalDescription
      modalHomeButtonLabel
      modalExploreJobsButtonLabel
      modalSupportText
      modalSupportEmail
      Section {
        ${PAGE_BASE_SECTION_FRAGMENTS}
      }
      seo {
        ${SEO_FIELDS}
      }
    }
  }
`;
