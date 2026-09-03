import React from 'react';
import type { AboutPage } from '@/lib/schemas';
import { renderRegisteredSection } from '@/lib/registry/homeRegistry';
import { HeroSection } from '../organisms';

export interface AboutTemplateProps {
  aboutData?: AboutPage;
}

export const AboutTemplate: React.FC<AboutTemplateProps> = ({ aboutData }) => {
  const hasDynamicBanner = aboutData?.Section?.some(
    (sec) => sec.__typename === 'ComponentReferencesBannerReference'
  );

  return (
    <main id="main">
      {!hasDynamicBanner && <HeroSection title="About Saratoga Ascend" />}

      {aboutData?.Section?.map((sec, idx) => renderRegisteredSection(sec, idx))}
    </main>
  );
};
