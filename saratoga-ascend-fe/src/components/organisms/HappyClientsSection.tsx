'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface ClientTestimonial {
  id: string;
  role: string;
  author: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
}

const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'variant-1',
    role: 'Certified Nursing Assistant',
    author: 'Izabella-Naval Hospital, Lejeune- Family Medicine',
    quote:
      '“After 20+ years in pharmacy, this is the best place I’ve ever worked! I’m proud to serve our military community, enjoy competitive pay, flexible time off, and a true sense of purpose.”',
    imageSrc: '/images/client-portrait.jpg',
    imageAlt: 'Izabella - Certified Nursing Assistant',
  },
  {
    id: 'variant-2',
    role: 'Medical Assistant',
    author: 'Camp Lejeune Primary Care',
    quote:
      '“Every day brings something new, and I love being part of a team that truly cares. The people, the mission, and the opportunity to grow make this a rewarding place to build my career.”',
    imageSrc: '/images/pharmacist-portrait.png',
    imageAlt: 'Medical Assistant - Camp Lejeune Primary Care',
  },
  {
    id: 'variant-3',
    role: 'Pharmacy Technician',
    author: 'Naval Hospital Pharmacy Services',
    quote:
      '“I’ve found more than just a job here—I’ve found a team that values what I bring to the table. The supportive environment and meaningful work make coming to work every day something I’m proud of.”',
    imageSrc: '/images/healthcare-team.png',
    imageAlt: 'Pharmacy Technician - Naval Hospital Pharmacy Services',
  },
];

