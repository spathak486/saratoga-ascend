import React from 'react';
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
 * (Figma node 13:405).
 */
export const VehicleNavList: React.FC<VehicleNavListProps> = ({
  items,
  activeId,
  onSelect,
}) => (
  <ul className="flex w-full max-w-[25.125rem] flex-col">
    {items.map((item) => {
      const active = item.id === activeId;

      return (
        <li key={item.id}>
          <button
            type="button"
            aria-current={active ? 'true' : undefined}
            className={`flex min-h-[5.375rem] w-full items-center justify-between gap-4 px-8 text-left text-body-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${
              active
                ? 'rounded-media border-2 border-brand-sky-bright bg-brand-sky-wash text-brand-navy-panel'
                : 'text-slate-body'
            }`}
            onClick={() => onSelect(item.id)}
          >
            <span>{item.label}</span>
            {active && (
              <span className="relative h-[0.90625rem] w-[0.56375rem] shrink-0" aria-hidden="true">
                <MediaFrame
                  src="/images/vehicles/nav-chevron.svg"
                  alt=""
                  pendingLabel=">"
                  unoptimized
                  sizes="9px"
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
