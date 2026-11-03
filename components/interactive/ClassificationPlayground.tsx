'use client';

import React, { useState, useMemo } from 'react';
import { emailDataset, Email } from '@/lib/data';
import { knnPredict } from '@/lib/knn';

type AlgorithmType = 'knn-1' | 'knn-3' | 'knn-7' | 'tree' | 'logistic' | 'svm';

interface Point {
  x: number;
  y: number;
  label: 'spam' | 'not-spam';
  id?: string;
}

export default function ClassificationPlayground() {
  const [points, setPoints] = useState<Point[]>(() =>
    emailDataset.map(e => ({ x: e.links, y: e.suspiciousWords, label: e.label, id: e.id }))
  );
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmType>('knn-3');
  const [currentLabel, setCurrentLabel] = useState<'spam' | 'not-spam'>('not-spam');
  const [testPoint, setTestPoint] = useState<{ x: number; y: number } | null>({ x: 2, y: 3 });

  const W = 400;
  const H = 340;
  const PAD = 40;

  const scaleX = (v: number) => PAD + (v / 8) * (W - PAD * 1.5);
  const scaleY = (v: number) => H - PAD - (v / 8) * (H - PAD * 1.5);
  const unscaleX = (px: number) => Math.max(0, Math.min(8, ((px - PAD) / (W - PAD * 1.5)) * 8));
  const unscaleY = (py: number) => Math.max(0, Math.min(8, ((H - PAD - py) / (H - PAD * 1.5)) * 8));

  // Predict function for any (x, y) based on selected algorithm
  const predictAt = (x: number, y: number, algo: AlgorithmType): 'spam' | 'not-spam' => {
    if (algo.startsWith('knn')) {
      const k = parseInt(algo.split('-')[1]);
      const datasetEmails: Email[] = points.map((p, idx) => ({
        id: p.id || `P${idx}`,
        links: p.x,
        suspiciousWords: p.y,
        label: p.label,
      }));
      const res = knnPredict(x, y, k, datasetEmails);
      return res.prediction === 'spam' ? 'spam' : 'not-spam';
    }
    if (algo === 'tree') {
      if (x > 3.5) return 'spam';
      if (x <= 1.5) return 'not-spam';
      return y > 1.5 ? 'spam' : 'not-spam';
    }
    if (algo === 'logistic') {
      const score = 0.75 * x + 0.65 * y - 3.8;
      return score >= 0 ? 'spam' : 'not-spam';
    }
    if (algo === 'svm') {
      const score = 0.85 * x + 0.85 * y - 4.6;
      return score >= 0 ? 'spam' : 'not-spam';
    }
    return 'not-spam';
  };

  // Compute 2D Decision Boundary Grid (resolution 26x26)
  const boundaryGrid = useMemo(() => {
    const res = 26;
    const grid: { x: number; y: number; label: 'spam' | 'not-spam' }[] = [];
    for (let xi = 0; xi <= res; xi++) {
      for (let yi = 0; yi <= res; yi++) {
        const gx = (xi / res) * 8;
        const gy = (yi / res) * 8;
        grid.push({ x: gx, y: gy, label: predictAt(gx, gy, selectedAlgo) });
      }
    }
    return grid;
  }, [points, selectedAlgo]);

  const testPrediction = testPoint ? predictAt(testPoint.x, testPoint.y, selectedAlgo) : null;

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const dataX = parseFloat(unscaleX(clickX).toFixed(1));
    const dataY = parseFloat(unscaleY(clickY).toFixed(1));

    if (e.shiftKey) {
      setTestPoint({ x: dataX, y: dataY });
    } else {
      setPoints(prev => [...prev, { x: dataX, y: dataY, label: currentLabel, id: `P-${prev.length + 1}` }]);
    }
  };

  const resetToSpamDataset = () => {
    setPoints(emailDataset.map(e => ({ x: e.links, y: e.suspiciousWords, label: e.label, id: e.id })));
    setTestPoint({ x: 2, y: 3 });
  };

  return (
    <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-0.5">
            INTERACTIVE LAB
          </span>
          <h3 className="text-base font-extrabold text-[#1A1020]">
            Decision Boundary Visualizer
          </h3>
          <p className="text-xs text-[#6D5970] mt-0.5">
            Click on grid to add training points. <strong>Shift+Click</strong> to position probe point.
          </p>
        </div>

        <button
          onClick={resetToSpamDataset}
          className="btn-white px-3.5 py-1.5 text-xs font-bold"
        >
          Reset Baseline
        </button>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#FFF7FA] border border-[#F0D6E2]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-[#6D5970] font-semibold mr-1 font-mono">Algorithm:</span>
          {[
            { id: 'knn-1', label: 'KNN (K=1)' },
            { id: 'knn-3', label: 'KNN (K=3)' },
            { id: 'knn-7', label: 'KNN (K=7)' },
            { id: 'tree', label: 'Decision Tree' },
            { id: 'logistic', label: 'Logistic Reg.' },
            { id: 'svm', label: 'SVM Margin' },
          ].map(algo => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgo(algo.id as AlgorithmType)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                selectedAlgo === algo.id
                  ? 'border-[#FF2E7E] bg-[#FF2E7E] text-white shadow-sm'
                  : 'border-[#F0D6E2] bg-white text-[#6D5970] hover:border-[#FF2E7E]'
              }`}
            >
              {algo.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6D5970] font-semibold font-mono">Add:</span>
          <button
            onClick={() => setCurrentLabel('not-spam')}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
              currentLabel === 'not-spam'
                ? 'bg-[#10B981] text-white border-[#10B981]'
                : 'border-[#F0D6E2] bg-white text-[#6D5970]'
            }`}
          >
            Not Spam
          </button>
          <button
            onClick={() => setCurrentLabel('spam')}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
              currentLabel === 'spam'
                ? 'bg-[#FF2E7E] text-white border-[#FF2E7E]'
                : 'border-[#F0D6E2] bg-white text-[#6D5970]'
            }`}
          >
            Spam
          </button>
        </div>
      </div>

      {/* Main visualization grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* SVG Canvas */}
        <div className="md:col-span-2 relative bg-[#FFF9FC] rounded-2xl border border-[#F0D6E2] p-2 flex justify-center shadow-inner">
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full max-w-md cursor-crosshair select-none"
            onClick={handleSvgClick}
          >
            <rect width={W} height={H} fill="#FFF9FC" rx={12} />

            {/* Boundary heatmap */}
            {boundaryGrid.map((pt, i) => (
              <rect
                key={i}
                x={scaleX(pt.x) - 7}
                y={scaleY(pt.y) - 7}
                width={15}
                height={15}
                fill={pt.label === 'spam' ? '#FF2E7E' : '#10B981'}
                opacity={0.16}
              />
            ))}

            {/* Grid coordinates */}
            {[0, 2, 4, 6, 8].map(v => (
              <g key={v}>
                <line x1={scaleX(v)} y1={PAD / 2} x2={scaleX(v)} y2={H - PAD} stroke="#F0D6E2" strokeWidth={0.8} />
                <line x1={PAD} y1={scaleY(v)} x2={W - PAD / 2} y2={scaleY(v)} stroke="#F0D6E2" strokeWidth={0.8} />
                <text x={scaleX(v)} y={H - PAD + 14} textAnchor="middle" fill="#6D5970" fontSize={10} fontFamily="monospace">{v}</text>
                <text x={PAD - 6} y={scaleY(v) + 3} textAnchor="end" fill="#6D5970" fontSize={10} fontFamily="monospace">{v}</text>
              </g>
            ))}

            {/* Axes */}
            <line x1={PAD} y1={H - PAD} x2={W - PAD / 2} y2={H - PAD} stroke="#1A1020" strokeWidth={1.5} />
            <line x1={PAD} y1={H - PAD} x2={PAD} y2={PAD / 2} stroke="#1A1020" strokeWidth={1.5} />
            <text x={W / 2} y={H - 4} textAnchor="middle" fill="#1A1020" fontSize={11} fontWeight="bold">Links (x)</text>
            <text x={12} y={H / 2} textAnchor="middle" fill="#1A1020" fontSize={11} fontWeight="bold" transform={`rotate(-90, 12, ${H / 2})`}>Words (y)</text>

            {/* Training Points */}
            {points.map((pt, idx) => {
              const cx = scaleX(pt.x);
              const cy = scaleY(pt.y);
              const isSpam = pt.label === 'spam';
              return (
                <g key={idx}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={5.5}
                    fill={isSpam ? '#FF2E7E' : '#10B981'}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                  />
                  {pt.id && (
                    <text x={cx + 7} y={cy - 5} fill={isSpam ? '#96003B' : '#065F46'} fontSize={9} fontWeight="bold" fontFamily="monospace">
                      {pt.id}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Probe Point */}
            {testPoint && (
              <g>
                <circle cx={scaleX(testPoint.x)} cy={scaleY(testPoint.y)} r={20} fill="#FF2E7E" opacity={0.15} />
                <circle
                  cx={scaleX(testPoint.x)}
                  cy={scaleY(testPoint.y)}
                  r={8}
                  fill="#FFFFFF"
                  stroke="#FF2E7E"
                  strokeWidth={2.5}
                />
                <text x={scaleX(testPoint.x) + 11} y={scaleY(testPoint.y) - 6} fill="#FF2E7E" fontSize={11} fontWeight="bold" fontFamily="monospace">
                  Probe ({testPoint.x}, {testPoint.y})
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          {testPoint && (
            <div className="p-4 rounded-2xl border border-[#F0D6E2] bg-[#FFF7FA] space-y-1">
              <span className="text-[10px] font-mono text-[#6D5970] uppercase font-bold block">
                Probe Result ({testPoint.x}, {testPoint.y}):
              </span>
              <p
                className="font-pixel text-base font-bold"
                style={{ color: testPrediction === 'spam' ? '#FF2E7E' : '#059669' }}
              >
                {testPrediction === 'spam' ? 'PREDICTED SPAM' : 'PREDICTED NOT SPAM'}
              </p>
              <p className="text-[11px] text-[#6D5970] font-mono">
                Model: {selectedAlgo.toUpperCase()}
              </p>
            </div>
          )}

          <div className="p-4 rounded-2xl border border-[#F0D6E2] bg-white text-xs space-y-1.5 shadow-sm">
            <span className="font-bold text-[#1A1020] block">Boundary Nature:</span>
            {selectedAlgo === 'knn-1' && (
              <p className="text-[#6D5970] leading-relaxed">
                Forms isolated islands around individual outliers. Highly sensitive to noise.
              </p>
            )}
            {selectedAlgo === 'knn-3' && (
              <p className="text-[#6D5970] leading-relaxed">
                Smooths out individual noise points through majority voting. Balanced.
              </p>
            )}
            {selectedAlgo === 'knn-7' && (
              <p className="text-[#6D5970] leading-relaxed">
                Broad global smoothing. Resistant to local density changes.
              </p>
            )}
            {selectedAlgo === 'tree' && (
              <p className="text-[#6D5970] leading-relaxed">
                Forms orthogonal axis-aligned rectangular decision regions.
              </p>
            )}
            {selectedAlgo === 'logistic' && (
              <p className="text-[#6D5970] leading-relaxed">
                Forms a single continuous linear hyperplane separating feature space.
              </p>
            )}
            {selectedAlgo === 'svm' && (
              <p className="text-[#6D5970] leading-relaxed">
                Maximizes margin clearance between the boundary and nearest training points.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
