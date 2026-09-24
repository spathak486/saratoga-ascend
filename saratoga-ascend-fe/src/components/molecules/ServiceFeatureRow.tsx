import React from 'react';

export interface ServiceFeatureRowProps {
  label: string;
}

export const ServiceFeatureRow: React.FC<ServiceFeatureRowProps> = ({ label }) => (
  <li className="flex items-center gap-4">
    <span className="inline-flex size-10 shrink-0" aria-hidden="true">
      <img src="/images/blue-tick.svg" alt="" className="size-full" />
    </span>
    <span className="pt-0.5 text-body" style={{ color: '#2A91DC' }}>
      {label}
    </span>
  </li>
);
