'use client';

import React from 'react';
import {
  SectionHeader,
  ThoughtPrompt,
  CompareTable,
  Callout,
  KeyInsight,
} from '@/components/ui/ConceptCard';
import { MathBlock, MathInline } from '@/components/ui/KatexFormula';
import { ClassroomChallengeWidget } from '@/components/interactive/CurriculumVisuals';
import {
  CheckCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  GraduationCap,
  ListOrdered,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function Part5() {
  const coreTerms = [
    { term: 'Observation', desc: 'An individual example in a dataset.' },
    { term: 'Feature', desc: 'A characteristic describing an observation.' },
    { term: 'Feature vector', desc: "A numerical representation of an observation's features." },
    { term: 'Label', desc: 'The correct category associated with an observation.' },
    { term: 'Training', desc: 'The process of learning patterns from labeled examples.' },
    { term: 'Classifier', desc: 'A model used to predict class labels.' },
    { term: 'Decision boundary', desc: 'A boundary separating regions assigned to different predicted classes.' },
    { term: 'Prediction', desc: 'The class assigned to a new observation.' },
    { term: 'Generalization', desc: 'The ability to perform well on unseen data.' },
    { term: 'Evaluation', desc: 'The process of measuring how well a classifier performs.' },
  ];

  const pipelineSteps = [
    { num: '1', title: 'Define the problem', desc: 'We want to classify emails into Spam and Not Spam.' },
    { num: '2', title: 'Collect labeled examples', desc: 'We gather emails that have already been classified.' },
    { num: '3', title: 'Extract features', desc: 'We represent each email using characteristics such as the number of links and suspicious words.' },
    { num: '4', title: 'Train a classifier', desc: 'We use a learning algorithm to discover patterns connecting features with labels.' },
    { num: '5', title: 'Obtain a trained model', desc: 'The algorithm produces a learned model that can make predictions.' },
    { num: '6', title: 'Classify a new email', desc: 'The model receives the new email’s features and predicts Spam or Not Spam.' },
    { num: '7', title: 'Evaluate performance', desc: 'We compare predictions with actual labels and calculate appropriate evaluation metrics.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-12">
      {/* ─── Part Header ─── */}
      <SectionHeader
        part={5}
        time="Part V · Slides 27–29"
        title="Part V — Consolidating the knowledge"
        subtitle="End-to-end recap, 10 core terminology takeaways, and an interactive 10-question classroom challenge."
      />

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 27 — Putting everything together
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-27" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#EC4899] font-bold border border-[#FFB8D2]">
              SLIDE 27
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Putting everything together
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            End-to-End Synthesis
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Let&apos;s return to our original question:
            <br />
            <strong className="text-base text-[#1A1020]">
              &quot;How can a computer automatically distinguish spam emails from legitimate emails?&quot;
            </strong>
          </p>
          <p className="font-semibold text-[#FF2E7E]">
            We can now explain the entire process.
          </p>
        </div>

        {/* 7-Step Sequence Card */}
        <div className="rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] p-5 space-y-3">
          <h4 className="font-extrabold text-sm text-[#96003B] font-mono uppercase tracking-wider flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-[#FF2E7E]" />
            The Complete Spam Classification Process
          </h4>
          <div className="space-y-2.5">
            {pipelineSteps.map((step) => (
              <div
                key={step.num}
                className="p-3 bg-white rounded-lg border border-[#F0D6E2] flex items-start gap-3 shadow-xs"
              >
                <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#FF2E7E] text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.num}
                </span>
                <div>
                  <h5 className="font-bold text-xs text-[#1A1020] uppercase font-mono tracking-wide">
                    {step.title}
                  </h5>
                  <p className="text-xs text-[#4A3B4E] mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 28 — What should you remember?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-28" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#EC4899] font-bold border border-[#FFB8D2]">
              SLIDE 28
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              What should you remember?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Core Summary
          </span>
        </div>

        {/* Master Definition */}
        <div className="p-4 rounded-xl border-2 border-[#FF2E7E] bg-[#FFF0F6] space-y-2">
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase font-bold block">
            Core Master Takeaway
          </span>
          <p className="text-sm font-bold text-[#1A1020] leading-relaxed">
            Classification is a supervised Machine Learning task in which a model learns from labeled examples to predict discrete categories for new observations.
          </p>
        </div>

        {/* 10 Fundamental Terms Grid */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-xs uppercase text-[#6D5970] tracking-wider font-mono">
            Ten Fundamental Concepts To Remember
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {coreTerms.map((item, idx) => (
              <div
                key={item.term}
                className="p-3 bg-white rounded-xl border border-[#F0D6E2] hover:border-[#FFB8D2] transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#FFF0F6] text-[#FF2E7E] text-[10px] font-mono font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-xs text-[#1A1020] font-mono">{item.term}</span>
                </div>
                <p className="text-xs text-[#4A3B4E] leading-relaxed pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 29 — Final classroom challenge
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-29" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#EC4899] font-bold border border-[#FFB8D2]">
              SLIDE 29
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Final classroom challenge
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Interactive Capstone
          </span>
        </div>

        {/* Challenge Widget */}
        <ClassroomChallengeWidget />
      </section>
    </div>
  );
}
