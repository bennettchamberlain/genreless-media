import Footer from "@/app/components/Footer";
import InfoHeader from "../components/InfoHeader";

export default function InfoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#dadad6]">
      <InfoHeader />
      <div className="flex-1 flex flex-col" style={{ position: "relative", paddingTop: "50px" }}>
        <main className="max-w-6xl mx-auto px-4 pt-8 pb-48 flex-1">
          <div className="text-[1.6rem] md:text-[2.5rem] leading-snug font-[Helvetica] font-normal text-[#1a21a5]" style={{ wordBreak: 'break-word', transform: 'scaleY(1.14)', transformOrigin: 'left top' }}>
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
