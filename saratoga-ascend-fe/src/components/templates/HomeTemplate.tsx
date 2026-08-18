import React from 'react';
import {
  Navbar,
  Banner,
  ServicesSection,
  MarketWeServeSection,
  HealthcareFocusSection,
  AboutUsSection,
  AchievementsSection,
  ClientLogosSection,
  NewsroomSection,
  HappyClientsSection,
  FaqSection,
  NeedHelpSection,
  Footer,
} from '../organisms';

export const HomeTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#022E4C] font-sans antialiased selection:bg-[#F01424] selection:text-white flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* Main Container: Full width 100vw layout */}
      <main className="w-full bg-white">
        {/* Row 1: Hero Banner */}
        <Banner />

        {/* Row 2: Healthcare Services & Solutions (What We Do) */}
        <ServicesSection />

        {/* Row 3: Market We Serve */}
        <MarketWeServeSection />

        {/* Row 4: Healthcare Focus & Staffing Services */}
        <HealthcareFocusSection />

        {/* Row 5: Four Decades of Expertise / About Us */}
        <AboutUsSection />

        {/* Row 6: Our Achievements */}
        <AchievementsSection />

        {/* Row 7: Our Clients Logo Marquee */}
        <ClientLogosSection />

        {/* Row 8: Latest News and Insights */}
        <NewsroomSection />

        {/* Row 9: Our Happy Clients 3D Carousel */}
        <HappyClientsSection />

        {/* Row 10: Any Questions? / FAQ Accordion */}
        <FaqSection />

        {/* Row 11: Need Help? / Contact CTA Form */}
        <NeedHelpSection />
      </main>

      {/* Row 12: Footer Component */}
      <Footer />
    </div>
  );
};


