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

export default function Part5() {
  const [threshold, setThreshold] = useState<number>(0.5);
  const [testZ, setTestZ] = useState<number>(1.2);
  const [customLinks, setCustomLinks] = useState<number>(2);
  const [customWords, setCustomWords] = useState<number>(2);

  // Weights from PDF 5.2 worked example: w0 = -3, w1 = 1.2, w2 = 0.9
  const w0 = -3.0;
  const w1 = 1.2;
  const w2 = 0.9;

  const computedZ = parseFloat((w0 + w1 * customLinks + w2 * customWords).toFixed(2));
  const sigmoid = (zVal: number) => 1 / (1 + Math.exp(-zVal));
  const computedProb = parseFloat(sigmoid(computedZ).toFixed(2));
  const predictedClass = computedProb >= threshold ? 'Spam' : 'Not Spam';

  // Interactive slider probability
  const sliderProb = parseFloat(sigmoid(testZ).toFixed(2));
  const sliderClass = sliderProb >= threshold ? 'Spam' : 'Not Spam';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={5}
        time="Session 1 · 50–60 min"
        title="Logistic Regression"
        subtitle="Linear Scores, the Sigmoid Function & Classification Thresholds"
      />

      {/* 5.1 The central idea */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 5.1
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Central Idea: Predicting Probabilities First
          </h2>
        </div>

        <ThoughtPrompt
          question="What if a model outputs P(Spam | x) = 0.87 instead of a blunt 'Spam' label?"
          context="An estimated 87% probability tells us the model is fairly confident, but not certain. To make an automated system act (e.g. deliver to inbox or dump in spam), we must define an explicit cutoff rule: the classification threshold."
        />

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Instead of making an immediate hard assignment, <strong>Logistic Regression</strong> first calculates
          a calibrated confidence score: the conditional probability that an observation belongs to the positive class.
        </p>
      </section>

      {/* 5.2 How does it work? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 5.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            How Does It Work? Linear Score to Sigmoid
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Despite containing the word &ldquo;regression&rdquo; in its name, Logistic Regression is fundamentally a
          <strong> classification algorithm</strong>. It computes a linear weighted sum of features, then feeds that
          score into the non-linear <strong>sigmoid (logistic) activation function</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-2">
            <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold">1. LINEAR SCORE (z)</span>
            <MathFormula formula="z = w_0 + w_1 x_1 + w_2 x_2 + \dots + w_n x_n" />
            <p className="text-xs text-[#6D5970]">
              Weights w quantify feature importance. A positive weight pushes toward Spam; a negative weight pushes away.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-2">
            <span className="font-pixel text-[10px] text-[#059669] font-bold">2. SIGMOID MAPPING σ(z)</span>
            <MathFormula formula="\sigma(z) = \frac{1}{1 + e^{-z}} = P(\text{Spam} \mid x)" />
            <p className="text-xs text-[#6D5970]">
              The sigmoid function smoothly compresses any unbounded score z ∈ (-∞, +∞) into a valid probability in (0, 1).
            </p>
          </div>
        </div>

        {/* Sigmoid Properties Interactive Box */}
        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-xs text-[#FF2E7E] font-bold">
              FIGURE 3 · THE SIGMOID CURVE &amp; THRESHOLD
            </span>
            <span className="font-mono text-xs text-[#6D5970]">Interactive Score Explorer</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* SVG Sigmoid Curve */}
            <div className="p-3 bg-[#FFF9FC] rounded-xl border border-[#F0D6E2]">
              <svg viewBox="0 0 300 160" className="w-full">
                {/* Horizontal grid lines */}
                <line x1="30" y1="20" x2="280" y2="20" stroke="#F0D6E2" strokeDasharray="3 3" />
                <text x="25" y="24" textAnchor="end" fontSize="9" fill="#6D5970" fontFamily="monospace">1.0</text>
                
                <line x1="30" y1="80" x2="280" y2="80" stroke="#F0D6E2" strokeDasharray="3 3" />
                <text x="25" y="84" textAnchor="end" fontSize="9" fill="#6D5970" fontFamily="monospace">0.5</text>
                
                <line x1="30" y1="140" x2="280" y2="140" stroke="#1A1020" strokeWidth="1.2" />
                <text x="25" y="144" textAnchor="end" fontSize="9" fill="#6D5970" fontFamily="monospace">0.0</text>

                {/* Vertical axis */}
                <line x1="155" y1="15" x2="155" y2="145" stroke="#1A1020" strokeWidth="1" />
                <text x="155" y="155" textAnchor="middle" fontSize="9" fill="#6D5970" fontFamily="monospace">z = 0</text>

                {/* Threshold line */}
                <line
                  x1="30"
                  y1={140 - threshold * 120}
                  x2="280"
                  y2={140 - threshold * 120}
                  stroke="#FF2E7E"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text x="282" y={140 - threshold * 120 + 3} fontSize="9" fill="#FF2E7E" fontWeight="bold">
                  t = {threshold}
                </text>

                {/* Sigmoid Curve Path */}
                <path
                  d="M 30,138 C 90,137 130,120 155,80 C 180,40 220,23 280,22"
                  fill="none"
                  stroke="#1A1020"
                  strokeWidth="2.5"
                />

                {/* Current point */}
                {(() => {
                  const cx = 155 + (testZ / 6) * 120;
                  const cy = 140 - sliderProb * 120;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={6} fill="#FF2E7E" stroke="#FFFFFF" strokeWidth="2" />
                      <line x1={cx} y1={cy} x2={cx} y2={140} stroke="#FF2E7E" strokeDasharray="2 2" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[#1A1020]">Adjust Linear Score z:</span>
                  <span className="font-mono font-bold text-[#FF2E7E]">{testZ}</span>
                </div>
                <input
                  type="range"
                  min={-6}
                  max={6}
                  step={0.2}
                  value={testZ}
                  onChange={(e) => setTestZ(parseFloat(e.target.value))}
                  className="w-full accent-[#FF2E7E]"
                />
                <div className="flex justify-between font-mono text-[10px] text-[#6D5970]">
                  <span>z = -6 (P ≈ 0)</span>
                  <span>z = 0 (P = 0.5)</span>
                  <span>z = +6 (P ≈ 1)</span>
                </div>
              </div>

              <div className="p-3 bg-[#FFF7FA] rounded-xl border border-[#FFB8D2] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#6D5970]">Output Probability P(Spam|x):</span>
                  <span className="font-mono font-bold text-[#96003B]">{sliderProb}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D5970]">Current Threshold:</span>
                  <span className="font-mono font-bold text-[#1A1020]">{threshold}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-[#FFD6E5]">
                  <span className="font-bold text-[#1A1020]">Predicted Decision:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono font-bold text-xs ${
                      sliderClass === 'Spam'
                        ? 'bg-[#FFE4EF] text-[#FF2E7E]'
                        : 'bg-[#ECFDF5] text-[#059669]'
                    }`}
                  >
                    {sliderClass}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Worked Example from PDF */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <span className="font-bold text-sm text-[#1A1020] block">
            Worked Example: Illustrative Learned Weights
          </span>
          <p className="text-xs text-[#4A3B4E]">
            Suppose training generated the parameters: <code className="bg-[#FFF0F6] px-1 rounded font-bold text-[#96003B]">w₀ = -3.0</code> (bias),{' '}
            <code className="bg-[#FFF0F6] px-1 rounded font-bold text-[#96003B]">w₁ = 1.2</code> (per link), and{' '}
            <code className="bg-[#FFF0F6] px-1 rounded font-bold text-[#96003B]">w₂ = 0.9</code> (per suspicious word).
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#F0D6E2]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FFE4EF] text-[#96003B] font-mono">
                <tr>
                  <th className="p-2.5">Email</th>
                  <th className="p-2.5">Links</th>
                  <th className="p-2.5">Susp. Words</th>
                  <th className="p-2.5">Linear Score z</th>
                  <th className="p-2.5">Probability P(Spam | x)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7EAF0]">
                <tr>
                  <td className="p-2.5 font-bold font-mono">Email 1</td>
                  <td className="p-2.5 font-mono">2</td>
                  <td className="p-2.5 font-mono">2</td>
                  <td className="p-2.5 font-mono">-3 + 1.2(2) + 0.9(2) = 1.2</td>
                  <td className="p-2.5 font-mono font-bold text-[#FF2E7E]">σ(1.2) ≈ 0.77 (77%)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-mono">Email 2</td>
                  <td className="p-2.5 font-mono">0</td>
                  <td className="p-2.5 font-mono">1</td>
                  <td className="p-2.5 font-mono">-3 + 1.2(0) + 0.9(1) = -2.1</td>
                  <td className="p-2.5 font-mono font-bold text-[#059669]">σ(-2.1) ≈ 0.11 (11%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="tip" title="Improvement Added: Why It Is a Linear Classifier">
            With default threshold 0.5, the model predicts Spam exactly when <code className="bg-white px-1 border rounded">z &ge; 0</code>.
            Because <code className="bg-white px-1 border rounded">w₀ + w₁x₁ + w₂x₂ = 0</code> defines a straight line in 2D space
            (and a flat hyperplane in higher dimensions), the decision boundary is strictly linear.
          </Callout>
        </div>
      </section>

      {/* 5.3 From probability to class */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 5.3
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            From Probability to Class: The Decision Rule
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1.5">
            <span className="font-bold text-[#FF2E7E] block">Threshold = 0.5 (Standard Cutoff)</span>
            <p className="text-[#4A3B4E]">
              Email has P(Spam | x) = 0.78.
              <br />
              0.78 &ge; 0.5 → <strong className="text-[#FF2E7E]">Predicted Class: Spam</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1.5">
            <span className="font-bold text-[#059669] block">Threshold = 0.9 (Conservative Cutoff)</span>
            <p className="text-[#4A3B4E]">
              Same email has P(Spam | x) = 0.78.
              <br />
              0.78 &lt; 0.9 → <strong className="text-[#059669]">Predicted Class: Not Spam</strong>
            </p>
          </div>
        </div>

        <Callout type="danger" title="Common Misconception: Score vs Decision Rule">
          Notice what just happened: <strong>the model’s internal score did not change at all</strong> (it remained 0.78)!
          Only our external decision rule changed. The predicted probability and the predicted class are
          fundamentally two separate concepts.
        </Callout>
      </section>

      {/* 5.4 Quick experiment */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 5.4 · ACTIVITY
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Interactive Threshold Experiment
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4">
          <p className="text-xs text-[#4A3B4E]">
            Adjust the threshold slider below. Observe how the same calculated email probability flips between
            Spam and Not Spam as you demand greater or lesser certainty:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A1020] block">Set Threshold (t): {threshold}</label>
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full accent-[#FF2E7E]"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#6D5970]">
                <span>0.1 (Aggressive)</span>
                <span>0.5</span>
                <span>0.9 (Strict)</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A1020] block">Test Email Links: {customLinks}</label>
              <input
                type="range"
                min={0}
                max={5}
                value={customLinks}
                onChange={(e) => setCustomLinks(parseInt(e.target.value, 10))}
                className="w-full accent-[#FF2E7E]"
              />
              <label className="text-xs font-bold text-[#1A1020] block">Test Email Words: {customWords}</label>
              <input
                type="range"
                min={0}
                max={5}
                value={customWords}
                onChange={(e) => setCustomWords(parseInt(e.target.value, 10))}
                className="w-full accent-[#FF2E7E]"
              />
            </div>

            <div className="p-3.5 bg-[#FFF7FA] rounded-xl border border-[#FFB8D2] text-xs space-y-1">
              <div>z = -3 + 1.2({customLinks}) + 0.9({customWords}) = <strong>{computedZ}</strong></div>
              <div>P(Spam | x) = σ({computedZ}) = <strong className="text-[#FF2E7E]">{computedProb}</strong></div>
              <div className="pt-1 border-t border-[#FFD6E5] flex justify-between items-center">
                <span>Decision:</span>
                <span
                  className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                    predictedClass === 'Spam' ? 'bg-[#FFE4EF] text-[#FF2E7E]' : 'bg-[#ECFDF5] text-[#059669]'
                  }`}
                >
                  {predictedClass}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2 Checkpoint */}
      <div className="rounded-2xl border-2 border-[#10B981] bg-[#ECFDF5] p-5 shadow-sm space-y-3">
        <span className="font-pixel text-xs text-[#059669] font-bold uppercase tracking-wider block">
          STAGE 2 CHECKPOINT · HOW CLASSIFIERS DECIDE
        </span>
        <h3 className="font-extrabold text-base text-[#1A1020]">
          Stage Question: &ldquo;Why could a new observation receive a different prediction when we change K, even though the training data has not changed?&rdquo;
        </h3>
        <p className="text-xs md:text-sm text-[#4A3B4E] leading-relaxed">
          Because changing K alters the <em>scale of local consensus</em>! Small K (e.g. K=1) consults only the single nearest point,
          which might be an unrepresentative outlier or noise. Increasing K widens the neighborhood window to incorporate more surrounding
          evidence, allowing the consensus majority to outvote local noise.
        </p>
      </div>

      <Quiz
        partNumber={5}
        questions={[
          {
            question: 'What is the role of the sigmoid activation function in logistic regression?',
            options: [
              'It transforms any real-valued linear score z into a valid probability in the range (0, 1).',
              'It calculates the Euclidean distance between training points.',
              'It splits features using Gini impurity.',
              'It eliminates the need to train weights.',
            ],
            correctIndex: 0,
            explanation:
              'The sigmoid function sigma(z) = 1 / (1 + e^-z) smoothly compresses negative and positive numbers into calibrated probabilities.',
          },
          {
            question: 'If an email has P(Spam | x) = 0.72 and we increase the classification threshold from 0.5 to 0.8, what happens to the prediction?',
            options: [
              'It flips from Spam to Not Spam.',
              'It stays Spam.',
              'The calculated probability drops to 0.40.',
              'The model retraining is automatically triggered.',
            ],
            correctIndex: 0,
            explanation:
              'At threshold 0.5, 0.72 >= 0.5 -> Spam. At threshold 0.8, 0.72 < 0.8 -> Not Spam. The probability did not change; only the cutoff rule changed.',
          },
          {
            question: 'Why does Logistic Regression produce a linear decision boundary?',
            options: [
              'Because with threshold 0.5, the decision boundary occurs exactly where z = 0, which is a linear equation in the features.',
              'Because features must always be straight lines.',
              'Because logistic regression only supports 1 feature.',
              'Because the sigmoid curve is a straight line.',
            ],
            correctIndex: 0,
            explanation:
              'At threshold 0.5, P = 0.5 occurs when linear score z = w0 + w1 x1 + w2 x2 = 0, which defines a flat hyperplane boundary in feature space.',
          },
        ]}
      />
    </div>
  );
}
