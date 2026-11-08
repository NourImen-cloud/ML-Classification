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
import { workedConfusionMatrix } from '@/lib/evaluation';

export default function Part6() {
  const [activeCell, setActiveCell] = useState<'tp' | 'fp' | 'fn' | 'tn'>('fp');
  const [showLeakageDetails, setShowLeakageDetails] = useState(false);

  const cm = workedConfusionMatrix;

  const cellDetails = {
    tp: {
      title: 'True Positive (TP = 36)',
      type: 'Correct Detection',
      color: '#059669',
      bg: '#ECFDF5',
      border: '#A7F3D0',
      description: 'The email is actually Spam, and the classifier correctly flagged it as Spam.',
      realWorld: 'Dangerous phishing email quarantined; user protected.',
    },
    fp: {
      title: 'False Positive (FP = 9)',
      type: 'False Alarm (Critical Mistake)',
      color: '#DC2626',
      bg: '#FEF2F2',
      border: '#FECACA',
      description: 'The email is legitimate, but the classifier erroneously flagged it as Spam.',
      realWorld: 'An urgent job interview offer or flight ticket lands in the Spam folder!',
    },
    fn: {
      title: 'False Negative (FN = 15)',
      type: 'Missed Detection (Nuisance)',
      color: '#D97706',
      bg: '#FFFBEB',
      border: '#FED7AA',
      description: 'The email is actually Spam, but the classifier failed to catch it and let it pass.',
      realWorld: 'An unwanted discount advertisement slips into the primary inbox.',
    },
    tn: {
      title: 'True Negative (TN = 40)',
      type: 'Correct Dismissal',
      color: '#059669',
      bg: '#ECFDF5',
      border: '#A7F3D0',
      description: 'The email is legitimate, and the model correctly sent it to the inbox.',
      realWorld: 'Normal work correspondence delivered cleanly to the inbox.',
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={6}
        time="Session 2 · 0–10 min"
        title="How Do We Know a Classifier Is Good?"
        subtitle="Train / Validation / Test Splits, Baselines & the Confusion Matrix"
      />

      {/* 6.1 A new situation */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 6.1
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            A New Situation: 80% Correct Is Not Enough
          </h2>
        </div>

        <ThoughtPrompt
          question="We evaluated our spam filter on 100 emails and it classified 80 correctly. Is that good enough?"
          context="Not necessarily! What if all 20 errors were important emails from professors or clients thrown into the spam folder? To understand a classifier, we must examine which specific types of mistakes it made."
        />
      </section>

      {/* 6.2 Training, validation and test sets */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 6.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Training, Validation, and Test Sets
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white font-bold">
              ASK THE STUDENTS
            </span>
            <h3 className="font-bold text-sm text-[#1A1020]">The Practice Exam Analogy</h3>
          </div>
          <p className="text-sm text-[#2D1F33]">
            &ldquo;A student memorizes the answers to 20 practice questions. On exam day, the teacher gives them
            those exact same 20 questions, and the student scores 100%. Does that prove they understand the subject?&rdquo;
          </p>
          <p className="text-xs text-[#059669] font-bold">
            → No! True understanding requires testing on fresh, unseen exercises.
          </p>
        </div>

        {/* 3-Way Split Diagram */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <span className="font-bold text-sm text-[#1A1020] block">The Recommended 3-Way Dataset Split</span>
          <div className="flex h-10 rounded-xl overflow-hidden font-mono text-xs font-bold text-white shadow-inner">
            <div className="bg-[#FF2E7E] w-[70%] flex items-center justify-center">
              Training Set (70%)
            </div>
            <div className="bg-[#8B5CF6] w-[15%] flex items-center justify-center border-l border-white/30">
              Val (15%)
            </div>
            <div className="bg-[#10B981] w-[15%] flex items-center justify-center border-l border-white/30">
              Test (15%)
            </div>
          </div>
          <p className="text-[11px] text-[#6D5970] italic">
            Illustrative proportions (70 / 15 / 15). The optimal split depends on sample size.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#FFF0F6] border border-[#FFB8D2]">
              <span className="font-bold text-[#FF2E7E] block mb-1">1. Training Set</span>
              <p className="text-[#4A3B4E]">Ingested by the learning algorithm to estimate parameters and boundary rules.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE]">
              <span className="font-bold text-[#8B5CF6] block mb-1">2. Validation Set</span>
              <p className="text-[#4A3B4E]">Used during development to compare algorithms and tune hyperparameters (K, tree depth, threshold).</p>
            </div>
            <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]">
              <span className="font-bold text-[#059669] block mb-1">3. Test Set</span>
              <p className="text-[#4A3B4E]">Used <strong>strictly once</strong> at the very end to estimate true out-of-sample performance.</p>
            </div>
          </div>
        </div>

        {/* 3 Habits */}
        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-3">
          <span className="font-pixel text-[10px] text-[#059669] font-bold px-2 py-0.5 rounded bg-[#DCFCE7] border border-[#A7F3D0]">
            IMPROVEMENT ADDED · THREE HABITS WORTH TEACHING
          </span>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#FFF9FC] border border-[#F0D6E2] space-y-1">
              <span className="font-bold text-[#1A1020]">1. Stratified Splitting</span>
              <p className="text-[#4A3B4E]">
                Always preserve identical class proportions across train, validation, and test subsets.
                Crucial when positive instances are rare (e.g. 5% spam).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FFF9FC] border border-[#F0D6E2] space-y-1">
              <span className="font-bold text-[#1A1020]">2. Avoid Data Leakage</span>
              <p className="text-[#4A3B4E]">
                Any operation that learns from data (scaling statistics, feature selection, imputation) must fit
                exclusively on training data. Also beware of near-duplicate emails appearing in both sets.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FFF9FC] border border-[#F0D6E2] space-y-1">
              <span className="font-bold text-[#1A1020]">3. Always Compare with a Baseline</span>
              <p className="text-[#4A3B4E]">
                Establish a trivial &ldquo;dummy baseline&rdquo; that unconditionally predicts the majority class.
                <strong> A classifier that cannot outperform the baseline has learned nothing useful.</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#FED7AA] bg-[#FFFBEB] p-4 text-xs text-[#92400E] space-y-1">
          <span className="font-pixel text-[9px] bg-[#FEF3C7] px-2 py-0.5 rounded text-[#D97706] font-bold">
            ASK THE STUDENTS
          </span>
          <p className="font-bold text-[#1A1020]">
            &ldquo;A model achieves 99% accuracy on the training set, but only 65% on the test set. What happened?&rdquo;
          </p>
          <p className="text-[#4A3B4E]">
            → <strong>Overfitting!</strong> The model memorized quirks of familiar data instead of learning general patterns.
            (Module 7 unpacks this completely.)
          </p>
        </div>
      </section>

      {/* 6.3 The confusion matrix */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 6.3
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Confusion Matrix
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          A confusion matrix maps actual ground-truth classes against model predictions.
          By universal convention here, <strong>Spam is the positive class</strong>:
        </p>

        {/* Interactive 2x2 Confusion Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="overflow-x-auto rounded-2xl border-2 border-[#1A1020] bg-white p-2 shadow-md">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  <th className="p-2 font-mono text-[#FF2E7E] font-bold bg-[#FFF0F6] rounded-t-lg">
                    Actual Spam (Pos)
                  </th>
                  <th className="p-2 font-mono text-[#059669] font-bold bg-[#ECFDF5] rounded-t-lg">
                    Actual Not Spam (Neg)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-mono font-bold text-[#FF2E7E] bg-[#FFF0F6] rounded-l-lg text-left">
                    Pred Spam
                  </td>
                  <td
                    onClick={() => setActiveCell('tp')}
                    className={`p-4 cursor-pointer transition-all border border-[#F0D6E2] ${
                      activeCell === 'tp' ? 'bg-[#ECFDF5] ring-2 ring-[#059669]' : 'hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="font-mono text-base font-extrabold text-[#059669]">{cm.tp}</div>
                    <div className="font-bold text-[10px] text-[#1A1020]">True Positive (TP)</div>
                  </td>
                  <td
                    onClick={() => setActiveCell('fp')}
                    className={`p-4 cursor-pointer transition-all border border-[#F0D6E2] ${
                      activeCell === 'fp' ? 'bg-[#FEF2F2] ring-2 ring-[#DC2626]' : 'hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="font-mono text-base font-extrabold text-[#DC2626]">{cm.fp}</div>
                    <div className="font-bold text-[10px] text-[#1A1020]">False Positive (FP)</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-bold text-[#059669] bg-[#ECFDF5] rounded-l-lg text-left">
                    Pred Not Spam
                  </td>
                  <td
                    onClick={() => setActiveCell('fn')}
                    className={`p-4 cursor-pointer transition-all border border-[#F0D6E2] ${
                      activeCell === 'fn' ? 'bg-[#FFFBEB] ring-2 ring-[#D97706]' : 'hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="font-mono text-base font-extrabold text-[#D97706]">{cm.fn}</div>
                    <div className="font-bold text-[10px] text-[#1A1020]">False Negative (FN)</div>
                  </td>
                  <td
                    onClick={() => setActiveCell('tn')}
                    className={`p-4 cursor-pointer transition-all border border-[#F0D6E2] ${
                      activeCell === 'tn' ? 'bg-[#ECFDF5] ring-2 ring-[#059669]' : 'hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="font-mono text-base font-extrabold text-[#059669]">{cm.tn}</div>
                    <div className="font-bold text-[10px] text-[#1A1020]">True Negative (TN)</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cell Inspection Detail Card */}
          <div
            className="rounded-2xl border-2 p-5 shadow-sm space-y-2 transition-all"
            style={{
              borderColor: cellDetails[activeCell].border,
              background: cellDetails[activeCell].bg,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[10px] font-bold uppercase" style={{ color: cellDetails[activeCell].color }}>
                {cellDetails[activeCell].type}
              </span>
              <span className="font-mono text-xs font-bold text-[#1A1020]">
                Click table cells to inspect
              </span>
            </div>
            <h3 className="font-extrabold text-base text-[#1A1020]">
              {cellDetails[activeCell].title}
            </h3>
            <p className="text-xs text-[#2D1F33] leading-relaxed">
              {cellDetails[activeCell].description}
            </p>
            <div className="p-3 bg-white/80 rounded-xl border border-black/5 text-xs text-[#4A3B4E]">
              <strong>Real-World Impact:</strong> {cellDetails[activeCell].realWorld}
            </div>
          </div>
        </div>

        <Callout type="tip" title="Teacher Note: Memory Trick for Students">
          <strong>The second word is always the prediction</strong> (Positive or Negative).
          <strong> The first word tells whether that prediction was correct</strong> (True or False).
          Thus, a <em>False Positive</em> is a wrong &ldquo;positive&rdquo; prediction (model claimed Spam, but was wrong).
        </Callout>
      </section>

      {/* 6.4 A complete numerical example */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 6.4
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Complete Numerical Breakdown (100 Emails)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-1">
            <span className="font-bold text-[#059669] block">Correct Predictions</span>
            <div className="font-mono text-base font-extrabold text-[#059669]">
              TP + TN = 36 + 40 = 76 emails
            </div>
            <p className="text-[#6D5970]">76 out of 100 emails correctly classified.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-1">
            <span className="font-bold text-[#DC2626] block">Incorrect Predictions</span>
            <div className="font-mono text-base font-extrabold text-[#DC2626]">
              FP + FN = 9 + 15 = 24 emails
            </div>
            <p className="text-[#6D5970]">9 false alarms + 15 missed spams.</p>
          </div>
        </div>
      </section>

      <Quiz
        partNumber={6}
        questions={[
          {
            question: 'What is a False Positive (FP) in the context of an email spam classifier?',
            options: [
              'A legitimate email incorrectly flagged as spam and routed to the junk folder.',
              'A spam email that sneaks past the filter into the inbox.',
              'An email that is deleted by the server.',
              'A prediction that occurs during training.',
            ],
            correctIndex: 0,
            explanation:
              'A positive prediction means predicting Spam. A False Positive means that prediction was incorrect — so a real, legitimate email was erroneously marked spam.',
          },
          {
            question: 'Why should the test set never be used to tune hyperparameters?',
            options: [
              'Because repeated evaluation on the test set lets the tuning process gradually adapt to it, contaminating the final assessment.',
              'Because test sets do not contain ground-truth labels.',
              'Because test sets can only have 10 rows.',
              'Because the test set is deleted after training.',
            ],
            correctIndex: 0,
            explanation:
              'Using the test set during development introduces indirect data snooping leakage. Validation data exists specifically for tuning.',
          },
          {
            question: 'What is stratified sampling when splitting a dataset?',
            options: [
              'Ensuring that each subset (train, val, test) maintains the exact same class proportions as the overall dataset.',
              'Sorting rows alphabetically by email subject.',
              'Normalizing all numeric features to zero mean.',
              'Removing all noisy observations before training.',
            ],
            correctIndex: 0,
            explanation:
              'Stratification guarantees that rare classes (e.g. 5% spam) are represented proportionally in training, validation, and test sets.',
          },
        ]}
      />
    </div>
  );
}
