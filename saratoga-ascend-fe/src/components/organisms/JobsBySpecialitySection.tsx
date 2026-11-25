'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { CircleControl } from '../molecules/CircleControl';
import { StaffingSlideCard } from '../molecules/StaffingSlideCard';
import {
  CAROUSEL_SLIDE_CLASS,
  useCardCarousel,
  useDragToScroll,
  useWheelToScroll,
} from '../molecules/CardCarousel';
import { stripHtml } from '@/lib/utils/text';

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
      url: '/images/healthcare-doctor-asian.png',
    },
    jobs: [
      {
        title: 'Travel Staffing',
        slug: 'travel-staffing',
        imageSrc: '/images/Rectangle 113.png',
      },
      {
        title: 'Travel Staffing',
        slug: 'travel-staffing-2',
        imageSrc: '/images/Rectangle 113.png',
      },
      {
        title: 'Travel Staffing',
        slug: 'travel-staffing-3',
        imageSrc: '/images/Rectangle 113.png',
      },
      {
        title: 'Travel Staffing',
        slug: 'travel-staffing-4',
        imageSrc: '/images/Rectangle 113.png',
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
        title: 'Travel Staffing',
        slug: 'travel-staffing-5',
        imageSrc: '/images/Rectangle 113.png',
      },
      {
        title: 'Travel Staffing',
        slug: 'travel-staffing-6',
        imageSrc: '/images/Rectangle 113.png',
      },
      {
        title: 'Travel Staffing',
        slug: 'travel-staffing-7',
        imageSrc: '/images/Rectangle 113.png',
      },
    ],
  },
];

const FADE_MS = 0.5;
const EASE_FADE = [0.4, 0, 0.2, 1] as const;
const FALLBACK_PERSON = '/images/healthcare-doctor-asian.png';
const BANNER_BG = '/images/healthcare-banner-bg.png';

/**
 * JobsBySpecialitySection — Figma Node 1899:2255 (Frame 2147226373)
 * Exact Figma Layout:
 * - Background gradient: linear-gradient(142.22deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)
 * - Outer padding: 120px x 40px, max-w: 1920px
 * - Title: DM Serif Text 72px, #D31E2D
 * - Subtitle: Google Sans Flex 30px, #0A0A0A
 * - Top Banner: 1680px x 700px, rounded: 12px, border: 1px #C6C6C6, bg: #002845
 * - Left arrow (x: 760px, y: 325px), Right arrow (x: 1515px, y: 325px), size: 66px
 * - Cutout: asian female doctor with clipboard right: 0, bottom: 0, w: 700px
 * - Bottom cards: 402px x 450px, rounded: 32px, gap: 24px, scroll arrow top: 125px
 */
