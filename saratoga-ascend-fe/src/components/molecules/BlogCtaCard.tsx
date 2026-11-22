'use client';

import React from 'react';
import Link from 'next/link';
import { cleanHeadingHtml } from '@/lib/utils/text';

export interface GeneralLinkData {
  label?: string | null;
  href?: string | null;
  target?: '_self' | '_blank' | string | null;
  isExternal?: boolean | null;
}

export type BlogCtaVariant = 'default' | 'left' | 'banner';

export interface BlogCtaCardProps {
  variant?: BlogCtaVariant;
  title?: string | null;
  description?: string | null;
  link?: GeneralLinkData | null;
  buttonText?: string | null;
  buttonUrl?: string | null;
  className?: string;
}

/**
 * Reusable CTA Card with 2 Variants:
 *
 * 1) 'default' / 'banner' (Pehle wala variant - Figma Group 2085665616):
 *    - Full width call-out banner used inside article/blog content body
 *    - Dimensions: max-w-[1051px], min-h-[286px]
 *    - Background: linear-gradient(90.29deg, rgba(176, 200, 229, 0.24) 1.72%, rgba(203, 213, 225, 0) 99.76%)
 *    - Title: DM Serif Text, 40px, line-height 60px, color #00162D
 *    - Description: Google Sans Flex, 24px, line-height 160% (38px), color #000000
 *    - Button: gradient red-to-blue #D31E2D -> #2A91DC, 60px height, radius 8px, text 20px
 *
 * 2) 'left' (Figma Frame 2147226423 / Group 2085665614):
 *    - Left sticky sidebar CTA card
 *    - Dimensions: max-w-[482px], min-h-[260px]
 *    - Background: White with border-radius: 30px & subtle border
 *    - Title: DM Serif Text, 28px, line-height 34px (120%), color #000000
 *    - Description: Google Sans Flex, 20px, line-height 32px (160%), font-weight 500, color #000000
 *    - Button: 220px x 60px, rounded 8px, gradient #D31E2D -> #2A91DC, text 20px font-medium
 *    - Decorative background: Multi-stop gradient swoosh vectors with 0.1 opacity
 */
