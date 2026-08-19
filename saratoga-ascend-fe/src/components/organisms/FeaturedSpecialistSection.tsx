import React from 'react';
import { GlobalImage, GeneralLink } from '../atoms';
import { CircleControl } from '../molecules/CircleControl';

export interface FeaturedSpecialistSectionProps {
  personSrc?: string;
  location?: string;
}

export const FeaturedSpecialistSection: React.FC<FeaturedSpecialistSectionProps> = ({
  personSrc = '/images/pharmacist.png',
  location = 'Chicago',
}) => {
  return (
    <section
      aria-labelledby="featured-specialist-heading"
      className="w-full bg-white px-[15px] py-[15px] min-[701px]:px-[25px] min-[701px]:py-[25px] min-[901px]:px-12 min-[901px]:py-10"
    >
      <div className="relative mx-auto h-[520px] w-full max-w-[1018px] overflow-hidden rounded-[22px] bg-[#033a59] min-[481px]:h-[500px] min-[701px]:h-[430px] min-[701px]:rounded-[28px] min-[901px]:h-[465px]">
        <button
          type="button"
          className="absolute top-5 left-5 flex h-9 w-[105px] cursor-pointer items-center justify-between rounded-[20px] border border-[#7d99a9] bg-transparent pr-3 pl-5 text-[14px] text-[#c7d7df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[701px]:top-7 min-[701px]:left-[30px] min-[701px]:w-32 min-[901px]:left-[62px]"
        >
          <span>{location}</span>

          <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
            <path
              d="M5.5 7.5L10 12l4.5-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="absolute top-4 right-[18px] z-10 flex gap-[7px] min-[701px]:top-[23px] min-[701px]:right-[30px] min-[901px]:right-[62px]">
          <CircleControl label="Previous" direction="prev" tone="dark" />
          <CircleControl label="Next" direction="next" tone="dark" />
        </div>

        <h2
          id="featured-specialist-heading"
          className="absolute top-[85px] left-1/2 z-1 m-0 w-full -translate-x-1/2 text-center font-serif text-[42px] leading-none font-bold tracking-[-2px] whitespace-nowrap text-white min-[481px]:top-[82px] min-[481px]:text-[52px] min-[701px]:top-[95px] min-[701px]:text-[65px] min-[701px]:tracking-[-3px] min-[901px]:top-[84px] min-[901px]:text-[clamp(65px,7vw,92px)]"
        >
          HEALTHCARE
        </h2>

        <div className="absolute bottom-[55px] left-1/2 z-3 h-[330px] w-[220px] -translate-x-1/2 min-[481px]:bottom-[35px] min-[481px]:h-[340px] min-[481px]:w-[250px] min-[701px]:bottom-0 min-[701px]:h-[390px] min-[701px]:w-[280px] min-[901px]:h-[420px] min-[901px]:w-[310px]">
          <GlobalImage
            src={personSrc}
            alt="Medical pharmacist"
            fill
            sizes="310px"
            className="object-contain! object-bottom"
            containerClassName="size-full"
          />
        </div>

        <div className="absolute top-[145px] right-[15px] z-5 flex flex-col text-[16px] leading-[1.15] tracking-[0.5px] text-[#ff2439] min-[481px]:top-[165px] min-[481px]:right-[22px] min-[481px]:text-[18px] min-[701px]:top-[185px] min-[701px]:right-auto min-[701px]:left-[calc(50%_+_170px)] min-[701px]:text-[21px] min-[901px]:top-[184px] min-[901px]:left-[calc(50%_+_205px)] min-[901px]:text-[25px]">
          <span>Medical</span>
          <span>Pharmacist</span>
        </div>

        <div className="absolute bottom-7 left-[22px] z-5 max-w-[150px] text-[11px] leading-[1.25] tracking-[0.25px] text-[#d1dde4] min-[481px]:max-w-none min-[701px]:bottom-[38px] min-[701px]:left-[30px] min-[701px]:text-[14px] min-[901px]:bottom-[50px] min-[901px]:left-[62px]">
          Lorem ipsum is the standard
          <br />
          placeholder text used in graphic
          <br />
          design, publishing, and web
        </div>

        <div className="absolute right-[18px] bottom-[18px] z-10 flex items-center gap-2 min-[481px]:bottom-5 min-[701px]:right-[30px] min-[701px]:bottom-7 min-[901px]:right-[62px] min-[901px]:bottom-9">
          <GeneralLink
            href="/careers"
            variant="unstyled"
            className="flex h-[26px] items-center justify-center rounded-[18px] border border-white/35 bg-[linear-gradient(90deg,#a71938_0%,#c4233c_48%,#087fae_100%)] px-[10px] text-[11px] text-white hover:brightness-110 min-[701px]:h-7 min-[701px]:px-[14px] min-[701px]:text-[14px]"
          >
            Explore Jobs
          </GeneralLink>

          <CircleControl label="Explore jobs" direction="next" tone="dark" />
        </div>
      </div>
    </section>
  );
};
