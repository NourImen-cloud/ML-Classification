'use client';

import { useState } from 'react';
import {
  SectionHeader,
  ThoughtPrompt,
  CompareTable,
  Callout,
  KeyInsight,
  MathFormula,
} from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';
import { workedConfusionMatrix, accuracy, precision, recall, f1Score } from '@/lib/evaluation';

const priorityRows = [
  [
    'Spam Email Filtering',
    'False Positive (legitimate email sent to spam folder and missed)',
    'Precision (keep very high, e.g. >95%)',
    'A missed spam in the inbox is slightly annoying; a lost job offer or flight booking in spam is catastrophic.',
  ],
  [
    'Medical Rare Disease Screening',
    'False Negative (sick patient sent home undiagnosed)',
    'Recall (Sensitivity)',
    'A false alarm triggers a harmless secondary test; a missed disease allows progression without treatment.',
  ],
  [
    'Credit Card Fraud Detection',
    'False Negative (fraudulent transaction allowed through)',
    'Recall (while maintaining viable Precision)',
    'Banks must stop massive fraud rings, but too many false declines alienate loyal customers.',
  ],
  [
    'Autonomous Emergency Braking',
    'False Negative (vehicle fails to detect pedestrian)',
    'Recall (Near 100%)',
    'Failing to brake causes fatal collisions; occasional phantom braking is dangerous, but missed hazards are lethal.',
  ],
];

const metricSummaryRows = [
  ['Accuracy', 'How many predictions were correct overall?', '(TP + TN) / (TP + TN + FP + FN)', 'Balanced classes with equal mistake costs'],
  ['Precision', 'When the model predicts Spam, how reliable is it?', 'TP / (TP + FP)', 'When False Positives are expensive (Spam, Arrests)'],
  ['Recall', 'Of all actual positive instances, how many did we find?', 'TP / (TP + FN)', 'When False Negatives are dangerous (Medical, Security)'],
  ['F1-Score', 'How well are precision and recall balanced?', '2 · (P · R) / (P + R)', 'Imbalanced datasets where both errors matter'],
];

