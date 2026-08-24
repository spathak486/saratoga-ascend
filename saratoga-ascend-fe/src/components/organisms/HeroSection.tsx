import React from 'react';
import { Container, Heading, MediaFrame, Section, Text } from '../atoms';
import { CtaButton } from '../molecules/CtaButton';

export interface HeroSectionProps {
  /** Dynamic content from Strapi CMS Banner Component */
  title?: string;
  subTitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  videoSrc?: string;
  helixSrc?: string;
  mediaMime?: string;
  mediaExt?: string;
  mediaAlt?: string;
}

/**
 * Opens the page with the DNA helix bleeding off the right edge and the thesis
 * headline on the left. Pulled up under the sticky nav (`-mt-nav-h`) so the
 * artwork reads continuous with the header, matching the artboard where the
 * hero band begins beneath the utility row only.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subTitle,
  description,
  ctaLabel,
  ctaHref,
  videoSrc,
  helixSrc = '/images/DNA-v1.png',
  mediaMime,
  mediaExt,
  mediaAlt = 'DNA double helix illustration',
}) => {
  const displayMediaUrl = helixSrc || videoSrc || '/images/DNA-v1.png';

  const isVideo =
    Boolean(videoSrc) ||
    mediaMime?.startsWith('video/') ||
    Boolean(mediaExt && /\.(mp4|webm|ogg|mov|m4v)$/i.test(mediaExt)) ||
    Boolean(displayMediaUrl && /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(displayMediaUrl));

  const isGif =
    mediaMime === 'image/gif' ||
    mediaExt?.toLowerCase() === '.gif' ||
    Boolean(displayMediaUrl && /\.gif(\?.*)?$/i.test(displayMediaUrl));

  return (
    <Section
      id="overview"
      aria-labelledby="hero-heading"
      tone="surface"
      spacing="none"
      bleed
      className="-mt-nav-h overflow-hidden"
    >
      <div className="relative min-h-[min(36rem,100svh)] xl:min-h-[1020px] xl:h-[1020px] w-full max-w-[1920px] mx-auto">
        {/* Frame 567: Media Container (Image, Video, or GIF) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 max-xl:right-0 max-xl:h-[min(22rem,50%)] max-xl:w-[min(115vw,28rem)] max-xl:translate-x-[18%] xl:left-[calc(50%-586px)] xl:w-[2162px] xl:h-[1020px] xl:max-w-none"
        >
          {isVideo ? (
            <video
              className="size-full object-contain object-right xl:object-left-bottom"
              poster={helixSrc !== displayMediaUrl ? helixSrc : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={displayMediaUrl} type={mediaMime || 'video/mp4'} />
            </video>
          ) : (
            <MediaFrame
              src={displayMediaUrl}
              alt={mediaAlt}
              pendingLabel="DNA-v1.png"
              tone="sky"
              priority
              unoptimized={isGif}
              sizes="(max-width: 1280px) 100vw, 2162px"
              imageClassName="object-contain object-right xl:object-left-bottom!"
              className="size-full border-0 bg-transparent"
            />
          )}
        </div>

        <div
          className="bg-hero-scrim pointer-events-none absolute inset-0 z-[1]"
          aria-hidden="true"
        />

        {/* Group 82: Content block (width: 991px, height: 460px, left: 120px, top: calc(50% - 230px + 30px)) */}
        <Container className="relative z-10 flex min-h-[min(36rem,100svh)] xl:min-h-[1020px] flex-col justify-center pt-[calc(var(--spacing-nav-h)+1.5rem)] pb-12 xl:py-0">
          <div className="flex w-full flex-col justify-center xl:absolute xl:left-[120px] xl:top-[calc(50%-230px+30px)] xl:w-[991px] xl:min-h-[460px]">
            {subTitle ? (
              <span className="mb-2 block text-sm font-semibold tracking-wider uppercase text-brand-cta-from">
                {subTitle}
              </span>
            ) : null}

            <Heading
              id="hero-heading"
              level={1}
              size="hero"
              tone="inherit"
              className="max-w-[850px] text-balance font-serif"
            >
              {(() => {
                if (!title) {
                  return (
                    <>
                      <span className="block text-ink">Federal State</span>
                      <span className="block text-brand-cta-from">Programs and Solutions</span>
                    </>
                  );
                }
                const lines = title.split(/[\n|]|<br\s*\/?>/i).map((s) => s.trim()).filter(Boolean);
                if (lines.length >= 2) {
                  return (
                    <>
                      <span className="block text-ink">{lines[0]}</span>
                      <span className="block text-brand-cta-from">{lines.slice(1).join(' ')}</span>
                    </>
                  );
                }
                const words = title.trim().split(/\s+/);
                if (words.length > 2) {
                  return (
                    <>
                      <span className="block text-ink">{words.slice(0, 2).join(' ')}</span>
                      <span className="block text-brand-cta-from">{words.slice(2).join(' ')}</span>
                    </>
                  );
                }
                return <span className="block text-ink">{title}</span>;
              })()}
            </Heading>

            <Text
              size="lead"
              tone="navy"
              className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[37.5rem] font-medium"
            >
              {description
                ? description.replace(/<[^>]*>?/gm, '')
                : 'Saratoga Ascend connects cleared, credentialed healthcare professionals with government, military, and local facilities nationwide.'}
            </Text>

            <CtaButton
              href={ctaHref || '/contact'}
              className="mt-[clamp(1.5rem,3vw,2.5rem)] h-12 w-auto max-w-full justify-center px-6 py-3 md:h-[3.75rem] md:w-[11.25rem] md:max-w-[11.25rem] md:min-w-[11.25rem] md:px-6 md:py-4"
            >
              {ctaLabel || 'Contact us'}
            </CtaButton>
          </div>
        </Container>
      </div>
    </Section>
  );
};

