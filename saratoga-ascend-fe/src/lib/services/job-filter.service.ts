import { gql } from '@/lib/api/graphql';
import { type ApiResult, ok, fail } from '@/lib/schemas';

export interface LocationItem {
  id?: string;
  name: string;
  slug: string;
  state?: string | null;
  order?: number | null;
}

export interface SpecialityItem {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  order?: number | null;
}

export interface JobTypeItem {
  id?: string;
  name: string;
  slug: string;
  order?: number | null;
}

export interface JobSortOptionItem {
  id?: string;
  label: string;
  value: string;
  isDefault?: boolean | null;
  order?: number | null;
}

const GET_ALL_LOCATIONS_QUERY = `
  query GetAllLocations {
    locations(sort: "order:asc") {
      name
      slug
      state
      order
    }
  }
`;

const GET_ALL_SPECIALITIES_QUERY = `
  query GetAllSpecialities {
    specialities(sort: "order:asc") {
      name
      slug
      description
      order
    }
  }
`;

const GET_ALL_JOB_TYPES_QUERY = `
  query GetAllJobTypes {
    jobTypes(sort: "order:asc") {
      name
      slug
      order
    }
  }
`;

const GET_ALL_JOB_SORT_OPTIONS_QUERY = `
  query GetAllJobSortOptions {
    jobSortOptions(sort: "order:asc") {
      label
      value
      isDefault
      order
    }
  }
`;

export async function getAllLocations(): Promise<ApiResult<LocationItem[]>> {
  const result = await gql.query<{ locations: LocationItem[] }>(GET_ALL_LOCATIONS_QUERY);
  if (result.error) {
    return fail('UNKNOWN', 500, result.error.message);
  }
  return ok(result.data?.locations ?? []);
}

export async function getAllSpecialities(): Promise<ApiResult<SpecialityItem[]>> {
  const result = await gql.query<{ specialities: SpecialityItem[] }>(GET_ALL_SPECIALITIES_QUERY);
  if (result.error) {
    return fail('UNKNOWN', 500, result.error.message);
  }
  return ok(result.data?.specialities ?? []);
}

export async function getAllJobTypes(): Promise<ApiResult<JobTypeItem[]>> {
  const result = await gql.query<{ jobTypes: JobTypeItem[] }>(GET_ALL_JOB_TYPES_QUERY);
  if (result.error) {
    return fail('UNKNOWN', 500, result.error.message);
  }
  return ok(result.data?.jobTypes ?? []);
}

export async function getAllJobSortOptions(): Promise<ApiResult<JobSortOptionItem[]>> {
  const result = await gql.query<{ jobSortOptions: JobSortOptionItem[] }>(GET_ALL_JOB_SORT_OPTIONS_QUERY);
  if (result.error) {
    return fail('UNKNOWN', 500, result.error.message);
  }
  return ok(result.data?.jobSortOptions ?? []);
}
