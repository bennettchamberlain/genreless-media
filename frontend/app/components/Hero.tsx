import Link from "next/link";
import LogoOverlay from "./LogoOverlay";

export default function Hero() {
  return (
    <div className="w-full h-screen relative bg-[#dadad6] overflow-hidden">
      {/* Video in top right */}
      <div className="absolute top-0 right-0 z-20 shadow-xl overflow-hidden" style={{ width: 1280, height: 720 }}>
        <iframe
          src="https://player.vimeo.com/video/1092616169?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
          width="1280"
          height="720"
          className="block w-full h-full"
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