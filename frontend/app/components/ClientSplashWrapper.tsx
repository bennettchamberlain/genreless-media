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
        {/* Render children in background for preloading */}
        <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', zIndex: 0 }}>
          {children}
        </div>
        <SplashScreen onFinish={handleFinishSplash} />
      </>
    );
  }

  return <>{children}</>;
} 