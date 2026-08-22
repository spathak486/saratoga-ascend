import React from 'react';

/** 40px badge from the What We Do card — #2A91DC ring with a white check. */
const CheckBadge = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    className="size-full"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="20" cy="20" r="19" fill="rgb(42 145 220 / 0.18)" />
    <circle cx="20" cy="20" r="14" fill="#2A91DC" />
    <path
      d="M13 20.5L17.5 25L27 15.5"
      stroke="white"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface ServiceFeatureRowProps {
  label: string;
}

export const ServiceFeatureRow: React.FC<ServiceFeatureRowProps> = ({ label }) => (
  <li className="flex items-start gap-4">
    <span className="inline-flex size-10 shrink-0" aria-hidden="true">
      <CheckBadge />
    </span>
    <span className="pt-0.5 text-body text-brand-cta-to">{label}</span>
  </li>
);
