'use client';

import { useState } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongExplanations?: Record<number, string>;
}

interface QuizProps {
  questions: QuizQuestion[];
  partNumber: number;
}

export function Quiz({ questions, partNumber }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [allRevealed, setAllRevealed] = useState(false);

  const revealAll = () => {
    const r: Record<number, boolean> = {};
    questions.forEach((_, i) => (r[i] = true));
    setRevealed(r);
    setAllRevealed(true);
  };

  const reset = () => {
    setAnswers({});
    setRevealed({});
    setAllRevealed(false);
  };

  const score = questions.filter((q, i) => answers[i] === q.correctIndex).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F0D6E2] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] px-2 py-0.5 rounded-full bg-[#FFE4EF] text-[#FF2E7E] font-bold">
              CHECKPOINT {partNumber.toString().padStart(2, '0')}
            </span>
            <h3 className="font-extrabold text-[#1A1020] text-base">Knowledge Check</h3>
          </div>
          <p className="text-[#6D5970] text-xs mt-0.5">Verify your understanding before moving forward</p>
        </div>
        <div className="flex items-center gap-2">
          {allRevealed && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F6] border border-[#FFB8D2] text-xs">
              <span className="font-bold text-[#FF2E7E]">
                {score} / {questions.length}
              </span>
              <span className="text-[#6D5970]">correct</span>
            </div>
          )}
          <button
            onClick={revealAll}
            className="px-3 py-1.5 rounded-full border border-[#F0D6E2] text-[#6D5970] text-xs font-semibold hover:border-[#FF2E7E] hover:text-[#FF2E7E] transition-colors"
          >
            Reveal All
          </button>
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-full border border-[#F0D6E2] text-[#6D5970] text-xs font-semibold hover:border-[#FF2E7E] hover:text-[#FF2E7E] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {questions.map((q, qi) => {
        const selected = answers[qi] ?? null;
        const shown = revealed[qi] ?? false;
        const isCorrect = selected === q.correctIndex;

        return (
          <div key={qi} className="rounded-2xl border border-[#F0D6E2] bg-white overflow-hidden shadow-sm">
            {/* Question */}
            <div className="p-5">
              <div className="flex items-start gap-2.5 mb-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-[#FFF0F6] border border-[#FFB8D2] text-xs flex items-center justify-center font-bold text-[#FF2E7E]">
                  {qi + 1}
                </span>
                <p className="text-[#1A1020] font-bold text-sm leading-relaxed">{q.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-2 ml-8">
                {q.options.map((opt, oi) => {
                  let cls = 'quiz-option';
                  if (selected === oi) cls += ' selected';
                  if (shown) {
                    if (oi === q.correctIndex) cls += ' correct';
                    else if (selected === oi) cls += ' wrong';
                  }

                  return (
                    <button
                      key={oi}
                      className={cls}
                      onClick={() => {
                        if (!shown) {
                          setAnswers(prev => ({ ...prev, [qi]: oi }));
                        }
                      }}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-md border border-current flex items-center justify-center text-xs font-bold font-mono">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="text-sm font-medium">{opt}</span>
                      {shown && oi === q.correctIndex && (
                        <span className="ml-auto text-xs font-bold text-[#059669]">Correct</span>
                      )}
                      {shown && selected === oi && oi !== q.correctIndex && (
                        <span className="ml-auto text-xs font-bold text-[#DC2626]">Incorrect</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reveal answer button */}
            <div className="px-5 pb-4 ml-8">
              <button
                onClick={() => setRevealed(prev => ({ ...prev, [qi]: true }))}
                className="text-xs text-[#FF2E7E] hover:underline font-semibold"
              >
                {shown ? 'Answer & breakdown shown' : 'View explanation'}
              </button>
            </div>

            {/* Explanation */}
            {shown && (
              <div className="px-5 pb-5 border-t border-[#F0D6E2] pt-4 bg-[#FFFBFD]">
                <div className="ml-8 space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-pixel text-[9px] px-2 py-0.5 rounded bg-[#10B981] text-white font-bold">
                        CORRECT ANSWER
                      </span>
                      <span className="text-xs font-bold text-[#065F46]">
                        Option {String.fromCharCode(65 + q.correctIndex)}
                      </span>
                    </div>
                    <p className="text-[#065F46] text-xs leading-relaxed">{q.explanation}</p>
                  </div>

                  {selected !== null && selected !== q.correctIndex && q.wrongExplanations?.[selected] && (
                    <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-pixel text-[9px] px-2 py-0.5 rounded bg-[#DC2626] text-white font-bold">
                          MISCONCEPTION
                        </span>
                        <span className="text-xs font-bold text-[#991B1B]">
                          Why Option {String.fromCharCode(65 + selected)} is tempting:
                        </span>
                      </div>
                      <p className="text-[#991B1B] text-xs leading-relaxed">{q.wrongExplanations[selected]}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
