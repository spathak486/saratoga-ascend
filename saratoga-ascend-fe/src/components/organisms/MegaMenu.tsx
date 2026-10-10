import React from 'react';
import Link from 'next/link';

export interface MegaMenuProps {
  type: string;
}

const MENU_CONTENT: Record<string, { label: string; href: string }[]> = {
  '/who-we-serve': [
    { label: 'Federal Government', href: '/federal' },
    { label: 'State and Local Government', href: '/state-local' },
    { label: 'Specialized Markets', href: '/specialized' },
  ],
  '/government-buyers': [
    { label: 'Contract Vehicles & Procurement', href: '/contract-vehicles' },
    { label: 'Capabilities Statement', href: '/capabilities' },
  ],
  '/what-we-do': [
    { label: 'Digital Transformation', href: '/digital' },
    { label: 'Data & Analytics', href: '/data' },
    { label: 'Cybersecurity', href: '/cyber' },
  ],
  '/about': [
    { label: 'Our Story', href: '/story' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Careers', href: '/careers' },
  ],
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ type }) => {
  const links = MENU_CONTENT[type];
  if (!links) return null;

  const isSolutions = type === '/what-we-do';
  const bgClass = isSolutions ? 'bg-[#EAEAEA]' : 'bg-white/75 backdrop-blur-[50px]';

  return (
    <div className="pointer-events-none absolute left-1/2 top-[69px] z-50 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
      <div
        className={`flex w-full sm:w-[526px] flex-col rounded-[20px] p-[39px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] ${bgClass}`}
      >
        {links.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            className={`group/link flex items-center gap-[6px] transition-opacity hover:opacity-80 py-3 ${
              i !== links.length - 1 ? 'border-b border-[#DCDCDC] mb-3' : ''
            }`}
          >
            <span className="font-sans text-[22px] font-medium leading-[28px] text-black">
              {link.label}
            </span>
            <span className="relative flex size-6 shrink-0 items-center justify-center transition-transform group-hover/link:translate-x-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
