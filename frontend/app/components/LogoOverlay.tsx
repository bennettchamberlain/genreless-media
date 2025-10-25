'use client';
import Image from "next/image";
import Link from "next/link";
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
      className="fixed top-5 left-4 z-60 h-8 w-16 md:w-50"
    >
      <Link href="/">
        <Image
          src={isMobile ? "/images/genrelogo_small.png" : "/images/g.M_logo.png"}
          alt="G.M Logo"
          fill
          sizes="(max-width: 768px) 64px, 200px"
          className="object-contain select-none brightness-0 cursor-pointer"
          priority
          draggable={false}
        />
      </Link>
    </div>
  );
} 