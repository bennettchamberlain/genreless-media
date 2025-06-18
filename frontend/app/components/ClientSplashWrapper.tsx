'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SplashScreen = dynamic(() => import('./SplashScreen'), { ssr: false });

export default function ClientSplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    setShowSplash(hasSeenSplash !== 'true');
    setIsLoading(false);
  }, []);

  const handleFinishSplash = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasSeenSplash', 'true');
  };

  if (isLoading) {
    return null;
  }

  if (showSplash) {
    return (
      <>
        <SplashScreen onFinish={handleFinishSplash} />
        {/* Hidden iframe to preload the video */}
        <div style={{ position: 'absolute', opacity: 1, pointerEvents: 'none', zIndex: 1 }}>
          <iframe
            src="https://player.vimeo.com/video/1092616169?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            width="1280"
            height="720"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>
      </>
    );
  }

  return <>{children}</>;
} 