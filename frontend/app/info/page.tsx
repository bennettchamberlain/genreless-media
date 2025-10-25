import Footer from "@/app/components/Footer";
import InfoHeader from "../components/InfoHeader";
import LogoMarquee from "../components/LogoMarquee";
import { allLogosQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

export default async function InfoPage() {
  const logos = await client.fetch(allLogosQuery);
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
        <div className="w-full bg-[#dadad6] pt-8 pb-4">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-xl font-[Helvetica] text-[#1a21a5] text-left">
              Partners
            </h3>
          </div>
        </div>
        <LogoMarquee logos={logos || []} backgroundColor="#dadad6" />
        <div className="border-t-1 border-[#575757]"></div>
        <Footer backgroundColor="#1a21a5" textColor="white" />
      </div>
    </div>
  );
}
