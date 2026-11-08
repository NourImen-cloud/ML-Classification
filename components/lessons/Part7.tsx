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
import { overfittingCurveData } from '@/lib/evaluation';

const fitCases = [
  ['Underfitting (High Bias)', 'Model is too simplistic to capture real underlying patterns', 'Poor on both train and test', 'Straight line on non-linear data; Tree depth=1; K=50'],
  ['Good Fit (Balanced)', 'Captures robust, generalizable signals while ignoring noise', 'Good on both; small gap between train and test', 'Tree depth=3; K=5; Regularized Logistic Regression'],
  ['Overfitting (High Variance)', 'Memorizes training points, quirks, and accidental noise', 'Near 100% on training, poor on unseen test data', 'Tree depth=15; K=1 (memorizes noise point E10)'],
];

export default function Part7() {
  const [selectedComplexity, setSelectedComplexity] = useState<number>(4);
  const [modelType, setModelType] = useState<'knn' | 'tree'>('knn');
  const [treeDepth, setTreeDepth] = useState<number>(3);
  const [knnK, setKnnK] = useState<number>(5);

  const currentPoint = overfittingCurveData.find((p) => p.complexity === selectedComplexity) ?? overfittingCurveData[2];

  // Simulating train vs test accuracy based on slider
  const getAccuracies = () => {
    if (modelType === 'knn') {
      if (knnK === 1) return { train: 100, test: 75, gap: 25, status: 'Overfitting' };
      if (knnK === 3) return { train: 92, test: 88, gap: 4, status: 'Good Fit' };
      if (knnK === 5) return { train: 89, test: 89, gap: 0, status: 'Optimal' };
      if (knnK >= 9) return { train: 78, test: 77, gap: 1, status: 'Underfitting' };
    } else {
      if (treeDepth === 1) return { train: 80, test: 78, gap: 2, status: 'Underfitting' };
      if (treeDepth <= 3) return { train: 90, test: 88, gap: 2, status: 'Good Fit' };
      return { train: 100, test: 70, gap: 30, status: 'Overfitting' };
    }
    return { train: 88, test: 86, gap: 2, status: 'Good Fit' };
  };

  const accs = getAccuracies();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={7}
        time="Session 2 · 10–20 min"
        title="Overfitting and Generalization"
        subtitle="Memorization vs. Learning, Complexity Curves & Mitigation"
      />

      {/* 7.1 A human analogy */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 7.1
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            A Human Analogy: Rote Memorization
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white font-bold">
              ASK THE STUDENTS
            </span>
            <span className="font-bold text-sm text-[#1A1020]">Recall the 99% vs 65% Dilemma</span>
          </div>
          <p className="text-sm text-[#2D1F33]">
            &ldquo;A student memorizes the exact numbers of homework answers by heart. When the teacher slightly
            modifies the problem constants on the final exam, the student completely fails. Did they learn the concept?
            Not at all. A machine learning model behaves in the exact same manner when overfit.&rdquo;
          </p>
        </div>
      </section>

      {/* 7.2 What is overfitting? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 7.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            What is Overfitting? The Complexity Curve (Figure 4)
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          <strong>Overfitting</strong> happens when a model fits the training data too closely, incorporating noise
          and accidental sample idiosyncrasies, and consequently performs poorly on new, unseen observations.
          It has learned details that do not generalize.
        </p>

        <CompareTable
          headers={['Regime', 'Description', 'Train vs. Test Performance', 'Spam Classifier Example']}
          rows={fitCases}
          highlight={[1]}
        />

        {/* Figure 4: Interactive Complexity vs Error Curve */}
        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-xs text-[#FF2E7E] font-bold">
              FIGURE 4 · THE GENERALIZATION GAP CURVE
            </span>
            <span className="text-xs font-mono text-[#6D5970]">Error vs Model Complexity</span>
          </div>

          <div className="p-3 bg-[#FFF9FC] rounded-xl border border-[#F0D6E2]">
            <svg viewBox="0 0 400 180" className="w-full">
              {/* Axes */}
              <line x1="40" y1="150" x2="380" y2="150" stroke="#1A1020" strokeWidth="1.5" />
              <line x1="40" y1="150" x2="40" y2="20" stroke="#1A1020" strokeWidth="1.5" />

              {/* Labels */}
              <text x="210" y="170" textAnchor="middle" fontSize="10" fill="#1A1020" fontWeight="bold">
                Model Complexity (Smaller K, Deeper Tree →)
              </text>
              <text x="15" y="85" textAnchor="middle" fontSize="10" fill="#1A1020" fontWeight="bold" transform="rotate(-90, 15, 85)">
                Error Rate
              </text>

              {/* Background regions */}
              <rect x="40" y="20" width="100" height="130" fill="#FEF3C7" opacity="0.3" />
              <text x="90" y="35" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="bold">Underfitting</text>

              <rect x="140" y="20" width="100" height="130" fill="#DCFCE7" opacity="0.3" />
              <text x="190" y="35" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="bold">Good Fit</text>

              <rect x="240" y="20" width="140" height="130" fill="#FEE2E2" opacity="0.3" />
              <text x="310" y="35" textAnchor="middle" fontSize="9" fill="#991B1B" fontWeight="bold">Overfitting</text>

              {/* Training Error Curve (falling) */}
              <path
                d="M 40,130 Q 150,110 240,40 T 380,20"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
              />
              <text x="375" y="15" textAnchor="end" fontSize="9" fill="#10B981" fontWeight="bold">
                — Training Error
              </text>

              {/* Test / Validation Error Curve (U-shaped) */}
              <path
                d="M 40,140 Q 140,80 190,75 Q 260,85 380,145"
                fill="none"
                stroke="#FF2E7E"
                strokeWidth="2.5"
              />
              <text x="375" y="140" textAnchor="end" fontSize="9" fill="#FF2E7E" fontWeight="bold">
                — Test / Val Error
              </text>

              {/* Generalization Gap Arrow at high complexity */}
              <line x1="330" y1="25" x2="330" y2="120" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="335" y="70" fontSize="9" fill="#DC2626" fontWeight="bold">
                Generalization Gap!
              </text>
            </svg>
          </div>

          <Callout type="warning" title="Teacher Note: Diagnostic Rule">
            Typical causes: a model that is excessively complex for the sample size, noisy training labels,
            and non-representative training data. <strong>The diagnostic is always the same: compare training
            performance directly with validation/test performance. The divergence is the warning sign.</strong>
          </Callout>
        </div>
      </section>

      {/* 7.3 Interactive experiment: Break the model */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 7.3 · ACTIVITY
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Interactive Experiment: &ldquo;Break the Model&rdquo;
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4">
          <p className="text-xs text-[#4A3B4E]">
            Manipulate the complexity slider to watch how training accuracy diverges from test accuracy:
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setModelType('knn')}
              className={`px-4 py-1.5 rounded-xl font-bold text-xs ${
                modelType === 'knn' ? 'bg-[#FF2E7E] text-white' : 'bg-white border text-[#6D5970]'
              }`}
            >
              Test KNN (Neighbors K)
            </button>
            <button
              onClick={() => setModelType('tree')}
              className={`px-4 py-1.5 rounded-xl font-bold text-xs ${
                modelType === 'tree' ? 'bg-[#FF2E7E] text-white' : 'bg-white border text-[#6D5970]'
              }`}
            >
              Test Decision Tree (Depth)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
            <div className="space-y-3">
              {modelType === 'knn' ? (
                <div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-bold text-[#1A1020]">KNN Neighbors (K):</span>
                    <span className="font-mono font-bold text-[#FF2E7E]">K = {knnK}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={11}
                    step={2}
                    value={knnK}
                    onChange={(e) => setKnnK(parseInt(e.target.value, 10))}
                    className="w-full accent-[#FF2E7E]"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-[#6D5970]">
                    <span>K=1 (Ultra Complex / Overfit)</span>
                    <span>K=5 (Balanced)</span>
                    <span>K=11 (Oversmoothed)</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-bold text-[#1A1020]">Tree Max Depth:</span>
                    <span className="font-mono font-bold text-[#FF2E7E]">Depth = {treeDepth}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={treeDepth}
                    onChange={(e) => setTreeDepth(parseInt(e.target.value, 10))}
                    className="w-full accent-[#FF2E7E]"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-[#6D5970]">
                    <span>Depth=1 (Stump)</span>
                    <span>Depth=3 (Optimal)</span>
                    <span>Depth=6 (Deep/Memorizes)</span>
                  </div>
                </div>
              )}

              <div className="p-3 bg-[#FFF7FA] rounded-xl border border-[#FFB8D2] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1020]">Diagnosis:</span>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                      accs.status === 'Overfitting'
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : accs.status === 'Underfitting'
                        ? 'bg-[#FEF3C7] text-[#D97706]'
                        : 'bg-[#DCFCE7] text-[#059669]'
                    }`}
                  >
                    {accs.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-[#6D5970]">
                  {accs.status === 'Overfitting' && 'Training accuracy is deceptively high, but test accuracy dropped! The model memorized noise point E10.'}
                  {accs.status === 'Underfitting' && 'Model is too rigid to recognize distinct clusters.'}
                  {accs.status === 'Good Fit' && 'Small generalization gap; robust boundary.'}
                </p>
              </div>
            </div>

            {/* Performance Bars */}
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[#10B981] font-bold">Training Accuracy:</span>
                  <span className="font-bold">{accs.train}%</span>
                </div>
                <div className="h-3 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#10B981] transition-all duration-300"
                    style={{ width: `${accs.train}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[#FF2E7E] font-bold">Test (Unseen) Accuracy:</span>
                  <span className="font-bold">{accs.test}%</span>
                </div>
                <div className="h-3 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF2E7E] transition-all duration-300"
                    style={{ width: `${accs.test}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 text-right text-[11px] font-bold text-[#6D5970]">
                Generalization Gap: {accs.gap}%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.4 How can we reduce overfitting? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 7.4
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            How Can We Reduce Overfitting?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-bold text-[#FF2E7E] block">1. More Data</span>
            <p className="text-[#6D5970]">Collect more diverse, representative training examples.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-bold text-[#FF2E7E] block">2. Reduce Complexity</span>
            <p className="text-[#6D5970]">Limit tree depth, increase KNN K, prune weak features.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-bold text-[#FF2E7E] block">3. Regularization</span>
            <p className="text-[#6D5970]">Penalize large feature weights (L1/L2 in logistic regression).</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-bold text-[#FF2E7E] block">4. Validation Tuning</span>
            <p className="text-[#6D5970]">Pick hyperparameters using held-out validation data.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-bold text-[#FF2E7E] block">5. Remove Leaking Features</span>
            <p className="text-[#6D5970]">Eliminate IDs or proxy variables that accidentally give away the label.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#FF2E7E] space-y-1">
            <span className="font-bold text-[#FF2E7E] block">6. K-Fold Cross-Validation</span>
            <p className="text-[#6D5970]">Rotate validation folds to reduce estimation variance.</p>
          </div>
        </div>

        <Callout type="tip" title="Improvement Added: Cross-Validation in One Sentence">
          <strong>Split the training data into k folds (say 5), train on 4 and validate on the 5th, rotate 5 times, and average the results.</strong>
          This delivers a significantly more reliable estimate than a single train/validation split, particularly on smaller datasets.
        </Callout>

        <KeyInsight>
          <strong>Generalization</strong> is a model’s ability to perform well on new observations that come from the
          intended real-world data distribution. That — not high training performance — is what we ultimately want.
        </KeyInsight>
      </section>

      <Quiz
        partNumber={7}
        questions={[
          {
            question: 'What is the primary indicator that a machine learning model is overfitting?',
            options: [
              'A large performance gap where training error is near zero but test/validation error is high.',
              'Both training and test error are equally high.',
              'The training time is under 1 second.',
              'The confusion matrix contains zero False Positives.',
            ],
            correctIndex: 0,
            explanation:
              'Overfitting manifests as a wide generalization gap: near-perfect performance on familiar training data, but poor accuracy on unseen data.',
          },
          {
            question: 'How does K-Fold Cross-Validation improve model evaluation?',
            options: [
              'By rotating through multiple train/test splits so every observation is validated, reducing the risk of a lucky or unlucky split.',
              'By increasing the total number of features.',
              'By guaranteeing 100% test accuracy.',
              'By converting non-linear data into straight lines.',
            ],
            correctIndex: 0,
            explanation:
              'Averaging evaluation metrics across K distinct validation folds provides a much more robust performance estimate without peeking at the final test set.',
          },
        ]}
      />
    </div>
  );
}
