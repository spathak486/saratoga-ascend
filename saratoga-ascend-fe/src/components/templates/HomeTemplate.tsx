import React from 'react';
import {
  Navbar,
  HeroSection,
  HealthcareIntroSection,
  FeaturedSpecialistSection,
  TravelStaffingSection,
  AchievementsSection,
  ColorSystemSection,
  CoreComponentsSection,
  Footer,
} from '../organisms';

export const HomeTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy font-sans antialiased selection:bg-brand-red selection:text-brand-surface">
      <Navbar />

      <main>
        <HeroSection />
        <HealthcareIntroSection />
        <FeaturedSpecialistSection />
        <TravelStaffingSection />
        <AchievementsSection />
        <ColorSystemSection />
        <CoreComponentsSection />
      </main>

      <Footer />
    </div>
  );
};
