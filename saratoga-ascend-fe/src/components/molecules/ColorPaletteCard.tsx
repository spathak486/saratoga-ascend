import React from 'react';

export interface ColorPaletteCardProps {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  bgClass: string;
  textColor?: string;
  tag?: string;
}

export const ColorPaletteCard: React.FC<ColorPaletteCardProps> = ({
  name,
  hex,
  rgb,
  cmyk,
  bgClass,
  textColor = 'text-white',
  tag = 'Brand Color',
}) => {
  return (
    <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
      <div className={`h-40 ${bgClass} p-6 flex flex-col justify-end ${textColor}`}>
        <span className="text-xs font-bold uppercase tracking-wider opacity-80">{tag}</span>
      </div>
      <div className="p-6 space-y-2">
        <h3 className="font-bold text-lg text-[#022e4c]">{name}</h3>
        <div className="text-xs font-mono space-y-1 text-slate-500">
          <div><strong>HEX:</strong> {hex}</div>
          <div><strong>RGB:</strong> {rgb}</div>
          <div><strong>CMYK:</strong> {cmyk}</div>
        </div>
      </div>
    </div>
  );
};
