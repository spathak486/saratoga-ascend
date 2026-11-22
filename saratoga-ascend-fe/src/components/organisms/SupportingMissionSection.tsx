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
      className="relative flex w-full items-center justify-center overflow-hidden bg-white my-10 sm:my-14 lg:my-20 min-h-[500px] lg:h-[clamp(640px,44.375vw,852px)]"
    >
      {/* Background Gradient Bar (Figma Rectangle 40130: 1921px x 713px, top 1049px / centered vertically) */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[calc(100%-40px)] sm:h-[calc(100%-60px)] lg:h-[clamp(540px,37.135vw,713px)] z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
        }}
      />

      {/* Main Content Layout (1920px canvas, 120px side margins) */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,6.25vw,7.5rem)]">
        <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 lg:flex-row lg:gap-[clamp(2rem,3.85vw,4.625rem)]">
          
          {/* Left Doctor Photo Frame (Figma Frame 2147226432: 689px x 852px, border-radius 24px) */}
          <div className="relative aspect-[689/852] w-full max-w-[22.5rem] shrink-0 overflow-hidden rounded-[24px] select-none sm:max-w-[28rem] lg:max-w-none lg:w-[clamp(420px,35.88vw,689px)] lg:h-[clamp(520px,44.375vw,852px)]">
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

          {/* Right Content Frame (Figma Frame 610: left 883px, right 120px -> 917px wide) */}
          <div className="flex-1 w-full max-w-[917px] text-white flex flex-col justify-center py-4 lg:py-0">
            
            {/* Title (Figma: DM Serif Text, 72px, line-height 120%) */}
            {title && (
              <h2 className="font-serif font-normal text-white text-[clamp(2rem,1.4rem+2.2vw,4.5rem)] leading-[1.2] tracking-[-0.01em]">
                {stripHtml(title)}
              </h2>
            )}

            {/* Dynamic Description / Paragraphs (Figma: Google Sans Flex, 30px, line-height 40px / 133%) */}
            {description ? (
              description.includes('<') ? (
                <div
                  className="mt-5 md:mt-6 2xl:mt-[36px] font-sans font-normal text-white text-[clamp(1rem,0.85rem+0.55vw,1.875rem)] leading-[1.33] tracking-normal max-sm:leading-[24px]! space-y-3 md:space-y-4 2xl:space-y-[30px] [&_p]:mb-3 2xl:[&_p]:mb-[30px] [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              ) : (
                <div className="mt-5 md:mt-6 2xl:mt-[36px] flex flex-col gap-3 md:gap-4 2xl:gap-[30px]">
                  {description
                    .split(/\n\s*\n|\r\n\s*\r\n/)
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .map((para, idx) => (
                      <p
                        key={idx}
                        className="font-sans font-normal text-white text-[clamp(1rem,0.85rem+0.55vw,1.875rem)] leading-[1.33] tracking-normal max-sm:leading-[24px]!"
                      >
                        {para}
                      </p>
                    ))}
                </div>
              )
            ) : null}

            {/* Accent Line (Figma Vector 4050: width 144.5px, height 4px, background #FFFFFF) */}
            <div className="mt-6 md:mt-8 2xl:mt-[40px]">
              <div
                className="bg-white rounded-full"
                style={{
                  width: '144.5px',
                  height: '4px',
                }}
              />
            </div>

            {/* Optional CTA link if configured */}
            {cta?.label && cta?.href && (
              <div className="mt-6">
                <a
                  href={cta.href}
                  target={cta.target || '_self'}
                  rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#D31E2D] font-sans font-medium text-lg hover:bg-white/90 transition-colors duration-200"
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