export const BlogCtaCard: React.FC<BlogCtaCardProps> = ({
  variant = 'default',
  title,
  description,
  link,
  buttonText,
  buttonUrl,
  className = '',
}) => {
  // -------------------------------------------------------------
  // VARIANT 2: 'left' (Sidebar CTA Card)
  // -------------------------------------------------------------
  if (variant === 'left') {
    const finalTitle =
      title !== undefined && title !== null
        ? title
        : 'Partnering with Maximus can help you stay one step ahead';
    const finalDescription =
      description !== undefined && description !== null
        ? description
        : 'Let us help you get there.';
    const finalLabel = link?.label || buttonText || 'Get in touch';
    const finalHref = link?.href || buttonUrl || '/contact';
    const finalTarget = link?.target || '_self';

    if (!finalTitle && !finalDescription && !finalLabel) {
      return null;
    }

    return (
      <aside
        aria-label="Partner CTA"
        className={`relative box-border flex w-full max-w-[482px] min-h-[260px] flex-col justify-between overflow-hidden rounded-[30px] border border-black/10 bg-white p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.06)] sm:p-7 xl:p-[29.5px_30px] ${className}`.trim()}
      >
        {/* Figma Decorative Vector Graphic Background (Opacity 0.1) */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]"
          aria-hidden="true"
        >
          <svg
            className="absolute -right-10 -bottom-10 h-[220px] w-[260px] opacity-10"
            viewBox="0 0 260 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cta-left-cyan-blue" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#26E0F5" />
                <stop offset="53%" stopColor="#2B88D9" />
                <stop offset="100%" stopColor="#0F3D60" />
              </linearGradient>
              <linearGradient id="cta-left-blue-cyan" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#2B88D9" />
                <stop offset="100%" stopColor="#26E0F5" />
              </linearGradient>
              <linearGradient id="cta-left-red-sweep" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#CE1424" />
                <stop offset="46%" stopColor="#CE1525" />
                <stop offset="62%" stopColor="#D11C2A" />
                <stop offset="74%" stopColor="#D62834" />
                <stop offset="83%" stopColor="#DD3942" />
                <stop offset="91%" stopColor="#E64F53" />
                <stop offset="98%" stopColor="#F06767" />
              </linearGradient>
              <linearGradient id="cta-left-red-accent" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#D70024" />
                <stop offset="17%" stopColor="#D90B2B" />
                <stop offset="49%" stopColor="#E12A3F" />
                <stop offset="90%" stopColor="#ED5D60" />
                <stop offset="98%" stopColor="#F06767" />
              </linearGradient>
            </defs>

            <path
              d="M90 60C140 10 200 40 240 110C260 150 250 190 210 210C170 230 110 200 80 150C60 110 70 80 90 60Z"
              fill="url(#cta-left-cyan-blue)"
            />
            <path
              d="M120 80C160 40 210 60 230 120C240 150 220 180 190 195C160 210 120 180 100 145C85 115 95 95 120 80Z"
              fill="url(#cta-left-blue-cyan)"
            />
            <path
              d="M30 40C70 -10 130 10 160 70C180 110 160 150 120 170C80 190 30 160 10 110C-10 70 5 50 30 40Z"
              fill="url(#cta-left-red-sweep)"
            />
            <path
              d="M50 60C85 20 130 40 150 90C165 120 145 150 115 165C85 180 50 150 35 115C25 85 35 70 50 60Z"
              fill="url(#cta-left-red-accent)"
            />
          </svg>
        </div>

        {/* Card Content */}
        <div className="relative z-10 flex flex-col">
          {finalTitle ? (
            <h3
              className="ck-content font-serif text-[24px] font-normal leading-[1.2] text-[#000000] sm:text-[26px] xl:text-[28px] xl:leading-[34px] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit"
              style={{ fontFamily: "'DM Serif Text', serif" }}
              dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(finalTitle) }}
            />
          ) : null}

          {finalDescription ? (
            <div
              className="ck-content mt-3.5 font-sans text-[18px] font-medium leading-[1.6] text-[#000000] xl:mt-4 xl:text-[20px] xl:leading-[32px] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(finalDescription) }}
            />
          ) : null}
        </div>

        {/* Button Base */}
        {finalLabel ? (
          <div className="relative z-10 mt-6 xl:mt-[20px]">
            <Link
              href={finalHref}
              target={finalTarget}
              rel={finalTarget === '_blank' ? 'noopener noreferrer' : undefined}
              className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[8px] px-6 py-4 font-sans text-[18px] font-medium leading-[1.5] text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition-all duration-300 hover:opacity-95 hover:shadow-[0px_4px_12px_rgba(42,145,220,0.25)] sm:min-h-[60px] sm:w-[220px] xl:text-[20px] xl:leading-[30px]"
              style={{
                background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
                fontFamily: "'Google Sans Flex', sans-serif",
              }}
            >
              <span className="truncate">{finalLabel}</span>
              <span className="inline-flex size-6 shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg
                  className="size-5 transition-transform duration-300 group-hover:rotate-[-45deg]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        ) : null}
      </aside>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 1: 'default' / 'banner' (Original In-Body CTA Banner)
  // -------------------------------------------------------------
  const finalTitle =
    title !== undefined && title !== null ? title : 'Learn more';
  const finalDescription =
    description !== undefined && description !== null
      ? description
      : 'Explore how maximum can support healthcare modernisation enhance patient experiances.';
  const finalLabel = link?.label || buttonText || 'Learn More';
  const finalHref = link?.href || buttonUrl || '/solutions';
  const finalTarget = link?.target || '_self';

  if (!finalTitle && !finalDescription && !finalLabel) {
    return null;
  }

  return (
    <aside
      aria-label={finalTitle}
      className={`box-border relative flex w-full max-w-[1051px] flex-col justify-between overflow-hidden rounded-[30px] p-6 sm:p-8 md:p-10 xl:min-h-[286px] xl:p-[40px_50px] ${className}`.trim()}
      style={{
        background:
          'linear-gradient(90.29deg, rgba(176, 200, 229, 0.24) 1.72%, rgba(203, 213, 225, 0) 99.76%)',
      }}
    >
      <div className="flex flex-col gap-3 max-w-[900px]">
        {finalTitle ? (
          <h3
            className="ck-content font-serif font-normal text-[28px] sm:text-[34px] xl:text-[40px] leading-[1.2] xl:leading-[60px] tracking-[-1px] text-[#00162D] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit"
            style={{ fontFamily: "'DM Serif Text', serif" }}
            dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(finalTitle) }}
          />
        ) : null}
        {finalDescription ? (
          <div
            className="ck-content font-sans font-normal text-[16px] sm:text-[20px] xl:text-[24px] leading-[1.5] xl:leading-[160%] text-[#000000] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit"
            style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(finalDescription) }}
          />
        ) : null}
      </div>

      {finalLabel ? (
        <div className="mt-6 xl:mt-8">
          <Link
            href={finalHref}
            target={finalTarget}
            rel={finalTarget === '_blank' ? 'noopener noreferrer' : undefined}
            className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] text-white font-sans font-medium text-[18px] xl:text-[20px] leading-[30px] transition-all duration-300 hover:opacity-95 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] w-full sm:w-auto min-h-[60px]"
            style={{
              background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
              fontFamily: "'Google Sans Flex', sans-serif",
            }}
          >
            <span>{finalLabel}</span>
            <span className="inline-flex size-6 shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <svg
                className="size-5 transition-transform duration-300 group-hover:rotate-[-45deg]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      ) : null}
    </aside>
  );
};

export default BlogCtaCard;
