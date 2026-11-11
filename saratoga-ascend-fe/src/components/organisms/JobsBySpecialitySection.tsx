'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '../atoms';
import { CircleControl } from '../molecules/CircleControl';
import { StaffingSlideCard } from '../molecules/StaffingSlideCard';
import { useCardCarousel, useDragToScroll, useWheelToScroll } from '../molecules/CardCarousel';

export interface SpecialityJobItem {
  id?: string;
  documentId?: string;
  title: string;
  slug: string;
  tagline?: string;
  salaryRange?: string;
  experience?: string;
  imageSrc?: string;
}

export interface SpecialitySlide {
  documentId?: string;
  name: string;
  slug: string;
  roleTitle?: string;
  description?: string;
  doctorImage?: { url?: string };
  backgroundImage?: { url?: string };
  ctaLabel?: string;
  ctaHref?: string;
  jobs?: SpecialityJobItem[];
}

export interface JobsBySpecialitySectionProps {
  title?: string;
  description?: string;
  specialities?: SpecialitySlide[];
}

const DEFAULT_SPECIALITIES: SpecialitySlide[] = [
  {
    name: 'Healthcare',
    slug: 'healthcare',
    roleTitle: 'Medical Pharmacist',
    description:
      'Connecting cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.',
    ctaLabel: 'Explore Jobs',
    ctaHref: '/careers/search-jobs?speciality=healthcare',
    doctorImage: {
      url: '/images/phase5/phase5-nurse.png',
    },
    jobs: [
      {
        title: 'Travel Staffing',
        slug: 'travel-staffing',
        imageSrc: '/images/Rectangle%20113.png',
      },
      {
        title: 'Emergency Nurse',
        slug: 'emergency-nurse',
        imageSrc: '/images/healthcare-team.png',
      },
      {
        title: 'Clinical Specialist',
        slug: 'clinical-specialist',
        imageSrc: '/images/what-we-do-doctor.png',
      },
      {
        title: 'ICU Staffing',
        slug: 'icu-staffing',
        imageSrc: '/images/Rectangle%20113.png',
      },
    ],
  },
  {
    name: 'Travel Staffing',
    slug: 'travel-staffing',
    roleTitle: 'Registered Nurse',
    description:
      'Providing specialized travel healthcare professionals with rapid placement in hospitals and critical clinical centers.',
    ctaLabel: 'Explore Jobs',
    ctaHref: '/careers/search-jobs?speciality=travel-staffing',
    doctorImage: {
      url: '/images/what-we-do-doctor.png',
    },
    jobs: [
      {
        title: 'Travel RN - ICU',
        slug: 'travel-rn-icu',
        imageSrc: '/images/Rectangle%20113.png',
      },
      {
        title: 'Pediatric Care',
        slug: 'pediatric-care',
        imageSrc: '/images/healthcare-team.png',
      },
      {
        title: 'Surgical Tech',
        slug: 'surgical-tech',
        imageSrc: '/images/what-we-do-doctor.png',
      },
    ],
  },
];

