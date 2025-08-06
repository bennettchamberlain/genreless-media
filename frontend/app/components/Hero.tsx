import Link from "next/link";
import LogoOverlay from "./LogoOverlay";

export default function Hero() {
  return (
    <div className="w-full min-h-[80vh] md:min-h-[75vh] relative bg-[#dadad6] pt-16">
      {/* Video container - responsive positioning with max width constraint */}
      <div className="w-full h-full min-h-[calc(80vh-4rem)] md:min-h-[calc(75vh-4rem)] px-0 md:px-8 py-12 max-w-7xl mx-auto">
        {/* Mobile layout - stacked */}
        <div className="md:hidden flex flex-col items-center space-y-8">
          {/* Video on mobile */}
          <div className="w-full">
            <iframe
              src="https://player.vimeo.com/video/1092616169?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&playsinline=1"
              className="block w-full h-auto aspect-video"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ border: 'none' }}
            />
          </div>
          
          {/* Text below video on mobile */}
          <div className="w-full max-w-sm px-4">
            <div className="text-[#000000] text-lg leading-relaxed space-y-4 font-['Helvetica']" style={{ transform: 'scaleY(1.2)', transformOrigin: 'left top' }}>
              <p className="mb-4">
                Our specialties include creative direction, holistic release rollouts, photography, and commercial productions.
              </p>
              <p>
                With every project we bring a hands-on, intentional approach to each stage of the process.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop layout - overlapping */}
        <div className="hidden md:block relative w-full h-full flex items-center">
          {/* Video with responsive positioning */}
          <div className="w-full max-w-4xl ml-auto">
            <iframe
              src="https://player.vimeo.com/video/1092616169?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&playsinline=1"
              className="block w-full h-auto aspect-video"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ border: 'none' }}
            />
          </div>

          {/* Responsive overlapping blue text - moved up more */}
          <div className="absolute top-1/5 left-8 md:left-16 lg:left-24 xl:left-32 z-10 max-w-sm md:max-w-md lg:max-w-lg" style={{ mixBlendMode: 'difference' }}>
            <div className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed space-y-4 md:space-y-6 font-['Helvetica']" style={{ transform: 'scaleY(1.2)', transformOrigin: 'left top',}}>
              <p className="mb-4 md:mb-6">
                Our specialties include creative direction, holistic release rollouts, photography, and commercial productions.
              </p>
              <p>
                With every project we bring a hands-on, intentional approach to each stage of the process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logo overlay */}
      <LogoOverlay />
    </div>
  );
} 