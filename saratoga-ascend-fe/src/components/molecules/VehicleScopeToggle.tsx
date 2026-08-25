import React from 'react';

export type VehicleScope = 'federal' | 'state';

export interface VehicleScopeToggleProps {
  value: VehicleScope;
  onChange: (value: VehicleScope) => void;
}

/**
 * Federal / State pill from Figma node 13:400 — 402×56 track, 200×48 thumb.
 */
export const VehicleScopeToggle: React.FC<VehicleScopeToggleProps> = ({
  value,
  onChange,
}) => (
  <div
    role="tablist"
    aria-label="Contract scope"
    className="relative flex h-14 w-full max-w-[25.125rem] rounded-pill border border-slate-line bg-brand-surface-sunk p-1"
  >
    <span
      aria-hidden="true"
      className={`bg-vehicle-toggle pointer-events-none absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-pill transition-[left] duration-200 ease-out ${
        value === 'federal' ? 'left-1' : 'left-[calc(50%+0.125rem)]'
      }`}
    />
    {(
      [
        { id: 'federal', label: 'Federal' },
        { id: 'state', label: 'State' },
      ] as const
    ).map((option) => {
      const selected = value === option.id;

      return (
        <button
          key={option.id}
          type="button"
          role="tab"
          aria-selected={selected}
          className={`relative z-[1] flex h-12 flex-1 items-center justify-center rounded-pill text-caption font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${
            selected ? 'text-brand-on-dark' : 'text-slate-body'
          }`}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
