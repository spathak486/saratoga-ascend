'use client';

import { stripHtml } from '@/lib/utils/text';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '../atoms';

export interface JobSearchHeroProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  onSearch?: (query: { keyword: string; location: string }) => void;
  defaultLocation?: string;
  locations?: string[];
}

/**
 * Job Search Banner Variant (`banner_job_search`)
 * Matches Figma 1920x723 Hero:
 * - Background Image: Collaborative Governance and Healthcare Team
 * - Gradient Overlay: linear-gradient(90.1deg, #EAF4FB 23.08%, rgba(234, 244, 251, 0) 101.83%)
 * - Title: DM Serif Text, 90px (responsive clamp), color #0A0A0A ("Find Your Next Opportunity")
 * - Subtitle/Lede: Google Sans Flex, 24px, font-medium, color #022E4C (Primary-Blue)
 * - Search Capsule: 740px x 79px, #FFFFFF, border 1.33px #CBCBCB, radius 100px
 *   - Search Icon (34px) + Job Title input (placeholder "Job title, keywords...")
 *   - Vertical Divider (31.5px #BDBDBD)
 *   - Location Pin Icon (34px) + Dynamic Location dropdown/input
 *   - Red Circular Action/Submit Button (60px #F01424) with arrow icon
 */
export const JobSearchHero: React.FC<JobSearchHeroProps> = ({
  title = 'Find Your Next Opportunity',
  description = 'Explore open positions across healthcare, technology, science and operations.',
  imageSrc,
  imageAlt = 'Healthcare Team',
  onSearch,
  defaultLocation = '',
  locations: initialLocations,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams?.get('search') || '');
  const [location, setLocation] = useState(searchParams?.get('location') || defaultLocation);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [availableLocations, setAvailableLocations] = useState<string[]>(
    initialLocations || []
  );
  const [isLoading, setIsLoading] = useState(!initialLocations || initialLocations.length === 0);

  useEffect(() => {
    // Dynamically fetch locations from API route
    fetch('/api/job-filters')
      .then((res) => res.json())
      .then((data) => {
        if (data.locations && data.locations.length > 0) {
          const locNames = data.locations.map((l: any) => l.name);
          setAvailableLocations(locNames);
        }
      })
      .catch(() => {
        // Handled silently
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSearch) {
      onSearch({ keyword, location });
    }

    // Broadcast search query via URL and custom event so JobListingSection picks it up immediately
    const params = new URLSearchParams(window.location.search);
    if (keyword.trim()) {
      params.set('search', keyword.trim());
    } else {
      params.delete('search');
    }
    if (location && location !== 'All Locations') {
      params.set('location', location);
    } else {
      params.delete('location');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });

    // Dispatch global custom event for instant sync
    window.dispatchEvent(
      new CustomEvent('job-search-trigger', {
        detail: { keyword: keyword.trim(), location: location === 'All Locations' ? '' : location },
      })
    );

    // Smooth scroll down to openings section
    const openingsEl = document.getElementById('our-openings');
    if (openingsEl) {
      openingsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bgImage = imageSrc || '/images/confident-healthcare-team.png';

  return (
    <section
      aria-label={stripHtml(title)}
      className="relative w-full max-w-[1920px] mx-auto min-h-[560px] md:min-h-[640px] xl:min-h-[723px] overflow-hidden flex items-center bg-[#EAF4FB]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bgImage}
          alt={imageAlt}
          className="w-full h-full object-cover object-right md:object-[80%_center] xl:object-[right_-101px_top_-245px]"
        />
        {/* Figma Rectangle 40081 Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90.1deg, #EAF4FB 23.08%, rgba(234, 244, 251, 0.85) 55%, rgba(234, 244, 251, 0) 100%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <Container className="relative z-10 py-12 sm:py-16 xl:py-20 w-full">
        <div className="flex flex-col max-w-[991px]">
          {/* Main Title: DM Serif Text, 90px */}
          <h1 className="font-serif text-[44px] sm:text-[64px] lg:text-[80px] xl:text-[90px] leading-[115%] text-[#0A0A0A] tracking-[-0.01em]">
            {stripHtml(title)}
          </h1>

          {/* Subtitle / Lede: Google Sans Flex, 24px */}
          <p className="mt-4 sm:mt-6 font-sans text-lg sm:text-xl lg:text-[24px] leading-[160%] font-medium text-[#022E4C] max-w-[599px]">
            {stripHtml(description)}
          </p>

          {/* Search Capsule Form (Group 2085663755: 740px x 79px) */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-10 lg:mt-12 w-full max-w-[740px] bg-white rounded-full border-[1.33px] border-[#CBCBCB] shadow-sm flex items-center px-4 sm:px-6 py-2.5 sm:py-3 transition-all focus-within:border-brand-navy focus-within:shadow-md"
          >
            {/* Search Icon & Keyword Input */}
            <div className="flex items-center flex-1 min-w-0 pr-2">
              {/* Search Vector (34px) */}
              <svg
                className="w-6 h-6 sm:w-[30px] sm:h-[30px] text-[#545454] shrink-0 mr-2 sm:mr-3"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15.5833" cy="15.5833" r="11.3333" stroke="#545454" strokeWidth="2.5" />
                <path
                  d="M23.6667 23.6667L29.75 29.75"
                  stroke="#545454"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keywords..."
                className="w-full bg-transparent font-sans text-base sm:text-lg text-[#0A0A0A] placeholder-[#808080] focus:outline-none"
              />
            </div>

            {/* Vertical Divider (Rectangle 39728: 31.5px, #BDBDBD) */}
            <div className="w-[1.5px] h-8 bg-[#BDBDBD] shrink-0 mx-1 sm:mx-2" />

            {/* Location Pin Icon & Location Dropdown */}
            <div className="relative flex items-center flex-1 min-w-0 pl-2">
              {/* Location Pin Vector (34px) */}
              <svg
                className="w-6 h-6 sm:w-[30px] sm:h-[30px] text-[#545454] shrink-0 mr-2 sm:mr-3"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 18.4167C19.3472 18.4167 21.25 16.5139 21.25 14.1667C21.25 11.8195 19.3472 9.91666 17 9.91666C14.6528 9.91666 12.75 11.8195 12.75 14.1667C12.75 16.5139 14.6528 18.4167 17 18.4167Z"
                  stroke="#545454"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 29.75C22.6667 24.0833 28.3333 19.125 28.3333 14.1667C28.3333 7.92588 23.2575 2.83334 17 2.83334C10.7425 2.83334 5.66667 7.92588 5.66667 14.1667C5.66667 19.125 11.3333 24.0833 17 29.75Z"
                  stroke="#545454"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="w-full text-left bg-transparent font-sans text-base sm:text-lg text-[#0A0A0A] truncate focus:outline-none flex items-center justify-between"
              >
                <span className={location ? 'text-[#0A0A0A]' : 'text-[#808080]'}>
                  {location || 'Location'}
                </span>
                <svg
                  className={`w-4 h-4 ml-1 text-gray-500 transition-transform ${
                    isLocationOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Location Popup Menu */}
              {isLocationOpen && (
                <div className="absolute left-0 top-[120%] w-full sm:min-w-[220px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-h-[260px] overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setLocation('');
                      setIsLocationOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-sans text-sm hover:bg-[#EAF4FB] transition-colors ${
                      !location ? 'font-semibold text-brand-navy' : 'text-[#0A0A0A]'
                    }`}
                  >
                    All Locations
                  </button>
                  {availableLocations.length > 0 ? (
                    availableLocations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setLocation(loc);
                          setIsLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 font-sans text-sm hover:bg-[#EAF4FB] transition-colors ${
                          location === loc ? 'font-semibold text-brand-navy' : 'text-[#0A0A0A]'
                        }`}
                      >
                        {loc}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      {isLoading ? 'Loading locations...' : 'No locations found'}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Red Circle Submit Button (Group 2085665760: 60px x 60px, #F01424) */}
            <button
              type="submit"
              aria-label="Search Jobs"
              className="ml-1 sm:ml-2 flex h-12 w-12 sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full bg-[#F01424] text-white shadow-md hover:bg-[#d6121f] transition-all hover:scale-105 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F01424]"
            >
              {/* Arrow Icon */}
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 rotate-[-45deg]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};
