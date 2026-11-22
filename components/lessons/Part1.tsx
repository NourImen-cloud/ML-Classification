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
import {
  EmailRevealWidget,
  TraditionalVsMlDiagram,
  ModelPipelineVisual,
  MatrixVectorConnectWidget,
} from '@/components/interactive/CurriculumVisuals';
import {
  CheckCircle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Brain,
  Code,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function Part1() {
  // State for interactive student questions
  const [showQ1Answer, setShowQ1Answer] = useState(false);
  const [showQ2Answer, setShowQ2Answer] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-12">
      {/* ─── Part Header ─── */}
      <SectionHeader
        part={1}
        time="Part I · Slides 1–11"
        title="Part I — Understanding the classification problem"
        subtitle="From understanding the problem to understanding how machines learn to assign categories."
      />

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 1 — Can computers make decisions?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-1" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 01
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Can computers make decisions?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Motivation
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Imagine receiving hundreds of emails every day. Some contain useful information, while others are unwanted or potentially harmful.
          </p>
          <p className="font-semibold text-[#1A1020]">
            How can an email service automatically distinguish between them?
          </p>
          <p>Consider three examples:</p>
          <ul className="list-disc pl-5 space-y-1.5 font-mono text-xs text-[#1A1020]">
            <li>&quot;Your university examination schedule has been published.&quot;</li>
            <li>&quot;Congratulations! You have won a free prize. Claim it now!&quot;</li>
            <li>&quot;Your package is ready for delivery.&quot;</li>
          </ul>
          <p>
            A human can usually identify which messages are suspicious by examining their content. But how can a computer perform this task automatically, especially when millions of messages arrive every day?
          </p>
          <p className="font-bold text-[#FF2E7E]">
            This is where Machine Learning becomes useful.
          </p>
        </div>

        {/* Interactive Classroom Visual */}
        <EmailRevealWidget />

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              The central problem is not simply reading an email. It is <strong>making a decision based on available information</strong>.
            </p>
            <p>
              We want the computer to examine an email and assign it to a meaningful category. Instead of manually writing rules for every possible email, we can provide the computer with examples of previously classified emails and allow a learning algorithm to discover useful patterns.
            </p>
            <p>
              The resulting system can then classify emails it has never encountered before. This is an example of a Machine Learning task called <strong>classification</strong>.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 2 — What is Machine Learning?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-2" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 02
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              What is Machine Learning?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Foundations
          </span>
        </div>

        <p className="text-xs text-[#6D5970] italic">
          Before defining classification, students need to understand the broader concept of Machine Learning.
        </p>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            <strong>Machine Learning</strong> is a field of Artificial Intelligence that focuses on developing algorithms that enable computers to learn patterns from data and use those patterns to make predictions or decisions, without explicitly programming every individual decision.
          </p>
          <p>
            Traditional programming and Machine Learning approach problems differently:
          </p>
        </div>

        {/* Visual Comparison: Traditional vs ML */}
        <TraditionalVsMlDiagram />

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              In traditional programming, a developer explicitly writes instructions describing how a system should behave.
            </p>
            <p>
              For example, a simple spam filter could be programmed with a rule such as:
              <br />
              <code className="text-[#FF2E7E] font-mono font-bold bg-[#FFE4EF] px-2 py-0.5 rounded">
                &quot;If an email contains more than five suspicious words, classify it as spam.&quot;
              </code>
            </p>
            <p>
              However, real spam detection is much more complicated. Some legitimate emails contain suspicious-looking words, and some spam messages do not contain any obvious suspicious terms.
            </p>
            <p>
              Writing and maintaining all the necessary rules becomes difficult.
            </p>
            <p>
              Machine Learning provides another approach: instead of manually defining every decision rule, we give a learning algorithm examples and allow it to learn relationships between the input information and the desired output.
            </p>
            <p>
              The algorithm uses the examples to construct a model. That model can then make predictions about new data.
            </p>
          </div>
        </Callout>

        {/* Important Terminology */}
        <div className="rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] p-4 space-y-3">
          <h4 className="font-extrabold text-sm text-[#96003B] font-mono uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF2E7E]" />
            Important Terminology
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
              <strong className="text-[#1A1020] block mb-1">Data:</strong>
              Information provided to the learning system.
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
              <strong className="text-[#1A1020] block mb-1">Algorithm:</strong>
              The procedure used to learn patterns from data.
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
              <strong className="text-[#1A1020] block mb-1">Model:</strong>
              The learned mathematical representation resulting from training.
            </div>
            <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
              <strong className="text-[#1A1020] block mb-1">Prediction:</strong>
              The output produced when the trained model receives new input.
            </div>
          </div>
          <KeyInsight>
            An algorithm and a model are not the same thing. The algorithm is used to construct the model; the model is what makes predictions after training.
          </KeyInsight>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 3 — What is classification?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-3" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 03
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              What is classification?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Definition
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            <strong>Classification</strong> is a supervised Machine Learning task in which a model learns from labeled training examples to assign new observations to one of a predefined set of discrete categories, called <strong>classes</strong>.
          </p>
          <p>
            In simpler terms, classification answers the question:
            <br />
            <span className="font-bold text-base text-[#1A1020] italic">
              &quot;Which category does this observation belong to?&quot;
            </span>
          </p>
        </div>

        {/* Examples Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs uppercase text-[#6D5970] tracking-wider font-mono">
            Classification Examples Across Domains
          </h4>
          <CompareTable
            headers={['Observation', 'Possible Classification']}
            rows={[
              ['Email', 'Spam / Not Spam'],
              ['Photograph', 'Cat / Dog'],
              ['Transaction', 'Fraudulent / Legitimate'],
              ['News article', 'Politics / Sports / Technology'],
              ['Student result', 'Pass / Fail'],
            ]}
          />
        </div>

        {/* Mathematical Formulation */}
        <div className="rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] p-5 space-y-3">
          <h4 className="font-extrabold text-sm text-[#96003B] font-mono uppercase tracking-wider">
            Mathematical Formulation
          </h4>
          <p className="text-xs text-[#4A3B4E]">
            A classification model learns a function:
          </p>
          <MathBlock formula="f: X \rightarrow C" label="Classification Mapping" />
          <p className="text-xs text-[#4A3B4E]">Where:</p>
          <ul className="list-disc pl-5 text-xs text-[#4A3B4E] space-y-1">
            <li><MathInline formula="X" /> represents the input feature space.</li>
            <li><MathInline formula="C" /> represents the set of possible classes.</li>
            <li><MathInline formula="f" /> represents the learned classification function.</li>
          </ul>

          <p className="text-xs text-[#4A3B4E] pt-2">For spam detection:</p>
          <MathBlock formula="C = \{\text{Spam}, \text{Not Spam}\}" label="Binary Classes Set" />

          <p className="text-xs text-[#4A3B4E]">
            Given an email represented by its characteristics <MathInline formula="x" />, the model predicts:
          </p>
          <MathBlock formula="\hat{y} = f(x)" label="Predicted Class" />

          <p className="text-xs text-[#6D5970]">
            Here, <MathInline formula="\hat{y}" /> represents the predicted class. The symbol <MathInline formula="\hat{y}" /> is read as <strong>&quot;y-hat&quot;</strong> and indicates a prediction rather than the true label.
          </p>
        </div>

        {/* Visual: Email enters model and exits with label */}
        <ModelPipelineVisual />

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              The key idea is that classification produces a <strong>categorical output</strong>.
            </p>
            <p>
              The model does not necessarily need to understand the semantic meaning of an email as a human would. It learns relationships between the information it receives and the categories represented in its training data.
            </p>
            <p>
              For example, if the model has seen many spam emails containing suspicious links, it may learn that the presence of similar characteristics is associated with spam. When a new email arrives, it uses the patterns it learned to predict its category.
            </p>
            <p>
              Notice that the possible classes are defined by the problem. A spam classifier is not expected to invent completely new categories such as &quot;advertisement&quot; or &quot;personal message&quot; unless the task has been designed to support them.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 4 — Classification is a supervised learning task
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-4" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 04
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Classification is a supervised learning task
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Supervised Learning
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Classification is generally studied under <strong>supervised learning</strong>.
          </p>
          <p>
            <strong>Supervised learning</strong> is a Machine Learning paradigm in which an algorithm learns a relationship between input data and corresponding known target outputs using a collection of <strong>labeled examples</strong>.
          </p>
          <p>A labeled example contains:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>An input observation.</li>
            <li>Its corresponding correct output.</li>
          </ul>
        </div>

        {/* Labeled Examples Table */}
        <CompareTable
          headers={['Email', 'Contains Links', 'Suspicious Words', 'Correct Label']}
          rows={[
            ['E1', '5', '4', 'Spam'],
            ['E2', '0', '0', 'Not Spam'],
            ['E3', '3', '2', 'Spam'],
            ['E4', '1', '0', 'Not Spam'],
          ]}
        />
        <p className="text-xs text-[#6D5970] italic">
          The correct labels provide the information needed to learn the classification task.
        </p>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              Imagine teaching a child to distinguish cats from dogs. You show the child several pictures and tell them which pictures contain cats and which contain dogs. After observing enough examples, the child begins to recognize characteristics that help distinguish the two animals.
            </p>
            <p>
              Supervised learning follows a similar idea: The learning algorithm receives examples where the correct answer is already known. It uses these examples to learn a mapping between inputs and outputs.
            </p>
            <p>
              The crucial difference between training and prediction is that the correct answer is available during training but is <strong>not normally available when the model receives a new observation</strong>.
            </p>
          </div>
        </Callout>

        {/* Interactive Classroom Question */}
        <div className="p-4 rounded-xl border-2 border-[#FFB8D2] bg-[#FFF7FA] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider">
              Question to ask students
            </span>
            <button
              onClick={() => setShowQ1Answer(!showQ1Answer)}
              className="text-xs font-bold px-3 py-1 rounded bg-[#FFE4EF] text-[#FF2E7E] hover:bg-[#FFD6E5] transition-colors"
            >
              {showQ1Answer ? 'Hide Answer' : 'Reveal Answer'}
            </button>
          </div>
          <p className="text-sm font-semibold text-[#1A1020]">
            &quot;If we give a model 1,000 emails but none of them has a Spam or Not Spam label, are we performing supervised classification?&quot;
          </p>
          {showQ1Answer && (
            <div className="p-3 bg-white rounded-lg border border-[#FFD6E5] text-xs text-[#1A1020] animate-fadeIn">
              <strong>Answer:</strong> <strong>No.</strong> Without known target labels, we do not have the labeled examples required for supervised classification. We may instead be dealing with an <strong>unsupervised learning</strong> problem, such as clustering.
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 5 — Where is classification used?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-5" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 05
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Where is classification used?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Applications
          </span>
        </div>

        <p className="text-sm text-[#4A3B4E]">
          Classification is not limited to spam detection. It is used across many fields whenever a system needs to assign observations to categories.
        </p>

        {/* 5 Real-world Applications with Verified Images and Links */}
        <div className="space-y-6">
          {/* 1. Healthcare */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-[#1A1020] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#FF2E7E] text-xs font-mono font-bold flex items-center justify-center">
                1
              </span>
              Healthcare — Medical Image Classification
            </h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              A model can analyze medical images and classify them into predefined categories, such as images showing certain findings or images without those findings. For example, a system may be trained using labeled chest X-ray images to identify patterns associated with pneumonia. The model&apos;s prediction can assist medical professionals, but it does not replace clinical diagnosis.
            </p>
            <ExternalImageCard
              src="https://images.openai.com/static-rsc-4/PpOjhToohH-w8SF_-MXE1NhVI4NhMxJ3fAB3xT9GHD1HcS6REHF3B72GsZwtfcizMJ9KOtA8wwR3wUP3w67hz66bm5l0SxeobaNao9I5OxyLu5PrMNCceM2kF0-iSbyN5Na_9bAp_zefqmUk465EmQwK8ll94HYdxt6Q7ByxTzg?purpose=inline"
              title="Rayscape | Radiology AI"
              sourceUrl="https://rayscape.ai/customer-story?id=Zw0XzBEAAC0Ae4u3&utm_source=chatgpt.com"
              sourceLabel="rayscape.ai"
              caption="Radiological AI analyzing chest X-rays to assist clinician classification decisions."
            />
          </div>

          {/* 2. Finance */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-[#1A1020] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#FF2E7E] text-xs font-mono font-bold flex items-center justify-center">
                2
              </span>
              Finance — Fraud Detection
            </h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Financial institutions process enormous numbers of transactions. A classification model can examine transaction characteristics, such as transaction amount, location, time and historical behavior, to estimate whether a transaction belongs to the fraudulent or legitimate category. The result can be used to flag suspicious transactions for further review.
            </p>
            <ExternalImageCard
              src="https://images.openai.com/static-rsc-4/QtYxMBXeDUtZ30hZYYZycTmQ8yYlGj_lOseZcjJ-HtVHfg_KZ78KuWBLrX21qw5bMOZzsMPGvz3_uAudnARZf027DVN56bzn3ry2FnWH_ihrAzkBARrgtEd49WmEgb8_wk3hIHMf3edCviQbRVsuE4-ySHxlbAwPEPkywVlHgS0?purpose=inline"
              title="Detecting Fraud with Machine Learning: A Practical Project from Start to Finish"
              sourceUrl="https://medium.com/%40jovitalanka/detecting-fraud-with-machine-learning-a-practical-project-from-start-to-finish-6d07fb606b7a?utm_source=chatgpt.com"
              sourceLabel="medium.com"
              caption="Financial fraud classification architecture analyzing real-time banking transactions."
            />
          </div>

          {/* 3. Computer Vision */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-[#1A1020] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#FF2E7E] text-xs font-mono font-bold flex items-center justify-center">
                3
              </span>
              Computer Vision — Image Recognition
            </h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              An image classification model can identify the main category represented in an image. For example, a model trained on labeled images of cats, dogs and birds can learn patterns that help it classify new images.
            </p>
            <ExternalImageCard
              src="https://images.openai.com/static-rsc-4/s9bQ5g-6erqYZJvpD6VLHlc-0UI7UyKfbO9WoCqEyNflxpPb6k16jLHOuBqUGSqg0r_oizEnxzv67ybyBhJB29kWXnhz9uCZsOIL6_xhKhnEOeYMPEIVW2dqu4FzCq06Ajx2TV3Hbb8EpEczFgap7ZpWsgIsRyVQTJXYRcDaroc?purpose=inline"
              title="A technical deep dive into image classification - Appwrite"
              sourceUrl="https://appwrite.io/blog/post/image-classification?utm_source=chatgpt.com"
              sourceLabel="appwrite.io"
              caption="Feature extraction and convolutional image classification across visual categories."
            />
          </div>

          {/* 4. Natural Language Processing */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-[#1A1020] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#FF2E7E] text-xs font-mono font-bold flex items-center justify-center">
                4
              </span>
              Natural Language Processing — Sentiment Analysis
            </h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Sentiment analysis involves determining the emotional orientation expressed in text. A model may classify customer reviews into positive, negative or neutral categories.
            </p>
            <div className="p-3 bg-[#FFF7FA] rounded-lg border border-[#F0D6E2] text-xs space-y-1 font-mono">
              <p>&quot;The application is extremely useful.&quot; → <strong className="text-emerald-600">Positive</strong></p>
              <p>&quot;The service was disappointing.&quot; → <strong className="text-rose-600">Negative</strong></p>
              <p>&quot;The package arrived yesterday.&quot; → <strong className="text-gray-600">Neutral</strong></p>
            </div>
            <ExternalImageCard
              src="https://images.openai.com/static-rsc-4/N4QUQSXeZlRaQan-_W1JHANg7TgNJK1Yak6dXyZDWBFyqqnry9UfrtATik9cKIYMDaLHDg-YYKG7Pj605cHllqydNNjjKxfGRKIWEUOgp6lBtpc_BwueXT_xWY8fTQpanZLoEeqa4aosU7d3DLZ-RAWq8_oA7eYy4P0bI8OVOJE?purpose=inline"
              title="Natural Language Processing (NLP) [A Complete Guide]"
              sourceUrl="https://www.deeplearning.ai/resources/natural-language-processing?utm_source=chatgpt.com"
              sourceLabel="deeplearning.ai"
              caption="Tokenization, semantic embeddings, and text classification workflows."
            />
          </div>

          {/* 5. Cybersecurity */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-[#1A1020] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#FF2E7E] text-xs font-mono font-bold flex items-center justify-center">
                5
              </span>
              Cybersecurity — Malicious Activity Detection
            </h3>
            <p className="text-xs text-[#4A3B4E] leading-relaxed">
              Classification can help identify whether network traffic or other security observations resemble known categories of activity, such as benign or suspicious behavior.
            </p>
            <ExternalImageCard
              src="https://images.openai.com/static-rsc-4/CHONlnZ7J2kjCOYtQToEqMIg_4LfJ66uteUVqfMKA_ioMaNuKC4vxLl-dDJDOGCrIOvd0-kZxqBXPS2i_AV-3srZw-I4CXoh684vdKL6uvkcqTCZBw3hkCZ-bJtxTWV8wgaN3omugPwNtfXA8dBy8M_llAVPVBrg4JSUBCLLiy8?purpose=inline"
              title="Aman Gautam — Developer Portfolio & Security Classification"
              sourceUrl="https://aman9673.github.io/?utm_source=chatgpt.com"
              sourceLabel="aman9673.github.io"
              caption="Network traffic telemetry and classification into benign vs. anomalous threat packets."
            />
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              Although these applications belong to different fields, they share the same underlying structure: <strong>the model receives information about an observation and predicts which predefined category best describes it</strong>.
            </p>
            <p>
              The input data and the features may differ significantly, but the mathematical learning problem remains related.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 6 — Classification vs. Regression
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-6" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 06
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Classification vs. Regression
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Comparison
          </span>
        </div>

        <p className="text-sm text-[#4A3B4E]">
          Classification and regression are two major types of supervised learning. Both learn from examples, but they differ in the kind of output they predict.
        </p>

        {/* House Dataset Example */}
        <div className="rounded-xl border border-[#F0D6E2] bg-[#FFF7FA] p-4 space-y-3">
          <p className="text-xs text-[#1A1020] font-semibold">
            Consider a dataset containing information about houses, including their surface area, number of bedrooms and location. We can use this information to formulate two different prediction problems:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
              <span className="font-pixel text-[10px] text-blue-600 font-bold block mb-1">
                PROBLEM A: REGRESSION
              </span>
              <p className="font-bold text-[#1A1020] mb-1">Predicting the price of a house</p>
              <p className="text-gray-600 mb-2">
                A real estate company wants to estimate the selling price of a house based on its characteristics.
              </p>
              <div className="font-mono bg-blue-50 text-blue-900 p-2 rounded border border-blue-200">
                (120m², 3 bedrooms) → $180,000
              </div>
              <p className="text-[11px] text-gray-500 mt-2">
                The output is a <strong>numerical quantity</strong>.
              </p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#F0D6E2]">
              <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold block mb-1">
                PROBLEM B: CLASSIFICATION
              </span>
              <p className="font-bold text-[#1A1020] mb-1">Predicting the price category of a house</p>
              <p className="text-gray-600 mb-2">
                The same company wants to determine whether a house belongs to the low, medium or high price category.
              </p>
              <div className="font-mono bg-[#FFF0F6] text-[#96003B] p-2 rounded border border-[#FFB8D2]">
                (120m², 3 bedrooms) → Medium
              </div>
              <p className="text-[11px] text-gray-500 mt-2">
                The output is a <strong>discrete category</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Formal Comparison Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs uppercase text-[#6D5970] tracking-wider font-mono">
            Formal Property Comparison
          </h4>
          <CompareTable
            headers={['Property', 'Classification', 'Regression']}
            rows={[
              ['Objective', 'Predict a category', 'Predict a numerical value'],
              ['Output', 'Discrete class', 'Continuous or numerical quantity'],
              ['Example', 'Spam / Not Spam', 'House price ($180,000)'],
              ['Another example', 'Cat / Dog / Bird', 'Temperature (23.4°C)'],
              ['Typical evaluation', 'Accuracy, Precision, Recall, F1', 'MAE, MSE, RMSE'],
            ]}
          />
        </div>

        {/* Mathematical Formulations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
          <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#FFD6E5]">
            <span className="text-[11px] font-mono font-bold text-[#FF2E7E] uppercase block mb-1">
              Classification Mapping
            </span>
            <MathBlock formula="f: X \rightarrow C" />
            <p className="text-[11px] text-[#6D5970]">
              <MathInline formula="C" /> represents a set of discrete classes.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200">
            <span className="text-[11px] font-mono font-bold text-blue-600 uppercase block mb-1">
              Regression Mapping
            </span>
            <MathBlock formula="f: X \rightarrow \mathbb{R}" />
            <p className="text-[11px] text-[#6D5970]">
              <MathInline formula="\mathbb{R}" /> represents real-valued continuous output space.
            </p>
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              The difference is not determined by the input data. <strong>The same features can be used for either task</strong>.
            </p>
            <p>
              For example, surface area and number of bedrooms can be used to predict an exact house price, which is regression, or to predict a house price category, which is classification. The difference comes from what we want the model to predict.
            </p>
            <p>
              One subtle point: some regression targets are integers or other discrete-looking numbers, and some classification models produce numerical probabilities. What matters is the nature of the prediction target and the problem formulation, not simply whether a number appears somewhere in the output.
            </p>
          </div>
        </Callout>

        {/* Interactive Question for Students */}
        <div className="p-4 rounded-xl border-2 border-[#FFB8D2] bg-[#FFF7FA] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider">
              Question to ask students
            </span>
            <button
              onClick={() => setShowQ2Answer(!showQ2Answer)}
              className="text-xs font-bold px-3 py-1 rounded bg-[#FFE4EF] text-[#FF2E7E] hover:bg-[#FFD6E5] transition-colors"
            >
              {showQ2Answer ? 'Hide Answers' : 'Reveal Answers'}
            </button>
          </div>
          <div className="text-xs text-[#1A1020] space-y-2">
            <p className="font-semibold">
              1. A university wants to predict the final grade of a student as a numerical score out of 20. Is this classification or regression?
            </p>
            <p className="font-semibold">
              2. What if the university wants to predict whether the student will Pass or Fail?
            </p>
          </div>
          {showQ2Answer && (
            <div className="p-3 bg-white rounded-lg border border-[#FFD6E5] text-xs text-[#1A1020] space-y-1.5 animate-fadeIn">
              <p>
                <strong>1. It is regression:</strong> The output is a numerical score along a continuous/graded scale.
              </p>
              <p>
                <strong>2. It is classification:</strong> The output is a discrete category (<MathInline formula="C = \{\text{Pass}, \text{Fail}\}" />).
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 7 — Types of classification problems
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-7" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 07
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Types of classification problems
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Formulations
          </span>
        </div>

        <p className="text-sm text-[#4A3B4E]">
          Not every classification problem involves only two possible classes. Depending on the number of possible categories and whether several categories can apply to the same observation, classification problems can be formulated in different ways.
        </p>
        <p className="text-xs font-semibold text-[#1A1020]">
          We distinguish three important types: <strong>binary classification</strong>, <strong>multiclass classification</strong> and <strong>multilabel classification</strong>.
        </p>

        {/* A. Binary Classification */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
              A
            </span>
            <h3 className="font-extrabold text-base text-[#1A1020]">Binary Classification</h3>
          </div>
          <p className="text-xs text-[#4A3B4E] leading-relaxed">
            Binary classification is a classification problem in which each observation is assigned to one of exactly two possible classes.
          </p>
          <MathBlock formula="C = \{c_0, c_1\}" label="Binary Classes Formulation" />
          <p className="text-xs text-[#6D5970]">
            Examples: Spam or Not Spam, Fraudulent or Legitimate, Positive or Negative, Pass or Fail.
          </p>
          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/yLtliKaNSKjU6YjXfVABHErDMXpc1NVhoSh3vzwTXf84XphFwT3_ZO-rigUV1-4MAsJJms0NJFNcyRRkM-Id_o9fhBWQR5eqfWQk5-fvDf3gxiuA49jE02UGL4LIcFiqNd3lFnWm7kHwBko1d6NHlkfbf6YDcx-RJ0AmGuWmo18?purpose=inline"
            title="8 Classification – Intelligence Artificielle"
            sourceUrl="https://members.loria.fr/FLauer/files/ia/classification.html?utm_source=chatgpt.com"
            sourceLabel="members.loria.fr"
            caption="Geometric partition of binary classes separated by a hyper-plane."
          />
          <div className="p-3 rounded-lg bg-[#FFF7FA] border border-[#F0D6E2] text-xs space-y-1">
            <strong className="text-[#1A1020]">Class Encodings:</strong> In binary classification, the two categories are often represented numerically as 0 and 1:
            <MathBlock formula="0 = \text{Not Spam}, \qquad 1 = \text{Spam}" />
            <span className="text-gray-500 italic block">
              These numerical representations are called class encodings. They do not mean that Spam is mathematically greater than Not Spam.
            </span>
          </div>
        </div>

        {/* B. Multiclass Classification */}
        <div className="space-y-3 pt-4 border-t border-[#F0D6E2]">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#8B5CF6] font-bold">
              B
            </span>
            <h3 className="font-extrabold text-base text-[#1A1020]">Multiclass Classification</h3>
          </div>
          <p className="text-xs text-[#4A3B4E] leading-relaxed">
            Multiclass classification is a classification problem in which each observation is assigned to <strong>exactly one class</strong> from a set containing more than two possible classes.
          </p>
          <MathBlock formula="C = \{c_1, c_2, \dots, c_k\}, \quad k > 2" label="Multiclass Formulation" />
          <p className="text-xs text-[#6D5970]">
            Example: an animal recognition system with <MathInline formula="C = \{\text{Cat}, \text{Dog}, \text{Bird}\}" />.
          </p>
          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/hDxDUyFVCvrwQ2p65DavPqqolpO8uAQWVw_wOgVqGOBqSh5tvHUckux9N18SlXcQwPqtgdWUXmlsnqinXy_QkINXnLHm3AuMP41yBg3qR9opCX6w6M1oK9v0BiBfJp_fTs2gb1E_wMFCDgR5VdT3rT3K3TKg3-1zYcPimySdWyE?purpose=inline"
            title="Data Visualization for Machine Learning | TDS Archive"
            sourceUrl="https://medium.com/data-science/data-visualization-for-machine-learning-d1f906664f56?utm_source=chatgpt.com"
            sourceLabel="medium.com"
            caption="Multiclass visual separation across multiple distinct clusters."
          />
          <p className="text-xs text-[#4A3B4E]">
            The classes are <strong>mutually exclusive</strong> in this formulation: each image receives one predicted class. Other examples include handwritten digit recognition (digits 0 to 9) and news topic categorization.
          </p>
        </div>

        {/* C. Multilabel Classification */}
        <div className="space-y-3 pt-4 border-t border-[#F0D6E2]">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#10B981] font-bold">
              C
            </span>
            <h3 className="font-extrabold text-base text-[#1A1020]">Multilabel Classification</h3>
          </div>
          <p className="text-xs text-[#4A3B4E] leading-relaxed">
            Multilabel classification is a classification problem in which <strong>one observation can be associated with several labels simultaneously</strong>. Unlike multiclass classification, an observation is not restricted to belonging to only one class.
          </p>
          <p className="text-xs text-[#4A3B4E]">
            Consider an image containing a beach, a person and a dog. The model may assign all three labels:
          </p>
          <MathBlock formula="Y = \{\text{Beach}, \text{Person}, \text{Dog}\}" label="Simultaneous Multilabel Set" />
          <ExternalImageCard
            src="https://images.openai.com/static-rsc-4/nBsCsknNCCeFX1ebubcaAFZkwRoDaivEfNzQqD5tP3Om7Q9S0JOTnptFsYxVrVkmieslBLnU6IvNHEQ9kv3EYp7QQqSIGuF4sWpt3w1pBd1K-VPw4XxtjlEMu-SirpUXT0mCKtq39iDJGLAp0-RJONYX_bYScYK3j1bqcmiPfFY?purpose=inline"
            title="Alibaba Adds Visual Understanding to Open-Source Generative AI Large Language Models"
            sourceUrl="https://voicebot.ai/2023/08/28/alibaba-adds-visual-understanding-to-open-source-generative-ai-large-language-models/?utm_source=chatgpt.com"
            sourceLabel="voicebot.ai"
            caption="Multilabel computer vision identifying multiple scene tags in a single frame."
          />
          <p className="text-xs text-[#4A3B4E]">
            In multilabel classification, each possible label is considered separately when deciding whether it applies to an observation. E.g., news articles tagged with both <em>Politics</em> and <em>Economy</em>, or music tagged with <em>Rock</em>, <em>Energetic</em> and <em>Live Performance</em>.
          </p>
        </div>

        {/* Important Distinction */}
        <div className="p-4 rounded-xl bg-[#FFF0F6] border-2 border-[#FFB8D2] space-y-2">
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase font-bold block">
            Important Distinction
          </span>
          <p className="text-xs text-[#1A1020] leading-relaxed">
            Consider an image containing both a cat and a dog:
          </p>
          <ul className="list-disc pl-5 text-xs text-[#4A3B4E] space-y-1">
            <li>In a <strong>multiclass</strong> problem where the task is to identify the main animal, the model must choose <strong>one category</strong>.</li>
            <li>In a <strong>multilabel</strong> problem where the task is to identify every animal present, the model can assign <strong>both Cat and Dog</strong>.</li>
          </ul>
          <p className="text-xs text-[#96003B] font-semibold">
            The distinction depends on the task we formulate, not merely on the data itself.
          </p>
        </div>

        {/* Summary Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs uppercase text-[#6D5970] tracking-wider font-mono">
            Comparison of the Three Formulations
          </h4>
          <CompareTable
            headers={['Type', 'Prediction for One Observation']}
            rows={[
              ['Binary', 'One of two classes'],
              ['Multiclass', 'One of several classes'],
              ['Multilabel', 'Zero, one or several labels'],
            ]}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 8 — What does a classification dataset look like?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-8" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 08
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              What does a classification dataset look like?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Dataset Structure
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Now that we understand what classification predicts, we need to examine the data from which a classifier learns.
          </p>
          <p>
            A <strong>dataset</strong> is a collection of observations used to train, evaluate or test a Machine Learning model. In supervised classification, each training observation contains input information and its corresponding known class label.
          </p>
          <p>Consider the following simplified spam detection dataset:</p>
        </div>

        {/* 6-Email Dataset Table */}
        <CompareTable
          headers={['Email', 'Number of Links', 'Suspicious Words', 'Label']}
          rows={[
            ['E1', '5', '4', 'Spam'],
            ['E2', '0', '0', 'Not Spam'],
            ['E3', '3', '2', 'Spam'],
            ['E4', '1', '0', 'Not Spam'],
            ['E5', '6', '5', 'Spam'],
            ['E6', '0', '1', 'Not Spam'],
          ]}
        />
        <p className="text-xs text-[#6D5970] italic">
          Each row represents an observation, and each column describes some information about that observation.
        </p>

        {/* 4 Fundamental Terms */}
        <div className="space-y-4 pt-2">
          <h4 className="font-bold text-sm text-[#1A1020] uppercase font-mono tracking-wider">
            Four Fundamental Dataset Terms
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Term 1 */}
            <div className="p-4 rounded-xl border border-[#F0D6E2] bg-white space-y-1.5">
              <span className="font-pixel text-[10px] text-[#FF2E7E] font-bold block">1. OBSERVATION</span>
              <h5 className="font-bold text-sm text-[#1A1020]">Instance or Sample</h5>
              <p className="text-[#4A3B4E] leading-relaxed">
                An observation is one individual example in a dataset. In our example, each email is one observation. If a dataset contains 1,000 emails, it contains 1,000 observations.
              </p>
            </div>

            {/* Term 2 */}
            <div className="p-4 rounded-xl border border-[#F0D6E2] bg-white space-y-1.5">
              <span className="font-pixel text-[10px] text-[#8B5CF6] font-bold block">2. FEATURE</span>
              <h5 className="font-bold text-sm text-[#1A1020]">Property or Characteristic</h5>
              <p className="text-[#4A3B4E] leading-relaxed">
                A feature is an individual measurable property or characteristic describing an observation (e.g. Number of links, Number of suspicious words). Features provide the info used for prediction.
              </p>
            </div>

            {/* Term 3 */}
            <div className="p-4 rounded-xl border border-[#F0D6E2] bg-white space-y-1.5">
              <span className="font-pixel text-[10px] text-[#10B981] font-bold block">3. FEATURE VECTOR</span>
              <h5 className="font-bold text-sm text-[#1A1020]">Vector Representation x</h5>
              <p className="text-[#4A3B4E] leading-relaxed">
                A feature vector is the numerical representation of the features describing one observation. For Email E1:
              </p>
              <MathBlock formula="x_1 = \begin{bmatrix} 5 \\ 4 \end{bmatrix}" label="Feature Vector for E1" />
            </div>

            {/* Term 4 */}
            <div className="p-4 rounded-xl border border-[#F0D6E2] bg-white space-y-1.5">
              <span className="font-pixel text-[10px] text-[#F59E0B] font-bold block">4. LABEL</span>
              <h5 className="font-bold text-sm text-[#1A1020]">Ground-truth Target y</h5>
              <p className="text-[#4A3B4E] leading-relaxed">
                A label is the correct category associated with an observation in a supervised dataset:
              </p>
              <MathBlock formula="y_1 = \text{Spam}, \quad y_2 = \text{Not Spam}" label="Labels" />
            </div>
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              It is important <strong>not to confuse features with labels</strong>.
            </p>
            <p>
              Features describe the observation and are provided as inputs to the model. Labels represent the desired outputs and are used during supervised training.
            </p>
            <p>
              When the model receives a new email, it can calculate or extract the features, but its correct label is unknown. Its purpose is to predict that label.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 9 — Representing a dataset mathematically
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-9" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 09
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              Representing a dataset mathematically
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Matrix Formulation
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            Machine Learning algorithms operate on mathematical representations of data.
          </p>
          <p>
            A dataset with <MathInline formula="n" /> observations and <MathInline formula="d" /> features can be represented using a <strong>feature matrix <MathInline formula="X" /></strong>:
          </p>
          <MathBlock
            formula="X = \begin{bmatrix} x_{11} & x_{12} & \cdots & x_{1d} \\ x_{21} & x_{22} & \cdots & x_{2d} \\ \vdots & \vdots & \ddots & \vdots \\ x_{n1} & x_{n2} & \cdots & x_{nd} \end{bmatrix}"
            label="Feature Matrix X in R^(n x d)"
          />
          <ul className="list-disc pl-5 text-xs text-[#4A3B4E] space-y-1">
            <li><MathInline formula="n" /> is the number of observations.</li>
            <li><MathInline formula="d" /> is the number of features.</li>
            <li><MathInline formula="x_{ij}" /> is the value of feature <MathInline formula="j" /> for observation <MathInline formula="i" />.</li>
          </ul>

          <p className="pt-2">For our spam detection dataset, we have six emails and two features:</p>
          <MathBlock
            formula="X = \begin{bmatrix} 5 & 4 \\ 0 & 0 \\ 3 & 2 \\ 1 & 0 \\ 6 & 5 \\ 0 & 1 \end{bmatrix}"
            label="Spam Feature Matrix (6 x 2)"
          />

          <p>The corresponding labels are represented by a target vector:</p>
          <MathBlock
            formula="y = \begin{bmatrix} \text{Spam} \\ \text{NotSpam} \\ \text{Spam} \\ \text{NotSpam} \\ \text{Spam} \\ \text{NotSpam} \end{bmatrix}"
            label="Target Vector y"
          />

          <p>For binary classification, we encode the labels numerically:</p>
          <MathBlock
            formula="\text{Spam} = 1, \qquad \text{NotSpam} = 0"
            label="Numerical Class Encodings"
          />
          <MathBlock
            formula="y = \begin{bmatrix} 1 \\ 0 \\ 1 \\ 0 \\ 1 \\ 0 \end{bmatrix}"
            label="Encoded Vector y in {0, 1}^6"
          />
        </div>

        {/* Visual: Highlight row of X connected to y */}
        <MatrixVectorConnectWidget />

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              The matrix <MathInline formula="X" /> contains all the input features for all observations. Each row corresponds to one email, and each column corresponds to one feature.
            </p>
            <p>
              The vector <MathInline formula="y" /> contains the correct labels in the same order as the observations in <MathInline formula="X" />.
            </p>
            <p>
              This gives us a mathematical representation of the supervised classification dataset:
            </p>
            <MathBlock formula="D = \{(x_i, y_i)\}_{i=1}^{n}" label="Supervised Dataset D" />
            <p>
              Each pair <MathInline formula="(x_i, y_i)" /> represents an observation and its corresponding label. This notation is important because it appears throughout Machine Learning textbooks and research papers.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 10 — What happens when we train a classifier?
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-10" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 10
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              What happens when we train a classifier?
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Training Phase
          </span>
        </div>

        <p className="text-sm text-[#4A3B4E]">
          We now have a dataset containing features and known labels. The next step is <strong>training</strong>.
        </p>

        {/* Slide Content */}
        <div className="p-4 rounded-xl border-2 border-[#FFD6E5] bg-[#FFF7FA] space-y-2">
          <h4 className="font-bold text-sm text-[#96003B]">Definition of Training</h4>
          <p className="text-xs md:text-sm text-[#4A3B4E] leading-relaxed">
            <strong>Training</strong> is the process through which a learning algorithm uses labeled examples to determine the parameters or structure of a model that captures relationships between input features and target labels.
          </p>
          <p className="text-xs text-[#1A1020] font-semibold">
            The objective is to learn a function that can make useful predictions for new observations.
          </p>
        </div>

        {/* Process Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
          <div className="p-3 bg-white rounded-xl border-2 border-purple-200">
            <span className="font-pixel text-[9px] text-purple-600 uppercase font-bold block">Step 1</span>
            <p className="font-extrabold text-xs text-[#1A1020] mt-1">Training Dataset</p>
            <p className="text-[11px] font-mono text-purple-700 mt-0.5">Matrix X + Labels y</p>
          </div>
          <div className="p-3 bg-[#FFF0F6] rounded-xl border-2 border-[#FF2E7E]">
            <span className="font-pixel text-[9px] text-[#FF2E7E] uppercase font-bold block">Step 2</span>
            <p className="font-extrabold text-xs text-[#96003B] mt-1">Learning Algorithm</p>
            <p className="text-[11px] font-mono text-[#FF2E7E] mt-0.5">Finds patterns & adjusts parameters</p>
          </div>
          <div className="p-3 bg-white rounded-xl border-2 border-emerald-200">
            <span className="font-pixel text-[9px] text-emerald-600 uppercase font-bold block">Step 3</span>
            <p className="font-extrabold text-xs text-[#1A1020] mt-1">Trained Model</p>
            <p className="text-[11px] font-mono text-emerald-700 mt-0.5">Learned function f</p>
          </div>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              During training, the algorithm examines the examples and tries to find patterns that help distinguish the different classes. For example, it might discover that emails with many links and suspicious words are frequently labeled Spam.
            </p>
            <p>
              Different classification algorithms discover patterns in different ways:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>K-Nearest Neighbors:</strong> uses similarities and geometric distances between observations.</li>
              <li><strong>Decision Trees:</strong> learns sequential decision rules that divide observations into homogeneous groups.</li>
              <li><strong>Logistic Regression:</strong> learns numerical parameters that relate input features to the probability of a class.</li>
            </ul>
            <p>
              We will examine these algorithms in detail later. The important point is that the model is not simply handed a complete set of rules. It obtains its learned behavior through the training process.
            </p>
          </div>
        </Callout>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 11 — From training to prediction
         ───────────────────────────────────────────────────────────── */}
      <section id="slide-11" className="space-y-5 rounded-2xl border-2 border-[#F0D6E2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              SLIDE 11
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1A1020]">
              From training to prediction
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
            Generalization
          </span>
        </div>

        {/* Slide Content */}
        <div className="space-y-3 text-sm text-[#4A3B4E] leading-relaxed">
          <p>
            After training, the model can be used to classify observations that were not part of the training dataset.
          </p>
          <p>
            Suppose a new email arrives with the following characteristics:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-[#1A1020]">
            <li>Number of links: 7</li>
            <li>Number of suspicious words: 5</li>
          </ul>

          <p>Its feature vector is:</p>
          <MathBlock
            formula="x_{\text{new}} = \begin{bmatrix} 7 \\ 5 \end{bmatrix}"
            label="New Unseen Observation Vector"
          />

          <p>The trained model receives this vector and produces a prediction:</p>
          <MathBlock
            formula="\hat{y} = f(x_{\text{new}})"
            label="Inference"
          />

          <p>Suppose the model predicts:</p>
          <MathBlock
            formula="\hat{y} = \text{Spam}"
            label="Model Prediction"
          />

          <p className="font-semibold text-[#1A1020]">
            The model has classified a new observation based on patterns learned from previous examples.
          </p>
        </div>

        {/* Explanation */}
        <Callout type="info" title="Explanation">
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              Notice that the new email does not come with a known label. The model must produce its own prediction.
            </p>
            <p>
              This is the crucial operational difference between learning from labeled training examples and using the resulting model to make predictions.
            </p>
            <p>
              A classification model should not merely memorize the training observations. We want it to learn patterns that remain useful when it encounters new examples.
            </p>
            <KeyInsight>
              This ability is called <strong>generalization</strong>, and it will become a central concept when we discuss model evaluation and overfitting.
            </KeyInsight>
          </div>
        </Callout>
      </section>
    </div>
  );
}
