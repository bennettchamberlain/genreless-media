'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const SplashScreen = dynamic(() => import('./SplashScreen'), { ssr: false });

export default function ClientSplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  const handleFinishSplash = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleFinishSplash} />;
  }

  return <>{children}</>;
} 