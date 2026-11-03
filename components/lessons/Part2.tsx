'use client';

import { useState } from 'react';
import { SectionHeader, ThoughtPrompt, CompareTable, ConceptCard, Callout, KeyInsight } from '@/components/ui/ConceptCard';
import { SpamDataTable, SpamScatterPlot } from '@/components/ui/SpamDataset';
import { Quiz } from '@/components/ui/Quiz';
import TrainingSimulator from '@/components/interactive/TrainingSimulator';

const newEmails = [
  { id: 'N1', links: 0, words: 0, note: 'Clearly Not Spam (0, 0)', labelHint: 'not-spam' },
  { id: 'N2', links: 6, words: 6, note: 'Clearly Spam (6, 6)', labelHint: 'spam' },
  { id: 'N3', links: 2, words: 3, note: 'Edge Case (2, 3) — Adjacent to noise point E10', labelHint: 'borderline' },
];

export default function Part2() {
  const [userPredictions, setUserPredictions] = useState<Record<string, string>>({});
  const [inspectedEmail, setInspectedEmail] = useState<string>('N3');

  const selectedEmail = newEmails.find(e => e.id === inspectedEmail);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={2}
        time="15–35 min"
        title="What is Classification?"
        subtitle="Features, Labels, Datasets and the Supervised Learning Lifecycle"
      />

      {/* 2.1 The Definition of Classification */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Defining the Classification Problem
          </h2>
        </div>

        <ThoughtPrompt
          question="Which of these problems belongs to the same mathematical category as spam detection? (A) Predicting tomorrow's exact temperature in degrees. (B) Predicting whether a customer will cancel their subscription. (C) Predicting the market price of a residential property."
          context="Notice the structure of the target value you are trying to estimate."
        />

        <div className="p-4 rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF0F6]">
          <span className="font-pixel text-[10px] font-bold text-[#FF2E7E] uppercase block mb-1">
            FORMAL DEFINITION
          </span>
          <p className="text-sm font-semibold text-[#1A1020] leading-relaxed">
            Classification is the task of predicting which discrete category (class) an input belongs to, selected from a predefined, finite set of categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              type: 'Binary Classification',
              classes: '2 possible classes',
              example: 'Spam vs. Not Spam, Fraudulent vs. Legitimate',
              highlight: true,
            },
            {
              type: 'Multi-Class Classification',
              classes: '3+ mutually exclusive classes',
              example: 'Handwritten digit recognition (0–9), Language detection',
              highlight: false,
            },
            {
              type: 'Multi-Label Classification',
              classes: 'Multiple simultaneous labels',
              example: 'Document topic tagging (e.g., Tech, Finance, Policy)',
              highlight: false,
            },
          ].map(t => (
            <div
              key={t.type}
              className={`p-4 rounded-2xl border transition-all ${
                t.highlight ? 'border-2 border-[#FF2E7E] bg-[#FFF7FA]' : 'border-[#F0D6E2] bg-white'
              }`}
            >
              <span className="font-pixel text-[9px] px-2 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold block w-fit mb-2">
                {t.type}
              </span>
              <p className="text-xs font-bold text-[#1A1020] mb-1">{t.classes}</p>
              <p className="text-xs text-[#6D5970] leading-relaxed">{t.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2.2 Classification vs Regression */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Classification versus Regression
          </h2>
        </div>

        <CompareTable
          headers={['Characteristic', 'Classification', 'Regression']}
          rows={[
            ['Target Output', 'Categorical label (Discrete)', 'Numerical quantity (Continuous)'],
            ['Canonical Example', 'Spam or Legitimate', 'Real estate property price'],
            ['Guiding Question', '"Which class does this belong to?"', '"How much / what magnitude?"'],
            ['Nature of Error', 'Misclassification (wrong class)', 'Residual distance from true value'],
            ['Standard Metrics', 'Accuracy, Precision, Recall, F1', 'Mean Absolute Error, RMSE, R²'],
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Callout type="tip" title="Rule of Thumb">
            If the model prediction can be chosen from a <strong>dropdown menu</strong>, it is a classification problem. If it belongs on a <strong>continuous measuring ruler</strong>, it is regression.
          </Callout>
          <Callout type="warning" title="Nomenclature Note">
            Despite containing the term "regression" in its name for historical reasons, <strong>Logistic Regression</strong> is fundamentally a classification model because it predicts discrete class probabilities.
          </Callout>
        </div>
      </section>

      {/* 2.3 Features, Labels, and Datasets */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Features, Labels, and Datasets
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              term: 'Feature',
              desc: 'An individual measurable property of the observed entity used as model input.',
              example: 'Number of hyperlinks (x)',
            },
            {
              term: 'Target Label',
              desc: 'The ground-truth answer or category we want the model to learn to predict.',
              example: 'Spam or Not Spam (y)',
            },
            {
              term: 'Dataset',
              desc: 'The complete set of tabular rows pairing measured features with ground-truth outcomes.',
              example: 'Our 10 historical training emails',
            },
          ].map(item => (
            <div key={item.term} className="p-4 rounded-2xl border border-[#F0D6E2] bg-white shadow-sm space-y-1.5">
              <span className="font-pixel text-[10px] px-2 py-0.5 rounded bg-[#FFF0F6] text-[#FF2E7E] font-bold">
                {item.term}
              </span>
              <p className="text-xs text-[#6D5970] leading-relaxed">{item.desc}</p>
              <p className="text-[11px] font-mono text-[#FF2E7E] pt-1">Example: {item.example}</p>
            </div>
          ))}
        </div>

        {/* Dataset Table & Scatter Plot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider">
              Training Set (10 Emails)
            </span>
            <SpamDataTable />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider">
              2D Feature Space Plot
            </span>
            <SpamScatterPlot />
          </div>
        </div>

        <Callout type="info" title="The Role of Observation E10">
          Notice email <strong>E10</strong> at coordinates (2 links, 2 suspicious words). It is an intentionally placed noise point — a spam email that closely resembles legitimate traffic. Real-world machine learning data is filled with such ambiguities.
        </Callout>
      </section>

      {/* 2.4 Interactive Prediction Exercise */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 04
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Interactive Exercise: Be the Classifier
          </h2>
        </div>

        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-4">
          <p className="text-sm text-[#4A3B4E] leading-relaxed">
            Select each unlabelled test email below and assign your prediction based on its position relative to the training data points:
          </p>

          <div className="flex flex-wrap gap-2">
            {newEmails.map(ne => (
              <button
                key={ne.id}
                onClick={() => setInspectedEmail(ne.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  inspectedEmail === ne.id
                    ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#FF2E7E]'
                    : 'border-[#F0D6E2] bg-[#FFF9FC] text-[#6D5970]'
                }`}
              >
                {ne.id}: ({ne.links} links, {ne.words} words)
              </button>
            ))}
          </div>

          {selectedEmail && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <SpamScatterPlot
                newPoint={{ x: selectedEmail.links, y: selectedEmail.words, label: selectedEmail.id }}
              />

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#FFF7FA] border border-[#F0D6E2]">
                  <p className="font-bold text-sm text-[#1A1020]">
                    Inspecting {selectedEmail.id}
                  </p>
                  <p className="text-xs text-[#6D5970] mt-0.5">
                    Coordinates: ({selectedEmail.links} links, {selectedEmail.words} suspicious words)
                  </p>
                  <p className="text-xs text-[#FF2E7E] font-medium mt-1">
                    {selectedEmail.note}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUserPredictions(prev => ({ ...prev, [selectedEmail.id]: 'not-spam' }))}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      userPredictions[selectedEmail.id] === 'not-spam'
                        ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                        : 'border-[#F0D6E2] hover:border-[#10B981]'
                    }`}
                  >
                    Classify as Not Spam
                  </button>
                  <button
                    onClick={() => setUserPredictions(prev => ({ ...prev, [selectedEmail.id]: 'spam' }))}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      userPredictions[selectedEmail.id] === 'spam'
                        ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#96003B]'
                        : 'border-[#F0D6E2] hover:border-[#FF2E7E]'
                    }`}
                  >
                    Classify as Spam
                  </button>
                </div>

                {userPredictions[selectedEmail.id] && (
                  <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] leading-relaxed">
                    {selectedEmail.id === 'N1' && 'N1 sits in the lower-left cluster where all examples are legitimate. Classification here is straightforward.'}
                    {selectedEmail.id === 'N2' && 'N2 sits deep inside the upper-right spam cluster with high link and word counts. Clear spam.'}
                    {selectedEmail.id === 'N3' && 'N3 is the critical borderline case: It sits close to noise point E10 (spam), but is also near legitimate points E3 and E4. Different algorithms make different trade-offs here.'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <KeyInsight>
          Analyzing historical labeled examples to identify spatial clusters is <strong>training</strong>. Applying those learned rules to evaluate unseen emails is <strong>inference (prediction)</strong>.
        </KeyInsight>
      </section>

      {/* 2.5 Training versus Inference */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 05
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Training versus Inference Lifecycle
          </h2>
        </div>

        <CompareTable
          headers={['Stage', 'Training Phase', 'Inference (Prediction) Phase']}
          rows={[
            ['Primary Input', 'Historical dataset containing features + labels', 'A single new instance (features only)'],
            ['Core Operation', 'Model optimizes internal weights to minimize loss', 'Model applies fixed parameters to compute class'],
            ['Produced Output', 'Trained model weights and decision thresholds', 'Discrete predicted label or probability score'],
            ['Computational Profile', 'Resource-intensive; executed periodically', 'Sub-millisecond latency; executed millions of times'],
          ]}
        />

        {/* Live Training Simulator Component */}
        <div className="pt-2">
          <TrainingSimulator />
        </div>
      </section>

      {/* Quiz */}
      <section className="pt-4 border-t border-[#F0D6E2]">
        <Quiz
          partNumber={2}
          questions={[
            {
              question: 'Which of the following problems represents a classification task?',
              options: [
                'Predicting tomorrow’s ambient temperature in Celsius',
                'Estimating the market sale price of a vehicle',
                'Predicting whether a cloud customer will churn this quarter',
                'Forecasting the continuous electricity consumption of a data center',
              ],
              correctIndex: 2,
              explanation: 'Churn prediction outputs one of two distinct categorical states (will churn vs. will retain) — making it binary classification. All other options predict a continuous numerical value along a scale (regression).',
            },
            {
              question: 'A clinic trains a model to predict diabetes from patient age, BMI, and fasting glucose levels. What constitutes the target label?',
              options: ['Patient age', 'Fasting glucose level', 'Patient BMI', 'Diabetes diagnosis (Positive / Negative)'],
              correctIndex: 3,
              explanation: 'Age, BMI, and fasting glucose are features (inputs). The ground-truth outcome to be predicted is the medical diagnosis (the label).',
            },
            {
              question: 'Why does Supervised Learning fundamentally require labeled data during training?',
              options: [
                'Labels compress the storage requirements of the feature vectors',
                'The labels serve as ground-truth feedback allowing the algorithm to measure error and adjust parameters',
                'Without labels, features cannot be represented as numbers',
                'Labels are merely cosmetic tags and do not influence training optimization',
              ],
              correctIndex: 1,
              explanation: 'Supervised learning works by comparing predictions against known true answers. The discrepancy (loss) directs parameter updates.',
            },
          ]}
        />
      </section>
    </div>
  );
}
