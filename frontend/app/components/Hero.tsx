import Link from "next/link";
import LogoOverlay from "./LogoOverlay";

export default function Hero() {
  return (
    <div className="w-full h-[40vh] md:h-screen relative bg-[#dadad6] overflow-hidden">
      {/* Video - responsive positioning and sizing */}
      <div className="absolute top-0 left-0 w-full h-auto md:top-0 md:left-auto md:right-0 md:w-auto md:h-auto md:overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1092616169?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&playsinline=1"
          className="block w-full h-auto aspect-video md:w-[1280px] md:h-[720px]"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </div>
      {/* Logo overlay, now handled by its own component */}
      <LogoOverlay />
      {/* Background image overlay (optional, for effect) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* You can add a background image or overlay here if needed */}
      </div>
    </div>
  );
} 