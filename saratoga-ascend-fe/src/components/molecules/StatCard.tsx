import React from 'react';

export interface StatCardProps {
  value: string;
  label: string;
  dark?: boolean;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  dark = false,
  highlight = false,
}) => {
  return (
    <div className={`p-6 rounded-2xl border transition duration-300 ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 shadow-md text-[#022e4c]'}`}>
      <div className={`text-4xl font-extrabold font-serif ${highlight ? 'text-[#e11d48]' : ''}`}>
        {value}
      </div>
      <div className={`text-sm font-semibold mt-2 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
        {label}
      </div>
    </div>
  );
};
