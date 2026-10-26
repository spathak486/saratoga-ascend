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
  mediaMime?: string;
  mediaExt?: string;
  variant?: 'homebanner' | 'default' | 'gradient' | 'blog';
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

  if (variant === 'blog') {
    const formattedDate = date
      ? new Date(date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'December 6, 2025';
    const displayAuthor = authorName || 'Jenny Wilson';
    const displayReadTime = readTime
      ? `${typeof readTime === 'string' && readTime.toLowerCase().includes('read') ? readTime : `${readTime} min Read`}`
      : '10 min Read';

    return (
      <section className="relative w-full overflow-hidden bg-[#CBD5E1]/20 py-8 md:py-12 px-4 sm:px-8 xl:px-[120px] flex justify-center">
        {/* Frame 2147225834: 1680px max width card with 40px rounded corners */}
        <div className="relative w-full max-w-[1680px] min-h-[500px] md:min-h-[600px] xl:min-h-[654px] rounded-[30px] sm:rounded-[40px] overflow-hidden flex flex-col justify-end p-6 sm:p-10 md:p-12 xl:p-[54px] shadow-sm">
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
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 w-full">
            {/* Left: How we support state and local agencies / Title */}
            <div className="max-w-[888px] flex-1">
              <h1 className="font-serif font-normal text-[32px] sm:text-[40px] md:text-[48px] xl:text-[50px] leading-[1.2] xl:leading-[69px] text-[#000000] tracking-tight">
                {title || 'How we support state and local agencies'}
              </h1>
            </div>

            {/* Divider (Figma: Rectangle 40129: width: 3px, height: 110px, background: #8C8C8C) */}
            <div
              className="hidden xl:block w-[3px] h-[110px] bg-[#8C8C8C] shrink-0 mx-2"
              aria-hidden="true"
            />

            {/* Right: Author, Date, Read Time Pills & Share Icons */}
            <div className="flex flex-col gap-5 sm:gap-6 shrink-0 max-w-full">
              {/* Meta Pills (Group 2085665607) */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#022E4C]">
                {/* Author Pill */}
                <div className="flex items-center gap-2 bg-[#F2F6F9] px-4 py-2.5 rounded-[20px] h-[44px]">
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
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="font-serif text-[16px] sm:text-[18px] leading-[22px] whitespace-nowrap">
                    {displayAuthor}
                  </span>
                </div>

                {/* Date Pill */}
                <div className="flex items-center gap-2 bg-[#F2F6F9] px-4 py-2.5 rounded-[20px] h-[44px]">
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
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="font-serif text-[16px] sm:text-[18px] leading-[22px] whitespace-nowrap">
                    {formattedDate}
                  </span>
                </div>

                {/* Read Time Pill */}
                <div className="flex items-center gap-2 bg-[#F2F6F9] px-4 py-2.5 rounded-[20px] h-[44px]">
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
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-serif text-[16px] sm:text-[18px] leading-[22px] whitespace-nowrap">
                    {displayReadTime}
                  </span>
                </div>
              </div>

              {/* Share Row (Frame 2147226424) */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 font-serif text-[18px] leading-[22px] text-[#022E4C] select-none">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1E1E1E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 bg-white/70 hover:bg-white flex items-center justify-center transition-colors shadow-sm overflow-hidden"
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
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 bg-white/70 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
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
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 bg-white/70 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
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
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 bg-white/70 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
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
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-300 bg-white/70 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
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
