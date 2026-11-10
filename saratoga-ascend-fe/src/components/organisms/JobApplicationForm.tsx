'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import type { JobApplyPageData } from '@/lib/schemas';

export interface JobApplicationFormProps {
  pageData?: JobApplyPageData;
  initialJobTitle?: string;
  onFormSubmit?: (data: FormData) => void;
  className?: string;
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  pageData,
  initialJobTitle = 'Registered Nurse – Emergency Department',
  onFormSubmit,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    careerArea: '',
    preferredLocation: '',
    employmentPreference: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Content strings from pageData with robust defaults matching Figma specs
  const heroTitle = pageData?.heroTitle || 'Apply for the position';
  const rawSubtitleTemplate =
    pageData?.heroSubtitleTemplate ||
    'Complete the form below to apply for {jobTitle}.';
  const heroSubtitle = rawSubtitleTemplate.replace('{jobTitle}', initialJobTitle);

  const breadcrumbRoot = pageData?.breadcrumbRoot || 'Home';
  const breadcrumbCareers = pageData?.breadcrumbCareers || 'Careers';
  const breadcrumbJobSearch = pageData?.breadcrumbJobSearch || 'Job Search';
  const breadcrumbCurrent = pageData?.breadcrumbCurrent || 'Apply';

  const cardTitle = pageData?.cardTitle || 'Your Information';
  const personalInfoTitle = pageData?.personalInfoTitle || 'Personal Information';
  const personalInfoSubtitle =
    pageData?.personalInfoSubtitle || 'Tell us how we can contact you.';

  const firstNameLabel = pageData?.firstNameLabel || 'First Name *';
  const firstNamePlaceholder = pageData?.firstNamePlaceholder || 'Enter First Name';
  const lastNameLabel = pageData?.lastNameLabel || 'Last Name *';
  const lastNamePlaceholder = pageData?.lastNamePlaceholder || 'Enter Last Name';
  const emailLabel = pageData?.emailLabel || 'Email Address *';
  const emailPlaceholder = pageData?.emailPlaceholder || 'Enter Email Address';
  const phoneLabel = pageData?.phoneLabel || 'Phone Number *';
  const phonePlaceholder = pageData?.phonePlaceholder || 'Enter Phone Number';

  const careerPreferencesTitle =
    pageData?.careerPreferencesTitle || 'Career Preferences';
  const careerPreferencesSubtitle =
    pageData?.careerPreferencesSubtitle ||
    'Help us understand what opportunities interest you.';

  const careerAreaLabel = pageData?.careerAreaLabel || 'Primary Career Area *';
  const careerAreaPlaceholder =
    pageData?.careerAreaPlaceholder || 'Enter Primary Career Area';
  const preferredLocationLabel =
    pageData?.preferredLocationLabel || 'Preferred Location *';
  const preferredLocationPlaceholder =
    pageData?.preferredLocationPlaceholder || 'Enter Preferred Location';
  const employmentPreferenceLabel =
    pageData?.employmentPreferenceLabel || 'Employment Preference *';
  const employmentPreferencePlaceholder =
    pageData?.employmentPreferencePlaceholder || 'Enter Employment Preference';

  const resumeTitle = pageData?.resumeTitle || 'Resume';
  const resumeSubtitle =
    pageData?.resumeSubtitle ||
    'Upload your most recent resume. PDF, DOC or DOCX up to 10 MB.';
  const dropzoneText = pageData?.dropzoneText || 'Drop file here';
  const uploadButtonText = pageData?.uploadButtonText || 'Upload PDF';
  const resetButtonLabel = pageData?.resetButtonLabel || 'Cancel';
  const submitButtonLabel = pageData?.submitButtonLabel || 'Submit';

