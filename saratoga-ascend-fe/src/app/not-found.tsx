import type { Metadata } from 'next';
import Image from 'next/image';
import { GeneralLink } from '@/components/atoms';
import { getNotFoundData } from '@/lib/services';
import type { NotFoundData } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'Oops! Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, nofollow',
};

/** Rendered whenever the CMS is unreachable or the 404 patch is unpublished. */
const FALLBACK: NotFoundData = {
  title: 'Oops! Page not found',
  description:
    "The page you're looking for has moved, been removed, or never existed. Let's get you back on mission.",
  primaryCta: { label: 'Get in Touch', href: '/contact', target: '_self', isExternal: false },
  secondaryCta: { label: 'Go Home', href: '/', target: '_self', isExternal: false },
  graphic: {
    url: '/images/404-graphics.jpg',
    width: 1920,
    height: 776,
    alternativeText: '404 — Page not found',
  },
};

export default async function NotFound() {
  const result = await getNotFoundData();
  const data = result.data ?? FALLBACK;

  const title = data.title || FALLBACK.title;
  const description = data.description || FALLBACK.description;
  const primaryCta = data.primaryCta ?? FALLBACK.primaryCta;
  const secondaryCta = data.secondaryCta ?? FALLBACK.secondaryCta;
  const graphicUrl = data.graphic?.url ?? FALLBACK.graphic?.url ?? '/images/404-graphics.jpg';

  return (
    <main id="main" className="flex min-h-screen flex-col bg-brand-surface">
      {/* Figma "404 Graphics 1" — 1920x776 at left 0, top 277. The site header
          (utility + nav) already occupies the top of the viewport, so the margin
          subtracts it from the artboard's 277px to land the image top exactly
          there at every breakpoint. The box keeps the artboard's exact 1920:776
          ratio at every width, so the artwork scales proportionally (input will
          match the Figma export 1:1 when the source asset is a 1920x776 PNG). */}
      <div
        className="relative aspect-[1920/776] w-full overflow-hidden"
        style={{
          marginTop: 'calc(17.3125rem - var(--spacing-utility-h) - var(--spacing-nav-h))',
        }}
      >
        <Image
          src={graphicUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Headline, support line, and CTAs, centred below the graphic. */}
      <div className="mx-auto flex w-full max-w-home flex-col items-center px-page py-section text-center">
        <h1 className="font-serif text-404-title text-ink">{title}</h1>

        <p className="mt-4 max-w-[42rem] text-404-sub text-ink">{description}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {primaryCta && (
            <GeneralLink
              href={primaryCta.href}
              variant="unstyled"
              external={primaryCta.isExternal ?? undefined}
              id="not-found-contact-cta"
              className="bg-not-found-primary inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
            >
              {primaryCta.label}
            </GeneralLink>
          )}
          {secondaryCta && (
            <GeneralLink
              href={secondaryCta.href}
              variant="unstyled"
              external={secondaryCta.isExternal ?? undefined}
              id="not-found-home-cta"
              className="bg-not-found-secondary inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
            >
              {secondaryCta.label}
            </GeneralLink>
          )}
        </div>
      </div>
    </main>
  );
}