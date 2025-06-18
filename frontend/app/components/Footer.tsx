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
      <div className="w-full flex flex-col lg:flex-row justify-between items-stretch h-[180px] min-h-[180px]">
        {/* Column 1 */}
        <div className="flex flex-col lg:basis-4/6 lg:max-w-[66%] min-h-[180px] h-[180px] mb-0 h-full pl-2">
          <div className="flex flex-col h-full py-1 min-h-[180px]">
            <span className={`font-sans text-xs mb-4 mt-2 ml-2 text-${textColor} italic`}>pare down to the essence, <br></br>but don&apos;t remove the poetry...</span>
            <div className="flex-1 hidden lg:block" />
            <div className="flex items-end w-full justify-start mt-2">
              <div className="relative w-[208px] h-[180px] hidden lg:block">
                <Image src="/images/g.M_logo.png" alt="g.M logo" fill className="object-contain" />
              </div>
              <div className="relative w-12 h-12 block lg:hidden">
                <Image src="/images/g.M_logo.png" alt="g.M logo" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col lg:basis-1/6 border-l border-white/30 px-2 mb-0 h-full">
          <div className="flex flex-col h-full py-1 min-h-[180px]">
            <div className={`font-sans text-xs mb-4 mt-2 text-${textColor}`}>Los Angeles, CA, USA</div>
            <div className="flex-1 hidden lg:block" />
            <div className={`font-sans text-xs mb-2 text-${textColor}`}>Creative Production Company</div>
          </div>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col lg:basis-1/6 border-l border-white/30 px-2 h-full">
          <div className="flex flex-col h-full py-1 min-h-[180px]">
            <div className={`font-sans text-xs mb-4 mt-2 text-${textColor}`}>
            <a href="https://www.instagram.com/genreless.media/" target="_blank" rel="noopener noreferrer" className={`mt-2 font-sans text-xs underline-offset-2 hover:underline text-${textColor}`}>Instagram</a>
            </div>
            <div className="flex-1 hidden lg:block" />
            <a href="mailto:studio@genreless.media" target="_blank" rel="noopener noreferrer" className={`mb-2 font-sans text-xs underline-offset-2 hover:underline text-${textColor}`}>Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
