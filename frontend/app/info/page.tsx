import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";

const blue = "#091ebc";


function EnvelopeIcon() {
  return (
    <span className="inline-block align-middle mr-2" aria-label="envelope">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke={blue} strokeWidth="2" fill="none" />
        <path d="M3 6l9 7 9-7" stroke={blue} strokeWidth="2" fill="none" />
      </svg>
    </span>
  );
}


const InfoHeader = () => {
  return (
    <div className="relative">
      <div className="fixed top-2 left-4 h-8 w-[200px] z-50" style={{ mixBlendMode: 'difference' }}>
        <Image
          src="/images/g.M_logo.png"
          alt="g.M Logo"
          fill
          className="object-contain select-none object-left overflow-hidden"
          priority
          draggable={false}
        />
      </div>
      <header 
        className={`fixed z-40 h-10 inset-0 flex items-center transition-all duration-500 mix-blend-difference
          ${true ? 'opacity-100 translate-y-0' : 'opacity-100 -translate-y-8'}
        `}
       
      >
        <div className="w-full pl-4 pr-4">
          <div className="flex items-center justify-end w-full">
            <div className="flex flex-col lg:basis-1/6 px-2">
              <div className="flex-1" />
            </div>

            <div className="flex flex-col pt-2 lg:basis-1/6 px-2 items-end">
              <div className="flex-1" />
              <Link href="/archive" className="text-s hover:text-[#fe2e2e] hover:invert hover:underline text-white " >
                Archive
              </Link>
            </div>

            <div className="flex flex-col pt-2 lg:basis-1/6 px-2 items-end">
              <div className="flex-1" />
              <Link href="/shop" className="text-s hover:text-[#fe2e2e] hover:invert hover:underline text-white " >
                Shop
              </Link>
            </div>

            <div className="flex flex-col pt-2 lg:basis-1/6 px-2 items-end">
              <div className="flex-1" />
              <Link href="/info" className="text-s hover:text-[#fe2e2e] hover:invert hover:underline text-white" >
                Info
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default function InfoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#e5e7e6]">
      <InfoHeader />
      <div style={{ position: "relative", paddingTop: "50px" }}>
        <main className="max-w-6xl mx-auto px-4 pt-8 pb-32">
          <div className="text-[2rem] md:text-[2.5rem] leading-snug font-[Helvetica] font-normal text-[#091ebc]" style={{ wordBreak: 'break-word', transform: 'scaleY(1.14)', transformOrigin: 'left top' }}>
            genreless media is a production company founded by <a href="https://www.instagram.com/jackierad/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#fe2e2e] transition-colors duration-200">Jackie Radinsky</a> in Los Angeles, with roots worldwide. It was conceived out of a reverence for humanity, ephemera, & nature.<br /><br />
            We create commercials, music videos, docs, physical products, + everything in between. We&apos;re firm believers in the power of <span className="italic">sincere</span> art to illuminate a brighter future and to tether community.<br /><br />
            You can reach us via <a href="mailto:studio@genreless.media" className="underline hover:text-[#fe2e2e] transition-colors duration-200">email</a>, and find us on <a href="https://www.are.na/genreless-media" className="underline hover:text-[#fe2e2e] transition-colors duration-200" target="_blank" rel="noopener noreferrer">are.na</a>, <a href="https://substack.com/@genrelessmedia" className="underline hover:text-[#fe2e2e] transition-colors duration-200" target="_blank" rel="noopener noreferrer">substack</a>, and <a href="https://www.youtube.com/@genrelessmedia" className="underline hover:text-[#fe2e2e] transition-colors duration-200" target="_blank" rel="noopener noreferrer">youtube</a>.
          </div>
        </main>
        <Footer backgroundColor="#1a21a5" textColor="white" />
      </div>
    </div>
  );
}
