'use client';

import React, { useEffect, useState, useRef } from 'react';

const manifestoText = `we create timeless art that uplifts and sustains. we're deeply curious, rough around the edges, and united in our pursuit for meaningful connection`;
const roughText = 'rough around the edges';
const dots = '...';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [isDotsComplete, setIsDotsComplete] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const indexRef = useRef(0);
  const dotRef = useRef(0);
  const cursorIntervalRef = useRef<NodeJS.Timeout>();
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  const startDotsAnimation = () => {
    const dotSpeed = 630; // ms per dot (10% faster)
    let currentDot = 0;
    
    const animateDots = () => {
      if (currentDot < dots.length) {
        setDisplayed(manifestoText + dots.slice(0, currentDot + 1));
        currentDot++;
        animationTimeoutRef.current = setTimeout(animateDots, dotSpeed);
      } else {
        setIsTyping(false);
        setIsDotsComplete(true);
        // Button is already visible, no need to show it again
      }
    };
    
    animateDots();
  };

  const handleSkip = () => {
    if (!isSkipped) {
      setIsSkipped(true);
      
      // Clear ALL existing timeouts and intervals first
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
      
      // Set the full text immediately
      setDisplayed(manifestoText);
      setIsTyping(false);
      setShowCursor(true); // Keep cursor blinking
      setIsDotsComplete(false); // Start dots animation
      setShowButton(true); // Show button immediately
      
      // Restart cursor blinking
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      
      // Start the dots animation with a small delay to ensure state is set
      setTimeout(() => {
        startDotsAnimation();
      }, 50);
    }
  };


  useEffect(() => {
    if (isSkipped) return; // Don't start animation if already skipped
    
    indexRef.current = 0;
    dotRef.current = 0;
    setDisplayed('');
    setShowButton(false);
    setIsTyping(true);
    setShowCursor(true);
    setIsDotsComplete(false);

    // Cursor blink effect
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    // Variable typing speeds
    const getRandomTypeSpeed = () => {
      const baseSpeed = Math.floor(Math.random() * (54 - 27) + 27); // Random between 27-54ms (10% faster)
      
      // Get current character and its position
      const currentChar = manifestoText[indexRef.current];
      const isLastChar = indexRef.current === manifestoText.length - 1;
      const isFirstChar = indexRef.current === 0;
      
      // Add natural pauses for punctuation
      if (currentChar === '.' || currentChar === ',' || currentChar === ' ') {
        return baseSpeed + 90; // Longer pause for punctuation (10% faster)
      }
      
      // Add slight pause at the start
      if (isFirstChar) {
        return baseSpeed + 90; // 10% faster
      }
      
      // Add longer pause at the end
      if (isLastChar) {
        return baseSpeed + 135; // 10% faster
      }
      
      // Randomly add occasional longer pauses for natural rhythm
      if (Math.random() < 0.1) { // 10% chance
        return baseSpeed + 90; // 10% faster
      }
      
      return baseSpeed;
    };
    const dotSpeed = 630; // ms per dot (10% faster)

    function typeText() {
      if (indexRef.current < manifestoText.length) {
        setDisplayed(manifestoText.slice(0, indexRef.current + 1));
        indexRef.current++;
        animationTimeoutRef.current = setTimeout(typeText, getRandomTypeSpeed());
      } else {
        typeDots();
      }
    }

    function typeDots() {
      if (dotRef.current < dots.length) {
        setDisplayed(manifestoText + dots.slice(0, dotRef.current + 1));
        dotRef.current++;
        animationTimeoutRef.current = setTimeout(typeDots, dotSpeed);
      } else {
        setIsTyping(false);
        setIsDotsComplete(true);
        animationTimeoutRef.current = setTimeout(() => {
          setShowButton(true);
        }, 400);
      }
    }

    typeText();

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
    // eslint-disable-next-line
  }, [isSkipped]);

  function renderText() {
    const currentIndex = indexRef.current;
    const roughStartIndex = manifestoText.indexOf(roughText);
    const roughEndIndex = roughStartIndex + roughText.length;
    
    // Only show text up to current typing position
    const textToShow = displayed;
    
    if (currentIndex > roughStartIndex) {
      // We're either typing or have finished typing the rough text
      const beforeRough = textToShow.slice(0, roughStartIndex);
      const roughText = textToShow.slice(roughStartIndex, Math.min(currentIndex, roughEndIndex));
      const afterRough = currentIndex > roughEndIndex ? textToShow.slice(roughEndIndex) : '';
      
      return (
        <span style={{ 
          fontFamily: 'Helvetica', 
          fontWeight: 'normal', 
          display: 'inline-block',
          transform: 'scaleY(1.14)',
          transformOrigin: 'left top'
        }}>
          {beforeRough}
          <span style={{ fontFamily: 'Helvetica', fontStyle: 'italic', fontWeight: 'normal' }}>{roughText}</span>
          {afterRough}
          {showCursor && '|'}
        </span>
      );
    }
    
    return (
      <span style={{ 
        fontFamily: 'Helvetica', 
        fontWeight: 'normal',
        display: 'inline-block',
        transform: 'scaleY(1.14)',
        transformOrigin: 'left top'
      }}>
        {textToShow}
        {showCursor && '|'}
      </span>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-[#dadad6] pt-16 sm:pt-32 cursor-pointer" 
      style={{ minHeight: '100vh' }}
      onClick={handleSkip}
    >
      <div className="flex flex-row items-start text-left px-4 sm:px-0 ml-[0rem] sm:ml-[-5rem] md:ml-[-15rem] lg:ml-[-15rem] xl:ml-[-30rem]">
        <span className="text-2xl sm:text-4xl md:text-4xl font-medium text-[#1a21a5] leading-tight select-none" style={{minWidth: '2ch', width: '2ch', textAlign: 'right', fontFamily: 'Helvetica', fontWeight: 'normal', display: 'inline-block', transform: 'scaleY(1.14)', transformOrigin: 'left top'}}>&gt;</span>
        <span className="text-2xl sm:text-4xl md:text-4xl font-medium text-[#1a21a5] leading-tight whitespace-pre-line w-[20rem] sm:w-[30rem] md:w-[40rem] ml-2 block" style={{minHeight: '6rem', fontFamily: 'Helvetica', fontWeight: 'normal', display: 'inline-block', transform: 'scaleY(1.14)', transformOrigin: 'left top'}}>
          {renderText()}
        </span>
      </div>
      {showButton && (
        <div className="absolute inset-0 flex items-center justify-center mt-50 sm:mt-0 md:mt-0 lg:mt-40 xl:mt-50">
          <button
            className="text-5xl underline underline-offset-4 text-black transition-opacity duration-500 hover:text-[#fe2e2e] cursor-pointer"
            style={{ opacity: showButton ? 1 : 0 }}
            onClick={onFinish}
          >
            ENTER SITE
          </button>
        </div>
      )}
    </div>
  );
} 