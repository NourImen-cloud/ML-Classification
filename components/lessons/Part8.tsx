'use client';

import { useState, useMemo } from 'react';
import { SectionHeader, ThoughtPrompt, Callout, KeyInsight, CompareTable } from '@/components/ui/ConceptCard';
import { Quiz } from '@/components/ui/Quiz';
import { studentDataset, newStudents, Email } from '@/lib/data';
import { knnPredict } from '@/lib/knn';

function studentsAsEmails(students: typeof studentDataset): Email[] {
  return students.map(s => ({
    id: s.id,
    links: s.studyHours,
    suspiciousWords: s.classesAttended,
    label: s.result === 'pass' ? 'not-spam' : 'spam',
  }));
}

const applications = [
  { app: 'Spam Detection', task: 'Binary email routing', classes: 'Spam / Legitimate', criticalError: 'False Positive (Legitimate email blocked)' },
  { app: 'Medical Diagnostics', task: 'Pathology scan evaluation', classes: 'Benign / Malignant', criticalError: 'False Negative (Malignancy missed)' },
  { app: 'Financial Fraud', task: 'Card transaction authorization', classes: 'Authorized / Fraudulent', criticalError: 'False Negative (Financial theft occurs)' },
  { app: 'Biometric Security', task: 'Device facial unlock', classes: 'Authorized Owner / Imposter', criticalError: 'False Positive (Imposter gains access)' },
  { app: 'Autonomous Vehicles', task: 'Traffic signage recognition', classes: 'Multi-class sign categories', criticalError: 'Misclassification of stop/hazard signs' },
  { app: 'Credit & Underwriting', task: 'Loan approval risk rating', classes: 'Approved / Declined', criticalError: 'Algorithmic bias against protected groups' },
];

function StudentScatterPlot({
  highlightIds,
  newPoint,
}: {
  highlightIds?: string[];
  newPoint?: { x: number; y: number; label: string };
}) {
  const W = 320, H = 260, PAD = 40;
  const scaleX = (v: number) => PAD + (v / 10) * (W - PAD * 1.5);
  const scaleY = (v: number) => H - PAD - (v / 10) * (H - PAD * 1.5);

  return (
    <div className="rounded-2xl border border-[#F0D6E2] bg-white p-3 shadow-sm select-none">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs mx-auto block">
        <rect width={W} height={H} fill="#FFF9FC" rx={10} />

        {[0, 2, 4, 6, 8, 10].map(v => (
          <g key={v}>
            <line x1={scaleX(v)} y1={PAD / 2} x2={scaleX(v)} y2={H - PAD} stroke="#F0D6E2" strokeWidth={0.8} />
            <line x1={PAD} y1={scaleY(v)} x2={W - PAD / 2} y2={scaleY(v)} stroke="#F0D6E2" strokeWidth={0.8} />
            <text x={scaleX(v)} y={H - PAD + 14} textAnchor="middle" fill="#6D5970" fontSize={9} fontFamily="monospace">{v}</text>
            <text x={PAD - 6} y={scaleY(v) + 3} textAnchor="end" fill="#6D5970" fontSize={9} fontFamily="monospace">{v}</text>
          </g>
        ))}

        <line x1={PAD} y1={H - PAD} x2={W - PAD / 2} y2={H - PAD} stroke="#1A1020" strokeWidth={1.5} />
        <line x1={PAD} y1={H - PAD} x2={PAD} y2={PAD / 2} stroke="#1A1020" strokeWidth={1.5} />
        <text x={W / 2} y={H - 4} textAnchor="middle" fill="#1A1020" fontSize={10} fontWeight="bold">Study Hours (x)</text>
        <text x={12} y={H / 2} textAnchor="middle" fill="#1A1020" fontSize={10} fontWeight="bold" transform={`rotate(-90, 12, ${H / 2})`}>Attendance (y)</text>

        {studentDataset.map(s => {
          const cx = scaleX(s.studyHours);
          const cy = scaleY(s.classesAttended);
          const pass = s.result === 'pass';
          return (
            <g key={s.id}>
              <circle cx={cx} cy={cy} r={5.5} fill={pass ? '#10B981' : '#FF2E7E'} stroke="#FFFFFF" strokeWidth={1} />
              <text x={cx + 7} y={cy - 4} fill={pass ? '#065F46' : '#96003B'} fontSize={8} fontWeight="bold" fontFamily="monospace">
                {s.id}
              </text>
            </g>
          );
        })}

        {newPoint && (
          <g>
            <circle cx={scaleX(newPoint.x)} cy={scaleY(newPoint.y)} r={7} fill="#FFFFFF" stroke="#FF2E7E" strokeWidth={2.5} />
            <text x={scaleX(newPoint.x) + 9} y={scaleY(newPoint.y) - 5} fill="#FF2E7E" fontSize={9} fontWeight="bold" fontFamily="monospace">
              {newPoint.label}
            </text>
          </g>
        )}

        <g transform={`translate(${W - 100}, 10)`}>
          <rect width={90} height={44} rx={6} fill="#FFFFFF" stroke="#F0D6E2" strokeWidth={1} />
          <circle cx={12} cy={14} r={4} fill="#10B981" />
          <text x={22} y={17} fill="#065F46" fontSize={9} fontWeight="bold">Pass</text>
          <circle cx={12} cy={30} r={4} fill="#FF2E7E" />
          <text x={22} y={33} fill="#96003B" fontSize={9} fontWeight="bold">Fail</text>
        </g>
      </svg>
    </div>
  );
}

