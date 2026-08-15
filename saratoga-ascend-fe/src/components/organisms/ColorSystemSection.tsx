import React from 'react';
import { Container, Badge, Heading, Text } from '../atoms';
import { ColorPaletteCard } from '../molecules';

export const ColorSystemSection: React.FC = () => {
  return (
    <section id="primary-colors" className="py-24 bg-white border-b border-slate-200 min-h-[70vh] flex items-center">
      <Container className="space-y-12 w-full">
        <div className="space-y-4">
          <Badge variant="red">SECTION 01</Badge>
          <Heading level={2} className="text-4xl sm:text-5xl font-serif font-bold text-[#022e4c]">
            Primary Color Palette
          </Heading>
          <Text variant="muted" className="max-w-2xl text-slate-600 text-base leading-relaxed">
            Our primary colors form the foundation of Saratoga&apos;s visual identity — strong, clear, and purposeful.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <ColorPaletteCard
            name="Navy Blue"
            hex="#022E4C"
            rgb="2 / 46 / 76"
            cmyk="100 / 80 / 43 / 42"
            bgClass="bg-[#022e4c]"
            tag="BRAND PRIMARY"
          />
          <ColorPaletteCard
            name="Saratoga Red"
            hex="#E11D48"
            rgb="225 / 29 / 72"
            cmyk="62 / 100 / 86 / 0"
            bgClass="bg-[#e11d48]"
            tag="BRAND PRIMARY"
          />
          <ColorPaletteCard
            name="Bright Blue"
            hex="#29A6E3"
            rgb="41 / 166 / 227"
            cmyk="70 / 19 / 0 / 0"
            bgClass="bg-[#29a6e3]"
            tag="BRAND ACCENT"
          />
          <ColorPaletteCard
            name="Off White"
            hex="#F4F4F4"
            rgb="244 / 244 / 244"
            cmyk="3 / 2 / 2 / 0"
            bgClass="bg-[#f4f4f4] border-b border-slate-200"
            textColor="text-[#022e4c]"
            tag="BACKGROUND NEUTRAL"
          />
        </div>
      </Container>
    </section>
  );
};
