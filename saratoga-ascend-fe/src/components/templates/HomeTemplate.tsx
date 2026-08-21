import React from 'react';
import {
  Navbar,
  HeroSection,
  HealthcareIntroSection,
  FeaturedSpecialistSection,
  TravelStaffingSection,
  AchievementsSection,
  SpotlightSection,
  OurClientsSection,
  NewsSection,
  MissionSection,
  Footer,
} from '../organisms';

export const HomeTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy font-sans antialiased">
      <Navbar />

      <main id="main">
        <HeroSection />
        <HealthcareIntroSection />
        <FeaturedSpecialistSection />
        <TravelStaffingSection />
        <AchievementsSection />
        <SpotlightSection />
        <OurClientsSection />
        <NewsSection />
        <MissionSection />
      </main>

      <Footer />
    </div>
  );
};
