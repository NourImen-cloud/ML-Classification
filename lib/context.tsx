'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { lessons } from '@/lib/data';

interface AppContextType {
  presenterMode: boolean;
  setPresenterMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentLesson: number;
  setCurrentLesson: React.Dispatch<React.SetStateAction<number>>;
  showNotes: boolean;
  setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({
  presenterMode: false,
  setPresenterMode: () => {},
  currentLesson: 0,
  setCurrentLesson: () => {},
  showNotes: false,
  setShowNotes: () => {},
});

export function useApp() { return useContext(AppContext); }

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [presenterMode, setPresenterMode] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentLesson(prev => Math.min(prev + 1, lessons.length));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentLesson(prev => Math.max(prev - 1, 0));
      }
      if (e.key === 'p' || e.key === 'P') {
        setPresenterMode(prev => !prev);
      }
      if (e.key === 'n' || e.key === 'N') {
        setShowNotes(prev => !prev);
      }
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <AppContext.Provider value={{
      presenterMode, setPresenterMode,
      currentLesson, setCurrentLesson,
      showNotes, setShowNotes,
    }}>
      {children}
    </AppContext.Provider>
  );
}
