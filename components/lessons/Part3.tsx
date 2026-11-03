'use client';

import { useState, useMemo } from 'react';
import { SectionHeader, ThoughtPrompt, Callout, KeyInsight, MathFormula } from '@/components/ui/ConceptCard';
import { SpamScatterPlot } from '@/components/ui/SpamDataset';
import { emailDataset } from '@/lib/data';
import { knnPredict, generateDecisionBoundary } from '@/lib/knn';
import { Quiz } from '@/components/ui/Quiz';

const NEW3 = { x: 2, y: 3, label: 'New 3' };
const kValues = [1, 3, 5, 7, 9];

const kTable: Record<number, { neighbors: string; spamVotes: number; notSpamVotes: number; prediction: string }> = {
  1:  { neighbors: 'E10', spamVotes: 1, notSpamVotes: 0, prediction: 'Spam' },
  3:  { neighbors: 'E10, E3, E4', spamVotes: 1, notSpamVotes: 2, prediction: 'Not Spam' },
  5:  { neighbors: 'E10, E3, E4, E5, E1', spamVotes: 1, notSpamVotes: 4, prediction: 'Not Spam' },
  7:  { neighbors: 'E10, E3, E4, E5, E1, E2, E7', spamVotes: 2, notSpamVotes: 5, prediction: 'Not Spam' },
  9:  { neighbors: 'E10, E3, E4, E5, E1, E2, E7, E6, E8', spamVotes: 4, notSpamVotes: 5, prediction: 'Not Spam' },
};

const distanceTable = [
  { rank: 1,  id: 'E10', coords: '2, 2', label: 'spam',     distance: 1.00 },
  { rank: 2,  id: 'E3',  coords: '1, 2', label: 'not-spam', distance: 1.41 },
  { rank: 3,  id: 'E4',  coords: '2, 1', label: 'not-spam', distance: 2.00 },
  { rank: 4,  id: 'E5',  coords: '3, 1', label: 'not-spam', distance: 2.24 },
  { rank: 5,  id: 'E1',  coords: '0, 1', label: 'not-spam', distance: 2.83 },
  { rank: 6,  id: 'E2',  coords: '1, 0', label: 'not-spam', distance: 3.16 },
  { rank: 7,  id: 'E7',  coords: '6, 4', label: 'spam',     distance: 4.12 },
  { rank: 8,  id: 'E6',  coords: '5, 6', label: 'spam',     distance: 4.24 },
  { rank: 9,  id: 'E8',  coords: '4, 7', label: 'spam',     distance: 4.47 },
  { rank: 10, id: 'E9',  coords: '7, 7', label: 'spam',     distance: 6.40 },
];

