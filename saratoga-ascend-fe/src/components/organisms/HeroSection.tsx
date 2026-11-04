import React from 'react';
import { Container, Heading, Section, Text } from '../atoms';
import { CtaButton } from '../molecules/CtaButton';

const HERO_BG = '/images/hero-final-bg.png';

function normalizeImageSrc(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    return `${base.replace(/\/+$/, '')}${url}`;
  }
  return url;
}

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
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  mediaMime?: string;
  mediaExt?: string;
  variant?: 'homebanner' | 'homebanner_two_buttons' | 'default' | 'gradient' | 'blog';
  authorName?: string;
  date?: string;
  readTime?: string | number;
  socialLinks?: Array<{
    platform?: string | null;
    title?: string | null;
    url?: string | null;
    icon?: { url?: string | null } | null;
  }>;
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
  secondaryCtaLabel,
  secondaryCtaHref,
  mediaMime,
  mediaExt,
  variant = 'homebanner',
  authorName,
  date,
  readTime,
  socialLinks,
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
    /* Solutions / service hero (Figma 567:1855): ~853 tall, 120px gutters, dual CTAs */
    return (
      <section
        className="relative flex w-full flex-col justify-center px-page py-16 max-xl:min-h-[28rem] max-xl:pt-28 xl:min-h-[clamp(32rem,44.4vw,53.3125rem)] xl:py-[clamp(4rem,6.5vw,7.875rem)]"
        style={{
          background: helixSrc
            ? `linear-gradient(89.95deg, #eaf4fb 13.3%, rgba(234, 244, 251, 0) 128%), url(${helixSrc}) center right / cover no-repeat`
            : 'linear-gradient(89.95deg, #eaf4fb 13.3%, rgba(234, 244, 251, 0) 70%)',
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-col items-start gap-6 sm:gap-8 xl:gap-[30px]">
          {title ? (
            <Heading
              level={1}
              className="max-w-[min(100%,64.5rem)] font-serif text-[clamp(2.25rem,1.2rem+4vw,5.625rem)] font-normal leading-[1.15] text-ink"
            >
              {titleWithAccent(title, stripHtml(subTitle))}
            </Heading>
          ) : null}
          {(description || subTitle) && (
            <p className="max-w-[min(100%,48.7rem)] font-sans text-[clamp(1.05rem,0.95rem+0.5vw,1.5rem)] font-medium leading-[1.6] text-brand-navy">
              {stripHtml(description || subTitle || undefined)}
            </p>
          )}
          {(ctaLabel && ctaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 xl:gap-[30px]">
              {ctaLabel && ctaHref ? (
                <CtaButton href={ctaHref} className="self-start">
                  {ctaLabel}
                </CtaButton>
              ) : null}
              {secondaryCtaLabel && secondaryCtaHref ? (
                <CtaButton
                  href={secondaryCtaHref}
                  buttonVariant="outlineNavy"
                  className="self-start"
                >
                  {secondaryCtaLabel}
                </CtaButton>
              ) : null}
            </div>
          ) : null}
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

  if (variant === 'blog') {
    const formattedDate = date
      ? new Date(date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : null;
    const displayAuthor = authorName?.trim() || null;
    const displayReadTime = readTime
      ? `${typeof readTime === 'string' && readTime.toLowerCase().includes('read') ? readTime : `${readTime} min Read`}`
      : null;
    const hasMeta = Boolean(displayAuthor || formattedDate || displayReadTime);
    const shareFocusClass =
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy';

    return (
      <section className="relative flex w-full justify-center overflow-hidden bg-white px-page py-6 sm:py-8 xl:py-12">
        {/* Figma 563:1383 Frame 2147225834: 1680×654, radius 40, inset ~54. Stack meta under title through tablet. */}
        <div className="relative flex min-h-[20rem] w-full max-w-[1680px] flex-col justify-end overflow-hidden rounded-[24px] p-5 shadow-sm sm:min-h-[26rem] sm:rounded-[32px] sm:p-8 md:min-h-[34rem] md:p-10 xl:min-h-[654px] xl:rounded-[40px] xl:p-[54px]">
          {/* Background image & Fallback */}
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
          ) : (
            <img
              src={helixSrc || '/images/healthcare-team.png'}
              alt={mediaAlt || title || 'Blog Banner'}
              className="absolute inset-0 size-full object-cover object-center"
            />
          )}

          {/* Rectangle 40128: linear-gradient(180deg, rgba(203, 213, 225, 0) 50%, #CBD5E1 83.79%) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(203, 213, 225, 0) 35%, rgba(203, 213, 225, 0.7) 65%, #CBD5E1 90%)',
            }}
            aria-hidden="true"
          />

          {/* Bottom Content Area: Title on Left, Meta & Social Share on Right */}
          <div className="relative z-10 flex w-full flex-col justify-between gap-5 sm:gap-6 xl:flex-row xl:items-end xl:gap-8">
            {/* Left: How we support state and local agencies / Title */}
            <div className="max-w-[888px] flex-1">
              <h1 className="font-serif text-[28px] font-normal leading-[1.2] tracking-tight text-[#000000] sm:text-[36px] md:text-[44px] xl:text-[50px] xl:leading-[69px]">
                {title || 'How we support state and local agencies'}
              </h1>
            </div>

            {/* Divider (Figma: Rectangle 40129: width: 3px, height: 110px, background: #8C8C8C) */}
            <div
              className="mx-2 hidden h-[110px] w-[3px] shrink-0 bg-[#8C8C8C] xl:block"
              aria-hidden="true"
            />

            {/* Right: Author, Date, Read Time Pills & Share Icons */}
            <div className="flex max-w-full shrink-0 flex-col gap-4 sm:gap-5 xl:gap-6">
              {/* Meta Pills (Group 2085665607) — only CMS-backed fields */}
              {hasMeta ? (
                <div className="flex flex-wrap items-center gap-2 text-[#022E4C] sm:gap-3 xl:gap-4">
                  {displayAuthor ? (
                    <div className="flex h-10 items-center gap-2 rounded-[20px] bg-[#F2F6F9] px-3 py-2 sm:h-[44px] sm:px-4 sm:py-2.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#141B34"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span className="whitespace-nowrap font-serif text-[15px] leading-[22px] sm:text-[18px]">
                        {displayAuthor}
                      </span>
                    </div>
                  ) : null}

                  {formattedDate ? (
                    <div className="flex h-10 items-center gap-2 rounded-[20px] bg-[#F2F6F9] px-3 py-2 sm:h-[44px] sm:px-4 sm:py-2.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#141B34"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                        aria-hidden="true"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="whitespace-nowrap font-serif text-[15px] leading-[22px] sm:text-[18px]">
                        {formattedDate}
                      </span>
                    </div>
                  ) : null}

                  {displayReadTime ? (
                    <div className="flex h-10 items-center gap-2 rounded-[20px] bg-[#F2F6F9] px-3 py-2 sm:h-[44px] sm:px-4 sm:py-2.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#022E4C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="whitespace-nowrap font-serif text-[15px] leading-[22px] sm:text-[18px]">
                        {displayReadTime}
                      </span>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* Share Row (Frame 2147226424) */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex select-none items-center gap-2 font-serif text-[16px] leading-[22px] text-[#022E4C] sm:text-[18px]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1E1E1E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span>Share :</span>
                </div>

                {/* Social Share Icons */}
                <div className="flex items-center gap-2">
                  {socialLinks && socialLinks.length > 0 ? (
                    socialLinks.map((item, sIdx) => {
                      const platform = item.platform?.toLowerCase() || '';
                      const href = item.url || '#';
                      const iconUrl = item.icon?.url;

                      return (
                        <a
                          key={sIdx}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.title || item.platform || `Social link ${sIdx + 1}`}
                          className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white/70 shadow-sm transition-colors hover:bg-white sm:h-11 sm:w-11 ${shareFocusClass}`}
                        >
                          {iconUrl ? (
                            <img
                              src={normalizeImageSrc(iconUrl)}
                              alt={item.title || item.platform || 'social icon'}
                              className="w-5 h-5 object-contain"
                            />
                          ) : platform.includes('twitter') || platform.includes('x') ? (
                            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          ) : platform.includes('instagram') ? (
                            <svg
                              className="w-4 h-4 stroke-black fill-none"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                          ) : platform.includes('linkedin') ? (
                            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          ) : platform.includes('facebook') ? (
                            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                            </svg>
                          ) : (
                            <span className="font-sans text-xs font-semibold text-black">
                              {(item.platform || item.title || 'S').slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </a>
                      );
                    })
                  ) : (
                    <>
                      {/* Twitter / X */}
                      <a
                        href="https://twitter.com/intent/tweet"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on X (Twitter)"
                        className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/70 shadow-sm transition-colors hover:bg-white sm:h-11 sm:w-11 ${shareFocusClass}`}
                      >
                        <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Instagram"
                        className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/70 shadow-sm transition-colors hover:bg-white sm:h-11 sm:w-11 ${shareFocusClass}`}
                      >
                        <svg
                          className="w-4 h-4 stroke-black fill-none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/sharing/share-offsite"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                        className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/70 shadow-sm transition-colors hover:bg-white sm:h-11 sm:w-11 ${shareFocusClass}`}
                      >
                        <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      {/* Facebook */}
                      <a
                        href="https://facebook.com/sharer/sharer.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                        className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/70 shadow-sm transition-colors hover:bg-white sm:h-11 sm:w-11 ${shareFocusClass}`}
                      >
                        <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                        </svg>
                      </a>
                    </>
                  )}
                </div>
              </div>
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

          {(ctaLabel && ctaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
            <div
              style={ctaStyle}
              className="flex flex-wrap items-center gap-[30px]"
            >
              {ctaLabel && ctaHref ? (
                <CtaButton href={ctaHref} className="self-start">
                  {ctaLabel}
                </CtaButton>
              ) : null}

              {(variant === 'homebanner_two_buttons' || secondaryCtaLabel) && secondaryCtaHref && secondaryCtaLabel ? (
                <CtaButton
                  href={secondaryCtaHref}
                  buttonVariant="outlineNavy"
                  className="self-start"
                >
                  {secondaryCtaLabel}
                </CtaButton>
              ) : null}
            </div>
          ) : null}
        </Container>
      </div>
    </Section>
  );
};
