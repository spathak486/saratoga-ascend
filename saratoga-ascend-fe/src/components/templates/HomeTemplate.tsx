import React from 'react';
import {
  Navbar,
  HeroSection,
  WhatWeDoSection,
  MarketWeServeSection,
  HealthcareProgramsSection,
  MissionSection,
  ContractVehiclesSection,
  OurAchievementsSection,
  PastPerformanceSection,
  ClientLogosSection,
  LatestNewsSection,
  HappyClientsSection,
  FaqSection,
  NeedHelpSection,
  Footer,
} from '../organisms';

export const HomeTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-navy font-sans antialiased">
      <Navbar />

      <main id="main">
        <HeroSection />
        <WhatWeDoSection />
        <MarketWeServeSection />
        <HealthcareProgramsSection />
        <MissionSection />
        <ContractVehiclesSection />
        <OurAchievementsSection />
        <PastPerformanceSection />
        <HappyClientsSection />
        <ClientLogosSection />
        <FaqSection />
        <NeedHelpSection />
        <LatestNewsSection />
      </main>

      <Footer />
    </div>
  );
};
