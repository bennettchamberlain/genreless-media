'use client';

import Link from "next/link";
import Image from "next/image";

export default function archiveHeader() {
  return (
    <div className="relative bg-[#0d0d0d]">
      <div className="fixed top-4 left-4 h-8 w-50 z-50">
        <Link href="/">
          <Image
            src="/images/g.M_logo.png"
            alt="g.M Logo"
            fill
            className="object-contain select-none brightness-100 object-left mix-blend-difference"
            priority
            draggable={false}
          />
        </Link>
      </div>
      <header 
        className={`fixed z-40 h-16 inset-0 flex items-center transition-all duration-500
          ${true ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
        `}
        style={{ background: '#0d0d0d' }}
      >
        <div className="w-full pl-4 pr-4">
          <div className="flex items-center justify-end w-full">
            <div className="flex flex-col lg:basis-1/6 px-2">
              <div className="flex-1" />
            </div>

            <div className="flex flex-col lg:basis-1/6 px-2 items-end">
              <div className="flex-1" />
              <Link href="/archive" className="text-s font-semibold hover:underline text-white" >
                Archive
              </Link>
            </div>

            <div className="flex flex-col lg:basis-1/6 px-2 items-end">
              <div className="flex-1" />
              <Link href="/info" className="text-s font-semibold hover:underline text-white" >
                Info
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}