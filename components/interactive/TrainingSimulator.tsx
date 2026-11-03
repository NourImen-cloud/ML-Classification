'use client';

import React, { useState, useEffect } from 'react';
import { emailDataset } from '@/lib/data';

export default function TrainingSimulator() {
  const [epoch, setEpoch] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [learningRate, setLearningRate] = useState(0.08);
  const [weights, setWeights] = useState({ w1: -0.2, w2: 0.1, b: 0.5 });
  const [lossHistory, setLossHistory] = useState<number[]>([0.85]);
  const [accHistory, setAccHistory] = useState<number[]>([50]);

  const data = emailDataset.map(e => ({
    x1: e.links / 8,
    x2: e.suspiciousWords / 8,
    y: e.label === 'spam' ? 1 : 0,
    origX: e.links,
    origY: e.suspiciousWords,
    label: e.label,
    id: e.id,
  }));

  const sigmoid = (z: number) => 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, z))));

  const evaluate = (w1: number, w2: number, b: number) => {
    let loss = 0;
    let correct = 0;
    for (const d of data) {
      const z = w1 * d.x1 + w2 * d.x2 + b;
      const yHat = sigmoid(z);
      const eps = 1e-7;
      loss += -(d.y * Math.log(yHat + eps) + (1 - d.y) * Math.log(1 - yHat + eps));
      const pred = yHat >= 0.5 ? 1 : 0;
      if (pred === d.y) correct++;
    }
    return {
      loss: parseFloat((loss / data.length).toFixed(3)),
      acc: Math.round((correct / data.length) * 100),
    };
  };

  const stepTraining = () => {
    let gradW1 = 0;
    let gradW2 = 0;
    let gradB = 0;

    for (const d of data) {
      const z = weights.w1 * d.x1 + weights.w2 * d.x2 + weights.b;
      const yHat = sigmoid(z);
      const error = yHat - d.y;
      gradW1 += error * d.x1;
      gradW2 += error * d.x2;
      gradB += error;
    }

    const n = data.length;
    const newW1 = weights.w1 - learningRate * (gradW1 / n);
    const newW2 = weights.w2 - learningRate * (gradW2 / n);
    const newB = weights.b - learningRate * (gradB / n);

    const { loss, acc } = evaluate(newW1, newW2, newB);

    setWeights({ w1: newW1, w2: newW2, b: newB });
    setEpoch(prev => prev + 1);
    setLossHistory(prev => [...prev.slice(-30), loss]);
    setAccHistory(prev => [...prev.slice(-30), acc]);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && epoch < 100) {
      timer = setTimeout(stepTraining, 80);
    } else if (epoch >= 100) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, epoch, weights]);

  const reset = () => {
    setIsRunning(false);
    setEpoch(0);
    setWeights({ w1: -0.2, w2: 0.1, b: 0.5 });
    setLossHistory([0.85]);
    setAccHistory([50]);
  };

  const W = 360;
  const H = 260;
  const PAD = 35;
  const scaleX = (v: number) => PAD + (v / 8) * (W - PAD * 1.5);
  const scaleY = (v: number) => H - PAD - (v / 8) * (H - PAD * 1.5);

  const getBoundaryPoints = () => {
    if (Math.abs(weights.w2) < 0.001) return null;
    const xA = 0;
    const yA = 8 * (-weights.b - weights.w1 * (xA / 8)) / weights.w2;
    const xB = 8;
    const yB = 8 * (-weights.b - weights.w1 * (xB / 8)) / weights.w2;
    return {
      x1: scaleX(xA),
      y1: scaleY(yA),
      x2: scaleX(xB),
      y2: scaleY(yB),
    };
  };

  const line = getBoundaryPoints();
  const currentEval = evaluate(weights.w1, weights.w2, weights.b);

  return (
    <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-0.5">
            OPTIMIZATION SIMULATOR
          </span>
          <h3 className="text-base font-extrabold text-[#1A1020]">
            Gradient Descent Boundary Convergence
          </h3>
          <p className="text-xs text-[#6D5970] mt-0.5">
            Observe the decision line rotate and translate as parameters update each epoch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn-pink px-4 py-1.5 text-xs font-bold"
          >
            {isRunning ? 'Pause' : epoch >= 100 ? 'Converged' : 'Run Training'}
          </button>
          <button
            onClick={stepTraining}
            disabled={isRunning || epoch >= 100}
            className="btn-white px-3 py-1.5 text-xs font-bold disabled:opacity-40"
          >
            Step +1
          </button>
          <button
            onClick={reset}
            className="btn-white px-3 py-1.5 text-xs font-bold"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Metric badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#F0D6E2]">
          <span className="text-[10px] font-mono text-[#6D5970] block uppercase font-bold">Epoch</span>
          <span className="text-lg font-mono font-bold text-[#FF2E7E]">{epoch} / 100</span>
        </div>
        <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#F0D6E2]">
          <span className="text-[10px] font-mono text-[#6D5970] block uppercase font-bold">Binary Cross-Entropy</span>
          <span className="text-lg font-mono font-bold text-[#1A1020]">{currentEval.loss.toFixed(3)}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#F0D6E2]">
          <span className="text-[10px] font-mono text-[#6D5970] block uppercase font-bold">Training Accuracy</span>
          <span className="text-lg font-mono font-bold text-[#059669]">{currentEval.acc}%</span>
        </div>
        <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#F0D6E2]">
          <span className="text-[10px] font-mono text-[#6D5970] block uppercase font-bold">Learning Rate (α)</span>
          <input
            type="range"
            min={0.02}
            max={0.25}
            step={0.01}
            value={learningRate}
            onChange={e => setLearningRate(+e.target.value)}
            className="w-full mt-1"
          />
          <span className="text-[10px] font-mono font-bold text-[#FF2E7E]">{learningRate.toFixed(2)}</span>
        </div>
      </div>

      {/* Visualizers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Boundary Canvas */}
        <div className="bg-[#FFF9FC] rounded-2xl border border-[#F0D6E2] p-2 flex flex-col items-center shadow-inner">
          <span className="text-[10px] font-mono text-[#6D5970] self-start px-2 py-1">Feature Space Boundary:</span>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm select-none">
            <rect width={W} height={H} fill="#FFF9FC" rx={10} />

            {[0, 2, 4, 6, 8].map(v => (
              <g key={v}>
                <line x1={scaleX(v)} y1={PAD / 2} x2={scaleX(v)} y2={H - PAD} stroke="#F0D6E2" strokeWidth={0.8} />
                <line x1={PAD} y1={scaleY(v)} x2={W - PAD / 2} y2={scaleY(v)} stroke="#F0D6E2" strokeWidth={0.8} />
                <text x={scaleX(v)} y={H - PAD + 14} textAnchor="middle" fill="#6D5970" fontSize={9} fontFamily="monospace">{v}</text>
                <text x={PAD - 6} y={scaleY(v) + 3} textAnchor="end" fill="#6D5970" fontSize={9} fontFamily="monospace">{v}</text>
              </g>
            ))}
            <line x1={PAD} y1={H - PAD} x2={W - PAD / 2} y2={H - PAD} stroke="#1A1020" strokeWidth={1.5} />
            <line x1={PAD} y1={H - PAD} x2={PAD} y2={PAD / 2} stroke="#1A1020" strokeWidth={1.5} />

            {/* Decision Line */}
            {line && (
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#FF2E7E"
                strokeWidth={2.5}
              />
            )}

            {/* Points */}
            {data.map(d => {
              const cx = scaleX(d.origX);
              const cy = scaleY(d.origY);
              const isSpam = d.y === 1;
              return (
                <circle
                  key={d.id}
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={isSpam ? '#FF2E7E' : '#10B981'}
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                />
              );
            })}
          </svg>
        </div>

        {/* Loss Curve */}
        <div className="bg-[#FFF9FC] rounded-2xl border border-[#F0D6E2] p-4 flex flex-col justify-between h-full shadow-inner">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1A1020]">Loss Curve (Convergence)</span>
              <span className="text-[10px] font-mono text-[#059669]">Loss: {currentEval.loss}</span>
            </div>
            <svg width={280} height={120} viewBox="0 0 280 120" className="w-full overflow-visible">
              <line x1={0} y1={100} x2={280} y2={100} stroke="#F0D6E2" strokeWidth={1} />
              <line x1={0} y1={20} x2={280} y2={20} stroke="#F0D6E2" strokeWidth={0.5} strokeDasharray="3,3" />
              <polyline
                fill="none"
                stroke="#FF2E7E"
                strokeWidth={2}
                points={lossHistory
                  .map((loss, idx) => {
                    const x = (idx / Math.max(1, lossHistory.length - 1)) * 280;
                    const y = Math.max(15, Math.min(105, 110 - loss * 100));
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
            </svg>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#F0D6E2] font-mono text-xs space-y-0.5 mt-3 shadow-sm">
            <span className="text-[9px] text-[#6D5970] uppercase font-bold block">Optimized Parameters:</span>
            <div className="flex justify-between text-[11px] text-[#1A1020]">
              <span>w1 (Links): {weights.w1.toFixed(3)}</span>
              <span>w2 (Words): {weights.w2.toFixed(3)}</span>
              <span>bias: {weights.b.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
