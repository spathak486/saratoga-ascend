'use client';

import React from 'react';
import Image from 'next/image';
import { cleanHeadingHtml } from '@/lib/utils/text';

export interface TeamMemberItem {
  id?: string;
  name: string;
  role: string;
  email?: string | null;
  phone?: string | null;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface TeamSectionProps {
  id?: string;
  sectionTitle?: string | null;
  description?: string | null;
  members: TeamMemberItem[];
  className?: string;
}

/**
 * Team / Leadership Member Carousel & Grid Component
 * Figma Specifications:
 * - Card Dimensions: width: 320px, height: 469px, border-radius: 20px
 * - Background: linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)
 * - Bottom Shadow Overlay: linear-gradient(0deg, #000000 27.99%, rgba(0, 0, 0, 0) 100%), height: 209px
 * - Name: DM Serif Text, 24px, line-height: 120% (29px), color: #FFFFFF
 * - Role: DM Serif Text, 18px, line-height: 120% (22px), color: #FFFFFF
 * - Email: Google Sans Flex, 20px, line-height: 120% (24px), lowercase, color: #FFFFFF
 * - Phone: Google Sans Flex, 20px, line-height: 120% (24px), color: #FFFFFF
 */
export const TeamSection: React.FC<TeamSectionProps> = ({
  id,
  sectionTitle,
  description,
  members,
  className = '',
}) => {
  if (!members || members.length === 0) return null;

  return (
    <section
      id={id}
      aria-label="Leadership & Team"
      className={`relative mx-auto my-0 flex w-full max-w-[120rem] flex-col justify-center overflow-hidden py-12 sm:py-16 xl:py-20 scroll-mt-28 ${className}`.trim()}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-[7.5rem]">
        {/* Main Heading (CKEditor Rich Text Supported) */}
        {sectionTitle && (
          <div className="mb-10 sm:mb-12 xl:mb-14 max-w-[87.5rem]">
            <h2
              className="font-serif font-normal text-section leading-[1.2] text-[#000000] tracking-tight"
              dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(sectionTitle) }}
            />
            {description && (
              <p className="mt-4 font-sans font-normal text-base sm:text-lg lg:text-xl text-[#5A5A5A] max-w-[56.25rem] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Scrollable / Responsive Cards Container */}
        {/* Figma: width: 1799px, height: 470px, overflow-x: scroll */}
        <div className="relative w-full">
          <div className="flex flex-nowrap items-center gap-[1.875rem] overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {members.map((member, idx) => {
              const imageUrl = member.image?.url;

              return (
                <div
                  key={member.id || `team-member-${idx}`}
                  style={{
                    background: 'linear-gradient(90.55deg, #D31E2D 0.47%, #2A91DC 102.45%)',
                  }}
                  className="group relative flex-none w-[20rem] h-[29.3125rem] rounded-[1.25rem] overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Member Photo */}
                  {imageUrl ? (
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={imageUrl}
                        alt={member.image?.alternativeText || member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="320px"
                      />
                    </div>
                  ) : (
                    /* Fallback subtle background pattern if image not provided */
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <span className="font-serif text-6xl text-white font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Bottom Dark Gradient Scrim: 209px height */}
                  <div
                    style={{
                      background: 'linear-gradient(0deg, #000000 35%, rgba(0, 0, 0, 0) 100%)',
                    }}
                    className="absolute bottom-0 left-0 right-0 h-[13.75rem] rounded-b-[1.25rem] pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Card Content Overlay: Frame 2147226496 (centered bottom content, fluid padding) */}
                  <div className="absolute inset-x-4 bottom-5 flex flex-col items-center text-center gap-1.5 z-10 select-none">
                    {/* Name: DM Serif Text, 24px, line-height 120% (29px), color: #FFFFFF */}
                    <h3 className="font-serif font-normal text-[1.5rem] leading-[1.2] text-[#FFFFFF] text-center max-w-full truncate">
                      {member.name}
                    </h3>

                    {/* Role: DM Serif Text, 18px, line-height 120% (22px), color: #FFFFFF */}
                    <p className="font-serif font-normal text-[1.125rem] leading-[1.2] text-[#FFFFFF] text-center max-w-full">
                      {member.role}
                    </p>

                    {/* Email: Google Sans Flex, 20px, lowercase, line-height 24px */}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="font-sans font-normal text-[1.125rem] leading-[1.4] lowercase text-[#FFFFFF] hover:underline transition-colors text-center max-w-full truncate"
                      >
                        {member.email}
                      </a>
                    )}

                    {/* Phone: Google Sans Flex, 20px, line-height 24px */}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                        className="font-sans font-normal text-[1.125rem] leading-[1.4] text-[#FFFFFF] hover:underline transition-colors text-center max-w-full truncate"
                      >
                        {member.phone}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

