import React from 'react';
import { Container, Heading, Section, Text } from '../atoms';
import { CtaButton } from '../molecules/CtaButton';

export interface HeroSectionProps {
  /** Motion clip when available — falls back to the still. */
  videoSrc?: string;
  helixSrc?: string;
  mediaAlt?: string;
}

const bandStyle: React.CSSProperties = {
  minHeight: 'min(36rem, 100svh)',
};

const copyStyle: React.CSSProperties = {
  paddingTop: 'calc(var(--spacing-nav-h) + clamp(2rem, 11.458vw, 13.75rem))',
  paddingBottom: 'clamp(2rem, 11.458vw, 13.75rem)',
};

const headingStyle: React.CSSProperties = {
  maxWidth: 'min(100%, 61.9375rem)',
};

const ledeStyle: React.CSSProperties = {
  marginTop: 'clamp(1.25rem, 2.448vw, 2.9375rem)',
  maxWidth: 'min(100%, 37.4375rem)',
};

const ctaStyle: React.CSSProperties = {
  marginTop: 'clamp(1.75rem, 3.594vw, 4.3125rem)',
};

const leafStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-6.97%',
  left: 0,
  width: '100%',
  height: '114.63%',
  maxWidth: 'none',
  objectFit: 'cover',
  objectPosition: 'center 42%',
};

/**
 * Opens the page with the DNA helix bleeding off the right edge and the thesis
 * headline on the left. Pulled up under the sticky nav (`-mt-nav-h`) so the
 * artwork reads continuous with the header, matching the artboard where the
 * hero band begins beneath the utility row only.
 *
 * Artboard 23:133 / 23:134 — 1920×1020 visual band. Copy on the 120px gutter.
 * Headline 340px from the band top. Body 47px below the headline (24px
 * medium, 599px). CTA 69px below the body (180×60). Helix frame 2162×1020,
 * centred on 50% + 495px, image leaf 114.63% tall and pulled up 6.97%.
 *
 * Nested clamp/min values live in `style` because commas inside Tailwind
 * arbitrary classes are treated as class separators and never emit CSS.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  videoSrc,
  helixSrc = '/images/DNA-v1.png',
  mediaAlt = 'DNA double helix illustration',
}) => (
  <Section
    id="overview"
    aria-labelledby="hero-heading"
    tone="surface"
    spacing="none"
    bleed
    className="-mt-nav-h overflow-hidden"
  >
    <div className="relative md:h-hero-min md:min-h-hero-min" style={bandStyle}>
      {/*
        23:135 is 2162 wide, left = 50% + 495px of the 1920 artboard
        (75.78125%), then pulled back by half its own width. Below md the
        same crop sits in the lower half so the headline keeps a clear
        column — the file has no mobile frame; that is the hierarchy the
        desktop composition implies, not a scaled-down 1920 layout.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden max-md:h-[20rem] md:inset-0 md:h-full"
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-[75.78125%] w-[112.604166%] -translate-x-1/2">
          {videoSrc ? (
            <video
              style={leafStyle}
              poster={helixSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <img
              src={helixSrc}
              alt=""
              width={2162}
              height={1020}
              style={leafStyle}
              decoding="async"
              fetchPriority="high"
            />
          )}
        </div>
      </div>

      <div className="bg-hero-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

      <Container
        className="relative z-10 flex min-h-full flex-col items-start"
        style={copyStyle}
      >
        <Heading
          id="hero-heading"
          level={1}
          size="hero"
          tone="inherit"
          className="tracking-normal"
          style={headingStyle}
        >
          <span className="block text-ink">Federal State</span>
          <span className="block text-brand-cta-from">Programs and Solutions</span>
        </Heading>

        <Text
          size="lead"
          tone="navy"
          className="font-medium tracking-normal"
          style={ledeStyle}
        >
          Saratoga Ascend connects cleared, credentialed healthcare professionals
          with government, military, and local facilities nationwide.
        </Text>

        <div style={ctaStyle}>
          <CtaButton href="/contact" className="self-start">
            Contact us
          </CtaButton>
        </div>
      </Container>
    </div>
  </Section>
);
