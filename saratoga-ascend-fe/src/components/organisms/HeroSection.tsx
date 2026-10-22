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

/** Newline, `<br>`, and `|` all become line breaks, matching `splitHeroTitle`. */
function normalizeBreaks(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\|/g, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ');
}

function titleWithAccent(title: string, accent?: string | null): React.ReactNode {
  const source = normalizeBreaks(title).trim();
  const phrase = accent ? normalizeBreaks(accent).replace(/\s+/g, ' ').trim() : '';
  const marks = [...source].map((ch) => ({ ch, red: false }));

  if (phrase) {
    const folded: string[] = [];
    const origin: number[] = [];
    let previousWasSpace = false;
    [...source].forEach((ch, index) => {
      if (/\s/.test(ch)) {
        if (!previousWasSpace) {
          folded.push(' ');
          origin.push(index);
          previousWasSpace = true;
        }
        return;
      }
      previousWasSpace = false;
      folded.push(ch);
      origin.push(index);
    });
    const at = folded.join('').toLowerCase().indexOf(phrase.toLowerCase());
    if (at >= 0) {
      const start = origin[at];
      const end = origin[at + phrase.length - 1] + 1;
      for (let index = start; index < end; index += 1) marks[index].red = true;
    }
  }

  const runs: { text: string; red: boolean }[] = [];
  marks.forEach((mark) => {
    const previous = runs[runs.length - 1];
    if (previous && previous.red === mark.red) {
      previous.text += mark.ch;
      return;
    }
    runs.push({ text: mark.ch, red: mark.red });
  });

  return runs.map((run, runIndex) =>
    run.text.split('\n').map((line, lineIndex, lines) => (
      <React.Fragment key={`${runIndex}-${lineIndex}`}>
        {line ? <span className={run.red ? 'text-brand-red' : undefined}>{line}</span> : null}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </React.Fragment>
    )),
  );
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
  /**
   * Contact page composition (Figma 2219:1455). CMS still supplies the banner
   * title, description, image, and subtitle. The subtitle, when it appears
   * inside the title, is the red phrase. Homepage variants ignore this.
   */
  layout?: 'contact';
}

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
  layout,
}) => {
  const heading = splitHeroTitle(title);
  const lede = stripHtml(description);
  const isCmsVideo =
    mediaMime?.startsWith('video/') ||
    mediaExt === '.mp4' ||
    mediaExt === '.webm' ||
    mediaExt === '.mov';
  const resolvedVideoSrc = videoSrc || (isCmsVideo ? helixSrc : undefined);

  if (layout === 'contact') {
    const photoAlt = mediaAlt || '';
    const contactTitle = title ? normalizeBreaks(title).trim() : '';

    return (
      <Section
        aria-labelledby={contactTitle ? 'contact-hero-heading' : undefined}
        aria-label={contactTitle ? undefined : 'Contact'}
        tone="surface"
        spacing="none"
        bleed
        className="overflow-hidden"
      >
        {/*
          Min height follows the 1920×723 photo. The band may grow with the
          copy, and object-contain keeps the whole photo on the wash.
          pt-24 below xl clears the fixed nav pill; desktop has no extra offset.
        */}
        <div className="relative flex min-h-[calc(100vw*723/1920)] items-center bg-[#eaf4fb] max-xl:pt-24">
          <div className="pointer-events-none absolute inset-0" aria-hidden={photoAlt ? undefined : true}>
            {resolvedVideoSrc ? (
              <video
                className="absolute inset-0 size-full object-contain object-right"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={resolvedVideoSrc} type={mediaMime || 'video/mp4'} />
              </video>
            ) : helixSrc ? (
              <img
                src={helixSrc}
                alt={photoAlt}
                className="absolute inset-0 size-full object-contain object-right"
                decoding="async"
                fetchPriority="high"
              />
            ) : null}
          </div>
          {/* Figma 2219:1457 — #EAF4FB wash, local to this frame. */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(89.55deg,#eaf4fb_5.95%,rgba(234,244,251,0)_128%)]"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col items-start gap-6 py-[clamp(1.5rem,6.5625vw,7.875rem)] xl:gap-12">
            {contactTitle ? (
              <Heading
                id="contact-hero-heading"
                level={1}
                size="hero"
                tone="ink"
                className="max-w-[min(100%,64.5625rem)] tracking-normal"
              >
                {titleWithAccent(title ?? '', stripHtml(subTitle))}
              </Heading>
            ) : null}
            {lede ? (
              <Text
                size="lead"
                tone="navy"
                className="max-w-[min(100%,48.6875rem)] font-medium tracking-normal"
              >
                {lede}
              </Text>
            ) : null}
          </Container>
        </div>
      </Section>
    );
  }

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
      <section className="w-full">
        <div className="mx-auto w-full max-w-home px-page py-4">
          <div className="relative flex min-h-[26rem] w-full items-end overflow-hidden rounded-[1.625rem] bg-neutral-900 shadow-lg md:min-h-[32rem] xl:min-h-[54.25rem]">
            {resolvedVideoSrc ? (
              <video
                src={resolvedVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
                className="absolute inset-0 size-full object-cover object-center"
              />
            ) : helixSrc ? (
              <img
                src={helixSrc}
                alt={mediaAlt ?? ''}
                className="absolute inset-0 size-full object-cover object-center"
              />
            ) : null}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_46.5%,#000000_106.95%)]" />

            <div className="relative z-10 mx-auto mb-6 flex w-full max-w-[83.625rem] flex-col gap-4 px-6 text-white xl:mb-[1.875rem] xl:min-h-[7.65625rem] xl:flex-row xl:items-center xl:gap-[3.375rem] xl:px-0">
              {title ? (
                <h2 className="font-serif text-feature text-white xl:w-[21.75rem] xl:shrink-0">
                  {title}
                </h2>
              ) : null}
              {title && lede ? (
                <div
                  className="hidden h-[7.65625rem] w-0 shrink-0 border-l-[3px] border-white xl:block"
                  aria-hidden="true"
                />
              ) : null}
              {lede ? <p className="text-card-copy text-white xl:max-w-[55.125rem]">{lede}</p> : null}
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
      <div className="relative min-h-hero-min">
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
        {/* object-cover crops the baked wash below 1440. The scrim keeps the title readable. */}
        <div
          className="bg-hero-scrim pointer-events-none absolute inset-0 min-[90rem]:hidden"
          aria-hidden="true"
        />

        <Container
          className="relative z-10 flex min-h-full min-w-0 flex-col items-start"
          style={copyStyle}
        >
          {heading ? (
            <Heading
              id="hero-heading"
              level={1}
              size="hero"
              tone="inherit"
              className="min-w-0 max-w-full tracking-normal"
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
              className="min-w-0 font-medium tracking-normal"
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
