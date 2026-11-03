'use client';

import { useState } from 'react';
import { SectionHeader, ThoughtPrompt, Callout, KeyInsight, CompareTable } from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';
import ClassificationPlayground from '@/components/interactive/ClassificationPlayground';

const algorithms = [
  {
    id: 'knn',
    name: 'K-Nearest Neighbors',
    idea: 'Classify based on local neighborhood majority vote',
    boundary: 'Non-linear, follows local cluster contours',
    goodFor: 'Small datasets, rapid baseline development',
    formula: 'y_pred = argmax Σ I(y_i = c)',
  },
  {
    id: 'tree',
    name: 'Decision Tree',
    idea: 'Hierarchical sequence of optimal binary conditional splits',
    boundary: 'Orthogonal axis-aligned rectangular regions',
    goodFor: 'High-stakes domains requiring full human interpretability',
    formula: 'Gini = 1 - Σ (p_c)²',
  },
  {
    id: 'lr',
    name: 'Logistic Regression',
    idea: 'Compute linear weighted score, squash via sigmoid into probability',
    boundary: 'Linear hyperplane (straight line in 2D)',
    goodFor: 'Calibrated probability outputs and readable feature weights',
    formula: 'P(y=1|x) = 1 / (1 + e^-(w·x + b))',
  },
  {
    id: 'nb',
    name: 'Naive Bayes',
    idea: 'Multiply conditional feature probabilities assuming feature independence',
    boundary: 'Linear or quadratic probabilistic surface',
    goodFor: 'High-dimensional sparse text (word counts)',
    formula: 'P(c|x) ∝ P(c) · Π P(x_i|c)',
  },
  {
    id: 'svm',
    name: 'Support Vector Machine',
    idea: 'Find the maximum-margin hyperplane separating classes with safety cushion',
    boundary: 'Linear or non-linear via kernel transformations',
    goodFor: 'Complex, medium-sized data with many features',
    formula: 'Maximize Margin = 2 / ||w|| subject to y_i(w·x_i + b) ≥ 1',
  },
];

const naiveBayesData = {
  prior: { spam: 0.40, notSpam: 0.60 },
  likelihood: { word: 'free', spam: 0.60, notSpam: 0.05 },
};

