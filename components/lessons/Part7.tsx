'use client';

import { useState } from 'react';
import { SectionHeader, ThoughtPrompt, Callout, KeyInsight, CompareTable } from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';
import { overfittingData, treeOverfitting } from '@/lib/evaluation';

function AccuracyBars({
  trainAcc,
  testAcc,
  label,
  status,
}: {
  trainAcc: number;
  testAcc: number;
  label: string;
  status: string;
}) {
  const gap = Math.abs(trainAcc - testAcc);
  const statusLabels = {
    overfit: { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', text: 'OVERFITTING' },
    good: { color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', text: 'BALANCED' },
    underfit: { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', text: 'UNDERFITTING' },
  };
  const config = statusLabels[status as keyof typeof statusLabels] ?? statusLabels.good;

  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm space-y-2.5" style={{ borderColor: config.border }}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-xs text-[#1A1020]">{label}</span>
        <span
          className="font-pixel text-[9px] px-2 py-0.5 rounded-full font-bold"
          style={{ background: config.bg, color: config.color }}
        >
          {config.text}
        </span>
      </div>

      <div className="space-y-1.5 font-mono text-xs">
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span className="text-[#6D5970]">Training Accuracy:</span>
            <span className="font-bold text-[#1A1020]">{(trainAcc * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-[#FFF0F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#FF2E7E] rounded-full" style={{ width: `${trainAcc * 100}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span className="text-[#6D5970]">Test Accuracy:</span>
            <span className="font-bold text-[#1A1020]">{(testAcc * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-[#FFF0F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#1A1020] rounded-full" style={{ width: `${testAcc * 100}%` }} />
          </div>
        </div>
      </div>

      {gap > 0.05 && (
        <div className="text-[11px] font-mono font-bold flex justify-between pt-1 border-t border-[#F7EAF0]" style={{ color: config.color }}>
          <span>Generalization Gap:</span>
          <span>{(gap * 100).toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}

export default function Part7() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={7}
        time="103–110 min"
        title="Overfitting and Generalization"
        subtitle="Why Perfect Training Accuracy is a Critical Warning Sign"
      />

      {/* 7.1 The Memorization Problem */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Student Exam Analogy
          </h2>
        </div>

        <ThoughtPrompt
          question="A student memorizes the exact answer key for last year's exam without understanding the underlying material. When given a newly written exam with different questions, what happens?"
          context="They fail the new exam because they memorized specifics rather than learning generalizable principles."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              term: 'Underfitting',
              badge: 'HIGH BIAS',
              desc: 'The model is too rigid to capture the true underlying data patterns. Performance is poor on both training and test data.',
              status: 'underfit',
            },
            {
              term: 'Generalization',
              badge: 'OPTIMAL FIT',
              desc: 'The model learns the broad structural patterns without fitting random noise. Training and test accuracies are closely matched.',
              status: 'good',
            },
            {
              term: 'Overfitting',
              badge: 'HIGH VARIANCE',
              desc: 'The model memorizes noise and sample quirks. Training accuracy approaches 100%, but accuracy collapses on unseen test data.',
              status: 'overfit',
            },
          ].map(c => (
            <div key={c.term} className="p-4 rounded-2xl border border-[#F0D6E2] bg-white shadow-sm space-y-1.5">
              <span className="font-pixel text-[9px] px-2 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
                {c.badge}
              </span>
              <h4 className="font-bold text-sm text-[#1A1020]">{c.term}</h4>
              <p className="text-xs text-[#6D5970] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7.2 Train/Test Split Gap Analysis */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Evaluating Generalization: The Train / Test Split
          </h2>
        </div>

        <Callout type="info" title="The Golden Rule of ML">
          Never evaluate a model exclusively on the data it studied. Split data into a <strong>training partition</strong> (~70-80%) and an untouched <strong>held-out test partition</strong> (~20-30%) to simulate real-world deployment.
        </Callout>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider block">
            KNN Model Capacity vs. Generalization Gap:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {overfittingData.map(d => (
              <AccuracyBars
                key={d.k}
                label={d.label}
                trainAcc={d.trainAcc}
                testAcc={d.testAcc}
                status={d.status}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider block">
            Decision Tree Depth vs. Generalization Gap:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {treeOverfitting.map(d => (
              <AccuracyBars
                key={d.label}
                label={d.label}
                trainAcc={d.trainAcc}
                testAcc={d.testAcc}
                status={d.status}
              />
            ))}
          </div>
        </div>

        {/* Deployment Question */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <p className="font-bold text-sm text-[#1A1020]">
            Which model would you deploy to production: K = 1 (100% train / 80% test) or K = 15 (87% train / 89% test)?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'k1', label: 'Model K = 1 (100% Training Score)' },
              { id: 'k15', label: 'Model K = 15 (89% Test Score, Small Gap)' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelectedModel(opt.id)}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  selectedModel === opt.id
                    ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#FF2E7E]'
                    : 'border-[#F0D6E2] text-[#6D5970]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {selectedModel && (
            <div className="p-3.5 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] text-xs text-[#065F46] leading-relaxed">
              <strong>Correct Decision:</strong> Always deploy <strong>K = 15</strong>. Even though K = 1 boasts a perfect 100% training score, it achieves that by memorizing single noise points. K = 15 demonstrates superior generalization with higher test accuracy.
            </div>
          )}
        </div>
      </section>

      {/* 7.3 How to Combat Overfitting */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Techniques to Prevent Overfitting
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: 'Model Regularization / Simplification',
              desc: 'Constrain model complexity: increase K in KNN, limit max tree depth, or apply L1/L2 penalty weights.',
            },
            {
              title: 'Dataset Expansion',
              desc: 'Acquire more representative training data. Outliers have diminishing influence as sample size grows.',
            },
            {
              title: 'Independent Validation Tuning',
              desc: 'Never tune hyperparameters on the final test set. Use a validation partition or cross-validation.',
            },
            {
              title: 'Feature Selection & Pruning',
              desc: 'Remove redundant, uninformative, or excessively noisy input dimensions that degrade generalization.',
            },
          ].map(t => (
            <div key={t.title} className="p-4 rounded-2xl border border-[#F0D6E2] bg-white shadow-sm space-y-1">
              <h4 className="font-bold text-xs text-[#1A1020]">{t.title}</h4>
              <p className="text-xs text-[#6D5970] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="pt-4 border-t border-[#F0D6E2]">
        <Quiz
          partNumber={7}
          questions={[
            {
              question: 'A classifier scores 100% accuracy on its training partition, but only 74% on the held-out test partition. What diagnosis applies?',
              options: [
                'Underfitting due to an overly simple hypothesis class',
                'Overfitting: the model has memorized training noise',
                'The model is theoretically optimal',
                'The test partition was incorrectly sampled',
              ],
              correctIndex: 1,
              explanation: 'A substantial disparity between high training accuracy and significantly lower test accuracy is the hallmark signature of overfitting.',
            },
            {
              question: 'Why is it an invalid methodology to iteratively adjust hyperparameter K until test set accuracy is maximized?',
              options: [
                'It causes computation to run exponentially slower',
                'Information from the test set leaks into model selection, so the test score is no longer an honest estimate of generalization',
                'Test sets are only mathematically compatible with linear regression',
                'K cannot be tuned programmatically',
              ],
              correctIndex: 1,
              explanation: 'If you optimize decisions based on the test set, the test set ceases to be unseen. Use an intermediate validation split for tuning, and the test set only once at the conclusion.',
            },
          ]}
        />
      </section>
    </div>
  );
}
