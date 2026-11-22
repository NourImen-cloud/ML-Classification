'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  courseParts,
  courseSlides,
  formulaSheet,
  glossary,
  misconceptions,
  scikitLearnCode,
  courseMetadata,
} from '@/lib/data';
import PixelMascot from '@/components/landing/PixelMascot';
import PixelLandscape from '@/components/landing/PixelLandscape';
import { MathBlock } from '@/components/ui/KatexFormula';
import { ExternalImageCard } from '@/components/ui/ExternalImageCard';
import {
  ExternalLink,
  Play,
  BookOpen,
  Sparkles,
  Layers,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ListOrdered,
  Cpu,
  Brain,
  Sliders,
} from 'lucide-react';

function PartCard({ part }: { part: (typeof courseParts)[0] }) {
  const slides = courseSlides.filter((s) => s.partId === part.id);

  return (
    <div className="group relative rounded-2xl p-6 bg-white border-2 border-[#F0D6E2] hover:border-[#FF2E7E] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-pixel text-[11px] px-3 py-1 rounded-full text-white font-bold"
            style={{ backgroundColor: part.color }}
          >
            {part.partNumber}
          </span>
          <span className="text-[#6D5970] text-xs font-mono font-bold bg-[#FFF0F6] px-2.5 py-0.5 rounded-full border border-[#FFB8D2]">
            {part.slidesRange}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-extrabold text-[#1A1020] text-lg mb-2 group-hover:text-[#FF2E7E] transition-colors leading-snug">
          {part.title}
        </h3>
        <p className="text-[#6D5970] text-xs leading-relaxed mb-4">
          {part.subtitle}
        </p>

        {/* Slide quick list */}
        <div className="space-y-1.5 pt-3 border-t border-[#F7EAF0]">
          <span className="text-[10px] font-mono font-bold text-[#FF2E7E] uppercase tracking-wider block mb-1">
            Included Slides ({slides.length}):
          </span>
          {slides.slice(0, 4).map((s) => (
            <div key={s.id} className="text-xs text-[#4A3B4E] truncate flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#6D5970]">#{s.slideNumber}</span>
              <span className="truncate">{s.title}</span>
            </div>
          ))}
          {slides.length > 4 && (
            <div className="text-[11px] font-mono font-semibold text-[#8B5CF6]">
              + {slides.length - 4} more slides...
            </div>
          )}
        </div>
      </div>

      {/* Bottom Launch Button */}
      <div className="mt-5 pt-4 border-t border-[#F7EAF0] flex items-center justify-between">
        <span className="text-xs font-mono text-[#6D5970]">
          {part.slidesCount} Classroom Slides
        </span>
        <Link
          href={`/lesson/${part.id}`}
          className="btn-pink px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 group-hover:shadow-md"
        >
          <span>Open {part.partNumber}</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activePartFilter, setActivePartFilter] = useState<'all' | number>('all');
  const [activeAppendix, setActiveAppendix] = useState<'formulas' | 'glossary' | 'code' | 'misconceptions' | null>(null);

  const displayedSlides =
    activePartFilter === 'all'
      ? courseSlides
      : courseSlides.filter((s) => s.partId === activePartFilter);

  return (
    <div className="min-h-screen bg-white relative flex flex-col overflow-x-hidden bg-pixel-grid">
      {/* ─── Top Navigation Bar ─── */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-[#F0D6E2] bg-white/90 backdrop-blur-md">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#FF2E7E] text-white flex items-center justify-center font-pixel text-xs font-bold shadow-xs group-hover:scale-105 transition-transform">
            ML
          </div>
          <span className="font-pixel text-lg text-[#1A1020] font-bold tracking-tight">
            Pixel<span className="text-[#FF2E7E]">ML</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1A1020]">
          <Link href="#parts" className="hover:text-[#FF2E7E] transition-colors">
            5 Parts
          </Link>
          <Link href="#slides" className="hover:text-[#FF2E7E] transition-colors">
            29 Slides
          </Link>
          <Link href="/playground" className="hover:text-[#FF2E7E] transition-colors">
            Simulators
          </Link>
          <button
            onClick={() => setActiveAppendix('formulas')}
            className="hover:text-[#FF2E7E] transition-colors font-semibold"
          >
            Formulas Sheet
          </button>
          <button
            onClick={() => setActiveAppendix('glossary')}
            className="hover:text-[#FF2E7E] transition-colors font-semibold"
          >
            Glossary
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/slides"
            className="px-4 py-2 text-xs md:text-sm font-bold flex items-center gap-1.5 rounded-xl bg-[#16322C] text-[#FFF4EB] border border-[#2B8C80]/50 hover:bg-[#E85D36] transition-colors shadow-xs"
          >
            <span>Slides</span>
          </Link>
          <Link
            href="/lesson/1"
            className="btn-pink px-5 py-2 text-xs md:text-sm font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Interactive Lesson</span>
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section with Pixel Landscape & Mascot ─── */}
      <section className="relative pt-10 md:pt-16 pb-20 md:pb-28 px-4 text-center overflow-hidden">
        <PixelLandscape />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-mono text-xs font-extrabold border border-[#FFB8D2]">
              Computer Science
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-mono text-xs font-extrabold border border-purple-200">
              Introductory Level
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-extrabold border border-emerald-200">
              Supervised Learning
            </span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#1A1020] tracking-tight leading-tight">
            Classification in<br />
            <span className="text-[#FF2E7E]">Machine Learning</span>
          </h1>

          <p className="text-[#4A3B4E] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            {courseMetadata.subtitle}
          </p>

          <div className="py-2">
            <PixelMascot />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/slides"
              className="px-6 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2 rounded-xl bg-[#16322C] text-[#FFF4EB] border-2 border-[#E85D36] hover:bg-[#E85D36] transition-all shadow-md hover:scale-105"
            >
              <span>Slides</span>
              <span>→</span>
            </Link>
            <Link
              href="/lesson/1"
              className="btn-pink px-6 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2 shadow-sm"
            >
              <span>Start Interactive Lesson</span>
              <span>→</span>
            </Link>
            <Link
              href="#slides"
              className="btn-white px-5 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2"
            >
              <span>Browse All 29 Slides</span>
            </Link>
            <Link
              href="/playground"
              className="btn-white px-5 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2"
            >
              <span>Interactive Playground</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5 Parts Curriculum Showcase ─── */}
      <section id="parts" className="relative py-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#F0D6E2]">
          <div>
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-widest block mb-1">
              CURRICULUM STRUCTURE
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1020]">
              The 5 Comprehensive Parts
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-[#6D5970] bg-[#FFF0F6] px-3 py-1 rounded-full border border-[#FFB8D2]">
            29 Complete Slides
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      </section>

      {/* ─── All 29 Slides Index Table ─── */}
      <section id="slides" className="relative py-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b border-[#F0D6E2] gap-4">
          <div>
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-widest block mb-1">
              SLIDE-BY-SLIDE INDEX
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1020]">
              All 29 Presentation Slides
            </h2>
          </div>

          {/* Part Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FFF0F6] rounded-xl border border-[#FFB8D2]">
            <button
              onClick={() => setActivePartFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activePartFilter === 'all' ? 'bg-[#FF2E7E] text-white shadow-xs' : 'text-[#6D5970]'
              }`}
            >
              All Slides (29)
            </button>
            {courseParts.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePartFilter(p.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activePartFilter === p.id ? 'bg-[#FF2E7E] text-white shadow-xs' : 'text-[#6D5970]'
                }`}
              >
                {p.partNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedSlides.map((slide) => (
            <Link
              key={slide.id}
              href={`/lesson/${slide.partId}#slide-${slide.id}`}
              className="p-4 rounded-xl border border-[#F0D6E2] bg-white hover:border-[#FF2E7E] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-pixel text-[10px] px-2 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
                    SLIDE {slide.slideNumber.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#8B5CF6]">
                    {slide.partName}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#1A1020] group-hover:text-[#FF2E7E] transition-colors line-clamp-2">
                  {slide.title}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F7EAF0] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1">
                  {slide.hasInteractiveVisual && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                      Visual
                    </span>
                  )}
                  {slide.hasFormulas && (
                    <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-mono font-bold border border-purple-200">
                      KaTeX
                    </span>
                  )}
                  {slide.hasExternalImage && (
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-mono font-bold border border-blue-200">
                      Image
                    </span>
                  )}
                </div>
                <span className="font-bold text-[#FF2E7E] opacity-0 group-hover:opacity-100 transition-opacity">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 10 Core Memory Takeaways ─── */}
      <section className="relative py-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="p-6 md:p-8 rounded-3xl border-2 border-[#FFD6E5] bg-[#FFF7FA] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#FFD6E5] pb-4">
            <div>
              <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-widest block mb-1">
                SUMMARY & TAKEAWAYS · SLIDE 28
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
                What Should You Remember? 10 Core ML Concepts
              </h2>
            </div>
            <Link
              href="/lesson/5#slide-28"
              className="btn-pink px-4 py-1.5 text-xs font-bold inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View in Part V</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {glossary.map((g, idx) => (
              <div key={g.term} className="p-3 bg-white rounded-xl border border-[#F0D6E2] space-y-1 shadow-xs">
                <span className="font-mono text-[10px] text-[#FF2E7E] font-bold block">
                  0{idx + 1}. {g.term}
                </span>
                <p className="text-[#4A3B4E] leading-relaxed text-[11px]">{g.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Drawer Modal for Formulas / Glossary / Code ─── */}
      {activeAppendix && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => setActiveAppendix(null)}
        >
          <div
            className="w-full max-w-xl bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-4 border-l border-[#F0D6E2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F0D6E2]">
              <span className="font-pixel text-xs text-[#FF2E7E] uppercase font-bold tracking-wider">
                {activeAppendix === 'formulas' && 'All Course Mathematical Formulas'}
                {activeAppendix === 'glossary' && '10 Core Terminology Concepts'}
                {activeAppendix === 'code' && 'Production Scikit-Learn Pipeline'}
              </span>
              <button
                onClick={() => setActiveAppendix(null)}
                className="text-xs font-bold text-[#6D5970] hover:text-[#1A1020] px-2.5 py-1 rounded bg-[#FFF0F6] hover:bg-[#FFE4EF]"
              >
                ✕ Close
              </button>
            </div>

            {/* Formulas Sheet */}
            {activeAppendix === 'formulas' && (
              <div className="space-y-4 text-xs">
                <p className="text-[#6D5970]">
                  Every formula from the 29 slides rendered with KaTeX:
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
            {activeAppendix === 'glossary' && (
              <div className="space-y-3 text-xs">
                {glossary.map((g, i) => (
                  <div key={i} className="p-3 bg-white rounded-xl border border-[#F0D6E2] space-y-1">
                    <span className="font-bold text-[#FF2E7E] block font-mono text-xs">
                      {i + 1}. {g.term}
                    </span>
                    <p className="text-[#4A3B4E] leading-relaxed">{g.meaning}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Footer ─── */}
      <footer className="mt-auto border-t border-[#F0D6E2] bg-white py-8 px-6 text-center text-xs text-[#6D5970] space-y-2">
        <p className="font-pixel text-[#1A1020]">
          Classification in Machine Learning · Computer Science Curriculum
        </p>
      </footer>
    </div>
  );
}
