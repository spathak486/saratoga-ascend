'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Container } from '../atoms';

/**
 * Decorative backdrop from the Figma artboard: image 29 (1499x2070 at
 * `-75px/-14px`, rotated -90deg, opacity 0.2), image 30 navy tint (#002845,
 * mix-blend-color, opacity 1) over it, and a rotated rectangle outlined
 * with the red→blue gradient border.
 */
const DecorativeBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute top-[-14px] left-[-75px] z-0 hidden h-[1499px] w-[2070px] lg:block"
  >
    <Image
      src="/images/image 29.png"
      alt=""
      width={1499}
      height={2070}
      className="absolute left-[-75px] top-[-14px] h-[2070px] w-[1499px] -rotate-90 object-cover opacity-20"
    />
    <div className="absolute left-[-75px] top-[-14px] h-[2070px] w-[1499px] -rotate-90 bg-[#002845] mix-blend-color" />
    <div className="absolute left-[-75px] top-[-14px] h-[2070px] w-[1499px] -rotate-90 border-2 border-solid border-transparent [border-image:linear-gradient(140.47deg,#D31E2D_0%,#2A91DC_99.08%)_1]" />
  </div>
);

export interface JobApplicationFormProps {
  /** Optional callback when form is submitted successfully */
  onFormSubmit?: (data: FormData) => void;
  /** Optional callback for Go back action */
  onGoBack?: () => void;
  className?: string;
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  onFormSubmit,
  onGoBack,
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
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      if (onFormSubmit) {
        await onFormSubmit(data);
      } else {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
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

  if (isSubmitted) {
    return (
      <div className="relative overflow-hidden">
        <DecorativeBackground />
        <Container className="relative z-10 py-12 md:py-20">
          <div className="mx-auto max-w-[1180px] rounded-[24px] bg-white p-8 sm:p-12 text-center border border-[#E0E5E9] shadow-lg">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#E7EFF5] text-[#2B88D9] mb-6">
              <svg
                className="size-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-[#1C1C1C] mb-4">
              Thank You for Applying!
            </h2>
            <p className="font-sans text-[16px] sm:text-[18px] text-[#687582] max-w-xl mx-auto mb-8">
              Your information and resume have been submitted successfully. Our talent team will review your details and contact you shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
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
              }}
              className="inline-flex h-[56px] min-w-[160px] items-center justify-center rounded-[66px] bg-[#2B88D9] px-8 font-sans font-bold text-[16px] text-white hover:bg-[#1E74C0] transition-colors cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <DecorativeBackground />
      <Container className="relative z-10 py-8 md:py-16">
      {/* Outer Card Container (Frame 661: 1184px, white, 40px radius) */}
      <div
        className={`mx-auto max-w-[1184px] rounded-[40px] bg-white p-6 sm:p-8 md:p-10 lg:p-[40px] shadow-[20px_24px_44px_rgba(0,0,0,0.07)] ${className}`}
      >
        {/* Main Title (Heading 03) */}
        <h1 className="font-serif text-[32px] sm:text-[44px] leading-[120%] text-[#1C1C1C] text-center font-normal mb-10">
          Your Information
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[34px]">
          {/* Section 1: Personal Information (Frame 666) */}
          <section>
            <div className="mb-6">
              <h2 className="font-sans text-[22px] sm:text-[24px] font-medium leading-[160%] text-[#17202A]">
                Personal Information
              </h2>
              <p className="font-sans text-[14px] leading-[150%] text-[#687582] mt-0.5">
                Tell us how we can contact you.
              </p>
            </div>

            {/* Grid of Inputs (Frame 254) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[30px]">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-sans text-[16px] font-bold leading-[150%] text-[#303943] mb-2"
                >
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Type your first name"
                  className="h-[54px] w-full rounded-[10px] bg-white border border-[#C9D1D7] px-4 font-sans text-[16px] text-[#303943] placeholder:text-[#AAAAAA] focus:border-[#2B88D9] focus:ring-2 focus:ring-[#2B88D9]/20 focus:outline-none transition-all duration-150"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block font-sans text-[16px] font-bold leading-[150%] text-[#303943] mb-2"
                >
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Type your Last name"
                  className="h-[54px] w-full rounded-[10px] bg-white border border-[#C9D1D7] px-4 font-sans text-[16px] text-[#303943] placeholder:text-[#AAAAAA] focus:border-[#2B88D9] focus:ring-2 focus:ring-[#2B88D9]/20 focus:outline-none transition-all duration-150"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-sans text-[16px] font-bold leading-[150%] text-[#303943] mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Type your email address"
                  className="h-[54px] w-full rounded-[10px] bg-white border border-[#C9D1D7] px-4 font-sans text-[16px] text-[#303943] placeholder:text-[#AAAAAA] focus:border-[#2B88D9] focus:ring-2 focus:ring-[#2B88D9]/20 focus:outline-none transition-all duration-150"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block font-sans text-[16px] font-bold leading-[150%] text-[#303943] mb-2"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Type your phone number"
                  className="h-[54px] w-full rounded-[10px] bg-white border border-[#C9D1D7] px-4 font-sans text-[16px] text-[#303943] placeholder:text-[#AAAAAA] focus:border-[#2B88D9] focus:ring-2 focus:ring-[#2B88D9]/20 focus:outline-none transition-all duration-150"
                />
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px w-full bg-[#E6EAED]" aria-hidden="true" />

          {/* Section 2: Career Preferences (Frame 665) */}
          <section>
            <div className="mb-6">
              <h2 className="font-sans text-[22px] sm:text-[24px] font-medium leading-[160%] text-[#17202A]">
                Career Preferences
              </h2>
              <p className="font-sans text-[14px] leading-[150%] text-[#687582] mt-0.5">
                Help us understand what opportunities interest you.
              </p>
            </div>

            {/* Grid of Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[30px]">
              {/* Primary Career Area */}
              <div>
                <label
                  htmlFor="careerArea"
                  className="block font-sans text-[16px] font-bold leading-[150%] text-[#303943] mb-2"
                >
                  Primary Career Area *
                </label>
                <input
                  id="careerArea"
                  name="careerArea"
                  type="text"
                  required
                  value={formData.careerArea}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="h-[54px] w-full rounded-[10px] bg-white border border-[#C9D1D7] px-4 font-sans text-[16px] text-[#303943] placeholder:text-[#AAAAAA] focus:border-[#2B88D9] focus:ring-2 focus:ring-[#2B88D9]/20 focus:outline-none transition-all duration-150"
                />
              </div>

              {/* Preferred Location */}
              <div>
                <label
                  htmlFor="preferredLocation"
                  className="block font-sans text-[16px] font-bold leading-[150%] text-[#303943] mb-2"
                >
                  Preferred Location *
                </label>
                <input
                  id="preferredLocation"
                  name="preferredLocation"
                  type="text"
                  required
                  value={formData.preferredLocation}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="h-[54px] w-full rounded-[10px] bg-white border border-[#C9D1D7] px-4 font-sans text-[16px] text-[#303943] placeholder:text-[#AAAAAA] focus:border-[#2B88D9] focus:ring-2 focus:ring-[#2B88D9]/20 focus:outline-none transition-all duration-150"
                />
              </div>

              {/* Employment Preference */}
              <div>
                <label
                  htmlFor="employmentPreference"
                  className="block font-sans text-[16px] font-bold leading-[150%] text-[#303943] mb-2"
                >
                  Employment Preference *
                </label>
                <input
                  id="employmentPreference"
                  name="employmentPreference"
                  type="text"
                  required
                  value={formData.employmentPreference}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="h-[54px] w-full rounded-[10px] bg-white border border-[#C9D1D7] px-4 font-sans text-[16px] text-[#303943] placeholder:text-[#AAAAAA] focus:border-[#2B88D9] focus:ring-2 focus:ring-[#2B88D9]/20 focus:outline-none transition-all duration-150"
                />
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px w-full bg-[#E6EAED]" aria-hidden="true" />

          {/* Section 3: Resume Upload (Frame 664) */}
          <section>
            <div>
              <h2 className="font-sans text-[22px] sm:text-[24px] font-medium leading-[160%] text-[#17202A]">
                Resume
              </h2>
              <p className="font-sans text-[16px] leading-[150%] text-[#687582] mt-1">
                Upload your most recent resume. PDF, DOC or DOCX up to 10 MB.
              </p>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileSelect}
              className="sr-only"
              id="resume-upload-input"
            />

            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative mt-6 min-h-[115px] w-full rounded-[12px] bg-[#F8FAFB] border border-dashed p-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer transition-all duration-150 ${
                isDragging
                  ? 'border-[#2B88D9] bg-[#E7EFF5]'
                  : 'border-[#C9D1D7] hover:border-[#2B88D9] hover:bg-[#F2F7FA]'
              }`}
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                {/* Upload Circle Icon */}
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-[#E7EFF5] text-[#1C1C1C]">
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </div>

                <div>
                  <span className="block font-sans text-[18px] sm:text-[20px] font-medium leading-[150%] text-[#303943]">
                    {resumeFile ? resumeFile.name : 'Drop file here'}
                  </span>
                  {resumeFile && (
                    <span className="block font-sans text-[13px] text-[#687582] mt-0.5">
                      {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="font-sans text-[14px] font-bold leading-[16px] text-[#173F5F] hover:underline cursor-pointer"
                >
                  {resumeFile ? 'Change File' : 'Upload PDF'}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="mt-2 font-sans text-[14px] text-red-600 font-medium">
                {errorMessage}
              </p>
            )}
          </section>

          {/* Form Action Buttons (Frame 646) */}
          <div className="mt-6 flex flex-row items-center justify-center gap-5">
            {/* Go back Button */}
            <button
              type="button"
              onClick={() => {
                if (onGoBack) {
                  onGoBack();
                } else if (typeof window !== 'undefined') {
                  window.history.back();
                }
              }}
              className="flex h-[56px] min-w-[146px] items-center justify-center rounded-[70px] bg-[#F7F8FA] border border-[#E0E5E9] px-8 font-sans font-bold text-[16px] text-[#1C1C1C] opacity-90 transition-colors hover:bg-[#EEF1F4] cursor-pointer"
            >
              Go back
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-[56px] min-w-[138px] items-center justify-center rounded-[66px] bg-[#2B88D9] px-8 font-sans font-bold text-[16px] text-white shadow-md transition-colors hover:bg-[#1E74C0] disabled:opacity-60 cursor-pointer"
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
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </Container>
  </div>
  );
};
