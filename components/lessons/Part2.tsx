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
import { module2Emails } from '@/lib/data';

const workflowSteps = [
  ['1. Define the problem', 'What exactly are we predicting? What are the classes?'],
  ['2. Collect and label data', 'Is the data representative of real-world inputs? Who labeled it?'],
  ['3. Explore and prepare', 'Are there missing values, duplicates, outliers, or mislabeled rows?'],
  ['4. Select and represent features', 'Does each feature carry predictive signal about the target? Convert text/cats to numbers.'],
  ['5. Split the data', 'Partition into training (70%), validation (15%), and test (15%) sets.'],
  ['6. Train a classifier', 'Which algorithm to select (KNN, Tree, Logistic Regression)? Which hyperparameters?'],
  ['7. Evaluate', 'Which metric matches the real-world cost of mistakes? Compute Confusion Matrix.'],
  ['8. Improve if necessary', 'Collect more data, engineer better features, or tune hyperparameters.'],
  ['9. Predict new observations', 'Deploy model into production and monitor for distribution drift.'],
];

const identifyDataTasks = [
  {
    problem: 'Flower identification',
    features: 'Petal length, petal width, sepal length, sepal width',
    target: 'Flower species (e.g. Setosa, Versicolor, Virginica)',
  },
  {
    problem: 'Spam email detection',
    features: 'Hyperlink count, suspicious keywords, exclamation marks, sender reputation',
    target: 'Spam status (Spam vs. Not Spam)',
  },
  {
    problem: 'Student course performance',
    features: 'Lecture attendance rate, hours of weekly study, homework completion rate',
    target: 'Course outcome (Pass vs. Fail)',
  },
];

