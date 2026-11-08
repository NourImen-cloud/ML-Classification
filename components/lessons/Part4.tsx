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
import { figure2SpamTree, decisionTree, shallowTree, traverseTree } from '@/lib/decisionTree';

const splitTableRows = [
  ['Left subset', '4 emails (3 Not Spam, 1 Spam)', '1 - (3/4)² - (1/4)² = 1 - 0.5625 - 0.0625 = 0.375'],
  ['Right subset', '6 emails (2 Not Spam, 4 Spam)', '1 - (2/6)² - (4/6)² = 1 - 0.111 - 0.444 ≈ 0.444'],
  ['Weighted Gini', '10 emails total', '(4/10)(0.375) + (6/10)(0.444) = 0.150 + 0.266 = 0.417'],
];

export default function Part4() {
  const [activeTab, setActiveTab] = useState<'conceptual' | 'numerical'>('conceptual');
  const [treeDepth, setTreeDepth] = useState<number>(2);
  const [testLinks, setTestLinks] = useState<number>(2);
  const [testWords, setTestWords] = useState<number>(3);
  const [showEntropy, setShowEntropy] = useState<boolean>(false);

  // 5-step lab state
  const [labStep, setLabStep] = useState<number>(1);
  const [predictionHypothesis, setPredictionHypothesis] = useState('');

  const currentTree = treeDepth === 1 ? shallowTree : decisionTree;
  const traversal = traverseTree(testLinks, testWords, currentTree);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={4}
        time="Session 1 · 38–50 min"
        title="Decision Trees"
        subtitle="Hierarchical Splits, Gini Impurity, Axis-Aligned Boundaries & Depth"
      />

      {/* 4.1 Start with human reasoning */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 4.1
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Start with Human Reasoning
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white font-bold">
              ASK THE STUDENTS
            </span>
            <h3 className="font-bold text-sm text-[#1A1020]">Intuitive Email Triage</h3>
          </div>
          <p className="text-sm text-[#2D1F33]">
            &ldquo;If you were personally deciding whether an incoming email was spam, what sequential questions would you ask?&rdquo;
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-[#4A3B4E]">
            <div className="p-2.5 rounded-lg bg-white border border-[#F0D6E2]">
              &bull; &ldquo;Does the email contain a suspicious URL?&rdquo;
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#F0D6E2]">
              &bull; &ldquo;Is the sender completely unknown to the user?&rdquo;
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#F0D6E2]">
              &bull; &ldquo;Does the body demand immediate urgent action?&rdquo;
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#F0D6E2]">
              &bull; &ldquo;Does it ask for passwords or credit card numbers?&rdquo;
            </div>
          </div>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          A <strong>Decision Tree</strong> mimics this intuitive human process: it learns a hierarchical sequence
          of questions that partition observations into increasingly homogeneous (pure) subsets. It functions like a
          rigorous flowchart.
        </p>
      </section>

      {/* 4.2 Anatomy of a tree */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 4.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Anatomy of a Decision Tree (Figure 2)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-white border border-[#F0D6E2]">
            <span className="font-bold text-[#FF2E7E] block mb-1">Root Node</span>
            <p className="text-[#6D5970]">The very first question evaluated on all observations.</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#F0D6E2]">
            <span className="font-bold text-[#1A1020] block mb-1">Internal Nodes</span>
            <p className="text-[#6D5970]">Subsequent conditional decision tests.</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#F0D6E2]">
            <span className="font-bold text-[#1A1020] block mb-1">Branches</span>
            <p className="text-[#6D5970]">Outcome paths (e.g. Yes / No or &le; 3.5 / &gt; 3.5).</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#F0D6E2]">
            <span className="font-bold text-[#059669] block mb-1">Leaf Nodes</span>
            <p className="text-[#6D5970]">Terminal endpoints containing the final predicted class.</p>
          </div>
        </div>

        {/* Figure 2 Interactive Visual Diagram */}
        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-xs text-[#FF2E7E] font-bold">
              FIGURE 2 · THE EMAIL SPAM TREE FLOWCHART
            </span>
            <span className="text-[11px] font-mono text-[#6D5970]">All leaves are real classes</span>
          </div>

          <div className="flex flex-col items-center space-y-4 max-w-md mx-auto py-2">
            {/* Root Node */}
            <div className="px-5 py-2.5 rounded-xl bg-[#1A1020] text-white font-mono text-xs font-bold text-center shadow-md">
              Suspicious link?
            </div>

            {/* Split branches */}
            <div className="w-full flex justify-between items-start px-8">
              {/* Left Branch */}
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs font-bold text-[#6D5970] font-mono">No ↓</span>
                <div className="px-4 py-2 rounded-xl bg-[#ECFDF5] border-2 border-[#10B981] text-[#059669] font-mono text-xs font-bold shadow-sm">
                  NOT SPAM
                </div>
              </div>

              {/* Right Branch */}
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs font-bold text-[#6D5970] font-mono">Yes ↓</span>
                <div className="px-4 py-2.5 rounded-xl bg-[#FFF0F6] border-2 border-[#FF2E7E] text-[#1A1020] font-mono text-xs font-bold text-center shadow-sm">
                  Unknown sender?
                </div>

                {/* Sub branches */}
                <div className="w-full flex justify-between gap-4 pt-2">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#6D5970]">No ↓</span>
                    <div className="px-2.5 py-1.5 rounded-lg bg-[#ECFDF5] border border-[#10B981] text-[#059669] font-mono text-[11px] font-bold">
                      NOT SPAM
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#6D5970]">Yes ↓</span>
                    <div className="px-2.5 py-1.5 rounded-lg bg-[#FFE4EF] border border-[#FF2E7E] text-[#FF2E7E] font-mono text-[11px] font-bold">
                      SPAM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Callout type="info" title="Teacher Note: Leaf Node Realism">
            The original notes sketched a leaf called &ldquo;Review&rdquo;. In supervised classification,
            <strong> leaf nodes must always represent real, valid class categories</strong> (Spam or Not Spam).
            A classifier cannot output an undefined &ldquo;Review&rdquo; state unless &ldquo;Review&rdquo; was explicitly trained as a class.
          </Callout>
        </div>
      </section>

      {/* 4.3 How does the tree choose its questions? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 4.3
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            How Does the Tree Choose Its Questions? Gini Impurity
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          A tree searches through candidate splits using <strong>impurity</strong>.
          Consider a pool of 10 emails: <strong>5 Spam, 5 Not Spam</strong>. This parent set is completely mixed.
          We want to find questions that split the data into subsets that are as homogeneous (pure) as possible.
        </p>

        <MathFormula formula="\text{Gini} = 1 - \sum_{k=1}^C p_k^2 \qquad (p_k = \text{proportion of class } k)" label="Gini Impurity Formula" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-bold text-[#FF2E7E]">For the 5/5 Parent Group:</span>
            <div className="font-mono bg-[#FFF7FA] p-2 rounded text-[#96003B]">
              Gini = 1 - (0.5)² - (0.5)² = 1 - 0.25 - 0.25 = 0.500
            </div>
            <p className="text-[#6D5970]">0.5 is the maximal impurity possible for a binary classification setting.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-bold text-[#059669]">For a Completely Pure Group (All Spam):</span>
            <div className="font-mono bg-[#ECFDF5] p-2 rounded text-[#059669]">
              Gini = 1 - (1.0)² - (0.0)² = 1 - 1.0 = 0.000
            </div>
            <p className="text-[#6D5970]">0.0 indicates absolute homogeneity; no further splitting is required.</p>
          </div>
        </div>

        {/* Worked Split Table */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <span className="font-bold text-sm text-[#1A1020] block">
            Worked Numerical Split (10 Emails Divided by Candidate Question):
          </span>
          <CompareTable
            headers={['Group Partition', 'Class Counts', 'Gini Impurity Calculation']}
            rows={splitTableRows}
            highlight={[2]}
          />
          <div className="p-3 rounded-xl bg-[#FFF9FC] border border-[#FFD6E5] text-xs text-[#2D1F33]">
            <strong>Impurity Reduction:</strong> Gini dropped from <code className="font-bold text-[#1A1020]">0.500</code> down
            to <code className="font-bold text-[#1A1020]">0.417</code>, yielding an impurity reduction (Information Gain)
            of <code className="font-bold text-[#FF2E7E]">0.083</code>.
            The algorithm tests every possible feature threshold and selects the split that delivers the largest impurity drop!
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowEntropy((p) => !p)}
              className="text-xs font-bold text-[#FF2E7E] hover:underline"
            >
              {showEntropy ? 'Hide Entropy alternative' : 'Show alternative criterion: Shannon Entropy'}
            </button>
            {showEntropy && (
              <div className="mt-2 p-3 bg-[#FFF7FA] rounded-xl border border-[#FFB8D2] text-xs text-[#4A3B4E] space-y-1">
                <span className="font-bold text-[#1A1020]">Information Gain via Entropy:</span>
                <MathFormula formula="\text{Entropy}(S) = -\sum_{k=1}^C p_k \log_2(p_k)" />
                <p>For a 50/50 split, Entropy = - (0.5 · (-1) + 0.5 · (-1)) = 1.0 bit. For pure nodes, Entropy = 0.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4.4 Decision Tree Lab */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 4.4 · INTERACTIVE LAB
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Interactive Decision Tree Simulator
          </h2>
        </div>

        {/* 5-Step Simulator */}
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
              <span className="font-pixel text-xs text-[#FF2E7E] font-bold">
                STEP 1 · PREDICT BEFORE ADJUSTING DEPTH
              </span>
              <p className="text-xs text-[#4A3B4E]">
                &ldquo;If I double the maximum tree depth from 1 (shallow stump) to 5 (deep tree),
                will <strong>training accuracy</strong> go up or down? What will happen to <strong>test accuracy</strong> on new noisy emails?&rdquo;
              </p>
              <input
                type="text"
                placeholder="Write your prediction here..."
                value={predictionHypothesis}
                onChange={(e) => setPredictionHypothesis(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#F0D6E2] focus:border-[#FF2E7E] focus:outline-none"
              />
              <button onClick={() => setLabStep(2)} className="btn-pink px-4 py-1.5 text-xs font-bold">
                Advance to Step 2: Test Interactive Tree →
              </button>
            </div>
          )}

          {labStep >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Path Tracer */}
              <div className="p-4 rounded-xl bg-[#FFF9FC] border border-[#F0D6E2] space-y-3 text-xs">
                <span className="font-bold text-[#1A1020] block">
                  Interactive Evaluation: Email (Links={testLinks}, Words={testWords})
                </span>

                <div className="space-y-1.5 font-mono text-[11px]">
                  {traversal.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-white border border-[#F0D6E2] flex items-center justify-between"
                    >
                      <span>
                        {st.node.question ?? `Leaf: ${st.node.label?.toUpperCase()}`}
                      </span>
                      <span className="font-bold text-[#FF2E7E]">{st.path}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-[#FFE4EF] border border-[#FFB8D2] flex items-center justify-between font-bold">
                  <span>Final Tree Output:</span>
                  <span className="text-[#FF2E7E] font-mono text-sm uppercase">
                    {traversal.prediction}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#1A1020]">Tree Complexity (Max Depth):</span>
                    <span className="font-mono font-bold text-[#FF2E7E]">{treeDepth === 1 ? '1 (Shallow)' : 'Full (Depth 3)'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTreeDepth(1)}
                      className={`flex-1 py-1.5 rounded-lg font-bold text-xs ${
                        treeDepth === 1 ? 'bg-[#FF2E7E] text-white' : 'bg-white border text-[#6D5970]'
                      }`}
                    >
                      Depth = 1 (Stump)
                    </button>
                    <button
                      onClick={() => setTreeDepth(3)}
                      className={`flex-1 py-1.5 rounded-lg font-bold text-xs ${
                        treeDepth === 3 ? 'bg-[#FF2E7E] text-white' : 'bg-white border text-[#6D5970]'
                      }`}
                    >
                      Depth = 3 (Full Tree)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#1A1020] block mb-1">Test Email Links: {testLinks}</label>
                    <input
                      type="range"
                      min={0}
                      max={7}
                      value={testLinks}
                      onChange={(e) => setTestLinks(parseInt(e.target.value, 10))}
                      className="w-full accent-[#FF2E7E]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1A1020] block mb-1">Test Email Words: {testWords}</label>
                    <input
                      type="range"
                      min={0}
                      max={7}
                      value={testWords}
                      onChange={(e) => setTestWords(parseInt(e.target.value, 10))}
                      className="w-full accent-[#FF2E7E]"
                    />
                  </div>
                </div>

                {labStep < 5 && (
                  <button
                    onClick={() => setLabStep((s) => s + 1)}
                    className="btn-pink px-4 py-1.5 text-xs font-bold"
                  >
                    Next Lab Step ({labStep + 1}) →
                  </button>
                )}
              </div>
            </div>
          )}

          {labStep === 3 && (
            <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-xs text-[#166534]">
              <strong>Step 3 (Observe):</strong> A shallow tree makes few decisions: simple, easily explained, but may underfit. An unconstrained deep tree carves isolated boxes around every training outlier.
            </div>
          )}

          {labStep === 4 && (
            <div className="p-3 bg-[#FFF7FA] border border-[#FFB8D2] rounded-xl text-xs text-[#96003B]">
              <strong>Step 4 (Explain):</strong> Because each split tests a single feature against a scalar threshold, Decision Tree boundaries are <em>axis-aligned</em> (forming right-angle staircases), unlike KNN’s curvilinear contours.
            </div>
          )}

          {labStep === 5 && (
            <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-xs text-[#1E40AF]">
              <strong>Step 5 (Apply):</strong> In high-stakes regulatory environments (like loan approvals or medical triage), trees are favored because each branch provides an auditable &ldquo;if-then&rdquo; rationale.
            </div>
          )}
        </div>

        <Callout type="tip" title="Improvement Added: Strengths and Limits of Trees">
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li><strong>Strengths:</strong> Highly interpretable; invariant to feature scaling (no standardization needed).</li>
            <li><strong>Limits:</strong> Individual deep trees are high-variance and unstable (a slight shift in training rows can dramatically change the tree structure).</li>
            <li><strong>Complexity controls:</strong> Hyperparameters like <code className="bg-white px-1 border rounded">max_depth</code> and <code className="bg-white px-1 border rounded">min_samples_leaf</code> prevent runaway memorization.</li>
          </ul>
        </Callout>

        <div className="rounded-2xl border border-[#FED7AA] bg-[#FFFBEB] p-4 text-xs text-[#92400E] space-y-1">
          <span className="font-pixel text-[9px] bg-[#FEF3C7] px-2 py-0.5 rounded text-[#D97706] font-bold">
            CHECKPOINT QUESTION
          </span>
          <p className="font-bold text-[#1A1020]">
            &ldquo;Does a Decision Tree calculate geometric distances between observations like KNN?&rdquo;
          </p>
          <p className="text-[#4A3B4E]">
            <strong>No!</strong> Decision Trees do not compute vector distances. They partition feature space using
            threshold inequalities (<code className="bg-white px-1 border rounded">feature &le; threshold</code>) based on impurity reduction.
          </p>
        </div>
      </section>

      <Quiz
        partNumber={4}
        questions={[
          {
            question: 'What does a Gini impurity of 0.0 indicate for a decision tree node?',
            options: [
              'The node is completely pure; all observations in it belong to the exact same class.',
              'The node has an even 50/50 split of classes.',
              'The tree has encountered a division by zero error.',
              'The node must be deleted.',
            ],
            correctIndex: 0,
            explanation:
              'Gini = 1 - sum(p_k^2). When all observations belong to class 1, Gini = 1 - 1.0^2 = 0.0, indicating complete purity.',
          },
          {
            question: 'Why do decision tree decision boundaries look like orthogonal staircases rather than smooth curves?',
            options: [
              'Because each split evaluates a single feature against a scalar threshold parallel to the coordinate axes.',
              'Because decision trees only operate on integer numbers.',
              'Because Gini impurity is a non-linear metric.',
              'Because decision trees use Euclidean distance.',
            ],
            correctIndex: 0,
            explanation:
              'Each decision rule tests whether one feature is <= threshold, producing perpendicular axis-aligned boundaries in feature space.',
          },
          {
            question: 'Do Decision Trees require feature standardization (z-score scaling)?',
            options: [
              'No, because monotonic splits only depend on the rank ordering of values within each individual feature.',
              'Yes, because distance between thresholds will distort the tree.',
              'Yes, otherwise Gini impurity cannot be calculated.',
              'Only when using Entropy instead of Gini.',
            ],
            correctIndex: 0,
            explanation:
              'Trees only ask whether feature x_j <= threshold. Rescaling a feature by adding or multiplying by constants does not change the ordering or relative split quality.',
          },
        ]}
      />
    </div>
  );
}
