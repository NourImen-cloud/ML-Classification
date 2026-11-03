'use client';

import { ReactNode } from 'react';

interface ConceptCardProps {
  badge?: string;
  title: string;
  children: ReactNode;
  color?: string;
  className?: string;
}

export function ConceptCard({ badge, title, children, color = '#FF2E7E', className = '' }: ConceptCardProps) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm transition-all ${className}`}
      style={{ borderColor: '#F0D6E2' }}
    >
      {(badge || title) && (
        <div className="flex items-center gap-2 mb-3">
          {badge && (
            <span className="font-pixel text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
              {badge}
            </span>
          )}
          <h4 className="font-bold text-sm text-[#1A1020]">{title}</h4>
        </div>
      )}
      <div className="text-[#4A3B4E] text-sm leading-relaxed">{children}</div>
    </div>
  );
}

interface SectionHeaderProps {
  part: number;
  time: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export function SectionHeader({ part, time, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-pixel text-xs px-2.5 py-1 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold border border-[#FFB8D2]">
          PART {part.toString().padStart(2, '0')}
        </span>
        <span className="text-[#6D5970] text-xs font-mono font-semibold">{time}</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1020] mb-2 tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="text-[#6D5970] text-base md:text-lg font-medium">{subtitle}</p>}
    </div>
  );
}

interface CompareTableProps {
  headers: string[];
  rows: (string | ReactNode)[][];
  highlight?: number[];
}

export function CompareTable({ headers, rows, highlight = [] }: CompareTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-[#FFD6E5] bg-white shadow-sm my-4">
      <table className="w-full border-collapse text-left">
        {/* Table Header */}
        <thead>
          <tr className="bg-[#FFE4EF] border-b-2 border-[#FFB8D2]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-[#96003B] font-mono first:rounded-tl-xl last:rounded-tr-xl"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="divide-y divide-[#F7EAF0]">
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`transition-colors hover:bg-[#FFF7FA] ${
                highlight.includes(ri) ? 'bg-[#FFE4EF]/60 font-semibold' : ri % 2 === 1 ? 'bg-[#FFFDFE]' : 'bg-white'
              }`}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-3.5 px-4 text-xs md:text-sm leading-relaxed ${
                    ci === 0
                      ? 'font-bold text-[#1A1020] bg-[#FFF9FC]/60 border-r border-[#F7EAF0] w-1/4'
                      : 'text-[#2D1F33] font-medium'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ThoughtPromptProps {
  question: string;
  context?: string;
}

export function ThoughtPrompt({ question, context }: ThoughtPromptProps) {
  return (
    <div className="rounded-2xl border-2 border-[#FFB8D2] bg-[#FFF7FA] p-5 mb-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#FF2E7E] text-white flex items-center justify-center font-pixel text-xs flex-shrink-0">
          ?
        </div>
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            Core Question
          </span>
          <p className="text-[#1A1020] font-semibold text-base leading-relaxed">{question}</p>
          {context && <p className="text-[#6D5970] text-xs mt-1.5 leading-relaxed">{context}</p>}
        </div>
      </div>
    </div>
  );
}

export function AskFirst({ question, hint }: { question: string; hint?: string; timer?: number }) {
  return <ThoughtPrompt question={question} context={hint} />;
}

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger' | 'success';
  title?: string;
  children: ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info:    { border: '#F0D6E2', bg: '#FFF7FA', tagBg: '#FFE4EF', tagColor: '#FF2E7E', label: 'NOTE' },
    warning: { border: '#FED7AA', bg: '#FFFBEB', tagBg: '#FEF3C7', tagColor: '#D97706', label: 'CAUTION' },
    tip:     { border: '#D1FAE5', bg: '#F0FDF4', tagBg: '#DCFCE7', tagColor: '#059669', label: 'INSIGHT' },
    danger:  { border: '#FECACA', bg: '#FEF2F2', tagBg: '#FEE2E2', tagColor: '#DC2626', label: 'COMMON TRAP' },
    success: { border: '#D1FAE5', bg: '#F0FDF4', tagBg: '#DCFCE7', tagColor: '#059669', label: 'KEY PRINCIPLE' },
  }[type];

  return (
    <div className="rounded-2xl p-4 border" style={{ borderColor: styles.border, background: styles.bg }}>
      <div className="flex items-start gap-3">
        <span
          className="font-pixel text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
          style={{ background: styles.tagBg, color: styles.tagColor }}
        >
          {styles.label}
        </span>
        <div>
          {title && <p className="font-bold text-sm mb-1 text-[#1A1020]">{title}</p>}
          <div className="text-[#4A3B4E] text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function KeyInsight({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#F0D6E2] bg-[#FFF7FA] p-3.5 flex items-start gap-2.5 my-4">
      <span className="font-pixel text-[9px] px-2 py-0.5 rounded-full bg-[#1A1020] text-white font-bold mt-0.5">
        CORE
      </span>
      <p className="text-[#2D1F33] text-xs leading-relaxed font-semibold">{children}</p>
    </div>
  );
}

export function TipPresenter({ children }: { children: ReactNode }) {
  return <KeyInsight>{children}</KeyInsight>;
}

export function MathFormula({ formula, label }: { formula: string; label?: string }) {
  return (
    <div className="my-4 flex flex-col items-center gap-1.5">
      {label && <p className="text-[#6D5970] text-xs uppercase font-bold tracking-wider">{label}</p>}
      <div className="bg-[#FFF0F6] border border-[#FFB8D2] text-[#96003B] rounded-xl px-6 py-2.5 font-mono text-sm font-semibold shadow-inner">
        {formula}
      </div>
    </div>
  );
}