export default function Part8() {
  const [cm, setCm] = useState(workedConfusionMatrix);
  const [showMacroExplainer, setShowMacroExplainer] = useState(false);

  const acc = accuracy(cm);
  const prec = precision(cm);
  const rec = recall(cm);
  const f1 = f1Score(cm);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={8}
        time="Session 2 · 20–32 min"
        title="Understanding Evaluation Metrics"
        subtitle="Accuracy, Precision, Recall, F1-Score & the Class Imbalance Trap"
      />

      {/* 8.1 - 8.4 The Four Core Metrics */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTIONS 8.1 – 8.4
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Four Fundamental Metrics (Worked on 100 Emails)
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Using our evaluated 100-email classifier from Module 6 (with{' '}
          <code className="bg-[#FFF0F6] px-1 font-bold text-[#96003B]">TP = 36</code>,{' '}
          <code className="bg-[#FFF0F6] px-1 font-bold text-[#96003B]">FP = 9</code>,{' '}
          <code className="bg-[#FFF0F6] px-1 font-bold text-[#96003B]">FN = 15</code>, and{' '}
          <code className="bg-[#FFF0F6] px-1 font-bold text-[#96003B]">TN = 40</code>):
        </p>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Accuracy */}
          <div className="p-5 rounded-2xl border-2 border-[#F0D6E2] bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold">8.1 · ACCURACY</span>
              <span className="font-mono text-base font-extrabold text-[#1A1020]">
                {(acc * 100).toFixed(1)}%
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#1A1020]">Fraction of Total Correct Predictions</h3>
            <div className="p-2.5 rounded-lg bg-[#FFF9FC] font-mono text-xs text-[#96003B] border border-[#F0D6E2]">
              (36 + 40) / 100 = 76 / 100 = 0.76 (76.0%)
            </div>
            <p className="text-xs text-[#6D5970] leading-relaxed">
              Useful when classes are balanced and mistake costs are similar. Does not reveal whether mistakes are false alarms or missed spam.
            </p>
          </div>

          {/* Precision */}
          <div className="p-5 rounded-2xl border-2 border-[#F0D6E2] bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[10px] text-[#10B981] font-bold">8.2 · PRECISION</span>
              <span className="font-mono text-base font-extrabold text-[#10B981]">
                {(prec * 100).toFixed(1)}%
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#1A1020]">Reliability of Positive Predictions</h3>
            <div className="p-2.5 rounded-lg bg-[#ECFDF5] font-mono text-xs text-[#059669] border border-[#A7F3D0]">
              36 / (36 + 9) = 36 / 45 = 0.80 (80.0%)
            </div>
            <p className="text-xs text-[#6D5970] leading-relaxed">
              &ldquo;When the model flags an email as Spam, 80% of the time it is genuinely spam.&rdquo;
              Low precision means many legitimate emails get lost in spam!
            </p>
          </div>

          {/* Recall */}
          <div className="p-5 rounded-2xl border-2 border-[#F0D6E2] bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[10px] text-[#3B82F6] font-bold">8.3 · RECALL (SENSITIVITY)</span>
              <span className="font-mono text-base font-extrabold text-[#3B82F6]">
                {(rec * 100).toFixed(1)}%
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#1A1020]">Coverage of Actual Positive Instances</h3>
            <div className="p-2.5 rounded-lg bg-[#EFF6FF] font-mono text-xs text-[#1E40AF] border border-[#BFDBFE]">
              36 / (36 + 15) = 36 / 51 ≈ 0.706 (70.6%)
            </div>
            <p className="text-xs text-[#6D5970] leading-relaxed">
              &ldquo;Of all actual spam emails, the model caught 70.6%; 29.4% leaked into the primary inbox.&rdquo;
              Low recall means many false negatives.
            </p>
          </div>

          {/* F1 */}
          <div className="p-5 rounded-2xl border-2 border-[#F0D6E2] bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[10px] text-[#8B5CF6] font-bold">8.4 · F1-SCORE</span>
              <span className="font-mono text-base font-extrabold text-[#8B5CF6]">
                {(f1 * 100).toFixed(1)}%
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#1A1020]">Harmonic Mean of Precision &amp; Recall</h3>
            <div className="p-2.5 rounded-lg bg-[#F5F3FF] font-mono text-xs text-[#6D28D9] border border-[#DDD6FE]">
              2 · (0.80 · 0.706) / (0.80 + 0.706) = 72 / 96 = 0.750 (75.0%)
            </div>
            <p className="text-xs text-[#6D5970] leading-relaxed">
              Harmonic mean penalizes extreme imbalances (a model with 100% precision and 0% recall gets F1 = 0).
            </p>
          </div>
        </div>
      </section>

      {/* 8.5 Why accuracy can be misleading */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 8.5
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Why Accuracy Can Be Completely Misleading: The 99% Trap
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#DC2626] bg-[#FEF2F2] p-5 shadow-sm space-y-3">
          <span className="font-pixel text-[10px] text-[#DC2626] font-bold uppercase tracking-wider block">
            WHAT TO SAY · THE 1,000-EMAIL THOUGHT EXPERIMENT
          </span>
          <p className="text-xs text-[#2D1F33] leading-relaxed">
            Imagine an inbox with <strong>1,000 emails: 990 legitimate and only 10 spam</strong>.
            A broken &ldquo;do-nothing&rdquo; model predicts that <strong>every single email is legitimate</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-white rounded-xl border border-[#FECACA]">
              <span className="text-[#6D5970] block">Overall Accuracy:</span>
              <span className="text-lg font-bold text-[#DC2626]">990 / 1000 = 99.0%</span>
              <span className="block text-[11px] text-[#6D5970]">Looks wildly impressive on a resume!</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#FECACA]">
              <span className="text-[#6D5970] block">Spam Recall (Actual Caught):</span>
              <span className="text-lg font-bold text-[#DC2626]">0 / 10 = 0.0%</span>
              <span className="block text-[11px] text-[#6D5970]">Misses literally every spam email!</span>
            </div>
          </div>

          <div className="space-y-1 text-xs text-[#4A3B4E]">
            <p>&bull; This dataset is severely <strong>class-imbalanced</strong>: one class dominates the sample.</p>
            <p>&bull; Its Precision for Spam is <strong>undefined (0/0)</strong> because it never predicts Spam at all.</p>
            <p>&bull; This useless model is identical to the &ldquo;majority-class baseline&rdquo; from Module 6.</p>
          </div>
        </div>

        <Callout type="danger" title="Common Misconception: The Accuracy Fallacy">
          <strong>Never interpret an accuracy percentage in isolation</strong> without knowing the class
          distribution and the asymmetrical consequences of each type of error!
        </Callout>
      </section>

      {/* 8.6 When do we care about precision or recall? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 8.6
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            When Do We Care About Precision or Recall?
          </h2>
        </div>

        <CompareTable
          headers={['Application', 'Costly Mistake to Avoid', 'Metric to Prioritize', 'Operational Justification']}
          rows={priorityRows}
          highlight={[0, 1]}
        />

        <Callout type="tip" title="Improvement Added: Clarification on Real-World Spam Systems">
          In real-world email filtering, a <strong>False Positive is vastly more costly</strong> than a False Negative.
          Users tolerate an occasional junk promotion in the inbox, but miss an important hospital alert or job contract
          if false alarms occur. Thus, <strong>precision gets paramount priority</strong>. Always ask:{' '}
          <em>&ldquo;Which specific mistake hurts our users more?&rdquo;</em> before choosing your metric.
        </Callout>

        <div>
          <h3 className="font-bold text-sm text-[#1A1020] mb-2">Metric Selection Quick Reference</h3>
          <CompareTable
            headers={['Metric', 'Main Question Answered', 'Formula', 'Best Scenario']}
            rows={metricSummaryRows}
          />
        </div>

        <Callout type="info" title="Teacher Note: Defining the Positive Class First">
          The positive class must be explicitly defined before computing metrics! If you swap which class is
          designated &ldquo;positive&rdquo; (e.g. calling Legitimate the positive class instead of Spam),
          precision and recall swap values and mathematical meanings completely.
        </Callout>

        {/* Beyond Binary: Multiclass Macro vs Micro */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] text-[#059669] font-bold px-2 py-0.5 rounded bg-[#DCFCE7] border border-[#A7F3D0]">
              IMPROVEMENT ADDED · BEYOND BINARY
            </span>
            <button
              onClick={() => setShowMacroExplainer((p) => !p)}
              className="text-xs font-bold text-[#FF2E7E] hover:underline"
            >
              {showMacroExplainer ? 'Hide Multiclass Details' : 'Show Multiclass: Macro vs. Micro Averaging'}
            </button>
          </div>

          {showMacroExplainer && (
            <div className="space-y-2 text-xs text-[#4A3B4E]">
              <p>For multiclass problems (e.g. Work / Personal / Promotions / Social), compute precision and recall per class, then aggregate:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-[#FFF7FA] border border-[#FFD6E5]">
                  <strong className="text-[#FF2E7E] block mb-1">Macro Average:</strong>
                  Calculates metric independently for each class and takes unweighted arithmetic mean.
                  <strong> Treats every class equally</strong>, highlighting poor performance on small minority classes.
                </div>
                <div className="p-3 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0]">
                  <strong className="text-[#059669] block mb-1">Micro Average:</strong>
                  Aggregates total TP, FP, FN across all classes first before dividing.
                  <strong> Treats every observation equally</strong>; dominated by frequent classes.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Quiz
        partNumber={8}
        questions={[
          {
            question: 'Why is a 99% accuracy score misleading on a dataset with 990 legitimate emails and 10 spam emails?',
            options: [
              'Because a model that simply predicts every email is legitimate achieves 99% accuracy while catching 0% of spam.',
              'Because accuracy cannot exceed 95% in machine learning.',
              'Because imbalanced datasets require regression.',
              'Because 1,000 emails is not enough for evaluation.',
            ],
            correctIndex: 0,
            explanation:
              'On imbalanced data, predicting the majority class trivially inflates accuracy while completely failing the actual objective of catching the minority class (Spam Recall = 0%).',
          },
          {
            question: 'For an email spam filter, why is Precision typically prioritized over Recall?',
            options: [
              'Because losing a critical legitimate email in the spam folder (FP) is much more harmful than seeing an occasional spam in the inbox (FN).',
              'Because Precision is easier to calculate.',
              'Because Recall does not work on emails with links.',
              'Because False Negatives are impossible in spam detection.',
            ],
            correctIndex: 0,
            explanation:
              'A False Positive moves a legitimate email to junk, risking missed emergencies or contracts. Precision measures the reliability of spam quarantine.',
          },
          {
            question: 'What is the harmonic mean property of the F1-Score?',
            options: [
              'It penalizes extreme disparities, so if either Precision or Recall is near zero, F1 drops close to zero.',
              'It always equals the arithmetic average of Precision and Recall.',
              'It only works when Precision equals Recall.',
              'It ignores False Positives completely.',
            ],
            correctIndex: 0,
            explanation:
              'The harmonic mean 2PR/(P+R) is dominated by the smaller term, preventing a model with high recall but near-zero precision from scoring high.',
          },
        ]}
      />
    </div>
  );
}
