'use client';

import React from 'react';
import Link from 'next/link';
import ClassificationPlayground from '@/components/interactive/ClassificationPlayground';
import TrainingSimulator from '@/components/interactive/TrainingSimulator';

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-white text-[#1A1020] bg-pixel-grid flex flex-col">
      {/* ─── Top Bar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F0D6E2] px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-[#6D5970] hover:text-[#FF2E7E] transition-colors text-xs font-bold flex items-center gap-1"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
          <span className="text-[#F0D6E2]">/</span>
          <span className="font-pixel text-[11px] font-bold text-[#FF2E7E]">
            SIMULATORS & LAB
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/lesson/1"
            className="btn-pink px-4 py-1.5 text-xs font-bold inline-flex items-center gap-1"
          >
            <span>Start Curriculum</span>
            <span>→</span>
          </Link>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-20 pb-20 space-y-10 flex-1 w-full">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2] uppercase tracking-wider inline-block">
            HANDS-ON LABORATORY
          </span>
          <h1 className="font-pixel text-2xl md:text-3xl text-[#1A1020]">
            Classification Lab
          </h1>
          <p className="text-xs md:text-sm text-[#6D5970] leading-relaxed">
            Experiment with decision boundaries across multiple algorithmic formulations, place custom data points, and observe gradient descent convergence.
          </p>
        </div>

        {/* Section 1: Decision Boundary Laboratory */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-2">
            <h2 className="text-base font-extrabold text-[#1A1020]">
              1. Multi-Model Decision Boundaries
            </h2>
            <span className="text-[11px] font-mono text-[#6D5970]">
              KNN · Decision Tree · Logistic Regression · SVM
            </span>
          </div>
          <ClassificationPlayground />
        </section>

        {/* Section 2: Model Training Simulator */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-2">
            <h2 className="text-base font-extrabold text-[#1A1020]">
              2. Gradient Descent Optimization Simulator
            </h2>
            <span className="text-[11px] font-mono text-[#6D5970]">
              Epoch Iterations · Cross-Entropy Loss
            </span>
          </div>
          <TrainingSimulator />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F0D6E2] py-6 px-6 bg-white text-center text-xs text-[#6D5970]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-pixel text-[11px] text-[#FF2E7E] font-bold">PixelML</span>
          <Link href="/" className="hover:text-[#FF2E7E] font-medium">Return to Home</Link>
        </div>
      </footer>
    </div>
  );
}
