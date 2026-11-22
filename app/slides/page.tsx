'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Printer,
  Grid,
  Home,
  BookOpen,
} from 'lucide-react';

export default function SlidesPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFS = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFS);
    return () => document.removeEventListener('fullscreenchange', handleFS);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1714] text-[#E5D5C3] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-[#112621]/90 border-b border-[#2D5F54]/40 px-4 md:px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-[#16322C] border border-[#2B8C80]/40 text-[#FFF4EB] hover:bg-[#E85D36] hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Course Hub</span>
          </Link>
          <span className="text-[#516E5D]">/</span>
          <span className="text-xs font-mono font-bold tracking-wider text-[#F5C26B] uppercase flex items-center gap-1.5">
            <span>🌲</span> Trail Slides (National Park Theme)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/slides.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#A89F94] hover:text-[#FFF4EB] px-2.5 py-1 rounded transition-colors hidden sm:inline-block"
            title="Open direct standalone HTML file in new tab"
          >
            Open Standalone ↗
          </a>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-[#16322C] border border-[#2B8C80]/40 text-[#FFF4EB] hover:bg-[#E85D36] transition-colors"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </header>

      {/* Embedded Slide Presentation Frame */}
      <main className="flex-1 w-full relative">
        <iframe
          ref={iframeRef}
          src="/slides.html"
          className="w-full h-[calc(100vh-3.5rem)] border-none"
          title="Classification in Machine Learning Trail Presentation"
          allow="fullscreen"
        />
      </main>
    </div>
  );
}
