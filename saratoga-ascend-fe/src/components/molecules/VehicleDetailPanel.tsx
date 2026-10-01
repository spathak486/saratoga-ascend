import React from 'react';
import { GeneralLink, Heading } from '../atoms';
import { MediaFrame } from '../atoms/MediaFrame';

export interface VehicleDetail {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}

export interface VehicleDetailPanelProps {
  detail: VehicleDetail;
  /** Federal keeps the navy card. State swaps the card behind the same title. */
  scope?: 'federal' | 'state';
}

/**
 * Right pane of Contract Vehicles — 1077×280 navy banner, 20px body, two
 * 60px pills (Figma node 13:414).
 */
export const VehicleDetailPanel: React.FC<VehicleDetailPanelProps> = ({
  detail,
  scope = 'federal',
}) => (
  <div className="flex min-w-0 flex-col">
    <div
      className={`relative min-h-[clamp(12rem,14.58vw,17.5rem)] overflow-hidden transition-[border-radius] duration-200 ease-out motion-reduce:transition-none max-xl:min-h-[12.875rem] ${
        scope === 'state' ? 'rounded-button max-xl:rounded-xl!' : 'rounded-panel max-xl:rounded-xl!'
      }`}
    >
      <div
        className={`absolute inset-0 bg-gsa-banner transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          scope === 'state' ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 bg-cta-gradient transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          scope === 'state' ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <MediaFrame
          src="/images/vehicles/gsa-mask.svg"
          alt=""
          pendingLabel="banner"
          unoptimized
          sizes="1077px"
          imageClassName="object-cover!"
          className="size-full border-0 bg-transparent"
        />
      </div>
      <Heading
        level={3}
        size="subtitle"
        tone="onDark"
        className="relative z-[1] max-w-[12.5em] px-[clamp(1.5rem,3.125vw,3.75rem)] py-[clamp(1.75rem,3.18vw,3.8125rem)] max-xl:mt-0 max-xl:max-w-[12.425rem] max-xl:px-[1.375rem] max-xl:pt-[4.368rem] max-xl:pb-8 max-xl:text-[1.25rem]! max-xl:leading-[1.875rem]!"
      >
        {detail.title}
      </Heading>
    </div>

    <p className="mt-10 max-w-[61.3125rem] text-button font-medium leading-[1.5] text-slate-copy max-xl:mt-5 max-xl:text-base max-xl:leading-5 max-xl:font-normal max-xl:text-[#475569]">
      {detail.body}
    </p>

    <div className="mt-10 flex flex-wrap gap-4 max-xl:mt-5 max-xl:flex-nowrap max-xl:gap-5">
      <GeneralLink
        href={detail.primary.href}
        variant="button"
        buttonVariant="solidNavy"
        size="ctaPill"
        className="bg-brand-navy-panel px-[2.125rem] font-bold max-xl:h-auto max-xl:min-h-0 max-xl:min-w-0 max-xl:flex-1 max-xl:px-[0.75rem] max-xl:py-3 max-xl:text-sm max-xl:leading-[1.125rem]"
      >
        {detail.primary.label}
      </GeneralLink>
      <GeneralLink
        href={detail.secondary.href}
        variant="button"
        buttonVariant="outlineNavy"
        size="ctaPill"
        className="border-brand-navy-panel px-[2.125rem] font-bold text-brand-navy-band max-xl:h-auto max-xl:min-h-0 max-xl:min-w-0 max-xl:flex-1 max-xl:px-[0.75rem] max-xl:py-3 max-xl:text-sm max-xl:leading-[1.125rem]"
      >
        {detail.secondary.label}
      </GeneralLink>
    </div>
  </div>
);
