import React from 'react';
import { Container, MediaFrame } from '../atoms';
import { AboutHighlightList } from '../molecules/AboutHighlightList';

export interface MissionSectionProps {
  imageSrc?: string;
}

const LEAD =
  'Founded to serve federal and military healthcare, we grew into a nationwide partner for hospitals, clinics, and public health programs. We combine';

const BODY =
  'Founded to serve federal and military healthcare, we grew into a nationwide partner for hospitals, clinics, and public health programs. We combine military‑grade precision with responsive, people‑first service-matching licensed, background‑checked, and fully credentialed professionals to serve every mission.';

const HIGHLIGHTS = [
  'Nationwide coverage across all 50 states',
  'Cleared personnel for government & military facilities',
  'Dedicated compliance & credentialing teams',
  '24/7 support for clients and providers',
] as const;

function HandsBackdrop({ src }: { src?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 h-[98.39%]">
        <MediaFrame
          src={src}
          alt=""
          pendingLabel="about us.png"
          tone="tile"
          sizes="100vw"
          imageClassName="object-cover object-center!"
          className="size-full border-0 bg-brand-surface"
        />
      </div>
    </div>
  );
}

/**
 * About Us band (Figma node 1:607). Locked 1920×1303 stage: reaching-hands
 * plate, 72px red title at the left gutter, 28px bold subhead, navy lead,
 * and the 22px body + red checklist on the lower right.
 */
export const MissionSection: React.FC<MissionSectionProps> = ({
  imageSrc = '/images/about%20us.png',
}) => (
  <section
    aria-labelledby="about-us-heading"
    className="relative isolate overflow-hidden bg-brand-surface"
  >
    <h2 id="about-us-heading" className="sr-only">
      About Us
    </h2>

    <div className="relative hidden aspect-[1920/1303] w-full xl:block">
      <HandsBackdrop src={imageSrc} />

      <p
        aria-hidden="true"
        className="absolute top-[9.21%] left-[6.25%] font-serif text-section whitespace-nowrap text-brand-red"
      >
        About Us
      </p>

      <p className="absolute top-[19.49%] left-[6.25%] w-[25.78%] font-bold leading-[1.4] text-[clamp(1.125rem,0.974rem+0.647vw,1.75rem)] text-ink">
        Four Decades of Military & Federal Solutions Expertise
      </p>

      <p className="absolute top-[27.32%] left-[6.25%] w-[35.57%] text-body-lg font-medium text-[#0f3d60]">
        {LEAD}
      </p>

      <div className="absolute top-[57.87%] left-[55.83%] w-[37.92%]">
        <p className="text-body text-ink">{BODY}</p>
        <AboutHighlightList items={HIGHLIGHTS} className="mt-[1.375em]" />
      </div>
    </div>

    <div className="relative xl:hidden">
      <HandsBackdrop src={imageSrc} />

      <Container className="relative py-section">
        <p
          aria-hidden="true"
          className="font-serif text-section text-brand-red"
        >
          About Us
        </p>
        <p className="mt-6 max-w-[32ch] font-bold leading-[1.4] text-[clamp(1.125rem,0.974rem+0.647vw,1.75rem)] text-ink">
          Four Decades of Military & Federal Solutions Expertise
        </p>
        <p className="mt-6 max-w-[42ch] text-body-lg font-medium text-[#0f3d60]">
          {LEAD}
        </p>
        <p className="mt-10 text-body text-ink">{BODY}</p>
        <AboutHighlightList items={HIGHLIGHTS} className="mt-6" />
      </Container>
    </div>
  </section>
);
