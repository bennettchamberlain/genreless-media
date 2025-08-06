'use client';
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function LogoOverlay() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      className="fixed top-4 left-4 z-60 w-16 h-10 md:w-60 md:h-10 pointer-events-none"
    >
      <Image
        src={isMobile ? "/images/genrelogo_small.png" : "/images/g.M_logo.png"}
        alt="G.M Logo"
        fill
        sizes="(max-width: 768px) 64px, 240px"
        className="object-contain select-none brightness-0"
        priority
        draggable={false}
      />
    </div>
  );
} 