import React, { Suspense } from 'react';
import { Container, Heading, Section, Text } from '../atoms';
import { GeneralLink } from '../atoms/GeneralLink';
import { CtaButton } from '../molecules/CtaButton';
import { JobSearchHero } from './JobSearchHero';

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
  variant?:
    | 'homebanner'
    | 'homebanner_two_buttons'
    | 'default'
    | 'gradient'
    | 'blog'
    | 'banner_cta'
    | 'banner_job_search'
    | 'banner-job-search';
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
   * Page-specific composition. CMS still supplies the banner title, description,
   * image, and subtitle. The subtitle, when it appears inside the title, is the
   * red phrase. Homepage variants ignore this.
   * `contact` is Figma 2219:1455. `who-we-serve` is Figma 2:1015.
   */
  layout?: 'contact' | 'who-we-serve';
  /** CMS page title for the Who We Serve breadcrumb. */
  breadcrumbLabel?: string;
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

/** Figma 567:1862 while-hover → Variant2. Smart animate, ease-out, 300ms. */
const SERVICE_HERO_MOTION =
  'transition-[rotate,color,background-color,border-color,opacity] duration-300 ease-out motion-reduce:transition-none';

/**
 * Primary rests pointing right and rotates 45° up-right on hover.
 * The requirements button stays up-right in both states.
 */
