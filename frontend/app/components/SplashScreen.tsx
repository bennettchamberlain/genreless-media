'use client';

import React, { useEffect, useState, useRef } from 'react';

const manifestoText = `we create timeless art that uplifts and sustains. we're deeply curious, rough around the edges, and united in our pursuit for meaningful connection.`;
const roughText = 'rough around the edges';
const dots = '.....';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const indexRef = useRef(0);
  const dotRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    dotRef.current = 0;
    setDisplayed('');
    setShowButton(false);
    setIsTyping(true);
    // Slower typing speeds
    const typeSpeed = 45; // ms per char
    const dotSpeed = 500; // ms per dot

    function typeText() {
      if (indexRef.current < manifestoText.length) {
        setDisplayed(manifestoText.slice(0, indexRef.current + 1));
        indexRef.current++;
        setTimeout(typeText, typeSpeed);
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
        setTimeout(() => setShowButton(true), 400);
      }
    }

    typeText();
    // eslint-disable-next-line
  }, []);

  // Remove italics from 'rough around the edges'
  function renderText() {
    return displayed;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-gray-50 pt-32" style={{ minHeight: '100vh' }}>
      <div className="flex flex-row items-start text-left ml-[-10rem]">
        <span className="text-3xl md:text-4xl font-medium text-[#091ebc] leading-tight select-none" style={{minWidth: '2ch', width: '2ch', textAlign: 'right'}}>&gt;</span>
        <span className="text-3xl md:text-4xl font-medium text-[#091ebc] leading-tight whitespace-pre-line w-[32rem] ml-2 block" style={{minHeight: '8.5rem'}}>
          {renderText()}
        </span>
      </div>
      {showButton && (
        <button
          className="mt-24 text-3xl underline underline-offset-4 text-black transition-opacity duration-500 ml-52 hover:text-[#091ebc]"
          style={{ opacity: showButton ? 1 : 0 }}
          onClick={onFinish}
        >
          ENTER SITE
        </button>
      )}
    </div>
  );
} 