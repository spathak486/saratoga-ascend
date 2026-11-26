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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'location' | 'speciality' | 'jobType'>('location');
  const containerRef = useRef<HTMLDivElement>(null);

  // Total active filter count
  const totalActiveFilters =
    selectedLocations.length + selectedSpecialities.length + selectedJobTypes.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

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
    <>
      <div
        ref={containerRef}
        className="relative my-4 sm:my-6 z-30"
      >
        {/* ========================================================================= */}
        {/* MOBILE VIEW (< md): Modern Clean Filter Bar with Bottom Sheet trigger     */}
        {/* ========================================================================= */}
        <div className="flex md:hidden items-center justify-between gap-2.5 w-full">
          {/* Main Filter Bottom Sheet Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className={`flex-1 h-11 px-4 rounded-full flex items-center justify-between border transition-all shadow-sm ${
              totalActiveFilters > 0
                ? 'bg-[#E4EBF1] border-[#022E4C] text-[#022E4C] font-semibold'
                : 'bg-[#F4F7F9] border-[#D0D5DD] text-[#101828] font-medium'
            }`}
          >
            <div className="flex items-center gap-2">
              {/* Filter Sliders Icon */}
              <svg
                className="w-4 h-4 text-currentColor"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span className="font-sans text-sm">Filters</span>
            </div>

            {totalActiveFilters > 0 ? (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F01424] text-white text-xs font-bold font-sans">
                {totalActiveFilters}
              </span>
            ) : (
              <span className="text-xs text-gray-500 font-sans">All</span>
            )}
          </button>

          {/* Compact Sort By Dropdown on Mobile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('sort')}
              className={`h-11 px-3.5 rounded-full flex items-center justify-center gap-1.5 border transition-all text-sm font-sans ${
                openDropdown === 'sort'
                  ? 'bg-[#E4EBF1] border-[#000000] text-black shadow-sm'
                  : 'bg-[#F4F7F9] border-[#D0D5DD] text-[#101828]'
              }`}
            >
              <span>{sortOptions.find((o) => o.value === selectedSort)?.label || 'Sort'}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openDropdown === 'sort' ? 'rotate-180' : ''
                }`}
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 1.75L6 6.25L10.5 1.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {openDropdown === 'sort' && (
              <div className="absolute right-0 mt-2 min-w-[12rem] bg-white border border-[#E4EBF1] rounded-xl p-2 shadow-2xl z-50">
                <div className="flex flex-col gap-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onSortChange(opt.value);
                        setOpenDropdown(null);
                      }}
                      className={`text-left px-3 py-2 rounded-lg transition-colors text-sm font-sans ${
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
        </div>

        {/* Active Filters Quick Tag Pills on Mobile */}
        {totalActiveFilters > 0 && (
          <div className="flex md:hidden flex-wrap items-center gap-1.5 mt-2.5">
            {selectedLocations.map((loc) => {
              const label = locations.find((l) => l.value === loc)?.label || loc;
              return (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EAF4FB] text-[#022E4C] text-xs font-sans font-medium"
                >
                  {label}
                  <button
                    type="button"
                    onClick={() =>
                      handleCheckboxToggle(selectedLocations, loc, onLocationChange)
                    }
                    className="hover:text-[#F01424] font-bold text-sm leading-none ml-0.5"
                  >
                    ×
                  </button>
                </span>
              );
            })}
            {selectedSpecialities.map((spec) => {
              const label = specialities.find((s) => s.value === spec)?.label || spec;
              return (
                <span
                  key={spec}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EAF4FB] text-[#022E4C] text-xs font-sans font-medium"
                >
                  {label}
                  <button
                    type="button"
                    onClick={() =>
                      handleCheckboxToggle(selectedSpecialities, spec, onSpecialityChange)
                    }
                    className="hover:text-[#F01424] font-bold text-sm leading-none ml-0.5"
                  >
                    ×
                  </button>
                </span>
              );
            })}
            {selectedJobTypes.map((type) => {
              const label = jobTypes.find((t) => t.value === type)?.label || type;
              return (
                <span
                  key={type}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EAF4FB] text-[#022E4C] text-xs font-sans font-medium"
                >
                  {label}
                  <button
                    type="button"
                    onClick={() =>
                      handleCheckboxToggle(selectedJobTypes, type, onJobTypeChange)
                    }
                    className="hover:text-[#F01424] font-bold text-sm leading-none ml-0.5"
                  >
                    ×
                  </button>
                </span>
              );
            })}
            <button
              type="button"
              onClick={() => {
                onLocationChange([]);
                onSpecialityChange([]);
                onJobTypeChange([]);
              }}
              className="text-xs font-medium text-[#F01424] hover:underline px-1 py-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (>= md): Classic Figma Desktop Filter Bar                     */}
        {/* ========================================================================= */}
        <div className="hidden md:flex flex-wrap items-center gap-3 lg:gap-4">
          {/* 1. Location Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('location')}
              className={`h-[3.125rem] px-[1.5rem] rounded-full flex items-center justify-center gap-2.5 transition-all text-[1.125rem] leading-[150%] font-medium font-sans border ${
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
              <div className="absolute left-0 mt-2 min-w-[12.5rem] w-max max-h-[18.75rem] overflow-y-auto bg-[#F6F9FA] border-[1.5px] border-[#E4EBF1] rounded-[0.625rem] p-3 shadow-xl z-50">
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
                          <span className="text-[1rem] text-[#000000] font-sans">{loc.label}</span>
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
              className={`h-[3.125rem] px-[1.5rem] rounded-full flex items-center justify-center gap-2.5 transition-all text-[1.125rem] leading-[150%] font-medium font-sans border ${
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
              <div className="absolute left-0 mt-2 min-w-[13.75rem] w-max max-h-[18.75rem] overflow-y-auto bg-[#F6F9FA] border-[1.5px] border-[#E4EBF1] rounded-[0.625rem] p-3 shadow-xl z-50">
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
                          <span className="text-[1rem] text-[#000000] font-sans">{spec.label}</span>
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
              className={`h-[3.125rem] px-[1.5rem] rounded-full flex items-center justify-center gap-2.5 transition-all text-[1.125rem] leading-[150%] font-medium font-sans border ${
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
              <div className="absolute left-0 mt-2 min-w-[12.5rem] w-max max-h-[18.75rem] overflow-y-auto bg-[#F6F9FA] border-[1.5px] border-[#E4EBF1] rounded-[0.625rem] p-3 shadow-xl z-50">
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
                          <span className="text-[1rem] text-[#000000] font-sans">{type.label}</span>
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
              className={`h-[3.125rem] px-[1.5rem] rounded-full flex items-center justify-center gap-2.5 transition-all text-[1.125rem] leading-[150%] font-medium font-sans border ${
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
              <div className="absolute right-0 sm:left-0 mt-2 min-w-[12.5rem] w-max bg-[#F6F9FA] border-[1.5px] border-[#E4EBF1] rounded-[0.625rem] p-3 shadow-xl z-50">
                <div className="flex flex-col gap-1.5">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onSortChange(opt.value);
                        setOpenDropdown(null);
                      }}
                      className={`text-left px-3 py-1.5 rounded transition-colors text-[1rem] font-sans ${
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

          {/* Desktop Clear Filters (if active) */}
          {totalActiveFilters > 0 && (
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
      </div>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM SHEET DRAWER (Airbnb / LinkedIn Style)                       */}
      {/* ========================================================================= */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col justify-end md:hidden">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Bottom Sheet Modal Container */}
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-[1.75rem] shadow-2xl flex flex-col overflow-hidden animate-slideUp">
            
            {/* Sheet Handle & Header */}
            <div className="pt-3 pb-4 px-6 border-b border-gray-100 flex flex-col items-center">
              {/* Drag bar indicator */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-3" />
              
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-medium text-[#101828]">Filter Roles</h3>
                  {totalActiveFilters > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#EAF4FB] text-[#022E4C] text-xs font-semibold">
                      {totalActiveFilters} active
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Category Tabs: Location | Speciality | Job Type */}
            <div className="flex border-b border-gray-100 px-4 bg-[#F8FAFC]">
              <button
                type="button"
                onClick={() => setActiveMobileTab('location')}
                className={`flex-1 py-3 text-sm font-sans font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeMobileTab === 'location'
                    ? 'border-[#2A91DC] text-[#022E4C] font-semibold'
                    : 'border-transparent text-gray-500'
                }`}
              >
                <span>Location</span>
                {selectedLocations.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#2A91DC] text-white text-[10px] flex items-center justify-center">
                    {selectedLocations.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveMobileTab('speciality')}
                className={`flex-1 py-3 text-sm font-sans font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeMobileTab === 'speciality'
                    ? 'border-[#2A91DC] text-[#022E4C] font-semibold'
                    : 'border-transparent text-gray-500'
                }`}
              >
                <span>Speciality</span>
                {selectedSpecialities.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#2A91DC] text-white text-[10px] flex items-center justify-center">
                    {selectedSpecialities.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveMobileTab('jobType')}
                className={`flex-1 py-3 text-sm font-sans font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeMobileTab === 'jobType'
                    ? 'border-[#2A91DC] text-[#022E4C] font-semibold'
                    : 'border-transparent text-gray-500'
                }`}
              >
                <span>Job Type</span>
                {selectedJobTypes.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#2A91DC] text-white text-[10px] flex items-center justify-center">
                    {selectedJobTypes.length}
                  </span>
                )}
              </button>
            </div>

            {/* Scrollable Options List */}
            <div className="p-5 overflow-y-auto max-h-[50vh] flex flex-col gap-2.5">
              {activeMobileTab === 'location' && (
                locations.length === 0 ? (
                  <div className="py-6 text-center text-sm text-gray-500">No locations found</div>
                ) : (
                  locations.map((loc) => {
                    const isChecked = selectedLocations.includes(loc.value);
                    return (
                      <label
                        key={loc.value}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#EAF4FB] border-[#2A91DC] text-[#022E4C] font-medium'
                            : 'bg-white border-gray-200 text-gray-800'
                        }`}
                      >
                        <span className="text-sm font-sans">{loc.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            handleCheckboxToggle(selectedLocations, loc.value, onLocationChange)
                          }
                          className="w-5 h-5 rounded border-gray-300 text-[#F01424] focus:ring-[#F01424]"
                        />
                      </label>
                    );
                  })
                )
              )}

              {activeMobileTab === 'speciality' && (
                specialities.length === 0 ? (
                  <div className="py-6 text-center text-sm text-gray-500">No specialities found</div>
                ) : (
                  specialities.map((spec) => {
                    const isChecked = selectedSpecialities.includes(spec.value);
                    return (
                      <label
                        key={spec.value}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#EAF4FB] border-[#2A91DC] text-[#022E4C] font-medium'
                            : 'bg-white border-gray-200 text-gray-800'
                        }`}
                      >
                        <span className="text-sm font-sans">{spec.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            handleCheckboxToggle(selectedSpecialities, spec.value, onSpecialityChange)
                          }
                          className="w-5 h-5 rounded border-gray-300 text-[#F01424] focus:ring-[#F01424]"
                        />
                      </label>
                    );
                  })
                )
              )}

              {activeMobileTab === 'jobType' && (
                jobTypes.length === 0 ? (
                  <div className="py-6 text-center text-sm text-gray-500">No job types found</div>
                ) : (
                  jobTypes.map((type) => {
                    const isChecked = selectedJobTypes.includes(type.value);
                    return (
                      <label
                        key={type.value}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#EAF4FB] border-[#2A91DC] text-[#022E4C] font-medium'
                            : 'bg-white border-gray-200 text-gray-800'
                        }`}
                      >
                        <span className="text-sm font-sans">{type.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            handleCheckboxToggle(selectedJobTypes, type.value, onJobTypeChange)
                          }
                          className="w-5 h-5 rounded border-gray-300 text-[#F01424] focus:ring-[#F01424]"
                        />
                      </label>
                    );
                  })
                )
              )}
            </div>

            {/* Bottom Actions Footer */}
            <div className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onLocationChange([]);
                  onSpecialityChange([]);
                  onJobTypeChange([]);
                }}
                disabled={totalActiveFilters === 0}
                className="flex-1 py-3 text-sm font-sans font-medium text-gray-600 disabled:text-gray-300 hover:text-[#F01424] transition-colors"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-[2] py-3 px-6 rounded-full text-white font-medium text-sm font-sans shadow-md hover:brightness-105 transition-all text-center"
                style={{
                  background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
                }}
              >
                Show Results
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