export default function Part3() {
  const [k, setK] = useState(3);
  const [showBoundary, setShowBoundary] = useState(true);
  const [customX, setCustomX] = useState(2);
  const [customY, setCustomY] = useState(3);

  const neighbors = kTable[k] ?? kTable[3];
  const customResult = useMemo(() => knnPredict(customX, customY, k), [customX, customY, k]);

  const boundary = useMemo(
    () => showBoundary ? generateDecisionBoundary(k, emailDataset, 20) : [],
    [showBoundary, k]
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={3}
        time="35–55 min"
        title="K-Nearest Neighbors"
        subtitle="Instance-Based Learning and Majority Neighborhood Voting"
      />

      {/* 3.1 Intuition */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Core Intuition of Proximity
          </h2>
        </div>

        <ThoughtPrompt
          question="Look at point New 3 located at (2 links, 3 suspicious words). Without running any equation, how would human intuition decide whether this is spam?"
          context="We naturally look at the closest known examples surrounding the point."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <SpamScatterPlot newPoint={NEW3} />
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF0F6]">
              <span className="font-pixel text-[10px] font-bold text-[#FF2E7E] uppercase block mb-1">
                ALGORITHM SUMMARY
              </span>
              <p className="text-sm font-semibold text-[#1A1020] leading-relaxed">
                An unlabelled observation is classified by the majority vote of its <strong>K closest training neighbors</strong> in feature space.
              </p>
            </div>
            <Callout type="info" title="Lazy Learning">
              KNN does not construct a generalized mathematical formula during training. It simply stores the training points and defers all distance calculations to inference time.
            </Callout>
          </div>
        </div>
      </section>

      {/* 3.2 The Algorithm & Distance Formula */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The 4-Step Algorithm
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          {[
            { step: '01', title: 'Choose K', desc: 'Determine the number of nearest neighbors that vote.' },
            { step: '02', title: 'Measure Distance', desc: 'Compute Euclidean distance from probe to all points.' },
            { step: '03', title: 'Select Nearest', desc: 'Identify the top K training instances with lowest distance.' },
            { step: '04', title: 'Majority Vote', desc: 'Assign the most frequent class among the K neighbors.' },
          ].map(s => (
            <div key={s.step} className="p-4 rounded-2xl border border-[#F0D6E2] bg-white shadow-sm space-y-1">
              <span className="font-pixel text-xs text-[#FF2E7E] font-bold block">{s.step}</span>
              <h4 className="font-bold text-xs text-[#1A1020]">{s.title}</h4>
              <p className="text-[11px] text-[#6D5970] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <MathFormula
          formula="d(p, q) = √((xₚ - xᵩ)² + (yₚ - yᵩ)²)"
          label="Euclidean Distance Metric"
        />

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider">
            Distances from New 3 (2, 3) to all 10 Training Emails:
          </span>
          <div className="overflow-x-auto rounded-2xl border border-[#F0D6E2] bg-white shadow-sm">
            <table className="data-table min-w-full">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Email ID</th>
                  <th>Features (Links, Words)</th>
                  <th>Ground Truth</th>
                  <th>Euclidean Distance</th>
                </tr>
              </thead>
              <tbody>
                {distanceTable.map((row, i) => (
                  <tr key={row.id} className={i < k ? 'highlight' : ''}>
                    <td className="font-mono font-bold text-xs">{row.rank}</td>
                    <td className="font-mono font-bold">{row.id}</td>
                    <td className="font-mono text-xs text-[#6D5970]">({row.coords})</td>
                    <td>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold font-mono"
                        style={
                          row.label === 'spam'
                            ? { background: '#FFE4EF', color: '#FF2E7E' }
                            : { background: '#ECFDF5', color: '#059669' }
                        }
                      >
                        {row.label === 'spam' ? 'Spam' : 'Not Spam'}
                      </span>
                    </td>
                    <td className="font-mono font-bold text-xs">{row.distance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] font-mono text-[#6D5970]">
            Highlighted rows indicate the {k} active voting neighbors for current K = {k}.
          </p>
        </div>
      </section>

      {/* 3.3 Interactive Simulator: Changing K */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Interactive Simulator: The Impact of Hyperparameter K
          </h2>
        </div>

        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs text-[#1A1020]">Hyperparameter:</span>
              <span className="font-pixel text-base text-[#FF2E7E] font-bold">K = {k}</span>
            </div>
            <button
              onClick={() => setShowBoundary(prev => !prev)}
              className="px-3 py-1 rounded-full border border-[#F0D6E2] text-xs font-bold text-[#6D5970] hover:border-[#FF2E7E]"
            >
              {showBoundary ? 'Hide Decision Boundary' : 'Show Decision Boundary'}
            </button>
          </div>

          <input
            type="range"
            min={1}
            max={9}
            step={2}
            value={k}
            onChange={e => setK(parseInt(e.target.value))}
            className="w-full"
          />

          <div className="flex justify-between text-xs font-mono font-bold text-[#6D5970]">
            {kValues.map(kv => (
              <span key={kv} className={kv === k ? 'text-[#FF2E7E]' : ''}>K={kv}</span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2">
            <SpamScatterPlot newPoint={NEW3} knnGrid={boundary} />
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-[#F0D6E2] bg-[#FFF7FA]">
                <span className="text-[11px] font-mono text-[#6D5970] block mb-1">
                  Prediction for New 3 (2, 3) with K = {k}:
                </span>
                <span className="text-xl font-extrabold text-[#1A1020] block">
                  {neighbors.prediction}
                </span>
                <p className="text-xs text-[#6D5970] mt-1 font-mono">
                  {neighbors.spamVotes} Spam vs. {neighbors.notSpamVotes} Not Spam votes
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#F0D6E2] bg-white text-xs leading-relaxed text-[#4A3B4E]">
                {k === 1 && (
                  <span>
                    <strong>At K = 1:</strong> Only a single neighbor (E10, the noise point) votes. The decision boundary contorts around noise. Prone to severe overfitting.
                  </span>
                )}
                {k === 3 && (
                  <span>
                    <strong>At K = 3:</strong> The odd noise point E10 is outvoted by legitimate neighbors E3 and E4. The boundary becomes noticeably smoother.
                  </span>
                )}
                {k >= 5 && (
                  <span>
                    <strong>At K ≥ 5:</strong> Local neighborhood noise is completely outvoted. The boundary stabilizes, prioritizing broad global trends over local fluctuations.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Custom probe */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider block">
            Test Arbitrary Feature Coordinates:
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#6D5970] block font-medium mb-1">Links: {customX}</label>
              <input type="range" min={0} max={8} value={customX} onChange={e => setCustomX(+e.target.value)} className="w-full" />
            </div>
            <div>
              <label className="text-xs text-[#6D5970] block font-medium mb-1">Suspicious Words: {customY}</label>
              <input type="range" min={0} max={8} value={customY} onChange={e => setCustomY(+e.target.value)} className="w-full" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FFF0F6] border border-[#FFB8D2] flex items-center justify-between">
            <span className="text-xs text-[#1A1020] font-medium">
              Probe at ({customX}, {customY}) with K={k}:
            </span>
            <span className="font-pixel text-xs font-bold text-[#FF2E7E]">
              {customResult.prediction === 'spam' ? 'PREDICTED SPAM' : customResult.prediction === 'not-spam' ? 'PREDICTED NOT SPAM' : 'TIE'}
            </span>
          </div>
        </div>
      </section>

      {/* 3.4 The Feature Scaling Trap */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 04
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Critical Feature Scaling Trap
          </h2>
        </div>

        <Callout type="danger" title="Why Unnormalized Features Break KNN">
          Euclidean distance sums squared differences across all feature axes. If one feature is measured in thousands (e.g., message size in bytes: 0–10,000) and another in single digits (links: 0–10), the large feature completely dominates distance computations, effectively rendering the smaller feature invisible to the model.
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl border border-[#F0D6E2] bg-white space-y-2">
            <span className="font-bold text-[#DC2626] block">Without Normalization (Raw Bytes):</span>
            <p className="text-[#6D5970]">
              Email A (3 links, 2,000 bytes) vs. Email B (9 links, 2,100 bytes) relative to Probe (9 links, 2,000 bytes).
            </p>
            <p className="font-mono text-[#DC2626]">
              d(Probe, A) = 6.0 | d(Probe, B) = 100.0
            </p>
            <p className="text-[#6D5970]">
              The model falsely concludes A is much closer because of the 100-byte difference, ignoring that B shares the exact link count.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] space-y-2">
            <span className="font-bold text-[#065F46] block">With Min-Max Normalization (0.0 to 1.0):</span>
            <p className="text-[#065F46]">
              Both axes scaled proportionally to the same dynamic range.
            </p>
            <p className="font-mono text-[#065F46]">
              d(Probe, A) = 0.60 | d(Probe, B) = 0.01
            </p>
            <p className="text-[#065F46]">
              B is correctly recognized as the nearest neighbor, matching human common sense.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="pt-4 border-t border-[#F0D6E2]">
        <Quiz
          partNumber={3}
          questions={[
            {
              question: 'What computationally occurs during the "training" phase of a K-Nearest Neighbors model?',
              options: [
                'The algorithm iteratively optimizes weights using gradient descent',
                'The model constructs a decision tree of binary threshold splits',
                'The model calculates class conditional probabilities via Bayes theorem',
                'The algorithm simply stores the training instances without computing a model',
              ],
              correctIndex: 3,
              explanation: 'KNN is a non-parametric "lazy learner". It performs zero parameter optimization at training time; it stores the dataset and executes all distance searches during prediction.',
            },
            {
              question: 'For a new query point, the nearest training emails are: Spam (distance 1.0), Not Spam (distance 1.4), Not Spam (distance 2.0). What do K = 1 and K = 3 predict?',
              options: ['Spam and Spam', 'Spam and Not Spam', 'Not Spam and Not Spam', 'Not Spam and Spam'],
              correctIndex: 1,
              explanation: 'At K = 1, only the single closest point votes (distance 1.0 = Spam). At K = 3, all three points vote: 1 Spam vs. 2 Not Spam, so Not Spam wins by majority.',
            },
            {
              question: 'What happens if you set K equal to the total number of training samples (K = N)?',
              options: [
                'The model achieves mathematically perfect 100% test accuracy',
                'The model always predicts whichever class has the majority across the entire dataset, ignoring query position',
                'The model perfectly memorizes every training point',
                'The distance calculation divides by zero and fails',
              ],
              correctIndex: 1,
              explanation: 'When K equals the entire dataset, every sample votes on every query. The spatial location of the probe no longer matters — the majority class wins everywhere.',
            },
          ]}
        />
      </section>
    </div>
  );
}