export default function Part2() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>('B');
  const [showOneHotDemo, setShowOneHotDemo] = useState(false);
  const [revealedTasks, setRevealedTasks] = useState<Record<number, boolean>>({});

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={2}
        time="Session 1 · 8–18 min"
        title="Understanding the Data"
        subtitle="Features, Labels, Supervised Learning & the 9-Step ML Workflow"
      />

      <Callout type="info" title="Teacher Note: The Foundation of Classification">
        This module is extremely important. If students do not clearly understand features, labels,
        and the distinction between training and prediction, the algorithms will feel like arbitrary,
        unrelated mathematical tricks.
      </Callout>

      {/* 2.1 What does a dataset look like? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 2.1
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            What Does a Dataset Look Like?
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          A machine learning model does not read an email the way a human does. We must represent each
          observation with structured, quantitative measurements the algorithm can process.
        </p>

        {/* 6-Email Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border-2 border-[#FFD6E5] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-[#FFE4EF] border-b-2 border-[#FFB8D2] text-[#96003B] font-mono text-xs uppercase">
                <th className="py-3 px-3">Email ID</th>
                <th className="py-3 px-3">Contains Link (x₁)</th>
                <th className="py-3 px-3">Suspicious Words (x₂)</th>
                <th className="py-3 px-3">Exclamation Marks (x₃)</th>
                <th className="py-3 px-3">Class (y)</th>
                <th className="py-3 px-3 font-bold">Encoded y</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7EAF0]">
              {module2Emails.map((email) => (
                <tr
                  key={email.id}
                  onClick={() => setSelectedEmail(email.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedEmail === email.id ? 'bg-[#FFE4EF]/60 font-semibold' : 'hover:bg-[#FFF7FA]'
                  }`}
                >
                  <td className="py-3 px-3 font-bold font-mono text-[#1A1020]">
                    Email {email.id}
                    <span className="block text-[10px] text-[#6D5970] font-normal">Identifier (ID)</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#2D1F33]">{email.containsLink}</td>
                  <td className="py-3 px-3 font-mono text-[#2D1F33]">{email.suspiciousWords}</td>
                  <td className="py-3 px-3 font-mono text-[#2D1F33]">{email.exclamationMarks}</td>
                  <td className="py-3 px-3 font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                        email.label === 'Spam'
                          ? 'bg-[#FFE4EF] text-[#FF2E7E] border border-[#FFB8D2]'
                          : 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                      }`}
                    >
                      {email.label}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-[#1A1020]">{email.encoded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-[#F0D6E2] bg-white">
            <span className="font-bold text-[#1A1020] block mb-1">Email ID</span>
            <p className="text-[#6D5970]">
              Identifies the observation. It is an index/ID, <strong>not a feature</strong>. A model should never use IDs to predict!
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-[#F0D6E2] bg-white">
            <span className="font-bold text-[#1A1020] block mb-1">Features (x₁, x₂, x₃)</span>
            <p className="text-[#6D5970]">
              Measurable attributes: presence of links, count of spam keywords, exclamation frequency.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-[#F0D6E2] bg-white">
            <span className="font-bold text-[#1A1020] block mb-1">Class Label (y)</span>
            <p className="text-[#6D5970]">
              The target ground truth we want the algorithm to learn to predict: Spam (1) or Not Spam (0).
            </p>
          </div>
        </div>
      </section>

      {/* 2.2 Features versus labels */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 2.2
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Features versus Labels: Matrix Form
          </h2>
        </div>

        <p className="text-sm text-[#4A3B4E] leading-relaxed">
          Mathematically, our six emails form an <code className="bg-[#FFF0F6] px-1.5 py-0.5 rounded text-[#96003B]">n × d</code> feature
          matrix <code className="bg-[#FFF0F6] px-1.5 py-0.5 rounded text-[#96003B]">X</code> (with 6 rows and 3 columns)
          and a target column vector <code className="bg-[#FFF0F6] px-1.5 py-0.5 rounded text-[#96003B]">y</code>:
        </p>

        <MathFormula formula="X \in \mathbb{R}^{6 \times 3} = \begin{bmatrix} 0 & 0 & 0 \\ 1 & 1 & 3 \\ 0 & 0 & 1 \\ 1 & 2 & 4 \\ 0 & 1 & 0 \\ 1 & 3 & 5 \end{bmatrix}, \qquad y = \begin{bmatrix} 0 \\ 1 \\ 0 \\ 1 \\ 0 \\ 1 \end{bmatrix}" />

        <Callout type="info" title="Teacher Note: Binary Encoding Convention">
          Not Spam = 0 and Spam = 1 is an encoding convention. The computer does not inherently know
          that &ldquo;1&rdquo; means spam or something undesirable; it only sees numeric indices.
        </Callout>

        {/* Improvement Added: One-hot encoding */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] text-[#059669] font-bold px-2 py-0.5 rounded bg-[#DCFCE7] border border-[#A7F3D0]">
              IMPROVEMENT ADDED · CATEGORICAL FEATURES
            </span>
            <button
              onClick={() => setShowOneHotDemo((p) => !p)}
              className="text-xs font-bold text-[#FF2E7E] hover:underline"
            >
              {showOneHotDemo ? 'Hide encoding demo' : 'Show One-Hot Encoding example'}
            </button>
          </div>
          <p className="text-xs text-[#4A3B4E] leading-relaxed">
            Features can be numerical or categorical. For example, <em>Sender Reputation</em> might be
            categorized as <code className="bg-[#FFF0F6] px-1 rounded">&ldquo;known&rdquo;</code> or{' '}
            <code className="bg-[#FFF0F6] px-1 rounded">&ldquo;unknown&rdquo;</code>. Algorithms require numerical
            matrices, so categories must be transformed (e.g. One-Hot Encoding: known = [1, 0], unknown = [0, 1]).
          </p>

          {showOneHotDemo && (
            <div className="p-3 bg-[#FFF7FA] rounded-xl border border-[#FFD6E5] text-xs font-mono space-y-1">
              <div>Sender = &quot;known&quot;   → [sender_known: 1, sender_unknown: 0]</div>
              <div>Sender = &quot;unknown&quot; → [sender_known: 0, sender_unknown: 1]</div>
            </div>
          )}
        </div>
      </section>

      {/* 2.3 What is supervised learning? */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 2.3
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            What is Supervised Learning?
          </h2>
        </div>

        <ThoughtPrompt
          question="How do humans learn to recognize cats?"
          context="You show a child many labeled pictures: 'This is a cat', 'This is a dog'. The child notices whiskers, ear shape, and tail patterns. Later, shown an unlabelled animal, the child accurately predicts 'Cat!'."
        />

        <div className="overflow-x-auto rounded-2xl border-2 border-[#FFD6E5] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-[#FFE4EF] border-b-2 border-[#FFB8D2] text-[#96003B] font-mono text-xs uppercase">
                <th className="py-3 px-4">Step</th>
                <th className="py-3 px-4">What Happens Under the Hood</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7EAF0]">
              <tr>
                <td className="py-3 px-4 font-bold text-[#1A1020]">1. Labeled training data</td>
                <td className="py-3 px-4 text-[#4A3B4E]">Features X + known ground-truth labels y provided together</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#1A1020]">2. Learning algorithm</td>
                <td className="py-3 px-4 text-[#4A3B4E]">Discovers underlying mathematical relationships and boundaries</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#1A1020]">3. Trained classifier</td>
                <td className="py-3 px-4 text-[#4A3B4E]">Produces learned model function f(x)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#1A1020]">4. New observation</td>
                <td className="py-3 px-4 text-[#4A3B4E]">Features measured on unseen incoming email; true label is unknown</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#1A1020]">5. Prediction</td>
                <td className="py-3 px-4 text-[#4A3B4E]">Trained model outputs ŷ: Spam or Not Spam</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip" title="Improvement Added: Contrast with Unsupervised Learning">
          In <strong>unsupervised learning</strong> (such as clustering or anomaly detection), the algorithm
          receives no ground-truth labels at all and must independently discover latent structure.
          In <strong>supervised learning</strong>, the presence of verified labels guides the optimization.
        </Callout>
      </section>

      {/* 2.4 Training versus prediction */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 2.4
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Training versus Prediction (Inference)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-[#F0D6E2] bg-white p-5 space-y-2">
            <span className="font-pixel text-xs font-bold text-[#FF2E7E] px-2 py-0.5 rounded bg-[#FFE4EF]">
              PHASE 1 · TRAINING
            </span>
            <h3 className="font-bold text-base text-[#1A1020]">Model Estimation</h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              The algorithm ingests historical training examples (e.g. 10,000 emails with confirmed Spam / Not Spam tags)
              to fit parameters, compute distances, or construct decision rules.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#F0D6E2] bg-white p-5 space-y-2">
            <span className="font-pixel text-xs font-bold text-[#10B981] px-2 py-0.5 rounded bg-[#ECFDF5]">
              PHASE 2 · PREDICTION (INFERENCE)
            </span>
            <h3 className="font-bold text-base text-[#1A1020]">Real-World Deployment</h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              A brand-new email arrives at 9:02 AM. Its features (links, keywords) are extracted in milliseconds.
              The trained classifier f outputs ŷ = Spam without ever having seen this email before.
            </p>
          </div>
        </div>
      </section>

      {/* 2.5 The complete classification workflow */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 2.5
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The Complete 9-Step Classification Workflow
          </h2>
        </div>

        <CompareTable
          headers={['# Step in Pipeline', 'Key Question Addressed']}
          rows={workflowSteps}
          highlight={[4, 5, 6]}
        />

        {/* Activity: Identify the Data */}
        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
              ACTIVITY · IDENTIFY THE DATA
            </span>
            <span className="text-xs text-[#6D5970]">For each problem, name features &amp; target</span>
          </div>

          <div className="space-y-3">
            {identifyDataTasks.map((t, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-[#F0D6E2] bg-[#FFFDFE] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1020]">{t.problem}</span>
                  <button
                    onClick={() =>
                      setRevealedTasks((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className="text-xs font-bold text-[#FF2E7E] hover:underline"
                  >
                    {revealedTasks[idx] ? 'Hide Answer' : 'Reveal Features & Target'}
                  </button>
                </div>

                {revealedTasks[idx] && (
                  <div className="text-xs grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#F0D6E2]">
                    <div>
                      <span className="text-[#6D5970] font-semibold block">Possible Features (X):</span>
                      <span className="text-[#1A1020] font-medium">{t.features}</span>
                    </div>
                    <div>
                      <span className="text-[#6D5970] font-semibold block">Target Label (y):</span>
                      <span className="text-[#FF2E7E] font-bold">{t.target}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Callout type="warning" title="Teacher Note: Data Quality Limits Learning">
          A feature is not automatically useful simply because it can be measured. Features must carry
          genuine mutual information about the target. Real-world datasets suffer from missing entries,
          duplicate records, labeling noise, and sampling bias. <strong>The quality of the data places
          a hard ceiling on what any algorithm can learn.</strong>
        </Callout>
      </section>

      {/* Stage 1 Checkpoint */}
      <div className="rounded-2xl border-2 border-[#FF2E7E] bg-[#FFF0F6] p-5 shadow-sm space-y-3">
        <span className="font-pixel text-xs text-[#FF2E7E] font-bold uppercase tracking-wider block">
          STAGE 1 CHECKPOINT · CONCEPTUAL SYNTHESIS
        </span>
        <h3 className="font-extrabold text-base text-[#1A1020]">
          Stage Question: &ldquo;Why can the same email have a feature vector but no label at prediction time?&rdquo;
        </h3>
        <p className="text-xs md:text-sm text-[#4A3B4E] leading-relaxed">
          Because during training, ground truth is supplied to teach the model patterns. In production,
          the email is real and incoming: we can extract its attributes (link count, words), but its true
          categorization is unknown — that unknown label is the exact goal the trained model exists to predict!
        </p>
      </div>

      <Quiz
        partNumber={2}
        questions={[
          {
            question: 'Why must the email identifier (ID) be excluded from the feature matrix X?',
            options: [
              'Because IDs are arbitrary keys with no generalizable relationship to whether an email is spam.',
              'Because feature matrices can only contain negative numbers.',
              'Because supervised learning cannot use more than 2 features.',
              'Because IDs are converted automatically into class labels.',
            ],
            correctIndex: 0,
            explanation:
              'Observation IDs (e.g. Email #1042) carry no predictive information about email contents. Using IDs leads to memorization and severe data leakage.',
          },
          {
            question: 'What is the function of the learning algorithm in supervised classification?',
            options: [
              'It finds statistical patterns and parameter weights relating training features X to labels y.',
              'It creates brand new emails to send to users.',
              'It removes labels from training data so it becomes unsupervised.',
              'It converts classification problems into regression.',
            ],
            correctIndex: 0,
            explanation:
              'The learning algorithm ingests (X, y) pairs to construct a classifier function f(x) that maps future feature vectors to predictions.',
          },
          {
            question: 'What happens if a categorical feature like "Sender Reputation: known/unknown" is provided to a classifier?',
            options: [
              'It must be encoded into numbers (such as one-hot vectors [1, 0]) because algorithms operate on numerical matrices.',
              'The model will automatically convert into regression.',
              'It will immediately achieve 100% test accuracy.',
              'It is impossible for machine learning to handle categorical data.',
            ],
            correctIndex: 0,
            explanation:
              'Mathematical classifiers require real-valued vectors. Categorical variables are converted using encoding techniques such as one-hot or ordinal encoding.',
          },
        ]}
      />
    </div>
  );
}
