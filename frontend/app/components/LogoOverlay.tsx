'use client';
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function LogoOverlay() {
  const [stuck, setStuck] = useState(false);
  const [stuckPosition, setStuckPosition] = useState<number | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY;

      if (rect.top <= 0 && !stuck) {
        setStuck(true);
        setStuckPosition(currentScroll);
      } else if (stuckPosition !== null && currentScroll < stuckPosition) {
        setStuck(false);
        setStuckPosition(null);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stuck, stuckPosition]);

  return (
    <div
      ref={logoRef}
      className={`z-60 transition-all duration-500 pointer-events-none ${
        stuck
          ? "fixed top-2 left-4 w-50 h-10"
          : "relative" // Not fixed until stuck
      }`}
      style={{
        top: stuck ? undefined : '45vh', 
        left: stuck ? undefined : '10vw',
        width: stuck ? undefined : '1500px',
        height: stuck ? undefined : '200px',
        mixBlendMode: "difference",
      }}
    >
      <Image
        src="/images/g.M_logo.png"
        alt="G.M Logo"
        fill
        className="object-contain select-none"
        priority
        draggable={false}
      />
    </div>
  );
} 