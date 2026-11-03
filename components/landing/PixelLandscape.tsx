'use client';

import React from 'react';

export default function PixelLandscape() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Pixel Clouds in Sky */}
      {/* Cloud Left */}
      <svg
        className="absolute top-10 left-[8%] w-24 md:w-32 opacity-80"
        viewBox="0 0 48 20"
        shapeRendering="crispEdges"
      >
        <rect x="12" y="4" width="24" height="4" fill="#FFFFFF" />
        <rect x="8" y="8" width="32" height="4" fill="#FFFFFF" />
        <rect x="4" y="12" width="40" height="4" fill="#FFFFFF" />
        <rect x="4" y="16" width="40" height="2" fill="#FFE4EF" />
        {/* Soft shadow outline */}
        <rect x="12" y="2" width="24" height="2" fill="#F0D6E2" />
      </svg>

      {/* Cloud Right */}
      <svg
        className="absolute top-14 right-[10%] w-28 md:w-36 opacity-75"
        viewBox="0 0 48 20"
        shapeRendering="crispEdges"
      >
        <rect x="14" y="4" width="20" height="4" fill="#FFFFFF" />
        <rect x="8" y="8" width="32" height="4" fill="#FFFFFF" />
        <rect x="4" y="12" width="40" height="4" fill="#FFFFFF" />
        <rect x="4" y="16" width="40" height="2" fill="#FFE4EF" />
      </svg>

      {/* Pixel Heart Left */}
      <svg className="absolute top-28 left-[22%] w-5 h-5 text-[#FF2E7E]" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 5h3v2H2zM5 3h2v2H5zM7 3h2v2H7zM9 3h2v2H9zM11 5h3v2h-3zM2 7h12v3H2zM4 10h8v2H4zM6 12h4v2H6z" />
      </svg>

      {/* Pixel Sparkle Right */}
      <svg className="absolute top-32 right-[20%] w-6 h-6 text-[#FF2E7E] animate-pulse" viewBox="0 0 16 16" fill="currentColor">
        <path d="M7 1h2v14H7zM1 7h14v2H1zM5 5h6v6H5z" />
      </svg>

      {/* Left Landscape Island with Pixel Trees */}
      <div className="absolute bottom-16 -left-6 md:left-2 w-48 md:w-72">
        <svg viewBox="0 0 120 70" className="w-full" shapeRendering="crispEdges">
          {/* Tree 1 (Big) */}
          <rect x="22" y="8" width="20" height="6" fill="#FF85B3" />
          <rect x="16" y="14" width="32" height="18" fill="#FF2E7E" />
          <rect x="20" y="16" width="6" height="6" fill="#FFA3C4" />
          <rect x="28" y="32" width="8" height="14" fill="#96003B" />

          {/* Tree 2 (Small) */}
          <rect x="4" y="20" width="14" height="4" fill="#FF85B3" />
          <rect x="2" y="24" width="18" height="12" fill="#FF2E7E" />
          <rect x="8" y="36" width="6" height="10" fill="#96003B" />

          {/* Island Ground */}
          <rect x="0" y="44" width="90" height="6" fill="#FF2E7E" />
          <rect x="2" y="50" width="84" height="4" fill="#E31666" />
          <rect x="6" y="54" width="72" height="4" fill="#96003B" />
          <rect x="12" y="58" width="56" height="4" fill="#1A1020" />
          <rect x="20" y="62" width="36" height="3" fill="#1A1020" />
        </svg>
      </div>

      {/* Right Landscape Hill with Flag */}
      <div className="absolute bottom-16 -right-6 md:right-2 w-48 md:w-72">
        <svg viewBox="0 0 120 70" className="w-full" shapeRendering="crispEdges">
          {/* Flagpole & Flag */}
          <rect x="88" y="4" width="2" height="26" fill="#1A1020" />
          <polygon points="90,4 104,9 90,14" fill="#FF2E7E" />

          {/* Hill Slope */}
          <rect x="74" y="16" width="30" height="8" fill="#FFA3C4" />
          <rect x="66" y="24" width="46" height="10" fill="#FF85B3" />
          <rect x="56" y="34" width="60" height="10" fill="#FF2E7E" />

          {/* Base Island */}
          <rect x="30" y="44" width="90" height="6" fill="#FF2E7E" />
          <rect x="34" y="50" width="82" height="4" fill="#E31666" />
          <rect x="42" y="54" width="70" height="4" fill="#96003B" />
          <rect x="52" y="58" width="54" height="4" fill="#1A1020" />
        </svg>
      </div>
    </div>
  );
}
