'use client';

import { useState } from 'react';
import Link from 'next/link';
import { lessons } from '@/lib/data';
import PixelMascot from '@/components/landing/PixelMascot';
import PixelLandscape from '@/components/landing/PixelLandscape';

function LessonCard({ lesson }: { lesson: typeof lessons[0] }) {
  return (
    <Link href={`/lesson/${lesson.id}`} className="group block">
      <div className="relative rounded-2xl p-5 bg-white border-1.5 border-[#F0D6E2] hover:border-[#FF2E7E] hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
            PART {lesson.part.toString().padStart(2, '0')}
          </span>
          <span className="text-[#6D5970] text-xs font-mono font-medium">{lesson.timeRange}</span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-bold text-[#1A1020] text-base mb-1.5 group-hover:text-[#FF2E7E] transition-colors leading-snug">
          {lesson.title}
        </h3>
        <p className="text-[#6D5970] text-xs leading-relaxed">{lesson.subtitle}</p>

        {/* Bottom indicator */}
        <div className="mt-4 pt-3 border-t border-[#F7EAF0] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#6D5970]">{lesson.duration} min module</span>
          <span className="text-xs font-bold text-[#FF2E7E] opacity-0 group-hover:opacity-100 transition-opacity">
            Start module →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

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
            Metrics
          </Link>
          <Link href="/lesson/7" className="hover:text-[#FF2E7E] transition-colors">
            Overfitting
          </Link>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/lesson/1"
            className="btn-pink px-5 py-2 text-xs md:text-sm font-bold flex items-center gap-1.5"
          >
            <span>Get started</span>
            <span>→</span>
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section with Pixel Landscape & Mascot ─── */}
      <section className="relative pt-12 md:pt-16 pb-28 md:pb-36 px-4 text-center overflow-hidden">
        {/* Pixel Trees & Clouds Landscape */}
        <PixelLandscape />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          {/* Main Pixel Headline */}
          <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#1A1020] tracking-tight leading-tight">
            Small data.<br />
            Big models.
          </h1>

          {/* Subtitle */}
          <p className="text-[#6D5970] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            PixelML is your visual, interactive guide to Machine Learning Classification.
            Learn how algorithms find patterns and turn messy data into clear decision boundaries.
          </p>

          {/* Interactive Mascot Centerpiece */}
          <div className="py-4">
            <PixelMascot />
          </div>

          {/* Interactive Search / Prompt Input Bar */}
          <div className="max-w-md mx-auto pt-2">
            <form
              onSubmit={e => {
                e.preventDefault();
                window.location.href = '/lesson/1';
              }}
              className="relative flex items-center bg-white rounded-full border-2 border-[#FF2E7E] p-1.5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="pl-3.5 pr-2 text-[#FF2E7E]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M7 1h2v14H7zM1 7h14v2H1zM5 5h6v6H5z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Explore algorithms, KNN, Decision Trees..."
                className="w-full text-xs md:text-sm bg-transparent outline-none text-[#1A1020] placeholder-[#B399A6] font-medium"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#FF2E7E] hover:bg-[#E31666] text-white flex items-center justify-center font-bold text-xs transition-colors flex-shrink-0"
              >
                →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Pink Wavy / Stepped Section (Matching Screenshot) ─── */}
      <section className="relative bg-[#FF2E7E] text-white pt-10 pb-16 px-4 md:px-8 pixel-stepped-top z-20">
        <div className="max-w-5xl mx-auto">
          {/* Section Sub-heading */}
          <div className="text-center mb-8">
            <span className="font-pixel text-[11px] md:text-xs tracking-widest text-[#FFE4EF] uppercase font-bold">
              BUILT FOR DEEP UNDERSTANDING
            </span>
          </div>

          {/* 3 Prominent Feature Cards (White rounded boxes with pixel icons) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white p-6 text-[#1A1020] shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFE4EF] border border-[#FFB8D2] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="3" width="6" height="3" fill="#FF2E7E" />
                    <rect x="6" y="6" width="12" height="9" fill="#FF85B3" />
                    <rect x="9" y="15" width="6" height="3" fill="#1A1020" />
                    <rect x="10" y="18" width="4" height="3" fill="#1A1020" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base text-[#1A1020] mb-1.5">
                  Learn by Example
                </h3>
                <p className="text-[#6D5970] text-xs leading-relaxed">
                  Follow a single 10-email spam filter from start to finish. Understand features, labels, and datasets in one coherent narrative.
                </p>
              </div>
              <Link href="/lesson/2" className="mt-5 text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
                <span>Start Part 2</span>
                <span>→</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white p-6 text-[#1A1020] shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFE4EF] border border-[#FFB8D2] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="5" width="16" height="14" fill="#FF85B3" rx="2" />
                    <rect x="7" y="3" width="3" height="4" fill="#1A1020" />
                    <rect x="14" y="3" width="3" height="4" fill="#1A1020" />
                    <rect x="7" y="11" width="10" height="2" fill="#FF2E7E" />
                    <rect x="7" y="15" width="6" height="2" fill="#FF2E7E" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base text-[#1A1020] mb-1.5">
                  Interactive Simulators
                </h3>
                <p className="text-[#6D5970] text-xs leading-relaxed">
                  Slide K to watch KNN boundaries shift. Step through Decision Tree questions. Observe live gradient descent training convergence.
                </p>
              </div>
              <Link href="/playground" className="mt-5 text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
                <span>Open Simulators</span>
                <span>→</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white p-6 text-[#1A1020] shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFE4EF] border border-[#FFB8D2] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="6" width="16" height="4" fill="#FF2E7E" />
                    <rect x="4" y="11" width="16" height="4" fill="#FF85B3" />
                    <rect x="4" y="16" width="16" height="4" fill="#96003B" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base text-[#1A1020] mb-1.5">
                  Evaluate Honestly
                </h3>
                <p className="text-[#6D5970] text-xs leading-relaxed">
                  Discover why 95% accuracy can be completely useless on imbalanced data. Master the Confusion Matrix, Precision, and Recall.
                </p>
              </div>
              <Link href="/lesson/6" className="mt-5 text-xs font-bold text-[#FF2E7E] hover:underline flex items-center gap-1">
                <span>Explore Metrics</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Curriculum Modules Grid ─── */}
      <section id="modules" className="relative py-16 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#F0D6E2]">
          <div>
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-widest block mb-1">
              CURRICULUM
            </span>
            <h2 className="text-2xl font-extrabold text-[#1A1020]">
              The 8 Educational Modules
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-3 py-1 rounded-full border border-[#FFB8D2]">
            8 Modules · 120 Minutes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lessons.map(lesson => (
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
                Rather than introducing arbitrary toy datasets in every chapter, every concept connects back to a clean 10-email spam filter. Features are <strong className="text-[#1A1020]">number of links</strong> (x-axis) and <strong className="text-[#1A1020]">suspicious keywords</strong> (y-axis). Observation <strong className="text-[#FF2E7E]">E10</strong> is deliberately placed noise to show how KNN, Decision Trees, and Regularization react to real-world edge cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Minimal Clean Footer ─── */}
      <footer className="border-t border-[#F0D6E2] py-8 px-6 bg-white text-center text-xs text-[#6D5970]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[#FF2E7E] font-bold">PixelML</span>
            <span>·</span>
            <span>Machine Learning Classification Guide</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/playground" className="hover:text-[#FF2E7E] transition-colors">
              Simulators
            </Link>
            <Link href="/lesson/1" className="hover:text-[#FF2E7E] transition-colors">
              Start Learning
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
