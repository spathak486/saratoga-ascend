'use client';

import React, { useState } from 'react';
import { MediaFrame } from '../atoms/MediaFrame';

export interface VehicleNavItem {
  id: string;
  label: string;
}

export interface VehicleNavListProps {
  items: readonly VehicleNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Left-rail vehicle list — active chip is 402×86, 20px corners, sky wash
 * (Figma node 13:405). Below xl it collapses to the 2105:724 select row.
 */
export const VehicleNavList: React.FC<VehicleNavListProps> = ({
  items,
  activeId,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  return (
  <ul className="flex w-full max-w-[25.125rem] flex-col max-xl:max-w-none">
    {items.map((item) => {
      const active = item.id === activeId;

      return (
        <li key={item.id} className={active || open ? undefined : 'max-xl:hidden'}>
          <button
            type="button"
            aria-current={active ? 'true' : undefined}
            aria-expanded={active ? open : undefined}
            className={`flex min-h-[5.375rem] w-full items-center justify-between gap-4 px-8 text-left text-body-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${
              active
                ? 'rounded-media border-2 border-brand-sky-bright bg-brand-sky-wash text-brand-navy-panel max-xl:min-h-0 max-xl:rounded-xl max-xl:border-0 max-xl:px-5 max-xl:py-3 max-xl:text-[1.375rem] max-xl:leading-8'
                : 'text-slate-body max-xl:min-h-0 max-xl:px-5 max-xl:py-3 max-xl:text-[1.125rem] max-xl:leading-8'
            }`}
            onClick={() => {
              if (active) {
                setOpen((value) => !value);
                return;
              }
              onSelect(item.id);
              setOpen(false);
            }}
          >
            <span>{item.label}</span>
            {active && (
              <span
                className={`relative h-[0.90625rem] w-[0.56375rem] shrink-0 max-xl:h-3 max-xl:w-3 max-xl:rotate-90 ${open ? 'max-xl:-rotate-90' : ''}`}
                aria-hidden="true"
              >
                <MediaFrame
                  src="/images/vehicles/nav-chevron.svg"
                  alt=""
                  pendingLabel=">"
                  unoptimized
                  sizes="12px"
                  imageClassName="object-contain!"
                  className="size-full border-0 bg-transparent"
                />
              </span>
            )}
          </button>
        </li>
      );
    })}
  </ul>
  );
};
