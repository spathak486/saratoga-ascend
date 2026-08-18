import React from 'react';
import Image from 'next/image';

export interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-[180px] h-[44px]',
    md: 'w-[240px] h-[58px]',
    lg: 'w-[298px] h-[72px]',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Saratoga Ascend Logo"
        fill
        priority
        className="object-contain object-left"
      />
    </div>
  );
};

