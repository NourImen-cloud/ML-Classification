'use client';

import { useState } from 'react';
import { SectionHeader, ThoughtPrompt, Callout, KeyInsight, CompareTable } from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';
import { decisionTree, shallowTree, traverseTree, TreeNode } from '@/lib/decisionTree';

function TreeNodeViz({
  node,
  depth = 0,
  highlightPath,
}: {
  node: TreeNode;
  depth?: number;
  highlightPath?: { node: TreeNode; answer: boolean | null }[];
}) {
  const isHighlighted = highlightPath?.some(p => p.node === node);
  const isLeaf = !!node.label;

  return (
    <div className="flex flex-col items-center" style={{ minWidth: depth === 0 ? '100%' : undefined }}>
      <div
        className="rounded-xl px-3.5 py-2.5 text-center transition-all duration-200 text-xs font-semibold shadow-sm"
        style={{
          background: isHighlighted
            ? isLeaf
              ? node.label === 'spam'
                ? '#FFE4EF'
                : '#ECFDF5'
              : '#FFF0F6'
            : '#FFFFFF',
          border: `2px solid ${
            isHighlighted
              ? isLeaf
                ? node.label === 'spam'
                  ? '#FF2E7E'
                  : '#10B981'
                : '#FF2E7E'
              : '#F0D6E2'
          }`,
          color: isHighlighted
            ? isLeaf
              ? node.label === 'spam'
                ? '#96003B'
                : '#065F46'
              : '#FF2E7E'
            : '#1A1020',
          minWidth: '120px',
        }}
      >
        {isLeaf ? (
          <span className="font-bold block font-mono">
            {node.label === 'spam' ? 'PREDICT SPAM' : 'PREDICT NOT SPAM'}
          </span>
        ) : (
          <span className="block font-mono">{node.question}</span>
        )}
        {node.emails && (
          <span className="text-[10px] text-[#6D5970] font-mono block mt-0.5 opacity-80">
            [{node.emails.join(', ')}]
          </span>
        )}
      </div>

      {!isLeaf && node.left && node.right && (
        <div className="flex gap-6 mt-4 relative">
          <div className="flex flex-col items-center">
            <span className="font-pixel text-[9px] text-[#059669] mb-1 font-bold">YES (≤)</span>
            <TreeNodeViz node={node.left} depth={depth + 1} highlightPath={highlightPath} />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-pixel text-[9px] text-[#DC2626] mb-1 font-bold">NO (&gt;)</span>
            <TreeNodeViz node={node.right} depth={depth + 1} highlightPath={highlightPath} />
          </div>
        </div>
      )}
    </div>
  );
}

const giniRows = [
  { group: 'All 10 Training Emails', spam: 5, notSpam: 5, gini: '0.50' },
  { group: 'After Split "Links ≤ 3.5": Left Branch (≤ 3.5)', spam: 1, notSpam: 5, gini: '0.28' },
  { group: 'After Split "Links ≤ 3.5": Right Branch (> 3.5)', spam: 4, notSpam: 0, gini: '0.00' },
];

export default function Part4() {
  const [links, setLinks] = useState(2);
  const [words, setWords] = useState(3);
  const [showPath, setShowPath] = useState(false);
  const [useShallow, setUseShallow] = useState(false);

  const activeTree = useShallow ? shallowTree : decisionTree;
  const { steps, prediction } = traverseTree(links, words, activeTree);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={4}
        time="60–75 min"
        title="Decision Trees"
        subtitle="Hierarchical Orthogonal Splits, Impurity Reduction, and Interpretability"
      />

      {/* 4.1 Concept */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The 20 Questions Game Metaphor
          </h2>
        </div>

        <ThoughtPrompt
          question="In the game of 20 Questions, which opening query is mathematically superior: 'Is the animal a penguin?' or 'Does the animal live on land?'"
          context="The second question divides the hypothesis space roughly in half, eliminating maximum uncertainty in a single step."
        />

        <div className="p-4 rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF0F6]">
          <span className="font-pixel text-[10px] font-bold text-[#FF2E7E] uppercase block mb-1">
            ALGORITHM PRINCIPLE
          </span>
          <p className="text-sm font-semibold text-[#1A1020] leading-relaxed">
            A Decision Tree is a learned hierarchical flowchart of binary conditional tests. Training involves recursively discovering the split threshold on each feature that maximizes class purity.
          </p>
        </div>
      </section>

      {/* 4.2 Interactive Explorer */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Interactive Decision Tree Path Explorer
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseShallow(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              !useShallow
                ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#FF2E7E]'
                : 'border-[#F0D6E2] text-[#6D5970] hover:border-[#FF2E7E]'
            }`}
          >
            Full Learned Tree (Depth 3)
          </button>
          <button
            onClick={() => setUseShallow(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              useShallow
                ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#FF2E7E]'
                : 'border-[#F0D6E2] text-[#6D5970] hover:border-[#FF2E7E]'
            }`}
          >
            Pruned Shallow Tree (Depth 1)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 space-y-3">
            <div className="rounded-2xl border border-[#F0D6E2] bg-white p-4 shadow-sm space-y-3">
              <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider block">
                Input Features to Evaluate:
              </span>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-[#6D5970] block font-medium">Links: {links}</label>
                  <input type="range" min={0} max={8} value={links} onChange={e => { setLinks(+e.target.value); setShowPath(false); }} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-[#6D5970] block font-medium">Suspicious Words: {words}</label>
                  <input type="range" min={0} max={8} value={words} onChange={e => { setWords(+e.target.value); setShowPath(false); }} className="w-full" />
                </div>
              </div>
              <button
                onClick={() => setShowPath(true)}
                className="w-full btn-pink py-2 text-xs font-bold"
              >
                Trace Decision Path →
              </button>
            </div>

            {showPath && (
              <div className="rounded-2xl border border-[#FFB8D2] bg-[#FFF0F6] p-4 text-xs space-y-2">
                <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold block uppercase">
                  Traversed Decision Route:
                </span>
                <div className="space-y-1 font-mono text-[11px]">
                  {steps.map((s, idx) => (
                    <div key={idx} className="text-[#4A3B4E]">
                      {idx + 1}. {s.node.question ?? `Leaf Node [${s.node.label}]`} {s.answer !== null ? (s.answer ? '→ YES' : '→ NO') : ''}
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#FFB8D2] font-bold text-[#1A1020]">
                  Outcome: {prediction === 'spam' ? 'PREDICTED SPAM' : 'PREDICTED NOT SPAM'}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-[#F0D6E2] bg-white p-5 overflow-x-auto shadow-sm">
            <span className="text-[11px] font-mono text-[#6D5970] block mb-4">
              {useShallow ? 'Shallow Tree (Single Stump Split)' : 'Full Multi-Level Binary Decision Tree'}
            </span>
            <div className="min-w-[320px] pb-2">
              <TreeNodeViz node={activeTree} highlightPath={showPath ? steps : undefined} />
            </div>
          </div>
        </div>

        <KeyInsight>
          Compare models: KNN (K ≥ 3) predicted <strong>Not Spam</strong> for New 3 (2 links, 3 words). The full unpruned decision tree predicted <strong>Spam</strong> because it created a specialized sub-branch exclusively for noise point E10. Tree depth plays the same role as K: greater depth allows memorizing noise.
        </KeyInsight>
      </section>

      {/* 4.3 Gini Impurity */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            How Splitting Questions Are Selected: Gini Impurity
          </h2>
        </div>

        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <p className="text-xs text-[#6D5970] leading-relaxed">
            The decision tree evaluates all possible split points across all features. It selects the question that produces the maximum reduction in impurity (Gini Impurity):
          </p>
          <div className="code-block text-center text-xs">
            Gini Impurity = 1 - Σ (p_c)²
          </div>
          <p className="text-[11px] text-[#6D5970] leading-relaxed">
            Where p_c is the proportion of elements belonging to class c. A pure subset (100% spam or 100% not-spam) has Gini = 0.0. An evenly mixed 50/50 split has Gini = 0.50 (maximum impurity for binary classification).
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#F0D6E2] bg-white shadow-sm">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Data Subset</th>
                <th>Spam Count</th>
                <th>Not Spam Count</th>
                <th>Gini Impurity</th>
              </tr>
            </thead>
            <tbody>
              {giniRows.map(r => (
                <tr key={r.group}>
                  <td className="font-semibold text-xs text-[#1A1020]">{r.group}</td>
                  <td className="font-mono text-xs">{r.spam}</td>
                  <td className="font-mono text-xs">{r.notSpam}</td>
                  <td className="font-mono text-xs font-bold text-[#FF2E7E]">{r.gini}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4.4 Decision Trees vs KNN */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 04
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Algorithmic Comparison: Decision Trees versus KNN
          </h2>
        </div>

        <CompareTable
          headers={['Property', 'Decision Tree', 'K-Nearest Neighbors']}
          rows={[
            ['Decision Boundary', 'Axis-aligned orthogonal rectangles', 'Curvilinear, flexible local contours'],
            ['Training Phase', 'Active; recursive splitting calculations', 'Passive; memory storage only'],
            ['Inference Latency', 'Extremely fast (O(depth))', 'Slow for large datasets (O(N * d))'],
            ['Feature Scaling Required', 'No (unaffected by monotonic scaling)', 'Yes (strictly sensitive to scale)'],
            ['Human Interpretability', 'High (inspectable IF-THEN rules)', 'Moderate (explainable by nearest neighbors)'],
            ['Primary Vulnerability', 'Deep trees easily overfit noise', 'Small K is noisy; large K is blunt'],
          ]}
        />
      </section>

      {/* Quiz */}
      <section className="pt-4 border-t border-[#F0D6E2]">
        <Quiz
          partNumber={4}
          questions={[
            {
              question: 'Why does a decision tree algorithm select "Links ≤ 3.5" as the root question in our spam dataset?',
              options: [
                'Because "Links" happens to be the first column in the CSV file',
                'Because 3.5 is the smallest threshold tested',
                'Because that specific split yields the largest drop in weighted Gini impurity',
                'Split selections are determined randomly at runtime',
              ],
              correctIndex: 2,
              explanation: 'Decision tree induction algorithms (such as CART) greedily search for the split that maximizes information gain or impurity reduction. "Links ≤ 3.5" reduces average impurity from 0.50 down to 0.17.',
            },
            {
              question: 'What is the primary risk of letting a decision tree grow without depth limits until every training instance is 100% correctly classified?',
              options: [
                'The model will forget its earlier rules',
                'The tree will severely overfit by creating isolated leaf nodes for noise points',
                'Feature scaling will corrupt the splits',
                'Training accuracy will drop to zero',
              ],
              correctIndex: 1,
              explanation: 'Unconstrained trees branch recursively until every single training point (including noise and outliers like E10) receives its own dedicated leaf. This memorizes training noise and fails on unseen test data.',
            },
          ]}
        />
      </section>
    </div>
  );
}
