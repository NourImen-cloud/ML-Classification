'use client';

import { useState } from 'react';
import { SectionHeader, ThoughtPrompt, CompareTable, ConceptCard, Callout, KeyInsight } from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';

const mlComparisonRows = [
  ['Inputs provided', 'Data + Explicit Rules', 'Data + Ground-Truth Answers'],
  ['Computed output', 'Answers', 'Learned Model (Logic / Rules)'],
  ['Origin of logic', 'Handwritten by programmer', 'Inferred by algorithm from patterns'],
  ['When patterns shift', 'Manual code modifications required', 'Retrain model on refreshed dataset'],
  ['Optimal use case', 'Stable, exact, deterministic logic', 'Fuzzy, evolving, complex patterns'],
];

const useCaseRows = [
  ['Convert Celsius to Fahrenheit', 'Deterministic Rule', 'Single exact mathematical formula: F = (C * 9/5) + 32'],
  ['Calculate sales tax on invoice', 'Deterministic Rule', 'Strict legal formulas; error tolerance is zero'],
  ['Detect objects in photos', 'Machine Learning', 'Impossible to define rules for complex raw pixel arrays'],
  ['Filter spam emails', 'Machine Learning', 'Content patterns shift constantly as spammers adapt'],
  ['Sort an array of integers', 'Deterministic Rule', 'Proven, mathematically optimal sorting algorithms exist'],
];

