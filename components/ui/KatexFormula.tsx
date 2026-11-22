'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface KatexFormulaProps {
  formula: string;
  block?: boolean;
  className?: string;
  label?: string;
}

export function KatexFormula({ formula, block = true, className = '', label }: KatexFormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: block,
        throwOnError: false,
      });
    } catch {
      return `<span class="text-rose-500">${formula}</span>`;
    }
  }, [formula, block]);

  if (!block) {
    return (
      <span
        className={`inline-block mx-1 font-serif text-[#1A1020] ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className={`my-4 flex flex-col items-center gap-1.5 ${className}`}>
      {label && (
        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#FF2E7E] bg-[#FFE4EF] px-2.5 py-0.5 rounded-full border border-[#FFB8D2]">
          {label}
        </span>
      )}
      <div
        className="w-full max-w-2xl overflow-x-auto py-3 px-6 rounded-2xl bg-[#FFF7FA] border-2 border-[#FFD6E5] text-[#1A1020] shadow-sm flex justify-center text-center text-sm md:text-base font-semibold"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export function MathInline({ formula }: { formula: string }) {
  return <KatexFormula formula={formula} block={false} />;
}

export function MathBlock({ formula, label }: { formula: string; label?: string }) {
  return <KatexFormula formula={formula} block={true} label={label} />;
}
