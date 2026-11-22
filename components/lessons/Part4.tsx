'use client';

import React from 'react';
import {
  SectionHeader,
  CompareTable,
  Callout,
  KeyInsight,
} from '@/components/ui/ConceptCard';
import { MathBlock, MathInline } from '@/components/ui/KatexFormula';
import { ExternalImageCard } from '@/components/ui/ExternalImageCard';
import {
  ThresholdDemoWidget,
  ConfusionMatrixLiveWidget,
} from '@/components/interactive/CurriculumVisuals';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';

export default function Part4() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-12">
      {/* ─── Part Header ─── */}
      <SectionHeader
        part={4}
        time="Part IV · Slides 22–26"
        title="Part IV — Making and evaluating classification decisions"
        subtitle="Classification thresholds, error types (TP, FP, FN, TN), the Confusion Matrix, and metrics calculation."
      />

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 22 — What is a classification threshold?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-22" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#F59E0B] font-bold border border-[#FFB8D2]">
              SLIDE 22
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              What is a classification threshold?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Decision Threshold
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Some classification algorithms produce a probability estimate rather than directly returning a class.
          </p>
          <p>
            For example, a binary classifier might estimate:
          </p>
          <MathBlock formula="P(\text{Spam} \mid x) = 0.72" label="Estimated Posterior Probability" />
          <p className="font-semibold text-[#1A1020]">
            How do we turn this probability into a category? We use a decision threshold.
          </p>

          <div className="p-4 rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] space-y-2">
            <h4 className="font-bold text-sm text-[#96003B]">Definition of Classification Threshold</h4>
            <p className="text-xs md:text-sm text-[#4A3B4E] leading-relaxed">
              A <strong>classification threshold</strong> is a predefined cutoff value used to convert a predicted probability into a class decision.
            </p>
            <p className="text-xs text-[#1A1020]">
              For binary classification, if the threshold is <MathInline formula="t" />:
            </p>
            <MathBlock
              formula="\hat{y} = \begin{cases} 1 & \text{if } P(y=1 \mid x) \geq t \\ 0 & \text{otherwise} \end{cases}"
              label="Piecewise Threshold Decision Rule"
            />
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs uppercase text-[#6D5970] tracking-wider font-mono">
              Concrete Threshold Comparison: P(Spam | x) = 0.72
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border-2 border-[#FF2E7E]">
                <strong className="text-[#FF2E7E] block mb-1">With a threshold of 0.5:</strong>
                <p className="font-mono text-[11px] mb-1">0.72 ≥ 0.5</p>
                <p className="font-bold text-[#1A1020]">
                  The predicted class is <span className="text-[#FF2E7E]">Spam (1)</span>.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border-2 border-blue-400">
                <strong className="text-blue-600 block mb-1">With a threshold of 0.8:</strong>
                <p className="font-mono text-[11px] mb-1">0.72 &lt; 0.8</p>
                <p className="font-bold text-[#1A1020]">
                  The predicted class is <span className="text-blue-600">Not Spam (0)</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Threshold Slider Demo */}
        <ThresholdDemoWidget />

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              The threshold determines how much evidence the model needs before assigning an observation to the positive class:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>A <strong>lower threshold</strong> makes the classifier more willing to predict the positive class.</li>
              <li>A <strong>higher threshold</strong> makes the classifier more conservative.</li>
            </ul>
            <KeyInsight>
              This means that <strong>changing the threshold can change the predictions even when the trained model remains exactly the same</strong>.
            </KeyInsight>
            <p>
              The choice of threshold depends on the application and the consequences of different types of mistakes. For example, in medical screening, we may prefer a threshold that identifies more potentially positive cases, even if that means some healthy individuals are incorrectly flagged.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 23 — Understanding classification errors
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-23" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#F59E0B] font-bold border border-[#FFB8D2]">
              SLIDE 23
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Understanding classification errors
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Error Types
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            A classifier can make two important types of mistakes in binary classification.
          </p>
          <p>Consider a spam detection system with two possible actual classes (Spam, Not Spam) and two possible predicted classes (Predicted Spam, Predicted Not Spam). Combining these gives four possible outcomes:</p>

          <CompareTable
            headers={['Actual Class', 'Predicted Class', 'Result']}
            rows={[
              ['Spam', 'Spam', 'True Positive (TP)'],
              ['Not Spam', 'Spam', 'False Positive (FP)'],
              ['Spam', 'Not Spam', 'False Negative (FN)'],
              ['Not Spam', 'Not Spam', 'True Negative (TN)'],
            ]}
          />

          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs uppercase text-[#6D5970] tracking-wider font-mono">
              Detailed Explanations & Real-World Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <strong className="text-emerald-900 block mb-1">True Positive (TP):</strong>
                The email is actually Spam, and the model correctly predicts Spam.
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <strong className="text-rose-900 block mb-1">False Positive (FP):</strong>
                The email is actually Not Spam, but the model incorrectly predicts Spam.
                <p className="text-rose-800 font-semibold mt-1">
                  Consequence: A legitimate email is incorrectly flagged and buried in spam.
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <strong className="text-amber-900 block mb-1">False Negative (FN):</strong>
                The email is actually Spam, but the model incorrectly predicts Not Spam.
                <p className="text-amber-800 font-semibold mt-1">
                  Consequence: A spam email passes through the filter into the inbox.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <strong className="text-blue-900 block mb-1">True Negative (TN):</strong>
                The email is actually Not Spam, and the model correctly predicts Not Spam.
              </div>
            </div>
          </div>

          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/xpkaNIzcwRUhd-zBzRfMTywCaCThC8r2-5WDfdG2nC35_h58QSYoD6Wh4IP8cTMcJzOqyrGT8dCN8R1iYpCESXePAGNxajJX-VSyI3Jv4lGhrYNRUTY6_je7QSqKZP0cd1nZvBR-j-1Uu02DNQOtTdvDNhce4xC5gP7QyHcCoYg?purpose=inline"
            title="Confusion Matrix Explained (With Python Code & Metrics) by Soumodeep Santra"
            sourceUrl="https://medium.com/%40soumodeepsantra5/confusion-matrix-explained-with-python-code-metrics-f4d78337d3f5?utm_source=chatgpt.com"
            sourceLabel="medium.com"
            caption="The 2x2 error matrix layout: Actual vs. Predicted classifications."
          />
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              The words <strong>True</strong> and <strong>False</strong> describe whether the prediction is correct. <strong>Positive</strong> and <strong>Negative</strong> refer to the predicted or actual class.
            </p>
            <p>
              It is important to establish which class is considered positive before interpreting the matrix. For spam detection, we choose Spam as the positive class.
            </p>
            <p>
              The same convention can be applied to fraud detection, medical screening and other binary classification tasks.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 24 — The confusion matrix
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-24" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#F59E0B] font-bold border border-[#FFB8D2]">
              SLIDE 24
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              The confusion matrix
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Matrix
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            The four outcomes can be organized into a table called the <strong>confusion matrix</strong>.
          </p>
          <p>
            A confusion matrix compares the actual classes with the classes predicted by a classification model.
          </p>
          <p className="font-bold text-[#1A1020]">
            Consider the following example: A classifier examines 100 emails and produces these results:
          </p>

          <CompareTable
            headers={['Actual \\ Predicted', 'Predicted Spam', 'Predicted Not Spam']}
            rows={[
              ['Actual Spam', '15 (TP)', '5 (FN)'],
              ['Actual Not Spam', '10 (FP)', '70 (TN)'],
            ]}
          />
          <p className="text-xs text-[#6D5970] italic">
            Total observations: 100 emails (20 Actual Spam, 80 Actual Not Spam).
          </p>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              Out of the 20 actual spam emails, the model correctly identifies 15 and misses 5. Out of the 80 legitimate emails, the model correctly identifies 70 and incorrectly flags 10 as spam.
            </p>
            <p>
              The confusion matrix gives us a detailed picture of the model&apos;s behavior. Instead of knowing only how many predictions were correct, we can understand exactly which types of mistakes the model makes.
            </p>
            <KeyInsight>
              This information is essential when selecting an appropriate evaluation metric.
            </KeyInsight>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 25 — Classification evaluation metrics
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-25" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#F59E0B] font-bold border border-[#FFB8D2]">
              SLIDE 25
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Classification evaluation metrics
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Metric Formulas
          </span>
        </div>

        <p className="text-sm text-[#4A3B4E]">
          Once we have the confusion matrix, we can calculate several measures of classification performance.
        </p>

        {/* 4 Metrics Detailed Breakdown with Boxed Answers */}
        <div className="space-y-6">
          {/* 1. Accuracy */}
          <div className="p-4 rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#96003B]">1. Accuracy</h3>
              <span className="text-xs font-mono font-bold bg-[#FFE4EF] text-[#FF2E7E] px-2.5 py-0.5 rounded-full">
                85%
              </span>
            </div>
            <p className="text-xs text-[#4A3B4E]">
              Accuracy measures the proportion of all predictions that are correct:
            </p>
            <MathBlock
              formula="\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}"
              label="Accuracy Formula"
            />
            <p className="text-xs text-[#4A3B4E]">Using our example:</p>
            <MathBlock
              formula="\text{Accuracy} = \frac{15 + 70}{100} = 0.85 \implies \boxed{\text{Accuracy} = 85\%}"
            />
            <p className="text-xs text-[#6D5970] italic">
              The classifier correctly predicts 85% of all emails.
            </p>
          </div>

          {/* 2. Precision */}
          <div className="p-4 rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#FF2E7E]">2. Precision</h3>
              <span className="text-xs font-mono font-bold bg-[#FFE4EF] text-[#FF2E7E] px-2.5 py-0.5 rounded-full">
                60%
              </span>
            </div>
            <p className="text-xs text-[#4A3B4E]">
              Precision measures the proportion of observations predicted as positive that are actually positive:
            </p>
            <MathBlock
              formula="\text{Precision} = \frac{TP}{TP + FP}"
              label="Precision Formula"
            />
            <p className="text-xs text-[#4A3B4E]">Using our example:</p>
            <MathBlock
              formula="\text{Precision} = \frac{15}{15 + 10} = \frac{15}{25} \implies \boxed{\text{Precision} = 60\%}"
            />
            <p className="text-xs text-[#6D5970] italic">
              Among all emails classified as Spam, 60% are actually Spam.
            </p>
          </div>

          {/* 3. Recall */}
          <div className="p-4 rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#8B5CF6]">3. Recall</h3>
              <span className="text-xs font-mono font-bold bg-[#FFE4EF] text-[#8B5CF6] px-2.5 py-0.5 rounded-full">
                75%
              </span>
            </div>
            <p className="text-xs text-[#4A3B4E]">
              Recall measures the proportion of actual positive observations that the classifier correctly identifies:
            </p>
            <MathBlock
              formula="\text{Recall} = \frac{TP}{TP + FN}"
              label="Recall Formula"
            />
            <p className="text-xs text-[#4A3B4E]">Using our example:</p>
            <MathBlock
              formula="\text{Recall} = \frac{15}{15 + 5} = \frac{15}{20} \implies \boxed{\text{Recall} = 75\%}"
            />
            <p className="text-xs text-[#6D5970] italic">
              The classifier identifies 75% of all actual spam emails.
            </p>
          </div>

          {/* 4. F1-score */}
          <div className="p-4 rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#10B981]">4. F1-score</h3>
              <span className="text-xs font-mono font-bold bg-[#FFE4EF] text-[#10B981] px-2.5 py-0.5 rounded-full">
                66.67%
              </span>
            </div>
            <p className="text-xs text-[#4A3B4E]">
              The F1-score is the harmonic mean of precision and recall:
            </p>
            <MathBlock
              formula="F_1 = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}"
              label="F1 Harmonic Mean Formula"
            />
            <p className="text-xs text-[#4A3B4E]">Using our example:</p>
            <MathBlock
              formula="F_1 = 2 \times \frac{0.60 \times 0.75}{0.60 + 0.75} = 2 \times \frac{0.45}{1.35} \implies \boxed{F_1 \approx 66.67\%}"
            />
            <p className="text-xs text-[#6D5970] italic">
              The F1-score provides a combined measure of precision and recall.
            </p>
          </div>
        </div>

        {/* Live Interactive Confusion Matrix & Metrics Widget */}
        <ConfusionMatrixLiveWidget />

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              These four metrics answer different questions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Accuracy</strong> tells us how many predictions were correct overall.</li>
              <li><strong>Precision</strong> tells us how reliable positive predictions are.</li>
              <li><strong>Recall</strong> tells us how many actual positive observations we successfully identify.</li>
              <li><strong>F1-score</strong> provides a balance between precision and recall.</li>
            </ul>
            <p>
              The most appropriate metric depends on the application:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>For spam filtering, we may want to avoid incorrectly classifying legitimate emails as spam, making <strong>precision</strong> important.</li>
              <li>For medical screening, missing a genuinely positive case may be particularly costly, making <strong>recall</strong> especially important.</li>
            </ul>
            <KeyInsight>
              There is no universally best metric for every classification problem.
            </KeyInsight>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 26 — Classification is not always perfect
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-26" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#F59E0B] font-bold border border-[#FFB8D2]">
              SLIDE 26
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Classification is not always perfect
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Data Drift
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            It is important to understand that a classification model does not automatically produce correct predictions. Its performance depends on many factors, including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">The quality and quantity of training data</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">Whether training data represents real-world observations</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">The relevance of the selected features</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">The complexity of the relationship between features and classes</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">The learning algorithm and its hyperparameters</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">The presence of noise and ambiguous observations</div>
          </div>

          <div className="p-4 rounded-xl border border-[#FFB8D2] bg-[#FFF7FA] space-y-2">
            <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase font-bold block">
              Real-World Practical Example: Concept & Distribution Drift
            </span>
            <p className="text-xs text-[#1A1020] leading-relaxed">
              Suppose a spam detection model is trained using emails collected several years ago. Over time, spammers change their techniques and begin using different words, formats and links.
            </p>
            <p className="text-xs text-[#96003B] font-semibold">
              The model may gradually become less effective because the new emails differ from the examples it learned from.
            </p>
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              This illustrates an important practical issue: <strong>the data distribution can change over time</strong>.
            </p>
            <KeyInsight>
              A classification system should therefore be <strong>evaluated and monitored</strong> continuously rather than assumed to remain accurate forever.
            </KeyInsight>
          </div>
        </Callout>
      </section>
    </div>
  );
}
