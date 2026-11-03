'use client';

import { useState } from 'react';
import { SectionHeader, ThoughtPrompt, Callout, CompareTable, KeyInsight } from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';
import { modelA, modelB, baseline, accuracy, precision, recall, f1Score, ConfusionMatrix } from '@/lib/evaluation';

const CELLS = ['tp', 'fn', 'fp', 'tn'] as const;

const cellInfo = {
  tp: {
    label: 'True Positive (TP)',
    shortName: 'TP',
    desc: 'Spam email correctly detected and quarantined.',
    example: 'A phishing link is caught and moved to spam folder.',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },
  fn: {
    label: 'False Negative (FN)',
    shortName: 'FN',
    desc: 'Spam email that the model missed, wrongly delivered to inbox.',
    example: 'A malicious email slips through and arrives in the primary inbox.',
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
  },
  fp: {
    label: 'False Positive (FP)',
    shortName: 'FP',
    desc: 'Legitimate email erroneously flagged as spam (False Alarm).',
    example: 'An important email from your professor or manager is sent to spam.',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
  tn: {
    label: 'True Negative (TN)',
    shortName: 'TN',
    desc: 'Legitimate email correctly routed to the user inbox.',
    example: 'Routine communication correctly delivered without interruption.',
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
};

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#6D5970] font-medium">{label}</span>
        <span className="font-bold font-mono" style={{ color }}>{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-[#FFF0F6] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${value * 100}%`, background: color }}
        />
      </div>
    </div>
  );
}

function ConfusionMatrixViz({
  cm,
  onCellClick,
  activeCell,
}: {
  cm: ConfusionMatrix;
  onCellClick?: (cell: typeof CELLS[number]) => void;
  activeCell?: string | null;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#F0D6E2] bg-white shadow-sm">
      <div className="grid grid-cols-3 bg-[#FFF5F9] border-b border-[#F0D6E2]">
        <div />
        <div className="py-2.5 text-center text-xs font-bold text-[#FF2E7E]">Predicted Spam (+)</div>
        <div className="py-2.5 text-center text-xs font-bold text-[#059669]">Predicted Legitimate (-)</div>
      </div>

      {/* Actual Positive (Spam) */}
      <div className="grid grid-cols-3 border-b border-[#F0D6E2]">
        <div className="flex items-center justify-center p-3 bg-[#FFF5F9] text-xs font-bold text-[#FF2E7E] text-center">
          Actual<br />Spam (+)
        </div>
        {(['tp', 'fn'] as const).map(cell => (
          <button
            key={cell}
            onClick={() => onCellClick?.(cell)}
            className="p-4 text-center cursor-pointer transition-all border-l border-[#F0D6E2]"
            style={{
              background: activeCell === cell ? cellInfo[cell].bg : '#FFFFFF',
              outline: activeCell === cell ? `2px solid ${cellInfo[cell].color}` : 'none',
            }}
          >
            <p className="text-[10px] font-pixel font-bold" style={{ color: cellInfo[cell].color }}>
              {cellInfo[cell].shortName}
            </p>
            <p className="text-2xl font-black text-[#1A1020] mt-1 font-mono">{cm[cell]}</p>
          </button>
        ))}
      </div>

      {/* Actual Negative (Not Spam) */}
      <div className="grid grid-cols-3">
        <div className="flex items-center justify-center p-3 bg-[#FFF5F9] text-xs font-bold text-[#059669] text-center">
          Actual<br />Legitimate (-)
        </div>
        {(['fp', 'tn'] as const).map(cell => (
          <button
            key={cell}
            onClick={() => onCellClick?.(cell)}
            className="p-4 text-center cursor-pointer transition-all border-l border-[#F0D6E2]"
            style={{
              background: activeCell === cell ? cellInfo[cell].bg : '#FFFFFF',
              outline: activeCell === cell ? `2px solid ${cellInfo[cell].color}` : 'none',
            }}
          >
            <p className="text-[10px] font-pixel font-bold" style={{ color: cellInfo[cell].color }}>
              {cellInfo[cell].shortName}
            </p>
            <p className="text-2xl font-black text-[#1A1020] mt-1 font-mono">{cm[cell]}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Part6() {
  const [activeCell, setActiveCell] = useState<string | null>('fn');
  const [activeModel, setActiveModel] = useState<'a' | 'b' | 'baseline'>('a');

  const models = {
    a: { label: 'Model A (Standard Threshold 0.5)', cm: modelA, color: '#FF2E7E' },
    b: { label: 'Model B (Strict Threshold 0.8)', cm: modelB, color: '#8B5CF6' },
    baseline: { label: 'Trivial "Always Predict Legitimate"', cm: baseline, color: '#DC2626' },
  };

  const currentModel = models[activeModel];
  const cm = currentModel.cm;

  const acc = accuracy(cm);
  const prec = precision(cm);
  const rec = recall(cm);
  const f1 = f1Score(cm);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={6}
        time="85–103 min"
        title="Model Evaluation"
        subtitle="The Imbalance Trap, Confusion Matrices, Precision, and Recall"
      />

      {/* 6.1 The Accuracy Trap */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Accuracy Paradox in Imbalanced Domains
          </h2>
        </div>

        <ThoughtPrompt
          question="A mailbox contains 1,000 emails: 950 legitimate and 50 spam. A naive model blindly predicts 'Not Spam' for every email without reading any content. What is its accuracy? Is it a functional spam filter?"
          context="950 correct out of 1,000 yields 95.0% accuracy, yet exactly 0 spam messages are caught."
        />

        <div className="rounded-2xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5 shadow-sm space-y-2">
          <span className="font-pixel text-[10px] font-bold text-[#DC2626] uppercase block">
            THE ACCURACY TRAP
          </span>
          <p className="text-sm text-[#7F1D1D] leading-relaxed">
            Accuracy is defined as <code>(Correct Predictions) / (Total Predictions)</code>. In skewed datasets where one class represents 95%+ of instances (such as fraud detection, cancer diagnosis, or spam filtering), a trivial model that always predicts the majority class produces high accuracy while providing zero real-world utility.
          </p>
        </div>
      </section>

      {/* 6.2 The Confusion Matrix */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Confusion Matrix Breakdown
          </h2>
        </div>

        {/* Model switcher */}
        <div className="flex flex-wrap gap-2">
          {(Object.entries(models) as [keyof typeof models, typeof models.a][]).map(([key, m]) => (
            <button
              key={key}
              onClick={() => { setActiveModel(key); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeModel === key
                  ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#FF2E7E]'
                  : 'border-[#F0D6E2] text-[#6D5970] hover:border-[#FF2E7E]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <ConfusionMatrixViz cm={cm} onCellClick={setActiveCell} activeCell={activeCell} />

          <div className="space-y-3">
            {activeCell && activeCell in cellInfo && (
              <div
                className="p-4 rounded-2xl border transition-all"
                style={{
                  borderColor: cellInfo[activeCell as keyof typeof cellInfo].border,
                  background: cellInfo[activeCell as keyof typeof cellInfo].bg,
                }}
              >
                <p className="font-pixel text-xs font-bold mb-1" style={{ color: cellInfo[activeCell as keyof typeof cellInfo].color }}>
                  {cellInfo[activeCell as keyof typeof cellInfo].label}
                </p>
                <p className="text-xs text-[#1A1020] leading-relaxed font-medium">
                  {cellInfo[activeCell as keyof typeof cellInfo].desc}
                </p>
                <p className="text-[11px] text-[#6D5970] mt-1.5 italic">
                  Example: {cellInfo[activeCell as keyof typeof cellInfo].example}
                </p>
              </div>
            )}

            <div className="p-4 rounded-2xl border border-[#F0D6E2] bg-white shadow-sm space-y-3">
              <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold uppercase tracking-wider block">
                Calculated Metrics for {currentModel.label}:
              </span>
              <MetricBar label="Accuracy (Overall Correct)" value={acc} color="#FF2E7E" />
              <MetricBar label="Precision (Purity of Alarms)" value={prec} color="#8B5CF6" />
              <MetricBar label="Recall (Sensitivity / Detection Rate)" value={rec} color="#10B981" />
              <MetricBar label="F1 Score (Harmonic Mean)" value={f1} color="#F59E0B" />
            </div>
          </div>
        </div>
      </section>

      {/* 6.3 Precision vs Recall */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Precision versus Recall: The Engineering Trade-off
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-5 rounded-2xl border border-[#F0D6E2] bg-white shadow-sm space-y-2">
            <span className="font-pixel text-[10px] px-2 py-0.5 rounded bg-[#FFF0F6] text-[#FF2E7E] font-bold">
              PRECISION
            </span>
            <div className="code-block text-xs">Precision = TP / (TP + FP)</div>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              &quot;Of all the emails the model flagged as spam, what fraction actually were spam?&quot;
            </p>
            <p className="text-[11px] text-[#DC2626] font-semibold">
              Punishes False Positives (good emails misclassified as spam).
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#F0D6E2] bg-white shadow-sm space-y-2">
            <span className="font-pixel text-[10px] px-2 py-0.5 rounded bg-[#ECFDF5] text-[#059669] font-bold">
              RECALL (SENSITIVITY)
            </span>
            <div className="code-block text-xs">Recall = TP / (TP + FN)</div>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              &quot;Of all the actual spam emails in existence, what fraction did the model successfully catch?&quot;
            </p>
            <p className="text-[11px] text-[#DC2626] font-semibold">
              Punishes False Negatives (spam emails that slipped past the filter).
            </p>
          </div>
        </div>

        <CompareTable
          headers={['Application Context', 'Priority Metric', 'System Rationale']}
          rows={[
            ['Email Spam Filtering', 'High Precision', 'Users cannot tolerate critical business emails landing in spam.'],
            ['Cancer / Disease Screening', 'High Recall', 'Missing a sick patient (False Negative) can be fatal.'],
            ['Credit Card Fraud', 'Balanced (High Recall)', 'Financial losses from missed fraud exceed the cost of SMS alerts.'],
          ]}
        />
      </section>

      {/* Quiz */}
      <section className="pt-4 border-t border-[#F0D6E2]">
        <Quiz
          partNumber={6}
          questions={[
            {
              question: 'In a medical screening dataset where 99% of patients are healthy and 1% are sick, a baseline model predicts "Healthy" for all 100% of cases. What is its Recall for the sick population?',
              options: ['99.0%', '50.0%', '1.0%', '0.0%'],
              correctIndex: 3,
              explanation: 'Because the model flagged zero sick patients as positive (TP = 0), Recall is 0 / (0 + FN) = 0%. The 99% figure is overall accuracy, demonstrating why accuracy alone is dangerous.',
            },
            {
              question: 'An urgent confirmation email from an airline gets misclassified into your spam folder. Which confusion matrix quadrant represents this error?',
              options: ['True Positive', 'False Positive', 'False Negative', 'True Negative'],
              correctIndex: 1,
              explanation: 'The model predicted positive (Spam), but this was false (the email was authentic). This is a False Positive (False Alarm).',
            },
          ]}
        />
      </section>
    </div>
  );
}
