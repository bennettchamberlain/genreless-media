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
    <div className="relative bg-[#e5e7e6]">
      <div className="fixed top-0 left-4 h-8 w-[200px] z-50">
        <Image
          src="/images/g.M_logo.png"
          alt="g.M Logo"
          fill
          className="object-contain select-none brightness-0 object-left"
          priority
          draggable={false}
        />
      </div>
      <header 
        className={`fixed z-40 h-10 inset-0 flex items-center transition-all duration-500
          ${true ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
        `}
        style={{ background: '#e5e7e6' }}
      >
        <div className="w-full pl-4 pr-4">
          <div className="flex items-center justify-end w-full">
            <div className="flex flex-col lg:basis-1/6 px-2">
              <div className="flex-1" />
            </div>

            <div className="flex flex-col lg:basis-1/6 px-2 items-end">
              <div className="flex-1" />
              <Link href="/archive" className="text-s font-semibold hover:underline" >
                Archive
              </Link>
            </div>

            <div className="flex flex-col lg:basis-1/6 px-2 items-end">
              <div className="flex-1" />
              <Link href="/info" className="text-s font-semibold hover:underline" >
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
          <div className="text-[2.2rem] md:text-[2.8rem] leading-snug font-sans font-normal text-[#091ebc]" style={{ wordBreak: 'break-word' }}>
            ✺ genreless Media is a production company founded by <a href="https://www.instagram.com/jackierad/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Jackie Radinsky</a> in Los Angeles, with roots worldwide. It was conceived out of a reverence for humanity, art, and nature.<br /><br />
            💡 We create music videos, commercials / campaigns, documentaries, <Link href="/archive" className="underline hover:opacity-80">zines</Link>, + anything in between - from the ground up. We&apos;re firm believers in the power of <span className="italic">sincere</span> art to connect community & spark a brighter future.<br /><br />
            🪡 Our team handles every aspect of production with precise care tailored to your project&apos;s needs. Reach out today to discuss how we can bring your vision to life ↓<br /><br />
            <EnvelopeIcon />
            <a href="mailto:studio@genreless.media" className="underline hover:opacity-80">studio@genreless.media</a>
          </div>
        </main>
        <div className="absolute right-6 bottom-6 text-[#091ebc] text-base md:text-lg font-sans">
          *also on{' '}
          <a href="https://www.are.na/genreless-media" className="underline hover:opacity-80" target="_blank" rel="noopener noreferrer">are.na</a>,{' '}
          <a href="https://www.instagram.com/genreless.media/" className="underline hover:opacity-80" target="_blank" rel="noopener noreferrer">instagram</a>,{' '}
          <a href="https://open.spotify.com/user/31w3k2w3k2w3k2w3k2w3k2w3k2w3k2w3" className="underline hover:opacity-80" target="_blank" rel="noopener noreferrer">spotify</a> &{' '}
          <a href="https://www.youtube.com/@genrelessmedia" className="underline hover:opacity-80" target="_blank" rel="noopener noreferrer">youtube</a>
        </div>
        <Footer backgroundColor="#091ebc" textColor="white" />
      </div>
    </div>
  );
}
