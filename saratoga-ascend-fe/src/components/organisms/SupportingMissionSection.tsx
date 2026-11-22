'use client';

import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import Image from 'next/image';

export interface SupportingMissionSectionProps {
  title?: string | null;
  description?: string | null;
  imageSrc?: string | null;
  cta?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
  } | null;
}

const DEFAULT_IMAGE = '/images/supporting-missions.png';

function normalizeImageSrc(url?: string | null): string {
  if (!url) return DEFAULT_IMAGE;
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

export const SupportingMissionSection: React.FC<SupportingMissionSectionProps> = ({
  title,
  description,
  imageSrc,
  cta,
}) => {
  const [imgSrc, setImgSrc] = React.useState<string>(() => normalizeImageSrc(imageSrc));

  React.useEffect(() => {
    setImgSrc(normalizeImageSrc(imageSrc));
  }, [imageSrc]);

  return (
    <section
      aria-label="Supporting the Missions"
      className="relative flex w-full items-center justify-center overflow-hidden bg-white my-6 sm:my-10 lg:my-14 xl:min-h-[min(53.25rem,90vh)]"
    >
      {/* Background Gradient Bar: Figma Rectangle 40130 centered vertically behind the photo */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[82%] sm:h-[84%] lg:h-[clamp(32rem,44.5vw,44.5625rem)] z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
        }}
      />

      {/* Main Content Layout: Fits in 1 single viewport frame on laptop & desktop */}
      <div className="relative z-10 mx-auto w-full max-w-home px-5 sm:px-8 md:px-10 lg:px-page py-6 lg:py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 lg:flex-row lg:gap-10 xl:gap-[clamp(2.5rem,4vw,5rem)]">
          
          {/* Left Doctor Photo Frame: Figma 689px x 852px (aspect-[689/852]), cleanly scaled to fit within a single screen */}
          <div className="relative aspect-[689/852] w-full max-w-[19rem] sm:max-w-[22rem] md:max-w-[25rem] lg:max-w-none lg:w-[36%] xl:w-[41%] lg:max-h-[min(53.25rem,85vh)] shrink-0 overflow-hidden rounded-[1.5rem] shadow-xl select-none">
            <Image
              src={imgSrc}
              alt={title || 'Supporting Mission'}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 550px, 689px"
              className="object-cover object-top"
              priority
              onError={() => {
                if (imgSrc !== DEFAULT_IMAGE) {
                  setImgSrc(DEFAULT_IMAGE);
                }
              }}
            />
          </div>

          {/* Right Content Frame: Proportional typography that fits in 1 screen height */}
          <div className="flex-1 w-full max-w-[57.3125rem] text-white flex flex-col justify-center py-2 lg:py-4">
            
            {/* Title (Figma: DM Serif Text, 72px) */}
            {title && (
              <h2 className="font-serif font-normal text-white text-[clamp(1.75rem,1.2rem+2vw,3.75rem)] 2xl:text-[4.5rem] leading-[1.16] tracking-[-0.01em]">
                {stripHtml(title)}
              </h2>
            )}

            {/* Dynamic Description / Paragraphs */}
            {description ? (
              description.includes('<') ? (
                <div
                  className="mt-3 sm:mt-4 lg:mt-5 2xl:mt-7 font-sans font-normal text-white text-[clamp(0.875rem,0.8rem+0.35vw,1.25rem)] 2xl:text-[1.5rem] leading-[1.38] tracking-normal space-y-2.5 sm:space-y-3.5 2xl:space-y-4 [&_p]:mb-2.5 2xl:[&_p]:mb-4 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              ) : (
                <div className="mt-3 sm:mt-4 lg:mt-5 2xl:mt-7 flex flex-col gap-2.5 sm:gap-3.5 2xl:gap-4">
                  {description
                    .split(/\n\s*\n|\r\n\s*\r\n/)
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .map((para, idx) => (
                      <p
                        key={idx}
                        className="font-sans font-normal text-white text-[clamp(0.875rem,0.8rem+0.35vw,1.25rem)] 2xl:text-[1.5rem] leading-[1.38] tracking-normal"
                      >
                        {para}
                      </p>
                    ))}
                </div>
              )
            ) : null}

            {/* Accent Line (Figma Vector 4050: width 144.5px, height 4px, background #FFFFFF) */}
            <div className="mt-4 sm:mt-5 lg:mt-6 2xl:mt-8">
              <div className="bg-white rounded-full w-[9.03125rem] h-[0.25rem]" />
            </div>

            {/* Optional CTA link if configured */}
            {cta?.label && cta?.href && (
              <div className="mt-5">
                <a
                  href={cta.href}
                  target={cta.target || '_self'}
                  rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-[#D31E2D] font-sans font-medium text-base hover:bg-white/90 transition-colors duration-200"
                >
                  {cta.label}
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportingMissionSection;