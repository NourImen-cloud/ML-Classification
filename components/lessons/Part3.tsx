'use client';

import { useState, useMemo } from 'react';
import {
  SectionHeader,
  ThoughtPrompt,
  CompareTable,
  Callout,
  KeyInsight,
  MathFormula,
} from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';
import { SpamScatterPlot } from '@/components/ui/SpamDataset';
import { emailDataset, module3Neighbors, module3HeldOut } from '@/lib/data';
import { knnPredict, generateDecisionBoundary } from '@/lib/knn';

const kComparisonRows = [
  ['Neighborhood Scope', 'Very few, highly local points', 'Many points, including distant ones'],
  ['Decision Boundary', 'Jagged, highly flexible, bends around outliers', 'Smooth, simple, global majority trend'],
  ['Susceptibility to Noise', 'High: a single mislabeled outlier flips prediction', 'Low: noise gets outvoted by surrounding consensus'],
  ['Core Risk', 'Overfitting (high variance)', 'Underfitting (high bias; if K=N, predicts global mode)'],
];

export default function Part3() {
  const [k, setK] = useState(3);
  const [probeX, setProbeX] = useState(1);
  const [probeY, setProbeY] = useState(2);
  const [showBoundary, setShowBoundary] = useState(true);

  // Scaling demo state
  const [showScalingWorked, setShowScalingWorked] = useState(true);

  // 5-Step Lab responses
  const [labStep, setLabStep] = useState<number>(1);
  const [studentHypothesis, setStudentHypothesis] = useState('');

  const knnResult = useMemo(
    () => knnPredict(probeX, probeY, k, emailDataset),
    [probeX, probeY, k]
  );

  const boundaryGrid = useMemo(
    () => (showBoundary ? generateDecisionBoundary(k, emailDataset, 18) : undefined),
    [showBoundary, k]
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={3}
        time="Session 1 · 18–38 min · Main Lab"
        title="K-Nearest Neighbors (KNN)"
        subtitle="Instance-Based Learning, Distance Metrics, Feature Scaling & Accuracy Check"
      />

      {/* 3.1 Intuition */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 3.1
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Core Intuition: Birds of a Feather
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white font-bold">
              ASK THE STUDENTS
            </span>
            <h3 className="font-bold text-sm text-[#1A1020]">The Neighborhood Analogy</h3>
          </div>
          <p className="text-sm text-[#2D1F33] leading-relaxed">
            &ldquo;You move to an unfamiliar town and want to know whether a specific street is mostly
            residential or commercial. You look at the 5 closest neighboring streets. If 4 of them are
            quiet residential homes and 1 is a convenience store, what do you predict?&rdquo;
          </p>
          <p className="text-xs text-[#6D5970] italic pt-1">
            (Almost all students intuitively answer: Residential! KNN operates on this exact voting rule.)
          </p>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          <strong>K-Nearest Neighbors (KNN)</strong> classifies any new observation according to the
          labels of its nearest training examples in feature space. <strong>K</strong> is the number of
          neighbors consulted, <strong>distance</strong> measures geometric proximity, and the{' '}
          <strong>majority class</strong> among those K neighbors becomes the predicted class.
        </p>
      </section>

      {/* 3.2 Observations as points */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 3.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Observations as Points in Feature Space
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Simplify the email problem to two continuous features: <code className="bg-[#FFF0F6] px-1 rounded text-[#96003B]">x₁ = number of links</code> and{' '}
          <code className="bg-[#FFF0F6] px-1 rounded text-[#96003B]">x₂ = number of suspicious words</code>.
          Every email now maps to a coordinate point <code className="bg-[#FFF0F6] px-1 rounded text-[#96003B]">x = (x₁, x₂)</code>.
          For instance, probe point <code className="bg-white font-bold px-1.5 py-0.5 border rounded">Point P = (1, 2)</code> represents an email
          with 1 hyperlink and 2 flagged suspicious words.
        </p>

        <Callout type="info" title="Teacher Note: Notation Clarification">
          The example query point is labeled <strong>Point P</strong> to avoid confusing students with Email A
          from the Module 2 table (where Email A was at coordinate (0, 0)).
        </Callout>

        {/* 3.3 How does KNN measure distance? */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold uppercase tracking-wider block">
            SECTION 3.3 · HOW DOES KNN MEASURE DISTANCE?
          </span>
          <p className="text-xs text-[#4A3B4E] leading-relaxed">
            The standard introductory choice is <strong>Euclidean distance</strong> (Pythagorean theorem in feature space):
          </p>
          <MathFormula formula="d(A, B) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \qquad \text{General } d\text{-dimensions: } d(A, B) = \sqrt{\sum_{j=1}^d (A_j - B_j)^2}" />

          {/* Worked Example */}
          <div className="p-4 rounded-xl bg-[#FFF9FC] border border-[#FFD6E5] text-xs space-y-2">
            <span className="font-bold text-[#FF2E7E]">Worked Example:</span>
            <p className="text-[#2D1F33]">
              Compute distance between email <code className="font-mono bg-white px-1 border rounded">A = (1, 2)</code> and{' '}
              <code className="font-mono bg-white px-1 border rounded">B = (4, 6)</code>:
            </p>
            <div className="font-mono text-[#96003B] bg-white p-2.5 rounded-lg border border-[#F0D6E2]">
              d = √((4 - 1)² + (6 - 2)²) = √(3² + 4²) = √(9 + 16) = √25 = 5.0
            </div>
            <p className="text-[#6D5970]">
              A smaller distance indicates that observations are geometrically closer in feature space.
              Alternative distance metrics (Manhattan, Cosine, Minkowski) can also be used and can alter the selected neighbors.
            </p>
          </div>
        </div>
      </section>

      {/* 3.4 How does KNN make a prediction? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 3.4
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            How Does KNN Make a Prediction?
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Suppose the five nearest neighbors to our new email are sorted in ascending order of Euclidean distance:
        </p>

        {/* Neighbors Table */}
        <div className="overflow-x-auto rounded-2xl border-2 border-[#FFD6E5] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-[#FFE4EF] border-b-2 border-[#FFB8D2] text-[#96003B] font-mono text-xs uppercase">
                <th className="py-2.5 px-4">Neighbor</th>
                <th className="py-2.5 px-4">Distance</th>
                <th className="py-2.5 px-4">Class</th>
                <th className="py-2.5 px-4">K = 3 Window</th>
                <th className="py-2.5 px-4">K = 5 Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7EAF0]">
              {module3Neighbors.map((n, i) => (
                <tr key={n.neighbor} className="hover:bg-[#FFF7FA]">
                  <td className="py-2.5 px-4 font-bold font-mono text-[#1A1020]">Neighbor {n.neighbor}</td>
                  <td className="py-2.5 px-4 font-mono text-[#4A3B4E]">{n.distance}</td>
                  <td className="py-2.5 px-4 font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                        n.class === 'Spam'
                          ? 'bg-[#FFE4EF] text-[#FF2E7E] border border-[#FFB8D2]'
                          : 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                      }`}
                    >
                      {n.class}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    {i < 3 ? (
                      <span className="text-[11px] font-bold text-[#FF2E7E]">Included (Vote #{i + 1})</span>
                    ) : (
                      <span className="text-[11px] text-[#A093A4]">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="text-[11px] font-bold text-[#10B981]">Included (Vote #{i + 1})</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1.5">
            <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold">WHEN K = 3</span>
            <p className="text-[#2D1F33]">
              Neighbors: A (Spam), B (Spam), C (Not Spam).
              <br />
              <strong>Spam: 2 votes, Not Spam: 1 vote → Prediction: Spam</strong>
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1.5">
            <span className="font-pixel text-[10px] text-[#10B981] font-bold">WHEN K = 5</span>
            <p className="text-[#2D1F33]">
              Neighbors: A, B, C, D, E.
              <br />
              <strong>Spam: 3 votes, Not Spam: 2 votes → Prediction: Spam</strong>
            </p>
          </div>
        </div>

        <MathFormula formula="\hat{y} = \text{mode}(y_1, y_2, \dots, y_K)" label="Mathematical Majority Voting Rule" />

        {/* Practical Details */}
        <Callout type="tip" title="Improvement Added: Practical Implementation Details">
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li><strong>Always choose an odd K for 2 classes</strong> to avoid fifty-fifty ties.</li>
            <li><strong>KNN is a &ldquo;lazy learner&rdquo;:</strong> training simply stores the training dataset in memory; all computational expense occurs during prediction, which scales poorly on massive datasets.</li>
            <li><strong>Distance weighting:</strong> closer neighbors can be weighted inversely by distance (e.g. 1/d) so adjacent points matter more.</li>
            <li><strong>Curse of dimensionality:</strong> as the feature dimension d grows large, data points become equidistant and distance metrics lose discriminative power.</li>
          </ul>
        </Callout>
      </section>

      {/* 3.5 Why does K matter? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 3.5
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Why Does the Choice of K Matter?
          </h2>
        </div>

        <CompareTable
          headers={['Characteristic', 'Small K (e.g. K = 1)', 'Large K (e.g. K = 15)']}
          rows={kComparisonRows}
          highlight={[1, 3]}
        />

        <Callout type="info" title="Teacher Note: Intuitive Bias-Variance Trade-Off">
          This is the fundamental bias–variance trade-off in its most intuitive visual form.
          If K equals the total number of training observations (K = N), the classifier ignores local
          coordinates entirely and unconditionally predicts the overall dataset majority class!
        </Callout>
      </section>

      {/* 3.6 A crucial detail: feature scaling */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 3.6
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            A Crucial Detail: Feature Scaling &amp; Standardization
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white font-bold">
              ASK THE STUDENTS
            </span>
            <span className="font-bold text-sm text-[#1A1020]">Which feature dominates the distance?</span>
          </div>
          <p className="text-sm text-[#2D1F33]">
            Suppose you have two features: <strong>Age</strong> (ranging from 18 to 60) and <strong>Annual Income</strong> (ranging from $10,000 to $100,000).
            Which one will dominate the Euclidean distance calculation?
          </p>
          <p className="text-xs text-[#059669] font-bold">
            → Income! Because its raw numerical variations are thousands of times larger.
          </p>
        </div>

        {/* Scaling Worked Example */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-[#1A1020]">Worked Proof: The Scaling Trap</span>
            <button
              onClick={() => setShowScalingWorked((p) => !p)}
              className="text-xs font-bold text-[#FF2E7E] hover:underline"
            >
              {showScalingWorked ? 'Hide calculations' : 'Show calculations'}
            </button>
          </div>

          {showScalingWorked && (
            <div className="space-y-2.5 text-xs text-[#4A3B4E]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
                <div className="p-2.5 rounded-lg bg-[#FFF9FC] border border-[#F0D6E2]">
                  <strong>Person A:</strong> Age 25, Income $30,000
                </div>
                <div className="p-2.5 rounded-lg bg-[#FFF9FC] border border-[#F0D6E2]">
                  <strong>Person B:</strong> Age 55, Income $31,000
                </div>
                <div className="p-2.5 rounded-lg bg-[#FFF9FC] border border-[#F0D6E2]">
                  <strong>Person C:</strong> Age 26, Income $60,000
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#FFB8D2] font-mono text-[#96003B] space-y-1">
                <div>d(A, B) = √((55 - 25)² + (31000 - 30000)²) = √(30² + 1000²) ≈ 1000.5</div>
                <div>d(A, C) = √((26 - 25)² + (60000 - 30000)²) = √(1² + 30000²) ≈ 30000.0</div>
              </div>

              <p className="leading-relaxed">
                Raw Euclidean distance claims Person B is <strong>30 times closer to A</strong> than Person C is,
                even though B is 30 years older and C is only 1 year older! Age was completely drowned out by the dollar scale.
              </p>

              <div className="pt-2">
                <span className="font-bold text-[#1A1020] block mb-1">The Standard Solution: Z-Score Standardization</span>
                <MathFormula formula="z = \frac{x - \mu}{\sigma} \qquad (\mu = \text{training mean}, \quad \sigma = \text{training standard deviation})" />
              </div>
            </div>
          )}
        </div>

        <Callout type="danger" title="Common Misconception: The Scaling Data Leakage Trap">
          <strong>Practical Rule:</strong> Compute μ and σ from the <strong>training data only</strong>,
          then apply those exact fixed statistics to transform validation and test sets.
          Computing scalers across the entire dataset lets information from the unseen test set &ldquo;leak&rdquo;
          into model fitting! Scaling is essential for distance-based algorithms (KNN, SVM, regularized logistic regression),
          but unnecessary for Decision Trees.
        </Callout>
      </section>

      {/* 3.7 KNN Lab Challenge (5-Step Simulator) */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 3.7 · PART 3 LAB STRUCTURE
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Interactive KNN Simulator: The 5-Step Laboratory
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
              <span className="font-pixel text-xs text-[#FF2E7E] font-bold">STEP 1 · PREDICT BEFORE INTERACTING</span>
              <p className="text-xs text-[#4A3B4E]">
                Position the new probe email at <code className="bg-[#FFF0F6] px-1 rounded font-bold">Links = 2, Words = 2</code> (right on top of noise point E10).
                Before touching the slider, <strong>write down what class you expect for K = 1 vs K = 5</strong>:
              </p>
              <input
                type="text"
                placeholder="E.g., At K=1 it will predict Spam because E10 is spam, but at K=5..."
                value={studentHypothesis}
                onChange={(e) => setStudentHypothesis(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#F0D6E2] focus:border-[#FF2E7E] focus:outline-none"
              />
              <button onClick={() => setLabStep(2)} className="btn-pink px-4 py-1.5 text-xs font-bold">
                Advance to Step 2: Run Experiment →
              </button>
            </div>
          )}

          {labStep >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <SpamScatterPlot
                  newPoint={{ x: probeX, y: probeY, label: 'Probe P' }}
                  showBoundary={showBoundary}
                  knnGrid={boundaryGrid}
                />
              </div>

              <div className="space-y-4 text-xs">
                {/* Controls */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A1020]">Value of K (Neighbors):</span>
                    <span className="font-mono font-bold text-[#FF2E7E] text-base">{k}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={9}
                    step={2}
                    value={k}
                    onChange={(e) => setK(parseInt(e.target.value, 10))}
                    className="w-full accent-[#FF2E7E]"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-[#6D5970]">
                    <span>K = 1 (Local/Noisy)</span>
                    <span>K = 5</span>
                    <span>K = 9 (Global)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#1A1020] block mb-1">Probe X (Links): {probeX}</label>
                    <input
                      type="range"
                      min={0}
                      max={7}
                      value={probeX}
                      onChange={(e) => setProbeX(parseInt(e.target.value, 10))}
                      className="w-full accent-[#FF2E7E]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1A1020] block mb-1">Probe Y (Words): {probeY}</label>
                    <input
                      type="range"
                      min={0}
                      max={7}
                      value={probeY}
                      onChange={(e) => setProbeY(parseInt(e.target.value, 10))}
                      className="w-full accent-[#FF2E7E]"
                    />
                  </div>
                </div>

                {/* Output box */}
                <div className="p-3.5 rounded-xl bg-[#FFF7FA] border border-[#FFB8D2] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A1020]">Predicted Class:</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-xs ${
                        knnResult.prediction === 'spam'
                          ? 'bg-[#FFE4EF] text-[#FF2E7E]'
                          : 'bg-[#ECFDF5] text-[#059669]'
                      }`}
                    >
                      {knnResult.prediction.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6D5970]">
                    Votes: {knnResult.spamVotes} Spam vs {knnResult.notSpamVotes} Not Spam
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBoundary((p) => !p)}
                    className="btn-white px-3 py-1.5 text-xs font-bold"
                  >
                    {showBoundary ? 'Hide Decision Boundary' : 'Show Decision Boundary Grid'}
                  </button>
                  {labStep < 5 && (
                    <button
                      onClick={() => setLabStep((s) => s + 1)}
                      className="btn-pink px-3 py-1.5 text-xs font-bold"
                    >
                      Next Lab Step ({labStep + 1}) →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {labStep === 3 && (
            <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-xs text-[#166534]">
              <strong>Step 3 (Observe):</strong> At K = 1, placing the probe near point E10 results in Spam because E10 is the sole neighbor. As you increase K to 3 and 5, legitimate emails (E3, E4, E5) outvote E10!
            </div>
          )}

          {labStep === 4 && (
            <div className="p-3 bg-[#FFF7FA] border border-[#FFB8D2] rounded-xl text-xs text-[#96003B]">
              <strong>Step 4 (Explain):</strong> Larger K widens the consensus circle. Individual noisy data points are drowned out by neighborhood density, yielding smoother boundaries.
            </div>
          )}

          {labStep === 5 && (
            <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-xs text-[#1E40AF]">
              <strong>Step 5 (Apply):</strong> If a dataset has tightly clustered tiny sub-classes, a very large K will erase those rare classes. Hyperparameter K must always be chosen via cross-validation.
            </div>
          )}
        </div>
      </section>

      {/* 3.8 A first quick check: how well did it do? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 3.8
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            A First Quick Check: How Well Did It Do?
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Before moving to Decision Trees: how do we know if our KNN classifier is any good?
          We hide four labeled emails that the model did not use for training, predict them using <code className="bg-[#FFF0F6] px-1 rounded">K = 3</code>,
          and compare predictions with their actual true classes:
        </p>

        {/* Held-out Table */}
        <div className="overflow-x-auto rounded-2xl border-2 border-[#FFD6E5] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-[#FFE4EF] border-b-2 border-[#FFB8D2] text-[#96003B] font-mono text-xs uppercase">
                <th className="py-2.5 px-4">Held-Out Email</th>
                <th className="py-2.5 px-4">True Class</th>
                <th className="py-2.5 px-4">KNN Prediction</th>
                <th className="py-2.5 px-4">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7EAF0]">
              {module3HeldOut.map((item) => (
                <tr key={item.id} className="hover:bg-[#FFF7FA]">
                  <td className="py-2.5 px-4 font-bold font-mono text-[#1A1020]">Email {item.id}</td>
                  <td className="py-2.5 px-4 font-mono text-[#4A3B4E]">{item.trueClass}</td>
                  <td className="py-2.5 px-4 font-mono text-[#4A3B4E]">{item.predClass}</td>
                  <td className="py-2.5 px-4 font-bold">
                    {item.correct ? (
                      <span className="text-[#059669] flex items-center gap-1">✓ Correct</span>
                    ) : (
                      <span className="text-[#DC2626] flex items-center gap-1">✗ Mistake (Missed Spam)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-[#F0D6E2] bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[#6D5970] block">Calculation:</span>
            <span className="font-bold text-[#1A1020] text-sm">
              Correct Predictions / Total = 3 / 4 = 75.0%
            </span>
          </div>
          <span className="text-[#6D5970]">
            This simple ratio is called <strong>Accuracy</strong>. (Modules 6 and 8 will refine it.)
          </span>
        </div>

        <Callout type="danger" title="Common Misconception: Why Not Test on Training Points Themselves?">
          Why can’t we test accuracy on the training points themselves? With <code className="bg-white px-1.5 py-0.5 rounded text-[#DC2626]">K = 1</code>,
          every training point’s nearest neighbor is literally itself (distance = 0), so the classifier scores 100% accuracy every single time
          without having proven any ability to generalize to new, unseen data!
        </Callout>
      </section>

      <Quiz
        partNumber={3}
        questions={[
          {
            question: 'What happens to the KNN decision boundary when K is increased from 1 to 9?',
            options: [
              'It becomes smoother and less sensitive to individual noisy points.',
              'It becomes more jagged and fits every single outlier.',
              'It changes from classification to continuous regression.',
              'It forces the distance metric to become Manhattan distance.',
            ],
            correctIndex: 0,
            explanation:
              'Larger K aggregates broader local consensus, smoothing out boundary irregularities and reducing the impact of isolated noisy points.',
          },
          {
            question: 'Why must feature scaling parameters (mean and standard deviation) be computed exclusively from the training set?',
            options: [
              'To avoid data leakage from the test set into the training process.',
              'Because the test set does not have numeric features.',
              'Because standard deviation cannot be calculated on small test sets.',
              'Because scikit-learn will throw a syntax error otherwise.',
            ],
            correctIndex: 0,
            explanation:
              'Evaluating a model fairly requires that the test set remains strictly unseen. Computing mean and variance over test points leaks test information into training.',
          },
          {
            question: 'Why is testing a KNN classifier with K = 1 on its own training set fundamentally flawed?',
            options: [
              'Because every point is its own nearest neighbor (distance = 0), guaranteeing trivial 100% accuracy.',
              'Because K = 1 cannot calculate Euclidean distance.',
              'Because training sets only contain spam emails.',
              'Because K = 1 requires quadratic time complexity.',
            ],
            correctIndex: 0,
            explanation:
              'At K=1, the nearest neighbor of any training point is that exact point itself, creating 100% memorization that masks overfitting.',
          },
        ]}
      />
    </div>
  );
}
