import React from 'react';

export interface IconTextRowProps {
  icon: React.ReactNode;
  label: string;
}

export const IconTextRow: React.FC<IconTextRowProps> = ({ icon, label }) => {
  return (
    <li className="flex items-center gap-2 text-[21px] tracking-[0.4px] text-[#123f63]">
      {icon}
      <span>{label}</span>
    </li>
  );
};