  // Modal / Popup Content (Frame 716)
  const modalTitle = pageData?.modalTitle || 'Application Submitted';
  const modalDescription =
    pageData?.modalDescription ||
    'Thank you for applying. We’ve received your application and our team will review your profile.';
  const modalHomeButtonLabel = pageData?.modalHomeButtonLabel || 'Home';
  const modalExploreJobsButtonLabel =
    pageData?.modalExploreJobsButtonLabel || 'Explore More Jobs';
  const modalSupportText =
    pageData?.modalSupportText || 'Need help? Contact our careers support team';
  const modalSupportEmail = pageData?.modalSupportEmail || 'careers@company.com';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type) && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      setErrorMessage('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size must be up to 10 MB.');
      return;
    }

    setErrorMessage('');
    setResumeFile(file);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      careerArea: '',
      preferredLocation: '',
      employmentPreference: '',
    });
    setResumeFile(null);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('jobTitle', initialJobTitle);
      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      if (onFormSubmit) {
        await onFormSubmit(data);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to submit application.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsSubmitted(false);
    handleReset();
  };

  return (
    <div className={`relative w-full bg-white ${className}`}>
      {/* ======================================================== */}
      {/* HERO / TOP BANNER: 957px height background in Figma      */}
      {/* Gradient: linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%) */}
      {/* ======================================================== */}
      <div
        className="relative w-full overflow-hidden bg-[linear-gradient(90.55deg,#D31E2D_0.47%,#2A91DC_102.45%)] pt-12 pb-56 sm:pt-16 sm:pb-64 md:pt-20 md:pb-72"
        style={{
          backgroundImage: pageData?.heroBackgroundImage?.url
            ? `url(${pageData.heroBackgroundImage.url}), linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-[120px] text-center text-white">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center flex-wrap gap-2 text-[14px] sm:text-[16px] font-['Google_Sans_Flex'] font-normal text-white/90 mb-6"
          >
            <Link href="/" className="hover:underline text-white">
              {breadcrumbRoot}
            </Link>
            <span>/</span>
            <Link href="/careers" className="hover:underline text-white">
              {breadcrumbCareers}
            </Link>
            <span>/</span>
            <Link href="/careers/search-jobs" className="hover:underline text-white">
              {breadcrumbJobSearch}
            </Link>
            <span>/</span>
            <span className="truncate max-w-[200px] sm:max-w-none text-white">
              {initialJobTitle}
            </span>
            <span>/</span>
            <span className="font-bold text-white">{breadcrumbCurrent}</span>
          </nav>

          {/* Title: 90px DM Serif Text, line-height 115% */}
          <h1 className="mx-auto max-w-[1100px] font-['DM_Serif_Text'] text-[42px] sm:text-[64px] lg:text-[90px] font-normal leading-[115%] text-white tracking-tight">
            {heroTitle}
          </h1>

          {/* Subtitle: 24px Google Sans Flex, line-height 160% */}
          <p className="mx-auto mt-4 max-w-[950px] font-['Google_Sans_Flex'] text-[18px] sm:text-[22px] lg:text-[24px] font-medium leading-[160%] text-white/95">
            {heroSubtitle}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* APPLICATION FORM CONTAINER (Frame 661: 1126px width)     */}
      {/* Border 2px #9E9E9E, Radius 40px, Shadow, Background #FFF */}
      {/* ======================================================== */}
      <div className="relative mx-auto max-w-[1126px] px-4 sm:px-6 -mt-36 sm:-mt-48 md:-mt-52 z-20">
        <div className="w-full rounded-[40px] border-2 border-[#9E9E9E] bg-white p-6 sm:p-10 md:p-[40px] shadow-[20px_24px_44px_rgba(0,0,0,0.07)]">
          {/* Header: DM Serif Text 44px */}
          <h2 className="text-center font-['DM_Serif_Text'] text-[32px] sm:text-[40px] lg:text-[44px] font-normal leading-[120%] text-[#1C1C1C] mb-8 sm:mb-10">
            {cardTitle}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
            {/* SECTION 1: Personal Information (Frame 2147226535) */}
            <div className="rounded-[20px] border-[1.5px] border-[#E4EBF1] bg-[#FCFDFD] p-5 sm:p-[30px]">
              <div className="mb-6">
                <h3 className="font-['DM_Serif_Text'] text-[22px] sm:text-[24px] font-normal leading-[160%] text-[#17202A]">
                  {personalInfoTitle}
                </h3>
                <p className="font-['Google_Sans_Flex'] text-[14px] font-normal leading-[150%] text-[#687582]">
                  {personalInfoSubtitle}
                </p>
              </div>

              {/* 2-Column Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* First Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="firstName"
                    className="font-['DM_Serif_Text'] text-[18px] sm:text-[20px] font-normal leading-[27px] text-[#4C4536] mb-1"
                  >
                    {firstNameLabel}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={firstNamePlaceholder}
                    className="w-full bg-transparent border-b-[1.9px] border-[#DADADA] py-2 font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] font-light text-[#17202A] placeholder:text-[#B8B8B8] focus:border-[#2B88D9] focus:outline-none transition-colors"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="lastName"
                    className="font-['DM_Serif_Text'] text-[18px] sm:text-[20px] font-normal leading-[27px] text-[#4C4536] mb-1"
                  >
                    {lastNameLabel}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={lastNamePlaceholder}
                    className="w-full bg-transparent border-b-[1.9px] border-[#DADADA] py-2 font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] font-light text-[#17202A] placeholder:text-[#B8B8B8] focus:border-[#2B88D9] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="font-['DM_Serif_Text'] text-[18px] sm:text-[20px] font-normal leading-[27px] text-[#4C4536] mb-1"
                  >
                    {emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={emailPlaceholder}
                    className="w-full bg-transparent border-b-[1.9px] border-[#DADADA] py-2 font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] font-light text-[#17202A] placeholder:text-[#B8B8B8] focus:border-[#2B88D9] focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="font-['DM_Serif_Text'] text-[18px] sm:text-[20px] font-normal leading-[27px] text-[#4C4536] mb-1"
                  >
                    {phoneLabel}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={phonePlaceholder}
                    className="w-full bg-transparent border-b-[1.9px] border-[#DADADA] py-2 font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] font-light text-[#17202A] placeholder:text-[#B8B8B8] focus:border-[#2B88D9] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Career Preferences (Frame 2147226536) */}
            <div className="rounded-[20px] border-[1.5px] border-[#E4EBF1] bg-[#FCFDFD] p-5 sm:p-[30px]">
              <div className="mb-6">
                <h3 className="font-['DM_Serif_Text'] text-[22px] sm:text-[24px] font-normal leading-[160%] text-[#17202A]">
                  {careerPreferencesTitle}
                </h3>
                <p className="font-['Google_Sans_Flex'] text-[14px] font-normal leading-[150%] text-[#687582]">
                  {careerPreferencesSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Primary Career Area */}
                <div className="flex flex-col">
                  <label
                    htmlFor="careerArea"
                    className="font-['DM_Serif_Text'] text-[18px] sm:text-[20px] font-normal leading-[27px] text-[#4C4536] mb-1"
                  >
                    {careerAreaLabel}
                  </label>
                  <input
                    id="careerArea"
                    name="careerArea"
                    type="text"
                    required
                    value={formData.careerArea}
                    onChange={handleInputChange}
                    placeholder={careerAreaPlaceholder}
                    className="w-full bg-transparent border-b-[1.9px] border-[#DADADA] py-2 font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] font-light text-[#17202A] placeholder:text-[#B8B8B8] focus:border-[#2B88D9] focus:outline-none transition-colors"
                  />
                </div>

                {/* Preferred Location */}
                <div className="flex flex-col">
                  <label
                    htmlFor="preferredLocation"
                    className="font-['DM_Serif_Text'] text-[18px] sm:text-[20px] font-normal leading-[27px] text-[#4C4536] mb-1"
                  >
                    {preferredLocationLabel}
                  </label>
                  <input
                    id="preferredLocation"
                    name="preferredLocation"
                    type="text"
                    required
                    value={formData.preferredLocation}
                    onChange={handleInputChange}
                    placeholder={preferredLocationPlaceholder}
                    className="w-full bg-transparent border-b-[1.9px] border-[#DADADA] py-2 font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] font-light text-[#17202A] placeholder:text-[#B8B8B8] focus:border-[#2B88D9] focus:outline-none transition-colors"
                  />
                </div>

                {/* Employment Preference */}
                <div className="flex flex-col md:col-span-2 md:max-w-[495px]">
                  <label
                    htmlFor="employmentPreference"
                    className="font-['DM_Serif_Text'] text-[18px] sm:text-[20px] font-normal leading-[27px] text-[#4C4536] mb-1"
                  >
                    {employmentPreferenceLabel}
                  </label>
                  <input
                    id="employmentPreference"
                    name="employmentPreference"
                    type="text"
                    required
                    value={formData.employmentPreference}
                    onChange={handleInputChange}
                    placeholder={employmentPreferencePlaceholder}
                    className="w-full bg-transparent border-b-[1.9px] border-[#DADADA] py-2 font-['Google_Sans_Flex'] text-[16px] sm:text-[18px] font-light text-[#17202A] placeholder:text-[#B8B8B8] focus:border-[#2B88D9] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Resume (Frame 664) */}
            <div className="p-2 sm:p-4">
              <div className="mb-4">
                <h3 className="font-['DM_Serif_Text'] text-[22px] sm:text-[24px] font-normal leading-[160%] text-[#17202A]">
                  {resumeTitle}
                </h3>
                <p className="font-['Google_Sans_Flex'] text-[14px] sm:text-[16px] font-normal leading-[150%] text-[#687582]">
                  {resumeSubtitle}
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
                className="sr-only"
                id="resume-upload-input"
              />

              {/* Dropzone (Rectangle 112: 1020x115px) */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex min-h-[115px] w-full flex-col sm:flex-row items-center justify-between gap-4 rounded-[12px] border border-dashed p-6 cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#2B88D9] bg-[#E7EFF5]'
                    : 'border-[#C9D1D7] bg-[#F8FAFB] hover:border-[#2B88D9] hover:bg-[#F2F7FA]'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Upload icon circle */}
                  <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-[#E7EFF5] text-[#17202A]">
                    <svg
                      className="size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19V5M5 12l7-7 7 7"
                      />
                    </svg>
                  </div>

                  <div>
                    <span className="font-['Google_Sans_Flex'] text-[18px] sm:text-[20px] font-medium leading-[150%] text-[#303943]">
                      {resumeFile ? resumeFile.name : dropzoneText}
                    </span>
                    {resumeFile && (
                      <span className="block text-[13px] text-[#687582]">
                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0">
                  <span className="font-['Arial'] text-[14px] font-bold text-[#173F5F] hover:underline">
                    {resumeFile ? 'Change File' : uploadButtonText}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <p className="mt-2 text-[14px] text-red-600 font-medium">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* ACTION BUTTONS (Frame 646: 324x60px) */}
            <div className="mt-4 flex flex-row items-center justify-center gap-5">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleReset}
                className="flex h-[60px] min-w-[158px] items-center justify-center rounded-[8px] bg-transparent border border-[#DADADA] px-8 font-['Google_Sans_Flex'] text-[20px] font-medium text-[#000000] hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                {resetButtonLabel}
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-[60px] min-w-[146px] items-center justify-center rounded-[8px] bg-[linear-gradient(90.55deg,#D31E2D_0.47%,#2A91DC_102.45%)] px-8 font-['Google_Sans_Flex'] text-[20px] font-medium text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:opacity-95 transition-opacity disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  submitButtonLabel
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUCCESS MODAL POPUP: Frame 716 (723x523px)                */}
      {/* Exact Figma CSS specifications                           */}
      {/* ======================================================== */}
      {isSubmitted && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs transition-opacity"
        >
          <div className="relative w-full max-w-[723px] rounded-[30px] bg-white p-8 sm:p-12 md:p-[48px] shadow-2xl flex flex-col items-center gap-8">
            {/* Close button at top-right */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors cursor-pointer"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Group 267: Success Icon + Title + Description */}
            <div className="flex w-full flex-col items-center">
              {/* Group 263: Success Circle with Checkmark (100x100px) */}
              <div className="relative flex size-[100px] items-center justify-center rounded-full border-[6.17px] border-[#159447] bg-white mb-6">
                <svg
                  className="size-12 text-[#159447]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Title (Heading 03: DM Serif Text 44px, line-height 120%) */}
              <h3 className="w-full text-center font-['DM_Serif_Text'] text-[32px] sm:text-[44px] font-normal leading-[120%] text-[#1C1C1C]">
                {modalTitle}
              </h3>

              {/* Description (Body - 00: Google Sans Flex 24px, line-height 160%) */}
              <p className="mt-4 w-full max-w-[620px] text-center font-['Google_Sans_Flex'] text-[18px] sm:text-[22px] lg:text-[24px] font-medium leading-[160%] text-[#1C1C1C]">
                {modalDescription}
              </p>
            </div>

            {/* Line 22: Divider line with opacity 0.3 */}
            <div className="w-full max-w-[723px] h-0 border-t border-black/30" />

            {/* Frame 720: Action buttons + Support Contact */}
            <div className="flex w-full flex-col items-center gap-8">
              {/* Frame 646: Home button + Explore More Jobs button */}
              <div className="flex flex-wrap items-center justify-center gap-[10px]">
                {/* Home Button: Frame 204 (168x56px, gradient, radius 10px) */}
                <Link
                  href="/"
                  onClick={closeModal}
                  className="flex h-[56px] min-w-[168px] items-center justify-center rounded-[10px] bg-[linear-gradient(90.55deg,#D31E2D_0.47%,#2A91DC_102.45%)] px-8 font-['Google_Sans_Flex'] text-[16px] font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
                >
                  {modalHomeButtonLabel}
                </Link>

                {/* Explore More Jobs Button: Frame 643 (228x56px, #F7F8FA, radius 10px) */}
                <Link
                  href="/careers/search-jobs"
                  onClick={closeModal}
                  className="flex h-[56px] min-w-[228px] items-center justify-center rounded-[10px] bg-[#F7F8FA] px-8 font-['Google_Sans_Flex'] text-[16px] font-bold text-[#1C1C1C] opacity-90 hover:bg-[#ECEEF2] transition-colors"
                >
                  {modalExploreJobsButtonLabel}
                </Link>
              </div>

              {/* Frame 719: Support Contact */}
              <div className="flex flex-col items-center gap-1 text-center font-['Google_Sans_Flex'] text-[18px] leading-[150%]">
                <span className="font-normal text-[#1C1C1C]">
                  {modalSupportText}
                </span>
                <a
                  href={`mailto:${modalSupportEmail}`}
                  className="font-normal text-[#2B88D9] hover:underline"
                >
                  {modalSupportEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
