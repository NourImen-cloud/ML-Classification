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
import { DecisionBoundaryScatterPlot } from '@/components/interactive/CurriculumVisuals';
import ClassificationPlayground from '@/components/interactive/ClassificationPlayground';
import {
  Sparkles,
  GitBranch,
  Layers,
  Scale,
  Activity,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function Part2() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-12">
      {/* ─── Part Header ─── */}
      <SectionHeader
        part={2}
        time="Part II · Slides 12–17"
        title="Part II — Understanding how classification decisions are made"
        subtitle="Geometric feature spaces, decision boundaries, class overlap, probabilities, and core algorithms."
      />

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 12 — How does a classifier distinguish between classes?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-12" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold border border-[#FFB8D2]">
              SLIDE 12
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              How does a classifier distinguish between classes?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Decision Boundaries
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Imagine plotting our spam detection dataset on a graph.
          </p>
          <p>We have two features:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs font-mono text-[#1A1020]">
            <li>Horizontal axis: Number of links.</li>
            <li>Vertical axis: Number of suspicious words.</li>
          </ul>
          <p>
            Each email becomes a point in a two-dimensional space. Emails labeled <span className="text-[#FF2E7E] font-bold">Spam</span> can be represented using red points, while emails labeled <span className="text-blue-600 font-bold">Not Spam</span> can be represented using blue points.
          </p>

          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/tMIcIgC1g9gTG-yXMVi5QNdS-U4cQdeRGCoM36izzinlbhRNzF-F25_7Ji1cKbr81kz-9xw6mhjrShp93WLFZoCjhuAZnVY6z3NmF_YoD2pxVFMVcL6aPJWu69I2K2nZHnxyV8ynOZ6069EC8gkOdnFc91YhPx_C1B4YSAoO9u8?purpose=inline"
            title="Supervised Learning Slide Deck by Nipun Batra"
            sourceUrl="https://nipunbatra.github.io/principles-ai-teaching/lectures/03-supervised-learning/slides.html?utm_source=chatgpt.com"
            sourceLabel="nipunbatra.github.io"
            caption="Visualizing 2D labeled samples and separating decision surfaces."
          />

          <div className="p-4 rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] space-y-2">
            <h4 className="font-bold text-sm text-[#96003B]">Definition of Decision Boundary</h4>
            <p className="text-xs md:text-sm text-[#4A3B4E] leading-relaxed">
              A classification model attempts to learn a decision rule that helps distinguish observations belonging to different classes. When the data can be represented geometrically, this rule can be visualized as a <strong>decision boundary</strong>.
            </p>
            <p className="text-xs font-semibold text-[#1A1020]">
              A <strong>decision boundary</strong> is the boundary in the feature space that separates regions assigned to different predicted classes.
            </p>
          </div>
        </div>

        {/* Interactive Scatter Plot Visual */}
        <DecisionBoundaryScatterPlot />

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              Imagine that we have plotted all our training emails. We can observe that many spam emails have a relatively high number of links and suspicious words, while many legitimate emails have lower values.
            </p>
            <p>
              A classifier can use these patterns to determine which regions of the feature space are associated with each class. When a new email arrives, we represent it as a point on the graph. Its position relative to the learned decision boundary helps determine its predicted category.
            </p>
            <p>
              For example, if the point falls inside the region assigned to Spam, the model predicts Spam. However, not every classification problem can be perfectly separated by a simple line. Some datasets contain overlapping classes, noisy observations or complex patterns.
            </p>
            <KeyInsight>
              <strong>Important distinction:</strong> A decision boundary is not necessarily a physical line or curve stored inside every model. It is a useful mathematical and visual way to understand how a classifier divides the input space into regions of predicted classes.
            </KeyInsight>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 13 — What is a feature space?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-13" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold border border-[#FFB8D2]">
              SLIDE 13
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              What is a feature space?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Geometry
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            A <strong>feature space</strong> is the mathematical space defined by all possible combinations of the input features used to describe observations.
          </p>
          <p>Each dimension of this space corresponds to one feature:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>One feature produces a <strong>one-dimensional</strong> feature space.</li>
            <li>Two features produce a <strong>two-dimensional</strong> feature space.</li>
            <li>Three features produce a <strong>three-dimensional</strong> feature space.</li>
            <li><MathInline formula="d" /> features produce a <strong><MathInline formula="d" />-dimensional</strong> feature space.</li>
          </ul>

          <div className="p-3.5 bg-[#FFF7FA] rounded-xl border border-[#FFD6E5] text-xs space-y-1">
            <span className="font-bold text-[#1A1020] block">Concrete Example:</span>
            <p>Consider a dataset with two features:</p>
            <p className="font-mono text-[11px] text-[#96003B]">
              x₁ = Number of links &nbsp;|&nbsp; x₂ = Number of suspicious words
            </p>
            <p>An email represented by the vector:</p>
            <MathBlock formula="x = \begin{bmatrix} 5 \\ 3 \end{bmatrix}" />
            <p>corresponds to a point at coordinates <MathInline formula="(5, 3)" />.</p>
          </div>

          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/vLZCq9Axtm09GfJ1rebiXfRTLEwzcl2bbiG70C_dq0C8NEnqHcmi_xkZ9SNQpaTzrzD9HT10EY03cWntikT4Q3Bj7OoddSe7bhU-sBTPjxhEFG5p48SE6miX7-SToHdH-P_zUe1lVGRvfbKvBgidDUlaf0JXyyYPAlm-_8IoAUo?purpose=inline"
            title="Smote for Imbalanced Classification with Python | Analytics Vidhya"
            sourceUrl="https://www.analyticsvidhya.com/blog/2020/10/overcoming-class-imbalance-using-smote-techniques/?utm_source=chatgpt.com"
            sourceLabel="analyticsvidhya.com"
            caption="Points populated and partitioned throughout high-dimensional feature spaces."
          />
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              The feature space allows us to visualize the data mathematically. Each observation is represented by a point whose coordinates correspond to its feature values.
            </p>
            <p>
              When we have two features, we can plot the observations on a two-dimensional graph. When we have three features, we can visualize them in three dimensions.
            </p>
            <p>
              Real-world datasets may contain hundreds or thousands of features. In those situations, the feature space has many dimensions, and we cannot directly visualize it in an ordinary two-dimensional graph. Nevertheless, the mathematical concept remains the same.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 14 — What happens when classes overlap?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-14" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold border border-[#FFB8D2]">
              SLIDE 14
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              What happens when classes overlap?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Noise & Ambiguity
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            In an idealized dataset, the classes might be clearly separated. However, real-world data is rarely perfect.
          </p>
          <p>
            Consider spam detection again: A legitimate email might contain several links, while a spam email might contain very few. This creates <strong>overlapping regions</strong> in the feature space.
          </p>

          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/AoynaxxZj5TeKsHr4AkyFtJ8MKv5UlsLZFg5tM5NG7EmLs355-6n8-I5G_66vbzwsZad36Cz_fR5Q5L57iBX6zjV9JP3tWu2ZYwC656mM4LneyRfBjV2UY4H52dITaIUvngTyW81RWcqS7tcRShac64PsM67o7GJRw7tWOURYRk?purpose=inline"
            title="Study on Image Data Cleaning Method Based on Neural Network | Scientific Reports"
            sourceUrl="https://www.nature.com/articles/s41598-022-18707-6?utm_source=chatgpt.com"
            sourceLabel="nature.com"
            caption="Scientific study detailing overlapping sample representations and data boundary ambiguity."
          />

          <div className="p-4 rounded-xl border-2 border-amber-200 bg-amber-50/60 space-y-2">
            <h4 className="font-bold text-sm text-amber-900">Definition of Class Overlap</h4>
            <p className="text-xs md:text-sm text-amber-800 leading-relaxed">
              <strong>Class overlap</strong> occurs when observations from different classes occupy similar or identical regions of the feature space.
            </p>
            <p className="text-xs text-amber-900 font-semibold">
              This makes classification more difficult because the input features do not provide a perfectly clear distinction between the classes.
            </p>
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              Suppose we receive two emails with exactly the same number of links and suspicious words, but one is labeled Spam and the other Not Spam. Based only on those two features, it may be impossible to distinguish between them.
            </p>
            <KeyInsight>
              This illustrates an important principle: <strong>A classifier cannot reliably distinguish classes using information that is not present in its input features.</strong>
            </KeyInsight>
            <p>
              We may need additional features, a different representation of the data or a different model. Even then, classification errors may remain because real-world observations can be ambiguous or noisy.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 15 — Does a classifier always know its answer with certainty?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-15" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold border border-[#FFB8D2]">
              SLIDE 15
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Does a classifier always know its answer with certainty?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Probabilities
          </span>
        </div>

        <div className="p-3 bg-[#FFF0F6] rounded-xl border border-[#FFB8D2] font-bold text-sm text-[#FF2E7E]">
          No. Classifiers do not have absolute certainty.
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Many classification models can produce scores or estimated probabilities that describe how strongly they support each possible class.
          </p>
          <p>Consider a binary spam classifier. For a particular email, the model might produce:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
            <MathBlock formula="P(\text{Spam} \mid x) = 0.85" label="Spam Posterior" />
            <MathBlock formula="P(\text{Not Spam} \mid x) = 0.15" label="Not Spam Posterior" />
          </div>
          <p className="text-xs text-[#6D5970]">
            These values represent the model&apos;s estimated probabilities for the two classes, conditional on the observed features.
          </p>

          <CompareTable
            headers={['Class', 'Estimated Probability']}
            rows={[
              ['Spam', '0.85'],
              ['Not Spam', '0.15'],
            ]}
          />

          <p className="text-xs text-[#1A1020]">
            If the model uses a decision threshold of 0.5, it predicts Spam because:
          </p>
          <MathBlock formula="0.85 \geq 0.5 \implies \hat{y} = \text{Spam}" label="Decision Rule at Threshold 0.5" />
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              A class prediction tells us which category the model selected. A probability estimate tells us how strongly the model&apos;s output supports a particular category.
            </p>
            <p>
              However, these two concepts should not be confused:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>A model can be highly confident and still be wrong.</li>
              <li>A model that outputs 0.85 is not automatically guaranteed to be correct 85% of the time on similar predictions. That interpretation requires the model&apos;s probabilities to be appropriately <strong>calibrated</strong>.</li>
            </ul>
            <p>
              We will return to probabilities and thresholds when studying Logistic Regression and classification evaluation.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 16 — Introducing the classification algorithms
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-16" className="space-y-6 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold border border-[#FFB8D2]">
              SLIDE 16
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Introducing the Classification Algorithms
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Core Paradigms
          </span>
        </div>

        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            We have established the core classification challenge: given an observation described by features (such as links and suspicious words), predict which category it belongs to.
          </p>
          <p className="font-semibold text-[#1A1020]">
            How does an algorithm learn this relationship from past examples?
          </p>
          <p>
            Instead of hand-coding thousands of brittle <code className="px-1.5 py-0.5 rounded bg-[#FFF0F6] text-[#FF2E7E] font-mono text-xs font-bold">if/else</code> rules, different machine learning algorithms use completely different mathematical philosophies. Below, we break down each algorithm with an <strong>intuitive everyday analogy</strong>, its <strong>step-by-step mechanism</strong>, its <strong>decision boundary geometry</strong>, and the <strong>classic traps</strong> students must watch out for.
          </p>
        </div>

        {/* ─── ALGORITHM 1: KNN ─── */}
        <div className="rounded-2xl border-2 border-[#FFD6E5] bg-[#FFFDFE] p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#FF2E7E] text-white text-xs font-mono font-extrabold flex items-center justify-center">
                1
              </span>
              <h3 className="font-extrabold text-lg text-[#1A1020]">K-Nearest Neighbors (KNN)</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] border border-[#FFB8D2]">
              Distance-Based · Lazy Learner
            </span>
          </div>

          {/* Everyday Analogy */}
          <div className="p-3.5 rounded-xl bg-[#FFF0F6] border border-[#FFB8D2] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#96003B] uppercase tracking-wider">
              <span>💡</span> Everyday Mental Model: The Cafeteria Table
            </div>
            <p className="text-xs text-[#2D1F33] leading-relaxed">
              &ldquo;Show me your friends, and I will tell you who you are.&rdquo; If a new student enters the university dining hall and sits at a table surrounded by four heavy metal fans and one pop music fan, what is your best bet on their music taste? Heavy metal—by majority vote! That is KNN in a nutshell.
            </p>
          </div>

          {/* How It Works (Step-by-Step) */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#6D5970] font-mono">
              How KNN Works (Step-by-Step)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-[#F0D6E2] bg-white space-y-1">
                <span className="font-bold text-[#FF2E7E] block">1. Zero Training (Lazy)</span>
                <p className="text-[#4A3B4E]">
                  KNN performs no mathematical optimization during training! It simply memorizes the coordinates of every training observation in the feature space.
                </p>
              </div>
              <div className="p-3 rounded-xl border border-[#F0D6E2] bg-white space-y-1">
                <span className="font-bold text-[#FF2E7E] block">2. Calculate Distances</span>
                <p className="text-[#4A3B4E]">
                  When an unlabelled email <MathInline formula="p" /> arrives, KNN computes the straight-line Euclidean distance to all stored points <MathInline formula="q" />:
                </p>
                <MathBlock formula="d(p, q) = \sqrt{\sum_{i=1}^d (p_i - q_i)^2}" />
              </div>
              <div className="p-3 rounded-xl border border-[#F0D6E2] bg-white space-y-1">
                <span className="font-bold text-[#FF2E7E] block">3. Majority Vote</span>
                <p className="text-[#4A3B4E]">
                  It picks the <MathInline formula="K" /> closest neighbors and tallies their votes. The majority class wins:
                </p>
                <MathBlock formula="\hat{y} = 	ext{mode}(y_1, y_2, \dots, y_K)" />
              </div>
            </div>
          </div>

          {/* Geometry & Choice of K */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
              <span className="font-bold text-rose-900 block font-mono">Small K (e.g. K = 1): High Variance (Overfitting)</span>
              <p className="text-rose-800 leading-relaxed">
                Extremely sensitive to individual quirks and noise. If a single noisy legitimate email is mislabeled as spam (like point E10), K=1 builds an isolated &ldquo;spam island&rdquo; right in legitimate territory!
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-1">
              <span className="font-bold text-indigo-900 block font-mono">Large K (e.g. K = 9): High Bias (Underfitting)</span>
              <p className="text-indigo-800 leading-relaxed">
                The decision boundary becomes overly smooth and flat. If 80% of your dataset is legitimate, a large K will cause the dominant class to swamp all genuine minority spam clusters.
              </p>
            </div>
          </div>

          {/* Crucial Gotcha */}
          <div className="p-3.5 rounded-xl border-2 border-amber-200 bg-amber-50/70 space-y-1.5 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold font-mono uppercase tracking-wider text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Crucial Classroom Gotcha: Feature Scaling is Mandatory</span>
            </div>
            <p className="leading-relaxed">
              Suppose Feature 1 is <em>Number of Links</em> (0–10) and Feature 2 is <em>Account Age in Hours</em> (0–10,000). A difference of 500 hours will completely overwhelm a difference of 4 links in the Euclidean square sum! Without standardization (<MathInline formula="z = \frac{x - \mu}{\sigma}" />), KNN effectively ignores the smaller feature.
            </p>
          </div>

          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/-UxuLGqx3F4IE4CFtz2MBhNlq5tNtY98hggMQbLO19QRdY5RfG5ZJ55iRNjG9VPDm1L1vVsQ8h4BdbhUw0HJITBhjbjxl4KdrH_AzCLyTy_sVlbze_M1nYkPoaIiQwiIDfr7GZCjPPeST4Ubd1kgYHzfuWYp-unUPbJKlIq-WUQ?purpose=inline"
            title="K-Nearest Neighbors (KNN): A Simple Yet Powerful Machine Learning Algorithm"
            sourceUrl="https://medium.com/%40ruhelasamridhi/k-nearest-neighbors-knn-a-simple-yet-powerful-machine-learning-algorithm-c3a3bd83057a?utm_source=chatgpt.com"
            sourceLabel="medium.com"
            caption="KNN voting radius: determining class assignment by Euclidean neighborhood."
          />
        </div>

        {/* ─── ALGORITHM 2: DECISION TREES ─── */}
        <div className="rounded-2xl border-2 border-[#E5DBFF] bg-[#FFFDFE] p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#8B5CF6] text-white text-xs font-mono font-extrabold flex items-center justify-center">
                2
              </span>
              <h3 className="font-extrabold text-lg text-[#1A1020]">Decision Trees</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F5F3FF] text-[#8B5CF6] border border-[#DDD6FE]">
              Logic-Based · Hierarchical Flowchart
            </span>
          </div>

          {/* Everyday Analogy */}
          <div className="p-3.5 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#5B21B6] uppercase tracking-wider">
              <span>💡</span> Everyday Mental Model: A Game of 20 Questions / Medical Triage
            </div>
            <p className="text-xs text-[#2D1F33] leading-relaxed">
              Imagine an emergency triage nurse checking a patient: <em>&ldquo;Is heart rate &gt; 120?&rdquo;</em> If yes, <em>&ldquo;Is blood pressure &lt; 90?&rdquo;</em> If yes, <strong>Immediate Intensive Care</strong>. A Decision Tree operates the exact same way: a cascading sequence of simple yes/no questions leading to a final diagnosis.
            </p>
          </div>

          {/* How It Works & Tree Anatomy */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#6D5970] font-mono">
              Tree Anatomy & How It Splits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-[#F0D6E2] bg-white space-y-1">
                <span className="font-bold text-[#8B5CF6] block">1. Root Node</span>
                <p className="text-[#4A3B4E]">
                  The master starting question that evaluates all incoming data (e.g., <em>&ldquo;Are links &gt; 3.5?&rdquo;</em>).
                </p>
              </div>
              <div className="p-3 rounded-xl border border-[#F0D6E2] bg-white space-y-1">
                <span className="font-bold text-[#8B5CF6] block">2. Internal Nodes</span>
                <p className="text-[#4A3B4E]">
                  Subsequent tests that further partition subsets into cleaner, more homogeneous groups.
                </p>
              </div>
              <div className="p-3 rounded-xl border border-[#F0D6E2] bg-white space-y-1">
                <span className="font-bold text-[#8B5CF6] block">3. Leaf Nodes</span>
                <p className="text-[#4A3B4E]">
                  Terminal buckets with no further splits. They deliver the final predicted class or class probability.
                </p>
              </div>
            </div>
          </div>

          {/* Gini Impurity in Plain English */}
          <div className="p-4 rounded-xl border border-[#E5DBFF] bg-white space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#5B21B6]">Demystifying Gini Impurity (Math in Plain English)</span>
              <span className="font-mono text-[11px] text-[#6D5970]">Splitting Criterion</span>
            </div>
            <p className="text-[#4A3B4E] leading-relaxed">
              How does the tree pick which feature and threshold to split on? It measures <strong>Gini Impurity</strong> (disorder / chaos) in each bucket:
            </p>
            <MathBlock formula="\text{Gini} = 1 - \sum_{k=1}^C p_k^2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE]">
                <strong>Pure Leaf (Gini = 0.0):</strong> 100% of emails in the bucket are Spam. Total certainty!
              </div>
              <div className="p-2.5 rounded-lg bg-[#FFF0F6] border border-[#FFB8D2]">
                <strong>Impure Leaf (Gini = 0.5):</strong> 50% Spam, 50% Not Spam. Maximum confusion / toss-up.
              </div>
            </div>
            <p className="text-[#6D5970] pt-1">
              At each step, the algorithm chooses the split that creates the <strong>largest reduction in Gini Impurity</strong> (Information Gain).
            </p>
          </div>

          {/* Geometry & Overfitting Warning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-1">
              <span className="font-bold text-indigo-900 block font-mono">Boundary Geometry: Axis-Aligned Box Cuts</span>
              <p className="text-indigo-800 leading-relaxed">
                Because every question tests only one feature at a time (<MathInline formula="x_1 \ge c" />), decision boundaries are strictly <strong>horizontal or vertical cuts</strong> on a 2D plot. A tree cannot draw a smooth diagonal without stair-stepping.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
              <span className="font-bold text-rose-900 block font-mono">The Memorization Monster (Overfitting)</span>
              <p className="text-rose-800 leading-relaxed">
                Without constraints, a tree will branch until every single training point sits in its own leaf (100% train accuracy, but fails on new emails). <em>Always prune or set <code className="font-bold">max_depth</code>!</em>
              </p>
            </div>
          </div>

          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/FWlWoMwBYQCnrGETeQMHhAftp69sqC7Cuj3_PywxzJb8SfxOlMYdylzOzWnJDkPClMjFxM4aoGEa3Rth_9LhWT35RnAFXZ7Bnki1NIT4BkplB6XqfA12iUJFPJkYtNvNl6ZwTIgOah9qlh12zLHl8sxdaHiGxFOJl5I8t7nw1VY?purpose=inline"
            title="Decision Trees in Data Science: A Comprehensive Guide"
            sourceUrl="https://medium.com/%40shivasaichakradhar/decision-trees-in-data-science-a-comprehensive-guide-352d980a3503?utm_source=chatgpt.com"
            sourceLabel="medium.com"
            caption="Hierarchical feature splitting tree from root condition to leaf prediction."
          />
        </div>

        {/* ─── ALGORITHM 3: LOGISTIC REGRESSION ─── */}
        <div className="rounded-2xl border-2 border-[#D1FAE5] bg-[#FFFDFE] p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#10B981] text-white text-xs font-mono font-extrabold flex items-center justify-center">
                3
              </span>
              <h3 className="font-extrabold text-lg text-[#1A1020]">Logistic Regression</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
              Probabilistic · Linear Classifier
            </span>
          </div>

          {/* Everyday Analogy */}
          <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#065F46] uppercase tracking-wider">
              <span>💡</span> Everyday Mental Model: The Calibrated Risk Dial / Loan Officer
            </div>
            <p className="text-xs text-[#2D1F33] leading-relaxed">
              Instead of giving a blunt, unhelpful &ldquo;Yes&rdquo; or &ldquo;No&rdquo;, a cautious bank loan officer says: <em>&ldquo;Based on your debt-to-income ratio, there is an <strong>82% probability</strong> you will repay this mortgage.&rdquo;</em> Only after estimating that calibrated probability do you apply a policy threshold to make a final decision.
            </p>
          </div>

          {/* The 2-Stage Engine */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#6D5970] font-mono">
              The 2-Stage Mathematical Engine
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-[#D1FAE5] bg-white space-y-1.5">
                <span className="font-bold text-[#059669] block font-mono">Stage 1: Linear Feature Scoring</span>
                <p className="text-[#4A3B4E]">
                  Computes a weighted linear sum across features. Features that indicate spam get positive weights, legitimate features get negative weights:
                </p>
                <MathBlock formula="z = w_0 + w_1 x_1 + w_2 x_2 + \dots + w_d x_d" />
                <p className="text-[11px] text-[#6D5970]">
                  This raw score <MathInline formula="z" /> can range freely from <MathInline formula="-\infty" /> to <MathInline formula="+\infty" />.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#D1FAE5] bg-white space-y-1.5">
                <span className="font-bold text-[#059669] block font-mono">Stage 2: The Sigmoid Squasher</span>
                <p className="text-[#4A3B4E]">
                  Passes the raw score <MathInline formula="z" /> through the S-shaped <strong>Sigmoid function</strong> to squash it into a valid probability in <MathInline formula="[0, 1]" />:
                </p>
                <MathBlock formula="\sigma(z) = \frac{1}{1 + e^{-z}}" />
                <ul className="text-[11px] space-y-0.5 text-[#6D5970] font-mono">
                  <li>• <MathInline formula="z = 0 \implies P = 0.5" /> (Exact boundary)</li>
                  <li>• <MathInline formula="z \gg 0 \implies P \to 1.0" /> (High confidence spam)</li>
                  <li>• <MathInline formula="z \ll 0 \implies P \to 0.0" /> (High confidence legit)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why called Regression? */}
          <div className="p-3.5 rounded-xl border border-[#F0D6E2] bg-[#FFF7FA] text-xs space-y-1">
            <span className="font-bold text-[#96003B] block">Why is it called &ldquo;Regression&rdquo; if it performs Classification?</span>
            <p className="text-[#4A3B4E] leading-relaxed">
              Because mathematically, it performs linear regression on the continuous <strong>log-odds</strong> (logit) of the positive class:
            </p>
            <MathBlock formula="\ln\left(\frac{P(y=1 \mid x)}{1 - P(y=1 \mid x)}\right) = w^T x + b" />
            <p className="text-[#6D5970]">
              The model regresses log-odds continuously, and turns into a classifier by applying a cutoff threshold: <MathInline formula="\hat{y} = 1 \text{ if } P \ge 0.5" />.
            </p>
          </div>

          {/* Geometry & Limitation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="font-bold text-emerald-900 block font-mono">Boundary Geometry: A Flat Straight Line</span>
              <p className="text-emerald-800 leading-relaxed">
                The decision boundary corresponds to <MathInline formula="z = 0" />, which forms a single straight ruler line in 2D or a flat hyperplane in high dimensions.
              </p>
            </div>
            <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
              <span className="font-bold text-amber-900 block font-mono">Limitation: Linear Separability Only</span>
              <p className="text-amber-800 leading-relaxed">
                Standard Logistic Regression cannot separate circular clusters or XOR distributions without manual feature transformations (e.g. adding interaction terms or polynomials).
              </p>
            </div>
          </div>

          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/vTQqTOnSagekeBgFiMaDTy-movPNzrf1ZRs1jC9Llstq07aJaZSvZEPjFKOe4HRa-zgokbUkiqWHTDIy2XVkYb8OPidq0Nc8aaX4kzUmcyg8q__4kJezSIj0nSOu70ooteROTNQ1w0UwcZBR38sR4oIAri9MU2pCUlcHesvWoiw?purpose=inline"
            title="Logistic Regression Explained: ML Coding for Interviews"
            sourceUrl="https://medium.com/nailing-the-ai-ml-interview/selection-of-the-loss-functions-for-logistic-regression-ed2077f7075e?utm_source=chatgpt.com"
            sourceLabel="medium.com"
            caption="Sigmoid S-curve mapping continuous linear inputs to calibrated probabilities in [0, 1]."
          />
        </div>

        {/* ─── ALGORITHM 4: SUPPORT VECTOR MACHINE (SVM) ─── */}
        <div className="rounded-2xl border-2 border-[#BFDBFE] bg-[#FFFDFE] p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#3B82F6] text-white text-xs font-mono font-extrabold flex items-center justify-center">
                4
              </span>
              <h3 className="font-extrabold text-lg text-[#1A1020]">Support Vector Machine (SVM)</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              Geometric Margin · Kernel Trick
            </span>
          </div>

          {/* Everyday Analogy */}
          <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#1E40AF] uppercase tracking-wider">
              <span>💡</span> Everyday Mental Model: The Widest Highway Between Two Towns
            </div>
            <p className="text-xs text-[#2D1F33] leading-relaxed">
              Many different lines can separate two groups. But SVM specifically finds the <strong>widest possible paved highway</strong> with the largest safety median between them. The houses closest to the fence of the highway are the <strong>Support Vectors</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1">
              <span className="font-bold text-blue-900 block font-mono">The Support Vectors Superpower</span>
              <p className="text-blue-800 leading-relaxed">
                Only the borderline points (Support Vectors) determine where the separating boundary lies. You can shift or remove all other distant training points without altering the model at all!
              </p>
            </div>
            <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1">
              <span className="font-bold text-purple-900 block font-mono">The Kernel Trick</span>
              <p className="text-purple-800 leading-relaxed">
                When points cannot be cut by a straight line in 2D, SVM mathematically projects them into a higher 3D dimension (like popping a flat rubber sheet into a bowl) where a flat sheet can cleanly separate them.
              </p>
            </div>
          </div>
        </div>

        {/* ─── LIVE INTERACTIVE PLAYGROUND ─── */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF2E7E]" />
              <h4 className="font-extrabold text-sm text-[#1A1020]">
                Interactive Lab: Compare Decision Boundaries Live
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#6D5970]">
              Click any algorithm to observe its boundary on the 10-email dataset
            </span>
          </div>
          <p className="text-xs text-[#4A3B4E]">
            Notice how <strong>KNN (K=1)</strong> creates a tight island around noise point E10, while <strong>KNN (K=7)</strong> smoothes it out. Watch how <strong>Decision Trees</strong> draw orthogonal boxes, and <strong>Logistic Regression</strong> draws a clean straight line:
          </p>
          <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-4 shadow-sm">
            <ClassificationPlayground />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 17 — Are all classification models equally suitable?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-17" className="space-y-6 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold border border-[#FFB8D2]">
              SLIDE 17
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Model Selection & The Master Comparison
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            No Free Lunch
          </span>
        </div>

        <div className="p-3.5 bg-[#FFF0F6] rounded-xl border border-[#FFB8D2] font-bold text-sm text-[#FF2E7E] flex items-center gap-2">
          <span>⚡</span>
          <span>Core Takeaway: There is no universally superior classification algorithm.</span>
        </div>

        {/* Master Comparison Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#6D5970] font-mono">
            The Master Algorithm Comparison Matrix
          </h4>
          <CompareTable
            headers={['Algorithm', 'Mental Model', 'Boundary Shape', 'Scaling Needed?', 'Key Strength', 'Main Vulnerability']}
            rows={[
              [
                'K-Nearest Neighbors (KNN)',
                'Majority vote of neighbors',
                'Irregular Voronoi islands',
                'Yes (Essential)',
                'Zero training time; highly intuitive',
                'Slow prediction on large data; dominated by unscaled features',
              ],
              [
                'Decision Tree',
                '20 Questions flowchart',
                'Axis-aligned rectangular boxes',
                'No (Invariant)',
                'High interpretability; handles mixed data',
                'Severe overfitting if depth is unconstrained',
              ],
              [
                'Logistic Regression',
                'Calibrated probability dial',
                'Flat straight line / hyperplane',
                'Recommended',
                'Fast; outputs true calibrated probabilities',
                'Cannot capture non-linear patterns natively',
              ],
              [
                'Support Vector Machine',
                'Widest safety highway',
                'Max-margin hyperplane or curved kernel',
                'Yes (Essential)',
                'Robust against outliers outside margin',
                'Slower training on huge data; hard to interpret',
              ],
            ]}
            highlight={[0, 1, 2]}
          />
        </div>

        {/* Socratic Classroom Questions for Teachers */}
        <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[11px] px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white font-bold">
              TEACHER SCRIPT
            </span>
            <span className="font-bold text-sm text-[#1A1020]">
              Socratic Questions to Ask Your Students During Lecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#FFD6E5] space-y-1">
              <span className="font-bold text-[#FF2E7E] block">Q1: The Noise Point E10 Dilemma</span>
              <p className="text-[#4A3B4E]">
                <em>&ldquo;Look at noise point E10 (Links: 2, Words: 2). What does KNN predict when K=1 versus K=5?&rdquo;</em>
                <br />
                <span className="text-[#6D5970] text-[11px]">→ At K=1, it predicts Spam because it memorizes E10. At K=5, the 4 surrounding legitimate emails outvote it!</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#FFD6E5] space-y-1">
              <span className="font-bold text-[#8B5CF6] block">Q2: The Diagonal Boundary Riddle</span>
              <p className="text-[#4A3B4E]">
                <em>&ldquo;Can a standard Decision Tree ever draw a smooth 45-degree diagonal line?&rdquo;</em>
                <br />
                <span className="text-[#6D5970] text-[11px]">→ No! Every tree split tests only one feature (<MathInline formula="x_i \ge c" />). It must stair-step horizontally and vertically.</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#FFD6E5] space-y-1">
              <span className="font-bold text-[#10B981] block">Q3: Why Not Plain Linear Regression?</span>
              <p className="text-[#4A3B4E]">
                <em>&ldquo;Why can&apos;t we just use regular Linear Regression for spam classification?&rdquo;</em>
                <br />
                <span className="text-[#6D5970] text-[11px]">→ Linear regression outputs numbers like -3.5 or +14.2, which make no sense as probabilities! The Sigmoid function is required to bound scores between 0 and 1.</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#FFD6E5] space-y-1">
              <span className="font-bold text-[#3B82F6] block">Q4: The Feature Scale Test</span>
              <p className="text-[#4A3B4E]">
                <em>&ldquo;If we multiply the Links feature by 1,000, which algorithm changes: KNN or Decision Tree?&rdquo;</em>
                <br />
                <span className="text-[#6D5970] text-[11px]">→ KNN drastically changes (distance calculation is hijacked). The Decision Tree doesn&apos;t change at all because ordering remains identical!</span>
              </p>
            </div>
          </div>
        </div>

        {/* Final Insight Callout */}
        <Callout type="tip" title="Rule of Thumb for Model Selection">
          <div className="space-y-1.5 text-xs md:text-sm">
            <p>
              When starting a new real-world classification project:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Start with <strong>Logistic Regression</strong> as a lightning-fast, interpretable baseline.</li>
              <li>Try a <strong>Decision Tree</strong> (or an ensemble of trees like Random Forest) if you have non-linear feature interactions and need explainable rules.</li>
              <li>Use <strong>KNN</strong> for quick prototypes on small, clean, standardized datasets where similarity clustering is natural.</li>
              <li>Use <strong>SVM</strong> when dealing with high-dimensional spaces (e.g. text or bioinformatics) where margin robustness is paramount.</li>
            </ul>
          </div>
        </Callout>
      </section>
    </div>
  );
}
