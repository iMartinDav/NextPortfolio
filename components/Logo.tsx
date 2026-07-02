import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ className, style }: LogoProps) {
  return (
    <div className={className} style={style}>
      <Image 
        src="/images/logo.svg" 
        alt="Logo" 
        width={750} 
        height={750} 
        priority
        className="w-full h-full"
      />
    </div>
  );
}
