import React from 'react';
import { Container, Heading, MediaFrame, Section, Text } from '../atoms';
import { CtaButton } from '../molecules/CtaButton';

export interface HeroSectionProps {
  /** Motion clip when available — falls back to the still. */
  videoSrc?: string;
  helixSrc?: string;
  mediaAlt?: string;
}

/**
 * Opens the page with the DNA helix bleeding off the right edge and the thesis
 * headline on the left. Pulled up under the sticky nav (`-mt-nav-h`) so the
 * artwork reads continuous with the header, matching the artboard where the
 * hero band begins beneath the utility row only.
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
    <div className="relative min-h-[min(36rem,100svh)] md:min-h-hero-min">
      {/* Helix stays on the right. On a phone it sits low so the headline
          keeps a clear column; from md up it bleeds like the artboard. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 max-md:bottom-0 max-md:h-[min(22rem,50%)] max-md:w-[min(115vw,28rem)] max-md:translate-x-[18%] md:inset-y-0 md:w-[min(130vw,135rem)] md:translate-x-[clamp(0rem,8vw,18rem)]"
      >
        {videoSrc ? (
          <video
            className="size-full object-contain object-right"
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
          <MediaFrame
            src={helixSrc}
            alt=""
            pendingLabel="DNA-v1.png"
            tone="sky"
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            imageClassName="object-contain object-right!"
            className="size-full border-0 bg-transparent"
          />
        )}
      </div>

      <div
        className="bg-hero-scrim pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[min(36rem,100svh)] flex-col justify-center pt-[calc(var(--spacing-nav-h)+2rem)] pb-16 md:min-h-hero-min md:pt-[clamp(6rem,18vw,21.25rem)] md:pb-[clamp(2.5rem,6vw,4rem)]">
        <Heading
          id="hero-heading"
          level={1}
          size="hero"
          tone="inherit"
          className="max-w-[18ch] text-balance"
        >
          <span className="block text-ink">Federal State</span>
          <span className="block text-brand-cta-from">Programs and Solutions</span>
        </Heading>

        <Text
          size="lead"
          tone="navy"
          className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[37.5rem] font-medium"
        >
          Saratoga Ascend connects cleared, credentialed healthcare professionals
          with government, military, and local facilities nationwide.
        </Text>

        <CtaButton
          href="/contact"
          className="mt-[clamp(1.5rem,3vw,2.5rem)] h-12 w-auto max-w-full justify-center px-6 py-3 md:h-[3.75rem] md:w-[11.25rem] md:max-w-[11.25rem] md:min-w-[11.25rem] md:px-6 md:py-4"
        >
          Contact us
        </CtaButton>
      </Container>
    </div>
  </Section>
);
