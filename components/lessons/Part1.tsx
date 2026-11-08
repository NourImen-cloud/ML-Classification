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
import { module1Emails } from '@/lib/data';

const notationRows = [
  ['n', 'Number of observations (rows in the dataset)'],
  ['x_i', 'Features describing observation i (vector of attributes)'],
  ['y_i', 'The actual ground-truth label of observation i'],
  ['f', 'The classifier, i.e. the function or model we want to learn'],
  ['ŷ ("y-hat")', 'The predicted label produced by f(x_i); it can differ from y_i'],
];

const settingRows = [
  ['Binary', 'Exactly two mutually exclusive classes', 'Spam / Not Spam, Defective / Intact'],
  [
    'Multiclass',
    'More than two classes; mutually exclusive (exactly one applies)',
    'Email folders: Work / Personal / Promotions / Social',
  ],
  [
    'Multilabel',
    'Several labels can simultaneously apply to the same observation',
    'A photo tagged [Cat, Outdoor, Person]',
  ],
];

const classVsRegRows = [
  ['Predicted Output', 'Discrete categories or classes', 'Continuous numerical quantities'],
  ['Spam Filter Example', 'Spam / Not Spam', 'Estimated probability score before thresholding'],
  ['Academic Assessment', 'Pass / Fail', 'Final Exam Score (0–100)'],
  ['Weather Forecasting', 'Rain / Sunny / Snow', 'Tomorrow’s exact temperature (23.4°C)'],
  ['Real Estate Task', 'Investment Tier: Prime / Normal / Risky', 'Predicted house sale price ($450,000)'],
];

