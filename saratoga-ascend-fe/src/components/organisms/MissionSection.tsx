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
  highlights?: { text: string; subtext?: string | null }[];
  heartSrc?: string;
  cta?: {
    label: string;
    href: string;
    target?: string;
    isExternal?: boolean;
  };
}

const BUTTERFLY_SRC = '/images/four-decades.gif';
const ACCENT = 'Military & Federal';
const FEDERAL_HREF = '/federal';

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
 * The GIF is 1920×1080 with the butterfly in the middle. Desktop % values
 * fit that mark in the 641×707 plate. Mobile % values map the same 16:9 GIF
 * onto Figma's 750px artwork in the 390×578 plate (2105:702) so the wings
 * clip the edges instead of sitting in a padded square.
 */
function ButterflyMark({ src }: { src?: string }) {
  return (
    <img
      src={src || BUTTERFLY_SRC}
      alt=""
      className="pointer-events-none absolute max-w-none left-[-53.59%] top-[-4.46%] h-[106.51%] w-[208.74%] max-xl:left-[-120.77%] max-xl:top-[-15.13%] max-xl:h-[130.21%] max-xl:w-[343.08%]"
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
  imageSrc,
  shieldIconSrc = '/images/about/icon-shield.svg',
  pulseIconSrc = '/images/about/icon-pulse.svg',
  highlights,
  cta,
}) => {
  const items = highlights ?? [];

  return (
    <Section
      aria-labelledby={title ? 'about-us-heading' : undefined}
      aria-label={title ? undefined : 'Four decades of healthcare solutions'}
      tone="surface"
      spacing="none"
      className="overflow-hidden max-xl:bg-[linear-gradient(to_bottom,#f2f5f9_38.935%,#ffccd1_100%)]"
      containerClassName="py-5"
      style={{ backgroundColor: '#ffe6e8' }}
    >
      <div className="grid grid-cols-1 items-start gap-10 max-xl:gap-[1.875rem] xl:grid-cols-[minmax(0,960fr)_minmax(0,641fr)] xl:gap-[79px]">
        <div className="flex min-w-0 flex-col gap-[1.875rem] max-xl:gap-3">
          {title ? (
            <Heading
              id="about-us-heading"
              level={2}
              size="section"
              tone="ink"
              className="leading-[1.2] max-xl:text-[2rem]! max-xl:leading-[2.5rem]!"
            >
              {titleWithAccent(title)}
            </Heading>
          ) : null}

          {description ? (
            <div
              className="font-sans text-[clamp(1.125rem,0.95rem+0.7vw,1.625rem)] leading-[1.3846] font-normal text-[#475569] max-xl:text-base! max-xl:leading-5! [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}

          {items.length > 0 ? (
            <ul className="grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-[1.875rem]">
              {items.map((item, index) => {
                const text = item.text.trim();
                if (!text) return null;
                const detail = item.subtext?.trim();
                return (
                  <li
                    key={`${index}-${text}`}
                    className="flex items-start gap-3 rounded-2xl border border-[#ffe4e6] bg-white p-[13px] max-xl:flex-col"
                  >
                    <FeatureCheck />
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <p className="font-serif text-[clamp(1.125rem,1.02rem+0.45vw,1.375rem)] leading-8 text-[#1e293b] max-xl:text-[1.375rem]!">
                        {text}
                      </p>
                      {detail ? (
                        <p className="font-sans text-[clamp(0.9375rem,0.88rem+0.25vw,1.125rem)] leading-5 text-[#64748b] max-xl:text-[1.125rem]!">
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
            href={cta?.href || FEDERAL_HREF}
            target={cta?.target || '_self'}
            variant="unstyled"
            rightIcon={<ArrowUpRightIcon className="size-6" />}
            className="inline-flex w-fit items-center gap-3 rounded-button bg-cta-gradient px-6 py-3 font-sans text-button font-medium text-white shadow-button transition-opacity duration-200 hover:opacity-90 max-xl:w-full max-xl:justify-center max-xl:text-sm max-xl:leading-[1.125rem] max-xl:font-normal"
          >
            {cta?.label || 'Explore Federal Solutions'}
          </GeneralLink>
        </div>

        <div
          data-butterfly-stage
          className="relative mx-auto aspect-[641/707] w-full max-w-[40.0625rem] overflow-hidden max-xl:aspect-[390/578.3] max-xl:max-w-none xl:mx-0 xl:max-w-none"
        >
          <ButterflyMark src={imageSrc} />
          <GlassTile
            src={shieldIconSrc}
            className="top-[3.262%] left-[14.041%] z-[1] w-[17.773%] rounded-[12.3%] backdrop-blur-[12px] max-xl:left-[2.07%] max-xl:w-[28.15%] max-xl:rounded-[10.6%] max-xl:backdrop-blur-[10px]"
          />
          <GlassTile
            src={pulseIconSrc}
            className="top-[76.52%] left-[85.101%] z-[1] w-[12.48%] rounded-[25%] backdrop-blur-[17px] max-xl:left-[80.37%] max-xl:w-[16.45%]"
          />
        </div>
      </div>
    </Section>
  );
};
