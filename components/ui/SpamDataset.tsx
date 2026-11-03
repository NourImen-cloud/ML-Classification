'use client';

import { emailDataset } from '@/lib/data';

interface Props {
  highlightId?: string;
  showLabel?: boolean;
  dimmed?: string[];
  className?: string;
}

export function SpamDataTable({ highlightId, showLabel = true, dimmed = [], className = '' }: Props) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-[#F0D6E2] bg-white shadow-sm ${className}`}>
      <table className="data-table min-w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Links (x)</th>
            <th>Suspicious Words (y)</th>
            {showLabel && <th>Label</th>}
          </tr>
        </thead>
        <tbody>
          {emailDataset.map(email => (
            <tr
              key={email.id}
              className={`transition-colors ${highlightId === email.id ? 'highlight' : ''} ${dimmed.includes(email.id) ? 'opacity-30' : ''}`}
            >
              <td>
                <span className="font-mono font-bold text-[#1A1020]">
                  {email.id}
                </span>
                {email.id === 'E10' && (
                  <span className="ml-1.5 text-[10px] font-pixel px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                    noise point
                  </span>
                )}
              </td>
              <td className="font-mono font-medium text-[#4A3B4E]">{email.links}</td>
              <td className="font-mono font-medium text-[#4A3B4E]">{email.suspiciousWords}</td>
              {showLabel && (
                <td>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold font-mono"
                    style={
                      email.label === 'spam'
                        ? { background: '#FFE4EF', color: '#FF2E7E', border: '1px solid #FFB8D2' }
                        : { background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }
                    }
                  >
                    {email.label === 'spam' ? 'Spam' : 'Not Spam'}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SpamScatterPlot({
  showNew = false,
  highlightId,
  newPoint,
  showBoundary = false,
  knnGrid,
}: {
  showNew?: boolean;
  highlightId?: string;
  newPoint?: { x: number; y: number; label?: string };
  showBoundary?: boolean;
  knnGrid?: Array<{ x: number; y: number; label: string }>;
}) {
  const W = 340, H = 280, PAD = 40;
  const scaleX = (v: number) => PAD + (v / 8) * (W - PAD * 1.5);
  const scaleY = (v: number) => H - PAD - (v / 8) * (H - PAD * 1.5);

  const newEmails = [
    { id: 'N1', links: 0, suspiciousWords: 0, note: 'New 1' },
    { id: 'N2', links: 6, suspiciousWords: 6, note: 'New 2' },
    { id: 'N3', links: 2, suspiciousWords: 3, note: 'New 3 (Probe)' },
  ];

  return (
    <div className="rounded-2xl border border-[#F0D6E2] bg-white p-4 shadow-sm">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto block select-none">
        {/* Background Canvas fill */}
        <rect width={W} height={H} fill="#FFF9FC" rx={12} />

        {/* Decision boundary fill */}
        {knnGrid && knnGrid.map((pt, i) => (
          <rect
            key={i}
            x={scaleX(pt.x) - 5}
            y={scaleY(pt.y) - 5}
            width={11} height={11}
            fill={pt.label === 'spam' ? '#FF2E7E' : pt.label === 'not-spam' ? '#10B981' : '#94A3B8'}
            opacity={0.16}
          />
        ))}

        {/* Grid lines */}
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

        {/* Axis labels */}
        <text x={W / 2} y={H - 4} textAnchor="middle" fill="#1A1020" fontSize={11} fontWeight="bold">Links (x)</text>
        <text x={12} y={H / 2} textAnchor="middle" fill="#1A1020" fontSize={11} fontWeight="bold" transform={`rotate(-90, 12, ${H / 2})`}>Words (y)</text>

        {/* Training points */}
        {emailDataset.map(email => {
          const cx = scaleX(email.links);
          const cy = scaleY(email.suspiciousWords);
          const isSpam = email.label === 'spam';
          const isHighlighted = highlightId === email.id;

          return (
            <g key={email.id}>
              {isHighlighted && (
                <circle cx={cx} cy={cy} r={16} fill={isSpam ? '#FF2E7E' : '#10B981'} opacity={0.25} />
              )}
              <circle
                cx={cx}
                cy={cy}
                r={isHighlighted ? 7 : 5.5}
                fill={isSpam ? '#FF2E7E' : '#10B981'}
                stroke="#FFFFFF"
                strokeWidth={1.5}
              />
              <text
                x={cx + 8}
                y={cy - 6}
                fill={isSpam ? '#96003B' : '#065F46'}
                fontSize={9}
                fontWeight="bold"
                fontFamily="monospace"
              >
                {email.id}
              </text>
            </g>
          );
        })}

        {/* New point overlay */}
        {newPoint && (
          <g>
            <circle cx={scaleX(newPoint.x)} cy={scaleY(newPoint.y)} r={18} fill="#FF2E7E" opacity={0.15} />
            <circle
              cx={scaleX(newPoint.x)}
              cy={scaleY(newPoint.y)}
              r={7}
              fill="#FFFFFF"
              stroke="#FF2E7E"
              strokeWidth={2.5}
            />
            <text x={scaleX(newPoint.x) + 10} y={scaleY(newPoint.y) - 8} fill="#FF2E7E" fontSize={10} fontWeight="bold" fontFamily="monospace">
              {newPoint.label ?? 'Probe'}
            </text>
          </g>
        )}

        {/* New emails for activity */}
        {showNew && newEmails.map(ne => (
          <g key={ne.id}>
            <circle cx={scaleX(ne.links)} cy={scaleY(ne.suspiciousWords)} r={7}
              fill="#FFFFFF" stroke="#1A1020" strokeWidth={2} strokeDasharray="3,2"
            />
            <text x={scaleX(ne.links) + 9} y={scaleY(ne.suspiciousWords) - 6} fill="#1A1020" fontSize={9} fontWeight="bold" fontFamily="monospace">
              {ne.note}
            </text>
          </g>
        ))}

        {/* Legend */}
        <g transform={`translate(${W - 105}, 12)`}>
          <rect width={95} height={48} rx={8} fill="#FFFFFF" stroke="#F0D6E2" strokeWidth={1} />
          <circle cx={14} cy={16} r={4.5} fill="#FF2E7E" />
          <text x={24} y={19} fill="#FF2E7E" fontSize={10} fontWeight="bold">Spam</text>
          <circle cx={14} cy={32} r={4.5} fill="#10B981" />
          <text x={24} y={35} fill="#10B981" fontSize={10} fontWeight="bold">Not Spam</text>
        </g>
      </svg>
    </div>
  );
}
