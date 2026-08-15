import React from 'react';
import { Container, Badge, Heading, Text, OptimizedImage } from '../atoms';
import { BannerActions } from '../molecules';

export interface BannerProps {
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const Banner: React.FC<BannerProps> = ({
  badgeText = 'Saratoga Ascend Brand Guidelines 2026',
  titlePrefix = 'Where ',
  titleHighlight = 'Healthcare',
  titleSuffix = ' and Science Rise.',
  description = 'Expanding beyond staffing to shape the next era of care and discovery. We find the ones who heal like heroes.',
  imageSrc = '/images/hero-banner.png',
  imageAlt = 'Healthcare Hero Graphic',
}) => {
  return (
    <section id="overview" className="relative pt-36 pb-24 bg-gradient-to-br from-[#022e4c] via-[#011c30] to-[#e11d48] text-white min-h-[90vh] flex items-center overflow-hidden">
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="whiteOutline" dot>
              {badgeText}
            </Badge>

            <Heading level={1} fontStyle="serif" className="text-white">
              {titlePrefix}
              <span className="text-[#29a6e3]">{titleHighlight}</span>
              <span className="text-[#e11d48]"> and Science</span>
              {titleSuffix}
            </Heading>

            <Text variant="lead">
              {description}
            </Text>

            <BannerActions />

            <div className="pt-8 flex flex-wrap gap-4 items-center">
              <div className="px-5 py-2.5 rounded-2xl bg-[#e11d48] text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">❤</span>
                <span>Leading Change in Care.</span>
              </div>
              <div className="px-5 py-2.5 rounded-2xl bg-[#29a6e3] text-white text-xs font-bold shadow-lg shadow-sky-500/30 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">⚡</span>
                <span>Powering Tomorrow&apos;s Intelligence.</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Graphic with Optimized Image Binding */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl group">
              <OptimizedImage
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                className="group-hover:scale-105"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011c30] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 z-10">
                <div className="text-xs font-bold uppercase tracking-wider text-[#29a6e3]">Brand Vision</div>
                <div className="text-sm font-serif font-bold text-white mt-1">
                  &quot;Advancing Healthcare. Accelerating Science. Empowering Possibility.&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
