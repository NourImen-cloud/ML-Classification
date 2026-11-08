'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  SectionHeader,
  ThoughtPrompt,
  CompareTable,
  Callout,
  KeyInsight,
} from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';

interface ChallengeQuestion {
  id: number;
  question: string;
  rubricCriterion: string;
  points: number;
  sampleAnswer: string;
  guidance: string;
}

const challengeQuestions: ChallengeQuestion[] = [
  {
    id: 1,
    question: 'What are the features and what is the target in this spam filtering system?',
    rubricCriterion: 'Distinguishes features from target and labels correctly (1 pt)',
    points: 1,
    sampleAnswer:
      'Features (X): Sender reputation (categorical, requires one-hot encoding), number of links (numeric), number of suspicious words (numeric), and email length (numeric). Target (y): Spam / Not Spam (binary categorical label, encoded 1 / 0).',
    guidance:
      'Ensure students do not treat observation IDs as features, and mention encoding if categories are present.',
  },
  {
    id: 2,
    question: 'Why is this formally a supervised classification problem?',
    rubricCriterion: 'Explains ground-truth training labels and categorical outcome (1 pt)',
    points: 1,
    sampleAnswer:
      'It is supervised because the algorithm is provided historical emails with verified ground-truth labels (Spam vs. Not Spam) to guide optimization. It is classification (rather than regression) because the predicted target is a discrete categorical outcome rather than a continuous numerical quantity.',
    guidance:
      'Contrast directly with unsupervised clustering and continuous numerical regression.',
  },
  {
    id: 3,
    question: 'How could a K-Nearest Neighbors (KNN) model classify an incoming email?',
    rubricCriterion: 'Explicitly mentions feature scaling (using train stats) & distance voting (1 pt)',
    points: 1,
    sampleAnswer:
      'Step 1: Standardize the numeric features (z = (x - μ) / σ) using the mean and standard deviation computed exclusively on the training data. Step 2: Compute the Euclidean distance between the new email’s feature vector and all stored training emails. Step 3: Identify the K closest training emails. Step 4: The majority class among those K neighbors becomes the predicted class (ŷ = mode(y_1, ..., y_K)).',
    guidance:
      'Award full points only if the student explicitly mentions feature scaling and majority voting.',
  },
  {
    id: 4,
    question: 'How would you evaluate the trained classifier honestly and thoroughly?',
    rubricCriterion: 'Names positive class, uses held-out test set, baseline, & metrics beyond accuracy (1 pt)',
    points: 1,
    sampleAnswer:
      'Partition the data using stratified splitting into Training (70%), Validation (15%), and a strictly held-out Test set (15%). Define Spam as the positive class. Compare the model against a majority-class dummy baseline. On the test set, construct a 2×2 Confusion Matrix and report Precision, Recall, and F1-Score. Prioritize Precision to avoid sending important legitimate messages to the junk folder, and tune the classification threshold on validation data to achieve the optimal trade-off.',
    guidance:
      'Looking for: Stratified test set, majority baseline comparison, Precision/Recall priority justification.',
  },
  {
    id: 5,
    question: 'What would you investigate if training performance was 99% but test performance was only 65%?',
    rubricCriterion: 'Diagnoses overfitting, data leakage, and dataset representativeness (1 pt)',
    points: 1,
    sampleAnswer:
      'First investigate Overfitting: the model is excessively complex (e.g. tree is too deep, or K=1 in KNN) and has memorized noise. Remedy by regularizing, reducing tree depth, or increasing K. Second, check for Data Leakage: ensure preprocessing scalers were not mistakenly fitted on the test set, and verify that duplicate emails do not appear across splits. Third, inspect Data Quality: verify whether test emails represent real distribution shifts or contain mislabeled annotations.',
    guidance:
      'Divergence between train and test is the hallmark diagnostic of overfitting and data snooping.',
  },
];