function ServiceHeroArrow({ fixedUpRight = false }: { fixedUpRight?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={
        fixedUpRight
          ? 'relative z-10 size-6 origin-center -rotate-45'
          : `relative z-10 size-6 origin-center rotate-0 ${SERVICE_HERO_MOTION} group-hover/hero:-rotate-45 group-focus-visible/hero:-rotate-45 motion-reduce:group-hover/hero:rotate-0 motion-reduce:group-focus-visible/hero:rotate-0`
      }
    >
      <path
        d="M4.5 12H19.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M13.5 6L19.5 12L13.5 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Right-pointing arrow from Figma 1:721, turned up-right inside the 24px slot. */
function BannerCtaArrow() {
  return (
    <span className="inline-flex size-6 shrink-0 items-center justify-center" aria-hidden="true">
      <svg
        width="19.1257"
        height="16.2918"
        viewBox="0 0 19.1257 16.2918"
        fill="none"
        className="-rotate-45"
      >
        <path
          d="M18.0625 8.14596L1.0625 8.14596"
          stroke="currentColor"
          strokeWidth="2.12499"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.9799 15.2292C10.9799 15.2292 18.0632 10.0124 18.0632 8.14583C18.0632 6.27924 10.9799 1.06257 10.9799 1.06257"
          stroke="currentColor"
          strokeWidth="2.12499"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Service-page hero actions (Figma 567:1861). Local to this section so the
 * shared CTA used by other sections keeps its own hover.
 * Primary: the arrow turns from right to up-right. Secondary: the outline
 * fills with the gradient, and its arrow stays up-right in both states.
 */
function ServiceHeroButton({
  href,
  children,
  tone,
}: {
  href: string;
  children: React.ReactNode;
  tone: 'primary' | 'secondary';
}) {
  const arrow = <ServiceHeroArrow fixedUpRight={tone === 'secondary'} />;

  const box =
    'group/hero relative inline-flex h-auto min-h-12 w-full max-w-full items-center justify-center gap-3 rounded-button px-5 py-3 font-sans text-button font-medium shadow-button focus-visible:outline-brand-navy! sm:w-auto sm:px-6 xl:min-h-[3.75rem] xl:px-6';

  if (tone === 'primary') {
    return (
      <GeneralLink
        href={href}
        variant="unstyled"
        rightIcon={arrow}
        className={`${box} bg-cta-gradient text-white xl:py-[0.9375rem]`}
      >
        {children}
      </GeneralLink>
    );
  }

  return (
    <GeneralLink
      href={href}
      variant="unstyled"
      rightIcon={arrow}
      contentClassName="contents"
      className={`${box} border border-brand-navy bg-white text-brand-navy xl:py-[calc(0.9375rem-1px)] ${SERVICE_HERO_MOTION} hover:border-transparent hover:text-white focus-visible:border-transparent focus-visible:text-white`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px rounded-button bg-cta-gradient opacity-0 ${SERVICE_HERO_MOTION} group-hover/hero:opacity-100 group-focus-visible/hero:opacity-100`}
      />
      <span className="relative z-10">{children}</span>
    </GeneralLink>
  );
}

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
  breadcrumbLabel,
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

  if (layout === 'who-we-serve') {
    /*
      Figma JzRl5kAw1Yx0qUj9MTvjkm 2:1014–2:1020. Desktop photo band is 1920×699.
      Copy stays in flow so a longer CMS title can grow the band. Below xl the
      photo sits above the copy: the floating nav would otherwise cover the
      title, and the left wash does not cover a full-width line.
      get_motion_context returned no tracks for this node.
      The frame has no button, so CMS CTAs are not shown here.
    */
    const photoAlt = mediaAlt || '';
    const serveTitle = title ? normalizeBreaks(title).trim() : '';
    const accent = stripHtml(subTitle);

    return (
      <Section
        aria-labelledby={serveTitle ? 'who-we-serve-hero-heading' : undefined}
        aria-label={!serveTitle && breadcrumbLabel ? breadcrumbLabel : undefined}
        tone="surface"
        spacing="none"
        bleed
        className="bg-white"
      >
        {breadcrumbLabel ? (
          <Container className="pt-[calc(6rem+env(safe-area-inset-top,0px))] pb-4 xl:pt-4 xl:pb-6">
            <nav aria-label="Breadcrumb">
              <p className="font-sans text-sm font-medium leading-normal text-black">
                <GeneralLink
                  href="/"
                  variant="unstyled"
                  className="rounded-sm hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                >
                  Home
                </GeneralLink>
                <span aria-hidden="true"> / </span>
                <span aria-current="page">{breadcrumbLabel}</span>
              </p>
            </nav>
          </Container>
        ) : (
          <div className="pt-[calc(6rem+env(safe-area-inset-top,0px))] xl:hidden" aria-hidden="true" />
        )}

        <div className="relative mx-auto w-full max-w-home bg-[#eaf4fb] xl:flex xl:min-h-[clamp(28rem,36.40625vw,43.6875rem)] xl:items-start">
          <div className="relative h-[clamp(14rem,52vw,22rem)] overflow-hidden xl:absolute xl:inset-0 xl:h-auto">
            {resolvedVideoSrc ? (
              <video
                className="absolute inset-0 size-full object-cover object-right"
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
                className="absolute inset-0 size-full object-cover object-right"
                decoding="async"
                fetchPriority="high"
              />
            ) : null}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(234,244,251,0)_88%,#eaf4fb_100%)] xl:bg-[linear-gradient(90.01deg,#eaf4fb_29.688%,rgba(234,244,251,0)_128.33%)]"
              aria-hidden="true"
            />
          </div>

          <Container className="relative z-10 flex min-w-0 flex-col items-start py-8 sm:py-10 xl:py-[clamp(2.5rem,4.167vw,5rem)]">
            {serveTitle ? (
              <Heading
                id="who-we-serve-hero-heading"
                level={1}
                size="hero"
                tone="ink"
                className="max-w-[min(100%,64.5625rem)] min-w-0 font-normal tracking-normal break-words"
              >
                {titleWithAccent(title ?? '', accent)}
              </Heading>
            ) : null}
            {lede ? (
              <Text
                size="lead"
                tone="navy"
                className="mt-[clamp(1.25rem,2.005vw,2.40625rem)] max-w-[min(100%,48.6875rem)] min-w-0 font-medium tracking-normal break-words"
              >
                {lede}
              </Text>
            ) : null}
          </Container>
        </div>
      </Section>
    );
  }

  if (variant === 'banner_job_search' || variant === 'banner-job-search') {
    return (
      <Suspense fallback={null}>
        <JobSearchHero
          title={title || 'Find Your Next Opportunity'}
          description={
            stripHtml(description) ||
            'Explore open positions across healthcare, technology, science and operations.'
          }
          imageSrc={helixSrc}
          imageAlt={mediaAlt}
        />
      </Suspense>
    );
  }

  if (variant === 'banner_cta') {
    /* Group 2085665783: 1920x640px, Modern Healthcare Team Banner */
    const rawTitle = title || 'Build the workforce your mission requires.';
    const rawDesc = stripHtml(description) || 'Tell us about your staffing needs, program requirements, workforce gaps, or upcoming contract demands. Saratoga Ascend can help shape a practical, scalable workforce solution.';
    const primaryHref = ctaHref || '#';
    const primaryLabel = ctaLabel || 'Discuss Your Requirements';
    const secondaryHref = secondaryCtaHref || '#';
    const secondaryLabel = secondaryCtaLabel || 'Contact Saratoga Ascend';
    const bannerImgSrc = helixSrc || '/images/modern-healthcare-team-banner.png';

    // Highlight logic: if subTitle is provided, highlight that; otherwise highlight "mission requires."
    const highlightTarget = subTitle?.trim() || 'mission requires.';
    const renderCtaTitle = () => {
      const escaped = highlightTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const locked = rawTitle.match(new RegExp(`^(.*?)(${escaped})\\s*$`, 'i'));
      if (locked && locked[1].trim()) {
        return (
          <>
            <span className="block text-black">{locked[1].trim()}</span>
            <span className="block text-brand-red">{locked[2]}</span>
          </>
        );
      }

      const parts = rawTitle.split(new RegExp(`(${escaped})`, 'i'));
      if (parts.length > 1) {
        return parts.map((part, idx) =>
          part.toLowerCase() === highlightTarget.toLowerCase() ? (
            <span key={idx} className="text-brand-red">
              {part}
            </span>
          ) : (
            <span key={idx} className="text-black">
              {part}
            </span>
          ),
        );
      }
      return <span className="text-black">{rawTitle}</span>;
    };

    const buttonClass =
      'box-border inline-flex h-12 w-full items-center justify-center gap-3 rounded-button px-6 py-3 text-center font-sans text-button font-medium leading-[1.5] transition-[opacity,background-color,color] duration-300 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto xl:h-[clamp(3rem,3.125vw,3.75rem)]';

    return (
      <section
        aria-labelledby="workforce-cta-heading"
        className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#f4f8fc]"
      >
        {/*
          Figma 1:712 is 1920×640. From xl the band keeps that ratio so the
          portrait and the left wash stay in frame. Below xl the photo sits
          above the copy so the type is not painted on the faces.
        */}
        <div className="xl:relative xl:flex xl:min-h-[clamp(26.6875rem,33.333vw,40rem)] xl:items-center">
          {resolvedVideoSrc ? (
            <video
              className="h-52 w-full object-cover object-right sm:h-64 md:h-80 xl:absolute xl:inset-0 xl:h-full xl:object-center"
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
              src={bannerImgSrc}
              alt={mediaAlt || ''}
              className="h-52 w-full object-cover object-right sm:h-64 md:h-80 xl:absolute xl:inset-0 xl:h-full xl:object-center"
            />
          )}

          <div className="relative z-10 px-page py-10 sm:py-12 xl:w-full xl:py-[clamp(3rem,5.46875vw,6.5625rem)]">
            <div className="flex w-full max-w-[58.1875rem] flex-col">
              <h2
                id="workforce-cta-heading"
                className="font-serif text-[clamp(2.25rem,3.75vw,4.5rem)] font-normal leading-[1.15] tracking-tight text-black xl:leading-[1.375]"
              >
                {renderCtaTitle()}
              </h2>

              <p className="mt-4 max-w-[58.1875rem] font-sans text-[clamp(1.125rem,1.25vw,1.5rem)] font-normal leading-[1.5] text-black xl:mt-3 xl:leading-[1.6667]">
                {rawDesc}
              </p>

              <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center xl:mt-[clamp(1.5rem,2.083vw,2.5rem)] xl:gap-[clamp(1rem,1.5625vw,1.875rem)]">
                <GeneralLink
                  href={primaryHref}
                  variant="unstyled"
                  rightIcon={<BannerCtaArrow />}
                  className={`${buttonClass} bg-cta-gradient text-white hover:opacity-90 focus-visible:outline-white`}
                >
                  {primaryLabel}
                </GeneralLink>
                <GeneralLink
                  href={secondaryHref}
                  variant="unstyled"
                  rightIcon={<BannerCtaArrow />}
                  className={`${buttonClass} border border-brand-navy bg-white/80 text-brand-navy hover:bg-brand-navy hover:text-white focus-visible:outline-brand-navy`}
                >
                  {secondaryLabel}
                </GeneralLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'default') {
    /* Service hero (Figma 567:1855): 1920×853, 120px gutters, copy inset 126px. */
    const photo = helixSrc ? `url(${JSON.stringify(helixSrc)})` : 'none';

    return (
      <section
        aria-labelledby={title ? 'service-hero-heading' : undefined}
        aria-label={title ? undefined : 'Healthcare workforce solutions'}
        className="relative flex w-full flex-col overflow-hidden bg-[#eaf4fb] px-page pt-28 pb-12 max-xl:min-h-[28rem] sm:pb-16 md:pt-32 lg:pb-20 xl:min-h-[clamp(36rem,44.427vw,53.3125rem)] xl:py-[clamp(4.5rem,6.5625vw,7.875rem)]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-right"
          style={{
            backgroundImage: `linear-gradient(89.95deg, #eaf4fb 13.3%, rgba(234, 244, 251, 0) 128%), ${photo}`,
          }}
          role={mediaAlt ? 'img' : undefined}
          aria-label={mediaAlt || undefined}
          aria-hidden={mediaAlt ? undefined : true}
        />
        <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-[1680px] flex-col items-start gap-6 md:gap-8 xl:gap-10">
          {title ? (
            <Heading
              id="service-hero-heading"
              level={1}
              size="hero"
              tone="ink"
              className="max-w-[min(100%,64.5625rem)] font-normal tracking-normal"
            >
              {titleWithAccent(title, stripHtml(subTitle))}
            </Heading>
          ) : null}
          {lede || subTitle ? (
            <p className="max-w-[min(100%,48.6875rem)] min-w-0 font-sans text-body-lg font-medium text-brand-navy">
              {lede || stripHtml(subTitle)}
            </p>
          ) : null}
          {(ctaLabel && ctaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
            <div className="flex w-full min-w-0 flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center xl:gap-[30px]">
              {ctaLabel && ctaHref ? (
                <ServiceHeroButton href={ctaHref} tone="primary">
                  {ctaLabel}
                </ServiceHeroButton>
              ) : null}
              {secondaryCtaLabel && secondaryCtaHref ? (
                <ServiceHeroButton href={secondaryCtaHref} tone="secondary">
                  {secondaryCtaLabel}
                </ServiceHeroButton>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  if (variant === 'gradient') {
    /*
      Zoom 100–200%: fixed rem min-heights + overflow-hidden clipped stacked
      copy; fixed title width + missing min-w-0 caused horizontal overflow in
      the xl row at 125–150%. Media stays clipped to the radius; copy can grow.
    */
    return (
      <section className="w-full">
        <div className="mx-auto w-full max-w-home px-page pt-4 pb-6 sm:pb-8 xl:pb-10">
          <div className="relative isolate flex w-full flex-col justify-end rounded-[1.25rem] bg-neutral-900 shadow-lg sm:rounded-[1.625rem] min-h-[min(22rem,70dvh)] md:min-h-[min(28rem,72dvh)] xl:min-h-[min(54.25rem,78dvh)]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
              {resolvedVideoSrc ? (
                <video
                  src={resolvedVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 size-full object-cover object-center"
                />
              ) : helixSrc ? (
                <img
                  src={helixSrc}
                  alt=""
                  className="absolute inset-0 size-full object-cover object-center"
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_46.5%,#000000_106.95%)]" />
            </div>

            {/* Keep side + bottom inset at xl/100% — xl:px-0/pb-0 sat copy on the radius. */}
            <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-[83.625rem] flex-col gap-3 px-6 py-6 text-white sm:gap-4 sm:px-8 sm:py-8 md:px-10 md:py-10 xl:flex-row xl:items-stretch xl:gap-[clamp(1.25rem,3.375vw,3.375rem)] xl:px-[clamp(2.5rem,5.2vw,5.625rem)] xl:pt-[clamp(2rem,6vw,4rem)] xl:pb-[clamp(2rem,3.5vw,3.75rem)]">
              {title ? (
                <h2 className="min-w-0 break-words font-serif text-feature text-white xl:max-w-[21.75rem] xl:basis-[min(100%,21.75rem)] xl:shrink-0">
                  {title}
                </h2>
              ) : null}
              {title && lede ? (
                <div
                  className="hidden w-0 shrink-0 self-stretch border-l-[3px] border-white xl:block"
                  aria-hidden="true"
                />
              ) : null}
              {lede ? (
                <p className="min-w-0 break-words text-card-copy text-white xl:max-w-[55.125rem] xl:flex-1">
                  {lede}
                </p>
              ) : null}
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
