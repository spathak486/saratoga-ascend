'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface FilterOption {
  label: string;
  value: string;
}

interface JobFilterBarProps {
  locations: FilterOption[];
  specialities: FilterOption[];
  jobTypes: FilterOption[];
  sortOptions: FilterOption[];
  selectedLocations: string[];
  selectedSpecialities: string[];
  selectedJobTypes: string[];
  selectedSort: string;
  onLocationChange: (values: string[]) => void;
  onSpecialityChange: (values: string[]) => void;
  onJobTypeChange: (values: string[]) => void;
  onSortChange: (value: string) => void;
}

export const JobFilterBar: React.FC<JobFilterBarProps> = ({
  locations,
  specialities,
  jobTypes,
  sortOptions,
  selectedLocations,
  selectedSpecialities,
  selectedJobTypes,
  selectedSort,
  onLocationChange,
  onSpecialityChange,
  onJobTypeChange,
  onSortChange,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleCheckboxToggle = (
    currentList: string[],
    val: string,
    updateFn: (newList: string[]) => void
  ) => {
    if (currentList.includes(val)) {
      updateFn(currentList.filter((x) => x !== val));
    } else {
      updateFn([...currentList, val]);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap items-center gap-3 md:gap-4 my-6 z-30"
    >
      {/* 1. Location Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown('location')}
          className={`h-[50px] px-6 rounded-full flex items-center justify-center gap-2.5 transition-all text-[18px] leading-[150%] font-medium font-sans border ${
            openDropdown === 'location' || selectedLocations.length > 0
              ? 'bg-[#E4EBF1] border-[#000000] text-black shadow-sm'
              : 'bg-[#E4EBF1]/30 hover:bg-[#E4EBF1]/60 border-transparent text-black'
          }`}
        >
          <span>
            {selectedLocations.length === 0
              ? 'Location'
              : selectedLocations.length === 1
              ? selectedLocations[0]
              : `Location (${selectedLocations.length})`}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              openDropdown === 'location' ? 'rotate-180' : ''
            }`}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.75L6 6.25L10.5 1.75"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {openDropdown === 'location' && (
          <div className="absolute left-0 mt-2 min-w-[200px] w-max max-h-[300px] overflow-y-auto bg-[#F6F9FA] border-[1.5px] border-[#E4EBF1] rounded-[10px] p-3 shadow-xl z-50">
            {locations.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No locations found</div>
            ) : (
              <div className="flex flex-col gap-2">
                {locations.map((loc) => {
                  const isChecked = selectedLocations.includes(loc.value);
                  return (
                    <label
                      key={loc.value}
                      className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#EAF4FB] rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          handleCheckboxToggle(selectedLocations, loc.value, onLocationChange)
                        }
                        className="w-4 h-4 rounded border-gray-400 text-[#F01424] focus:ring-[#F01424] cursor-pointer"
                      />
                      <span className="text-[16px] text-[#000000] font-sans">{loc.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Speciality Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown('speciality')}
          className={`h-[50px] px-6 rounded-full flex items-center justify-center gap-2.5 transition-all text-[18px] leading-[150%] font-medium font-sans border ${
            openDropdown === 'speciality' || selectedSpecialities.length > 0
              ? 'bg-[#E4EBF1] border-[#000000] text-black shadow-sm'
              : 'bg-[#E4EBF1]/30 hover:bg-[#E4EBF1]/60 border-transparent text-black'
          }`}
        >
          <span>
            {selectedSpecialities.length === 0
              ? 'Speciality'
              : selectedSpecialities.length === 1
              ? selectedSpecialities[0]
              : `Speciality (${selectedSpecialities.length})`}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              openDropdown === 'speciality' ? 'rotate-180' : ''
            }`}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.75L6 6.25L10.5 1.75"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {openDropdown === 'speciality' && (
          <div className="absolute left-0 mt-2 min-w-[220px] w-max max-h-[300px] overflow-y-auto bg-[#F6F9FA] border-[1.5px] border-[#E4EBF1] rounded-[10px] p-3 shadow-xl z-50">
            {specialities.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No specialities found</div>
            ) : (
              <div className="flex flex-col gap-2">
                {specialities.map((spec) => {
                  const isChecked = selectedSpecialities.includes(spec.value);
                  return (
                    <label
                      key={spec.value}
                      className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#EAF4FB] rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          handleCheckboxToggle(selectedSpecialities, spec.value, onSpecialityChange)
                        }
                        className="w-4 h-4 rounded border-gray-400 text-[#F01424] focus:ring-[#F01424] cursor-pointer"
                      />
                      <span className="text-[16px] text-[#000000] font-sans">{spec.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Job Type Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown('jobType')}
          className={`h-[50px] px-6 rounded-full flex items-center justify-center gap-2.5 transition-all text-[18px] leading-[150%] font-medium font-sans border ${
            openDropdown === 'jobType' || selectedJobTypes.length > 0
              ? 'bg-[#E4EBF1] border-[#000000] text-black shadow-sm'
              : 'bg-[#E4EBF1]/30 hover:bg-[#E4EBF1]/60 border-transparent text-black'
          }`}
        >
          <span>
            {selectedJobTypes.length === 0
              ? 'Job Type'
              : selectedJobTypes.length === 1
              ? selectedJobTypes[0]
              : `Job Type (${selectedJobTypes.length})`}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              openDropdown === 'jobType' ? 'rotate-180' : ''
            }`}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.75L6 6.25L10.5 1.75"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {openDropdown === 'jobType' && (
          <div className="absolute left-0 mt-2 min-w-[200px] w-max max-h-[300px] overflow-y-auto bg-[#F6F9FA] border-[1.5px] border-[#E4EBF1] rounded-[10px] p-3 shadow-xl z-50">
            {jobTypes.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No job types found</div>
            ) : (
              <div className="flex flex-col gap-2">
                {jobTypes.map((type) => {
                  const isChecked = selectedJobTypes.includes(type.value);
                  return (
                    <label
                      key={type.value}
                      className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#EAF4FB] rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          handleCheckboxToggle(selectedJobTypes, type.value, onJobTypeChange)
                        }
                        className="w-4 h-4 rounded border-gray-400 text-[#F01424] focus:ring-[#F01424] cursor-pointer"
                      />
                      <span className="text-[16px] text-[#000000] font-sans">{type.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Sort By */}
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown('sort')}
          className={`h-[50px] px-6 rounded-full flex items-center justify-center gap-2.5 transition-all text-[18px] leading-[150%] font-medium font-sans border ${
            openDropdown === 'sort'
              ? 'bg-[#E4EBF1] border-[#000000] text-black shadow-sm'
              : 'bg-[#E4EBF1]/30 hover:bg-[#E4EBF1]/60 border-transparent text-black'
          }`}
        >
          <span>
            {sortOptions.find((o) => o.value === selectedSort)?.label || 'Sort By'}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              openDropdown === 'sort' ? 'rotate-180' : ''
            }`}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.75L6 6.25L10.5 1.75"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {openDropdown === 'sort' && (
          <div className="absolute left-0 mt-2 min-w-[200px] w-max bg-[#F6F9FA] border-[1.5px] border-[#E4EBF1] rounded-[10px] p-3 shadow-xl z-50">
            <div className="flex flex-col gap-1.5">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onSortChange(opt.value);
                    setOpenDropdown(null);
                  }}
                  className={`text-left px-3 py-1.5 rounded transition-colors text-[16px] font-sans ${
                    selectedSort === opt.value
                      ? 'bg-[#EAF4FB] text-[#022E4C] font-semibold'
                      : 'text-gray-700 hover:bg-[#EAF4FB]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters (if active) */}
      {(selectedLocations.length > 0 ||
        selectedSpecialities.length > 0 ||
        selectedJobTypes.length > 0) && (
        <button
          type="button"
          onClick={() => {
            onLocationChange([]);
            onSpecialityChange([]);
            onJobTypeChange([]);
          }}
          className="text-sm font-medium text-[#F01424] hover:underline ml-2"
        >
          Reset filters
        </button>
      )}
    </div>
  );
};