export default function Part1() {
  const [showDiscussionAnswers, setShowDiscussionAnswers] = useState(false);
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C' | 'D'>('A');

  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<number, string | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const checkpointItems = [
    { id: 1, task: 'Predict whether a credit card transaction is fraudulent', correct: 'classification', options: ['classification', 'regression'] },
    { id: 2, task: 'Predict the selling price of a residential house', correct: 'regression', options: ['classification', 'regression'] },
    { id: 3, task: 'Identify the species of a flower from petal measurements', correct: 'classification', options: ['classification', 'regression'] },
    { id: 4, task: 'Predict tomorrow’s temperature in degrees Celsius', correct: 'regression', options: ['classification', 'regression'] },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={1}
        time="Session 1 · 0–8 min"
        title="Discovering Classification"
        subtitle="From First Intuition to Formal Supervised Formulation"
      />

      {/* 1.1 Start with a problem, not a definition */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-2">
          <div>
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block">
              SECTION 1.1
            </span>
            <h2 className="text-xl font-extrabold text-[#1A1020]">
              Start with a Problem, Not a Definition
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            What to say
          </span>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Imagine you work on an email application. Every day users receive hundreds of messages.
          Some are legitimate; others are spam. Your application must automatically decide which
          messages go to the inbox and which go to the spam folder. Here are four messages:
        </p>

        {/* 4-Email Interactive Preview Table */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#F0D6E2]">
            {module1Emails.map((email) => (
              <button
                key={email.id}
                onClick={() => setActiveTab(email.id as 'A' | 'B' | 'C' | 'D')}
                className={`p-4 text-left transition-all ${
                  activeTab === email.id ? 'bg-[#FFF7FA]' : 'hover:bg-[#FFFDFE]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-pixel text-xs font-bold text-[#1A1020]">
                    Email {email.id}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      email.category === 'Spam'
                        ? 'bg-[#FFE4EF] text-[#FF2E7E] border border-[#FFB8D2]'
                        : 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                    }`}
                  >
                    {email.category}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#1A1020] truncate mb-1">
                  &ldquo;{email.subject}&rdquo;
                </div>
                <p className="text-[11px] text-[#6D5970] line-clamp-2 leading-relaxed">
                  {email.body}
                </p>
              </button>
            ))}
          </div>

          <div className="p-4 bg-[#FFF9FC] border-t border-[#F0D6E2] flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1A1020]">
              Inspecting Email {activeTab}:
            </span>
            <span className="text-[#6D5970] italic">
              {module1Emails.find((e) => e.id === activeTab)?.body}
            </span>
          </div>
        </div>

        {/* Ask the Students Interactive Box */}
        <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white font-bold">
              ASK THE STUDENTS
            </span>
            <h3 className="font-bold text-sm text-[#1A1020]">
              Discussion Questions (1–2 minutes in chat or small groups)
            </h3>
          </div>
          <ul className="text-sm text-[#2D1F33] space-y-1.5 list-disc list-inside">
            <li>How did you distinguish spam from legitimate emails?</li>
            <li>Which characteristics did you pay attention to?</li>
            <li>Could we teach a computer to make the same decision?</li>
            <li>What would the computer need to learn?</li>
          </ul>

          <div className="pt-2">
            <button
              onClick={() => setShowDiscussionAnswers((prev) => !prev)}
              className="btn-pink px-4 py-1.5 text-xs font-bold inline-flex items-center gap-1.5"
            >
              <span>{showDiscussionAnswers ? 'Hide Instructor Guide' : 'Show What to Collect on the Board'}</span>
            </button>
          </div>

          {showDiscussionAnswers && (
            <div className="mt-3 p-4 rounded-xl bg-white border border-[#FFB8D2] text-xs text-[#4A3B4E] leading-relaxed space-y-2 animate-fadeIn">
              <p className="font-bold text-[#FF2E7E]">Instructor board synthesis:</p>
              <p>
                Collect students’ raw observations on the board: exclamation marks, hyperlink counts,
                urgent wording (&ldquo;Claim your reward now!&rdquo;), and unfamiliar senders. Explain:
                <strong> &ldquo;These characteristics are what machine learning formally calls features.&rdquo;</strong>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 1.2 Introduce the concept */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 1.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Introduce the Concept: Formal Machine Learning Definition
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          <strong>Classification</strong> is a supervised machine-learning task in which we predict
          the category, or <strong>class</strong>, to which an observation belongs:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-pixel text-[9px] text-[#FF2E7E] font-bold">01 · OBSERVATION</span>
            <p className="text-xs font-semibold text-[#1A1020]">An incoming email or query</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-pixel text-[9px] text-[#FF2E7E] font-bold">02 · POSSIBLE CLASSES</span>
            <p className="text-xs font-semibold text-[#1A1020]">Distinct set: &#123;Spam, Not Spam&#125;</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#F0D6E2] space-y-1">
            <span className="font-pixel text-[9px] text-[#FF2E7E] font-bold">03 · MODEL OBJECTIVE</span>
            <p className="text-xs font-semibold text-[#1A1020]">Assign each observation to a class</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold uppercase tracking-wider block">
            Mathematical Formulation
          </span>
          <p className="text-xs text-[#4A3B4E] leading-relaxed">
            Formally, we are given a labeled dataset <code className="bg-[#FFF0F6] px-1.5 py-0.5 rounded text-[#96003B]">D</code> and want to learn a mapping function <code className="bg-[#FFF0F6] px-1.5 py-0.5 rounded text-[#96003B]">f</code>:
          </p>
          <MathFormula formula="D = \{(x_1, y_1), (x_2, y_2), \dots, (x_n, y_n)\} \quad \implies \quad f : X \to Y, \quad \hat{y} = f(x)" />
        </div>

        {/* Notation Table */}
        <div>
          <h3 className="font-bold text-sm text-[#1A1020] mb-2">Mathematical Notation Reference</h3>
          <CompareTable headers={['Symbol', 'Formal Meaning']} rows={notationRows} />
        </div>

        {/* Common Misconception */}
        <Callout type="danger" title="Common Misconception: True Label y vs Predicted Label ŷ">
          The actual label <code className="bg-white px-1.5 py-0.5 rounded text-[#DC2626]">y</code> and the
          predicted label <code className="bg-white px-1.5 py-0.5 rounded text-[#DC2626]">ŷ</code> are not
          necessarily equal! A model can make systematic or accidental mistakes. Measuring, decomposing,
          and controlling those mistakes is the central focus of classification evaluation (Modules 6–9).
        </Callout>
      </section>

      {/* 1.3 Binary, multiclass and multilabel classification */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 1.3
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Binary, Multiclass, and Multilabel Classification
          </h2>
        </div>

        <CompareTable
          headers={['Setting', 'Definition', 'Concrete Example']}
          rows={settingRows}
          highlight={[0]}
        />

        <Callout type="info" title="Teacher Note: Multiclass vs. Multilabel">
          Ensure students do not confuse multiclass with multilabel. Ask them the quick rule of thumb:
          <strong> &ldquo;Can a single observation belong to two classes simultaneously?&rdquo;</strong> If yes, it is
          multilabel. If classes are strictly mutually exclusive, it is multiclass.
        </Callout>
      </section>

      {/* 1.4 Classification versus regression */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 1.4
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Classification versus Regression
          </h2>
        </div>

        <CompareTable
          headers={['Dimension', 'Classification', 'Regression']}
          rows={classVsRegRows}
        />

        <div className="rounded-2xl border border-[#FED7AA] bg-[#FFFBEB] p-4 text-xs text-[#92400E] space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[9px] bg-[#FEF3C7] px-2 py-0.5 rounded text-[#D97706] font-bold">
              ASK THE STUDENTS
            </span>
            <span className="font-bold">Rapid Verification Check:</span>
          </div>
          <p>
            &bull; Predicting whether a student will <strong>Pass or Fail</strong> an exam: <em>Classification</em>.
            <br />
            &bull; Predicting the student’s exact numeric <strong>exam score (e.g. 84.5%)</strong>: <em>Regression</em>.
          </p>
        </div>

        {/* Checkpoint Interactive Activity */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
                ACTIVITY CHECKPOINT
              </span>
              <h3 className="font-bold text-sm text-[#1A1020]">Classify Each Task</h3>
            </div>
            <span className="text-xs font-mono text-[#6D5970]">4 Tasks</span>
          </div>

          <div className="space-y-2.5">
            {checkpointItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-[#F0D6E2] bg-[#FFFDFE] gap-2"
              >
                <span className="text-xs font-medium text-[#1A1020]">
                  ({item.id}) {item.task}
                </span>
                <div className="flex items-center gap-2">
                  {item.options.map((opt) => {
                    const isSelected = checkpointAnswers[item.id] === opt;
                    const isCorrect = opt === item.correct;
                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setCheckpointAnswers((prev) => ({ ...prev, [item.id]: opt }))
                        }
                        className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                          isSelected
                            ? isCorrect
                              ? 'bg-[#10B981] text-white'
                              : 'bg-[#EF4444] text-white'
                            : 'bg-white border border-[#F0D6E2] text-[#4A3B4E] hover:border-[#FF2E7E]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Added Callout */}
        <Callout type="tip" title="Improvement Added: The Naming Trap">
          Warn students early about the naming trap: <strong>&ldquo;Logistic Regression&rdquo; is a classification algorithm</strong>!
          The name is historical: it internally regresses a continuous probability in (0, 1), then applies a threshold
          to convert that probability into a categorical class.
        </Callout>
      </section>

      {/* Module 1 Checkpoint Quiz */}
      <Quiz
        partNumber={1}
        questions={[
          {
            question: 'What is the fundamental difference between classification and regression?',
            options: [
              'Classification predicts discrete class labels, whereas regression predicts continuous numeric values.',
              'Classification is unsupervised learning, whereas regression is supervised.',
              'Classification requires neural networks, whereas regression only uses straight lines.',
              'Classification cannot handle tabular data.',
            ],
            correctIndex: 0,
            explanation:
              'Classification outputs qualitative/categorical classes (e.g. Spam / Not Spam), whereas regression outputs quantitative numerical predictions (e.g. house price or temperature).',
          },
          {
            question: 'Why can the true label y and predicted label ŷ differ for an observation?',
            options: [
              'Because classifiers are imperfect and learn statistical approximations that can make errors.',
              'Because y is a feature and ŷ is an ID.',
              'Because supervised learning does not use ground-truth labels during training.',
              'Because ŷ is computed before training starts.',
            ],
            correctIndex: 0,
            explanation:
              'ŷ represents the model’s prediction f(x). Models generalize from limited data and noise, meaning predictions can be erroneous (False Positives or False Negatives).',
          },
          {
            question: 'A photo can be labeled both "Cat" and "Outdoor" simultaneously. Which classification setting is this?',
            options: [
              'Multilabel classification',
              'Binary classification',
              'Multiclass classification',
              'Linear regression',
            ],
            correctIndex: 0,
            explanation:
              'When multiple non-mutually-exclusive labels can simultaneously apply to a single observation, it is a multilabel classification problem.',
          },
        ]}
      />
    </div>
  );
}
