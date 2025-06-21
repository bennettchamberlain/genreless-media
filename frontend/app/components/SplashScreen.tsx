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
  const indexRef = useRef(0);
  const dotRef = useRef(0);
  const cursorIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
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
      const baseSpeed = Math.floor(Math.random() * (60 - 30) + 30); // Random between 30-60ms
      
      // Get current character and its position
      const currentChar = manifestoText[indexRef.current];
      const isLastChar = indexRef.current === manifestoText.length - 1;
      const isFirstChar = indexRef.current === 0;
      
      // Add natural pauses for punctuation
      if (currentChar === '.' || currentChar === ',' || currentChar === ' ') {
        return baseSpeed + 100; // Longer pause for punctuation
      }
      
      // Add slight pause at the start
      if (isFirstChar) {
        return baseSpeed + 100;
      }
      
      // Add longer pause at the end
      if (isLastChar) {
        return baseSpeed + 150;
      }
      
      // Randomly add occasional longer pauses for natural rhythm
      if (Math.random() < 0.1) { // 10% chance
        return baseSpeed + 100;
      }
      
      return baseSpeed;
    };
    const dotSpeed = 700; // ms per dot

    function typeText() {
      if (indexRef.current < manifestoText.length) {
        setDisplayed(manifestoText.slice(0, indexRef.current + 1));
        indexRef.current++;
        setTimeout(typeText, getRandomTypeSpeed());
      } else {
        typeDots();
      }
    }

    function typeDots() {
      if (dotRef.current < dots.length) {
        setDisplayed(manifestoText + dots.slice(0, dotRef.current + 1));
        dotRef.current++;
        setTimeout(typeDots, dotSpeed);
      } else {
        setIsTyping(false);
        setIsDotsComplete(true);
        setTimeout(() => {
          setShowButton(true);
        }, 400);
      }
    }

    typeText();

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
    // eslint-disable-next-line
  }, []);

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-[#dadad6] pt-16 sm:pt-32" style={{ minHeight: '100vh' }}>
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