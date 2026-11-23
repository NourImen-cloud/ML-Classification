'use client';

import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Cpu,
  Brain,
  Sliders,
  Sparkles,
  HelpCircle,
  Eye,
  RefreshCw,
  Layers,
  Activity,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { MathBlock, MathInline } from '@/components/ui/KatexFormula';

/* ─── SLIDE 1 VISUAL: Three Email Cards with Unknown Category ─── */
export function EmailRevealWidget() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const emails = [
    {
      id: 1,
      sender: 'exams@university.edu',
      subject: 'Examination Schedule Notice',
      body: 'Your university examination schedule has been published.',
      category: 'Not Spam (Legitimate)',
      isSpam: false,
      reason: 'Official educational domain, transactional message, no unsolicited links or high-pressure language.',
      features: { links: 0, suspiciousWords: 0 },
    },
    {
      id: 2,
      sender: 'reward-winner-772@claim-gift-fast.biz',
      subject: 'URGENT: Free Prize Inside!',
      body: 'Congratulations! You have won a free prize. Claim it now!',
      category: 'Spam',
      isSpam: true,
      reason: 'Unknown suspicious sender, artificial urgency ("Claim it now!"), unsolicited prize bait.',
      features: { links: 3, suspiciousWords: 4 },
    },
    {
      id: 3,
      sender: 'tracking@courier-logistics.com',
      subject: 'Delivery Status Update',
      body: 'Your package is ready for delivery.',
      category: 'Not Spam (Legitimate)',
      isSpam: false,
      reason: 'Standard customer notification, expected transactional context, informative tone.',
      features: { links: 1, suspiciousWords: 0 },
    },
  ];

  const toggleReveal = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    setRevealed({ 1: true, 2: true, 3: true });
  };

  const resetAll = () => {
    setRevealed({});
  };

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            Interactive Classroom Visual · Slide 1
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base">
            Can Computers Make Decisions? Test Your Intuition
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={revealAll}
            className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#FFE4EF] text-[#FF2E7E] hover:bg-[#FFD6E5] transition-colors"
          >
            Reveal All
          </button>
          <button
            onClick={resetAll}
            className="text-xs font-semibold px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-xs text-[#6D5970]">
        Click each email card below to reveal whether it is classified as <span className="text-[#10B981] font-bold">Not Spam</span> or <span className="text-[#FF2E7E] font-bold">Spam</span> and examine why.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {emails.map((email) => {
          const isOpen = !!revealed[email.id];
          return (
            <div
              key={email.id}
              onClick={() => toggleReveal(email.id)}
              className={`cursor-pointer rounded-xl border-2 transition-all duration-300 p-4 flex flex-col justify-between select-none ${
                isOpen
                  ? email.isSpam
                    ? 'border-[#FF2E7E] bg-[#FFF5F8] shadow-md'
                    : 'border-[#10B981] bg-[#F0FDF4] shadow-md'
                  : 'border-[#F0D6E2] bg-white hover:border-[#FF2E7E]/60 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#6D5970]">
                    <Mail className="w-3.5 h-3.5 text-[#FF2E7E]" />
                    <span>Email #{email.id}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-gray-200 text-[#4A3B4E]">
                    Click to reveal
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#1A1020] mb-1 font-mono">
                  &quot;{email.body}&quot;
                </p>
                <p className="text-[11px] text-[#6D5970] font-mono truncate">
                  From: {email.sender}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                {isOpen ? (
                  <div className="space-y-1.5 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1020]">Category:</span>
                      <span
                        className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                          email.isSpam
                            ? 'bg-[#FF2E7E] text-white'
                            : 'bg-[#10B981] text-white'
                        }`}
                      >
                        {email.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4A3B4E] leading-relaxed mt-1">
                      {email.reason}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs font-semibold text-[#FF2E7E] flex items-center justify-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reveal Category</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── SLIDE 2 VISUAL: Traditional Programming vs Machine Learning ─── */
export function TraditionalVsMlDiagram() {
  const [activeTab, setActiveTab] = useState<'traditional' | 'ml'>('ml');

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            Interactive Architecture Diagram · Slide 2
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base">
            Traditional Programming vs. Machine Learning
          </h4>
        </div>
        <div className="flex bg-[#FFF0F6] p-1 rounded-xl border border-[#FFB8D2] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('traditional')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'traditional'
                ? 'bg-white text-[#FF2E7E] shadow-sm'
                : 'text-[#6D5970] hover:text-[#1A1020]'
            }`}
          >
            Traditional Programming
          </button>
          <button
            onClick={() => setActiveTab('ml')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'ml'
                ? 'bg-[#FF2E7E] text-white shadow-sm'
                : 'text-[#6D5970] hover:text-[#1A1020]'
            }`}
          >
            Machine Learning
          </button>
        </div>
      </div>

      {activeTab === 'traditional' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-center">
              <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">Step 1: Inputs</span>
              <p className="font-extrabold text-sm text-[#1A1020] mt-1">Data + Explicit Rules</p>
              <p className="text-xs text-gray-600 mt-1 font-mono">if words &gt; 5 then Spam</p>
            </div>
            <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50 text-center">
              <span className="text-[10px] font-mono uppercase text-blue-600 font-bold block">Step 2: Processing</span>
              <p className="font-extrabold text-sm text-blue-900 mt-1">Computer Program</p>
              <p className="text-xs text-blue-700 mt-1 font-mono">Executes developer rules</p>
            </div>
            <div className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-center">
              <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block">Step 3: Output</span>
              <p className="font-extrabold text-sm text-emerald-900 mt-1">Prediction / Output</p>
              <p className="text-xs text-emerald-700 mt-1 font-mono">Spam / Not Spam</p>
            </div>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">The Core Limitation:</span> In traditional programming, humans must hand-craft all edge cases. Spammers constantly change phrasing, leading to fragile, sprawling rulebooks that fail on new patterns.
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50 text-center">
              <span className="text-[10px] font-mono uppercase text-purple-600 font-bold block">Inputs to Algorithm</span>
              <p className="font-extrabold text-sm text-purple-900 mt-1">Data + Known Targets (Labels)</p>
              <p className="text-xs text-purple-700 mt-1 font-mono">Historical emails + correct labels</p>
            </div>
            <div className="p-4 rounded-xl border-2 border-[#FF2E7E] bg-[#FFF0F6] text-center">
              <span className="text-[10px] font-mono uppercase text-[#FF2E7E] font-bold block">Training Phase</span>
              <p className="font-extrabold text-sm text-[#96003B] mt-1">Learning Algorithm</p>
              <p className="text-xs text-[#FF2E7E] mt-1 font-mono">Discovers statistical patterns</p>
            </div>
            <div className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-center">
              <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block">Result</span>
              <p className="font-extrabold text-sm text-emerald-900 mt-1">Learned Model (f)</p>
              <p className="text-xs text-emerald-700 mt-1 font-mono">Predicts on brand new unseen data</p>
            </div>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
            <span className="font-bold">The ML Advantage:</span> The developer does not write the rules! The algorithm mathematical maps input characteristics to categories by learning from examples.
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── SLIDE 3 VISUAL: Email Enters Model and Exits with Spam / Not Spam ─── */
export function ModelPipelineVisual() {
  const [selectedExample, setSelectedExample] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const samples = [
    {
      subject: 'Claim 1,000,000 USD Lottery Winner!!',
      links: 8,
      words: 6,
      prediction: 'Spam',
      confidence: '98.4%',
      badgeColor: 'bg-[#FF2E7E]',
    },
    {
      subject: 'Weekly Team Sync Notes & Zoom Link',
      links: 1,
      words: 0,
      prediction: 'Not Spam',
      confidence: '97.2%',
      badgeColor: 'bg-[#10B981]',
    },
    {
      subject: 'Invoice overdue - please confirm payment',
      links: 4,
      words: 3,
      prediction: 'Spam',
      confidence: '79.5%',
      badgeColor: 'bg-[#FF2E7E]',
    },
  ];

  const current = samples[selectedExample];

  const handleSimulate = (idx: number) => {
    setSelectedExample(idx);
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 400);
  };

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            Interactive Visual · Slide 3
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base flex flex-wrap items-center gap-1.5">
            <span>Model Inference Flow: Observation</span>
            <span className="text-[#FF2E7E] font-bold">→</span>
            <span>Feature Vector</span>
            <span className="text-[#FF2E7E] font-bold">→</span>
            <span>Prediction</span>
          </h4>
        </div>
        <div className="flex items-center gap-1">
          {samples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSimulate(idx)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                selectedExample === idx
                  ? 'bg-[#FF2E7E] text-white border-[#FF2E7E]'
                  : 'bg-white text-[#6D5970] border-gray-200 hover:border-gray-300'
              }`}
            >
              Email #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center">
        {/* Step 1: Input Observation */}
        <div className="flex-1 w-full p-4 rounded-xl border-2 border-purple-200 bg-purple-50/50 flex flex-col items-center">
          <Mail className="w-6 h-6 text-purple-600 mb-2" />
          <span className="text-[10px] font-mono uppercase text-purple-700 font-bold">1. Raw Observation</span>
          <p className="text-xs font-bold text-[#1A1020] mt-1 line-clamp-2">&quot;{current.subject}&quot;</p>
        </div>

        <ArrowRight className="w-5 h-5 text-[#FF2E7E] shrink-0 rotate-90 md:rotate-0 my-1 md:my-0" />

        {/* Step 2: Feature Extraction */}
        <div className="flex-1 w-full p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 flex flex-col items-center">
          <Sliders className="w-6 h-6 text-blue-600 mb-2" />
          <span className="text-[10px] font-mono uppercase text-blue-700 font-bold flex items-center gap-1">
            2. Feature Vector <MathInline formula="\mathbf{x}" />
          </span>
          <div className="font-mono text-xs bg-white px-3 py-1 rounded border border-blue-200 mt-1 font-bold text-blue-900">
            <MathInline formula={`\\mathbf{x} = [${current.links},\\, ${current.words}]^T`} />
          </div>
          <span className="text-[10px] text-gray-500 mt-1">links: {current.links}, words: {current.words}</span>
        </div>

        <ArrowRight className="w-5 h-5 text-[#FF2E7E] shrink-0 rotate-90 md:rotate-0 my-1 md:my-0" />

        {/* Step 3: Learned Classifier */}
        <div className={`flex-1 w-full p-4 rounded-xl border-2 border-[#FFB8D2] bg-[#FFF0F6] flex flex-col items-center transition-all ${isProcessing ? 'scale-105' : ''}`}>
          <Brain className="w-6 h-6 text-[#FF2E7E] mb-2" />
          <span className="text-[10px] font-mono uppercase text-[#FF2E7E] font-bold">3. Learned Model</span>
          <div className="font-mono text-xs font-bold text-[#96003B] mt-1">
            <MathInline formula="\hat{y} = f(\mathbf{x})" />
          </div>
          <span className="text-[10px] text-[#6D5970] mt-1 flex items-center justify-center gap-1">
            Maps <MathInline formula="X \rightarrow C" />
          </span>
        </div>

        <ArrowRight className="w-5 h-5 text-[#FF2E7E] shrink-0 rotate-90 md:rotate-0 my-1 md:my-0" />

        {/* Step 4: Predicted Class */}
        <div className="flex-1 w-full p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/50 flex flex-col items-center">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-2" />
          <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold flex items-center gap-1">
            4. Predicted Class <MathInline formula="\hat{y}" />
          </span>
          <div className={`mt-1 px-3 py-1 rounded-full text-white font-extrabold text-xs ${current.badgeColor}`}>
            {current.prediction}
          </div>
          <span className="text-[10px] text-gray-500 mt-1">Score: {current.confidence}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 9 VISUAL: Highlight Row of X Connected to y ─── */
export function MatrixVectorConnectWidget() {
  const [selectedRow, setSelectedRow] = useState<number>(0);

  const dataset = [
    { id: 'E1', links: 5, words: 4, labelText: 'Spam', labelNum: 1 },
    { id: 'E2', links: 0, words: 0, labelText: 'Not Spam', labelNum: 0 },
    { id: 'E3', links: 3, words: 2, labelText: 'Spam', labelNum: 1 },
    { id: 'E4', links: 1, words: 0, labelText: 'Not Spam', labelNum: 0 },
    { id: 'E5', links: 6, words: 5, labelText: 'Spam', labelNum: 1 },
    { id: 'E6', links: 0, words: 1, labelText: 'Not Spam', labelNum: 0 },
  ];

  const active = dataset[selectedRow];

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            Interactive Classroom Visual · Slide 9
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base">
            Connecting Feature Matrix X to Target Vector y: The Pair (xᵢ, yᵢ)
          </h4>
        </div>
        <span className="text-xs font-mono text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
          Click any row to trace
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Matrix X */}
        <div className="lg:col-span-6 bg-[#FFF7FA] p-3 rounded-xl border border-[#FFD6E5]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-extrabold text-[#96003B]">
              Feature Matrix X (6 × 2)
            </span>
            <span className="text-[10px] font-mono text-[#6D5970]">
              [links, suspicious_words]
            </span>
          </div>
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#FFD6E5] text-[#6D5970] text-[10px] uppercase">
                <th className="py-1 px-2">Sample</th>
                <th className="py-1 px-2">x₁ (Links)</th>
                <th className="py-1 px-2">x₂ (Words)</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((row, idx) => {
                const isSelected = selectedRow === idx;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedRow(idx)}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FF2E7E] text-white font-extrabold rounded-lg'
                        : 'hover:bg-[#FFE4EF] text-[#1A1020]'
                    }`}
                  >
                    <td className="py-1.5 px-2">{row.id}</td>
                    <td className="py-1.5 px-2">{row.links}</td>
                    <td className="py-1.5 px-2">{row.words}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Visual Connector */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-2">
          <ArrowRight className="w-6 h-6 text-[#FF2E7E] hidden lg:block animate-pulse" />
          <span className="text-[10px] font-mono text-[#FF2E7E] font-bold mt-1">
            Pairs with
          </span>
        </div>

        {/* Target Vector y */}
        <div className="lg:col-span-4 bg-[#FFF7FA] p-3 rounded-xl border border-[#FFD6E5]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-extrabold text-[#96003B]">
              Target Vector y (6 × 1)
            </span>
            <span className="text-[10px] font-mono text-[#6D5970]">Encoded {`{0, 1}`}</span>
          </div>
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#FFD6E5] text-[#6D5970] text-[10px] uppercase">
                <th className="py-1 px-2">Label</th>
                <th className="py-1 px-2">Encoded y</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((row, idx) => {
                const isSelected = selectedRow === idx;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedRow(idx)}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FF2E7E] text-white font-extrabold'
                        : 'hover:bg-[#FFE4EF] text-[#1A1020]'
                    }`}
                  >
                    <td className="py-1.5 px-2">{row.labelText}</td>
                    <td className="py-1.5 px-2">{row.labelNum}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary of Active Labeled Pair */}
      <div className="p-3.5 bg-[#FFF0F6] border-2 border-[#FFB8D2] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-mono font-bold text-[#FF2E7E] block">
            Selected Training Observation {active.id}:
          </span>
          <span className="text-[#1A1020] font-mono">
            Feature vector x_{active.id} = [{active.links}, {active.words}]ᵀ &nbsp; | &nbsp; Label y_{active.id} = {active.labelNum} ({active.labelText})
          </span>
        </div>
        <div className="font-mono font-extrabold text-xs text-[#96003B] bg-white px-3 py-1 rounded-lg border border-[#FFB8D2]">
          (x_{active.id}, y_{active.id}) ∈ D
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 12 & 13 VISUAL: 2D Feature Space and Decision Boundary ─── */
export function DecisionBoundaryScatterPlot() {
  const [boundaryType, setBoundaryType] = useState<'linear' | 'curved' | 'none'>('linear');
  const [probePoint, setProbePoint] = useState<{ links: number; words: number }>({ links: 7, words: 5 });

  const emails = [
    { id: 'E1', links: 5, words: 4, label: 'Spam' },
    { id: 'E2', links: 0, words: 0, label: 'Not Spam' },
    { id: 'E3', links: 3, words: 2, label: 'Spam' },
    { id: 'E4', links: 1, words: 0, label: 'Not Spam' },
    { id: 'E5', links: 6, words: 5, label: 'Spam' },
    { id: 'E6', links: 0, words: 1, label: 'Not Spam' },
  ];

  // SVG dimensions
  const width = 420;
  const height = 300;
  const pad = 40;

  const toX = (val: number) => pad + (val / 8) * (width - pad * 2);
  const toY = (val: number) => height - pad - (val / 8) * (height - pad * 2);

  // Probe prediction based on boundary (Linear rule: 1.2*links + 1.4*words >= 6)
  const isProbeSpam = 1.2 * probePoint.links + 1.4 * probePoint.words >= 6;

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            2D Feature Space Visualizer · Slides 11, 12, 13
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base">
            Feature Space, Decision Boundary & Generalization
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setBoundaryType('linear')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
              boundaryType === 'linear'
                ? 'bg-[#FF2E7E] text-white border-[#FF2E7E]'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Linear Boundary
          </button>
          <button
            onClick={() => setBoundaryType('curved')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
              boundaryType === 'curved'
                ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Complex Boundary
          </button>
          <button
            onClick={() => setBoundaryType('none')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
              boundaryType === 'none'
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Points Only
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* SVG Scatter Plot */}
        <div className="md:col-span-8 flex justify-center bg-[#FFF7FA] p-2 rounded-xl border border-[#FFD6E5] overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full max-w-[420px] select-none"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const clickY = e.clientY - rect.top;
              const rawX = Math.round(Math.max(0, Math.min(8, ((clickX - pad) / (width - pad * 2)) * 8)));
              const rawY = Math.round(Math.max(0, Math.min(8, ((height - pad - clickY) / (height - pad * 2)) * 8)));
              setProbePoint({ links: rawX, words: rawY });
            }}
          >
            {/* Background Regions when boundary active */}
            {boundaryType === 'linear' && (
              <polygon
                points={`${toX(0)},${toY(4.3)} ${toX(5)},${toY(0)} ${toX(8)},${toY(0)} ${toX(8)},${toY(8)} ${toX(0)},${toY(8)}`}
                fill="#FF2E7E"
                fillOpacity="0.08"
              />
            )}

            {/* Grid Lines */}
            {[0, 2, 4, 6, 8].map((val) => (
              <g key={val}>
                <line
                  x1={toX(val)}
                  y1={toY(0)}
                  x2={toX(val)}
                  y2={toY(8)}
                  stroke="#F0D6E2"
                  strokeDasharray="2,2"
                />
                <line
                  x1={toX(0)}
                  y1={toY(val)}
                  x2={toX(8)}
                  y2={toY(val)}
                  stroke="#F0D6E2"
                  strokeDasharray="2,2"
                />
                <text x={toX(val)} y={height - pad + 15} textAnchor="middle" fontSize="10" fill="#6D5970">
                  {val}
                </text>
                <text x={pad - 12} y={toY(val) + 3} textAnchor="end" fontSize="10" fill="#6D5970">
                  {val}
                </text>
              </g>
            ))}

            {/* Axes */}
            <line x1={toX(0)} y1={toY(0)} x2={toX(8)} y2={toY(0)} stroke="#1A1020" strokeWidth="2" />
            <line x1={toX(0)} y1={toY(0)} x2={toX(0)} y2={toY(8)} stroke="#1A1020" strokeWidth="2" />

            <text x={width / 2} y={height - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1A1020">
              Feature x₁: Number of Links →
            </text>
            <text
              x={14}
              y={height / 2}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#1A1020"
              transform={`rotate(-90, 14, ${height / 2})`}
            >
              Feature x₂: Suspicious Words →
            </text>

            {/* Boundaries */}
            {boundaryType === 'linear' && (
              <line
                x1={toX(0)}
                y1={toY(4.3)}
                x2={toX(5)}
                y2={toY(0)}
                stroke="#FF2E7E"
                strokeWidth="3"
                strokeDasharray="4,4"
              />
            )}
            {boundaryType === 'curved' && (
              <path
                d={`M ${toX(0)} ${toY(3.5)} Q ${toX(2.5)} ${toY(2.2)}, ${toX(4.5)} ${toY(0)}`}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
              />
            )}

            {/* Training Points */}
            {emails.map((e) => (
              <g key={e.id}>
                <circle
                  cx={toX(e.links)}
                  cy={toY(e.words)}
                  r={8}
                  fill={e.label === 'Spam' ? '#FF2E7E' : '#3B82F6'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <text
                  x={toX(e.links)}
                  y={toY(e.words) - 10}
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#1A1020"
                >
                  {e.id}
                </text>
              </g>
            ))}

            {/* Slide 11: Probe Point x_new = [7, 5] */}
            <circle
              cx={toX(probePoint.links)}
              cy={toY(probePoint.words)}
              r={9}
              fill="#F59E0B"
              stroke="#1A1020"
              strokeWidth="2.5"
            />
            <text
              x={toX(probePoint.links)}
              y={toY(probePoint.words) + 18}
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              fill="#D97706"
            >
              x_new ({probePoint.links},{probePoint.words})
            </text>
          </svg>
        </div>

        {/* Info & Probe Controller */}
        <div className="md:col-span-4 space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-xs space-y-1.5">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-bold block">Legend</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF2E7E]" />
              <span className="font-semibold text-gray-800">Spam Observations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <span className="font-semibold text-gray-800">Not Spam Observations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="font-semibold text-gray-800">New Email (x_new)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FFF0F6] border border-[#FFB8D2] space-y-1.5">
            <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase font-bold block">
              Slide 11: Inference
            </span>
            <p className="font-mono text-xs font-bold text-[#1A1020]">
              x_new = [{probePoint.links}, {probePoint.words}]ᵀ
            </p>
            <p className="text-gray-700">
              Prediction: <strong className={isProbeSpam ? 'text-[#FF2E7E]' : 'text-blue-600'}>
                {isProbeSpam ? 'Spam' : 'Not Spam'}
              </strong>
            </p>
            <p className="text-[10px] text-gray-500">
              Click anywhere on the graph to move x_new and test the boundary!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 22 VISUAL: Interactive Threshold Slider ─── */
export function ThresholdDemoWidget() {
  const [threshold, setThreshold] = useState<number>(0.5);

  const sampleEmails = [
    { id: 'E_A', prob: 0.95, trueLabel: 'Spam' },
    { id: 'E_B', prob: 0.83, trueLabel: 'Spam' },
    { id: 'E_C', prob: 0.72, trueLabel: 'Spam', highlight: true },
    { id: 'E_D', prob: 0.48, trueLabel: 'Spam' },
    { id: 'E_E', prob: 0.20, trueLabel: 'Not Spam' },
  ];

  const emailC = sampleEmails.find((e) => e.highlight)!;
  const emailCPred = emailC.prob >= threshold ? 'Spam' : 'Not Spam';

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            Interactive Threshold Simulator · Slide 22
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base">
            How Decision Threshold (t) Changes Predicted Classes
          </h4>
        </div>
        <div className="text-xs font-mono font-bold px-3 py-1 bg-[#FFF0F6] text-[#FF2E7E] rounded-full border border-[#FFB8D2]">
          t = {threshold.toFixed(2)}
        </div>
      </div>

      {/* Slider Control */}
      <div className="p-4 bg-[#FFF7FA] rounded-xl border border-[#FFD6E5] space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-[#1A1020]">
          <span>More Sensitive (Low t = 0.1)</span>
          <span className="text-[#FF2E7E] text-sm">Threshold: t = {threshold.toFixed(2)}</span>
          <span>More Conservative (High t = 0.9)</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.9"
          step="0.05"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full accent-[#FF2E7E] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-gray-500">
          <span>0.1 (Flags almost everything as Spam)</span>
          <span>0.5 (Default Balanced Cutoff)</span>
          <span>0.9 (Requires overwhelming evidence)</span>
        </div>
      </div>

      {/* Focus on Slide 22 Example Email */}
      <div className="p-3.5 rounded-xl bg-white border-2 border-[#FFB8D2] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase font-bold block">
            Slide 22 Spotlight Email: P(Spam | x) = 0.72
          </span>
          <p className="text-gray-700 mt-1">
            Condition: {emailC.prob.toFixed(2)} {emailC.prob >= threshold ? '≥' : '<'} {threshold.toFixed(2)} →{' '}
            <strong className={emailCPred === 'Spam' ? 'text-[#FF2E7E]' : 'text-blue-600'}>
              Predicts {emailCPred}
            </strong>
          </p>
        </div>
        <div className="text-xs font-mono font-bold bg-[#FFF0F6] text-[#96003B] px-3 py-1.5 rounded-lg border border-[#FFB8D2]">
          {threshold <= 0.72 ? 'At t ≤ 0.72: Class = Spam' : 'At t > 0.72: Class = Not Spam'}
        </div>
      </div>

      {/* Table of all emails */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#FFE4EF] text-[#96003B] uppercase text-[10px]">
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">P(Spam | x)</th>
              <th className="py-2 px-3">True Label</th>
              <th className="py-2 px-3">Prediction (ŷ)</th>
              <th className="py-2 px-3">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F7EAF0]">
            {sampleEmails.map((e) => {
              const pred = e.prob >= threshold ? 'Spam' : 'Not Spam';
              const correct = pred === e.trueLabel;
              return (
                <tr key={e.id} className={e.highlight ? 'bg-[#FFF0F6] font-bold' : ''}>
                  <td className="py-2 px-3">{e.id} {e.highlight && '★'}</td>
                  <td className="py-2 px-3">{e.prob.toFixed(2)}</td>
                  <td className="py-2 px-3">{e.trueLabel}</td>
                  <td className="py-2 px-3">
                    <span className={pred === 'Spam' ? 'text-[#FF2E7E] font-bold' : 'text-blue-600 font-bold'}>
                      {pred}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={correct ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                      {correct ? '✓ Correct' : '✗ Error'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── SLIDE 24 & 25 VISUAL: Interactive Confusion Matrix & Metrics ─── */
export function ConfusionMatrixLiveWidget() {
  const [activeCell, setActiveCell] = useState<'TP' | 'FN' | 'FP' | 'TN' | null>('TP');

  const TP = 15;
  const FN = 5;
  const FP = 10;
  const TN = 70;
  const Total = 100;

  const cellDetails = {
    TP: {
      title: 'True Positive (TP = 15)',
      description: 'The email is actually Spam, and the model correctly predicts Spam.',
      impact: 'Spam is successfully routed to the Spam folder. Safe outcome.',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
    },
    FP: {
      title: 'False Positive (FP = 10)',
      description: 'The email is actually Not Spam (Legitimate), but the model incorrectly predicts Spam.',
      impact: 'CRITICAL: Important emails (e.g., job offer, exam schedule) are missed in the spam folder.',
      color: 'border-rose-500 bg-rose-50 text-rose-900',
    },
    FN: {
      title: 'False Negative (FN = 5)',
      description: 'The email is actually Spam, but the model incorrectly predicts Not Spam.',
      impact: 'Spam or malicious phishing leaks into the primary inbox.',
      color: 'border-amber-500 bg-amber-50 text-amber-900',
    },
    TN: {
      title: 'True Negative (TN = 70)',
      description: 'The email is actually Not Spam, and the model correctly predicts Not Spam.',
      impact: 'Normal emails arrive safely in the inbox. Expected outcome.',
      color: 'border-blue-500 bg-blue-50 text-blue-900',
    },
  };

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            Interactive Matrix & Formula Calculator · Slides 24 & 25
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base">
            The Confusion Matrix (100 Sample Emails) & Metric Computations
          </h4>
        </div>
        <span className="text-xs font-mono text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
          Click any quadrant
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* The Matrix */}
        <div className="md:col-span-6">
          <div className="text-center font-mono text-xs font-extrabold text-[#96003B] mb-2 uppercase">
            Rows: Actual Class · Columns: Predicted Class
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2 font-bold text-gray-500 flex items-center justify-center">Actual \ Pred</div>
            <div className="p-2 bg-[#FFE4EF] text-[#96003B] font-extrabold rounded-lg">Pred Spam (+)</div>
            <div className="p-2 bg-[#E0E7FF] text-blue-900 font-extrabold rounded-lg">Pred Not Spam (-)</div>

            <div className="p-2 bg-[#FFE4EF] text-[#96003B] font-extrabold rounded-lg flex items-center justify-center">
              Actual Spam (20)
            </div>
            <button
              onClick={() => setActiveCell('TP')}
              className={`p-3 rounded-xl border-2 transition-all ${
                activeCell === 'TP'
                  ? 'border-emerald-500 bg-emerald-100 shadow-sm ring-2 ring-emerald-400'
                  : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className="text-lg font-extrabold text-emerald-800">15</div>
              <div className="text-[10px] font-bold text-emerald-700">TP (True Pos)</div>
            </button>
            <button
              onClick={() => setActiveCell('FN')}
              className={`p-3 rounded-xl border-2 transition-all ${
                activeCell === 'FN'
                  ? 'border-amber-500 bg-amber-100 shadow-sm ring-2 ring-amber-400'
                  : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
              }`}
            >
              <div className="text-lg font-extrabold text-amber-800">5</div>
              <div className="text-[10px] font-bold text-amber-700">FN (False Neg)</div>
            </button>

            <div className="p-2 bg-[#E0E7FF] text-blue-900 font-extrabold rounded-lg flex items-center justify-center">
              Actual Not Spam (80)
            </div>
            <button
              onClick={() => setActiveCell('FP')}
              className={`p-3 rounded-xl border-2 transition-all ${
                activeCell === 'FP'
                  ? 'border-rose-500 bg-rose-100 shadow-sm ring-2 ring-rose-400'
                  : 'border-rose-200 bg-rose-50 hover:bg-rose-100'
              }`}
            >
              <div className="text-lg font-extrabold text-rose-800">10</div>
              <div className="text-[10px] font-bold text-rose-700">FP (False Pos)</div>
            </button>
            <button
              onClick={() => setActiveCell('TN')}
              className={`p-3 rounded-xl border-2 transition-all ${
                activeCell === 'TN'
                  ? 'border-blue-500 bg-blue-100 shadow-sm ring-2 ring-blue-400'
                  : 'border-blue-200 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <div className="text-lg font-extrabold text-blue-800">70</div>
              <div className="text-[10px] font-bold text-blue-700">TN (True Neg)</div>
            </button>
          </div>
        </div>

        {/* Quadrant Explainer */}
        <div className="md:col-span-6">
          {activeCell && (
            <div className={`p-4 rounded-xl border-2 space-y-2 ${cellDetails[activeCell].color}`}>
              <span className="font-pixel text-[10px] uppercase font-bold tracking-wider">
                Cell Detail
              </span>
              <h5 className="font-extrabold text-sm">{cellDetails[activeCell].title}</h5>
              <p className="text-xs leading-relaxed">{cellDetails[activeCell].description}</p>
              <p className="text-xs font-bold leading-relaxed border-t border-current/20 pt-2">
                Consequence: {cellDetails[activeCell].impact}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4 Computed Metrics Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#F7EAF0]">
        <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#FFD6E5]">
          <span className="text-[10px] font-mono text-gray-500 uppercase font-bold block">1. Accuracy</span>
          <div className="text-xl font-extrabold text-[#96003B] mt-0.5">85.0%</div>
          <span className="text-[11px] font-mono text-gray-600 block mt-1">(15 + 70) / 100</span>
          <p className="text-[10px] text-gray-500 mt-1">Proportion of all predictions that are correct</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#FFD6E5]">
          <span className="text-[10px] font-mono text-gray-500 uppercase font-bold block">2. Precision</span>
          <div className="text-xl font-extrabold text-[#FF2E7E] mt-0.5">60.0%</div>
          <span className="text-[11px] font-mono text-gray-600 block mt-1">15 / (15 + 10)</span>
          <p className="text-[10px] text-gray-500 mt-1">How reliable predicted positives are</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#FFD6E5]">
          <span className="text-[10px] font-mono text-gray-500 uppercase font-bold block">3. Recall</span>
          <div className="text-xl font-extrabold text-[#8B5CF6] mt-0.5">75.0%</div>
          <span className="text-[11px] font-mono text-gray-600 block mt-1">15 / (15 + 5)</span>
          <p className="text-[10px] text-gray-500 mt-1">Proportion of actual spam identified</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#FFD6E5]">
          <span className="text-[10px] font-mono text-gray-500 uppercase font-bold block">4. F1-Score</span>
          <div className="text-xl font-extrabold text-[#10B981] mt-0.5">66.67%</div>
          <span className="text-[11px] font-mono text-gray-600 block mt-1">2 · (0.60 · 0.75) / (1.35)</span>
          <p className="text-[10px] text-gray-500 mt-1">Harmonic mean balancing precision & recall</p>
        </div>
      </div>
    </div>
  );
}

/* ─── SLIDE 18 VISUAL: End-to-End Workflow Pipeline ─── */
export function WorkflowStagesWidget() {
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const stages = [
    {
      num: '01',
      title: 'Problem Definition',
      desc: 'Identify the classification objective and define the discrete set of target classes C (e.g. Spam / Not Spam).',
      detail: 'Crucial starting point: You cannot pick an algorithm without knowing what constitutes a successful prediction and defining class boundaries.',
    },
    {
      num: '02',
      title: 'Data Collection',
      desc: 'Gather representative observations and their ground-truth labels from real-world operations.',
      detail: 'Biased data collection (e.g., only gathering emails from 2018) leads to poor real-world generalization.',
    },
    {
      num: '03',
      title: 'Data Preparation',
      desc: 'Clean missing values, normalize features, extract numerical representations (feature matrix X).',
      detail: 'Features must be measurable and informative. Text must be vectorized or converted into numerical counts.',
    },
    {
      num: '04',
      title: 'Dataset Splitting',
      desc: 'Partition available data into separate Training, Validation, and Testing sets.',
      detail: 'The cardinal rule of ML: Never evaluate final generalization on training data alone.',
    },
    {
      num: '05',
      title: 'Model Training',
      desc: 'Feed training examples to learning algorithms (KNN, Decision Trees, Logistic Regression) to optimize model parameters.',
      detail: 'The model discovers mathematical decision boundaries separating the classes.',
    },
    {
      num: '06',
      title: 'Model Evaluation',
      desc: 'Measure performance on unseen test data using Accuracy, Precision, Recall, and the Confusion Matrix.',
      detail: 'Check for overfitting, underfitting, and sensitivity to class imbalance.',
    },
    {
      num: '07',
      title: 'Deployment & Monitoring',
      desc: 'Deploy the model into production and continually monitor for data drift or performance degradation.',
      detail: 'Spammers change tactics over time; models must be retrained on new distributions.',
    },
  ];

  const current = stages[selectedStage - 1];

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            Interactive Lifecycle Flow · Slide 18
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base">
            The 7-Stage End-to-End Supervised Classification Workflow
          </h4>
        </div>
        <span className="text-xs font-mono text-[#6D5970] bg-[#FFF0F6] px-2.5 py-1 rounded-full border border-[#FFB8D2]">
          Step {current.num} of 07
        </span>
      </div>

      {/* 7 Stage Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((st, idx) => {
          const isActive = selectedStage === idx + 1;
          return (
            <button
              key={st.num}
              onClick={() => setSelectedStage(idx + 1)}
              className={`p-2.5 rounded-xl text-left border-2 transition-all ${
                isActive
                  ? 'border-[#FF2E7E] bg-[#FFE4EF] shadow-xs'
                  : 'border-gray-200 bg-white hover:border-[#FFB8D2]'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold block ${isActive ? 'text-[#FF2E7E]' : 'text-gray-400'}`}>
                Stage {st.num}
              </span>
              <span className="text-xs font-bold text-[#1A1020] line-clamp-1 mt-0.5">
                {st.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Box */}
      <div className="p-4 rounded-xl bg-[#FFF7FA] border border-[#FFD6E5] space-y-2 animate-fadeIn">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-xs px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white font-bold">
            STAGE {current.num}
          </span>
          <h5 className="font-extrabold text-sm text-[#1A1020]">{current.title}</h5>
        </div>
        <p className="text-xs text-[#4A3B4E] leading-relaxed font-semibold">{current.desc}</p>
        <p className="text-xs text-[#6D5970] leading-relaxed bg-white p-3 rounded-lg border border-[#F0D6E2]">
          <strong className="text-[#FF2E7E]">Explanation:</strong> {current.detail}
        </p>
      </div>
    </div>
  );
}

/* ─── SLIDE 29 VISUAL: Classroom Challenge Questions & Answers ─── */
export function ClassroomChallengeWidget() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const questions = [
    {
      id: 1,
      q: 'Is this a classification or regression problem? Explain why.',
      a: 'Classification problem. The output is a discrete category (Pass or Fail), not a continuous numerical quantity.',
      type: 'Core Concept',
    },
    {
      id: 2,
      q: 'What are the observations?',
      a: 'Each individual student in the university dataset is one observation (sample/instance).',
      type: 'Dataset Terminology',
    },
    {
      id: 3,
      q: 'Identify four possible features.',
      a: '1) Number of classes attended, 2) Number of assignments submitted, 3) Average assignment score, 4) Hours spent studying per week.',
      type: 'Feature Space',
    },
    {
      id: 4,
      q: 'What is the target label?',
      a: 'The final examination outcome of the student (y).',
      type: 'Target',
    },
    {
      id: 5,
      q: 'What are the possible classes?',
      a: 'C = {Pass, Fail}.',
      type: 'Class Formulation',
    },
    {
      id: 6,
      q: 'Is this binary or multiclass classification?',
      a: 'Binary classification, because |C| = 2 (exactly two mutually exclusive classes).',
      type: 'Problem Type',
    },
    {
      id: 7,
      q: 'What information would the training dataset contain?',
      a: 'Historical records of past students containing their four feature values (X) along with their known, verified final outcome (y ∈ {Pass, Fail}).',
      type: 'Supervised Learning',
    },
    {
      id: 8,
      q: 'What happens when a new student’s information is provided to the trained model?',
      a: 'The model extracts the 4-dimensional feature vector x_new = [x1, x2, x3, x4]ᵀ and uses its learned function f to output a predicted category ŷ = f(x_new) ∈ {Pass, Fail}.',
      type: 'Inference',
    },
    {
      id: 9,
      q: 'How could the university evaluate the model?',
      a: 'By using held-out test data (students not used in training), constructing a confusion matrix (TP, FP, FN, TN), and calculating Accuracy, Precision, Recall, and F1-score.',
      type: 'Evaluation',
    },
    {
      id: 10,
      q: 'Why would evaluating the model only on its training examples be insufficient?',
      a: 'Because of overfitting! A model could memorize student IDs or specific training details without learning generalizable academic relationships.',
      type: 'Generalization',
    },
  ];

  const toggle = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const allRevealed = Object.keys(revealed).length === questions.length;
    if (allRevealed) setRevealed({});
    else {
      const all: Record<number, boolean> = {};
      questions.forEach((q) => (all[q.id] = true));
      setRevealed(all);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-[#FFD6E5] bg-white p-5 shadow-sm space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7EAF0] pb-3">
        <div>
          <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase tracking-wider font-bold">
            Classroom Challenge Deck · Slide 29
          </span>
          <h4 className="font-extrabold text-[#1A1020] text-base">
            Intelligent Student-Support System: 10 Classroom Discussion Questions
          </h4>
        </div>
        <button
          onClick={toggleAll}
          className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#FFE4EF] text-[#FF2E7E] hover:bg-[#FFD6E5] transition-colors self-start sm:self-auto"
        >
          {Object.keys(revealed).length === questions.length ? 'Hide All Answers' : 'Reveal All Answers'}
        </button>
      </div>

      {/* Scenario Card */}
      <div className="p-3.5 bg-[#FFF0F6] border border-[#FFB8D2] rounded-xl text-xs space-y-1">
        <span className="font-pixel text-[10px] text-[#FF2E7E] uppercase font-bold block">Scenario</span>
        <p className="text-[#1A1020] font-semibold">
          A university wants to predict whether a student will Pass or Fail the final exam based on 4 features:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 font-mono text-[11px] text-[#96003B]">
          <div className="bg-white p-1.5 rounded border border-[#FFD6E5]">1. Classes attended</div>
          <div className="bg-white p-1.5 rounded border border-[#FFD6E5]">2. Assignments submitted</div>
          <div className="bg-white p-1.5 rounded border border-[#FFD6E5]">3. Avg assignment score</div>
          <div className="bg-white p-1.5 rounded border border-[#FFD6E5]">4. Study hours / week</div>
        </div>
      </div>

      {/* 10 Questions Accordion */}
      <div className="space-y-2.5">
        {questions.map((item) => {
          const isOpen = !!revealed[item.id];
          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all ${
                isOpen ? 'border-[#FFB8D2] bg-[#FFF7FA]' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full p-3 text-left flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-[#FFE4EF] text-[#FF2E7E] text-[11px] font-mono font-bold flex items-center justify-center flex-shrink-0">
                    {item.id}
                  </span>
                  <span className="font-bold text-xs text-[#1A1020]">{item.q}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600 hidden sm:inline-block">
                    {item.type}
                  </span>
                  <span className="text-xs text-[#FF2E7E] font-bold">
                    {isOpen ? 'Hide' : 'Answer'}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="px-3 pb-3 pt-1 border-t border-[#F0D6E2] text-xs animate-fadeIn">
                  <div className="bg-white p-3 rounded-lg border border-[#FFD6E5] text-emerald-900 font-semibold leading-relaxed">
                    <span className="text-[#FF2E7E] font-bold block mb-0.5 font-pixel text-[10px]">
                      MODEL ANSWER & EXPLANATION:
                    </span>
                    {item.a}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
