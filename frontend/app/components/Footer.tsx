import React from "react";
import Image from "next/image";

interface FooterProps {
  backgroundColor?: string;
  textColor?: string;
}

export default function Footer({ 
  backgroundColor = "#1a21a5",
  textColor = "white"
}: FooterProps) {
  return (
    <footer style={{ backgroundColor }} className="p-0 relative overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row justify-between items-stretch min-h-[140px] lg:h-[140px] py-4 lg:py-0">
        {/* Column 1 */}
        <div className="flex flex-col lg:basis-4/6 lg:max-w-[66%] lg:min-h-[140px] mb-4 lg:mb-0 px-4 lg:px-2">
          <div className="flex flex-col h-full py-1">
            <span className={`font-[Helvetica] text-sm mb-3 lg:mb-3 mt-2 ml-0 lg:ml-2 text-${textColor} italic text-left`}>
              pare down to the essence, <br></br>but don&apos;t remove the poetry...
            </span>
            <div className="flex-1 hidden lg:block" />
            {/* Logo - hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex items-center lg:items-end w-full justify-center lg:justify-start">
              <div className="relative w-[208px] h-[110px]">
                <Image src="/images/g.M_logo.png" alt="g.M logo" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col lg:basis-1/6 lg:border-l border-white/30 px-4 lg:px-4 mb-4 lg:mb-0 text-left">
          <div className="flex flex-col h-full py-1">
            <div className={`font-[Helvetica] text-sm mb-2 lg:mb-3 mt-2 text-${textColor}`}>Los Angeles, CA, USA</div>
            <div className="flex-1 hidden lg:block" />
            <div className={`font-[Helvetica] text-sm mb-2 text-${textColor}`}>creative production company</div>
          </div>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col lg:basis-1/6 lg:border-l border-white/30 px-4 lg:px-4 text-left lg:text-right">
          <div className="flex flex-col h-full py-1">
            <div className={`font-sans text-xs mb-2 lg:mb-3 mt-2 text-${textColor}`}>
              <a href="https://www.instagram.com/genreless.media/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`mt-2 font-sans text-sm underline-offset-2 hover:underline hover:text-[#fe2e2e] text-${textColor}`}>
                Instagram
              </a>
            </div>
            <div className="flex-1 hidden lg:block" />
            <a href="mailto:studio@genreless.media" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`mb-2 font-sans text-sm underline-offset-2 hover:underline hover:text-[#fe2e2e] text-${textColor}`}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile Logo - shown at bottom on mobile only */}
      <div className="flex lg:hidden justify-start items-center px-4">
        <div className="relative w-32 h-16">
          <Image src="/images/g.M_logo.png" alt="g.M logo" fill className="object-contain" />
        </div>
      </div>
    </footer>
  );
}
