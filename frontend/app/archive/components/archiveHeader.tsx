'use client';

import Link from "next/link";
import Image from "next/image";

export default function archiveHeader() {
  return (
    <div className="relative">
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
        className={`fixed z-40 h-16 inset-0 flex items-center transition-all duration-500 font-['Helvetica']
          ${true ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
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
              <Link href="/archive" className="text-s hover:underline text-right text-white">
                Archive
              </Link>
            </div>

            <div className="flex flex-col lg:basis-1/6 px-2 pt-2">
              <div className="flex-1" />
              <Link href="/products" className="text-s hover:underline text-right text-white">
                Shop
              </Link>
            </div>

            <div className="flex flex-col lg:basis-1/6 px-2 pt-2">
              <div className="flex-1" />
              <Link href="/info" className="text-s hover:underline text-right text-white">
                Info
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}