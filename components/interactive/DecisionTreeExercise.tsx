'use client';

import React, { useState } from 'react';
import {
  Sun,
  CloudRain,
  Wind,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calculator,
  Trophy,
  GitBranch,
  Sparkles,
  HelpCircle,
  Play,
  RotateCcw,
  Check,
  Zap,
} from 'lucide-react';
import { MathBlock, MathInline } from '@/components/ui/KatexFormula';

interface DayRecord {
  day: number;
  weather: 'Sunny' | 'Rainy';
  wind: 'Weak' | 'Strong';
  play: 'Yes' | 'No';
}

const DATASET: DayRecord[] = [
  { day: 1, weather: 'Sunny', wind: 'Weak', play: 'No' },
  { day: 2, weather: 'Sunny', wind: 'Weak', play: 'No' },
  { day: 3, weather: 'Sunny', wind: 'Weak', play: 'No' },
  { day: 4, weather: 'Sunny', wind: 'Strong', play: 'Yes' },
  { day: 5, weather: 'Rainy', wind: 'Weak', play: 'Yes' },
  { day: 6, weather: 'Rainy', wind: 'Weak', play: 'Yes' },
  { day: 7, weather: 'Rainy', wind: 'Strong', play: 'Yes' },
  { day: 8, weather: 'Rainy', wind: 'Strong', play: 'Yes' },
];

