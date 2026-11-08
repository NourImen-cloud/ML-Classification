export interface ConfusionMatrix {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export function accuracy(cm: ConfusionMatrix): number {
  const total = cm.tp + cm.fp + cm.fn + cm.tn;
  return total === 0 ? 0 : (cm.tp + cm.tn) / total;
}

export function precision(cm: ConfusionMatrix): number {
  const denom = cm.tp + cm.fp;
  return denom === 0 ? 0 : cm.tp / denom;
}

export function recall(cm: ConfusionMatrix): number {
  const denom = cm.tp + cm.fn;
  return denom === 0 ? 0 : cm.tp / denom;
}

export function f1Score(cm: ConfusionMatrix): number {
  const p = precision(cm);
  const r = recall(cm);
  return p + r === 0 ? 0 : (2 * p * r) / (p + r);
}

// Module 6.4 & 8.1 - 8.4: Complete worked numerical example (100 emails)
// Actual Spam: 51 (36 TP + 15 FN)
// Actual Not Spam: 49 (9 FP + 40 TN)
export const workedConfusionMatrix: ConfusionMatrix = {
  tp: 36,
  fp: 9,
  fn: 15,
  tn: 40,
};

// Module 8.5: The 1,000 imbalanced emails trap
// 990 legitimate, 10 spam. A naive model that predicts every email is Legitimate.
export const imbalancedBaselineMatrix: ConfusionMatrix = {
  tp: 0,
  fp: 0,
  fn: 10,
  tn: 990,
};

// Module 9: Threshold experiment 5-email evaluation
export interface ThresholdEvaluation {
  threshold: number;
  predictedSpam: string[];
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  precision: number;
  recall: number;
  f1: number;
}

export const thresholdSweepData: ThresholdEvaluation[] = [
  { threshold: 0.4, predictedSpam: ['A', 'B', 'C', 'D'], tp: 3, fp: 1, fn: 0, tn: 1, precision: 0.75, recall: 1.00, f1: 0.857 },
  { threshold: 0.5, predictedSpam: ['A', 'B', 'C'],      tp: 2, fp: 1, fn: 1, tn: 1, precision: 0.67, recall: 0.67, f1: 0.670 },
  { threshold: 0.8, predictedSpam: ['A', 'B'],           tp: 2, fp: 0, fn: 1, tn: 2, precision: 1.00, recall: 0.67, f1: 0.800 },
  { threshold: 0.9, predictedSpam: ['A'],                tp: 1, fp: 0, fn: 2, tn: 2, precision: 1.00, recall: 0.33, f1: 0.500 },
];

export function computeThresholdMetrics(threshold: number, emails = [
  { id: 'A', prob: 0.95, actual: 1 },
  { id: 'B', prob: 0.83, actual: 1 },
  { id: 'C', prob: 0.62, actual: 0 },
  { id: 'D', prob: 0.48, actual: 1 },
  { id: 'E', prob: 0.20, actual: 0 },
]): ThresholdEvaluation {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  const predictedSpam: string[] = [];

  for (const e of emails) {
    const isPredSpam = e.prob >= threshold;
    if (isPredSpam) predictedSpam.push(e.id);

    if (isPredSpam && e.actual === 1) tp++;
    else if (isPredSpam && e.actual === 0) fp++;
    else if (!isPredSpam && e.actual === 1) fn++;
    else tn++;
  }

  const p = tp + fp === 0 ? 0 : tp / (tp + fp);
  const r = tp + fn === 0 ? 0 : tp / (tp + fn);
  const f1 = p + r === 0 ? 0 : (2 * p * r) / (p + r);

  return {
    threshold,
    predictedSpam,
    tp,
    fp,
    fn,
    tn,
    precision: parseFloat(p.toFixed(2)),
    recall: parseFloat(r.toFixed(2)),
    f1: parseFloat(f1.toFixed(3)),
  };
}

// Module 7: Overfitting comparison curves
export const overfittingCurveData = [
  { complexity: 0, trainError: 0.34, testError: 0.38, label: 'K=15 / Depth=1 (Underfit)' },
  { complexity: 2, trainError: 0.18, testError: 0.20, label: 'K=7 / Depth=2' },
  { complexity: 4, trainError: 0.08, testError: 0.17, label: 'K=3 / Depth=3 (Good Fit)' },
  { complexity: 6, trainError: 0.03, testError: 0.23, label: 'K=2 / Depth=5' },
  { complexity: 8, trainError: 0.01, testError: 0.34, label: 'K=1 / Depth=7 (Overfit)' },
  { complexity: 10, trainError: 0.00, testError: 0.44, label: 'K=1 / Depth=10 (Memorization)' },
];
