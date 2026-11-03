'use client';

import React from 'react';

export default function PixelMascot() {
  return (
    <div className="relative inline-block select-none animate-pixel-bob">
      {/* Pixel Speech Bubble */}
      <div className="absolute -top-7 -right-10 bg-white border-2 border-[#1A1020] rounded-xl px-2.5 py-1.5 shadow-sm flex items-center gap-1 z-20">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 4H4V2H6V4H8V2H10V4H12V7H10V9H8V11H6V9H4V7H2V4Z" fill="#FF2E7E" />
        </svg>
        <span className="font-pixel text-[9px] text-[#FF2E7E] font-bold">PIXEL-ML</span>
        {/* Pointer */}
        <div className="absolute -bottom-1.5 left-3 w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-[#1A1020] transform rotate-45" />
      </div>

      {/* Floating Sparkles */}
      <div className="absolute -top-4 -left-6 z-10 animate-pulse">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <rect x="7" y="1" width="2" height="14" fill="#FF2E7E" />
          <rect x="1" y="7" width="14" height="2" fill="#FF2E7E" />
          <rect x="5" y="5" width="6" height="6" fill="#FF85B3" />
        </svg>
      </div>
      <div className="absolute top-10 -right-8 z-10 animate-pulse" style={{ animationDelay: '0.8s' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="7" y="2" width="2" height="12" fill="#FF2E7E" />
          <rect x="2" y="7" width="12" height="2" fill="#FF2E7E" />
        </svg>
      </div>

      {/* Main Pixel Mascot Character (SVG pixel-grid) */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 32 32"
        className="w-36 h-36 md:w-44 md:h-44 drop-shadow-md"
        shapeRendering="crispEdges"
      >
        {/* Shadow */}
        <rect x="7" y="29" width="18" height="2" fill="#F0D6E2" />

        {/* Outer Dark Outline */}
        <rect x="10" y="5" width="12" height="2" fill="#1A1020" />
        <rect x="8" y="7" width="2" height="2" fill="#1A1020" />
        <rect x="22" y="7" width="2" height="2" fill="#1A1020" />
        <rect x="6" y="9" width="2" height="15" fill="#1A1020" />
        <rect x="24" y="9" width="2" height="15" fill="#1A1020" />

        {/* Bottom Wavy Ghost Outline */}
        <rect x="6" y="24" width="2" height="3" fill="#1A1020" />
        <rect x="8" y="27" width="3" height="2" fill="#1A1020" />
        <rect x="11" y="25" width="2" height="2" fill="#1A1020" />
        <rect x="13" y="27" width="3" height="2" fill="#1A1020" />
        <rect x="16" y="25" width="2" height="2" fill="#1A1020" />
        <rect x="18" y="27" width="3" height="2" fill="#1A1020" />
        <rect x="21" y="25" width="2" height="2" fill="#1A1020" />
        <rect x="23" y="27" width="3" height="2" fill="#1A1020" />

        {/* White Ghost Body Fill */}
        <rect x="10" y="7" width="12" height="2" fill="#FFFFFF" />
        <rect x="8" y="9" width="16" height="15" fill="#FFFFFF" />
        <rect x="8" y="24" width="3" height="3" fill="#FFFFFF" />
        <rect x="13" y="24" width="3" height="3" fill="#FFFFFF" />
        <rect x="18" y="24" width="3" height="3" fill="#FFFFFF" />
        <rect x="23" y="24" width="1" height="3" fill="#FFFFFF" />

        {/* Left Eye */}
        <rect x="10" y="13" width="4" height="6" fill="#1A1020" />
        <rect x="10" y="14" width="2" height="2" fill="#FF2E7E" />
        <rect x="12" y="16" width="2" height="3" fill="#FF85B3" />
        <rect x="10" y="13" width="2" height="1" fill="#FFFFFF" />

        {/* Right Eye */}
        <rect x="18" y="13" width="4" height="6" fill="#1A1020" />
        <rect x="18" y="14" width="2" height="2" fill="#FF2E7E" />
        <rect x="20" y="16" width="2" height="3" fill="#FF85B3" />
        <rect x="18" y="13" width="2" height="1" fill="#FFFFFF" />

        {/* Blush Cheeks */}
        <rect x="8" y="19" width="2" height="1" fill="#FFB8D2" />
        <rect x="22" y="19" width="2" height="1" fill="#FFB8D2" />

        {/* Little Cute Smile */}
        <rect x="15" y="19" width="2" height="1" fill="#1A1020" />
      </svg>
    </div>
  );
}
