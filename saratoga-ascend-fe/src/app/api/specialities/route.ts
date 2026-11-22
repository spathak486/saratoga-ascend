import { NextResponse } from 'next/server';
import { gql } from '@/lib/api/graphql';

const GET_SPECIALITIES_WITH_JOBS_QUERY = `
  query GetSpecialitiesWithJobs {
    pages(filters: { slug: { eq: "/" } }, status: PUBLISHED) {
      Section {
        __typename
        ... on ComponentReferencesJobsBySpecialityReference {
          title
          description
        }
      }
    }
    specialities(sort: ["order:asc", "createdAt:asc"]) {
      documentId
      name
      slug
      roleTitle
      description
      doctorImage {
        url
        alternativeText
      }
      backgroundImage {
        url
        alternativeText
      }
      ctaLabel
      ctaHref
      order
      jobs {
        documentId
        title
        slug
        tagline
        salaryRange
        experience
      }
    }
    jobs(sort: ["postedDate:desc", "createdAt:desc"], pagination: { limit: 20 }) {
      documentId
      title
      slug
      tagline
      salaryRange
      experience
      speciality {
        documentId
        slug
      }
    }
  }
`;

interface SpecialityRecord {
  documentId?: string;
  name: string;
  slug: string;
  roleTitle?: string;
  description?: string;
  doctorImage?: { url?: string };
  backgroundImage?: { url?: string };
  ctaLabel?: string;
  ctaHref?: string;
  order?: number;
  jobs?: JobRecord[];
}

interface JobRecord {
  documentId?: string;
  title: string;
  slug: string;
  tagline?: string;
  salaryRange?: string;
  experience?: string;
  speciality?: {
    documentId?: string;
    slug?: string;
  } | null;
}

interface QueryResult {
  pages?: Array<{
    Section?: Array<{
      __typename?: string;
      title?: string;
      description?: string;
    }>;
  }>;
  specialities: SpecialityRecord[];
  jobs: JobRecord[];
}

export async function GET() {
  try {
    const res = await gql.query<QueryResult>(GET_SPECIALITIES_WITH_JOBS_QUERY);

    if (res.error) {
      return NextResponse.json({ error: res.error }, { status: 500 });
    }

    const { pages = [], specialities = [], jobs = [] } = res.data ?? {};

    const homeSections = pages[0]?.Section || [];
    const specialitySection = homeSections.find(
      (s) => s.__typename === 'ComponentReferencesJobsBySpecialityReference'
    );

    const title = specialitySection?.title || '';
    const description = specialitySection?.description || '';

    // Only map jobs that actually belong to this speciality in the database!
    // No mock data, no synthetic fallback. If null, jobs array remains empty.
    const enrichedSpecialities = specialities.map((spec: SpecialityRecord) => {
      let specJobs = spec.jobs && spec.jobs.length > 0 ? spec.jobs : [];
      if (specJobs.length === 0) {
        specJobs = jobs.filter(
          (j: JobRecord) => j.speciality?.slug === spec.slug || j.speciality?.documentId === spec.documentId
        );
      }
      return {
        ...spec,
        jobs: specJobs,
      };
    });

    return NextResponse.json({
      title,
      description,
      specialities: enrichedSpecialities,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch specialities';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
