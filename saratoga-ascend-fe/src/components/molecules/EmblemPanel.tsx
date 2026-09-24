import React from 'react';
import { MediaFrame, Text } from '../atoms';

export interface EmblemPanelProps {
  emblemSrc?: string;
  /** Motion clip for the right-hand card. Takes precedence over `emblemSrc`. */
  videoSrc?: string;
  paragraphs?: string[];
}

const DEFAULT_COPY = [
  'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web development to showcase layouts and visual elements without the distraction of meaningful content.',
] as const;

/**
 * Right-hand panel on the What We Do band — looping video (or emblem fallback)
 * with supporting copy beneath.
 */
export const EmblemPanel: React.FC<EmblemPanelProps> = ({
  emblemSrc = '/images/Image-1%201.png',
  videoSrc,
  paragraphs = [...DEFAULT_COPY],
}) => (
  <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-frame border border-brand-line bg-brand-surface xl:min-h-[39.625rem]">
    {videoSrc ? (
      <div className="relative aspect-[502/284.5] w-full overflow-hidden bg-ink">
        <video
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Saratoga motion graphic"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    ) : (
      <div className="relative mx-auto w-full max-w-[16rem] pt-5 sm:max-w-[22.4375rem]">
        <MediaFrame
          src={emblemSrc}
          alt="Saratoga emblem"
          pendingLabel="Image-1 1.png"
          tone="sky"
          sizes="(max-width: 1280px) 60vw, 359px"
          imageClassName="object-contain!"
          className="aspect-square w-full border-0 bg-transparent"
        />
      </div>
    )}

    <div className="flex flex-1 items-start px-5 py-[1.875rem]">
      {paragraphs.map((paragraph) => (
        <Text key={paragraph} size="body" tone="navy" className="text-card-copy">
          {paragraph}
        </Text>
      ))}
    </div>
  </aside>
);
