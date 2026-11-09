import React from 'react';

export interface AuthorCardProps {
  name?: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  avatarAlt?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

/**
 * Author Detail Card (Figma Group 2085665615)
 * - Card width: max 1051px, min-height 314px
 * - Background: #E4EBF1 with subtle gradient wash (100.63deg, #2EC4F3 9.94%, #BFD633 86.86% opacity 0.3)
 * - Border radius: 30px
 * - Avatar: 78px circle (portrait)
 * - Author name: DM Serif Text, 40px, line-height 34px, letter-spacing 0.03em
 * - Author role: DM Serif Text, 20px, line-height 46px
 * - Bio: Google Sans Flex, 24px, line-height 46px (or responsive), color #000000
 * - Social Links: circular border icons (Facebook, Instagram, LinkedIn, X/Twitter)
 */
export const AuthorCard: React.FC<AuthorCardProps> = ({
  name = 'Jenny Wilson',
  role = 'CEO of Saratoga ascend',
  bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
  avatarUrl = '/images/author-avatar.png',
  avatarAlt,
  facebookUrl = '#',
  instagramUrl = '#',
  linkedinUrl = '#',
  twitterUrl = '#',
}) => {
  return (
    <aside
      aria-label={`About ${name}`}
      className="box-border relative flex w-full max-w-[1051px] flex-col justify-between overflow-hidden rounded-[30px] p-6 sm:p-8 md:p-10 xl:min-h-[314px] xl:p-[38px_42px]"
      style={{
        backgroundColor: '#E4EBF1',
        backgroundImage:
          'linear-gradient(100.63deg, rgba(46, 196, 243, 0.18) 9.94%, rgba(191, 214, 51, 0.15) 86.86%)',
      }}
    >
      {/* Top Header: Avatar + Name/Role + Social Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full">
        {/* Left: Avatar + Identity */}
        <div className="flex items-center gap-5">
          <div className="relative size-[78px] shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#CECECE]">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={avatarAlt || name}
                className="size-full object-cover object-top"
              />
            ) : (
              <div className="size-full flex items-center justify-center font-serif text-2xl text-black">
                {name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-serif font-normal text-[28px] sm:text-[34px] xl:text-[40px] leading-[1.1] tracking-[0.03em] text-[#000000]">
              {name}
            </h3>
            {role && (
              <p className="font-serif font-normal text-[16px] sm:text-[18px] xl:text-[20px] leading-[1.3] text-[#000000] mt-1">
                {role}
              </p>
            )}
          </div>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-3">
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex size-[39px] items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white"
            >
              <svg width="10" height="18" viewBox="0 0 10 18" fill="currentColor">
                <path d="M8.5 10.125H6V17.5H2.875V10.125H1.3125V7.5H2.875V5.625C2.875 3.55469 4.14844 2.5 6.02344 2.5C6.92188 2.5 7.69531 2.57031 7.92188 2.59766V4.78125H6.63281C5.625 4.78125 5.42969 5.25781 5.42969 5.96094V7.5H8.5L8.5 10.125Z" />
              </svg>
            </a>
          )}

          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-[39px] items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          )}

          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-[39px] items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}

          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="flex size-[39px] items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Biography Description */}
      {bio && (
        <p className="font-sans font-normal text-[16px] sm:text-[20px] xl:text-[24px] leading-[1.6] xl:leading-[46px] text-[#000000] mt-6">
          {bio}
        </p>
      )}
    </aside>
  );
};

