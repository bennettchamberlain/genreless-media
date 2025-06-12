import React from "react";

interface FooterProps {
  backgroundColor?: string;
  textColor?: string;
}

export default function Footer({ 
  backgroundColor = "#091ebc",
  textColor = "white"
}: FooterProps) {
  return (
    <footer style={{ backgroundColor }} className="p-0 relative overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row justify-between items-stretch min-h-[180px]">
        {/* Column 1 */}
        <div className="flex flex-col lg:basis-4/6 lg:max-w-[66%] mb-0 h-full px-2">
          <div className="flex flex-col h-full py-1 min-h-[180px]">
            <span className={`font-sans text-xs mb-4 mt-2 ml-2 text-${textColor} italic`}>pare down to the essence, <br></br>but don't remove the poetry...</span>
            <div className="flex-1 hidden lg:block" />
            <div className="flex items-end w-full justify-start mt-2">
              <img src="/images/g.M_logo.png" alt="g.M logo" width={208} height={208} className="align-bottom hidden lg:block" />
              <img src="/images/g.M_logo.png" alt="g.M logo" width={48} className="align-bottom block lg:hidden" />
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
