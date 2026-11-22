'use client';

import React, { useState } from 'react';
import {
  SectionHeader,
  ThoughtPrompt,
  CompareTable,
  Callout,
  KeyInsight,
} from '@/components/ui/ConceptCard';
import { MathBlock, MathInline } from '@/components/ui/KatexFormula';
import { ExternalImageCard } from '@/components/ui/ExternalImageCard';
import { WorkflowStagesWidget } from '@/components/interactive/CurriculumVisuals';
import {
  Workflow,
  AlertTriangle,
  BarChart3,
  Scale,
  Brain,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export default function Part3() {
  const [showImbalanceInsight, setShowImbalanceInsight] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-12">
      {/* ─── Part Header ─── */}
      <SectionHeader
        part={3}
        time="Part III · Slides 18–21"
        title="Part III — Understanding the complete learning workflow"
        subtitle="The 7-stage ML project lifecycle, overfitting, memorization vs generalization, and class imbalance."
      />

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 18 — The end-to-end classification workflow
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-18" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#10B981] font-bold border border-[#FFB8D2]">
              SLIDE 18
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              The end-to-end classification workflow
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Lifecycle
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            So far, we have examined the classification problem, its inputs and outputs, and the basic idea behind classification algorithms. Now we can bring everything together into a complete Machine Learning workflow.
          </p>
          <p className="font-bold text-[#1A1020]">
            A typical supervised classification project involves several stages:
          </p>
        </div>

        {/* Interactive 7 Stages Visual */}
        <WorkflowStagesWidget />

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              A classification project does not begin by selecting an algorithm. It begins by <strong>understanding the problem we want to solve</strong>.
            </p>
            <p>
              For example, if we want to detect spam emails, we first need to determine what counts as spam, collect representative email examples, and establish how those examples will be labeled.
            </p>
            <p>
              Next, we prepare the dataset so that it can be used by a learning algorithm. We then divide the available data into separate subsets for training, validation and testing. The purpose of this separation is to assess whether the model has learned patterns that generalize beyond the examples it was trained on.
            </p>
            <p>
              After training and evaluating the model, we may deploy it in a real application.
            </p>
            <KeyInsight>
              Even after deployment, the work does not necessarily end. Data patterns can change over time, and a model that performed well previously may require monitoring or retraining.
            </KeyInsight>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 19 — Why can't we evaluate a model using only its training data?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-19" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#10B981] font-bold border border-[#FFB8D2]">
              SLIDE 19
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Why can&apos;t we evaluate a model using only its training data?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Overfitting
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Imagine training a classifier using 1,000 labeled emails.
          </p>
          <p>
            After training, we test it using the exact same 1,000 emails. Suppose it correctly classifies all 1,000 emails.
          </p>
          <p className="font-bold text-[#1A1020]">
            Does this mean that it will correctly classify every new email it receives?
          </p>
          <p className="text-[#FF2E7E] font-extrabold text-base">
            Not necessarily.
          </p>
          <p>
            The model may have memorized specific patterns in the training examples instead of learning general relationships that apply to new observations. This problem is called <strong>overfitting</strong>.
          </p>

          <div className="p-4 rounded-xl border-2 border-rose-200 bg-rose-50/60 space-y-2">
            <h4 className="font-bold text-sm text-rose-900">Definition of Overfitting</h4>
            <p className="text-xs md:text-sm text-rose-800 leading-relaxed">
              <strong>Overfitting</strong> occurs when a model learns the training data too closely, including noise or specific characteristics that do not generalize well to unseen observations.
            </p>
            <p className="text-xs text-rose-900 font-semibold">
              A model that overfits can achieve excellent performance on its training data but significantly worse performance on new data.
            </p>
          </div>

          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/PCRkepvb7PzoS4CH5KescVo15F073FiiecJZfsI3iffFhG670z9ju_bQdJAwvlk5fA6A6Yh1X9rZtrc12JAN6uNxCBC21Rznd7QSQDK9BPfEWlMh1ZJG35cRQlJR9iVvbH9bKk3JsFbzsOprZCQUBNYgeWcFSqqJ4DwVrLU-76c?purpose=inline"
            title="A Comprehensive Guide to Stratified K-Fold Cross-validation for Unbalanced Data"
            sourceUrl="https://www.linkedin.com/pulse/comprehensive-guide-stratified-k-fold-unbalanced-data-juan-carlos-n6aee?utm_source=chatgpt.com"
            sourceLabel="linkedin.com"
            caption="Cross-validation and held-out test splits protecting against memorization and data leakage."
          />
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              Imagine a student who memorizes the answers to a set of practice questions. The student may achieve a perfect score when the exact same questions are repeated.
            </p>
            <p>
              However, if the examination contains different questions that require understanding the underlying concepts, memorization alone may not be enough.
            </p>
            <p>
              A similar phenomenon can occur in Machine Learning: <strong>The objective is not simply to perform well on the training examples. It is to learn patterns that remain useful when the model encounters new observations.</strong>
            </p>
            <p>
              This is why we need separate data for evaluating generalization. We will explore overfitting, underfitting and generalization in detail in the evaluation stage.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 20 — How do we measure classification performance?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-20" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#10B981] font-bold border border-[#FFB8D2]">
              SLIDE 20
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              How do we measure classification performance?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Evaluation Intro
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            After training a model, we need to determine how well it classifies observations. A model can make correct predictions, but it can also make mistakes. Therefore, we need evaluation metrics.
          </p>
          <div className="p-3.5 bg-[#FFF7FA] rounded-xl border border-[#FFD6E5] text-xs space-y-1">
            <span className="font-bold text-[#1A1020] block">Consider a spam classifier examining 100 emails:</span>
            <ul className="list-disc pl-5 text-[#4A3B4E] space-y-0.5">
              <li>80 emails are actually legitimate.</li>
              <li>20 emails are actually spam.</li>
              <li>The model predicts 75 emails as legitimate.</li>
              <li>The model predicts 25 emails as spam.</li>
            </ul>
            <p className="text-[11px] text-[#6D5970] pt-1">
              We need to compare the predictions with the actual labels to understand how well the classifier performed.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs uppercase text-[#6D5970] tracking-wider font-mono">
              Four Core Evaluation Measures
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
                <strong className="text-[#96003B] block mb-1">Accuracy:</strong>
                The proportion of all predictions that are correct.
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
                <strong className="text-[#FF2E7E] block mb-1">Precision:</strong>
                Among the observations predicted as positive, the proportion that are actually positive.
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
                <strong className="text-[#8B5CF6] block mb-1">Recall:</strong>
                Among the actual positive observations, the proportion correctly identified.
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
                <strong className="text-[#10B981] block mb-1">F1-score:</strong>
                A measure that combines precision and recall into a single harmonic balance.
              </div>
            </div>
            <p className="text-xs text-[#1A1020] font-semibold italic">
              These metrics answer different questions.
            </p>
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              Imagine that we are building a medical screening classifier. A system that misses many genuinely positive cases may be problematic, even if its overall accuracy is high.
            </p>
            <p>
              Similarly, a spam filter that incorrectly places many legitimate emails into the spam folder can cause significant inconvenience.
            </p>
            <KeyInsight>
              Therefore, we should not automatically assume that accuracy is sufficient for every classification problem.
            </KeyInsight>
            <p>
              We will study the confusion matrix and these evaluation metrics in their own dedicated module, including their mathematical formulas and numerical exercises.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 21 — An important challenge: imbalanced datasets
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-21" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#10B981] font-bold border border-[#FFB8D2]">
              SLIDE 21
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              An important challenge: imbalanced datasets
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Data Imbalance
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Classification datasets do not always contain the same number of observations in each class.
          </p>
          <p>Consider a fraud detection dataset:</p>

          <CompareTable
            headers={['Class', 'Number of Transactions']}
            rows={[
              ['Legitimate', '9,900'],
              ['Fraudulent', '100'],
              ['Total', '10,000'],
            ]}
          />

          <div className="p-3.5 bg-rose-50/70 border-2 border-rose-200 rounded-xl space-y-1.5">
            <span className="font-bold text-xs text-rose-900 block">
              The fraudulent class represents only 1% of the dataset. This is called class imbalance.
            </span>
            <p className="text-xs text-rose-800">
              <strong>Class imbalance</strong> occurs when the number of observations belonging to one class is significantly different from the number belonging to another class.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#F0D6E2] bg-white space-y-2">
            <h4 className="font-extrabold text-sm text-[#1A1020]">Why does it matter?</h4>
            <p className="text-xs text-[#4A3B4E]">
              Imagine a naive &quot;dummy&quot; model that simply predicts every transaction as Legitimate:
            </p>
            <MathBlock
              formula="\text{Accuracy} = \frac{9900}{10000} = 99\%"
              label="The 99% Accuracy Trap"
            />
            <p className="text-xs font-bold text-rose-600">
              Yet it would fail to identify every single fraudulent transaction! (Fraud Recall = 0%).
            </p>
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              This example demonstrates why a high accuracy score does not necessarily mean that a classifier is useful.
            </p>
            <p>
              When the classes are imbalanced, a model may achieve high accuracy simply by predicting the majority class.
            </p>
            <KeyInsight>
              We therefore need to examine additional metrics, particularly <strong>recall and precision</strong>, depending on the consequences of different prediction errors.
            </KeyInsight>
            <p>
              This problem appears frequently in fraud detection, medical screening and anomaly-related classification tasks.
            </p>
          </div>
        </Callout>
      </section>
    </div>
  );
}