export const JobsBySpecialitySection: React.FC<JobsBySpecialitySectionProps> = ({
  title,
  description,
  specialities = [],
}) => {
  const [apiSpecialities, setApiSpecialities] = useState<SpecialitySlide[]>([]);
  const [apiTitle, setApiTitle] = useState<string | undefined>(title);
  const [apiDescription, setApiDescription] = useState<string | undefined>(description);

  useEffect(() => {
    let isMounted = true;
    async function fetchDynamicSpecialitiesAndJobs() {
      try {
        const res = await fetch('/api/specialities');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) {
          if (data?.title) {
            setApiTitle(data.title);
          }
          if (data?.description) {
            setApiDescription(data.description);
          }
          if (data?.specialities && data.specialities.length > 0) {
            setApiSpecialities(data.specialities);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic specialities from API:', err);
      }
    }
    fetchDynamicSpecialitiesAndJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayTitle = apiTitle || title || 'Explore Healthcare Careers';
  const displayDescription =
    apiDescription ||
    description ||
    'Step into rewarding healthcare careers across military, federal, and community facilities nationwide.';

  const activeSlides = useMemo(() => {
    if (apiSpecialities.length > 0) {
      return apiSpecialities;
    }
    if (specialities && specialities.length > 0) {
      return specialities;
    }
    return DEFAULT_SPECIALITIES;
  }, [apiSpecialities, specialities]);

  const canRotate = activeSlides.length > 1;
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const safeIndex = activeSlides.length === 0 ? 0 : index % activeSlides.length;
  const currentSlide = activeSlides[safeIndex];
  const getMediaUrl = (url?: string | null): string => {
    if (!url) return '';
    if (url.startsWith('/uploads/')) {
      const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
      return `${base.replace(/\/+$/, '')}${url}`;
    }
    return url;
  };

  const doctorSrc = currentSlide?.doctorImage?.url
    ? getMediaUrl(currentSlide.doctorImage.url)
    : FALLBACK_PERSON;
  const bannerSrc = currentSlide?.backgroundImage?.url
    ? getMediaUrl(currentSlide.backgroundImage.url)
    : BANNER_BG;

  const { viewportRef, scrollNext } = useCardCarousel({ loop: true });
  const { isDragging, dragHandlers } = useDragToScroll(viewportRef);
  useWheelToScroll(viewportRef);

  const step = (delta: 1 | -1) => {
    if (!canRotate || isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + delta + activeSlides.length) % activeSlides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentJobs = useMemo(() => {
    return currentSlide?.jobs && currentSlide.jobs.length > 0 ? currentSlide.jobs : [];
  }, [currentSlide]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      step(1); // Next slide
    } else if (isRightSwipe) {
      step(-1); // Previous slide
    }
  };

  return (
    <section
      aria-label="Jobs by Speciality"
      className="relative w-full overflow-hidden py-10 lg:py-[2.5rem]"
      style={{
        backgroundImage: 'linear-gradient(142.22deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
      }}
    >
      {/* 1920px canvas centered with 120px gutters (Figma Frame 2147226373) */}
      <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-[2.5rem] px-6 sm:px-10 lg:px-[7.5rem]">
        {/* Frame 1899:2256: Section Intro (gap: 0.75rem / 12px) */}
        {(displayTitle || displayDescription) && (
          <div className="flex w-full flex-col gap-[0.75rem] items-start justify-center">
            {displayTitle && (
              <h2 className="font-serif text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-normal leading-[1.2] text-[#D31E2D]">
                {stripHtml(displayTitle)}
              </h2>
            )}
            {displayDescription && (
              <p className="max-w-[93.75rem] font-sans text-[1.25rem] sm:text-[1.625rem] lg:text-[1.875rem] font-normal leading-[2.5rem] text-[#0A0A0A]">
                {stripHtml(displayDescription)}
              </p>
            )}
          </div>
        )}

        {/* Frame 1899:2260: Main Area (gap: 40px) */}
        <div className="flex w-full flex-col gap-[2.5rem]">
          {/* Top Big Feature Card (Figma 1899:2261: 1680px x 700px, rounded: 12px, border: 1px #C6C6C6) */}
          <article
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="relative w-full overflow-hidden rounded-[0.75rem] border border-[#C6C6C6] bg-[#002845] min-h-[32rem] lg:h-[43.75rem] shadow-sm select-none"
          >
            {/* Background Graphic / Texture from Figma node 1899:2261 */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[0.75rem]">
              <Image
                src={bannerSrc}
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Left Content Area (Figma Frame 767 / Frame 768: left 40px, width 718px, gap 30px) */}
            <div className="relative z-10 flex h-full w-full max-w-full lg:w-[44.875rem] lg:max-w-[45vw] xl:max-w-[44.875rem] flex-col justify-center gap-[1.875rem] px-6 py-8 sm:px-10 lg:pl-[2.5rem] lg:pr-4 lg:py-[1.25rem]">
              <motion.div
                key={`slide-content-${safeIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: FADE_MS, ease: EASE_FADE }}
                className="flex flex-col gap-[1.875rem]"
              >
                {/* Frame 768: Title + Role Subtitle */}
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[1.875rem]">
                  <h3 className="font-serif text-[clamp(2.25rem,1.8rem+3vw,5.625rem)] font-normal leading-[1.15] text-[#FFFEFE] break-words">
                    {currentSlide.name}
                  </h3>
                  {currentSlide.roleTitle && (
                    <p className="font-sans text-[clamp(1.125rem,1rem+0.8vw,1.75rem)] font-bold leading-[1.2] text-[#A2D8FE]">
                      {currentSlide.roleTitle}
                    </p>
                  )}
                </div>

                {currentSlide.description && (
                  <p className="font-sans text-[clamp(1rem,0.9rem+0.4vw,1.75rem)] font-normal leading-[1.6] sm:leading-[2.375rem] text-white">
                    {currentSlide.description}
                  </p>
                )}
              </motion.div>

              {/* Explore Jobs Button (Figma I1899:2261;123:7652: h 60, min-w 180, pill, #2A91DC, 20px medium, nowrap).
                  Width grows with CMS label so longer copy is not clipped. */}
              <div className="flex w-full justify-center lg:justify-start">
                <Link
                  href={currentSlide.ctaHref || `/careers/search-jobs?speciality=${currentSlide.slug}`}
                  className="inline-flex h-auto min-h-[3.25rem] sm:min-h-[3.75rem] min-w-[10rem] sm:min-w-[11.25rem] max-w-full items-center justify-center rounded-full bg-[#2A91DC] px-6 py-3.5 sm:py-4 text-center font-sans text-[1.125rem] sm:text-[1.25rem] font-medium leading-[1.5] text-white whitespace-normal sm:whitespace-nowrap shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#1E74C0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {currentSlide.ctaLabel || 'Explore Jobs'}
                </Link>
              </div>

              {/* Mobile pagination dots for the big feature card (< lg) */}
              {canRotate && (
                <div className="flex w-full items-center justify-center pt-2 lg:hidden" aria-label="Specialities pagination">
                  {activeSlides.map((_, dotIdx) => {
                    const isActive = dotIdx === safeIndex;
                    return (
                      <button
                        key={`speciality-dot-${dotIdx}`}
                        type="button"
                        aria-label={`Go to slide ${dotIdx + 1}`}
                        onClick={() => {
                          if (dotIdx !== safeIndex && !isAnimating) {
                            setIsAnimating(true);
                            setIndex(dotIdx);
                            setTimeout(() => setIsAnimating(false), 500);
                          }
                        }}
                        className={`transition-all duration-300 rounded-full focus:outline-none ${
                          isActive
                            ? 'h-2 w-6 bg-[#2A91DC]'
                            : 'h-2 w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Doctor Cutout (Figma node I1899:2261;123:7655: w: 700px, h: 1068px, bottom: 0) */}
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden lg:block w-[43.75rem] max-w-[45vw] z-10 overflow-hidden">
              <motion.div
                key={`doctor-${safeIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative size-full"
              >
                <Image
                  src={doctorSrc}
                  alt={currentSlide.name}
                  fill
                  className="object-contain object-bottom pointer-events-none select-none"
                  priority
                />
              </motion.div>
            </div>

            {/* Figma Left Navigation Arrow: Hidden on mobile (< lg), shown on desktop */}
            {canRotate && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous speciality slide"
                className="hidden lg:flex absolute z-20 top-1/2 -translate-y-1/2 left-4 sm:left-6 lg:left-[47.5rem] size-[3.5rem] lg:size-[4.125rem] items-center justify-center rounded-full border-[1.375px] border-solid border-white bg-black/20 text-white drop-shadow-[0px_1.375px_1.375px_rgba(16,24,40,0.05)] backdrop-blur-xs hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <svg className="size-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Figma Right Navigation Arrow: Hidden on mobile (< lg), shown on desktop */}
            {canRotate && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next speciality slide"
                className="hidden lg:flex absolute z-20 top-1/2 -translate-y-1/2 right-4 sm:right-6 lg:right-[2.5rem] size-[3.5rem] lg:size-[4.125rem] items-center justify-center rounded-full border-[1.375px] border-solid border-white bg-black/20 text-white drop-shadow-[0px_1.375px_1.375px_rgba(16,24,40,0.05)] backdrop-blur-xs hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </article>

          {/* Bottom Linked Job Cards Row — Figma Frame 582: 4×402 + 3×24; CMS jobs only */}
          {currentJobs.length > 0 && (
            <div className="relative w-full">
              <div
                ref={viewportRef}
                className={`@container w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                  isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
                }`}
                {...dragHandlers}
              >
                <div className="flex gap-[1.5rem] pb-2">
                  {currentJobs.map((job, idx) => (
                    <div
                      key={`slide-${safeIndex}-job-${job.documentId || job.id || idx}`}
                      className={`${CAROUSEL_SLIDE_CLASS} w-[min(18.75rem,85%)] shrink-0 sm:w-[21.875rem] lg:w-[calc((100cqi-4.5rem)/4)] lg:max-w-[25.125rem]`}
                    >
                      <StaffingSlideCard
                        title={job.title}
                        body={
                          job.tagline ||
                          'Connecting cleared, credentialed healthcare professionals with government, military.'
                        }
                        imageSrc={job.imageSrc ? getMediaUrl(job.imageSrc) : '/images/Rectangle 113.png'}
                        href={`/careers/apply?job=${job.slug}&title=${encodeURIComponent(job.title)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Right Scroll Control: Figma node 1899:2267 (size: 60px, top: 125px) */}
              {currentJobs.length > 3 && (
                <CircleControl
                  label="Next jobs"
                  direction="next"
                  tone="jobCardArrow"
                  onClick={scrollNext}
                  className="absolute top-[7.8125rem] -right-6 lg:-right-8 z-20 hidden sm:flex"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobsBySpecialitySection;