export function DecisionTreeExercise() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [filterFeature, setFilterFeature] = useState<'All' | 'Sunny' | 'Rainy' | 'Weak' | 'Strong'>('All');

  // Interactive tester state (Step 8)
  const [testWeather, setTestWeather] = useState<'Sunny' | 'Rainy'>('Sunny');
  const [testWind, setTestWind] = useState<'Weak' | 'Strong'>('Weak');
  const [simulatedPath, setSimulatedPath] = useState<{
    steps: string[];
    prediction: 'Yes' | 'No';
    activeNodes: string[];
  }>({
    steps: [
      '1. Root Node: Weather = Sunny',
      '2. Internal Node: Wind = Weak',
      '3. Leaf Node reached: Prediction = No',
    ],
    prediction: 'No',
    activeNodes: ['root', 'sunny', 'wind', 'weak', 'leaf-weak'],
  });

  const handleSimulate = (weather: 'Sunny' | 'Rainy', wind: 'Weak' | 'Strong') => {
    setTestWeather(weather);
    setTestWind(wind);

    if (weather === 'Rainy') {
      setSimulatedPath({
        steps: [
          '1. Root Node: Weather = Rainy',
          '2. Pure Leaf reached directly: Prediction = Yes',
        ],
        prediction: 'Yes',
        activeNodes: ['root', 'rainy', 'leaf-rainy'],
      });
    } else {
      if (wind === 'Weak') {
        setSimulatedPath({
          steps: [
            '1. Root Node: Weather = Sunny',
            '2. Internal Node: Wind = Weak',
            '3. Leaf Node reached: Prediction = No',
          ],
          prediction: 'No',
          activeNodes: ['root', 'sunny', 'wind', 'weak', 'leaf-weak'],
        });
      } else {
        setSimulatedPath({
          steps: [
            '1. Root Node: Weather = Sunny',
            '2. Internal Node: Wind = Strong',
            '3. Leaf Node reached: Prediction = Yes',
          ],
          prediction: 'Yes',
          activeNodes: ['root', 'sunny', 'wind', 'strong', 'leaf-strong'],
        });
      }
    }
  };

  const stepsList = [
    '1. Problem & Dataset',
    '2. Root Gini (D)',
    '3. Split A: Weather',
    '4. Split B: Wind',
    '5. Best Feature Choice',
    '6. Next Level: Wind Split',
    '7. Final Tree Structure',
    '8. Interactive Predictor',
  ];

  const filteredData = DATASET.filter((d) => {
    if (filterFeature === 'Sunny') return d.weather === 'Sunny';
    if (filterFeature === 'Rainy') return d.weather === 'Rainy';
    if (filterFeature === 'Weak') return d.wind === 'Weak';
    if (filterFeature === 'Strong') return d.wind === 'Strong';
    return true;
  });

  return (
    <div className="rounded-2xl border-2 border-[#8B5CF6]/30 bg-gradient-to-b from-[#FAF8FF] to-white p-5 md:p-7 space-y-6 shadow-md my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD6FE] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-[#8B5CF6] text-white">
              Practical Masterclass
            </span>
            <span className="text-xs font-mono font-bold text-[#5B21B6] bg-[#EDE9FE] px-2 py-0.5 rounded-md border border-[#DDD6FE]">
              Step-by-Step Exercise
            </span>
          </div>
          <h3 className="font-extrabold text-[#1A1020] text-lg md:text-xl mt-1.5 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#8B5CF6]" />
            Building a Decision Tree from Scratch: The Football Predictor
          </h3>
          <p className="text-xs text-[#524156] mt-0.5">
            Follow the complete mathematical journey from raw observations to pure leaf nodes using Gini Impurity.
          </p>
        </div>

        {/* Step Indicator pill */}
        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#DDD6FE] shadow-2xs self-start sm:self-auto font-mono text-xs">
          <span className="text-[#6D5970]">Step:</span>
          <span className="font-bold text-[#8B5CF6]">{activeStep + 1} / {stepsList.length}</span>
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
                ? 'bg-[#8B5CF6] text-white shadow-sm'
                : 'bg-white text-[#524156] border border-[#E5DBFF] hover:border-[#8B5CF6]/50 hover:bg-[#F5F3FF]'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                activeStep === idx ? 'bg-white text-[#8B5CF6]' : 'bg-[#EDE9FE] text-[#6D28D9]'
              }`}
            >
              {idx + 1}
            </span>
            <span>{stepName.replace(/^[0-9]+\.\s*/, '')}</span>
          </button>
        ))}
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white rounded-2xl border border-[#E5DBFF] p-5 shadow-xs space-y-6">
        {/* ─── STEP 1: PROBLEM & DATASET ─── */}
        {activeStep === 0 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase">Section 1 & 2</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  1. Our Practical Problem & Training Dataset
                </h4>
              </div>
              <span className="text-xs font-mono bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
                8 Observations · 2 Features · 1 Binary Target
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>Feature 1: Weather</span>
                </div>
                <p className="text-amber-800">Values: <span className="font-mono font-bold">Sunny</span> or <span className="font-mono font-bold">Rainy</span>.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-sky-900">
                  <Wind className="w-4 h-4 text-sky-600" />
                  <span>Feature 2: Wind</span>
                </div>
                <p className="text-sky-800">Values: <span className="font-mono font-bold">Weak</span> or <span className="font-mono font-bold">Strong</span>.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Target: Play Football?</span>
                </div>
                <p className="text-emerald-800">Classes: <span className="font-mono font-bold">Yes (5)</span> or <span className="font-mono font-bold">No (3)</span>.</p>
              </div>
            </div>

            {/* Interactive Dataset Table */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono text-[#4A3B4E]">
                  Complete Training Dataset (8 Days):
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-gray-500 mr-1">Filter view:</span>
                  {(['All', 'Sunny', 'Rainy', 'Weak', 'Strong'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterFeature(filter)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded font-bold transition-all ${
                        filterFeature === filter
                          ? 'bg-[#8B5CF6] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#E5DBFF]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FAF8FF] text-[#5B21B6] border-b border-[#E5DBFF]">
                    <tr>
                      <th className="py-2.5 px-3">Day</th>
                      <th className="py-2.5 px-3">Weather</th>
                      <th className="py-2.5 px-3">Wind</th>
                      <th className="py-2.5 px-3">Play Football</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3EDFF]">
                    {filteredData.map((d) => (
                      <tr key={d.day} className="hover:bg-[#FAF8FF] transition-colors">
                        <td className="py-2 px-3 font-bold text-gray-500">Day {d.day}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold ${
                              d.weather === 'Sunny'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {d.weather === 'Sunny' ? <Sun className="w-3 h-3" /> : <CloudRain className="w-3 h-3" />}
                            {d.weather}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold ${
                              d.wind === 'Weak'
                                ? 'bg-sky-50 text-sky-700'
                                : 'bg-indigo-50 text-indigo-700'
                            }`}
                          >
                            <Wind className="w-3 h-3" />
                            {d.wind}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-extrabold ${
                              d.play === 'Yes'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {d.play === 'Yes' ? <Check className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {d.play}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center justify-between">
              <div>
                <strong>Class distribution:</strong> Total = 8 observations (Yes = 5, No = 3).
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Before building our tree, we must measure how &ldquo;mixed&rdquo; or impure this starting dataset is!
                </p>
              </div>
              <button
                onClick={() => setActiveStep(1)}
                className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#7C3AED] transition-all shrink-0 ml-2"
              >
                Go to Step 1 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: GINI OF ROOT DATASET ─── */}
        {activeStep === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase">Section 3</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 1: Calculate the Gini Impurity of the Entire Dataset D
                </h4>
              </div>
              <span className="text-xs font-mono bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
                Gini(D) = 0.46875
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8FF] border border-[#DDD6FE] space-y-2 text-xs text-[#2D1F33]">
              <h5 className="font-bold text-sm text-[#5B21B6] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#8B5CF6]" /> What is Gini Impurity?
              </h5>
              <p className="leading-relaxed">
                It measures <strong>how mixed the classes are</strong> in a dataset. Imagine randomly selecting an observation and guessing its class according to the class distribution. Gini measures the probability of making an incorrect classification.
              </p>
              <MathBlock
                formula="\text{Gini}(D) = 1 - \sum_{i=1}^{n} p_i^2"
                label="Gini Impurity Formula"
              />
              <ul className="list-disc pl-5 space-y-1 text-[#4A3B4E]">
                <li><MathInline formula="D" />: Our dataset.</li>
                <li><MathInline formula="n" />: Number of classes (<MathInline formula="n = 2" />: Yes, No).</li>
                <li><MathInline formula="p_i" />: Proportion of observations belonging to class <MathInline formula="i" />.</li>
              </ul>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
                <h5 className="font-bold text-[#1A1020] font-mono uppercase tracking-wider text-[11px]">
                  1. Calculate Class Probabilities
                </h5>
                <div className="space-y-2 font-mono">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <MathBlock formula="P(\text{Yes}) = \frac{5}{8} = 0.625" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                    <MathBlock formula="P(\text{No}) = \frac{3}{8} = 0.375" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
                <h5 className="font-bold text-[#1A1020] font-mono uppercase tracking-wider text-[11px]">
                  2. Substitute into Gini Formula
                </h5>
                <div className="font-mono space-y-1.5 text-xs text-[#2D1F33]">
                  <p><MathInline formula="\text{Gini}(D) = 1 - (0.625)^2 - (0.375)^2" /></p>
                  <p><MathInline formula="= 1 - 0.390625 - 0.140625" /></p>
                  <div className="p-3 bg-[#8B5CF6]/10 border-2 border-[#8B5CF6] rounded-xl text-center">
                    <span className="font-mono font-extrabold text-base text-[#5B21B6]">
                      Gini(D) = 0.46875
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scale intuition */}
            <div className="p-4 rounded-xl border border-[#DDD6FE] bg-white space-y-2 text-xs">
              <h5 className="font-bold text-xs uppercase text-[#5B21B6] font-mono">
                What does Gini = 0.46875 tell us?
              </h5>
              <p className="text-[#4A3B4E]">
                Our dataset contains both Yes and No observations; therefore, it is <strong>highly mixed</strong> and not pure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <strong>Gini = 0.0:</strong> Perfectly pure (only one class present).
                </div>
                <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-900">
                  <strong>Gini = 0.46875:</strong> Close to maximum disorder (5 Yes / 3 No).
                </div>
                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                  <strong>Gini = 0.5:</strong> Maximum impurity for 2 equal classes (50/50).
                </div>
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
                className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#7C3AED]"
              >
                Next: Evaluate Split A (Weather) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: SPLIT A: WEATHER ─── */}
        {activeStep === 2 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase">Section 4 & 5</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 2 & 3: Evaluate Candidate Split A (Weather: Sunny vs Rainy)
                </h4>
              </div>
              <span className="text-xs font-mono bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">
                Gini_Weather = 0.1875
              </span>
            </div>

            {/* Split Formula Notice */}
            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-[#2D1F33] space-y-1.5">
              <span className="font-bold text-[#5B21B6] font-mono uppercase block">Weighted Gini Formula:</span>
              <MathBlock formula="\text{Gini}_{split} = \sum_{j=1}^{k} \frac{|D_j|}{|D|} \times \text{Gini}(D_j)" />
              <p className="text-[11px] text-[#6D5970]">
                We calculate the impurity of each resulting subset, then compute their weighted average based on sample count.
              </p>
            </div>

            {/* Group 1 & Group 2 side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Group 1: Sunny */}
              <div className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-600" /> Group 1: Sunny (4 obs)
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                    Yes: 1 | No: 3
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-amber-200 font-mono text-[11px] space-y-1">
                  <div>Day 1: Sunny, Weak → <strong>No</strong></div>
                  <div>Day 2: Sunny, Weak → <strong>No</strong></div>
                  <div>Day 3: Sunny, Weak → <strong>No</strong></div>
                  <div>Day 4: Sunny, Strong → <strong>Yes</strong></div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-amber-200 font-mono text-xs space-y-1">
                  <span className="font-bold text-amber-900 block font-sans">Gini Calculation:</span>
                  <p><MathInline formula="\text{Gini}(\text{Sunny}) = 1 - (\frac{1}{4})^2 - (\frac{3}{4})^2" /></p>
                  <p><MathInline formula="= 1 - 0.0625 - 0.5625 = \mathbf{0.375}" /></p>
                </div>
              </div>

              {/* Group 2: Rainy */}
              <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <CloudRain className="w-4 h-4 text-blue-600" /> Group 2: Rainy (4 obs)
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Yes: 4 | No: 0 (Pure!)
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-blue-200 font-mono text-[11px] space-y-1">
                  <div>Day 5: Rainy, Weak → <strong>Yes</strong></div>
                  <div>Day 6: Rainy, Weak → <strong>Yes</strong></div>
                  <div>Day 7: Rainy, Strong → <strong>Yes</strong></div>
                  <div>Day 8: Rainy, Strong → <strong>Yes</strong></div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-blue-200 font-mono text-xs space-y-1">
                  <span className="font-bold text-blue-900 block font-sans">Gini Calculation:</span>
                  <p><MathInline formula="\text{Gini}(\text{Rainy}) = 1 - (\frac{4}{4})^2 - (\frac{0}{4})^2" /></p>
                  <p><MathInline formula="= 1 - 1 - 0 = \mathbf{0.000} \text{ (Pure Leaf)}" /></p>
                </div>
              </div>
            </div>

            {/* Combined Weighted Gini */}
            <div className="p-4 rounded-xl bg-purple-50 border-2 border-purple-200 space-y-2 text-xs font-mono">
              <span className="font-bold text-purple-900 text-sm font-sans flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#8B5CF6]" /> Combining into Weighted Gini for Weather:
              </span>
              <MathBlock formula="\text{Gini}_{\text{Weather}} = \frac{4}{8}(0.375) + \frac{4}{8}(0) = 0.5(0.375) + 0 = \mathbf{0.1875}" />
              <p className="text-[11px] text-purple-700 font-sans">
                Splitting on Weather eliminates a large amount of impurity, taking us down from <strong>0.46875</strong> to <strong>0.1875</strong>!
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
                className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#7C3AED]"
              >
                Next: Evaluate Split B (Wind) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: SPLIT B: WIND ─── */}
        {activeStep === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase">Section 6</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 4: Evaluate Candidate Split B (Wind: Weak vs Strong)
                </h4>
              </div>
              <span className="text-xs font-mono bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-200">
                Gini_Wind = 0.3000
              </span>
            </div>

            <p className="text-xs text-[#4A3B4E]">
              Now let&apos;s evaluate the alternative option: what if our Decision Tree chose <strong>Wind</strong> as its first test instead?
            </p>

            {/* Group 1 & Group 2 side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Group 1: Weak Wind */}
              <div className="p-4 rounded-xl border-2 border-sky-200 bg-sky-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-900 flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-sky-600" /> Group 1: Weak Wind (5 obs)
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                    Yes: 2 | No: 3
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-sky-200 font-mono text-[11px] space-y-1">
                  <div>Day 1: Sunny, Weak → <strong>No</strong></div>
                  <div>Day 2: Sunny, Weak → <strong>No</strong></div>
                  <div>Day 3: Sunny, Weak → <strong>No</strong></div>
                  <div>Day 5: Rainy, Weak → <strong>Yes</strong></div>
                  <div>Day 6: Rainy, Weak → <strong>Yes</strong></div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-sky-200 font-mono text-xs space-y-1">
                  <span className="font-bold text-sky-900 block font-sans">Gini Calculation:</span>
                  <p><MathInline formula="\text{Gini}(\text{Weak}) = 1 - (\frac{2}{5})^2 - (\frac{3}{5})^2" /></p>
                  <p><MathInline formula="= 1 - 0.16 - 0.36 = \mathbf{0.480}" /></p>
                </div>
              </div>

              {/* Group 2: Strong Wind */}
              <div className="p-4 rounded-xl border-2 border-indigo-200 bg-indigo-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-indigo-600" /> Group 2: Strong Wind (3 obs)
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Yes: 3 | No: 0 (Pure!)
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-indigo-200 font-mono text-[11px] space-y-1">
                  <div>Day 4: Sunny, Strong → <strong>Yes</strong></div>
                  <div>Day 7: Rainy, Strong → <strong>Yes</strong></div>
                  <div>Day 8: Rainy, Strong → <strong>Yes</strong></div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-indigo-200 font-mono text-xs space-y-1">
                  <span className="font-bold text-indigo-900 block font-sans">Gini Calculation:</span>
                  <p><MathInline formula="\text{Gini}(\text{Strong}) = 1 - (\frac{3}{3})^2 - (\frac{0}{3})^2" /></p>
                  <p><MathInline formula="= 1 - 1 - 0 = \mathbf{0.000} \text{ (Pure Leaf)}" /></p>
                </div>
              </div>
            </div>

            {/* Combined Weighted Gini */}
            <div className="p-4 rounded-xl bg-purple-50 border-2 border-purple-200 space-y-2 text-xs font-mono">
              <span className="font-bold text-purple-900 text-sm font-sans flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#8B5CF6]" /> Combining into Weighted Gini for Wind:
              </span>
              <MathBlock formula="\text{Gini}_{\text{Wind}} = \frac{5}{8}(0.48) + \frac{3}{8}(0) = 0.625(0.48) = \mathbf{0.3000}" />
              <p className="text-[11px] text-purple-700 font-sans">
                Wind split gives a weighted Gini of <strong>0.3000</strong>. Now let&apos;s compare both features to pick our winner!
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
                className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#7C3AED]"
              >
                Next: Compare & Choose Best Feature <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 5: CHOOSE THE BEST FEATURE ─── */}
        {activeStep === 4 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase">Section 7</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 5: Compare Features & Pick the Root Split
                </h4>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                Weather Wins! (0.1875 &lt; 0.3000)
              </span>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#FAF8FF] text-[#5B21B6] border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Candidate Feature</th>
                    <th className="py-2.5 px-3">Subsets Formed</th>
                    <th className="py-2.5 px-3">Weighted Gini</th>
                    <th className="py-2.5 px-3">Gini Reduction (Gain)</th>
                    <th className="py-2.5 px-3">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-emerald-50/50 font-bold text-emerald-950">
                    <td className="py-3 px-3 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-500" /> Weather
                    </td>
                    <td className="py-3 px-3 font-normal">Sunny (4) / Rainy (4)</td>
                    <td className="py-3 px-3 text-[#5B21B6] font-extrabold">0.1875</td>
                    <td className="py-3 px-3 text-emerald-700 font-extrabold">+0.28125</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold">
                        <Trophy className="w-3 h-3" /> Selected Winner!
                      </span>
                    </td>
                  </tr>
                  <tr className="text-gray-700">
                    <td className="py-3 px-3 flex items-center gap-1.5">
                      <Wind className="w-4 h-4 text-sky-500" /> Wind
                    </td>
                    <td className="py-3 px-3">Weak (5) / Strong (3)</td>
                    <td className="py-3 px-3 font-bold">0.3000</td>
                    <td className="py-3 px-3 font-bold">+0.16875</td>
                    <td className="py-3 px-3 text-gray-400">Rejected (Higher impurity)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Golden Rule Callout */}
            <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 space-y-2 text-xs">
              <h5 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" /> The Golden Decision Tree Rule:
              </h5>
              <p className="text-emerald-900 leading-relaxed">
                Choose the feature that produces the <strong>LOWEST Weighted Gini Impurity</strong> (which corresponds to the <strong>HIGHEST Gini Reduction / Information Gain</strong>):
              </p>
              <MathBlock formula="\text{Gini Reduction} = \text{Gini}_{\text{parent}} - \text{Gini}_{\text{split}} = 0.46875 - 0.1875 = \mathbf{0.28125}" />
              <p className="text-emerald-800">
                Because <MathInline formula="0.1875 < 0.3000" />, splitting on <strong>Weather</strong> creates much purer groups!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900">
              <strong>Our first decision node is established:</strong>
              <div className="font-mono text-sm font-bold text-[#5B21B6] mt-1">
                &ldquo;Is the weather Sunny or Rainy?&rdquo;
              </div>
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
                className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#7C3AED]"
              >
                Next: Split the Next Level <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 6: BUILD NEXT LEVEL ─── */}
        {activeStep === 5 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase">Section 8</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 6: Build the Next Level of the Tree
                </h4>
              </div>
              <span className="text-xs font-mono bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
                Gini_Sunny = 0 (Total Purity)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Branch 1: Rainy (4 observations)
                </span>
                <p className="text-emerald-800">
                  All 4 observations are <strong>Yes</strong> (<MathInline formula="\text{Gini} = 0" />). This branch is already 100% pure! <strong>We stop here and turn it into a leaf node.</strong>
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/50 space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1">
                  <AlertCircleIcon className="w-4 h-4 text-amber-600" /> Branch 2: Sunny (4 observations)
                </span>
                <p className="text-amber-800">
                  Contains mixed classes: <strong>1 Yes</strong> and <strong>3 No</strong>. We must split the Sunny subset further!
                </p>
              </div>
            </div>

            {/* Splitting Sunny by Wind */}
            <div className="p-4 rounded-xl border border-[#DDD6FE] bg-white space-y-3 text-xs">
              <h5 className="font-bold text-[#5B21B6] font-mono uppercase tracking-wider">
                Splitting Sunny Subset using Feature: Wind
              </h5>
              <p className="text-[#4A3B4E]">
                What remaining feature can we test on the Sunny subset? <strong>Wind</strong> (Weak vs Strong)!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg border border-sky-200 bg-sky-50/30 font-mono space-y-1">
                  <div className="font-bold text-sky-900">Sunny + Weak Wind (3 obs):</div>
                  <div className="text-[11px] text-gray-600">Day 1, Day 2, Day 3: all No (0 Yes, 3 No)</div>
                  <MathBlock formula="\text{Gini}(\text{Weak}) = 1 - (\frac{0}{3})^2 - (\frac{3}{3})^2 = \mathbf{0}" />
                </div>

                <div className="p-3 rounded-lg border border-indigo-200 bg-indigo-50/30 font-mono space-y-1">
                  <div className="font-bold text-indigo-900">Sunny + Strong Wind (1 obs):</div>
                  <div className="text-[11px] text-gray-600">Day 4: Yes (1 Yes, 0 No)</div>
                  <MathBlock formula="\text{Gini}(\text{Strong}) = 1 - (\frac{1}{1})^2 - (\frac{0}{1})^2 = \mathbf{0}" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-center">
                <MathBlock formula="\text{Gini}_{\text{Sunny}} = \frac{3}{4}(0) + \frac{1}{4}(0) = \mathbf{0}" />
                <span className="text-emerald-800 font-sans font-bold text-xs">
                  🎉 Perfect! Both subsets have Gini = 0. We have achieved 100% purity with zero remaining disorder.
                </span>
              </div>
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
                className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#7C3AED]"
              >
                Next: View Final Tree Diagram <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 7: FINAL DECISION TREE DIAGRAM ─── */}
        {activeStep === 6 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase">Section 9</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 7: Our Final Decision Tree Structure
                </h4>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                Depth = 2 · All Leaves Gini = 0
              </span>
            </div>

            <p className="text-xs text-[#4A3B4E]">
              Here is the complete hierarchy constructed from our 8 training observations:
            </p>

            {/* Tree Graphical Architecture */}
            <div className="p-6 rounded-2xl bg-[#FAF8FF] border-2 border-[#DDD6FE] flex flex-col items-center">
              {/* Root Node */}
              <div className="p-3.5 rounded-xl bg-purple-700 text-white font-mono text-center shadow-md w-56 border border-purple-800">
                <span className="text-[10px] text-purple-200 uppercase tracking-widest block font-bold">Root Node</span>
                <span className="text-sm font-extrabold flex items-center justify-center gap-1 mt-0.5">
                  <Sun className="w-4 h-4 text-amber-300" /> Weather?
                </span>
                <span className="text-[10px] text-purple-200 block mt-0.5">8 obs · Gini = 0.4688</span>
              </div>

              {/* Branch Connectors */}
              <div className="w-full max-w-md grid grid-cols-2 text-center text-xs font-mono font-bold my-2 text-[#6D5970]">
                <div className="flex flex-col items-center">
                  <div className="h-6 w-0.5 bg-[#8B5CF6]"></div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    Rainy (4 obs)
                  </span>
                  <div className="h-6 w-0.5 bg-[#8B5CF6]"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-0.5 bg-[#8B5CF6]"></div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                    Sunny (4 obs)
                  </span>
                  <div className="h-6 w-0.5 bg-[#8B5CF6]"></div>
                </div>
              </div>

              {/* Level 2 Nodes */}
              <div className="w-full max-w-md grid grid-cols-2 gap-4">
                {/* Left: Pure Leaf for Rainy */}
                <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-center shadow-xs flex flex-col items-center justify-center">
                  <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">Terminal Leaf</span>
                  <div className="text-lg font-black text-emerald-700 flex items-center gap-1 my-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> PLAY: YES
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                    4/4 Yes · Gini = 0.0
                  </span>
                </div>

                {/* Right: Internal Node (Wind?) */}
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-xl bg-indigo-600 text-white font-mono text-center shadow-sm w-full border border-indigo-700">
                    <span className="text-[10px] text-indigo-200 uppercase tracking-widest block font-bold">Internal Node</span>
                    <span className="text-xs font-extrabold flex items-center justify-center gap-1 mt-0.5">
                      <Wind className="w-3.5 h-3.5 text-sky-200" /> Wind?
                    </span>
                    <span className="text-[10px] text-indigo-200 block mt-0.5">4 obs · Gini = 0.375</span>
                  </div>

                  {/* Wind Sub-branches */}
                  <div className="w-full grid grid-cols-2 text-center text-[10px] font-mono font-bold my-1.5 text-gray-600">
                    <div className="flex flex-col items-center">
                      <div className="h-4 w-0.5 bg-indigo-500"></div>
                      <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">Weak</span>
                      <div className="h-4 w-0.5 bg-indigo-500"></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-4 w-0.5 bg-indigo-500"></div>
                      <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Strong</span>
                      <div className="h-4 w-0.5 bg-indigo-500"></div>
                    </div>
                  </div>

                  {/* Wind Leaves */}
                  <div className="w-full grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-rose-50 border border-rose-300 text-center">
                      <div className="text-xs font-black text-rose-700 flex items-center justify-center gap-0.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> NO
                      </div>
                      <span className="text-[9px] font-mono text-rose-700 block mt-0.5">3/3 No · Gini 0</span>
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-center">
                      <div className="text-xs font-black text-emerald-700 flex items-center justify-center gap-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> YES
                      </div>
                      <span className="text-[9px] font-mono text-emerald-700 block mt-0.5">1/1 Yes · Gini 0</span>
                    </div>
                  </div>
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
                onClick={() => setActiveStep(7)}
                className="px-3 py-1.5 bg-[#8B5CF6] text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-[#7C3AED]"
              >
                Next: Test with New Observations <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 8: TEST WITH NEW OBSERVATIONS ─── */}
        {activeStep === 7 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase">Section 10</span>
                <h4 className="font-extrabold text-[#1A1020] text-base">
                  Step 8: Test Our Decision Tree with New Observations
                </h4>
              </div>
              <span className="text-xs font-mono bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
                Fast Inference · No Gini at Runtime
              </span>
            </div>

            {/* Presets: Person A & Person B */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div
                onClick={() => handleSimulate('Sunny', 'Weak')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  testWeather === 'Sunny' && testWind === 'Weak'
                    ? 'border-purple-500 bg-purple-50/80 shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#1A1020]">Example 1: Person A</span>
                  <span className="font-mono text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                    Expected: No
                  </span>
                </div>
                <p className="text-[#6D5970] font-mono">
                  Weather = <strong>Sunny</strong>, Wind = <strong>Weak</strong>
                </p>
                <p className="text-[11px] text-purple-700 mt-1">
                  Click to trace path: Weather(Sunny) → Wind(Weak) → <strong>No</strong>.
                </p>
              </div>

              <div
                onClick={() => handleSimulate('Rainy', 'Strong')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  testWeather === 'Rainy' && testWind === 'Strong'
                    ? 'border-purple-500 bg-purple-50/80 shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#1A1020]">Example 2: Person B</span>
                  <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Expected: Yes
                  </span>
                </div>
                <p className="text-[#6D5970] font-mono">
                  Weather = <strong>Rainy</strong>, Wind = <strong>Strong</strong>
                </p>
                <p className="text-[11px] text-purple-700 mt-1">
                  Click to trace path: Weather(Rainy) → <strong>Yes</strong> (instantly pure).
                </p>
              </div>
            </div>

            {/* Custom Interactive Simulator Controls */}
            <div className="p-4 rounded-xl border-2 border-[#E5DBFF] bg-[#FAF8FF] space-y-3">
              <span className="font-bold text-xs uppercase text-[#5B21B6] font-mono block">
                Custom Observation Simulator:
              </span>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-semibold">Weather:</span>
                  <button
                    onClick={() => handleSimulate('Sunny', testWind)}
                    className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 border transition-all ${
                      testWeather === 'Sunny'
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" /> Sunny
                  </button>
                  <button
                    onClick={() => handleSimulate('Rainy', testWind)}
                    className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 border transition-all ${
                      testWeather === 'Rainy'
                        ? 'bg-blue-600 text-white border-blue-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <CloudRain className="w-3.5 h-3.5" /> Rainy
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-semibold">Wind:</span>
                  <button
                    onClick={() => handleSimulate(testWeather, 'Weak')}
                    className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 border transition-all ${
                      testWind === 'Weak'
                        ? 'bg-sky-600 text-white border-sky-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Wind className="w-3.5 h-3.5" /> Weak
                  </button>
                  <button
                    onClick={() => handleSimulate(testWeather, 'Strong')}
                    className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 border transition-all ${
                      testWind === 'Strong'
                        ? 'bg-indigo-600 text-white border-indigo-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Wind className="w-3.5 h-3.5" /> Strong
                  </button>
                </div>
              </div>
            </div>

            {/* Inference Trace Output */}
            <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-gray-700 uppercase">
                  Runtime Decision Tree Trace:
                </span>
                <span
                  className={`text-xs font-extrabold px-3 py-0.5 rounded-full text-white ${
                    simulatedPath.prediction === 'Yes' ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                >
                  Final Prediction: {simulatedPath.prediction}
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-xs text-[#2D1F33]">
                {simulatedPath.steps.map((st, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded bg-purple-50/50 border border-purple-100">
                    <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fundamental Takeaway Callout */}
            <div className="p-4 rounded-xl border-2 border-purple-300 bg-purple-50/70 space-y-1.5 text-xs text-purple-950">
              <span className="font-bold flex items-center gap-1.5 text-sm text-[#5B21B6]">
                <Sparkles className="w-4 h-4 text-[#8B5CF6]" /> Crucial Takeaway: Training vs Inference
              </span>
              <p className="leading-relaxed">
                Notice that the decision tree <strong>never calculates Gini Impurity when predicting new observations!</strong>
              </p>
              <p className="text-purple-800 leading-relaxed">
                Gini Impurity was solely used during the <strong>training phase</strong> to build the optimal question hierarchy. At inference runtime, testing a new observation is just an ultra-fast, highly interpretable chain of <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-purple-200">if-else</code> comparisons!
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(6)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                ← Back to Diagram
              </button>
              <button
                onClick={() => setActiveStep(0)}
                className="px-3 py-1.5 border border-purple-300 text-purple-700 rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-purple-50"
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

function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
