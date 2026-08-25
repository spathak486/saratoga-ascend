import React from 'react';
import Image from 'next/image';
import { MediaFrame } from '../atoms/MediaFrame';

export interface AboutHeartStageProps {
  heartSrc?: string;
  shieldSrc?: string;
  pulseSrc?: string;
  className?: string;
}

function GlassIconTile({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <div
      className={`absolute aspect-square w-[28.15%] overflow-hidden rounded-media border border-brand-surface bg-brand-surface/80 backdrop-blur-[17px] ${className}`.trim()}
    >
      <span className="absolute inset-[18.42%]">
        <MediaFrame
          src={src}
          alt=""
          pendingLabel="icon"
          unoptimized
          sizes="120px"
          imageClassName="object-contain!"
          className="size-full border-0 bg-transparent"
        />
      </span>
    </div>
  );
}

/**
 * 675×981 heart plate from Figma node 13:381 — anatomical heart, pedestal,
 * and two 190×190 glass tiles.
 */
export const AboutHeartStage: React.FC<AboutHeartStageProps> = ({
  heartSrc = '/images/about/heart.png',
  shieldSrc = '/images/about/icon-shield.svg',
  pulseSrc = '/images/about/icon-pulse.svg',
  className = '',
}) => (
  <div
    className={`relative aspect-[675/981] w-full max-w-[42.1875rem] ${className}`.trim()}
  >
    <div
      className="absolute top-[85.93%] left-[18.07%] h-[18.55%] w-[74.07%]"
      aria-hidden="true"
    >
      <MediaFrame
        src="/images/about/heart-pedestal.svg"
        alt=""
        pendingLabel="pedestal"
        unoptimized
        sizes="500px"
        imageClassName="object-contain! object-bottom!"
        className="size-full border-0 bg-transparent"
      />
    </div>

    <div className="absolute top-[2.04%] left-0 h-[90.01%] w-full overflow-hidden">
      <div className="absolute top-[-0.03%] left-[-9.93%] h-[100.05%] w-[121.63%]">
        <Image
          src={heartSrc}
          alt="Anatomical heart illustration"
          fill
          sizes="(max-width: 1280px) 90vw, 675px"
          className="object-cover"
        />
      </div>
    </div>

    <GlassIconTile src={shieldSrc} className="top-[25.59%] left-0 z-[1]" />
    <GlassIconTile src={pulseSrc} className="top-[57.8%] left-[68.3%] z-[1]" />
  </div>
);
