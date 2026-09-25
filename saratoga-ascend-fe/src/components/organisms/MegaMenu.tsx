import React from 'react';
import { Container } from '../atoms';
import { ArrowUpRightIcon } from '../atoms/icons';
import Link from 'next/link';

export interface MegaMenuProps {
  type: string;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type }) => {
  // We only implement Who We Serve for now as per design
  if (type !== '/who-we-serve' && type !== '/what-we-do' && type !== '/government-buyers') {
    return null;
  }

  return (
    <div className="pointer-events-none absolute left-0 top-full w-full opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
      <div className="bg-[#318BD3] text-white shadow-xl">
        <Container className="flex h-[292px] items-center gap-[30px] py-[12px]">
          {/* Left Side Links */}
          <div className="flex w-[590px] shrink-0 flex-col justify-center gap-1">
            {[
              { label: 'Federal Government', href: '/federal' },
              { label: 'State and Local Government', href: '/state-local' },
              { label: 'Specialized Markets', href: '/specialized' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group/link flex h-[76px] w-[590px] items-center justify-between gap-[30px] rounded-lg px-[12px] py-[8px] transition-colors hover:bg-white/10"
              >
                <span className="font-sans text-[24px] font-medium leading-[1.5] tracking-normal text-white transition-opacity group-hover/link:opacity-90">{link.label}</span>
                <span className="inline-flex size-[48px] shrink-0 items-center justify-center rounded-full bg-white text-[#318BD3] transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:scale-110">
                  <ArrowUpRightIcon className="size-6" />
                </span>
              </Link>
            ))}
          </div>

          <div className="h-[200px] w-px shrink-0 bg-white/20" />

          {/* Right Side Info */}
          <div className="flex-1 pl-[12px]">
            <p className="font-sans text-[20px] font-medium leading-[1.6] tracking-normal text-white/90">
              Saratoga Ascend connects cleared, technically skilled professionals with public-sector clients, delivering tailored solutions and driving project success.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};
