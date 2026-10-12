'use client';

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
      className="relative w-full overflow-hidden bg-white flex items-center justify-center min-h-[640px] lg:min-h-[760px] xl:min-h-[800px] 2xl:min-h-[852px] py-12 lg:py-0"
    >
      {/* Background Gradient Bar (Figma Rectangle 40130: 1921px x 713px, top: 1049px / centered vertically) */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full lg:h-[600px] xl:h-[660px] 2xl:h-[713px] z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
        }}
      />

      {/* Main Content Layout (1920px canvas, 120px side margins) */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-8 md:px-12 2xl:px-[120px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-[50px] 2xl:gap-[74px]">
          
          {/* Left Doctor Photo Frame (Figma Frame 2147226432: 689px x 852px, border-radius: 24px) */}
          <div className="relative shrink-0 w-full max-w-[500px] lg:max-w-none lg:w-[440px] xl:w-[560px] 2xl:w-[689px] h-[480px] sm:h-[580px] lg:h-[680px] xl:h-[770px] 2xl:h-[852px] rounded-[24px] overflow-hidden shadow-2xl">
            <Image
              src={imgSrc}
              alt={title || 'Supporting Mission'}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 560px, 689px"
              className="object-cover object-top select-none"
              priority
              onError={() => {
                if (imgSrc !== DEFAULT_IMAGE) {
                  setImgSrc(DEFAULT_IMAGE);
                }
              }}
            />
          </div>

          {/* Right Content Frame (Figma Frame 610: left 883px, right 120px -> 917px wide) */}
          <div className="flex-1 w-full max-w-[917px] text-white flex flex-col justify-center py-4 lg:py-6">
            
            {/* Title (Figma: DM Serif Text, 72px, line-height 120%) */}
            {title && (
              <h2 className="font-serif font-normal text-white text-[clamp(2.25rem,1.5rem+2.6vw,4.5rem)] leading-[1.2] tracking-[-0.01em]">
                {title}
              </h2>
            )}

            {/* Dynamic Description / Paragraphs from CMS */}
            {description ? (
              description.includes('<') ? (
                <div
                  className="mt-6 md:mt-8 2xl:mt-[36px] font-sans font-normal text-white text-[clamp(1rem,0.85rem+0.8vw,1.875rem)] leading-[1.35] tracking-normal space-y-4 md:space-y-6 2xl:space-y-[30px] [&_p]:mb-4 2xl:[&_p]:mb-[30px] [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              ) : (
                <div className="mt-6 md:mt-8 2xl:mt-[36px] flex flex-col gap-4 md:gap-6 2xl:gap-[30px]">
                  {description
                    .split(/\n\s*\n|\r\n\s*\r\n/)
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .map((para, idx) => (
                      <p
                        key={idx}
                        className="font-sans font-normal text-white text-[clamp(1rem,0.85rem+0.8vw,1.875rem)] leading-[1.35] tracking-normal"
                      >
                        {para}
                      </p>
                    ))}
                </div>
              )
            ) : null}

            {/* Accent Line (Figma Vector 4050: width 144.5px, height 4px, background #FFFFFF) */}
            <div className="mt-8 md:mt-10 2xl:mt-[40px]">
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
              <div className="mt-8">
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