export default function Part11() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selfScores, setSelfScores] = useState<Record<number, boolean>>({});

  const toggleReveal = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalScore = Object.values(selfScores).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={11}
        time="Session 2 · 50–60 min"
        title="Final Challenge: System Design"
        subtitle="End-to-End Problem Formulation, Algorithm Selection, Evaluation & Diagnostic Audit"
      />

      {/* Scenario Brief */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            THE CAPSTONE SCENARIO
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Deploying a Production Email Spam Classifier
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-[#1A1020] bg-white p-5 shadow-sm space-y-3">
          <span className="font-pixel text-xs text-[#FF2E7E] font-bold">
            SYSTEM SPECIFICATION BRIEF
          </span>
          <p className="text-xs md:text-sm text-[#2D1F33] leading-relaxed">
            You are the lead machine learning engineer tasked with designing and deploying an enterprise spam filter.
            Your labeled historical database contains 50,000 corporate emails with the following recorded attributes:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-[#FFF9FC] border border-[#F0D6E2]">
              <strong>1. Sender Reputation</strong> (Known / Unknown)
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFF9FC] border border-[#F0D6E2]">
              <strong>2. Hyperlinks</strong> (Integer count)
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFF9FC] border border-[#F0D6E2]">
              <strong>3. Suspicious Keywords</strong> (Integer count)
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFF9FC] border border-[#F0D6E2]">
              <strong>4. Email Length</strong> (Characters)
            </div>
          </div>
          <p className="text-xs text-[#6D5970] pt-1">
            Target Ground-Truth: <strong className="text-[#1A1020]">Spam (1)</strong> or{' '}
            <strong className="text-[#1A1020]">Not Spam (0)</strong>.
          </p>
        </div>
      </section>

      {/* 5 System Design Questions */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-2">
          <div>
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block">
              DESIGN QUESTIONS
            </span>
            <h3 className="text-lg font-extrabold text-[#1A1020]">
              The 5 Architectural Questions
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#6D5970]">
              Score: {totalScore} / {challengeQuestions.length} pts
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {challengeQuestions.map((q) => (
            <div
              key={q.id}
              className="rounded-2xl border-2 border-[#F0D6E2] bg-white p-5 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[10px] px-2 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
                      QUESTION {q.id}
                    </span>
                    <span className="text-[10px] font-mono text-[#6D5970] bg-[#FFF0F6] px-2 py-0.5 rounded border border-[#FFB8D2]">
                      Rubric: {q.rubricCriterion}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#1A1020] pt-1">{q.question}</h4>
                </div>
              </div>

              {/* Student text response */}
              <textarea
                placeholder="Type your design solution here before revealing the model answer..."
                value={userAnswers[q.id] ?? ''}
                onChange={(e) =>
                  setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-[#F0D6E2] focus:border-[#FF2E7E] focus:outline-none font-mono"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => toggleReveal(q.id)}
                  className="btn-pink px-4 py-1.5 text-xs font-bold"
                >
                  {revealed[q.id] ? 'Hide Model Answer' : 'Reveal Model Answer & Rubric'}
                </button>

                {revealed[q.id] && (
                  <label className="flex items-center gap-2 text-xs font-bold text-[#1A1020] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!selfScores[q.id]}
                      onChange={(e) =>
                        setSelfScores((prev) => ({ ...prev, [q.id]: e.target.checked }))
                      }
                      className="accent-[#FF2E7E] w-4 h-4 rounded"
                    />
                    Award 1 Point (Criteria Met)
                  </label>
                )}
              </div>

              {revealed[q.id] && (
                <div className="p-4 rounded-xl bg-[#FFF9FC] border border-[#FFD6E5] text-xs space-y-2 animate-fadeIn">
                  <span className="font-bold text-[#FF2E7E] block">Comprehensive Model Answer:</span>
                  <p className="text-[#2D1F33] leading-relaxed">{q.sampleAnswer}</p>
                  <div className="p-2.5 rounded-lg bg-white border border-[#F0D6E2] text-[#6D5970] italic">
                    <strong>Grading Guidance:</strong> {q.guidance}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Improvement Added: Grading Rubric Breakdown */}
        <div className="rounded-2xl border-2 border-[#10B981] bg-[#ECFDF5] p-5 shadow-sm space-y-3">
          <span className="font-pixel text-[10px] text-[#059669] font-bold px-2 py-0.5 rounded bg-[#DCFCE7] border border-[#A7F3D0]">
            IMPROVEMENT ADDED · 5-POINT GRADING RUBRIC
          </span>
          <h4 className="font-extrabold text-sm text-[#1A1020]">
            Evaluator Scoring Guide (1 Point Each):
          </h4>
          <ul className="text-xs text-[#2D1F33] space-y-1.5 list-disc list-inside">
            <li><strong>Point 1:</strong> Correctly separates feature matrix attributes from the target label vector.</li>
            <li><strong>Point 2:</strong> Articulates why training labels define supervised learning vs regression.</li>
            <li><strong>Point 3:</strong> Explicitly emphasizes feature standardization on training statistics prior to KNN distance calculations.</li>
            <li><strong>Point 4:</strong> Demands held-out stratified evaluation, majority baseline comparison, and precision prioritization.</li>
            <li><strong>Point 5:</strong> Directly associates the train/test performance divergence with overfitting and data leakage.</li>
          </ul>
        </div>
      </section>

      {/* Stage 3 Checkpoint Synthesis */}
      <section className="space-y-4">
        <div className="rounded-2xl border-2 border-[#FF2E7E] bg-[#FFF0F6] p-6 shadow-sm space-y-3">
          <span className="font-pixel text-xs text-[#FF2E7E] font-bold uppercase tracking-wider block">
            STAGE 3 CHECKPOINT · MASTER SYNTHESIS
          </span>
          <h3 className="font-extrabold text-base text-[#1A1020]">
            Stage Question: &ldquo;A model has 98% accuracy on a dataset with 2% spam. Is it good? What would you check next?&rdquo;
          </h3>
          <p className="text-xs md:text-sm text-[#4A3B4E] leading-relaxed">
            <strong>No, it may be completely useless!</strong> A trivial dummy model that labels every email as legitimate
            scores 98% accuracy while catching exactly 0% of incoming spam (Recall = 0%).
            Next steps: (1) Generate the 2×2 Confusion Matrix; (2) Calculate Spam Recall and Precision;
            (3) Evaluate against the majority-class baseline; and (4) Adjust the classification threshold on validation data.
          </p>
        </div>
      </section>

      {/* Course Completion & Next Steps */}
      <section className="rounded-2xl border-2 border-[#1A1020] bg-white p-6 shadow-md text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#FFE4EF] border border-[#FFB8D2] flex items-center justify-center mx-auto text-[#FF2E7E] font-pixel text-xl font-bold">
          ★
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-[#1A1020]">
            Curriculum Complete!
          </h3>
          <p className="text-[#6D5970] text-xs md:text-sm max-w-md mx-auto mt-1">
            You have mastered the foundational mechanics of Machine Learning Classification — from features and KNN to Gini impurity, logistic thresholds, and honest model evaluation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/playground" className="btn-pink px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5">
            <span>Open Interactive Playground</span>
            <span>→</span>
          </Link>
          <Link href="/" className="btn-white px-5 py-2 text-xs font-bold inline-flex items-center gap-1.5">
            <span>Back to Curriculum Overview</span>
          </Link>
        </div>
      </section>

      <Quiz
        partNumber={11}
        questions={[
          {
            question: 'What is the most critical question to ask before deciding whether to prioritize Precision or Recall?',
            options: [
              'Which specific type of mistake (False Positive or False Negative) causes greater harm or operational cost?',
              'Which algorithm has the shortest training runtime?',
              'Whether the dataset has more than 1,000 rows.',
              'Whether the programming language is Python or R.',
            ],
            correctIndex: 0,
            explanation:
              'Evaluation metric selection must align directly with business and human consequences. If false alarms are costly, prioritize Precision; if missed events are lethal or expensive, prioritize Recall.',
          },
        ]}
      />
    </div>
  );
}
