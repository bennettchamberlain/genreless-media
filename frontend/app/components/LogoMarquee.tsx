'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Logo {
  _id: string;
  title: string;
  imageUrl: string;
  alt?: string;
}

interface LogoMarqueeProps {
  logos: Logo[];
}

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  const [needsMarquee, setNeedsMarquee] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfMarqueeNeeded = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        setNeedsMarquee(contentWidth > containerWidth);
      }
    };

    checkIfMarqueeNeeded();
    window.addEventListener('resize', checkIfMarqueeNeeded);
    
    return () => window.removeEventListener('resize', checkIfMarqueeNeeded);
  }, [logos]);

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[#0d0d0d] pt-4 pb-8 md:pt-0 md:pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
        >
          <div 
            ref={contentRef}
            className={`flex items-center gap-8 md:gap-12 ${
              needsMarquee 
                ? 'animate-marquee whitespace-nowrap' 
                : 'justify-center flex-wrap'
            }`}
          >
            {/* Duplicate logos for seamless marquee */}
            {needsMarquee && (
              <>
                {logos.map((logo) => (
                  <div
                    key={`${logo._id}-duplicate`}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ minWidth: '120px' }}
                  >
                    <Image
                      src={logo.imageUrl}
                      alt={logo.alt || logo.title}
                      width={120}
                      height={60}
                      className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </>
            )}
            
            {/* Original logos */}
            {logos.map((logo) => (
              <div
                key={logo._id}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ minWidth: '120px' }}
              >
                <Image
                  src={logo.imageUrl}
                  alt={logo.alt || logo.title}
                  width={120}
                  height={60}
                  className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 