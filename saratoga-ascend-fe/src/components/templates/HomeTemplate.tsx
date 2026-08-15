import React from 'react';
import { Navbar, Banner, ColorSystemSection, Footer } from '../organisms';

export const HomeTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#022e4c] font-sans antialiased selection:bg-[#e11d48] selection:text-white">
      <Navbar />

      <main>
        {/* Organism: Hero Banner */}
        <Banner />

        {/* Organism: Section 01 Primary Color Palette */}
        <ColorSystemSection />
      </main>

      <Footer />
    </div>
  );
};
