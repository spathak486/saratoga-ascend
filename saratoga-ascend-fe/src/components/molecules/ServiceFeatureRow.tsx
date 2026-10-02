import React from 'react';

export interface ServiceFeatureRowProps {
  label: string;
}

export const ServiceFeatureRow: React.FC<ServiceFeatureRowProps> = ({ label }) => (
  <li className="flex items-center gap-4">
    <span className="inline-flex size-10 shrink-0" aria-hidden="true">
      <img src="/images/blue-tick.svg" alt="" className="size-full" />
    </span>
    <span className="text-tick text-slate-ink max-[89.99rem]:leading-5 max-[89.99rem]:text-brand-sky">
      {label}
    </span>
  </li>
);
