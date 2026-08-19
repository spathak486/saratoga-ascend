import React from 'react';
import { GlobalImage, GeneralLink } from '../atoms';
import { CircleControl } from '../molecules/CircleControl';
import { IconTextRow } from '../molecules/IconTextRow';

const LIST_ITEMS = ['Certificates', 'Information', 'Other'] as const;

const STAR_ICON = (
  <svg viewBox="0 0 32 32" className="size-[25px] shrink-0" aria-hidden="true">
    <path
      d="M16 1.8 L19.6 11.5 L29.8 11.9 L21.8 18.3 L24.6 28.2 L16 22.5 L7.4 28.2 L10.2 18.3 L2.2 11.9 L12.4 11.5 Z"
      fill="none"
      stroke="#8f969b"
      strokeWidth=".8"
      strokeLinejoin="round"
    />
  </svg>
);

export interface HealthcareIntroSectionProps {
  imageSrc?: string;
  logoSrc?: string;
}

export const HealthcareIntroSection: React.FC<HealthcareIntroSectionProps> = ({
  imageSrc = '/images/healthcare-image.jpg',
  logoSrc = '/images/butterfly-logo.png',
}) => {
  return (
    <section
      aria-labelledby="healthcare-intro-heading"
      className="flex min-h-[500px] w-full flex-col gap-[35px] px-5 pt-[25px] pb-10 min-[651px]:grid min-[651px]:grid-cols-[300px_1fr] min-[651px]:grid-rows-[auto_auto] min-[651px]:px-12 min-[651px]:pt-[38px] min-[651px]:pb-[55px] min-[901px]:grid-cols-[335px_1fr_218px] min-[901px]:grid-rows-[auto_1fr] min-[901px]:gap-x-[55px] min-[901px]:gap-y-[45px]"
    >
      <div className="relative aspect-[335/397] w-full shrink-0 overflow-hidden rounded-[26px] min-[651px]:col-start-1 min-[651px]:row-span-2 min-[651px]:row-start-1 min-[651px]:aspect-auto min-[651px]:h-[370px] min-[651px]:w-[300px] min-[901px]:h-[397px] min-[901px]:w-[335px]">
        <GlobalImage
          src={imageSrc}
          alt="Healthcare technology"
          fill
          sizes="(max-width: 650px) 100vw, 335px"
          containerClassName="size-full"
        />
      </div>

      <div className="min-[651px]:col-start-2 min-[651px]:row-start-1">
        <h1
          id="healthcare-intro-heading"
          className="mt-[5px] mb-2 font-serif text-[45px] leading-[0.95] font-normal text-[#f0182c] min-[651px]:text-[54px]"
        >
          Healthcare
        </h1>

        <p className="mb-[13px] max-w-[245px] text-[14px] leading-[1.15] tracking-[0.4px] text-[#123f63]">
          Supporting text that will be places
          <br />
          here for better understanding.
        </p>

        <GeneralLink
          href="/what-we-do"
          variant="unstyled"
          className="inline-flex h-6 min-w-[101px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#b2182c_0%,#d61931_48%,#008ed0_100%)] px-[15px] text-[13px] tracking-[0.2px] text-white"
        >
          Learn More
        </GeneralLink>

        <div className="mt-3 flex items-center gap-2">
          <CircleControl label="Previous" direction="prev" />
          <CircleControl label="Next" direction="next" />
        </div>
      </div>

      <ul className="flex flex-col gap-[15px] min-[651px]:col-start-2 min-[651px]:row-start-2 min-[651px]:self-end min-[651px]:pb-0.5">
        {LIST_ITEMS.map((label) => (
          <IconTextRow key={label} icon={STAR_ICON} label={label} />
        ))}
      </ul>

      <aside className="flex flex-col items-start gap-[35px] min-[651px]:col-span-2 min-[651px]:col-start-1 min-[651px]:row-start-3 min-[651px]:flex-row min-[651px]:items-center min-[901px]:col-span-1 min-[901px]:col-start-3 min-[901px]:row-span-2 min-[901px]:row-start-1 min-[901px]:flex-col min-[901px]:items-stretch min-[901px]:gap-0">
        <div className="flex size-[218px] shrink-0 items-center justify-center overflow-hidden rounded-[25px] bg-[#f1f1f1]">
          <div className="relative size-[78%]">
            <GlobalImage
              src={logoSrc}
              alt="Butterfly logo"
              fill
              sizes="170px"
              className="object-contain!"
              containerClassName="size-full"
            />
          </div>
        </div>

        <div className="flex max-w-[300px] flex-col gap-4 pl-[5px] text-[14px] leading-[1.13] tracking-[0.35px] text-[#123f63] min-[901px]:mt-[53px] min-[901px]:max-w-none">
          <p>
            Lorem ipsum is the standard
            <br />
            placeholder text used in graphic
            <br />
            design, publishing, and web
          </p>

          <p>
            development to showcase
            <br />
            layouts and visual elements
            <br />
            without the distraction of
            <br />
            meaningful content.
          </p>
        </div>
      </aside>
    </section>
  );
};
