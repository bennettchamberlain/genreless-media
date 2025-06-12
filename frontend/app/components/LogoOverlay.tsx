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
          ? "fixed top-0 left-4 w-40 h-10"
          : "absolute" // Not fixed until stuck
      }`}
      style={{
        bottom: stuck ? undefined : '4vh', 
        left: stuck ? undefined : '10vw',
        width: stuck ? undefined : '900px',
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