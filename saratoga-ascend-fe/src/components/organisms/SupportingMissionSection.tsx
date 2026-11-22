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

/**
 * Figma 2310:5618 / gradient 2310:5619 / photo 2310:5626 (About Us).
 * Band 1920×852. White gap above + below section: 80px.
 * Gradient (40130): equal 70px top + bottom inset within the band (713px tall).
 * Title 160px from band top. Gap image→copy 74px. CMS props unchanged.
 */
export const SupportingMissionSection: React.FC<SupportingMissionSectionProps> = ({
  title,
  description,
  imageSrc,
  cta,
}) => {
  const resolvedSrc = normalizeImageSrc(imageSrc);
  const [brokenSrc, setBrokenSrc] = React.useState<string | null>(null);
  const imgSrc = brokenSrc === resolvedSrc ? DEFAULT_IMAGE : resolvedSrc;

  return (
    <section
      aria-label="Supporting the Missions"
      className="relative isolate my-[clamp(2.5rem,4.167vw,5rem)] w-full overflow-hidden bg-white"
    >
      <div className="relative w-full xl:min-h-[clamp(32rem,44.375vw,53.25rem)]">
        {/*
          Rectangle 40130 — equal top/bottom inset 70px (4.375rem) in the 852 band
          so the bar is 713px with photo overhang above and below.
        */}
        <div
          aria-hidden="true"
          className="bg-cta-gradient pointer-events-none absolute inset-x-0 top-[clamp(2.5rem,3.646vw,4.375rem)] bottom-[clamp(2.5rem,3.646vw,4.375rem)] z-0"
        />

        {/*
          Content column = gutter + 1680 (max-w-home + px-page).
          689 + 74 + 917 = 1680 at the 1920 artboard.
        */}
        <div className="relative z-10 mx-auto flex w-full max-w-home flex-col items-center gap-8 px-page py-10 xl:min-h-[clamp(32rem,44.375vw,53.25rem)] xl:flex-row xl:items-stretch xl:gap-[4.625rem] xl:py-0">
          {/* Frame 2147226432 — 689×852 photo, 24px radius; full band height on desktop */}
          <div className="relative aspect-[689/852] w-full max-w-[min(100%,43.0625rem)] shrink-0 overflow-hidden rounded-[1.5rem] select-none xl:aspect-auto xl:h-auto xl:min-h-[clamp(32rem,44.375vw,53.25rem)] xl:w-[clamp(18rem,35.885vw,43.0625rem)]">
            <Image
              src={imgSrc}
              alt={title || 'Supporting Mission'}
              fill
              unoptimized
              sizes="(max-width: 1279px) 100vw, (max-width: 1536px) 550px, 689px"
              className="object-cover object-top"
              priority
              onError={() => {
                if (resolvedSrc !== DEFAULT_IMAGE) {
                  setBrokenSrc(resolvedSrc);
                }
              }}
            />
          </div>

          {/*
            Frame 610 — copy max 917px.
            Desktop pt 160px above title; pb ~166px so copy sits in the gradient
            with ~96px below the rule to the gradient bottom (Figma).
            title→lede 40px; lede↔lede 30px; lede→rule 40px.
          */}
          <div className="flex w-full min-w-0 max-w-[57.3125rem] flex-col text-white xl:flex-1 xl:pt-40 xl:pb-[10.375rem]">
            {title ? (
              <h2 className="font-serif text-section font-normal tracking-normal text-white">
                {stripHtml(title)}
              </h2>
            ) : null}

          {description ? (
            description.includes('<') ? (
              <div
                className="mt-10 font-sans text-section-lead font-normal tracking-normal text-white [&_p]:mb-[1.875rem] [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <div className="mt-10 flex flex-col gap-[1.875rem]">
                {description
                  .split(/\n\s*\n|\r\n\s*\r\n/)
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((para, idx) => (
                    <p
                      key={idx}
                      className="font-sans text-section-lead font-normal tracking-normal text-white"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            )
          ) : null}

          {/* Vector 4050 — 144.5×4; only with CMS copy */}
          {title || description ? (
            <div className="mt-10">
              <div className="h-1 w-[9.03125rem] rounded-full bg-white" />
            </div>
          ) : null}

          {cta?.label && cta?.href ? (
            <div className="mt-5">
              <a
                href={cta.href}
                target={cta.target || '_self'}
                rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 font-sans text-base font-medium text-brand-cta-from transition-colors duration-200 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {cta.label}
              </a>
            </div>
          ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportingMissionSection;
