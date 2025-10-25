'use client';

import Link from "next/link";
import CartIndicator from "./CartIndicator";

export default function Header() {
  return (
    <header 
      className="fixed z-50 h-16 inset-0 flex items-center transition-all duration-500 font-['Helvetica'] bg-[#dadad6]"
    >
      <div className="w-full pl-4 pr-4 relative z-[60]">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col lg:basis-3/6 lg:max-w-[50%] ">
            {/* Empty for spacing */}
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2">
            <div className="flex-1" />
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2">
            <div className="flex-1" />
            <Link 
              href="/archive" 
              className="text-s hover:text-[#fe2e2e] hover:underline text-right text-black relative z-[70] cursor-pointer"
            >
              Archive
            </Link>
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2">
            <div className="flex-1" />
            <Link 
              href="/products" 
              className="text-s hover:text-[#fe2e2e] hover:underline text-right text-black relative z-[70] cursor-pointer"
            >
              Shop
              <CartIndicator />
            </Link>
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2">
            <div className="flex-1" />
            <Link 
              href="/info" 
              className="text-s hover:text-[#fe2e2e] hover:underline text-right text-black relative z-[70] cursor-pointer"
            >
              Info
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
