import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import Link from 'next/link';

export interface GeneralLinkData {
  label?: string | null;
  href?: string | null;
  target?: '_self' | '_blank' | string | null;
  isExternal?: boolean | null;
}

export interface BlogCtaCardProps {
  title?: string;
  description?: string;
  link?: GeneralLinkData | null;
  // Fallbacks for backward compatibility
  buttonText?: string;
  buttonUrl?: string;
}

/**
 * Blog Details Call-out Banner Card (Figma Group 2085665616)
 * - Size: ~1051px width, 286px height
 * - Background: linear-gradient(90.29deg, rgba(176, 200, 229, 0.24) 1.72%, rgba(203, 213, 225, 0) 99.76%)
 * - Radius: 30px
 * - Title: DM Serif Text, 40px, line-height 60px, color #00162D
 * - Description: Google Sans Flex, 24px, line-height 160% (38px), color #000000
 * - Button: General Link with gradient red-to-blue #D31E2D -> #2A91DC, 60px height, radius 8px, text 20px font-medium
 */
export const BlogCtaCard: React.FC<BlogCtaCardProps> = ({
  title = 'Learn more',
  description = 'Explore how maximum can support healthcare modernisation enhance patient experiances.',
  link,
  buttonText,
  buttonUrl,
}) => {
  const finalLabel = link?.label || buttonText || 'Discover Our Solutions';
  const finalHref = link?.href || buttonUrl || '/solutions';
  const finalTarget = link?.target || '_self';

  return (
    <aside
      aria-label={stripHtml(title)}
      className="box-border relative flex w-full max-w-[1051px] flex-col justify-between overflow-hidden rounded-[30px] p-6 sm:p-8 md:p-10 xl:min-h-[286px] xl:p-[40px_50px]"
      style={{
        background:
          'linear-gradient(90.29deg, rgba(176, 200, 229, 0.24) 1.72%, rgba(203, 213, 225, 0) 99.76%)',
      }}
    >
      <div className="flex flex-col gap-3 max-w-[900px]">
        {title && (
          <h3 className="font-serif font-normal text-[28px] sm:text-[34px] xl:text-[40px] leading-[1.2] xl:leading-[60px] tracking-[-1px] text-[#00162D]">
            {stripHtml(title)}
          </h3>
        )}
        {description && (
          <p className="font-sans font-normal text-[16px] sm:text-[20px] xl:text-[24px] leading-[1.5] xl:leading-[160%] text-[#000000]">
            {stripHtml(description)}
          </p>
        )}
      </div>

      {finalLabel && (
        <div className="mt-6 xl:mt-8">
          <Link
            href={finalHref}
            target={finalTarget}
            rel={finalTarget === '_blank' ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] text-white font-sans font-medium text-[18px] xl:text-[20px] leading-[30px] transition-all duration-300 hover:opacity-95 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] w-full sm:w-auto min-h-[60px]"
            style={{
              background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
            }}
          >
            <span>{finalLabel}</span>
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      )}
    </aside>
  );
};