export const HappyClientsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = CLIENT_TESTIMONIALS.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Determine card mapping based on active variant (0, 1, 2)
  // In Figma:
  // Variant 0 (Default): Front=Card0 (zoe/client-portrait), Mid=Card1 (humberto/pharmacist), Back=Card2 (brooke/healthcare-team)
  // Variant 1 (Variant2): Front=Card1 (humberto/pharmacist), Mid=Card2 (brooke/healthcare-team), Back=Card0 (zoe/client-portrait)
  // Variant 2 (Variant3): Front=Card2 (brooke/healthcare-team), Mid=Card0 (zoe/client-portrait), Back=Card1 (humberto/pharmacist)
  const frontCardIndex = currentIndex;
  const midCardIndex = (currentIndex + 1) % total;
  const backCardIndex = (currentIndex + 2) % total;

  const activeTestimonial = CLIENT_TESTIMONIALS[frontCardIndex];

  return (
    <section id="who-we-serve" className="w-full py-12 lg:py-[120px] bg-white overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[120px] space-y-8 lg:space-y-12">
        {/* Section Title */}
        <h2 className="font-serif-dm text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[1.2] text-[#0A0A0A] text-center">
          Our Happy Clients
        </h2>

        {/* Desktop Carousel Stage (Figma 1680px x 538px proportions) */}
        <div className="relative w-full max-w-[1680px] mx-auto hidden md:block h-[480px] lg:h-[538px]">
          
          {/* Rectangle 13: Red Background Box (#F01424, border-radius: 50px) */}
          <div className="absolute left-[34.46%] right-[8.45%] top-0 bottom-0 bg-[#F01424] rounded-[36px] lg:rounded-[50px] z-30 shadow-[0_25px_60px_rgba(240,20,36,0.3)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />

          {/* Back Card (Position 1: left 8.27%, right 73.69%, ~69% height) */}
          <div 
            onClick={() => handleSelectSlide(backCardIndex)}
            className="absolute left-[8.27%] right-[73.69%] top-[15.24%] bottom-[15.43%] rounded-[20px] overflow-hidden shadow-md opacity-50 hover:opacity-80 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10 cursor-pointer hover:scale-[1.03]"
          >
            <Image
              src={CLIENT_TESTIMONIALS[backCardIndex].imageSrc}
              alt={CLIENT_TESTIMONIALS[backCardIndex].imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Middle Card (Position 2: left 15.18%, right 64.17%, ~79% height) */}
          <div 
            onClick={() => handleSelectSlide(midCardIndex)}
            className="absolute left-[15.18%] right-[64.17%] top-[10.22%] bottom-[10.41%] rounded-[20px] overflow-hidden shadow-lg opacity-85 hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 border-2 border-white/60 cursor-pointer hover:scale-[1.02]"
          >
            <Image
              src={CLIENT_TESTIMONIALS[midCardIndex].imageSrc}
              alt={CLIENT_TESTIMONIALS[midCardIndex].imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Active Front Card (Position 3: left 23.93%, right 53.39%, ~87% height) */}
          <div 
            key={`front-card-${frontCardIndex}`}
            className="absolute left-[23.93%] right-[53.39%] top-[6.32%] bottom-[6.32%] rounded-[20px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)] z-40 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          >
            <Image
              src={CLIENT_TESTIMONIALS[frontCardIndex].imageSrc}
              alt={CLIENT_TESTIMONIALS[frontCardIndex].imageAlt}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Text Content inside Red Box (Group 69 / 68 / 67) */}
          <div className="absolute left-[49.29%] right-[12%] top-[12%] bottom-[12%] z-50 flex flex-col justify-center text-white pointer-events-auto overflow-hidden">
            <div key={`text-${frontCardIndex}`} className="space-y-4 lg:space-y-5 animate-fadeIn">
              {/* Role Title (Heading 03 - DM Serif Text, 44px) */}
              <h3 className="font-serif-dm text-2xl md:text-3xl lg:text-[44px] leading-[1.2] font-normal text-white tracking-tight">
                {activeTestimonial.role}
              </h3>

              {/* Author Subtitle (Body 00 - Google Sans / Sans-Serif, 24px, Bold) */}
              <p className="text-white text-base md:text-xl lg:text-[24px] font-bold leading-[1.6]">
                {activeTestimonial.author}
              </p>

              {/* Quote (Body 02 - Google Sans / Sans-Serif, 20px, Medium) */}
              <blockquote className="text-white text-sm md:text-base lg:text-[20px] font-medium leading-[1.5] max-w-[580px] opacity-95">
                {activeTestimonial.quote}
              </blockquote>
            </div>
          </div>

          {/* Frame 4: Left Control Arrow Button (#2B88D9 Sky Blue) */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-[40.71%] w-[64px] lg:w-[100px] h-[64px] lg:h-[100px] rounded-full bg-[#2B88D9]/10 hover:bg-[#2B88D9]/20 active:scale-95 transition-all duration-300 flex items-center justify-center z-50 group cursor-pointer"
          >
            <div className="w-[48px] lg:w-[66.67px] h-[48px] lg:h-[68.33px] bg-[#2B88D9] rounded-[14px] lg:rounded-[18px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-current" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </div>
          </button>

          {/* Frame 5: Right Control Arrow Button (#F01424 Primary Red) */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-[40.71%] w-[64px] lg:w-[100px] h-[64px] lg:h-[100px] rounded-full bg-[#F01424]/10 hover:bg-[#F01424]/20 active:scale-95 transition-all duration-300 flex items-center justify-center z-50 group cursor-pointer"
          >
            <div className="w-[48px] lg:w-[66.67px] h-[48px] lg:h-[68.33px] bg-[#F01424] rounded-[14px] lg:rounded-[18px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-current" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </div>
          </button>
        </div>

        {/* Mobile View Layout (< md screens) */}
        <div className="block md:hidden space-y-6">
          <div className="bg-[#F01424] rounded-[28px] p-6 text-white shadow-xl space-y-6 relative overflow-hidden">
            {/* Active Card Image */}
            <div className="relative w-full h-[260px] rounded-[16px] overflow-hidden shadow-lg border-2 border-white/20">
              <Image
                src={activeTestimonial.imageSrc}
                alt={activeTestimonial.imageAlt}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Mobile Text Content */}
            <div className="space-y-3">
              <h3 className="font-serif-dm text-2xl font-normal leading-tight text-white">
                {activeTestimonial.role}
              </h3>
              <p className="text-white text-base font-bold leading-snug">
                {activeTestimonial.author}
              </p>
              <blockquote className="text-white/95 text-sm font-medium leading-relaxed">
                {activeTestimonial.quote}
              </blockquote>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="w-12 h-12 bg-[#2B88D9] rounded-[12px] flex items-center justify-center text-white active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
              </button>

              {/* Dots Pagination */}
              <div className="flex items-center space-x-2">
                {CLIENT_TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next"
                className="w-12 h-12 bg-white text-[#F01424] rounded-[12px] flex items-center justify-center active:scale-95 transition-transform shadow-md"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

