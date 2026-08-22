import React from 'react';
import Image from 'next/image';
import { Heading, Text } from '../atoms';

export interface StaffingSlideCardProps {
  title?: React.ReactNode;
  body?: string;
  href?: string;
}

const DEFAULT_TITLE = (
  <>
    Travel
    <br />
    Staffing
  </>
);

const DEFAULT_BODY =
  'Connecting cleared, credentialed healthcare professionals with government, military.';

/**
 * White staffing carousel tile — flex content stack; decorations stay absolute.
 */
export const StaffingSlideCard: React.FC<StaffingSlideCardProps> = ({
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  href = '/careers',
}) => (
  <article className="relative flex h-[clamp(22rem,23.44vw,28.125rem)] w-full flex-col overflow-hidden rounded-panel border border-brand-line bg-staffing-card p-[clamp(1.25rem,2.5vw,3rem)]">
    {/* Bottom ellipse wash */}
    <div
      className="pointer-events-none absolute -left-[6.2rem] top-[55%] h-[55%] w-[88%] max-w-[22rem]"
      aria-hidden="true"
    >
      <Image
        src="/images/phase5/phase5-ellipse-bottom.svg"
        alt=""
        fill
        className="object-contain object-top"
      />
    </div>

    {/* Top ellipse wash */}
    <div
      className="pointer-events-none absolute -top-[30%] left-[35%] h-[60%] w-[62%] max-w-[15.3125rem] rotate-180"
      aria-hidden="true"
    >
      <Image
        src="/images/phase5/phase5-ellipse-top.svg"
        alt=""
        fill
        className="object-contain object-top"
      />
    </div>

    {/* Heart watermark */}
    <div
      className="pointer-events-none absolute right-[8%] bottom-[12%] h-[34%] w-[36%] max-w-[8.86rem] opacity-[0.38]"
      aria-hidden="true"
    >
      <Image
        src="/images/phase5/phase5-heart.png"
        alt=""
        fill
        className="object-cover"
      />
    </div>

    {/* Title row */}
    <div className="relative z-[1] flex items-start justify-between gap-3">
      <Heading
        level={3}
        tone="ink"
        font="serif"
        className="text-[clamp(1.75rem,2.29vw,2.75rem)] leading-[1.2] text-black"
      >
        {title}
      </Heading>

      <a
        href={href}
        aria-label="Open travel staffing"
        className="flex size-[clamp(2.75rem,3.75vw,3.75rem)] shrink-0 items-center justify-center"
      >
        <span className="flex size-full -scale-y-100 rotate-180">
          <Image
            src="/images/phase5/phase5-card-arrow.svg"
            alt=""
            width={60}
            height={60}
            aria-hidden
            className="size-full"
          />
        </span>
      </a>
    </div>

    {/* Body — centred in remaining card height */}
    <Text
      size="body"
      tone="ink"
      className="relative z-[1] mt-auto mb-auto max-w-[22ch] py-[clamp(0.75rem,2vw,1.5rem)] font-medium"
    >
      {body}
    </Text>
  </article>
);
