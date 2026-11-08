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
import ClassificationPlayground from '@/components/interactive/ClassificationPlayground';

const algorithmComparisonRows = [
  [
    'K-Nearest Neighbors (KNN)',
    'Consults majority vote of K nearest training points',
    'Yes (Crucial)',
    'Simple, non-parametric, zero training time; very slow prediction latency on large datasets.',
  ],
  [
    'Decision Tree',
    'Follows hierarchical sequence of orthogonal feature threshold splits',
    'No',
    'Highly interpretable (if-then flowchart), handles mixed features; prone to high variance and overfitting when deep.',
  ],
  [
    'Logistic Regression',
    'Computes linear feature score z, passes through sigmoid into calibrated probability',
    'Recommended (Essential with regularization)',
    'Fast, highly interpretable linear weights, outputs smooth probabilities; cannot model non-linear interactions without feature engineering.',
  ],
  [
    'Naive Bayes',
    'Applies Bayes’ Theorem assuming conditional feature independence given class',
    'Usually No',
    'Extremely fast, robust in high dimensions, classic spam filter algorithm; assumption of independence is often violated.',
  ],
  [
    'Support Vector Machine (SVM)',
    'Finds maximum-margin separating hyperplane between classes',
    'Yes (Crucial)',
    'Highly effective in high-dimensional sparse spaces; sensitive to scaling, slower training on huge datasets.',
  ],
];

export default function Part10() {
  const [selectedAlgo, setSelectedAlgo] = useState<'knn' | 'tree' | 'lr' | 'nb' | 'svm'>('lr');

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={10}
        time="Session 2 · 42–50 min"
        title="Comparing Classification Algorithms"
        subtitle="KNN, Trees, Logistic Regression, Naive Bayes & Support Vector Machines"
      />

      {/* 10.1 The Master Comparison Table */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 10.1
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Algorithm Comparison Matrix
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Throughout this curriculum, we explored how different mathematical paradigms approach the same
          classification task. Here is how the five fundamental algorithms compare:
        </p>

        <CompareTable
          headers={['Algorithm', 'Decision Mechanism', 'Scaling Needed?', 'Key Architectural Notes']}
          rows={algorithmComparisonRows}
          highlight={[0, 1, 2]}
        />

        <Callout type="info" title="Teacher Note: The 'No Free Lunch' Theorem">
          There is no universally superior machine learning algorithm. The optimal choice depends entirely
          on the sample size, feature dimensionality, non-linearity of the boundary, latency requirements,
          and whether human interpretability is legally required.
        </Callout>
      </section>

      {/* 10.2 Two Additional Algorithms, Briefly */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 10.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Two Additional Classic Algorithms, Briefly
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Naive Bayes */}
          <div className="rounded-2xl border-2 border-[#F0D6E2] bg-white p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#F5F3FF]">
                ALGORITHM 04
              </span>
              <span className="font-mono text-xs text-[#6D5970]">Probabilistic</span>
            </div>
            <h3 className="font-bold text-base text-[#1A1020]">Naive Bayes</h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Applies <strong>Bayes’ Theorem</strong> with the &ldquo;naive&rdquo; assumption that features
              (e.g. occurrences of individual words like &ldquo;prize&rdquo; and &ldquo;urgent&rdquo;)
              are mutually conditionally independent given the class:
            </p>
            <MathFormula formula="P(y \mid X) = \frac{P(X \mid y) \cdot P(y)}{P(X)} \propto P(y) \prod_{j=1}^d P(x_j \mid y)" />
            <p className="text-xs text-[#6D5970]">
              Historically the foundational workhorse for early text spam filters (e.g. SpamAssassin) due to its lightning speed and minimal memory footprint.
            </p>
          </div>

          {/* SVM */}
          <div className="rounded-2xl border-2 border-[#F0D6E2] bg-white p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-xs font-bold text-[#3B82F6] px-2 py-0.5 rounded bg-[#EFF6FF]">
                ALGORITHM 05
              </span>
              <span className="font-mono text-xs text-[#6D5970]">Geometric Margin</span>
            </div>
            <h3 className="font-bold text-base text-[#1A1020]">Support Vector Machine (SVM)</h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Searches for the unique separating hyperplane that maximizes the <strong>geometric margin</strong>
              (the buffer distance) between the classes.
            </p>
            <div className="p-3 rounded-xl bg-[#FFF9FC] border border-[#F0D6E2] text-xs text-[#2D1F33] space-y-1">
              <span className="font-bold text-[#FF2E7E] block">Support Vectors:</span>
              The critical training observations lying right on the margin boundaries. All other training points can be removed without altering the decision boundary!
            </div>
            <p className="text-xs text-[#6D5970]">
              Remarkably powerful in high dimensions. Non-linear boundaries can be solved using the &ldquo;Kernel Trick&rdquo;.
            </p>
          </div>
        </div>
      </section>

      {/* 10.3 Interactive Multi-Algorithm Laboratory */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 10.3 · LAB ACTIVITY
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Multi-Algorithm Playground on the Same Dataset
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Switch between algorithms below to observe how their decision boundaries differ on our running spam dataset:
        </p>

        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-4 shadow-sm">
          <ClassificationPlayground />
        </div>

        <Callout type="warning" title="Instructional Guidance for Students">
          Do not let students assume that the most complicated, twisty boundary is automatically best!
          A convoluted boundary often indicates that the model has memorized noise point E10,
          leading to poor test set generalization.
        </Callout>
      </section>

      <Quiz
        partNumber={10}
        questions={[
          {
            question: 'Which of the following classification algorithms is invariant to feature scaling and requires no standardization?',
            options: [
              'Decision Trees',
              'K-Nearest Neighbors (KNN)',
              'Support Vector Machines (SVM)',
              'Logistic Regression with L2 Regularization',
            ],
            correctIndex: 0,
            explanation:
              'Decision Trees split based solely on the ordering of values within each individual feature, making them completely invariant to monotonic transformations and scaling.',
          },
          {
            question: 'What is the "naive" assumption made by the Naive Bayes classifier?',
            options: [
              'All features are conditionally independent of each other given the class label.',
              'All classes have identical prior probabilities.',
              'Data points must always be linearly separable.',
              'The dataset contains zero noise.',
            ],
            correctIndex: 0,
            explanation:
              'Naive Bayes simplifies conditional probability estimation by assuming features are conditionally independent given the class, allowing likelihoods to be multiplied directly.',
          },
        ]}
      />
    </div>
  );
}
