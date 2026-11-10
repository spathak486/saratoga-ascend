import { gql } from '@/lib/api/graphql';
import { type ApiResult, ok, fail } from '@/lib/schemas';
import { Job, JobFilterParams, JobsResponse } from '@/lib/types/job';
import { FALLBACK_JOBS } from '@/lib/data/fallbackJobs';

export * from '@/lib/types/job';
export { FALLBACK_JOBS };

const GET_ALL_JOBS_QUERY = `
  query GetAllJobs {
    jobs(sort: "postedDate:desc") {
      title
      slug
      tagline
      salaryRange
      experience
      overview
      responsibilities
      requirements
      benefits
      isFeatured
      postedDate
      location {
        name
        slug
        state
      }
      speciality {
        name
        slug
      }
      jobType {
        name
        slug
      }
    }
  }
`;

export async function getAllJobs(params?: JobFilterParams): Promise<ApiResult<JobsResponse>> {
  try {
    const res = await gql.query<{ jobs: Job[] }>(GET_ALL_JOBS_QUERY);
    let items = res.data?.jobs && res.data.jobs.length > 0 ? res.data.jobs : FALLBACK_JOBS;

    // Apply filtering
    if (params) {
      if (params.location) {
        const locations = Array.isArray(params.location) ? params.location : [params.location];
        if (locations.length > 0 && !locations.includes('All')) {
          items = items.filter((j) => {
            const locName = j.location?.name?.toLowerCase() || '';
            const locSlug = j.location?.slug?.toLowerCase() || '';
            return locations.some((l) => {
              const needle = l.toLowerCase();
              return locName.includes(needle) || locSlug.includes(needle);
            });
          });
        }
      }

      if (params.speciality) {
        const specialities = Array.isArray(params.speciality) ? params.speciality : [params.speciality];
        if (specialities.length > 0 && !specialities.includes('All')) {
          items = items.filter((j) => {
            const specName = j.speciality?.name?.toLowerCase() || '';
            const specSlug = j.speciality?.slug?.toLowerCase() || '';
            return specialities.some((s) => {
              const needle = s.toLowerCase();
              return specName.includes(needle) || specSlug.includes(needle);
            });
          });
        }
      }

      if (params.jobType) {
        const types = Array.isArray(params.jobType) ? params.jobType : [params.jobType];
        if (types.length > 0 && !types.includes('All')) {
          items = items.filter((j) => {
            const typeName = j.jobType?.name?.toLowerCase() || '';
            const typeSlug = j.jobType?.slug?.toLowerCase() || '';
            return types.some((t) => {
              const needle = t.toLowerCase();
              return typeName.includes(needle) || typeSlug.includes(needle);
            });
          });
        }
      }

      if (params.search) {
        const query = params.search.trim().toLowerCase();
        if (query) {
          items = items.filter((j) => {
            return (
              j.title.toLowerCase().includes(query) ||
              (j.tagline && j.tagline.toLowerCase().includes(query)) ||
              (j.overview && j.overview.toLowerCase().includes(query)) ||
              (j.location?.name && j.location.name.toLowerCase().includes(query)) ||
              (j.speciality?.name && j.speciality.name.toLowerCase().includes(query))
            );
          });
        }
      }

      // Sort
      if (params.sort) {
        if (params.sort === 'title:asc' || params.sort === 'title-asc') {
          items = [...items].sort((a, b) => a.title.localeCompare(b.title));
        } else if (params.sort === 'title:desc' || params.sort === 'title-desc') {
          items = [...items].sort((a, b) => b.title.localeCompare(a.title));
        } else if (params.sort === 'postedDate:desc' || params.sort === 'recent') {
          items = [...items].sort((a, b) => {
            const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
            const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
            return dateB - dateA;
          });
        }
      }
    }

    return ok({
      jobs: items,
      total: items.length,
    });
  } catch (error) {
    return fail('UNKNOWN', 500, error instanceof Error ? error.message : 'Failed to fetch jobs');
  }
}
