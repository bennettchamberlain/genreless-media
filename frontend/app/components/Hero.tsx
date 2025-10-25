"use client";

import Link from "next/link";
import LogoOverlay from "./LogoOverlay";
import { useState } from "react";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full min-h-[80vh] md:min-h-[75vh] relative bg-[#dadad6] pt-16">
      {/* Video container - responsive positioning with max width constraint */}
      <div className="w-full h-full min-h-[calc(80vh-4rem)] md:min-h-[calc(75vh-4rem)] px-0 md:px-8 pt-12 pb-12 md:pb-38 max-w-7xl mx-auto">
        {/* Mobile layout - stacked */}
        <div className="md:hidden flex flex-col items-center space-y-8">
          {/* Video on mobile */}
          <div className="w-full relative bg-black">
            <iframe
              src={`https://player.vimeo.com/video/1092616169?background=1&autoplay=1&loop=1&byline=0&title=0&muted=${isMuted ? 1 : 0}&controls=0&playsinline=1`}
              className="block w-full h-auto aspect-video"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ border: 'none' }}
            />
            {/* Volume control button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 z-20"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          </div>
          
          {/* Text below video on mobile */}
          <div className="w-full max-w-full px-4">
            <div className="text-[#000000] text-xl max-w-lg leading-relaxed space-y-4 font-['Helvetica'] text-left" style={{ transform: 'scaleY(1.2)', transformOrigin: 'left top' }}>
              <p className="mb-4">
                Our specialties include creative direction, holistic release rollouts, photography, and commercial productions.
              </p>
              <p className="mb-6">
                With every project we bring a hands-on, intentional approach to each stage of the process.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop layout - overlapping */}
        <div className="hidden md:block relative w-full h-full flex items-center">
          {/* Video with responsive positioning */}
          <div className="w-full max-w-4xl ml-auto relative bg-black">
            <iframe
              src={`https://player.vimeo.com/video/1092616169?background=1&autoplay=1&loop=1&byline=0&title=0&muted=${isMuted ? 1 : 0}&controls=0&playsinline=1`}
              className="block w-full h-auto aspect-video"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ border: 'none' }}
            />
            {/* Volume control button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 z-20"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Responsive overlapping blue text - moved up more */}
          <div className="absolute top-1/5 left-8 md:left-16 lg:left-24 xl:left-21 z-10 max-w-sm md:max-w-md lg:max-w-lg" style={{ mixBlendMode: 'difference' }}>
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