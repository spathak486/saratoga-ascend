export interface JobLocation {
  name: string;
  slug: string;
  state?: string | null;
}

export interface JobSpeciality {
  name: string;
  slug: string;
}

export interface JobType {
  name: string;
  slug: string;
}

export interface JobApplyButton {
  label?: string | null;
  href?: string | null;
  target?: string | null;
  isExternal?: boolean | null;
}

export interface Job {
  id?: string;
  title: string;
  slug: string;
  tagline?: string | null;
  salaryRange?: string | null;
  experience?: string | null;
  overviewTitle?: string | null;
  overview?: string | null;
  responsibilitiesTitle?: string | null;
  responsibilities?: string | null;
  requirementsTitle?: string | null;
  requirements?: string | null;
  benefitsTitle?: string | null;
  benefits?: string | null;
  additionalDetailsTitle?: string | null;
  additionalDetails?: string | null;
  applyButton?: JobApplyButton | null;
  location?: JobLocation | null;
  locations?: JobLocation[] | null;
  speciality?: JobSpeciality | null;
  jobType?: JobType | null;
  isFeatured?: boolean | null;
  postedDate?: string | null;
}

export interface JobFilterParams {
  location?: string | string[];
  speciality?: string | string[];
  jobType?: string | string[];
  sort?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
}
