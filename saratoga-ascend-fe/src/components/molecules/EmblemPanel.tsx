import React from 'react';
import { MediaFrame, Text } from '../atoms';

export interface EmblemPanelProps {
  emblemSrc?: string;
  paragraphs?: string[];
}

const DEFAULT_COPY = [
  'Lorem ipsum is the standard placeholder text used in graphic design, publishing, and web development to showcase.',
  'Lorem ipsum is the standard placeholder text used in graphic.',
] as const;

/**
 * Right-hand panel on the What We Do band — pale blue gradient, butterfly
 * emblem, and supporting copy beneath.
 */
export const EmblemPanel: React.FC<EmblemPanelProps> = ({
  emblemSrc = '/images/Image-1%201.png',
  paragraphs = [...DEFAULT_COPY],
}) => (
  <aside className="flex min-h-0 flex-col rounded-card border border-brand-line bg-panel-tint p-[clamp(1.25rem,2.08vw,2.5rem)] xl:min-h-[clamp(28rem,34.58vw,41.5rem)]">
    <div className="mx-auto w-full max-w-[16rem] pt-[clamp(0.5rem,1vw,1.25rem)] sm:max-w-[22.4375rem]">
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

    <div className="mt-auto flex flex-col gap-4 pt-[clamp(1.5rem,3vw,2.5rem)]">
      {paragraphs.map((paragraph) => (
        <Text key={paragraph} size="body" tone="navy">
          {paragraph}
        </Text>
      ))}
    </div>
  </aside>
);
