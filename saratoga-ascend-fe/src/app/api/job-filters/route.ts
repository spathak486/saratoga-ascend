import { NextResponse } from 'next/server';
import { getAllLocations, getAllSpecialities, getAllJobTypes, getAllJobSortOptions } from '@/lib/services/job-filter.service';

export async function GET() {
  const [locations, specialities, jobTypes, jobSortOptions] = await Promise.all([
    getAllLocations(),
    getAllSpecialities(),
    getAllJobTypes(),
    getAllJobSortOptions(),
  ]);

  return NextResponse.json({
    locations: locations.data ?? [],
    specialities: specialities.data ?? [],
    jobTypes: jobTypes.data ?? [],
    jobSortOptions: jobSortOptions.data ?? [],
  });
}

