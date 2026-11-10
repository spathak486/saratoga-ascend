'use client';

import React, { useState, useEffect } from 'react';
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
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState(defaultLocation);
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
          if (!location) {
            setLocation(locNames[0]);
          }
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
  };

  const bgImage = imageSrc || '/images/confident-healthcare-team.png';

  return (
    <section
      aria-label={title}
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
          {/* Title: DM Serif Text, 90px */}
          <h1 className="font-serif text-[clamp(2.75rem,5.5vw,5.625rem)] font-normal leading-[1.15] text-[#0A0A0A] max-w-[991px] tracking-tight">
            {title}
          </h1>

          {/* Subtitle / Description: Google Sans Flex, 24px, #022E4C */}
          <p className="mt-5 sm:mt-6 font-sans text-[clamp(1.125rem,1.5vw,1.5rem)] font-medium leading-[1.6] text-[#022E4C] max-w-[599px]">
            {description}
          </p>

          {/* Figma Group 2085663755: Search Box Container (740px x 79px) */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-10 relative flex w-full max-w-[740px] items-center rounded-[100px] border-[1.33px] border-[#CBCBCB] bg-white p-2 sm:p-2.5 shadow-sm transition-all focus-within:border-brand-navy focus-within:ring-2 focus-within:ring-brand-navy/20 min-h-[72px] sm:min-h-[79px]"
          >
            {/* Left Search Icon & Input */}
            <div className="flex flex-1 items-center gap-3 sm:gap-4 pl-3 sm:pl-5">
              {/* Search Vector Icon (34px) */}
              <svg
                className="w-7 h-7 sm:w-[34px] sm:h-[34px] text-[#545454] shrink-0"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="15.58" cy="15.58" r="9.91" stroke="#545454" strokeWidth="2.5" />
                <path d="M23.66 23.66L29.75 29.75" stroke="#545454" strokeWidth="2.5" strokeLinecap="round" />
              </svg>

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keywords..."
                className="w-full bg-transparent font-sans text-base sm:text-[18px] font-medium text-[#0A0A0A] placeholder-[#8B8A8A] focus:outline-none"
              />
            </div>

            {/* Vertical Divider (Vector 7214: 31.5px border #BDBDBD) */}
            <div className="hidden sm:block h-[31.5px] w-[1.5px] bg-[#BDBDBD] shrink-0 mx-2" />

            {/* Location Selector Dropdown */}
            <div className="relative flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-3 pr-2 shrink-0">
              {/* Location Pin Icon (34px) */}
              <svg
                className="w-6 h-6 sm:w-[34px] sm:h-[34px] text-[#545454] shrink-0"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M17 4.25C11.52 4.25 7.08 8.69 7.08 14.17C7.08 21.6 17 29.75 17 29.75C17 29.75 26.92 21.6 26.92 14.17C26.92 8.69 22.48 4.25 17 4.25Z"
                  stroke="#545454"
                  strokeWidth="2.125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="17" cy="14.17" r="3.54" stroke="#545454" strokeWidth="2.125" />
              </svg>

              {/* Location Picker Trigger */}
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-2 font-sans text-sm sm:text-[18px] text-[#545454] hover:text-[#0A0A0A] focus:outline-none"
              >
                <span className="truncate max-w-[90px] sm:max-w-[120px] font-normal">
                  {location || (isLoading ? 'Loading...' : 'Select Location')}
                </span>
                {/* Chevron Down Arrow */}
                <svg
                  className={`w-3 h-3 text-[#545454] transition-transform duration-200 ${
                    isLocationOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 12 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L6 5L11 1" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Location Dropdown Menu */}
              {isLocationOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 rounded-[12px] border border-[#E4EBF1] bg-[#F6F9FA] py-2 shadow-lg z-50">
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