export default function Part8() {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('N1');
  const [userDecisions, setUserDecisions] = useState<Record<string, string>>({});
  const [knnRevealed, setKnnRevealed] = useState<Record<string, boolean>>({});
  const [kChoice, setKChoice] = useState(3);

  const studentEmails = studentsAsEmails(studentDataset);

  const knnPredictions = useMemo(() => {
    return newStudents.reduce((acc, ns) => {
      const res = knnPredict(ns.studyHours, ns.classesAttended, kChoice, studentEmails);
      return {
        ...acc,
        [ns.id]: res.prediction === 'not-spam' ? 'Pass' : 'Fail',
      };
    }, {} as Record<string, string>);
  }, [studentEmails, kChoice]);

  const activeStudent = newStudents.find(s => s.id === selectedStudentId);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-10">
      <SectionHeader
        part={8}
        time="110–120 min"
        title="Real-World Applications & Synthesis"
        subtitle="Practical Case Studies, Hands-on Evaluation, and Core Takeaways"
      />

      {/* 8.1 Real-World Domains */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Classification Systems in High-Stakes Production
          </h2>
        </div>

        <CompareTable
          headers={['Application Domain', 'Target Prediction', 'Output Classes', 'Most Damaging Failure Mode']}
          rows={applications.map(a => [a.app, a.task, a.classes, a.criticalError])}
        />

        <Callout type="warning" title="Algorithmic Responsibility">
          Classifiers learn statistical correlations directly from historical training data. If historical data encodes historical human biases or systemic disparities (such as in hiring or lending), the model will replicate and automate those inequities unless carefully audited.
        </Callout>
      </section>

      {/* 8.2 Final Hands-On Lab: Student Pass/Fail Dataset */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            Hands-on Activity: Classifying a New Domain
          </h2>
        </div>

        <div className="rounded-2xl border border-[#F0D6E2] bg-white p-5 shadow-sm space-y-4">
          <p className="text-xs text-[#6D5970] leading-relaxed">
            A dataset contains 8 past students with two features: <strong>Study Hours per Week</strong> (0-10) and <strong>Classes Attended</strong> (out of 10). Classify the 4 candidate test students and inspect how neighborhood K affects borderline instances:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="overflow-x-auto rounded-xl border border-[#F0D6E2]">
              <table className="data-table min-w-full text-xs">
                <thead>
                  <tr><th>Student</th><th>Study Hrs</th><th>Attendance</th><th>Outcome</th></tr>
                </thead>
                <tbody>
                  {studentDataset.map(s => (
                    <tr key={s.id}>
                      <td className="font-mono font-bold">{s.id}</td>
                      <td className="font-mono">{s.studyHours}</td>
                      <td className="font-mono">{s.classesAttended}</td>
                      <td>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono"
                          style={
                            s.result === 'pass'
                              ? { background: '#ECFDF5', color: '#065F46' }
                              : { background: '#FFE4EF', color: '#FF2E7E' }
                          }
                        >
                          {s.result === 'pass' ? 'Pass' : 'Fail'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <StudentScatterPlot
              newPoint={activeStudent ? { x: activeStudent.studyHours, y: activeStudent.classesAttended, label: activeStudent.id } : undefined}
            />
          </div>

          {/* Test candidates */}
          <div className="pt-2 border-t border-[#F7EAF0] space-y-3">
            <span className="text-xs font-bold text-[#1A1020] uppercase font-pixel tracking-wider block">
              Candidate Test Inquiries:
            </span>
            <div className="flex flex-wrap gap-2">
              {newStudents.map(ns => (
                <button
                  key={ns.id}
                  onClick={() => setSelectedStudentId(ns.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedStudentId === ns.id
                      ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#FF2E7E]'
                      : 'border-[#F0D6E2] bg-[#FFF9FC] text-[#6D5970]'
                  }`}
                >
                  {ns.id}: ({ns.studyHours}h study, {ns.classesAttended}/10 attendance)
                </button>
              ))}
            </div>

            {activeStudent && (
              <div className="p-4 rounded-xl border border-[#F0D6E2] bg-[#FFF7FA] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1020]">
                    Evaluating {activeStudent.id}: {activeStudent.note}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#6D5970] font-mono">KNN K =</span>
                    <select
                      value={kChoice}
                      onChange={e => setKChoice(+e.target.value)}
                      className="bg-white border border-[#F0D6E2] rounded px-2 py-0.5 text-xs font-bold font-mono"
                    >
                      <option value={1}>1</option>
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#6D5970]">Your Judgment:</span>
                  <button
                    onClick={() => setUserDecisions(prev => ({ ...prev, [activeStudent.id]: 'Pass' }))}
                    className={`px-3 py-1 rounded-full border text-xs font-bold ${
                      userDecisions[activeStudent.id] === 'Pass'
                        ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                        : 'border-[#F0D6E2]'
                    }`}
                  >
                    Predict Pass
                  </button>
                  <button
                    onClick={() => setUserDecisions(prev => ({ ...prev, [activeStudent.id]: 'Fail' }))}
                    className={`px-3 py-1 rounded-full border text-xs font-bold ${
                      userDecisions[activeStudent.id] === 'Fail'
                        ? 'border-[#FF2E7E] bg-[#FFE4EF] text-[#96003B]'
                        : 'border-[#F0D6E2]'
                    }`}
                  >
                    Predict Fail
                  </button>

                  <button
                    onClick={() => setKnnRevealed(prev => ({ ...prev, [activeStudent.id]: true }))}
                    className="ml-auto text-xs font-bold text-[#FF2E7E] hover:underline"
                  >
                    Reveal KNN (K={kChoice}) Result →
                  </button>
                </div>

                {knnRevealed[activeStudent.id] && (
                  <div className="p-3 rounded-lg bg-white border border-[#F0D6E2] text-xs text-[#1A1020] flex items-center justify-between">
                    <span>KNN with K = {kChoice} predicts:</span>
                    <span className="font-pixel text-xs font-bold text-[#FF2E7E]">
                      {knnPredictions[activeStudent.id]}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8.3 The 5 Core Principles of Classification */}
      <section className="space-y-4">
        <div>
          <span className="font-pixel text-[10px] uppercase font-bold text-[#FF2E7E] tracking-wider block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-extrabold text-[#1A1020]">
            The 5 Core Principles of Machine Learning Classification
          </h2>
        </div>

        <div className="space-y-2">
          {[
            { num: '01', title: 'Data Over Explicit Rules', text: 'Machine learning builds models by discovering empirical patterns in examples rather than manually codifying deterministic conditionals.' },
            { num: '02', title: 'Classification Maps Features to Discrete Classes', text: 'Input feature vectors are partitioned into distinct categories, separated by decision boundaries in multi-dimensional space.' },
            { num: '03', title: 'Each Algorithm Carves Boundaries Differently', text: 'KNN adapts to local clusters; Decision Trees form orthogonal axis-aligned boxes; Logistic Regression and SVM construct hyperplanes.' },
            { num: '04', title: 'Accuracy Misleads on Imbalanced Data', text: 'Always inspect the Confusion Matrix. Balance Precision and Recall according to the real-world operational cost of errors.' },
            { num: '05', title: 'The True Objective is Generalization', text: 'Never judge a model by training accuracy. A model that achieves 100% on training data is typically memorizing noise.' },
          ].map(p => (
            <div key={p.num} className="p-4 rounded-2xl border border-[#F0D6E2] bg-white shadow-sm flex items-start gap-3">
              <span className="font-pixel text-xs text-[#FF2E7E] font-bold mt-0.5">{p.num}</span>
              <div>
                <h4 className="font-bold text-xs text-[#1A1020] mb-0.5">{p.title}</h4>
                <p className="text-xs text-[#6D5970] leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Comprehensive Quiz */}
      <section className="pt-4 border-t border-[#F0D6E2]">
        <Quiz
          partNumber={8}
          questions={[
            {
              question: 'A credit card fraud model predicts "Legitimate" for every transaction and achieves 99.9% accuracy because only 0.1% of transactions are fraudulent. What is the fundamental issue?',
              options: [
                'The model is computationally too slow to deploy',
                'This is the accuracy paradox: fraud Recall is 0%, meaning all actual theft is missed',
                'The training set was not normalized with Min-Max scaling',
                'The model is underfitting due to low learning rates',
              ],
              correctIndex: 1,
              explanation: 'In heavily skewed datasets, a model predicting only the majority class achieves 99.9% accuracy, yet catches zero fraud. The Recall for the positive fraud class is 0%.',
            },
            {
              question: 'Which classification algorithm is most sensitive to features measured on widely differing numerical scales (e.g. 0-10 vs 0-10,000)?',
              options: ['Decision Tree', 'K-Nearest Neighbors', 'Both equally', 'Neither'],
              correctIndex: 1,
              explanation: 'KNN computes distance across all feature axes; large numbers dominate the distance calculation. Decision trees evaluate one feature at a time, so scale differences do not affect split points.',
            },
            {
              question: 'Which of the following problems represents a continuous Regression task rather than a Classification task?',
              options: [
                'Predicting whether an applicant will pass an exam',
                'Predicting a student’s exact test score from 0.0 to 100.0',
                'Categorizing whether an email is spam or legitimate',
                'Recognizing which digit (0–9) a handwritten glyph depicts',
              ],
              correctIndex: 1,
              explanation: 'A numerical score along a continuous scale is continuous regression. All other options predict one of a fixed set of discrete categories.',
            },
          ]}
        />
      </section>

      {/* Completion Banner */}
      <div className="rounded-2xl border-2 border-[#FF2E7E] bg-[#FFF0F6] p-8 text-center space-y-2 shadow-sm">
        <span className="font-pixel text-xs text-[#FF2E7E] font-bold uppercase tracking-wider block">
          CURRICULUM COMPLETE
        </span>
        <h3 className="font-pixel text-xl text-[#1A1020] font-bold">
          Mastery of Modern Classification
        </h3>
        <p className="text-xs text-[#6D5970] max-w-lg mx-auto leading-relaxed">
          You have covered the entire journey from handcrafted heuristics to KNN, Decision Trees, Logistic Regression, SVM, and rigorous model evaluation.
        </p>
      </div>
    </div>
  );
}
