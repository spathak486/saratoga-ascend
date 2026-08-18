import React from 'react';
import {
  Navbar,
  Banner,
  ServicesSection,
  HealthcareFocusSection,
  AchievementsSection,
  HappyClientsSection,
  ClientLogosSection,
  NewsroomSection,
  AboutUsSection,
  Footer,
} from '../organisms';

export const HomeTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#022e4c] font-sans antialiased selection:bg-[#F01424] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="w-full overflow-hidden">
        {/* 2. Frame 568: Hero Banner */}
        <Banner />

        {/* 3. Frame 578: Healthcare Services & Solutions */}
        <ServicesSection />

        {/* 4. Frame 580: Healthcare Focus & Staffing */}
        <HealthcareFocusSection />

        {/* 5. Frame 581: Our Achievements & Glass Accreditation Cards */}
        <AchievementsSection />

        {/* 6. Client Reviews: Our Happy Clients Carousel */}
        <HappyClientsSection />

        {/* 7. Frame 109: Our Clients Logo Marquee */}
        <ClientLogosSection />

        {/* 8. Frame 569: Latest News & Insights */}
        <NewsroomSection />

        {/* 9. Frame 588: About Us Heritage */}
        <AboutUsSection />
      </main>

      {/* 10. Footer Component */}
      <Footer />
    </div>
  );
};
