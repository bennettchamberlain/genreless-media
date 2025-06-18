'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition >= 0); // Show header after scrolling 120px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed z-50 h-10 inset-0 flex items-center transition-all duration-500 font-['Helvetica']
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
      `}
      style={{ mixBlendMode: 'difference' }}
    >
      <div className="w-full pl-4 pr-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col lg:basis-3/6 lg:max-w-[50%] ">
            {/* Empty for spacing */}
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2">
            <div className="flex-1" />
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2 pt-2">
            <div className="flex-1" />
            <Link href="/archive" className="text-s font-bold hover:underline text-right text-white">
              Archive
            </Link>
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2 pt-2">
            <div className="flex-1" />
            <Link href="/info" className="text-s font-bold hover:underline text-right text-white">
              Info
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
