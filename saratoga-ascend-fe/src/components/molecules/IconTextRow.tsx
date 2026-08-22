import React from 'react';

export interface IconTextRowProps {
  icon: React.ReactNode;
  label: string;
}

export const IconTextRow: React.FC<IconTextRowProps> = ({ icon, label }) => (
  <li className="flex items-center gap-3 text-body-lg text-brand-navy">
    <span className="inline-flex size-6 shrink-0 items-center justify-center" aria-hidden="true">
      {icon}
    </span>
    <span>{label}</span>
  </li>
);
