import React from 'react';
import { Container } from '../atoms/Container';
import { BrandLogo } from '../molecules/BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#011c30] text-slate-400 text-sm border-t border-slate-800">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <BrandLogo variant="light" size="sm" />
        <div>
          Official Brand Portal: <a href="https://www.saratogamed.com" target="_blank" rel="noopener noreferrer" className="text-[#29a6e3] hover:underline font-semibold">www.saratogamed.com</a>
        </div>
        <div>&copy; {new Date().getFullYear()} Saratoga Ascend. All rights reserved.</div>
      </Container>
    </footer>
  );
};
