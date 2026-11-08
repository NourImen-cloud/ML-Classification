'use client';

import { useState } from 'react';
import Link from 'next/link';
import { lessons, stages, formulaSheet, glossary, misconceptions, scikitLearnCode } from '@/lib/data';
import PixelMascot from '@/components/landing/PixelMascot';
import PixelLandscape from '@/components/landing/PixelLandscape';

function LessonCard({ lesson }: { lesson: (typeof lessons)[0] }) {
  return (
    <Link href={`/lesson/${lesson.id}`} className="group block">
      <div className="relative rounded-2xl p-5 bg-white border border-[#F0D6E2] hover:border-[#FF2E7E] hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-full flex flex-col justify-between">
        <div>
          {/* Top Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              MODULE {lesson.module.toString().padStart(2, '0')}
            </span>
            <span className="text-[#6D5970] text-xs font-mono font-medium">{lesson.timeRange}</span>
          </div>

          {/* Stage tag */}
          <div className="text-[10px] font-mono font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">
            Stage {lesson.stage} · {lesson.stageName}
          </div>

          {/* Title & Subtitle */}
          <h3 className="font-bold text-[#1A1020] text-base mb-1.5 group-hover:text-[#FF2E7E] transition-colors leading-snug">
            {lesson.title}
          </h3>
          <p className="text-[#6D5970] text-xs leading-relaxed">{lesson.subtitle}</p>
        </div>

        {/* Bottom indicator */}
        <div className="mt-4 pt-3 border-t border-[#F7EAF0] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#6D5970]">{lesson.duration} min</span>
          <span className="text-xs font-bold text-[#FF2E7E] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <span>Start</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [sessionFilter, setSessionFilter] = useState<'all' | 1 | 2>('all');
  const [activeAppendix, setActiveAppendix] = useState<'formulas' | 'glossary' | 'code' | 'misconceptions' | null>(null);

  const displayedLessons =
    sessionFilter === 'all' ? lessons : lessons.filter((l) => l.session === sessionFilter);

  return (
    <div className="min-h-screen bg-white relative flex flex-col overflow-x-hidden bg-pixel-grid">
      {/* ─── Top Navigation Bar ─── */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-[#F0D6E2] bg-white/90 backdrop-blur-md">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#FF2E7E] text-white flex items-center justify-center font-pixel text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="font-pixel text-lg text-[#1A1020] font-bold tracking-tight">
            Pixel<span className="text-[#FF2E7E]">ML</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1A1020]">
          <Link href="#modules" className="hover:text-[#FF2E7E] transition-colors">
            Curriculum
          </Link>
          <Link href="/playground" className="hover:text-[#FF2E7E] transition-colors">
            Simulators
          </Link>
          <Link href="/lesson/6" className="hover:text-[#FF2E7E] transition-colors">
            Evaluation
          </Link>
          <Link href="/lesson/7" className="hover:text-[#FF2E7E] transition-colors">
            Overfitting
          </Link>
          <button
            onClick={() => setActiveAppendix('formulas')}
            className="hover:text-[#FF2E7E] transition-colors font-semibold"
          >
            Formulas
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/lesson/1"
            className="btn-pink px-5 py-2 text-xs md:text-sm font-bold flex items-center gap-1.5"
          >
            <span>Start Session 1</span>
            <span>→</span>
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section with Pixel Landscape & Mascot ─── */}
      <section className="relative pt-12 md:pt-16 pb-24 md:pb-32 px-4 text-center overflow-hidden">
        <PixelLandscape />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F6] border border-[#FFB8D2] text-[#FF2E7E] font-mono text-xs font-bold mb-2">
            <span>Teacher’s Guide · 2 × 60-Minute Sessions</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#1A1020] tracking-tight leading-tight">
            Classification in<br />
            Machine Learning
          </h1>

          <p className="text-[#6D5970] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            From first intuition to model evaluation: KNN, Decision Trees, Logistic Regression,
            metrics, thresholds, and honest generalization.
          </p>

          <div className="py-4">
            <PixelMascot />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/lesson/1"
              className="btn-pink px-6 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2"
            >
              <span>Begin Module 1 (Discovering Classification)</span>
              <span>→</span>
            </Link>
            <Link
              href="/playground"
              className="btn-white px-5 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2"
            >
              <span>Explore Simulators</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── The Three Learning Stages (Part 4 of Guide) ─── */}
      <section className="relative py-12 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F0D6E2]">
          <div>
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-widest block mb-1">
              LEARNING DESIGN
            </span>
            <h2 className="text-2xl font-extrabold text-[#1A1020]">
              The Three Pedagogical Stages
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6D5970]">Stage Checkpoints Included</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="rounded-2xl border-2 border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[10px] px-2 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
                    STAGE {stage.number}
                  </span>
                  <span className="text-[11px] font-mono text-[#6D5970]">{stage.session}</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1A1020]">{stage.title.split('·')[1]}</h3>
                <p className="text-xs text-[#6D5970] leading-relaxed">{stage.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF9FC] border border-[#FFB8D2] space-y-1 text-xs">
                <span className="font-bold text-[#FF2E7E] block text-[10px] uppercase tracking-wider">
                  Checkpoint Question:
                </span>
                <p className="text-[#1A1020] font-medium italic">&ldquo;{stage.checkpointQuestion}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Curriculum Modules Grid ─── */}
      <section id="modules" className="relative py-12 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b border-[#F0D6E2] gap-4">
          <div>
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-widest block mb-1">
              CURRICULUM ARCHITECTURE
            </span>
            <h2 className="text-2xl font-extrabold text-[#1A1020]">
              The 11 Instructional Modules
            </h2>
          </div>

          {/* Session Filters */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FFF0F6] rounded-xl border border-[#FFB8D2]">
            <button
              onClick={() => setSessionFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                sessionFilter === 'all' ? 'bg-[#FF2E7E] text-white shadow-sm' : 'text-[#6D5970]'
              }`}
            >
              All (11 Modules · 120 min)
            </button>
            <button
              onClick={() => setSessionFilter(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                sessionFilter === 1 ? 'bg-[#FF2E7E] text-white shadow-sm' : 'text-[#6D5970]'
              }`}
            >
              Session 1 (M1–M5)
            </button>
            <button
              onClick={() => setSessionFilter(2)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                sessionFilter === 2 ? 'bg-[#FF2E7E] text-white shadow-sm' : 'text-[#6D5970]'
              }`}
            >
              Session 2 (M6–M11)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {/* Running Example Card */}
        <div className="mt-10 rounded-2xl border border-[#F0D6E2] bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F6] border border-[#FFB8D2] flex items-center justify-center font-pixel text-sm text-[#FF2E7E] flex-shrink-0 font-bold">
              01
            </div>
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-base text-[#1A1020]">
                The Core Running Example: Email Spam Classifier
              </h3>
              <p className="text-[#6D5970] text-xs md:text-sm leading-relaxed">
                Rather than introducing arbitrary toy datasets in every chapter, every concept connects back
                to a clean, consistent email spam filter. Features are <strong className="text-[#1A1020]">number of links</strong> (x-axis)
                and <strong className="text-[#1A1020]">suspicious keywords</strong> (y-axis).
                Observation <strong className="text-[#FF2E7E]">E10</strong> is deliberately placed noise to show how KNN, Decision Trees,
                and Regularization react to real-world edge cases.
              </p>
            </div>
          </div>
        </div>

        {/* Appendix Reference Drawer Modals */}
        {activeAppendix && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border-2 border-[#1A1020] max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
                <span className="font-pixel text-xs text-[#FF2E7E] font-bold uppercase">
                  {activeAppendix === 'formulas' && 'Appendix A · Formula Reference Sheet'}
                  {activeAppendix === 'glossary' && 'Appendix C · Glossary of Classification Terms'}
                  {activeAppendix === 'code' && 'Appendix B · Scikit-Learn Python Implementation'}
                  {activeAppendix === 'misconceptions' && 'Part 5 · Common Misconceptions to Listen For'}
                </span>
                <button
                  onClick={() => setActiveAppendix(null)}
                  className="font-bold text-xs text-[#6D5970] hover:text-[#1A1020]"
                >
                  ✕ Close
                </button>
              </div>

              {activeAppendix === 'formulas' && (
                <div className="space-y-2 text-xs">
                  {formulaSheet.map((f, i) => (
                    <div key={i} className="p-3 bg-[#FFF9FC] rounded-xl border border-[#F0D6E2] space-y-1">
                      <div className="font-bold text-[#1A1020]">{f.concept}</div>
                      <div className="font-mono text-[#96003B] bg-white p-1.5 rounded border border-[#FFB8D2]">
                        {f.formula}
                      </div>
                      <div className="text-[#6D5970] text-[11px]">{f.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeAppendix === 'glossary' && (
                <div className="space-y-2 text-xs">
                  {glossary.map((g, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-[#F0D6E2]">
                      <span className="font-bold text-[#FF2E7E] block mb-0.5">{g.term}</span>
                      <p className="text-[#4A3B4E]">{g.meaning}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeAppendix === 'misconceptions' && (
                <div className="space-y-2.5 text-xs">
                  {misconceptions.map((m, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-[#FED7AA] space-y-1">
                      <span className="font-bold text-[#DC2626] block">Myth: &ldquo;{m.myth}&rdquo;</span>
                      <p className="text-[#059669] font-medium">Correction: {m.correction}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#F0D6E2] py-8 px-6 bg-white text-center text-xs text-[#6D5970]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[#FF2E7E] font-bold">PixelML</span>
            <span>·</span>
            <span>Classification in Machine Learning · Teacher&apos;s Guide</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <button
              onClick={() => setActiveAppendix('formulas')}
              className="hover:text-[#FF2E7E] transition-colors"
            >
              Formula Sheet
            </button>
            <button
              onClick={() => setActiveAppendix('glossary')}
              className="hover:text-[#FF2E7E] transition-colors"
            >
              Glossary
            </button>
            <button
              onClick={() => setActiveAppendix('misconceptions')}
              className="hover:text-[#FF2E7E] transition-colors"
            >
              Misconceptions
            </button>
            <Link href="/playground" className="hover:text-[#FF2E7E] transition-colors">
              Simulators
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
