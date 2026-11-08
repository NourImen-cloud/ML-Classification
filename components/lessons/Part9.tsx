'use client';

import { useState } from 'react';
import {
  SectionHeader,
  ThoughtPrompt,
  CompareTable,
  Callout,
  KeyInsight,
} from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';
import { module9Emails } from '@/lib/data';
import { computeThresholdMetrics, thresholdSweepData } from '@/lib/evaluation';

export default function Part9() {
  const [currentThreshold, setCurrentThreshold] = useState<number>(0.5);
  const [labStep, setLabStep] = useState<number>(1);
  const [studentPrediction, setStudentPrediction] = useState('');
  const [showRocExplainer, setShowRocExplainer] = useState(false);

  const currentEval = computeThresholdMetrics(
    currentThreshold,
    module9Emails.map((e) => ({
      id: e.id,
      prob: e.pSpam,
      actual: e.trueLabel === 'Spam' ? 1 : 0,
    }))
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={9}
        time="Session 2 · 32–42 min"
        title="Thresholds and Their Effect"
        subtitle="Trading Precision Against Recall Without Retraining & ROC/PR Curves"
      />

      {/* 9.1 The 5-Email Probability Table */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 9.1
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Model Probabilities and True Labels
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          A trained logistic-regression model outputs the following spam probabilities for 5 incoming emails.
          Compare the classifications produced by a standard threshold (<code className="bg-[#FFF0F6] px-1 font-bold text-[#96003B]">t = 0.5</code>)
          versus a cautious threshold (<code className="bg-[#FFF0F6] px-1 font-bold text-[#96003B]">t = 0.8</code>):
        </p>

        {/* Table from PDF */}
        <div className="overflow-x-auto rounded-2xl border-2 border-[#FFD6E5] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-[#FFE4EF] border-b-2 border-[#FFB8D2] text-[#96003B] font-mono text-xs uppercase">
                <th className="py-2.5 px-3">Email ID</th>
                <th className="py-2.5 px-3">P(Spam)</th>
                <th className="py-2.5 px-3">True Ground-Truth</th>
                <th className="py-2.5 px-3">Threshold 0.5 Decision</th>
                <th className="py-2.5 px-3">Threshold 0.8 Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7EAF0]">
              {module9Emails.map((email) => {
                const pred05 = email.pSpam >= 0.5 ? 'Spam' : 'Not Spam';
                const pred08 = email.pSpam >= 0.8 ? 'Spam' : 'Not Spam';

                const isCorrect05 = pred05 === email.trueLabel;
                const isCorrect08 = pred08 === email.trueLabel;

                return (
                  <tr key={email.id} className="hover:bg-[#FFF7FA]">
                    <td className="py-2.5 px-3 font-bold font-mono text-[#1A1020]">Email {email.id}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#96003B]">{email.pSpam}</td>
                    <td className="py-2.5 px-3 font-semibold">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                          email.trueLabel === 'Spam'
                            ? 'bg-[#FFE4EF] text-[#FF2E7E] border border-[#FFB8D2]'
                            : 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                        }`}
                      >
                        {email.trueLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-xs">
                      <span className={isCorrect05 ? 'text-[#059669] font-bold' : 'text-[#DC2626] font-bold'}>
                        {pred05} {isCorrect05 ? '✓' : pred05 === 'Spam' ? '✗ (FP)' : '✗ (FN)'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-xs">
                      <span className={isCorrect08 ? 'text-[#059669] font-bold' : 'text-[#DC2626] font-bold'}>
                        {pred08} {isCorrect08 ? '✓' : pred08 === 'Spam' ? '✗ (FP)' : '✗ (FN)'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#10B981] bg-[#ECFDF5] text-xs text-[#166534] space-y-1">
          <span className="font-pixel text-[9px] px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] font-bold">
            WHAT TO SAY · CORE REVELATION
          </span>
          <p className="font-semibold text-sm text-[#1A1020]">
            The model was NOT retrained at all!
          </p>
          <p className="leading-relaxed">
            Every probability output score remained identical. We only altered the post-processing cutoff rule
            that converts numerical probabilities into discrete operational decisions.
          </p>
        </div>
      </section>

      {/* 9.2 The Threshold Sweep Table */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 9.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Sweeping the Threshold: Systematic Trade-Off
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Observe how the confusion matrix cells, Precision, and Recall evolve across four different threshold levels:
        </p>

        {/* Sweep Table from PDF */}
        <div className="overflow-x-auto rounded-2xl border-2 border-[#FFD6E5] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-[#FFE4EF] border-b-2 border-[#FFB8D2] text-[#96003B] font-mono text-xs uppercase">
                <th className="py-2.5 px-3">Threshold</th>
                <th className="py-2.5 px-3">Predicted Spam</th>
                <th className="py-2.5 px-2">TP</th>
                <th className="py-2.5 px-2">FP</th>
                <th className="py-2.5 px-2">FN</th>
                <th className="py-2.5 px-2">TN</th>
                <th className="py-2.5 px-3 font-bold text-[#10B981]">Precision</th>
                <th className="py-2.5 px-3 font-bold text-[#3B82F6]">Recall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7EAF0] font-mono">
              {thresholdSweepData.map((row) => (
                <tr
                  key={row.threshold}
                  className={`hover:bg-[#FFF7FA] ${
                    currentThreshold === row.threshold ? 'bg-[#FFE4EF]/50 font-bold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 text-[#1A1020] font-bold">t = {row.threshold.toFixed(1)}</td>
                  <td className="py-2.5 px-3 text-[#4A3B4E]">{row.predictedSpam.join(', ')}</td>
                  <td className="py-2.5 px-2 text-[#059669] font-bold">{row.tp}</td>
                  <td className="py-2.5 px-2 text-[#DC2626] font-bold">{row.fp}</td>
                  <td className="py-2.5 px-2 text-[#D97706] font-bold">{row.fn}</td>
                  <td className="py-2.5 px-2 text-[#059669] font-bold">{row.tn}</td>
                  <td className="py-2.5 px-3 text-[#10B981] font-extrabold">{row.precision.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-[#3B82F6] font-extrabold">{row.recall.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Figure 5: Precision vs Recall Bar Chart across thresholds */}
        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-xs text-[#FF2E7E] font-bold">
              FIGURE 5 · PRECISION VS RECALL TRADE-OFF
            </span>
            <div className="flex items-center gap-4 text-xs font-mono font-bold">
              <span className="flex items-center gap-1.5 text-[#10B981]">
                <span className="w-3 h-3 rounded bg-[#10B981]" /> Precision
              </span>
              <span className="flex items-center gap-1.5 text-[#3B82F6]">
                <span className="w-3 h-3 rounded bg-[#3B82F6]" /> Recall
              </span>
            </div>
          </div>

          {/* SVG Grouped Bar Chart */}
          <div className="p-3 bg-[#FFF9FC] rounded-xl border border-[#F0D6E2]">
            <svg viewBox="0 0 360 160" className="w-full">
              {/* Gridlines */}
              {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
                <g key={v}>
                  <line
                    x1="40"
                    y1={140 - v * 120}
                    x2="340"
                    y2={140 - v * 120}
                    stroke="#F0D6E2"
                    strokeDasharray="2 2"
                  />
                  <text x="35" y={140 - v * 120 + 3} textAnchor="end" fontSize="9" fill="#6D5970" fontFamily="monospace">
                    {v.toFixed(1)}
                  </text>
                </g>
              ))}

              {/* Grouped Bars */}
              {thresholdSweepData.map((d, i) => {
                const groupX = 65 + i * 70;
                const pHeight = d.precision * 120;
                const rHeight = d.recall * 120;

                return (
                  <g key={d.threshold}>
                    {/* Precision Bar */}
                    <rect
                      x={groupX}
                      y={140 - pHeight}
                      width={18}
                      height={pHeight}
                      fill="#10B981"
                      rx={3}
                    />
                    <text
                      x={groupX + 9}
                      y={135 - pHeight}
                      textAnchor="middle"
                      fontSize="8"
                      fill="#059669"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {d.precision.toFixed(2)}
                    </text>

                    {/* Recall Bar */}
                    <rect
                      x={groupX + 22}
                      y={140 - rHeight}
                      width={18}
                      height={rHeight}
                      fill="#3B82F6"
                      rx={3}
                    />
                    <text
                      x={groupX + 31}
                      y={135 - rHeight}
                      textAnchor="middle"
                      fontSize="8"
                      fill="#1E40AF"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {d.recall.toFixed(2)}
                    </text>

                    {/* X-axis Label */}
                    <text
                      x={groupX + 20}
                      y={155}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#1A1020"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      t = {d.threshold}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="text-[11px] text-[#6D5970] italic text-center">
            Figure 5: Raising the threshold generally increases precision and lowers recall (pattern based on 5 emails).
          </p>
        </div>
      </section>

      {/* 9.3 5-Step Threshold Lab */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 9.3 · PART 3 LAB STRUCTURE
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The 5-Step Interactive Threshold Lab
          </h2>
        </div>

        {/* 5-Step Tabs */}
        <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
          {[
            { step: 1, name: '1. Predict' },
            { step: 2, name: '2. Experiment' },
            { step: 3, name: '3. Observe' },
            { step: 4, name: '4. Explain' },
            { step: 5, name: '5. Apply' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setLabStep(s.step)}
              className={`py-2 px-1 rounded-xl font-bold transition-all ${
                labStep === s.step
                  ? 'bg-[#FF2E7E] text-white shadow-sm'
                  : 'bg-white border border-[#F0D6E2] text-[#6D5970] hover:text-[#1A1020]'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4">
          {labStep === 1 && (
            <div className="space-y-3">
              <span className="font-pixel text-xs text-[#FF2E7E] font-bold">
                STEP 1 · PREDICT BEFORE MOVING THE SLIDER
              </span>
              <p className="text-xs text-[#4A3B4E]">
                &ldquo;If I raise the classification threshold from 0.5 to 0.9, will the spam filter flag more
                or fewer emails as spam? What happens to False Positives and False Negatives?&rdquo;
              </p>
              <input
                type="text"
                placeholder="Write your prediction..."
                value={studentPrediction}
                onChange={(e) => setStudentPrediction(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#F0D6E2] focus:border-[#FF2E7E] focus:outline-none"
              />
              <button onClick={() => setLabStep(2)} className="btn-pink px-4 py-1.5 text-xs font-bold">
                Advance to Step 2: Run Experiment →
              </button>
            </div>
          )}

          {labStep >= 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FFF9FC] border border-[#F0D6E2] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#1A1020]">Active Classification Threshold:</span>
                  <span className="font-mono font-bold text-[#FF2E7E] text-base">t = {currentThreshold}</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={0.95}
                  step={0.05}
                  value={currentThreshold}
                  onChange={(e) => setCurrentThreshold(parseFloat(e.target.value))}
                  className="w-full accent-[#FF2E7E]"
                />
                <div className="flex justify-between font-mono text-[10px] text-[#6D5970]">
                  <span>0.1 (High Recall / Catches all spam)</span>
                  <span>0.5 (Balanced)</span>
                  <span>0.95 (High Precision / Zero false alarms)</span>
                </div>
              </div>

              {/* Live Metric Readout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-3 bg-white rounded-xl border border-[#F0D6E2]">
                  <span className="text-[#6D5970] block">True Positives (TP)</span>
                  <span className="text-base font-bold text-[#059669]">{currentEval.tp}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#F0D6E2]">
                  <span className="text-[#6D5970] block">False Positives (FP)</span>
                  <span className="text-base font-bold text-[#DC2626]">{currentEval.fp}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#F0D6E2]">
                  <span className="text-[#6D5970] block">Precision</span>
                  <span className="text-base font-bold text-[#10B981]">{(currentEval.precision * 100).toFixed(0)}%</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#F0D6E2]">
                  <span className="text-[#6D5970] block">Recall</span>
                  <span className="text-base font-bold text-[#3B82F6]">{(currentEval.recall * 100).toFixed(0)}%</span>
                </div>
              </div>

              {labStep < 5 && (
                <button
                  onClick={() => setLabStep((s) => s + 1)}
                  className="btn-pink px-4 py-1.5 text-xs font-bold"
                >
                  Next Lab Step ({labStep + 1}) →
                </button>
              )}
            </div>
          )}

          {labStep === 3 && (
            <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-xs text-[#166534]">
              <strong>Step 3 (Observe):</strong> When t is raised to 0.8, Email C (prob 0.62) flips from an erroneous
              False Positive to a correctly delivered True Negative! False alarms vanish, but Email D (prob 0.48) is missed.
            </div>
          )}

          {labStep === 4 && (
            <div className="p-3 bg-[#FFF7FA] border border-[#FFB8D2] rounded-xl text-xs text-[#96003B]">
              <strong>Step 4 (Explain):</strong> Raising threshold demands stricter evidence before declaring an email Spam.
              Fewer positive predictions are made → FP falls, TP falls, Precision rises, Recall drops.
            </div>
          )}

          {labStep === 5 && (
            <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-xs text-[#1E40AF]">
              <strong>Step 5 (Apply):</strong> For a cancer screening test, would you set threshold to 0.1 or 0.9?
              Set it to 0.1! You want near 100% Recall so no sick patient is missed; false alarms are resolved by biopsy.
            </div>
          )}
        </div>

        {/* Improvement Added: ROC and PR Curves */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] text-[#059669] font-bold px-2 py-0.5 rounded bg-[#DCFCE7] border border-[#A7F3D0]">
              IMPROVEMENT ADDED · ADVANCED EVALUATION CURVES
            </span>
            <button
              onClick={() => setShowRocExplainer((p) => !p)}
              className="text-xs font-bold text-[#FF2E7E] hover:underline"
            >
              {showRocExplainer ? 'Hide Advanced Curves' : 'Show ROC/AUC & Precision-Recall Curves'}
            </button>
          </div>

          {showRocExplainer && (
            <div className="space-y-2 text-xs text-[#4A3B4E]">
              <p>
                Sweeping the classification threshold continuously from 0.0 to 1.0 traces out a trajectory curve in performance space:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-[#FFF7FA] border border-[#FFD6E5]">
                  <strong className="text-[#FF2E7E] block mb-1">ROC Curve &amp; AUC:</strong>
                  Plots True Positive Rate (Recall) vs False Positive Rate (FP / (FP + TN)).
                  The Area Under the Curve (AUC) measures ranking ability (0.5 = random guessing, 1.0 = perfect ranking).
                </div>
                <div className="p-3 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0]">
                  <strong className="text-[#059669] block mb-1">Precision-Recall (PR) Curve:</strong>
                  Plots Precision vs Recall directly. Recommended over ROC when classes are heavily imbalanced,
                  as it does not include TN and focuses entirely on the minority positive class.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Quiz
        partNumber={9}
        questions={[
          {
            question: 'What typically happens when you raise the classification threshold for the positive class from 0.5 to 0.85?',
            options: [
              'Precision increases, but Recall decreases as fewer positive predictions are made.',
              'Recall increases, and Precision drops.',
              'Both Precision and Recall immediately reach 100%.',
              'The model retrains its weights from scratch.',
            ],
            correctIndex: 0,
            explanation:
              'A higher threshold requires stronger probability evidence to predict Spam. Fewer positive predictions are made, which eliminates false alarms (raising precision) but misses borderline cases (lowering recall).',
          },
          {
            question: 'When is a Precision-Recall curve preferred over an ROC curve?',
            options: [
              'When the dataset suffers from extreme class imbalance with very few positive examples.',
              'When all classes are perfectly 50/50 balanced.',
              'When using Decision Trees instead of Logistic Regression.',
              'When features are not normalized.',
            ],
            correctIndex: 0,
            explanation:
              'ROC curves can present an overly optimistic assessment on severely imbalanced datasets because the massive True Negative count dampens the False Positive Rate.',
          },
        ]}
      />
    </div>
  );
}
