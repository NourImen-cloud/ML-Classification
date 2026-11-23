'use client';

import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calculator,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Check,
  Zap,
  ShieldAlert,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { MathBlock, MathInline } from '@/components/ui/KatexFormula';

interface EmailRecord {
  id: number;
  free: 'Yes' | 'No';
  win: 'Yes' | 'No';
  category: 'Spam' | 'Not Spam';
}

const DATASET: EmailRecord[] = [
  { id: 1, free: 'Yes', win: 'Yes', category: 'Spam' },
  { id: 2, free: 'Yes', win: 'Yes', category: 'Spam' },
  { id: 3, free: 'Yes', win: 'No', category: 'Spam' },
  { id: 4, free: 'Yes', win: 'No', category: 'Spam' },
  { id: 5, free: 'No', win: 'Yes', category: 'Spam' },
  { id: 6, free: 'No', win: 'No', category: 'Not Spam' },
  { id: 7, free: 'No', win: 'No', category: 'Not Spam' },
  { id: 8, free: 'No', win: 'No', category: 'Not Spam' },
  { id: 9, free: 'Yes', win: 'No', category: 'Not Spam' },
  { id: 10, free: 'No', win: 'Yes', category: 'Not Spam' },
];

export function NaiveBayesExercise() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [filterClass, setFilterClass] = useState<'All' | 'Spam' | 'Not Spam'>('All');

  // Interactive Live Simulator state
  const [inputFree, setInputFree] = useState<'Yes' | 'No'>('Yes');
  const [inputWin, setInputWin] = useState<'Yes' | 'No'>('Yes');

  // Interactive Quiz state
  const [quizSelection, setQuizSelection] = useState<number | null>(null);

  // Compute live Naive Bayes for any combination
  const calculateNaiveBayes = (hasFree: 'Yes' | 'No', hasWin: 'Yes' | 'No') => {
    // Priors
    const priorSpam = 5 / 10;
    const priorNotSpam = 5 / 10;

    // Likelihoods
    const pFreeSpam = hasFree === 'Yes' ? 4 / 5 : 1 / 5;
    const pWinSpam = hasWin === 'Yes' ? 3 / 5 : 2 / 5;

    const pFreeNotSpam = hasFree === 'Yes' ? 1 / 5 : 4 / 5;
    const pWinNotSpam = hasWin === 'Yes' ? 1 / 5 : 4 / 5;

    // Scores (unnormalized joint probabilities)
    const scoreSpam = priorSpam * pFreeSpam * pWinSpam;
    const scoreNotSpam = priorNotSpam * pFreeNotSpam * pWinNotSpam;

    // Normalized Posteriors
    const totalEvidence = scoreSpam + scoreNotSpam;
    const probSpam = totalEvidence > 0 ? scoreSpam / totalEvidence : 0.5;
    const probNotSpam = totalEvidence > 0 ? scoreNotSpam / totalEvidence : 0.5;

    const prediction = probSpam >= probNotSpam ? 'Spam' : 'Not Spam';

    return {
      priorSpam,
      priorNotSpam,
      pFreeSpam,
      pWinSpam,
      pFreeNotSpam,
      pWinNotSpam,
      scoreSpam: Number(scoreSpam.toFixed(4)),
      scoreNotSpam: Number(scoreNotSpam.toFixed(4)),
      probSpam: Number((probSpam * 100).toFixed(1)),
      probNotSpam: Number((probNotSpam * 100).toFixed(1)),
      prediction,
    };
  };

  const live = calculateNaiveBayes(inputFree, inputWin);

  const stepsList = [
    '1. Problem & Dataset',
    '2. Prior Probabilities',
    '3. Feature Likelihoods',
    '4. Bayes Formulation',
    '5. Class Scores',
    '6. Normalized Probabilities',
    '7. Complete Workflow',
    '8. Laplace Smoothing',
    '9. Quiz & Live Simulator',
  ];

  const filteredData = DATASET.filter((d) => {
    if (filterClass === 'Spam') return d.category === 'Spam';
    if (filterClass === 'Not Spam') return d.category === 'Not Spam';
    return true;
  });

  return (
    <div className="rounded-2xl border-2 border-[#EA580C]/30 bg-gradient-to-b from-[#FFF7ED] to-white p-5 md:p-7 space-y-6 shadow-md my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#FDBA74] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-[#EA580C] text-white">
              Practical Masterclass
            </span>
            <span className="text-xs font-mono font-bold text-[#9A3412] bg-[#FFEDD5] px-2 py-0.5 rounded-md border border-[#FDBA74]">
              Step-by-Step Exercise
            </span>
          </div>
          <h3 className="font-extrabold text-[#1A1020] text-lg md:text-xl mt-1.5 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#EA580C]" />
            Spam Filtering with Naive Bayes: &quot;Free&quot; &amp; &quot;Win&quot; → Spam / Not Spam
          </h3>
          <p className="text-xs text-[#524156] mt-0.5">
            Follow the complete probabilistic journey from word frequencies to priors, likelihoods, joint scores, and normalized posterior probabilities.
          </p>
        </div>

        {/* Step Indicator pill */}
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#FDBA74] shadow-2xs self-start sm:self-auto font-mono text-xs">
          <span className="text-[#6D5970]">Step:</span>
          <span className="font-bold text-[#EA580C]">{activeStep + 1} / {stepsList.length}</span>
        </div>
      </div>

      {/* Step Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {stepsList.map((stepName, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeStep === idx
                ? 'bg-[#EA580C] text-white shadow-sm'
                : 'bg-white text-[#524156] border border-[#FED7AA] hover:border-[#EA580C]/50 hover:bg-[#FFF7ED]'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                activeStep === idx ? 'bg-white text-[#EA580C]' : 'bg-[#FFEDD5] text-[#9A3412]'
              }`}
            >
              {idx + 1}
            </span>
            <span>{stepName.replace(/^[0-9]+\.\s*/, '')}</span>
          </button>
        ))}
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white rounded-2xl border border-[#FED7AA] p-5 shadow-xs space-y-6">
        {/* ─── STEP 1: PROBLEM & TRAINING DATASET ─── */}
        {activeStep === 0 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 1</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  1. Problem Definition & Training Dataset
                </h4>
              </div>
              <span className="text-xs font-mono bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                10 Emails · 2 Keyword Features · Binary Target
              </span>
            </div>

            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Imagine we have collected <strong>10 emails</strong> in our training dataset. We inspect whether each email contains two high-suspicion keywords: <strong>&quot;Free&quot;</strong> and <strong>&quot;Win&quot;</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
                <span className="font-bold text-amber-900 block font-mono">Keyword 1: &quot;Free&quot;</span>
                <p className="text-amber-800">Binary indicator: <span className="font-mono font-bold">Yes</span> or <span className="font-mono font-bold">No</span>.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-1">
                <span className="font-bold text-sky-900 block font-mono">Keyword 2: &quot;Win&quot;</span>
                <p className="text-sky-800">Binary indicator: <span className="font-mono font-bold">Yes</span> or <span className="font-mono font-bold">No</span>.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1">
                <span className="font-bold text-purple-900 block font-mono">Class Label (C)</span>
                <p className="text-purple-800">Categories: <span className="font-mono font-bold text-rose-700">Spam (5)</span> or <span className="font-mono font-bold text-emerald-700">Not Spam (5)</span>.</p>
              </div>
            </div>

            {/* Dataset Table with filters */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono text-[#4A3B4E]">
                  Complete Training Dataset (10 Emails):
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-gray-500 mr-1">Filter view:</span>
                  {(['All', 'Spam', 'Not Spam'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterClass(filter)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded font-bold transition-all ${
                        filterClass === filter
                          ? 'bg-[#EA580C] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#FED7AA]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FFF7ED] text-[#9A3412] border-b border-[#FED7AA]">
                    <tr>
                      <th className="py-2.5 px-3">Email ID</th>
                      <th className="py-2.5 px-3">Contains &quot;Free&quot;?</th>
                      <th className="py-2.5 px-3">Contains &quot;Win&quot;?</th>
                      <th className="py-2.5 px-3">True Class</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FFF0E0]">
                    {filteredData.map((d) => (
                      <tr key={d.id} className="hover:bg-[#FFF7ED]/50 transition-colors">
                        <td className="py-2 px-3 font-bold text-gray-500">Email #{d.id}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold ${
                              d.free === 'Yes' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {d.free}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold ${
                              d.win === 'Yes' ? 'bg-sky-100 text-sky-800' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {d.win}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold ${
                              d.category === 'Spam'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {d.category === 'Spam' ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                            {d.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Query Goal */}
            <div className="p-4 rounded-xl bg-orange-50 border-2 border-orange-200 text-xs text-orange-950 space-y-1">
              <span className="font-bold block text-sm text-[#9A3412]">
                Our Goal: Classify a New Email
              </span>
              <p className="leading-relaxed">
                A new email arrives containing both: <strong>&quot;Free&quot; = Yes</strong> and <strong>&quot;Win&quot; = Yes</strong>. Is it <strong>Spam</strong> or <strong>Not Spam</strong>? Let&apos;s calculate with Naive Bayes!
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(1)}
                className="px-3 py-1.5 bg-[#EA580C] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#C2410C]"
              >
                Go to Step 1: Prior Probabilities <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: CALCULATE THE PRIOR PROBABILITIES ─── */}
        {activeStep === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 2</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 1: Calculate the Prior Probabilities P(C)
                </h4>
              </div>
              <span className="text-xs font-mono bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                P(Spam) = 0.5 · P(Not Spam) = 0.5
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FDBA74] space-y-2 text-xs text-[#2D1F33]">
              <h5 className="font-bold text-sm text-[#9A3412] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#EA580C]" /> What is a Prior Probability?
              </h5>
              <p className="leading-relaxed">
                The probability of each class <strong>before</strong> looking at the email&apos;s specific words or features. It reflects our baseline knowledge of the world.
              </p>
              <MathBlock
                formula="P(C) = \frac{\text{Number of emails in class } C}{\text{Total number of emails}}"
                label="Prior Probability Formula"
              />
            </div>

            {/* Priors Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                <span className="font-bold text-rose-900 font-sans block text-sm">
                  Prior for Spam:
                </span>
                <p className="text-gray-600">5 Spam emails out of 10 total emails:</p>
                <MathBlock formula="P(\text{Spam}) = \frac{5}{10} = \mathbf{0.50}" />
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                <span className="font-bold text-emerald-900 font-sans block text-sm">
                  Prior for Not Spam:
                </span>
                <p className="text-gray-600">5 Not Spam emails out of 10 total emails:</p>
                <MathBlock formula="P(\text{Not Spam}) = \frac{5}{10} = \mathbf{0.50}" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700">
              <strong>Takeaway:</strong> Because our training dataset is balanced (50% Spam, 50% Not Spam), both classes begin with an equal starting advantage!
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(0)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(2)}
                className="px-3 py-1.5 bg-[#EA580C] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#C2410C]"
              >
                Next: Calculate Likelihoods <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: CALCULATE THE LIKELIHOODS ─── */}
        {activeStep === 2 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 3</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 2: Calculate the Feature Likelihoods P(xᵢ | C)
                </h4>
              </div>
              <span className="text-xs font-mono bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                Word Likelihoods
              </span>
            </div>

            <p className="text-xs text-[#4A3B4E]">
              Now we calculate the probability of finding each keyword inside each class. We examine the 5 Spam emails and the 5 Not Spam emails separately:
            </p>

            {/* 4 Likelihood Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Likelihood A */}
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/30 space-y-2">
                <span className="font-bold text-rose-950 font-sans block">
                  A. &quot;Free&quot; in Spam Emails (Emails 1, 2, 3, 4)
                </span>
                <p className="text-gray-600 text-[11px]">Among 5 Spam emails, 4 contain &quot;Free&quot;:</p>
                <MathBlock formula="P(\text{Free}=\text{Yes} \mid \text{Spam}) = \frac{4}{5} = \mathbf{0.80}" />
              </div>

              {/* Likelihood B */}
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/30 space-y-2">
                <span className="font-bold text-rose-950 font-sans block">
                  B. &quot;Win&quot; in Spam Emails (Emails 1, 2, 5)
                </span>
                <p className="text-gray-600 text-[11px]">Among 5 Spam emails, 3 contain &quot;Win&quot;:</p>
                <MathBlock formula="P(\text{Win}=\text{Yes} \mid \text{Spam}) = \frac{3}{5} = \mathbf{0.60}" />
              </div>

              {/* Likelihood C */}
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <span className="font-bold text-emerald-950 font-sans block">
                  C. &quot;Free&quot; in Not Spam Emails (Email 9)
                </span>
                <p className="text-gray-600 text-[11px]">Among 5 Not Spam emails, only 1 contains &quot;Free&quot;:</p>
                <MathBlock formula="P(\text{Free}=\text{Yes} \mid \text{Not Spam}) = \frac{1}{5} = \mathbf{0.20}" />
              </div>

              {/* Likelihood D */}
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <span className="font-bold text-emerald-950 font-sans block">
                  D. &quot;Win&quot; in Not Spam Emails (Email 10)
                </span>
                <p className="text-gray-600 text-[11px]">Among 5 Not Spam emails, only 1 contains &quot;Win&quot;:</p>
                <MathBlock formula="P(\text{Win}=\text{Yes} \mid \text{Not Spam}) = \frac{1}{5} = \mathbf{0.20}" />
              </div>
            </div>

            {/* Summary Likelihood Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#FFF7ED] text-[#9A3412] border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-4">Conditional Probability Term</th>
                    <th className="py-2.5 px-4">Value</th>
                    <th className="py-2.5 px-4">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 px-4 font-bold">P(Free = Yes | Spam)</td>
                    <td className="py-2.5 px-4 text-rose-700 font-extrabold">0.80</td>
                    <td className="py-2.5 px-4 text-gray-600">&quot;Free&quot; is very common in spam (80%)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold">P(Win = Yes | Spam)</td>
                    <td className="py-2.5 px-4 text-rose-700 font-extrabold">0.60</td>
                    <td className="py-2.5 px-4 text-gray-600">&quot;Win&quot; frequently appears in spam (60%)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold">P(Free = Yes | Not Spam)</td>
                    <td className="py-2.5 px-4 text-emerald-700 font-extrabold">0.20</td>
                    <td className="py-2.5 px-4 text-gray-600">Rare in legitimate mail (20%)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold">P(Win = Yes | Not Spam)</td>
                    <td className="py-2.5 px-4 text-emerald-700 font-extrabold">0.20</td>
                    <td className="py-2.5 px-4 text-gray-600">Rare in legitimate mail (20%)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(1)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="px-3 py-1.5 bg-[#EA580C] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#C2410C]"
              >
                Next: Apply Naive Bayes Formula <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: APPLY NAIVE BAYES FORMULA & WHY NAIVE ─── */}
        {activeStep === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 4</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 3: Apply Bayes&apos; Theorem &amp; The &quot;Naive&quot; Independence Assumption
                </h4>
              </div>
              <span className="text-xs font-mono bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                P(C|X) ∝ P(C) · ∏ P(xᵢ|C)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FDBA74] space-y-2 text-xs text-[#2D1F33]">
              <h5 className="font-bold text-sm text-[#9A3412] flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#EA580C]" /> Bayes&apos; Theorem
              </h5>
              <MathBlock
                formula="P(C \mid X) = \frac{P(X \mid C) \times P(C)}{P(X)}"
                label="Bayes' Theorem"
              />
              <ul className="list-disc pl-5 space-y-1 text-[#4A3B4E]">
                <li><MathInline formula="P(C \mid X)" />: <strong>Posterior</strong> probability of class given observed words.</li>
                <li><MathInline formula="P(X \mid C)" />: <strong>Likelihood</strong> of observing those words given the class.</li>
                <li><MathInline formula="P(C)" />: <strong>Prior</strong> probability of the class.</li>
                <li><MathInline formula="P(X)" />: Marginal probability of observing the words (the normalizer).</li>
              </ul>
            </div>

            {/* Why is it called Naive? */}
            <div className="p-4 rounded-xl border-2 border-orange-300 bg-orange-50/50 space-y-2 text-xs">
              <span className="font-bold text-orange-950 flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4 text-[#EA580C]" /> But Why is it Called &quot;Naive&quot;?
              </span>
              <p className="text-orange-900 leading-relaxed">
                Because it makes a bold, simplifying assumption: it assumes that <strong>all features are conditionally independent given the class</strong>.
              </p>
              <div className="p-3 bg-white rounded-lg border border-orange-200 font-mono text-center">
                <MathBlock formula="P(X \mid C) = P(\text{Free} \mid C) \times P(\text{Win} \mid C)" />
              </div>
              <p className="text-orange-800 text-[11px] leading-relaxed">
                In reality, words like &quot;Free&quot; and &quot;Win&quot; often appear together in spam. But assuming conditional independence allows us to simply <strong>multiply individual probabilities</strong>, making calculations amazingly fast!
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(4)}
                className="px-3 py-1.5 bg-[#EA580C] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#C2410C]"
              >
                Next: Calculate Class Scores <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 5: CALCULATE CLASS SCORES ─── */}
        {activeStep === 4 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 5</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 4: Calculate the Score for Each Class
                </h4>
              </div>
              <span className="text-xs font-mono bg-rose-50 text-rose-800 px-2.5 py-1 rounded-full border border-rose-200">
                Score(Spam) = 0.24 &gt; Score(Not Spam) = 0.02
              </span>
            </div>

            <p className="text-xs text-[#4A3B4E]">
              Our new email contains: <span className="font-mono font-bold text-[#1A1020]">Free = Yes</span> and <span className="font-mono font-bold text-[#1A1020]">Win = Yes</span>. We calculate the unnormalized joint score for each class:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Spam Score */}
              <div className="p-4 rounded-xl border-2 border-rose-200 bg-rose-50/40 space-y-2">
                <span className="font-bold text-rose-950 font-sans block text-sm">
                  A. Calculate Spam Score:
                </span>
                <p className="text-[11px] text-gray-600">
                  <MathInline formula="P(\text{Spam} \mid X) \propto P(\text{Spam}) \times P(\text{Free} \mid \text{Spam}) \times P(\text{Win} \mid \text{Spam})" />
                </p>
                <p className="text-rose-900 font-bold">
                  = 0.5 × 0.8 × 0.6
                </p>
                <div className="p-3 bg-white border-2 border-rose-400 rounded-xl text-center">
                  <span className="font-mono font-extrabold text-base text-rose-700">
                    Score(Spam) = 0.24
                  </span>
                </div>
              </div>

              {/* Not Spam Score */}
              <div className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/40 space-y-2">
                <span className="font-bold text-emerald-950 font-sans block text-sm">
                  B. Calculate Not Spam Score:
                </span>
                <p className="text-[11px] text-gray-600">
                  <MathInline formula="P(\text{Not Spam} \mid X) \propto P(\text{Not Spam}) \times P(\text{Free} \mid \text{Not Spam}) \times P(\text{Win} \mid \text{Not Spam})" />
                </p>
                <p className="text-emerald-900 font-bold">
                  = 0.5 × 0.2 × 0.2
                </p>
                <div className="p-3 bg-white border-2 border-emerald-400 rounded-xl text-center">
                  <span className="font-mono font-extrabold text-base text-emerald-700">
                    Score(Not Spam) = 0.02
                  </span>
                </div>
              </div>
            </div>

            {/* Score Comparison Box */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between text-xs font-mono">
              <div>
                <strong>Direct Score Comparison:</strong>
                <div className="text-sm font-extrabold text-[#1A1020] mt-1">
                  Score(Spam) = 0.24 &nbsp; vs &nbsp; Score(Not Spam) = 0.02
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-sans font-bold text-xs">
                Spam is 12× higher!
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(3)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(5)}
                className="px-3 py-1.5 bg-[#EA580C] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#C2410C]"
              >
                Next: Normalize to Probabilities <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 6: CALCULATE FINAL NORMALIZED PROBABILITIES ─── */}
        {activeStep === 5 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 6</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 5: Normalize Scores into Final Probabilities
                </h4>
              </div>
              <span className="text-xs font-mono bg-rose-50 text-rose-800 px-2.5 py-1 rounded-full border border-rose-200">
                P(Spam) ≈ 92.3%
              </span>
            </div>

            <p className="text-xs text-[#4A3B4E]">
              We can compare raw scores directly to predict the class. But to obtain <strong>valid probabilities that sum to 1.0 (100%)</strong>, we divide each score by the sum of all scores (<MathInline formula="P(X) = 0.24 + 0.02 = 0.26" />):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl border-2 border-rose-300 bg-rose-50/50 space-y-2">
                <span className="font-bold text-rose-950 font-sans block text-sm">
                  Probability of Spam:
                </span>
                <MathBlock formula="P(\text{Spam} \mid X) = \frac{0.24}{0.24 + 0.02} = \frac{0.24}{0.26} \approx \mathbf{0.923}" />
                <div className="text-center font-extrabold text-lg text-rose-700">
                  92.3% Spam
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 space-y-2">
                <span className="font-bold text-emerald-950 font-sans block text-sm">
                  Probability of Not Spam:
                </span>
                <MathBlock formula="P(\text{Not Spam} \mid X) = \frac{0.02}{0.24 + 0.02} = \frac{0.02}{0.26} \approx \mathbf{0.077}" />
                <div className="text-center font-extrabold text-lg text-emerald-700">
                  7.7% Not Spam
                </div>
              </div>
            </div>

            {/* Prediction Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-center space-y-1 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-widest font-bold opacity-90 block">
                Final Model Verdict:
              </span>
              <div className="text-2xl font-black flex items-center justify-center gap-2">
                <ShieldAlert className="w-7 h-7" /> PREDICTED CLASS: SPAM
              </div>
              <p className="text-xs opacity-90 font-mono">
                92.3% confidence Spam vs 7.7% Not Spam
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(4)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(6)}
                className="px-3 py-1.5 bg-[#EA580C] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#C2410C]"
              >
                Next: Complete Workflow <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 7: COMPLETE NAIVE BAYES WORKFLOW ─── */}
        {activeStep === 6 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 7</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  7. The Complete Naive Bayes Workflow
                </h4>
              </div>
              <span className="text-xs font-mono bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                5-Stage Pipeline
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 font-bold flex items-center justify-center mb-1 text-[11px]">1</div>
                <span className="font-bold text-[#1A1020]">Training Dataset</span>
                <p className="text-[10px] text-gray-500 mt-1">Collect labeled emails (Spam / Not Spam).</p>
              </div>

              <div className="p-3 rounded-xl border border-orange-200 bg-orange-50/50 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-orange-200 text-orange-800 font-bold flex items-center justify-center mb-1 text-[11px]">2</div>
                <span className="font-bold text-orange-950">Calculate Priors</span>
                <p className="text-[10px] text-orange-700 mt-1"><MathInline formula="P(\text{Spam}), P(\text{Not Spam})" /></p>
              </div>

              <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center mb-1 text-[11px]">3</div>
                <span className="font-bold text-amber-950">Compute Likelihoods</span>
                <p className="text-[10px] text-amber-700 mt-1"><MathInline formula="P(\text{word} \mid C)" /> for each feature.</p>
              </div>

              <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center mb-1 text-[11px]">4</div>
                <span className="font-bold text-purple-950">Apply Bayes' Theorem</span>
                <p className="text-[10px] text-purple-700 mt-1">Multiply prior by all feature likelihoods.</p>
              </div>

              <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center mb-1 text-[11px]">5</div>
                <span className="font-bold text-rose-950">Pick Highest Class</span>
                <p className="text-[10px] text-rose-700 mt-1">Predict class that maximizes the score (MAP).</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(5)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(7)}
                className="px-3 py-1.5 bg-[#EA580C] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#C2410C]"
              >
                Next: What If Probability is Zero? <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 8: ZERO PROBABILITY & LAPLACE SMOOTHING ─── */}
        {activeStep === 7 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 8</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  8. Important Trap: What if a Probability is Zero? (Laplace Smoothing)
                </h4>
              </div>
              <span className="text-xs font-mono bg-rose-50 text-rose-800 px-2.5 py-1 rounded-full border border-rose-200">
                The Zero Frequency Problem
              </span>
            </div>

            <div className="p-4 rounded-xl border-2 border-rose-200 bg-rose-50/50 space-y-2 text-xs text-[#2D1F33]">
              <span className="font-bold text-rose-950 flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4 text-rose-600" /> The Dangerous Zero-Multiplier Trap:
              </span>
              <p className="leading-relaxed text-rose-900">
                Imagine that none of our 5 training Spam emails happened to contain the word <strong>&quot;Lottery&quot;</strong>.
              </p>
              <div className="p-2.5 bg-white rounded-lg border border-rose-200 font-mono text-center text-xs">
                <MathBlock formula="P(\text{Lottery} \mid \text{Spam}) = \frac{0}{5} = \mathbf{0}" />
              </div>
              <p className="text-rose-900 leading-relaxed">
                If a new email arrives with &quot;Free&quot;, &quot;Win&quot;, and &quot;Lottery&quot;, multiplying probabilities causes the entire spam score to collapse to zero:
              </p>
              <div className="p-2.5 bg-white rounded-lg border border-rose-200 font-mono text-center text-xs text-rose-800">
                0.5 × 0.8 × 0.6 × <strong>0</strong> = <strong>0.0000</strong>!
              </div>
              <p className="text-rose-800 text-[11px]">
                One single unseen word completely erases all other strong evidence!
              </p>
            </div>

            {/* The Solution: Laplace Smoothing */}
            <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/60 space-y-2 text-xs">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> The Solution: Laplace Smoothing (Add-1 Smoothing)
              </span>
              <p className="text-emerald-900 leading-relaxed">
                We add a small pseudo-count (<MathInline formula="+1" />) to the numerator and <MathInline formula="+K" /> to the denominator:
              </p>
              <MathBlock
                formula="P(x_i \mid C) = \frac{\text{Count}(x_i, C) + 1}{\text{Count}(C) + K}"
                label="Laplace Smoothing Formula"
              />
              <ul className="list-disc pl-5 space-y-1 text-emerald-900 text-[11px]">
                <li><MathInline formula="K" />: Number of possible values for feature <MathInline formula="x_i" /> (e.g. <MathInline formula="K = 2" /> for binary Yes/No).</li>
                <li>Ensures no feature ever has a probability of exactly zero, preserving stability.</li>
              </ul>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(6)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveStep(8)}
                className="px-3 py-1.5 bg-[#EA580C] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#C2410C]"
              >
                Next: Quiz & Live Simulator <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 9: TEST YOUR UNDERSTANDING QUIZ & LIVE SIMULATOR ─── */}
        {activeStep === 8 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Section 9</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  9. Test Your Understanding &amp; Live Interactive Email Tester
                </h4>
              </div>
              <span className="text-xs font-mono bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full border border-orange-200">
                Quiz &amp; Live Tool
              </span>
            </div>

            {/* Interactive Concept Quiz */}
            <div className="p-5 rounded-2xl border-2 border-orange-200 bg-orange-50/30 space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#EA580C]" />
                <span className="font-bold text-xs font-mono text-orange-950 uppercase">
                  Concept Check: Why is Naive Bayes called &quot;Naive&quot;?
                </span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: 1,
                    text: 'Because it assumes that features are conditionally independent given the class.',
                    correct: true,
                    explanation: 'Correct! In real life, words co-occur (e.g. "free" and "win"), but Naive Bayes naively assumes each feature provides independent evidence.',
                  },
                  {
                    id: 2,
                    text: 'Because it randomly chooses a class without analyzing data.',
                    correct: false,
                    explanation: 'Incorrect. Naive Bayes is a principled probabilistic model based on rigorous Bayes’ Theorem.',
                  },
                  {
                    id: 3,
                    text: "Because it doesn't use probabilities in its calculations.",
                    correct: false,
                    explanation: 'Incorrect. Naive Bayes is entirely based on prior and likelihood probabilities.',
                  },
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setQuizSelection(option.id)}
                    className={`p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                      quizSelection === option.id
                        ? option.correct
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-rose-500 bg-rose-50 text-rose-950'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {quizSelection === option.id && (
                        <span>
                          {option.correct ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          )}
                        </span>
                      )}
                    </div>
                    {quizSelection === option.id && (
                      <p
                        className={`text-[11px] mt-2 pt-2 border-t ${
                          option.correct
                            ? 'text-emerald-800 border-emerald-200'
                            : 'text-rose-800 border-rose-200'
                        }`}
                      >
                        {option.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Interactive Simulator */}
            <div className="p-5 rounded-2xl border-2 border-[#FDBA74] bg-[#FFF7ED] space-y-4">
              <span className="font-bold text-xs uppercase text-[#9A3412] font-mono flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#EA580C]" /> Live Email Classifier Simulator:
              </span>
              <p className="text-xs text-[#524156]">
                Toggle the presence of &quot;Free&quot; and &quot;Win&quot; in a new email to see the Naive Bayes engine re-calculate priors, likelihoods, joint scores, and normalized posteriors:
              </p>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-[#FED7AA]">
                  <span className="text-gray-600 font-bold">Contains &quot;Free&quot;?</span>
                  <button
                    onClick={() => setInputFree('Yes')}
                    className={`px-3 py-1 rounded-lg font-bold border ${
                      inputFree === 'Yes' ? 'bg-[#EA580C] text-white border-[#EA580C]' : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setInputFree('No')}
                    className={`px-3 py-1 rounded-lg font-bold border ${
                      inputFree === 'No' ? 'bg-[#EA580C] text-white border-[#EA580C]' : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    No
                  </button>
                </div>

                <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-[#FED7AA]">
                  <span className="text-gray-600 font-bold">Contains &quot;Win&quot;?</span>
                  <button
                    onClick={() => setInputWin('Yes')}
                    className={`px-3 py-1 rounded-lg font-bold border ${
                      inputWin === 'Yes' ? 'bg-[#EA580C] text-white border-[#EA580C]' : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setInputWin('No')}
                    className={`px-3 py-1 rounded-lg font-bold border ${
                      inputWin === 'No' ? 'bg-[#EA580C] text-white border-[#EA580C]' : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Live Output Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                {/* Spam probability bar */}
                <div className="p-3.5 rounded-xl border bg-white space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-rose-700">Spam Probability:</span>
                    <span className="font-extrabold text-sm text-rose-700">{live.probSpam}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 transition-all duration-300"
                      style={{ width: `${live.probSpam}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Joint score: 0.5 × {live.pFreeSpam} × {live.pWinSpam} = {live.scoreSpam}
                  </div>
                </div>

                {/* Not Spam probability bar */}
                <div className="p-3.5 rounded-xl border bg-white space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-700">Not Spam Probability:</span>
                    <span className="font-extrabold text-sm text-emerald-700">{live.probNotSpam}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${live.probNotSpam}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Joint score: 0.5 × {live.pFreeNotSpam} × {live.pWinNotSpam} = {live.scoreNotSpam}
                  </div>
                </div>
              </div>

              {/* Live prediction badge */}
              <div className="p-3.5 bg-white rounded-xl border border-[#FDBA74] flex items-center justify-between text-xs">
                <span className="font-mono text-gray-700 font-bold">
                  Predicted Class for (Free={inputFree}, Win={inputWin}):
                </span>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-white ${
                    live.prediction === 'Spam' ? 'bg-rose-600' : 'bg-emerald-600'
                  }`}
                >
                  {live.prediction}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(7)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  setActiveStep(0);
                  setInputFree('Yes');
                  setInputWin('Yes');
                  setQuizSelection(null);
                }}
                className="px-3 py-1.5 border border-orange-300 text-orange-800 rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-orange-50"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart Exercise
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
