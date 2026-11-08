'use client';

import { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { lessons, formulaSheet, glossary, misconceptions, scikitLearnCode } from '@/lib/data';
import Part1 from '@/components/lessons/Part1';
import Part2 from '@/components/lessons/Part2';
import Part3 from '@/components/lessons/Part3';
import Part4 from '@/components/lessons/Part4';
import Part5 from '@/components/lessons/Part5';
import Part6 from '@/components/lessons/Part6';
import Part7 from '@/components/lessons/Part7';
import Part8 from '@/components/lessons/Part8';
import Part9 from '@/components/lessons/Part9';
import Part10 from '@/components/lessons/Part10';
import Part11 from '@/components/lessons/Part11';

const PARTS: Record<number, React.ComponentType> = {
  1: Part1,
  2: Part2,
  3: Part3,
  4: Part4,
  5: Part5,
  6: Part6,
  7: Part7,
  8: Part8,
  9: Part9,
  10: Part10,
  11: Part11,
};

function LessonInner() {
  const params = useParams();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<'goals' | 'formulas' | 'code' | 'glossary' | 'misconceptions' | null>(null);

  const id = parseInt(params.id as string, 10);
  const lesson = lessons.find((l) => l.id === id);
  const prev = lessons.find((l) => l.id === id - 1);
  const next = lessons.find((l) => l.id === id + 1);
  const Part = PARTS[id];

  // Progress across 120 total minutes
  const minutesBefore = lessons.slice(0, id - 1).reduce((s, l) => s + l.duration, 0);
  const totalProgress = minutesBefore / 120;
  const segmentProgress = (lesson?.duration ?? 0) / 120;

  useEffect(() => {
    const onFS = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFS);
    return () => document.removeEventListener('fullscreenchange', onFS);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next && router.push(`/lesson/${next.id}`);
      if (e.key === 'ArrowLeft') prev && router.push(`/lesson/${prev.id}`);
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      }
      if (e.key === 'Home') router.push('/');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [id, next, prev, router]);

  if (!lesson || !Part) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <div className="font-pixel text-4xl text-[#FF2E7E]">404</div>
          <p className="text-[#6D5970] text-sm">Module not found</p>
          <Link href="/" className="inline-block btn-pink px-4 py-2 text-xs">
            Return to curriculum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1A1020] flex flex-col bg-pixel-grid">
      {/* ─── Top Bar ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F0D6E2] shadow-sm">
        {/* Progress bar */}
        <div className="h-1 bg-[#FFF0F6] relative">
          <div
            className="absolute top-0 left-0 h-full transition-all duration-300"
            style={{
              width: `${(totalProgress + segmentProgress) * 100}%`,
              background: '#FF2E7E',
            }}
          />
        </div>

        <div className="flex items-center justify-between px-3 md:px-6 py-2.5">
          {/* Left: Home + Breadcrumb */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/"
              className="text-[#6D5970] hover:text-[#FF2E7E] transition-colors text-xs font-bold flex items-center gap-1"
            >
              <span>←</span>
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <span className="text-[#F0D6E2]">/</span>
            <span className="font-pixel text-[11px] font-bold text-[#FF2E7E]">
              M{lesson.module.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold text-[#1A1020] hidden lg:inline truncate max-w-xs">
              {lesson.title}
            </span>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FFF0F6] text-[#FF2E7E] border border-[#FFB8D2]">
              S{lesson.session} · STAGE {lesson.stage}
            </span>
          </div>

          {/* Center: Module indicator dots */}
          <div className="flex items-center gap-1 md:gap-1.5 overflow-x-auto py-1">
            {lessons.map((l) => (
              <Link key={l.id} href={`/lesson/${l.id}`}>
                <div
                  className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all duration-200 cursor-pointer"
                  title={`Module ${l.module}: ${l.title}`}
                  style={{
                    backgroundColor: l.id === id ? '#FF2E7E' : l.id < id ? '#1A1020' : '#F0D6E2',
                    transform: l.id === id ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Right: Controls & Reference Drawers */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <button
              onClick={() => setActiveDrawer((v) => (v === 'goals' ? null : 'goals'))}
              className={`px-2.5 py-1 rounded-full border text-xs font-semibold transition-colors ${
                activeDrawer === 'goals'
                  ? 'bg-[#FF2E7E] text-white border-[#FF2E7E]'
                  : 'border-[#F0D6E2] text-[#6D5970] hover:border-[#FF2E7E] hover:text-[#FF2E7E]'
              }`}
            >
              Goal
            </button>
            <button
              onClick={() => setActiveDrawer((v) => (v === 'formulas' ? null : 'formulas'))}
              className={`px-2.5 py-1 rounded-full border text-xs font-semibold transition-colors hidden sm:inline ${
                activeDrawer === 'formulas'
                  ? 'bg-[#FF2E7E] text-white border-[#FF2E7E]'
                  : 'border-[#F0D6E2] text-[#6D5970] hover:border-[#FF2E7E] hover:text-[#FF2E7E]'
              }`}
            >
              Formulas
            </button>
            <button
              onClick={() => setActiveDrawer((v) => (v === 'code' ? null : 'code'))}
              className={`px-2.5 py-1 rounded-full border text-xs font-semibold transition-colors hidden md:inline ${
                activeDrawer === 'code'
                  ? 'bg-[#FF2E7E] text-white border-[#FF2E7E]'
                  : 'border-[#F0D6E2] text-[#6D5970] hover:border-[#FF2E7E] hover:text-[#FF2E7E]'
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setActiveDrawer((v) => (v === 'glossary' ? null : 'glossary'))}
              className={`px-2.5 py-1 rounded-full border text-xs font-semibold transition-colors hidden lg:inline ${
                activeDrawer === 'glossary'
                  ? 'bg-[#FF2E7E] text-white border-[#FF2E7E]'
                  : 'border-[#F0D6E2] text-[#6D5970] hover:border-[#FF2E7E] hover:text-[#FF2E7E]'
              }`}
            >
              Glossary
            </button>
            <button
              onClick={() => {
                if (!document.fullscreenElement) document.documentElement.requestFullscreen();
                else document.exitFullscreen();
              }}
              className="px-2.5 py-1 rounded-full border border-[#F0D6E2] text-xs font-semibold text-[#6D5970] hover:border-[#FF2E7E] hover:text-[#FF2E7E] transition-colors"
            >
              {isFullscreen ? 'Exit' : 'Full'}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Top Drawer Panes ─── */}
      {activeDrawer && (
        <div className="fixed top-12 left-0 right-0 z-40 bg-[#FFF7FA] border-b border-[#F0D6E2] px-6 py-4 shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-2">
              <span className="font-pixel text-xs text-[#FF2E7E] font-bold uppercase tracking-wider">
                {activeDrawer === 'goals' && `Module ${lesson.module} Objectives & Stage Checkpoint`}
                {activeDrawer === 'formulas' && 'Appendix A · Formula Reference Sheet'}
                {activeDrawer === 'code' && 'Appendix B · Complete Lesson in Scikit-Learn'}
                {activeDrawer === 'glossary' && 'Appendix C · Terminology Glossary'}
                {activeDrawer === 'misconceptions' && 'Part 5 · Common Misconceptions'}
              </span>
              <button
                onClick={() => setActiveDrawer(null)}
                className="text-xs font-bold text-[#6D5970] hover:text-[#1A1020] px-2 py-1 rounded hover:bg-white"
              >
                ✕ Close
              </button>
            </div>

            {/* Goals Content */}
            {activeDrawer === 'goals' && (
              <div className="space-y-3 text-xs md:text-sm text-[#4A3B4E]">
                <div className="p-3 bg-white rounded-xl border border-[#F0D6E2]">
                  <span className="font-bold text-[#1A1020] block mb-1">Learning Goal:</span>
                  <p>{lesson.learningGoal}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#FFB8D2] space-y-1">
                  <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold block">
                    STAGE {lesson.stage} CHECKPOINT QUESTION
                  </span>
                  <p className="font-semibold text-[#1A1020]">{lesson.stageQuestion}</p>
                </div>
              </div>
            )}

            {/* Formulas Content */}
            {activeDrawer === 'formulas' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {formulaSheet.map((f, i) => (
                  <div key={i} className="p-3 bg-white rounded-xl border border-[#F0D6E2] space-y-1">
                    <span className="font-bold text-[#1A1020] block">{f.concept}</span>
                    <div className="font-mono text-[#96003B] bg-[#FFF0F6] px-2 py-1 rounded">
                      {f.formula}
                    </div>
                    <p className="text-[11px] text-[#6D5970]">{f.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Code Content */}
            {activeDrawer === 'code' && (
              <div className="space-y-2">
                <p className="text-xs text-[#6D5970]">
                  Production pipeline implementing stratified split, training-only scaling, KNN, Logistic Regression thresholding, and confusion matrix:
                </p>
                <pre className="p-4 bg-[#1A1020] text-[#F0D6E2] rounded-xl text-xs font-mono overflow-x-auto">
                  {scikitLearnCode}
                </pre>
              </div>
            )}

            {/* Glossary Content */}
            {activeDrawer === 'glossary' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {glossary.map((g, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-xl border border-[#F0D6E2]">
                    <span className="font-bold text-[#FF2E7E] block">{g.term}</span>
                    <p className="text-[#4A3B4E]">{g.meaning}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Main Lesson Content ─── */}
      <main className="flex-1 pt-16 pb-28">
        <Part />
      </main>

      {/* ─── Bottom Navigation Bar ─── */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#F0D6E2] px-4 md:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            {prev ? (
              <Link
                href={`/lesson/${prev.id}`}
                className="btn-white px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span>←</span>
                <span className="hidden sm:inline">M{prev.module}: {prev.title}</span>
                <span className="sm:hidden">Prev</span>
              </Link>
            ) : (
              <Link href="/" className="btn-white px-4 py-2 text-xs font-bold inline-flex items-center gap-1">
                <span>←</span>
                <span>Home</span>
              </Link>
            )}
          </div>

          <div className="text-center font-mono text-xs font-bold text-[#6D5970]">
            Module {id} of {lessons.length}
          </div>

          <div>
            {next ? (
              <Link
                href={`/lesson/${next.id}`}
                className="btn-pink px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span className="hidden sm:inline">M{next.module}: {next.title}</span>
                <span className="sm:hidden">Next</span>
                <span>→</span>
              </Link>
            ) : (
              <Link
                href="/playground"
                className="btn-pink px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span>Open Playground</span>
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
            <p className="font-pixel text-xs">Loading module...</p>
          </div>
        </div>
      }
    >
      <LessonInner />
    </Suspense>
  );
}
