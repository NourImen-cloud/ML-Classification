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
      <section id="slide-16" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold border border-[#FFB8D2]">
              SLIDE 16
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Introducing the classification algorithms
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Three Approaches
          </span>
        </div>

        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            We have now established the central problem: We have observations, each described by features, and we want to predict their classes.
          </p>
          <p className="font-semibold text-[#1A1020]">
            But how does a model actually learn the relationship between features and labels?
          </p>
          <p>
            There is no single method for solving this problem. Different classification algorithms use different mathematical approaches to learn classification rules. We will focus on three fundamental algorithms:
          </p>
        </div>

        {/* 3 Core Algorithms with Verified Citations & Visuals */}
        <div className="space-y-6">
          {/* 1. KNN */}
          <div className="space-y-2 p-4 rounded-xl border border-[#F0D6E2] bg-white">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#FF2E7E] text-xs font-mono font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-extrabold text-base text-[#1A1020]">K-Nearest Neighbors (KNN)</h3>
            </div>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              KNN classifies a new observation by examining the classes of the nearest training observations. Its central idea is that observations that are close to one another in feature space may share similar labels.
            </p>
            <ExternalImageCard
              src="https://images.openai.com/static-rsc-4/-UxuLGqx3F4IE4CFtz2MBhNlq5tNtY98hggMQbLO19QRdY5RfG5ZJ55iRNjG9VPDm1L1vVsQ8h4BdbhUw0HJITBhjbjxl4KdrH_AzCLyTy_sVlbze_M1nYkPoaIiQwiIDfr7GZCjPPeST4Ubd1kgYHzfuWYp-unUPbJKlIq-WUQ?purpose=inline"
              title="K-Nearest Neighbors (KNN): A Simple Yet Powerful Machine Learning Algorithm"
              sourceUrl="https://medium.com/%40ruhelasamridhi/k-nearest-neighbors-knn-a-simple-yet-powerful-machine-learning-algorithm-c3a3bd83057a?utm_source=chatgpt.com"
              sourceLabel="medium.com"
              caption="KNN voting radius: determining class assignment by Euclidean neighborhood."
            />
          </div>

          {/* 2. Decision Trees */}
          <div className="space-y-2 p-4 rounded-xl border border-[#F0D6E2] bg-white">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#8B5CF6] text-xs font-mono font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-extrabold text-base text-[#1A1020]">Decision Trees</h3>
            </div>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Decision Trees classify observations by applying a sequence of feature-based decision rules. Each internal node represents a test, each branch represents an outcome, and each leaf represents a predicted class.
            </p>
            <ExternalImageCard
              src="https://images.openai.com/static-rsc-4/FWlWoMwBYQCnrGETeQMHhAftp69sqC7Cuj3_PywxzJb8SfxOlMYdylzOzWnJDkPClMjFxM4aoGEa3Rth_9LhWT35RnAFXZ7Bnki1NIT4BkplB6XqfA12iUJFPJkYtNvNl6ZwTIgOah9qlh12zLHl8sxdaHiGxFOJl5I8t7nw1VY?purpose=inline"
              title="Decision Trees in Data Science: A Comprehensive Guide"
              sourceUrl="https://medium.com/%40shivasaichakradhar/decision-trees-in-data-science-a-comprehensive-guide-352d980a3503?utm_source=chatgpt.com"
              sourceLabel="medium.com"
              caption="Hierarchical feature splitting tree from root condition to leaf prediction."
            />
          </div>

          {/* 3. Logistic Regression */}
          <div className="space-y-2 p-4 rounded-xl border border-[#F0D6E2] bg-white">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#10B981] text-xs font-mono font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-extrabold text-base text-[#1A1020]">Logistic Regression</h3>
            </div>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Logistic Regression uses a mathematical function to estimate the probability of a class based on the input features. For binary classification, it commonly uses the sigmoid function to transform a linear score into a value between zero and one.
            </p>
            <ExternalImageCard
              src="https://images.openai.com/static-rsc-4/vTQqTOnSagekeBgFiMaDTy-movPNzrf1ZRs1jC9Llstq07aJaZSvZEPjFKOe4HRa-zgokbUkiqWHTDIy2XVkYb8OPidq0Nc8aaX4kzUmcyg8q__4kJezSIj0nSOu70ooteROTNQ1w0UwcZBR38sR4oIAri9MU2pCUlcHesvWoiw?purpose=inline"
              title="Logistic Regression Explained: ML Coding for Interviews"
              sourceUrl="https://medium.com/nailing-the-ai-ml-interview/selection-of-the-loss-functions-for-logistic-regression-ed2077f7075e?utm_source=chatgpt.com"
              sourceLabel="medium.com"
              caption="Sigmoid S-curve mapping continuous linear inputs to calibrated probabilities in [0, 1]."
            />
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              All three algorithms can solve classification problems, but they learn in different ways:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>KNN</strong> relies on distances between observations.</li>
              <li><strong>Decision Trees</strong> rely on decision rules and feature-based splits.</li>
              <li><strong>Logistic Regression</strong> learns numerical parameters that determine how input features influence the predicted probability.</li>
            </ul>
            <p>
              This is why understanding the classification problem first is important. Once students understand what the algorithms are trying to achieve, the differences between their mathematical approaches become much easier to understand.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 17 — Are all classification models equally suitable?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-17" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold border border-[#FFB8D2]">
              SLIDE 17
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Are all classification models equally suitable?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Model Selection
          </span>
        </div>

        <div className="p-3 bg-[#FFF0F6] rounded-xl border border-[#FFB8D2] font-bold text-sm text-[#FF2E7E]">
          No. There is no single universally best classification algorithm.
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            The choice of classification algorithm depends on several characteristics of the problem, including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">The size of the dataset</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">The number and nature of the features</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">Linear vs. complex nonlinear relationships</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">Interpretability and audit requirements</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">Computational resources available</div>
            <div className="p-2.5 bg-white rounded-lg border border-[#F0D6E2]">Relative consequences of error types</div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs uppercase text-[#6D5970] tracking-wider font-mono">
              Model Tradeoffs Summary
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#FFF7FA] rounded-lg border border-[#FFD6E5]">
                <strong className="text-[#FF2E7E] block mb-1">K-Nearest Neighbors (KNN):</strong>
                Useful for understanding classification through similarity and distance, but can become computationally expensive when making predictions on very large datasets.
              </div>
              <div className="p-3 bg-[#FFF7FA] rounded-lg border border-[#FFD6E5]">
                <strong className="text-[#8B5CF6] block mb-1">Decision Trees:</strong>
                Produce understandable decision rules, but an excessively complex or deep tree may memorize the training examples (overfitting).
              </div>
              <div className="p-3 bg-[#FFF7FA] rounded-lg border border-[#FFD6E5]">
                <strong className="text-[#10B981] block mb-1">Logistic Regression:</strong>
                Provides a relatively simple, fast mathematical model, but its standard form may not capture complex nonlinear relationships without additional feature transformations.
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              There is no universally best classification algorithm for every problem. A model that performs well on one dataset may perform poorly on another.
            </p>
            <p>
              Therefore, selecting a classifier requires understanding the data, the task and the evaluation criteria.
            </p>
            <KeyInsight>
              This also introduces the idea that we should <strong>compare models using appropriate evaluation methods</strong> rather than choosing one simply because it is popular.
            </KeyInsight>
          </div>
        </Callout>
      </section>
    </div>
  );
}
