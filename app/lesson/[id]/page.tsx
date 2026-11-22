'use client';

import { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  lessons,
  courseParts,
  courseSlides,
  formulaSheet,
  glossary,
  misconceptions,
  scikitLearnCode,
  courseMetadata,
} from '@/lib/data';
import Part1 from '@/components/lessons/Part1';
import Part2 from '@/components/lessons/Part2';
import Part3 from '@/components/lessons/Part3';
import Part4 from '@/components/lessons/Part4';
import Part5 from '@/components/lessons/Part5';
import { MathBlock } from '@/components/ui/KatexFormula';
import {
  BookOpen,
  Code,
  Maximize2,
  Minimize2,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  ListOrdered,
} from 'lucide-react';

const PARTS: Record<number, React.ComponentType> = {
  1: Part1,
  2: Part2,
  3: Part3,
  4: Part4,
  5: Part5,
};

function LessonInner() {
  const params = useParams();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<'goals' | 'formulas' | 'code' | 'glossary' | 'misconceptions' | 'slides' | null>(null);

  const rawId = parseInt(params.id as string, 10);
  
  // If user entered a slide ID (1..29) instead of part ID (1..5)
  const isSlideNumber = rawId > 5 && rawId <= 29;
  const targetPartId = isSlideNumber
    ? (courseSlides.find((s) => s.id === rawId)?.partId ?? 1)
    : Math.min(Math.max(1, rawId || 1), 5);

  const currentPart = courseParts.find((p) => p.id === targetPartId) || courseParts[0];
  const lesson = lessons.find((l) => l.id === targetPartId) || lessons[0];
  const prevPart = courseParts.find((p) => p.id === targetPartId - 1);
  const nextPart = courseParts.find((p) => p.id === targetPartId + 1);
  const PartComponent = PARTS[targetPartId] || Part1;

  // Scroll to slide if slide number was targeted
  useEffect(() => {
    if (isSlideNumber) {
      setTimeout(() => {
        const el = document.getElementById(`slide-${rawId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    }
  }, [isSlideNumber, rawId]);

  useEffect(() => {
    const onFS = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFS);
    return () => document.removeEventListener('fullscreenchange', onFS);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && nextPart) router.push(`/lesson/${nextPart.id}`);
      if (e.key === 'ArrowLeft' && prevPart) router.push(`/lesson/${prevPart.id}`);
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      }
      if (e.key === 'Home') router.push('/');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [nextPart, prevPart, router]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSlideJump = (slideNum: number) => {
    const slide = courseSlides.find((s) => s.id === slideNum);
    if (!slide) return;
    setActiveDrawer(null);
    if (slide.partId !== targetPartId) {
      router.push(`/lesson/${slide.partId}#slide-${slideNum}`);
    } else {
      const el = document.getElementById(`slide-${slideNum}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1020] flex flex-col bg-pixel-grid">
      {/* ─── Top Bar ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F0D6E2] shadow-xs">
        {/* Progress bar across 5 parts */}
        <div className="h-1 bg-[#FFF0F6] relative">
          <div
            className="absolute top-0 left-0 h-full transition-all duration-300"
            style={{
              width: `${(targetPartId / 5) * 100}%`,
              background: currentPart.color || '#FF2E7E',
            }}
          />
        </div>

        <div className="flex items-center justify-between px-3 md:px-6 py-2.5">
          {/* Left: Home + Breadcrumb */}
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <Link
              href="/"
              className="text-[#6D5970] hover:text-[#FF2E7E] transition-colors text-xs font-bold flex items-center gap-1 flex-shrink-0"
            >
              <span>←</span>
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <span className="text-[#F0D6E2]">/</span>
            <span
              className="font-pixel text-[11px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0"
              style={{ backgroundColor: currentPart.color }}
            >
              {currentPart.partNumber}
            </span>
            <span className="text-xs font-bold text-[#1A1020] hidden sm:inline truncate max-w-xs">
              {currentPart.title}
            </span>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FFF0F6] text-[#FF2E7E] border border-[#FFB8D2] flex-shrink-0">
              {currentPart.slidesRange}
            </span>
          </div>

          {/* Center: 5 Parts Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {courseParts.map((p) => {
              const isActive = p.id === targetPartId;
              return (
                <Link key={p.id} href={`/lesson/${p.id}`}>
                  <button
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      isActive
                        ? 'bg-[#1A1020] text-white shadow-xs'
                        : 'bg-[#FFF0F6] text-[#6D5970] hover:text-[#FF2E7E] hover:bg-[#FFE4EF]'
                    }`}
                  >
                    <span>{p.partNumber}</span>
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Right: Controls & Reference Drawers */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Quick Slide Index Drawer */}
            <button
              onClick={() => setActiveDrawer((v) => (v === 'slides' ? null : 'slides'))}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1 ${
                activeDrawer === 'slides'
                  ? 'bg-[#1A1020] text-white border-[#1A1020]'
                  : 'bg-white text-[#1A1020] border-[#F0D6E2] hover:border-[#FF2E7E]'
              }`}
              title="All 29 Slides Index"
            >
              <ListOrdered className="w-3.5 h-3.5 text-[#FF2E7E]" />
              <span className="hidden md:inline">29 Slides</span>
            </button>

            {/* Formulas Drawer */}
            <button
              onClick={() => setActiveDrawer((v) => (v === 'formulas' ? null : 'formulas'))}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-all ${
                activeDrawer === 'formulas'
                  ? 'bg-[#FF2E7E] text-white border-[#FF2E7E]'
                  : 'bg-white text-[#1A1020] border-[#F0D6E2] hover:border-[#FF2E7E]'
              }`}
            >
              Formulas
            </button>

            {/* Glossary Drawer */}
            <button
              onClick={() => setActiveDrawer((v) => (v === 'glossary' ? null : 'glossary'))}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-all hidden sm:inline-block ${
                activeDrawer === 'glossary'
                  ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                  : 'bg-white text-[#1A1020] border-[#F0D6E2] hover:border-[#8B5CF6]'
              }`}
            >
              Glossary
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-xs text-[#6D5970] hover:text-[#1A1020] rounded-lg border border-[#F0D6E2] hover:bg-[#FFF7FA] transition-colors"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Drawer Modal Panel ─── */}
      {activeDrawer && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div
            className="w-full max-w-xl bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-4 pt-16 border-l border-[#F0D6E2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F0D6E2]">
              <span className="font-pixel text-xs text-[#FF2E7E] uppercase font-bold tracking-wider">
                {activeDrawer === 'slides' && 'Complete 29 Slides Navigator'}
                {activeDrawer === 'formulas' && 'Course Mathematical Formulas (KaTeX)'}
                {activeDrawer === 'glossary' && 'Ten Core Terminology Concepts'}
                {activeDrawer === 'goals' && 'Curriculum Objectives & Checkpoints'}
                {activeDrawer === 'code' && 'Scikit-Learn Reference Implementation'}
              </span>
              <button
                onClick={() => setActiveDrawer(null)}
                className="text-xs font-bold text-[#6D5970] hover:text-[#1A1020] px-2.5 py-1 rounded bg-[#FFF0F6] hover:bg-[#FFE4EF]"
              >
                ✕ Close
              </button>
            </div>

            {/* Slides Navigator */}
            {activeDrawer === 'slides' && (
              <div className="space-y-4 text-xs">
                <p className="text-[#6D5970]">
                  Click any slide to jump directly to that slide in the presentation:
                </p>
                {courseParts.map((part) => (
                  <div key={part.id} className="space-y-1.5">
                    <span className="font-bold text-[#1A1020] font-mono text-xs block text-purple-900 bg-purple-50 p-2 rounded">
                      {part.partNumber} · {part.title} ({part.slidesRange})
                    </span>
                    <div className="grid grid-cols-1 gap-1 pl-2">
                      {courseSlides
                        .filter((s) => s.partId === part.id)
                        .map((s) => (
                          <button
                            key={s.id}
                            onClick={() => handleSlideJump(s.id)}
                            className="p-2 text-left rounded-lg hover:bg-[#FFF0F6] flex items-center justify-between border border-transparent hover:border-[#FFB8D2] transition-colors"
                          >
                            <span className="font-semibold text-gray-800">
                              Slide {s.slideNumber}: {s.title}
                            </span>
                            <span className="text-[10px] font-mono text-[#FF2E7E]">Jump →</span>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Formulas Sheet */}
            {activeDrawer === 'formulas' && (
              <div className="space-y-4 text-xs">
                <p className="text-[#6D5970]">
                  All mathematical definitions rendered rigorously with KaTeX:
                </p>
                <div className="space-y-3">
                  {formulaSheet.map((f, i) => (
                    <div key={i} className="p-3 bg-[#FFF7FA] rounded-xl border border-[#FFD6E5] space-y-1">
                      <span className="font-bold text-[#1A1020] block text-xs font-mono">{f.concept}</span>
                      <MathBlock formula={f.formula} />
                      <p className="text-[11px] text-[#6D5970]">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Glossary */}
            {activeDrawer === 'glossary' && (
              <div className="space-y-3 text-xs">
                <p className="text-[#6D5970]">
                  Ten fundamental terminology definitions from Slide 28:
                </p>
                <div className="space-y-2">
                  {glossary.map((g, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-[#F0D6E2] space-y-1">
                      <span className="font-bold text-[#FF2E7E] block font-mono text-xs">
                        {i + 1}. {g.term}
                      </span>
                      <p className="text-[#4A3B4E] leading-relaxed">{g.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Main Part Content ─── */}
      <main className="flex-1 pt-16 pb-28">
        <PartComponent />
      </main>

      {/* ─── Bottom Navigation Bar ─── */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#F0D6E2] px-4 md:px-8 py-3 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            {prevPart ? (
              <Link
                href={`/lesson/${prevPart.id}`}
                className="btn-white px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span>←</span>
                <span className="hidden sm:inline">{prevPart.partNumber}: {prevPart.title}</span>
                <span className="sm:hidden">Prev Part</span>
              </Link>
            ) : (
              <Link href="/" className="btn-white px-4 py-2 text-xs font-bold inline-flex items-center gap-1">
                <span>←</span>
                <span>Home</span>
              </Link>
            )}
          </div>

          <div className="text-center font-mono text-xs font-bold text-[#6D5970]">
            {currentPart.partNumber} ({currentPart.slidesRange}) · Part {targetPartId} of 5
          </div>

          <div>
            {nextPart ? (
              <Link
                href={`/lesson/${nextPart.id}`}
                className="btn-pink px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span className="hidden sm:inline">{nextPart.partNumber}: {nextPart.title}</span>
                <span className="sm:hidden">Next Part</span>
                <span>→</span>
              </Link>
            ) : (
              <Link
                href="/playground"
                className="btn-pink px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span>Interactive Playground</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-[#FF2E7E]">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-3 border-[#FF2E7E] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-pixel text-xs">Loading presentation part...</p>
          </div>
        </div>
      }
    >
      <LessonInner />
    </Suspense>
  );
}
