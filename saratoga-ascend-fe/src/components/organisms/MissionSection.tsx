'use client';

import React from 'react';
import { Heading, Section } from '../atoms';
import { GeneralLink } from '../atoms/GeneralLink';
import { ArrowUpRightIcon } from '../atoms/icons';
import { MediaFrame } from '../atoms/MediaFrame';

export interface MissionSectionProps {
  title?: string;
  description?: string;
  /** Kept so the CMS image mapping stays intact. The band shows the local butterfly GIF. */
  imageSrc?: string;
  shieldIconSrc?: string;
  pulseIconSrc?: string;
  highlights?: string[];
  heartSrc?: string;
}

const BUTTERFLY_SRC = '/images/four-decades.gif';
const ACCENT = 'Military & Federal';
const FEDERAL_HREF = '/federal';

/** Second lines from the Figma cards. Applied only when the CMS title matches and does not already include them. */
const FEATURE_DETAILS: Record<string, string> = {
  'Nationwide Coverage': 'Active across all 50 states & territories',
  'Cleared Personnel': 'Government & military facilities ready',
  'Dedicated Compliance': '100% rigorous credentialing teams',
  '24/7 Mission Support': 'Always on standby for providers & clients',
};

function titleWithAccent(title: string): React.ReactNode {
  const index = title.indexOf(ACCENT);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <span className="text-brand-cta-from">{ACCENT}</span>
      {title.slice(index + ACCENT.length)}
    </>
  );
}

function detailFor(text: string): string | undefined {
  const detail = FEATURE_DETAILS[text.trim()];
  if (!detail || text.includes(detail)) return undefined;
  return detail;
}

function FeatureCheck() {
  return (
    <span
      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#fff1f2]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 14 14" className="size-3.5" fill="none">
        <path
          d="M2.6 7.2 5.5 10.1 11.4 3.9"
          stroke="#d31e2d"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function GlassTile({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <div
      className={`absolute aspect-square overflow-hidden border border-white bg-white/80 ${className}`}
    >
      <span className="absolute inset-[12%]">
        <MediaFrame
          src={src}
          alt=""
          pendingLabel="icon"
          unoptimized
          sizes="120px"
          imageClassName="object-contain!"
          className="size-full border-0 !bg-transparent"
        />
      </span>
    </div>
  );
}

/**
 * The GIF is 1920×1080 with the butterfly in the middle. This scale shows
 * that whole mark inside the Figma plate (641×707), at the same size as the
 * 750px artwork, without clipping the wings.
 */
function ButterflyMark() {
  return (
    <img
      src={BUTTERFLY_SRC}
      alt=""
      className="pointer-events-none absolute max-w-none"
      style={{
        width: '208.74%',
        height: '106.51%',
        left: '-53.59%',
        top: '-4.46%',
      }}
    />
  );
}

/**
 * Four Decades band (Figma 2002:1193). CMS title, description, highlights,
 * and glass icons stay as delivered. The butterfly is the local GIF.
 */
export const MissionSection: React.FC<MissionSectionProps> = ({
  title,
  description,
  shieldIconSrc = '/images/about/icon-shield.svg',
  pulseIconSrc = '/images/about/icon-pulse.svg',
  highlights,
}) => {
  const items = (highlights ?? []).map((text) => text.trim()).filter(Boolean);

  return (
    <Section
      aria-labelledby={title ? 'about-us-heading' : undefined}
      aria-label={title ? undefined : 'Four decades of healthcare solutions'}
      tone="surface"
      spacing="none"
      className="overflow-hidden"
      containerClassName="py-5"
      style={{ backgroundColor: '#ffe6e8' }}
    >
      <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-[minmax(0,960fr)_minmax(0,641fr)] xl:gap-[79px]">
        <div className="flex min-w-0 flex-col gap-[1.875rem]">
          {title ? (
            <Heading
              id="about-us-heading"
              level={2}
              size="section"
              tone="ink"
              className="leading-[1.2]"
            >
              {titleWithAccent(title)}
            </Heading>
          ) : null}

          {description ? (
            <div
              className="font-sans text-[clamp(1.125rem,0.95rem+0.7vw,1.625rem)] leading-[1.3846] font-normal text-[#475569] [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}

          {items.length > 0 ? (
            <ul className="grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2">
              {items.map((text, index) => {
                const detail = detailFor(text);
                return (
                  <li
                    key={`${index}-${text}`}
                    className="flex items-start gap-3 rounded-2xl border border-[#ffe4e6] bg-white p-[13px]"
                  >
                    <FeatureCheck />
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <p className="font-serif text-[clamp(1.125rem,1.02rem+0.45vw,1.375rem)] leading-8 text-[#1e293b]">
                        {text}
                      </p>
                      {detail ? (
                        <p className="font-sans text-[clamp(0.9375rem,0.88rem+0.25vw,1.125rem)] leading-5 text-[#64748b]">
                          {detail}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}

          <GeneralLink
            href={FEDERAL_HREF}
            variant="unstyled"
            rightIcon={<ArrowUpRightIcon className="size-6" />}
            className="inline-flex w-fit items-center gap-3 rounded-button bg-cta-gradient px-6 py-3 font-sans text-button font-medium text-white shadow-button transition-opacity duration-200 hover:opacity-90"
          >
            Explore Federal Solutions
          </GeneralLink>
        </div>

        <div
          data-butterfly-stage
          className="relative mx-auto aspect-[641/707] w-full max-w-[40.0625rem] overflow-hidden xl:mx-0 xl:max-w-none"
        >
          <ButterflyMark />
          <GlassTile
            src={shieldIconSrc}
            className="top-[3.262%] left-[14.041%] z-[1] w-[17.773%] rounded-[12.3%] backdrop-blur-[12px]"
          />
          <GlassTile
            src={pulseIconSrc}
            className="top-[76.52%] left-[85.101%] z-[1] w-[12.48%] rounded-[25%] backdrop-blur-[17px]"
          />
        </div>
      </div>
    </Section>
  );
};