export const JobsBySpecialitySection: React.FC<JobsBySpecialitySectionProps> = ({
  title = 'Lorem epsum',
  description = 'Simple ideas can have profound impacts. Understanding users leads to better solutions. Each project teaches valuable lessons.',
  specialities = [],
}) => {
  const activeSlides =
    specialities && specialities.length > 0 ? specialities : DEFAULT_SPECIALITIES;

  const [activeIndex, setActiveIndex] = useState(0);
  const currentSlide = activeSlides[activeIndex] || activeSlides[0];

  const { viewportRef, scrollNext, scrollPrev } = useCardCarousel({ loop: true });
  const { isDragging, dragHandlers } = useDragToScroll(viewportRef);
  useWheelToScroll(viewportRef);

  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const currentJobs =
    currentSlide.jobs && currentSlide.jobs.length > 0
      ? currentSlide.jobs
      : DEFAULT_SPECIALITIES[0].jobs || [];

  return (
    <Section
      tone="surface"
      spacing="none"
      className="relative w-full overflow-hidden bg-[linear-gradient(135deg,#F8FAFC_0%,#F1F5F9_100%)] py-12 lg:py-20 xl:my-10 xl:py-10"
    >
      <div className="flex flex-col gap-10">
        {/* Frame 607 / 769: Section Intro */}
        <div className="flex flex-col gap-3">
          <h2 className="font-['DM_Serif_Text'] text-[40px] sm:text-[56px] lg:text-[72px] font-normal leading-[120%] text-[#D31E2D]">
            {title}
          </h2>
          <p className="max-w-[1500px] font-['Google_Sans_Flex'] text-[20px] sm:text-[26px] lg:text-[30px] font-normal leading-[133%] text-[#0A0A0A]">
            {description}
          </p>
        </div>

        {/* Frame 111: Main Area */}
        <div className="flex flex-col gap-10">
          {/* Top Big Feature Card: Healthcare / Speciality Slide */}
          <div className="relative min-h-[550px] lg:h-[700px] w-full overflow-hidden rounded-[12px] border border-[#C6C6C6] bg-white p-6 sm:p-10 lg:p-[40px] flex flex-col justify-center">
            {/* Background Graphic / Texture */}
            <div
              className="absolute inset-0 bg-[#002845] opacity-90 z-0"
              style={{
                backgroundImage: currentSlide.backgroundImage?.url
                  ? `url(${currentSlide.backgroundImage.url})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Left Content (Frame 768 / 767) */}
            <div className="relative z-10 flex max-w-[718px] flex-col gap-6 lg:gap-[30px]">
              <div>
                <h3 className="font-['DM_Serif_Text'] text-[48px] sm:text-[68px] lg:text-[90px] font-normal leading-[115%] text-[#FFFEFE]">
                  {currentSlide.name}
                </h3>
                {currentSlide.roleTitle && (
                  <p className="mt-2 font-['Google_Sans_Flex'] text-[22px] sm:text-[28px] font-bold leading-[120%] text-[#A2D8FE]">
                    {currentSlide.roleTitle}
                  </p>
                )}
              </div>

              {currentSlide.description && (
                <p className="font-['Google_Sans_Flex'] text-[18px] sm:text-[24px] lg:text-[28px] font-normal leading-[136%] text-white">
                  {currentSlide.description}
                </p>
              )}

              {/* Action Button */}
              <div>
                <Link
                  href={currentSlide.ctaHref || `/careers/search-jobs?speciality=${currentSlide.slug}`}
                  className="inline-flex h-[60px] min-w-[180px] items-center justify-center rounded-full bg-[#2A91DC] px-8 font-['Google_Sans_Flex'] text-[20px] font-medium text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#1E74C0] transition-colors"
                >
                  {currentSlide.ctaLabel || 'Explore Jobs'}
                </Link>
              </div>
            </div>

            {/* Doctor / Healthcare Worker Cutout Image */}
            <div className="absolute right-0 bottom-0 top-0 hidden lg:block w-[700px] pointer-events-none z-10">
              <Image
                src={currentSlide.doctorImage?.url || '/images/phase5/phase5-nurse.png'}
                alt={currentSlide.name}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1680px) 700px, 700px"
              />
            </div>

            {/* Carousel Navigation Arrows: Group 2085665597 */}
            {activeSlides.length > 1 && (
              <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-20 flex items-center gap-4">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous category"
                  className="flex size-[60px] lg:size-[66px] items-center justify-center rounded-full border border-white bg-black/20 text-white backdrop-blur-xs hover:bg-white hover:text-black transition-all cursor-pointer shadow-md"
                >
                  <svg className="size-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next category"
                  className="flex size-[60px] lg:size-[66px] items-center justify-center rounded-full border border-white bg-black/20 text-white backdrop-blur-xs hover:bg-white hover:text-black transition-all cursor-pointer shadow-md"
                >
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Linked Job Cards Row (Frame 582: 402x450px) */}
          <div className="relative w-full">
            <div
              ref={viewportRef}
              className={`w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
              {...dragHandlers}
            >
              <div className="flex gap-6 pb-2">
                {currentJobs.map((job, idx) => (
                  <div key={job.documentId || job.id || idx} className="shrink-0 w-[300px] sm:w-[350px] lg:w-[402px]">
                    <StaffingSlideCard
                      title={job.title}
                      body={job.tagline || 'Connecting cleared, credentialed healthcare professionals with facilities nationwide.'}
                      imageSrc={job.imageSrc || '/images/Rectangle%20113.png'}
                      href={`/careers/apply?job=${job.slug}&title=${encodeURIComponent(job.title)}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Right Scroll Control: Frame 5 */}
            {currentJobs.length > 3 && (
              <CircleControl
                label="Next jobs"
                direction="next"
                tone="jobCardArrow"
                onClick={scrollNext}
                className="absolute top-1/2 -right-6 lg:-right-8 -translate-y-1/2 z-20 hidden sm:flex"
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