export default function Part5() {
  const [selectedAlgo, setSelectedAlgo] = useState<string | null>(null);
  const [lrWeights] = useState({ w1: 0.8, w2: 0.5, b: -3.0 });
  const [lrEmail, setLrEmail] = useState({ links: 5, words: 6 });
  const [lrThreshold, setLrThreshold] = useState(0.5);

  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
  const lrScore = lrWeights.w1 * lrEmail.links + lrWeights.w2 * lrEmail.words + lrWeights.b;
  const lrProb = sigmoid(lrScore);
  const lrPrediction = lrProb >= lrThreshold ? 'Spam' : 'Not Spam';

  // Naive Bayes calculation
  const nbNumerator = naiveBayesData.likelihood.spam * naiveBayesData.prior.spam;
  const nbDenom = nbNumerator + naiveBayesData.likelihood.notSpam * naiveBayesData.prior.notSpam;
  const nbPosterior = nbNumerator / nbDenom;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={5}
        time="75–85 min"
        title="More Classification Algorithms"
        subtitle="Logistic Regression, Naive Bayes, and Support Vector Machines"
      />

      {/* 5.1 Logistic Regression */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Logistic Regression: Scores to Probabilities
          </h2>
        </div>

        <ThoughtPrompt
          question="Suppose we assign a weight of +0.8 to each hyperlink and +0.5 to each suspicious keyword in an email. How do we convert that raw weighted sum into a valid probability between 0% and 100%?"
          context="We pass the raw score through the non-linear Sigmoid (logistic) function."
        />

        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-4">
          <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider block">
            Interactive Logistic Regression Calculator:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#6D5970] block font-medium mb-1">Links: {lrEmail.links}</label>
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={lrEmail.links}
                  onChange={e => setLrEmail(p => ({ ...p, links: +e.target.value }))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-[#6D5970] block font-medium mb-1">Suspicious Words: {lrEmail.words}</label>
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={lrEmail.words}
                  onChange={e => setLrEmail(p => ({ ...p, words: +e.target.value }))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-[#6D5970] block font-medium mb-1">
                  Decision Threshold: {lrThreshold.toFixed(2)}
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={0.9}
                  step={0.05}
                  value={lrThreshold}
                  onChange={e => setLrThreshold(+e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-[#6D5970] font-mono mt-0.5">
                  <span>0.10 (Aggressive Filter)</span>
                  <span>0.90 (Conservative Filter)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="code-block text-xs">
                Score = (0.8 × {lrEmail.links}) + (0.5 × {lrEmail.words}) - 3.0 = {lrScore.toFixed(2)}
                <br />
                P(Spam) = 1 / (1 + e^-({lrScore.toFixed(2)}))
                <br />
                P(Spam) = {(lrProb * 100).toFixed(1)}%
                <br />
                Threshold = {lrThreshold.toFixed(2)}
              </div>

              <div className="p-3.5 rounded-xl border border-[#F0D6E2] bg-[#FFF7FA] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#6D5970] block">Predicted Category:</span>
                  <span className="font-pixel text-sm font-bold text-[#FF2E7E]">
                    {lrPrediction === 'Spam' ? 'PREDICTED SPAM' : 'PREDICTED NOT SPAM'}
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-[#1A1020]">
                  {(lrProb * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <KeyInsight>
          The decision threshold (default 0.50) is a tunable engineering choice. Increasing the threshold to 0.80 requires stronger evidence before flagging an email, reducing false alarms at the cost of letting more spam slip through.
        </KeyInsight>
      </section>

      {/* 5.2 Naive Bayes */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Naive Bayes: Probabilities and Cumulative Evidence
          </h2>
        </div>

        <ThoughtPrompt
          question="Historically, 40% of all emails are spam. 60% of spam emails contain the word 'free', but only 5% of legitimate emails do. If an incoming email contains 'free', what is the updated probability that it is spam?"
          context="Bayes' Theorem converts observation frequencies into posterior belief."
        />

        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <div className="overflow-x-auto rounded-xl border border-[#F0D6E2]">
            <table className="data-table min-w-full text-xs">
              <thead>
                <tr><th>Probability Parameter</th><th>Value</th><th>Interpretation</th></tr>
              </thead>
              <tbody>
                <tr><td>P(Spam)</td><td className="font-mono">0.40</td><td>Prior probability before reading the email</td></tr>
                <tr><td>P(Not Spam)</td><td className="font-mono">0.60</td><td>Prior probability of legitimate email</td></tr>
                <tr><td>P(&quot;free&quot; | Spam)</td><td className="font-mono">0.60</td><td>Likelihood of word in spam</td></tr>
                <tr><td>P(&quot;free&quot; | Not Spam)</td><td className="font-mono">0.05</td><td>Likelihood of word in legitimate email</td></tr>
                <tr className="highlight">
                  <td className="font-bold">P(Spam | &quot;free&quot;)</td>
                  <td className="font-mono font-bold text-[#FF2E7E]">{(nbPosterior * 100).toFixed(1)}%</td>
                  <td className="font-semibold text-[#FF2E7E]">Posterior probability after seeing &quot;free&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] text-xs text-[#065F46] leading-relaxed">
            Observing the single keyword &quot;free&quot; surges the probability of spam from an initial 40% baseline up to <strong>88.9%</strong>. For multiple words, Naive Bayes multiplies the individual likelihoods together.
          </div>
        </div>

        <Callout type="warning" title="Why is it Called &quot;Naive&quot;?">
          The algorithm naively assumes all features are conditionally independent given the class label. In reality, words like &quot;free&quot; and &quot;win&quot; frequently correlate. Despite this unrealistic independence assumption, Naive Bayes performs surprisingly well and trains nearly instantaneously on text collections.
        </Callout>
      </section>

      {/* 5.3 Support Vector Machines */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Support Vector Machines: Maximizing the Safety Margin
          </h2>
        </div>

        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <p className="text-xs text-[#6D5970] leading-relaxed">
            When two classes are linearly separable, infinitely many valid dividing lines can be drawn. Support Vector Machines find the single unique hyperplane that maximizes the geometric distance (margin) between the boundary and the closest training points on either side:
          </p>

          <div className="p-4 bg-[#FFF9FC] rounded-xl border border-[#F0D6E2] flex flex-col items-center">
            <svg viewBox="0 0 320 160" className="w-full max-w-sm select-none">
              <rect width={320} height={160} fill="#FFFFFF" rx={8} />
              {/* Margin corridor */}
              <rect x={120} y={0} width={80} height={160} fill="#FFE4EF" opacity={0.5} />
              {/* SVM Hyperplane */}
              <line x1={160} y1={10} x2={160} y2={150} stroke="#FF2E7E" strokeWidth={2.5} />
              {/* Margin boundaries */}
              <line x1={120} y1={10} x2={120} y2={150} stroke="#FF2E7E" strokeWidth={1} strokeDasharray="4,4" />
              <line x1={200} y1={10} x2={200} y2={150} stroke="#FF2E7E" strokeWidth={1} strokeDasharray="4,4" />
              {/* Not Spam Points */}
              {[[50, 40], [70, 80], [60, 120], [90, 50]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={5} fill="#10B981" />
              ))}
              {/* Spam Points */}
              {[[240, 50], [260, 90], [230, 130], [250, 70]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={5} fill="#FF2E7E" />
              ))}
              {/* Support Vectors */}
              <circle cx={90} cy={80} r={8} fill="none" stroke="#FF2E7E" strokeWidth={2} />
              <circle cx={90} cy={80} r={5} fill="#10B981" />
              <circle cx={220} cy={80} r={8} fill="none" stroke="#FF2E7E" strokeWidth={2} />
              <circle cx={220} cy={80} r={5} fill="#FF2E7E" />
              {/* Text */}
              <text x={160} y={155} fill="#FF2E7E" fontSize={9} textAnchor="middle" fontWeight="bold">Hyperplane</text>
              <text x={160} y={20} fill="#FF2E7E" fontSize={9} textAnchor="middle">← Margin Corridor →</text>
            </svg>
            <p className="text-[11px] text-[#6D5970] mt-2 font-mono">
              Encircled points are Support Vectors — they alone dictate the boundary location.
            </p>
          </div>
        </div>
      </section>

      {/* 5.4 Multi-Algorithm Playground */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 04
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Comparing All Classifiers Side-by-Side
          </h2>
        </div>

        <div className="space-y-2">
          {algorithms.map(algo => (
            <div
              key={algo.id}
              className="rounded-2xl border border-[#F0D6E2] bg-white p-4 shadow-sm space-y-2"
            >
              <div
                onClick={() => setSelectedAlgo(selectedAlgo === algo.id ? null : algo.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[10px] px-2 py-0.5 rounded bg-[#FFF0F6] text-[#FF2E7E] font-bold">
                    {algo.name}
                  </span>
                  <span className="text-xs text-[#6D5970] hidden sm:inline">{algo.idea}</span>
                </div>
                <span className="text-xs font-bold text-[#FF2E7E]">
                  {selectedAlgo === algo.id ? '▲ Collapse' : '▼ Details'}
                </span>
              </div>

              {selectedAlgo === algo.id && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-[#F7EAF0] text-xs">
                  <div>
                    <span className="text-[10px] text-[#6D5970] uppercase font-bold block">Decision Boundary:</span>
                    <span className="font-semibold text-[#1A1020]">{algo.boundary}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D5970] uppercase font-bold block">Best Suited For:</span>
                    <span className="font-semibold text-[#1A1020]">{algo.goodFor}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D5970] uppercase font-bold block">Formulation:</span>
                    <span className="font-mono text-[#FF2E7E] text-[11px]">{algo.formula}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Embedded Playground */}
        <div className="pt-4">
          <ClassificationPlayground />
        </div>
      </section>

      {/* Quiz */}
      <section className="pt-4 border-t border-[#F0D6E2]">
        <Quiz
          partNumber={5}
          questions={[
            {
              question: 'A trained logistic regression model outputs 0.87 for a specific email. What does this scalar represent?',
              options: [
                'The email contains exactly 87 suspicious keywords',
                'The model estimates an 87% posterior probability that the email is spam',
                'The model has achieved an overall 87% accuracy across the evaluation test set',
                'The email is 87% Euclidean distance away from the nearest non-spam point',
              ],
              correctIndex: 1,
              explanation: 'The output of the sigmoid function in binary logistic regression represents the modeled posterior probability of belonging to the positive class (Spam).',
            },
            {
              question: 'In a Support Vector Machine, what defines a "Support Vector"?',
              options: [
                'Every sample present in the training dataset',
                'The training samples lying furthest from the decision boundary',
                'The critical training samples closest to the decision boundary that dictate the maximum-margin hyperplane',
                'The unseen queries evaluated at test time',
              ],
              correctIndex: 2,
              explanation: 'Support vectors are the subset of training points that lie directly on the margin boundary. Moving or removing any other training points has zero effect on the learned boundary.',
            },
          ]}
        />
      </section>
    </div>
  );
}
