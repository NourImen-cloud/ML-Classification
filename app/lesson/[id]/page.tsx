'use client';

import { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { lessons } from '@/lib/data';
import Part1 from '@/components/lessons/Part1';
import Part2 from '@/components/lessons/Part2';
import Part3 from '@/components/lessons/Part3';
import Part4 from '@/components/lessons/Part4';
import Part5 from '@/components/lessons/Part5';
import Part6 from '@/components/lessons/Part6';
import Part7 from '@/components/lessons/Part7';
import Part8 from '@/components/lessons/Part8';

const PARTS: Record<number, React.ComponentType> = {
  1: Part1, 2: Part2, 3: Part3, 4: Part4,
  5: Part5, 6: Part6, 7: Part7, 8: Part8,
};

function LessonInner() {
  const params = useParams();
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const id = parseInt(params.id as string, 10);
  const lesson = lessons.find(l => l.id === id);
  const prev = lessons.find(l => l.id === id - 1);
  const next = lessons.find(l => l.id === id + 1);
  const Part = PARTS[id];

  // Progress
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

        <div className="flex items-center justify-between px-4 md:px-6 py-2.5">
          {/* Left: Home + Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[#6D5970] hover:text-[#FF2E7E] transition-colors text-xs font-bold flex items-center gap-1"
            >
              <span>←</span>
              <span>Overview</span>
            </Link>
            <span className="text-[#F0D6E2]">/</span>
            <span className="font-pixel text-[11px] font-bold text-[#FF2E7E]">
              PART {lesson.part.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold text-[#1A1020] hidden sm:inline">
              {lesson.title}
            </span>
          </div>

          {/* Center: Module indicator dots */}
          <div className="flex items-center gap-1.5">
            {lessons.map(l => (
              <Link key={l.id} href={`/lesson/${l.id}`}>
                <div
                  className="w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer"
                  title={l.title}
                  style={{
                    backgroundColor: l.id === id ? '#FF2E7E' : l.id < id ? '#1A1020' : '#F0D6E2',
                    transform: l.id === id ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[#6D5970] text-xs font-mono font-medium hidden md:inline">
              {lesson.timeRange}
            </span>
            <button
              onClick={() => setShowSummary(v => !v)}
              className="px-2.5 py-1 rounded-full border border-[#F0D6E2] text-xs font-semibold text-[#6D5970] hover:border-[#FF2E7E] hover:text-[#FF2E7E] transition-colors"
            >
              {showSummary ? 'Hide Goals' : 'Module Goals'}
            </button>
            <button
              onClick={() => {
                if (!document.fullscreenElement) document.documentElement.requestFullscreen();
                else document.exitFullscreen();
              }}
              className="px-2.5 py-1 rounded-full border border-[#F0D6E2] text-xs font-semibold text-[#6D5970] hover:border-[#FF2E7E] hover:text-[#FF2E7E] transition-colors"
            >
              {isFullscreen ? 'Exit Full' : 'Fullscreen'}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Module Goals Drawer ─── */}
      {showSummary && (
        <div className="fixed top-12 left-0 right-0 z-40 bg-[#FFF7FA] border-b border-[#F0D6E2] px-6 py-4 shadow-md">
          <div className="max-w-4xl mx-auto flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold uppercase tracking-wider block">
                Learning Objectives
              </span>
              <p className="text-xs md:text-sm text-[#4A3B4E] leading-relaxed">
                {moduleObjectives[id] || 'Explore and master the technical foundations of this classification topic.'}
              </p>
            </div>
            <button
              onClick={() => setShowSummary(false)}
              className="text-xs font-bold text-[#6D5970] hover:text-[#1A1020]"
            >
              ✕ Close
            </button>
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
                <span className="hidden sm:inline">{prev.title}</span>
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
            Part {id} of {lessons.length}
          </div>

          <div>
            {next ? (
              <Link
                href={`/lesson/${next.id}`}
                className="btn-pink px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span className="hidden sm:inline">{next.title}</span>
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

const moduleObjectives: Record<number, string> = {
  1: "Understand the core shift from writing rules by hand to learning rules from data. Identify when machine learning is the appropriate architectural tool versus traditional programming.",
  2: "Master the definitions of features, labels, and datasets. Differentiate classification from continuous regression, and understand the workflow from training to inference.",
  3: "Analyze K-Nearest Neighbors mechanics, calculate Euclidean distance, observe boundary smoothing as K increases, and avoid the feature scaling trap.",
  4: "Understand hierarchical orthogonal splits in Decision Trees, compute Gini impurity reduction, and contrast tree boundaries with KNN.",
  5: "Explore probability-based classification (Logistic Regression), Bayesian evidence multiplication (Naive Bayes), and maximum-margin hyperplane optimization (SVM).",
  6: "Identify the critical flaw of accuracy on imbalanced datasets. Calculate and interpret Precision, Recall, and the Confusion Matrix to balance real-world trade-offs.",
  7: "Distinguish between memorizing noise (overfitting) and true generalization. Use held-out validation sets to honestly assess model capacity.",
  8: "Apply classification principles to a complete multi-feature dataset, analyze borderline decisions across algorithms, and review core machine learning foundations.",
};

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
