'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Job } from '@/lib/types/job';
import { FALLBACK_JOBS } from '@/lib/data/fallbackJobs';
import { JobFilterBar, FilterOption } from '@/components/molecules/JobFilterBar';
import { JobCardAccordion } from '@/components/molecules/JobCardAccordion';

interface JobListingSectionProps {
  heading?: string;
  subheading?: string;
  itemsPerPage?: number;
}

export const JobListingSection: React.FC<JobListingSectionProps> = ({
  heading = 'Our Openings',
  subheading = 'Discover open roles and find where your skills can make an impact. Explore opportunities across departments and locations.',
  itemsPerPage = 10,
}) => {
  const searchParams = useSearchParams();

  // Filter state
  const [locations, setLocations] = useState<FilterOption[]>([]);
  const [specialities, setSpecialities] = useState<FilterOption[]>([]);
  const [jobTypes, setJobTypes] = useState<FilterOption[]>([]);
  const [sortOptions, setSortOptions] = useState<FilterOption[]>([
    { label: 'Most Recent', value: 'recent' },
    { label: 'Title: A to Z', value: 'title-asc' },
    { label: 'Title: Z to A', value: 'title-desc' },
  ]);

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Job data state
  const [jobs, setJobs] = useState<Job[]>(FALLBACK_JOBS);
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(itemsPerPage || 10);

  // Initialize search query and location from URL on initial mount
  useEffect(() => {
    const urlSearch = searchParams?.get('search');
    const urlLoc = searchParams?.get('location');
    if (urlSearch) setSearchQuery(urlSearch);
    if (urlLoc) setSelectedLocations([urlLoc]);
  }, [searchParams]);

  // Listen to banner search submit events across the page
  useEffect(() => {
    const handleBannerSearch = (e: Event) => {
      const customEvent = e as CustomEvent<{ keyword?: string; location?: string }>;
      if (customEvent.detail) {
        if (typeof customEvent.detail.keyword === 'string') {
          setSearchQuery(customEvent.detail.keyword);
        }
        if (customEvent.detail.location) {
          setSelectedLocations([customEvent.detail.location]);
        } else if (customEvent.detail.location === '') {
          setSelectedLocations([]);
        }
      }
    };

    window.addEventListener('job-search-trigger', handleBannerSearch);
    return () => window.removeEventListener('job-search-trigger', handleBannerSearch);
  }, []);

  // 1. Fetch filter metadata from /api/job-filters
  useEffect(() => {
    let isMounted = true;
    async function loadFilters() {
      try {
        const res = await fetch('/api/job-filters');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) {
          if (data.locations && data.locations.length > 0) {
            setLocations(
              data.locations.map((l: { name: string; slug: string }) => ({
                label: l.name,
                value: l.slug || l.name,
              }))
            );
          } else {
            setLocations([
              { label: 'San Diego', value: 'san-diego' },
              { label: 'Dallas', value: 'dallas' },
              { label: 'Philadelphia', value: 'philadelphia' },
              { label: 'Phoenix', value: 'phoenix' },
            ]);
          }

          if (data.specialities && data.specialities.length > 0) {
            setSpecialities(
              data.specialities.map((s: { name: string; slug: string }) => ({
                label: s.name,
                value: s.slug || s.name,
              }))
            );
          } else {
            setSpecialities([
              { label: 'Healthcare Jobs', value: 'healthcare-jobs' },
              { label: 'IT Jobs', value: 'it-jobs' },
              { label: 'Allied Health', value: 'allied-health' },
              { label: 'Laboratory & Scientific', value: 'laboratory-scientific' },
            ]);
          }

          if (data.jobTypes && data.jobTypes.length > 0) {
            setJobTypes(
              data.jobTypes.map((t: { name: string; slug: string }) => ({
                label: t.name,
                value: t.slug || t.name,
              }))
            );
          } else {
            setJobTypes([
              { label: 'Full-Time', value: 'full-time' },
              { label: 'Part-Time', value: 'part-time' },
              { label: 'Contract', value: 'contract' },
              { label: 'Surge', value: 'surge' },
            ]);
          }

          if (data.jobSortOptions && data.jobSortOptions.length > 0) {
            setSortOptions(
              data.jobSortOptions.map((s: { label: string; value: string }) => ({
                label: s.label,
                value: s.value,
              }))
            );
          }
        }
      } catch (e) {
        console.warn('Failed to load filter options:', e);
      }
    }
    loadFilters();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Query jobs from /api/jobs whenever filters, sort, or search change
  useEffect(() => {
    let isMounted = true;
    async function fetchJobs() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        selectedLocations.forEach((l) => params.append('location', l));
        selectedSpecialities.forEach((s) => params.append('speciality', s));
        selectedJobTypes.forEach((t) => params.append('jobType', t));
        if (selectedSort) params.set('sort', selectedSort);
        if (searchQuery.trim()) params.set('search', searchQuery.trim());

        const res = await fetch(`/api/jobs?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to load jobs');
        const data = await res.json();
        if (isMounted) {
          setJobs(data.jobs || []);
          setVisibleCount(itemsPerPage || 10);
        }
      } catch (err) {
        console.warn('Using client-filtered fallback jobs:', err);
        let filtered = [...FALLBACK_JOBS];
        if (selectedLocations.length > 0) {
          filtered = filtered.filter((j) =>
            selectedLocations.some(
              (l) =>
                j.location?.slug?.toLowerCase().includes(l.toLowerCase()) ||
                j.location?.name?.toLowerCase().includes(l.toLowerCase()) ||
                j.locations?.some((loc) => loc.slug?.toLowerCase().includes(l.toLowerCase()) || loc.name?.toLowerCase().includes(l.toLowerCase()))
            )
          );
        }
        if (selectedSpecialities.length > 0) {
          filtered = filtered.filter((j) =>
            selectedSpecialities.some(
              (s) =>
                j.speciality?.slug?.toLowerCase().includes(s.toLowerCase()) ||
                j.speciality?.name?.toLowerCase().includes(s.toLowerCase())
            )
          );
        }
        if (selectedJobTypes.length > 0) {
          filtered = filtered.filter((j) =>
            selectedJobTypes.some(
              (t) =>
                j.jobType?.slug?.toLowerCase().includes(t.toLowerCase()) ||
                j.jobType?.name?.toLowerCase().includes(t.toLowerCase())
            )
          );
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter((j) =>
            j.title.toLowerCase().includes(q) ||
            j.tagline?.toLowerCase().includes(q) ||
            j.overview?.toLowerCase().includes(q)
          );
        }
        if (isMounted) {
          setJobs(filtered);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, [selectedLocations, selectedSpecialities, selectedJobTypes, selectedSort, searchQuery, itemsPerPage]);

  const displayedJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

  return (
    <section id="our-openings" className="w-full bg-[#FFFFFF] py-16 lg:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1680px] mx-auto flex flex-col gap-10">
        {/* Header & Meta Row (Group 2085665770) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-[42px] md:text-[56px] lg:text-[72px] text-[#1C1C1C] leading-[115%]">
                {heading}
              </h2>
              {subheading && (
                <p className="font-sans text-[18px] md:text-[22px] lg:text-[24px] text-[#1C1C1C] leading-[150%] max-w-[900px] mt-4">
                  {subheading}
                </p>
              )}
            </div>

            {/* Opportunities Count */}
            <div className="font-sans text-[20px] lg:text-[24px] font-medium text-[#1C1C1C] whitespace-nowrap self-start md:self-end pb-2">
              {jobs.length} {jobs.length === 1 ? 'opportunity' : 'opportunities'} available
            </div>
          </div>

          {/* Active Search Pill (if searched from Banner) */}
          {searchQuery && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-sans text-gray-500">Search results for:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4FB] text-[#022E4C] text-sm font-medium">
                "{searchQuery}"
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-[#F01424] font-bold text-base leading-none"
                >
                  ×
                </button>
              </span>
            </div>
          )}

          {/* Filter Pills Bar */}
          <JobFilterBar
            locations={locations}
            specialities={specialities}
            jobTypes={jobTypes}
            sortOptions={sortOptions}
            selectedLocations={selectedLocations}
            selectedSpecialities={selectedSpecialities}
            selectedJobTypes={selectedJobTypes}
            selectedSort={selectedSort}
            onLocationChange={setSelectedLocations}
            onSpecialityChange={setSelectedSpecialities}
            onJobTypeChange={setSelectedJobTypes}
            onSortChange={setSelectedSort}
          />
        </div>

        {/* Jobs Listing Accordions (Frame 2147226531) */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {loading ? (
            <div className="py-20 flex justify-center items-center">
              <div className="w-10 h-10 border-4 border-[#2A91DC] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : displayedJobs.length === 0 ? (
            <div className="py-16 text-center bg-[#FBFBFB] border border-[#E4EBF1] rounded-[24px]">
              <h4 className="font-serif text-[28px] text-[#101828] mb-2">No roles found</h4>
              <p className="text-gray-500 font-sans text-[18px]">
                Try adjusting your filters or search keywords.
              </p>
            </div>
          ) : (
            displayedJobs.map((job, idx) => (
              <JobCardAccordion
                key={job.slug || idx}
                job={job}
                defaultExpanded={idx === 0}
              />
            ))
          )}
        </div>

        {/* Load More Button (Frame 2147226533) */}
        {hasMore && (
          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + (itemsPerPage || 10))}
              className="inline-flex items-center justify-center px-10 py-4 rounded-[60px] text-white font-medium text-[18px] transition-all duration-300 shadow-md hover:shadow-lg hover:brightness-105"
              style={{
                background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
              }}
            >
              Load More Openings
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
