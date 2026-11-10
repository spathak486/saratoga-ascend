import { NextRequest, NextResponse } from 'next/server';
import { getAllJobs } from '@/lib/services/job.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locations = searchParams.getAll('location');
    const specialities = searchParams.getAll('speciality');
    const jobTypes = searchParams.getAll('jobType');
    const sort = searchParams.get('sort') || undefined;
    const search = searchParams.get('search') || undefined;

    const res = await getAllJobs({
      location: locations.length > 0 ? locations : undefined,
      speciality: specialities.length > 0 ? specialities : undefined,
      jobType: jobTypes.length > 0 ? jobTypes : undefined,
      sort,
      search,
    });

    if (!res.ok) {
      return NextResponse.json({ error: res.error }, { status: 500 });
    }

    return NextResponse.json(res.data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