export default function Part1() {
  const [selectedRuleQuestion, setSelectedRuleQuestion] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [ruleInput, setRuleInput] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={1}
        time="0–15 min"
        title="Introduction to Machine Learning"
        subtitle="Traditional Programming versus Machine Learning"
      />

      {/* 1.1 The Challenge of Writing Rules Manually */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Fragility of Handcrafted Rules
          </h2>
        </div>

        <ThoughtPrompt
          question="Consider detecting spam emails manually: If you had to write 3 deterministic rules to catch every spam message, what would they be?"
          context="Think of keywords, links, or sender patterns — and consider edge cases where legitimate emails get falsely blocked."
        />

        {/* Interactive Rule Tester */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <label className="text-sm font-bold text-[#1A1020] block">
            Test a custom spam detection rule:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={ruleInput}
              onChange={e => setRuleInput(e.target.value)}
              placeholder='e.g., if message contains "free" or has > 5 links'
              className="flex-1 bg-[#FFF9FC] border border-[#F0D6E2] rounded-xl px-4 py-2.5 text-sm text-[#1A1020] placeholder-[#B399A6] focus:outline-none focus:border-[#FF2E7E]"
            />
            <button
              onClick={() => setHasEvaluated(true)}
              className="btn-pink px-5 py-2.5 text-xs font-bold whitespace-nowrap"
            >
              Analyze Rule Vulnerabilities
            </button>
          </div>

          {(hasEvaluated || !ruleInput) && (
            <div className="pt-3 border-t border-[#F7EAF0] space-y-2.5">
              <span className="text-xs font-bold text-[#1A1020] block">
                Why standard handcrafted rules fail in practice:
              </span>
              {[
                {
                  rule: 'Flag emails containing the keyword "free"',
                  flaw1: 'False Positive: Legitimate store receipts ("Free shipping confirmation") get blocked.',
                  flaw2: 'False Negative: Spammers easily bypass filters using obfuscations ("fr33", "F.R.E.E").',
                },
                {
                  rule: 'Flag emails with more than 3 hyperlinks',
                  flaw1: 'False Positive: Routine newsletters and digests frequently contain dozens of legitimate links.',
                  flaw2: 'False Negative: Targeted spear-phishing emails frequently use only a single malicious link.',
                },
                {
                  rule: 'Block emails from unknown senders',
                  flaw1: 'False Positive: First-time authentic contacts and password resets get rejected.',
                  flaw2: 'False Negative: Spammers routinely spoof trusted sender header addresses.',
                },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-[#FED7AA] bg-[#FFFBEB] text-xs space-y-1">
                  <p className="font-bold text-[#9A3412]">Rule: {item.rule}</p>
                  <p className="text-[#78350F] pl-2">• {item.flaw1}</p>
                  <p className="text-[#78350F] pl-2">• {item.flaw2}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thought experiment on rule scale */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <p className="font-bold text-sm text-[#1A1020]">
            How many manual rules would an email client need to maintain 95% accuracy over time?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['10 rules', '100 rules', '1,000 rules', 'Impossible to count'].map(opt => (
              <button
                key={opt}
                onClick={() => {
                  setSelectedRuleQuestion(opt);
                  setShowAnswer(true);
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  selectedRuleQuestion === opt
                    ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#FF2E7E]'
                    : 'border-[#F0D6E2] text-[#6D5970] hover:border-[#FF2E7E]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {showAnswer && (
            <div className="p-3.5 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] text-xs text-[#065F46] leading-relaxed">
              <strong>The Reality:</strong> It is effectively impossible to maintain a fixed set of rules. As language changes and spammers adapt, the rule count grows endlessly, rules conflict with one another, and maintenance costs compound exponentially. This fundamental limitation is the motivation for Machine Learning.
            </div>
          )}
        </div>
      </section>

      {/* 1.2 Traditional Programming vs Machine Learning */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Machine Learning Paradigm Shift
          </h2>
        </div>

        {/* Diagram comparing Traditional vs ML */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 space-y-3 shadow-sm">
            <span className="font-pixel text-[10px] px-2 py-0.5 rounded bg-[#FFF0F6] text-[#FF2E7E] font-bold">
              TRADITIONAL PROGRAMMING
            </span>
            <div className="space-y-2 pt-1 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-[#FFF9FC] border border-[#F0D6E2]">
                <span className="text-[#6D5970] block text-[10px] uppercase">Inputs:</span>
                <span className="font-bold text-[#1A1020]">Data + Handwritten Rules</span>
              </div>
              <div className="text-center text-[#FF2E7E] font-bold">↓ Execution</div>
              <div className="p-2.5 rounded-lg bg-[#FFE4EF] border border-[#FFB8D2]">
                <span className="text-[#6D5970] block text-[10px] uppercase">Output:</span>
                <span className="font-bold text-[#FF2E7E]">Answers / Output</span>
              </div>
            </div>
            <p className="text-xs text-[#6D5970] leading-relaxed">
              The human developer provides all logic upfront. The computer simply executes instructions deterministically.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 space-y-3 shadow-sm">
            <span className="font-pixel text-[10px] px-2 py-0.5 rounded bg-[#FF2E7E] text-white font-bold">
              MACHINE LEARNING
            </span>
            <div className="space-y-2 pt-1 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-[#F0D6E2]">
                <span className="text-[#6D5970] block text-[10px] uppercase">Inputs:</span>
                <span className="font-bold text-[#1A1020]">Data + Ground-Truth Labels</span>
              </div>
              <div className="text-center text-[#FF2E7E] font-bold">↓ Training</div>
              <div className="p-2.5 rounded-lg bg-[#FF2E7E] text-white">
                <span className="text-[#FFE4EF] block text-[10px] uppercase">Output:</span>
                <span className="font-bold">Learned Rules (Model)</span>
              </div>
            </div>
            <p className="text-xs text-[#6D5970] leading-relaxed">
              The algorithm discovers the underlying rules and boundaries directly from historical examples.
            </p>
          </div>
        </div>

        <CompareTable
          headers={['Dimension', 'Traditional Programming', 'Machine Learning']}
          rows={mlComparisonRows}
        />

        <div className="p-4 rounded-2xl border border-[#FFB8D2] bg-[#FFF0F6]">
          <span className="font-pixel text-[10px] font-bold text-[#FF2E7E] uppercase block mb-1">
            CORE DEFINITION
          </span>
          <p className="text-sm font-semibold text-[#1A1020] leading-relaxed">
            Machine Learning is the practice of developing programs that infer their own internal rules and parameters from data, rather than requiring an engineer to specify every logical condition manually.
          </p>
        </div>

        <KeyInsight>
          In machine learning, rules are not authored by you. They are the mathematical output of the training optimization process.
        </KeyInsight>
      </section>

      {/* 1.3 When to Choose Machine Learning */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            When is Machine Learning the Right Choice?
          </h2>
        </div>

        <Callout type="tip" title="Architectural Decision Framework">
          Apply Machine Learning when rules are <strong>too numerous to codify</strong>, <strong>impossible to formalize in closed form</strong>, or <strong>shift dynamically over time</strong>. Avoid ML when deterministic rules or exact mathematical formulas already exist.
        </Callout>

        <CompareTable
          headers={['Problem Statement', 'Appropriate Approach', 'Technical Rationale']}
          rows={useCaseRows}
        />
      </section>

      {/* 1.4 The Three ML Paradigms */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 04
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Three Paradigms of Machine Learning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: 'Supervised Learning',
              badge: 'OUR FOCUS',
              desc: 'Learning mapping functions from features to known ground-truth target labels. Classification lives here.',
              highlight: true,
            },
            {
              title: 'Unsupervised Learning',
              badge: 'CLUSTERING',
              desc: 'Discovering latent patterns and grouping data without pre-existing target labels or supervisor feedback.',
              highlight: false,
            },
            {
              title: 'Reinforcement Learning',
              badge: 'AGENT & REWARD',
              desc: 'Optimizing sequential decision-making policies through trial, error, and cumulative feedback signals.',
              highlight: false,
            },
          ].map(p => (
            <div
              key={p.title}
              className={`p-4 rounded-2xl border transition-all ${
                p.highlight
                  ? 'border-2 border-[#FF2E7E] bg-[#FFF7FA] shadow-sm'
                  : 'border-[#F0D6E2] bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[9px] px-2 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
                  {p.badge}
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#1A1020] mb-1">{p.title}</h4>
              <p className="text-xs text-[#6D5970] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="pt-4 border-t border-[#F0D6E2]">
        <Quiz
          partNumber={1}
          questions={[
            {
              question: 'Which of the following problems is best addressed with Machine Learning?',
              options: [
                'Converting Celsius temperatures to Fahrenheit',
                'Sorting an array of arbitrary numbers',
                'Determining whether an uploaded image contains a cat',
                'Calculating invoice value-added tax according to statutory rates',
              ],
              correctIndex: 2,
              explanation: 'Options A, B, and D have exact, mathematically defined algorithms where a deterministic program is faster, cheaper, and provably 100% correct. Recognizing visual patterns like a "cat" across raw pixel arrays cannot be specified in simple conditional code.',
              wrongExplanations: {
                0: 'Celsius conversion is an exact formula. A simple equation is always exact.',
                1: 'Sorting algorithms (MergeSort, QuickSort) are proven and optimal.',
                3: 'Tax law specifies exact mathematical brackets suitable for traditional software.',
              },
            },
            {
              question: 'In Machine Learning, what are the primary inputs provided during model training, and what is the output?',
              options: [
                'Data and rules are input; answers are output',
                'Data and correct target labels are input; a learned model (rules) is output',
                'Rules and labels are input; data is generated',
                'Only unlabelled data is input; classification labels are output',
              ],
              correctIndex: 1,
              explanation: 'Supervised Machine Learning takes training examples (features) alongside their ground-truth labels and outputs an optimized model that encapsulates the learned logic.',
              wrongExplanations: {
                0: 'This describes traditional deterministic programming.',
                3: 'This describes unsupervised learning where ground-truth labels are absent.',
              },
            },
            {
              question: 'When an email spam pattern changes over time, what is the primary structural advantage of a Machine Learning classifier?',
              options: [
                'It executes with zero computational latency',
                'It is mathematically guaranteed to never make an error',
                'It can be retrained on fresh representative examples without manual rule re-engineering',
                'It operates completely independently of historical training data',
              ],
              correctIndex: 2,
              explanation: 'The fundamental strength of ML is adaptability. When real-world patterns evolve, collecting new examples and retraining updates the decision boundary automatically.',
              wrongExplanations: {
                1: 'All statistical classifiers carry some probability of error.',
                3: 'Machine learning models rely entirely on training data to generalize.',
              },
            },
          ]}
        />
      </section>
    </div>
  );
}
