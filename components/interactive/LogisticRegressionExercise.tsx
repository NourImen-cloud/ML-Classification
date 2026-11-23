'use client';

import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calculator,
  Sliders,
  Sparkles,
  HelpCircle,
  RotateCcw,
  TrendingUp,
  Check,
  Zap,
  GraduationCap,
} from 'lucide-react';
import { MathBlock, MathInline } from '@/components/ui/KatexFormula';

interface StudentData {
  student: string;
  hours: number;
  result: 'Pass' | 'Fail';
  classNum: 0 | 1;
}

const TRAINING_DATA: StudentData[] = [
  { student: 'A', hours: 1, result: 'Fail', classNum: 0 },
  { student: 'B', hours: 2, result: 'Fail', classNum: 0 },
  { student: 'C', hours: 3, result: 'Fail', classNum: 0 },
  { student: 'D', hours: 4, result: 'Pass', classNum: 1 },
  { student: 'E', hours: 5, result: 'Pass', classNum: 1 },
  { student: 'F', hours: 6, result: 'Pass', classNum: 1 },
];

export function LogisticRegressionExercise() {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Model parameters (learned)
  const w = 1.2;
  const b = -4.2;

  // Interactive tester state
  const [customHours, setCustomHours] = useState<number>(5);
  const [threshold, setThreshold] = useState<number>(0.5);

  const calculateModel = (hours: number, thresh: number = 0.5) => {
    const z = Number((w * hours + b).toFixed(4));
    const prob = 1 / (1 + Math.exp(-z));
    const passed = prob >= thresh;
    return { z, prob, passed };
  };

  const currentCalc = calculateModel(customHours, threshold);

  const stepsList = [
    '1. Problem & Dataset',
    '2. Linear Score z = wx + b',
    '3. Sigmoid Function',
    '4. Threshold Decision',
    '5. Case x = 2 Hours',
    '6. Comparison & Boundary',
    '7. Process Flow & Simulator',
  ];

  return (
    <div className="rounded-2xl border-2 border-[#10B981]/30 bg-gradient-to-b from-[#F0FDF4] to-white p-5 md:p-7 space-y-6 shadow-md my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#A7F3D0] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-[#10B981] text-white">
              Practical Masterclass
            </span>
            <span className="text-xs font-mono font-bold text-[#065F46] bg-[#D1FAE5] px-2 py-0.5 rounded-md border border-[#A7F3D0]">
              Step-by-Step Exercise
            </span>
          </div>
          <h3 className="font-extrabold text-[#1A1020] text-lg md:text-xl mt-1.5 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#10B981]" />
            Predicting Exam Success with Logistic Regression: Hours → Pass/Fail
          </h3>
          <p className="text-xs text-[#524156] mt-0.5">
            Follow the complete mathematical pipeline from raw study hours to linear score, sigmoid probability, and final thresholded class.
          </p>
        </div>

        {/* Step Indicator pill */}
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#A7F3D0] shadow-2xs self-start sm:self-auto font-mono text-xs">
          <span className="text-[#6D5970]">Step:</span>
          <span className="font-bold text-[#059669]">{activeStep + 1} / {stepsList.length}</span>
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
                ? 'bg-[#10B981] text-white shadow-sm'
                : 'bg-white text-[#524156] border border-[#D1FAE5] hover:border-[#10B981]/50 hover:bg-[#ECFDF5]'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                activeStep === idx ? 'bg-white text-[#10B981]' : 'bg-[#D1FAE5] text-[#065F46]'
              }`}
            >
              {idx + 1}
            </span>
            <span>{stepName.replace(/^[0-9]+\.\s*/, '')}</span>
          </button>
        ))}
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white rounded-2xl border border-[#D1FAE5] p-5 shadow-xs space-y-6">
        {/* ─── STEP 1: DEFINE OUR PROBLEM & TRAINING DATASET ─── */}
        {activeStep === 0 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase">Section 1</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  1. Define Our Problem & Training Dataset
                </h4>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                6 Observations · 1 Feature (Hours) · Binary Target
              </span>
            </div>

            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Imagine we want to predict whether a student will pass an exam based on the number of hours they studied.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Input Feature: Hours Studied (x)</span>
                </div>
                <p className="text-blue-800">
                  Continuous numeric variable representing preparation time (e.g. 1 to 6 hours).
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Target Variable: Result (y)</span>
                </div>
                <p className="text-emerald-800">
                  Two discrete classes: <strong className="text-rose-700">0 = Fail</strong> or <strong className="text-emerald-700">1 = Pass</strong>.
                </p>
              </div>
            </div>

            {/* Training Dataset Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold font-mono text-[#4A3B4E]">
                Collected Training Data (6 Students):
              </span>

              <div className="overflow-x-auto rounded-xl border border-[#D1FAE5]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#F0FDF4] text-[#065F46] border-b border-[#D1FAE5]">
                    <tr>
                      <th className="py-2.5 px-4">Student</th>
                      <th className="py-2.5 px-4">Hours Studied (x)</th>
                      <th className="py-2.5 px-4">Result</th>
                      <th className="py-2.5 px-4">Encoded Class (y)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6F9F0]">
                    {TRAINING_DATA.map((s) => (
                      <tr key={s.student} className="hover:bg-[#F0FDF4] transition-colors">
                        <td className="py-2.5 px-4 font-bold text-gray-700">Student {s.student}</td>
                        <td className="py-2.5 px-4 font-bold text-blue-900">{s.hours} hr{s.hours > 1 ? 's' : ''}</td>
                        <td className="py-2.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold ${
                              s.result === 'Pass'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {s.result === 'Pass' ? <Check className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {s.result}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-extrabold text-[#1A1020]">{s.classNum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
              <div>
                <strong>Our Objective:</strong> Train a Logistic Regression model that takes a new student&apos;s hours and outputs a calibrated probability of passing.
              </div>
              <button
                onClick={() => setActiveStep(1)}
                className="px-3 py-1.5 bg-[#10B981] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#059669] transition-all shrink-0 ml-2"
              >
                Go to Step 2 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: LINEAR SCORE Z = WX + B ─── */}
        {activeStep === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase">Section 2</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  2. Understand What the Model Calculates: Linear Score z
                </h4>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                z = wx + b = 1.8
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#A7F3D0] space-y-2 text-xs text-[#2D1F33]">
              <h5 className="font-bold text-sm text-[#065F46] flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#10B981]" /> Stage 1: The Linear Combination
              </h5>
              <p className="leading-relaxed">
                Logistic Regression first computes a weighted linear combination of the input features:
              </p>
              <MathBlock formula="z = wx + b" label="Linear Model Equation" />
              <ul className="list-disc pl-5 space-y-1 text-[#4A3B4E]">
                <li><MathInline formula="x" />: Number of hours studied.</li>
                <li><MathInline formula="w" />: Learned weight (slope/importance of studying).</li>
                <li><MathInline formula="b" />: Learned bias (intercept).</li>
              </ul>
            </div>

            {/* Learned Parameters Box */}
            <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3 text-xs">
              <span className="font-bold text-gray-700 uppercase font-mono tracking-wider text-[11px] block">
                Learned Parameters (Hypothetical for our example):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                  <span className="font-bold">Weight w:</span> +1.2
                  <p className="text-[10px] text-blue-700 font-sans mt-0.5">
                    Positive weight: each additional hour of studying increases the linear score by 1.2.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-purple-900">
                  <span className="font-bold">Bias b:</span> -4.2
                  <p className="text-[10px] text-purple-700 font-sans mt-0.5">
                    Negative baseline: with 0 hours studied, student has a strongly negative score.
                  </p>
                </div>
              </div>
            </div>

            {/* Example Calculation for x = 5 */}
            <div className="p-4 rounded-xl border-2 border-[#A7F3D0] bg-[#F0FDF4]/50 space-y-3 text-xs">
              <span className="font-bold text-emerald-900 uppercase font-mono text-[11px] block">
                Example: A new student studied for 5 hours (x = 5):
              </span>
              <div className="font-mono space-y-1 text-xs text-[#2D1F33]">
                <p><MathInline formula="z = (1.2 \times 5) - 4.2" /></p>
                <p><MathInline formula="z = 6 - 4.2" /></p>
                <div className="p-3 bg-white border-2 border-[#10B981] rounded-xl text-center">
                  <span className="font-mono font-extrabold text-base text-[#065F46]">
                    z = 1.8
                  </span>
                </div>
              </div>

              {/* Crucial question alert */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600" /> But wait! Is z = 1.8 our probability?
                </div>
                <p className="text-amber-800 leading-relaxed">
                  <strong>NO!</strong> The linear score <MathInline formula="z" /> can be any real number from <MathInline formula="-\infty" /> to <MathInline formula="+\infty" /> (e.g. -10, 0, 1.8, 100). A probability must strictly lie between <strong>0.0 and 1.0 (0% to 100%)</strong>. We need a squashing function!
                </p>
              </div>
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
                className="px-3 py-1.5 bg-[#10B981] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#059669]"
              >
                Next: Apply the Sigmoid Function <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: APPLY THE SIGMOID FUNCTION ─── */}
        {activeStep === 2 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase">Section 3</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  3. Apply the Sigmoid Function: Squashing z into Probability
                </h4>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                P(y=1|x=5) ≈ 0.858 (85.8%)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#A7F3D0] space-y-2 text-xs text-[#2D1F33]">
              <h5 className="font-bold text-sm text-[#065F46] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#10B981]" /> The Sigmoid Squasher
              </h5>
              <p className="leading-relaxed">
                The Sigmoid activation function maps any real-valued number into a smooth, calibrated probability in <MathInline formula="[0, 1]" />:
              </p>
              <MathBlock
                formula="P(y=1 \mid x) = \sigma(z) = \frac{1}{1 + e^{-z}}"
                label="Sigmoid Function Formula"
              />
            </div>

            {/* Substitution Breakdown */}
            <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3 text-xs">
              <span className="font-bold text-gray-700 uppercase font-mono tracking-wider text-[11px] block">
                Substituting z = 1.8 into Sigmoid:
              </span>
              <div className="font-mono space-y-2 text-xs text-[#2D1F33]">
                <p><MathInline formula="P(y=1 \mid x) = \frac{1}{1 + e^{-1.8}}" /></p>
                <p className="text-gray-600 text-[11px]">
                  Since <MathInline formula="e^{-1.8} \approx 0.1653" />:
                </p>
                <p><MathInline formula="P(y=1 \mid x) = \frac{1}{1 + 0.1653} = \frac{1}{1.1653}" /></p>

                <div className="p-3.5 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-center space-y-1">
                  <span className="font-mono font-black text-lg text-emerald-800 block">
                    P(y=1 | x=5) ≈ 0.858
                  </span>
                  <span className="font-sans font-bold text-xs text-emerald-700">
                    Predicted Probability of Passing = 85.8%
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <strong className="block">What does this probability mean?</strong>
              <p className="text-blue-800 leading-relaxed">
                The model estimates an <strong>85.8% chance</strong> that a student who studied for 5 hours will pass the exam. It reflects strong positive confidence without claiming absolute 100% certainty.
              </p>
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
                className="px-3 py-1.5 bg-[#10B981] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#059669]"
              >
                Next: Convert Probability to Class <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: CONVERT PROBABILITY INTO A CLASS ─── */}
        {activeStep === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase">Section 4</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  4. Convert Probability into a Discrete Class via Threshold
                </h4>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                0.858 &gt; 0.5 → PASS
              </span>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3 text-xs">
              <span className="font-bold text-gray-700 uppercase font-mono tracking-wider text-[11px] block">
                The Decision Threshold (Default = 0.5):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <strong>If Probability ≥ 0.5:</strong>
                  <div className="text-emerald-700 font-sans text-[11px] mt-0.5">
                    Predict Class 1 (Pass)
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                  <strong>If Probability &lt; 0.5:</strong>
                  <div className="text-rose-700 font-sans text-[11px] mt-0.5">
                    Predict Class 0 (Fail)
                  </div>
                </div>
              </div>
            </div>

            {/* Evaluation Card */}
            <div className="p-5 rounded-2xl bg-[#F0FDF4] border-2 border-emerald-300 space-y-3 text-center">
              <span className="text-xs font-mono text-emerald-800 uppercase font-bold tracking-wider">
                Comparing 5-Hour Student to Threshold:
              </span>
              <div className="font-mono text-base font-bold text-emerald-950 flex items-center justify-center gap-2">
                <span>P = 0.858</span>
                <span className="text-emerald-600 font-black">&gt;</span>
                <span>Threshold 0.500</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-sm shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
                FINAL PREDICTION: PASS (Class 1)
              </div>
              <p className="text-xs text-emerald-700 font-mono">
                Confidence: 85.8% Pass / 14.2% Fail
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
                className="px-3 py-1.5 bg-[#10B981] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#059669]"
              >
                Next: What if student studied only 2 hours? <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 5: WHAT IF ANOTHER STUDENT STUDIED FOR 2 HOURS? ─── */}
        {activeStep === 4 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase">Section 5</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  5. What if Another Student Studied for Only 2 Hours? (x = 2)
                </h4>
              </div>
              <span className="text-xs font-mono bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full border border-rose-200">
                P ≈ 0.142 &lt; 0.5 → FAIL
              </span>
            </div>

            <p className="text-xs text-[#4A3B4E]">
              Let&apos;s apply the exact same trained model (<MathInline formula="w = 1.2" />, <MathInline formula="b = -4.2" />) to a student who studied for only <strong>2 hours</strong>:
            </p>

            {/* Calculations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Step A: Linear Score */}
              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
                <span className="font-bold text-gray-700 font-sans uppercase text-[11px] block">
                  1. Compute Linear Score z:
                </span>
                <p><MathInline formula="z = (1.2 \times 2) - 4.2" /></p>
                <p><MathInline formula="z = 2.4 - 4.2" /></p>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 font-bold text-center">
                  z = -1.8 (Negative score!)
                </div>
              </div>

              {/* Step B: Sigmoid */}
              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
                <span className="font-bold text-gray-700 font-sans uppercase text-[11px] block">
                  2. Apply Sigmoid Squasher:
                </span>
                <p><MathInline formula="p = \frac{1}{1 + e^{-(-1.8)}} = \frac{1}{1 + e^{1.8}}" /></p>
                <p className="text-gray-500 text-[10px]">Since <MathInline formula="e^{1.8} \approx 6.0496" />:</p>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 font-bold text-center">
                  p = 1 / 7.0496 ≈ 0.142 (14.2%)
                </div>
              </div>
            </div>

            {/* Decision Result */}
            <div className="p-4 rounded-xl border-2 border-rose-200 bg-rose-50/50 space-y-2 text-center text-xs">
              <span className="font-mono text-rose-800 font-bold">
                Threshold Comparison: 0.142 &lt; 0.500
              </span>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-xs">
                  <XCircle className="w-4 h-4" /> PREDICTION: FAIL (Class 0)
                </span>
              </div>
              <p className="text-[11px] text-rose-700 font-mono">
                The student has only an estimated 14.2% chance of passing, well below the 50% passing threshold.
              </p>
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
                className="px-3 py-1.5 bg-[#10B981] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#059669]"
              >
                Next: Compare Both Predictions <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 6: COMPARE OUR TWO PREDICTIONS & DECISION BOUNDARY ─── */}
        {activeStep === 5 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase">Section 6</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  6. Compare Our Two Predictions & Discover the Decision Boundary
                </h4>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                Monotonic S-Curve
              </span>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F0FDF4] text-[#065F46] border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Hours Studied (x)</th>
                    <th className="py-2.5 px-3">Linear Score (z)</th>
                    <th className="py-2.5 px-3">Probability of Passing (p)</th>
                    <th className="py-2.5 px-3">Threshold Check</th>
                    <th className="py-2.5 px-3">Final Prediction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-rose-50/40 text-rose-950">
                    <td className="py-3 px-3 font-bold">2 hours</td>
                    <td className="py-3 px-3 text-rose-700 font-bold">-1.80</td>
                    <td className="py-3 px-3 font-extrabold">14.2%</td>
                    <td className="py-3 px-3 font-bold">&lt; 0.50</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                        <XCircle className="w-3 h-3" /> Fail (0)
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-emerald-50/40 text-emerald-950 font-bold">
                    <td className="py-3 px-3">5 hours</td>
                    <td className="py-3 px-3 text-emerald-700">+1.80</td>
                    <td className="py-3 px-3 font-extrabold text-[#065F46]">85.8%</td>
                    <td className="py-3 px-3">&ge; 0.50</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                        <Check className="w-3 h-3" /> Pass (1)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key mathematical insight: Where is the boundary? */}
            <div className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/60 space-y-2 text-xs">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> Key Observation & The Exact Decision Boundary:
              </span>
              <p className="text-emerald-900 leading-relaxed">
                Notice how increasing study hours monotonically increases the predicted probability of passing. But where is the exact dividing line?
              </p>
              <div className="p-3 bg-white rounded-lg border border-emerald-300 font-mono space-y-1">
                <p>The boundary occurs exactly where <MathInline formula="p = 0.5 \iff z = 0" />:</p>
                <p><MathInline formula="wx + b = 0 \implies 1.2x - 4.2 = 0 \implies x = \frac{4.2}{1.2} = \mathbf{3.5\text{ hours}}" /></p>
              </div>
              <p className="text-emerald-800 text-[11px]">
                • If hours &gt; 3.5 hrs $\rightarrow$ Pass is predicted.<br />
                • If hours &lt; 3.5 hrs $\rightarrow$ Fail is predicted.
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
                className="px-3 py-1.5 bg-[#10B981] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#059669]"
              >
                Next: Full Process Flow & Simulator <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 7: PROCESS FLOW & LIVE INTERACTIVE SIMULATOR ─── */}
        {activeStep === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase">Section 7</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  7. Complete Process Visualization & Live Model Simulator
                </h4>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                Interactive Playground
              </span>
            </div>

            {/* Complete Flow Diagram (Pipeline) */}
            <div className="space-y-2">
              <span className="text-xs font-bold font-mono text-gray-700 uppercase block">
                The 4-Step Inference Pipeline:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center text-xs">
                {/* Stage 1 */}
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col items-center">
                  <Clock className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-800">1. Input</span>
                  <div className="font-mono font-extrabold text-xs text-blue-950 mt-1">
                    x = {customHours} hrs
                  </div>
                  <span className="text-[10px] text-gray-500">Student studied</span>
                </div>

                {/* Stage 2 */}
                <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50 flex flex-col items-center">
                  <Calculator className="w-5 h-5 text-purple-600 mb-1" />
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-800">2. Linear Score</span>
                  <div className="font-mono font-extrabold text-xs text-purple-950 mt-1">
                    z = {currentCalc.z}
                  </div>
                  <span className="text-[10px] text-gray-500">z = 1.2({customHours}) - 4.2</span>
                </div>

                {/* Stage 3 */}
                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col items-center">
                  <Sliders className="w-5 h-5 text-amber-600 mb-1" />
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-800">3. Sigmoid Squasher</span>
                  <div className="font-mono font-extrabold text-xs text-amber-950 mt-1">
                    p = {(currentCalc.prob * 100).toFixed(1)}%
                  </div>
                  <span className="text-[10px] text-gray-500">p = 1 / (1 + e^{`-${currentCalc.z}`})</span>
                </div>

                {/* Stage 4 */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col items-center ${
                    currentCalc.passed
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-rose-300 bg-rose-50 text-rose-950'
                  }`}
                >
                  {currentCalc.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 mb-1" />
                  )}
                  <span className="text-[10px] font-mono font-bold uppercase">4. Prediction</span>
                  <div className="font-mono font-black text-xs mt-1">
                    {currentCalc.passed ? 'PASS (Class 1)' : 'FAIL (Class 0)'}
                  </div>
                  <span className="text-[10px] opacity-75">vs threshold {threshold}</span>
                </div>
              </div>
            </div>

            {/* Interactive Live Simulator Controls */}
            <div className="p-5 rounded-2xl border-2 border-[#A7F3D0] bg-[#F0FDF4] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono font-bold text-[#065F46] uppercase flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#10B981]" /> Test Any Study Hours Live:
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 3.5, 4, 5, 6].map((h) => (
                    <button
                      key={h}
                      onClick={() => setCustomHours(h)}
                      className={`px-2 py-0.5 text-xs font-mono rounded font-bold transition-all ${
                        customHours === h
                          ? 'bg-[#10B981] text-white shadow-xs'
                          : 'bg-white text-gray-700 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span>Hours Studied: <strong className="text-emerald-700 font-extrabold text-sm">{customHours} hrs</strong></span>
                  <span className="text-gray-500">Range: 0 to 8 hours</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.25"
                  value={customHours}
                  onChange={(e) => setCustomHours(parseFloat(e.target.value))}
                  className="w-full accent-[#10B981] cursor-pointer"
                />
              </div>

              {/* Live Probability Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-600">Predicted Probability of Passing:</span>
                  <span className="font-bold text-sm text-[#065F46]">
                    {(currentCalc.prob * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-300 ${
                      currentCalc.passed ? 'bg-[#10B981]' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, currentCalc.prob * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>0% (Certain Fail)</span>
                  <span className="text-amber-700 font-bold">50% (Threshold: 3.5 hrs)</span>
                  <span>100% (Certain Pass)</span>
                </div>
              </div>

              {/* Threshold Adjuster (Educational) */}
              <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-gray-600 font-mono">
                  Decision Threshold: <strong className="text-emerald-800">{threshold}</strong>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setThreshold(0.3)}
                    className={`px-2 py-0.5 text-[11px] rounded font-mono font-bold ${
                      threshold === 0.3 ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border'
                    }`}
                  >
                    0.3 (Lenient)
                  </button>
                  <button
                    onClick={() => setThreshold(0.5)}
                    className={`px-2 py-0.5 text-[11px] rounded font-mono font-bold ${
                      threshold === 0.5 ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border'
                    }`}
                  >
                    0.5 (Default)
                  </button>
                  <button
                    onClick={() => setThreshold(0.7)}
                    className={`px-2 py-0.5 text-[11px] rounded font-mono font-bold ${
                      threshold === 0.7 ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border'
                    }`}
                  >
                    0.7 (Strict)
                  </button>
                </div>
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
                onClick={() => {
                  setActiveStep(0);
                  setCustomHours(5);
                  setThreshold(0.5);
                }}
                className="px-3 py-1.5 border border-emerald-300 text-emerald-700 rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-emerald-50"
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
