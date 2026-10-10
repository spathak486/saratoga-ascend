import React from 'react';
import { Container, Heading, Section, Text } from '../atoms';
import { CtaButton } from '../molecules/CtaButton';

const HERO_BG = '/images/hero-final-bg.png';

function stripHtml(value?: string | null): string | null {
  if (!value) return null;
  const stripped = value.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
  return stripped || null;
}

function splitHeroTitle(title?: string | null) {
  if (!title?.trim()) {
    return null;
  }

  const lines = title
    .split(/[\n|]|<br\s*\/?>/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (lines.length >= 2) {
    return { line1: lines[0], line2: lines.slice(1).join(' ') };
  }

  const words = title.trim().split(/\s+/);
  if (words.length > 2) {
    return { line1: words.slice(0, 2).join(' '), line2: words.slice(2).join(' ') };
  }

  return { line1: title.trim(), line2: '' };
}

export interface HeroSectionProps {
  /** Motion clip when available — kept for CMS video banners. */
  videoSrc?: string;
  helixSrc?: string;
  mediaAlt?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  mediaMime?: string;
  mediaExt?: string;
  variant?: 'homebanner' | 'default' | 'gradient';
}

const bandStyle: React.CSSProperties = {
  minHeight: '723px',
};

const copyStyle: React.CSSProperties = {
  paddingTop: 'clamp(8rem, 17.708vw, 21.25rem)',
  paddingBottom: 'clamp(3rem, 8.333vw, 6.5rem)',
};

const headingStyle: React.CSSProperties = {
  maxWidth: 'min(100%, 61.9375rem)',
};

const ledeStyle: React.CSSProperties = {
  marginTop: 'clamp(1.25rem, 2.448vw, 2.9375rem)',
  maxWidth: 'min(100%, 37.4375rem)',
};

const ctaStyle: React.CSSProperties = {
  marginTop: 'clamp(1.5rem, 2.5vw, 2.5rem)',
};

/**
 * Homepage hero (Figma 525:1346) — 1920×900, washed photo ground, two-line
 * serif title, navy lede. CMS title / description / CTA still drive copy.
 * `helixSrc` and video props stay on the interface so GraphQL banners
 * validate; the visible background is the local hero plate.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  videoSrc,
  helixSrc,
  mediaAlt,
  title,
  subTitle,
  description,
  ctaLabel,
  ctaHref,
  mediaMime,
  mediaExt,
  variant = 'homebanner',
}) => {
  const heading = splitHeroTitle(title);
  const lede = stripHtml(description);
  const isCmsVideo =
    mediaMime?.startsWith('video/') ||
    mediaExt === '.mp4' ||
    mediaExt === '.webm' ||
    mediaExt === '.mov';
  const resolvedVideoSrc = videoSrc || (isCmsVideo ? helixSrc : undefined);

  if (variant === 'default') {
    return (
      <section 
        className="relative w-full h-auto min-h-[400px] md:min-h-[541px] flex flex-col justify-center py-16 px-4 md:px-[120px]"
        style={{ 
          background: helixSrc 
            ? `linear-gradient(90.52deg, #E4EBF1 0.41%, rgba(228, 235, 241, 0.2) 69.2%), url(${helixSrc}) center right / cover no-repeat` 
            : 'linear-gradient(90.52deg, #E4EBF1 0.41%, rgba(228, 235, 241, 0.2) 69.2%)' 
        }}
      >
        <div className="flex flex-col justify-center items-start gap-[30px] w-full max-w-[1760px] mx-auto z-10">
          {title && (
            <Heading level={1} className="font-serif font-normal text-[clamp(50px,5vw,90px)] leading-[1.15] text-black max-w-full md:max-w-none">
              {title}
            </Heading>
          )}
          {(description || subTitle) && (
            <p className="font-sans font-medium text-[clamp(18px,1.5vw,24px)] leading-[1.6] text-black max-w-[755px]">
              {description || subTitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  if (variant === 'gradient') {
    return (
      <section className="w-full px-4 md:px-[120px] py-16">
        <div className="relative w-full max-w-[1680px] mx-auto overflow-hidden rounded-[26px] bg-gray-900 shadow-lg min-h-[400px] md:h-[868px] flex items-end">
          {/* Background Image / Video */}
        {resolvedVideoSrc ? (
          <video
            src={resolvedVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : helixSrc ? (
          <img
            src={helixSrc}
            alt={mediaAlt || "Banner Background"}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : null}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_46.5%,#000000_106.95%)]" />

        {/* Content */}
        <div className="relative z-10 w-[80%] max-w-[1338px] mx-auto mb-[30px] xl:mb-[50px] text-white flex flex-col xl:flex-row xl:items-center gap-8 xl:gap-[54px] xl:h-[122.5px]">
          <div className="flex-shrink-0 xl:w-[26%] max-w-[348px]">
            <h2 className="font-serif font-normal text-[clamp(40px,3.5vw,60px)] leading-[1.2] text-white">
              {title}
            </h2>
          </div>
          
          {/* Divider (visible on xl+) */}
          <div className="hidden xl:block w-0 h-[122.5px] border-l-[3px] border-white" />

          <div className="flex-1 max-w-[882px]">
            {lede && (
              <p className="font-sans font-normal text-[clamp(20px,1.6vw,28px)] leading-[38px] text-white">
                {lede}
              </p>
            )}
          </div>
        </div>
      </div>
      </section>
    );
  }

  return (
    <Section
      id="overview"
      aria-labelledby="hero-heading"
      tone="surface"
      spacing="none"
      bleed
      className="overflow-hidden min-[90rem]:-mt-nav-h"
    >
      <div
        className="relative md:h-hero-min md:min-h-hero-min max-md:h-[38.125rem] max-md:!min-h-[38.125rem]"
        style={bandStyle}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {resolvedVideoSrc ? (
            <video
              className="absolute inset-0 size-full object-cover object-right"
              poster={HERO_BG}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={resolvedVideoSrc} type={mediaMime || 'video/mp4'} />
            </video>
          ) : (
            <img
              src={helixSrc || HERO_BG}
              alt={mediaAlt || ""}
              width={1920}
              height={900}
              className="absolute inset-0 size-full object-cover object-right"
              decoding="async"
              fetchPriority="high"
            />
          )}
        </div>

        <Container
          className="relative z-10 flex min-h-full flex-col items-start max-md:justify-end max-md:gap-5 max-md:!px-5 max-md:!pb-5 max-md:!pt-[18.75rem]"
          style={copyStyle}
        >
          {heading ? (
            <Heading
              id="hero-heading"
              level={1}
              size="hero"
              tone="inherit"
              className="tracking-normal max-md:text-[2rem] max-md:leading-[2.5rem]"
              style={headingStyle}
            >
              <span className="block text-ink">{heading.line1}</span>
              {heading.line2 ? (
                <span className="block text-brand-cta-from">{heading.line2}</span>
              ) : null}
            </Heading>
          ) : null}

          {lede ? (
            <Text
              size="lead"
              tone="navy"
              className="font-medium tracking-normal max-md:text-[1.5rem] max-md:leading-[1.6]"
              style={ledeStyle}
            >
              {lede}
            </Text>
          ) : null}

          {ctaLabel && ctaHref ? (
            <div style={ctaStyle}>
              <CtaButton href={ctaHref} className="self-start">
                {ctaLabel}
              </CtaButton>
            </div>
          ) : null}
        </Container>
      </div>
    </Section>
  );
};
