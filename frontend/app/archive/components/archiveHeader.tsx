'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CartIndicator from "../../components/CartIndicator";

export default function ArchiveHeader() {
  const pathname = usePathname();

  return (
    <header 
      className="fixed z-50 h-16 inset-0 flex items-center transition-all duration-500 font-['Helvetica'] bg-[#0d0d0d]"
    >
      {/* Logo in top-left corner */}
      <div className="fixed top-5 left-4 h-8 w-16 md:w-50 z-[110]">
        <Link href="/">
          {/* Mobile logo */}
          <Image
            src="/images/genrelogo_small.png"
            alt="g.M Logo"
            fill
            sizes="(max-width: 768px) 64px, 200px"
            className="object-contain select-none brightness-0 invert object-left md:hidden"
            priority
            draggable={false}
          />
          {/* Desktop logo */}
          <Image
            src="/images/g.M_logo.png"
            alt="g.M Logo"
            fill
            sizes="(max-width: 768px) 64px, 200px"
            className="object-contain select-none brightness-0 invert object-left hidden md:block"
            priority
            draggable={false}
          />
        </Link>
      </div>

      <div className="w-full pl-4 pr-4 relative z-[120]">
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
              className={`text-s hover:underline text-right text-white relative z-[130] ${
                pathname === '/archive' ? 'underline' : ''
              }`} 
            >
              Archive
            </Link>
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2">
            <div className="flex-1" />
            <Link 
              href="/products" 
              className={`text-s hover:underline text-right text-white relative z-[130] ${
                pathname === '/products' ? 'underline' : ''
              }`} 
            >
              Shop
              <CartIndicator />
            </Link>
          </div>

          <div className="flex flex-col lg:basis-1/6 px-2">
            <div className="flex-1" />
            <Link 
              href="/info" 
              className={`text-s hover:underline text-right text-white relative z-[130] ${
                pathname === '/info' ? 'underline' : ''
              }`} 
            >
              Info
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}